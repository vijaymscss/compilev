import React from "react";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { useTranslation } from "react-i18next";

export default function ConfirmModal({ open, onOpenChange, title, message, onConfirm }) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{title || t("confirmTitle")}</DialogTitle>
      </DialogHeader>
      <div className='text-sm text-muted-foreground'>{message}</div>
      <DialogFooter>
        <button className='mt-2 inline-flex items-center justify-center rounded-md border border-input bg-transparent px-3 py-1.5 text-muted-foreground hover:bg-muted' onClick={() => onOpenChange(false)}>
          {t("cancel")}
        </button>
        <button
          className='mt-2 inline-flex items-center justify-center rounded-md bg-[#10b981] px-3 py-1.5 text-white hover:opacity-90'
          onClick={() => {
            onConfirm?.();
            onOpenChange(false);
          }}>
          {t("confirm")}
        </button>
      </DialogFooter>
    </Dialog>
  );
}
