import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import CursorFollower from "@/components/effects/CursorFollower";
import ScrollProgress from "@/components/effects/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dhanush A | Cloud-Native Engineer & Full-Stack Developer",
  description:
    "Cloud-Native DevOps Specialist | Full-Stack MERN Developer | ML Integrations | Production-Grade Infrastructure",
  authors: [{ name: "Dhanush A", url: "https://github.com/Dhanush596" }],
  keywords: [
    "DevOps",
    "Cloud-Native",
    "Kubernetes",
    "Terraform",
    "MERN Stack",
    "Full-Stack Developer",
    "ML Engineering",
    "AWS",
    "Docker",
  ],
  openGraph: {
    title: "Dhanush A | Elite Cloud-Native Engineer",
    description:
      "Production-ready cloud infrastructure & full-stack solutions with enterprise-grade DevOps practices",
    type: "website",
    url: "https://dhanush-portfolio.dev",
    siteName: "Dhanush A Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#030712" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} bg-dark-primary text-gray-100 overflow-x-hidden`}
      >
        <CursorFollower />
        <ScrollProgress />
        <Navbar />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
