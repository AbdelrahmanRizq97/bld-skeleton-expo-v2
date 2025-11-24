import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { View, Pressable } from 'react-native';
import * as React from 'react';

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(false);
  const [terms, setTerms] = React.useState(false);

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic</Text>
        <View className="flex-row items-center gap-3">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Text>Checkbox is {checked ? 'checked' : 'unchecked'}</Text>
        </View>
      </View>

      {/* With Label (Tappable Row) */}
      <View className="gap-3">
        <Text variant="h3">With Label (Full Row Tappable)</Text>
        <Pressable onPress={() => setTerms(!terms)}>
          <View pointerEvents="none" className="flex-row items-center gap-3">
            <Checkbox checked={terms} onCheckedChange={setTerms} />
            <Label>I agree to the terms and conditions</Label>
          </View>
        </Pressable>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <View className="flex-row items-center gap-3">
          <Checkbox checked={false} disabled />
          <Text variant="muted">Disabled Unchecked</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Checkbox checked={true} disabled />
          <Text variant="muted">Disabled Checked</Text>
        </View>
      </View>
    </View>
  );
}

