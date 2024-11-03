import React from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import theme from "utils/theme";
import FullScreenCenterContentWrapper from "components/shared/FullScreenCenterContentWrapper";

interface InformativeScreenProps {
  icon: string;
  iconAlt?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonTestId: string;
  buttonAction: () => void;
}

const InformativeScreen: React.FC<InformativeScreenProps> = ({
  icon,
  iconAlt = "",
  title,
  subtitle,
  buttonText,
  buttonTestId,
  buttonAction,
}) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <FullScreenCenterContentWrapper>
      <Image
        src={icon}
        alt={iconAlt}
        width={isMobileOrTablet ? 60 : 100}
        height={isMobileOrTablet ? 60 : 100}
        style={{ height: "auto" }}
      />
      <Typography
        variant={isMobileOrTablet ? "h6" : "h4"}
        color="primary"
        sx={{
          fontWeight: 600,
          mt: { xs: 2, md: 3 },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={isMobileOrTablet ? "h6" : "h5"}
        color="primary"
        sx={{
          mt: { xs: 2, md: 3 },
        }}
      >
        {subtitle}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        size={isMobileOrTablet ? "medium" : "large"}
        sx={{ mt: { xs: 2, md: 3 }, fontWeight: 700 }}
        onClick={buttonAction}
        data-testid={buttonTestId}
      >
        {buttonText}
      </Button>
    </FullScreenCenterContentWrapper>
  );
};

export default InformativeScreen;
