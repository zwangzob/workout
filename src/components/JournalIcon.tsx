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
        d="M24 9 C17 4.5 9 4.5 4 9 L4 31 C9 26.5 17 26.5 24 33 Z"
        stroke={color}
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <Path
        d="M24 9 C31 4.5 39 4.5 44 9 L44 31 C39 26.5 31 26.5 24 33 Z"
        stroke={color}
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <Line x1={24} y1={9} x2={24} y2={33} stroke={color} strokeWidth={2.2} strokeLinecap="round" />

      <Line x1={8.5} y1={14} x2={19} y2={15} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={8.5} y1={19} x2={19.5} y2={20.5} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={8.5} y1={24} x2={20} y2={26} stroke={color} strokeWidth={1.6} strokeLinecap="round" />

      <Line x1={39.5} y1={14} x2={29} y2={15} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={39.5} y1={19} x2={28.5} y2={20.5} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={39.5} y1={24} x2={28} y2={26} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}
