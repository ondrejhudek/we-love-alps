import { Ubuntu } from "@next/font/google";

import AnalyticsWrapper from "./components/analytics";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "auto",
});

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="cs" className={`${ubuntu.variable}`}>
    <head />
    <body>{children}</body>
    <AnalyticsWrapper />
  </html>
);

export default Layout;
