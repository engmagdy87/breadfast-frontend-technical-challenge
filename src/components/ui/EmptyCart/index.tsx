import React from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import theme from "utils/theme";
import FullScreenCenterContentWrapper from "components/shared/FullScreenCenterContentWrapper";

const EmptyCart = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FullScreenCenterContentWrapper>
      <Image
        src="/empty-cart.png"
        alt="Empty cart icon"
        width={100}
        height={100}
        style={{ height: "auto" }}
      />
      <Typography
        variant={isMobile ? "h5" : "h4"}
        color="primary"
        sx={{
          fontWeight: 600,
          mt: 3,
        }}
      >
        Ready to Start Shopping?
      </Typography>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        color="primary"
        sx={{
          mt: 3,
        }}
      >
        Your cart is empty. Let's change that!
      </Typography>
      <Button
        href="/"
        variant="contained"
        color="primary"
        disableElevation
        size="large"
        sx={{ mt: 3, fontWeight: 700 }}
      >
        Continue Shopping
      </Button>
    </FullScreenCenterContentWrapper>
  );
};

export default EmptyCart;
