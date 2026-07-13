import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Line, Path, Polyline, Stop } from 'react-native-svg';
import { colors, radii, spacing, typography } from '@/theme/theme';

export type AreaChartPoint = { date: string; value: number };

type AreaChartProps = {
  data: AreaChartPoint[];
  unit?: string;
  height?: number;
};

const LINE_COLOR = '#2B2560';

function niceStep(range: number, targetTicks: number): number {
  if (range <= 0) return 1;
  const rough = range / targetTicks;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const residual = rough / magnitude;
  const niceResidual = residual > 5 ? 10 : residual > 2 ? 5 : residual > 1 ? 2 : 1;
  return niceResidual * magnitude;
}

function buildYTicks(min: number, max: number): number[] {
  const step = niceStep(max - min || 1, 5);
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

function monthLabel(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function AreaChart({ data, unit = '', height = 220 }: AreaChartProps) {
  if (data.length === 0) {
    return (
      <View style={[styles.empty, { height }]}>
        <Text style={styles.emptyText}>No data yet</Text>
      </View>
    );
  }

  // A single point (e.g. a training max that's never been changed) renders as a
  // flat line ending today, rather than a lone dot.
  const points = data.length === 1 ? [{ date: shiftDate(data[0].date, -30), value: data[0].value }, data[0]] : data;

  const width = 320;
  const paddingLeft = 12;
  const paddingRight = 48;
  const paddingTop = 44;
  const paddingBottom = 28;
  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const times = points.map((p) => new Date(p.date).getTime());
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const timeRange = maxTime - minTime || 1;

  const values = points.map((p) => p.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const yTicks = buildYTicks(dataMin, dataMax);
  const yMin = yTicks[0];
  const yMax = yTicks[yTicks.length - 1];
  const yRange = yMax - yMin || 1;

  function xFor(time: number) {
    return paddingLeft + ((time - minTime) / timeRange) * plotWidth;
  }
  function yFor(value: number) {
    return paddingTop + plotHeight - ((value - yMin) / yRange) * plotHeight;
  }

  const svgPoints = points.map((p) => ({ x: xFor(new Date(p.date).getTime()), y: yFor(p.value) }));
  const polylinePoints = svgPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath =
    `M ${svgPoints[0].x} ${paddingTop + plotHeight} ` +
    svgPoints.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${svgPoints[svgPoints.length - 1].x} ${paddingTop + plotHeight} Z`;

  const last = svgPoints[svgPoints.length - 1];
  const bubbleWidth = 30 + String(points[points.length - 1].value).length * 8 + (unit ? unit.length * 7 : 0);

  // One label per calendar month spanned by the data range.
  const monthTicks: { x: number; label: string }[] = [];
  const cursor = new Date(minTime);
  cursor.setDate(1);
  const end = new Date(maxTime);
  while (cursor.getTime() <= end.getTime()) {
    const t = Math.max(minTime, cursor.getTime());
    monthTicks.push({ x: xFor(t), label: monthLabel(cursor) });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return (
    <View>
      <View style={[styles.bubble, { left: Math.min(Math.max(last.x - bubbleWidth / 2, 0), width - bubbleWidth), top: paddingTop - 36, width: bubbleWidth }]}>
        <Text style={styles.bubbleText}>{points[points.length - 1].value}{unit ? ` ${unit}` : ''}</Text>
      </View>

      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.accent} stopOpacity={0.45} />
            <Stop offset="1" stopColor={colors.accent} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        <Line x1={last.x} y1={paddingTop - 12} x2={last.x} y2={last.y} stroke={LINE_COLOR} strokeWidth={1} />
        <Path d={areaPath} fill="url(#areaFill)" />
        <Polyline points={polylinePoints} fill="none" stroke={LINE_COLOR} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        <Line x1={paddingLeft} y1={paddingTop + plotHeight} x2={width - paddingRight} y2={paddingTop + plotHeight} stroke={colors.borderSubtle} strokeWidth={1} />
        <Line x1={width - paddingRight} y1={paddingTop} x2={width - paddingRight} y2={paddingTop + plotHeight} stroke={colors.borderSubtle} strokeWidth={1} />
      </Svg>

      {yTicks.map((tick) => (
        <Text key={tick} style={[styles.yTick, { top: yFor(tick) - 7, left: width - paddingRight + 6 }]}>
          {tick}
        </Text>
      ))}

      <View style={[styles.xAxisRow, { paddingLeft, paddingRight }]}>
        {monthTicks.map((m, i) => (
          <Text key={i} style={[styles.xTick, { left: m.x - paddingLeft }]}>
            {m.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

function shiftDate(dateKey: string, days: number): string {
  const d = new Date(dateKey);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textTertiary,
  },
  bubble: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: colors.textPrimary,
    borderRadius: radii.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  bubbleText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textInverse,
  },
  yTick: {
    position: 'absolute',
    ...typography.caption,
    color: colors.textTertiary,
  },
  xAxisRow: {
    height: 18,
  },
  xTick: {
    position: 'absolute',
    ...typography.caption,
    color: colors.textTertiary,
  },
});
