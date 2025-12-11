import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Svg, {Path, Circle, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {CustomBarChart} from '../../components/CustomBarChart';
import {PieChart, BarChart, LineChart} from 'react-native-gifted-charts';
import {colors, typography, spacing} from '../../theme';
import {formatINR} from '../../utils/currency';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 3) / 2;

// Icons
const InsightsHeaderIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 20V10M12 20V4M6 20V14"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 2V6M8 2V6M3 10H21"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FilterIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6H20M7 12H17M10 18H14"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MoreIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="1.5" fill={colors.text.primary} />
    <Circle cx="12" cy="12" r="1.5" fill={colors.text.primary} />
    <Circle cx="12" cy="19" r="1.5" fill={colors.text.primary} />
  </Svg>
);

const TotalSpentIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#FFB800" />
    <Path
      d="M9.5 9H14.5M9.5 10.5H14.5M9.5 9V15.5L13.5 11.5"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AvgMonthIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#FF5252" />
    <Path
      d="M8 15L11 11L13 13L16 9M16 9H14M16 9V11"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const YoureOwedIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#4CAF50" />
    <Path
      d="M12 16V8M12 8L8 12M12 8L16 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const YouOweIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#FFB800" />
    <Path
      d="M12 8V16M12 16L16 12M12 16L8 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


interface InsightsScreenProps {
  onBack?: () => void;
}

// Static data - moved outside component to prevent re-creation on every render
const trendData = [
  {label: 'Jan', value: 35000},
  {label: 'Feb', value: 38000},
  {label: 'Mar', value: 42000},
  {label: 'Apr', value: 45000},
  {label: 'May', value: 48000},
];

const summaryCards = [
  {
    id: 'total',
    icon: TotalSpentIcon,
    label: 'Total Spent',
    amount: 145000,
    subtitle: 'Across 3 books',
  },
  {
    id: 'avg',
    icon: AvgMonthIcon,
    label: 'Avg/Month',
    amount: 48333,
    subtitle: '+12% vs last',
    subtitleColor: '#4CAF50',
  },
  {
    id: 'owed',
    icon: YoureOwedIcon,
    label: "You're Owed",
    amount: 18500,
    subtitle: 'From 5 people',
  },
  {
    id: 'owe',
    icon: YouOweIcon,
    label: 'You Owe',
    amount: 6200,
    subtitle: 'To 2 people',
  },
];

const spendingCategories = [
  {name: 'Food', percentage: 35, color: '#4ECDC4', value: 35},
  {name: 'Transport', percentage: 25, color: '#5B9EFF', value: 25},
  {name: 'Accommodation', percentage: 20, color: '#FFB800', value: 20},
  {name: 'Activities', percentage: 20, color: '#FF5252', value: 20},
];

const books = [
  {name: 'Goa Trip', you: 18500, avg: 9000},
  {name: 'Flat 402', you: 8400, avg: 8400},
  {name: 'Office Party', you: 3200, avg: 3500},
  {name: 'Weekend Gateway', you: 12300, avg: 10500},
  {name: 'Gym Membership', you: 2500, avg: 2500},
  {name: 'Netflix Share', you: 600, avg: 750},
];

export const InsightsScreen: React.FC<InsightsScreenProps> = ({onBack}) => {
  const scrollY = useRef(0);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const stickyHeaderThreshold = 100; // When header becomes sticky
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);

  const handleBarPress = (index: number) => {
    setSelectedBarIndex(selectedBarIndex === index ? null : index);
  };

  const pieData = spendingCategories.map((cat, index) => ({
    value: cat.value,
    color: cat.color,
    text: `${cat.percentage}%`,
    focused: selectedCategoryIndex === index,
  }));

  const handlePiePress = (item: any, index: number) => {
    setSelectedCategoryIndex(selectedCategoryIndex === index ? null : index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // Check if header has become sticky
    const shouldBeSticky = currentScrollY >= stickyHeaderThreshold;
    if (shouldBeSticky !== isHeaderSticky) {
      setIsHeaderSticky(shouldBeSticky);
      // Animate background when sticky state changes
      Animated.timing(headerOpacity, {
        toValue: shouldBeSticky ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    scrollY.current = currentScrollY;
  };

  const renderStickyHeader = () => {
    return (
      <View style={styles.stickyHeaderContainer}>
        <Animated.View style={[styles.stickyHeaderBackground, {opacity: headerOpacity}]} />
        <Animated.View style={[styles.insightsListHeader, {opacity: headerOpacity}]}>
          <View>
            <Text style={styles.insightsListTitle}>Insights</Text>
            <Text style={styles.insightsListSubtitle}>This month</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <CalendarIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FilterIcon />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[
        colors.gradients.home.start,
        colors.gradients.home.middle,
        colors.gradients.home.end,
      ]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        overScrollMode="never"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <InsightsHeaderIcon />
            <Text style={styles.headerTitle}>Insights</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <CalendarIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FilterIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sticky Header */}
        {renderStickyHeader()}

        {/* Period Title */}
        <View style={styles.periodTitleContainer}>
          <Text style={styles.periodTitle}>This Month</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          {summaryCards.map(card => {
            const CardIcon = card.icon;
            return (
              <View key={card.id} style={styles.summaryCard}>
                <View style={styles.cardContent}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardLabel}>{card.label}</Text>
                    <Text style={styles.cardAmount}>{formatINR(card.amount)}</Text>
                    <Text
                      style={[
                        styles.cardSubtitle,
                        card.subtitleColor && {color: card.subtitleColor},
                      ]}>
                      {card.subtitle}
                    </Text>
                  </View>
                  <View style={styles.cardIconContainer}>
                    <CardIcon />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Monthly Spending Trend */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Spending Trend</Text>
            <TouchableOpacity>
              <MoreIcon />
            </TouchableOpacity>
          </View>
          <CustomBarChart
            data={trendData}
            selectedIndex={selectedBarIndex}
            onBarPress={handleBarPress}
            primaryColor={colors.primary.pink}
            secondaryColor={colors.secondary.darkBlueGray}
            height={180}
            barWidth={28}
          />
        </View>

        {/* Where Your Money Goes */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Where Your Money Goes</Text>
          <View style={styles.donutChartContainer}>
            <PieChart
              data={pieData}
              donut
              radius={90}
              innerRadius={60}
              innerCircleColor="white"
              focusOnPress
              onPress={handlePiePress}
              centerLabelComponent={() => (
                <View style={styles.donutCenterText}>
                  <Text style={styles.donutCenterLabel}>Total</Text>
                  <Text style={styles.donutCenterAmount}>₹45,500</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.categoryList}>
            {spendingCategories.map((category, index) => {
              const isSelected = selectedCategoryIndex === index;
              return (
                <TouchableOpacity
                  key={category.name}
                  style={styles.categoryItem}
                  onPress={() => setSelectedCategoryIndex(selectedCategoryIndex === index ? null : index)}
                  activeOpacity={0.7}>
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.categoryDot,
                        {backgroundColor: category.color},
                      ]}
                    />
                    <Text
                      style={[
                        styles.categoryName,
                        isSelected && styles.categoryNameSelected,
                      ]}>
                      {category.name}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryPercentage,
                      isSelected && styles.categoryPercentageSelected,
                    ]}>
                    {category.percentage}%
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Spending by Book */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Book Comparison</Text>
          <Text style={styles.comparisonSubtitle}>You vs Average Spending</Text>

          <View style={styles.comparisonChartContainer}>
            <BarChart
              data={books.flatMap((book) => [
                {
                  value: book.you / 1000,
                  label: book.name,
                  frontColor: colors.primary.pink,
                  spacing: 6,
                },
                {
                  value: book.avg / 1000,
                  frontColor: colors.secondary.darkBlueGray,
                },
              ])}
              barWidth={28}
              spacing={30}
              roundedTop
              roundedBottom
              hideRules
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{
                color: colors.text.tertiary,
                fontSize: typography.sizes.xs,
                fontFamily: typography.fonts.regular,
              }}
              noOfSections={4}
              maxValue={20}
              height={200}
              showValuesAsTopLabel
              topLabelTextStyle={{
                fontSize: typography.sizes.sm,
                fontFamily: typography.fonts.semibold,
                color: colors.text.primary,
              }}
              renderTooltip={(item: any, index: number) => {
                const bookIndex = Math.floor(index / 2);
                const isYou = index % 2 === 0;
                return (
                  <View style={styles.comparisonTooltip}>
                    <Text style={styles.comparisonTooltipText}>
                      ₹{item.value.toFixed(1)}k
                    </Text>
                  </View>
                );
              }}
              labelWidth={80}
              xAxisLabelTextStyle={{
                color: colors.text.primary,
                fontSize: typography.sizes.sm,
                fontFamily: typography.fonts.medium,
                textAlign: 'center',
              }}
            />
          </View>

          {/* Legend */}
          <View style={styles.comparisonLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: colors.primary.pink}]} />
              <Text style={styles.legendText}>You</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: colors.secondary.darkBlueGray}]} />
              <Text style={styles.legendText}>Group Avg</Text>
            </View>
          </View>
        </View>

        {/* Savings Progress */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Savings Progress</Text>
          <Text style={styles.savingsSubtitle}>Bike Fund</Text>

          <View style={styles.savingsChartContainer}>
            <LineChart
              data={[
                {value: 150, label: 'M'},
                {value: 350, label: 'T'},
                {value: 200, label: 'W'},
                {value: 230, label: 'T'},
                {value: 220, label: 'F'},
                {value: 180, label: 'S'},
                {value: 120, label: 'S'},
              ]}
              areaChart
              curved
              width={SCREEN_WIDTH - spacing.lg * 2 - spacing.md * 2 - 40}
              height={200}
              showVerticalLines={false}
              spacing={47}
              initialSpacing={0}
              endSpacing={0}
              color={colors.primary.pink}
              thickness={3}
              startFillColor={colors.primary.pink}
              endFillColor={colors.primary.pink}
              startOpacity={0.3}
              endOpacity={0.1}
              hideDataPoints={false}
              dataPointsColor={colors.primary.pink}
              dataPointsRadius={5}
              textColor1={colors.text.tertiary}
              textFontSize={typography.sizes.sm}
              yAxisColor="transparent"
              xAxisColor="transparent"
              hideRules
              yAxisTextStyle={{
                color: colors.text.tertiary,
                fontSize: typography.sizes.xs,
                fontFamily: typography.fonts.regular,
              }}
              noOfSections={4}
              maxValue={500}
              pointerConfig={{
                pointerStripHeight: 160,
                pointerStripColor: colors.primary.pink,
                pointerStripWidth: 2,
                pointerColor: colors.primary.pink,
                radius: 6,
                pointerLabelWidth: 60,
                pointerLabelHeight: 40,
                activatePointersOnLongPress: false,
                autoAdjustPointerLabelPosition: false,
                showPointerStrip: true,
                pointerLabelComponent: (items: any) => {
                  return (
                    <View style={styles.savingsTooltipSimple}>
                      <Text style={styles.savingsTooltipValue}>{items[0].value}</Text>
                    </View>
                  );
                },
              }}
            />
          </View>

          <View style={styles.savingsFooter}>
            <Text style={styles.savingsProgress}>84% Complete</Text>
            <Text style={styles.savingsRemaining}>₹8,000 to go</Text>
          </View>
          <Text style={styles.savingsProjection}>
            Projected completion:{' '}
            <Text style={styles.projectionDate}>Mid August</Text> based on your
            current savings rate.
          </Text>
        </View>

        <View style={{height: 100}} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    height: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyHeaderContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  stickyHeaderBackground: {
    position: 'absolute',
    top: -spacing.md,
    left: -500,
    right: -500,
    bottom: 0,
    backgroundColor: 'rgba(254, 249, 249, 0.95)',
  },
  insightsListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  insightsListTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  insightsListSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  periodTitleContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: -110,
  },
  periodTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLeft: {
    flex: 1,
    marginTop: 4,
  },
  cardIconContainer: {
    marginLeft: spacing.xs,
  },
  cardLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  cardAmount: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.text.tertiary,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  donutChartContainer: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  donutCenterText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  donutCenterAmount: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  categoryList: {
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
  },
  categoryNameSelected: {
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  categoryPercentage: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  categoryPercentageSelected: {
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  comparisonTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  comparisonSubtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  comparisonChartContainer: {
    marginVertical: spacing.sm,
    alignItems: 'center',
  },
  comparisonTooltip: {
    backgroundColor: colors.primary.pink,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  comparisonTooltipText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    color: 'white',
  },
  comparisonLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: `${colors.secondary.darkBlueGray}11`,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text.secondary,
  },
  savingsSubtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  savingsChartContainer: {
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  savingsTooltipSimple: {
    backgroundColor: 'transparent',
  },
  savingsTooltipValue: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  savingsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  savingsProgress: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    color: '#4ECDC4',
  },
  savingsRemaining: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.tertiary,
  },
  savingsProjection: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    lineHeight: typography.sizes.sm * 1.5,
  },
  projectionDate: {
    fontFamily: typography.fonts.semibold,
    color: colors.primary.pink,
  },
});
