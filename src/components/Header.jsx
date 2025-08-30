import React, { useState } from "react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { Code, CodeXml, Info } from "lucide-react";
import AboutModal from "./AboutModal";

export default function Header({ title, i18n, t, languageName, onOpenLanguage }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <>
      <div className='theme-dark mb-2 flex items-center justify-between p-4  border bg-background text-foreground'>
        <div className='text-lg font-semibold flex gap-2'>
          {" "}
          <CodeXml /> {title}
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={onOpenLanguage}>
            <span className='flex gap-2 items-center text-foreground px-4 py-1.5'>
              {" "}
              <Code size={20} /> {languageName} - Compiler
            </span>
          </Button>
          <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} className='h-9 rounded-md border bg-background text-foreground px-2 hover:bg-[#10b981] hover:text-white transition-colors'>
            <option value='en'>English</option>
            <option value='fr'>Français</option>
            <option value='de'>Deutsch</option>
          </select>
          <ThemeToggle />
          <Button variant='outline' size='icon' aria-label='About' title='About' onClick={() => setAboutOpen(true)}>
            <Info className='h-4 w-4 text-foreground' />
          </Button>
        </div>
      </div>
      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
}
