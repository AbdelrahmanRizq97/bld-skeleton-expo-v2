import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';
import * as React from 'react';

export function SwitchDemo() {
  const [enabled, setEnabled] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic</Text>
        <View className="flex-row items-center gap-3">
          <Switch checked={enabled} onCheckedChange={setEnabled} />
          <Text>Switch is {enabled ? 'On' : 'Off'}</Text>
        </View>
      </View>

      {/* With Label */}
      <View className="gap-3">
        <Text variant="h3">With Label</Text>
        <View className="flex-row items-center justify-between">
          <Label>Enable Notifications</Label>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </View>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <View className="flex-row items-center gap-3">
          <Switch checked={false} disabled />
          <Text variant="muted">Disabled Off</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Switch checked={true} disabled />
          <Text variant="muted">Disabled On</Text>
        </View>
      </View>
    </View>
  );
}

