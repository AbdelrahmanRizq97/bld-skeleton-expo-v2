import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { InfoIcon, HelpCircleIcon, SettingsIcon } from 'lucide-react-native';
import { View } from 'react-native';

export function TooltipDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Tooltip</Text>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              <Text>Hover me</Text>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Text>This is a tooltip</Text>
          </TooltipContent>
        </Tooltip>
      </View>

      {/* With Icons */}
      <View className="gap-3">
        <Text variant="h3">With Icons</Text>
        <View className="flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon as={InfoIcon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text>Information</Text>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon as={HelpCircleIcon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text>Help & Support</Text>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon as={SettingsIcon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text>Settings</Text>
            </TooltipContent>
          </Tooltip>
        </View>
      </View>

      {/* Different Positions */}
      <View className="gap-3">
        <Text variant="h3">Tooltip Positions</Text>
        <View className="items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Text>Top</Text>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <Text>Tooltip on top</Text>
            </TooltipContent>
          </Tooltip>

          <View className="flex-row gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Text>Left</Text>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <Text>Tooltip on left</Text>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Text>Right</Text>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <Text>Tooltip on right</Text>
              </TooltipContent>
            </Tooltip>
          </View>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Text>Bottom</Text>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <Text>Tooltip on bottom</Text>
            </TooltipContent>
          </Tooltip>
        </View>
      </View>

      {/* Rich Content */}
      <View className="gap-3">
        <Text variant="h3">Rich Content</Text>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              <Text>Detailed Info</Text>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <View className="gap-1">
              <Text className="font-semibold">Keyboard Shortcut</Text>
              <Text variant="muted" className="text-xs">
                Press Cmd+K to open
              </Text>
            </View>
          </TooltipContent>
        </Tooltip>
      </View>

      {/* In Context */}
      <View className="gap-3">
        <Text variant="h3">In Context</Text>
        <View className="flex-row items-center gap-2">
          <Text>Enable notifications</Text>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Icon as={InfoIcon} size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text>You'll receive updates about your account activity</Text>
            </TooltipContent>
          </Tooltip>
        </View>
      </View>

      {/* Usage Note */}
      <View className="rounded-md border border-border bg-muted/50 p-4">
        <Text variant="small" className="font-semibold">
          Usage Note
        </Text>
        <Text variant="muted" className="mt-1 text-sm">
          Tooltips provide helpful context on hover or press. Use them for short descriptions or
          hints, not for critical information.
        </Text>
      </View>
    </View>
  );
}

