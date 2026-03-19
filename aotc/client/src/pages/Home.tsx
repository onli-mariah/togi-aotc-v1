import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import data from "../data.json";

export default function Home() {
  // Use todaysRecommendations directly from data.json
  const todaysRecommendations = data.todaysRecommendations || [];

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
              <Link href="/" className="text-foreground hover:text-accent transition-colors">
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
              <Link href="/deepdives" className="text-muted-foreground hover:text-accent transition-colors">
                Deep Dives
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Today's Recommendations */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Today's Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaysRecommendations.map((tool: any, idx: number) => (
              <Card key={idx} className="hover:border-accent transition-colors">
                <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{tool.name}</h3>
                        <span className="text-sm">{tool.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      <p className="text-sm">{tool.businessValue}</p>
                      <div className="flex gap-3 text-sm">
                        {tool.github && (
                          <a href={tool.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
                            GitHub →
                          </a>
                        )}
                        {tool.website && (
                          <a href={tool.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
                            Website →
                          </a>
                        )}
                      </div>
                      {tool.redFlags && tool.redFlags !== "None" && (
                        <p className="text-xs text-destructive">⚠️ {tool.redFlags}</p>
                      )}
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additions & Alternatives */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Additions & Alternatives</h2>
          
          {/* Additions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Additions</h3>
            <div className="space-y-3">
              {data.additions.map((tool: any, idx: number) => (
                <Card key={idx} className="hover:border-accent transition-colors">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg">{tool.name}</h4>
                        <span className="text-sm">{tool.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      <p className="text-sm">{tool.businessValue}</p>
                      <div className="flex gap-3 text-sm">
                        {tool.github && (
                          <a href={tool.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
                            GitHub →
                          </a>
                        )}
                        {tool.website && (
                          <a href={tool.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
                            Website →
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Alternatives</h3>
            <div className="space-y-3">
              {data.alternatives.map((tool: any, idx: number) => (
                <Card key={idx} className="hover:border-accent transition-colors">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg">{tool.name}</h4>
                        <span className="text-sm">{tool.rating}</span>
                      </div>
                      {tool.alternativeTo && (
                        <p className="text-sm text-muted-foreground">Alternative to: <span className="text-accent">{tool.alternativeTo}</span></p>
                      )}
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      <p className="text-sm">{tool.businessValue}</p>
                      <div className="flex gap-3 text-sm">
                        {tool.github && (
                          <a href={tool.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
                            GitHub →
                          </a>
                        )}
                        {tool.website && (
                          <a href={tool.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
                            Website →
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
