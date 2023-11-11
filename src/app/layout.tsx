import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import Script from "next/script";

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
      <Script
        id="HotJarAnalytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3648892,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
    </body>
    <AnalyticsWrapper />
  </html>
);

export default RootLayout;
