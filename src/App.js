import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./views/settings/SettingsContext";
import TypingExperience from "./views/TypingExperience";
import Footer from "./views/Footer";
import Impressum from "./views/legal/Impressum";

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-zinc-50">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<TypingExperience />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/:slug" element={<TypingExperience />} />
              <Route path="*" element={<TypingExperience />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
