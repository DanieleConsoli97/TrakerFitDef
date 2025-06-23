import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
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
  Divider,
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

const navigationItems = [
  { name: "Home", path: "/home", icon: "🏠" },
  { name: "Contatti", path: "/contatti", icon: "📞" },
  { name: "Integrations", path: "/integrations", icon: "🔗" }
];

// Menu items specifici per l'app fitness (solo mobile menu)
const fitnessMenuItems = [
  // Navigazione principale
  ...navigationItems,

  // Sezione Fitness
  { type: "divider", label: "FITNESS" },
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "I Miei Allenamenti", path: "/workouts", icon: "💪" },
  { name: "Progressi", path: "/progress", icon: "📈" },
  { name: "Statistiche", path: "/analytics", icon: "📉" },
  { name: "Programmi", path: "/programs", icon: "📋" },

  // Sezione Account
  { type: "divider", label: "ACCOUNT" },
  { name: "Profilo", path: "/profile", icon: "👤" },
  { name: "Impostazioni", path: "/settings", icon: "⚙️" },
  { name: "Notifiche", path: "/notifications", icon: "🔔" },

  // Sezione Supporto
  { type: "divider", label: "SUPPORTO" },
  { name: "Aiuto & FAQ", path: "/help", icon: "❓" },
  { name: "Feedback", path: "/feedback", icon: "💬" },

  // Azioni
  { type: "divider", label: "AZIONI" },
  { name: "Logout", path: "/logout", icon: "🚪", isLogout: true, color: "danger" }
];


export default function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { logOutAction, isAuthenticated } = useAuth();

  console.log(isAuthenticated)


  const handleMenuItemClick = (item) => {
    if (item.isLogout) {

      console.log("Effettuando logout...");
      logOutAction()
    } else {
      navigate(item.path);
    }
    setIsMenuOpen(false); // Chiudi menu dopo click
  };

  const isActivePath = (path) => location.pathname === path;
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* Mobile: Toggle Button */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Mobile: Brand Centrato */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <FitnessLogo />
          <p className="font-bold text-inherit">FitnessControl</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop: Brand a Sinistra */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <FitnessLogo />
          <p className="font-bold text-inherit">FitnessControl</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop: Link Centrali */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.name} isActive={isActivePath(item.path)}>
            <Link
              to={item.path}
              color={isActivePath(item.path) ? "primary" : "foreground"}
              className="flex items-center gap-2"
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          </NavbarItem>
        ))}

        {isAuthenticated && (
          <NavbarItem isActive={isActivePath("/dashboard")}>
            <Link
              to="/dashboard"
              color={isActivePath("/dashboard") ? "primary" : "foreground"}
              className="flex items-center gap-2"
            >
              <span>📊</span>
              Dashboard
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Azioni a Destra */}
      <NavbarContent justify="end">
        {/* //SECTION -  */}
        {!isAuthenticated ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to="/login" className="text-foreground hover:text-primary">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => navigate("/signup")}
                color="warning"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button
                onClick={logOutAction}
                color="danger"
                variant="flat"
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        )}

        {/* Switch visibile sempre */}
        <NavbarItem className="hidden lg:flex">
          <Switch
            isSelected={theme === 'dark'}
            onValueChange={toggleTheme}
            size="sm"
            className="bg-content1 border border-divider rounded-full p-2 shadow-lg"
          >
            {theme === 'dark' ? "☀️" : "🌙"}
          </Switch>
        </NavbarItem>


      </NavbarContent>

      {/* Menu Mobile */}
      <NavbarMenu>
        {fitnessMenuItems.map((item, index) => {
          // Renderizza divisori
          if (item.type === "divider") {
            return (
              <div key={`divider-${index}`} className="py-2">
                <p className="text-xs font-semibold text-default-500 uppercase tracking-wide px-2 py-1">
                  {item.label}
                </p>
                <Divider />
              </div>
            );
          }

          // Renderizza menu items
          return (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <button
                className="w-full text-left py-3 px-2 rounded-lg flex items-center gap-3 hover:bg-default-100 transition-colors"
                onClick={() => handleMenuItemClick(item)}
                style={{
                  color: item.color === "danger"
                    ? "rgb(var(--danger))"
                    : isActivePath(item.path)
                      ? "rgb(var(--primary))"
                      : "rgb(var(--foreground))"
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {isActivePath(item.path) && (
                  <span className="ml-auto text-primary">●</span>
                )}
              </button>
            </NavbarMenuItem>
          );
        })}

        {/* Switch tema nel menu mobile */}

        <NavbarMenuItem>
          <div className="flex items-center justify-between w-full py-3 px-2">
            <div className="flex items-center gap-3">
              <span className="text-lg">{theme === 'dark' ? "☀️" : "🌙"}</span>
              <span className="font-medium">Tema {theme === 'dark' ? "White" : "Dark"}</span>
            </div>
            <Switch
              isSelected={theme === 'dark'}
              onValueChange={toggleTheme}
              size="sm"
            />
          </div>
        </NavbarMenuItem>

        {/* Footer del menu con versione */}
        <NavbarMenuItem>
          <div className="pt-4 pb-2 px-2">
            <p className="text-xs text-default-400 text-center">
              FitnessControl v1.0.0
            </p>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}