import HeroBackdrop from "@/components/landing/HeroBackdrop";
import Reveal from "@/components/landing/Reveal";
import RouteMesh from "@/components/landing/RouteMesh";
import SiteHeader from "@/components/landing/SiteHeader";
import LeadForm from "@/components/LeadForm";
import Image from "next/image";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/contact";
import {
  MetricFleetIcon,
  MetricPinIcon,
  MetricScaleIcon,
  MetricShieldIcon,
  WhyContractMotionIcon,
  WhyRouteMotionIcon,
  WhyTruckMotionIcon,
} from "@/components/landing/LandingIcons";

const METRICS = [
  {
    title: "Гнучкий автопарк",
    body: "Ефективно управляємо як власним транспортом, так і широкою мережею перевірених партнерських перевізників.",
  },
  {
    title: "Масштаб операцій",
    body: "Команда логістів щоденно координує та контролює рух транспорту в режимі реального часу.",
  },
  {
    title: "100% Безпека",
    body: "Усі вантажі обов’язково страхуються, що гарантує повну фінансову відповідальність та спокій клієнтів.",
  },
  {
    title: "Прозорість та контроль",
    body: "Кожен рейс перебуває під постійним моніторингом, а менеджери завжди на зв’язку.",
  },
] as const;

const WHY_ITEMS = [
  {
    title: "Швидка подача транспорту",
    body: "Мінімізуємо ризики затримок та подаємо транспорт точно під графік завантаження.",
  },
  {
    title: "Офіційна співпраця",
    body: "Працюємо виключно в правовому полі: укладаємо договори, фіксуємо тарифи та надаємо повний пакет документів.",
  },
  {
    title: "Індивідуальні рішення",
    body: "Підбираємо оптимальний тип транспорту та розробляємо найвигідніший маршрут під специфіку вантажу.",
  },
] as const;

const METRIC_ICONS = [
  MetricFleetIcon,
  MetricScaleIcon,
  MetricShieldIcon,
  MetricPinIcon,
] as const;
const WHY_ICONS = [
  WhyTruckMotionIcon,
  WhyContractMotionIcon,
  WhyRouteMotionIcon,
] as const;

const year = new Date().getFullYear();

const LOGO_WIDTH = 1436;
const LOGO_HEIGHT = 1360;

const sectionX = "px-4 sm:px-6 lg:px-8";
const sectionY = "py-12 md:py-24";
const METRIC_REVEAL_STAGGER_MS = 80;
const WHY_REVEAL_STAGGER_MS = 100;

const metricCardClass =
  "grid-card metric-card group relative flex h-full min-w-0 flex-col rounded-2xl border border-[#B59410]/20 bg-[#161616] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-in-out motion-reduce:transition-none sm:p-7";

export default function Home() {
  return (
    <div className="relative flex min-h-full min-w-0 flex-col bg-[#0A0A0A] text-slate-100">
      <RouteMesh />
      <div className="relative z-[1] flex min-h-full min-w-0 flex-col">
        <SiteHeader />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-w-0 flex-1 flex-col outline-none"
        >
          <section
            id="hero"
            aria-labelledby="hero-heading"
            className={`relative overflow-hidden border-b border-[#B59410]/20 bg-[#0A0A0A] ${sectionX} ${sectionY}`}
          >
            <HeroBackdrop />

            <div
              className={`relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-14`}
            >
              <div className="relative z-[2] min-w-0 max-w-2xl">
                <p className="mb-5 inline-flex max-w-full flex-wrap items-center rounded-full border border-[#B59410]/22 bg-[#161616]/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                  Цифрова логістика
                </p>
                <h1
                  id="hero-heading"
                  className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  KTEK — ваш{" "}
                  <span className="break-words font-bold text-[#D4AF37]">
                    надійний та технологічний
                  </span>{" "}
                  партнер у сфері вантажних перевезень
                </h1>
                <p className="mt-6 text-base leading-relaxed text-slate-300 sm:mt-8 sm:text-lg lg:mt-10 lg:text-xl">
                  Ми організовуємо логістику будь-якої складності, забезпечуючи
                  безперебійну та своєчасну доставку вантажів по всій Україні та
                  Європі.
                </p>
              </div>

              <div className="relative z-[2] flex w-full min-w-0 justify-center md:justify-end">
                <div className="hero-form-shell relative w-full max-w-md rounded-2xl">
                  <div className="pointer-events-none absolute -inset-8 -z-[1] rounded-[2rem] bg-[radial-gradient(ellipse_at_52%_45%,rgba(212,175,55,0.11)_0%,rgba(251,191,36,0.05)_42%,transparent_68%)] opacity-95 blur-xl" aria-hidden />
                  <div className="rounded-2xl bg-[#161616]">
                    <LeadForm embedded />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="about"
            aria-labelledby="about-heading"
            className={`border-t border-[#B59410]/20 bg-[#0A0A0A] ${sectionX} ${sectionY}`}
          >
            <div className="mx-auto w-full max-w-7xl min-w-0">
              <p className="mx-auto mb-10 max-w-3xl text-center text-sm leading-relaxed text-slate-500 sm:mb-12 sm:text-base md:text-lg md:leading-relaxed">
                Ми поєднали досвід команди, гнучкий підхід до управління
                автопарком та сучасні логістичні рішення, щоб ви могли
                зосередитися на розвитку свого бізнесу.
              </p>

              <h2
                id="about-heading"
                className="text-center text-3xl font-bold leading-tight tracking-tight text-[#D4AF37] sm:text-4xl lg:text-5xl"
              >
                KTEK у цифрах та фактах
              </h2>

              <ul className="mt-10 grid min-w-0 grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-4 lg:gap-8">
                {METRICS.map((item, i) => {
                  const Icon = METRIC_ICONS[i];
                  return (
                    <li key={item.title} className="h-full min-w-0 list-none">
                      <Reveal delayMs={METRIC_REVEAL_STAGGER_MS * i} className="h-full">
                        <div className={metricCardClass}>
                          <Icon />
                          <h3 className="mt-5 text-base font-semibold text-slate-50 sm:text-lg">
                            {item.title}
                          </h3>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                            {item.body}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section
            id="why-us"
            aria-labelledby="why-heading"
            className={`border-t border-[#B59410]/20 bg-[#0A0A0A] ${sectionX} ${sectionY}`}
          >
            <div className="mx-auto w-full max-w-7xl min-w-0">
              <h2
                id="why-heading"
                className="text-center text-3xl font-bold leading-tight tracking-tight text-[#D4AF37] sm:text-4xl lg:text-5xl"
              >
                Чому обирають KTEK?
              </h2>
              <ul className="mt-10 grid min-w-0 grid-cols-1 gap-6 pt-4 sm:mt-12 sm:gap-7 sm:pt-5 md:grid-cols-3 lg:mt-14 lg:gap-8">
                {WHY_ITEMS.map((item, i) => {
                  const Icon = WHY_ICONS[i];
                  const step = String(i + 1);
                  return (
                    <li key={item.title} className="h-full min-w-0 list-none">
                      <Reveal
                        delayMs={WHY_REVEAL_STAGGER_MS * i}
                        className="h-full"
                      >
                        <div className="why-panel why-card group relative min-w-0">
                          <span className="why-panel__step" aria-hidden>
                            {step}
                          </span>
                          <div className="why-panel__body">
                            <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
                              <span className="why-panel__icon shrink-0">
                                <Icon />
                              </span>
                              <h3 className="min-w-0 pt-0.5 text-base font-semibold leading-snug text-slate-50 sm:text-lg">
                                {item.title}
                              </h3>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-[15px]">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </main>

        <footer className="min-w-0 bg-[#0A0A0A]">
          <div
            className={`w-full border-t border-[#B59410]/20 bg-[#161616] py-16 md:py-24 ${sectionX}`}
          >
            <p className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              <span className="text-white">KTEK</span>
              <span className="text-white/90"> — </span>
              <span className="text-[#D4AF37]">рухаємо ваш бізнес вперед.</span>
            </p>
          </div>
          <div
            className={`footer-meta mx-auto flex w-full max-w-7xl min-w-0 flex-col items-center gap-6 text-center text-sm leading-relaxed text-slate-400 ${sectionX} sm:flex-row sm:flex-wrap sm:justify-between sm:text-left`}
          >
            <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:items-center sm:gap-4">
              <Image
                src="/img/logo.png"
                alt="KTEK"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                className="h-14 w-auto opacity-90 md:h-18"
              />
              <p>© {year} KTEK. Всі права захищені.</p>
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex min-h-11 touch-manipulation items-center text-slate-300 transition-colors duration-300 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={CONTACT_MAILTO_HREF}
                className="inline-flex min-h-11 touch-manipulation items-center text-slate-300 transition-colors duration-300 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <p className="sm:w-full sm:text-center md:w-auto md:text-right">
              <a
                href="/privacy"
                className="inline-flex min-h-11 touch-manipulation items-center text-[#D4AF37] underline-offset-4 transition-colors duration-300 hover:text-[#e6c758] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                Політика конфіденційності
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
