import { Sour_Gummy } from "next/font/google"; //  Font import for optimized loading via Next.js
import "./styles/globals.css"; //  Global CSS import
import Loader from "./components/loader/loader"; //  Custom loader component
import ClientLoaderWrapper from "./components/loader/client-loader-wrapper";

//  Google Font optimization for consistent typography
const sourGummy = Sour_Gummy({
  weight: ["200"],                // Light font weight
  subsets: ["latin"],            // Supports basic Latin charset
  display: "swap",               // Uses fallback until font loads for better UX
  variable: "--font-sour-gummy", // Maps font to a custom CSS variable for scoped styling
  adjustFontFallback: false,     // Disables automatic fallback adjustments for full control
});

//  SEO and metadata for the entire application
export const metadata = {
  title: {
    default: "IndianWriters",              // Default title when none provided
    template: "%s | IndianWriters",        // Page-specific titles follow this pattern
  },
  description: "Professional blog platform", // Meta description for search engines
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"), // Canonical base URL
  openGraph: {
    title: "IndianWriters",               // OpenGraph title for social sharing
    description: "Professional blog platform", // Description for social previews
    url: process.env.SITE_URL || "http://localhost:3000", // Fallback to localhost in dev
    siteName: "Modern Blog",              // Branded site name for preview cards
    locale: "en_US",                      // Language/region spec
    type: "website",                      // OpenGraph type
  },
  robots: {
    index: true,  //  Allow indexing
    follow: true, //  Allow following links
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,       // Full video preview allowed
      "max-image-preview": "large",  // Large image thumbnails for SEO
      "max-snippet": -1,             // Full snippet allowed
    },
  },
  twitter: {
    title: "Modern Blog",           // Title for Twitter cards
    card: "summary_large_image",    // Large card format for better visuals
  },
};

//  Root layout applied to every page in the app
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourGummy.variable}>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <ClientLoaderWrapper>
          {children}
        </ClientLoaderWrapper>
      </body>
    </html>
  );
}

