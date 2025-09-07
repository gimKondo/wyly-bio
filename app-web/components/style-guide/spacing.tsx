'use client';

import { Card } from '@/components/ui/card';

interface SpacingValue {
  name: string;
  className: string;
  pixels: string;
  rem: string;
}

const spacingValues: SpacingValue[] = [
  { name: '0', className: 'p-0', pixels: '0px', rem: '0rem' },
  { name: '0.5', className: 'p-0.5', pixels: '2px', rem: '0.125rem' },
  { name: '1', className: 'p-1', pixels: '4px', rem: '0.25rem' },
  { name: '1.5', className: 'p-1.5', pixels: '6px', rem: '0.375rem' },
  { name: '2', className: 'p-2', pixels: '8px', rem: '0.5rem' },
  { name: '2.5', className: 'p-2.5', pixels: '10px', rem: '0.625rem' },
  { name: '3', className: 'p-3', pixels: '12px', rem: '0.75rem' },
  { name: '3.5', className: 'p-3.5', pixels: '14px', rem: '0.875rem' },
  { name: '4', className: 'p-4', pixels: '16px', rem: '1rem' },
  { name: '5', className: 'p-5', pixels: '20px', rem: '1.25rem' },
  { name: '6', className: 'p-6', pixels: '24px', rem: '1.5rem' },
  { name: '7', className: 'p-7', pixels: '28px', rem: '1.75rem' },
  { name: '8', className: 'p-8', pixels: '32px', rem: '2rem' },
  { name: '9', className: 'p-9', pixels: '36px', rem: '2.25rem' },
  { name: '10', className: 'p-10', pixels: '40px', rem: '2.5rem' },
  { name: '12', className: 'p-12', pixels: '48px', rem: '3rem' },
  { name: '14', className: 'p-14', pixels: '56px', rem: '3.5rem' },
  { name: '16', className: 'p-16', pixels: '64px', rem: '4rem' },
];

interface RadiusValue {
  name: string;
  className: string;
  cssVar?: string;
  value: string;
}

const radiusValues: RadiusValue[] = [
  { name: 'None', className: 'rounded-none', value: '0px' },
  {
    name: 'Small',
    className: 'rounded-sm',
    cssVar: '--radius-sm',
    value: 'calc(var(--radius) - 4px)',
  },
  { name: 'Default', className: 'rounded', value: '0.25rem' },
  {
    name: 'Medium',
    className: 'rounded-md',
    cssVar: '--radius-md',
    value: 'calc(var(--radius) - 2px)',
  },
  { name: 'Large', className: 'rounded-lg', cssVar: '--radius-lg', value: 'var(--radius)' },
  {
    name: 'Extra Large',
    className: 'rounded-xl',
    cssVar: '--radius-xl',
    value: 'calc(var(--radius) + 4px)',
  },
  { name: '2XL', className: 'rounded-2xl', value: '1rem' },
  { name: '3XL', className: 'rounded-3xl', value: '1.5rem' },
  { name: 'Full', className: 'rounded-full', value: '9999px' },
];

export function Spacing() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Spacing & Layout</h2>
        <p className="text-muted-foreground mb-6">
          Spacing scale and layout utilities for consistent design
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Spacing Scale</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spacingValues.map((spacing) => (
            <Card key={spacing.name} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center">
                  <div className="bg-primary/20 border-2 border-dashed border-primary/50">
                    <div className={`bg-primary ${spacing.className}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm font-semibold">{spacing.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {spacing.pixels} / {spacing.rem}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {radiusValues.map((radius) => (
            <Card key={radius.name} className="p-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-primary ${radius.className}`} />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{radius.name}</div>
                  <code className="text-xs text-muted-foreground block">{radius.className}</code>
                  <div className="text-xs text-muted-foreground">
                    {radius.cssVar ? `var(${radius.cssVar})` : radius.value}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Common Layouts</h3>
        <div className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-3">Container</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Small (640px)</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">max-w-screen-sm</code>
              </div>
              <div className="flex justify-between">
                <span>Medium (768px)</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">max-w-screen-md</code>
              </div>
              <div className="flex justify-between">
                <span>Large (1024px)</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">max-w-screen-lg</code>
              </div>
              <div className="flex justify-between">
                <span>XL (1280px)</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">max-w-screen-xl</code>
              </div>
              <div className="flex justify-between">
                <span>2XL (1536px)</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">max-w-screen-2xl</code>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Common Gaps</h4>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <code className="ml-auto text-xs bg-muted px-2 py-1 rounded self-center">
                  gap-2
                </code>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <code className="ml-auto text-xs bg-muted px-2 py-1 rounded self-center">
                  gap-4
                </code>
              </div>
              <div className="flex gap-6">
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <div className="bg-primary/20 p-2 rounded">Item</div>
                <code className="ml-auto text-xs bg-muted px-2 py-1 rounded self-center">
                  gap-6
                </code>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
