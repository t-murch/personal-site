import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full">
      <Card className="flex flex-col w-full h-full p-4">
        <CardContent className="flex flex-col gap-2 h-full items-center justify-center">
          <>
            <div className="flex flex-row gap-1 items-center">
              <h1 className="text-2xl font-semibold">404</h1>
              <Separator orientation="vertical" className="mx-1" />
              <p className="text-2xl font-semibold">Page Not Found</p>
            </div>
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
          </>
        </CardContent>
      </Card>
    </main>
  );
}
