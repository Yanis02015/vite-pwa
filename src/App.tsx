import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <RouterProvider router={router()} />
      <Toaster />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
