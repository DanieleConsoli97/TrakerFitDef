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

import Logo from "../assets/AppControl.png";
import { useTheme } from "../provider/ThemeProvider";

export const FitnessLogo = () => (
  <img
    height="50"
    width="50"
    src={Logo}
    alt="Fitness App Control Logo"
    className="object-contain min-w-[50px]"
  />
);

export default function NavbarComp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { logOutAction, isAuthenticated } = useAuth();

  const isActivePath = (path) => location.pathname === path;

  // Sezioni menu filtrate in base all'autenticazione
  const menuSections = [
    {
      label: "Navigazione",
      items: [

        ...(isAuthenticated ? [{ name: "Dashboard", path: "/dashboard", icon: "📊" }] : []),
      ],
    },
    ...(isAuthenticated
      ? [
        {
          label: "Fitness",
          items: [
            { name: "Sessioni di allenamento", path: "/sessions", icon: "💪" },
            { name: "Massimali", path: "/maxes", icon: "📈" },
            { name: "Programmi", path: "/programs", icon: "📋" },
          ],
        },
        {
          label: "Account",
          items: [
            { name: "Profilo", path: "/profile", icon: "👤" },
            { name: "Impostazioni", path: "/settings", icon: "⚙️" },
            { name: "Notifiche", path: "/notifications", icon: "🔔" },
            { name: "Logout", path: "#", icon: "🚪", isLogout: true, color: "danger" },
          ],
        },
      ]
      : [])
  ];

  const handleMenuItemClick = (item) => {
    if (item.isLogout) {
      logOutAction();
    } else {
      navigate(item.path);
    }
    setIsMenuOpen(false);
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* Mobile: Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* Mobile: Logo centrato */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <FitnessLogo />
            <p className="font-bold">FitnessControl</p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop: Logo a sinistra */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <FitnessLogo />
            <p className="font-bold">FitnessControl</p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop: Navigazione */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuSections.map((section, idx) =>
          idx === 0 ? (
            section.items.map((item) => (
              <NavbarItem key={item.name} isActive={isActivePath(item.path)}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 ${isActivePath(item.path) ? "text-primary font-semibold" : ""}`}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              </NavbarItem>
            ))
          ) : (
            <NavbarItem key={section.label}>
              <div className="relative group">
                <button className="flex items-center gap-2 font-medium hover:text-primary">
                  {section.label} ▼
                </button>
                <div className="absolute left-0 top-full bg-background shadow-lg rounded-lg hidden group-hover:block z-50 min-w-[180px] p-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-3 py-2 rounded hover:bg-default-100 transition-colors text-sm ${isActivePath(item.path)
                          ? "text-primary font-semibold"
                          : item.color === "danger"
                            ? "text-danger"
                            : ""
                        }`}
                      onClick={(e) => {
                        if (item.isLogout) {
                          e.preventDefault();
                          logOutAction();
                        }
                      }}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </NavbarItem>
          )
        )}
      </NavbarContent>

      {/* Desktop: Azioni */}
      <NavbarContent justify="end">
        {!isAuthenticated ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button onClick={() => navigate("/login")} color="success" variant="flat">
                Login
              </Button>
            </NavbarItem >
            <NavbarItem className="hidden sm:flex">
              <Button onClick={() => navigate("/signup")} color="warning" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : null}
        <NavbarItem className="hidden sm:flex">
          <Switch
            isSelected={theme === "dark"}
            onValueChange={toggleTheme}
            size="sm"
            className="bg-content1 border border-divider rounded-full p-2 shadow-lg"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </Switch>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuSections.map((section, index) => (
          <div key={`section-${index}`} className="py-2">
            <p className="text-xs font-semibold text-default-500 uppercase tracking-wide px-2 py-1">
              {section.label}
            </p>
            <Divider />
            {section.items.map((item, itemIndex) => (
              <NavbarMenuItem key={`${item.name}-${itemIndex}`}>
                <button
                  className="w-full text-left py-3 px-2 rounded-lg flex items-center gap-3 hover:bg-default-100 transition-colors"
                  onClick={() => handleMenuItemClick(item)}
                  style={{
                    color:
                      item.color === "danger"
                        ? "rgb(var(--danger))"
                        : isActivePath(item.path)
                          ? "rgb(var(--primary))"
                          : "rgb(var(--foreground))",
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {isActivePath(item.path) && (
                    <span className="ml-auto text-primary">●</span>
                  )}
                </button>
              </NavbarMenuItem>
            ))}
          </div>
        ))}

        {/* Tema mobile */}
        <NavbarMenuItem>
          <div className="flex items-center justify-between w-full py-3 px-2">
            <div className="flex items-center gap-3">
              <span className="text-lg">{theme === "dark" ? "☀️" : "🌙"}</span>
              <span className="font-medium">
                Tema {theme === "dark" ? "Light" : "Dark"}
              </span>
            </div>
            <Switch
              isSelected={theme === "dark"}
              onValueChange={toggleTheme}
              size="sm"
            />
          </div>
        </NavbarMenuItem>

        {/* Footer */}
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