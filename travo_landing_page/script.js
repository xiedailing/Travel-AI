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

/* ============================================================
   錨點平滑捲動（導覽列、回到頂端按鈕）
   用 JS 而非 CSS scroll-behavior，避免與 ScrollTrigger 衝突
   ============================================================ */
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const hash = link.getAttribute("href");
  const target = hash === "#" ? null : document.querySelector(hash);
  if (hash !== "#" && !target) return;

  event.preventDefault();
  const top = target ? target.getBoundingClientRect().top + window.scrollY : 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  if (hash !== "#") history.pushState(null, "", hash);
});

/* ============================================================
   GSAP 動態效果
   ============================================================ */
(function motion() {
  const root = document.documentElement;

  // GSAP 沒載入（離線、CDN 被擋）：取消隱藏，頁面以靜態呈現
  if (!window.gsap || !window.ScrollTrigger) {
    root.classList.remove("js");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  // 區塊進場的共用寫法：捲到區塊時，元素由下往上淡入（只播一次）
  const reveal = (targets, trigger, options = {}) =>
    gsap.from(targets, {
      autoAlpha: 0,
      y: 28,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger, start: "top 82%", once: true },
      ...options,
    });

  function setup() {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop:
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile:
          "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions;
        let cleanup;

        // 持續循環的浮動／閃爍動畫統一收集，Hero 捲出畫面時暫停以節省效能
        const idle = [];
        const loop = (targets, vars) => {
          const tween = gsap.to(targets, {
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            ...vars,
          });
          idle.push(tween);
          return tween;
        };

        // 使用者偏好減少動態：內容直接顯示，不播放任何動畫
        if (reduce) {
          root.classList.remove("js");
          return;
        }

        /* ---------- Header ---------- */
        gsap.fromTo(
          "header",
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
        );

        /* ---------- Hero 文字 ---------- */
        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.1,
        });

        intro.fromTo(
          ".hero-text > *",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
          0,
        );

        /* ---------- Hero 圖：手機版 ---------- */
        if (!desktop) {
          intro.fromTo(
            ".hero-img-mobile",
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, duration: 1 },
            0.25,
          );
          loop(".hero-img-mobile", { y: -8, duration: 3.6, delay: 1.8 });
        }

        /* ---------- Hero 圖：桌機版分層場景 ---------- */
        if (desktop) {
          const visual = $(".hero-visual");
          const group = (name) => $(`[data-hv="${name}"]`, visual);

          // 光暈、兩支手機依序進場
          intro
            .fromTo(
              group("glow"),
              { autoAlpha: 0, scale: 0.82 },
              { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
              0.1,
            )
            .fromTo(
              group("phone-a"),
              { autoAlpha: 0, x: -36, y: 48 },
              { autoAlpha: 1, x: 0, y: 0, duration: 1.1 },
              0.25,
            )
            .fromTo(
              group("phone-b"),
              { autoAlpha: 0, x: 36, y: 64 },
              { autoAlpha: 1, x: 0, y: 0, duration: 1.1 },
              0.45,
            )
            .fromTo(
              group("sparkles"),
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.4 },
              1.4,
            );

          // 左手機：資料夾先出現，收藏卡片逐張落入，icon 隨後彈出
          const folder = $(".hv-folder", visual);
          const cards = $$(".hv-card", visual);
          const icons = $$(".hv-icon", visual);

          intro.fromTo(
            folder,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            0.9,
          );

          cards.forEach((card, i) => {
            const start = 1.05 + i * 0.18;
            intro
              .fromTo(
                card,
                { autoAlpha: 0, y: -34, scale: 0.9 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: "back.out(1.4)",
                },
                start,
              )
              .fromTo(
                icons[i],
                { autoAlpha: 0, scale: 0.4 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.45,
                  ease: "back.out(2.4)",
                },
                start + 0.3,
              );
          });

          // 卡片都落入後，資料夾輕輕彈一下，像是把收藏接住
          intro.fromTo(
            folder,
            { scale: 1 },
            {
              scale: 1.035,
              transformOrigin: "50% 60%",
              duration: 0.28,
              ease: "power2.inOut",
              yoyo: true,
              repeat: 1,
            },
            2.25,
          );

          // 右手機：行程一筆一筆被排出來
          intro.fromTo(
            $(".hv-trip-title", visual),
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            1.15,
          );

          $$(".hv-timeline > *", visual).forEach((item, i) => {
            const start = 1.35 + i * 0.22;
            const isRow = item.classList.contains("hv-row");

            intro.fromTo(
              item,
              { autoAlpha: 0, y: isRow ? 16 : 6 },
              { autoAlpha: 1, y: 0, duration: isRow ? 0.6 : 0.5 },
              start,
            );

            if (isRow) {
              intro.fromTo(
                $(".hv-dot", item),
                { scale: 0 },
                { scale: 1, duration: 0.4, ease: "back.out(3)" },
                start + 0.15,
              );
            } else {
              intro.fromTo(
                $(".hv-line", item),
                { scaleY: 0, transformOrigin: "50% 0%" },
                { scaleY: 1, duration: 0.4 },
                start,
              );
            }
          });

          // 星星彈出
          const sparks = $$(".hv-spark", visual);
          intro.fromTo(
            sparks,
            { scale: 0 },
            { scale: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.12 },
            1.5,
          );

          /* --- 持續的細微動態（進場結束後接續） --- */
          // 光暈呼吸
          loop($(".hv-glow", visual), { scale: 1.045, duration: 5, delay: 1.8 });

          // 兩支手機緩慢浮動，節奏錯開
          loop($(".hv-float", group("phone-a")), {
            y: -7,
            duration: 3.8,
            delay: 0.6,
          });
          loop($(".hv-float", group("phone-b")), {
            y: -10,
            duration: 4.6,
            delay: 0.9,
          });

          // 收藏卡片（與各自的 icon 一起）微幅浮動
          cards.forEach((card, i) => {
            loop([card, icons[i]], {
              y: -3.5,
              duration: 2.6 + i * 0.3,
              delay: 2.6 + i * 0.2,
            });
          });

          // 星星閃爍
          sparks.forEach((spark, i) => {
            loop(spark, {
              scale: 0.8,
              rotation: "+=14",
              duration: 2 + i * 0.45,
              delay: 2.8 + i * 0.15,
            });
          });

          /* --- 滑鼠視差：各層以不同幅度跟著滑鼠移動，產生景深 --- */
          const canHover = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          ).matches;

          if (canHover) {
            const hero = $(".hero");
            const layers = $$(".hv-par", visual).map((el) => ({
              depth: Number(el.dataset.depth),
              x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
            }));

            const onMove = (event) => {
              const rect = visual.getBoundingClientRect();
              const clamp = gsap.utils.clamp(-0.7, 0.7);
              const nx = clamp(
                (event.clientX - (rect.left + rect.width / 2)) / rect.width,
              );
              const ny = clamp(
                (event.clientY - (rect.top + rect.height / 2)) / rect.height,
              );
              layers.forEach(({ depth, x, y }) => {
                x(-nx * depth * 2);
                y(-ny * depth * 2);
              });
            };
            const onLeave = () =>
              layers.forEach(({ x, y }) => {
                x(0);
                y(0);
              });

            hero.addEventListener("pointermove", onMove);
            hero.addEventListener("pointerleave", onLeave);
            // 條件不再成立時（例如縮到手機寬度）移除監聽
            cleanup = () => {
              hero.removeEventListener("pointermove", onMove);
              hero.removeEventListener("pointerleave", onLeave);
            };
          }

          /* --- 捲動視差：往下捲時，Hero 圖比文字慢一點離開 --- */
          gsap.to(visual, {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        // Hero 捲出畫面就暫停循環動畫，回到畫面再繼續
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) =>
            idle.forEach((tween) =>
              self.isActive ? tween.resume() : tween.pause(),
            ),
        });

        /* ---------- HOW IT WORKS ---------- */
        reveal(
          [".how-it-works > p", ".how-it-works > h2"],
          ".how-it-works",
          { y: 20, stagger: 0.12 },
        );

        const stepCards = $$(".how-it-works .card");
        gsap.set(stepCards, { autoAlpha: 0, y: 36 });
        ScrollTrigger.batch(stepCards, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.14,
            }),
        });

        /* ---------- CORE FEATURES ---------- */
        reveal(
          [".core-features > p", ".core-features > h2"],
          ".core-features",
          { y: 20, stagger: 0.12 },
        );

        $$(".feature").forEach((feature, i) => {
          const text = $(".feature-text", feature);
          const phone = $(".phone-frame", feature);
          const image = $("img", phone);

          // 桌機：文字與手機從左右兩側滑入（對應交錯的版面）；手機版：由下往上
          const side = desktop ? (i % 2 === 0 ? -1 : 1) : 0;
          const offset = side ? { x: side * 40 } : { y: 28 };
          const counter = side ? { x: -side * 40 } : { y: 28 };

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: feature, start: "top 78%", once: true },
          });
          tl.from(text.children, {
            autoAlpha: 0,
            ...offset,
            duration: 0.8,
            stagger: 0.1,
          }).from(
            phone,
            { autoAlpha: 0, ...counter, duration: 0.9 },
            0.1,
          );

          // 桌機：手機截圖在框內做輕微視差
          if (desktop) {
            // CSS 用 translateX(-50%) 置中，交給 GSAP 的 xPercent 接手避免被覆蓋
            gsap.set(image, { xPercent: -50, x: 0 });
            gsap.fromTo(
              image,
              { y: 18 },
              {
                y: -18,
                ease: "none",
                scrollTrigger: {
                  trigger: phone,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              },
            );
          }
        });

        /* ---------- EXPERIENCE ---------- */
        const experienceTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: ".experience", start: "top 75%", once: true },
        });
        experienceTl
          .from(".experience-text > :not(.checklist)", {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.1,
          })
          .from(
            ".check-item",
            { autoAlpha: 0, x: -24, duration: 0.6, stagger: 0.12 },
            "-=0.3",
          );

        const visualTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: ".experience .visual", start: "top 80%", once: true },
        });
        visualTl
          .from(".gbg", { autoAlpha: 0, y: 40, duration: 0.9 })
          .from(
            ".itinerary-card",
            { autoAlpha: 0, y: 48, duration: 0.8 },
            "-=0.4",
          )
          .from(
            ".itinerary-card .checked",
            { autoAlpha: 0, scale: 0.8, duration: 0.4, ease: "back.out(2)" },
            "-=0.3",
          )
          .from(
            ".itinerary-card .schedule",
            { autoAlpha: 0, x: -12, duration: 0.5, stagger: 0.18 },
            "-=0.2",
          )
          .from(
            ".itinerary-card .dot",
            { scale: 0, duration: 0.4, ease: "back.out(3)", stagger: 0.18 },
            "<",
          );

        /* ---------- FINAL CTA ---------- */
        const ctaTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: ".final-cta", start: "top 70%", once: true },
        });
        ctaTl
          .from(".icon-badge", {
            autoAlpha: 0,
            scale: 0.6,
            y: 20,
            duration: 0.8,
            ease: "back.out(1.6)",
          })
          .from(
            [
              ".final-cta-inner > h2",
              ".final-cta-inner > p",
              ".cta-buttons > *",
            ],
            { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.12 },
            "-=0.4",
          );

        /* ---------- 回到頂端按鈕：捲過一屏後才出現 ---------- */
        const toTop = $(".scroll-top");
        gsap.set(toTop, { autoAlpha: 0, y: 12 });
        ScrollTrigger.create({
          start: 600,
          end: "max",
          onToggle: (self) =>
            gsap.to(toTop, {
              autoAlpha: self.isActive ? 1 : 0,
              y: self.isActive ? 0 : 12,
              duration: 0.3,
              overwrite: true,
            }),
        });

        return cleanup;
      },
    );

    // 圖片載入完成後，重新計算各觸發點位置
    ScrollTrigger.refresh();
  }

  // 等字體與圖片就緒再開始，避免文字換字體或圖片晚到造成跳動；
  // 網路慢時最多等 1 秒，不讓 Hero 空白太久
  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  });
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const timeout = new Promise((resolve) => setTimeout(resolve, 1000));

  Promise.race([Promise.all([pageLoaded, fontsReady]), timeout]).then(setup);
})();
