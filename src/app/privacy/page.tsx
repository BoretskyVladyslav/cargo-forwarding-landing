import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності | KTEK",
  description:
    "Політика конфіденційності компанії KTEK — збір, використання та захист ваших даних на сайті.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-full bg-[#0A0A0A] pb-16 text-[#d8d8d8]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-24 lg:px-8">
        <p className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#D4AF37] underline-offset-4 transition-colors duration-300 ease-in-out hover:text-[#e6c758] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            ← Повернутися на головну
          </Link>
        </p>

        <article className="space-y-10">
          <header className="space-y-6 border-b border-[#B59410]/18 pb-10">
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-[#D4AF37] sm:text-4xl">
              Політика конфіденційності компанії KTEK
            </h1>
            <p className="text-base leading-relaxed text-[#d8d8d8] sm:text-lg">
              Ця Політика конфіденційності описує, як компанія KTEK збирає,
              використовує та захищає інформацію, яку ви надаєте при
              використанні нашого сайту.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#D4AF37] sm:text-2xl">
              1. Збір інформації
            </h2>
            <p className="leading-relaxed text-[#d8d8d8]">
              Ми збираємо лише ті дані, які ви добровільно надаєте через форму
              зворотного зв&apos;язку, а саме: номер телефону. Ми не збираємо
              чутливі персональні дані, файли кукі (cookies) або дані
              геолокації.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#D4AF37] sm:text-2xl">
              2. Використання даних
            </h2>
            <p className="leading-relaxed text-[#d8d8d8]">
              Наданий номер телефону використовується виключно для здійснення
              зворотного дзвінка менеджером KTEK з метою консультації щодо
              організації вантажоперевезень та прорахунку вартості доставки.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#D4AF37] sm:text-2xl">
              3. Захист та передача третім особам
            </h2>
            <p className="leading-relaxed text-[#d8d8d8]">
              Ми забезпечуємо конфіденційність ваших даних та не передаємо їх
              третім особам. Усі запити обробляються через захищені сервери із
              використанням сучасних протоколів шифрування.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#D4AF37] sm:text-2xl">
              4. Згода користувача
            </h2>
            <p className="leading-relaxed text-[#d8d8d8]">
              Надсилаючи форму із зазначенням номера телефону на цьому сайті,
              ви даєте повну згоду на обробку цих даних компанією KTEK для
              зв&apos;язку з вами.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
