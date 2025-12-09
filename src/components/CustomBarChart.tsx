import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Svg, {Defs, LinearGradient as SvgLinearGradient, Stop, Rect} from 'react-native-svg';
import {typography, spacing} from '../theme';

interface BarData {
  label: string;
  value: number;
}

interface CustomBarChartProps {
  data: BarData[];
  selectedIndex: number;
  onBarPress: (index: number) => void;
  primaryColor?: string;
  secondaryColor?: string;
  height?: number;
  barWidth?: number;
}

export const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data,
  selectedIndex,
  onBarPress,
  primaryColor = '#D979A0',
  secondaryColor = '#7DB8FF',
  height = 200,
  barWidth = 34,
}) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const chartWidth = Dimensions.get('window').width - spacing.lg * 4;
  const availableWidth = chartWidth;
  const totalBars = data.length;
  const spacing_between = (availableWidth - (barWidth * totalBars)) / (totalBars + 1);

  const getBarHeight = (value: number) => {
    return (value / maxValue) * (height - 40); // Leave space for cap and label
  };

  const renderGridLines = () => {
    const lines = [];
    const numberOfLines = 5;
    const lineSpacing = height / numberOfLines;

    for (let i = 0; i <= numberOfLines; i++) {
      lines.push(
        <View
          key={i}
          style={[
            styles.gridLine,
            {
              top: i * lineSpacing,
            },
          ]}
        />,
      );
    }
    return lines;
  };

  const renderBar = (item: BarData, index: number) => {
    const isSelected = index === selectedIndex;
    const barHeight = getBarHeight(item.value);
    const xPosition = spacing_between + index * (barWidth + spacing_between);
    const capHeight = 6;
    const capGap = 2;
    const barColor = isSelected ? primaryColor : secondaryColor;

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => onBarPress(index)}
        style={[
          styles.barContainer,
          {
            left: xPosition,
            bottom: 30,
            width: barWidth,
          },
        ]}>
        {/* Cap */}
        <View
          style={[
            styles.barCap,
            {
              backgroundColor: barColor,
              height: capHeight,
              marginBottom: capGap,
            },
          ]}
        />

        {/* Bar Body with Gradient */}
        <View
          style={[
            styles.barBody,
            {
              height: barHeight,
              overflow: 'hidden',
              borderWidth: isSelected ? 3 : 0,
              borderColor: isSelected ? barColor : 'transparent',
            },
          ]}>
          <Svg width={barWidth} height={barHeight}>
            <Defs>
              <SvgLinearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={barColor} stopOpacity="1" />
                <Stop offset="1" stopColor={barColor} stopOpacity="0.1" />
              </SvgLinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width={barWidth}
              height={barHeight}
              fill={`url(#gradient-${index})`}
            />
          </Svg>
        </View>

        {/* Label */}
        <Text
          style={[
            styles.barLabel,
            {
              color: isSelected ? barColor : '#8F92A1',
              fontFamily: isSelected ? typography.fonts.semibold : typography.fonts.regular,
              fontWeight: isSelected ? typography.weights.semibold : typography.weights.regular,
            },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  // Calculate tooltip position for selected bar
  const selectedBar = data[selectedIndex];
  const selectedXPosition = spacing_between + selectedIndex * (barWidth + spacing_between);
  const selectedBarHeight = getBarHeight(data[selectedIndex].value);

  return (
    <View style={[styles.chartContainer, {height: height + 60}]}>
      {/* Grid Lines */}
      <View style={[styles.gridContainer, {height}]}>{renderGridLines()}</View>

      {/* Bars */}
      <View style={[styles.barsWrapper, {height}]}>
        {data.map((item, index) => renderBar(item, index))}
      </View>

      {/* Tooltip - Separate Entity */}
      {selectedBar && (
        <View
          style={[
            styles.tooltipContainer,
            {
              left: selectedXPosition + barWidth / 2,
              bottom: 30 + selectedBarHeight + 20,
            },
          ]}>
          <View style={[styles.tooltip, {backgroundColor: primaryColor}]}>
            <Text style={styles.tooltipText}>${selectedBar.value}</Text>
          </View>
          <View style={[styles.tooltipArrow, {borderTopColor: primaryColor}]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    position: 'relative',
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    top: 50,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  barsWrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 50,
  },
  barContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  barCap: {
    width: '100%',
  },
  barBody: {
    width: '100%',
  },
  barLabel: {
    fontSize: typography.sizes.xs,
    textAlign: 'center',
    marginTop: 8,
  },
  tooltipContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1000,
  },
  tooltip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    minWidth: 60,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    includeFontPadding: false,
    numberOfLines: 1,
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
});
