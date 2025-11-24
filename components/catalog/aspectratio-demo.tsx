import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Text } from '@/components/ui/text';
import { View, Image } from 'react-native';

export function AspectRatioDemo() {
  return (
    <View className="gap-8">
      {/* 16:9 Ratio */}
      <View className="gap-3">
        <Text variant="h3">16:9 Aspect Ratio</Text>
        <AspectRatio ratio={16 / 9}>
          <View className="bg-muted flex-1 items-center justify-center rounded-md">
            <Text variant="muted">16:9</Text>
          </View>
        </AspectRatio>
      </View>

      {/* 4:3 Ratio */}
      <View className="gap-3">
        <Text variant="h3">4:3 Aspect Ratio</Text>
        <AspectRatio ratio={4 / 3}>
          <View className="bg-muted flex-1 items-center justify-center rounded-md">
            <Text variant="muted">4:3</Text>
          </View>
        </AspectRatio>
      </View>

      {/* 1:1 (Square) */}
      <View className="gap-3">
        <Text variant="h3">1:1 Aspect Ratio (Square)</Text>
        <AspectRatio ratio={1}>
          <View className="bg-muted flex-1 items-center justify-center rounded-md">
            <Text variant="muted">1:1</Text>
          </View>
        </AspectRatio>
      </View>

      {/* 21:9 (Ultrawide) */}
      <View className="gap-3">
        <Text variant="h3">21:9 Aspect Ratio (Ultrawide)</Text>
        <AspectRatio ratio={21 / 9}>
          <View className="bg-muted flex-1 items-center justify-center rounded-md">
            <Text variant="muted">21:9</Text>
          </View>
        </AspectRatio>
      </View>

      {/* With Image */}
      <View className="gap-3">
        <Text variant="h3">With Image</Text>
        <AspectRatio ratio={16 / 9}>
          <Image
            source={{ uri: 'https://picsum.photos/800/450' }}
            style={{ width: '100%', height: '100%', borderRadius: 6 }}
            resizeMode="cover"
          />
        </AspectRatio>
      </View>
    </View>
  );
}

