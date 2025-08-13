import React, { useContext, useEffect, useMemo, useRef } from "react";
import Monaco from "@monaco-editor/react";
import { ThemeContext } from "./ThemeProvider";

export default function Editor({ language, code, onChange, fullScreen, onCursorChange, onStats, settings }) {
  const editorRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const prefersDark = useMemo(() => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, []);
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  const options = useMemo(() => {
    const lineNumbersMode = settings?.lineNumbers ? "on" : "off";
    return {
      minimap: { enabled: Boolean(settings?.minimap) },
      fontSize: Number(settings?.fontSize ?? 14),
      lineNumbers: lineNumbersMode,
      wordWrap: "on",
      automaticLayout: true,
      tabSize: Number(settings?.tabSize ?? 2),
      theme: isDark ? "vi-dark" : "vs",
    };
  }, [fullScreen, isDark, settings]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ theme: isDark ? "vi-dark" : "vs" });
    }
  }, [isDark]);

  const handleMount = (editor, monaco) => {
    try {
      monaco.editor.defineTheme("vi-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "", foreground: "D1D5DB" },
          { token: "string", foreground: "A7F3D0" },
          { token: "number", foreground: "FDE68A" },
          { token: "keyword", foreground: "93C5FD" },
          { token: "type", foreground: "FCA5A5" },
          { token: "comment", foreground: "6B7280" },
        ],
        colors: {
          "editor.background": "#0b1220",
          "editor.foreground": "#E5E7EB",
          "editor.lineHighlightBackground": "#111827",
          "editorCursor.foreground": "#34D399",
          "editorLineNumber.foreground": "#475569",
          "editorLineNumber.activeForeground": "#A7F3D0",
          "editor.selectionBackground": "#1f2a44",
          "editor.inactiveSelectionBackground": "#1b2238",
        },
      });
    } catch {}
    editorRef.current = editor;
    // Ensure initial theme matches app theme on mount
    editor.updateOptions({ theme: isDark ? "vi-dark" : "vs" });
    // Apply initial external settings on mount as well
    if (settings) {
      editor.updateOptions({
        lineNumbers: settings.lineNumbers ? "on" : "off",
        minimap: { enabled: Boolean(settings.minimap) },
        fontSize: Number(settings.fontSize ?? 14),
        tabSize: Number(settings.tabSize ?? 2),
      });
    }
    const model = editor.getModel();
    onStats?.({
      tabSize: model?.getOptions().tabSize ?? 2,
      lines: model?.getLineCount() ?? 0,
      characters: model?.getValueLength() ?? 0,
    });
    editor.onDidChangeCursorPosition((e) => onCursorChange?.(e.position));
    editor.onDidChangeModelContent(() => {
      const m = editor.getModel();
      onStats?.({
        tabSize: m?.getOptions().tabSize ?? 2,
        lines: m?.getLineCount() ?? 0,
        characters: m?.getValueLength() ?? 0,
      });
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "enter") {
        const run = document.getElementById("run-code-btn");
        if (run) run.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className='h-full'>
      <Monaco onMount={handleMount} height='100%' language={language} value={code} options={options} onChange={(value) => onChange(value ?? "")} />
    </div>
  );
}
