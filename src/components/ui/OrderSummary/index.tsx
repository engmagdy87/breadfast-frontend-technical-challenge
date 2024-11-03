import React from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import theme from "utils/theme";

interface OrderSummaryProps {
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalPrice }) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        p: { xs: "16px", md: "32px 16px 32px 0" },
        width: { xs: "100%", md: "25%" },
        height: "auto",
      }}
    >
      <Stack
        direction={"column"}
        spacing={isMobileOrTablet ? 1 : 2}
        sx={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: 4,
          p: 2,
        }}
      >
        <Typography
          variant={isMobileOrTablet ? "h6" : "h5"}
          color="#212529"
          sx={{ fontWeight: "bold" }}
        >
          Order Summary
        </Typography>
        <Typography
          variant={isMobileOrTablet ? "body1" : "h6"}
          color="primary"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box component="span">Items:</Box>
          <Box component="span" sx={{ textAlign: "right" }}>
            {totalPrice.toFixed(2)} EGP
          </Box>
        </Typography>
        <Typography
          variant={isMobileOrTablet ? "body1" : "h6"}
          color="primary"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box component="span">Delivery:</Box>
          <Box component="span" sx={{ textAlign: "right" }}>
            20 EGP
          </Box>
        </Typography>
        <Divider />
        <Typography
          variant={isMobileOrTablet ? "h6" : "h5"}
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <Box component="span">Total Price:</Box>
          <Box component="span" sx={{ textAlign: "right" }}>
            {(totalPrice + 20).toFixed(2)} EGP
          </Box>
        </Typography>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disableElevation
        size={isMobileOrTablet ? "medium" : "large"}
        sx={{ mt: { xs: 1, md: 2 } }}
      >
        <Typography variant="subtitle1" color="white">
          Place Order
        </Typography>
      </Button>
    </Box>
  );
};

export default OrderSummary;
