import RNSlider from '@react-native-community/slider';
import { Platform } from 'react-native';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

function Slider({
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  ...props
}: React.ComponentProps<typeof RNSlider>) {
  const { colorScheme } = useColorScheme();
  const colors = THEME[colorScheme ?? 'light'];
  
  return (
    <RNSlider
      thumbTintColor={thumbTintColor ?? (Platform.OS === 'ios' ? '#FFFFFF' : colors.primary)}
      minimumTrackTintColor={minimumTrackTintColor ?? colors.primary}
      maximumTrackTintColor={
        maximumTrackTintColor ?? (Platform.OS === 'android' ? colors.primary : undefined)
      }
      minimumValue={0}
      maximumValue={1}
      {...props}
    />
  );
}

export { Slider };
