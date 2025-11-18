import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./guess_adc.css";

// ====== DATASET ADC (poți extinde) ======
const CHAMPIONS = [
  {
    name: "Jinx",
    gender: "Female",
    species: "Human",
    range: 525,
    regions: ["Zaun"],
    buildPath: "Crit",
    keystone: "Lethal Tempo",
    unorthodox: false,
    icon: "/champions/Jinx.png",
  },
  {
    name: "Caitlyn",
    gender: "Female",
    species: "Human",
    range: 650,
    regions: ["Piltover"],
    buildPath: "Crit",
    keystone: "Fleet Footwork",
    unorthodox: false,
    icon: "/champions/Caitlyn.png",
  },
  {
    name: "Ezreal",
    gender: "Male",
    species: "Human",
    range: 550,
    regions: ["Piltover"],
    buildPath: "Hybrid",
    keystone: "Press the Attack",
    unorthodox: false,
    icon: "/champions/Ezreal.png",
  },
  {
    name: "Ashe",
    gender: "Female",
    species: "Human",
    range: 600,
    regions: ["Freljord"],
    buildPath: "Crit",
    keystone: "Lethal Tempo",
    unorthodox: false,
    icon: "/champions/Ashe.png",
  },
  {
    name: "Jhin",
    gender: "Male",
    species: "Human",
    range: 550,
    regions: ["Ionia"],
    buildPath: "Crit",
    keystone: "Fleet Footwork",
    unorthodox: false,
    icon: "/champions/Jhin.png",
  },
  {
    name: "Draven",
    gender: "Male",
    species: "Human",
    range: 550,
    regions: ["Noxus"],
    buildPath: "Crit",
    keystone: "Lethal Tempo",
    unorthodox: false,
    icon: "/champions/Draven.png",
  },
  {
    name: "Samira",
    gender: "Female",
    species: "Human",
    range: 500,
    regions: ["Noxus", "Shurima"],
    buildPath: "Crit",
    keystone: "Conqueror",
    unorthodox: false,
    icon: "/champions/Samira.png",
  },
  {
    name: "Aphelios",
    gender: "Male",
    species: "Human",
    range: 550,
    regions: ["Targon"],
    buildPath: "Crit",
    keystone: "Lethal Tempo",
    unorthodox: false,
    icon: "/champions/Aphelios.png",
  },
  {
    name: "Xayah",
    gender: "Female",
    species: "Vastayan",
    range: 525,
    regions: ["Ionia"],
    buildPath: "Crit",
    keystone: "Lethal Tempo",
    unorthodox: false,
    icon: "/champions/Xayah.png",
  },
  {
    name: "Miss Fortune",
    gender: "Female",
    species: "Human",
    range: 550,
    regions: ["Bilgewater"],
    buildPath: "Crit",
    keystone: "Press the Attack",
    unorthodox: false,
    icon: "/champions/MissFortune.png",
  },
  // unorthodox bot mages
  {
    name: "Veigar",
    gender: "Male",
    species: "Yordle",
    range: 550,
    regions: ["Bandle City"],
    buildPath: "AP",
    keystone: "First Strike",
    unorthodox: true,
    icon: "/champions/Veigar.png",
  },
  {
    name: "Swain",
    gender: "Male",
    species: "Human",
    range: 525,
    regions: ["Noxus"],
    buildPath: "AP",
    keystone: "Conqueror",
    unorthodox: true,
    icon: "/champions/Swain.png",
  },
  {
    name: "Brand",
    gender: "Male",
    species: "Human",
    range: 550,
    regions: ["Runeterra"],
    buildPath: "AP",
    keystone: "Dark Harvest",
    unorthodox: true,
    icon: "/champions/Brand.png",
  },
];

// ====== HELPERS ======
function pickRandomChampion() {
  const index = Math.floor(Math.random() * CHAMPIONS.length);
  return CHAMPIONS[index];
}

function normalizeName(v) {
  return v.trim().toLowerCase();
}

function findChampionByName(name) {
  const n = normalizeName(name);
  return CHAMPIONS.find((c) => normalizeName(c.name) === n) || null;
}

function regionsStatus(guessRegions, targetRegions) {
  const intersection = guessRegions.filter((r) => targetRegions.includes(r));
  if (intersection.length === 0) return "wrong";
  const sameLength = guessRegions.length === targetRegions.length;
  const sameSet =
    sameLength &&
    guessRegions.every((r) => targetRegions.includes(r)) &&
    targetRegions.every((r) => guessRegions.includes(r));
  if (sameSet) return "correct";
  return "partial";
}

function rangeInfo(guessRange, targetRange) {
  if (guessRange === targetRange) {
    // ai nimerit exact range-ul -> verde
    return { status: "correct", hint: "Same" };
  }
  if (guessRange < targetRange) {
    // campionul secret are range MAI MARE -> hint "Higher" (tu ai ghicit unul cu range mai mic)
    return { status: "wrong", hint: "Higher" };
  }
  // campionul secret are range MAI MIC -> hint "Lower" (tu ai ghicit unul cu range mai mare)
  return { status: "wrong", hint: "Lower" };
}

function statusEq(a, b) {
  return a === b ? "correct" : "wrong";
}

// ====== COMPONENT ======
export default function GuessAdcGame() {
  const [secret, setSecret] = useState(() => pickRandomChampion());
  const [input, setInput] = useState("");
  const [rows, setRows] = useState([]); // { champ, fields }
  const [message, setMessage] = useState("");

  const gameWon =
    rows.length > 0 &&
    rows[rows.length - 1].champ.name === secret.name;

  const headerFields = useMemo(
    () => [
      "Champion",
      "Gender",
      "Species",
      "Attack range",
      "Region(s)",
      "Build path(s)",
      "Keystone(s)",
      "Unorthodox",
    ],
    []
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const champ = findChampionByName(input);
    if (!champ) {
      setMessage("Champion not in ADC list or typo.");
      return;
    }

    const range = rangeInfo(champ.range, secret.range);
    const regionStatusValue = regionsStatus(champ.regions, secret.regions);

    const newRow = {
      champ,
      fields: {
        gender: {
          value: champ.gender,
          status: statusEq(champ.gender, secret.gender),
        },
        species: {
          value: champ.species,
          status: statusEq(champ.species, secret.species),
        },
        range: {
          value: `${champ.range} (${range.hint})`,
          status: range.status,
        },
        regions: {
          value: champ.regions.join(", "),
          status: regionStatusValue,
        },
        buildPath: {
          value: champ.buildPath,
          status: statusEq(champ.buildPath, secret.buildPath),
        },
        keystone: {
          value: champ.keystone,
          status: statusEq(champ.keystone, secret.keystone),
        },
        unorthodox: {
          value: champ.unorthodox ? "Yes" : "No",
          status: statusEq(champ.unorthodox, secret.unorthodox),
        },
      },
    };

    setRows((prev) => [...prev, newRow]);
    setInput("");

    if (champ.name === secret.name) {
      setMessage(`GG! The ADC was ${secret.name}.`);
    } else {
      setMessage("Good guess, but not quite there");
    }
  }

  function handleNewGame() {
    setSecret(pickRandomChampion());
    setRows([]);
    setInput("");
    setMessage("");
  }

  return (
    <div className="adc-page">
      <div className="adc-top-panel">
        <div className="adc-header-row">
          <div>
            <h1 className="adc-title">Guess the ADC</h1>
            <p className="adc-subtitle">
              Like LoLdle, but only for bot lane enjoyers.
            </p>
          </div>

          <div className="adc-header-actions">
            <button
              type="button"
              className="adc-btn adc-btn--ghost"
              onClick={handleNewGame}>
              New game
            </button>

            <Link to="/" className="adc-btn adc-btn--ghost adc-btn--back">
              Back to GameHub
            </Link>
          </div>
        </div>


        <form className="adc-form" onSubmit={handleSubmit}>
          <label htmlFor="adc-input" className="adc-label">
            Type an ADC / bot mage name
          </label>
          <div className="adc-input-row">
            <input
              id="adc-input"
              list="adc-champ-list"
              className="adc-input"
              placeholder="Jinx, Caitlyn, Ezreal..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="adc-btn adc-btn--primary">
              Guess
            </button>
          </div>
          <datalist id="adc-champ-list">
            {CHAMPIONS.map((c) => (
              <option key={c.name} value={c.name} />
            ))}
          </datalist>
        </form>

        {message && <div className="adc-message">{message}</div>}
        {gameWon && (
          <div className="adc-win-note">
            You found the champion! You can keep guessing or start a new game.
          </div>
        )}

        <div className="adc-legend">
          <span className="adc-pill adc-pill--correct">Correct</span>
          <span className="adc-pill adc-pill--partial">Partial</span>
          <span className="adc-pill adc-pill--wrong">Wrong</span>
          <span className="adc-pill adc-pill--range">
            Range: Higher / Lower / Same
          </span>
        </div>
      </div>

      <div className="adc-grid-panel">
        <div className="adc-grid-header">
          {headerFields.map((h) => (
            <div key={h} className="adc-grid-col adc-grid-col--header">
              {h}
            </div>
          ))}
        </div>

        <div className="adc-grid-body">
          {rows.length === 0 && (
            <div className="adc-empty-row">
              No guesses yet. Make your first guess to start the grid.
            </div>
          )}

          {rows.map((row, index) => {
            const { champ, fields } = row;
            return (
              <div
                key={champ.name + index}
                className="adc-row adc-row--flip"
              >
                {/* Champion cell */}
                <div className="adc-grid-col adc-cell adc-cell--champ">
                  <div className="adc-champ">
                    <div className="adc-champ-icon">
                      {champ.icon ? (
                        <img src={champ.icon} alt={champ.name} />
                      ) : (
                        <div className="adc-champ-placeholder">
                          {champ.name[0]}
                        </div>
                      )}
                    </div>
                    <span className="adc-champ-name">{champ.name}</span>
                  </div>
                </div>

                {/* Other fields */}
                <Cell label="Gender" data={fields.gender} />
                <Cell label="Species" data={fields.species} />
                <Cell label="Attack range" data={fields.range} />
                <Cell label="Region(s)" data={fields.regions} />
                <Cell label="Build path" data={fields.buildPath} />
                <Cell label="Keystone" data={fields.keystone} />
                <Cell label="Unorthodox" data={fields.unorthodox} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ====== Cell component ======
function Cell({ data }) {
  const status = data.status || "wrong";
  return (
    <div className={`adc-grid-col adc-cell adc-cell--${status}`}>
      <div className="adc-cell-inner">
        <span className="adc-cell-value">{data.value}</span>
      </div>
    </div>
  );
}
