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

const { Provider: GameStateProvider } = GameContext;
const { Provider: DebugProvider } = DebugContext;

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<GameArea />} />
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
  <React.StrictMode>
    <Suspense>
    <DebugStateManager>
      <GameStateManager>
        <App />
      </GameStateManager>
    </DebugStateManager>
    </Suspense>
  </React.StrictMode>
);
