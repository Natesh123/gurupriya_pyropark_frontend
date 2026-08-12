import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Loader from "./components/Loader";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import FloatingCart from "./components/FloatingCart";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gurupriyapyropark.in'),
  title: "Gurupriya Pyro Park | Premium Sivakasi Fireworks Online",
  description: "Buy premium quality Sivakasi crackers online at wholesale prices. Safe, reliable, and authentic fireworks delivered across India from Gurupriya Pyro Park.",
  keywords: "Sivakasi crackers, buy fireworks online, wholesale crackers, Diwali fireworks, Vamsi crackers, safe firecrackers online, Sivakasi fireworks delivery, online crackers shopping",
  authors: [{ name: "Gurupriya Pyro Park", url: "https://gurupriyapyropark.in" }],
  creator: "Gurupriya Pyro Park",
  publisher: "Gurupriya Pyro Park",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gurupriyapyropark.in",
    title: "Gurupriya Pyro Park | Premium Sivakasi Fireworks Online",
    description: "Buy premium quality Sivakasi crackers online at wholesale prices. Safe, reliable, and authentic fireworks delivered across India.",
    siteName: "Gurupriya Pyro Park",
    images: [
      {
        url: "/assets/images/gurupriya_pyropark_logo_primary.png",
        width: 1200,
        height: 630,
        alt: "Gurupriya Pyro Park - Premium Sivakasi Fireworks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurupriya Pyro Park | Premium Sivakasi Fireworks",
    description: "Buy premium quality Sivakasi crackers online at wholesale prices. Authentic fireworks delivered across India.",
    images: ["/assets/images/gurupriya_pyropark_logo_primary.png"],
  },
  icons: {
    icon: "/assets/images/gurupriya_pyropark_logo_primary.png", // favicon
    apple: "/assets/images/gurupriya_pyropark_logo_primary.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans antialiased bg-black`}
      >
        {/* Loading animation */}
        <Loader />

        {/* Main Application */}
        <CartProvider>
          <CartDrawer />
          <FloatingCart />
          {children}
        </CartProvider>
        
        {/* Local Business Schema for Google SEO & Google Business Profile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Gurupriya Pyro Park",
              "image": "https://gurupriyapyropark.in/assets/images/gurupriya_pyropark_logo_primary.png",
              "@id": "https://gurupriyapyropark.in",
              "url": "https://gurupriyapyropark.in",
              "telephone": "+916382650924",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "BHARATHINAGAR, 2nd St, Viswanatham",
                "addressLocality": "Virudhunagar",
                "addressRegion": "TN",
                "postalCode": "626189",
                "addressCountry": "IN"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "22:00"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
