import Svg, { Line, Path } from 'react-native-svg';

type JournalIconProps = {
  size?: number;
  color?: string;
};

/** An open book with ruled lines on each page, since Ionicons' book glyphs don't
 * include the page-line detail shown in the reference design. */
export function JournalIcon({ size = 40, color = '#5B57E8' }: JournalIconProps) {
  return (
    <Svg width={size} height={(size * 40) / 48} viewBox="0 0 48 40" fill="none">
      <Path
        d="M24 9 C18 6 10 6 4 9 L4 31 C10 28 18 28 24 33 Z"
        stroke={color}
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <Path
        d="M24 9 C30 6 38 6 44 9 L44 31 C38 28 30 28 24 33 Z"
        stroke={color}
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <Line x1={24} y1={9} x2={24} y2={33} stroke={color} strokeWidth={2.2} strokeLinecap="round" />

      <Line x1={8.5} y1={11} x2={19} y2={12} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={8.5} y1={16} x2={19.5} y2={17.5} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={8.5} y1={21} x2={20} y2={23} stroke={color} strokeWidth={1.6} strokeLinecap="round" />

      <Line x1={39.5} y1={11} x2={29} y2={12} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={39.5} y1={16} x2={28.5} y2={17.5} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={39.5} y1={21} x2={28} y2={23} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}
