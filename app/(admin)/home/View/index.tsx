"use client";
import { FC } from "react";
import type { NextPage } from "next";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
export const View: FC = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateBio = async (e: any) => {
    e.preventDefault();
    console.log(generatedBios);
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const onParseGPT = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          setGeneratedBios((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const onParse = onParseGPT;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <div className="max-w-xl w-full">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"e.g. Amazon CEO"}
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              送信
            </button>
          )}
        </div>

        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  回答
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split(/2\.|3\./)
                  .map((generatedBio) => {
                    return (
                      <div
                        className=" rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
