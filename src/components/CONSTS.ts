//TEXTS
//https://coolors.co/2d2a3e-3e2f4b-5c3c64-8a538a-99628b-a7718b colors
const DEFAULT_HEADING_SIZE = 25;
const DEFAULT_SUB_HEADER_SIZE = 18;
const DEFAULT_LABEL_TEXT_SIZE = 15;
const DEFAULT_TEXT_SIZE = 11;
const DEFAULT_TEXT_COLOR = '#FDFDFD';
//END-TEXTS
//APPS_CONSTS

const BACKGROUND_COLOR = '#264653';
const BACKGROUND_ITEM_DEFAULT = 'rgba(220,220,220,0.4)';
const BACGROUND_GRADIENT = {
  PRIMARY: '#4d4b73',
  SECONDARY: '#4d4b73',
  TERIATRY: '#805fc1',
};
//background: linear-gradient(90deg, rgba(41,40,69,1) 0%, rgba(163,42,194,1) 34%, rgba(212,207,222,1) 100%);

const BACKGROUND_GRADIENT_COLOR = {
  PRIMARY: 'rgba(41,40,69,1)',
  SECONDARY: 'rgba(163,42,194,1)',
  TERIATRY: 'rgba(212,207,222,1)',
};
const BACKGROUND_COLORS_V2 = [...Object.values(BACKGROUND_GRADIENT_COLOR)];

const BACKGROUND_GRADIENT_ARRAY = [...Object.values(BACGROUND_GRADIENT)];
const DEFAULT_ICON_SIZE = 25;
//END_APPS_CONST

//COMPONENT CONSTS
const BUTTON_PRIMARY = '#a0c15f';
const BUTTON_SECONDARY = '#006989';
const BUTTON_DANGER = '#f04f26';
const BUTTON_TEXT_COLOR = '#30251f';

const PRIMARY_BACKGRORUND_COLOR = '#302D43';
const SECONDARY_BACKGROUND_COLOR = '#6953F7';
const THIRD_BACKGROUND_COLOR = '#CD4FF7';

const TRACK_SWITCH_COLOR_TRUE = '#f54733';
const TRACK_SWITCH_COLOR_FALSE = '#daf7d0';

const TRACK_THUMB_COLOR_TRUE = '#43f707';
const TRACK_THUMB_COLOR_FALSE = '#9c1102';

//END COMPONENTS CONSTS

//ICONs CONSTS
export type T_IconType = 'FOOD' | 'TRAVEL' | 'ENTERTAINMENT';
//END ICONs CONSTS
export {
  TRACK_SWITCH_COLOR_FALSE,
  TRACK_SWITCH_COLOR_TRUE,
  TRACK_THUMB_COLOR_FALSE,
  TRACK_THUMB_COLOR_TRUE,
  DEFAULT_LABEL_TEXT_SIZE,
  PRIMARY_BACKGRORUND_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  THIRD_BACKGROUND_COLOR,
  BACKGROUND_ITEM_DEFAULT,
  BACKGROUND_COLORS_V2,
  DEFAULT_ICON_SIZE,
  BACKGROUND_GRADIENT_ARRAY,
  DEFAULT_TEXT_SIZE,
  BACKGROUND_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_HEADING_SIZE,
  DEFAULT_SUB_HEADER_SIZE,
  BUTTON_DANGER,
  BUTTON_SECONDARY,
  BUTTON_PRIMARY,
  BUTTON_TEXT_COLOR,
};
