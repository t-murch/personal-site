import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between p-8">
      <div className="flex h-[95%] w-full flex-row gap-2">
        <div className="flex w-3/4 gap-2 flex-col h-full items-center justify-between">
          <header className="flex min-h-[10%] w-full gap-2 flex-row rounded-md border-white border-2">
            <Image
              src="/profile.jpg"
              alt="Todd's profile picture"
              width={200}
              height={200}
              className="rounded-full border-white border-2"
            />
            <h1 className="text-2xl font-bold">
              A software engineer who loves to learn and build things.
            </h1>
          </header>
          <section className="flex flex-col h-[90%] w-full rounded-md border-white border-2">
            THIS IS THE MAIN SECTION
          </section>
        </div>
        <section className="flex w-1/4 flex-col gap-2">
          <article className="flex h-1/3 w-full flex-col p-2 border-2 border-white rounded-m d text-xl font-bold text-green-500">
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
      <section className="flex h-[5%] flex-row rounded-md border-white border-2 justify-between w-full mt-4">
        {/* <a */}
        {/*   href="https://www.linkedin.com/in/todd-birchard/" */}
        {/*   target="_blank" */}
        {/*   rel="noreferrer" */}
        {/*   className="flex flex-col items-center" */}
        {/* > */}
        {/*   <Image */}
        {/*     src="/linkedin.svg" */}
        {/*     alt="LinkedIn logo" */}
        {/*     width={100} */}
        {/*     height={100} */}
        {/*   /> */}
        {/*   <p className="text-lg font-bold">LinkedIn</p> */}
        {/* </a> */}
        {/* <a href="https://linkedin.com/in/toddmurch/"> */}
        {/*   <Image src="/github.svg" alt="GitHub logo" width={100} height={100} /> */}
        {/*   <p className="text-lg font-bold">GitHub</p> */}
        {/* </a> */}
      </section>
    </main>
  );
}
