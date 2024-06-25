import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import backArrow from '../../assets/svg/back-arrow.svg';
import googleLogo from '../../assets/svg/google-logo.svg';
import home from '../../assets/svg/home.svg';
import pwdOff from '../../assets/svg/pwd-off.svg';
import pwdOn from '../../assets/svg/pwd-on.svg';
import share from '../../assets/svg/share.svg';

export const ICONS = {
  'back-arrow': backArrow,
  'google-logo': googleLogo,
  home: home,
  'pwd-off': pwdOff,
  'pwd-on': pwdOn,
  share: share,
};

export type IconName = keyof typeof ICONS;

export interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
  stroke?: string;
  iconOpacity?: number;
  strokeWidth?: number;
  focused?: boolean;
  outline?: boolean;
}

export type Props = IconProps;
