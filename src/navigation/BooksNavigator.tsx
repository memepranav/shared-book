import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  BooksScreen,
  BookDetailsScreen,
  PendingRecordsScreen,
  RecordDetailsScreen,
  GroupDetailsScreen,
  CreatePersonalBookScreen,
  CreateTripBookScreen,
} from '../screens/Books';

export type BooksStackParamList = {
  BooksList: undefined;
  BookDetails: {bookId: string};
  PendingRecords: undefined;
  RecordDetails: {recordId: string};
  GroupDetails: {groupId: string};
  CreatePersonalBook: undefined;
  CreateTripBook: undefined;
};

const Stack = createStackNavigator<BooksStackParamList>();

interface BooksNavigatorProps {
  onScrollDirectionChange?: (isScrollingDown: boolean) => void;
  onNavigationVisibilityChange?: (isVisible: boolean) => void;
}

export const BooksNavigator: React.FC<BooksNavigatorProps> = ({
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
          // Hide bottom navigation on detail screens
          const screensToHideNav = ['CreatePersonalBook', 'CreateTripBook', 'BookDetails', 'GroupDetails', 'PendingRecords', 'RecordDetails'];
          if (screensToHideNav.includes(currentRoute.name)) {
            onNavigationVisibilityChange?.(false);
          } else {
            onNavigationVisibilityChange?.(true);
          }
        },
      }}>
      <Stack.Screen name="BooksList">
        {(props) => (
          <BooksScreen
            {...props}
            onScrollDirectionChange={onScrollDirectionChange}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="BookDetails">
        {(props) => (
          <BookDetailsScreen
            {...props}
            onScrollDirectionChange={onScrollDirectionChange}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="PendingRecords">
        {(props) => (
          <PendingRecordsScreen
            {...props}
            onScrollDirectionChange={onScrollDirectionChange}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="RecordDetails">
        {(props) => (
          <RecordDetailsScreen
            {...props}
            onScrollDirectionChange={onScrollDirectionChange}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="GroupDetails">
        {(props) => (
          <GroupDetailsScreen
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CreatePersonalBook">
        {(props) => <CreatePersonalBookScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="CreateTripBook">
        {(props) => <CreateTripBookScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
