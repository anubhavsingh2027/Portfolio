function  RubixCube() {
  return <>
<div id="cur"></div>
    <div id="cur-dot"></div>
    <canvas id="bg-canvas"></canvas>


    <section id="hero">
      <div class="hero-bg-grid"></div>

      
      <div class="cube-wrapper" id="cubeWrapper">
        <div class="cube-aura"></div>
        <div class="cube-viewport">
          <div id="cubeScene"></div>
        </div>
        <div class="cube-ui">
          <div class="cube-status" id="cubeStatus">Initializing...</div>
          <div class="cube-btns">
            <button class="cbtn btn-m" id="btnScramble">Scramble</button>
            <button class="cbtn cbtn-solve btn-m" id="btnSolve">Solve</button>
          </div>
          <div class="cube-hint">
            Drag to rotate &bull; buttons to scramble/solve
          </div>
        </div>
      </div>
    </section>
  </>
};
export default RubixCube;