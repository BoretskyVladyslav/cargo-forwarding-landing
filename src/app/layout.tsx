import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KTEK | Вантажні перевезення по Україні та Європі",
  description:
    "KTEK — ваш надійний та технологічний партнер у сфері вантажних перевезень. Організація логістики будь-якої складності під ключ.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="h-full antialiased">
      <body className="flex min-h-full min-w-0 flex-col bg-[#0A0A0A] font-sans text-slate-100">
        <a
          href="#main-content"
          className="sr-only rounded-lg text-[#D4AF37] underline-offset-4 transition-colors duration-300 ease-in-out hover:text-[#e6c758] focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-4 focus-visible:z-[100] focus-visible:flex focus-visible:min-h-11 focus-visible:items-center focus-visible:border focus-visible:border-[#B59410]/35 focus-visible:bg-[#161616] focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:shadow-lg"
        >
          Перейти до основного вмісту
        </a>
        {children}
      </body>
    </html>
  );
}
