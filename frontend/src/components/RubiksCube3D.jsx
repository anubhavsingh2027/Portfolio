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
            </div>
            <div className="cube-hint text-xs text-gray-500 letter-spacing-0.3px">
              Drag to rotate • Click buttons to scramble/solve
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RubiksCube3D;
