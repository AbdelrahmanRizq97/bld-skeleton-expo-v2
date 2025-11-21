import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { View } from 'react-native';
import * as React from 'react';

export function ActionSheetDemo() {
  const { showActionSheetWithOptions } = useActionSheet();
  const [selectedAction, setSelectedAction] = React.useState<string>('');

  const showBasicActionSheet = () => {
    const options = ['Edit', 'Share', 'Delete', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            setSelectedAction('Edit selected');
            break;
          case 1:
            setSelectedAction('Share selected');
            break;
          case 2:
            setSelectedAction('Delete selected');
            break;
          case 3:
            setSelectedAction('Cancelled');
            break;
        }
      }
    );
  };

  const showActionSheetWithTitle = () => {
    const options = ['Copy', 'Save', 'Download', 'Cancel'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: 'Choose an action',
        message: 'Select what you want to do with this item',
      },
      (selectedIndex?: number) => {
        const actions = ['Copied', 'Saved', 'Downloaded', 'Cancelled'];
        if (selectedIndex !== undefined) {
          setSelectedAction(actions[selectedIndex]);
        }
      }
    );
  };

  const showDestructiveActionSheet = () => {
    const options = ['Delete Account', 'Remove Data', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: 'Destructive Actions',
        message: 'These actions cannot be undone',
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            setSelectedAction('Delete Account selected');
            break;
          case 1:
            setSelectedAction('Remove Data selected');
            break;
          case 2:
            setSelectedAction('Cancelled');
            break;
        }
      }
    );
  };

  const showMultipleDestructive = () => {
    const options = ['Delete', 'Archive', 'Mark as Spam', 'Cancel'];
    const destructiveButtonIndex = [0, 2];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        const actions = ['Deleted', 'Archived', 'Marked as Spam', 'Cancelled'];
        if (selectedIndex !== undefined) {
          setSelectedAction(actions[selectedIndex]);
        }
      }
    );
  };

  const showDisabledOptions = () => {
    const options = ['Option 1', 'Option 2 (Disabled)', 'Option 3', 'Cancel'];
    const disabledButtonIndices = [1];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        disabledButtonIndices,
      },
      (selectedIndex?: number) => {
        const actions = ['Option 1', 'Option 2', 'Option 3', 'Cancelled'];
        if (selectedIndex !== undefined) {
          setSelectedAction(actions[selectedIndex]);
        }
      }
    );
  };

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Action Sheet</Text>
        <Button onPress={showBasicActionSheet}>
          <Text>Show Action Sheet</Text>
        </Button>
      </View>

      {/* With Title and Message */}
      <View className="gap-3">
        <Text variant="h3">With Title & Message</Text>
        <Button variant="outline" onPress={showActionSheetWithTitle}>
          <Text>Show with Title</Text>
        </Button>
      </View>

      {/* Destructive Action */}
      <View className="gap-3">
        <Text variant="h3">Destructive Actions</Text>
        <Button variant="destructive" onPress={showDestructiveActionSheet}>
          <Text>Show Destructive Options</Text>
        </Button>
      </View>

      {/* Multiple Destructive */}
      <View className="gap-3">
        <Text variant="h3">Multiple Destructive Actions</Text>
        <Button variant="outline" onPress={showMultipleDestructive}>
          <Text>Show Multiple Destructive</Text>
        </Button>
      </View>

      {/* Disabled Options */}
      <View className="gap-3">
        <Text variant="h3">With Disabled Options</Text>
        <Button variant="secondary" onPress={showDisabledOptions}>
          <Text>Show with Disabled Option</Text>
        </Button>
      </View>

      {/* Last Action Display */}
      {selectedAction && (
        <View className="rounded-md border border-border bg-muted/50 p-4">
          <Text variant="small" className="font-semibold">
            Last Action
          </Text>
          <Text variant="muted" className="mt-1 text-sm">
            {selectedAction}
          </Text>
        </View>
      )}

      {/* Usage Note */}
      <View className="rounded-md border border-border bg-muted/50 p-4">
        <Text variant="small" className="font-semibold">
          Usage Note
        </Text>
        <Text variant="muted" className="mt-1 text-sm">
          Action sheets provide native iOS-style bottom sheets on iOS and dialogs on Android.
          Use them for presenting a list of actions related to the current context.
        </Text>
      </View>
    </View>
  );
}

