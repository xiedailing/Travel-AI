/* ============================================================
   Hero 場景縮放：.hv 以 928 x 816 的設計尺寸排版，依容器寬度等比縮放
   （放在最前面，GSAP 載入失敗時版面也能正常顯示）
   ============================================================ */
(function fitHeroVisual() {
  const visual = document.querySelector(".hero-visual");
  if (!visual) return;
  const DESIGN_WIDTH = 928;
  const update = () => {
    const width = visual.getBoundingClientRect().width;
    if (width) visual.style.setProperty("--hv-scale", width / DESIGN_WIDTH);
  };
  update();
  if ("ResizeObserver" in window) new ResizeObserver(update).observe(visual);
  else window.addEventListener("resize", update);
})();
