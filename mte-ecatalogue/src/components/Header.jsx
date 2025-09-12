import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const Header = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#000',
  changeMenuColorOnOpen = true,
  accentColor = '#5227FF',
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;
      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;
      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;
    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity']: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );
    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity']: 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }
    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' })
          },
          socialsStart + 0.04
        );
      }
    }
    openTlRef.current = tl;
    return tl;
  }, []);
  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);
  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity']: 0 });
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);
  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;
    spinTweenRef.current?.kill();
    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);
  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );
  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);
  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      playOpen();
    } else {
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText]);

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    console.log(`Scrolling to ${link}`);
    gsap.to(window, {
      duration: 1.5,
      scrollTo: link,
      ease: 'power2.inOut'
    });
    if (openRef.current) {
      toggleMenu();
    }
  };

  return (
    <div className="sm-scope fixed top-0 left-0 w-full h-auto z-50">
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full'}
        style={accentColor ? { ['--sm-accent']: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers fixed top-0 right-0 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header relative w-full flex items-center justify-between p-[2em] bg-transparent z-20"
          aria-label="Main navigation header"
            style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        >
          <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">
            <img
              src={logoUrl}
              alt="Logo"
              className="sm-logo-img block h-10 w-auto object-contain"
              draggable={false}
              width={110}
              height={24}
            />
          </div>

          <button
            ref={toggleBtnRef}
            className="sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer text-[#e9e9ef] font-medium leading-none overflow-visible pointer-events-auto"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              ref={textWrapRef}
              className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]"
              aria-hidden="true"
            >
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line block h-[1em] leading-none" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
              <span
                ref={plusVRef}
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel fixed top-0 right-0 h-full bg-white flex flex-col p-[8em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px]"
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                    <a
                      className="sm-panel-item relative text-black font-semibold cursor-pointer uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline"
                      href={it.link}
                      onClick={(e) => handleLinkClick(e, it.link)}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span className="sm-panel-item relative text-black font-semibold cursor-pointer uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>
            
          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope .staggered-menu-wrapper { 
            position: relative; 
            width: 100%; 
            height: 100%; 
            pointer-events: none; /* Biarkan wrapper transparan terhadap klik */
        }
        .sm-scope .staggered-menu-header > * { 
            pointer-events: auto; /* Aktifkan klik hanya untuk logo dan tombol */
        }
        .sm-scope .sm-logo-img { 
            display: block; 
            width: auto; 
            object-fit: contain; 
        }
        .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { 
            filter: invert(1); 
        }
        .sm-scope .sm-toggle { 
            position: relative; 
            display: inline-flex; 
            align-items: center; 
            gap: 0.5rem; 
            background: transparent; 
            border: none; 
            cursor: pointer; 
            color: #e9e9ef; 
            font-weight: 500; 
            line-height: 1; 
        }
        .sm-scope .sm-toggle-textWrap { 
            position: relative; 
            display: inline-block; 
            height: 1em; 
            overflow: hidden; 
        }
        .sm-scope .sm-toggle-textInner { 
            display: flex; 
            flex-direction: column; 
            line-height: 1; 
        }
        .sm-scope .sm-toggle-line { 
            display: block; 
            height: 1em; 
            line-height: 1; 
        }
        .sm-scope .sm-icon { 
            position: relative; 
            width: 14px; 
            height: 14px; 
            flex-shrink: 0; 
        }
        .sm-scope .sm-panel-itemWrap { 
            overflow: hidden; 
        }
        .sm-scope .sm-icon-line { 
            position: absolute; 
            left: 50%; 
            top: 50%; 
            width: 100%; 
            height: 2px; 
            background: currentColor; 
            border-radius: 2px; 
            transform: translate(-50%, -50%); 
        }
        /* Panel Menu Utama */
        .sm-scope .staggered-menu-panel { 
            width: clamp(300px, 40vw, 420px); 
            pointer-events: auto; /* Pastikan panel bisa di-klik */
        }
        .sm-scope .sm-prelayers { 
            width: clamp(300px, 40vw, 420px); 
            z-index: 5; 
        }
        .sm-scope .sm-panel-inner { 
            flex: 1; 
            display: flex; 
            flex-direction: column; 
        }
        /* Tampilan Rata Kiri & Rapi untuk Item Menu */
        .sm-scope .sm-panel-list { 
            list-style: none; 
            margin: 0; 
            padding: 0; 
            display: flex; 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 1.5rem; 
        }
        .sm-scope .sm-panel-item { 
            display: flex; 
            justify-content: space-between; 
            align-items: baseline; 
            width: 100%; 
            color: #000; 
            font-weight: 600; 
            font-size: 2.5rem; 
            line-height: 1.1; 
            text-transform: uppercase; 
            text-decoration: none; 
            transition: color 0.25s;
        }
        .sm-scope .sm-panel-item:hover { 
            color: var(--sm-accent, #ff0000); 
        }
        .sm-scope .sm-panel-itemLabel { 
            display: inline-block; 
        }
        /* Styling untuk Nomor */
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { 
            content: '0' counter(smItem); 
            counter-increment: smItem; 
            font-size: 1rem; 
            font-weight: 400; 
            color: var(--sm-accent, #ff0000); 
            opacity: var(--sm-num-opacity, 0); 
            margin-left: 1rem; /* Beri jarak antara teks dan nomor */
        }
        /* Responsif untuk Mobile */
        @media (max-width: 1024px) { 
            .sm-scope .staggered-menu-panel, 
            .sm-scope .sm-prelayers { 
            width: 100%; 
            left: 0; 
            right: 0; 
            } 
        }
        `}</style>
    </div>
  );
};

export default Header;