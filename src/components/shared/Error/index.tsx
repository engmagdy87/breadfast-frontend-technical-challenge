import React from "react";
import InformativeScreen from "components/shared/InformativeScreen";

interface ErrorProps {
  retryAction: () => void;
}

const Error: React.FC<ErrorProps> = ({ retryAction }) => (
  <InformativeScreen
    icon="/warning.png"
    iconAlt="Warning icon"
    title="Something Went Wrong"
    subtitle="Please try again!"
    buttonText="Try Again"
    buttonTestId="try-again-btn"
    buttonAction={retryAction}
  />
);

export default Error;
