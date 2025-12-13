import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path, Circle} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {colors, typography, spacing} from '../../theme';

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
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MoreIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="1.5" fill={colors.text.primary} />
    <Circle cx="12" cy="12" r="1.5" fill={colors.text.primary} />
    <Circle cx="12" cy="19" r="1.5" fill={colors.text.primary} />
  </Svg>
);

const CoinIcon = () => (
  <Svg width="25.6" height="25.6" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#FFB800" />
    <Path
      d="M12 6V18M9 9H12.5C13.163 9 13.7989 9.26339 14.2678 9.73223C14.7366 10.2011 15 10.837 15 11.5C15 12.163 14.7366 12.7989 14.2678 13.2678C13.7989 13.7366 13.163 14 12.5 14H9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Notification {
  id: string;
  type: 'news' | 'task' | 'update';
  title: string;
  message: string;
  time: string;
  date: string;
  action?: {
    text: string;
    points?: number;
  };
  expandable?: boolean;
}

interface GroupedNotifications {
  date: string;
  notifications: Notification[];
}

interface NotificationsScreenProps {
  onBack?: () => void;
  onScrollDirectionChange?: (isScrollingDown: boolean) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onScrollDirectionChange,
}) => {
  const scrollY = useRef(0);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const stickyHeaderThreshold = 180;
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [currentVisibleDate, setCurrentVisibleDate] = useState('');
  const datePositions = useRef<{date: string; y: number}[]>([]);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'news',
      title: 'News Update',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo. adipiscing elit. Aenean commodo.',
      time: 'Just now',
      date: 'Dec 11, 2025',
      expandable: false,
    },
    {
      id: '2',
      type: 'news',
      title: 'News Update',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo...',
      time: 'Just now',
      date: 'Dec 11, 2025',
      expandable: true,
    },
    {
      id: '3',
      type: 'task',
      title: 'New Task',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo...',
      time: '2 hours ago',
      date: 'Dec 11, 2025',
      action: {
        text: 'GO',
        points: 50,
      },
    },
    {
      id: '4',
      type: 'news',
      title: 'News Update',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo...',
      time: '5 hours ago',
      date: 'Dec 11, 2025',
      expandable: true,
    },
    {
      id: '5',
      type: 'task',
      title: 'Complete Profile',
      message:
        'Add your payment details to unlock premium features and start earning rewards.',
      time: '8:30 AM',
      date: 'Dec 10, 2025',
      action: {
        text: 'GO',
        points: 100,
      },
    },
    {
      id: '6',
      type: 'news',
      title: 'System Update',
      message:
        'New features have been added to the app. Check out the latest improvements in settings.',
      time: '6:15 PM',
      date: 'Dec 10, 2025',
      expandable: false,
    },
    {
      id: '7',
      type: 'update',
      title: 'Payment Received',
      message:
        'Rahul has sent you ₹420.00 for Goa Trip expenses. View transaction details...',
      time: '3:45 PM',
      date: 'Dec 09, 2025',
      expandable: true,
    },
    {
      id: '8',
      type: 'task',
      title: 'Invite Friends',
      message:
        'Invite 3 friends and earn bonus points. Share your referral code now.',
      time: '11:20 AM',
      date: 'Dec 09, 2025',
      action: {
        text: 'INVITE',
        points: 200,
      },
    },
    {
      id: '9',
      type: 'news',
      title: 'Weekly Summary',
      message:
        'Your weekly expense summary is ready. You spent ₹2,450 this week across 3 books.',
      time: '9:00 AM',
      date: 'Dec 09, 2025',
      expandable: false,
    },
  ]);

  const groupedNotifications: GroupedNotifications[] = notifications.reduce((groups: GroupedNotifications[], notification) => {
    const existingGroup = groups.find(g => g.date === notification.date);
    if (existingGroup) {
      existingGroup.notifications.push(notification);
    } else {
      groups.push({
        date: notification.date,
        notifications: [notification],
      });
    }
    return groups;
  }, []);

  useEffect(() => {
    if (groupedNotifications.length > 0 && !currentVisibleDate) {
      setCurrentVisibleDate(groupedNotifications[0].date);
    }
  }, [groupedNotifications, currentVisibleDate]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollDiff = currentScrollY - scrollY.current;
    const shouldBeSticky = currentScrollY >= stickyHeaderThreshold;

    if (shouldBeSticky !== isHeaderSticky) {
      setIsHeaderSticky(shouldBeSticky);
      Animated.timing(headerOpacity, {
        toValue: shouldBeSticky ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    // Determine which date section is currently visible
    const positions = datePositions.current;
    if (positions.length > 0) {
      let visibleDate = positions[0].date;
      // Find the last date section that has been scrolled past
      for (let i = 0; i < positions.length; i++) {
        if (currentScrollY + stickyHeaderThreshold >= positions[i].y - 100) {
          visibleDate = positions[i].date;
        } else {
          break;
        }
      }
      if (visibleDate !== currentVisibleDate) {
        setCurrentVisibleDate(visibleDate);
      }
    }

    // Only trigger if scroll difference is significant (more than 5px)
    if (Math.abs(scrollDiff) > 5) {
      const isScrollingDown = scrollDiff > 0;
      onScrollDirectionChange?.(isScrollingDown);
    }

    scrollY.current = currentScrollY;
  };

  const renderStickyHeader = () => {
    const displayDate = currentVisibleDate || (groupedNotifications.length > 0 ? groupedNotifications[0].date : '');

    return (
      <View style={styles.stickyHeaderContainer}>
        <Animated.View style={[styles.stickyHeaderBackground, {opacity: headerOpacity}]} />
        {isHeaderSticky && (
          <View style={styles.stickyHeaderMain}>
            <View>
              <Text style={styles.stickyHeaderTitle}>Notifications</Text>
              <Text style={styles.stickyHeaderDate}>{displayDate}</Text>
            </View>
            <TouchableOpacity style={styles.headerButton}>
              <MoreIcon />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[
        colors.gradients.home.start,
        colors.gradients.home.middle,
        colors.gradients.home.end,
      ]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        overScrollMode="never"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <MoreIcon />
          </TouchableOpacity>
        </View>

        {/* Sticky Header */}
        {renderStickyHeader()}

        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {groupedNotifications.map((group, groupIndex) => (
            <View
              key={group.date}
              onLayout={(event) => {
                event.target.measure((x, y, width, height, pageX, pageY) => {
                  const index = datePositions.current.findIndex(p => p.date === group.date);
                  const position = {date: group.date, y: pageY};
                  if (index >= 0) {
                    datePositions.current[index] = position;
                  } else {
                    datePositions.current.push(position);
                    datePositions.current.sort((a, b) => a.y - b.y);
                  }
                });
              }}>
              <Text style={styles.dateHeader}>{group.date}</Text>
              {group.notifications.map((notification) => (
                <View key={notification.id} style={styles.notificationCard}>
              {/* Header */}
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>

              {/* Message */}
              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>

              {/* Action */}
              {notification.expandable && (
                <TouchableOpacity>
                  <Text style={styles.readMoreText}>Read more →</Text>
                </TouchableOpacity>
              )}

              {notification.action && (
                <View style={styles.actionContainer}>
                  <View style={styles.pointsBadge}>
                    <CoinIcon />
                    <Text style={styles.pointsText}>
                      Earn {notification.action.points} points!
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>
                      {notification.action.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{height: 80}} />
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    height: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  stickyHeaderContainer: {
    height: 0,
  },
  stickyHeaderBackground: {
    position: 'absolute',
    top: -spacing.sm,
    left: -500,
    right: -500,
    height: 100,
    backgroundColor: 'rgba(254, 249, 249, 0.95)',
  },
  stickyHeaderMain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  stickyHeaderTitle: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  stickyHeaderDate: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  notificationsList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  dateHeader: {
    fontSize: 12.8,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  notificationTime: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.tertiary,
  },
  notificationMessage: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    lineHeight: 12.8 * 1.5,
    marginBottom: spacing.xs,
  },
  readMoreText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: '#FF9800',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  pointsText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  actionButton: {
    backgroundColor: '#FF9800',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
  },
  actionButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: 'white',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
