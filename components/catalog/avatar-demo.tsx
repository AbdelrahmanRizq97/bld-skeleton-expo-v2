import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function AvatarDemo() {
  return (
    <View className="gap-8">
      {/* Basic with Image */}
      <View className="gap-3">
        <Text variant="h3">With Image</Text>
        <View className="flex-row gap-3">
          <Avatar>
            <AvatarImage source={{ uri: 'https://i.pravatar.cc/150?img=1' }} />
            <AvatarFallback>
              <Text>JD</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage source={{ uri: 'https://i.pravatar.cc/150?img=2' }} />
            <AvatarFallback>
              <Text>AB</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
            <AvatarFallback>
              <Text>CD</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      </View>

      {/* Fallback Only */}
      <View className="gap-3">
        <Text variant="h3">Fallback Only</Text>
        <View className="flex-row gap-3">
          <Avatar>
            <AvatarFallback>
              <Text>JD</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>
              <Text>AB</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>
              <Text>CD</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      </View>

      {/* Different Sizes */}
      <View className="gap-3">
        <Text variant="h3">Different Sizes</Text>
        <View className="flex-row items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <Text className="text-xs">S</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              <Text>M</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarFallback>
              <Text className="text-lg">L</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar className="h-20 w-20">
            <AvatarFallback>
              <Text className="text-xl">XL</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      </View>

      {/* With Names */}
      <View className="gap-3">
        <Text variant="h3">User List</Text>
        <View className="gap-3">
          <View className="flex-row items-center gap-3">
            <Avatar>
              <AvatarImage source={{ uri: 'https://i.pravatar.cc/150?img=5' }} />
              <AvatarFallback>
                <Text>JD</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text className="font-semibold">John Doe</Text>
              <Text variant="muted" className="text-sm">
                john@example.com
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <Avatar>
              <AvatarImage source={{ uri: 'https://i.pravatar.cc/150?img=6' }} />
              <AvatarFallback>
                <Text>JS</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text className="font-semibold">Jane Smith</Text>
              <Text variant="muted" className="text-sm">
                jane@example.com
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

