import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomNavigation} from '../../components/BottomNavigation';
import {BooksNavigator} from '../../navigation/BooksNavigator';
import {FriendsNavigator} from '../../navigation/FriendsNavigator';
import {NotificationsScreen} from '../Notifications';
import {InsightsScreen} from '../Insights';
import {ProfileScreen} from '../Profile';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [isNavVisible, setIsNavVisible] = useState(true);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    setIsNavVisible(true);
  };

  const handleScrollDirectionChange = (isScrollingDown: boolean) => {
    setIsNavVisible(!isScrollingDown);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'books':
        return <BooksNavigator onScrollDirectionChange={handleScrollDirectionChange} />;
      case 'friends':
        return <FriendsNavigator onScrollDirectionChange={handleScrollDirectionChange} />;
      case 'notifications':
        return <NotificationsScreen onScrollDirectionChange={handleScrollDirectionChange} />;
      case 'insights':
        return <InsightsScreen onScrollDirectionChange={handleScrollDirectionChange} />;
      case 'profile':
        return <ProfileScreen onScrollDirectionChange={handleScrollDirectionChange} />;
      default:
        return <BooksNavigator onScrollDirectionChange={handleScrollDirectionChange} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.contentArea}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={handleTabPress}
        isVisible={isNavVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
  },
});
