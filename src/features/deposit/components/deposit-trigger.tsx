"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type DepositTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function DepositTrigger({
  children,
  onClick,
  type = "button",
  ...props
}: DepositTriggerProps) {
  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) {
          return;
        }
        window.dispatchEvent(new Event("a66:open-deposit"));
      }}
    >
      {children}
    </button>
  );
}
