import { createFileRoute } from "@tanstack/react-router";
import { Phone, HelpCircle, MessageCircle, Mail, ArrowRight, Star, Truck, ShieldCheck, Palette } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import heroPaint from "@/assets/hero-paint.jpg";
import catBuitenlak from "@/assets/cat-buitenlak.jpg";
import catMuurverf from "@/assets/cat-muurverf.jpg";
import catBinnenlak from "@/assets/cat-binnenlak.jpg";
import catBeits from "@/assets/cat-beits.jpg";
import catGrondverf from "@/assets/cat-grondverf.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OnlineVerf.nl — Verf kopen doe je online, snel en voordelig" },
      { name: "description", content: "Bestel verf van Sigma, Sikkens, Wijzonol en Jotun. 50.000+ kleuren, gratis verzending vanaf €50,- en kleurgarantie." },
    ],
  }),
  component: Home,
});

const categories = [
  { title: "Buitenlak", img: catBuitenlak },
  { title: "Muurverf", img: catMuurverf },
  { title: "Binnenlak", img: catBinnenlak },
  { title: "Beits", img: catBeits },
  { title: "Grondverf", img: catGrondverf },
  { title: "Kluswijzer", img: catBuitenlak },
];

const services = [
  { icon: Phone, title: "Bereikbaar", sub: "09:30 - 17:00 uur" },
  { icon: HelpCircle, title: "Klantenservice", sub: "Vind snel je antwoord" },
  { icon: MessageCircle, title: "WhatsApp", sub: "Stuur ons een appje" },
  { icon: Mail, title: "Mail ons", sub: "klantenservice@onlineverf.nl" },
];

const brands = ["Sigma", "Sikkens", "Wijzonol", "Jotun", "Flexa", "Rambo"];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero banners */}
        <section className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-2">
          <article className="group relative overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <img
              src={heroPaint}
              alt="Pinksterkorting actie"
              width={1280}
              height={768}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8 bg-gradient-to-tr from-primary-dark/85 via-primary/40 to-transparent p-8 md:p-10">
              <div>
                <span className="inline-block rounded-md bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                  10% PINKSTERKORTING
                </span>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                  Op alles* vanaf €150,-<br />met code: <span className="text-accent">PINKSTEREN</span>
                </h1>
              </div>
              <a href="#" className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-semibold text-accent-foreground transition hover:bg-accent-strong">
                Bekijk actie <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-soft)] md:p-10">
            <div className="absolute right-6 top-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent text-center font-extrabold leading-tight text-accent-foreground shadow-lg">
              €25<br /><span className="text-xs font-medium">RETOUR</span>
            </div>
            <span className="inline-block rounded-md bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
              €25 CASHBACK
            </span>
            <h2 className="mt-4 max-w-md text-2xl font-extrabold leading-tight md:text-3xl">
              Bij onze servicepunten bij aankoop vanaf 2 liter Sigma S2U Allure lak
            </h2>
            <a href="#" className="mt-10 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-semibold text-accent-foreground transition hover:bg-accent-strong">
              Bekijk actie <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        </section>

        {/* Service strip */}
        <section className="container mx-auto grid gap-4 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:border-primary">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <div className="font-semibold text-primary">{title}</div>
                <div className="text-sm text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-6">
          <h2 className="mb-8 text-2xl font-extrabold uppercase tracking-tight text-primary md:text-3xl">
            Waar ga je mee aan de slag?
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <a
                key={c.title}
                href="#"
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-primary"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    width={640}
                    height={512}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="py-4 text-center text-lg font-bold text-primary">{c.title}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Brand strip */}
        <section className="bg-secondary py-10 mt-12">
          <div className="container mx-auto px-4">
            <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Topmerken bij OnlineVerf.nl
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {brands.map((b) => (
                <span key={b} className="text-2xl font-extrabold tracking-tight text-primary/70 transition hover:text-primary md:text-3xl">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1.2fr,1fr]">
          <div>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-primary md:text-3xl">
              Verf kopen doe je bij OnlineVerf.nl
            </h2>
            <p className="mt-2 text-muted-foreground">De beste keus voor dit seizoen!</p>
            <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Of je nu de woonkamer een frisse uitstraling wil geven, kozijnen wil schilderen of een
                schutting wil beitsen — bij OnlineVerf.nl vind je altijd de juiste verf voor de klus.
                We werken alleen met de beste merken zoals <strong>Sigma</strong>, <strong>Sikkens</strong>,
                <strong> Wijzonol</strong> en <strong>Jotun</strong>, en mengen op aanvraag elke gewenste kleur.
              </p>
              <p>
                Met meer dan 50.000 kleuren in onze mengmachine, gratis verzending vanaf €50,- en advies
                van professionals helpen we je altijd verder. Twijfel je over een kleur? Bestel een
                kleurstaal of bezoek één van onze servicepunten.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            {[
              { icon: Truck, title: "Snel in huis", text: "Voor 23:59 besteld, morgen geleverd." },
              { icon: ShieldCheck, title: "Kleurgarantie", text: "Niet tevreden? We zoeken samen een oplossing." },
              { icon: Palette, title: "50.000+ kleuren", text: "Elke kleur op maat gemengd in onze werkplaats." },
              { icon: Star, title: "Beoordeeld met 9.2", text: "Op basis van 4.300+ klantbeoordelingen." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold text-primary">{title}</div>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
