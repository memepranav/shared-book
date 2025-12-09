import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {colors, typography, spacing} from '../../theme';
import {BookTypeIcon} from '../../components/BookTypeIcons';

// Icons
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <Path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IncomeIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 64 64" fill="none">
    <Path
      d="M42.5 21.5L53.5 32.5L42.5 43.5M52.5 32.5H21.5M21.5 10.5V54.5"
      stroke={colors.primary.pink}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ExpenseIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 64 64" fill="none">
    <Path
      d="M21.5 21.5L10.5 32.5L21.5 43.5M11.5 32.5H42.5M42.5 10.5V54.5"
      stroke={colors.primary.pink}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface BookDetailsScreenProps {
  onBack?: () => void;
}

export const BookDetailsScreen: React.FC<BookDetailsScreenProps> = ({onBack}) => {
  const [selectedMonth, setSelectedMonth] = useState('Jan 2024');
  const [totalExpenses] = useState(3578);
  const [budgetLimit] = useState(5500);
  const [cashIncome] = useState(6524656);
  const [bankIncome] = useState(7512278);
  const [cashExpense] = useState(4546525);
  const [bankExpense] = useState(5412258);

  const tripName = 'Goa Trip';
  const bookType = 'trip' as const;

  const budgetPercentage = (totalExpenses / budgetLimit) * 100;
  const percentageIncrease = 10;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {/* Top Section with Primary Color Background */}
      <View style={styles.topSection}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onBack} style={styles.headerButton}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M15 18L9 12L15 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{tripName}</Text>
              <View style={styles.headerButton} />
            </View>

            {/* Expenses Section */}
            <View style={styles.expensesSection}>
              <View style={styles.expensesHeader}>
                <View style={styles.tripTypeContainer}>
                  <BookTypeIcon type={bookType} size={24} color="white" />
                  <Text style={styles.expensesLabel}>{bookType.charAt(0).toUpperCase() + bookType.slice(1)}</Text>
                </View>
                <TouchableOpacity style={styles.monthSelector}>
                  <Text style={styles.monthText}>{selectedMonth}</Text>
                  <ChevronDownIcon />
                </TouchableOpacity>
              </View>

              <View style={styles.expensesAmountRow}>
                <Text style={styles.expensesAmount}>
                  ₹{totalExpenses.toLocaleString()}
                </Text>
                <View style={styles.percentageBadge}>
                  <Text style={styles.percentageText}>↑ {percentageIncrease}%</Text>
                </View>
              </View>

              {/* Budget Progress Bar */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, {width: `${budgetPercentage}%`}]} />
                </View>
              </View>
              <Text style={styles.budgetLimitText}>
                Monthly Budget Limit : ₹{budgetLimit.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Content Section with Gradient Background */}
          <LinearGradient
            colors={['#fdd4d2', '#fef9f9', '#e8e8e8']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.contentSection}>
            {/* Combined Income and Expenses Card */}
            <View style={styles.card}>
              {/* Income Section */}
              <View style={[styles.cardSection, {paddingBottom: spacing.lg}]}>
                <View style={styles.cardTitleRow}>
                  <IncomeIcon />
                  <Text style={styles.cardTitle}>Income</Text>
                </View>

                <View style={styles.cardAmountsRow}>
                  <View style={styles.amountBox}>
                    <View style={styles.amountLabelRow}>
                      <View style={[styles.dot, {backgroundColor: '#4ade80'}]} />
                      <Text style={styles.amountLabel}>Cash</Text>
                    </View>
                    <Text style={styles.amountValue}>
                      ₹{cashIncome.toLocaleString()}
                    </Text>
                  </View>

                  <View style={styles.amountBox}>
                    <View style={styles.amountLabelRow}>
                      <View style={[styles.dot, {backgroundColor: '#22c55e'}]} />
                      <Text style={styles.amountLabel}>Bank</Text>
                    </View>
                    <Text style={styles.amountValue}>
                      ₹{bankIncome.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Expenses Section */}
              <View style={styles.cardSection}>
                <View style={styles.cardTitleRow}>
                  <ExpenseIcon />
                  <Text style={styles.cardTitle}>Expenses</Text>
                </View>

                <View style={styles.cardAmountsRow}>
                  <View style={styles.amountBox}>
                    <View style={styles.amountLabelRow}>
                      <View style={[styles.dot, {backgroundColor: '#a78bfa'}]} />
                      <Text style={styles.amountLabel}>Cash</Text>
                    </View>
                    <Text style={styles.amountValue}>
                      ₹{cashExpense.toLocaleString()}
                    </Text>
                  </View>

                  <View style={styles.amountBox}>
                    <View style={styles.amountLabelRow}>
                      <View style={[styles.dot, {backgroundColor: '#8b5cf6'}]} />
                      <Text style={styles.amountLabel}>Bank</Text>
                    </View>
                    <Text style={styles.amountValue}>
                      ₹{bankExpense.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Add Record Button */}
            <TouchableOpacity style={styles.addRecordButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.addRecordText}>Add Record</Text>
            </TouchableOpacity>

            {/* Action Required Section */}
            <View style={styles.actionSection}>
              <Text style={styles.sectionTitle}>Action Required</Text>

              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionIconContainer}>
                  <Text style={styles.actionIcon}>🔒</Text>
                </View>
                <Text style={styles.actionText}>31 Expense Need Review</Text>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 6L15 12L9 18"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionIconContainer}>
                  <Text style={styles.actionIcon}>💰</Text>
                </View>
                <Text style={styles.actionText}>32 Reimburse Request</Text>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 6L15 12L9 18"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionIconContainer}>
                  <Text style={styles.actionIcon}>📄</Text>
                </View>
                <Text style={styles.actionText}>24 Next Bill</Text>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 6L15 12L9 18"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Recent Record Section */}
            <View style={styles.recentSection}>
              <View style={styles.recentHeader}>
                <Text style={styles.sectionTitle}>Recent Record</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All ›</Text>
                </TouchableOpacity>
              </View>
            </View>

        {/* Bottom padding */}
        <View style={{height: 100}} />
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: colors.primary.pink,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: 96,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: spacing.xs,
    marginBottom: spacing.xs,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: 'white',
  },
  expensesSection: {
    marginBottom: spacing.xs,
  },
  expensesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  expensesLabel: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: 'white',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  monthText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  expensesAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  expensesAmount: {
    fontSize: 48,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: 'white',
  },
  percentageBadge: {
    backgroundColor: colors.secondary.darkBlueGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
  },
  percentageText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: 'white',
  },
  progressBarContainer: {
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary.darkBlueGray,
    borderRadius: 4,
  },
  budgetLimitText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    marginTop: -80,
  },
  cardSection: {
    marginBottom: 0,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: spacing.md,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  pieChart: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  pieChartGreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#22c55e',
  },
  pieChartPurple: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8b5cf6',
  },
  cardAmountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  amountBox: {
    flex: 1,
    backgroundColor: `${colors.secondary.darkBlueGray}15`,
    borderRadius: 12,
    padding: spacing.sm,
  },
  amountLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  amountLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
  },
  amountValue: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  addRecordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e9d5ff',
    borderStyle: 'dashed',
    paddingVertical: spacing.lg,
    marginBottom: spacing.xl,
  },
  addRecordText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: '#8b5cf6',
  },
  actionSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionText: {
    flex: 1,
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
  },
  recentSection: {
    marginBottom: spacing.xl,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
  },
});
