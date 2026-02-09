import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";

const faqSections = [
  {
    title: "General Information",
    items: [
      { q: "What is KaGuro Ph?", a: "KaGuro Ph is a free online marketplace for educational materials. Teachers can share, sell, and discover quality teaching resources designed specifically for the Filipino classroom and DepEd curriculum." },
      { q: "Is KaGuro Ph free to use?", a: "Yes! KaGuro Ph is completely free. There are no product listing fees, no monthly subscriptions, and no hidden charges for sellers. Buyers only pay for the materials they purchase." },
      { q: "What types of materials are available?", a: "We offer a wide range of educational materials including lesson plans, worksheets, classroom decors, templates, forms, and Canva templates — all aligned with the DepEd curriculum." },
    ],
  },
  {
    title: "For Customers",
    items: [
      { q: "How do I purchase materials?", a: "Simply browse our store, add items to your cart, and proceed to checkout. After payment, your materials will be available for instant download from your account." },
      { q: "What payment methods are accepted?", a: "We accept GCash, Maya, bank transfers, and major credit/debit cards for secure and convenient payment." },
      { q: "Can I get a refund?", a: "Since our products are digital downloads, we generally do not offer refunds. However, if you received a defective or incorrect file, please contact our support team within 7 days of purchase." },
    ],
  },
  {
    title: "For Vendors",
    items: [
      { q: "How do I start selling on KaGuro Ph?", a: "Create a free vendor account, set up your profile, and start uploading your educational materials. Our team will review your submissions to ensure quality standards." },
      { q: "What commission does KaGuro Ph take?", a: "We take a small platform fee to maintain and improve the service. The majority of the sale price goes directly to you, the creator." },
      { q: "What file formats are accepted?", a: "We accept PDF, DOCX, PPTX, and image files (PNG, JPG). For Canva templates, you can share the Canva link. Maximum file size is 100MB per product." },
    ],
  },
  {
    title: "For Affiliate Marketers",
    items: [
      { q: "Does KaGuro Ph have an affiliate program?", a: "Yes! Our affiliate program allows you to earn commissions by promoting KaGuro Ph products. Share your unique referral links and earn a percentage of each sale." },
      { q: "How do I join the affiliate program?", a: "Sign up for a free account and apply for the affiliate program through your dashboard. Once approved, you'll receive your unique tracking links." },
      { q: "How and when do I get paid?", a: "Affiliate commissions are paid monthly via GCash or bank transfer. You can track your earnings in real-time through your affiliate dashboard." },
    ],
  },
];

export default function FaqsPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-3xl font-black text-white">Frequently Asked Questions</h1>
          <p className="mt-2 text-white/70">Everything you need to know about KaGuro Ph</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {faqSections.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="mb-6 text-xl font-black text-text-dark">{section.title}</h2>
              <FaqAccordion items={section.items} />
            </div>
          ))}

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-light-bg p-8 text-center">
            <h3 className="mb-3 text-xl font-bold text-text-dark">Can&apos;t find what you&apos;re looking for?</h3>
            <p className="mb-6 text-gray-600">Click the button to contact our customer support.</p>
            <Link href="/contact" className="rounded-full bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
