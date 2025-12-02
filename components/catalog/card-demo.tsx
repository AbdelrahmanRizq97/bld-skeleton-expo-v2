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
      {/* Size Variants */}
      <View className="gap-3">
        <Text variant="h3">Card Sizes</Text>
        
        {/* Small */}
        <View className="flex-row gap-1">
          <Card size="sm" className="w-12 h-12 items-center justify-center">
            <CardContent>
              <Text className="text-lg font-bold text-center">5</Text>
            </CardContent>
          </Card>
          <Card size="sm" className="w-12 h-12 items-center justify-center">
            <CardContent>
              <Text className="text-lg font-bold text-center">3</Text>
            </CardContent>
          </Card>
          <Card size="sm" className="w-12 h-12 items-center justify-center">
            <CardContent>
              <Text className="text-lg font-bold text-center">9</Text>
            </CardContent>
          </Card>
        </View>
        <Text className="text-muted-foreground text-sm">Small cards - great for game cells, compact lists</Text>

        {/* Medium (default) */}
        <Card size="md">
          <CardHeader>
            <CardTitle>Medium Card</CardTitle>
            <CardDescription>Default balanced padding</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This card uses size="md" which is the default size.</Text>
          </CardContent>
        </Card>

        {/* Large */}
        <Card size="lg">
          <CardHeader>
            <CardTitle>Large Card</CardTitle>
            <CardDescription>Spacious padding for emphasis</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This card uses size="lg" for more breathing room.</Text>
          </CardContent>
        </Card>
      </View>

      {/* With Footer */}
      <View className="gap-3">
        <Text variant="h3">With Footer</Text>
        <Card size="md">
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

      {/* Grid of Small Cards */}
      <View className="gap-3">
        <Text variant="h3">Grid Layout (Small)</Text>
        <View className="flex-row flex-wrap gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Card key={num} size="sm" className="w-10 h-10 items-center justify-center">
              <CardContent>
                <Text className="font-semibold">{num}</Text>
              </CardContent>
            </Card>
          ))}
        </View>
      </View>
    </View>
  );
}

