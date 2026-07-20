import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../view/layout";
import { WarrantyCategoryPage } from "../view/pages/WarrantyCategoryPage";
import { Home } from "../view/pages/home";
import { warrantyCategories } from "../data/warrantyExclusions";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {warrantyCategories.map((category) => (
            <Route
              key={category.type}
              path={category.path}
              element={
                <WarrantyCategoryPage
                  warrantyExclusions={category.exclusions}
                  warrantyCoverage={category.coverage}
                />
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
