import { Sour_Gummy } from "next/font/google";
import "./styles/globals.css";
import Loader from "./components/loader/loader";

// Google Font optimization (Artifika)
const sourGummy = Sour_Gummy({
  weight: ["200"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sour-gummy",
  adjustFontFallback: false,
});

export const metadata = {
  title: {
    default: "IndianWriters",
    template: "%s | IndianWriters",
  },
  description: "Professional blog platform",
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "IndianWriters",
    description: "Professional blog platform",
    url: process.env.SITE_URL || "http://localhost:3000",
    siteName: "Modern Blog",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Modern Blog",
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Loader />{children}</body>
    </html>
  );
}
