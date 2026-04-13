import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import { AccessGate } from "@/components/AccessGate";
import { LocaleProvider } from "@/context/LocaleContext";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  weight: ["400", "500", "700", "800"],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مقترح الاختبار الآلي | AI Automation Testing Proposal",
  description: "مقترح تقني لنظام اختبار آلي مدعوم بالذكاء الاصطناعي — يحوّل حالات الاختبار إلى أتمتة ذكية",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className="locale-ar" suppressHydrationWarning>
      <body className={`${cairo.variable} ${tajawal.variable} font-sans antialiased min-h-screen`}>
        <LocaleProvider>
          <AccessGate>{children}</AccessGate>
        </LocaleProvider>
      </body>
    </html>
  );
}
