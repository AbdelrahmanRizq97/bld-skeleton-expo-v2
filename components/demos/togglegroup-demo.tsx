import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react-native';
import { View } from 'react-native';
import * as React from 'react';

export function ToggleGroupDemo() {
  const [alignment, setAlignment] = React.useState('left');
  const [formatting, setFormatting] = React.useState<string[]>([]);

  return (
    <View className="gap-8">
      {/* Single Selection */}
      <View className="gap-3">
        <Text variant="h3">Single Selection</Text>
        <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
          <ToggleGroupItem value="left">
            <Icon as={AlignLeftIcon} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <Icon as={AlignCenterIcon} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <Icon as={AlignRightIcon} />
          </ToggleGroupItem>
        </ToggleGroup>
        <Text variant="muted" className="text-sm">
          Selected: {alignment || 'none'}
        </Text>
      </View>

      {/* Multiple Selection */}
      <View className="gap-3">
        <Text variant="h3">Multiple Selection</Text>
        <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
          <ToggleGroupItem value="bold">
            <Icon as={BoldIcon} />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Icon as={ItalicIcon} />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Icon as={UnderlineIcon} />
          </ToggleGroupItem>
        </ToggleGroup>
        <Text variant="muted" className="text-sm">
          Selected: {formatting.length > 0 ? formatting.join(', ') : 'none'}
        </Text>
      </View>

      {/* With Text */}
      <View className="gap-3">
        <Text variant="h3">With Text Labels</Text>
        <ToggleGroup type="single" defaultValue="week">
          <ToggleGroupItem value="day">
            <Text>Day</Text>
          </ToggleGroupItem>
          <ToggleGroupItem value="week">
            <Text>Week</Text>
          </ToggleGroupItem>
          <ToggleGroupItem value="month">
            <Text>Month</Text>
          </ToggleGroupItem>
          <ToggleGroupItem value="year">
            <Text>Year</Text>
          </ToggleGroupItem>
        </ToggleGroup>
      </View>

      {/* Variants */}
      <View className="gap-3">
        <Text variant="h3">Variants</Text>
        <View className="gap-2">
          <View className="gap-1">
            <Text variant="small">Default</Text>
            <ToggleGroup type="single" variant="default" defaultValue="option1">
              <ToggleGroupItem value="option1">
                <Text>Option 1</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="option2">
                <Text>Option 2</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="option3">
                <Text>Option 3</Text>
              </ToggleGroupItem>
            </ToggleGroup>
          </View>
          <View className="gap-1">
            <Text variant="small">Outline</Text>
            <ToggleGroup type="single" variant="outline" defaultValue="option1">
              <ToggleGroupItem value="option1">
                <Text>Option 1</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="option2">
                <Text>Option 2</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="option3">
                <Text>Option 3</Text>
              </ToggleGroupItem>
            </ToggleGroup>
          </View>
        </View>
      </View>

      {/* Sizes */}
      <View className="gap-3">
        <Text variant="h3">Sizes</Text>
        <View className="gap-2">
          <ToggleGroup type="single" size="sm">
            <ToggleGroupItem value="1">
              <Text>Small</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="2">
              <Text>Small</Text>
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" size="default">
            <ToggleGroupItem value="1">
              <Text>Default</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="2">
              <Text>Default</Text>
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" size="lg">
            <ToggleGroupItem value="1">
              <Text>Large</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="2">
              <Text>Large</Text>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <ToggleGroup type="single" disabled defaultValue="option2">
          <ToggleGroupItem value="option1">
            <Text>Option 1</Text>
          </ToggleGroupItem>
          <ToggleGroupItem value="option2">
            <Text>Option 2</Text>
          </ToggleGroupItem>
          <ToggleGroupItem value="option3">
            <Text>Option 3</Text>
          </ToggleGroupItem>
        </ToggleGroup>
      </View>
    </View>
  );
}

