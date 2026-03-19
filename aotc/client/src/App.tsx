import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CurrentStack from "./pages/CurrentStack";
import Workflows from "./pages/Workflows";
import YouTube from "./pages/YouTube";
import ProductHunt from "./pages/ProductHunt";
import DeepDives from "./pages/DeepDives";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/stack" component={CurrentStack} />
      <Route path="/workflows" component={Workflows} />
      <Route path={"/youtube"} component={YouTube} />
      <Route path="/producthunt" component={ProductHunt} />
      <Route path={"/deepdives"} component={DeepDives} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
