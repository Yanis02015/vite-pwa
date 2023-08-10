import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { superTokensInit } from "./configurations/supertokens.ts";
import SuperTokensWrapper from "./layout/SuperTokensWrapper.tsx";

import App from "./App.tsx";
import { queryClient } from "./configurations/queryClient.ts";
import "./index.css";

superTokensInit();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SuperTokensWrapper>
  </React.StrictMode>
);
