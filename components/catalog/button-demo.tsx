import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { PlusIcon } from 'lucide-react-native';
import { View } from 'react-native';

export function ButtonDemo() {
  return (
    <View className="gap-8">
      {/* Variants */}
      <View className="gap-3">
        <Text variant="h3">Variants</Text>
        <View className="gap-3">
          <Button>
            <Text>Default</Text>
          </Button>
          <Button variant="destructive">
            <Text>Destructive</Text>
          </Button>
          <Button variant="outline">
            <Text>Outline</Text>
          </Button>
          <Button variant="secondary">
            <Text>Secondary</Text>
          </Button>
          <Button variant="ghost">
            <Text>Ghost</Text>
          </Button>
          <Button variant="link">
            <Text>Link</Text>
          </Button>
        </View>
      </View>

      {/* Sizes */}
      <View className="gap-3">
        <Text variant="h3">Sizes</Text>
        <View className="gap-3">
          <Button size="default">
            <Text>Default Size</Text>
          </Button>
          <Button size="sm">
            <Text>Small</Text>
          </Button>
          <Button size="lg">
            <Text>Large</Text>
          </Button>
          <Button size="icon">
            <Icon as={PlusIcon} className="text-primary-foreground" />
          </Button>
        </View>
      </View>

      {/* With Icons */}
      <View className="gap-3">
        <Text variant="h3">With Icons</Text>
        <View className="gap-3">
          <Button>
            <Icon as={PlusIcon} className="text-primary-foreground" />
            <Text>Add Item</Text>
          </Button>
          <Button variant="outline">
            <Icon as={PlusIcon} />
            <Text>Add Item</Text>
          </Button>
        </View>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <View className="gap-3">
          <Button disabled>
            <Text>Disabled Button</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

