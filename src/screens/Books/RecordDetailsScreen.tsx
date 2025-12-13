import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Svg, {Path, Rect} from 'react-native-svg';
import {colors, typography, spacing} from '../../theme';
import {formatINR} from '../../utils/currency';
import {BooksStackParamList} from '../../navigation/BooksNavigator';

// Icons
const BackIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke={colors.primary.pink}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 2V6"
      stroke={colors.primary.pink}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 2V6"
      stroke={colors.primary.pink}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 10H21"
      stroke={colors.primary.pink}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BillIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2V8H20"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type RecordDetailsScreenNavigationProp = StackNavigationProp<BooksStackParamList, 'RecordDetails'>;
type RecordDetailsScreenRouteProp = RouteProp<BooksStackParamList, 'RecordDetails'>;

interface RecordDetailsScreenProps {
  navigation: RecordDetailsScreenNavigationProp;
  route: RecordDetailsScreenRouteProp;
  onScrollDirectionChange?: (isScrollingDown: boolean) => void;
}

export const RecordDetailsScreen: React.FC<RecordDetailsScreenProps> = ({navigation, route, onScrollDirectionChange}) => {
  const insets = useSafeAreaInsets();
  const [totalAmount] = useState(5000);
  const [paymentDate] = useState('20 Dec 2024');
  const [billId] = useState('DAS124');
  const [vendor] = useState('Foodpanda');
  const [amount] = useState(54154);
  const [attachmentCount] = useState(3);

  // Calculate number of semicircles based on screen width
  const screenWidth = Dimensions.get('window').width;
  const semicircleWidth = 8;
  const semicircleCount = Math.ceil(screenWidth / semicircleWidth);

  const lastScrollY = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Notify parent about scroll direction for navigation visibility
    const scrollDiff = scrollY - lastScrollY.current;
    if (Math.abs(scrollDiff) > 5) {
      const isScrollingDown = scrollDiff > 0;
      onScrollDirectionChange?.(isScrollingDown);
      lastScrollY.current = scrollY;
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Secondary Color Background */}
      <View style={[styles.topSection, {backgroundColor: colors.secondary.darkBlueGray, paddingTop: insets.top + spacing.lg}]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Food Panda Bills</Text>
            </View>
          </View>

          {/* Total Amount */}
          <View style={styles.totalSection}>
            {/* Status Badge */}
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Cash</Text>
            </View>
            <Text style={styles.totalAmount}>{formatINR(totalAmount)}</Text>
            <Text style={styles.paymentDate}>Payment Date: {paymentDate}</Text>
          </View>
      </View>

      {/* Bill Edge Effect with Semi-circles */}
      <View style={styles.billEdgeContainer}>
        <View style={styles.billEdge}>
          {Array.from({length: semicircleCount}).map((_, index) => (
            <View key={index} style={styles.semicircle} />
          ))}
        </View>
      </View>

      {/* Bottom Section with White Background */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.detailsContainer}>
          {/* User Info Section */}
          <View style={styles.userInfoSection}>
            <View style={styles.avatarContainer}>
              <Image source={require('../../assets/images/avatars/1.png')} style={styles.avatarImage} resizeMode="cover" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Arun Kumar</Text>
              <Text style={styles.userSubtext}>Added at: 2:30 PM</Text>
            </View>
          </View>

          {/* Schedule Payment Section - Hidden for now, will be used in future */}
          {/* <View style={styles.scheduleSection}>
            <View style={styles.scheduleHeader}>
              <CalendarIcon />
              <Text style={styles.scheduleTitle}>Schedule Payment</Text>
            </View>
            <Text style={styles.scheduleText}>
              You have scheduled payment <Text style={styles.scheduleDateText}>{paymentDate}</Text>
            </Text>
            <TouchableOpacity style={styles.changeScheduleButton}>
              <Text style={styles.changeScheduleText}>Change Schedule</Text>
            </TouchableOpacity>
          </View> */}

          {/* Bills Details Section */}
          <View style={styles.billsSection}>
            <View style={styles.billsHeader}>
              <BillIcon />
              <Text style={styles.billsTitle}>Bills Details</Text>
            </View>

            <View style={styles.billsContent}>
              <View style={styles.billsLeft}>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Bill ID</Text>
                  <Text style={styles.billValue}>#{billId}</Text>
                </View>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Vendor</Text>
                  <Text style={styles.billValue}>{vendor}</Text>
                </View>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Total Spent</Text>
                  <Text style={styles.billValue}>{formatINR(amount)}</Text>
                </View>
              </View>

              <View style={styles.billsRight}>
                <View style={styles.receiptContainer}>
                  <Image
                    source={require('../../assets/images/bill-preview.png')}
                    style={styles.receiptImage}
                  />
                  <View style={styles.attachmentBadge}>
                    <Text style={styles.attachmentCount}>{attachmentCount}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Details Row - Full Width */}
            <View style={styles.billRowFullWidth}>
              <Text style={styles.billLabel}>Details</Text>
              <Text style={styles.billDetailsValue}>
                This expense was incurred for ordering food from Foodpanda. The bill includes 2 main courses, 1 dessert, and delivery charges.
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  topSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    marginBottom: spacing.xs,
    marginLeft: -4,
    height: 32,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    height: 32,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: 'white',
    lineHeight: 32,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: spacing.xs,
    paddingVertical: 3.2,
    borderRadius: 12,
    gap: 3.2,
    marginBottom: spacing.xs,
  },
  statusDot: {
    width: 4.8,
    height: 4.8,
    borderRadius: 2.4,
    backgroundColor: '#f59e0b',
  },
  statusText: {
    fontSize: 9.6,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  totalSection: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  billEdgeContainer: {
    backgroundColor: 'white',
    height: 4.8,
  },
  billEdge: {
    flexDirection: 'row',
    backgroundColor: colors.secondary.darkBlueGray,
    height: 4.8,
    alignItems: 'center',
  },
  semicircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginTop: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontFamily: typography.fonts.bold,
    color: 'white',
    marginBottom: spacing.xs,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  paymentDate: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  detailsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    flex: 1,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.6,
    borderColor: 'rgba(44, 62, 80, 0.2)',
    marginRight: spacing.sm,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 48,
    height: 48,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  userSubtext: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginTop: 1.6,
  },
  scheduleSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 9.6,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  scheduleTitle: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  scheduleText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  scheduleDateText: {
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  changeScheduleButton: {
    borderWidth: 1.2,
    borderColor: colors.primary.pink,
    borderRadius: 6.4,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  changeScheduleText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.primary.pink,
  },
  billsSection: {
    marginTop: spacing.sm,
  },
  billsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  billsTitle: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  billsContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  billsLeft: {
    flex: 1,
  },
  billRow: {
    marginBottom: spacing.md,
  },
  billRowFullWidth: {
    marginTop: spacing.md,
  },
  billLabel: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  billValue: {
    fontSize: 14.4,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  billDetailsValue: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    lineHeight: 19.2,
    marginTop: spacing.xs,
  },
  vendorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  splitLabel: {
    fontSize: 11.2,
    fontFamily: typography.fonts.medium,
    color: colors.primary.pink,
  },
  billsRight: {
    width: 96,
  },
  receiptContainer: {
    position: 'relative',
    width: 96,
    height: 128,
    borderRadius: 6.4,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    borderWidth: 0.8,
    borderColor: 'rgba(44, 62, 80, 0.2)',
  },
  receiptImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  attachmentBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 25.6,
    height: 25.6,
    borderRadius: 12.8,
    backgroundColor: colors.secondary.darkBlueGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentCount: {
    fontSize: 11.2,
    fontFamily: typography.fonts.bold,
    color: 'white',
  },
});
