import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

export default function EditorSettingsModal({ open, onOpenChange, value, onChange }) {
  const [local, setLocal] = useState(() => value);

  useEffect(() => {
    if (open) setLocal(value);
  }, [open, value]);

  const handleApply = () => {
    onChange(local);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Editor Settings</DialogTitle>
      </DialogHeader>

      <div className='space-y-6 text-sm'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-foreground font-medium'>Show line numbers</div>
              <div className='text-xs text-muted-foreground'>Display line numbers in the gutter</div>
            </div>
            <label className='inline-flex relative items-center cursor-pointer'>
              <input type='checkbox' className='sr-only peer' checked={local.lineNumbers} onChange={(e) => setLocal((s) => ({ ...s, lineNumbers: e.target.checked }))} />
              <div className='w-10 h-6 rounded-full bg-muted transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10b981] peer-checked:bg-[#10b981]'></div>
              <div className='absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4'></div>
            </label>
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <div className='text-foreground font-medium'>Show minimap</div>
              <div className='text-xs text-muted-foreground'>Right-side code overview</div>
            </div>
            <label className='inline-flex relative items-center cursor-pointer'>
              <input type='checkbox' className='sr-only peer' checked={local.minimap} onChange={(e) => setLocal((s) => ({ ...s, minimap: e.target.checked }))} />
              <div className='w-10 h-6 rounded-full bg-muted transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10b981] peer-checked:bg-[#10b981]'></div>
              <div className='absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4'></div>
            </label>
          </div>

          <div className='space-y-2'>
            <label className='text-foreground font-medium'>Font size</label>
            <select className='h-9 w-full rounded-md border bg-background text-foreground px-2' value={local.fontSize} onChange={(e) => setLocal((s) => ({ ...s, fontSize: Number(e.target.value) }))}>
              <option value={12}>Small</option>
              <option value={14}>Medium</option>
              <option value={16}>Large</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label className='text-foreground font-medium'>Tab size</label>
            <select className='h-9 w-full rounded-md border bg-background text-foreground px-2' value={local.tabSize} onChange={(e) => setLocal((s) => ({ ...s, tabSize: Number(e.target.value) }))}>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </div>
        </div>
      </div>

      <DialogFooter>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)} className='px-5 py-2'>
            Cancel
          </Button>
          <Button variant='default' onClick={handleApply} className='px-5 py-2 bg-[#10b981] text-white hover:bg-[#06b17c]'>
            Apply
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
