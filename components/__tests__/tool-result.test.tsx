import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

function ToolResult({ score, topic }: { score: number; topic: string }) {
  return (
    <section aria-label="Analysis Tool Result">
      <h3>Analysis for {topic}</h3>
      <p role="meter" aria-valuenow={score} aria-label="Score">
        Score: {score}/100
      </p>
    </section>
  );
}

describe("ToolResult Component", () => {
  it("renders tool execution output properly", () => {
    render(<ToolResult topic="Performance" score={85} />);
    expect(screen.getByRole("region", { name: /analysis tool result/i })).toBeInTheDocument();
    expect(screen.getByRole("meter", { name: /score/i })).toHaveAttribute("aria-valuenow", "85");
  });
});