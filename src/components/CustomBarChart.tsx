import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated} from 'react-native';
import Svg, {Defs, LinearGradient as SvgLinearGradient, Stop, Rect} from 'react-native-svg';
import {typography, spacing} from '../theme';
import {formatINR} from '../utils/currency';

interface BarData {
  label: string;
  value: number;
}

interface CustomBarChartProps {
  data: BarData[];
  selectedIndex: number | null;
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
  const yAxisWidth = 40; // Width for y-axis labels
  const availableWidth = chartWidth - yAxisWidth;
  const totalBars = data.length;
  const spacing_between = (availableWidth - (barWidth * totalBars)) / (totalBars + 1);

  // Create animated values for each bar
  const animatedHeights = useRef(
    data.map(() => new Animated.Value(0))
  ).current;

  // Animate bars on mount or data change
  useEffect(() => {
    const animations = data.map((item, index) => {
      return Animated.timing(animatedHeights[index], {
        toValue: 1,
        duration: 800,
        delay: index * 100, // Stagger animation for each bar
        useNativeDriver: false,
      });
    });

    // Reset animations when data changes
    animatedHeights.forEach(anim => anim.setValue(0));

    Animated.parallel(animations).start();
  }, [data]);

  // Format y-axis labels
  const formatYAxisLabel = (value: number) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}K`;
    }
    return value.toString();
  };

  const getBarHeight = (value: number) => {
    const chartHeight = height - 30; // Leave space for day labels
    return (value / maxValue) * chartHeight;
  };

  const renderGridLines = () => {
    const lines = [];
    const numberOfLines = 4;
    const chartHeight = height - 30; // Match the bar chart height
    const lineSpacing = chartHeight / numberOfLines;

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

  const renderYAxisLabels = () => {
    const labels = [];
    const numberOfLabels = 4;
    const chartHeight = height - 30; // Match the bar chart height
    const labelSpacing = chartHeight / numberOfLabels;
    const valueStep = maxValue / numberOfLabels;

    // Start from bottom (0) to top (maxValue)
    for (let i = 0; i <= numberOfLabels; i++) {
      const value = i * valueStep;
      const yPosition = chartHeight - (i * labelSpacing);

      // Format the label, ensuring 0 displays as "0"
      let labelText;
      if (i === 0) {
        labelText = '0';
      } else {
        labelText = formatYAxisLabel(Math.round(value));
      }

      labels.push(
        <Text
          key={i}
          style={[
            styles.yAxisLabel,
            {
              top: yPosition - 8, // Center align with grid line
            },
          ]}
        >
          {labelText}
        </Text>,
      );
    }
    return labels;
  };

  const renderBar = (item: BarData, index: number) => {
    const isSelected = index === selectedIndex;
    const barHeight = getBarHeight(item.value);
    const xPosition = yAxisWidth + spacing_between + index * (barWidth + spacing_between);
    const capHeight = 6;
    const capGap = 2;
    const barColor = isSelected ? primaryColor : secondaryColor;

    const animatedBarHeight = animatedHeights[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, barHeight],
    });

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => onBarPress(index)}
        style={[
          styles.barContainer,
          {
            left: xPosition,
            bottom: 5,
            width: barWidth,
          },
        ]}>
        {/* Cap */}
        <Animated.View
          style={[
            styles.barCap,
            {
              backgroundColor: barColor,
              height: capHeight,
              marginBottom: capGap,
              opacity: animatedHeights[index],
            },
          ]}
        />

        {/* Bar Body with Gradient */}
        <Animated.View
          style={[
            styles.barBody,
            {
              height: animatedBarHeight,
              overflow: 'hidden',
            },
          ]}>
          <Svg width={barWidth} height={barHeight}>
            <Defs>
              <SvgLinearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={barColor} stopOpacity={isSelected ? 0.8 : 0.3} />
                <Stop offset="1" stopColor={barColor} stopOpacity="0.05" />
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
        </Animated.View>

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

  return (
    <View style={[styles.chartContainer, {height: height + 40, marginTop: 10}]}>
      {/* Y-Axis Labels */}
      <View style={[styles.yAxisContainer, {height, width: yAxisWidth}]}>
        {renderYAxisLabels()}
      </View>

      {/* Grid Lines */}
      <View style={[styles.gridContainer, {height, left: yAxisWidth}]}>{renderGridLines()}</View>

      {/* Bars */}
      <View style={[styles.barsWrapper, {height}]}>
        {data.map((item, index) => renderBar(item, index))}
      </View>

      {/* Tooltip - Only show when a bar is selected */}
      {selectedIndex !== null && (
        <View
          style={[
            styles.tooltipContainer,
            {
              left: yAxisWidth + spacing_between + selectedIndex * (barWidth + spacing_between) + barWidth / 2,
              bottom: 5 + getBarHeight(data[selectedIndex].value) + 60,
              transform: [{translateX: -30}],
            },
          ]}>
          <View style={[styles.tooltip, {backgroundColor: primaryColor}]}>
            <Text style={[styles.tooltipText, {color: '#FFFFFF'}]}>{formatINR(data[selectedIndex].value)}</Text>
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
  yAxisContainer: {
    position: 'absolute',
    left: 0,
    top: 15,
  },
  yAxisLabel: {
    position: 'absolute',
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: '#8F92A1',
    textAlign: 'right',
    width: 35,
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    top: 15,
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
    marginTop: 15,
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
    marginTop: 4,
  },
  tooltipContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1000,
  },
  tooltip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    minWidth: 50,
  },
  tooltipText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.bold,
    textAlign: 'center',
    includeFontPadding: false,
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
