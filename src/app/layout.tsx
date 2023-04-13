import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import AnalyticsWrapper from "./components/Analytics";

import Body from "./components/Body";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "We love Alps | Since 2008",
  themeColor: "#005f7e",
  icons: {
    icon: "/images/favicon.ico",
  },
  manifest: "/manifest.json",
  robots: {
    index: false,
    follow: false,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${ubuntu.variable}`}>
    <body>
      <Body>{children}</Body>
    </body>
    <AnalyticsWrapper />
  </html>
);

export default RootLayout;
