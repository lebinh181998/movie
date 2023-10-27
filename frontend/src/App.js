import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// import Browse from "./pages/browse/Browse";
const Browse = lazy(() => import("./pages/browse/Browse"));
// import Search from "./pages/search/Search";
const Search = lazy(() => import("./pages/search/Search"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Browse />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
