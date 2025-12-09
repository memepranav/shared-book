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

// Book Icons
const BookIcon = ({color}: {color: string}) => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Path
      d="M6 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V26C22 26.5304 21.7893 27.0391 21.4142 27.4142C21.0391 27.7893 20.5304 28 20 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 4V28"
      stroke="white"
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
  type: 'spent' | 'saved';
  color: string;
}

// Sample data
const booksData: Book[] = [
  {
    id: '1',
    name: 'Trip to Goa',
    dateAdded: '15 June, 2024',
    amount: 12500,
    type: 'spent',
    color: '#ed5f57',
  },
  {
    id: '2',
    name: 'Family Expenses',
    dateAdded: '13 June, 2024',
    amount: 8750,
    type: 'spent',
    color: '#5B9EFF',
  },
  {
    id: '3',
    name: 'Office Lunch',
    dateAdded: '7 June, 2024',
    amount: 3200,
    type: 'saved',
    color: '#4ECDC4',
  },
  {
    id: '4',
    name: 'Monthly Savings',
    dateAdded: '1 June, 2024',
    amount: 25000,
    type: 'saved',
    color: '#A259FF',
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
          <Text style={styles.headerTitle}>Books</Text>
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
            primaryColor="#D979A0"
            secondaryColor="#7DB8FF"
            height={200}
            barWidth={42}
          />
        </View>

        {/* Books List */}
        <View style={styles.booksList}>
          <Text style={styles.booksListTitle}>June</Text>

          {booksData.map(book => (
            <View key={book.id} style={styles.bookItem}>
              <View style={styles.bookIconContainer}>
                <BookIcon color={book.color} />
              </View>

              <View style={styles.bookInfo}>
                <Text style={styles.bookName}>{book.name}</Text>
                <Text style={styles.bookDate}>{book.dateAdded}</Text>
              </View>

              <View style={styles.bookAmount}>
                <Text style={styles.amountText}>
                  {book.type === 'spent' ? '-' : '+'} ₹{book.amount.toLocaleString('en-IN')}
                </Text>
                <Text style={styles.bookType}>
                  {book.type === 'spent' ? 'Total Spent' : 'Total Saved'}
                </Text>
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
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.sizes['3xl'],
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
    paddingVertical: spacing.lg,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  bookIconContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  bookInfo: {
    flex: 1,
  },
  bookName: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  bookDate: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    color: colors.text.secondary,
  },
  bookAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  bookType: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
    color: colors.text.secondary,
  },
});
