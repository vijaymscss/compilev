import React, { useContext, useMemo } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "./ThemeProvider";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const prefersDark = useMemo(() => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, []);
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' size='icon' aria-label='Toggle theme' onClick={handleThemeToggle}>
        {isDark ? <Sun className='h-4 w-4 text-foreground' /> : <Moon className='h-4 w-4 text-foreground' />}
      </Button>
    </div>
  );
}
