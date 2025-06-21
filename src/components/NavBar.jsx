import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Switch,
} from "@heroui/react";

import Logo from '../assets/AppControl.png'
import { useTheme } from "../provider/ThemeProvider";
export const FitnessLogo = () => {
  return (
    <img
      height="50"
      width="50"
      src={Logo}
      alt="Fitness App Control Logo"
      className="object-contain"
    />
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <FitnessLogo />
          <p className="font-bold text-inherit">FitnessControl</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Modified NavbarContent for desktop view */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <FitnessLogo />
          <p className="font-bold text-inherit">FitnessControl</p>
        </NavbarBrand>
      </NavbarContent>

      {/* New NavbarContent for centered links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive >
          <Link to={"/home"} color="foreground">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to={"/Contatti"} color="foreground">
            Contatti
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
                    <Link to={"/login"}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button  onClick={() => navigate("/singup")}  color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
                    <Switch
          isSelected={theme === 'dark'}
          onValueChange={toggleTheme}
          size="sm"
          className="bg-content1 border border-divider rounded-full p-2 shadow-lg"
        >
          🌙
        </Switch>
        </NavbarItem>
      </NavbarContent>

      {/* ... existing NavbarMenu ... */}
    </Navbar>
  );
}