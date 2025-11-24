import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function AccordionDemo() {
  return (
    <View className="gap-8">
      {/* Single Collapsible */}
      <View className="gap-3">
        <Text variant="h3">Single Collapsible</Text>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text>Is it accessible?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Text>Is it styled?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>
                Yes. It comes with default styles that match the other components aesthetic.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <Text>Is it animated?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>Yes. It's animated by default with smooth transitions.</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>

      {/* Multiple Open */}
      <View className="gap-3">
        <Text variant="h3">Multiple Items Open</Text>
        <Accordion type="multiple" defaultValue={['faq-1', 'faq-2']}>
          <AccordionItem value="faq-1">
            <AccordionTrigger>
              <Text>What is this component?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>An accordion component that can have multiple items open at once.</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>
              <Text>How do I use it?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>Set type to "multiple" to allow multiple items to be open simultaneously.</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>
              <Text>Can I customize it?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>Yes, you can customize the styling using className props.</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>
    </View>
  );
}

