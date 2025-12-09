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

// Book Type Icons
const TripIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.69961 3.25C6.76139 3.25 5.92165 3.83218 5.59256 4.71079L4.64148 7.25L2.75 7.25C2.33579 7.25 2 7.58579 2 8C2 8.41421 2.33579 8.75 2.75 8.75H4.07964L4.03637 8.86552C3.14353 9.1639 2.5 10.0068 2.5 11V18C2.5 18.8284 3.17157 19.5 4 19.5C4.82843 19.5 5.5 18.8284 5.5 18V17H18.5V18C18.5 18.8284 19.1716 19.5 20 19.5C20.8284 19.5 21.5 18.8284 21.5 18V11C21.5 10.0073 20.8571 9.16474 19.965 8.86597L19.9215 8.75H21.25C21.6642 8.75 22 8.41421 22 8C22 7.58579 21.6642 7.25 21.25 7.25H19.3597L18.4086 4.71079C18.0795 3.83218 17.2398 3.25 16.3016 3.25H7.69961ZM20 11V15.5H16.75V14C16.75 12.7574 15.7426 11.75 14.5 11.75H9.5C8.25736 11.75 7.25 12.7574 7.25 14V15.5H4V11C4 10.5858 4.33579 10.25 4.75 10.25H19.25C19.6642 10.25 20 10.5858 20 11ZM18.3198 8.75H5.68141L6.99726 5.23693C7.10695 4.94406 7.38687 4.75 7.69961 4.75H16.3016C16.6143 4.75 16.8942 4.94406 17.0039 5.23693L18.3198 8.75ZM15.25 15.5H8.75V14C8.75 13.5858 9.08579 13.25 9.5 13.25H14.5C14.9142 13.25 15.25 13.5858 15.25 14V15.5Z"
      fill={colors.primary.pink}
    />
  </Svg>
);

const GroupIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.45 4.90342C12.1833 4.70342 11.8167 4.70342 11.55 4.90342L5.05 9.77842C4.86115 9.92006 4.75 10.1423 4.75 10.3784V18.4998C4.75 18.9141 5.08579 19.2498 5.5 19.2498H9V16.9998C9 15.343 10.3431 13.9998 12 13.9998C13.6569 13.9998 15 15.343 15 16.9998V19.2498H18.5C18.9142 19.2498 19.25 18.9141 19.25 18.4998V10.3784C19.25 10.1423 19.1389 9.92006 18.95 9.77842L12.45 4.90342ZM10.65 3.70342C11.45 3.10342 12.55 3.10342 13.35 3.70342L19.85 8.57842C20.4166 9.00334 20.75 9.67021 20.75 10.3784V18.4998C20.75 19.7425 19.7426 20.7498 18.5 20.7498H14.25C13.8358 20.7498 13.5 20.4141 13.5 19.9998V16.9998C13.5 16.1714 12.8284 15.4998 12 15.4998C11.1716 15.4998 10.5 16.1714 10.5 16.9998V19.9998C10.5 20.4141 10.1642 20.7498 9.75 20.7498H5.5C4.25736 20.7498 3.25 19.7425 3.25 18.4998V10.3784C3.25 9.67021 3.58344 9.00334 4.15 8.57842L10.65 3.70342Z"
      fill={colors.primary.pink}
    />
  </Svg>
);

const PersonalIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 25 24" fill="none">
    <Path
      d="M5.75 3.25C4.50736 3.25 3.5 4.25736 3.5 5.5V18.5C3.5 19.7426 4.50736 20.75 5.75 20.75H18.75C19.9926 20.75 21 19.7426 21 18.5V9.5C21 8.25736 19.9926 7.25 18.75 7.25H18.5V5.5C18.5 4.25736 17.4926 3.25 16.25 3.25H5.75ZM17 7.25H5V5.5C5 5.08579 5.33579 4.75 5.75 4.75H16.25C16.6642 4.75 17 5.08579 17 5.5V7.25ZM5 8.75H18.75C19.1642 8.75 19.5 9.08579 19.5 9.5V18.5C19.5 18.9142 19.1642 19.25 18.75 19.25H5.75C5.33579 19.25 5 18.9142 5 18.5V8.75Z"
      fill={colors.primary.pink}
    />
  </Svg>
);

const EventIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.57041 6.89746C10.0675 6.89746 10.4704 7.3004 10.4704 7.79746C10.4704 8.29452 10.0675 8.69756 9.57041 8.69756C9.07335 8.69756 8.67041 8.29462 8.67041 7.79756C8.67041 7.3005 9.07335 6.89746 9.57041 6.89746Z"
      fill={colors.primary.pink}
    />
    <Path
      d="M10.4704 10.5982C10.4704 10.1012 10.0675 9.69824 9.57041 9.69824C9.07335 9.69824 8.67041 10.1012 8.67041 10.5982C8.67041 11.0953 9.07335 11.4983 9.57041 11.4983C10.0675 11.4983 10.4704 11.0953 10.4704 10.5982Z"
      fill={colors.primary.pink}
    />
    <Path
      d="M9.57041 12.498C10.0675 12.498 10.4704 12.901 10.4704 13.398C10.4704 13.8951 10.0675 14.2981 9.57041 14.2981C9.07335 14.2981 8.67041 13.8952 8.67041 13.3981C8.67041 12.9011 9.07335 12.498 9.57041 12.498Z"
      fill={colors.primary.pink}
    />
    <Path
      d="M10.4704 16.1979C10.4704 15.7008 10.0675 15.2979 9.57041 15.2979C9.07335 15.2979 8.67041 15.7008 8.67041 16.1979C8.67041 16.6949 9.07335 17.098 9.57041 17.098C10.0675 17.098 10.4704 16.6949 10.4704 16.1979Z"
      fill={colors.primary.pink}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.91879 5.06641C4.91879 4.65219 5.25457 4.31641 5.66879 4.31641H18.3321C18.7464 4.31641 19.0821 4.65219 19.0821 5.06641C19.0821 6.4019 20.1647 7.48485 21.5001 7.48507C21.9143 7.48514 22.25 7.8209 22.25 8.23507V15.7627C22.25 16.1769 21.9143 16.5126 21.5001 16.5127C20.1646 16.5129 19.082 17.5955 19.082 18.9311C19.082 19.3453 18.7462 19.6813 18.332 19.6813H5.66879C5.25457 19.6813 4.91879 19.3455 4.91879 18.9313C4.91879 17.5956 3.83604 16.5127 2.50041 16.5127C2.0862 16.5127 1.75 16.1769 1.75 15.7627V8.23519C1.75 7.82098 2.08579 7.48519 2.5 7.48519C3.83563 7.48519 4.91879 6.40204 4.91879 5.06641ZM6.34717 5.81641C6.0444 7.37927 4.81287 8.61081 3.25 8.91357V15.0843C4.8128 15.3871 6.04429 16.6185 6.34713 18.1813H17.6537C17.9565 16.6188 19.1876 15.3875 20.75 15.0845V8.91327C19.1876 8.6102 17.9565 7.3789 17.6538 5.81641H6.34717Z"
      fill={colors.primary.pink}
    />
  </Svg>
);

const BusinessIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 25 24" fill="none">
    <Path
      d="M7.77344 5.25C7.77344 4.00736 8.7808 3 10.0234 3H14.0234C15.2661 3 16.2734 4.00736 16.2734 5.25V6H19.2736C20.5163 6 21.5236 7.00736 21.5236 8.25V17.25C21.5236 18.4926 20.5163 19.5 19.2736 19.5H4.77344C3.5308 19.5 2.52344 18.4926 2.52344 17.25V8.25C2.52344 7.00736 3.5308 6 4.77344 6H7.77344V5.25ZM14.7734 5.25C14.7734 4.83579 14.4377 4.5 14.0234 4.5H10.0234C9.60922 4.5 9.27344 4.83579 9.27344 5.25V6H14.7734V5.25ZM4.77344 7.5C4.35922 7.5 4.02344 7.83579 4.02344 8.25V10.5H9.44185C9.72271 9.90876 10.3253 9.5 11.0234 9.5H13.0234C13.7215 9.5 14.3242 9.90876 14.605 10.5H20.0236V8.25C20.0236 7.83579 19.6879 7.5 19.2736 7.5H4.77344ZM9.44185 12H4.02344V17.25C4.02344 17.6642 4.35922 18 4.77344 18H19.2736C19.6879 18 20.0236 17.6642 20.0236 17.25V12H14.605C14.3242 12.5912 13.7215 13 13.0234 13H11.0234C10.3253 13 9.72271 12.5912 9.44185 12Z"
      fill={colors.primary.pink}
    />
  </Svg>
);

const SavingsIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.56641 4C1.56641 3.58579 1.90219 3.25 2.31641 3.25H3.49696C4.61854 3.25 5.56885 4.07602 5.72504 5.18668L5.7862 5.62161H19.7507C21.3714 5.62161 22.4605 7.28344 21.8137 8.76953L19.1464 14.8979C18.789 15.719 17.9788 16.25 17.0833 16.25L7.72179 16.25C6.60021 16.25 5.6499 15.424 5.49371 14.3133L4.23965 5.39556C4.18759 5.02534 3.87082 4.75 3.49696 4.75H2.31641C1.90219 4.75 1.56641 4.41421 1.56641 4ZM5.99714 7.12161L6.9791 14.1044C7.03116 14.4747 7.34793 14.75 7.72179 14.75L17.0833 14.75C17.3818 14.75 17.6519 14.573 17.771 14.2993L20.4383 8.17092C20.6539 7.67556 20.2909 7.12161 19.7507 7.12161H5.99714Z"
      fill={colors.primary.pink}
    />
    <Path
      d="M6.03418 19.5C6.03418 18.5335 6.81768 17.75 7.78418 17.75C8.75068 17.75 9.53428 18.5335 9.53428 19.5C9.53428 20.4665 8.75078 21.25 7.78428 21.25C6.81778 21.25 6.03418 20.4665 6.03418 19.5Z"
      fill={colors.primary.pink}
    />
    <Path
      d="M16.3203 17.75C15.3538 17.75 14.5703 18.5335 14.5703 19.5C14.5703 20.4665 15.3538 21.25 16.3203 21.25C17.2868 21.25 18.0704 20.4665 18.0704 19.5C18.0704 18.5335 17.2868 17.75 16.3203 17.75Z"
      fill={colors.primary.pink}
    />
  </Svg>
);

const getBookTypeIcon = (type: 'trip' | 'group' | 'personal' | 'event' | 'business' | 'savings') => {
  switch (type) {
    case 'trip':
      return <TripIcon />;
    case 'group':
      return <GroupIcon />;
    case 'personal':
      return <PersonalIcon />;
    case 'event':
      return <EventIcon />;
    case 'business':
      return <BusinessIcon />;
    case 'savings':
      return <SavingsIcon />;
  }
};

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
}

export const BooksScreen: React.FC<BooksScreenProps> = ({onScrollDirectionChange}) => {
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
            <View key={book.id} style={styles.bookItem}>
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
                {getBookTypeIcon(book.bookType)}
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
            </View>
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
