import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
// import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NovaCore - Compliance Oversight & Performance Tracking",
  description: "Central regulatory body oversight system for power/energy sector compliance and performance tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Temporarily disabled for demo to fix build errors */}
        {/* <ThemeProvider defaultTheme="dark" storageKey="novacore-ui-theme"> */}
          <AuthProvider>
            {children}
          </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
