// Library Imports
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

// Custom Imports
import "@/style/globals.css";

export const metadata: Metadata = {
  title: "OTP Login App",
  description: "App for OTP based Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
