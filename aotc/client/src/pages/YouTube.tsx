import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import data from "../data.json";

export default function YouTube() {
  const [openEntries, setOpenEntries] = useState<Record<number, boolean>>({
    0: true
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleEntry = (idx: number) => {
    setOpenEntries(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Helper function to normalize data structure (old vs new format)
  const normalizeEntry = (entry: any) => {
    // If entry has 'categories' (new format), convert to old format
    if (entry.categories) {
      const tools = [
        ...(entry.categories["IMMEDIATE ADOPTION"] || []).map((t: any) => ({ ...t, category: "IMMEDIATE ADOPTION" })),
        ...(entry.categories["EVALUATE"] || []).map((t: any) => ({ ...t, category: "EVALUATE" })),
        ...(entry.categories["AVOID"] || []).map((t: any) => ({ ...t, category: "AVOID" }))
      ];
      return { ...entry, tools };
    }
    // Already in old format
    return entry;
  };

  // Filter tools based on search query
  const filteredData = useMemo(() => {
    const normalizedData = data.youtube.map(normalizeEntry);
    if (!searchQuery) return normalizedData;
    
    const query = searchQuery.toLowerCase();
    return normalizedData.map((entry: any) => ({
      ...entry,
      tools: (entry.tools || []).filter((tool: any) => {
        const nameMatch = tool.name?.toLowerCase().includes(query);
        const descMatch = tool.description?.toLowerCase().includes(query);
        const bizMatch = tool.businessValue?.toLowerCase().includes(query);
        const catMatch = tool.category?.toLowerCase().includes(query);
        // Also search in redFlags if present
        const redFlagsMatch = tool.redFlags?.toLowerCase().includes(query);
        
        return nameMatch || descMatch || bizMatch || catMatch || redFlagsMatch;
      })
    })).filter((entry: any) => entry.tools && entry.tools.length > 0);
  }, [searchQuery]);

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
              <Link href="/youtube" className="text-foreground hover:text-accent transition-colors">
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

      <main className="container py-8 space-y-6">
        <h2 className="text-2xl font-bold">YouTube Recommendations</h2>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools by name, description, category, or business value..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {filteredData.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {searchQuery ? "No tools match your search." : "No YouTube recommendations yet. Add a YouTube video to get started."}
            </CardContent>
          </Card>
        ) : (
          filteredData.map((entry: any, idx: number) => (
            <Collapsible key={idx} open={openEntries[idx]} onOpenChange={() => toggleEntry(idx)}>
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <CardTitle className="text-xl">{entry.date}</CardTitle>
                        <CardDescription>
                          {entry.videoUrl && (
                            <a href={entry.videoUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" onClick={(e) => e.stopPropagation()}>
                              Watch Video →
                            </a>
                          )}
                        </CardDescription>
                      </div>
                      <ChevronDown className={`h-5 w-5 transition-transform ${openEntries[idx] ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                {/* IMMEDIATE ADOPTION */}
                {(entry.tools || []).filter((t: any) => t.category === "IMMEDIATE ADOPTION").length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-green-400">⭐ IMMEDIATE ADOPTION</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {entry.tools
                        .filter((t: any) => t.category === "IMMEDIATE ADOPTION")
                        .map((tool: any, toolIdx: number) => (
                          <Card key={toolIdx} className="border-green-400/30 hover:border-green-400 transition-colors">
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-lg font-semibold">{tool.name}</h5>
                                    <span className="text-sm">{tool.rating}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                                  <p className="text-sm">{tool.businessValue}</p>
                                  <div className="flex gap-3 text-xs">
                                    {tool.githubUrl && (
                                      <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        GitHub
                                      </a>
                                    )}
                                    {tool.websiteUrl && (
                                      <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        Website
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
                  </div>
                )}

                {/* EVALUATE */}
                {(entry.tools || []).filter((t: any) => t.category === "EVALUATE").length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-yellow-400">⚡ EVALUATE</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {entry.tools
                        .filter((t: any) => t.category === "EVALUATE")
                        .map((tool: any, toolIdx: number) => (
                          <Card key={toolIdx} className="border-yellow-400/30 hover:border-yellow-400 transition-colors">
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-lg font-semibold">{tool.name}</h5>
                                    <span className="text-sm">{tool.rating}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                                  <p className="text-sm">{tool.businessValue}</p>
                                  <div className="flex gap-3 text-xs">
                                    {tool.githubUrl && (
                                      <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        GitHub
                                      </a>
                                    )}
                                    {tool.websiteUrl && (
                                      <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        Website
                                      </a>
                                    )}
                                  </div>
                                  {tool.redFlags && tool.redFlags !== "None" && (
                                    <p className="text-xs text-yellow-400">⚠️ {tool.redFlags}</p>
                                  )}
                                </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}

                {/* AVOID */}
                {(entry.tools || []).filter((t: any) => t.category === "AVOID").length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-red-400">🚫 AVOID</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {entry.tools
                        .filter((t: any) => t.category === "AVOID")
                        .map((tool: any, toolIdx: number) => (
                          <Card key={toolIdx} className="border-red-400/30 hover:border-red-400 transition-colors">
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-lg font-semibold">{tool.name}</h5>
                                    <span className="text-sm">{tool.rating}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                                  <p className="text-sm">{tool.businessValue}</p>
                                  <div className="flex gap-3 text-xs">
                                    {tool.githubUrl && (
                                      <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        GitHub
                                      </a>
                                    )}
                                    {tool.websiteUrl && (
                                      <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        Website
                                      </a>
                                    )}
                                  </div>
                                  {tool.redFlags && tool.redFlags !== "None" && (
                                    <p className="text-xs text-red-400 font-semibold">🚨 {tool.redFlags}</p>
                                  )}
                                </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
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
