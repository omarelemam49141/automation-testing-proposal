"use client";

import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { TheIdea } from "@/components/sections/TheIdea";
import { ROI } from "@/components/sections/ROI";
import { Features } from "@/components/sections/Features";
import { Roadmap } from "@/components/sections/Roadmap";
import { Timeline } from "@/components/sections/Timeline";
import { CurrentState } from "@/components/sections/CurrentState";
import { Gaps } from "@/components/sections/Gaps";
import { Future } from "@/components/sections/Future";
import { Team } from "@/components/sections/Team";
import { Extras } from "@/components/sections/Extras";
import { Credits } from "@/components/sections/Credits";

export function ProposalView() {
  return (
    <main className="min-h-screen selection:bg-primary/20">
      <ScrollProgress />
      <Header />
      <Hero />
      <TheIdea />
      <ROI />
      <Features />
      <Roadmap />
      <Timeline />
      <CurrentState />
      <Gaps />
      <Future />
      <Team />
      <Extras />
      <Credits />
    </main>
  );
}
