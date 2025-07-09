import { Inter } from "next/font/google";
import { Provider, I18nProvider } from "./providers";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { Navbar, Footer } from "@/components";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "F1 Sketch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body className="relative flex min-h-screen flex-col overflow-x-hidden group/design-root">
        <ColorModeScript />
        <I18nProvider>
          <Provider>
            <Navbar />
            <div className="flex flex-col grow h-full">{children}</div>
            <Footer />
          </Provider>
        </I18nProvider>
      </body>
    </html>
  );
}
