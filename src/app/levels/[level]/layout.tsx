import { Header } from "@/components/Header/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import GATracker from "@/components/GATracker.tsx";
import { Metadata } from "next";
import ClientScrollContainer from "@/components/ClientScrollContainer.tsx";
import { LevelsByOrder } from "@/game/Levels";
import React from "react";
import { convert } from "html-to-text";
import ShareImg from "@public/share.jpg";

export const generateMetadata = async ({
  params,
}: {
  params: { level: string };
}): Promise<Metadata> => {
  //https://github.com/vercel/next.js/discussions/69244
  const { renderToString } = await import("react-dom/server");
  const currentLevel = LevelsByOrder[Number(params.level) - 1];
  const content = convert(renderToString(<currentLevel.description />), {
    wordwrap: null,
    selectors: [
      {
        //чтобы не выводить нумерацию строк кода в редакторе
        selector: "div > div > span",
        format: "skip",
      },
    ],
  });
  const title = `RegexpGarden - Level ${params.level}: ${currentLevel.titleToken || currentLevel.title}`;
  return {
    title,
    description: content,
    metadataBase: new URL("https://regexp-garden.madewith.fun"),
    openGraph: {
      type: "article",
      title,
      images: ShareImg.src,
    },
  };
};

export default function LevelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GATracker />
      <div className="flex h-full w-full flex-auto justify-between">
        <ClientScrollContainer>
          <div className="relative p-5">
            <Header />
            {children}
          </div>
        </ClientScrollContainer>
        <Sidebar />
      </div>
    </>
  );
}
