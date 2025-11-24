import { Textarea } from '@/components/ui/textarea';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';
import * as React from 'react';

export function TextareaDemo() {
  const [value, setValue] = React.useState('');

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic</Text>
        <Textarea placeholder="Enter your message..." />
      </View>

      {/* With Label */}
      <View className="gap-3">
        <Text variant="h3">With Label</Text>
        <View className="gap-2">
          <Label nativeID="message">Message</Label>
          <Textarea placeholder="Type your message here..." aria-labelledby="message" />
        </View>
      </View>

      {/* Controlled */}
      <View className="gap-3">
        <Text variant="h3">Controlled</Text>
        <View className="gap-2">
          <Textarea
            placeholder="Type something..."
            value={value}
            onChangeText={setValue}
          />
          <Text variant="muted">Characters: {value.length}</Text>
        </View>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <Textarea placeholder="Disabled textarea" editable={false} />
      </View>

      {/* Different Sizes */}
      <View className="gap-3">
        <Text variant="h3">Different Heights</Text>
        <View className="gap-2">
          <Textarea placeholder="Small" className="h-20" />
          <Textarea placeholder="Medium" className="h-32" />
          <Textarea placeholder="Large" className="h-48" />
        </View>
      </View>
    </View>
  );
}

