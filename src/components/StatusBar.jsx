import React from "react";
import { useTranslation } from "react-i18next";

export default function StatusBar({ languageLabel, tabSize = 2, lines = 0, characters = 0, cursor = { lineNumber: 1, column: 1 }, ready = true }) {
  const { t } = useTranslation();
  return (
    <div className='flex w-full flex-wrap items-center gap-x-3 gap-y-1 border-t px-3 py-1 text-xs text-muted-foreground sm:h-8 sm:py-0'>
      <div className='flex items-center gap-3'>
        <span>UTF-8</span>
        <span>•</span>
        <span>{languageLabel}</span>
        <span>•</span>
        <span>
          {t("statusTabSize")}: {tabSize}
        </span>
        <span>•</span>
        <span className={ready ? "text-emerald-500" : ""}>{ready ? t("statusReady") : t("statusBusy")}</span>
      </div>

      <div className='ml-auto flex basis-full items-center gap-3 sm:basis-auto'>
        <span>
          {t("statusLines")}: {lines}
        </span>
        <span>•</span>
        <span>
          {t("statusCharacters")}: {characters}
        </span>
        <span>•</span>
        <span>
          {t("statusLn")} {cursor.lineNumber}, {t("statusCol")} {cursor.column}
        </span>
      </div>
    </div>
  );
}
