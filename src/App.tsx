import { MainLayout } from "./layouts/MainLayout";
import { LandingPage } from "./pages/LandingPage";
import { LanguageProvider } from "./hooks/useLanguage";
import { ThemeProvider } from "./context/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <MainLayout>
            <LandingPage />
          </MainLayout>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
