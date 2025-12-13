import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {FriendsScreen, FriendProfileScreen} from '../screens/Friends';

export type FriendsStackParamList = {
  FriendsList: undefined;
  FriendProfile: {friendId: string};
};

const Stack = createStackNavigator<FriendsStackParamList>();

interface FriendsNavigatorProps {
  onScrollDirectionChange?: (isScrollingDown: boolean) => void;
  onNavigationVisibilityChange?: (isVisible: boolean) => void;
}

export const FriendsNavigator: React.FC<FriendsNavigatorProps> = ({
  onScrollDirectionChange,
  onNavigationVisibilityChange,
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal',
      }}
      screenListeners={{
        state: (e) => {
          const state = e.data.state;
          const currentRoute = state.routes[state.index];
          // Hide bottom navigation on FriendProfile screen
          if (currentRoute.name === 'FriendProfile') {
            onNavigationVisibilityChange?.(false);
          } else {
            onNavigationVisibilityChange?.(true);
          }
        },
      }}>
      <Stack.Screen name="FriendsList">
        {(props) => (
          <FriendsScreen
            {...props}
            onScrollDirectionChange={onScrollDirectionChange}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="FriendProfile">
        {(props) => <FriendProfileScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
