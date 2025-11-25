import { useState, useCallback, useMemo, useRef, type ReactNode } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import * as Haptics from 'expo-haptics';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export interface KanbanStage<S extends string> {
  id: S;
  label: string;
  color: string;  // light mode color
  colorDark?: string;  // optional dark mode color, falls back to color
}

export interface KanbanProps<T, S extends string> {
  // Data
  data: T[];
  stageKey: keyof T;  // Property name that holds the stage value
  stages: KanbanStage<S>[];
  
  // Rendering
  renderCard: (item: T, onLongPress: () => void) => ReactNode;
  renderEmptyState: (stage: S, stageLabel: string) => ReactNode;
  
  // Callbacks
  onMoveItem: (item: T, toStage: S) => void;
  onCardPress?: (item: T) => void;
  
  // Optional features
  valueExtractor?: (item: T) => number;
  formatValue?: (total: number) => string;
  
  // Customization
  columnWidth?: number;  // default: 256 (64 * 4)
  columnMinHeight?: number;  // default: 400
  enableHaptics?: boolean;  // default: true
  
  // Bottom sheet override
  renderMoveSheet?: (
    item: T | null,
    stages: KanbanStage<S>[],
    onMove: (stage: S) => void,
    onClose: () => void
  ) => ReactNode;
}

export function Kanban<T, S extends string>({
  data,
  stageKey,
  stages,
  renderCard,
  renderEmptyState,
  onMoveItem,
  onCardPress,
  valueExtractor,
  formatValue,
  columnWidth = 256,
  columnMinHeight = 400,
  enableHaptics = true,
  renderMoveSheet,
}: KanbanProps<T, S>) {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const backgroundColor = colorScheme === 'dark' ? '#0a0a0a' : '#ffffff';
  const snapPoints = useMemo(() => ['50%'], []);

  // Filter items by stage
  const getItemsByStage = useCallback(
    (stageId: S): T[] => {
      return data.filter((item) => item[stageKey] === stageId);
    },
    [data, stageKey]
  );

  // Calculate stage total value
  const getStageTotal = useCallback(
    (stageId: S): number => {
      if (!valueExtractor) return 0;
      const items = getItemsByStage(stageId);
      return items.reduce((sum, item) => sum + valueExtractor(item), 0);
    },
    [getItemsByStage, valueExtractor]
  );

  // Get stage color based on theme
  const getStageColor = useCallback(
    (stage: KanbanStage<S>): string => {
      return colorScheme === 'dark' && stage.colorDark ? stage.colorDark : stage.color;
    },
    [colorScheme]
  );

  // Handle long press on card
  const handleCardLongPress = useCallback(
    (item: T) => {
      if (enableHaptics) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setSelectedItem(item);
      bottomSheetRef.current?.snapToIndex(0);
    },
    [enableHaptics]
  );

  // Handle card press
  const handleCardPress = useCallback(
    (item: T) => {
      if (onCardPress) {
        onCardPress(item);
      }
    },
    [onCardPress]
  );

  // Handle move to stage
  const handleMoveToStage = useCallback(
    (stage: S) => {
      if (selectedItem) {
        onMoveItem(selectedItem, stage);
        bottomSheetRef.current?.close();
        setSelectedItem(null);
      }
    },
    [selectedItem, onMoveItem]
  );

  // Handle bottom sheet close
  const handleBottomSheetClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setSelectedItem(null);
  }, []);

  // Render backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  // Render default bottom sheet
  const renderDefaultMoveSheet = useCallback(() => {
    const currentStage = selectedItem ? selectedItem[stageKey] : null;

    return (
      <BottomSheetView className="flex-1 px-6 pb-8">
        <Text className="mb-4 text-center text-lg font-semibold text-foreground">
          Move to Stage
        </Text>
        <View className="gap-2">
          {stages.map((stage) => {
            const isCurrentStage = currentStage === stage.id;
            return (
              <Pressable
                key={stage.id}
                onPress={() => handleMoveToStage(stage.id)}
                disabled={isCurrentStage}
                className={cn(
                  'flex-row items-center gap-3 rounded-xl p-4',
                  isCurrentStage ? 'bg-muted' : 'bg-card'
                )}>
                <View
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: getStageColor(stage) }}
                />
                <Text
                  className={cn(
                    'flex-1 font-medium',
                    isCurrentStage ? 'text-muted-foreground' : 'text-foreground'
                  )}>
                  {stage.label}
                </Text>
                {isCurrentStage && (
                  <Badge variant="secondary">
                    <Text>Current</Text>
                  </Badge>
                )}
              </Pressable>
            );
          })}
        </View>
      </BottomSheetView>
    );
  }, [selectedItem, stages, stageKey, handleMoveToStage, getStageColor]);

  return (
    <>
      <View className="flex-1">
        {/* Horizontal scrolling kanban */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          {stages.map((stage) => {
            const stageItems = getItemsByStage(stage.id);
            const stageTotal = getStageTotal(stage.id);
            const stageColor = getStageColor(stage);

            return (
              <View
                key={stage.id}
                className="mr-4 rounded-xl bg-muted/50 p-3"
                style={{ width: columnWidth, minHeight: columnMinHeight }}>
                {/* Stage Header */}
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <View
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: stageColor }}
                    />
                    <Text className="font-semibold text-foreground">
                      {stage.label}
                    </Text>
                  </View>
                  <Badge variant="secondary">
                    <Text>{stageItems.length}</Text>
                  </Badge>
                </View>

                {/* Stage Value */}
                {valueExtractor && stageTotal > 0 && (
                  <View className="mb-3 rounded-lg bg-card p-2">
                    <Text className="text-center text-sm font-medium text-green-600">
                      {formatValue ? formatValue(stageTotal) : stageTotal}
                    </Text>
                  </View>
                )}

                {/* Items */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1 }}
                  contentContainerStyle={{ flexGrow: 1 }}>
                  {stageItems.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                      {renderEmptyState(stage.id, stage.label)}
                    </View>
                  ) : (
                    stageItems.map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleCardPress(item)}
                        onLongPress={() => handleCardLongPress(item)}
                        delayLongPress={300}>
                        {renderCard(item, () => handleCardLongPress(item))}
                      </Pressable>
                    ))
                  )}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#9ca3af', width: 48, height: 4 }}
        backgroundStyle={{ backgroundColor, borderRadius: 24 }}>
        {renderMoveSheet
          ? renderMoveSheet(selectedItem, stages, handleMoveToStage, handleBottomSheetClose)
          : renderDefaultMoveSheet()}
      </BottomSheet>
    </>
  );
}

