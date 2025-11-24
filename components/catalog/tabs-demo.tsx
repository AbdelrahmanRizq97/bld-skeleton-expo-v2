import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { View } from 'react-native';
import * as React from 'react';

export function TabsDemo() {
  const [tab, setTab] = React.useState('tab1');

  return (
    <View className="gap-8">
      {/* Basic */}
      <View className="gap-3">
        <Text variant="h3">Basic Tabs</Text>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="tab1">
              <Text>Tab 1</Text>
            </TabsTrigger>
            <TabsTrigger value="tab2">
              <Text>Tab 2</Text>
            </TabsTrigger>
            <TabsTrigger value="tab3">
              <Text>Tab 3</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <View className="py-4">
              <Text>Content for Tab 1</Text>
            </View>
          </TabsContent>
          <TabsContent value="tab2">
            <View className="py-4">
              <Text>Content for Tab 2</Text>
            </View>
          </TabsContent>
          <TabsContent value="tab3">
            <View className="py-4">
              <Text>Content for Tab 3</Text>
            </View>
          </TabsContent>
        </Tabs>
      </View>

      {/* With Cards */}
      <View className="gap-3">
        <Text variant="h3">Tabs with Cards</Text>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">
              <Text>Account</Text>
            </TabsTrigger>
            <TabsTrigger value="password">
              <Text>Password</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Account settings content would go here.</Text>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Password settings content would go here.</Text>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </View>

      {/* Multiple Tabs */}
      <View className="gap-3">
        <Text variant="h3">More Tabs</Text>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">
              <Text>Overview</Text>
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Text>Analytics</Text>
            </TabsTrigger>
            <TabsTrigger value="reports">
              <Text>Reports</Text>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Text>Settings</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <View className="rounded-md border border-border p-4">
              <Text>Overview dashboard</Text>
            </View>
          </TabsContent>
          <TabsContent value="analytics">
            <View className="rounded-md border border-border p-4">
              <Text>Analytics data</Text>
            </View>
          </TabsContent>
          <TabsContent value="reports">
            <View className="rounded-md border border-border p-4">
              <Text>Generated reports</Text>
            </View>
          </TabsContent>
          <TabsContent value="settings">
            <View className="rounded-md border border-border p-4">
              <Text>Settings panel</Text>
            </View>
          </TabsContent>
        </Tabs>
      </View>
    </View>
  );
}

