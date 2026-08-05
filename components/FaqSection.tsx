"use client";

import React from "react";

export interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
}

export interface FaqRow {
  id: string | number;
  speed?: string;
  direction?: "left" | "right";
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle: string;
  mainSubtitle: string;
  rows: FaqRow[];
}

/**
 * FaqCard
 * Reusable card for a single FAQ item.
 */
export const FaqCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <div className="faq-card flex w-96 flex-shrink-0 flex-col items-start gap-4 rounded-xl bg-white p-6 shadow-md border border-slate-100 transition-all hover:shadow-lg">
      <h3 className="faq-title text-xl font-bold text-slate-900">{question}</h3>
      <p className="faq-answer text-base text-slate-600 leading-relaxed">{answer}</p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller = ({
  children,
  speed = "40s",
  direction = "left",
}: {
  children: React.ReactNode;
  speed?: string;
  direction?: "left" | "right";
}) => {
  const animationClass =
    direction === "right"
      ? "animate-scroll-horizontal-reverse"
      : "animate-scroll-horizontal";

  // Estilo inline para pasar la duración a la variable CSS
  const style = { "--scroll-duration": speed } as React.CSSProperties;

  return (
    <div className="scroller-mask relative w-full overflow-hidden group">
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex flex-shrink-0 items-stretch justify-center gap-8 px-4">
          {children}
        </div>
        {/* Duplicado para un bucle continuo perfecto */}
        <div
          className="flex flex-shrink-0 items-stretch justify-center gap-8 px-4"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
const FaqSection = ({ data }: { data: FaqData }) => {
  return (
    <div className="relative flex w-full max-w-6xl flex-col items-center gap-12 p-6 sm:p-10">
      <div className="z-10 flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {data.mainTitle}
        </h2>
        <p className="text-lg text-slate-600">
          {data.mainSubtitle}
        </p>
      </div>

      <div className="z-10 flex w-full flex-col gap-8">
        {data.rows.map((row) => (
          <HorizontalScroller
            key={row.id}
            speed={row.speed}
            direction={row.direction}
          >
            {row.faqItems.map((item) => (
              <FaqCard
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;