import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function SkeletonDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Skeleton</Text>
        <View className="gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </View>
      </View>

      {/* Card Skeleton */}
      <View className="gap-3">
        <Text variant="h3">Card Skeleton</Text>
        <View className="border-border rounded-lg border p-4">
          <View className="gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </View>
            <Skeleton className="h-20 w-full" />
          </View>
        </View>
      </View>

      {/* List Skeleton */}
      <View className="gap-3">
        <Text variant="h3">List Skeleton</Text>
        <View className="gap-3">
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-row items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <View className="flex-1 gap-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

