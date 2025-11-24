import { Toggle } from '@/components/ui/toggle';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react-native';
import { View } from 'react-native';
import * as React from 'react';

export function ToggleDemo() {
  const [pressed1, setPressed1] = React.useState(false);
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [underline, setUnderline] = React.useState(false);
  const [defaultVariant, setDefaultVariant] = React.useState(false);
  const [outlineVariant, setOutlineVariant] = React.useState(false);
  const [sizeSmall, setSizeSmall] = React.useState(false);
  const [sizeDefault, setSizeDefault] = React.useState(false);
  const [sizeLarge, setSizeLarge] = React.useState(false);

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Toggle</Text>
        <View className="flex-row gap-2">
          <Toggle pressed={pressed1} onPressedChange={setPressed1}>
            <Text>Toggle</Text>
          </Toggle>
          <Text variant="muted">State: {pressed1 ? 'On' : 'Off'}</Text>
        </View>
      </View>

      {/* With Icons */}
      <View className="gap-3">
        <Text variant="h3">With Icons</Text>
        <View className="flex-row gap-2">
          <Toggle pressed={bold} onPressedChange={setBold}>
            <Icon as={BoldIcon} />
          </Toggle>
          <Toggle pressed={italic} onPressedChange={setItalic}>
            <Icon as={ItalicIcon} />
          </Toggle>
          <Toggle pressed={underline} onPressedChange={setUnderline}>
            <Icon as={UnderlineIcon} />
          </Toggle>
        </View>
      </View>

      {/* Variants */}
      <View className="gap-3">
        <Text variant="h3">Variants</Text>
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Toggle variant="default" pressed={defaultVariant} onPressedChange={setDefaultVariant}>
              <Text>Default</Text>
            </Toggle>
            <Text variant="muted" className="text-sm">
              Default variant
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Toggle variant="outline" pressed={outlineVariant} onPressedChange={setOutlineVariant}>
              <Text>Outline</Text>
            </Toggle>
            <Text variant="muted" className="text-sm">
              Outline variant
            </Text>
          </View>
        </View>
      </View>

      {/* Sizes */}
      <View className="gap-3">
        <Text variant="h3">Sizes</Text>
        <View className="flex-row items-center gap-2">
          <Toggle size="sm" pressed={sizeSmall} onPressedChange={setSizeSmall}>
            <Text>Small</Text>
          </Toggle>
          <Toggle size="default" pressed={sizeDefault} onPressedChange={setSizeDefault}>
            <Text>Default</Text>
          </Toggle>
          <Toggle size="lg" pressed={sizeLarge} onPressedChange={setSizeLarge}>
            <Text>Large</Text>
          </Toggle>
        </View>
      </View>

      {/* Disabled */}
      <View className="gap-3">
        <Text variant="h3">Disabled</Text>
        <View className="flex-row gap-2">
          <Toggle disabled onPressedChange={() => {}}>
            <Text>Disabled Off</Text>
          </Toggle>
          <Toggle disabled pressed={true} onPressedChange={() => {}}>
            <Text>Disabled On</Text>
          </Toggle>
        </View>
      </View>

      {/* Text Formatting Example */}
      <View className="gap-3">
        <Text variant="h3">Text Formatting Toolbar</Text>
        <View className="gap-2">
          <View className="flex-row gap-1">
            <Toggle pressed={bold} onPressedChange={setBold} size="sm">
              <Icon as={BoldIcon} size={16} />
            </Toggle>
            <Toggle pressed={italic} onPressedChange={setItalic} size="sm">
              <Icon as={ItalicIcon} size={16} />
            </Toggle>
            <Toggle pressed={underline} onPressedChange={setUnderline} size="sm">
              <Icon as={UnderlineIcon} size={16} />
            </Toggle>
          </View>
          <View className="rounded-md border border-border p-4">
            <Text
              className={`${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} ${underline ? 'underline' : ''}`}>
              Sample text with formatting
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

