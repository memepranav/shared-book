import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Animated, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path, Rect} from 'react-native-svg';
import {colors, spacing} from '../theme';

interface NavItem {
  id: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
  isVisible?: boolean;
}

// Icon Components
const AccountingIcon = ({isActive}: {isActive: boolean}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 9H21"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3V21"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const NotificationIcon = ({isActive}: {isActive: boolean}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FriendsIcon = ({isActive}: {isActive: boolean}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InsightsIcon = ({isActive}: {isActive: boolean}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 20V10M12 20V4M6 20V14"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({isActive}: {isActive: boolean}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
  isVisible = true,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(124)).current;
  const [isInteractive, setIsInteractive] = useState(true);

  const navItems: NavItem[] = [
    {id: 'books', label: 'Books', icon: (isActive) => <AccountingIcon isActive={isActive} />},
    {id: 'friends', label: 'Friends', icon: (isActive) => <FriendsIcon isActive={isActive} />},
    {id: 'notifications', label: 'Alerts', icon: (isActive) => <NotificationIcon isActive={isActive} />},
    {id: 'insights', label: 'Insights', icon: (isActive) => <InsightsIcon isActive={isActive} />},
    {id: 'profile', label: 'Profile', icon: (isActive) => <ProfileIcon isActive={isActive} />},
  ];

  // Calculate positions for each tab
  const getTabPosition = (index: number) => {
    // Base position + accumulated widths of previous items
    const baseSpacing = 6; // padding of navContainer
    const containerWidth = 348;
    const activeWidth = 124;

    let position = baseSpacing;
    for (let i = 0; i < index; i++) {
      position += 52; // width of inactive items
    }

    // For the last item, ensure equal right padding
    if (index === navItems.length - 1) {
      position = containerWidth - baseSpacing - activeWidth;
    }

    return position;
  };

  useEffect(() => {
    // Immediately disable interaction when hiding
    if (!isVisible) {
      setIsInteractive(false);
    }

    Animated.spring(translateY, {
      toValue: isVisible ? 0 : 150,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start(() => {
      // Enable interaction only after show animation completes
      if (isVisible) {
        setIsInteractive(true);
      }
    });
  }, [isVisible, translateY]);

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeTab);
    const targetPosition = getTabPosition(activeIndex);

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: targetPosition,
        useNativeDriver: false,
        tension: 150,
        friction: 10,
      }),
      Animated.spring(widthAnim, {
        toValue: 124,
        useNativeDriver: false,
        tension: 150,
        friction: 10,
      }),
    ]).start();
  }, [activeTab]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + spacing.sm,
          bottom: insets.bottom + spacing.lg - 15 - (Platform.OS === 'ios' ? 50 : 0),
          transform: [{translateY}],
        },
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}>
      <View style={styles.navContainer}>
        {/* Animated Background */}
        <Animated.View
          style={[
            styles.animatedBackground,
            {
              left: slideAnim,
              width: widthAnim,
            },
          ]}
        />

        {/* Nav Items */}
        {navItems.map(item => {
          const isActive = activeTab === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                isActive && styles.activeNavItem,
              ]}
              onPress={() => onTabPress(item.id)}
              activeOpacity={0.7}
              disabled={!isInteractive}>
              <View style={styles.iconContainer}>
                {item.icon(isActive)}
              </View>
              {isActive && (
                <Text style={styles.activeLabel}>
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary.pink,
    borderRadius: 50,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 348,
    height: 64,
    position: 'relative',
  },
  animatedBackground: {
    position: 'absolute',
    height: 52,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50,
    width: 52,
    height: 52,
    zIndex: 1,
  },
  activeNavItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 124,
    height: 52,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLabel: {
    color: colors.secondary.darkBlueGray,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
});
