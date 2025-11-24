import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function DialogDemo() {
  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Dialog</Text>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Text>Open Dialog</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description. You can add any content here.
              </DialogDescription>
            </DialogHeader>
            <View className="py-4">
              <Text>Dialog content goes here.</Text>
            </View>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  <Text>Close</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>

      {/* With Form */}
      <View className="gap-3">
        <Text variant="h3">Dialog with Form</Text>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Text>Edit Profile</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <View className="gap-4 py-4">
              <View className="gap-2">
                <Label nativeID="name">Name</Label>
                <Input placeholder="John Doe" aria-labelledby="name" />
              </View>
              <View className="gap-2">
                <Label nativeID="email">Email</Label>
                <Input
                  placeholder="john@example.com"
                  keyboardType="email-address"
                  aria-labelledby="email"
                />
              </View>
            </View>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>Save Changes</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>

      {/* Confirmation Dialog */}
      <View className="gap-3">
        <Text variant="h3">Confirmation Dialog</Text>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Text>Delete Item</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the item.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  <Text>Cancel</Text>
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">
                  <Text>Delete</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    </View>
  );
}

