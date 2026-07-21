"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Check, AlertCircle, RotateCcw } from "lucide-react";

export type ButtonState = "idle" | "loading" | "success" | "error";

interface SendButtonProps {
  onSend?: () => Promise<void>;
  disabled?: boolean;
}

// Type-safe Intentional Motion System
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.8,
} as const;

const ERROR_SHAKE_VARIANTS = {
  error: {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
};

export function SendButton({ onSend, disabled }: SendButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");

  const handleClick = async () => {
    if (state === "loading" || disabled) return;

    if (state === "error" || state === "success") {
      setState("idle");
      return;
    }

    setState("loading");

    if (onSend) {
      try {
        await onSend();
        setState("success");
        setTimeout(() => setState("idle"), 2000);
      } catch {
        setState("error");
      }
    } else {
      // Fake Async Call: Random delay with 20% failure rate
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2;
        if (isSuccess) {
          setState("success");
          setTimeout(() => setState("idle"), 2000);
        } else {
          setState("error");
        }
      }, 1200 + Math.random() * 800);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      animate={state === "error" ? "error" : "default"}
      variants={ERROR_SHAKE_VARIANTS}
      whileHover={
        state === "idle" && !disabled
          ? { scale: 1.03, y: -1 }
          : undefined
      }
      whileTap={
        state === "idle" && !disabled
          ? { scale: 0.97 }
          : undefined
      }
      className={`
        relative inline-flex items-center justify-center h-11 px-6 rounded-xl font-medium text-sm
        select-none overflow-hidden transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${
          state === "error"
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            : state === "success"
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {/* STATE: IDLE */}
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: SMOOTH_EASE }}
            className="flex items-center gap-2"
          >
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </motion.span>
        )}

        {/* STATE: LOADING */}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </motion.span>
        )}

        {/* STATE: SUCCESS */}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={SPRING_TRANSITION}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Sent!</span>
          </motion.span>
        )}

        {/* STATE: ERROR */}
        {state === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: SMOOTH_EASE }}
            className="flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Failed. Retry?</span>
            <RotateCcw className="w-3.5 h-3.5 opacity-80" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}