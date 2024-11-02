import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import theme from "utils/theme";
import FullScreenCenterContentWrapper from "components/shared/FullScreenCenterContentWrapper";

interface ErrorProps {
  retryAction: () => void;
}

const Error: React.FC<ErrorProps> = ({ retryAction }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FullScreenCenterContentWrapper>
      <Image
        src="/warning.png"
        alt="Warning icon"
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
        Something Went Wrong
      </Typography>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        color="primary"
        sx={{
          mt: 3,
        }}
      >
        Please try again!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        size="large"
        sx={{ mt: 3, fontWeight: 700 }}
        onClick={retryAction}
      >
        Try again
      </Button>
    </FullScreenCenterContentWrapper>
  );
};

export default Error;
