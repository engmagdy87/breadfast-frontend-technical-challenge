"use client";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header: React.FC = () => {
  const cartItemCount = 1;

  const [appBarColor, setAppBarColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setAppBarColor("white"); // Change to your desired color when scrolled
      } else {
        setAppBarColor("transparent"); // Original transparent color
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      variant="outlined"
      sx={{ background: appBarColor, border: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/">
          <img
            src="breadfast-brand.png"
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Link>
        <IconButton color="inherit" href="/cart">
          <Badge badgeContent={cartItemCount} color="primary">
            <ShoppingCartIcon color="primary" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
