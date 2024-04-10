import NotionIcon from "@/../public/icons/notion.svg";
import StravaIcon from "@/../public/icons/strava.svg";
import Providers from "@/app/providers";
import Icon from "@/components/Icon";
import { ListCard } from "@/components/ListCard";
import { MusicCard } from "@/components/MusicCard";
import ActivityRow from "@/components/content-row/ActivityRow";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { recentActivities } from "@/lib/text-data";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
              <div className="flex h-full w-full md:w-3/4 gap-2 flex-col items-center justify-between">
                <header className="flex h-[10%] md:h-1/5 max-h-[20%] w-full">
                  <Card className="flex flex-row w-full gap-2 py-1 px-2 items-end">
                    <h1 className="text-2xl font-bold">
                      A dev building and learning.
                    </h1>
                  </Card>
                </header>
                <section className="hidden h-0 w-0 md:flex md:h-[10%] md:max-h-[10%] md:w-full">
                  <Card className="flex flex-row h-full w-full gap-2 py-1 px-3 justify-start">
                    <a
                      href="https://www.linkedin.com/in/toddmurch/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-row h-full gap-1 items-center"
                    >
                      <Icon
                        name="linkedin"
                        alt="linkedin-icon"
                        size={25}
                        color="#0a66c2"
                      />
                      <p className="text-lg font-bold mb-[-0.3rem]">LinkedIn</p>
                    </a>
                    <a
                      href="https://github.com/t-murch"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-row h-full gap-1 items-center"
                    >
                      <Icon name="github" size={25} color="#adbac7" />
                      <p className="text-lg font-bold mb-[-0.3rem]">GitHub</p>
                    </a>
                  </Card>
                </section>
                <section className="flex flex-col h-4/5 max-h-[80%] md:h-[70%] md:max-h-[70%] w-full">
                  {children}
                </section>
                <section className="md:hidden h-[10%] max-h-[10%] w-full">
                  <Card className="flex flex-row h-full py-1 px-3 justify-between">
                    <div className="flex flex-row gap-2">
                      <a
                        href="https://www.linkedin.com/in/toddmurch/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-row h-full gap-1 items-center"
                      >
                        <Icon
                          name="linkedin"
                          alt="linkedin-icon"
                          size={25}
                          color="#0a66c2"
                        />
                        {/* <p className="text-lg font-bold mb-[-0.3rem]">LinkedIn</p> */}
                      </a>
                      <a
                        href="https://github.com/t-murch"
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-row h-full gap-1 items-center"
                      >
                        <Icon name="github" size={25} color="#adbac7" />
                        {/* <p className="text-lg font-bold mb-[-0.3rem]">GitHub</p> */}
                      </a>
                    </div>

                    <Sheet>
                      <SheetTrigger>
                        <Icon
                          className="self-center"
                          name="menu"
                          size={25}
                          // color='#adbac7'
                        />
                      </SheetTrigger>
                      <SheetContent className="h-64" side={"bottom"}>
                        <SheetHeader>
                          <SheetTitle className="text-3xl">Nav</SheetTitle>
                          <SheetDescription className="flex flex-col gap-2 text-2xl">
                            <SheetClose asChild>
                              <Link href="/">Home</Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link href="/music">Music</Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link href="/movement">Movement</Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link href="/resume_summary">Resume Summary</Link>
                            </SheetClose>
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  </Card>
                </section>
              </div>
              {/* className="hidden h-0 w-0 md:flex md:h-[10%] md:max-h-[10%] md:w-full" */}
              <section className="hidden h-0 w-0 md:flex md:h-full md:w-1/4 flex-col gap-2">
                <article className="h-1/3 w-full">
                  <MusicCard placement="side" />
                </article>
                <article className="h-1/3 w-full">
                  <ListCard
                    contentRow={ActivityRow}
                    headerLink="strava"
                    title="Recent Activities"
                    titleColor="text-orange-500"
                    iconPath={StravaIcon}
                    items={recentActivities}
                    placement="side"
                  />
                </article>
                <article className="h-1/3 w-full">
                  <ListCard
                    contentRow={ActivityRow}
                    headerLink="notion"
                    title="Thoughts"
                    titleColor="text-white-500"
                    iconPath={NotionIcon}
                    items={[]}
                    placement="side"
                  />
                </article>
              </section>
            </div>
          </Providers>
          {/* END OF LAYOUT */}
        </div>
      </body>
    </html>
  );
}
