import { Sour_Gummy } from "next/font/google";
import "./styles/globals.css";

// Optimized font loading
const sourGummy = Sour_Gummy({
  weight: ["200"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sour-gummy",
  adjustFontFallback: false,
  preload: true, // Added for better performance
});

export const metadata = {
  title: {
    default: "Golden-Words",
    template: "%s | Golden-Words",
  },
  description: "Professional blog platform",
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  alternates: { // Added for SEO
    canonical: process.env.SITE_URL || "http://localhost:3000",
  },
  openGraph: {
    title: "Golden-Words",
    description: "Professional blog platform",
    url: process.env.SITE_URL || "http://localhost:3000",
    siteName: "Golden-Words", // Changed to match your brand
    images: [ // Added OG images
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Golden-Words Blog Platform',
      }
    ],
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
    title: "Golden-Words", // Consistent with OG title
    card: "summary_large_image",
    images: ['/twitter-image.jpg'], // Added Twitter card image
    creator: '@yourtwitterhandle', // Added for engagement
  },
  icons: { // Added favicon and app icons
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#5bbad5',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourGummy.variable} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/your-logo-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}

        {/* Preconnect to important external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link rel="preload" href="/og-image.jpg" as="image" />
      </body>
    </html>
  );
}