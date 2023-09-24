import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useLocalStorage } from "@uidotdev/usehooks";
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [token, saveToken] = useLocalStorage("token", null);

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

  const onClickSignOut = () => {
    saveToken(null);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <GiHamburgerMenu
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <h1>Home</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {token && (
          <NavbarItem>
            <Link color="foreground" href="/admin">
              Admin
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {token && (
          <NavbarItem>
            <Button
              as={Link}
              color="danger"
              href="#"
              variant="flat"
              onClick={onClickSignOut}
            >
              Sign out
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
