import React, { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

interface CalendarIndicator<T> {
  predicate: (item: T) => boolean;
  color: string;
}

interface CalendarLegendItem {
  color: string;
  label: string;
}

interface CalendarViewProps<T> {
  items: T[];
  getItemDate: (item: T) => Date | undefined;
  indicators: CalendarIndicator<T>[];
  legendItems: CalendarLegendItem[];
  onDateSelect: (date: Date) => void;
}

export function CalendarView<T>({ items, getItemDate, indicators, legendItems, onDateSelect }: CalendarViewProps<T>) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getItemsForDate = (date: Date): T[] => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return items.filter((item) => {
      const itemDate = getItemDate(item);
      if (!itemDate) return false;
      const normalizedDate = new Date(itemDate);
      normalizedDate.setHours(0, 0, 0, 0);
      return normalizedDate.getTime() === targetDate.getTime();
    });
  };

  const goToPreviousMonth = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} className="w-[14.28%] aspect-square p-1" />);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
      const dayItems = getItemsForDate(date);
      
      // Evaluate all indicators for this day's items
      const activeIndicators = indicators.filter(indicator =>
        dayItems.some(item => indicator.predicate(item))
      );

      days.push(
        <Pressable
          key={day}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setSelectedDate(date);
            onDateSelect(date);
          }}
          className="w-[14.28%] aspect-square p-1">
          <View
            className={`flex-1 items-center justify-center rounded-lg relative ${
              isToday 
                ? 'bg-primary' 
                : isSelected
                ? 'border border-primary'
                : 'bg-transparent'
            }`}>
            <Text
              variant="small"
              className={`font-medium ${
                isToday ? 'text-primary-foreground' : 'text-foreground'
              }`}>
              {day}
            </Text>
            {/* Dynamic indicators - absolutely positioned */}
            {activeIndicators.length > 0 && (
              <View className="absolute bottom-1 flex-row flex-wrap gap-0.5" style={{ maxWidth: 32 }}>
                {activeIndicators.map((indicator, index) => (
                  <View
                    key={index}
                    className={`w-1 h-1 rounded-full ${indicator.color}`}
                  />
                ))}
              </View>
            )}
          </View>
        </Pressable>
      );
    }

    return days;
  };

  return (
    <View className="bg-card rounded-xl p-4 mb-4 border border-border">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Pressable onPress={goToPreviousMonth} className="p-2">
          <Icon as={ChevronLeftIcon} className="text-foreground" size={24} />
        </Pressable>
        <Text variant="default" className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <Pressable onPress={goToNextMonth} className="p-2">
          <Icon as={ChevronRightIcon} className="text-foreground" size={24} />
        </Pressable>
      </View>

      {/* Week days */}
      <View className="flex-row mb-2">
        {weekDays.map((day) => (
          <View key={day} className="w-[14.28%] items-center">
            <Text variant="small" className="text-muted-foreground font-medium">
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="flex-row flex-wrap">{renderCalendarDays()}</View>

      {/* Legend */}
      {legendItems.length > 0 && (
        <View className="mt-4 pt-4 border-t border-border">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 4 }}>
            {legendItems.map((item, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <View className={`w-2 h-2 rounded-full ${item.color}`} />
                <Text variant="small" className="text-muted-foreground">
                  {item.label}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
