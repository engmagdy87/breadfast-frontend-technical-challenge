"use client";
import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAppSelector } from "appHooks";
import useAppBarScrollColor from "hooks/useAppBarScrollColor";
import { selectCartItemsCount } from "features/cart/cart.selectors";

const Badge = dynamic(() => import("@mui/material/Badge"), { ssr: false });

const Header: React.FC = () => {
  const appBarColor = useAppBarScrollColor();

  const cartItemCount = useAppSelector(selectCartItemsCount);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ background: appBarColor, border: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/">
          <Image
            src="/breadfast-brand.png"
            alt="Logo"
            width={40}
            height={40}
            style={{ width: "auto" }}
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
