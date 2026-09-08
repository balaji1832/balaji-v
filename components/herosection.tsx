"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  Code2,
  Download,
  Mail,
  MapPin,
  Mouse,
  Send,
  Sparkles,
  Terminal,
  Wifi,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

/* =========================================================
   TECH STACK
========================================================= */

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "FastAPI",
  "Python",
];

/* =========================================================
   TERMINAL TYPES
========================================================= */

type TerminalToken = {
  text: string;
  className: string;
};

type TerminalLine = TerminalToken[];

type TerminalProgram = {
  name: string;
  file: string;
  lines: TerminalLine[];
};

/* =========================================================
   TERMINAL PROGRAMS

   Terminal continuously moves:
   Program 1
      ↓
   delete
      ↓
   Program 2
      ↓
   delete
      ↓
   Program 3
      ↓
   repeat
========================================================= */

const terminalPrograms: TerminalProgram[] = [
  {
    name: "developer.profile",
    file: "profile.ts",
    lines: [
      [
        {
          text: "const ",
          className: "text-[#d678cf]",
        },
        {
          text: "developer ",
          className: "text-[#5bbfff]",
        },
        {
          text: "= ",
          className: "text-[#a9b7c2]",
        },
        {
          text: "{",
          className: "text-[#e6bb69]",
        },
      ],

      [
        {
          text: "  name",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"Balaji V"',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  role",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: "Frontend Developer | Full Stack Developer",
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  focus",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"Web Products & APIs"',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  mindset",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"Build. Learn. Improve."',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  available",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: "true",
          className: "text-[#5dd4df]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "};",
          className: "text-[#e6bb69]",
        },
      ],
    ],
  },

  {
    name: "project.stack",
    file: "stack.ts",
    lines: [
      [
        {
          text: "const ",
          className: "text-[#d678cf]",
        },
        {
          text: "stack ",
          className: "text-[#5bbfff]",
        },
        {
          text: "= ",
          className: "text-[#a9b7c2]",
        },
        {
          text: "{",
          className: "text-[#e6bb69]",
        },
      ],

      [
        {
          text: "  frontend",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"Next.js + React"',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  language",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"TypeScript"',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  backend",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"FastAPI + Python"',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  database",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"MySQL"',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  goal",
          className: "text-[#ff7889]",
        },
        {
          text: ": ",
          className: "text-[#a7b4bd]",
        },
        {
          text: '"Production Ready"',
          className: "text-[#9fce65]",
        },
        {
          text: ",",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "};",
          className: "text-[#e6bb69]",
        },
      ],
    ],
  },

  {
    name: "build.product",
    file: "ship.ts",
    lines: [
      [
        {
          text: "async ",
          className: "text-[#d678cf]",
        },
        {
          text: "function ",
          className: "text-[#d678cf]",
        },
        {
          text: "buildProduct",
          className: "text-[#5bbfff]",
        },
        {
          text: "() {",
          className: "text-[#e6bb69]",
        },
      ],

      [
        {
          text: "  await ",
          className: "text-[#d678cf]",
        },
        {
          text: "design",
          className: "text-[#61afef]",
        },
        {
          text: "();",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  await ",
          className: "text-[#d678cf]",
        },
        {
          text: "develop",
          className: "text-[#61afef]",
        },
        {
          text: "();",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  await ",
          className: "text-[#d678cf]",
        },
        {
          text: "test",
          className: "text-[#61afef]",
        },
        {
          text: "();",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  await ",
          className: "text-[#d678cf]",
        },
        {
          text: "deploy",
          className: "text-[#61afef]",
        },
        {
          text: "();",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "  return ",
          className: "text-[#d678cf]",
        },
        {
          text: '"Better Experience 🚀"',
          className: "text-[#9fce65]",
        },
        {
          text: ";",
          className: "text-[#a7b4bd]",
        },
      ],

      [
        {
          text: "}",
          className: "text-[#e6bb69]",
        },
      ],
    ],
  },
];

/* =========================================================
   HERO
========================================================= */

export default function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020a12]
        pt-[72px]
        text-white

        sm:pt-[76px]
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
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

            backgroundSize: "55px 55px",
          }}
        />

        {/* ANIMATED GLOW */}

        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.08, 1],
            x: [0, 25, 0],
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
      </div>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-[1440px]
          grid-cols-1
          items-center
          gap-14
          px-5
          pb-16
          pt-10

          sm:px-8
          sm:pt-12

          md:px-10

          xl:min-h-[calc(100vh-76px)]
          xl:grid-cols-[0.84fr_1.16fr]
          xl:gap-12
          xl:px-14
          xl:pb-8
          xl:pt-4

          2xl:px-16
        "
      >
        {/* =====================================================
            LEFT
        ====================================================== */}

        <div
          className="
            relative
            z-20
            mx-auto
            flex
            w-full
            max-w-[680px]
            flex-col
            items-start

            xl:mx-0
            xl:max-w-none
          "
        >
          {/* AVAILABLE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mb-5
              flex
              items-center
              gap-2.5
              rounded-full
              border
              border-[#00dcb0]/15
              bg-[#00dcb0]/[0.045]
              px-3
              py-[7px]

              sm:mb-6
              sm:px-4
              sm:py-[8px]
            "
          >
            <span className="relative flex h-[8px] w-[8px]">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-[#19e2b6]
                  opacity-50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-[8px]
                  w-[8px]
                  rounded-full
                  bg-[#19e2b6]
                  shadow-[0_0_12px_#19e2b6]
                "
              />
            </span>

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[1.1px]
                text-[#8fcbbb]

                sm:text-[10px]
                sm:tracking-[1.25px]
              "
            >
              Available for Opportunities
            </span>
          </motion.div>

          {/* HELLO */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
            }}
            className="
              mb-2
              text-[18px]
              font-medium
              text-[#dce5ec]

              sm:text-[22px]

              lg:text-[23px]
            "
          >
            Hi, I&apos;m
          </motion.p>

          {/* NAME */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.7,
            }}
            className="
              flex
              flex-wrap
              items-center
              text-[46px]
              font-extrabold
              leading-[0.95]
              tracking-[-2px]

              sm:text-[62px]

              md:text-[72px]

              xl:text-[66px]

              2xl:text-[74px]
            "
          >
            <span>BALAJI</span>

            <span
              className="
                ml-3
                bg-gradient-to-b
                from-[#42cfff]
                via-[#0095ff]
                to-[#0064ff]
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_25px_rgba(0,117,255,0.35)]
              "
            >
              V
            </span>
          </motion.h1>

          {/* ROLE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.18,
              duration: 0.7,
            }}
            className="
              mt-5
              flex
              items-center
              gap-2.5

              sm:gap-3
            "
          >
            <Code2
              size={20}
              className="shrink-0 text-[#21adff] sm:h-[22px] sm:w-[22px]"
            />

            <h2
              className="
                text-[16px]
                font-semibold
                text-[#edf2f6]

                sm:text-[18px]

                md:text-[20px]
              "
            >
              Frontend Developer | Full Stack Developer
            </h2>
          </motion.div>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.28,
              duration: 0.7,
            }}
            className="
              mt-5
              max-w-[570px]
              text-[13px]
              leading-[1.85]
              text-[#8fa2b2]

              sm:mt-6
              sm:text-[15px]
              sm:leading-[1.9]
            "
          >
            I build modern, responsive and production-ready
            digital products with clean interfaces, scalable
            backend architecture and seamless user experiences.
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.38,
              duration: 0.7,
            }}
            className="
              mt-7
              flex
              w-full
              flex-col
              gap-3

              sm:mt-8
              sm:w-auto
              sm:flex-row
              sm:gap-4
            "
          >
            <motion.a
              href="/resume/Balaji-V-Resume.pdf"
              download
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                flex
                h-[50px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#4cc3ff]
                bg-gradient-to-r
                from-[#25aeff]
                to-[#0075ff]
                px-7
                text-[12px]
                font-semibold
                text-white
                shadow-[0_0_28px_rgba(0,132,255,0.30)]

                sm:h-[52px]
                sm:min-w-[210px]
                sm:w-auto
                sm:text-[13px]
              "
            >
              Download Resume

              <Download
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-y-[2px]
                "
              />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                flex
                h-[50px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#087dcc]
                bg-[#06131d]/80
                px-6
                text-[12px]
                font-medium
                text-white
                transition-all
                duration-300

                hover:border-[#36b9ff]
                hover:bg-[#0075ff]/10

                sm:h-[52px]
                sm:min-w-[175px]
                sm:w-auto
                sm:text-[13px]
              "
            >
              Let&apos;s Connect

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </motion.a>
          </motion.div>

          {/* SOCIALS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.48,
              duration: 0.7,
            }}
            className="
              mt-7
              flex
              items-center
              gap-3

              sm:mt-8
              sm:gap-4
            "
          >
            <SocialButton
              href="https://www.linkedin.com/in/balaji-v-97080b2ba/"
              label="LinkedIn"
              active
            >
              <FaLinkedinIn size={20} />
            </SocialButton>

            <SocialButton
              href="https://github.com/balaji1832"
              label="GitHub"
            >
              <FaGithub size={20} />
            </SocialButton>

            <SocialButton
              href="mailto:balaji49034@gmail.com"
              label="Email"
            >
              <Mail size={19} />
            </SocialButton>

            <SocialButton
              href="https://wa.me/917305840255"
              label="WhatsApp"
            >
              <FaWhatsapp size={21} />
            </SocialButton>
          </motion.div>

          {/* STATS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.58,
              duration: 0.7,
            }}
            className="
              mt-9
              grid
              w-full
              max-w-[540px]
              grid-cols-3
              divide-x
              divide-[#10465d]

              sm:mt-11
            "
          >
            <Stat
              value="1+"
              label="Years Experience"
            />

            <Stat
              value="6+"
              label="Projects Delivered"
            />

            <Stat
              value="100%"
              label="Commitment"
            />
          </motion.div>
        </div>

        {/* =====================================================
            RIGHT - LIVE DEVELOPER WORKSPACE
        ====================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            w-full
            max-w-[760px]
            items-center
            justify-center

            xl:max-w-none
          "
        >
          {/* BACK GLOW */}

          <motion.div
            animate={{
              opacity: [0.25, 0.55, 0.25],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[320px]
              w-[320px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#0075ff]/10
              blur-[100px]

              sm:h-[480px]
              sm:w-[600px]
              sm:blur-[120px]
            "
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-20
              w-full
              max-w-[700px]
            "
          >
            {/* =================================================
                TOP TEXT
            ================================================== */}

            <div
              className="
                mb-5
                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles
                    size={13}
                    className="text-[#31b6ff]"
                  />

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[1.8px]
                      text-[#4d8faf]

                      sm:text-[9px]
                      sm:tracking-[2px]
                    "
                  >
                    Building Digital Products
                  </span>
                </div>

                <h3
                  className="
                    text-[19px]
                    font-semibold
                    leading-[1.45]
                    tracking-[-0.5px]
                    text-[#e7f2fa]

                    sm:text-[23px]

                    md:text-[24px]
                  "
                >
                  Code. Create.
                  <br />

                  <span
                    className="
                      bg-gradient-to-r
                      from-[#48caff]
                      via-[#1cafff]
                      to-[#0075ff]
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Collaborate. Grow.
                  </span>
                </h3>
              </motion.div>

              {/* QUOTE */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                }}
                className="
                  relative
                  max-w-[270px]
                  border-l
                  border-[#168ee8]/25
                  pl-4

                  sm:pl-5
                "
              >
                <span
                  className="
                    absolute
                    -left-[7px]
                    -top-4
                    bg-[#020a12]
                    px-1
                    font-serif
                    text-[30px]
                    leading-none
                    text-[#268fd2]/55

                    sm:text-[36px]
                  "
                >
                  “
                </span>

                <p
                  className="
                    font-serif
                    text-[11px]
                    italic
                    leading-[1.7]
                    text-[#829caf]

                    sm:text-[13px]
                  "
                >
                  Clean code creates better products and
                  better digital experiences.
                </p>
              </motion.div>
            </div>

            {/* =================================================
                TERMINAL CARD
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                overflow-hidden
                rounded-[20px]
                border
                border-[#138bda]/15
                bg-[#061621]/90
                p-3
                shadow-[0_30px_80px_rgba(0,0,0,0.45),0_0_55px_rgba(0,117,255,0.05)]
                backdrop-blur-2xl

                sm:rounded-[26px]
                sm:p-5

                md:rounded-[28px]
              "
            >
              {/* CARD TOP LIGHT */}

              <motion.div
                animate={{
                  opacity: [0.3, 0.65, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  h-[150px]
                  bg-gradient-to-b
                  from-[#0075ff]/[0.07]
                  to-transparent
                "
              />

              {/* HEADER */}

              <div
                className="
                  relative
                  mb-3
                  flex
                  items-center
                  justify-between
                  gap-3
                  px-1

                  sm:mb-4
                "
              >
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-[#168ddc]/15
                      bg-[#0075ff]/[0.07]

                      sm:h-9
                      sm:w-9
                      sm:rounded-xl
                    "
                  >
                    <Terminal
                      size={15}
                      className="text-[#32b7ff]"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className="
                          truncate
                          text-[10px]
                          font-medium
                          text-[#8aa9bd]

                          sm:text-[11px]
                        "
                      >
                        balaji.dev
                      </p>

                      <span
                        className="
                          hidden
                          items-center
                          gap-1
                          rounded-full
                          border
                          border-[#00dcae]/10
                          bg-[#00dcae]/[0.04]
                          px-2
                          py-[3px]

                          sm:flex
                        "
                      >
                        <span
                          className="
                            h-[5px]
                            w-[5px]
                            animate-pulse
                            rounded-full
                            bg-[#00dcae]
                          "
                        />

                        <span
                          className="
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[1px]
                            text-[#62a99a]
                          "
                        >
                          Live
                        </span>
                      </span>
                    </div>

                    <p
                      className="
                        mt-[2px]
                        truncate
                        text-[7px]
                        font-medium
                        uppercase
                        tracking-[1.2px]
                        text-[#3e5e73]

                        sm:text-[8px]
                        sm:tracking-[1.5px]
                      "
                    >
                      Developer Workspace
                    </p>
                  </div>
                </div>

                {/* WINDOW BUTTONS */}

                <div className="flex shrink-0 items-center gap-[6px] sm:gap-[7px]">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#ff6259] sm:h-[7px] sm:w-[7px]" />

                  <span className="h-[6px] w-[6px] rounded-full bg-[#ffbd2e] sm:h-[7px] sm:w-[7px]" />

                  <span className="h-[6px] w-[6px] rounded-full bg-[#28c840] sm:h-[7px] sm:w-[7px]" />
                </div>
              </div>

              {/* =================================================
                  LIVE TERMINAL
              ================================================== */}

              <AnimatedTerminal />

              {/* =================================================
                  TECH STACK
              ================================================== */}

              <div
                className="
                  relative
                  mt-3
                  flex
                  flex-wrap
                  gap-2

                  sm:mt-4
                "
              >
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.75 + index * 0.07,
                    }}
                    whileHover={{
                      y: -3,
                      scale: 1.03,
                    }}
                    className="
                      flex
                      cursor-default
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-[#158edc]/15
                      bg-[#0075ff]/[0.045]
                      px-3
                      py-[7px]
                      text-[8px]
                      font-semibold
                      text-[#7fc4ea]
                      transition-colors
                      duration-300

                      hover:border-[#27aeff]/35
                      hover:bg-[#0075ff]/[0.09]
                      hover:text-[#b7e5ff]

                      sm:gap-2
                      sm:px-4
                      sm:py-[8px]
                      sm:text-[10px]
                    "
                  >
                    <span
                      className="
                        h-[4px]
                        w-[4px]
                        rounded-full
                        bg-[#27adff]
                        shadow-[0_0_6px_#27adff]
                      "
                    />

                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* =================================================
                STATUS CARDS
            ================================================== */}

            <div
              className="
                mt-3
                grid
                gap-3

                sm:mt-4
                sm:grid-cols-2
              "
            >
              {/* OPEN TO WORK */}

              <motion.a
                href="mailto:balaji49034@gmail.com"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.9,
                }}
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-[#00dbae]/10
                  bg-[#051821]/80
                  px-3
                  py-3
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:border-[#00dbae]/25
                  hover:bg-[#00dbae]/[0.035]

                  sm:px-4
                  sm:py-4
                "
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(0,219,174,0)",
                        "0 0 20px rgba(0,219,174,0.12)",
                        "0 0 0px rgba(0,219,174,0)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#00dbae]/10
                      bg-[#00dbae]/[0.07]

                      sm:h-11
                      sm:w-11
                    "
                  >
                    <span className="relative flex h-[10px] w-[10px]">
                      <span
                        className="
                          absolute
                          inline-flex
                          h-full
                          w-full
                          animate-ping
                          rounded-full
                          bg-[#00deb0]
                          opacity-50
                        "
                      />

                      <span
                        className="
                          relative
                          inline-flex
                          h-[10px]
                          w-[10px]
                          rounded-full
                          bg-[#00deb0]
                          shadow-[0_0_14px_#00deb0]
                        "
                      />
                    </span>
                  </motion.div>

                  <div>
                    <p
                      className="
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[1.3px]
                        text-[#547a78]

                        sm:text-[8px]
                        sm:tracking-[1.5px]
                      "
                    >
                      Current Status
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        font-semibold
                        text-[#d5eee8]

                        sm:text-[13px]
                      "
                    >
                      Open to Work
                    </p>

                    <p
                      className="
                        mt-[2px]
                        text-[8px]
                        text-[#587a76]

                        sm:text-[9px]
                      "
                    >
                      Let&apos;s build something great
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={15}
                  className="
                    shrink-0
                    text-[#567875]
                    transition-all
                    duration-300

                    group-hover:translate-x-1
                    group-hover:text-[#00dbae]
                  "
                />
              </motion.a>

              {/* LOCATION */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1,
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/[0.055]
                  bg-[#061720]/80
                  px-3
                  py-3
                  backdrop-blur-xl

                  sm:px-4
                  sm:py-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#168cd9]/10
                      bg-[#0075ff]/[0.07]
                      text-[#31b6ff]

                      sm:h-11
                      sm:w-11
                    "
                  >
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p
                      className="
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[1.3px]
                        text-[#4b667a]

                        sm:text-[8px]
                        sm:tracking-[1.5px]
                      "
                    >
                      Based In
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        font-semibold
                        text-[#c5d7e4]

                        sm:text-[13px]
                      "
                    >
                      Chennai, India
                    </p>

                    <p
                      className="
                        mt-[2px]
                        text-[8px]
                        text-[#4b667a]

                        sm:text-[9px]
                      "
                    >
                      Available remotely
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{
                    x: [0, 4, 0],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Send
                    size={17}
                    className="text-[#179fff]"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* BOTTOM */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.15,
              }}
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-3
                text-center

                sm:mt-5
              "
            >
              <span
                className="
                  h-[1px]
                  w-5
                  bg-gradient-to-r
                  from-transparent
                  to-[#23516b]

                  sm:w-8
                "
              />

              <p
                className="
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[1.3px]
                  text-[#3f5a6c]

                  sm:text-[9px]
                  sm:tracking-[2px]
                "
              >
                Turning ideas into digital experiences
              </p>

              <span
                className="
                  h-[1px]
                  w-5
                  bg-gradient-to-l
                  from-transparent
                  to-[#23516b]

                  sm:w-8
                "
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          SCROLL
      ====================================================== */}

      <motion.a
        href="#about"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: [0, 7, 0],
        }}
        transition={{
          opacity: {
            delay: 1.3,
          },

          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          absolute
          bottom-5
          right-6
          z-30
          hidden
          flex-col
          items-center
          gap-2
          text-[9px]
          text-[#708697]

          2xl:flex
        "
      >
        <Mouse size={25} />

        <span>Scroll Down</span>

        <ArrowDown
          size={12}
          className="text-[#22aaff]"
        />
      </motion.a>
    </section>
  );
}

/* =========================================================
   ANIMATED TERMINAL

   TYPE
      ↓
   HOLD
      ↓
   DELETE
      ↓
   NEXT PROGRAM
      ↓
   REPEAT
========================================================= */

function AnimatedTerminal() {
  const reduceMotion = useReducedMotion();

  const [programIndex, setProgramIndex] =
    useState(0);

  const [characterCount, setCharacterCount] =
    useState(0);

  const [phase, setPhase] = useState<
    "typing" | "holding" | "deleting"
  >("typing");

  const program =
    terminalPrograms[programIndex];

  const totalCharacters = useMemo(() => {
    return program.lines.reduce(
      (programTotal, line) => {
        const lineLength = line.reduce(
          (lineTotal, token) =>
            lineTotal + token.text.length,
          0
        );

        /*
         +1 simulates pressing Enter.
        */
        return programTotal + lineLength + 1;
      },
      0
    );
  }, [program]);

  /* =======================================================
     TYPEWRITER ENGINE
  ======================================================== */

  useEffect(() => {
    /*
     Accessibility:
     if reduced motion is requested,
     display all code immediately.
    */

    if (reduceMotion) {
      setCharacterCount(totalCharacters);
      return;
    }

    let timeout: ReturnType<
      typeof setTimeout
    >;

    /* TYPING */

    if (phase === "typing") {
      if (
        characterCount <
        totalCharacters
      ) {
        timeout = setTimeout(() => {
          setCharacterCount((value) =>
            Math.min(
              value + 1,
              totalCharacters
            )
          );
        }, 27);
      } else {
        timeout = setTimeout(() => {
          setPhase("holding");
        }, 1700);
      }
    }

    /* HOLD */

    if (phase === "holding") {
      timeout = setTimeout(() => {
        setPhase("deleting");
      }, 900);
    }

    /* DELETE */

    if (phase === "deleting") {
      if (characterCount > 0) {
        timeout = setTimeout(() => {
          setCharacterCount((value) =>
            Math.max(0, value - 3)
          );
        }, 14);
      } else {
        timeout = setTimeout(() => {
          setProgramIndex(
            (current) =>
              (current + 1) %
              terminalPrograms.length
          );

          setPhase("typing");
        }, 300);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [
    characterCount,
    phase,
    programIndex,
    totalCharacters,
    reduceMotion,
  ]);

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[16px]
        border
        border-white/[0.045]
        bg-[#010910]

        sm:rounded-[20px]
      "
    >
      {/* =====================================================
          MOVING SCAN LIGHT
      ====================================================== */}

      {!reduceMotion && (
        <motion.div
          animate={{
            top: [
              "-15%",
              "115%",
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
            right-0
            z-20
            h-[60px]
            bg-gradient-to-b
            from-transparent
            via-[#0075ff]/[0.025]
            to-transparent
          "
        />
      )}

      {/* LEFT ACTIVE LINE */}

      <motion.div
        animate={{
          opacity: [
            0.5,
            1,
            0.5,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-0
          left-0
          top-0
          z-20
          w-[2px]
          bg-gradient-to-b
          from-[#25b5ff]
          via-[#0075ff]
          to-[#0075ff]/10

          sm:w-[3px]
        "
      />

      {/* =====================================================
          TERMINAL SUB HEADER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-2
          border-b
          border-white/[0.04]
          bg-white/[0.01]
          px-3
          py-2

          sm:px-5
          sm:py-2.5
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <Code2
            size={12}
            className="shrink-0 text-[#249fe7]"
          />

          <motion.span
            key={program.name}
            initial={{
              opacity: 0,
              x: -5,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="
              truncate
              font-mono
              text-[8px]
              text-[#58758a]

              sm:text-[9px]
            "
          >
            {program.name}
          </motion.span>

          <span className="text-[#2c4557]">
            /
          </span>

          <span
            className="
              truncate
              font-mono
              text-[8px]
              text-[#3c596c]

              sm:text-[9px]
            "
          >
            {program.file}
          </span>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5
          "
        >
          <Wifi
            size={11}
            className="text-[#00cfa3]"
          />

          <span
            className="
              hidden
              text-[7px]
              font-semibold
              uppercase
              tracking-[1px]
              text-[#4a7c72]

              sm:block
            "
          >
            running
          </span>
        </div>
      </div>

      {/* =====================================================
          CODE BODY
      ====================================================== */}

      <div
        className="
          relative
          z-10
          min-h-[215px]
          overflow-x-auto
          px-3
          py-4
          font-mono
          text-[9px]
          leading-[1.85]

          sm:min-h-[245px]
          sm:px-5
          sm:py-5
          sm:text-[11px]
          sm:leading-[1.9]

          md:min-h-[265px]
          md:px-6
          md:py-6
          md:text-[12px]

          lg:text-[12px]
        "
      >
        <TypedProgram
          program={program}
          characterCount={
            characterCount
          }
        />

        {/* CURSOR */}

        <motion.span
          animate={{
            opacity: [
              1,
              0,
              1,
            ],
          }}
          transition={{
            duration: 0.72,
            repeat: Infinity,
          }}
          className="
            mt-1
            inline-block
            h-[13px]
            w-[5px]
            bg-[#25b5ff]
            align-middle
            shadow-[0_0_10px_rgba(37,181,255,0.45)]

            sm:h-[16px]
            sm:w-[6px]
          "
        />
      </div>

      {/* =====================================================
          TERMINAL FOOTER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-white/[0.04]
          bg-[#020c14]
          px-3
          py-2

          sm:px-5
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              relative
              flex
              h-[6px]
              w-[6px]
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-[#00dcae]
                opacity-40
              "
            />

            <span
              className="
                relative
                h-[6px]
                w-[6px]
                rounded-full
                bg-[#00dcae]
              "
            />
          </span>

          <span
            className="
              text-[7px]
              text-[#466377]

              sm:text-[8px]
            "
          >
            Live coding
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            text-[7px]
            text-[#314c60]

            sm:text-[8px]
          "
        >
          <span>
            UTF-8
          </span>

          <span>
            TypeScript
          </span>

          <span className="hidden sm:inline">
            Ln {program.lines.length}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RENDER TYPED CODE WITH SYNTAX COLORS
========================================================= */

function TypedProgram({
  program,
  characterCount,
}: {
  program: TerminalProgram;
  characterCount: number;
}) {
  let remaining =
    characterCount;

  return (
    <div className="min-w-max">
      {program.lines.map(
        (line, lineIndex) => {
          const lineLength =
            line.reduce(
              (
                total,
                token
              ) =>
                total +
                token.text.length,
              0
            );

          const charactersForLine =
            Math.max(
              0,
              Math.min(
                remaining,
                lineLength
              )
            );

          remaining =
            Math.max(
              0,
              remaining -
                lineLength -
                1
            );

          return (
            <div
              key={`${program.name}-${lineIndex}`}
              className="
                flex
                min-h-[1.85em]
                items-start
              "
            >
              {/* LINE NUMBER */}

              <span
                className="
                  mr-3
                  w-[14px]
                  shrink-0
                  select-none
                  text-right
                  text-[#263e51]

                  sm:mr-4
                  sm:w-[18px]
                "
              >
                {lineIndex + 1}
              </span>

              {/* CODE */}

              <div className="whitespace-pre">
                <TypedLine
                  line={line}
                  characters={
                    charactersForLine
                  }
                />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

/* =========================================================
   RENDER EACH TOKEN PARTIALLY
========================================================= */

function TypedLine({
  line,
  characters,
}: {
  line: TerminalLine;
  characters: number;
}) {
  let available =
    characters;

  return (
    <>
      {line.map(
        (token, index) => {
          if (available <= 0) {
            return null;
          }

          const visibleText =
            token.text.slice(
              0,
              available
            );

          available -=
            token.text.length;

          return (
            <span
              key={index}
              className={
                token.className
              }
            >
              {visibleText}
            </span>
          );
        }
      )}
    </>
  );
}

/* =========================================================
   SOCIAL BUTTON
========================================================= */

function SocialButton({
  href,
  label,
  children,
  active = false,
}: {
  href: string;
  label: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{
        y: -4,
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className={`
        flex
        h-[39px]
        w-[39px]
        items-center
        justify-center
        rounded-xl
        border
        transition-all
        duration-300

        sm:h-[42px]
        sm:w-[42px]

        ${
          active
            ? `
              border-[#198ee0]
              bg-[#0879bd]
              text-white
              shadow-[0_0_20px_rgba(0,139,255,0.2)]
            `
            : `
              border-white/[0.07]
              bg-[#101d27]
              text-[#dce7ee]

              hover:border-[#148bd9]
              hover:bg-[#0b75bb]/20
              hover:text-[#50bdff]
            `
        }
      `}
    >
      {children}
    </motion.a>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
        px-3
        first:pl-0

        sm:px-6
        sm:first:pl-0
      "
    >
      <motion.p
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          text-[22px]
          font-bold
          text-[#22b5ff]
          drop-shadow-[0_0_15px_rgba(0,160,255,0.25)]

          sm:text-[27px]

          md:text-[29px]
        "
      >
        {value}
      </motion.p>

      <p
        className="
          mt-1
          text-[8px]
          leading-[1.5]
          text-[#8396a7]

          sm:text-[10px]

          md:text-[11px]
        "
      >
        {label}
      </p>
    </div>
  );
}