import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';
import * as React from 'react';

export function InputDemo() {
  const [value, setValue] = React.useState('');

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic</Text>
        <Input placeholder="Enter text..." />
      </View>

      {/* With Label */}
      <View className="gap-3">
        <Text variant="h3">With Label</Text>
        <View className="gap-2">
          <Label nativeID="email">Email</Label>
          <Input placeholder="email@example.com" aria-labelledby="email" />
        </View>
      </View>

      {/* Controlled */}
      <View className="gap-3">
        <Text variant="h3">Controlled</Text>
        <View className="gap-2">
          <Input
            placeholder="Type something..."
            value={value}
            onChangeText={setValue}
          />
          <Text variant="muted">Value: {value || '(empty)'}</Text>
        </View>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <Input placeholder="Disabled input" editable={false} />
      </View>

      {/* Different Types */}
      <View className="gap-3">
        <Text variant="h3">Input Types</Text>
        <View className="gap-2">
          <Input placeholder="Email" keyboardType="email-address" />
          <Input placeholder="Phone" keyboardType="phone-pad" />
          <Input placeholder="Number" keyboardType="numeric" />
          <Input placeholder="Password" secureTextEntry />
        </View>
      </View>
    </View>
  );
}

