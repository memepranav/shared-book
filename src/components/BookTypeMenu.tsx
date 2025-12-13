import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  Easing,
  PanResponder,
} from 'react-native';
import {BookTypeIcon, BookType} from './BookTypeIcons';
import {colors, typography, spacing} from '../theme';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const DRAG_THRESHOLD = 150; // Minimum drag distance to close

interface BookTypeOption {
  type: BookType;
  label: string;
  description: string;
}

const bookTypes: BookTypeOption[] = [
  {
    type: 'personal',
    label: 'Personal',
    description: 'Track expenses with one or two persons',
  },
  {
    type: 'trip',
    label: 'Trip',
    description: 'Split vacation and travel costs',
  },
  {
    type: 'group',
    label: 'Group',
    description: 'Share household or group expenses',
  },
  {
    type: 'event',
    label: 'Event',
    description: 'Manage party or event budgets',
  },
  {
    type: 'business',
    label: 'Business',
    description: 'Track work-related shared funds',
  },
  {
    type: 'savings',
    label: 'Savings',
    description: 'Save money together for goals',
  },
];

interface BookTypeMenuProps {
  visible: boolean;
  onClose: () => void;
  onSelectType: (type: BookType) => void;
}

export const BookTypeMenu: React.FC<BookTypeMenuProps> = ({
  visible,
  onClose,
  onSelectType,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const dragStartY = useRef(0);

  // Pan responder for drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical drags
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        dragStartY.current = (slideAnim as any)._value;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down (positive dy)
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // If dragged down more than threshold, close
        if (gestureState.dy > DRAG_THRESHOLD) {
          onClose();
        } else {
          // Spring back to original position
          Animated.spring(slideAnim, {
            toValue: 0,
            damping: 20,
            stiffness: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      // Show modal first, then animate in
      setModalVisible(true);
      // Small delay to ensure modal is rendered before animation starts
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(backdropAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 450,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }, 50);
    } else {
      // Animate out first, then hide modal
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 350,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 350,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Hide modal after animation completes
        setModalVisible(false);
      });
    }
  }, [visible, slideAnim, backdropAnim]);

  const handleSelectType = (type: BookType) => {
    onSelectType(type);
    onClose();
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent>
      {/* Backdrop - clicking outside closes menu */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.neutral.black,
              opacity: Animated.multiply(backdropAnim, 0.5),
            },
          ]}
        />
        {/* Bottom Sheet Container */}
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{translateY: slideAnim}],
            },
          ]}
          {...panResponder.panHandlers}>
          {/* Prevent clicks on sheet from closing it */}
          <Pressable>
            <View style={styles.sheetContent}>
              {/* Handle - draggable area indicator */}
              <View style={styles.handleContainer}>
                <View style={styles.handle} />
              </View>

              {/* Title */}
              <Text style={styles.title}>Create New Book</Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Book Types */}
              {bookTypes
                .filter((bookType) => bookType.type !== 'business' && bookType.type !== 'event')
                .map((bookType) => (
                  <TouchableOpacity
                    key={bookType.type}
                    style={styles.menuItem}
                    onPress={() => handleSelectType(bookType.type)}
                    activeOpacity={0.7}>
                    <View style={styles.iconContainer}>
                      <BookTypeIcon
                        type={bookType.type}
                        size={24}
                        color={colors.secondary.darkBlueGray}
                      />
                    </View>
                    <View style={styles.menuItemContent}>
                      <Text style={styles.menuItemText}>{bookType.label}</Text>
                      <Text style={styles.menuItemDescription}>
                        {bookType.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}

              {/* Bottom padding for safe area */}
              <View style={styles.bottomPadding} />
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 19.2,
    borderTopRightRadius: 19.2,
    shadowColor: colors.neutral.black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  sheetContent: {
    paddingHorizontal: spacing.md,
  },
  handleContainer: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  handle: {
    width: 48,
    height: 3.2,
    backgroundColor: colors.neutral.gray300,
    borderRadius: 2,
  },
  title: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.gray200,
    marginBottom: spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primary.pink}1A`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  bottomPadding: {
    height: 24,
  },
});
