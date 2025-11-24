import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from 'react-native';

export function ToastDemo() {
  const { showToast } = useToast();

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Toast</Text>
        <Button onPress={() => showToast('This is a basic toast notification')}>
          <Text>Show Toast</Text>
        </Button>
      </View>

      {/* Success Messages */}
      <View className="gap-3">
        <Text variant="h3">Success Messages</Text>
        <View className="gap-2">
          <Button onPress={() => showToast('Changes saved successfully! ✓')}>
            <Text>Save Success</Text>
          </Button>
          <Button onPress={() => showToast('File uploaded! 🎉')} variant="outline">
            <Text>Upload Success</Text>
          </Button>
          <Button onPress={() => showToast('Account created successfully')} variant="secondary">
            <Text>Account Created</Text>
          </Button>
        </View>
      </View>

      {/* Information Messages */}
      <View className="gap-3">
        <Text variant="h3">Information Messages</Text>
        <View className="gap-2">
          <Button onPress={() => showToast('Processing your request...')} variant="outline">
            <Text>Processing</Text>
          </Button>
          <Button onPress={() => showToast('New update available')} variant="outline">
            <Text>Update Available</Text>
          </Button>
          <Button onPress={() => showToast('Sync complete')} variant="outline">
            <Text>Sync Complete</Text>
          </Button>
        </View>
      </View>

      {/* With Emojis */}
      <View className="gap-3">
        <Text variant="h3">With Emojis</Text>
        <View className="gap-2">
          <Button onPress={() => showToast('Welcome back! 👋')} variant="outline">
            <Text>Welcome</Text>
          </Button>
          <Button onPress={() => showToast('Task completed! ✨')} variant="outline">
            <Text>Task Done</Text>
          </Button>
          <Button onPress={() => showToast('Message sent! 📧')} variant="outline">
            <Text>Message Sent</Text>
          </Button>
        </View>
      </View>

      {/* Multiple Toasts */}
      <View className="gap-3">
        <Text variant="h3">Multiple Toasts</Text>
        <Button
          onPress={() => {
            showToast('First notification');
            setTimeout(() => showToast('Second notification'), 500);
            setTimeout(() => showToast('Third notification'), 1000);
          }}
          variant="outline">
          <Text>Show Multiple Toasts</Text>
        </Button>
      </View>

      {/* Usage Note */}
      <View className="rounded-md border border-border bg-muted/50 p-4">
        <Text variant="small" className="font-semibold">
          Usage Note
        </Text>
        <Text variant="muted" className="mt-1 text-sm">
          Toast notifications automatically dismiss after 2.5 seconds. They're perfect for
          non-critical feedback that doesn't interrupt the user's flow.
        </Text>
      </View>
    </View>
  );
}

