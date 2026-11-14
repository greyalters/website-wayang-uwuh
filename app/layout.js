import "./globals.css";
import { cinzel, noto, fell } from "@/lib/fonts";
import Header from "@/components/Header";
import { ALAMAT } from "@/lib/site";

export const metadata = {
  title: "Wayang Uwuh",
  description: "Wayang Uwuh karya Pak Iskandar, Demangan, Yogyakarta.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cinzel.variable} ${noto.variable} ${fell.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <footer className="footer">{ALAMAT}</footer>
      </body>
    </html>
  );
}
