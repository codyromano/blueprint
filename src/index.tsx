import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import GameArea from "./screens/GameArea";
import GameState from "./models/GameState";
import GameContext, { getInitialGameState } from "./state/GameStateProvider";
import DebugContext from "./state/DebugProvider";
import { DebugProviderState, getInitialDebugProvider } from "./state/DebugProvider";
import IntroSplashScreen from "./screens/IntroSplashScreen";

const { Provider: GameStateProvider } = GameContext;
const { Provider: DebugProvider } = DebugContext;

const routes = createRoutesFromElements(
  <Route>
    <Route path="/play" element={<GameArea />} />
    <Route path="/" element={<IntroSplashScreen />} />
  </Route>
);

const router = createBrowserRouter(routes);
const App = () => <RouterProvider router={router} />;

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

function GameStateManager({ children }: { children: React.ReactNode }) {
  const state = React.useState<GameState>(getInitialGameState());
  return <GameStateProvider value={state}>{children}</GameStateProvider>;
}

function DebugStateManager({ children }: { children: React.ReactNode }) {
  const state = React.useState<DebugProviderState>(getInitialDebugProvider());
  return <DebugProvider value={state}>{children}</DebugProvider>;
}

root.render(
 // TODO: Draggable uses the deprecated findDOMNode API which throws
 // an error in strict mode
 // <React.StrictMode>
    <Suspense>
    <DebugStateManager>
      <GameStateManager>
        <App />
      </GameStateManager>
    </DebugStateManager>
    </Suspense>
//  </React.StrictMode>
);
