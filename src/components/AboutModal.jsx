import React from "react";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

export default function AboutModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>About</DialogTitle>
      </DialogHeader>

      <div className='space-y-6 text-sm text-muted-foreground'>
        <section className='space-y-2'>
          <h3 className='text-base font-medium text-foreground'>Tech Stack</h3>
          <ul className='list-disc pl-5 space-y-1'>
            <li>React + Vite</li>
            <li>Tailwind CSS</li>
            <li>Shadcn-style UI primitives</li>
            <li>Monaco Editor</li>
            <li>i18next (internationalization)</li>
            <li>Piston API for code execution</li>
          </ul>
        </section>

        <section className='space-y-2'>
          <h3 className='text-base font-medium text-foreground'>Privacy</h3>
          <p>This demo does not persist your code on a server. When you click Run, your code is sent to a sandboxed execution service (Piston) to produce output. We do not collect personal data. Your theme preference may be stored locally in your browser for convenience.</p>
        </section>

        <section className='space-y-2'>
          <h3 className='text-base font-medium text-foreground'>Author</h3>
          <p>
            A project by <span className='font-medium text-foreground'>Vijaya Kumar Mylsamy</span>. Connect with me on{" "}
            <a href='https://www.linkedin.com/in/vijay-mayilsamy/' target='_blank' rel='noreferrer' className='underline decoration-dotted text-foreground hover:text-[#10b981]'>
              LinkedIn
            </a>
            .
          </p>
        </section>
      </div>

      <DialogFooter>
        <Button variant='outline' onClick={() => onOpenChange(false)} className='px-4 py-2'>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
