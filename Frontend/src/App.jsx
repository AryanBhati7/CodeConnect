import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toast } from "./components/ui/toast";
import { useCurrentUser } from "./hooks/auth.hook";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  // const { data, isFetching } = useCurrentUser();

  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <main className="dark:bg-[#161730] bg-white">
          <Outlet />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
