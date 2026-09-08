"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Download,
  Menu,
  X,
} from "lucide-react";

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  {
    label: "Home",
    href: "#home",
    id: "home",
  },

  {
    label: "About",
    href: "#about",
    id: "about",
  },

  {
    label: "Skills",
    href: "#skills",
    id: "skills",
  },

  {
    label: "Experience",
    href: "#experience",
    id: "experience",
  },

  {
    label: "Projects",
    href: "#projects",
    id: "projects",
  },

  {
    label: "Contact",
    href: "#contact",
    id: "contact",
  },
];

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    active,
    setActive,
  ] = useState("Home");

  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const mobileMenuRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const menuButtonRef =
    useRef<HTMLButtonElement | null>(
      null
    );

  /* =======================================================
     AUTO ACTIVE SECTION DETECTION
  ======================================================== */

  useEffect(() => {
    let ticking = false;

    const detectActiveSection =
      () => {
        /* ===============================================
           HEADER BACKGROUND
        =============================================== */

        setScrolled(
          window.scrollY > 20
        );

        /* ===============================================
           PAGE BOTTOM

           Ensures Contact becomes active when user
           reaches bottom of page.
        =============================================== */

        const scrollBottom =
          window.innerHeight +
          window.scrollY;

        const documentHeight =
          document.documentElement
            .scrollHeight;

        if (
          scrollBottom >=
          documentHeight - 80
        ) {
          setActive("Contact");

          ticking = false;

          return;
        }

        /* ===============================================
           DETECTION LINE

           We detect which section is passing roughly
           32% down the viewport.

           This feels much better than using section top.
        =============================================== */

        const detectionPoint =
          window.innerHeight *
          0.32;

        let currentSection =
          "Home";

        let smallestDistance =
          Number.POSITIVE_INFINITY;

        navItems.forEach(
          (item) => {
            const element =
              document.getElementById(
                item.id
              );

            if (!element) {
              return;
            }

            const rect =
              element.getBoundingClientRect();

            /* ===========================================
               SECTION CURRENTLY CROSSES DETECTION POINT
            ============================================ */

            if (
              rect.top <=
                detectionPoint &&
              rect.bottom >
                detectionPoint
            ) {
              currentSection =
                item.label;

              smallestDistance = 0;

              return;
            }

            /* ===========================================
               FALLBACK:
               closest section to detection point
            ============================================ */

            const distance =
              Math.abs(
                rect.top -
                  detectionPoint
              );

            if (
              distance <
              smallestDistance
            ) {
              smallestDistance =
                distance;

              currentSection =
                item.label;
            }
          }
        );

        setActive(
          currentSection
        );

        ticking = false;
      };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(
        detectActiveSection
      );
    };

    detectActiveSection();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     MOBILE BODY SCROLL LOCK
  ======================================================== */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);

  /* =======================================================
     CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP
  ======================================================== */

  useEffect(() => {
    const handleResize =
      () => {
        if (
          window.innerWidth >=
          1024
        ) {
          setMenuOpen(false);
        }
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =======================================================
     ESCAPE + OUTSIDE CLICK
  ======================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (!menuOpen) {
        return;
      }

      const target =
        event.target as Node;

      const clickedMenu =
        mobileMenuRef.current?.contains(
          target
        );

      const clickedButton =
        menuButtonRef.current?.contains(
          target
        );

      if (
        !clickedMenu &&
        !clickedButton
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [menuOpen]);

  /* =======================================================
     NAVIGATION CLICK
  ======================================================== */

  const handleNavClick = (
    event:
      React.MouseEvent<
        HTMLAnchorElement
      >,

    item:
      (typeof navItems)[number]
  ) => {
    event.preventDefault();

    const section =
      document.getElementById(
        item.id
      );

    if (!section) {
      return;
    }

    setActive(
      item.label
    );

    setMenuOpen(false);

    /* ===============================================
       HEADER HEIGHT OFFSET
    =============================================== */

    const headerHeight =
      76;

    const sectionTop =
      section.getBoundingClientRect()
        .top +
      window.scrollY;

    const targetPosition =
      sectionTop -
      headerHeight;

    window.scrollTo({
      top: Math.max(
        targetPosition,
        0
      ),

      behavior: "smooth",
    });

    /* ===============================================
       UPDATE HASH WITHOUT JUMP
    =============================================== */

    window.history.replaceState(
      null,
      "",
      item.href
    );
  };

  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={`
        fixed

        left-0
        top-0

        z-50

        w-full

        transition-all

        duration-500

        ${
          scrolled
            ? `
              border-b
              border-white/[0.06]

              bg-[#030b13]/85

              shadow-[0_15px_45px_rgba(0,0,0,0.28)]

              backdrop-blur-xl
            `
            : `
              bg-transparent
            `
        }
      `}
    >
      {/* =====================================================
          DESKTOP HEADER
      ====================================================== */}

      <div
        className="
          mx-auto

          flex

          h-[76px]

          w-full
          max-w-[1440px]

          items-center

          justify-between

          px-5

          sm:px-8

          lg:px-12

          xl:px-16
        "
      >
        {/* =================================================
            LOGO
        ================================================== */}

        <a
          href="#home"
          onClick={(
            event
          ) =>
            handleNavClick(
              event,
              navItems[0]
            )
          }
          className="
            group

            relative

            flex

            shrink-0

            items-center

            text-[22px]

            font-bold

            tracking-[1.5px]

            text-white
          "
        >
          {/* LOGO GLOW */}

          <span
            className="
              pointer-events-none

              absolute

              left-1/2
              top-1/2

              h-[40px]
              w-[100px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-[#0075ff]/0

              blur-[25px]

              transition-all

              duration-500

              group-hover:bg-[#0075ff]/15
            "
          />

          <span
            className="
              relative

              transition-colors

              duration-300

              group-hover:text-[#44b5ff]
            "
          >
            BALAJI
          </span>

          <span
            className="
              relative

              ml-[5px]

              bg-gradient-to-b

              from-[#40c8ff]

              to-[#0075ff]

              bg-clip-text

              text-transparent
            "
          >
            V
          </span>
        </a>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav
          className="
            hidden

            items-center

            gap-7

            lg:flex

            xl:gap-9
          "
        >
          {navItems.map(
            (item) => {
              const isActive =
                active ===
                item.label;

              return (
                <a
                  key={
                    item.id
                  }
                  href={
                    item.href
                  }
                  onClick={(
                    event
                  ) =>
                    handleNavClick(
                      event,
                      item
                    )
                  }
                  className={`
                    group

                    relative

                    flex

                    h-[76px]

                    items-center

                    text-[13px]

                    font-medium

                    transition-colors

                    duration-300

                    ${
                      isActive
                        ? "text-white"
                        : "text-[#9baebe] hover:text-white"
                    }
                  `}
                >
                  {/* TEXT */}

                  <span
                    className="
                      relative
                      z-10
                    "
                  >
                    {
                      item.label
                    }
                  </span>

                  {/* =========================================
                      ACTIVE UNDERLINE

                      layoutId gives smooth movement between
                      menu items.
                  ========================================== */}

                  {isActive && (
                    <motion.span
                      layoutId="desktop-active-line"
                      transition={{
                        type:
                          "spring",

                        stiffness:
                          430,

                        damping:
                          34,
                      }}
                      className="
                        absolute

                        bottom-[15px]

                        left-1/2

                        h-[2px]

                        w-[calc(100%+16px)]

                        -translate-x-1/2

                        rounded-full

                        bg-gradient-to-r

                        from-[#25c0ff]

                        to-[#0075ff]

                        shadow-[0_0_12px_rgba(0,157,255,0.75)]
                      "
                    />
                  )}

                  {/* =========================================
                      ACTIVE DOT
                  ========================================== */}

                  {isActive && (
                    <motion.span
                      layoutId="desktop-active-dot"
                      transition={{
                        type:
                          "spring",

                        stiffness:
                          430,

                        damping:
                          34,
                      }}
                      className="
                        absolute

                        bottom-[12px]

                        left-1/2

                        h-[6px]
                        w-[6px]

                        -translate-x-1/2

                        rounded-full

                        border

                        border-[#9de5ff]

                        bg-[#25baff]

                        shadow-[0_0_12px_#00a6ff]
                      "
                    />
                  )}

                  {/* HOVER LINE */}

                  {!isActive && (
                    <span
                      className="
                        absolute

                        bottom-[15px]

                        left-1/2

                        h-[1px]

                        w-0

                        -translate-x-1/2

                        rounded-full

                        bg-[#30aaff]

                        opacity-0

                        transition-all

                        duration-300

                        group-hover:w-[65%]

                        group-hover:opacity-70
                      "
                    />
                  )}
                </a>
              );
            }
          )}
        </nav>

        {/* =================================================
            RESUME DESKTOP
        ================================================== */}

        <motion.a
          href="/resume/Balaji-V-Resume.pdf"
          download
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            group

            relative

            hidden

            h-[42px]

            cursor-pointer

            items-center

            justify-center

            gap-2

            overflow-hidden

            rounded-full

            border

            border-[#087bd7]

            px-6

            text-[13px]

            font-medium

            text-[#e6f3ff]

            shadow-[inset_0_0_14px_rgba(0,117,255,0.08),0_0_15px_rgba(0,117,255,0.1)]

            transition-all

            duration-300

            hover:border-[#38b7ff]

            hover:shadow-[0_0_25px_rgba(0,136,255,0.25)]

            lg:flex
          "
        >
          {/* HOVER FILL */}

          <span
            className="
              absolute

              inset-0

              origin-left

              scale-x-0

              bg-gradient-to-r

              from-[#10a9ff]/20

              to-[#0075ff]/20

              transition-transform

              duration-500

              group-hover:scale-x-100
            "
          />

          <Download
            size={16}
            className="
              relative
              z-10

              transition-transform

              duration-300

              group-hover:translate-y-[2px]
            "
          />

          <span
            className="
              relative
              z-10
            "
          >
            Download Resume
          </span>
        </motion.a>

        {/* =================================================
            MOBILE BUTTON
        ================================================== */}

        <motion.button
          ref={
            menuButtonRef
          }
          type="button"
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={
            menuOpen
          }
          onClick={() =>
            setMenuOpen(
              (current) =>
                !current
            )
          }
          whileTap={{
            scale: 0.92,
          }}
          className="
            relative

            flex

            h-10
            w-10

            cursor-pointer

            items-center

            justify-center

            overflow-hidden

            rounded-xl

            border

            border-white/10

            bg-white/[0.04]

            text-white

            transition-all

            duration-300

            hover:border-[#168fdc]/40

            hover:bg-[#0075ff]/10

            lg:hidden
          "
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <X
                  size={21}
                />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <Menu
                  size={22}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* =================================================
                BACKDROP
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                fixed

                inset-x-0
                bottom-0
                top-[76px]

                -z-10

                bg-black/35

                backdrop-blur-[2px]

                lg:hidden
              "
            />

            {/* =================================================
                MENU
            ================================================== */}

            <motion.div
              ref={
                mobileMenuRef
              }
              initial={{
                opacity: 0,
                y: -18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -18,
              }}
              transition={{
                duration: 0.32,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                absolute

                left-0
                top-full

                w-full

                border-t

                border-white/[0.06]

                bg-[#030b13]/[0.98]

                shadow-[0_30px_70px_rgba(0,0,0,0.45)]

                backdrop-blur-2xl

                lg:hidden
              "
            >
              <nav
                className="
                  mx-auto

                  flex

                  max-w-[1440px]

                  flex-col

                  px-5

                  pb-6
                  pt-3

                  sm:px-8
                "
              >
                {navItems.map(
                  (
                    item,
                    index
                  ) => {
                    const isActive =
                      active ===
                      item.label;

                    return (
                      <motion.a
                        key={
                          item.id
                        }
                        href={
                          item.href
                        }
                        initial={{
                          opacity: 0,
                          x: -18,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            index *
                            0.045,

                          duration:
                            0.3,
                        }}
                        onClick={(
                          event
                        ) =>
                          handleNavClick(
                            event,
                            item
                          )
                        }
                        className={`
                          group

                          relative

                          flex

                          min-h-[54px]

                          items-center

                          border-b

                          border-white/[0.05]

                          pl-4

                          text-[14px]

                          font-medium

                          transition-all

                          duration-300

                          ${
                            isActive
                              ? `
                                text-[#41bdff]
                              `
                              : `
                                text-[#c5d2dd]

                                hover:pl-5

                                hover:text-white
                              `
                          }
                        `}
                      >
                        {/* ACTIVE BAR */}

                        {isActive && (
                          <motion.span
                            layoutId="mobile-active-bar"
                            className="
                              absolute

                              bottom-[12px]
                              left-0
                              top-[12px]

                              w-[2px]

                              rounded-full

                              bg-gradient-to-b

                              from-[#4dd0ff]

                              to-[#0075ff]

                              shadow-[0_0_10px_rgba(0,157,255,0.8)]
                            "
                          />
                        )}

                        {/* ACTIVE DOT */}

                        {isActive && (
                          <span
                            className="
                              mr-3

                              h-[5px]
                              w-[5px]

                              rounded-full

                              bg-[#2bbaff]

                              shadow-[0_0_9px_#00a6ff]
                            "
                          />
                        )}

                        {
                          item.label
                        }

                        {/* RIGHT NUMBER */}

                        <span
                          className="
                            ml-auto

                            text-[8px]

                            tracking-[1px]

                            text-[#36566b]
                          "
                        >
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </motion.a>
                    );
                  }
                )}

                {/* ===========================================
                    MOBILE RESUME
                ============================================ */}

                <motion.a
                  href="/resume/Balaji-V-Resume.pdf"
                  download
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    group

                    relative

                    mt-5

                    flex

                    h-[48px]

                    cursor-pointer

                    items-center

                    justify-center

                    gap-2

                    overflow-hidden

                    rounded-full

                    border

                    border-[#158ae2]

                    bg-[#0075ff]/10

                    text-[13px]

                    font-medium

                    text-white

                    shadow-[0_8px_25px_rgba(0,117,255,0.12)]
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0

                      origin-left

                      scale-x-0

                      bg-gradient-to-r

                      from-[#1db5ff]

                      to-[#0075ff]

                      transition-transform

                      duration-500

                      group-hover:scale-x-100
                    "
                  />

                  <Download
                    size={17}

                    className="
                      relative
                      z-10
                    "
                  />

                  <span
                    className="
                      relative
                      z-10
                    "
                  >
                    Download Resume
                  </span>
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}