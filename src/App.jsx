import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import { PageLoader } from "./components/common/States";
import { ROUTES } from "./config/navigation";

/**
 * Routing.
 * The homepage is bundled eagerly; every other page is code-split so the first
 * load stays small. Unknown URLs fall through to the 404 page.
 */
const Products = lazy(() => import("./pages/Products/Products"));
const ROProducts = lazy(() => import("./pages/ROProducts/ROProducts"));
const AlkalineProducts = lazy(
  () => import("./pages/AlkalineProducts/AlkalineProducts"),
);
const ROProductDetail = lazy(
  () => import("./pages/ProductDetails/ROProductDetail"),
);
const AlkalineProductDetail = lazy(
  () => import("./pages/ProductDetails/AlkalineProductDetail"),
);
const Service = lazy(() => import("./pages/Service/Service"));
const About = lazy(() => import("./pages/About/About"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const LegalPage = lazy(() => import("./pages/Legal/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path={ROUTES.products}
            element={
              <Suspense fallback={<PageLoader label="Loading products" />}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.roProducts}
            element={
              <Suspense fallback={<PageLoader label="Loading RO purifiers" />}>
                <ROProducts />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.roProducts}/:slug`}
            element={
              <Suspense fallback={<PageLoader label="Loading product" />}>
                <ROProductDetail />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.alkalineProducts}
            element={
              <Suspense fallback={<PageLoader label="Loading ionizers" />}>
                <AlkalineProducts />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.alkalineProducts}/:slug`}
            element={
              <Suspense fallback={<PageLoader label="Loading product" />}>
                <AlkalineProductDetail />
              </Suspense>
            }
          />

          <Route
            path={ROUTES.service}
            element={
              <Suspense fallback={<PageLoader label="Loading service page" />}>
                <Service />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.about}
            element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.reviews}
            element={
              <Suspense fallback={<PageLoader label="Loading reviews" />}>
                <Reviews />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.faq}
            element={
              <Suspense fallback={<PageLoader label="Loading FAQs" />}>
                <FAQ />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.contact}
            element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            }
          />

          <Route
            path={ROUTES.privacy}
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalPage type="privacy" />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.terms}
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalPage type="terms" />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
