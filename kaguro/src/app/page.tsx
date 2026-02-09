import Link from "next/link";
import { Search, ShoppingBag, Download, Users, BookOpen, Award, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [latestProducts, featuredProducts, testimonials] = await Promise.all([
    prisma.product.findMany({
      where: { deletedAt: null },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.product.findMany({
      where: { deletedAt: null },
      take: 8,
      orderBy: { downloads: "desc" },
      include: { category: true },
    }),
    prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <>
      <style>{`
        @media (max-width: 1022px) {
          .browse-store-bg {
            background: transparent !important;
          }
        }
        @media (min-width: 2001px) {
          .browse-store-bg {
            background: transparent !important;
          }
        }
      `}</style>      
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-skyblue via-skyblue-dark to-skyblue">
        <div
          className="w-full h-200 bg-cover bg-center bg-no-repeat bg-top"
          style={{ marginTop: "-56px", backgroundImage: "url('../../../assets/images/banners/home.png')" }}
        >
          <div className="relative mx-auto max-w-7xl px-4 py-20">
        </div>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-black leading-tight text-dark sm:text-5xl lg:text-6xl">
              Everything Teachers Need,{" "}
              <br/>
              <span className="text-secondary">All in One Digital Place</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-dark/80">
              Ready-to-use, DepEd-aligned digital resources. Instant download—access anytime. No physical shipping needed.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row py-30">
              <form action="/store" method="get" className="flex w-full items-center gap-3">
                <input
                  name="search"
                  type="text"
                  placeholder="Search product category..."
                  aria-label="Search product category"
                  className="w-full rounded-full bg-white/90 px-8 py-4 text-sm font-semibold text-text-dark placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="rounded-full bg-secondary px-8 py-4 text-sm font-bold text-white hover:bg-secondary-dark">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Marketing */}
      <section className="from-lightyellow via-lightyellow-dark to-lightyellow bg-gradient-to-br shadow-sm">
        <div 
          className="w-full bg-cover bg-center bg-no-repeat bg-top"
          style={{height: "100px", backgroundImage: "url('../../../assets/images/backgrounds/bg-shapes.png')" }}
        >
          <div className="relative mx-auto max-w-7xl px-4 text-center py-10">
            <p className="mb-2">
              <span className="text-lg font-bold text-dark/80"> Affiliate Marketing Program </span>
              <span className="text-lg leading-relaxed text-dark/80 ml-3"> Available Soon </span> 
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-light-bg py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-black text-text-dark">How It Works</h2>
            <p className="text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: Search, title: "Browse & Discover", desc: "Explore thousands of DepEd-aligned educational materials created by fellow Filipino teachers." },
              { icon: ShoppingBag, title: "Purchase Instantly", desc: "Buy the materials you need with secure, hassle-free payment options." },
              { icon: Download, title: "Download & Use", desc: "Instantly download your purchased materials and start using them in your classroom." },
            ].map((step, i) => (
              <div key={i} className="relative rounded-2xl bg-white p-8 text-center shadow-md">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10">
                  <step.icon className="h-7 w-7 text-blue-600 dark:text-sky-400" />
                </div>
                <span className="absolute right-4 top-4 text-4xl font-black text-blue-600 dark:text-sky-200">{i + 1}</span>
                <h3 className="mb-3 text-xl font-bold text-text-dark">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-20 min-h-[500px]">
        {/* Design Images */}
        <div style={{position: "relative"}}>
          <img className="h-auto max-w-full" src="../../../../assets/images/base/confetti.png" alt="Left Confettiimage"
              style={{position: "absolute", right: 0, top: -60, zIndex: -1}}/>
          <img className="h-auto max-w-full" src="../../../../assets/images/base/kid2.png" alt="Kid image"
              style={{position: "absolute", right: 0, top: 500, zIndex: -1}}/>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-black text-text-dark">Latest Materials</h2>
              <p className="text-gray-600">Freshly added resources from our community</p>
            </div>
            <Link href="/store?sort=newest" className="hidden rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white sm:block">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                price={product.price}
                salePrice={product.salePrice}
                image={product.image}
                rating={product.rating}
                downloads={product.downloads}
                category={product.category.name}
                createdAt={product.createdAt.toISOString()}
              />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/store?sort=newest" className="rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary">
              View All Latest
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        {/* Design Images */}
        <div style={{position: "relative"}}>
          <img className="h-auto max-w-full hidden lg:block" src="../../../../assets/images/base/confetti1.png" alt="Right Confetti image"
              style={{position: "absolute", left: 0, top: 400, zIndex: -1}}/>
          <img className="h-auto max-w-full hidden lg:block" src="../../../../assets/images/base/kid1.png" alt="Kid  image"
              style={{position: "absolute", left: 0, top: -400, zIndex: -1}}/>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-black text-text-dark">Featured Materials</h2>
              <p className="text-gray-600">Most popular resources from our community</p>
            </div>
            <Link href="/store" className="hidden rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white sm:block">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                price={product.price}
                salePrice={product.salePrice}
                image={product.image}
                rating={product.rating}
                downloads={product.downloads}
                category={product.category.name}
                createdAt={product.createdAt.toISOString()}
              />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/store" className="rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-text-dark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: Users, value: "5,000+", label: "Teachers" },
              { icon: BookOpen, value: "10,000+", label: "Resources" },
              { icon: Download, value: "50,000+", label: "Downloads" },
              { icon: Award, value: "100%", label: "Free to List" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-secondary" />
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light-bg py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-3xl font-black text-dark sm:text-4xl">Ready to Share Your Materials?</h2>
          <p className="mb-8 text-lg text-dark/80">Join our community of educators. List your materials for free and start earning today.</p>
          <Link href="/sign-up" className="inline-block rounded-full border-2 border-primary px-8 py-3.5 font-bold text-secondary transition-colors hover:border-sky-500/100 hover:bg-sky-500/100 hover:text-white">
            Get Started
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* Browse Store */}
      <section className="py-30 min-h-[500px]">
        {/* Design Images */}
        <div style={{position: "relative"}}>
            <img className="h-auto max-w-full hidden lg:block" src="../../../../assets/images/base/kids.png" alt="Kids image"
              style={{ position: "absolute", right: "10%", top: -195, zIndex: -1 }} />
            <img className="h-auto max-w-full hidden lg:block" src="../../../../assets/images/base/confetti1.png" alt="Confetti image"
              style={{position: "absolute", left: "18%", top: -150, zIndex: -1}}/>
            <img className="h-auto max-w-full hidden lg:block" src="../../../../assets/images/base/owl.png" alt="Owl image"
              style={{position: "absolute", left: "20%", top: 335, zIndex: -1}}/>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="mx-auto rounded-2xl p-8 sm:p-12 browse-store-bg" style={{ width: 460, background: 'rgba(255, 255, 255, 0.9)' }}>
            <h2 className="mb-4 text-3xl font-black text-text-dark sm:text-4xl">Discover More Materials</h2>
            <p className="mb-8 text-lg text-gray-600">Explore our full collection of resources in the store</p>
            <Link href="/store" className="inline-block rounded-full border-2 border-primary px-8 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white">
              Browse Store
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
