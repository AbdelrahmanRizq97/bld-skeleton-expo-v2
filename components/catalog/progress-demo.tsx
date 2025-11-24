import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { View } from 'react-native';
import * as React from 'react';

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(33);

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic</Text>
        <Progress value={50} />
      </View>

      {/* Different Values */}
      <View className="gap-3">
        <Text variant="h3">Different Values</Text>
        <View className="gap-3">
          <View className="gap-1">
            <Text variant="small">25%</Text>
            <Progress value={25} />
          </View>
          <View className="gap-1">
            <Text variant="small">50%</Text>
            <Progress value={50} />
          </View>
          <View className="gap-1">
            <Text variant="small">75%</Text>
            <Progress value={75} />
          </View>
          <View className="gap-1">
            <Text variant="small">100%</Text>
            <Progress value={100} />
          </View>
        </View>
      </View>

      {/* Interactive */}
      <View className="gap-3">
        <Text variant="h3">Interactive</Text>
        <View className="gap-3">
          <View className="gap-1">
            <Text variant="small">Progress: {progress}%</Text>
            <Progress value={progress} />
          </View>
          <View className="flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onPress={() => setProgress((p) => Math.max(0, p - 10))}>
              <Text>-10</Text>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onPress={() => setProgress((p) => Math.min(100, p + 10))}>
              <Text>+10</Text>
            </Button>
            <Button variant="outline" size="sm" onPress={() => setProgress(0)}>
              <Text>Reset</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

