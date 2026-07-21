import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import React, { useState } from "react";

function InputForm({ onSubmit }: { onSubmit: (val: string) => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!val.trim()) {
      setErr("Input cannot be empty");
      return;
    }
    onSubmit(val);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Message Form">
      <label htmlFor="msg-input">Prompt</label>
      <input id="msg-input" value={val} onChange={(e) => setVal(e.target.value)} />
      {err && <p role="alert">{err}</p>}
      <button type="submit">Send</button>
    </form>
  );
}

describe("Validated Form Component", () => {
  it("validates input and prevents submit when empty", async () => {
    const handleSubmit = vi.fn();
    render(<InputForm onSubmit={handleSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByRole("alert")).toHaveTextContent("Input cannot be empty");
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with input text when valid", async () => {
    const handleSubmit = vi.fn();
    render(<InputForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/prompt/i), "Test prompt");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(handleSubmit).toHaveBeenCalledWith("Test prompt");
  });
});