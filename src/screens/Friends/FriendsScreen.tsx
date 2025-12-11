import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Svg, {Path, Circle, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {colors, typography, spacing} from '../../theme';
import {formatINR} from '../../utils/currency';

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
const PeopleIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AddIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SearchIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle
      cx="11"
      cy="11"
      r="8"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L16.65 16.65"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckCircleIcon = ({size = 16}: {size?: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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

const BookIcon = ({color = colors.primary.pink}: {color?: string}) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z"
      stroke={color}
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

type OnlineStatus = 'online' | 'away' | 'offline';

interface Friend {
  id: string;
  name: string;
  avatarImage: any;
  sharedBooks: number;
  balance: number; // Positive = they owe you, Negative = you owe them, 0 = settled
  onlineStatus: OnlineStatus;
}

interface FriendsScreenProps {
  onBack?: () => void;
  onFriendPress?: (friendId: string) => void;
}

export const FriendsScreen: React.FC<FriendsScreenProps> = ({onBack, onFriendPress}) => {
  const scrollY = useRef(0);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const stickyHeaderThreshold = 180; // When header becomes sticky
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Rahul',
      avatarImage: avatarImages[0],
      sharedBooks: 3,
      balance: 420.0,
      onlineStatus: 'online',
    },
    {
      id: '2',
      name: 'Priya',
      avatarImage: avatarImages[1],
      sharedBooks: 1,
      balance: -125.5,
      onlineStatus: 'away',
    },
    {
      id: '3',
      name: 'Amit',
      avatarImage: avatarImages[2],
      sharedBooks: 5,
      balance: 0,
      onlineStatus: 'offline',
    },
    {
      id: '4',
      name: 'Sneha',
      avatarImage: avatarImages[3],
      sharedBooks: 2,
      balance: -850.0,
      onlineStatus: 'online',
    },
    {
      id: '5',
      name: 'Vikram',
      avatarImage: avatarImages[4],
      sharedBooks: 4,
      balance: 24.99,
      onlineStatus: 'online',
    },
    {
      id: '6',
      name: 'Anjali',
      avatarImage: avatarImages[5],
      sharedBooks: 2,
      balance: 150.0,
      onlineStatus: 'online',
    },
    {
      id: '7',
      name: 'Rohan',
      avatarImage: avatarImages[0],
      sharedBooks: 3,
      balance: -200.0,
      onlineStatus: 'online',
    },
    {
      id: '8',
      name: 'Kavya',
      avatarImage: avatarImages[1],
      sharedBooks: 1,
      balance: 75.5,
      onlineStatus: 'online',
    },
  ]);

  const topFriends = friends.slice(0, 8);

  const getStatusColor = (status: OnlineStatus): string => {
    switch (status) {
      case 'online':
        return '#4CAF50';
      case 'away':
        return '#FFB800';
      case 'offline':
        return '#B4B4C4';
    }
  };

  const getBalanceColor = (balance: number): string => {
    if (balance > 0) return '#4CAF50'; // Green for owes you
    if (balance < 0) return '#FF5252'; // Red for you owe
    return colors.text.tertiary; // Gray for settled
  };

  const getBalanceText = (balance: number): string => {
    if (balance > 0) return `+${formatINR(balance)}`;
    if (balance < 0) return `-${formatINR(Math.abs(balance))}`;
    return 'Settled';
  };

  const getStatusText = (balance: number): string => {
    if (balance > 0) return 'Owes you';
    if (balance < 0) return 'You owe';
    return 'Settled';
  };

  const getBookDotColor = (index: number): string => {
    const colors = ['#5B9EFF', '#A259FF', '#4ECDC4', '#FFB800', '#FF5252'];
    return colors[index % colors.length];
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

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

    scrollY.current = currentScrollY;
  };

  const renderStickyHeader = () => {
    return (
      <View style={styles.stickyHeaderContainer}>
        <Animated.View style={[styles.stickyHeaderBackground, {opacity: headerOpacity}]} />
        <View style={styles.friendsListHeader}>
          <View>
            <Text style={styles.friendsListTitle}>All Friends</Text>
            <Text style={styles.friendsListSubtitle}>
              Total friends: {friends.length}
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
        overScrollMode="never"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[2]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <PeopleIcon />
            <Text style={styles.headerTitle}>Friends</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Active Friends Section */}
        <View style={styles.activeFriendsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.topFriendsScroll}
            contentContainerStyle={styles.topFriendsContent}>
            {/* Search Option */}
            <TouchableOpacity style={styles.topFriendItem}>
              <View style={styles.searchAvatar}>
                <SearchIcon />
              </View>
              <Text style={styles.topFriendName}>Search</Text>
            </TouchableOpacity>

            {/* Top Friends */}
            {topFriends.map((friend) => (
              <TouchableOpacity
                key={`top-${friend.id}`}
                style={styles.topFriendItem}
                onPress={() => onFriendPress?.(friend.id)}>
                <View style={styles.topFriendAvatarContainer}>
                  <Image
                    source={friend.avatarImage}
                    style={styles.topFriendAvatar}
                    resizeMode="cover"
                  />
                  <View
                    style={[
                      styles.statusDot,
                      {backgroundColor: getStatusColor(friend.onlineStatus)},
                    ]}
                  />
                </View>
                <Text style={styles.topFriendName}>{friend.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sticky Header */}
        {renderStickyHeader()}

        {/* Friends List */}
        {friends.map((friend, index) => (
          <TouchableOpacity
            key={`friend-${friend.id}`}
            style={styles.friendCard}
            onPress={() => onFriendPress?.(friend.id)}>
            <View style={styles.friendLeft}>
              {/* Avatar with Status */}
              <View style={styles.avatarContainer}>
                <Image
                  source={friend.avatarImage}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.statusDotLarge,
                    {backgroundColor: getStatusColor(friend.onlineStatus)},
                  ]}
                />
              </View>

              {/* Name and Books */}
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <View style={styles.booksRow}>
                  <BookIcon color={getBookDotColor(index)} />
                  <Text style={styles.booksText}>
                    {friend.sharedBooks} Shared{' '}
                    {friend.sharedBooks === 1 ? 'Book' : 'Books'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Balance and Status */}
            <View style={styles.friendRight}>
              <Text
                style={[
                  styles.balanceAmount,
                  {color: getBalanceColor(friend.balance)},
                ]}>
                {getBalanceText(friend.balance)}
              </Text>
              <View style={styles.statusRow}>
                {friend.balance === 0 && <CheckCircleIcon size={14} />}
                <Text
                  style={[
                    styles.statusText,
                    {color: getBalanceColor(friend.balance)},
                  ]}>
                  {getStatusText(friend.balance)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{height: 100}} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
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
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  addButton: {
    backgroundColor: colors.secondary.darkBlueGray,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: typography.fonts.regular,
    lineHeight: 24,
  },
  activeFriendsSection: {
    marginBottom: spacing.xl,
  },
  topFriendsScroll: {
    marginBottom: 0,
  },
  topFriendsContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  topFriendItem: {
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  searchAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
    borderColor: colors.neutral.gray300,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  topFriendAvatarContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  topFriendAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'white',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
  },
  topFriendName: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
  },
  stickyHeaderContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  stickyHeaderBackground: {
    position: 'absolute',
    top: -spacing.md,
    left: -500,
    right: -500,
    bottom: 0,
    backgroundColor: 'rgba(254, 249, 249, 0.95)',
  },
  friendsListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  friendsListTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  friendsListSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  sortByText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.primary.pink,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'white',
  },
  statusDotLarge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  booksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  booksText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  friendRight: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
  },
});
