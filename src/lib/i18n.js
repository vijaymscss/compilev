import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appTitle: "Compile-V",
      selectLanguage: "Select a language",
      changeLanguage: "Change Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      run: "Run",
      clear: "Clear",
      editor: "Editor",
      output: "Output",
      fullscreen: "Full Screen",
      splitView: "Split View",
      // Output placeholders
      outputNo: "No output yet",
      outputHint: 'Click "Run Code" or press Ctrl+Enter to execute your {{language}} code',
      // Status bar
      statusTabSize: "Tab Size",
      statusReady: "Ready",
      statusBusy: "Busy",
      statusLines: "Lines",
      statusCharacters: "Characters",
      statusLn: "Ln",
      statusCol: "Col",
      // Confirms
      confirmReset: "Reset the editor to the default template? Your current changes will be lost.",
      confirmSwitchLanguage: "Switch to {{language}} and replace the editor with its default template? Your current changes will be lost.",
      confirmTitle: "Confirm action",
      confirm: "Confirm",
      cancel: "Cancel",
    },
  },
  fr: {
    translation: {
      appTitle: "Compile-V",
      selectLanguage: "Sélectionnez une langue",
      changeLanguage: "Changer de langue",
      theme: "Thème",
      light: "Clair",
      dark: "Sombre",
      run: "Exécuter",
      clear: "Effacer",
      editor: "Éditeur",
      output: "Sortie",
      fullscreen: "Plein écran",
      splitView: "Vue partagée",
      // Output placeholders
      outputNo: "Aucun résultat pour l'instant",
      outputHint: 'Cliquez sur "Exécuter le code" ou appuyez sur Ctrl+Entrée pour exécuter votre code {{language}}',
      // Status bar
      statusTabSize: "Taille de tabulation",
      statusReady: "Prêt",
      statusBusy: "Occupé",
      statusLines: "Lignes",
      statusCharacters: "Caractères",
      statusLn: "Lig",
      statusCol: "Col",
      // Confirms
      confirmReset: "Réinitialiser l'éditeur avec le modèle par défaut ? Vos modifications seront perdues.",
      confirmSwitchLanguage: "Basculer vers {{language}} et remplacer l'éditeur par son modèle par défaut ? Vos modifications seront perdues.",
      confirmTitle: "Confirmer l'action",
      confirm: "Confirmer",
      cancel: "Annuler",
    },
  },
  de: {
    translation: {
      appTitle: "Compile-V",
      selectLanguage: "Sprache auswählen",
      changeLanguage: "Sprache ändern",
      theme: "Thema",
      light: "Hell",
      dark: "Dunkel",
      run: "Ausführen",
      clear: "Löschen",
      editor: "Editor",
      output: "Ausgabe",
      fullscreen: "Vollbild",
      splitView: "Geteilte Ansicht",
      // Output placeholders
      outputNo: "Noch keine Ausgabe",
      outputHint: 'Klicken Sie auf "Code ausführen" oder drücken Sie Strg+Eingabe, um Ihren {{language}}-Code auszuführen',
      // Status bar
      statusTabSize: "Tabulatorgröße",
      statusReady: "Bereit",
      statusBusy: "Beschäftigt",
      statusLines: "Zeilen",
      statusCharacters: "Zeichen",
      statusLn: "Ze",
      statusCol: "Sp",
      // Confirms
      confirmReset: "Editor auf die Standardvorlage zurücksetzen? Ihre aktuellen Änderungen gehen verloren.",
      confirmSwitchLanguage: "Zu {{language}} wechseln und den Editor mit der Standardvorlage ersetzen? Ihre aktuellen Änderungen gehen verloren.",
      confirmTitle: "Aktion bestätigen",
      confirm: "Bestätigen",
      cancel: "Abbrechen",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
