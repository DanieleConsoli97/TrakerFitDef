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
        <>
            <Navbar>
                <NavbarBrand>
                    <img fill="none" height="50" viewBox="0 0 32 32" width="50" src={Logo} alt="" />
                    <p className="font-bold text-inherit">Fitness App Control</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link to={"/home"} color="foreground" href="#">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link aria-current="page" href="#">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to={"/Contatti"} color="foreground" href="#">
                            Contatti
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link to={"/login"} href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button onClick={() => navigate("/singup")} color="primary" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    )
}

export default NavBar