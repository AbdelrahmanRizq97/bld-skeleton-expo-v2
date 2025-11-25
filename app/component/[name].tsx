import { Text } from '@/components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDemoComponent } from '@/lib/catalog-map';
import { COMPONENTS } from '@/lib/catalog-registry';

export default function ComponentDemo() {
  const { name } = useLocalSearchParams<{ name: string }>();
  
  // Find the correct component name from registry by matching lowercase
  const componentName = name
    ? COMPONENTS.find(c => c.toLowerCase() === name.toLowerCase()) || 'Unknown'
    : 'Unknown';

  const DemoComponent = getDemoComponent(componentName);
  
  // Full-width components that handle their own padding
  const fullWidthComponents = ['Kanban'];
  const isFullWidth = fullWidthComponents.includes(componentName);

  return (
    <>
      <Stack.Screen
        options={{
          title: componentName,
          headerShown: true,
        }}
      />
      <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
        <ScrollView className="flex-1">
          <View className={isFullWidth ? '' : 'p-6'}>
            {DemoComponent ? (
              <DemoComponent />
            ) : (
              <View className="items-center justify-center py-12">
                <Text variant="muted">Demo not available for {componentName}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

