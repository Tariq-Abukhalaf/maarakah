let currentSettings = {
  channelName: '',
  youtubeLink: '',
  tagline: '',
  enabledCountries: ALL_COUNTRIES.map(c => c.id),
  awards: [...DEFAULT_AWARDS]
};

function populateCountries() {
  const grid = document.getElementById('countriesGrid');
  grid.innerHTML = '';
  
  ALL_COUNTRIES.forEach(country => {
    const item = document.createElement('div');
    item.className = 'country-item';
    if (currentSettings.enabledCountries.includes(country.id)) {
      item.classList.add('selected');
    }
    
    item.innerHTML = `
      <input type="checkbox" class="country-checkbox" id="country_${country.id}" 
             ${currentSettings.enabledCountries.includes(country.id) ? 'checked' : ''}>
      <span class="country-flag">${country.flag}</span>
      <span class="country-name">${country.name}</span>
    `;
    
    item.addEventListener('click', (e) => {
      if (e.target.type !== 'checkbox') {
        const checkbox = item.querySelector('.country-checkbox');
        checkbox.checked = !checkbox.checked;
      }
      toggleCountry(country.id);
    });
    
    grid.appendChild(item);
  });
}

function toggleCountry(countryId) {
  const index = currentSettings.enabledCountries.indexOf(countryId);
  if (index === -1) {
    currentSettings.enabledCountries.push(countryId);
  } else {
    currentSettings.enabledCountries.splice(index, 1);
  }
  
  updateCountryVisuals();
  validateSettings();
}

function updateCountryVisuals() {
  ALL_COUNTRIES.forEach(country => {
    const item = document.querySelector(`#country_${country.id}`).closest('.country-item');
    const checkbox = document.querySelector(`#country_${country.id}`);
    
    if (currentSettings.enabledCountries.includes(country.id)) {
      item.classList.add('selected');
      checkbox.checked = true;
    } else {
      item.classList.remove('selected');
      checkbox.checked = false;
    }
  });
}

function populateAwards() {
  const container = document.getElementById('awardsContainer');
  container.innerHTML = '';
  
  currentSettings.awards.forEach((award, index) => {
    const item = document.createElement('div');
    item.className = 'award-item';
    
    const iconOptions = ICON_OPTIONS.map(icon => 
      `<option value="${icon}" ${award.icon === icon ? 'selected' : ''}>${icon}</option>`
    ).join('');
    
    item.innerHTML = `
      <span>x</span>
      <input type="number" class="award-input multiplier" value="${award.multiplier}" 
             onchange="updateAward(${index}, 'multiplier', this.value)" min="2" max="100">
      <input type="text" class="award-input name" value="${award.name}" 
             onchange="updateAward(${index}, 'name', this.value)" placeholder="اسم الدرع">
      <select class="award-input icon-select" onchange="updateAward(${index}, 'icon', this.value)">
        ${iconOptions}
      </select>
      <button type="button" class="btn danger btn-small" onclick="removeAward(${index})">🗑️</button>
    `;
    container.appendChild(item);
  });
}

function updateAward(index, field, value) {
  if (field === 'multiplier') {
    value = parseFloat(value) || 0;
  }
  currentSettings.awards[index][field] = value;
  validateSettings();
}

function removeAward(index) {
  currentSettings.awards.splice(index, 1);
  populateAwards();
  validateSettings();
}

function addNewAward() {
  currentSettings.awards.push({
    multiplier: 3,
    name: 'درع جديد',
    icon: '🎖️'
  });
  populateAwards();
  validateSettings();
}

function validateSettings() {
  let valid = true;
  const messages = [];
  
  // Validate channel name
  const channelName = document.getElementById('channelName').value.trim();
  if (!channelName) {
    messages.push('❌ اسم القناة مطلوب');
    valid = false;
  }
  
  // Validate YouTube link
  const youtubeLink = document.getElementById('youtubeLink').value.trim();
  if (!youtubeLink) {
    messages.push('❌ رابط اليوتيوب مطلوب');
    valid = false;
  }
  
  // Validate tagline 
  const tagline = document.getElementById('tagline').value.trim();
  if (!tagline) {
    messages.push('❌ شعار القناة مطلوب');
    valid = false;
  }
  
  // Validate countries
  if (currentSettings.enabledCountries.length === 0) {
    messages.push('❌ يجب اختيار بلد واحد على الأقل');
    valid = false;
  }
  
  // Validate awards
  if (currentSettings.awards.length === 0) {
    messages.push('❌ يجب إضافة درع واحد على الأقل');
    valid = false;
  }
  
  // Validate award names
  for (let i = 0; i < currentSettings.awards.length; i++) {
    const award = currentSettings.awards[i];
    if (!award.name || award.name.trim() === '') {
      messages.push(`❌ اسم الدرع رقم ${i + 1} مطلوب`);
      valid = false;
    }
    if (!award.multiplier || award.multiplier < 2) {
      messages.push(`❌ مضاعف الدرع رقم ${i + 1} يجب أن يكون 2 أو أكثر`);
      valid = false;
    }
  }
  
  // Show validation messages
  const container = document.getElementById('messageContainer');
  if (messages.length > 0) {
    container.innerHTML = `<div class="validation-message">${messages.join('<br>')}</div>`;
  } else {
    container.innerHTML = '<div class="success-message">✅ جميع الإعدادات صحيحة</div>';
  }
  
  return valid;
}

function saveAndStart() {
  currentSettings.channelName = document.getElementById('channelName').value.trim();
  currentSettings.youtubeLink = document.getElementById('youtubeLink').value.trim();
  currentSettings.tagline = document.getElementById('tagline').value.trim();
  
  if (!validateSettings()) {
    return;
  }
  
  const settingsData = {
    ...currentSettings,
    setupCompleted: true,
    setupDate: new Date().toISOString()
  };
  
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settingsData));
    
    const container = document.getElementById('messageContainer');
    container.innerHTML = `
      <div class="success-message">
        ✅ تم حفظ الإعدادات بنجاح!<br>
        🚀 جاري التوجيه إلى صفحة المعركة...
      </div>
    `;
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    
  } catch (error) {
    const container = document.getElementById('messageContainer');
    container.innerHTML = '<div class="validation-message">❌ خطأ في حفظ الإعدادات</div>';
  }
}

function loadSavedSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      const savedSettings = JSON.parse(saved);
      
      currentSettings = { ...savedSettings };
      
      document.getElementById('channelName').value = currentSettings.channelName || '';
      document.getElementById('youtubeLink').value = currentSettings.youtubeLink || '';
      document.getElementById('tagline').value = currentSettings.tagline || '';
      
      populateCountries();
      populateAwards();
      
      console.log('✅ تم تحميل الإعدادات المحفوظة');
      return true;
    } else {
      console.log('ℹ️ لا توجد إعدادات محفوظة - بدء بالإعدادات الافتراضية');
      return false;
    }
  } catch (error) {
    console.warn('❌ خطأ في تحميل الإعدادات المحفوظة:', error);
    return false;
  }
}

window.addEventListener('DOMContentLoaded', function() {
  const hasSettings = loadSavedSettings();
  if (!hasSettings) {
    populateCountries();
    populateAwards();
  }
  validateSettings();
});