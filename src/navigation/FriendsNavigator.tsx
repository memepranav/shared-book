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
}

export const FriendsNavigator: React.FC<FriendsNavigatorProps> = ({
  onScrollDirectionChange,
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal',
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
