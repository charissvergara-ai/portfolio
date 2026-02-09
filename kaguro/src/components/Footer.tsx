import Link from "next/link";
import { Bird } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-text-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img src="../../../assets/images/logos/logo-dark.png" alt="KaGuro Logo" className="h-10 w-45" />
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              KaGuro.ph is an online shop in the Philippines dedicated to supporting teachers in shaping young minds. 
              We offer digital learning materials tailored for educators, aligned with the DepEd curriculum.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-300 transition-colors hover:text-white">Home</Link></li>
              <li><Link href="/store" className="text-sm text-gray-300 transition-colors hover:text-white">Store</Link></li>
              <li><Link href="/faqs" className="text-sm text-gray-300 transition-colors hover:text-white">FAQs</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 transition-colors hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
              Legal
            </h4>
            <ul className="space-y-2">
              <li><Link href="/copyright" className="text-sm text-gray-300 transition-colors hover:text-white">Copyright Information</Link></li>
              <li><Link href="/sign-in" className="text-sm text-gray-300 transition-colors hover:text-white">My Account</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>+639055422921</li>
              <li>support@kaguro.ph</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com/official.kaguro.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition-colors hover:bg-primary"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a
                href="https://ph.pinterest.com/KaguroPhilippines/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition-colors hover:bg-primary"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} KaGuro Ph. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
