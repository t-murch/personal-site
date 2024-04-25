import Providers from "@/app/providers";
import { NavigationBar } from "@/components/NavigationBar";
import { Card } from "@/components/ui/card";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <div
          className={`flex min-h-screen h-screen flex-col items-center justify-between p-8`}
        >
          {/* BEGINNING OF LAYOUT */}

          <Providers>
            <div className="flex h-full w-full flex-row md:gap-2">
              <div className="flex h-full w-full gap-2 flex-col items-center justify-between">
                <header className="flex h-[10%] md:h-1/5 max-h-[20%] w-full">
                  <Card className="flex flex-row w-full gap-2 py-1 px-2 items-end">
                    <h1 className="text-xl md:text-6xl font-bold">
                      A dev building and learning.
                    </h1>
                  </Card>
                </header>
                <section className="hidden h-0 w-0 md:flex md:h-[10%] md:max-h-[10%] md:w-full">
                  <NavigationBar />
                </section>
                <section className="flex flex-col h-4/5 max-h-[80%] md:h-[70%] md:max-h-[70%] w-full">
                  {children}
                </section>
                <section className="md:hidden h-[10%] max-h-[10%] w-full">
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
            </div>
          </Providers>
          {/* END OF LAYOUT */}
        </div>
      </body>
    </html>
  );
}
