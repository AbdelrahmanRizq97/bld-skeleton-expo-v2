import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function ContextMenuDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Context Menu</Text>
        <Text variant="muted" className="mb-2">
          Long press the box below to open the context menu
        </Text>
        <ContextMenu>
          <ContextMenuTrigger>
            <View className="flex h-32 items-center justify-center rounded-md border border-dashed border-border">
              <Text variant="muted">Long press here</Text>
            </View>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Text>Edit</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Duplicate</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Text>Delete</Text>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </View>

      {/* With Separators */}
      <View className="gap-3">
        <Text variant="h3">With Separators</Text>
        <Text variant="muted" className="mb-2">
          Long press to see grouped menu items
        </Text>
        <ContextMenu>
          <ContextMenuTrigger>
            <View className="flex h-32 items-center justify-center rounded-md border border-dashed border-border">
              <Text variant="muted">Long press here</Text>
            </View>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Text>View</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Edit</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Text>Copy</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Paste</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Text>Delete</Text>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </View>

      {/* Card Example */}
      <View className="gap-3">
        <Text variant="h3">Card with Context Menu</Text>
        <Text variant="muted" className="mb-2">
          Long press the card for options
        </Text>
        <ContextMenu>
          <ContextMenuTrigger>
            <View className="rounded-md border border-border p-4">
              <Text className="font-semibold">Project Card</Text>
              <Text variant="muted" className="mt-1">
                Long press for actions
              </Text>
            </View>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Text>Open</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Share</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Rename</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Text>Archive</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Delete</Text>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </View>
    </View>
  );
}

