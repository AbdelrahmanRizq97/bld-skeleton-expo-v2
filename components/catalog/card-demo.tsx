import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { View } from 'react-native';

export function CardDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Card</Text>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This is the main content area of the card.</Text>
          </CardContent>
        </Card>
      </View>

      {/* With Footer */}
      <View className="gap-3">
        <Text variant="h3">With Footer</Text>
        <Card>
          <CardHeader>
            <CardTitle>Featured Project</CardTitle>
            <CardDescription>An example project showcase</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>
              This project demonstrates the use of various UI components in a real-world
              application.
            </Text>
          </CardContent>
          <CardFooter className="flex-row gap-2">
            <Button variant="outline" size="sm">
              <Text>Learn More</Text>
            </Button>
            <Button size="sm">
              <Text>Get Started</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>

      {/* Multiple Cards */}
      <View className="gap-3">
        <Text variant="h3">Multiple Cards</Text>
        <View className="gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>First card content</Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>Second card content</Text>
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  );
}

