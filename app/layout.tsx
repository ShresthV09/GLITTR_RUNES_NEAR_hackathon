import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LaserEyesProvider, GLITTR_DEVNET, TESTNET4 } from "@glittr-sdk/lasereyes";
import { NETWORK } from "@/lib/constants";
import { TrustLockProvider } from "@/context/TrustLockContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trustlock AI ",
  description: "TrustLock—a revolutionary platform designed to bring fairness, security, and efficiency to the freelancing world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <LaserEyesProvider config={{ network : NETWORK == "regtest" ? GLITTR_DEVNET : NETWORK == "testnet" ? TESTNET4 : (NETWORK as any)}}> 
            <TrustLockProvider>
              {children}
            </TrustLockProvider>
          </LaserEyesProvider>
      </body>
    </html>
  );
}
