import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { cn } from '@/lib/utils';

export function DatePicker({
  materialDateClassName: _materialDateClassName,
  materialDateLabel: _materialDateLabel,
  materialDateLabelClassName: _materialDateLabelClassName,
  materialTimeClassName: _materialTimeClassName,
  materialTimeLabel: _materialTimeLabel,
  materialTimeLabelClassName: _materialTimeLabelClassName,
  style,
  className,
  ...props
}: React.ComponentProps<typeof DateTimePicker> & {
  mode: 'date' | 'time' | 'datetime';
} & {
  materialDateClassName?: string;
  materialDateLabel?: string;
  materialDateLabelClassName?: string;
  materialTimeClassName?: string;
  materialTimeLabel?: string;
  materialTimeLabelClassName?: string;
  className?: string;
}) {
  return (
    <View style={styles.container} className={cn(className)}>
      <DateTimePicker 
        {...props} 
        style={[styles.picker, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: -8,
  },
  picker: {
    alignSelf: 'flex-start',
  },
});
