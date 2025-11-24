import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { View } from 'react-native';

export function HoverCardDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Hover Card</Text>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">
              <Text>@username</Text>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <Text>Additional information appears here when you hover or press.</Text>
          </HoverCardContent>
        </HoverCard>
      </View>

      {/* User Profile */}
      <View className="gap-3">
        <Text variant="h3">User Profile Card</Text>
        <View>
          <Text>
            Follow{' '}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Text className="font-semibold underline">@johndoe</Text>
              </HoverCardTrigger>
              <HoverCardContent>
                <View className="gap-3">
                  <View className="flex-row gap-3">
                    <Avatar>
                      <AvatarImage source={{ uri: 'https://i.pravatar.cc/150?img=12' }} />
                      <AvatarFallback>
                        <Text>JD</Text>
                      </AvatarFallback>
                    </Avatar>
                    <View className="flex-1">
                      <Text className="font-semibold">John Doe</Text>
                      <Text variant="muted" className="text-sm">
                        @johndoe
                      </Text>
                    </View>
                  </View>
                  <Text className="text-sm">
                    Software developer passionate about React Native and mobile development.
                  </Text>
                  <View className="flex-row gap-4">
                    <View>
                      <Text className="font-semibold">1.2k</Text>
                      <Text variant="muted" className="text-xs">
                        Followers
                      </Text>
                    </View>
                    <View>
                      <Text className="font-semibold">842</Text>
                      <Text variant="muted" className="text-xs">
                        Following
                      </Text>
                    </View>
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>{' '}
            for updates
          </Text>
        </View>
      </View>

      {/* Rich Content */}
      <View className="gap-3">
        <Text variant="h3">Rich Content Card</Text>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">
              <Text>View Details</Text>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <View className="gap-2">
              <Text className="font-semibold">Product Information</Text>
              <Text variant="muted" className="text-sm">
                This hover card can contain rich content including images, multiple text
                sections, and more.
              </Text>
              <View className="mt-2 flex-row gap-2">
                <View className="bg-primary/20 rounded px-2 py-1">
                  <Text className="text-xs">New</Text>
                </View>
                <View className="bg-secondary rounded px-2 py-1">
                  <Text className="text-xs">Popular</Text>
                </View>
              </View>
            </View>
          </HoverCardContent>
        </HoverCard>
      </View>
    </View>
  );
}

