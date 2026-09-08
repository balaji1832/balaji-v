"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type CSSProperties,
  type MouseEvent,
} from "react";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

import {
  Boxes,
  Shuffle,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaWordpress,
} from "react-icons/fa";

import {
  SiBootstrap,
  SiFastapi,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";

/* =========================================================
   TYPES
========================================================= */

type Category =
  | "All"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools"
  | "Others";

type SkillIcon = ComponentType<{
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

type Skill = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  icon: SkillIcon;
  accent: string;
  description: string;
};

/* =========================================================
   CATEGORIES
========================================================= */

const categories: Category[] = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Others",
];

/* =========================================================
   SKILLS
========================================================= */

const skills: Skill[] = [
  {
    id: 1,
    name: "React.js",
    category: "Frontend",
    icon: SiReact,
    accent: "#61DAFB",
    description: "Interactive user interfaces",
  },

  {
    id: 2,
    name: "Next.js",
    category: "Frontend",
    icon: SiNextdotjs,
    accent: "#FFFFFF",
    description: "Production React applications",
  },

  {
    id: 3,
    name: "JavaScript",
    category: "Frontend",
    icon: SiJavascript,
    accent: "#F7DF1E",
    description: "Modern web development",
  },

  {
    id: 4,
    name: "HTML5",
    category: "Frontend",
    icon: SiHtml5,
    accent: "#E34F26",
    description: "Semantic web structure",
  },

  {
    id: 5,
    name: "CSS3",
    category: "Frontend",
    icon: FaCss3Alt,
    accent: "#1572B6",
    description: "Modern responsive styling",
  },

  {
    id: 6,
    name: "Tailwind CSS",
    category: "Frontend",
    icon: SiTailwindcss,
    accent: "#06B6D4",
    description: "Utility-first CSS",
  },

  {
    id: 7,
    name: "Bootstrap",
    category: "Frontend",
    icon: SiBootstrap,
    accent: "#7952B3",
    description: "Responsive UI framework",
  },

  {
    id: 8,
    name: "Python",
    category: "Backend",
    icon: SiPython,
    accent: "#FFD43B",
    description: "Backend development",
  },

  {
    id: 9,
    name: "FastAPI",
    category: "Backend",
    icon: SiFastapi,
    accent: "#00BFA6",
    description: "High-performance APIs",
  },

  {
    id: 10,
    name: "MySQL",
    category: "Database",
    icon: SiMysql,
    accent: "#4D9BC7",
    description: "Relational databases",
  },

  {
    id: 11,
    name: "GSAP",
    category: "Others",
    icon: WandSparkles,
    accent: "#88CE02",
    description: "Advanced web animations",
  },

  {
    id: 12,
    name: "Git",
    category: "Tools",
    icon: FaGitAlt,
    accent: "#F05032",
    description: "Version control",
  },

  {
    id: 13,
    name: "GitHub",
    category: "Tools",
    icon: FaGithub,
    accent: "#FFFFFF",
    description: "Code collaboration",
  },

  {
    id: 14,
    name: "WordPress",
    category: "Others",
    icon: FaWordpress,
    accent: "#28A8E0",
    description: "Content management",
  },

  {
    id: 15,
    name: "Vercel",
    category: "Tools",
    icon: SiVercel,
    accent: "#FFFFFF",
    description: "Production deployment",
  },

  {
    id: 16,
    name: "VS Code",
    category: "Tools",
    icon: VscCode,
    accent: "#23A8F2",
    description: "Development environment",
  },
];

/* =========================================================
   ENTRANCE VARIANTS
========================================================= */

const sectionContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,

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
   SHUFFLE HELPER
========================================================= */

function shuffleArray<T>(
  input: T[]
): T[] {
  const array = [
    ...input,
  ];

  for (
    let i =
      array.length - 1;
    i > 0;
    i--
  ) {
    const random =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      array[i],
      array[random],
    ] = [
      array[random],
      array[i],
    ];
  }

  return array;
}

/* =========================================================
   SKILLS SECTION
========================================================= */

export default function Skills() {
  const reduceMotion =
    useReducedMotion();

  const [
    activeCategory,
    setActiveCategory,
  ] =
    useState<Category>(
      "All"
    );

  const [
    orderedSkills,
    setOrderedSkills,
  ] =
    useState<Skill[]>(
      skills
    );

  const [
    shuffleTick,
    setShuffleTick,
  ] =
    useState(0);

  const [
    autoShuffle,
    setAutoShuffle,
  ] =
    useState(true);

  /* =======================================================
     FILTER
  ======================================================== */

  const filteredSkills =
    useMemo(() => {
      if (
        activeCategory ===
        "All"
      ) {
        return orderedSkills;
      }

      return orderedSkills.filter(
        (skill) =>
          skill.category ===
          activeCategory
      );
    }, [
      orderedSkills,
      activeCategory,
    ]);

  /* =======================================================
     AUTO CUBE SHUFFLE
  ======================================================== */

  useEffect(() => {
    if (
      reduceMotion ||
      !autoShuffle
    ) {
      return;
    }

    const timer =
      window.setInterval(
        () => {
          setOrderedSkills(
            (previous) =>
              shuffleArray(
                previous
              )
          );

          setShuffleTick(
            (current) =>
              current + 1
          );
        },
        5200
      );

    return () =>
      window.clearInterval(
        timer
      );
  }, [
    reduceMotion,
    autoShuffle,
  ]);

  /* =======================================================
     MANUAL SHUFFLE
  ======================================================== */

  const shuffleNow = () => {
    setOrderedSkills(
      (previous) =>
        shuffleArray(
          previous
        )
    );

    setShuffleTick(
      (current) =>
        current + 1
    );
  };

  return (
    <section
      id="skills"
      className="
        relative
        overflow-hidden

        bg-[#020a12]

        py-[65px]

        text-white

        sm:py-[75px]

        md:py-[85px]

        lg:py-[95px]
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <SkillsBackground
        reduceMotion={
          Boolean(
            reduceMotion
          )
        }
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <motion.div
        variants={
          sectionContainer
        }
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.08,
        }}
        className="
          relative

          z-10

          mx-auto

          w-full

          max-w-[1440px]

          px-5

          sm:px-8

          md:px-10

          lg:px-12

          xl:px-14

          2xl:px-16
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className="
            grid

            gap-7

            lg:grid-cols-[1fr_430px]

            lg:items-end

            lg:gap-16
          "
        >
          {/* LEFT */}

          <motion.div
            variants={reveal}
          >
            <div
              className="
                mb-3

                flex

                items-center

                gap-2.5
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotateY:
                          [
                            0,
                            180,
                            360,
                          ],
                      }
                }
                transition={{
                  duration: 6,

                  repeat:
                    Infinity,

                  ease: "linear",
                }}
                style={{
                  transformStyle:
                    "preserve-3d",
                }}
                className="
                  flex

                  h-[25px]

                  w-[25px]

                  items-center

                  justify-center

                  rounded-[7px]

                  border

                  border-[#188bd8]/20

                  bg-[#0075ff]/[0.07]

                  shadow-[0_0_18px_rgba(0,117,255,0.08)]
                "
              >
                <Boxes
                  size={12}
                  className="text-[#3abaff]"
                />
              </motion.div>

              <span
                className="
                  text-[9px]

                  font-bold

                  uppercase

                  tracking-[3px]

                  text-[#58afe0]

                  sm:text-[10px]
                "
              >
                My Skills
              </span>
            </div>

            <h2
              className="
                text-[31px]

                font-bold

                leading-[1.13]

                tracking-[-1.3px]

                text-[#f5f8fa]

                sm:text-[39px]

                md:text-[44px]

                lg:text-[46px]
              "
            >
              Technologies I{" "}
              <span
                className="
                  relative

                  inline-block
                "
              >
                Work With

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
                    delay: 0.45,

                    duration:
                      0.9,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    absolute

                    -bottom-[8px]

                    left-0

                    h-[1px]

                    w-full

                    origin-left

                    bg-gradient-to-r

                    from-[#36bdff]

                    via-[#0075ff]

                    to-transparent
                  "
                />
              </span>
            </h2>
          </motion.div>

          {/* DESCRIPTION */}

          <motion.div
            variants={reveal}
            className="
              relative

              border-l

              border-[#1687cf]/15

              pl-5

              lg:mb-1

              lg:pl-7
            "
          >
            {!reduceMotion && (
              <motion.span
                animate={{
                  y: [
                    0,
                    37,
                    0,
                  ],

                  opacity: [
                    0.4,
                    1,
                    0.4,
                  ],
                }}
                transition={{
                  duration: 4,

                  repeat:
                    Infinity,

                  ease:
                    "easeInOut",
                }}
                className="
                  absolute

                  -left-[1px]

                  top-0

                  h-[28px]

                  w-[1px]

                  bg-gradient-to-b

                  from-[#39bfff]

                  to-transparent
                "
              />
            )}

            <p
              className="
                max-w-[410px]

                text-[12px]

                leading-[1.8]

                text-[#899dac]

                sm:text-[13px]

                md:text-[14px]
              "
            >
              A modern toolkit for
              building responsive
              interfaces, scalable
              backend systems and
              production-ready
              digital experiences.
            </p>
          </motion.div>
        </div>

        {/* =================================================
            CONTROLS
        ================================================== */}

        <motion.div
          variants={reveal}
          className="
            mt-9

            flex

            flex-col

            gap-4

            lg:flex-row

            lg:items-center

            lg:justify-between
          "
        >
          {/* FILTERS */}

          <div
            className="
              relative

              min-w-0
            "
          >
            <div
              className="
                pointer-events-none

                absolute

                right-0

                top-0

                z-20

                h-full

                w-10

                bg-gradient-to-l

                from-[#020a12]

                to-transparent

                md:hidden
              "
            />

            <div
              className="
                flex

                gap-2

                overflow-x-auto

                pb-2

                [scrollbar-width:none]

                [&::-webkit-scrollbar]:hidden

                md:flex-wrap

                md:overflow-visible

                md:pb-0
              "
            >
              {categories.map(
                (category) => {
                  const active =
                    activeCategory ===
                    category;

                  return (
                    <motion.button
                      key={
                        category
                      }
                      type="button"
                      onClick={() =>
                        setActiveCategory(
                          category
                        )
                      }
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -2,
                            }
                      }
                      whileTap={{
                        scale:
                          0.96,
                      }}
                      className={`
                        relative

                        flex

                        h-[40px]

                        shrink-0

                        items-center

                        justify-center

                        overflow-hidden

                        rounded-full

                        border

                        px-5

                        text-[10px]

                        font-medium

                        transition-colors

                        duration-300

                        sm:h-[42px]

                        sm:min-w-[108px]

                        sm:text-[11px]

                        ${
                          active
                            ? `
                              border-[#42c3ff]/45

                              text-white

                              shadow-[0_0_25px_rgba(0,117,255,0.14)]
                            `
                            : `
                              border-[#17384b]/70

                              bg-[#06141e]/45

                              text-[#879cab]

                              hover:border-[#168dd5]/45

                              hover:text-white
                            `
                        }
                      `}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-skill-filter"
                          transition={{
                            type:
                              "spring",

                            stiffness:
                              260,

                            damping:
                              25,
                          }}
                          className="
                            absolute

                            inset-0

                            rounded-full

                            bg-gradient-to-r

                            from-[#2eb9ff]

                            via-[#129fff]

                            to-[#0075ff]
                          "
                        />
                      )}

                      {active &&
                        !reduceMotion && (
                          <motion.span
                            animate={{
                              x: [
                                "-160%",

                                "190%",
                              ],
                            }}
                            transition={{
                              duration:
                                2.7,

                              repeat:
                                Infinity,

                              repeatDelay:
                                1.3,
                            }}
                            className="
                              absolute

                              h-[140%]

                              w-[25px]

                              rotate-[18deg]

                              bg-white/[0.12]

                              blur-[6px]
                            "
                          />
                        )}

                      <span className="relative z-10">
                        {
                          category
                        }
                      </span>
                    </motion.button>
                  );
                }
              )}
            </div>
          </div>

          {/* SHUFFLE CONTROLS */}

          <div
            className="
              flex

              items-center

              gap-2
            "
          >
            <motion.button
              type="button"
              onClick={
                shuffleNow
              }
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                group

                flex

                h-[40px]

                items-center

                gap-2

                rounded-full

                border

                border-[#178bd6]/20

                bg-[#061620]/70

                px-4

                text-[9px]

                font-semibold

                text-[#86a7ba]

                backdrop-blur-xl

                transition-all

                hover:border-[#29b4ff]/40

                hover:text-white

                sm:h-[42px]

                sm:text-[10px]
              "
            >
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate:
                          shuffleTick *
                          180,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 16,
                }}
              >
                <Shuffle
                  size={14}
                />
              </motion.span>

              Shuffle
            </motion.button>

            <button
              type="button"
              onClick={() =>
                setAutoShuffle(
                  (current) =>
                    !current
                )
              }
              className="
                flex

                h-[40px]

                items-center

                gap-2

                rounded-full

                border

                border-[#17384b]/70

                bg-[#06141e]/55

                px-3

                text-[8px]

                font-medium

                text-[#687f8e]

                transition-colors

                hover:text-white

                sm:h-[42px]

                sm:px-4

                sm:text-[9px]
              "
            >
              <span
                className={`
                  h-[7px]

                  w-[7px]

                  rounded-full

                  ${
                    autoShuffle
                      ? `
                        bg-[#00dcae]

                        shadow-[0_0_10px_#00dcae]
                      `
                      : `
                        bg-[#435663]
                      `
                  }
                `}
              />

              Auto
            </button>
          </div>
        </motion.div>

        {/* =================================================
            CUBE GRID
        ================================================== */}

        <LayoutGroup>
          <motion.div
            layout
            className="
              mt-6

              grid

              grid-cols-2

              gap-3

              sm:grid-cols-3

              sm:gap-4

              md:grid-cols-4

              lg:grid-cols-5

              xl:grid-cols-6
            "
          >
            <AnimatePresence
              mode="popLayout"
            >
              {filteredSkills.map(
                (
                  skill,
                  index
                ) => (
                  <CubeSkillCard
                    key={
                      skill.id
                    }
                    skill={
                      skill
                    }
                    index={
                      index
                    }
                    shuffleTick={
                      shuffleTick
                    }
                    reduceMotion={
                      Boolean(
                        reduceMotion
                      )
                    }
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* =================================================
            FOOTER
        ================================================== */}

        <motion.div
          variants={reveal}
          className="
            mt-10

            flex

            items-center

            justify-center

            gap-3
          "
        >
          <span
            className="
              h-[1px]

              w-7

              bg-gradient-to-r

              from-transparent

              to-[#17465f]

              sm:w-12
            "
          />

          <div
            className="
              flex

              items-center

              gap-2
            "
          >
            <Sparkles
              size={10}
              className="text-[#327da5]"
            />

            <span
              className="
                text-center

                text-[7px]

                font-semibold

                uppercase

                tracking-[1.7px]

                text-[#406278]

                sm:text-[8px]

                sm:tracking-[2px]
              "
            >
              Learn • Build •
              Shuffle • Improve
            </span>
          </div>

          <span
            className="
              h-[1px]

              w-7

              bg-gradient-to-l

              from-transparent

              to-[#17465f]

              sm:w-12
            "
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   CUBE SKILL CARD
========================================================= */

function CubeSkillCard({
  skill,
  index,
  shuffleTick,
  reduceMotion,
}: {
  skill: Skill;
  index: number;
  shuffleTick: number;
  reduceMotion: boolean;
}) {
  const Icon =
    skill.icon;

  /* =======================================================
     MOUSE SPOTLIGHT
  ======================================================== */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const spotlight =
    useMotionTemplate`
      radial-gradient(
        180px circle at ${mouseX}px ${mouseY}px,
        ${skill.accent}1C,
        transparent 70%
      )
    `;

  const handleMouseMove = (
    event: MouseEvent<HTMLElement>
  ) => {
    if (reduceMotion) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      event.clientX -
        rect.left
    );

    mouseY.set(
      event.clientY -
        rect.top
    );
  };

  return (
    <motion.article
      layout="position"
      onMouseMove={
        handleMouseMove
      }
      initial={{
        opacity: 0,
        scale: 0.82,
        rotateX: -16,
        rotateY: 16,
        y: 25,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,

        rotateX:
          reduceMotion
            ? 0
            : [
                0,

                shuffleTick %
                    2 ===
                  0
                  ? 7
                  : -7,

                0,
              ],

        rotateY:
          reduceMotion
            ? 0
            : [
                0,

                shuffleTick %
                    2 ===
                  0
                  ? -11
                  : 11,

                0,
              ],
      }}
      exit={{
        opacity: 0,
        scale: 0.86,
        rotateY: 25,
        y: 15,
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 135,
          damping: 19,
          mass: 0.8,
        },

        opacity: {
          duration: 0.32,
        },

        scale: {
          duration: 0.45,
        },

        rotateX: {
          duration: 0.7,

          delay:
            Math.min(
              index *
                0.025,
              0.18
            ),
        },

        rotateY: {
          duration: 0.7,

          delay:
            Math.min(
              index *
                0.025,
              0.18
            ),
        },
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,

              rotateX: 4,

              rotateY: -4,

              scale: 1.025,
            }
      }
      style={{
        transformStyle:
          "preserve-3d",

        perspective: 900,
      }}
      className="
        group

        relative

        min-h-[145px]

        cursor-default

        overflow-hidden

        rounded-[16px]

        border

        border-[#16384d]/70

        bg-[#06141e]/70

        shadow-[0_14px_45px_rgba(0,0,0,0.20)]

        backdrop-blur-xl

        transition-colors

        duration-300

        hover:border-[#178fd9]/40

        hover:bg-[#071925]/88

        sm:min-h-[160px]

        md:min-h-[170px]
      "
    >
      {/* =====================================================
          CURSOR LIGHT
      ====================================================== */}

      {!reduceMotion && (
        <motion.div
          style={{
            background:
              spotlight,
          }}
          className="
            pointer-events-none

            absolute

            inset-0

            opacity-0

            transition-opacity

            duration-300

            group-hover:opacity-100
          "
        />
      )}

      {/* =====================================================
          CUBE TOP FACE
      ====================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          left-[12px]

          right-[12px]

          top-[-8px]

          h-[16px]

          skew-x-[-35deg]

          rounded-t-[4px]

          border

          border-[#168edc]/[0.08]

          bg-[#0b2231]/50

          opacity-0

          transition-opacity

          duration-300

          group-hover:opacity-100
        "
      />

      {/* =====================================================
          CUBE RIGHT FACE
      ====================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          bottom-[12px]

          right-[-7px]

          top-[12px]

          w-[14px]

          skew-y-[-35deg]

          rounded-r-[5px]

          border

          border-[#168edc]/[0.08]

          bg-[#092031]/45

          opacity-0

          transition-opacity

          duration-300

          group-hover:opacity-100
        "
      />

      {/* =====================================================
          COLORED GLOW
      ====================================================== */}

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [
                  1,
                  1.18,
                  1,
                ],

                opacity: [
                  0.04,
                  0.11,
                  0.04,
                ],
              }
        }
        transition={{
          duration:
            4 +
            (index %
              3),

          repeat:
            Infinity,

          ease:
            "easeInOut",
        }}
        className="
          pointer-events-none

          absolute

          left-1/2

          top-[18%]

          h-[105px]

          w-[105px]

          -translate-x-1/2

          rounded-full

          blur-[45px]
        "
        style={{
          backgroundColor:
            skill.accent,
        }}
      />

      {/* =====================================================
          TOP EDGE
      ====================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          left-1/2

          top-0

          h-[1px]

          w-0

          -translate-x-1/2

          bg-gradient-to-r

          from-transparent

          via-[#3fc1ff]

          to-transparent

          transition-all

          duration-500

          group-hover:w-[70%]
        "
      />

      {/* =====================================================
          INDEX
      ====================================================== */}

      <span
        className="
          absolute

          right-3

          top-3

          text-[7px]

          font-semibold

          tracking-[1px]

          text-[#2d5167]

          transition-colors

          group-hover:text-[#4e91b1]
        "
      >
        {String(
          index + 1
        ).padStart(
          2,
          "0"
        )}
      </span>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative

          z-10

          flex

          min-h-[145px]

          flex-col

          items-center

          justify-center

          px-3

          py-5

          text-center

          sm:min-h-[160px]

          md:min-h-[170px]
        "
      >
        {/* =================================================
            3D ICON CUBE
        ================================================== */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateY: [
                    0,
                    6,
                    0,
                    -6,
                    0,
                  ],

                  y: [
                    0,
                    -3,
                    0,
                  ],
                }
          }
          transition={{
            rotateY: {
              duration:
                5 +
                index *
                  0.05,

              repeat:
                Infinity,

              ease:
                "easeInOut",
            },

            y: {
              duration:
                3.2 +
                (index %
                  4) *
                  0.2,

              repeat:
                Infinity,

              ease:
                "easeInOut",
            },
          }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  rotateY: 16,

                  rotateX:
                    -8,

                  scale: 1.08,
                }
          }
          style={{
            transformStyle:
              "preserve-3d",
          }}
          className="
            relative

            flex

            h-[58px]

            w-[58px]

            items-center

            justify-center

            rounded-[14px]

            border

            border-white/[0.055]

            bg-[#020c14]/80

            shadow-[0_12px_30px_rgba(0,0,0,0.28)]

            sm:h-[64px]

            sm:w-[64px]
          "
        >
          {/* ICON GLOW */}

          <div
            className="
              absolute

              inset-2

              rounded-full

              opacity-20

              blur-[18px]
            "
            style={{
              backgroundColor:
                skill.accent,
            }}
          />

          {/* TOP CUBE SURFACE */}

          <div
            className="
              pointer-events-none

              absolute

              left-[5px]

              right-[5px]

              top-[-5px]

              h-[9px]

              skew-x-[-35deg]

              rounded-[2px]

              border

              border-white/[0.04]

              bg-[#0b2130]/70
            "
          />

          {/* RIGHT CUBE SURFACE */}

          <div
            className="
              pointer-events-none

              bottom-[5px]

              absolute

              right-[-5px]

              top-[5px]

              w-[9px]

              skew-y-[-35deg]

              rounded-[2px]

              border

              border-white/[0.04]

              bg-[#081d2a]/70
            "
          />

          <Icon
            size={31}
            className="
              relative

              z-10

              sm:text-[35px]
            "
            style={{
              color:
                skill.accent,
            }}
          />
        </motion.div>

        {/* TITLE */}

        <h3
          className="
            mt-4

            text-[10px]

            font-semibold

            text-[#dae5ec]

            transition-colors

            duration-300

            group-hover:text-white

            sm:text-[11px]
          "
        >
          {skill.name}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-[5px]

            max-w-[135px]

            translate-y-1

            text-[7px]

            leading-[1.5]

            text-[#5b7586]

            opacity-0

            transition-all

            duration-300

            group-hover:translate-y-0

            group-hover:opacity-100

            sm:text-[8px]
          "
        >
          {
            skill.description
          }
        </p>
      </div>

      {/* =====================================================
          BOTTOM CUBE LINE
      ====================================================== */}

      <div
        className="
          absolute

          bottom-0

          left-1/2

          h-[1px]

          w-0

          -translate-x-1/2

          bg-gradient-to-r

          from-transparent

          via-[#1ca7f4]

          to-transparent

          transition-all

          duration-500

          group-hover:w-[55%]
        "
      />
    </motion.article>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function SkillsBackground({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* BASE */}

      <div className="absolute inset-0 bg-[#020a12]" />

      {/* RIGHT GLOW */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 76% 42%, rgba(0,117,255,0.17) 0%, rgba(0,75,180,0.07) 27%, transparent 55%)",
        }}
      />

      {/* LEFT GLOW */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 60%, rgba(0,174,255,0.055), transparent 32%)",
        }}
      />

      {/* GRID */}

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

      {/* MOVING GLOW */}

      {!reduceMotion && (
        <motion.div
          animate={{
            opacity: [
              0.18,
              0.43,
              0.18,
            ],

            x: [
              0,
              30,
              0,
            ],

            y: [
              0,
              -20,
              0,
            ],

            scale: [
              1,
              1.08,
              1,
            ],
          }}
          transition={{
            duration: 9,

            repeat: Infinity,

            ease: "easeInOut",
          }}
          className="
            absolute

            right-[4%]

            top-[15%]

            h-[380px]

            w-[380px]

            rounded-full

            bg-[#0075ff]/10

            blur-[130px]

            sm:h-[480px]

            sm:w-[480px]

            sm:blur-[150px]
          "
        />
      )}

      {/* PARTICLE */}

      {!reduceMotion && (
        <>
          <motion.span
            animate={{
              y: [
                0,
                -15,
                0,
              ],

              opacity: [
                0.2,
                0.75,
                0.2,
              ],
            }}
            transition={{
              duration: 4,

              repeat:
                Infinity,
            }}
            className="
              absolute

              left-[43%]

              top-[16%]

              h-[3px]

              w-[3px]

              rounded-full

              bg-[#3fc2ff]

              shadow-[0_0_12px_#3fc2ff]
            "
          />

          <motion.span
            animate={{
              y: [
                0,
                10,
                0,
              ],

              opacity: [
                0.15,
                0.6,
                0.15,
              ],
            }}
            transition={{
              duration: 5,

              repeat:
                Infinity,
            }}
            className="
              absolute

              bottom-[22%]

              right-[13%]

              h-[4px]

              w-[4px]

              rounded-full

              bg-[#0075ff]

              shadow-[0_0_14px_#0075ff]
            "
          />
        </>
      )}
    </div>
  );
}