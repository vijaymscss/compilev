import React from "react";
import { Button } from "./ui/button";
import { Play, Trash2 } from "lucide-react";

export default function OutputHeader({ languageName, onRun, onClear, ready = true }) {
  return (
    <div className='mb-2 rounded-lg border bg-card'>
      <div className='flex items-center justify-between px-3 py-2'>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Output</span>
          <span className='flex items-center gap-1 text-xs text-muted-foreground'>
            <span className={`h-2 w-2 rounded-full ${ready ? "bg-emerald-500" : "bg-yellow-500"}`} />
            {ready ? "Ready" : "Busy"}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          {onRun && (
            <Button id='run-code-btn' onClick={onRun} disabled={!ready} className='px-2 py-1.5 bg-[#10b981] text-white hover:bg-[#10b981]'>
              {ready ? (
                <>
                  <Play className='mr-2 h-4 w-4' />
                  Run Code
                </>
              ) : (
                <>Executing...</>
              )}
            </Button>
          )}
          <button aria-label='Clear output' onClick={onClear} className='inline-flex items-center justify-center rounded-md border border-input bg-transparent px-2 py-1.5 text-muted-foreground hover:bg-[#06b17c] hover:text-white transition-colors'>
            <Trash2 className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
