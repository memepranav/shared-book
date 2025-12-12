import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  BooksScreen,
  BookDetailsScreen,
  PendingRecordsScreen,
  RecordDetailsScreen,
  GroupDetailsScreen,
  CreatePersonalBookScreen,
} from '../screens/Books';

export type BooksStackParamList = {
  BooksList: undefined;
  BookDetails: {bookId: string};
  PendingRecords: undefined;
  RecordDetails: {recordId: string};
  GroupDetails: {groupId: string};
  CreatePersonalBook: undefined;
};

const Stack = createStackNavigator<BooksStackParamList>();

interface BooksNavigatorProps {
  onScrollDirectionChange?: (isScrollingDown: boolean) => void;
}

export const BooksNavigator: React.FC<BooksNavigatorProps> = ({
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
    </Stack.Navigator>
  );
};
