import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import oniLogo from "./logo_onimask.png";

// Jocul Guess_adc
import GuessAdcGame from "./games/guess_adc/guess_adc";

// Placeholdere pentru colegi
import JocX from "./games/joc x/jocx";
import JocY from "./games/joc y/jocy";

export default function App() {
  return (
    <div className="gh-shell">
      <Routes>
        {/* Pagina de home */}
        <Route path="/" element={<Home />} />

        {/* Jocuri */}
        <Route path="/games/guess_adc" element={<GuessAdcGame />} />
        <Route path="/games/jocx" element={<JocX />} />
        <Route path="/games/jocy" element={<JocY />} />

        {/* 404 */}
        <Route path="*" element={<div className="gh-notfound">Page not found</div>} />
      </Routes>

      <footer className="gh-footer">
        <div className="gh-footer-inner">
          © {new Date().getFullYear()} GameHub • Cyber Oni Arcade
        </div>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <main className="gh-home">
      <section className="gh-hero">
        <img src={oniLogo} alt="GameHub Oni Logo" className="gh-logo" />
        <div className="gh-hero-text">
          <h1 className="gh-title">GameHub</h1>
          <p className="gh-subtitle">• Made by the Cyber-ninjas of UniTBv •</p>
        </div>
      </section>

      <section className="gh-games">
        <h2 className="gh-section-title">Choose your game</h2>
        <div className="gh-grid">
          <Link className="gh-card" to="/games/guess_adc">
            <div className="gh-card-tag">Available</div>
            <div className="gh-card-thumb gh-card-thumb--adc" />
            <h3 className="gh-card-title">Guess The ADC</h3>
             <p className="gh-card-desc">
              Like LoLdle, but only for bot lane enjoyers.
            </p>
          </Link>

          <Link className="gh-card gh-card--locked" to="/games/jocx">
            <div className="gh-card-tag gh-card-tag--soon">Under Construction</div>
            <div className="gh-card-thumb gh-card-thumb--x" />
            <h3 className="gh-card-title">Game X</h3>
            <p className="gh-card-desc">Coming from teammate #1.</p>
          </Link>

          <Link className="gh-card gh-card--locked" to="/games/jocy">
            <div className="gh-card-tag gh-card-tag--soon">Under Construction</div>
            <div className="gh-card-thumb gh-card-thumb--y" />
            <h3 className="gh-card-title">Game Y</h3>
            <p className="gh-card-desc">Coming from teammate #2.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
