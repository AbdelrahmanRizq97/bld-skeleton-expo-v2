import { Text } from '@/components/ui/text';
import { COMPONENTS } from '@/lib/component-registry';
import { Link, Stack, type Href } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  title: 'Component Showcase',
  headerShown: false,
};

export default function Screen() {
  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <SafeAreaView className="flex-1 bg-background">
        <View className="border-border border-b px-6 py-4">
          <Text variant="h1" className="text-left">
            Components
          </Text>
        </View>
        <ScrollView className="flex-1">
          <View className="py-2">
            {COMPONENTS.map((componentName) => (
              <Link
                key={componentName}
                href={`/component/${componentName.toLowerCase()}` as Href}
                asChild>
                <Pressable className="border-border active:bg-accent border-b px-6 py-4">
                  <Text className="text-base">{componentName}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}