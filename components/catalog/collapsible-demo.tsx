import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ChevronDownIcon } from 'lucide-react-native';
import { View } from 'react-native';
import * as React from 'react';

export function CollapsibleDemo() {
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(true);

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Collapsible</Text>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              <Text>Toggle Content</Text>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <View className="mt-3 rounded-md border border-border p-4">
              <Text>
                This is the collapsible content. It can contain any component you want.
              </Text>
            </View>
          </CollapsibleContent>
        </Collapsible>
      </View>

      {/* Controlled */}
      <View className="gap-3">
        <Text variant="h3">Controlled</Text>
        <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
          <View className="flex-row items-center justify-between rounded-md border border-border p-4">
            <Text className="font-semibold">Starred Repositories</Text>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <Icon
                  as={ChevronDownIcon}
                  className={isOpen1 ? 'rotate-180' : ''}
                  size={16}
                />
              </Button>
            </CollapsibleTrigger>
          </View>
          <CollapsibleContent>
            <View className="mt-2 gap-2">
              <View className="rounded-md border border-border p-3">
                <Text>@radix-ui/primitives</Text>
              </View>
              <View className="rounded-md border border-border p-3">
                <Text>@radix-ui/colors</Text>
              </View>
              <View className="rounded-md border border-border p-3">
                <Text>@stitches/react</Text>
              </View>
            </View>
          </CollapsibleContent>
        </Collapsible>
      </View>

      {/* Default Open */}
      <View className="gap-3">
        <Text variant="h3">Default Open</Text>
        <Collapsible open={isOpen2} onOpenChange={setIsOpen2}>
          <View className="rounded-md border border-border">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <Text>Settings</Text>
                <Icon
                  as={ChevronDownIcon}
                  className={isOpen2 ? 'rotate-180' : ''}
                  size={16}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <View className="border-t border-border p-4">
                <Text variant="muted">Configure your application settings here.</Text>
              </View>
            </CollapsibleContent>
          </View>
        </Collapsible>
      </View>
    </View>
  );
}

