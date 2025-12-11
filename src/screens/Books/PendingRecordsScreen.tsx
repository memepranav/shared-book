import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {colors, typography, spacing} from '../../theme';
import {formatINR} from '../../utils/currency';

// Avatar images
const avatarImages = [
  require('../../assets/images/avatars/1.png'),
  require('../../assets/images/avatars/2.png'),
  require('../../assets/images/avatars/3.png'),
  require('../../assets/images/avatars/4.png'),
];

// Icons
const BackIcon = ({color = colors.text.primary}: {color?: string}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AttachmentIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 21.9983 8.005 21.9983C6.41277 21.9983 4.88581 21.3658 3.76 20.24C2.63419 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63419 12.8758 3.76 11.75L12.33 3.18C13.0806 2.42944 14.0948 2.00671 15.155 2.00671C16.2152 2.00671 17.2294 2.42944 17.98 3.18C18.7306 3.93056 19.1533 4.94476 19.1533 6.005C19.1533 7.06524 18.7306 8.07944 17.98 8.83L9.41 17.4C9.03472 17.7753 8.52763 17.9866 8 17.9866C7.47237 17.9866 6.96528 17.7753 6.59 17.4C6.21472 17.0247 6.00339 16.5176 6.00339 15.99C6.00339 15.4624 6.21472 14.9553 6.59 14.58L15.07 6.1"
      stroke={colors.primary.pink}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ExpenseArrow = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19L5 12L12 5"
      stroke="#ed5f57"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IncomeArrow = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12H19M12 5L19 12L12 19"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface PendingRecordsScreenProps {
  onBack?: () => void;
  onRecordPress?: () => void;
  onScrollDirectionChange?: (isScrollingDown: boolean) => void;
}

export const PendingRecordsScreen: React.FC<PendingRecordsScreenProps> = ({onBack, onRecordPress, onScrollDirectionChange}) => {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const stickyHeaderThreshold = 100;
  const lastScrollY = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Show/hide sticky header
    if (scrollY >= stickyHeaderThreshold && !showStickyHeader) {
      setShowStickyHeader(true);
    } else if (scrollY < stickyHeaderThreshold && showStickyHeader) {
      setShowStickyHeader(false);
    }

    // Notify parent about scroll direction for navigation visibility
    const scrollDiff = scrollY - lastScrollY.current;
    if (Math.abs(scrollDiff) > 5) {
      const isScrollingDown = scrollDiff > 0;
      onScrollDirectionChange?.(isScrollingDown);
      lastScrollY.current = scrollY;
    }
  };

  const renderStickyHeader = () => {
    return (
      <View style={styles.stickyHeaderContainer}>
        <LinearGradient
          colors={[colors.primary.pink, colors.primary.pink]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.stickyHeaderGradient}>
          <View style={styles.stickyHeaderContent}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <BackIcon color="white" />
            </TouchableOpacity>
            <Text style={styles.stickyHeaderTitle}>Pending Records</Text>
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
        overScrollMode="never">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pending Records</Text>
        </View>

            {/* Detailed Card 1 */}
              <View style={styles.detailedCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                      <Image source={avatarImages[0]} style={styles.avatarImage} resizeMode="cover" />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>Arun Kumar</Text>
                      <Text style={styles.userDepartment}>Added at: 2:30 PM</Text>
                    </View>
                  </View>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateDay}>08</Text>
                    <Text style={styles.dateMonth}>Dec</Text>
                  </View>
                </View>

                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionTitle}>Hotel Booking</Text>
                  <Text style={styles.expenseAmount}>{formatINR(15450)}</Text>
                </View>

                <View style={styles.linkRow}>
                  <View style={styles.linkLeft}>
                    <AttachmentIcon />
                    <Text style={styles.linkText}>Attachments (1)</Text>
                  </View>
                  <Text style={styles.viewLink}>View</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.rejectText}>✕ Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.approveButton}>
                    <Text style={styles.approveText}>✓ Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>

            {/* Card 2 */}
              <View style={styles.detailedCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                      <Image source={avatarImages[1]} style={styles.avatarImage} resizeMode="cover" />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>Priya Sharma</Text>
                      <Text style={styles.userDepartment}>Added at: 11:15 AM</Text>
                    </View>
                  </View>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateDay}>07</Text>
                    <Text style={styles.dateMonth}>Dec</Text>
                  </View>
                </View>

                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionTitle}>Team Dinner</Text>
                  <Text style={styles.expenseAmount}>{formatINR(4500)}</Text>
                </View>

                <View style={styles.linkRow}>
                  <View style={styles.linkLeft}>
                    <AttachmentIcon />
                    <Text style={styles.linkText}>Attachments (2)</Text>
                  </View>
                  <Text style={styles.viewLink}>View</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.rejectText}>✕ Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.approveButton}>
                    <Text style={styles.approveText}>✓ Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>

            {/* Card 3 */}
              <View style={styles.detailedCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                      <Image source={avatarImages[2]} style={styles.avatarImage} resizeMode="cover" />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>Rajesh Patel</Text>
                      <Text style={styles.userDepartment}>Added at: 9:45 AM</Text>
                    </View>
                  </View>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateDay}>06</Text>
                    <Text style={styles.dateMonth}>Dec</Text>
                  </View>
                </View>

                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionTitle}>Office Supplies</Text>
                  <Text style={styles.expenseAmount}>{formatINR(2800)}</Text>
                </View>

                <View style={styles.linkRow}>
                  <View style={styles.linkLeft}>
                    <AttachmentIcon />
                    <Text style={styles.linkText}>Attachments (3)</Text>
                  </View>
                  <Text style={styles.viewLink}>View</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.rejectText}>✕ Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.approveButton}>
                    <Text style={styles.approveText}>✓ Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>

            {/* Card 4 */}
              <View style={styles.detailedCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                      <Image source={avatarImages[3]} style={styles.avatarImage} resizeMode="cover" />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>Sneha Reddy</Text>
                      <Text style={styles.userDepartment}>Added at: 4:20 PM</Text>
                    </View>
                  </View>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateDay}>05</Text>
                    <Text style={styles.dateMonth}>Dec</Text>
                  </View>
                </View>

                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionTitle}>Client Meeting Lunch</Text>
                  <Text style={styles.expenseAmount}>{formatINR(6750)}</Text>
                </View>

                <View style={styles.linkRow}>
                  <View style={styles.linkLeft}>
                    <AttachmentIcon />
                    <Text style={styles.linkText}>Attachments (1)</Text>
                  </View>
                  <Text style={styles.viewLink}>View</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.rejectText}>✕ Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.approveButton}>
                    <Text style={styles.approveText}>✓ Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>

        {/* Bottom padding */}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 0,
    paddingBottom: spacing.xs,
    marginBottom: spacing.xs,
    height: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    lineHeight: typography.sizes.xl * 1.2,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  detailedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(44, 62, 80, 0.2)',
    marginRight: spacing.md,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 60,
    height: 60,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: 'white',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  userDepartment: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginTop: 2,
  },
  dateBadge: {
    backgroundColor: 'rgba(44, 62, 80, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 50,
  },
  dateDay: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.secondary.darkBlueGray,
    lineHeight: typography.sizes.xl,
  },
  dateMonth: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    color: colors.secondary.darkBlueGray,
    marginTop: -2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: 4,
  },
  transactionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expenseAmount: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: '#ed5f57',
  },
  incomeAmount: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: '#22c55e',
  },
  addedAt: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  linkText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
  },
  viewLink: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    color: colors.primary.pink,
  },
  disabledText: {
    color: colors.text.tertiary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.text.tertiary,
  },
  rejectText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
  },
  approveButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.primary.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: 'white',
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
    height: 40,
  },
  stickyHeaderTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: 'white',
    lineHeight: typography.sizes.xl * 1.2,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
