import SpotifyIcon from "@/../public/spotify.svg";
import StravaIcon from "@/../public/strava.svg";
import VercelIcon from "@/../public/vercel.svg";
import Icon from "@/components/Icon";
import { ListCard } from "@/components/ListCard";
import ActivityRow from "@/components/content-row/ActivityRow";
import MusicRow from "@/components/content-row/MusicRow";
import { recentActivities, recentJams } from "@/lib/text-data";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
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
      <body
        className={`flex min-h-screen h-screen flex-col items-center justify-between p-8 ${inter.className}`}
      >
        {/* BEGINNING OF LAYOUT */}

        <div className="flex h-full w-full flex-row gap-2">
          <div className="flex w-3/4 gap-2 flex-col h-full items-center justify-between">
            <header className="flex h-[20%] w-full gap-2 py-1 px-2 flex-row items-end rounded-md border-white border-2">
              <Image
                src={VercelIcon}
                alt="Todd's profile picture"
                width={55}
                height={55}
                className="bg-gray-50 rounded-lg h-full w-1/5 border-white border-2"
              />
              <h1 className="text-2xl font-bold">
                A software engineer who loves to learn and build things.
              </h1>
            </header>
            <section className="flex h-[10%] w-full flex-row gap-2 py-1 px-2 rounded-md border-white border-2 justify-start">
              <a
                href="https://www.linkedin.com/in/toddmurch/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row h-full gap-1 items-end"
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
                className="flex flex-row h-full gap-1 items-end"
              >
                <Icon name="github" size={25} color="#adbac7" />
                <p className="text-lg font-bold mb-[-0.3rem]">GitHub</p>
              </a>
            </section>
            <section className="flex flex-col h-[70%] w-full rounded-md border-white border-2">
              {children}
            </section>
          </div>
          <section className="flex w-1/4 flex-col gap-2">
            <article className="h-1/3 w-full">
              <Link href="/music">
                <ListCard
                  contentRow={MusicRow}
                  title="Recent Jams"
                  titleColor="text-green-500"
                  iconPath={SpotifyIcon}
                  items={recentJams}
                />
              </Link>
            </article>
            <article
              className="h-1/3 w-full"
              // className="flex h-1/3 w-full flex-col p-2 border-2 border-white rounded-md text-xl font-bold text-orange-500"
            >
              <Link href="/movement">
                <ListCard
                  contentRow={ActivityRow}
                  title="Recent Activities"
                  titleColor="text-orange-500"
                  iconPath={StravaIcon}
                  items={recentActivities}
                />
              </Link>
            </article>
            <article className="flex h-1/3 w-full flex-col p-2 border-2 border-white rounded-md text-xl font-bold text-blue-500">
              BodyBuilding.com (or something else)
            </article>
          </section>
        </div>
        {/* END OF LAYOUT */}
        {/* {children} */}
      </body>
    </html>
  );
}
