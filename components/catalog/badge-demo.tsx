import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function BadgeDemo() {
  return (
    <View className="gap-8">
      {/* Variants */}
      <View className="gap-3">
        <Text variant="h3">Variants</Text>
        <View className="flex-row flex-wrap gap-2">
          <Badge>
            <Text>Default</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Secondary</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Destructive</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Outline</Text>
          </Badge>
        </View>
      </View>

      {/* Usage Examples */}
      <View className="gap-3">
        <Text variant="h3">Usage Examples</Text>
        <View className="flex-row flex-wrap gap-2">
          <Badge>
            <Text>New</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Beta</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Error</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Draft</Text>
          </Badge>
        </View>
      </View>

      {/* With Numbers */}
      <View className="gap-3">
        <Text variant="h3">With Numbers</Text>
        <View className="flex-row flex-wrap gap-2">
          <Badge>
            <Text>Count: 5</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>99+</Text>
          </Badge>
        </View>
      </View>
    </View>
  );
}

