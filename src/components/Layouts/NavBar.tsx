"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux/store";
import { logout } from "@/services/authenticateUser";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Popover } from "@mui/material";
import CartDetail from "./CartDetail";

const pages = [
  { label: "Products", path: "products" },
  { label: "Categories", path: "categories" },
  { label: "Discounts", path: "discounts" },
  { label: "Blog", path: "blog" },
];
const settings = ["Profile", "Orders", "Settings"];

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const cartItems = useSelector((state: RootState) => state.cart.length);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElCart, setAnchorElCart] =
    React.useState<null | HTMLButtonElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    return logout();
  };

  const handleOpenCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  return (
    <AppBar position="relative" className="!bg-primary">
      <Container className="!min-w-full px-4">
        <Toolbar disableGutters>
          <Link
            href="/"
            className="text-nowrap mr-2 flex md:hidden flex-grow font-mono font-bold text-inherit text-lg max-w-fit"
          >
            FIND_YOUR_BOOKS
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  className="hover:bg-secondary"
                >
                  <Link
                    className="text-center text-lg px-2"
                    href={`/${page.path}`}
                  >
                    {page.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            href="/"
            className="text-nowrap mr-2 hidden md:flex flex-grow font-mono font-bold text-inherit text-lg max-w-fit px-2"
          >
            FIND_YOUR_BOOKS
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                sx={{ my: 2, color: "white", display: "block" }}
                className="hover:bg-secondary"
              >
                <Link
                  className="text-center text-lg font-semibold px-2"
                  href={`/${page.path}`}
                >
                  {page.label}
                </Link>
              </Button>
            ))}
          </Box>

          {/* Cart */}
          <Box className="mx-4">
            {/* <Link href="/cart"> */}
            <IconButton
              color="inherit"
              onClick={handleOpenCart}
              aria-describedby={
                Boolean(anchorElCart) ? "simple-popover" : undefined
              }
            >
              <Badge badgeContent={cartItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* </Link> */}
          </Box>

          {/* User */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} src={"/avatar.png"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="text"
                className="text-white text-2xl"
                color="inherit"
              >
                <Link href="/auth/login">Login / Register</Link>
              </Button>
            )}
          </Box>
        </Toolbar>
        <Popover
          id={Boolean(anchorElCart) ? "simple-popover" : undefined}
          open={Boolean(anchorElCart)}
          anchorEl={anchorElCart}
          onClose={handleCloseCart}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <CartDetail />
        </Popover>
      </Container>
    </AppBar>
  );
};
