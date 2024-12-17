import Providers from "@/app/providers";
import { NavigationBar } from "@/components/NavigationBar";
import { Card } from "@/components/ui/card";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Site",
  description: "Todd's Personal Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <div className={`relative flex min-h-svh flex-col p-8`}>
            {/* BEGINNING OF LAYOUT */}

            <Providers>
              {/* <div className="flex w-full flex-row md:gap-2"> */}
              <div className="flex-1 grid grid-rows-10 grid-cols-1 gap-2">
                <header className="row-span-1 md:row-span-2">
                  <Card className="flex h-full py-1 px-2 items-end">
                    <h1 className="text-xl md:text-3xl lg:text-6xl inline font-bold">
                      A dev building and learning.
                    </h1>
                  </Card>
                </header>
                <section className="hidden md:block row-span-1 md:w-full">
                  <NavigationBar />
                </section>
                <section className="row-span-8 md:row-span-7 w-full">
                  {children}
                </section>
                <section className="md:hidden row-span-1 w-full">
                  <NavigationBar />
                </section>
              </div>
              {/* WE NEED MORE PAGES TO RE-ENABLE THIS SIDEPANEL */}

              {/* <section className="hidden h-0 w-0 md:flex md:h-full md:w-1/4 flex-col gap-2"> */}
              {/*   <article className="h-1/3 w-full"> */}
              {/*     <MusicCard placement="side" /> */}
              {/*   </article> */}
              {/*   <article className="h-1/3 w-full"> */}
              {/*     <ListCard */}
              {/*       contentRow={ActivityRow} */}
              {/*       headerLink="strava" */}
              {/*       title="Recent Activities" */}
              {/*       titleColor="text-orange-500" */}
              {/*       iconPath={StravaIcon} */}
              {/*       items={recentActivities} */}
              {/*       placement="side" */}
              {/*     /> */}
              {/*   </article> */}
              {/*   <article className="h-1/3 w-full"> */}
              {/*     <ListCard */}
              {/*       contentRow={ActivityRow} */}
              {/*       headerLink="notion" */}
              {/*       title="Thoughts" */}
              {/*       titleColor="text-white-500" */}
              {/*       iconPath={NotionIcon} */}
              {/*       items={[]} */}
              {/*       placement="side" */}
              {/*     /> */}
              {/*   </article> */}
              {/* </section> */}
              {/* </div> */}
            </Providers>
            {/* END OF LAYOUT */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
