"use client";

import React, { useState } from "react";
import { SendButton } from "@/components/send-button";

export default function DemoPage() {
  const [testMode, setTestMode] = useState<"random" | "success" | "fail">("random");

  const handleCustomSend = async () => {
    await new Promise((res) => setTimeout(res, 1500));
    if (testMode === "fail") throw new Error("Simulated API failure");
    if (testMode === "success") return;
    if (Math.random() <= 0.2) throw new Error("Random API failure");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-12">
      <div className="text-center space-y-2 max-w-md">
        <h1 className="text-2xl font-bold tracking-tight">Interactive State Motion Button</h1>
        <p className="text-sm text-muted-foreground">
          Choreographed state transitions (idle → hover → loading → success/error) built with zero layout thrash.
        </p>
      </div>

      {/* Main Component */}
      <div className="p-12 rounded-2xl border border-border bg-card/50 shadow-sm flex items-center justify-center min-w-[320px]">
        <SendButton onSend={handleCustomSend} />
      </div>

      {/* Control Triggers */}
      <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-muted/30">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Testing Controls
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTestMode("random")}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              testMode === "random"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-accent"
            }`}
          >
            Random (20% Fail)
          </button>
          <button
            onClick={() => setTestMode("success")}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              testMode === "success"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-border hover:bg-accent"
            }`}
          >
            Force Success
          </button>
          <button
            onClick={() => setTestMode("fail")}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              testMode === "fail"
                ? "bg-destructive text-destructive-foreground border-destructive"
                : "border-border hover:bg-accent"
            }`}
          >
            Force Failure
          </button>
        </div>
      </div>

      {/* Documentation Note */}
      <section className="max-w-xl text-left text-xs leading-relaxed text-muted-foreground space-y-3 border-t border-border pt-6">
        <h2 className="font-semibold text-sm text-foreground">Motion Choices & Architecture Note:</h2>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            <strong>Durations & Easings:</strong> Text transitions use <code>200ms</code> with custom <code>cubic-bezier(0.16, 1, 0.3, 1)</code> for rapid start and fluid deceleration. Success state uses a spring curve (<code>stiffness: 400, damping: 25</code>) for a tactile pop.
          </li>
          <li>
            <strong>Compositor-Friendly:</strong> Exclusively animates GPU-accelerated <code>opacity</code> and <code>transform (y, scale)</code> without causing reflows.
          </li>
          <li>
            <strong>Accessibility & Interruption:</strong> Native keyboard <code>focus-visible</code> ring included. Framer Motion handles <code>prefers-reduced-motion</code> gracefully by stripping heavy motion while preserving state colors and icons.
          </li>
        </ul>
      </section>
    </div>
  );
}