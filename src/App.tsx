import { MainLayout } from "./layouts/MainLayout";
import { LandingPage } from "./pages/LandingPage";
import { LanguageProvider } from "./hooks/useLanguage";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainLayout>
          <LandingPage />
        </MainLayout>
      </ThemeProvider>
    </LanguageProvider>
  );
}
