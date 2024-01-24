import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import type { PropsWithChildren } from "react";

import AnalyticsWrapper from "@/app/components/Analytics";
import Body from "@/app/components/Body";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "We love Alps | Since 2008",

  icons: {
    icon: "/images/favicon.ico",
  },
  manifest: "/manifest.json",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#005f7e",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" className={`${ubuntu.variable}`}>
    <body>
      <Body>{children}</Body>
      <SpeedInsights />
    </body>
    <AnalyticsWrapper />
  </html>
);

export default RootLayout;
