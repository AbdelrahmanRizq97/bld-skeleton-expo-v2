import { CalendarView } from '@/components/ui/calendar-view';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface Event {
  id: string;
  name: string;
  startDate: Date;
  type: 'meeting' | 'deadline' | 'reminder';
  priority: 'high' | 'medium' | 'low';
}

export function CalendarViewDemo() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  // Sample tasks
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Complete project proposal',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      completed: false,
      priority: 'high',
    },
    {
      id: '2',
      title: 'Review code changes',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      completed: true,
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Update documentation',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      completed: false,
      priority: 'low',
    },
    {
      id: '4',
      title: 'Team meeting prep',
      dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      completed: true,
      priority: 'high',
    },
    {
      id: '5',
      title: 'Bug fixes',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      completed: false,
      priority: 'high',
    },
  ];

  // Sample events
  const busyDate = new Date(new Date().setDate(new Date().getDate() + 3));
  const events: Event[] = [
    {
      id: '1',
      name: 'Product Review',
      startDate: busyDate,
      type: 'meeting',
      priority: 'high',
    },
    {
      id: '2',
      name: 'Launch Deadline',
      startDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      type: 'deadline',
      priority: 'high',
    },
    {
      id: '3',
      name: 'Team Standup',
      startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: 'meeting',
      priority: 'medium',
    },
    {
      id: '4',
      name: 'Submit Report',
      startDate: new Date(new Date().setDate(new Date().getDate() + 6)),
      type: 'reminder',
      priority: 'medium',
    },
    // Multiple events on the same day to test overload (6 indicators total)
    {
      id: '5',
      name: 'Client Call',
      startDate: busyDate,
      type: 'meeting',
      priority: 'medium',
    },
    {
      id: '6',
      name: 'Project Deadline',
      startDate: busyDate,
      type: 'deadline',
      priority: 'high',
    },
    {
      id: '7',
      name: 'Follow-up Reminder',
      startDate: busyDate,
      type: 'reminder',
      priority: 'low',
    },
  ];

  const handleTaskDateSelect = (date: Date) => {
    setSelectedDate(date);
    const tasksOnDate = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === selectedDate.getTime();
    });
    console.log('Tasks on', date.toLocaleDateString(), ':', tasksOnDate);
  };

  const handleEventDateSelect = (date: Date) => {
    setSelectedDate(date);
    const eventsOnDate = events.filter((event) => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === selectedDate.getTime();
    });
    console.log('Events on', date.toLocaleDateString(), ':', eventsOnDate);
  };

  return (
    <View className="gap-8">
      {/* Tasks Calendar */}
      <View className="gap-3">
        <Text variant="h3">Task Calendar</Text>
        <Text variant="muted" className="text-sm">
          Shows active tasks (red) and completed tasks (green) with due dates.
        </Text>
        <CalendarView<Task>
          items={tasks}
          getItemDate={(task) => task.dueDate}
          indicators={[
            { predicate: (task) => !task.completed, color: 'bg-red-500' },
            { predicate: (task) => task.completed, color: 'bg-green-500' },
          ]}
          legendItems={[
            { color: 'bg-red-500', label: 'Active' },
            { color: 'bg-green-500', label: 'Completed' },
          ]}
          onDateSelect={handleTaskDateSelect}
        />
      </View>

      {/* Events Calendar with Multiple Indicators */}
      <View className="gap-3">
        <Text variant="h3">Event Calendar (Overload Test)</Text>
        <Text variant="muted" className="text-sm">
          Shows 6 different indicators on a busy day. Check 3 days from today!
        </Text>
        <CalendarView<Event>
          items={events}
          getItemDate={(event) => event.startDate}
          indicators={[
            { predicate: (e) => e.type === 'meeting', color: 'bg-blue-500' },
            { predicate: (e) => e.type === 'deadline', color: 'bg-red-500' },
            { predicate: (e) => e.type === 'reminder', color: 'bg-yellow-500' },
            { predicate: (e) => e.priority === 'high', color: 'bg-orange-500' },
            { predicate: (e) => e.priority === 'medium', color: 'bg-purple-500' },
            { predicate: (e) => e.priority === 'low', color: 'bg-green-500' },
          ]}
          legendItems={[
            { color: 'bg-blue-500', label: 'Meeting' },
            { color: 'bg-red-500', label: 'Deadline' },
            { color: 'bg-yellow-500', label: 'Reminder' },
            { color: 'bg-orange-500', label: 'High Priority' },
            { color: 'bg-purple-500', label: 'Medium Priority' },
            { color: 'bg-green-500', label: 'Low Priority' },
          ]}
          onDateSelect={handleEventDateSelect}
        />
      </View>

      {/* Priority-based Calendar */}
      <View className="gap-3">
        <Text variant="h3">Priority View</Text>
        <Text variant="muted" className="text-sm">
          Shows only task priorities: high (red), medium (yellow), low (green).
        </Text>
        <CalendarView<Task>
          items={tasks}
          getItemDate={(task) => task.dueDate}
          indicators={[
            { predicate: (t) => t.priority === 'high', color: 'bg-red-500' },
            { predicate: (t) => t.priority === 'medium', color: 'bg-yellow-500' },
            { predicate: (t) => t.priority === 'low', color: 'bg-green-500' },
          ]}
          legendItems={[
            { color: 'bg-red-500', label: 'High' },
            { color: 'bg-yellow-500', label: 'Medium' },
            { color: 'bg-green-500', label: 'Low' },
          ]}
          onDateSelect={handleTaskDateSelect}
        />
      </View>

      {/* Usage Info */}
      <View className="rounded-md border border-border bg-muted/50 p-4 mx-4">
        <Text variant="small" className="font-semibold mb-2">
          Key Features
        </Text>
        <View className="gap-1">
          <Text variant="muted" className="text-sm">
            • Generic type support - works with any dated items
          </Text>
          <Text variant="muted" className="text-sm">
            • Multiple indicators per day based on custom predicates
          </Text>
          <Text variant="muted" className="text-sm">
            • Customizable legend with color labels
          </Text>
          <Text variant="muted" className="text-sm">
            • Today's date has filled background
          </Text>
          <Text variant="muted" className="text-sm">
            • Selected dates show primary border
          </Text>
          <Text variant="muted" className="text-sm">
            • Month navigation with chevron arrows
          </Text>
        </View>
        {selectedDate && (
          <View className="mt-3 pt-3 border-t border-border">
            <Text variant="small" className="font-semibold">
              Selected Date: {selectedDate.toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

