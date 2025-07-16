
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";
import { Toaster } from 'react-hot-toast';

// Lazy‑loaded pages
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ArticleView = lazy(() => import("./pages/ArticleView"));
const LoginForm = lazy(() => import("./components/Auth/LoginForm"));
const SignupForm = lazy(() => import("./components/Auth/SignupForm"));
const NewArticle = lazy(() => import("./pages/NewArticle"));
const EditArticle = lazy(() => import("./pages/EditArticle"));

function Protected({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function RedirectIfAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Toaster position="bottom-right" />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <RedirectIfAuth>
                    <LoginForm />
                  </RedirectIfAuth>
                }
              />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/article/:id" element={<ArticleView />} />

              {/* Admin routes */}
              <Route
                path="/dashboard"
                element={
                  <Protected adminOnly>
                    <Dashboard />
                  </Protected>
                }
              />
              <Route
                path="/dashboard/articles/new"
                element={
                  <Protected adminOnly>
                    <NewArticle />
                  </Protected>
                }
              />
              <Route
                path="/dashboard/articles/edit/:id"
                element={
                  <Protected adminOnly>
                    <EditArticle />
                  </Protected>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
