"use client";
import { useState } from "react";
import QuoteModal from "./QuoteModal";

type Props = {
  children?: React.ReactNode;
  className?: string;
  defaultIssue?: string;
};

export default function QuoteButton({
  children = "Get a free quote",
  className = "",
  defaultIssue,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <QuoteModal open={open} onClose={() => setOpen(false)} defaultIssue={defaultIssue} />
    </>
  );
}