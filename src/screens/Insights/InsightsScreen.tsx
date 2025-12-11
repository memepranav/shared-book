import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, {Path, Circle, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
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

const BookIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SavingsIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#4ECDC4" />
    <Path
      d="M12 6V18M9 9H12.5C13.163 9 13.7989 9.26339 14.2678 9.73223C14.7366 10.2011 15 10.837 15 11.5C15 12.163 14.7366 12.7989 14.2678 13.2678C13.7989 13.7366 13.163 14 12.5 14H9"
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

export const InsightsScreen: React.FC<InsightsScreenProps> = ({onBack}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

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
    {name: 'Food', percentage: 35, color: '#4ECDC4'},
    {name: 'Transport', percentage: 25, color: '#5B9EFF'},
    {name: 'Accommodation', percentage: 20, color: '#FFB800'},
    {name: 'Activities', percentage: 20, color: '#FF5252'},
  ];

  const books = [
    {name: 'Goa Trip', you: 18500, avg: 9000},
    {name: 'Flat 402', you: 8400, avg: 8400},
    {name: 'Office', you: 3200, avg: 3200},
  ];

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
        overScrollMode="never">
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
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>Chart visualization</Text>
          </View>
        </View>

        {/* Where Your Money Goes */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Where Your Money Goes</Text>
          <View style={styles.donutChartContainer}>
            <View style={styles.donutPlaceholder}>
              <Text style={styles.donutCenterLabel}>Total</Text>
              <Text style={styles.donutCenterAmount}>₹45,500</Text>
            </View>
          </View>
          <View style={styles.categoryList}>
            {spendingCategories.map(category => (
              <View key={category.name} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[
                      styles.categoryDot,
                      {backgroundColor: category.color},
                    ]}
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <Text style={styles.categoryPercentage}>
                  {category.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Spending by Book */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <BookIcon />
              <Text style={styles.sectionTitle}>Spending by Book</Text>
            </View>
          </View>
          <View style={styles.bookTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.bookColumn]}>
                Book
              </Text>
              <Text style={[styles.tableHeaderText, styles.amountColumn]}>
                You
              </Text>
              <Text style={[styles.tableHeaderText, styles.amountColumn]}>
                Avg
              </Text>
            </View>
            {books.map((book, index) => (
              <View key={book.name} style={styles.tableRow}>
                <Text style={[styles.tableCellText, styles.bookColumn]}>
                  {book.name}
                </Text>
                <Text style={[styles.tableCellText, styles.amountColumn]}>
                  ₹{(book.you / 1000).toFixed(1)}k
                </Text>
                <Text
                  style={[
                    styles.tableCellText,
                    styles.amountColumn,
                    styles.avgText,
                  ]}>
                  ₹{(book.avg / 1000).toFixed(1)}k
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Savings Progress */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <SavingsIcon />
              <Text style={styles.sectionTitle}>Savings Progress</Text>
            </View>
          </View>
          <Text style={styles.savingsSubtitle}>Bike Fund</Text>
          <View style={styles.savingsChart}>
            <View style={styles.savingsPlaceholder}>
              <Text style={styles.savingsAmount}>₹42,000</Text>
            </View>
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
    marginBottom: spacing.lg,
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
  periodTitleContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
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
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: typography.sizes.base,
    color: colors.text.tertiary,
  },
  donutChartContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  donutPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 40,
    borderColor: '#4ECDC4',
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
    gap: spacing.sm,
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
  categoryPercentage: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  bookTable: {
    gap: spacing.sm,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.secondary.darkBlueGray}22`,
  },
  tableHeaderText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
  },
  tableCellText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
  },
  bookColumn: {
    flex: 2,
  },
  amountColumn: {
    flex: 1,
    textAlign: 'right',
  },
  avgText: {
    color: colors.text.tertiary,
  },
  savingsSubtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  savingsChart: {
    height: 150,
    marginBottom: spacing.md,
  },
  savingsPlaceholder: {
    height: '100%',
    backgroundColor: '#E8F5F4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.bold,
    color: '#4ECDC4',
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
