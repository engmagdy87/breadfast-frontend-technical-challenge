"use client";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "utils/theme";
import CartItem from "components/ui/CartItem";
import { useAppDispatch, useAppSelector } from "appHooks";
import EmptyCart from "components/ui/EmptyCart";
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
import { type CartItem as CartItemType } from "features/cart/cart.types";

const Cart = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      direction={isMobile ? "column-reverse" : "row"}
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          p: { xs: "16px", md: "32px 16px" },
          width: { xs: "100%", md: "75%" },
          height: { xs: "57vh", md: "auto" },
          overflowY: "auto",
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
      <Box
        sx={{
          p: { xs: "24px 16px 16px", md: "32px 16px 32px 0" },
          width: { xs: "100%", md: "25%" },
          height: { xs: "32vh", md: "auto" },
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            backgroundColor: "white",
            width: "100%",
            borderRadius: 4,
            p: 2,
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            color="#212529"
            sx={{ fontWeight: "bold" }}
          >
            Order Summary
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="primary"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box component="span">Items:</Box>
            <Box component="span">{totalPrice.toFixed(2)} EGP</Box>
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="primary"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box component="span">Delivery:</Box>
            <Box component="span">20 EGP</Box>
          </Typography>
          <Divider />
          <Typography
            variant={isMobile ? "h6" : "h5"}
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Box component="span">Total Price:</Box>
            <Box component="span">{totalPrice + 20} EGP</Box>
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          size="large"
          sx={{ mt: 2 }}
        >
          <Typography variant="subtitle1" color="white">
            Place Order
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
