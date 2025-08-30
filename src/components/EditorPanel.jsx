import React from "react";
import { Button } from "./ui/button";
import { Settings, RotateCcw, Maximize2, Columns } from "lucide-react";
import Editor from "./Editor";
import StatusBar from "./StatusBar";

export default function EditorPanel({ t, current, setSettingsOpen, setConfirm, setCode, fullScreen, toggleFull, code, onChange, onCursorChange, onStats, stats, cursor, editorSettings }) {
  return (
    <div className='flex h-full flex-col gap-2 mr-3'>
      <div className='rounded-lg border bg-card'>
        <div className='flex items-center justify-between px-3 py-2 text-sm text-muted-foreground'>
          <span>
            {t("editor")} — {current.name}
          </span>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='icon' title={t("settings")} onClick={() => setSettingsOpen(true)}>
              <Settings className='h-4 w-4 text-foreground' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              title={t("reset")}
              onClick={() =>
                setConfirm({
                  open: true,
                  message: t("confirmReset"),
                  onConfirm: () => setCode(current.template),
                })
              }>
              <RotateCcw className='h-4 w-4 text-foreground' />
            </Button>
            <Button variant='outline' size='icon' title={fullScreen ? t("splitView") : t("fullscreen")} onClick={toggleFull}>
              {fullScreen ? <Columns className='h-4 w-4 text-foreground' /> : <Maximize2 className='h-4 w-4 text-foreground' />}
            </Button>
          </div>
        </div>
      </div>
      <div className='flex-1 min-h-0'>
        <Editor language={current.monaco} code={code} onChange={onChange} fullScreen={fullScreen} onCursorChange={onCursorChange} onStats={onStats} settings={editorSettings} />
      </div>
      <StatusBar languageLabel={current.name} tabSize={stats.tabSize} lines={stats.lines} characters={stats.characters} cursor={cursor} ready={true} />
    </div>
  );
}
