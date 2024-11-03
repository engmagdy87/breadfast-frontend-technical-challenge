import React from "react";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import FullScreenCenterContentWrapper from "components/shared/FullScreenCenterContentWrapper";
import theme from "utils/theme";

const Loader = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <FullScreenCenterContentWrapper>
      <Image
        src="/breadfast.png"
        alt="Loading..."
        width={isMobileOrTablet ? 40 : 70}
        height={isMobileOrTablet ? 40 : 70}
        style={{ height: "auto" }}
      />
    </FullScreenCenterContentWrapper>
  );
};

export default Loader;
