import Script from "next/script";
import "@/styles/globals.css";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/theme/ThemeProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";

export const metadata = {
  metadataBase: new URL("https://chit.sh"),
  title: {
    default: "Evan Miller | Software Developer & System Administrator",
    template: "%s | Evan Miller",
  },
  description: "Hi, my name's Evan. I'm a second-year computer science student and freelance web developer with a passion for coding and system administration I love building clean, functional web experiences and constantly learning new things along the way.",

  keywords: [
    "Evan Miller",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "Computer Science",
    "System Administrator",
    "System Administration",
    "Web Development",
    "Full Stack Web Development",
    "DevOps",
    "Infrastructure",
    "Cloud Computing",
    "Portfolio",
    "ChitSh",
  ],

  authors: [
    {
      name: "Evan Miller",
      url: "https://chit.sh",
    },
  ],
  creator: "Evan Miller",
  publisher: "Evan Miller",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chit.sh",
    siteName: "Evan Miller",
    title: "Evan Miller | Software Developer & System Administrator",
    description:
      "Computer science student, software developer, and system administrator building full-stack applications, infrastructure, and clean digital experiences.",
    images: [
      {
        url: "/logo.png",
        width: 960,
        height: 540,
        alt: "Evan Miller — Software Developer & System Administrator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Evan Miller | Software Developer & System Administrator",
    description:
      "Computer science student, software developer, and system administrator building full-stack applications and reliable infrastructure.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light')t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-background text-primary min-h-screen flex flex-col">
        <ThemeProvider>
          <ThemeToggle />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Script
          src="https://tracking.chit.sh/api/script.js"
          data-site-id="6aa852180be4"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}