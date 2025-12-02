import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cva, type VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';

type CardSize = 'sm' | 'md' | 'lg';

const CardSizeContext = createContext<CardSize>('md');

const cardVariants = cva(
  'flex flex-col rounded-xl shadow-sm shadow-black/5',
  {
    variants: {
      variant: {
        default: 'bg-card border-border border',
        outline: 'bg-transparent border-border border',
        elevated: 'bg-card',
        gradient: '',
      },
      size: {
        sm: 'gap-1 py-1',
        md: 'gap-4 py-4',
        lg: 'gap-6 py-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {
  gradientColors?: [string, string];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  size?: CardSize;
}

function Card({ 
  className, 
  variant = 'default',
  size = 'md',
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  children,
  ...props 
}: CardProps) {
  const sizeClasses = {
    sm: 'gap-1 py-1',
    md: 'gap-4 py-4',
    lg: 'gap-6 py-6',
  };

  if (variant === 'gradient' && gradientColors) {
    return (
      <CardSizeContext.Provider value={size}>
        <TextClassContext.Provider value="text-white">
          <View className={cn('rounded-xl overflow-hidden', className)} {...props}>
            <LinearGradient
              colors={gradientColors}
              start={gradientStart}
              end={gradientEnd}
              className={cn('flex flex-col', sizeClasses[size])}>
              {children}
            </LinearGradient>
          </View>
        </TextClassContext.Provider>
      </CardSizeContext.Provider>
    );
  }

  return (
    <CardSizeContext.Provider value={size}>
      <TextClassContext.Provider value="text-card-foreground">
        <View
          className={cn(cardVariants({ variant, size }), className)}
          {...props}>
          {children}
        </View>
      </TextClassContext.Provider>
    </CardSizeContext.Provider>
  );
}

function CardHeader({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  const size = useContext(CardSizeContext);
  const sizeClasses = {
    sm: 'px-2 gap-0.5',
    md: 'px-5 gap-1.5',
    lg: 'px-6 gap-1.5',
  };
  return <View className={cn('flex flex-col', sizeClasses[size], className)} {...props} />;
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
  const size = useContext(CardSizeContext);
  const sizeClasses = {
    sm: 'px-2',
    md: 'px-5',
    lg: 'px-6',
  };
  return <View className={cn(sizeClasses[size], className)} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  const size = useContext(CardSizeContext);
  const sizeClasses = {
    sm: 'px-2',
    md: 'px-5',
    lg: 'px-6',
  };
  return <View className={cn('flex flex-row items-center', sizeClasses[size], className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
