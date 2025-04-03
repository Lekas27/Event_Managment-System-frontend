import { Footer } from "../components/footer";
import { NavbarComponent } from "../components/navbar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/auth-context";
import { ThemeProvider } from "../context/theme-context";

export const RootLayout = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <NavbarComponent />
          <Outlet />
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};
