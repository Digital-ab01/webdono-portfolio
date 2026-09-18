import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Webdono — Digital Experiences That Transform Brands",
  description:
    "Webdono is a web design and digital agency crafting high-performance websites, e-commerce platforms, and immersive digital experiences for ambitious businesses worldwide.",
  keywords: [
    "web design agency",
    "digital agency Morocco",
    "e-commerce web design",
    "luxury website design",
    "Webdono",
  ],
  openGraph: {
    title: "Webdono — Digital Experiences That Transform Brands",
    description:
      "A digital museum of Webdono's work: premium websites, e-commerce, and digital experiences for ambitious brands.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-foreground">
        <div className="noise" />
        <LanguageProvider>
          <Loader />
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
