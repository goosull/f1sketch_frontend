import { Inter } from "next/font/google";
import Provider from "./providers";
import { ColorModeScript } from "@chakra-ui/color-mode";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <ColorModeScript />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
