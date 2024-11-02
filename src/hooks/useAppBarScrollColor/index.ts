import { useEffect, useState } from "react";

const useAppBarScrollColor = (scrollThreshold: number = 50) => {
  const [appBarColor, setAppBarColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setAppBarColor("white");
      } else {
        setAppBarColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return appBarColor;
};

export default useAppBarScrollColor;
