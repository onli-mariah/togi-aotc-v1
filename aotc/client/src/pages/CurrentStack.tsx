import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Search } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";

// Import data
import data from "@/data.json";

const reorganizedData = { currentStack: data.currentStack };

export default function CurrentStack() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "AI Development & Code": true,
    "AI Image & Video Generation": false,
    "AI Voice & Audio": false,
    "Cloud Infrastructure & Hosting": false,
    "Design & Creative Tools": false,
    "Documentation & Productivity": false,
    "LLM & AI Agents": false,
    "Other": false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper function to check if date is in the future
  const isDateInFuture = (dateStr: string | undefined) => {
    if (!dateStr || dateStr === "N/A" || dateStr === "") return null;
    try {
      const expDate = new Date(dateStr);
      const now = new Date();
      return expDate > now;
    } catch {
      return null;
    }
  };

  // Helper function to get date color class
  const getDateColorClass = (dateStr: string | undefined, isExpiration: boolean) => {
    if (isExpiration) return "text-red-600 font-bold"; // Expired/Cancelled is always red
    
    const isFuture = isDateInFuture(dateStr);
    if (isFuture === null) return "text-foreground";
    
    // If renewal is in the past (and not marked expired), it might be overdue or just renewed
    // But user asked for red note if cancelled/expired.
    return "text-foreground";
  };

  // Filter tools based on search query
  const filterTools = (tools: any[]) => {
    if (!searchQuery) return tools;
    
    const query = searchQuery.toLowerCase();
    return tools.filter((tool: any) =>
      tool.name.toLowerCase().includes(query) ||
      tool.description?.toLowerCase().includes(query) ||
      tool.account?.toLowerCase().includes(query) ||
      tool.billingCycle?.toLowerCase().includes(query) ||
      (tool.subscriptions && tool.subscriptions.some((sub: any) => 
        sub.account?.toLowerCase().includes(query) ||
        sub.billingCycle?.toLowerCase().includes(query)
      ))
    );
  };

  // Calculate total annual cost
  const calculateTotalAnnualCost = () => {
    let total = 0;
    Object.values(reorganizedData.currentStack).forEach((tools: any) => {
      tools.forEach((tool: any) => {
        const subs = tool.subscriptions || [tool];
        subs.forEach((sub: any) => {
          // STRICTLY exclude Unpaid and PYG from total calculation
          if (sub.status === "Unpaid" || sub.status === "PYG") return;
          if (sub.billingCycle?.toLowerCase().includes("free") || sub.billingCycle?.toLowerCase().includes("cxl")) return;
          if (sub.cost?.toString().toUpperCase().includes("PYG")) return;

          const costStr = sub.cost ? sub.cost.toString().replace(/[^0-9.]/g, '') : "0";
          const cost = parseFloat(costStr) || 0;
          
          if (cost > 0) {
             if (sub.billingCycle === "Monthly") {
               total += cost * 12;
             } else if (sub.billingCycle === "Annual") {
               total += cost;
             } else if (sub.billingCycle === "2-Year") {
               total += cost / 2;
             } else if (sub.billingCycle === "Quarterly") {
               total += cost * 4;
             }
          }
        });
      });
    });
    return Math.round(total);
  };

  const totalAnnualCost = calculateTotalAnnualCost();

  // Get sorted category names
  const categoryNames = Object.keys(reorganizedData.currentStack).sort();

  // Render tool card content
  const renderToolCard = (tool: any, idx: number) => {
    // Helper to render a single subscription row
    const renderSubscriptionDetails = (sub: any) => {
      const isCancelled = sub.billingCycle?.toLowerCase().includes('cxl') || sub.billingCycle?.toLowerCase().includes('free') || sub.notes?.toLowerCase().includes('cancel');
      const isExpired = sub.isExpiration || isCancelled;
      
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
             {/* Row 1: Account & Cost */}
             <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">Account:</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">{sub.account || "N/A"}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">Cost:</span>
                <span className="font-medium">{sub.cost || "N/A"}</span>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                    {sub.billingCycle}
                  </span>
                  {sub.status === "PYG" && (
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300">
                      PYG
                    </span>
                  )}
                  {sub.status === "Unpaid" && (
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400">
                      FREE/CXL
                    </span>
                  )}
                </div>
             </div>

             {/* Row 2: Payment & Renewal */}
             <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">Payment:</span>
                <span className="font-medium">{sub.payment || "N/A"}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">{isExpired ? "Expired:" : "Renewal:"}</span>
                <span className={`font-medium ${isExpired ? "text-red-600 font-bold" : ""}`}>
                  {sub.nextPayment || "N/A"}
                </span>
             </div>
          </div>
          
          {/* Notes / Status */}
          {(sub.notes || isExpired) && (
            <div className={`text-xs p-2 rounded ${isExpired ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" : "bg-muted text-muted-foreground"}`}>
               {isExpired && <span className="font-bold uppercase mr-2">STATUS: CANCELLED/EXPIRED</span>}
               {sub.notes}
            </div>
          )}
        </div>
      );
    };

    if (tool.subscriptions && tool.subscriptions.length > 1) {
      // Tool with multiple subscriptions - render tabs
      return (
        <Card key={idx} className="hover:border-accent transition-colors">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">{tool.name}</h4>
                {tool.description && <p className="text-sm text-muted-foreground">{tool.description}</p>}
              </div>
              
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tool.subscriptions.length}, minmax(0, 1fr))` }}>
                  {tool.subscriptions.map((sub: any, subIdx: number) => (
                    <TabsTrigger key={subIdx} value={subIdx.toString()}>
                      {sub.account ? sub.account.split('@')[0] : `Sub ${subIdx + 1}`}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {tool.subscriptions.map((sub: any, subIdx: number) => (
                  <TabsContent key={subIdx} value={subIdx.toString()} className="mt-4 border rounded-md p-4 bg-card/50">
                    {renderSubscriptionDetails(sub)}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </CardContent>
        </Card>
      );
    } else {
      // Single subscription tool - render normally
      // If tool object itself has the sub details (from our flat mapping), use tool as sub
      // But our data structure puts details in tool.subscriptions[0] usually.
      // Let's check if tool.subscriptions exists and has 1 item
      const sub = tool.subscriptions && tool.subscriptions.length > 0 ? tool.subscriptions[0] : tool;
      
      return (
        <Card key={idx} className="hover:border-accent transition-colors">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">{tool.name}</h4>
                {tool.description && <p className="text-sm text-muted-foreground">{tool.description}</p>}
              </div>
              
              <div className="border-t pt-4">
                {renderSubscriptionDetails(sub)}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
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
              <Link href="/stack" className="text-foreground hover:text-accent transition-colors">
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

      <main className="container py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Current Tech Stack</h2>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Annual Cost</p>
            <p className="text-2xl font-bold text-accent">${totalAnnualCost.toLocaleString()}/year</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools by name, description, account, or billing cycle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Sections */}
        {categoryNames.map((category) => {
          const tools = reorganizedData.currentStack[category as keyof typeof reorganizedData.currentStack];
          const filteredTools = filterTools(tools);
          
          if (filteredTools.length === 0 && searchQuery) return null;

          return (
            <Collapsible 
              key={category} 
              open={openSections[category]} 
              onOpenChange={() => toggleSection(category)}
            >
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <CardTitle className="text-xl text-foreground">{category}</CardTitle>
                        <CardDescription>
                          {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
                        </CardDescription>
                      </div>
                      <ChevronDown className={`h-5 w-5 transition-transform ${openSections[category] ? 'transform rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-3">
                    {filteredTools.map((tool: any, idx: number) => renderToolCard(tool, idx))}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </main>
    </div>
  );
}
