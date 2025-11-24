import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'flex flex-col gap-6 rounded-xl py-6 shadow-sm shadow-black/5',
  {
    variants: {
      variant: {
        default: 'bg-card border-border border',
        outline: 'bg-transparent border-border border',
        elevated: 'bg-card',
        gradient: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {
  gradientColors?: [string, string];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
}

function Card({ 
  className, 
  variant = 'default',
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  children,
  ...props 
}: CardProps) {
  if (variant === 'gradient' && gradientColors) {
    return (
      <TextClassContext.Provider value="text-white">
        <View className={cn('rounded-xl overflow-hidden', className)} {...props}>
          <LinearGradient
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
            className="flex flex-col gap-6 py-6">
            {children}
          </LinearGradient>
        </View>
      </TextClassContext.Provider>
    );
  }

  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(cardVariants({ variant }), className)}
        {...props}>
        {children}
      </View>
    </TextClassContext.Provider>
  );
}

function CardHeader({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function CardContent({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('px-4 py-4', className)} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
