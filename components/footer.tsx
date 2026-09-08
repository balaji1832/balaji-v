"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  {
    label: "Home",
    href: "#home",
  },

  {
    label: "About",
    href: "#about",
  },

  {
    label: "Skills",
    href: "#skills",
  },

  {
    label: "Projects",
    href: "#projects",
  },

  {
    label: "Experience",
    href: "#experience",
  },

  {
    label: "Contact",
    href: "#contact",
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/[0.045]
        bg-[#020a12]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* BLUE LEFT GLOW */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 50%, rgba(0,117,255,0.08), transparent 30%)",
          }}
        />

        {/* RIGHT GLOW */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 40%, rgba(0,117,255,0.06), transparent 28%)",
          }}
        />

        {/* GRID */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.012]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",

            backgroundSize:
              "55px 55px",
          }}
        />

        {/* MOVING GLOW */}

        {!reduceMotion && (
          <motion.div
            animate={{
              opacity: [
                0.15,
                0.35,
                0.15,
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
              left-[4%]
              top-1/2
              h-[150px]
              w-[150px]
              -translate-y-1/2
              rounded-full
              bg-[#0075ff]/10
              blur-[80px]
            "
          />
        )}
      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
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
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col
          gap-7
          px-5
          py-7

          sm:px-8
          sm:py-8

          md:px-10

          lg:grid
          lg:grid-cols-[0.9fr_1.4fr_0.9fr]
          lg:items-center
          lg:gap-6
          lg:px-12

          xl:px-14

          2xl:px-16
        "
      >
        {/* =================================================
            BRAND
        ================================================== */}

        <motion.a
          href="#home"
          whileHover={
            reduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
          className="
            group
            flex
            w-fit
            items-center
            gap-3
          "
        >
          {/* LOGO */}

          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -2,
                    rotate: -3,
                  }
            }
            className="
              relative
              flex
              h-[40px]
              w-[40px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-[10px]
              border
              border-[#168edc]/20
              bg-[#061722]
              shadow-[0_0_20px_rgba(0,117,255,0.10)]
            "
          >
            {/* GLOW */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#24b5ff]/15
                via-transparent
                to-[#0075ff]/10
              "
            />

            <span
              className="
                relative
                bg-gradient-to-b
                from-[#a9e4ff]
                via-[#44c7ff]
                to-[#0075ff]
                bg-clip-text
                text-[24px]
                font-extrabold
                leading-none
                text-transparent
                drop-shadow-[0_0_10px_rgba(0,166,255,0.35)]
              "
            >
              B
            </span>
          </motion.div>

          {/* TEXT */}

          <div>
            <p
              className="
                text-[12px]
                font-bold
                leading-none
                tracking-[0.5px]
                text-white

                sm:text-[13px]
              "
            >
              BALAJI V
            </p>

            <p
              className="
                mt-[5px]
                text-[8px]
                font-medium
                text-[#8093a0]

                sm:text-[9px]
              "
            >
              Full Stack Developer
            </p>
          </div>
        </motion.a>

        {/* =================================================
            NAVIGATION
        ================================================== */}

        <nav
          className="
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-3

            sm:gap-x-7

            lg:justify-center
            lg:gap-x-8
          "
        >
          {navItems.map(
            (
              item,
              index
            ) => (
              <motion.a
                key={
                  item.label
                }
                href={
                  item.href
                }
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay:
                    0.1 +
                    index *
                      0.04,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                className="
                  group
                  relative
                  py-2
                  text-[9px]
                  font-medium
                  text-[#9aabb6]
                  transition-colors
                  duration-300

                  hover:text-white

                  sm:text-[10px]
                "
              >
                {item.label}

                {/* UNDERLINE */}

                <span
                  className="
                    absolute
                    bottom-[3px]
                    left-1/2
                    h-[1px]
                    w-0
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r
                    from-[#27b5ff]
                    to-[#0075ff]
                    transition-all
                    duration-300

                    group-hover:w-full
                  "
                />
              </motion.a>
            )
          )}
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4

            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:flex-col
            lg:items-end
            lg:justify-center
            lg:gap-3
          "
        >
          {/* SOCIAL ICONS */}

          <div
            className="
              flex
              items-center
              gap-2.5
            "
          >
            <SocialIcon
              href="https://www.linkedin.com/in/balaji-v-97080b2ba/"
              label="LinkedIn"
              active
            >
              <FaLinkedinIn
                size={14}
              />
            </SocialIcon>

            <SocialIcon
              href="https://github.com/balaji1832"
              label="GitHub"
            >
              <FaGithub
                size={15}
              />
            </SocialIcon>

            <SocialIcon
              href="mailto:balaji49034@gmail.com"
              label="Email"
            >
              <Mail
                size={15}
              />
            </SocialIcon>
          </div>

          {/* COPYRIGHT */}

          <p
            className="
              text-[7px]
              font-medium
              text-[#536a79]

              sm:text-[8px]
            "
          >
            © 2026 Balaji V. All rights reserved.
          </p>
        </div>
      </motion.div>

      {/* =====================================================
          BOTTOM PREMIUM LINE
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          h-[1px]
          w-full
          max-w-[1440px]
          overflow-hidden
        "
      >
        {!reduceMotion && (
          <motion.div
            animate={{
              x: [
                "-100%",
                "400%",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="
              h-full
              w-[25%]
              bg-gradient-to-r
              from-transparent
              via-[#168edc]/30
              to-transparent
            "
          />
        )}
      </div>
    </footer>
  );
}

/* =========================================================
   SOCIAL ICON
========================================================= */

function SocialIcon({
  href,
  label,
  children,
  active = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
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
        scale: 0.94,
      }}
      className={`
        flex
        h-[30px]
        w-[30px]
        items-center
        justify-center
        rounded-[8px]
        border
        transition-all
        duration-300

        ${
          active
            ? `
              border-[#168edc]/40
              bg-[#0786cf]
              text-white
              shadow-[0_0_18px_rgba(0,139,255,0.15)]
            `
            : `
              border-white/[0.07]
              bg-[#081720]/75
              text-[#d7e4eb]

              hover:border-[#168edc]/35
              hover:bg-[#0075ff]/10
              hover:text-[#42bdff]
            `
        }
      `}
    >
      {children}
    </motion.a>
  );
}