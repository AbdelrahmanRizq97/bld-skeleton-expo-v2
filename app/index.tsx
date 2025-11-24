import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { CustomHeader } from '@/components/ui/custom-header';
import { COMPONENTS } from '@/lib/catalog-registry';
import { Link, Stack, type Href } from 'expo-router';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Search, X } from 'lucide-react-native';

const SCREEN_OPTIONS = {
  title: 'Component Showcase',
  headerShown: false,
};

export default function Screen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);

  const filteredComponents = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return COMPONENTS;
    }
    const query = searchQuery.toLowerCase();
    return COMPONENTS.filter((name) => name.toLowerCase().includes(query));
  }, [searchQuery]);

  const handleSearchPress = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery('');
    }
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <CustomHeader
        title="Components"
        size="large"
        align="left"
        background="gradient"
        collapseMode="shrink"
        rightButtons={[
          {
            icon: isSearching ? X : Search,
            onPress: handleSearchPress,
            style: 'icon',
            accessibilityLabel: isSearching ? 'Close search' : 'Search',
          },
        ]}>
        {isSearching && (
          <View className="px-6 py-3 border-b border-border bg-background">
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        )}
        
        <View className="py-2">
          {filteredComponents.length > 0 ? (
            filteredComponents.map((componentName) => (
              <Link
                key={componentName}
                href={`/component/${componentName.toLowerCase()}` as Href}
                asChild>
                <Pressable className="border-border active:bg-accent border-b px-6 py-4">
                  <Text className="text-base">{componentName}</Text>
                </Pressable>
              </Link>
            ))
          ) : (
            <View className="px-6 py-8">
              <Text className="text-center text-muted-foreground">
                No components found matching "{searchQuery}"
              </Text>
            </View>
          )}
        </View>
      </CustomHeader>
    </>
  );
}