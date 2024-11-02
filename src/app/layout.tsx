import type { Metadata } from "next";
import { Box } from "@mui/material";
import Header from "components/layout/Header";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breadfast",
  description:
    "Frontend Technical Challenge - E-commerce Product Listing Application with Shopping Cart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box sx={{ mb: 6 }}>
            <Header />
          </Box>
          {children}
        </Providers>
      </body>
    </html>
  );
}
