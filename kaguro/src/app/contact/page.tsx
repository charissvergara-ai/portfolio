"use client";

import { useState } from "react";
import { Phone, Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-3xl font-black text-white">Contact Us</h1>
          <p className="mt-2 text-white/70">We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-4 text-2xl font-black text-text-dark">Get in Touch</h2>
              <p className="mb-8 leading-relaxed text-gray-600">
                Have questions, feedback, or just want to connect? We&apos;re here to help and will get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">Phone</h4>
                    <p className="text-gray-600">+639055422921</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">Email</h4>
                    <p className="text-gray-600">support@kaguro.ph</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="mb-3 font-bold text-text-dark">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="https://facebook.com/official.kaguro.ph" target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary/10 p-3 transition-colors hover:bg-primary hover:text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://ph.pinterest.com/KaguroPhilippines/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary/10 p-3 transition-colors hover:bg-primary hover:text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-white p-8 shadow-md">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                  <h3 className="mb-2 text-xl font-bold text-text-dark">Message Sent!</h3>
                  <p className="mb-6 text-gray-600">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} className="rounded-full border-2 border-primary px-6 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="mb-2 text-xl font-bold text-text-dark">Send us a Message</h3>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-text-dark">Full Name</label>
                    <input type="text" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-text-dark">Email Address</label>
                    <input type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-text-dark">Subject</label>
                    <input type="text" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-text-dark">Message</label>
                    <textarea required rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your message..." />
                  </div>
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-white transition-colors hover:bg-sky-500/100">
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
