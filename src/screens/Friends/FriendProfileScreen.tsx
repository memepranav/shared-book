import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Svg, {Path, Circle, Rect} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {colors, typography, spacing} from '../../theme';
import {formatINR} from '../../utils/currency';

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

const MoreIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="1.5" fill={colors.text.primary} />
    <Circle cx="12" cy="12" r="1.5" fill={colors.text.primary} />
    <Circle cx="12" cy="19" r="1.5" fill={colors.text.primary} />
  </Svg>
);

const SendIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 19V5M12 5L5 12M12 5L19 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ReceiveIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M12 19L19 12M12 19L5 12"
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
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ForkKnifeIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 2L18 7C18 8.66 16.66 10 15 10C13.34 10 12 8.66 12 7V2M18 2V22M18 2L21 2M12 2V22M12 2L9 2M3 2V7C3 8.66 4.34 10 6 10C7.66 10 9 8.66 9 7V2M6 10V22"
      stroke="#FF9800"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShoppingBagIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
      stroke="#5B9EFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 6H21M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
      stroke="#5B9EFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TvIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect
      x="2"
      y="7"
      width="20"
      height="15"
      rx="2"
      stroke="#A259FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 2L12 7L7 2"
      stroke="#A259FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Activity {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  status: string;
  icon: 'dinner' | 'shopping' | 'tv';
  iconBg: string;
  dotColor: string;
}

interface FriendProfileScreenProps {
  onBack?: () => void;
}

export const FriendProfileScreen: React.FC<FriendProfileScreenProps> = ({
  onBack,
}) => {
  const [friendName] = useState('Rahul Kumar');
  const [isPro] = useState(true);
  const [sharedBalance] = useState(1240.5);
  const [balancePercentage] = useState(12);
  const [groceries] = useState(820.0);
  const [utilities] = useState(420.5);

  const [activities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Weekend Dinner',
      category: 'Shared Account',
      date: 'Yesterday',
      amount: -45.0,
      status: 'You owe ₹22.50',
      icon: 'dinner',
      iconBg: '#FFF3E0',
      dotColor: '#FF9800',
    },
    {
      id: '2',
      title: 'House Supplies',
      category: 'Home Budget',
      date: 'Oct 24',
      amount: -120.8,
      status: 'Paid by Rahul',
      icon: 'shopping',
      iconBg: '#E3F2FD',
      dotColor: '#5B9EFF',
    },
    {
      id: '3',
      title: 'Netflix Share',
      category: 'Subscriptions',
      date: 'Oct 21',
      amount: 15.0,
      status: 'Settled',
      icon: 'tv',
      iconBg: '#F3E5F5',
      dotColor: '#A259FF',
    },
  ]);

  const renderActivityIcon = (type: 'dinner' | 'shopping' | 'tv') => {
    switch (type) {
      case 'dinner':
        return <ForkKnifeIcon />;
      case 'shopping':
        return <ShoppingBagIcon />;
      case 'tv':
        return <TvIcon />;
    }
  };

  const groceriesPercentage = (groceries / sharedBalance) * 100;
  const utilitiesPercentage = (utilities / sharedBalance) * 100;

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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        overScrollMode="never">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onBack} style={styles.headerButton}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Friend Profile</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <MoreIcon />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/images/avatars/1.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
            {isPro && (
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>Pro</Text>
              </View>
            )}
          </View>
          <Text style={styles.friendName}>{friendName} ✨</Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.sendButton}>
              <SendIcon />
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.receiveButton}>
              <ReceiveIcon />
              <Text style={styles.receiveButtonText}>Receive</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shared Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Shared Balance</Text>
            <View style={styles.percentageBadge}>
              <Text style={styles.percentageText}>↗ {balancePercentage}%</Text>
            </View>
          </View>
          <Text style={styles.balanceAmount}>{formatINR(sharedBalance)}</Text>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressSegment,
                {width: `${groceriesPercentage}%`, backgroundColor: colors.primary.pink},
              ]}
            />
            <View
              style={[
                styles.progressSegment,
                {width: `${utilitiesPercentage}%`, backgroundColor: colors.secondary.darkBlueGray},
              ]}
            />
          </View>

          {/* Balance Items */}
          <View style={styles.balanceItems}>
            <View style={styles.balanceItem}>
              <View style={styles.balanceItemLeft}>
                <View style={[styles.dot, {backgroundColor: colors.primary.pink}]} />
                <Text style={styles.balanceItemLabel}>Groceries</Text>
              </View>
              <Text style={styles.balanceItemAmount}>{formatINR(groceries)}</Text>
            </View>
            <View style={styles.balanceItem}>
              <View style={styles.balanceItemLeft}>
                <View style={[styles.dot, {backgroundColor: colors.secondary.darkBlueGray}]} />
                <Text style={styles.balanceItemLabel}>Utilities</Text>
              </View>
              <Text style={styles.balanceItemAmount}>{formatINR(utilities)}</Text>
            </View>
          </View>
        </View>

        {/* Send Reminder Card */}
        <View style={styles.reminderCard}>
          <View style={styles.reminderContent}>
            <View>
              <Text style={styles.reminderTitle}>Send a Reminder</Text>
              <Text style={styles.reminderText}>
                {friendName.split(' ')[0]} has pending settlements. Send a gentle nudge.
              </Text>
            </View>
            <TouchableOpacity style={styles.reminderButton}>
              <BellIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Recent Shared Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Timeline */}
          <View style={styles.timeline}>
            {activities.map((activity, index) => (
              <View key={activity.id} style={styles.timelineItem}>
                <View style={styles.timelineDotContainer}>
                  <View
                    style={[
                      styles.timelineDot,
                      {backgroundColor: activity.dotColor},
                    ]}
                  />
                  {index < activities.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>

                <View style={styles.activityCard}>
                  <View style={styles.activityLeft}>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityName}>{activity.title}</Text>
                      <Text style={styles.activityMeta}>
                        {activity.category} • {activity.date}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.activityRight}>
                    <Text
                      style={[
                        styles.activityAmount,
                        {
                          color:
                            activity.amount > 0
                              ? colors.primary.pink
                              : activity.amount < 0
                              ? '#FF5252'
                              : colors.text.secondary,
                        },
                      ]}>
                      {activity.amount > 0 ? '+' : ''}
                      {formatINR(Math.abs(activity.amount))}
                    </Text>
                    <Text style={styles.activityStatus}>{activity.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{height: 40}} />
      </ScrollView>
    </LinearGradient>
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
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    height: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  proBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary.pink,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  proBadgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.semibold,
    color: 'white',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  friendName: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary.pink,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  sendButtonText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    color: 'white',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  receiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: 'white',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
  },
  receiveButtonText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  balanceLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
  },
  percentageBadge: {
    backgroundColor: `${colors.primary.pink}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.semibold,
    color: colors.primary.pink,
  },
  balanceAmount: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    backgroundColor: colors.neutral.gray200,
  },
  progressSegment: {
    height: '100%',
    borderRadius: 4,
  },
  balanceItems: {
    gap: spacing.xs,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  balanceItemLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  balanceItemAmount: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  reminderCard: {
    backgroundColor: colors.primary.pink,
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  reminderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: 'white',
    marginBottom: spacing.xs,
  },
  reminderText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: 240,
  },
  reminderButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activitySection: {
    paddingHorizontal: spacing.lg,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  activityTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  viewAllText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.primary.pink,
  },
  timeline: {
    gap: spacing.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineDotContainer: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.neutral.gray300,
    marginTop: 4,
  },
  activityCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  activityMeta: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    marginBottom: 4,
  },
  activityStatus: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
});
