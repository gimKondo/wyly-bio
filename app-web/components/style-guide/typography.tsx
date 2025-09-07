"use client";

import { Card } from "@/components/ui/card";

interface TypographyExample {
  name: string;
  className: string;
  text: string;
}

const typographyExamples: TypographyExample[] = [
  {
    name: "H1 - Page Title",
    className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    text: "The Joke Tax Chronicles",
  },
  {
    name: "H2 - Section Title",
    className: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    text: "The People of the Kingdom",
  },
  {
    name: "H3 - Subsection",
    className: "scroll-m-20 text-2xl font-semibold tracking-tight",
    text: "The Joke Tax",
  },
  {
    name: "H4 - Heading",
    className: "scroll-m-20 text-xl font-semibold tracking-tight",
    text: "People stopped telling jokes",
  },
  {
    name: "Paragraph",
    className: "leading-7 [&:not(:first-child)]:mt-6",
    text: "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
  },
  {
    name: "Lead",
    className: "text-xl text-muted-foreground",
    text: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    name: "Large",
    className: "text-lg font-semibold",
    text: "Are you absolutely sure?",
  },
  {
    name: "Small",
    className: "text-sm font-medium leading-none",
    text: "Email address",
  },
  {
    name: "Muted",
    className: "text-sm text-muted-foreground",
    text: "Enter your email address.",
  },
  {
    name: "Code",
    className: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    text: "@radix-ui/react-alert-dialog",
  },
];

export function Typography() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <p className="text-muted-foreground mb-6">
          Typography styles and text hierarchy for the design system
        </p>
      </div>

      <div className="space-y-4">
        {typographyExamples.map((example) => (
          <Card key={example.name} className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {example.name}
                </span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {example.className.split(" ").slice(0, 2).join(" ")}...
                </code>
              </div>
              <div className={example.className}>{example.text}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Font Families</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Sans Serif</span>
              <p className="font-sans">
                The quick brown fox jumps over the lazy dog
              </p>
              <code className="text-xs text-muted-foreground">font-sans</code>
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Monospace</span>
              <p className="font-mono">
                The quick brown fox jumps over the lazy dog
              </p>
              <code className="text-xs text-muted-foreground">font-mono</code>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}