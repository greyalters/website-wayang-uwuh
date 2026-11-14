"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WA_LINK } from "@/lib/site";

const MENU = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang-kami", label: "Tentang Kami" },
];

export default function Header() {
  const path = usePathname();
  const aktif = (href) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="header">
      <Link href="/" className="logo">Wayang Uwuh</Link>
      <nav className="nav">
        {MENU.map((m) => (
          <Link key={m.href} href={m.href} className={aktif(m.href) ? "aktif" : ""}>{m.label}</Link>
        ))}
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hubungi">Hubungi Kami</a>
      </nav>
    </header>
  );
}
