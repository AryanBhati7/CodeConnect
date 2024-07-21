import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toast } from "./components/ui/toast";
import { useCurrentUser } from "./hooks/auth.hook";

function App() {
  const { data, isFetching } = useCurrentUser();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
