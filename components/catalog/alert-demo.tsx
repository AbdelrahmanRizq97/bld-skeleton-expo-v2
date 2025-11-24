import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function AlertDemo() {
  return (
    <View className="gap-8">
      {/* Default Variant */}
      <View className="gap-3">
        <Text variant="h3">Default</Text>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      </View>

      {/* Destructive Variant */}
      <View className="gap-3">
        <Text variant="h3">Destructive</Text>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </View>

      {/* Title Only */}
      <View className="gap-3">
        <Text variant="h3">Title Only</Text>
        <Alert>
          <AlertTitle>New update available</AlertTitle>
        </Alert>
      </View>

      {/* Description Only */}
      <View className="gap-3">
        <Text variant="h3">Description Only</Text>
        <Alert>
          <AlertDescription>
            This is an informational message without a title.
          </AlertDescription>
        </Alert>
      </View>

      {/* Multiple Alerts */}
      <View className="gap-3">
        <Text variant="h3">Multiple Alerts</Text>
        <View className="gap-3">
          <Alert>
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Please review your input before submitting.</AlertDescription>
          </Alert>
        </View>
      </View>
    </View>
  );
}

