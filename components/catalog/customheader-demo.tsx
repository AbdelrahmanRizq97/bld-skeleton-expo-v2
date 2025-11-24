// CustomHeader Demo - Showcases all variations
import { useState } from 'react';
import { View } from 'react-native';
import * as React from 'react';
import { CustomHeader } from '@/components/ui/custom-header';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Settings, Share2, Heart, Search, Bell, MoreVertical } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function CustomHeaderDemo() {
  const [activeDemo, setActiveDemo] = useState<string>('large-left-solid');
  const { colorScheme } = useColorScheme();

  const demos = [
    // Size variations
    { id: 'large-left-solid', label: 'Large + Left + Solid' },
    { id: 'medium-left-solid', label: 'Medium + Left + Solid' },
    { id: 'small-left-solid', label: 'Small + Left + Solid' },
    
    // Alignment variations
    { id: 'large-center-solid', label: 'Large + Center + Solid' },
    { id: 'medium-center-solid', label: 'Medium + Center + Solid' },
    
    // Background variations
    { id: 'large-left-transparent', label: 'Large + Transparent' },
    { id: 'large-left-gradient', label: 'Large + Gradient' },
    { id: 'large-left-gradient-custom', label: 'Large + Custom Gradient' },
    
    // Collapse modes
    { id: 'large-left-shrink', label: 'Large + Shrink (scroll)' },
    { id: 'large-left-hide', label: 'Large + Hide (scroll)' },
    { id: 'large-left-compact', label: 'Large + Compact (scroll)' },
    
    // Buttons
    { id: 'with-back', label: 'With Back Button' },
    { id: 'with-left-button', label: 'With Left Button' },
    { id: 'with-right-buttons', label: 'With Right Buttons' },
    { id: 'with-multiple-buttons', label: 'With Multiple Buttons' },
    
    // Complex combinations
    { id: 'complex-gradient-shrink', label: 'Complex: Gradient + Shrink' },
    { id: 'complex-transparent-hide', label: 'Complex: Transparent + Hide' },
  ];

  const renderContent = () => (
    <>
      {Array.from({ length: 50 }, (_, i) => (
        <View key={i} className="px-5 py-3 border-b border-border">
          <Text className="text-base">List item {i + 1}</Text>
          <Text className="text-sm text-muted-foreground">Scroll to see collapse effects</Text>
        </View>
      ))}
    </>
  );

  const renderDemo = () => {
    const commonProps = {
      title: 'Header Title',
    };

    switch (activeDemo) {
      // Size variations
      case 'large-left-solid':
        return (
          <CustomHeader {...commonProps} size="large" align="left" background="solid">
            {renderContent()}
          </CustomHeader>
        );
      
      case 'medium-left-solid':
        return (
          <CustomHeader {...commonProps} size="medium" align="left" background="solid">
            {renderContent()}
          </CustomHeader>
        );
      
      case 'small-left-solid':
        return (
          <CustomHeader {...commonProps} size="small" align="left" background="solid">
            {renderContent()}
          </CustomHeader>
        );
      
      // Alignment variations
      case 'large-center-solid':
        return (
          <CustomHeader {...commonProps} size="large" align="center" background="solid">
            {renderContent()}
          </CustomHeader>
        );
      
      case 'medium-center-solid':
        return (
          <CustomHeader {...commonProps} size="medium" align="center" background="solid">
            {renderContent()}
          </CustomHeader>
        );
      
      // Background variations
      case 'large-left-transparent':
        return (
          <CustomHeader {...commonProps} size="large" align="left" background="transparent">
            {renderContent()}
          </CustomHeader>
        );
      
      case 'large-left-gradient':
        return (
          <CustomHeader {...commonProps} size="large" align="left" background="gradient">
            {renderContent()}
          </CustomHeader>
        );
      
      case 'large-left-gradient-custom':
        return (
          <CustomHeader 
            {...commonProps} 
            size="large" 
            align="left" 
            background="gradient"
            gradientColors={colorScheme === 'dark' ? ['#1a1a1a', 'transparent'] : ['#ffffff', 'transparent']}>
            {renderContent()}
          </CustomHeader>
        );
      
      // Collapse modes
      case 'large-left-shrink':
        return (
          <CustomHeader {...commonProps} size="large" align="left" background="solid" collapseMode="shrink">
            {renderContent()}
          </CustomHeader>
        );
      
      case 'large-left-hide':
        return (
          <CustomHeader {...commonProps} size="large" align="left" background="solid" collapseMode="hide">
            {renderContent()}
          </CustomHeader>
        );
      
      case 'large-left-compact':
        return (
          <CustomHeader {...commonProps} size="large" align="left" background="solid" collapseMode="compact">
            {renderContent()}
          </CustomHeader>
        );
      
      // Buttons
      case 'with-back':
        return (
          <CustomHeader 
            {...commonProps} 
            size="large" 
            align="left" 
            background="solid" 
            showBackButton
            onBackPress={() => console.log('Back pressed')}>
            {renderContent()}
          </CustomHeader>
        );
      
      case 'with-left-button':
        return (
          <CustomHeader 
            {...commonProps} 
            size="large" 
            align="left" 
            background="solid"
            leftButton={{
              icon: Settings,
              onPress: () => console.log('Settings pressed'),
              style: 'icon',
              accessibilityLabel: 'Settings',
            }}>
            {renderContent()}
          </CustomHeader>
        );
      
      case 'with-right-buttons':
        return (
          <CustomHeader 
            {...commonProps} 
            size="large" 
            align="left" 
            background="solid"
            rightButtons={[
              {
                icon: Search,
                onPress: () => console.log('Search pressed'),
                style: 'icon',
                accessibilityLabel: 'Search',
              },
            ]}>
            {renderContent()}
          </CustomHeader>
        );
      
      case 'with-multiple-buttons':
        return (
          <CustomHeader 
            {...commonProps} 
            size="large" 
            align="left" 
            background="solid"
            showBackButton
            rightButtons={[
              {
                icon: Heart,
                onPress: () => console.log('Heart pressed'),
                style: 'iconCircle',
                accessibilityLabel: 'Favorite',
              },
              {
                icon: Share2,
                onPress: () => console.log('Share pressed'),
                style: 'iconCircle',
                accessibilityLabel: 'Share',
              },
              {
                icon: MoreVertical,
                onPress: () => console.log('More pressed'),
                style: 'icon',
                accessibilityLabel: 'More',
              },
            ]}>
            {renderContent()}
          </CustomHeader>
        );
      
      // Complex combinations
      case 'complex-gradient-shrink':
        return (
          <CustomHeader 
            {...commonProps} 
            size="large" 
            align="left" 
            background="gradient"
            collapseMode="shrink"
            showBackButton
            rightButtons={[
              {
                icon: Bell,
                onPress: () => console.log('Bell pressed'),
                style: 'iconCircle',
                accessibilityLabel: 'Notifications',
              },
              {
                icon: Settings,
                onPress: () => console.log('Settings pressed'),
                style: 'icon',
                accessibilityLabel: 'Settings',
              },
            ]}>
            {renderContent()}
          </CustomHeader>
        );
      
      case 'complex-transparent-hide':
        return (
          <CustomHeader 
            {...commonProps} 
            size="large" 
            align="center" 
            background="transparent"
            collapseMode="hide"
            rightButtons={[
              {
                icon: Search,
                onPress: () => console.log('Search pressed'),
                style: 'iconCircle',
                accessibilityLabel: 'Search',
              },
            ]}>
            {renderContent()}
          </CustomHeader>
        );
      
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Demo selector at the top */}
      <View className="bg-muted/50 p-4 border-b border-border">
        <Text className="text-lg font-semibold mb-3">Select a Demo:</Text>
        <View className="flex-row flex-wrap gap-2">
          {demos.map((demo) => (
            <Button
              key={demo.id}
              variant={activeDemo === demo.id ? 'default' : 'outline'}
              size="sm"
              onPress={() => setActiveDemo(demo.id)}>
              <Text className={activeDemo === demo.id ? 'text-primary-foreground' : 'text-foreground'}>
                {demo.label}
              </Text>
            </Button>
          ))}
        </View>
      </View>

      {/* Active demo */}
      <View className="flex-1">
        {renderDemo()}
      </View>
    </View>
  );
}

