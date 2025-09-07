'use client';

import { Card } from '@/components/ui/card';

interface ColorInfo {
  name: string;
  cssVar: string;
  description: string;
}

const colors: ColorInfo[] = [
  { name: 'Background', cssVar: '--background', description: 'Default background color' },
  { name: 'Foreground', cssVar: '--foreground', description: 'Default text color' },
  { name: 'Card', cssVar: '--card', description: 'Card background color' },
  { name: 'Card Foreground', cssVar: '--card-foreground', description: 'Card text color' },
  { name: 'Primary', cssVar: '--primary', description: 'Primary brand color' },
  { name: 'Primary Foreground', cssVar: '--primary-foreground', description: 'Primary text color' },
  { name: 'Secondary', cssVar: '--secondary', description: 'Secondary brand color' },
  {
    name: 'Secondary Foreground',
    cssVar: '--secondary-foreground',
    description: 'Secondary text color',
  },
  { name: 'Muted', cssVar: '--muted', description: 'Muted background color' },
  { name: 'Muted Foreground', cssVar: '--muted-foreground', description: 'Muted text color' },
  { name: 'Accent', cssVar: '--accent', description: 'Accent color' },
  { name: 'Accent Foreground', cssVar: '--accent-foreground', description: 'Accent text color' },
  { name: 'Destructive', cssVar: '--destructive', description: 'Error/danger color' },
  { name: 'Border', cssVar: '--border', description: 'Default border color' },
  { name: 'Input', cssVar: '--input', description: 'Input border color' },
  { name: 'Ring', cssVar: '--ring', description: 'Focus ring color' },
];

export function ColorPalette() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
        <p className="text-muted-foreground mb-6">
          The design system color palette with CSS custom properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <Card key={color.name} className="p-4">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-md border shadow-sm"
                style={{
                  backgroundColor: `oklch(var(${color.cssVar}))`,
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{color.name}</h3>
                <code className="text-xs text-muted-foreground block">var({color.cssVar})</code>
                <p className="text-xs text-muted-foreground mt-1">{color.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Chart Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <Card key={num} className="p-4">
              <div
                className="w-full h-20 rounded-md mb-2"
                style={{
                  backgroundColor: `oklch(var(--chart-${num}))`,
                }}
              />
              <code className="text-xs">--chart-{num}</code>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
