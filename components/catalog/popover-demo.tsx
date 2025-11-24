import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function PopoverDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Popover</Text>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Text>Open Popover</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text>This is a popover. You can put any content here.</Text>
          </PopoverContent>
        </Popover>
      </View>

      {/* With Form */}
      <View className="gap-3">
        <Text variant="h3">With Form</Text>
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <Text>Dimensions</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <View className="gap-4">
              <View className="gap-2">
                <Text className="font-semibold">Dimensions</Text>
                <Text variant="muted" className="text-sm">
                  Set the dimensions for the layer.
                </Text>
              </View>
              <View className="gap-3">
                <View className="gap-2">
                  <Label nativeID="width">Width</Label>
                  <Input placeholder="100%" aria-labelledby="width" />
                </View>
                <View className="gap-2">
                  <Label nativeID="height">Height</Label>
                  <Input placeholder="25px" aria-labelledby="height" />
                </View>
              </View>
            </View>
          </PopoverContent>
        </Popover>
      </View>

      {/* Information Popover */}
      <View className="gap-3">
        <Text variant="h3">Information Popover</Text>
        <View className="flex-row items-center gap-2">
          <Text>Hover for more info</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Text>?</Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <View className="gap-2">
                <Text className="font-semibold">Additional Information</Text>
                <Text variant="muted" className="text-sm">
                  This popover provides helpful context and additional details about the
                  feature.
                </Text>
              </View>
            </PopoverContent>
          </Popover>
        </View>
      </View>

      {/* Action Popover */}
      <View className="gap-3">
        <Text variant="h3">Action Popover</Text>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Text>Share</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">Share this page</Text>
                <Text variant="muted" className="text-sm">
                  Anyone with the link can view
                </Text>
              </View>
              <View className="flex-row gap-2">
                <Input className="flex-1" value="https://example.com/share" editable={false} />
                <Button size="sm">
                  <Text>Copy</Text>
                </Button>
              </View>
            </View>
          </PopoverContent>
        </Popover>
      </View>
    </View>
  );
}

