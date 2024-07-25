import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toast } from "./components/ui/toast";
import { useCurrentUser } from "./hooks/auth.hook";
import { ThemeProvider } from "./components/ui/theme-provider";
import { setUser } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { data, isFetching } = useCurrentUser();

  useEffect(() => {
    if (data?.success) {
      console.log(data, "data received at app.jsx");
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  console.log("app.jsx mounted");
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="dark:bg-[#161730] bg-white">
          <Outlet />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
