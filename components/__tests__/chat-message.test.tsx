import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

// Mock Chat Component
function ChatMessage({ status, text }: { status: "pending" | "streaming" | "error" | "ready"; text?: string }) {
  if (status === "pending") return <div role="status">AI thinking...</div>;
  if (status === "error") return <div role="alert">Failed to load message.</div>;
  return (
    <article aria-label="Chat Message">
      <p>{text}</p>
      {status === "streaming" && <span role="progressbar" aria-label="Streaming response" />}
    </article>
  );
}

describe("ChatMessage Component", () => {
  it("renders pending state with proper accessible status role", () => {
    render(<ChatMessage status="pending" />);
    expect(screen.getByRole("status")).toHaveTextContent("AI thinking...");
  });

  it("renders streaming state with progress indicator", () => {
    render(<ChatMessage status="streaming" text="Hello world" />);
    expect(screen.getByRole("article", { name: /chat message/i })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /streaming response/i })).toBeInTheDocument();
  });

  it("renders error state correctly using alert role", () => {
    render(<ChatMessage status="error" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load message.");
  });
});