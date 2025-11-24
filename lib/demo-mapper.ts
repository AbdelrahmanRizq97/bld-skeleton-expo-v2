import { AccordionDemo } from '@/components/demos/accordion-demo';
import { ActionSheetDemo } from '@/components/demos/actionsheet-demo';
import { AlertDemo } from '@/components/demos/alert-demo';
import { AlertDialogDemo } from '@/components/demos/alertdialog-demo';
import { AspectRatioDemo } from '@/components/demos/aspectratio-demo';
import { AvatarDemo } from '@/components/demos/avatar-demo';
import { BadgeDemo } from '@/components/demos/badge-demo';
import { ButtonDemo } from '@/components/demos/button-demo';
import { CalendarViewDemo } from '@/components/demos/calendarview-demo';
import { CardDemo } from '@/components/demos/card-demo';
import { CheckboxDemo } from '@/components/demos/checkbox-demo';
import { CollapsibleDemo } from '@/components/demos/collapsible-demo';
import { ContextMenuDemo } from '@/components/demos/contextmenu-demo';
import CustomHeaderDemo from '@/components/demos/customheader-demo';
import { DatePickerDemo } from '@/components/demos/datepicker-demo';
import { DialogDemo } from '@/components/demos/dialog-demo';
import { DropdownMenuDemo } from '@/components/demos/dropdownmenu-demo';
import { HoverCardDemo } from '@/components/demos/hovercard-demo';
import { InputDemo } from '@/components/demos/input-demo';
import { LabelDemo } from '@/components/demos/label-demo';
import { MenubarDemo } from '@/components/demos/menubar-demo';
import { PopoverDemo } from '@/components/demos/popover-demo';
import { ProgressDemo } from '@/components/demos/progress-demo';
import { RadioGroupDemo } from '@/components/demos/radiogroup-demo';
import { SelectDemo } from '@/components/demos/select-demo';
import { SeparatorDemo } from '@/components/demos/separator-demo';
import { SkeletonDemo } from '@/components/demos/skeleton-demo';
import { SliderDemo } from '@/components/demos/slider-demo';
import { SwitchDemo } from '@/components/demos/switch-demo';
import { TabsDemo } from '@/components/demos/tabs-demo';
import { TextDemo } from '@/components/demos/text-demo';
import { TextareaDemo } from '@/components/demos/textarea-demo';
import { ToastDemo } from '@/components/demos/toast-demo';
import { ToggleDemo } from '@/components/demos/toggle-demo';
import { ToggleGroupDemo } from '@/components/demos/togglegroup-demo';
import { TooltipDemo } from '@/components/demos/tooltip-demo';

type DemoComponent = () => JSX.Element;

const DEMO_MAP: Record<string, DemoComponent> = {
  Accordion: AccordionDemo,
  ActionSheet: ActionSheetDemo,
  Alert: AlertDemo,
  AlertDialog: AlertDialogDemo,
  AspectRatio: AspectRatioDemo,
  Avatar: AvatarDemo,
  Badge: BadgeDemo,
  Button: ButtonDemo,
  CalendarView: CalendarViewDemo,
  Card: CardDemo,
  Checkbox: CheckboxDemo,
  Collapsible: CollapsibleDemo,
  ContextMenu: ContextMenuDemo,
  CustomHeader: CustomHeaderDemo,
  DatePicker: DatePickerDemo,
  Dialog: DialogDemo,
  DropdownMenu: DropdownMenuDemo,
  HoverCard: HoverCardDemo,
  Input: InputDemo,
  Label: LabelDemo,
  Menubar: MenubarDemo,
  Popover: PopoverDemo,
  Progress: ProgressDemo,
  RadioGroup: RadioGroupDemo,
  Select: SelectDemo,
  Separator: SeparatorDemo,
  Skeleton: SkeletonDemo,
  Slider: SliderDemo,
  Switch: SwitchDemo,
  Tabs: TabsDemo,
  Text: TextDemo,
  Textarea: TextareaDemo,
  Toast: ToastDemo,
  Toggle: ToggleDemo,
  ToggleGroup: ToggleGroupDemo,
  Tooltip: TooltipDemo,
};

export function getDemoComponent(componentName: string): DemoComponent | null {
  return DEMO_MAP[componentName] || null;
}

