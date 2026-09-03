import React, { useEffect } from "react";

function RubiksCube3D() {
  useEffect(() => {
    // Dynamically import the script after DOM is ready
    import("../Scripts/rubiksCube.js");
  }, []);

  return (
    <div
      id="rubiksCube3DContainer"
      className="relative w-full  overflow-hidden"
    >
      {/* Particles Canvas */}
      <canvas id="bg-canvas"></canvas>

      {/* Advanced Custom Cursor with Aura and Ring */}
      <div id="cur-aura" className="hidden"></div>
      <div id="cur-ring" className="hidden"></div>
      <div id="cur" className="hidden"></div>
      <div id="cur-dot" className="hidden"></div>

      {/* Scroll Progress Bar */}
      <div id="progress"></div>

      {/* Hero Section with Cube */}
      <section id="hero">
        <div className="hero-bg-grid"></div>

        {/* Cube Wrapper */}
        <div id="cubeWrapper" className="cube-wrapper">
          <div className="cube-aura"></div>
          <div className="cube-viewport">
            <div id="cubeScene"></div>
          </div>
          <div className="cube-ui">
            <div id="cubeStatus" className="cube-status"></div>
            <div className="cube-metrics" aria-live="polite">
              <span>
                <strong id="cubeMoves">0</strong> moves
              </span>
              <span id="cubeMode">AUTO ORBIT</span>
            </div>
            <div className="cube-btns">
              <button
                id="btnScramble"
                className="cbtn px-4 py-2 border border-gray-400 bg-gray-900/5 text-gray-500 rounded-lg font-semibold text-sm cursor-pointer transition-all hover:border-orange-500 hover:text-orange-500 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                Scramble
              </button>
              <button
                id="btnSolve"
                className="cbtn cbtn-solve px-4 py-2 border border-yellow-500/30 bg-yellow-500/5 text-yellow-500/70 rounded-lg font-semibold text-sm cursor-pointer transition-all hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-500/10 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                Solve
              </button>
              <button
                id="btnResetView"
                className="cbtn px-4 py-2 border border-cyan-600/30 bg-cyan-600/5 text-cyan-700 rounded-lg font-semibold text-sm cursor-pointer transition-all hover:border-cyan-600 hover:text-cyan-700 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                Reset view
              </button>
            </div>
            <div className="cube-move-panel" aria-label="Cube face controls">
              <span className="cube-move-label">Make a move</span>
              <div className="cube-move-grid">
                {[
                  ["U", "U"],
                  ["U'", "U reverse"],
                  ["D", "D"],
                  ["D'", "D reverse"],
                  ["L", "L"],
                  ["L'", "L reverse"],
                  ["R", "R"],
                  ["R'", "R reverse"],
                  ["F", "F"],
                  ["F'", "F reverse"],
                  ["B", "B"],
                  ["B'", "B reverse"],
                ].map(([move, label]) => (
                  <button
                    key={move}
                    className="cube-move"
                    data-move={move}
                    aria-label={`Turn ${label}`}
                  >
                    {move}
                  </button>
                ))}
              </div>
            </div>
            <div className="cube-hint text-xs text-gray-500 letter-spacing-0.3px">
              Drag to orbit • U D L R F B keys • Double-click to scramble
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RubiksCube3D;
