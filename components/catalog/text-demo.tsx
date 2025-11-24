import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function TextDemo() {
  return (
    <View className="gap-8">
      {/* Headings */}
      <View className="gap-3">
        <Text variant="h3">Headings</Text>
        <View className="gap-3">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
        </View>
      </View>

      {/* Body Text */}
      <View className="gap-3">
        <Text variant="h3">Body Text</Text>
        <View className="gap-3">
          <Text variant="default">Default text style</Text>
          <Text variant="p">
            Paragraph text with proper spacing. This is a longer piece of text to demonstrate
            the paragraph variant.
          </Text>
          <Text variant="lead">Lead text for introductions</Text>
          <Text variant="large">Large text for emphasis</Text>
          <Text variant="small">Small text for fine print</Text>
          <Text variant="muted">Muted text for less important information</Text>
        </View>
      </View>

      {/* Special Variants */}
      <View className="gap-3">
        <Text variant="h3">Special Variants</Text>
        <View className="gap-3">
          <Text variant="blockquote">
            "This is a blockquote. It's used for quotations or callouts."
          </Text>
          <Text variant="code">const greeting = "Hello World";</Text>
        </View>
      </View>
    </View>
  );
}

