import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import data from "../data.json";

export default function Workflows() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tools: "",
    steps: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tools and steps
    const toolsList = formData.tools.split(',').map(t => t.trim()).filter(t => t);
    const stepsList = formData.steps.split('\n').map(s => s.trim()).filter(s => s);
    
    if (!formData.name || !formData.description || toolsList.length === 0 || stepsList.length === 0) {
      toast.error("Please fill in all fields");
      return;
    }

    const newWorkflow = {
      name: formData.name,
      description: formData.description,
      tools: toolsList,
      steps: stepsList
    };

    // Show success message with workflow details
    toast.success("Workflow created! Share this in chat to save it permanently:", {
      description: `Name: ${newWorkflow.name}\nTools: ${toolsList.join(', ')}\nSteps: ${stepsList.length} steps`
    });

    // Reset form
    setFormData({ name: "", description: "", tools: "", steps: "" });
    setShowForm(false);
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
              <Link href="/workflows" className="text-foreground hover:text-accent transition-colors">
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
              <Link href="/deepdives" className="text-muted-foreground hover:text-accent transition-colors">
                Deep Dives
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Current Workflows</h2>
            <p className="text-muted-foreground">
              Assumed workflows based on your current tech stack. Update these during your CEO audit.
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} variant="default">
            {showForm ? "Cancel" : "+ Add Custom Workflow"}
          </Button>
        </div>

        {/* Custom Workflow Form */}
        {showForm && (
          <Card className="border-accent">
            <CardHeader>
              <CardTitle>Create Custom Workflow</CardTitle>
              <CardDescription>Define a new workflow for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Workflow Name</label>
                  <Input
                    type="text"
                    placeholder="e.g., AI Content Generation Pipeline"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Input
                    type="text"
                    placeholder="Brief description of what this workflow accomplishes"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tools Used (comma-separated)</label>
                  <Input
                    type="text"
                    placeholder="e.g., Cursor, Anthropic Claude, OpenAI, Krea.ai"
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate tool names with commas</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Workflow Steps (one per line)</label>
                  <Textarea
                    placeholder="Enter each step on a new line:&#10;1. Ideate and plan content using Claude/GPT&#10;2. Generate images with Krea.ai&#10;3. Create video sequences with LTX Studio"
                    value={formData.steps}
                    onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Each line will be a separate step</p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" variant="default">Create Workflow</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  Note: To save this workflow permanently, copy the details from the success message and share them in chat.
                </p>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Existing Workflows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.workflows.map((workflow: any, idx: number) => (
            <Card key={idx} className="hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">{workflow.name}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tools Used */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-accent">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tools.map((tool: string, toolIdx: number) => (
                      <Badge key={toolIdx} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Workflow Steps */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-accent">Workflow Steps</h4>
                  <ol className="space-y-2">
                    {workflow.steps.map((step: string, stepIdx: number) => (
                      <li key={stepIdx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-accent font-mono mr-2">{stepIdx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder for future workflows */}
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-2">More workflows will be added during your tech stack audit</p>
            <p className="text-xs text-muted-foreground">
              Use the form above to create custom workflows
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
