import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function SeparatorDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Separator</Text>
        <View className="gap-4">
          <Text>Content above</Text>
          <Separator />
          <Text>Content below</Text>
        </View>
      </View>

      {/* In a List */}
      <View className="gap-3">
        <Text variant="h3">In a List</Text>
        <View>
          <Text className="py-2">Item 1</Text>
          <Separator />
          <Text className="py-2">Item 2</Text>
          <Separator />
          <Text className="py-2">Item 3</Text>
          <Separator />
          <Text className="py-2">Item 4</Text>
        </View>
      </View>

      {/* Section Divider */}
      <View className="gap-3">
        <Text variant="h3">Section Divider</Text>
        <View className="gap-4">
          <View>
            <Text variant="h4">Section 1</Text>
            <Text variant="muted">Content for the first section</Text>
          </View>
          <Separator />
          <View>
            <Text variant="h4">Section 2</Text>
            <Text variant="muted">Content for the second section</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

