import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import {CustomBarChart} from '../../components/CustomBarChart';
import {colors, typography, spacing} from '../../theme';
import {BookTypeIcon, BookType} from '../../components/BookTypeIcons';

// Icons
const DownloadIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 10L12 15L17 10"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15V3"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 2V6"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 2V6"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 10H21"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <Path
      d="M5 7.5L10 12.5L15 7.5"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FilterIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6H20M7 12H17M10 18H14"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


// Avatar component
const Avatar = ({color, initials, size = 36}: {color: string; initials?: string; size?: number}) => (
  <View style={[styles.avatar, {width: size, height: size, backgroundColor: color}]}>
    {initials && <Text style={styles.avatarText}>{initials}</Text>}
  </View>
);

interface Book {
  id: string;
  name: string;
  dateAdded: string;
  amount: number;
  youOwe: number;
  type: 'spent' | 'saved';
  color: string;
  participants: number; // Number of participants for avatar display
  bookType: 'trip' | 'group' | 'personal' | 'event' | 'business' | 'savings'; // Type of book
}

// Sample data
const booksData: Book[] = [
  {
    id: '1',
    name: 'You and Lena',
    dateAdded: '15 June, 2024',
    amount: 12500,
    youOwe: 280,
    type: 'spent',
    color: '#ed5f57',
    participants: 2,
    bookType: 'personal',
  },
  {
    id: '2',
    name: 'Vacation in Rome',
    dateAdded: '13 June, 2024',
    amount: 8750,
    youOwe: 502,
    type: 'saved',
    color: '#5B9EFF',
    participants: 5,
    bookType: 'trip',
  },
  {
    id: '3',
    name: 'Household',
    dateAdded: '7 June, 2024',
    amount: 3200,
    youOwe: 72,
    type: 'saved',
    color: '#4ECDC4',
    participants: 2,
    bookType: 'group',
  },
  {
    id: '4',
    name: 'Wedding Party',
    dateAdded: '5 June, 2024',
    amount: 25000,
    youOwe: 1200,
    type: 'spent',
    color: '#FFB86C',
    participants: 8,
    bookType: 'event',
  },
  {
    id: '5',
    name: 'Office Fund',
    dateAdded: '3 June, 2024',
    amount: 5000,
    youOwe: 500,
    type: 'saved',
    color: '#A259FF',
    participants: 4,
    bookType: 'business',
  },
  {
    id: '6',
    name: 'Bike Savings',
    dateAdded: '1 June, 2024',
    amount: 45000,
    youOwe: 15000,
    type: 'saved',
    color: '#2c3e50',
    participants: 3,
    bookType: 'savings',
  },
];

// Bar chart data for different periods
const dayChartData = [
  {value: 150, label: '6am'},
  {value: 0, label: '9am'},
  {value: 450, label: '12pm'},
  {value: 800, label: '3pm'},
  {value: 200, label: '6pm'},
  {value: 650, label: '9pm'},
  {value: 300, label: '12am'},
];

const weekChartData = [
  {value: 2500, label: 'Sat'},
  {value: 1800, label: 'Sun'},
  {value: 2200, label: 'Mon'},
  {value: 3080, label: 'Tue'},
  {value: 1200, label: 'Wed'},
  {value: 1600, label: 'Thu'},
  {value: 2800, label: 'Fri'},
];

const monthChartData = [
  {value: 5200, label: 'W1'},
  {value: 8500, label: 'W2'},
  {value: 6800, label: 'W3'},
  {value: 9200, label: 'W4'},
];

interface BooksScreenProps {
  onScrollDirectionChange?: (isScrollingDown: boolean) => void;
  onBookPress?: (bookId: string) => void;
}

export const BooksScreen: React.FC<BooksScreenProps> = ({onScrollDirectionChange, onBookPress}) => {
  const [selectedCategory, setSelectedCategory] = useState('Expenses');
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedBar, setSelectedBar] = useState<number | null>(null); // No bar selected by default
  const scrollY = useRef(0);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const stickyHeaderThreshold = 380; // When header becomes sticky (adjust based on content above)
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const handleBarPress = (index: number) => {
    setSelectedBar(index);
  };

  // Get chart data based on selected period
  const getChartData = () => {
    switch (selectedPeriod) {
      case 'Day':
        return dayChartData;
      case 'Week':
        return weekChartData;
      case 'Month':
        return monthChartData;
      default:
        return weekChartData;
    }
  };

  // Reset selected bar when period changes
  useEffect(() => {
    setSelectedBar(null);
  }, [selectedPeriod]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollDiff = currentScrollY - scrollY.current;

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

    // Only trigger if scroll difference is significant (more than 5px)
    if (Math.abs(scrollDiff) > 5) {
      const isScrollingDown = scrollDiff > 0;
      onScrollDirectionChange?.(isScrollingDown);
      scrollY.current = currentScrollY;
    }
  };

  const renderStickyHeader = () => {
    return (
      <View style={styles.stickyHeaderContainer}>
        <Animated.View style={[styles.stickyHeaderBackground, {opacity: headerOpacity}]} />
        <View style={styles.booksListHeader}>
          <View>
            <Text style={styles.booksListTitle}>All Books</Text>
            <Text style={styles.booksListSubtitle}>
              {(() => {
                const totalYouOwe = booksData
                  .filter(book => book.type === 'spent')
                  .reduce((sum, book) => sum + book.youOwe, 0);
                const totalOthersOwe = booksData
                  .filter(book => book.type === 'saved')
                  .reduce((sum, book) => sum + book.youOwe, 0);

                if (totalYouOwe > totalOthersOwe) {
                  return `Total money you owe to others: ₹ ${totalYouOwe.toLocaleString('en-IN')}`;
                } else {
                  return `Total fund others owe to you: ₹ ${totalOthersOwe.toLocaleString('en-IN')}`;
                }
              })()}
            </Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        bounces={true}
        alwaysBounceVertical={false}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        stickyHeaderIndices={[2]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Books</Text>
          <TouchableOpacity style={styles.addBookButton}>
            <Text style={styles.addBookButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          {/* Filter Section Inside Chart */}
          <View style={styles.filterSection}>
            {/* Category Dropdown */}
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selectedCategory}</Text>
              <ChevronDownIcon />
            </TouchableOpacity>

            {/* Period Selector */}
            <View style={styles.periodSelector}>
              {['Day', 'Week', 'Month'].map(period => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}>
                  <Text
                    style={[
                      styles.periodText,
                      selectedPeriod === period && styles.periodTextActive,
                    ]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Chart */}
          <CustomBarChart
            data={getChartData()}
            selectedIndex={selectedBar}
            onBarPress={handleBarPress}
            primaryColor={colors.primary.pink}
            secondaryColor={colors.secondary.darkBlueGray}
            height={160}
            barWidth={30}
          />
        </View>

        {/* Sticky Header */}
        {renderStickyHeader()}

        {/* Books List */}
        <View style={styles.booksList}>
          {booksData.map(book => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookItem}
              onPress={() => onBookPress?.(book.id)}
              activeOpacity={0.7}>
              {/* Top Section: Avatars and Book Type Icon */}
              <View style={styles.bookHeader}>
                <View style={styles.avatarsContainer}>
                  {Array.from({length: Math.min(book.participants, 3)}).map((_, index) => {
                    const initials = ['AR', 'LE', 'GI'][index];
                    return (
                      <View
                        key={index}
                        style={[
                          styles.avatarWrapper,
                          index > 0 && {marginLeft: -10}
                        ]}
                      >
                        <Avatar
                          color={index === 0 ? book.color : index === 1 ? '#B4B4C4' : '#8F92A1'}
                          initials={initials}
                          size={36}
                        />
                      </View>
                    );
                  })}
                  {book.participants > 3 && (
                    <View
                      style={[
                        styles.avatarWrapper,
                        {marginLeft: -10}
                      ]}
                    >
                      <Avatar
                        color="#6B6D7A"
                        initials={`+${book.participants - 3}`}
                        size={36}
                      />
                    </View>
                  )}
                </View>
                <BookTypeIcon type={book.bookType} />
              </View>

              {/* Book Name */}
              <Text style={styles.bookName}>{book.name}</Text>

              {/* Bottom Section: Amount and Total */}
              <View style={styles.bookFooter}>
                <View style={styles.amountSection}>
                  <Text style={styles.youOweLabel}>
                    {book.type === 'spent' ? 'You owe' : 'You are owed'}
                  </Text>
                  <Text style={[styles.amountText, {color: book.type === 'spent' ? '#ed5f57' : colors.text.primary}]}>
                    ₹ {book.youOwe}
                  </Text>
                  {book.type === 'saved' && (
                    <Text style={styles.equalToText}>equal to ${Math.round(book.youOwe / 83)}</Text>
                  )}
                </View>
                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>
                    {book.type === 'spent' ? 'Total Spent' : 'Total Saved'}
                  </Text>
                  <Text style={styles.totalAmount}>
                    ₹ {book.amount.toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom padding for navigation */}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.xxl,
  },
  headerTitle: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  addBookButton: {
    backgroundColor: colors.secondary.darkBlueGray,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBookButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    lineHeight: 24,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: 0,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    flex: 1,
    marginRight: 12,
    maxWidth: '50%',
    height: 24,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    lineHeight: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 50,
    padding: 3,
    gap: 3,
    flexShrink: 0,
  },
  periodButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    minWidth: 33,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    backgroundColor: 'transparent',
  },
  periodButtonActive: {
    backgroundColor: colors.secondary.darkBlueGray,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  periodText: {
    fontSize: 11,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
    lineHeight: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  periodTextActive: {
    color: 'white',
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  stickyHeaderContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  stickyHeaderBackground: {
    position: 'absolute',
    top: -spacing.md,
    left: -spacing.lg,
    right: -spacing.lg,
    bottom: 0,
    backgroundColor: 'rgba(254, 249, 249, 0.95)',
  },
  booksList: {
    marginBottom: spacing.xl,
  },
  booksListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  booksListTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  booksListSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    color: colors.text.secondary,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 18,
  },
  avatar: {
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  bookName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  amountSection: {
    flex: 1,
  },
  youOweLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  amountText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    marginBottom: 4,
  },
  equalToText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    color: colors.text.secondary,
  },
  totalSection: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
});
