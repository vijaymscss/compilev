import React, { useEffect, useMemo, useState } from "react";
import "./lib/i18n";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import LanguageModal from "./components/LanguageModal";
import ResizableSplit from "./components/ResizableSplit";
import Editor from "./components/Editor";
import Output from "./components/Output";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import OutputHeader from "./components/OutputHeader";
import { Button } from "./components/ui/button";
import ConfirmModal from "./components/ConfirmModal";
import { getLanguageById, SUPPORTED_LANGUAGES } from "./lib/languages";
import { Maximize2, Columns, RotateCcw, Settings } from "lucide-react";
import EditorSettingsModal from "./components/EditorSettingsModal";
import { executeCode } from "./services/api";
import EditorPanel from "./components/EditorPanel";
import OutputPanel from "./components/OutputPanel";

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

function AppInner() {
  const { t, i18n } = useTranslation();
  const [showPicker, setShowPicker] = useState(true);
  const [langId, setLangId] = useState("javascript");
  const [code, setCode] = useState(getLanguageById("javascript").template);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [cursor, setCursor] = useState({ lineNumber: 1, column: 1 });
  const [stats, setStats] = useState({ tabSize: 2, lines: 0, characters: 0 });
  const [confirm, setConfirm] = useState({ open: false, message: "", onConfirm: null });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editorSettings, setEditorSettings] = useState({
    lineNumbers: true,
    minimap: false,
    fontSize: 14, // medium
    tabSize: 2,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showPicker) return;
    // reset when opening picker
  }, [showPicker]);

  const current = useMemo(() => getLanguageById(langId), [langId]);

  const runCode = async () => {
    setError("");
    setOutput("Running...");
    setLoading(true);
    try {
      const body = {
        language: current.piston.language,
        version: current.piston.version,
        files: [{ name: inferFilename(current.id), content: code }],
      };
      const data = await executeCode(body);
      const out = [data.run?.stdout, data.run?.stderr].filter(Boolean).join("\n");
      setOutput(out || "(no output)");
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const onSelectLanguage = (id) => {
    if (id === langId) return setShowPicker(false);
    const next = getLanguageById(id);
    setLangId(id);
    setCode(next.template);
  };

  const onOpenLanguage = () => {
    setConfirm({
      open: true,
      message: "Proceed to change the language? Your current code will reset.",
      onConfirm: () => setShowPicker(true),
    });
  };

  const toggleFull = () => setFullScreen((v) => !v);

  return (
    <div className='h-screen w-screen'>
      {!fullScreen && <Header title={t("appTitle")} i18n={i18n} t={t} languageName={current.name} onOpenLanguage={onOpenLanguage} />}
      <div className={fullScreen ? "px-0" : "px-4"}>
        {fullScreen ? (
          <div className='h-screen'>
            <EditorPanel t={t} current={current} setSettingsOpen={setSettingsOpen} setConfirm={setConfirm} setCode={setCode} fullScreen={fullScreen} toggleFull={toggleFull} code={code} onChange={setCode} onCursorChange={setCursor} onStats={setStats} stats={stats} cursor={cursor} editorSettings={editorSettings} />
          </div>
        ) : (
          <div className='h-[calc(100vh-96px)]'>
            <ResizableSplit left={<EditorPanel t={t} current={current} setSettingsOpen={setSettingsOpen} setConfirm={setConfirm} setCode={setCode} fullScreen={fullScreen} toggleFull={toggleFull} code={code} onChange={setCode} onCursorChange={setCursor} onStats={setStats} stats={stats} cursor={cursor} editorSettings={editorSettings} />} right={<OutputPanel current={current} runCode={runCode} output={output} error={error} setOutput={setOutput} setError={setError} ready={!loading} code={code} />} />
          </div>
        )}
        <LanguageModal open={showPicker} onOpenChange={setShowPicker} onSelect={onSelectLanguage} />
        <ConfirmModal open={confirm.open} onOpenChange={(v) => setConfirm((c) => ({ ...c, open: v }))} title={t("confirmTitle")} message={confirm.message} onConfirm={confirm.onConfirm} />
        <EditorSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} value={editorSettings} onChange={setEditorSettings} />
      </div>
    </div>
  );
}

function inferFilename(id) {
  switch (id) {
    case "javascript":
      return "main.js";
    case "typescript":
      return "main.ts";
    case "python":
      return "main.py";
    case "java":
      return "Main.java";
    case "c":
      return "main.c";
    case "cpp":
      return "main.cpp";
    case "go":
      return "main.go";
    default:
      return "main.txt";
  }
}
