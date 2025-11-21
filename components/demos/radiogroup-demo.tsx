import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { View, Pressable } from 'react-native';
import * as React from 'react';

export function RadioGroupDemo() {
  const [value, setValue] = React.useState('option1');
  const [plan, setPlan] = React.useState('free');
  const [size, setSize] = React.useState('medium');

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Radio Group</Text>
        <RadioGroup value={value} onValueChange={setValue}>
          <Pressable onPress={() => setValue('option1')}>
            <View pointerEvents="none" className="flex-row items-center gap-3">
              <RadioGroupItem value="option1" />
              <Label>Option 1</Label>
            </View>
          </Pressable>
          <Pressable onPress={() => setValue('option2')}>
            <View pointerEvents="none" className="flex-row items-center gap-3">
              <RadioGroupItem value="option2" />
              <Label>Option 2</Label>
            </View>
          </Pressable>
          <Pressable onPress={() => setValue('option3')}>
            <View pointerEvents="none" className="flex-row items-center gap-3">
              <RadioGroupItem value="option3" />
              <Label>Option 3</Label>
            </View>
          </Pressable>
        </RadioGroup>
        <Text variant="muted" className="text-sm">
          Selected: {value}
        </Text>
      </View>

      {/* With Descriptions */}
      <View className="gap-3">
        <Text variant="h3">With Descriptions</Text>
        <Text variant="muted" className="mb-2">
          Choose your plan
        </Text>
        <RadioGroup value={plan} onValueChange={setPlan}>
          <Pressable onPress={() => setPlan('free')}>
            <View pointerEvents="none" className="gap-2 rounded-md border border-border p-4">
              <View className="flex-row items-center gap-3">
                <RadioGroupItem value="free" />
                <Text className="font-semibold">Free</Text>
              </View>
              <Text variant="muted" className="ml-9 text-sm">
                Perfect for personal projects and testing
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setPlan('pro')}>
            <View pointerEvents="none" className="gap-2 rounded-md border border-border p-4">
              <View className="flex-row items-center gap-3">
                <RadioGroupItem value="pro" />
                <Text className="font-semibold">Pro</Text>
              </View>
              <Text variant="muted" className="ml-9 text-sm">
                Advanced features for professionals
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setPlan('enterprise')}>
            <View pointerEvents="none" className="gap-2 rounded-md border border-border p-4">
              <View className="flex-row items-center gap-3">
                <RadioGroupItem value="enterprise" />
                <Text className="font-semibold">Enterprise</Text>
              </View>
              <Text variant="muted" className="ml-9 text-sm">
                Custom solutions for large teams
              </Text>
            </View>
          </Pressable>
        </RadioGroup>
      </View>

      {/* Disabled Options */}
      <View className="gap-3">
        <Text variant="h3">With Disabled Options</Text>
        <RadioGroup value={size} onValueChange={setSize}>
          <Pressable onPress={() => setSize('small')}>
            <View pointerEvents="none" className="flex-row items-center gap-3">
              <RadioGroupItem value="small" />
              <Label>Small</Label>
            </View>
          </Pressable>
          <Pressable onPress={() => setSize('medium')}>
            <View pointerEvents="none" className="flex-row items-center gap-3">
              <RadioGroupItem value="medium" />
              <Label>Medium (Default)</Label>
            </View>
          </Pressable>
          <View className="flex-row items-center gap-3 opacity-50">
            <RadioGroupItem value="large" disabled />
            <Label>Large (Coming Soon)</Label>
          </View>
        </RadioGroup>
      </View>
    </View>
  );
}

