import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme, colorScheme as nativewindColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'React Native Reusables',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Screen() {
  const { colorScheme: scheme } = useColorScheme();
  const [isOn, setIsOn] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [progress, setProgress] = React.useState(42);
  const [tab, setTab] = React.useState('account');

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Image source={LOGO.light} style={IMAGE_STYLE} className="dark:hidden" resizeMode="contain" />
        <Image source={LOGO.dark} style={IMAGE_STYLE} className="hidden dark:flex" resizeMode="contain" />
        <View className="gap-2 p-4">
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            1. Edit <Text variant="code">app/index.tsx</Text> to get started.
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            2. Save to see your changes instantly.
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Link href="https://reactnativereusables.com" asChild>
            <Button>
              <Text>Browse the Docs</Text>
            </Button>
          </Link>
          <Link href="https://github.com/founded-labs/react-native-reusables" asChild>
            <Button variant="ghost">
              <Text>Star the Repo</Text>
              <Icon as={StarIcon} />
            </Button>
          </Link>
        </View>

        {/* Demo primitives */}
        <View className="w-full max-w-md gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is a test card using UI primitives.</CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <Input placeholder="Your name" />
              <View className="flex-row items-center gap-3">
                <Switch checked={isOn} onCheckedChange={setIsOn} />
                <Text>Switch is {isOn ? 'On' : 'Off'}</Text>
              </View>
              <View className="gap-2">
                <Text className="text-sm text-muted-foreground">Progress: {progress}%</Text>
                <Progress value={progress} />
              </View>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="secondary" onPress={() => setProgress((p) => (p >= 90 ? 10 : p + 10))}>
                <Text>Advance Progress</Text>
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Text>Hover me</Text>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <Text>Tooltip content</Text>
                </TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>

          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Text>What is this?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>An accordion built with our UI primitives.</Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <View className="flex-row items-center gap-3">
            <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
            <Text>Accept terms</Text>
          </View>

          <View className="flex-row flex-wrap items-center gap-2">
            <Badge>
              <Text>Default</Text>
            </Badge>
            <Badge variant="secondary">
              <Text>Secondary</Text>
            </Badge>
            <Badge variant="destructive">
              <Text>Destructive</Text>
            </Badge>
            <Badge variant="outline">
              <Text>Outline</Text>
            </Badge>
          </View>
        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme: scheme } = useColorScheme();

  return (
    <Button
      onPress={() => {
        const next = (scheme ?? 'light') === 'dark' ? 'light' : 'dark';
        nativewindColorScheme.set(next as 'light' | 'dark' | 'system');
      }}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={SunIcon} className="size-5 dark:hidden" />
      <Icon as={MoonStarIcon} className="hidden size-5 dark:flex" />
    </Button>
  );
}
