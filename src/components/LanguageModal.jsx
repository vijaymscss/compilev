import React from "react";
import { Dialog, DialogHeader, DialogTitle } from "./ui/dialog";
import { SUPPORTED_LANGUAGES } from "../lib/languages";

const logos = {
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
};

export default function LanguageModal({ open, onOpenChange, onSelect }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Select a language</DialogTitle>
      </DialogHeader>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {SUPPORTED_LANGUAGES.map((l) => (
          <button
            key={l.id}
            className='group flex flex-col items-center gap-2 rounded-lg border p-4 hover:shadow focus:outline-none focus:ring-2 transition-colors hover:bg-[#10b981] hover:text-white focus:ring-[#10b981]'
            onClick={() => {
              onSelect(l.id);
              onOpenChange(false);
            }}>
            <div className='aspect-square w-16 overflow-hidden rounded-md bg-muted/50'>
              <img src={logos[l.id]} alt={l.name} className='h-full w-full object-contain p-2 transition-transform group-hover:scale-105' />
            </div>
            <span className='text-sm font-medium'>{l.name}</span>
          </button>
        ))}
      </div>
    </Dialog>
  );
}
