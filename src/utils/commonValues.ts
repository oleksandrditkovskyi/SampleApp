import { Dimensions, Platform } from 'react-native';

export const commonValues = {
  SIZE_0: 0,
  SIZE_1: 1,
  SIZE_2: 2,
  SIZE_4: 4,
  SIZE_6: 6,
  SIZE_8: 8,
  SIZE_12: 12,
  SIZE_14: 14,
  SIZE_16: 16,
  SIZE_18: 18,
  SIZE_20: 20,
  SIZE_22: 22,
  SIZE_24: 24,
  SIZE_28: 28,
  SIZE_30: 30,
  SIZE_32: 32,
  SIZE_36: 36,
  SIZE_38: 38,
  SIZE_40: 40,
  SIZE_42: 42,
  SIZE_44: 44,
  SIZE_48: 48,
  SIZE_50: 50,
  SIZE_58: 58,
  SIZE_64: 64,
  FONT_SIZE_8: 8,
  FONT_SIZE_10: 10,
  FONT_SIZE_12: 12,
  FONT_SIZE_14: 14,
  FONT_SIZE_15: 15,
  FONT_SIZE_16: 16,
  FONT_SIZE_18: 18,
  FONT_SIZE_20: 20,
  FONT_SIZE_24: 24,
  FONT_SIZE_30: 30,
  FONT_SIZE_36: 36,
  FONT_SIZE_72: 72,
  APP_WIDTH: Dimensions.get('window').width,
  APP_HEIGHT: Dimensions.get('window').height,
  IS_IOS: Platform.OS === 'ios',
  FULL: '100%' as const,
  HALF: '50%' as const,
  BORDER_WIDTH_1: 1,
  BORDER_RADIUS_12: 12,
  BORDER_RADIUS_16: 16,
  BORDER_RADIUS_20: 20,
  MAX_Z_INDEX: 9999,
  FLEX_1: 1,
  HEADER_HEIGHT: 42,
  IS_DEV: !!__DEV__,
};

export const hitSlop = {
  top: commonValues.SIZE_12,
  left: commonValues.SIZE_12,
  right: commonValues.SIZE_12,
  bottom: commonValues.SIZE_12,
};

export const smallHitSlop = {
  top: commonValues.SIZE_8,
  left: commonValues.SIZE_8,
  right: commonValues.SIZE_8,
  bottom: commonValues.SIZE_8,
};
