"use client";

import Image from "next/image";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Crosshair,
  Sparkles,
} from "lucide-react";

import type { MouseEvent } from "react";

/* =========================================================
   FEATURE DATA
========================================================= */

const features = [
  {
    title: "Passionate",
    subtitle: "Developer",
    icon: Code2,
  },
  {
    title: "Problem",
    subtitle: "Solver",
    icon: Crosshair,
  },
  {
    title: "Continuous",
    subtitle: "Learner",
    icon: BrainCircuit,
  },
];

/* =========================================================
   SECTION ANIMATION
========================================================= */

const sectionContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.75,

      ease: [
        0.22,
        1,
        0.36,
        1,
      ] as const,
    },
  },
};

/* =========================================================
   ABOUT COMPONENT
========================================================= */

export default function About() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden

        bg-[#020a12]

        py-[55px]

        text-white

        sm:py-[65px]

        md:py-[75px]

        lg:py-[85px]

        xl:py-[90px]
      "
    >
      {/* =====================================================
          BACKGROUND
          EXACT SAME VISUAL FAMILY AS HERO
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* BASE */}

        <div className="absolute inset-0 bg-[#020a12]" />

        {/* HERO STYLE RIGHT GLOW */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 76% 42%, rgba(0,117,255,0.17) 0%, rgba(0,75,180,0.07) 27%, transparent 55%)",
          }}
        />

        {/* HERO STYLE LEFT GLOW */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 10% 60%, rgba(0,174,255,0.055), transparent 32%)",
          }}
        />

        {/* SAME GRID AS HERO */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.018]

            sm:opacity-[0.022]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",

            backgroundSize:
              "55px 55px",
          }}
        />

        {/* SAME AMBIENT BLUE LIGHT */}

        {!reduceMotion && (
          <motion.div
            animate={{
              opacity: [
                0.2,
                0.5,
                0.2,
              ],

              scale: [
                1,
                1.08,
                1,
              ],

              x: [
                0,
                25,
                0,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute

              right-[4%]
              top-[20%]

              h-[300px]
              w-[300px]

              rounded-full

              bg-[#0075ff]/10

              blur-[100px]

              sm:h-[420px]
              sm:w-[420px]

              sm:blur-[130px]
            "
          />
        )}
      </div>

      {/* =====================================================
          MAIN LAYOUT
      ====================================================== */}

      <motion.div
        variants={
          sectionContainer
        }
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.16,
        }}
        className="
          relative
          z-10

          mx-auto

          grid

          w-full
          max-w-[1440px]

          grid-cols-1

          items-center

          gap-14

          px-5

          sm:px-8

          md:px-10

          lg:px-12

          xl:grid-cols-[0.87fr_1.13fr]

          xl:gap-12
          xl:px-14

          2xl:px-16
        "
      >
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <motion.div
          variants={
            sectionContainer
          }
          className="
            mx-auto

            w-full

            max-w-[620px]

            xl:mx-0
            xl:max-w-[520px]
          "
        >
          {/* ABOUT LABEL */}

          <motion.div
            variants={fadeUp}
            className="
              mb-3

              flex

              items-center

              gap-2
            "
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0px rgba(0,150,255,0)",

                        "0 0 15px rgba(0,150,255,0.22)",

                        "0 0 0px rgba(0,150,255,0)",
                      ],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="
                flex

                h-[22px]
                w-[22px]

                items-center
                justify-center

                rounded-md

                border
                border-[#158bd8]/15

                bg-[#0075ff]/[0.07]
              "
            >
              <Sparkles
                size={10}
                className="text-[#31b7ff]"
              />
            </motion.div>

            <span
              className="
                text-[9px]

                font-bold

                uppercase

                tracking-[3px]

                text-[#55aee0]

                sm:text-[10px]
              "
            >
              About Me
            </span>
          </motion.div>

          {/* =================================================
              TITLE
          ================================================== */}

          <motion.h2
            variants={fadeUp}
            className="
              text-[35px]

              font-bold

              leading-[1.12]

              tracking-[-1.5px]

              text-[#f4f7fa]

              sm:text-[44px]

              md:text-[48px]

              xl:text-[44px]

              2xl:text-[48px]
            "
          >
            Turning Ideas
            <br />

            into{" "}
            <span
              className="
                relative

                inline-block

                bg-gradient-to-r

                from-[#39c3ff]

                via-[#159fff]

                to-[#0075ff]

                bg-clip-text

                text-transparent
              "
            >
              Digital Reality

              {/* TITLE LINE */}

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.5,

                  duration: 0.9,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  absolute

                  -bottom-[5px]

                  left-0

                  h-[1px]

                  w-full

                  origin-left

                  bg-gradient-to-r

                  from-[#2cbaff]

                  via-[#0075ff]

                  to-transparent
                "
              />
            </span>
          </motion.h2>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <motion.p
            variants={fadeUp}
            className="
              mt-7

              max-w-[520px]

              text-[13px]

              leading-[1.8]

              text-[#94a6b5]

              sm:text-[14px]

              md:text-[15px]

              xl:text-[14px]
            "
          >
            Full Stack Developer
            with 1+ year of
            experience building
            responsive,
            production-grade web
            applications using
            React.js, Next.js,
            JavaScript, Tailwind CSS,
            Bootstrap, Python,
            FastAPI, and MySQL.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="
              mt-[3px]

              max-w-[520px]

              text-[13px]

              leading-[1.8]

              text-[#7d909e]

              sm:text-[14px]
            "
          >
            I enjoy solving real
            problems, working on
            meaningful projects, and
            continuously learning new
            technologies.
          </motion.p>

          {/* =================================================
              BUTTON
          ================================================== */}

          <motion.div
            variants={fadeUp}
            className="mt-7"
          >
            <motion.a
              href="#experience"
              whileHover={{
                y: -3,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group

                relative

                inline-flex

                h-[46px]

                items-center
                justify-center

                gap-3

                overflow-hidden

                rounded-full

                border
                border-[#108fe8]

                bg-[#04121c]/80

                px-6

                text-[11px]

                font-semibold

                text-white

                shadow-[inset_0_0_15px_rgba(0,117,255,0.03)]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:border-[#3cbdff]

                hover:shadow-[0_0_28px_rgba(0,117,255,0.13)]

                sm:text-[12px]
              "
            >
              {/* HOVER SHINE */}

              <span
                className="
                  absolute
                  inset-0

                  -translate-x-[150%]

                  bg-gradient-to-r

                  from-transparent

                  via-[#009cff]/10

                  to-transparent

                  transition-transform

                  duration-700

                  group-hover:translate-x-[150%]
                "
              />

              <span className="relative">
                More About Me
              </span>

              <ArrowRight
                size={15}
                className="
                  relative

                  transition-transform

                  duration-300

                  group-hover:translate-x-1
                "
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* =====================================================
            RIGHT WORKSPACE
        ====================================================== */}

        <WorkspaceVisual />
      </motion.div>
    </section>
  );
}

/* =========================================================
   WORKSPACE VISUAL
========================================================= */

function WorkspaceVisual() {
  const reduceMotion =
    useReducedMotion();

  /* =======================================================
     MOUSE PARALLAX
  ======================================================== */

  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotateYValue =
    useTransform(
      x,

      [
        -0.5,
        0.5,
      ],

      [
        -2.2,
        2.2,
      ]
    );

  const rotateXValue =
    useTransform(
      y,

      [
        -0.5,
        0.5,
      ],

      [
        2.2,
        -2.2,
      ]
    );

  const rotateX =
    useSpring(
      rotateXValue,
      {
        stiffness: 100,
        damping: 24,
      }
    );

  const rotateY =
    useSpring(
      rotateYValue,
      {
        stiffness: 100,
        damping: 24,
      }
    );

  /* =======================================================
     MOUSE
  ======================================================== */

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (reduceMotion) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const mouseX =
      (event.clientX -
        rect.left) /
        rect.width -
      0.5;

    const mouseY =
      (event.clientY -
        rect.top) /
        rect.height -
      0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={fadeUp}
      className="
        relative

        mx-auto

        w-full

        max-w-[800px]

        xl:max-w-none
      "
    >
      {/* =====================================================
          DESKTOP COMPOSITION
      ====================================================== */}

      <div
        className="
          relative

          grid

          gap-4

          lg:grid-cols-[1fr_175px]

          lg:items-center

          xl:grid-cols-[1fr_180px]

          xl:gap-5
        "
      >
        {/* =================================================
            IMAGE AREA
        ================================================== */}

        <div
          className="
            relative

            xl:pl-[100px]
          "
        >
          {/* IMAGE */}

          <motion.div
            initial={{
              opacity: 0,

              x: 40,

              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,

              x: 0,

              scale: 1,
            }}
            viewport={{
              once: true,

              amount: 0.2,
            }}
            transition={{
              duration: 0.9,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            onMouseMove={
              handleMouseMove
            }
            onMouseLeave={
              reset
            }
            style={{
              rotateX:
                reduceMotion
                  ? 0
                  : rotateX,

              rotateY:
                reduceMotion
                  ? 0
                  : rotateY,

              transformPerspective:
                1200,
            }}
            className="
              group

              relative

              overflow-hidden

              rounded-[11px]

              border

              border-white/[0.07]

              bg-[#06141e]

              shadow-[0_25px_75px_rgba(0,0,0,0.45),0_0_50px_rgba(0,117,255,0.05)]

              sm:rounded-[14px]
            "
          >
            {/* TOP BLUE LINE */}

            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [
                        0.2,
                        0.75,
                        0.2,
                      ],
                    }
              }
              transition={{
                duration: 3.5,

                repeat: Infinity,
              }}
              className="
                pointer-events-none

                absolute

                left-[10%]

                right-[10%]

                top-0

                z-30

                h-[1px]

                bg-gradient-to-r

                from-transparent

                via-[#35bfff]

                to-transparent
              "
            />

            {/* IMAGE */}

            <div
              className="
                relative

                aspect-[16/10]

                w-full

                xl:aspect-[1.28/1]
              "
            >
              <Image
                src="/images/about-workspace.png"
                alt="Balaji V developer workspace"
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1280px) 70vw,
                  520px
                "
                className="
                  object-cover

                  object-center

                  transition-transform

                  duration-[1400ms]

                  ease-out

                  group-hover:scale-[1.035]
                "
              />

              {/* IMAGE OVERLAY */}

              <div
                className="
                  absolute

                  inset-0

                  bg-gradient-to-r

                  from-[#020a12]/15

                  via-transparent

                  to-[#0075ff]/[0.05]
                "
              />

              {/* LIGHT SWEEP */}

              {!reduceMotion && (
                <motion.div
                  animate={{
                    x: [
                      "-180%",

                      "300%",
                    ],
                  }}
                  transition={{
                    duration: 6,

                    repeat: Infinity,

                    repeatDelay: 4,

                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none

                    absolute

                    -top-[30%]

                    h-[170%]

                    w-[55px]

                    rotate-[18deg]

                    bg-gradient-to-r

                    from-transparent

                    via-white/[0.035]

                    to-transparent

                    blur-sm
                  "
                />
              )}
            </div>
          </motion.div>

          {/* =================================================
              FLOATING FEATURE CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,

              x: -35,
            }}
            whileInView={{
              opacity: 1,

              x: 0,
            }}
            viewport={{
              once: true,

              amount: 0.25,
            }}
            transition={{
              delay: 0.3,

              duration: 0.7,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [
                      0,
                      -5,
                      0,
                    ],
                  }
            }
            className="
              relative

              z-30

              mt-4

              grid

              gap-2

              overflow-hidden

              rounded-[13px]

              border

              border-white/[0.075]

              bg-[#07151f]/90

              p-3

              shadow-[0_20px_60px_rgba(0,0,0,0.40)]

              backdrop-blur-2xl

              sm:grid-cols-3

              xl:absolute

              xl:left-0

              xl:top-1/2

              xl:mt-0

              xl:w-[200px]

              xl:-translate-y-1/2

              xl:grid-cols-1
            "
          >
            {/* MOVING EDGE */}

            {!reduceMotion && (
              <motion.div
                animate={{
                  top: [
                    "-30%",

                    "110%",
                  ],
                }}
                transition={{
                  duration: 7,

                  repeat: Infinity,

                  ease: "linear",
                }}
                className="
                  pointer-events-none

                  absolute

                  left-0

                  h-[50px]

                  w-[1px]

                  bg-gradient-to-b

                  from-transparent

                  via-[#28b6ff]

                  to-transparent
                "
              />
            )}

            {features.map(
              (
                item,
                index
              ) => (
                <FeatureItem
                  key={item.title}
                  {...item}
                  index={index}
                />
              )
            )}
          </motion.div>
        </div>

        {/* =================================================
            QUOTE CARD
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,

            x: 35,

            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,

            x: 0,

            scale: 1,
          }}
          viewport={{
            once: true,

            amount: 0.2,
          }}
          transition={{
            delay: 0.42,

            duration: 0.75,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [
                    0,
                    5,
                    0,
                  ],
                }
          }
          className="
            relative

            overflow-hidden

            rounded-[11px]

            border

            border-[#168fdc]/20

            bg-[#06141e]/88

            px-5

            py-6

            shadow-[0_22px_60px_rgba(0,0,0,0.4)]

            backdrop-blur-xl

            sm:px-6

            lg:min-h-[230px]

            xl:min-h-[250px]
          "
        >
          {/* QUOTE GLOW */}

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [
                      0.18,

                      0.5,

                      0.18,
                    ],

                    scale: [
                      1,

                      1.15,

                      1,
                    ],
                  }
            }
            transition={{
              duration: 4,

              repeat: Infinity,

              ease: "easeInOut",
            }}
            className="
              pointer-events-none

              absolute

              -right-10

              -top-10

              h-[120px]

              w-[120px]

              rounded-full

              bg-[#0075ff]/12

              blur-[45px]
            "
          />

          {/* QUOTE ICON */}

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [
                      0,

                      -4,

                      0,
                    ],
                  }
            }
            transition={{
              duration: 3.5,

              repeat: Infinity,

              ease: "easeInOut",
            }}
            className="
              relative

              block

              font-serif

              text-[44px]

              font-bold

              leading-[0.85]

              text-[#62bff4]/75
            "
          >
            “
          </motion.span>

          {/* TEXT */}

          <p
            className="
              relative

              mt-3

              font-serif

              text-[16px]

              font-semibold

              italic

              leading-[1.55]

              text-[#dce8ef]

              xl:text-[17px]
            "
          >
            Good Ideas
            <br />

            Great
            <br />

            <span className="text-[#85cfff]">
              Execution.
            </span>
          </p>

          {/* SIGNATURE */}

          <div
            className="
              relative

              mt-5

              flex

              items-center

              justify-end

              gap-2
            "
          >
            <span
              className="
                h-[1px]

                w-7

                bg-gradient-to-r

                from-transparent

                to-[#7397aa]
              "
            />

            <span
              className="
                font-serif

                text-[12px]

                italic

                text-[#8aa8b8]
              "
            >
              Balaji V
            </span>
          </div>

          {/* BOTTOM ANIMATED LINE */}

          {!reduceMotion && (
            <motion.div
              animate={{
                width: [
                  "18%",

                  "65%",

                  "18%",
                ],
              }}
              transition={{
                duration: 4,

                repeat: Infinity,

                ease: "easeInOut",
              }}
              className="
                absolute

                bottom-0

                left-0

                h-[1px]

                bg-gradient-to-r

                from-[#0075ff]

                via-[#48c4ff]

                to-transparent
              "
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   FEATURE ITEM
========================================================= */

function FeatureItem({
  title,
  subtitle,
  icon: Icon,
  index,
}: {
  title: string;

  subtitle: string;

  icon: typeof Code2;

  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,

        x: -14,
      }}
      whileInView={{
        opacity: 1,

        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay:
          0.48 +
          index * 0.1,

        duration: 0.55,
      }}
      whileHover={{
        x: 3,
      }}
      className="
        group

        flex

        items-center

        gap-3

        rounded-[10px]

        border

        border-transparent

        p-2

        transition-all

        duration-300

        hover:border-[#158ee3]/15

        hover:bg-[#0075ff]/[0.045]

        xl:p-2.5
      "
    >
      {/* ICON */}

      <motion.div
        whileHover={{
          scale: 1.08,

          rotate: 3,
        }}
        className="
          flex

          h-[39px]

          w-[39px]

          shrink-0

          items-center

          justify-center

          rounded-[9px]

          border

          border-[#168ddd]/15

          bg-[#0b2130]

          text-[#36b9ff]

          shadow-[0_8px_20px_rgba(0,0,0,0.2)]

          transition-all

          duration-300

          group-hover:border-[#2bb6ff]/25

          group-hover:bg-[#0075ff]/10
        "
      >
        <Icon size={17} />
      </motion.div>

      {/* TEXT */}

      <div>
        <p
          className="
            text-[10px]

            font-medium

            leading-[1.35]

            text-[#dfe8ee]

            sm:text-[11px]
          "
        >
          {title}
        </p>

        <p
          className="
            text-[10px]

            font-medium

            leading-[1.35]

            text-[#b3c2cb]

            sm:text-[11px]
          "
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}