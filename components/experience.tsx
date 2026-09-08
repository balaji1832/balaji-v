"use client";

import {
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  GraduationCap,
  MapPin,
  School,
  Sparkles,
} from "lucide-react";

/* =========================================================
   PROFESSIONAL EXPERIENCE
========================================================= */

const professionalExperience = {
  date: "July 2025",

  endDate: "Present",

  role:
    "Frontend Developer",

  company:
    "Ayatiworks",

  location:
    "Chennai, India",

  description:
    "Building production-ready digital products with responsive interfaces, scalable backend services, API integrations, and reliable deployments.",

  highlights: [
    "Built and deployed production web applications across real estate, healthcare, sports medicine, and manufacturing.",

    "Developed responsive Next.js frontends and FastAPI/Python backend services with MySQL.",

    "Integrated REST APIs for dashboards and content management workflows.",

    "Converted UI/UX designs into pixel-accurate, responsive interfaces and managed production deployments.",
  ],

  stack: [
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Python",
    "FastAPI",
    "MySQL",
    "Git",
    "GitHub",
    "Vercel",
  ],
};

/* =========================================================
   EDUCATION
========================================================= */

const education = [
  {
    date: "2021",

    endDate: "2025",

    title:
      "B.Tech, Information Technology",

    institution:
      "Jerusalem College of Engineering",

    label:
      "Bachelor's Degree",

    result:
      "CGPA 8.13",
  },

  {
    date: "2020",

    endDate: "2021",

    title:
      "12th State Board",

    institution:
      "Manuelmony Matriculation Higher Secondary School",

    label:
      "Higher Secondary",

    result:
      "82%",
  },

  {
    date: "2018",

    endDate: "2019",

    title:
      "10th State Board",

    institution:
      "ST. Mary’s Matriculation Higher Secondary School",

    label:
      "Secondary School",

    result:
      "76%",
  },
];

/* =========================================================
   EXPERIENCE COMPONENT
========================================================= */

export default function Experience() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const stageRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const headerRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const timelineRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const progressRef =
    useRef<HTMLDivElement | null>(
      null
    );

  /* =======================================================
     GSAP
  ======================================================== */

  useLayoutEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger
    );

    const section =
      sectionRef.current;

    const stage =
      stageRef.current;

    const timeline =
      timelineRef.current;

    const progress =
      progressRef.current;

    if (
      !section ||
      !stage ||
      !timeline ||
      !progress
    ) {
      return;
    }

    const ctx =
      gsap.context(() => {
        const mm =
          gsap.matchMedia();

        /* =================================================
           REDUCED MOTION
        ================================================== */

        mm.add(
          "(prefers-reduced-motion: reduce)",

          () => {
            gsap.set(
              [
                stage,
                headerRef.current,

                ".journey-card",

                ".journey-date",

                ".journey-dot",

                ".experience-point",

                ".experience-chip",
              ],
              {
                clearProps: "all",

                opacity: 1,

                x: 0,

                y: 0,

                scale: 1,
              }
            );

            gsap.set(
              progress,
              {
                scaleY: 1,
              }
            );
          }
        );

        /* =================================================
           DESKTOP / LARGE TABLET
        ================================================== */

        mm.add(
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",

          () => {
            /* =============================================
               1. ENTIRE EXPERIENCE AREA COMES FROM BOTTOM
            ============================================== */

            gsap.fromTo(
              stage,

              {
                y: 150,

                opacity: 0.28,

                scale: 0.985,
              },

              {
                y: 0,

                opacity: 1,

                scale: 1,

                ease: "none",

                scrollTrigger: {
                  trigger:
                    section,

                  start:
                    "top 96%",

                  end:
                    "top 48%",

                  scrub: 0.9,

                  invalidateOnRefresh:
                    true,
                },
              }
            );

            /* =============================================
               2. HEADER
            ============================================== */

            gsap.fromTo(
              headerRef.current,

              {
                y: 55,

                opacity: 0,
              },

              {
                y: 0,

                opacity: 1,

                ease:
                  "none",

                scrollTrigger: {
                  trigger:
                    headerRef.current,

                  start:
                    "top 92%",

                  end:
                    "top 67%",

                  scrub: 0.6,
                },
              }
            );

            /* =============================================
               3. BLUE TIMELINE DRAWS WITH PAGE SCROLL
            ============================================== */

            gsap.fromTo(
              progress,

              {
                scaleY: 0,

                transformOrigin:
                  "top center",
              },

              {
                scaleY: 1,

                ease:
                  "none",

                scrollTrigger: {
                  trigger:
                    timeline,

                  start:
                    "top 68%",

                  end:
                    "bottom 62%",

                  scrub: 0.8,

                  invalidateOnRefresh:
                    true,
                },
              }
            );

            /* =============================================
               4. EACH TIMELINE ROW
            ============================================== */

            const rows =
              gsap.utils.toArray<HTMLElement>(
                ".journey-item"
              );

            rows.forEach(
              (row) => {
                const date =
                  row.querySelector<HTMLElement>(
                    ".journey-date"
                  );

                const dot =
                  row.querySelector<HTMLElement>(
                    ".journey-dot"
                  );

                const card =
                  row.querySelector<HTMLElement>(
                    ".journey-card"
                  );

                /* CARD RISES */

                if (card) {
                  gsap.fromTo(
                    card,

                    {
                      y: 85,

                      opacity: 0.12,

                      scale: 0.975,
                    },

                    {
                      y: 0,

                      opacity: 1,

                      scale: 1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          row,

                        start:
                          "top 92%",

                        end:
                          "top 63%",

                        scrub:
                          0.7,
                      },
                    }
                  );
                }

                /* DATE */

                if (date) {
                  gsap.fromTo(
                    date,

                    {
                      x: -32,

                      opacity: 0,
                    },

                    {
                      x: 0,

                      opacity: 1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          row,

                        start:
                          "top 90%",

                        end:
                          "top 70%",

                        scrub:
                          0.55,
                      },
                    }
                  );
                }

                /* DOT */

                if (dot) {
                  gsap.fromTo(
                    dot,

                    {
                      scale: 0,

                      opacity: 0,
                    },

                    {
                      scale: 1,

                      opacity: 1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          row,

                        start:
                          "top 80%",

                        end:
                          "top 70%",

                        scrub:
                          0.35,
                      },
                    }
                  );
                }
              }
            );

            /* =============================================
               PROFESSIONAL BULLETS
            ============================================== */

            gsap.fromTo(
              ".experience-point",

              {
                x: 22,

                y: 10,

                opacity: 0,
              },

              {
                x: 0,

                y: 0,

                opacity: 1,

                duration:
                  0.55,

                stagger:
                  0.09,

                ease:
                  "power3.out",

                scrollTrigger: {
                  trigger:
                    ".work-card",

                  start:
                    "top 70%",

                  once: true,
                },
              }
            );

            /* =============================================
               TECH STACK CHIPS
            ============================================== */

            gsap.fromTo(
              ".experience-chip",

              {
                y: 14,

                scale: 0.88,

                opacity: 0,
              },

              {
                y: 0,

                scale: 1,

                opacity: 1,

                duration:
                  0.42,

                stagger:
                  0.045,

                ease:
                  "back.out(1.6)",

                scrollTrigger: {
                  trigger:
                    ".experience-stack",

                  start:
                    "top 90%",

                  once: true,
                },
              }
            );
          }
        );

        /* =================================================
           MOBILE
        ================================================== */

        mm.add(
          "(max-width: 767px) and (prefers-reduced-motion: no-preference)",

          () => {
            /* =============================================
               WHOLE AREA — SMALLER TRAVEL
            ============================================== */

            gsap.fromTo(
              stage,

              {
                y: 90,

                opacity: 0.4,

                scale: 0.99,
              },

              {
                y: 0,

                opacity: 1,

                scale: 1,

                ease: "none",

                scrollTrigger: {
                  trigger:
                    section,

                  start:
                    "top 97%",

                  end:
                    "top 55%",

                  scrub: 0.65,
                },
              }
            );

            /* HEADER */

            gsap.fromTo(
              headerRef.current,

              {
                y: 35,

                opacity: 0,
              },

              {
                y: 0,

                opacity: 1,

                ease: "none",

                scrollTrigger: {
                  trigger:
                    headerRef.current,

                  start:
                    "top 95%",

                  end:
                    "top 75%",

                  scrub:
                    0.45,
                },
              }
            );

            /* BLUE LINE */

            gsap.fromTo(
              progress,

              {
                scaleY: 0,

                transformOrigin:
                  "top center",
              },

              {
                scaleY: 1,

                ease: "none",

                scrollTrigger: {
                  trigger:
                    timeline,

                  start:
                    "top 76%",

                  end:
                    "bottom 72%",

                  scrub:
                    0.6,
                },
              }
            );

            /* ROWS */

            const rows =
              gsap.utils.toArray<HTMLElement>(
                ".journey-item"
              );

            rows.forEach(
              (row) => {
                const card =
                  row.querySelector<HTMLElement>(
                    ".journey-card"
                  );

                const dot =
                  row.querySelector<HTMLElement>(
                    ".journey-dot"
                  );

                if (card) {
                  gsap.fromTo(
                    card,

                    {
                      y: 58,

                      opacity: 0,

                      scale: 0.985,
                    },

                    {
                      y: 0,

                      opacity: 1,

                      scale: 1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          row,

                        start:
                          "top 95%",

                        end:
                          "top 70%",

                        scrub:
                          0.55,
                      },
                    }
                  );
                }

                if (dot) {
                  gsap.fromTo(
                    dot,

                    {
                      scale: 0,

                      opacity: 0,
                    },

                    {
                      scale: 1,

                      opacity: 1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          row,

                        start:
                          "top 88%",

                        end:
                          "top 78%",

                        scrub:
                          0.35,
                      },
                    }
                  );
                }
              }
            );

            /* POINTS */

            gsap.fromTo(
              ".experience-point",

              {
                x: 12,

                opacity: 0,
              },

              {
                x: 0,

                opacity: 1,

                duration:
                  0.4,

                stagger:
                  0.07,

                scrollTrigger: {
                  trigger:
                    ".work-card",

                  start:
                    "top 78%",

                  once: true,
                },
              }
            );

            /* STACK */

            gsap.fromTo(
              ".experience-chip",

              {
                y: 10,

                scale: 0.92,

                opacity: 0,
              },

              {
                y: 0,

                scale: 1,

                opacity: 1,

                duration:
                  0.35,

                stagger:
                  0.035,

                scrollTrigger: {
                  trigger:
                    ".experience-stack",

                  start:
                    "top 94%",

                  once: true,
                },
              }
            );
          }
        );

        /* =================================================
           DOT PULSE
        ================================================== */

        gsap.to(
          ".journey-pulse",

          {
            scale: 1.9,

            opacity: 0,

            duration: 1.8,

            repeat: -1,

            ease:
              "power2.out",
          }
        );

        /* =================================================
           VERY LIGHT GRID PARALLAX
        ================================================== */

        gsap.to(
          ".experience-grid",

          {
            y: 70,

            ease: "none",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top bottom",

              end:
                "bottom top",

              scrub: 1.3,
            },
          }
        );

        return () => {
          mm.revert();
        };
      }, section);

    /*
      Refresh after browser has finished
      calculating responsive heights.
    */

    const refreshTimer =
      window.setTimeout(
        () => {
          ScrollTrigger.refresh();
        },
        150
      );

    return () => {
      window.clearTimeout(
        refreshTimer
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="
        relative

        overflow-x-clip

        bg-[#020b13]

        text-white
      "
    >
      {/* =====================================================
          IMPORTANT:
          NO height:100vh
          NO vertical overflow-hidden
          NO GSAP pinning
      ====================================================== */}

      <div
        ref={stageRef}
        className="
          relative

          w-full

          px-5

          py-[76px]

          will-change-transform

          sm:px-8
          sm:py-[90px]

          md:px-10

          lg:px-12
          lg:py-[110px]

          xl:px-14

          2xl:px-16
      "
      >
        {/* =================================================
            GRID
        ================================================== */}

        <div
          className="
            experience-grid

            pointer-events-none

            absolute

            -inset-y-[100px]

            inset-x-0

            opacity-[0.10]

            [background-image:linear-gradient(rgba(0,117,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(0,117,255,0.13)_1px,transparent_1px)]

            [background-size:64px_64px]
          "
        />

        {/* BLUE GLOW */}

        <div
          className="
            pointer-events-none

            absolute

            right-[-180px]
            top-[4%]

            h-[480px]
            w-[480px]

            rounded-full

            bg-[#0075ff]/[0.05]

            blur-[140px]
          "
        />

        <div
          className="
            pointer-events-none

            absolute

            -left-[200px]
            bottom-[5%]

            h-[420px]
            w-[420px]

            rounded-full

            bg-[#1bbcff]/[0.03]

            blur-[130px]
          "
        />

        {/* =================================================
            MAIN CONTAINER
        ================================================== */}

        <div
          className="
            relative
            z-10

            mx-auto

            w-full

            max-w-[1440px]
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div
            ref={headerRef}
            className="
              mb-[60px]

              sm:mb-[75px]

              md:mb-[90px]

              lg:mb-[100px]
            "
          >
            {/* LABEL */}

            <div
              className="
                mb-5

                flex

                items-center

                gap-2.5
              "
            >
              <div
                className="
                  flex

                  h-[28px]
                  w-[28px]

                  items-center

                  justify-center

                  rounded-[8px]

                  border

                  border-[#0075ff]/30

                  bg-[#0075ff]/10
                "
              >
                <BriefcaseBusiness
                  size={12}

                  className="
                    text-[#31bbff]
                  "
                />
              </div>

              <span
                className="
                  text-[9px]

                  font-bold

                  uppercase

                  tracking-[3.4px]

                  text-[#54caff]
                "
              >
                Experience
              </span>
            </div>

            {/* TITLE AREA */}

            <div
              className="
                flex

                flex-col

                gap-5

                lg:flex-row

                lg:items-center

                lg:justify-between
              "
            >
              <h2
                className="
                  max-w-[700px]

                  text-[34px]

                  font-bold

                  leading-[1.04]

                  tracking-[-1.6px]

                  text-white

                  sm:text-[42px]

                  md:text-[48px]

                  lg:text-[54px]
                "
              >
                Professional{" "}

                <span
                  className="
                    bg-gradient-to-r

                    from-[#59ceff]

                    via-[#20adff]

                    to-[#0075ff]

                    bg-clip-text

                    text-transparent
                  "
                >
                  Journey
                </span>
              </h2>

              <p
                className="
                  max-w-[500px]

                  text-[11px]

                  leading-[1.8]

                  text-[#718fa1]

                  sm:text-[12px]

                  lg:text-right
                "
              >
                A continuous journey
                from academic foundations
                to building responsive,
                scalable and
                production-ready digital
                products.
              </p>
            </div>
          </div>

          {/* =================================================
              CONTINUOUS TIMELINE
          ================================================== */}

          <div
            ref={timelineRef}
            className="
              journey-timeline

              relative
            "
          >
            {/* =================================================
                TIMELINE LINE

                Mobile:
                11px

                md:
                180 + 24 = 204px

                lg:
                210 + 28 = 238px
            ================================================== */}

            <div
              className="
                pointer-events-none

                absolute

                bottom-[40px]

                left-[10px]

                top-[11px]

                w-px

                bg-[#12364b]

                md:left-[204px]

                lg:left-[238px]
              "
            >
              {/* PROGRESS */}

              <div
                ref={progressRef}
                className="
                  absolute

                  inset-0

                  origin-top

                  bg-gradient-to-b

                  from-[#58d0ff]

                  via-[#0085ff]

                  to-[#0057bf]

                  shadow-[0_0_18px_rgba(0,117,255,0.75)]
                "
              />
            </div>

            {/* =================================================
                PROFESSIONAL EXPERIENCE
            ================================================== */}

            <JourneyRow
              date={
                professionalExperience.date
              }

              endDate={
                professionalExperience.endDate
              }

              mobileDate="July 2025 - Present"

              location={
                professionalExperience.location
              }
            >
              <WorkCard />
            </JourneyRow>

            {/* =================================================
                EDUCATION
            ================================================== */}

            {education.map(
              (
                item,
                index
              ) => (
                <JourneyRow
                  key={
                    `${item.title}-${item.date}`
                  }

                  date={
                    item.date
                  }

                  endDate={
                    item.endDate
                  }

                  mobileDate={`${item.date} - ${item.endDate}`}
                >
                  <EducationCard
                    item={
                      item
                    }

                    index={
                      index
                    }
                  />
                </JourneyRow>
              )
            )}
          </div>

          {/* =================================================
              END
          ================================================== */}

          <div
            className="
              mt-4

              flex

              items-center

              justify-center

              gap-3
            "
          >
            <div
              className="
                h-px

                w-[35px]

                bg-gradient-to-r

                from-transparent

                to-[#155075]

                sm:w-[75px]
              "
            />

            <Sparkles
              size={9}

              className="
                text-[#168fdc]
              "
            />

            <span
              className="
                text-center

                text-[7px]

                font-bold

                uppercase

                tracking-[2px]

                text-[#365f76]
              "
            >
              Learning · Building ·
              Growing
            </span>

            <div
              className="
                h-px

                w-[35px]

                bg-gradient-to-l

                from-transparent

                to-[#155075]

                sm:w-[75px]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   JOURNEY ROW
========================================================= */

function JourneyRow({
  date,
  endDate,
  mobileDate,
  location,
  children,
}: {
  date: string;

  endDate: string;

  mobileDate: string;

  location?: string;

  children:
    ReactNode;
}) {
  return (
    <div
      className="
        journey-item

        relative

        grid

        grid-cols-1

        pb-[70px]

        md:grid-cols-[180px_48px_minmax(0,1fr)]

        md:pb-[90px]

        lg:grid-cols-[210px_56px_minmax(0,1fr)]

        lg:pb-[105px]

        last:pb-0
      "
    >
      {/* =================================================
          DESKTOP DATE
      ================================================== */}

      <div
        className="
          journey-date

          hidden

          pt-[8px]

          md:block
        "
      >
        <p
          className="
            text-[13px]

            font-semibold

            text-white
          "
        >
          {date}
        </p>

        <p
          className="
            mt-[4px]

            text-[11px]

            text-[#8195a3]
          "
        >
          {endDate}
        </p>

        {location && (
          <div
            className="
              mt-5

              flex

              items-center

              gap-1.5
            "
          >
            <MapPin
              size={11}

              className="
                text-[#179fff]
              "
            />

            <span
              className="
                text-[9px]

                text-[#607d8e]
              "
            >
              {location}
            </span>
          </div>
        )}
      </div>

      {/* =================================================
          DOT
      ================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          left-[2px]

          top-[6px]

          z-20

          flex

          h-[18px]
          w-[18px]

          items-center

          justify-center

          md:static

          md:mx-auto

          md:mt-[5px]
        "
      >
        <div
          className="
            journey-dot

            relative

            flex

            h-[18px]
            w-[18px]

            items-center

            justify-center
          "
        >
          <span
            className="
              journey-pulse

              absolute

              h-[18px]
              w-[18px]

              rounded-full

              border

              border-[#35bdff]/55
            "
          />

          <span
            className="
              relative

              flex

              h-[14px]
              w-[14px]

              items-center

              justify-center

              rounded-full

              border

              border-[#60d1ff]

              bg-[#0075ff]

              shadow-[0_0_20px_rgba(0,117,255,0.95)]
            "
          >
            <span
              className="
                h-[4px]
                w-[4px]

                rounded-full

                bg-white
              "
            />
          </span>
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================== */}

      <div
        className="
          min-w-0

          pl-[42px]

          md:pl-0
        "
      >
        {/* MOBILE DATE */}

        <div
          className="
            mb-4

            flex

            flex-wrap

            items-center

            gap-x-4

            gap-y-2

            md:hidden
          "
        >
          <div
            className="
              flex

              items-center

              gap-2
            "
          >
            <CalendarDays
              size={12}

              className="
                text-[#31bbff]
              "
            />

            <span
              className="
                text-[10px]

                font-semibold

                text-white
              "
            >
              {mobileDate}
            </span>
          </div>

          {location && (
            <div
              className="
                flex

                items-center

                gap-1.5
              "
            >
              <MapPin
                size={11}

                className="
                  text-[#1ba8ff]
                "
              />

              <span
                className="
                  text-[9px]

                  text-[#708899]
                "
              >
                {location}
              </span>
            </div>
          )}
        </div>

        <div
          className="
            journey-card

            will-change-transform
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WORK CARD
========================================================= */

function WorkCard() {
  return (
    <article
      className="
        work-card

        group

        relative

        overflow-hidden

        rounded-[22px]

        border

        border-[#15425d]/80

        bg-[#061620]/85

        p-5

        shadow-[0_24px_80px_rgba(0,0,0,0.22)]

        backdrop-blur-xl

        transition-all

        duration-500

        hover:-translate-y-[3px]

        hover:border-[#168fdc]/60

        hover:shadow-[0_28px_90px_rgba(0,117,255,0.09)]

        sm:p-6

        lg:p-7
      "
    >
      {/* TOP LIGHT */}

      <div
        className="
          pointer-events-none

          absolute

          left-[7%]
          right-[7%]
          top-0

          h-px

          bg-gradient-to-r

          from-transparent

          via-[#35bdff]/45

          to-transparent
        "
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none

          absolute

          -right-[120px]
          -top-[120px]

          h-[280px]
          w-[280px]

          rounded-full

          bg-[#0075ff]/[0.07]

          blur-[90px]

          transition-all

          duration-700

          group-hover:bg-[#0075ff]/[0.12]
        "
      />

      {/* =================================================
          TOP
      ================================================== */}

      <div
        className="
          relative

          flex

          items-start

          justify-between

          gap-4
        "
      >
        <div>
          {/* STATUS */}

          <div
            className="
              mb-3

              flex

              items-center

              gap-2
            "
          >
            <span
              className="
                relative

                flex

                h-[8px]
                w-[8px]
              "
            >
              <span
                className="
                  absolute

                  h-full
                  w-full

                  animate-ping

                  rounded-full

                  bg-[#00ddb0]

                  opacity-40
                "
              />

              <span
                className="
                  relative

                  h-[8px]
                  w-[8px]

                  rounded-full

                  bg-[#00ddb0]
                "
              />
            </span>

            <span
              className="
                text-[7px]

                font-bold

                uppercase

                tracking-[1.8px]

                text-[#65aa9f]
              "
            >
              Current Role
            </span>
          </div>

          {/* TITLE */}

          <h3
            className="
              text-[18px]

              font-semibold

              tracking-[-0.45px]

              text-white

              sm:text-[21px]
            "
          >
            {
              professionalExperience.role
            }
          </h3>

          <p
            className="
              mt-1

              text-[11px]

              font-semibold

              text-[#34baff]

              sm:text-[12px]
            "
          >
            {
              professionalExperience.company
            }
          </p>
        </div>

        {/* ICON */}

        <div
          className="
            flex

            h-[46px]
            w-[46px]

            shrink-0

            items-center

            justify-center

            rounded-[13px]

            border

            border-[#0075ff]/25

            bg-[#0075ff]/10

            text-[#2fbaff]

            transition-all

            duration-500

            group-hover:rotate-[6deg]

            group-hover:scale-110
          "
        >
          <BriefcaseBusiness
            size={19}
          />
        </div>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          relative

          mt-6

          max-w-[950px]

          text-[10px]

          leading-[1.75]

          text-[#8196a4]

          sm:text-[11px]
        "
      >
        {
          professionalExperience.description
        }
      </p>

      {/* DIVIDER */}

      <div
        className="
          relative

          my-6

          h-px

          bg-gradient-to-r

          from-[#1a465e]

          via-[#15394d]/60

          to-transparent
        "
      />

      {/* =================================================
          POINTS
      ================================================== */}

      <div
        className="
          relative

          space-y-3
        "
      >
        {professionalExperience.highlights.map(
          (
            item,
            index
          ) => (
            <div
              key={
                item
              }
              className="
                experience-point

                group/point

                flex

                items-start

                gap-3
              "
            >
              <div
                className="
                  mt-[1px]

                  flex

                  h-[20px]
                  w-[20px]

                  shrink-0

                  items-center

                  justify-center

                  rounded-[6px]

                  border

                  border-[#0075ff]/30

                  bg-[#0075ff]/10

                  transition-all

                  group-hover/point:border-[#36bdff]/55

                  group-hover/point:bg-[#0075ff]/20
                "
              >
                <Check
                  size={10}

                  strokeWidth={
                    3
                  }

                  className="
                    text-[#3cc3ff]
                  "
                />
              </div>

              <p
                className="
                  max-w-[950px]

                  text-[10px]

                  leading-[1.65]

                  text-[#a1b0ba]

                  transition-colors

                  group-hover/point:text-[#d7dfe4]

                  sm:text-[11px]
                "
              >
                {item}
              </p>

              <span
                className="
                  ml-auto

                  hidden

                  shrink-0

                  pt-[3px]

                  text-[7px]

                  tracking-[1px]

                  text-[#24516a]

                  sm:block
                "
              >
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </span>
            </div>
          )
        )}
      </div>

      {/* =================================================
          STACK
      ================================================== */}

      <div
        className="
          experience-stack

          relative

          mt-7

          flex

          flex-wrap

          items-center

          gap-2
        "
      >
        <div
          className="
            mr-1

            flex

            items-center

            gap-1.5
          "
        >
          <Code2
            size={12}

            className="
              text-[#39bfff]
            "
          />

          <span
            className="
              text-[7px]

              font-bold

              uppercase

              tracking-[1.6px]

              text-[#53778c]
            "
          >
            Tech Stack
          </span>
        </div>

        {professionalExperience.stack.map(
          (item) => (
            <span
              key={
                item
              }
              className="
                experience-chip

                rounded-full

                border

                border-[#164158]

                bg-[#03111a]/75

                px-3

                py-[6px]

                text-[8px]

                font-medium

                text-[#83a3b5]

                transition-all

                duration-300

                hover:-translate-y-[2px]

                hover:border-[#168fdc]/65

                hover:bg-[#0075ff]/10

                hover:text-[#4fc8ff]

                sm:text-[9px]
              "
            >
              {item}
            </span>
          )
        )}
      </div>
    </article>
  );
}

/* =========================================================
   EDUCATION CARD
========================================================= */

function EducationCard({
  item,
  index,
}: {
  item: {
    title:
      string;

    institution:
      string;

    label:
      string;

    result:
      string;
  };

  index:
    number;
}) {
  return (
    <article
      className="
        group

        relative

        overflow-hidden

        rounded-[19px]

        border

        border-[#143b51]/75

        bg-[#06141d]/75

        p-5

        shadow-[0_18px_55px_rgba(0,0,0,0.18)]

        backdrop-blur-xl

        transition-all

        duration-500

        hover:-translate-y-[3px]

        hover:border-[#168fdc]/55

        hover:shadow-[0_24px_75px_rgba(0,117,255,0.08)]

        sm:p-6
      "
    >
      {/* TOP LIGHT */}

      <div
        className="
          pointer-events-none

          absolute

          left-[8%]
          right-[8%]
          top-0

          h-px

          bg-gradient-to-r

          from-transparent

          via-[#38beff]/30

          to-transparent
        "
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none

          absolute

          -right-[90px]
          -top-[90px]

          h-[210px]
          w-[210px]

          rounded-full

          bg-[#0075ff]/[0.055]

          blur-[80px]

          transition-all

          duration-500

          group-hover:bg-[#0075ff]/[0.10]
        "
      />

      <div
        className="
          relative

          flex

          flex-col

          gap-5

          sm:flex-row

          sm:items-center

          sm:justify-between
        "
      >
        {/* LEFT */}

        <div
          className="
            flex

            min-w-0

            items-start

            gap-4
          "
        >
          <div
            className="
              flex

              h-[44px]
              w-[44px]

              shrink-0

              items-center

              justify-center

              rounded-[12px]

              border

              border-[#0075ff]/22

              bg-[#0075ff]/10

              text-[#32bbff]

              transition-all

              duration-500

              group-hover:rotate-[6deg]

              group-hover:scale-110
            "
          >
            {index === 0 ? (
              <GraduationCap
                size={20}
              />
            ) : (
              <School
                size={18}
              />
            )}
          </div>

          <div
            className="
              min-w-0
            "
          >
            <span
              className="
                text-[7px]

                font-bold

                uppercase

                tracking-[1.8px]

                text-[#547c92]
              "
            >
              {
                item.label
              }
            </span>

            <h3
              className="
                mt-[5px]

                text-[15px]

                font-semibold

                leading-[1.35]

                tracking-[-0.3px]

                text-white

                sm:text-[17px]

                lg:text-[18px]
              "
            >
              {
                item.title
              }
            </h3>

            <p
              className="
                mt-[5px]

                max-w-[690px]

                text-[10px]

                leading-[1.6]

                text-[#36b8fa]

                sm:text-[11px]
              "
            >
              {
                item.institution
              }
            </p>
          </div>
        </div>

        {/* RESULT */}

        <div
          className="
            shrink-0

            border-t

            border-[#15384b]/60

            pt-4

            sm:border-0

            sm:pt-0
          "
        >
          <div
            className="
              inline-flex

              rounded-full

              border

              border-[#0075ff]/25

              bg-[#0075ff]/10

              px-4

              py-[7px]

              text-[9px]

              font-semibold

              text-[#51c8ff]

              transition-all

              group-hover:border-[#32bcff]/45

              group-hover:bg-[#0075ff]/15

              sm:text-[10px]
            "
          >
            {
              item.result
            }
          </div>
        </div>
      </div>
    </article>
  );
}