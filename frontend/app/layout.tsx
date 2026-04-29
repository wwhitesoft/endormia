import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Endormia — Il sonno non si comanda. Si prepara.",
  description:
    "Endormia e' uno Sleep OS che coordina microclima, suono, vibrazione, luce e postura. Parti da un'app. Evolvi verso Deck e Capsule.",
  openGraph: {
    title: "Endormia — Sleep OS",
    description: "Il sonno non si comanda. Si prepara.",
    siteName: "Endormia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.className}>
      <body className="antialiased">
        <Header />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
