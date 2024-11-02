import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  addToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  price,
  description,
  addToCart,
}) => {
  const isLoading = false;

  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: { xs: "100%", md: 400 },
        borderRadius: "25px",
        boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)!important",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={name}
        loading="lazy"
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h6" component="div" noWrap fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="body1">
            <Box component="span" sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
              {price.toFixed(2)}
            </Box>{" "}
            EGP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          sx={{ mt: 2 }}
          onClick={addToCart}
          disabled={isLoading}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
