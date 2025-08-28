'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSectionClick = (selector) => (e) => {
    e.preventDefault();
    const go = () => {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.location.pathname !== '/') {
          history.replaceState(null, '', '/');
        }
      }
    };
    if (pathname === '/') {
      go();
    } else {
      try { sessionStorage.setItem('scrollTarget', selector); } catch {}
      router.push('/');
    }
  };
  return (
    <footer className="bg-black border-t border-white/10 text-gray-300">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded overflow-hidden ring-2 ring-amber-500/40">
              <Image src="/images/logo/anfitness.jpg" alt="ANFitness logo" fill className="object-cover" />
            </div>
            <div>
              <div className="text-white font-bold text-lg"><span className="text-amber-400">AN</span>Fitness</div>
              <div className="text-xs text-gray-400">Elite Home Gym Equipment</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href="#products" onClick={handleSectionClick('#products')} className="hover:text-amber-400">Products</a>
            <a href="#categories" onClick={handleSectionClick('#categories')} className="hover:text-amber-400">Categories</a>
            <a href="#testimonials" onClick={handleSectionClick('#testimonials')} className="hover:text-amber-400">Testimonials</a>
            <a href="#contact" onClick={handleSectionClick('#contact')} className="hover:text-amber-400">Contact</a>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} ANFitness. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
