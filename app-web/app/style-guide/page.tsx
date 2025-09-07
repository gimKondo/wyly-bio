'use client';

import { ColorPalette } from '@/components/style-guide/color-palette';
import { Typography } from '@/components/style-guide/typography';
import { Spacing } from '@/components/style-guide/spacing';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useIsMobile, useIsDesktop } from '@/hooks/use-media-query';

export default function StyleGuidePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { currentBreakpoint, width } = useBreakpoint();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Wyly Style Guide</h1>
          <p className="text-lg text-muted-foreground">
            Design system components and guidelines for consistent UI development
          </p>
        </div>

        <Card className="p-4 bg-muted/50">
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="font-semibold">Current Theme:</span> {resolvedTheme}
            </div>
            <div>
              <span className="font-semibold">Breakpoint:</span> {currentBreakpoint}
            </div>
            <div>
              <span className="font-semibold">Width:</span> {width}px
            </div>
            <div>
              <span className="font-semibold">Device:</span>{' '}
              {isMobile ? 'Mobile' : isDesktop ? 'Desktop' : 'Tablet'}
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="colors" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-8">
          <ColorPalette />
        </TabsContent>

        <TabsContent value="typography" className="space-y-8">
          <Typography />
        </TabsContent>

        <TabsContent value="spacing" className="space-y-8">
          <Spacing />
        </TabsContent>

        <TabsContent value="components" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Components</h2>
            <p className="text-muted-foreground mb-6">
              Interactive UI components from the design system
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled Input</Label>
                  <Input id="disabled" disabled placeholder="This is disabled" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Badges</h3>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Avatars</h3>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Skeleton Loading</h3>
              <div className="space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Dropdown Menu</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Dialog</h3>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account and
                      remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>Continue</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Theme Switcher</h3>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                >
                  System
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
