import { DatePicker } from '@/components/nativewindui/DatePicker';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

export function DatePickerDemo() {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState(new Date());
  const [datetime, setDatetime] = React.useState(new Date());

  return (
    <View className="gap-8">
      {/* Date Picker */}
      <View className="gap-3">
        <Text variant="h3">Date Picker</Text>
        <DatePicker
          value={date}
          mode="date"
          onChange={(ev) => {
            setDate(new Date(ev.nativeEvent.timestamp));
          }}
        />
        <Text variant="muted">Selected: {date.toLocaleDateString()}</Text>
      </View>

      {/* Time Picker */}
      <View className="gap-3">
        <Text variant="h3">Time Picker</Text>
        <DatePicker
          value={time}
          mode="time"
          onChange={(ev) => {
            setTime(new Date(ev.nativeEvent.timestamp));
          }}
        />
        <Text variant="muted">Selected: {time.toLocaleTimeString()}</Text>
      </View>

      {/* DateTime Picker */}
      <View className="gap-3">
        <Text variant="h3">Date & Time Picker</Text>
        <DatePicker
          value={datetime}
          mode="datetime"
          onChange={(ev) => {
            setDatetime(new Date(ev.nativeEvent.timestamp));
          }}
        />
        <Text variant="muted">Selected: {datetime.toLocaleString()}</Text>
      </View>
    </View>
  );
}

