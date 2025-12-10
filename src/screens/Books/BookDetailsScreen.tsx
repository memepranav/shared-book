import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {colors, typography, spacing} from '../../theme';
import {BookTypeIcon} from '../../components/BookTypeIcons';
import {AvatarGroup} from '../../components/AvatarGroup';
import {formatINR} from '../../utils/currency';

// Avatar images
const avatarImages = [
  require('../../assets/images/avatars/1.png'),
  require('../../assets/images/avatars/2.png'),
  require('../../assets/images/avatars/3.png'),
  require('../../assets/images/avatars/4.png'),
  require('../../assets/images/avatars/5.png'),
  require('../../assets/images/avatars/6.png'),
];

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
  <Svg width="20" height="20" viewBox="0 0 64 64" fill="none">
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
  <Svg width="20" height="20" viewBox="0 0 64 64" fill="none">
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
  onPendingRecordsPress?: () => void;
}

export const BookDetailsScreen: React.FC<BookDetailsScreenProps> = ({onBack, onPendingRecordsPress}) => {
  const [selectedMonth, setSelectedMonth] = useState('Jan 2024');
  const [totalExpenses] = useState(2578000);
  const [budgetLimit] = useState(5500);
  const [cashIncome] = useState(6524656);
  const [bankIncome] = useState(7512278);
  const [cashExpense] = useState(4546525);
  const [bankExpense] = useState(5412258);

  const tripName = 'Goa Trip';
  const bookType = 'trip' as const;

  const budgetPercentage = (totalExpenses / budgetLimit) * 100;
  const percentageIncrease = 10;

  // Animated value for button width
  const buttonWidth = useRef(new Animated.Value(1)).current; // 0 = collapsed, 1 = expanded
  const lastScrollY = useRef(0);
  const isAnimating = useRef(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const stickyHeaderThreshold = 100;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Show/hide sticky header
    if (scrollY >= stickyHeaderThreshold && !showStickyHeader) {
      setShowStickyHeader(true);
    } else if (scrollY < stickyHeaderThreshold && showStickyHeader) {
      setShowStickyHeader(false);
    }

    // Don't interrupt ongoing animation
    if (isAnimating.current) {
      lastScrollY.current = scrollY;
      return;
    }

    // Collapse button when scrolling down past 50px
    if (scrollY > 50 && lastScrollY.current <= 50) {
      isAnimating.current = true;
      Animated.timing(buttonWidth, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start(() => {
        isAnimating.current = false;
      });
    } else if (scrollY <= 50 && lastScrollY.current > 50) {
      isAnimating.current = true;
      Animated.timing(buttonWidth, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start(() => {
        isAnimating.current = false;
      });
    }

    lastScrollY.current = scrollY;
  };

  const renderStickyHeader = () => {
    return (
      <View style={styles.stickyHeaderContainer}>
        <LinearGradient
          colors={[colors.primary.pink, colors.primary.pink]}
          style={styles.stickyHeaderGradient}>
          <View style={styles.stickyHeaderContent}>
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
            <Text style={styles.stickyHeaderTitle}>{tripName}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header - Only shown when scrolled */}
      {showStickyHeader && (
        <View style={styles.stickyHeaderFixed}>
          {renderStickyHeader()}
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never">
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
                  {formatINR(totalExpenses)}
                </Text>
                <AvatarGroup
                  members={[
                    {image: avatarImages[0], color: '#FF6B9D'},
                    {image: avatarImages[1], color: '#4ECDC4'},
                    {image: avatarImages[2], color: '#FFE66D'},
                    {image: avatarImages[3], color: '#B4B4C4'},
                    {image: avatarImages[4], color: '#8F92A1'},
                    {image: avatarImages[5], color: '#6B6D7A'},
                  ]}
                  maxVisible={3}
                  size={44}
                  borderColor={colors.primary.pink}
                  overlap={22}
                />
              </View>

              {/* Budget Progress Bar */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, {width: `${budgetPercentage}%`}]} />
                </View>
              </View>
              <Text style={styles.budgetLimitText}>
                Monthly Budget Limit : {formatINR(budgetLimit)}
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
                      {formatINR(cashIncome)}
                    </Text>
                  </View>

                  <View style={styles.amountBox}>
                    <View style={styles.amountLabelRow}>
                      <View style={[styles.dot, {backgroundColor: '#22c55e'}]} />
                      <Text style={styles.amountLabel}>Bank</Text>
                    </View>
                    <Text style={styles.amountValue}>
                      {formatINR(bankIncome)}
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
                      {formatINR(cashExpense)}
                    </Text>
                  </View>

                  <View style={styles.amountBox}>
                    <View style={styles.amountLabelRow}>
                      <View style={[styles.dot, {backgroundColor: '#8b5cf6'}]} />
                      <Text style={styles.amountLabel}>Bank</Text>
                    </View>
                    <Text style={styles.amountValue}>
                      {formatINR(bankExpense)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Pending Transactions Card */}
            <TouchableOpacity style={styles.pendingCard} onPress={onPendingRecordsPress}>
              <Text style={styles.pendingCardText}>Pending Records (10)</Text>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>

            {/* Recent Record Section */}
            <View style={styles.recentSection}>
              <View style={styles.recentHeader}>
                <Text style={styles.sectionTitle}>Recent Record</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All ›</Text>
                </TouchableOpacity>
              </View>

              {/* Dec 08, 2023 */}
              <Text style={styles.dateHeader}>Dec 08, 2023</Text>
              <View style={styles.transactionCard}>
                <View style={styles.avatarColumn}>
                  <Image source={avatarImages[0]} style={styles.transactionAvatarImage} resizeMode="cover" />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>Hotel Booking</Text>
                  <Text style={styles.transactionMeta}>Added by Arun @ 2:30 PM</Text>
                </View>
                <View style={styles.transactionRight}>
                  <ExpenseIcon />
                  <Text style={styles.transactionAmount}>{formatINR(15450)}</Text>
                </View>
              </View>

              {/* Dec 07, 2023 */}
              <Text style={styles.dateHeader}>Dec 07, 2023</Text>
              <View style={styles.transactionCard}>
                <View style={styles.avatarColumn}>
                  <Image source={avatarImages[1]} style={styles.transactionAvatarImage} resizeMode="cover" />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>Dinner Split Payment</Text>
                  <Text style={styles.transactionMeta}>Added by Sanjay @ 8:45 PM</Text>
                </View>
                <View style={styles.transactionRight}>
                  <IncomeIcon />
                  <Text style={[styles.transactionAmount, {color: '#22c55e'}]}>{formatINR(2340)}</Text>
                </View>
              </View>

              <View style={styles.transactionCard}>
                <View style={styles.avatarColumn}>
                  <Image source={avatarImages[3]} style={styles.transactionAvatarImage} resizeMode="cover" />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>Fuel Expense</Text>
                  <Text style={styles.transactionMeta}>Added by Manoj @ 3:15 PM</Text>
                </View>
                <View style={styles.transactionRight}>
                  <ExpenseIcon />
                  <Text style={styles.transactionAmount}>{formatINR(3200)}</Text>
                </View>
              </View>

              {/* Dec 06, 2023 */}
              <Text style={styles.dateHeader}>Dec 06, 2023</Text>
              <View style={styles.transactionCard}>
                <View style={styles.avatarColumn}>
                  <Image source={avatarImages[4]} style={styles.transactionAvatarImage} resizeMode="cover" />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>Cab Fare Reimbursement</Text>
                  <Text style={styles.transactionMeta}>Added by John @ 11:20 AM</Text>
                </View>
                <View style={styles.transactionRight}>
                  <IncomeIcon />
                  <Text style={[styles.transactionAmount, {color: '#22c55e'}]}>{formatINR(850)}</Text>
                </View>
              </View>
            </View>

        {/* Bottom padding */}
        <View style={{height: 100}} />
      </LinearGradient>
      </ScrollView>

      {/* Floating Add Button */}
      <Animated.View
        style={[
          styles.floatingButton,
          {
            width: buttonWidth.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 140], // 40px collapsed, 140px expanded
            }),
          },
        ]}>
        <TouchableOpacity style={styles.floatingButtonInner}>
          <View style={styles.plusCircle}>
            <Text style={styles.floatingButtonText}>+</Text>
          </View>
          <Animated.View
            style={{
              opacity: buttonWidth,
              overflow: 'hidden',
              maxWidth: buttonWidth.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
              }),
            }}>
            <Text style={styles.floatingButtonLabel}> Add Record</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeaderFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  stickyHeaderContainer: {
    backgroundColor: colors.primary.pink,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stickyHeaderGradient: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  stickyHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stickyHeaderTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: 'white',
    lineHeight: typography.sizes.xl * 1.2,
  },
  scrollView: {
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
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 0,
    paddingBottom: spacing.xs,
    marginBottom: spacing.xs,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: 'white',
    lineHeight: typography.sizes.xl * 1.2,
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
    color: 'rgba(255, 255, 255, 0.7)',
  },
  expensesAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  expensesAmount: {
    fontSize: 30,
    fontFamily: typography.fonts.bold,
    color: 'white',
    includeFontPadding: false,
    textAlignVertical: 'center',
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
    color: colors.text.secondary,
  },
  amountValue: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  pendingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pendingCardText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
    flex: 1,
  },
  viewAllText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.primary.pink,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: 0,
  },
  recentSection: {
    marginBottom: spacing.xl,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAllText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text.secondary,
  },
  dateHeader: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: `${colors.secondary.darkBlueGray}15`,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginHorizontal: -spacing.lg,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  transactionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: spacing.sm,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarColumn: {
    alignItems: 'center',
  },
  transactionAvatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  transactionMeta: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  transactionAmount: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.primary.pink,
  },
  floatingButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    backgroundColor: colors.secondary.darkBlueGray,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  floatingButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    width: '100%',
  },
  plusCircle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: typography.fonts.regular,
    lineHeight: 24,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  floatingButtonLabel: {
    color: 'white',
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
