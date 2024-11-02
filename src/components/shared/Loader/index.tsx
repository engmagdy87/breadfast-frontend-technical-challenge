import React from "react";
import Image from "next/image";
import FullScreenCenterContentWrapper from "components/shared/FullScreenCenterContentWrapper";

const Loader = () => {
  return (
    <FullScreenCenterContentWrapper>
      <Image
        src="/breadfast.png"
        alt="Loading..."
        width={70}
        height={70}
        style={{ height: "auto" }}
      />
    </FullScreenCenterContentWrapper>
  );
};

export default Loader;
