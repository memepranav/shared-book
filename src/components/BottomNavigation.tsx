import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
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

const AddIcon = ({isActive}: {isActive: boolean}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2V8H20"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11V17M9 14H15"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BalanceIcon = ({isActive}: {isActive: boolean}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2V22"
      stroke={isActive ? colors.secondary.darkBlueGray : 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
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
}) => {
  const insets = useSafeAreaInsets();

  const navItems: NavItem[] = [
    {id: 'books', label: 'Books', icon: AccountingIcon},
    {id: 'notifications', label: 'Alerts', icon: NotificationIcon},
    {id: 'add', label: 'Add', icon: AddIcon},
    {id: 'balance', label: 'Balance', icon: BalanceIcon},
    {id: 'profile', label: 'Profile', icon: ProfileIcon},
  ];

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + spacing.sm,
          bottom: insets.bottom + spacing.lg,
        },
      ]}>
      <View style={styles.navContainer}>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                isActive && styles.activeNavItem,
              ]}
              onPress={() => onTabPress(item.id)}
              activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <Icon isActive={isActive} />
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
    </View>
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
    width: 340,
    height: 64,
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
  },
  activeNavItem: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 112,
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
