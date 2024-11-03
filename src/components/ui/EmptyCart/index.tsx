import React from "react";
import { useRouter } from "next/navigation";
import InformativeScreen from "components/shared/InformativeScreen";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <InformativeScreen
      icon="/empty-cart.png"
      iconAlt="Empty cart icon"
      title="Ready to Start Shopping?"
      subtitle="Your cart is empty. Let's change that!"
      buttonText="Continue Shopping"
      buttonTestId="continue-shopping-btn"
      buttonAction={() => router.push("/")}
    />
  );
};

export default EmptyCart;
