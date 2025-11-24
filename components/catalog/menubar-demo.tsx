import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function MenubarDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Menubar</Text>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Text>File</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>New File</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Open</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Save</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <Text>Edit</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>Undo</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Redo</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <Text>View</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>Zoom In</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Zoom Out</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Reset Zoom</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </View>

      {/* With Separators */}
      <View className="gap-3">
        <Text variant="h3">With Separators</Text>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Text>File</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>New</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Open</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Save</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Save As</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Exit</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <Text>Edit</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>Undo</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Redo</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Cut</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Copy</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Paste</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </View>

      {/* Application Style */}
      <View className="gap-3">
        <Text variant="h3">Application Style</Text>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Text>App</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>About</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Preferences</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Quit</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <Text>Help</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>Documentation</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Support</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Check for Updates</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </View>
    </View>
  );
}

