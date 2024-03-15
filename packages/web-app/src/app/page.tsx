import Icon from "@/components/Icon";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between p-8">
      <div className="flex h-full w-full flex-row gap-2">
        <div className="flex w-3/4 gap-2 flex-col h-full items-center justify-between">
          <header className="flex h-[20%] w-full gap-2 py-1 px-2 flex-row items-end rounded-md border-white border-2">
            <Image
              src="/profile.jpg"
              alt="Todd's profile picture"
              width={55}
              height={55}
              className="rounded-lg h-full w-1/5 border-white border-2"
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
              <Icon name="linkedin" size={25} color="#0a66c2" />
              <p className="text-lg font-bold mb-[-0.3rem]">LinkedIn</p>
            </a>
            <a
              href="https://github.com/t-murch"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row h-full items-end"
            >
              <Icon name="github" size={25} color="#adbac7" />
              <p className="text-lg font-bold mb-[-0.3rem]">GitHub</p>
            </a>
          </section>
          <section className="flex flex-col h-[70%] w-full py-1 px-2 rounded-md border-white border-2">
            THIS IS THE MAIN SECTION
            {"\n"}
            Will show a randomly loaded ai summary of my resume. And be swapped
            out by 'full versions' of the right hand sections upon clicking on
            the section.
          </section>
        </div>
        <section className="flex w-1/4 flex-col gap-2">
          <article className="flex h-1/3 w-full flex-col p-2 border-2 border-white rounded-md text-xl font-bold text-green-500">
            Spotify
          </article>
          <article className="flex h-1/3 w-full flex-col p-2 border-2 border-white rounded-md text-xl font-bold text-orange-500">
            Strava
          </article>
          <article className="flex h-1/3 w-full flex-col p-2 border-2 border-white rounded-md text-xl font-bold text-blue-500">
            BodyBuilding.com (or something else)
          </article>
        </section>
      </div>
    </main>
  );
}