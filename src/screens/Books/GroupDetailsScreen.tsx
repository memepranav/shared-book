import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import Svg, {Path, Circle} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {colors, typography, spacing} from '../../theme';
import {formatINR} from '../../utils/currency';
import {BookTypeIcon} from '../../components/BookTypeIcons';
import {BooksStackParamList} from '../../navigation/BooksNavigator';

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

const MoreIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="1.5" fill="white" />
    <Circle cx="12" cy="12" r="1.5" fill="white" />
    <Circle cx="12" cy="19" r="1.5" fill="white" />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width="12.8" height="12.8" viewBox="0 0 20 20" fill="none">
    <Path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BarChartIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 20V10M18 20V4M6 20V16"
      stroke="#00BFA5"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OwedToYouIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04096 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7564 5.72718 21.351 5.12084 20.84 4.61V4.61Z"
      fill="#4CAF50"
    />
  </Svg>
);

const OwingByYouIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86V3.86Z"
      fill="#FF9800"
    />
    <Path
      d="M12 9V13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17H12.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckCircleIcon = () => (
  <Svg width="12.8" height="12.8" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#4CAF50" />
    <Path
      d="M9 12L11 14L15 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AlertIcon = () => (
  <Svg width="12.8" height="12.8" viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86V3.86Z"
      fill="#FF5252"
    />
    <Path
      d="M12 9V13M12 17H12.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({color = '#FF9800'}: {color?: string}) => (
  <Svg width="12.8" height="12.8" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      fill={color}
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartIcon = () => (
  <Svg width="12.8" height="12.8" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04096 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7564 5.72718 21.351 5.12084 20.84 4.61V4.61Z"
      fill="#4CAF50"
    />
  </Svg>
);

const CoinIcon = () => (
  <Svg width="12.8" height="12.8" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#FF9800" />
    <Path
      d="M12 6V18M9 9H12.5C13.163 9 13.7989 9.26339 14.2678 9.73223C14.7366 10.2011 15 10.837 15 11.5C15 12.163 14.7366 12.7989 14.2678 13.2678C13.7989 13.7366 13.163 14 12.5 14H9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Member {
  id: string;
  name: string;
  avatarImage: any;
  paid: number;
  share: number;
  status: 'settled' | 'owes_you' | 'hasnt_paid';
}

type GroupDetailsScreenNavigationProp = StackNavigationProp<BooksStackParamList, 'GroupDetails'>;
type GroupDetailsScreenRouteProp = RouteProp<BooksStackParamList, 'GroupDetails'>;

interface GroupDetailsScreenProps {
  navigation: GroupDetailsScreenNavigationProp;
  route: GroupDetailsScreenRouteProp;
}

export const GroupDetailsScreen: React.FC<GroupDetailsScreenProps> = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [groupName] = useState('Members');
  const [bookName] = useState('Goa Trip');
  const [bookType] = useState<'trip' | 'daily' | 'event' | 'group'>('trip');

  // Book Summary data
  const [totalSpent] = useState(45500);
  const [totalSettled] = useState(27300);
  const [pending] = useState(18200);
  const [owedToYou] = useState(13500);
  const [owedToYouPeople] = useState(3);
  const [owingByYou] = useState(4100);
  const [owingByYouPeople] = useState(1);
  const [netAmount] = useState(9400);

  const settledPercentage = Math.round((totalSettled / totalSpent) * 100);
  const pendingPercentage = 100 - settledPercentage;

  // Sticky header state
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const stickyHeaderThreshold = 100;

  // Animated value for button width
  const buttonWidth = useRef(new Animated.Value(1)).current; // 0 = collapsed, 1 = expanded
  const lastScrollY = useRef(0);
  const isAnimating = useRef(false);

  const members: Member[] = [
    {
      id: '1',
      name: 'Rahul Kumar',
      avatarImage: avatarImages[0],
      paid: 12000,
      share: 9100,
      status: 'settled',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatarImage: avatarImages[1],
      paid: 5000,
      share: 9100,
      status: 'owes_you',
    },
    {
      id: '3',
      name: 'Amit Patel',
      avatarImage: avatarImages[2],
      paid: 0,
      share: 9100,
      status: 'hasnt_paid',
    },
  ];

  const getBalanceInfo = (member: Member) => {
    const balance = member.paid - member.share;
    if (member.status === 'settled') {
      return {
        text: 'All payments settled',
        icon: <CheckCircleIcon />,
        color: '#4CAF50',
      };
    } else if (balance < 0) {
      return {
        text: `${member.name.split(' ')[0]} owes you ${formatINR(Math.abs(balance))}`,
        icon: <CoinIcon />,
        color: '#FF9800',
      };
    } else if (balance > 0) {
      return {
        text: `You owe ${member.name.split(' ')[0]} ${formatINR(balance)}`,
        icon: <HeartIcon />,
        color: '#4CAF50',
      };
    }
    return null;
  };

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'settled':
        return {
          icon: <CheckCircleIcon />,
          text: 'Settled',
          color: '#4CAF50',
        };
      case 'owes_you':
        return {
          icon: <BellIcon color="#FF9800" />,
          text: 'Owes You',
          color: '#FF9800',
        };
      case 'hasnt_paid':
        return {
          icon: <AlertIcon />,
          text: "Hasn't Paid",
          color: '#FF5252',
        };
    }
  };

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


  return (
    <View style={styles.container}>
      {/* Sticky Header - Only shown when scrolled and screen is focused */}
      {isFocused && showStickyHeader && (
        <View style={[styles.stickyHeaderFixed, {paddingTop: insets.top + spacing.lg}]}>
          <View style={styles.stickyHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.stickyHeaderButton}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.stickyHeaderTitle}>{groupName}</Text>
            </View>
          </View>
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
        {/* Top Section with Primary Color Background */}
        <View style={[styles.topSection, {paddingTop: insets.top + spacing.lg}]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{groupName}</Text>
            </View>
          </View>

          {/* Book Type and Total Members */}
          <View style={styles.expensesSection}>
            <View style={styles.expensesHeader}>
              <View style={styles.tripTypeContainer}>
                <BookTypeIcon type={bookType} size={19.2} color="white" />
                <Text style={styles.expensesLabel}>{bookType.charAt(0).toUpperCase() + bookType.slice(1)}</Text>
              </View>
              <View style={styles.monthSelector}>
                <Text style={styles.monthText}>{members.length} Members</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Book Summary Card */}
        <View style={styles.summaryCardWrapper}>
          <View style={styles.summaryCard}>
            {/* Header */}
            <View style={styles.summaryHeader}>
              <BarChartIcon />
              <Text style={styles.summaryTitle}>Book Summary</Text>
            </View>

            {/* Summary Rows */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Spent</Text>
              <Text style={styles.summaryValue}>{formatINR(totalSpent)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Settled</Text>
              <View style={styles.summaryRowRight}>
                <Text style={styles.summaryValue}>{formatINR(totalSettled)}</Text>
                <Text style={styles.summaryPercentage}>({settledPercentage}%)</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pending</Text>
              <View style={styles.summaryRowRight}>
                <Text style={styles.summaryValue}>{formatINR(pending)}</Text>
                <Text style={styles.summaryPercentage}>({pendingPercentage}%)</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFilled, {width: `${settledPercentage}%`}]} />
              <View style={[styles.progressBarRemaining, {width: `${pendingPercentage}%`}]} />
            </View>

            {/* Balance Cards */}
            <View style={styles.balanceCardsContainer}>
              {/* Owed to You Card */}
              <View style={styles.owedToYouCard}>
                <Text style={styles.owedToYouTitle}>Owed to You</Text>
                <Text style={styles.balanceCardAmount}>{formatINR(owedToYou)}</Text>
                <Text style={styles.balanceCardSubtext}>from {owedToYouPeople} people</Text>
              </View>

              {/* Owing by You Card */}
              <View style={styles.owingByYouCard}>
                <Text style={styles.owingByYouTitle}>Owing by You</Text>
                <Text style={styles.balanceCardAmount}>{formatINR(owingByYou)}</Text>
                <Text style={styles.balanceCardSubtext}>to {owingByYouPeople} person</Text>
              </View>
            </View>

            {/* Net Balance */}
            <View style={styles.netBalanceContainer}>
              <Text style={styles.netBalanceLabel}>Net: </Text>
              <HeartIcon />
              <Text style={styles.netBalanceValue}>You're owed {formatINR(netAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Members Section */}
        <View style={styles.membersSection}>
          <View style={styles.membersSectionHeader}>
            <Text style={styles.membersSectionTitle}>Members ({members.length})</Text>
          </View>

          {/* Members List */}
          {members.map((member) => {
            const balanceInfo = getBalanceInfo(member);
            const statusBadge = getStatusBadge(member.status);

            return (
              <View key={member.id} style={styles.memberCard}>
                  {/* Avatar and Name */}
                  <View style={styles.memberHeader}>
                    <View style={styles.avatarContainer}>
                      <Image source={member.avatarImage} style={styles.avatarImage} resizeMode="cover" />
                    </View>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <View style={styles.statusBadge}>
                      {statusBadge.icon}
                      <Text style={[styles.statusBadgeText, {color: statusBadge.color}]}>
                        {statusBadge.text}
                      </Text>
                    </View>
                  </View>

                  {/* Separator */}
                  <View style={styles.memberSeparator} />

                  {/* Payment Info */}
                  <View style={styles.paymentInfo}>
                    <Text style={styles.paymentLabel}>
                      Paid: <Text style={styles.paymentValue}>{formatINR(member.paid)}</Text>
                    </Text>
                    <Text style={styles.paymentLabel}>
                      Share: <Text style={styles.paymentValue}>{formatINR(member.share)}</Text>
                    </Text>
                  </View>

                  {/* Balance Info */}
                  {balanceInfo && (
                    <View style={styles.balanceInfo}>
                      {balanceInfo.icon}
                      <Text style={[styles.balanceText, {color: balanceInfo.color}]}>
                        {balanceInfo.text}
                      </Text>
                    </View>
                  )}

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    {member.status === 'settled' && (
                      <TouchableOpacity style={styles.viewDetailsButton}>
                        <Text style={styles.viewDetailsButtonText}>View Details</Text>
                      </TouchableOpacity>
                    )}
                    {member.status === 'owes_you' && (
                      <>
                        <TouchableOpacity style={styles.remindButton}>
                          <Text style={styles.remindButtonText}>Remind</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settleButton}>
                          <Text style={styles.settleButtonText}>Settle</Text>
                        </TouchableOpacity>
                      </>
                    )}
                    {member.status === 'hasnt_paid' && (
                      <TouchableOpacity style={styles.sendReminderButton}>
                        <Text style={styles.sendReminderButtonText}>Send Reminder</Text>
                      </TouchableOpacity>
                    )}
                  </View>
              </View>
            );
          })}
        </View>

        <View style={{height: 40}} />
      </ScrollView>

      {/* Floating Add Button - Only shown when screen is focused */}
      {isFocused && (
        <Animated.View
          style={[
            styles.floatingButton,
            {
              width: buttonWidth.interpolate({
                inputRange: [0, 1],
                outputRange: [44.8, 144], // 44.8px collapsed (circle), 144px expanded
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
              justifyContent: 'center',
              maxWidth: buttonWidth.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 96],
              }),
            }}>
            <Text style={styles.floatingButtonLabel}>Add Member</Text>
          </Animated.View>
        </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    marginBottom: spacing.xs,
    marginLeft: -4,
    height: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    height: 40,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: 'white',
    lineHeight: 32,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 0,
  },
  topSection: {
    backgroundColor: colors.primary.pink,
    paddingHorizontal: spacing.lg,
    paddingBottom: 146,
  },
  summaryCardWrapper: {
    paddingHorizontal: spacing.lg,
    marginTop: -142,
  },
  expensesSection: {
    marginTop: spacing.md,
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
    fontSize: 14.4,
    fontFamily: typography.fonts.semibold,
    color: 'white',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  monthText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  summaryTitle: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14.4,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  summaryRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  summaryPercentage: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 6.4,
    borderRadius: 3.2,
    overflow: 'hidden',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  progressBarFilled: {
    height: '100%',
    backgroundColor: colors.secondary.darkBlueGray,
  },
  progressBarRemaining: {
    height: '100%',
    backgroundColor: colors.neutral.gray300,
  },
  balanceCardsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  owedToYouCard: {
    flex: 1,
    backgroundColor: 'rgba(191, 94, 91, 0.1)',
    borderRadius: 9.6,
    padding: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  owingByYouCard: {
    flex: 1,
    backgroundColor: 'rgba(44, 62, 80, 0.1)',
    borderRadius: 9.6,
    padding: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  owedToYouTitle: {
    fontSize: 11.2,
    fontFamily: typography.fonts.semibold,
    color: '#4CAF50',
    marginBottom: 2,
  },
  owingByYouTitle: {
    fontSize: 11.2,
    fontFamily: typography.fonts.semibold,
    color: '#FF9800',
    marginBottom: 2,
  },
  balanceCardAmount: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  balanceCardSubtext: {
    fontSize: 9.6,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  netBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  netBalanceLabel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    lineHeight: 12.8 * 1.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  netBalanceValue: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: '#4CAF50',
    lineHeight: 12.8 * 1.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  membersSection: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  membersSectionHeader: {
    marginBottom: spacing.md,
  },
  membersSectionTitle: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  memberCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  memberSeparator: {
    height: 1,
    backgroundColor: colors.neutral.gray200,
    marginBottom: spacing.xs,
  },
  avatarContainer: {
    width: 38.4,
    height: 38.4,
    borderRadius: 19.2,
    borderWidth: 2,
    borderColor: 'rgba(44, 62, 80, 0.2)',
    marginRight: spacing.sm,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 38.4,
    height: 38.4,
  },
  memberName: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12.8,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 11.2,
    fontFamily: typography.fonts.semibold,
    lineHeight: 11.2 * 1.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  paymentLabel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  paymentValue: {
    fontSize: 14.4,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 0,
  },
  balanceText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    lineHeight: 12.8 * 1.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  remindButton: {
    flex: 1,
    paddingVertical: 9.6,
    borderRadius: 12.8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: colors.text.tertiary,
  },
  remindButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  settleButton: {
    flex: 1,
    paddingVertical: 9.6,
    borderRadius: 12.8,
    backgroundColor: colors.primary.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settleButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: 'white',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  sendReminderButton: {
    flex: 1,
    paddingVertical: 9.6,
    borderRadius: 12.8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: colors.text.tertiary,
  },
  sendReminderButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  viewDetailsButton: {
    flex: 1,
    paddingVertical: 9.6,
    borderRadius: 12.8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: colors.text.tertiary,
  },
  viewDetailsButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    backgroundColor: colors.secondary.darkBlueGray,
    height: 44.8,
    borderRadius: 22.4,
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
    height: 44.8,
    width: '100%',
  },
  plusCircle: {
    width: 44.8,
    height: 44.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 22.4,
    fontFamily: typography.fonts.light,
    textAlign: 'center',
    lineHeight: 22.4,
  },
  floatingButtonLabel: {
    color: 'white',
    fontSize: 11.2,
    fontFamily: typography.fonts.medium,
    lineHeight: 14.4,
    marginTop: -2,
  },
  stickyHeaderFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: colors.primary.pink,
    paddingHorizontal: spacing.lg,
    paddingBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stickyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    marginBottom: spacing.xs,
    marginLeft: -4,
    height: 40,
  },
  stickyHeaderButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyHeaderTitle: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: 'white',
    lineHeight: 32,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
