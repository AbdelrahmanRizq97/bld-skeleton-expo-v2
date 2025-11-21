import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { View } from 'react-native';
import * as React from 'react';

export function LabelDemo() {
  const [enabled, setEnabled] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  return (
    <View className="gap-8">
      {/* With Input */}
      <View className="gap-3">
        <Text variant="h3">With Input</Text>
        <View className="gap-2">
          <Label nativeID="username">Username</Label>
          <Input placeholder="Enter username" aria-labelledby="username" />
        </View>
      </View>

      {/* With Switch */}
      <View className="gap-3">
        <Text variant="h3">With Switch</Text>
        <View className="flex-row items-center justify-between">
          <Label>Enable notifications</Label>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </View>
      </View>

      {/* With Checkbox */}
      <View className="gap-3">
        <Text variant="h3">With Checkbox</Text>
        <View className="flex-row items-center gap-3">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Label>Accept terms and conditions</Label>
        </View>
      </View>

      {/* Form Example */}
      <View className="gap-3">
        <Text variant="h3">Form Example</Text>
        <View className="gap-4">
          <View className="gap-2">
            <Label nativeID="name">Full Name</Label>
            <Input placeholder="John Doe" aria-labelledby="name" />
          </View>
          <View className="gap-2">
            <Label nativeID="email">Email</Label>
            <Input
              placeholder="john@example.com"
              keyboardType="email-address"
              aria-labelledby="email"
            />
          </View>
          <View className="gap-2">
            <Label nativeID="bio">Bio</Label>
            <Input placeholder="Tell us about yourself" aria-labelledby="bio" />
          </View>
        </View>
      </View>
    </View>
  );
}

