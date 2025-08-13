import React from "react";
import { useTranslation } from "react-i18next";

export default function Output({ output, error, placeholderIcon = null, languageLabel = "javascript" }) {
  const { t } = useTranslation();
  const isEmpty = !error && (!output || output.trim() === "");
  if (isEmpty) {
    return (
      <div className='flex h-full flex-col items-center justify-center rounded-lg border bg-card text-center'>
        {placeholderIcon}
        <div className='mt-6 text-base font-medium text-muted-foreground'>{t("outputNo")}</div>
        <div className='mt-1 text-sm text-muted-foreground'>{t("outputHint", { language: languageLabel })}</div>
      </div>
    );
  }
  return <div className='h-full overflow-auto rounded-lg border bg-card p-4 text-sm'>{error ? <pre className='whitespace-pre-wrap text-red-500'>{error}</pre> : <pre className='whitespace-pre-wrap'>{output}</pre>}</div>;
}
