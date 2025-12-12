import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {BottomNavigation} from '../../components/BottomNavigation';
import {BooksNavigator} from '../../navigation/BooksNavigator';
import {FriendsNavigator} from '../../navigation/FriendsNavigator';
import {NotificationsScreen} from '../Notifications';
import {InsightsScreen} from '../Insights';
import {ProfileScreen} from '../Profile';
import {colors} from '../../theme';

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
      <LinearGradient
        colors={[colors.gradients.home.start, colors.gradients.home.middle, colors.gradients.home.end]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradient}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          {/* Content Area */}
          <View style={styles.contentArea}>
            {renderContent()}
          </View>

          {/* Bottom Navigation */}
          <BottomNavigation
            activeTab={activeTab}
            onTabPress={handleTabPress}
            isVisible={isNavVisible}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
  },
});
