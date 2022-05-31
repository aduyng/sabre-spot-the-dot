import React, { Suspense } from "react";

const WebApp = React.lazy(() => import("./WebApp/WebApp"));

export default function App() {
  return (
    <Suspense fallback={<div>...</div>}>
        <WebApp />
    </Suspense>
  );
}
