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
  Platform,
} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import {CustomBarChart} from '../../components/CustomBarChart';
import {colors, typography, spacing} from '../../theme';
import {BookTypeIcon, BookType} from '../../components/BookTypeIcons';
import {AvatarGroup} from '../../components/AvatarGroup';
import {formatINR} from '../../utils/currency';
import {BookTypeMenu} from '../../components/BookTypeMenu';

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

const BooksIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 9H21"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3V21"
      stroke={colors.text.primary}
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
  onGroupDetailsPress?: () => void;
  onCreatePersonalBook?: () => void;
}

export const BooksScreen: React.FC<BooksScreenProps> = ({onScrollDirectionChange, onBookPress, onGroupDetailsPress, onCreatePersonalBook}) => {
  const [selectedCategory, setSelectedCategory] = useState('Expenses');
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedBar, setSelectedBar] = useState<number | null>(null); // No bar selected by default
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const scrollY = useRef(0);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const stickyHeaderThreshold = 380; // When header becomes sticky (adjust based on content above)
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const handleBarPress = (index: number) => {
    setSelectedBar(index);
  };

  const handleAddBookPress = () => {
    setIsMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  const handleSelectBookType = (type: BookType) => {
    console.log('Selected book type:', type);

    if (type === 'personal') {
      onCreatePersonalBook?.();
    } else {
      // TODO: Navigate to create book screen for other types
      console.log('Create book screen for type:', type);
    }
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
                  return `Total money you owe to others: ${formatINR(totalYouOwe)}`;
                } else {
                  return `Total fund others owe to you: ${formatINR(totalOthersOwe)}`;
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
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        stickyHeaderIndices={[2]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <BooksIcon />
            <Text style={styles.headerTitle}>My Books</Text>
          </View>
          <TouchableOpacity
            style={styles.addBookButton}
            onPress={handleAddBookPress}
            activeOpacity={0.7}>
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
              {/* Header Section */}
              <View style={styles.bookHeader}>
                <View style={styles.bookTitleRow}>
                  <BookTypeIcon type={book.bookType} size={30} />
                  <Text style={styles.bookName} numberOfLines={1} ellipsizeMode="tail">{book.name}</Text>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    onGroupDetailsPress?.();
                  }}
                  activeOpacity={0.7}>
                  <AvatarGroup
                    members={Array.from({length: book.participants}).map((_, i) => ({
                      image: avatarImages[i % avatarImages.length],
                      color: book.color,
                    }))}
                    maxVisible={2}
                    size={44}
                    borderColor={colors.primary.pink}
                    overlap={25}
                  />
                </TouchableOpacity>
              </View>

              {/* Separator */}
              <View style={styles.separator} />

              {/* Balance and Total Section */}
              <View style={styles.bookBalanceRow}>
                <View style={styles.balanceSection}>
                  <Text style={styles.balanceLabel}>Your Balance</Text>
                  <Text style={[styles.balanceAmount, {color: book.type === 'spent' ? '#ed5f57' : '#4ade80'}]}>
                    {book.type === 'spent' ? '-' : '+'}{formatINR(book.youOwe)}
                  </Text>
                  <Text style={styles.balanceSubtext}>
                    Approx. ${Math.round(book.youOwe / 83).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>Total Saved</Text>
                  <Text style={styles.totalAmount}>
                    {formatINR(book.amount)}
                  </Text>
                  <Text style={styles.totalSubtext}>
                    Projected: {formatINR(Math.round(book.amount * 1.15))}
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, {width: `${(book.amount / (book.amount * 1.15)) * 100}%`}]} />
                </View>
                <Text style={styles.progressText}>
                  Savings Progress: {Math.round((book.amount / (book.amount * 1.15)) * 100)}% complete
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom padding for navigation */}
        <View style={{height: 100}} />
      </ScrollView>

      {/* Book Type Menu */}
      <BookTypeMenu
        visible={isMenuVisible}
        onClose={handleCloseMenu}
        onSelectType={handleSelectBookType}
      />
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
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    minHeight: 44,
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
    fontSize: 28,
    fontFamily: typography.fonts.light,
    textAlign: 'center',
    lineHeight: 28,
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
    color: colors.text.primary,
    lineHeight: 16,
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
    color: colors.text.secondary,
    lineHeight: 16,
  },
  periodTextActive: {
    color: 'white',
    fontFamily: typography.fonts.semibold,
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
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
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  booksListSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
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
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bookTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    marginRight: spacing.sm,
  },
  bookName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: spacing.md,
  },
  bookBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  balanceSection: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    marginBottom: 2,
  },
  balanceSubtext: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  totalSection: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  totalSubtext: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  progressBarContainer: {
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary.darkBlueGray,
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
