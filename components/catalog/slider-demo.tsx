import { Slider } from '@/components/nativewindui/Slider';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

export function SliderDemo() {
  const [value1, setValue1] = React.useState(0.5);
  const [value2, setValue2] = React.useState(0.3);
  const [value3, setValue3] = React.useState(7);
  const [volume, setVolume] = React.useState(50);

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Slider</Text>
        <Slider value={0.5} />
      </View>

      {/* Controlled */}
      <View className="gap-3">
        <Text variant="h3">Controlled Slider</Text>
        <Slider value={value1} onValueChange={setValue1} />
        <Text variant="muted" className="text-sm">
          Value: {value1.toFixed(2)}
        </Text>
      </View>

      {/* With Step */}
      <View className="gap-3">
        <Text variant="h3">With Step</Text>
        <Slider value={value2} onValueChange={setValue2} step={0.1} />
        <Text variant="muted" className="text-sm">
          Value: {value2.toFixed(1)} (step: 0.1)
        </Text>
      </View>

      {/* Custom Range */}
      <View className="gap-3">
        <Text variant="h3">Custom Range (0-10)</Text>
        <Slider
          value={value3}
          onValueChange={setValue3}
          minimumValue={0}
          maximumValue={10}
          step={1}
        />
        <Text variant="muted" className="text-sm">
          Value: {Math.round(value3)}
        </Text>
      </View>

      {/* Volume Control Example */}
      <View className="gap-3">
        <Text variant="h3">Volume Control (0-100)</Text>
        <View className="flex-row items-center gap-3">
          <Text className="text-xl">🔊</Text>
          <View className="flex-1">
            <Slider
              value={volume}
              onValueChange={setVolume}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>
          <Text className="w-12 text-right">{Math.round(volume)}%</Text>
        </View>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <Slider value={0.5} disabled />
      </View>

      {/* Different Steps */}
      <View className="gap-3">
        <Text variant="h3">Different Steps</Text>
        <View className="gap-4">
          <View className="gap-1">
            <Text variant="small">Step: 0.05</Text>
            <Slider value={0.5} step={0.05} />
          </View>
          <View className="gap-1">
            <Text variant="small">Step: 0.25</Text>
            <Slider value={0.5} step={0.25} />
          </View>
        </View>
      </View>

      {/* Usage Note */}
      <View className="rounded-md border border-border bg-muted/50 p-4">
        <Text variant="small" className="font-semibold">
          Usage Note
        </Text>
        <Text variant="muted" className="mt-1 text-sm">
          Sliders are great for adjusting values on a continuous or discrete scale. Common uses
          include volume controls, brightness settings, and range filters.
        </Text>
      </View>
    </View>
  );
}

