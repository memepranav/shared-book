import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

// Book Type Icons
const TripIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 10H21M8 6V18"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GroupIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PersonalIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const getBookTypeIcon = (type: 'trip' | 'group' | 'personal') => {
  switch (type) {
    case 'trip':
      return <TripIcon />;
    case 'group':
      return <GroupIcon />;
    case 'personal':
      return <PersonalIcon />;
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
  bookType: 'trip' | 'group' | 'personal'; // Type of book
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
];

// Bar chart data (7 days)
const chartData = [
  {value: 2500, label: 'Sat'},
  {value: 1800, label: 'Sun'},
  {value: 2200, label: 'Mon'},
  {value: 3080, label: 'Tue'},
  {value: 1200, label: 'Wed'},
  {value: 1600, label: 'Thu'},
  {value: 2800, label: 'Fri'},
];

export const BooksScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Expenses');
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedBar, setSelectedBar] = useState(3); // Default to Tuesday (index 3)

  const handleBarPress = (index: number) => {
    setSelectedBar(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Books</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <DownloadIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <CalendarIcon />
            </TouchableOpacity>
          </View>
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
            data={chartData}
            selectedIndex={selectedBar}
            onBarPress={handleBarPress}
            primaryColor={colors.primary.pink}
            secondaryColor={colors.secondary.darkBlueGray}
            height={160}
            barWidth={30}
          />
        </View>

        {/* Books List */}
        <View style={styles.booksList}>
          <Text style={styles.booksListTitle}>All Books</Text>

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
                    ₹{book.youOwe}
                  </Text>
                  {book.type === 'saved' && (
                    <Text style={styles.equalToText}>equal to ${Math.round(book.youOwe / 83)}</Text>
                  )}
                </View>
                <View style={styles.totalSection}>
                  <Text style={styles.totalAmount}>
                    - ₹{book.amount.toLocaleString('en-IN')}
                  </Text>
                  <Text style={styles.totalLabel}>
                    {book.type === 'spent' ? 'Total Spent' : 'Total Saved'}
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
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: colors.secondary.darkBlueGray,
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
  },
  periodButtonActive: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  periodText: {
    fontSize: 11,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
    color: 'white',
    lineHeight: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  periodTextActive: {
    color: colors.primary.pink,
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
  booksList: {
    marginBottom: spacing.xl,
  },
  booksListTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
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
  totalAmount: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    color: colors.text.secondary,
  },
});
