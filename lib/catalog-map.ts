import { AccordionDemo } from '@/components/catalog/accordion-demo';
import { ActionSheetDemo } from '@/components/catalog/actionsheet-demo';
import { AlertDemo } from '@/components/catalog/alert-demo';
import { AlertDialogDemo } from '@/components/catalog/alertdialog-demo';
import { AspectRatioDemo } from '@/components/catalog/aspectratio-demo';
import { AvatarDemo } from '@/components/catalog/avatar-demo';
import { BadgeDemo } from '@/components/catalog/badge-demo';
import { ButtonDemo } from '@/components/catalog/button-demo';
import { CalendarViewDemo } from '@/components/catalog/calendarview-demo';
import { CardDemo } from '@/components/catalog/card-demo';
import { CheckboxDemo } from '@/components/catalog/checkbox-demo';
import { CollapsibleDemo } from '@/components/catalog/collapsible-demo';
import { ContextMenuDemo } from '@/components/catalog/contextmenu-demo';
import { DatePickerDemo } from '@/components/catalog/datepicker-demo';
import { DialogDemo } from '@/components/catalog/dialog-demo';
import { DropdownMenuDemo } from '@/components/catalog/dropdownmenu-demo';
import { HoverCardDemo } from '@/components/catalog/hovercard-demo';
import { InputDemo } from '@/components/catalog/input-demo';
import { KanbanDemo } from '@/components/catalog/kanban-demo';
import { LabelDemo } from '@/components/catalog/label-demo';
import { MenubarDemo } from '@/components/catalog/menubar-demo';
import { PopoverDemo } from '@/components/catalog/popover-demo';
import { ProgressDemo } from '@/components/catalog/progress-demo';
import { RadioGroupDemo } from '@/components/catalog/radiogroup-demo';
import { SelectDemo } from '@/components/catalog/select-demo';
import { SeparatorDemo } from '@/components/catalog/separator-demo';
import { SkeletonDemo } from '@/components/catalog/skeleton-demo';
import { SliderDemo } from '@/components/catalog/slider-demo';
import { SwitchDemo } from '@/components/catalog/switch-demo';
import { TabsDemo } from '@/components/catalog/tabs-demo';
import { TextDemo } from '@/components/catalog/text-demo';
import { TextareaDemo } from '@/components/catalog/textarea-demo';
import { ToastDemo } from '@/components/catalog/toast-demo';
import { ToggleDemo } from '@/components/catalog/toggle-demo';
import { ToggleGroupDemo } from '@/components/catalog/togglegroup-demo';
import { TooltipDemo } from '@/components/catalog/tooltip-demo';
import CustomHeaderDemo from '@/components/catalog/customheader-demo';


type DemoComponent = () => JSX.Element;

const CATALOG_MAP: Record<string, DemoComponent> = {
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
  Kanban: KanbanDemo,
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
  return CATALOG_MAP[componentName] || null;
}

