import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import data from "../data.json";
import { Streamdown } from "streamdown";

export default function DeepDives() {
  const [openEntries, setOpenEntries] = useState<Record<number, boolean>>({
    0: true // Open the first entry by default
  });

  const toggleEntry = (idx: number) => {
    setOpenEntries(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2"><img src="/katana.png" alt="Katana" className="h-8 w-8" /><h1 className="text-3xl font-bold text-foreground">TOGI</h1></div>
              <p className="text-muted-foreground">Ahead of the Curve</p>
            </div>
            <nav className="flex gap-6">
              <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/stack" className="text-muted-foreground hover:text-accent transition-colors">
                Current Stack
              </Link>
              <Link href="/workflows" className="text-muted-foreground hover:text-accent transition-colors">
                Workflows
              </Link>
              <Link href="/youtube" className="text-muted-foreground hover:text-accent transition-colors">
                YouTube
              </Link>
              <Link href="/producthunt" className="text-muted-foreground hover:text-accent transition-colors">
                Product Hunt
              </Link>
              <a href="https://staging-leap-app-573i.frontend.encr.app/notes" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                Notes
              </a>
              <Link href="/deepdives" className="text-foreground hover:text-accent transition-colors">
                Deep Dives
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <h2 className="text-2xl font-bold">Deep Dives</h2>

        {(!data.deepDives || data.deepDives.length === 0) ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No deep dive tools yet. Share any interesting tools you discover here.
            </CardContent>
          </Card>
        ) : (
          data.deepDives.map((entry: any, idx: number) => (
            <Collapsible key={idx} open={openEntries[idx]} onOpenChange={() => toggleEntry(idx)}>
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full text-left">
                  <CardHeader className="bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-between items-start flex-1 mr-4">
                        <div>
                          <CardTitle className="text-xl">{entry.title || entry.date}</CardTitle>
                          <CardDescription>{entry.date}</CardDescription>
                        </div>
                        {entry.id && <Badge variant="outline">{entry.id}</Badge>}
                      </div>
                      <ChevronDown className={`h-5 w-5 transition-transform ${openEntries[idx] ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-6 space-y-6">
                    <p className="text-muted-foreground">{entry.summary}</p>
                    
                    {/* Render content dynamically based on ID */}
                {entry.id === 'claude-code-hooks' && (
                   <div className="prose dark:prose-invert max-w-none">
                     <Streamdown>
                       {`
# Deep Dive: Claude Code Hooks - Self-Validating Agents

**Date:** January 19, 2026
**Category:** AI Development / Agents
**Rating:** 5⭐ (IMMEDIATE ADOPTION)

## Executive Summary
Claude Code has introduced "Hooks" and "Slash Commands," a feature set that transforms it from a passive coding assistant into a **self-validating agentic workflow engine**. You can now define custom scripts that run automatically at specific lifecycle events (e.g., before a commit, after a build), allowing Claude to "check its own work" against your project's specific rules.

## Key Value Proposition
*   **Self-Correction:** Claude can run your test suite or linter *before* showing you the code. If it fails, it fixes it automatically.
*   **Context Awareness:** Slash commands (e.g., \`/test\`) can be aliased to complex, project-specific context gathering scripts.
*   **Reliability:** Enforces project standards (naming conventions, architectural patterns) programmatically rather than via prompt engineering.

## How It Works
1.  **Define Hooks:** Create a \`.claude/hooks\` directory in your project.
2.  **Write Scripts:** Add shell scripts or Python scripts for events like \`on_build\` or \`pre_commit\`.
3.  **Agent Loop:** When you ask Claude to "build this feature," it executes the plan, then *automatically* runs your \`on_build\` hook to verify success.

## Code Example: Self-Validating Test Hook
Create \`.claude/hooks/post-edit.sh\`:

\`\`\`bash
#!/bin/bash
# Automatically run tests related to the changed files
echo "Running related tests..."
npm test -- --related $(git diff --name-only)
\`\`\`

Now, every time Claude edits a file, it will immediately run the relevant tests. If they fail, Claude sees the error output and iterates to fix the bug *without your intervention*.

## Strategic Recommendation
**Mandatory Adoption for Engineering Teams.**
*   **Why:** It moves AI coding from "drafting" to "engineering." It catches hallucinations early by grounding them in runtime execution.
*   **Action:** Create a standard \`.claude\` configuration repository for the company and distribute it to all engineering projects.
                       `}
                     </Streamdown>
                   </div>
                )}

                {entry.id === 'thesys-c1' && (
                   <div className="prose dark:prose-invert max-w-none">
                     <Streamdown>
                       {`
# Deep Dive: Thesys (C1) - The Generative UI Middleware

**Date:** December 24, 2025
**Category:** AI Infrastructure / Frontend
**Rating:** 5⭐ (IMMEDIATE ADOPTION)

## Executive Summary
Thesys (specifically their C1 product) is an API middleware that sits between your LLM and your frontend. Instead of streaming back raw text, it streams back **interactive, structured UI components** (charts, forms, tables, slides) in real-time.

For the CEO: This is the "missing link" for building AI agents that feel like apps, not chatbots. It solves the "wall of text" problem without requiring your team to build custom frontend renderers for every possible AI output.

## Key Value Proposition
*   **Generative UI:** Turns text responses into React components (Charts, Forms, Tables, Slides).
*   **Zero Frontend Overhead:** No need to manually map JSON outputs to UI components. Thesys handles the rendering logic via their SDK.
*   **Model Agnostic:** Works with OpenAI, Anthropic, and any other LLM.
*   **Enterprise Ready:** SOC2, GDPR, ISO27001 compliant. Zero data retention options.

## How It Works (The "Magic")
1.  **Change URL:** You point your OpenAI client to \`https://api.thesys.dev/v1/embed\` instead of \`api.openai.com\`.
2.  **Integrate SDK:** Use the C1 React SDK to render the response.
3.  **Result:** The AI response arrives as a rendered UI component, not just markdown.

## API Usage (Direct Link)
**API Endpoint:** \`https://api.thesys.dev/v1/embed\`
**Documentation:** [Thesys Docs](https://docs.thesys.dev/) (Inferred link, button on site says "Docs")

### Quick Start Code Snippet (Node.js)
\`\`\`javascript
const { OpenAI } = require('openai');

// 1. Initialize OpenAI client with Thesys Base URL
const client = new OpenAI({
  apiKey: process.env.THESYS_API_KEY, // Get this from Thesys dashboard
  baseURL: 'https://api.thesys.dev/v1/embed'
});

// 2. Make a standard request
const response = await client.chat.completions.create({
  model: 'gpt-4o', // Works with any model
  messages: [
    { role: 'user', content: 'Show me a bar chart of Q4 sales by region' }
  ]
});

// 3. The 'response' will contain UI component data to be rendered by the C1 SDK
\`\`\`

## Strategic Recommendation
**Adopt Immediately for Internal Tools & Customer-Facing Agents.**
*   **Why:** It drastically reduces the time-to-market for "rich" AI interfaces.
*   **Use Case:** Instead of building a custom dashboard for "Sales Analysis," build an agent with Thesys that generates the dashboard on demand.
*   **Risk:** Vendor lock-in on the UI rendering layer. Mitigate by ensuring you can fallback to standard markdown if needed.

## Resources
*   **Website:** [https://www.thesys.dev/](https://www.thesys.dev/)
*   **Playground:** [Try C1 Playground](https://www.thesys.dev/) (Click "Try Playground")
*   **Docs:** [Documentation](https://docs.thesys.dev/)
                       `}
                     </Streamdown>
                   </div>
                )}

                {/* Fallback to old list format if 'tools' array exists (backward compatibility) */}
                {entry.tools && entry.tools.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {entry.tools.map((tool: any, toolIdx: number) => (
                      <Card key={toolIdx} className="border-muted">
                        <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h5 className="text-lg font-semibold">{tool.name}</h5>
                                {tool.rating && <span className="text-sm">{tool.rating}</span>}
                              </div>
                              <p className="text-sm text-muted-foreground">{tool.description}</p>
                              <div className="flex gap-3 text-xs">
                                {tool.websiteUrl && (
                                  <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                    Website
                                  </a>
                                )}
                              </div>
                            </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))
        )}
      </main>
    </div>
  );
}
