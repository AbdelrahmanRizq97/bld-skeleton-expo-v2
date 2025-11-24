import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { MoreVerticalIcon } from 'lucide-react-native';
import { View } from 'react-native';

export function DropdownMenuDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Dropdown</Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Text>Open Menu</Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Text>Profile</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Settings</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Logout</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>

      {/* With Labels and Separators */}
      <View className="gap-3">
        <Text variant="h3">With Labels & Separators</Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Text>Account Menu</Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Text>My Account</Text>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Text>Profile</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Billing</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Settings</Text>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Text>Logout</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>

      {/* Icon Button */}
      <View className="gap-3">
        <Text variant="h3">Icon Button Menu</Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon as={MoreVerticalIcon} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Text>Edit</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Duplicate</Text>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Text>Archive</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Delete</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>

      {/* Multiple Menus */}
      <View className="gap-3">
        <Text variant="h3">Multiple Menus</Text>
        <View className="flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Text>File</Text>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Text>New</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Open</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Save</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Text>Edit</Text>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Text>Undo</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Redo</Text>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Text>Cut</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Copy</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Paste</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
      </View>
    </View>
  );
}

