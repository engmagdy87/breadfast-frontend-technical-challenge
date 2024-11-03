"use client";
import dynamic from "next/dynamic";
import { Box, Stack, useMediaQuery } from "@mui/material";
import theme from "utils/theme";
import CartItem from "components/ui/CartItem";
import { useAppDispatch, useAppSelector } from "appHooks";
import EmptyCart from "components/ui/EmptyCart";
import OrderSummary from "components/ui/OrderSummary";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotalPrice,
} from "features/cart/cart.selectors";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "features/cart/cart.reducer";
import type { CartItem as CartItemType } from "features/cart/cart.types";

const Cart = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const cartItemCount = useAppSelector(selectCartItemsCount);

  const handleIncrementQuantity = (cartItem: CartItemType) => {
    dispatch(addToCart(cartItem));
  };

  const handleDecrementQuantity = (cartItem: CartItemType) => {
    dispatch(decreaseQuantity(cartItem.id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  if (!cartItemCount) return <EmptyCart />;

  return (
    <Stack
      direction={isMobileOrTablet ? "column-reverse" : "row"}
      spacing={isMobileOrTablet ? 1 : 2}
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          p: { xs: "16px", md: "32px 16px" },
          width: { xs: "100%", md: "75%" },
          height: "auto",
        }}
      >
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            data={cartItem}
            onIncrementQuantity={handleIncrementQuantity}
            onDecrementQuantity={handleDecrementQuantity}
            onRemove={handleRemove}
          />
        ))}
      </Box>
      <OrderSummary totalPrice={totalPrice} />
    </Stack>
  );
};

// Hydration issue fix
export default dynamic(() => Promise.resolve(Cart), { ssr: false });
