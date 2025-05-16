import { Sour_Gummy } from "next/font/google";
import "./styles/globals.css";

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
    default: "Golden-Words",
    template: "%s | Golden-Words",
  },
  description: "Professional blog platform",
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Golden-Words",
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
      <body>{children}</body>
    </html>
  );
}
