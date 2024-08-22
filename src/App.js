import React from "react";
import { SettingsProvider } from "./views/settings/SettingsContext";
import TypingExperience from "./views/TypingExperience";

function App() {
  return (
    <SettingsProvider>
      <TypingExperience />
    </SettingsProvider>
  );
}

export default App;
