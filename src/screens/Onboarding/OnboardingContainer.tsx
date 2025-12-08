import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {OnboardingScreen1} from './OnboardingScreen1';
import {OnboardingScreen2} from './OnboardingScreen2';
import {OnboardingScreen3} from './OnboardingScreen3';
import {OnboardingScreen4} from './OnboardingScreen4';
import {Button} from '../../components/Button';
import {colors, spacing} from '../../theme';

const {width} = Dimensions.get('window');

interface OnboardingContainerProps {
  onComplete: () => void;
}

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollToNext = () => {
    if (currentIndex < 3) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const screens = [
    {
      key: 'screen1',
      component: <OnboardingScreen1 />,
    },
    {
      key: 'screen2',
      component: <OnboardingScreen2 />,
    },
    {
      key: 'screen3',
      component: <OnboardingScreen3 />,
    },
    {
      key: 'screen4',
      component: <OnboardingScreen4 />,
    },
  ];

  const getButtonTitle = () => {
    return currentIndex === 3 ? 'Get Started' : 'Next';
  };

  const handleButtonPress = () => {
    if (currentIndex === 3) {
      onComplete();
    } else {
      scrollToNext();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={screens}
        renderItem={({item}) => (
          <View style={styles.screenContainer}>{item.component}</View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={item => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Fixed Button */}
      <View
        style={[
          styles.buttonContainer,
          {bottom: insets.bottom + spacing.xl + spacing.lg},
        ]}>
        <Button title={getButtonTitle()} onPress={handleButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    width,
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary.pink,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.background.app,
  },
  buttonContainer: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
  },
});
