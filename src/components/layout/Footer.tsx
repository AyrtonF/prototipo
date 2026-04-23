import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-copper text-cream">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-12">
        <div className="border-t border-cream/15 pt-8">
          <div className="grid items-end gap-8 md:grid-cols-[auto_1fr_auto] md:gap-10">
            <div>
              <span className="relative block h-16 w-32">
                <Image src="/logo-footer.png" alt="La Vie" fill sizes="128px" className="object-contain" priority />
              </span>
              <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-cream/70">
                La Vie © 2026. All rights reserved.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-10 gap-y-3 text-[11px] uppercase tracking-[0.35em] text-cream/90 md:justify-center">
              <Link href="/sobre" className="transition-colors hover:text-white">
                Sobre
              </Link>
              <Link href="/perfumes" className="transition-colors hover:text-white">
                Perfumes
              </Link>
              <Link href="/joias" className="transition-colors hover:text-white">
                Jóias
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25">
                <Instagram size={16} />
              </Link>
              <Link href="#" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25">
                <Facebook size={16} />
              </Link>
              <Link href="mailto:contato@lavie.com" aria-label="E-mail" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25">
                <Mail size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
