import { useState, useRef, useEffect } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, type LucideIcon } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
  Extrapolate,
} from 'react-native-reanimated';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/text';

export interface HeaderButton {
  icon: LucideIcon;
  onPress: () => void;
  style?: 'icon' | 'iconCircle';
  accessibilityLabel?: string;
}

export interface CustomHeaderProps {
  title: string;
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center';
  background?: 'transparent' | 'solid' | 'gradient';
  collapseMode?: 'none' | 'shrink' | 'hide' | 'compact';
  showBackButton?: boolean;
  onBackPress?: () => void;
  leftButton?: HeaderButton;
  rightButtons?: HeaderButton[];
  children: React.ReactNode;
  className?: string;
  gradientColors?: [string, string]; // [startColor, endColor] - defaults to theme background to transparent
  contentClassName?: string;
}

const TITLE_SIZES = {
  small: 17,
  medium: 28,
  large: 34,
};

const HEADER_HEIGHTS = {
  small: 44,
  medium: 60,
  large: 80,
};

export function CustomHeader({
  title,
  size = 'large',
  align = 'left',
  background = 'solid',
  collapseMode = 'none',
  showBackButton = false,
  onBackPress,
  leftButton,
  rightButtons = [],
  children,
  className = '',
  gradientColors,
  contentClassName = '',
}: CustomHeaderProps) {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const headerVisible = useSharedValue(1);

  // Default gradient colors based on theme
  const defaultGradientColors: [string, string] = [
    theme.colors.background,
    'transparent'
  ];
  const finalGradientColors = gradientColors || defaultGradientColors;

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      scrollY.value = currentScrollY;

      if (collapseMode === 'hide') {
        const diff = currentScrollY - lastScrollY.value;
        
        if (diff > 5 && currentScrollY > 50) {
          // Scrolling down - hide header
          headerVisible.value = withTiming(0, { duration: 200 });
        } else if (diff < -5 || currentScrollY < 50) {
          // Scrolling up or near top - show header
          headerVisible.value = withTiming(1, { duration: 200 });
        }
      }
      
      lastScrollY.value = currentScrollY;
    },
  });

  // Animated styles based on collapse mode
  const animatedHeaderStyle = useAnimatedStyle(() => {
    if (collapseMode === 'shrink' && size === 'large') {
      const fontSize = interpolate(
        scrollY.value,
        [0, 50],
        [TITLE_SIZES.large, TITLE_SIZES.small],
        Extrapolate.CLAMP
      );
      const paddingBottom = interpolate(
        scrollY.value,
        [0, 50],
        [16, 8],
        Extrapolate.CLAMP
      );
      return {
        paddingBottom,
      };
    }

    if (collapseMode === 'hide') {
      const translateY = interpolate(
        headerVisible.value,
        [0, 1],
        [-HEADER_HEIGHTS[size] - insets.top, 0],
        Extrapolate.CLAMP
      );
      return {
        transform: [{ translateY }],
        opacity: headerVisible.value, // Direct linear fade
      };
    }

    if (collapseMode === 'compact') {
      const paddingBottom = interpolate(
        scrollY.value,
        [0, 50],
        [16, 4],
        Extrapolate.CLAMP
      );
      return {
        paddingBottom,
      };
    }

    return {};
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    if (collapseMode === 'shrink' && size === 'large') {
      const fontSize = interpolate(
        scrollY.value,
        [0, 50],
        [TITLE_SIZES.large, TITLE_SIZES.small],
        Extrapolate.CLAMP
      );
      return {
        fontSize,
      };
    }
    return {};
  });

  // Animated style for gradient overlay (matches header fade)
  const animatedGradientStyle = useAnimatedStyle(() => {
    if (collapseMode === 'hide') {
      return { opacity: headerVisible.value }; // Direct linear fade
    }
    return {};
  });

  // Handle back button press
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  // Render button
  const renderButton = (button: HeaderButton, index: number) => {
    const Icon = button.icon;
    const isCircle = button.style === 'iconCircle';

    return (
      <Pressable
        key={index}
        onPress={button.onPress}
        accessibilityLabel={button.accessibilityLabel}
        style={{ paddingHorizontal: 8 }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        {({ pressed }) => (
          <View
            className={cn(
              isCircle && 'h-10 w-10 items-center justify-center rounded-full bg-muted/80',
              pressed && 'opacity-50'
            )}>
            <Icon
              size={isCircle ? 20 : 25}
              color={theme.colors.primary}
              strokeWidth={2.5}
            />
          </View>
        )}
      </Pressable>
    );
  };

  // Render header background
  const renderBackground = () => {
    // Only render solid background when explicitly set to 'solid'
    // Both 'transparent' and 'gradient' modes should have no background here
    if (background === 'solid') {
      return (
        <View className="absolute inset-0 bg-background" pointerEvents="none" />
      );
    }
    
    return null;
  };

  const titleFontSize = TITLE_SIZES[size];
  const titleLineHeight = size === 'large' ? 44 : size === 'medium' ? 36 : 24;
  const headerPaddingTop = insets.top;
  const headerPaddingBottom = collapseMode === 'none' ? 20 : 12;
  const buttonRowHeight = titleLineHeight + 16 + headerPaddingBottom; // Line height + padding + bottom padding

  return (
    <View className={cn('flex-1', 'bg-background')}>
      {/* Gradient overlay */}
      {background === 'gradient' && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: headerPaddingTop + buttonRowHeight, // Match exact header height
              zIndex: 999,
            },
            animatedGradientStyle,
          ]}
          pointerEvents="none">
          <LinearGradient
            colors={[finalGradientColors[0], finalGradientColors[0], finalGradientColors[1]]}
            locations={[0, 0.65, 1]}
            style={{ flex: 1 }}
            pointerEvents="none"
          />
        </Animated.View>
      )}

      {/* Header */}
      <Animated.View
        style={[
          {
            paddingTop: headerPaddingTop,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          },
          animatedHeaderStyle,
        ]}
        className={cn(background !== 'gradient' && 'border-b border-border', className)}>
        {renderBackground()}

        <View 
          className="flex-row items-center justify-between px-5" 
          style={{ 
            paddingBottom: headerPaddingBottom, 
            minHeight: buttonRowHeight,
          }}>
          {/* Left side - back button or left button */}
          <View className="flex-row items-center" style={align === 'center' ? { flex: 1 } : undefined}>
            {showBackButton && !leftButton && (
              <Pressable
                onPress={handleBackPress}
                style={{ paddingHorizontal: 4, marginRight: 12 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {({ pressed }) => (
                  <ChevronLeft
                    size={25}
                    color={theme.colors.primary}
                    strokeWidth={2.5}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            )}
            {leftButton && renderButton(leftButton, -1)}
          </View>

          {/* Title */}
          {collapseMode === 'shrink' && size === 'large' ? (
            <Animated.Text
              style={[
                {
                  fontSize: titleFontSize,
                  lineHeight: titleLineHeight,
                  fontWeight: '700',
                  color: theme.colors.text,
                  textAlign: align,
                  flex: align === 'center' ? 2 : 1,
                },
                animatedTitleStyle,
              ]}
              className={align === 'center' ? '' : 'flex-1'}>
              {title}
            </Animated.Text>
          ) : (
            <Text
              style={{
                fontSize: titleFontSize,
                lineHeight: titleLineHeight,
                fontWeight: '700',
                textAlign: align,
                flex: align === 'center' ? 2 : 1,
              }}
              className={align === 'center' ? '' : 'flex-1 text-foreground'}>
              {title}
            </Text>
          )}

          {/* Right buttons */}
          <View className="flex-row items-center justify-end" style={align === 'center' ? { flex: 1 } : undefined}>
            {rightButtons.slice(0, 4).map((button, index) => renderButton(button, index))}
          </View>
        </View>
      </Animated.View>

      {/* Scrollable content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className={cn('flex-1', contentClassName)}
        contentContainerStyle={{
          paddingTop: headerPaddingTop + buttonRowHeight, // Content scrolls under header
        }}>
        {children}
      </Animated.ScrollView>
    </View>
  );
}

