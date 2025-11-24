import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

export function SelectDemo() {
  const [framework, setFramework] = React.useState('');
  const [country, setCountry] = React.useState('');

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Select</Text>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple" label="Apple" />
            <SelectItem value="banana" label="Banana" />
            <SelectItem value="orange" label="Orange" />
            <SelectItem value="grape" label="Grape" />
          </SelectContent>
        </Select>
      </View>

      {/* With Label */}
      <View className="gap-3">
        <Text variant="h3">With Label</Text>
        <View className="gap-2">
          <Label>Framework</Label>
          <Select
            value={framework ? { value: framework, label: framework } : undefined}
            onValueChange={(option) => setFramework(option?.value || '')}>
            <SelectTrigger>
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react" label="React" />
              <SelectItem value="vue" label="Vue" />
              <SelectItem value="angular" label="Angular" />
              <SelectItem value="svelte" label="Svelte" />
            </SelectContent>
          </Select>
        </View>
        {framework && (
          <Text variant="muted" className="text-sm">
            Selected: {framework}
          </Text>
        )}
      </View>

      {/* Controlled */}
      <View className="gap-3">
        <Text variant="h3">Controlled Select</Text>
        <View className="gap-2">
          <Label>Country</Label>
          <Select
            value={country ? { value: country, label: country } : undefined}
            onValueChange={(option) => setCountry(option?.value || '')}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us" label="United States" />
              <SelectItem value="uk" label="United Kingdom" />
              <SelectItem value="ca" label="Canada" />
              <SelectItem value="au" label="Australia" />
              <SelectItem value="de" label="Germany" />
              <SelectItem value="fr" label="France" />
            </SelectContent>
          </Select>
        </View>
        {country && (
          <Text variant="muted" className="text-sm">
            You selected: {country}
          </Text>
        )}
      </View>

      {/* Multiple Selects */}
      <View className="gap-3">
        <Text variant="h3">Form with Multiple Selects</Text>
        <View className="gap-4">
          <View className="gap-2">
            <Label>Size</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs" label="Extra Small" />
                <SelectItem value="sm" label="Small" />
                <SelectItem value="md" label="Medium" />
                <SelectItem value="lg" label="Large" />
                <SelectItem value="xl" label="Extra Large" />
              </SelectContent>
            </Select>
          </View>
          <View className="gap-2">
            <Label>Color</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red" label="Red" />
                <SelectItem value="blue" label="Blue" />
                <SelectItem value="green" label="Green" />
                <SelectItem value="black" label="Black" />
                <SelectItem value="white" label="White" />
              </SelectContent>
            </Select>
          </View>
        </View>
      </View>
    </View>
  );
}

