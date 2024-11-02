"use client";
import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { type CartItem as CartItemType } from "features/cart/cart.types";

interface CartItemProps {
  data: CartItemType;
  onIncrementQuantity: (cartItem: CartItemType) => void;
  onDecrementQuantity: (cartItem: CartItemType) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  data,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemove,
}) => {
  const { id, name, price, quantity, imageUrl } = data;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleIncrement = () => {
    onIncrementQuantity(data);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onDecrementQuantity(data);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        mb: 2,
        p: 2,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-start",
        borderRadius: 4,
      }}
    >
      <CardMedia
        component="img"
        loading="lazy"
        image={imageUrl}
        alt={name}
        sx={{
          width: isMobile ? "100%" : 120,
          height: isMobile ? 200 : 120,
          objectFit: "cover",
          borderRadius: 1,
        }}
      />

      <Box
        sx={{
          flex: 1,
          ml: isMobile ? 0 : 2,
          mt: isMobile ? 2 : 0,
          width: "100%",
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "center" : "flex-start"}
          spacing={2}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              <Box
                component="span"
                sx={{ fontSize: "1.3rem", fontWeight: 600 }}
              >
                {price.toFixed(2)}
              </Box>{" "}
              EGP
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              px: 1,
              py: 0.5,
            }}
          >
            <IconButton
              size="small"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ minWidth: "40px", textAlign: "center" }}>
              {quantity}
            </Typography>
            <IconButton size="small" onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </Stack>

          <Stack
            direction={isMobile ? "row" : "column"}
            alignItems="center"
            spacing={2}
            sx={{ minWidth: 100 }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Total: {(price * quantity).toFixed(2)} EGP
            </Typography>
            <Button
              startIcon={<DeleteOutlineIcon />}
              color="error"
              onClick={handleRemove}
              sx={{ whiteSpace: "nowrap" }}
            >
              Remove
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default CartItem;
