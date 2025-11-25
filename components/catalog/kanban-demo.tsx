// Kanban Demo - Showcases the kanban board component
import { useState } from 'react';
import { View } from 'react-native';
import * as React from 'react';
import { Kanban, type KanbanStage } from '@/components/ui/kanban';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Demo data types
interface Task {
  id: string;
  title: string;
  description?: string;
  stage: TaskStage;
  priority: 'low' | 'medium' | 'high';
  value?: number;
}

type TaskStage = 'todo' | 'in_progress' | 'review' | 'done';

// Stage definitions
const TASK_STAGES: KanbanStage<TaskStage>[] = [
  { id: 'todo', label: 'To Do', color: '#6B7280', colorDark: '#9CA3AF' },
  { id: 'in_progress', label: 'In Progress', color: '#3B82F6', colorDark: '#60A5FA' },
  { id: 'review', label: 'Review', color: '#F59E0B', colorDark: '#FBBF24' },
  { id: 'done', label: 'Done', color: '#10B981', colorDark: '#34D399' },
];

export function KanbanDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups',
      stage: 'todo',
      priority: 'high',
      value: 1200,
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add JWT token handling',
      stage: 'todo',
      priority: 'high',
      value: 2000,
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all endpoints',
      stage: 'in_progress',
      priority: 'medium',
      value: 800,
    },
    {
      id: '4',
      title: 'Setup CI/CD pipeline',
      description: 'Configure GitHub Actions',
      stage: 'in_progress',
      priority: 'high',
      value: 1500,
    },
    {
      id: '5',
      title: 'Fix navigation bug',
      description: 'Deep links not working on Android',
      stage: 'review',
      priority: 'high',
      value: 500,
    },
    {
      id: '6',
      title: 'Update dependencies',
      description: 'Upgrade React Native to latest',
      stage: 'done',
      priority: 'low',
      value: 300,
    },
    {
      id: '7',
      title: 'Add dark mode support',
      description: 'Theme switching functionality',
      stage: 'done',
      priority: 'medium',
      value: 1000,
    },
  ]);

  const handleMoveTask = (task: Task, toStage: TaskStage) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, stage: toStage } : t))
    );
  };

  const renderCard = (task: Task, onLongPress: () => void) => {
    const priorityColors = {
      low: 'bg-blue-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-500',
    };

    return (
      <Card className="mb-3">
        <CardContent className="p-3">
          <View className="mb-2 flex-row items-start justify-between">
            <Text className="flex-1 font-semibold text-foreground">{task.title}</Text>
            <View className={`ml-2 h-2 w-2 rounded-full ${priorityColors[task.priority]}`} />
          </View>
          
          {task.description && (
            <Text className="mb-2 text-sm text-muted-foreground">{task.description}</Text>
          )}
          
          {task.value && (
            <Badge variant="secondary">
              <Text className="text-xs">${task.value}</Text>
            </Badge>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderEmptyState = (stage: TaskStage, stageLabel: string) => {
    return (
      <View className="p-4">
        <Text className="text-center text-sm text-muted-foreground">
          No tasks in {stageLabel}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View className="mb-4 px-6">
        <Text variant="h3" className="mb-2 text-foreground">
          Kanban Board
        </Text>
        <Text className="text-sm text-muted-foreground">
          Long press on any card to move it between stages. Tap to view details (if onCardPress is configured).
        </Text>
      </View>

      <View className="flex-1">
        <Kanban<Task, TaskStage>
          data={tasks}
          stageKey="stage"
          stages={TASK_STAGES}
          renderCard={renderCard}
          renderEmptyState={renderEmptyState}
          onMoveItem={handleMoveTask}
          valueExtractor={(task) => task.value || 0}
          formatValue={(total) => `$${total.toLocaleString()}`}
          columnWidth={280}
          columnMinHeight={500}
          enableHaptics
        />
      </View>

      <View className="mt-4 mx-6 rounded-lg bg-muted p-4">
        <Text className="mb-2 font-semibold text-foreground">Features:</Text>
        <Text className="mb-1 text-sm text-muted-foreground">• Horizontal scrolling stages</Text>
        <Text className="mb-1 text-sm text-muted-foreground">• Long press to move items</Text>
        <Text className="mb-1 text-sm text-muted-foreground">• Stage totals with custom formatting</Text>
        <Text className="mb-1 text-sm text-muted-foreground">• Empty state rendering</Text>
        <Text className="mb-1 text-sm text-muted-foreground">• Haptic feedback</Text>
        <Text className="text-sm text-muted-foreground">• Fully typed with generics</Text>
      </View>
    </View>
  );
}

