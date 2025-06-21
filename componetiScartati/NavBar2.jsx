import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@heroui/navbar";
import { Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/AppControl.png'

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <Navbar className="w-full max-w-none">
            <NavbarBrand className="flex-shrink-0">
                <img 
                    height="50" 
                    width="50" 
                    src={Logo} 
                    alt="Fitness App Control Logo" 
                    className="object-contain"
                />
                <p className="font-bold text-inherit ml-2 hidden sm:block">Fitness App Control</p>
                <p className="font-bold text-inherit ml-2 block sm:hidden text-sm">Fitness</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link to={"/home"} color="foreground">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to={"/Contatti"} color="foreground">
                        Contatti
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="flex-shrink-0">
                <NavbarItem className="hidden lg:flex">
                    <Link to={"/login"}>Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button 
                        onClick={() => navigate("/singup")} 
                        color="primary" 
                        variant="flat"
                        size="sm"
                        className="px-3"
                    >
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        
    )
}

export default NavBar