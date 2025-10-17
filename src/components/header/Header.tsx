import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./MobileNavigation";
import MobileBranding from "./MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { authenticatedVar } from "../../constants/authenticated";
import { useReactiveVar } from "@apollo/client/react";
import type { Page } from "../../interfaces/page.interface";

const pages = [
  {
    title: "Home",
    path: "/",
  },
];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  const unAuthenticatedPages: Page[] = [
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Signup",
      path: "/signup",
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />

          <MobileNavigation
            pages={!authenticated ? unAuthenticatedPages : pages}
          />

          <MobileBranding />

          <Navigation pages={!authenticated ? unAuthenticatedPages : pages} />

          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
