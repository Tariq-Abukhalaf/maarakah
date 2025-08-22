const ALL_COUNTRIES = [
  { id:'JO', name:'الأردن',      flag:'🇯🇴' },
  { id:'IQ', name:'العراق',      flag:'🇮🇶' },
  { id:'EG', name:'مصر',         flag:'🇪🇬' },
  { id:'SY', name:'سوريا',       flag:'🇸🇾' },
  { id:'SA', name:'السعودية',    flag:'🇸🇦' },
  { id:'PS', name:'فلسطين',      flag:'🇵🇸' },
  { id:'LY', name:'ليبيا',       flag:'🇱🇾' },
  { id:'MA', name:'المغرب',      flag:'🇲🇦' },
  { id:'DZ', name:'الجزائر',     flag:'🇩🇿' },
  { id:'AE', name:'الإمارات',    flag:'🇦🇪' },
  { id:'BH', name:'البحرين',     flag:'🇧🇭' },
  { id:'KW', name:'الكويت',      flag:'🇰🇼' },
  { id:'OM', name:'عُمان',        flag:'🇴🇲' },
  { id:'LB', name:'لبنان',       flag:'🇱🇧' },
  { id:'QA', name:'قطر',         flag:'🇶🇦' },
  { id:'TN', name:'تونس',        flag:'🇹🇳' },
  { id:'YE', name:'اليمن',       flag:'🇾🇪' },
  { id:'SD', name:'السودان',     flag:'🇸🇩' },
  { id:'MR', name:'موريتانيا',   flag:'🇲🇷' },
  { id:'KM', name:'جزر القمر',   flag:'🇰🇲' },
  { id:'DJ', name:'جيبوتي',      flag:'🇩🇯' },
  { id:'SO', name:'الصومال',     flag:'🇸🇴' },
];

const DEFAULT_AWARDS = [
  { multiplier: 5, name: 'درع الهوبا هوبا عاش', icon: '🏆' },
  { multiplier: 10, name: 'درع تورته', icon: '👑' },
  { multiplier: 20, name: 'درع كفو تفو', icon: '🎖️' }
];

const ICON_OPTIONS = ['🛡️', '⚔️', '🗡️', '🏹', '⚡', '💎', '🎖️', '🎗️', '👑', '🏆'];

const STORAGE_KEYS = {
  SETTINGS: 'voting_battle_settings',
  DATA: 'voting_battle_data'
};

const DEFAULT_STATE = {
  active: false,
  votes: {},
  totalVotes: 0,
  clickLock: false,
};

// Lucky probability configuration - INCREASED FOR MORE FUN!
const LUCKY_CONFIG = {
  EQUAL_PROBABILITY: 2.0
};