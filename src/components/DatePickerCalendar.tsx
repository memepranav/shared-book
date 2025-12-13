import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors, typography, spacing} from '../theme';

interface DatePickerCalendarProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
  title?: string;
}

export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  visible,
  onClose,
  onConfirm,
  initialDate = new Date(),
  title = 'Select Date',
}) => {
  const [tempDate, setTempDate] = useState(initialDate);

  const handleConfirm = () => {
    onConfirm(tempDate);
    onClose();
  };

  const handleCancel = () => {
    setTempDate(initialDate);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}>
      <Pressable style={styles.modalBackdrop} onPress={handleCancel}>
        <Pressable style={styles.datePickerContainer} onPress={(e) => e.stopPropagation()}>
          <View>
            <View style={styles.datePickerHeader}>
              <Text style={styles.datePickerTitle}>{title}</Text>
            </View>

            <View style={styles.datePickerContent}>
              {/* Month/Year Controls */}
              <View style={styles.monthYearRow}>
                <TouchableOpacity
                  onPress={() => {
                    const newDate = new Date(tempDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setTempDate(newDate);
                  }}
                  style={styles.monthButton}>
                  <Text style={styles.monthButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.monthYearText}>
                  {tempDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const newDate = new Date(tempDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setTempDate(newDate);
                  }}
                  style={styles.monthButton}>
                  <Text style={styles.monthButtonText}>›</Text>
                </TouchableOpacity>
              </View>

              {/* Day Grid */}
              <View style={styles.daysGrid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <Text key={day} style={styles.dayHeader}>{day}</Text>
                ))}
                {(() => {
                  const year = tempDate.getFullYear();
                  const month = tempDate.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const days = [];

                  // Empty cells before first day
                  for (let i = 0; i < firstDay; i++) {
                    days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
                  }

                  // Days of month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const isSelected = tempDate.getDate() === day;
                    days.push(
                      <TouchableOpacity
                        key={day}
                        style={[styles.dayCell, isSelected && styles.selectedDayCell]}
                        onPress={() => {
                          const newDate = new Date(tempDate);
                          newDate.setDate(day);
                          setTempDate(newDate);
                        }}>
                        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  }

                  return days;
                })()}
              </View>
            </View>

            <View style={styles.datePickerActions}>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={handleCancel}>
                <Text style={styles.datePickerButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.datePickerButton, styles.datePickerButtonConfirm]}
                onPress={handleConfirm}>
                <Text style={styles.datePickerButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  datePickerContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    paddingBottom: spacing.md,
  },
  datePickerHeader: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  datePickerTitle: {
    fontSize: 16,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  datePickerContent: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  monthYearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    width: '95%',
  },
  monthButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthButtonText: {
    fontSize: 24,
    fontFamily: typography.fonts.bold,
    color: colors.primary.pink,
  },
  monthYearText: {
    fontSize: 14.4,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
  },
  dayHeader: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
    paddingVertical: spacing.sm,
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xs,
  },
  selectedDayCell: {
    backgroundColor: colors.primary.pink,
    borderRadius: 22,
  },
  dayText: {
    fontSize: 14,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    textAlign: 'center',
  },
  selectedDayText: {
    color: colors.neutral.white,
    fontFamily: typography.fonts.semibold,
  },
  datePickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  datePickerButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerButtonConfirm: {
    backgroundColor: colors.primary.pink,
  },
  datePickerButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.neutral.white,
    textAlign: 'center',
  },
  datePickerButtonTextCancel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
