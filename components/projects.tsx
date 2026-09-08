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
  ArrowRight,
  ArrowUpRight,
  FolderKanban,
  Sparkles,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Project = {
  id: number;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
};

/* =========================================================
   PROJECT ARRAY
========================================================= */

const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "Royal Dutch Medical Centre",
    category: "Healthcare Platform",
    description:
      "Modern healthcare platform with responsive interfaces, appointment experiences and integrated digital workflows.",
    image: "/images/projects/royal-dutch.png",
    url: "https://royal-dutch.vercel.app/",
    technologies: [
      "Next.js",
      "FastAPI",
      "MySQL",
      "Typescript",
    ],
  },

  {
    id: 2,
    number: "02",
    title: "Dev Apartments",
    category: "Real Estate",
    description:
      "Premium real estate website with responsive layouts, animated property experiences and modern user interactions.",
    image: "/images/projects/dev-apartments.png",
    url: "https://www.devappartments.com/",
    technologies: [
      "Next.js",
      "Typescript",
      "Tailwind CSS",
    ],
  },

  {
    id: 3,
    number: "03",
    title: "SPARRC",
    category: "Sports Medicine",
    description:
      "Responsive sports medicine platform with strong content hierarchy, modern layouts and mobile-first experiences.",
    image: "/images/projects/sparrc.png",
    url: "https://sparrc-website.vercel.app/",
    technologies: [
      "Next.js",
      "Typescript",
      "Tailwind CSS",
      "Mobile App Design "
    ],
  },

  {
    id: 4,
    number: "04",
    title: "Apex TMT",
    category: "Corporate Website",
    description:
      "Corporate product website with structured storytelling, premium interactions and smooth GSAP-driven experiences.",
    image: "/images/projects/apex-tmt.png",
    url: "https://apextmt.com/",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "GSAP",
    ],
  },
];

/* =========================================================
   PROJECTS
========================================================= */

export default function Projects() {
  const [showAll, setShowAll] =
    useState(false);

  const [
    activeSlide,
    setActiveSlide,
  ] = useState(0);

  const [
    isMobile,
    setIsMobile,
  ] = useState(false);

  const [
    paused,
    setPaused,
  ] = useState(false);

  const carouselRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const cardRefs =
    useRef<
      Array<HTMLDivElement | null>
    >([]);

  /* =======================================================
     DEFAULT 3 PROJECTS
  ======================================================== */

  const visibleProjects =
    showAll
      ? projects
      : projects.slice(0, 3);

  /* =======================================================
     MOBILE DETECTION
  ======================================================== */

  useEffect(() => {
    const media =
      window.matchMedia(
        "(max-width: 767px)"
      );

    const handleChange = () => {
      setIsMobile(
        media.matches
      );
    };

    handleChange();

    media.addEventListener(
      "change",
      handleChange
    );

    return () => {
      media.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  /* =======================================================
     RESET CAROUSEL
  ======================================================== */

  useEffect(() => {
    setActiveSlide(0);

    cardRefs.current =
      cardRefs.current.slice(
        0,
        visibleProjects.length
      );

    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, [
    showAll,
    visibleProjects.length,
  ]);

  /* =======================================================
     GO TO MOBILE SLIDE
  ======================================================== */

  const goToSlide = (
    index: number
  ) => {
    const carousel =
      carouselRef.current;

    const card =
      cardRefs.current[index];

    if (
      !carousel ||
      !card
    ) {
      return;
    }

    const target =
      card.offsetLeft -
      (carousel.clientWidth -
        card.clientWidth) /
        2;

    carousel.scrollTo({
      left: Math.max(
        0,
        target
      ),

      behavior: "smooth",
    });

    setActiveSlide(index);
  };

  /* =======================================================
     AUTO SLIDE MOBILE
  ======================================================== */

  useEffect(() => {
    if (
      !isMobile ||
      paused ||
      visibleProjects.length <= 1
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setActiveSlide(
          (current) => {
            const next =
              (current + 1) %
              visibleProjects.length;

            const carousel =
              carouselRef.current;

            const card =
              cardRefs.current[
                next
              ];

            if (
              carousel &&
              card
            ) {
              const target =
                card.offsetLeft -
                (carousel.clientWidth -
                  card.clientWidth) /
                  2;

              carousel.scrollTo({
                left: Math.max(
                  0,
                  target
                ),

                behavior:
                  "smooth",
              });
            }

            return next;
          }
        );
      }, 3500);

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [
    isMobile,
    paused,
    visibleProjects.length,
  ]);

  /* =======================================================
     MANUAL CAROUSEL DETECTION
  ======================================================== */

  const handleScroll = () => {
    if (
      !isMobile ||
      !carouselRef.current
    ) {
      return;
    }

    const carousel =
      carouselRef.current;

    const carouselCenter =
      carousel.scrollLeft +
      carousel.clientWidth / 2;

    let nearestIndex = 0;
    let nearestDistance =
      Infinity;

    cardRefs.current.forEach(
      (card, index) => {
        if (!card) {
          return;
        }

        const cardCenter =
          card.offsetLeft +
          card.clientWidth / 2;

        const distance =
          Math.abs(
            carouselCenter -
              cardCenter
          );

        if (
          distance <
          nearestDistance
        ) {
          nearestDistance =
            distance;

          nearestIndex =
            index;
        }
      }
    );

    setActiveSlide(
      nearestIndex
    );
  };

  return (
    <section
      id="projects"
      className="
        relative
        overflow-x-clip
        bg-[#020b13]
        px-5
        py-[78px]
        text-white

        sm:px-8
        sm:py-[92px]

        md:px-10

        lg:px-12
        lg:py-[110px]

        xl:px-14

        2xl:px-16
      "
    >
      {/* =====================================================
          BACKGROUND GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.09]

          [background-image:linear-gradient(rgba(0,117,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,117,255,0.12)_1px,transparent_1px)]

          [background-size:64px_64px]
        "
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          top-[5%]
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#0075ff]/[0.06]
          blur-[140px]
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1440px]
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.75,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mb-9
            flex
            flex-col
            gap-5

            md:mb-12

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            {/* LABEL */}

            <div
              className="
                mb-3
                flex
                items-center
                gap-2.5
              "
            >
              <div
                className="
                  flex
                  h-[27px]
                  w-[27px]
                  items-center
                  justify-center
                  rounded-[8px]
                  border
                  border-[#0075ff]/25
                  bg-[#0075ff]/10
                "
              >
                <FolderKanban
                  size={12}
                  className="
                    text-[#35bdff]
                  "
                />
              </div>

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[3.2px]
                  text-[#55c9ff]
                "
              >
                Featured Projects
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                text-[31px]
                font-bold
                leading-[1.08]
                tracking-[-1.3px]

                sm:text-[36px]

                md:text-[40px]

                lg:text-[44px]
              "
            >
              Selected{" "}

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
                Showcase
              </span>
            </h2>
          </div>
        </motion.div>

        {/* ===================================================
            TABLET / DESKTOP GRID
        ==================================================== */}

        <motion.div
          layout
          className="
            hidden
            grid-cols-2
            gap-5

            md:grid

            lg:grid-cols-3
            lg:gap-6
          "
        >
          <AnimatePresence
            mode="popLayout"
          >
            {visibleProjects.map(
              (
                project,
                index
              ) => (
                <ProjectCard
                  key={
                    project.id
                  }
                  project={
                    project
                  }
                  index={
                    index
                  }
                />
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===================================================
            MOBILE AUTO CAROUSEL
        ==================================================== */}

        <div
          className="
            md:hidden
          "
        >
          <div
            ref={carouselRef}
            onScroll={
              handleScroll
            }
            onPointerDown={() =>
              setPaused(true)
            }
            onPointerUp={() => {
              window.setTimeout(
                () => {
                  setPaused(
                    false
                  );
                },
                1000
              );
            }}
            onPointerCancel={() =>
              setPaused(false)
            }
            className="
              relative
              -mx-5
              flex
              snap-x
              snap-mandatory
              gap-4
              overflow-x-auto
              scroll-smooth
              px-5
              pb-4
              overscroll-x-contain

              [scrollbar-width:none]

              [&::-webkit-scrollbar]:hidden
            "
          >
            {visibleProjects.map(
              (
                project,
                index
              ) => (
                <div
                  key={
                    project.id
                  }
                  ref={(
                    element
                  ) => {
                    cardRefs.current[
                      index
                    ] =
                      element;
                  }}
                  className="
                    w-[88%]
                    shrink-0
                    snap-center

                    xs:w-[84%]

                    sm:w-[76%]
                  "
                >
                  <ProjectCard
                    project={
                      project
                    }
                    index={
                      index
                    }
                    mobile
                  />
                </div>
              )
            )}
          </div>

          {/* =================================================
              MOBILE INDICATORS
          ================================================== */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {visibleProjects.map(
              (
                project,
                index
              ) => (
                <button
                  key={
                    project.id
                  }
                  type="button"
                  aria-label={`View ${project.title}`}
                  onClick={() =>
                    goToSlide(
                      index
                    )
                  }
                  className={`
                    relative
                    h-[6px]
                    cursor-pointer
                    overflow-hidden
                    rounded-full
                    transition-all
                    duration-500

                    ${
                      activeSlide ===
                      index
                        ? `
                          w-[30px]
                          bg-[#123e59]
                        `
                        : `
                          w-[6px]
                          bg-[#294b5d]
                        `
                    }
                  `}
                >
                  {activeSlide ===
                    index && (
                    <motion.span
                      key={`${activeSlide}-${showAll}`}
                      initial={{
                        scaleX: 0,
                      }}
                      animate={{
                        scaleX: 1,
                      }}
                      transition={{
                        duration: 3.5,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        inset-0
                        origin-left
                        bg-gradient-to-r
                        from-[#5bd1ff]
                        to-[#0075ff]
                      "
                    />
                  )}
                </button>
              )
            )}
          </div>
        </div>

        {/* ===================================================
            VIEW ALL
        ==================================================== */}

        {projects.length > 3 && (
          <motion.div
            layout
            className="
              mt-10
              flex
              justify-center

              sm:mt-12
            "
          >
            <motion.button
              type="button"
              onClick={() =>
                setShowAll(
                  (current) =>
                    !current
                )
              }
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                relative
                flex
                h-[46px]
                cursor-pointer
                items-center
                justify-center
                gap-2.5
                overflow-hidden
                rounded-full
                border
                border-[#168fdc]/45
                bg-[#061620]
                px-6
                text-[9px]
                font-semibold
                text-[#48c3ff]
                shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                transition-all
                duration-300

                hover:border-[#35bdff]/70
                hover:text-white
                hover:shadow-[0_16px_45px_rgba(0,117,255,0.16)]
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  origin-left
                  scale-x-0
                  bg-gradient-to-r
                  from-[#24b8ff]
                  to-[#0075ff]
                  transition-transform
                  duration-500

                  group-hover:scale-x-100
                "
              />

              <span
                className="
                  relative
                  z-10
                "
              >
                {showAll
                  ? "Show Featured Projects"
                  : "View All Projects"}
              </span>

              <ArrowRight
                size={13}
                className={`
                  relative
                  z-10
                  transition-transform
                  duration-300

                  ${
                    showAll
                      ? "rotate-180"
                      : "group-hover:translate-x-1"
                  }
                `}
              />
            </motion.button>
          </motion.div>
        )}

        {/* ===================================================
            BOTTOM LABEL
        ==================================================== */}

        <div
          className="
            mt-12
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
              tracking-[2.1px]
              text-[#365f76]
            "
          >
            Real Projects · Real Impact
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
    </section>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
  mobile = false,
}: {
  project: Project;
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.article
      layout={
        !mobile
      }
      initial={{
        opacity: 0,
        y: 42,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.65,
        delay: Math.min(
          index * 0.08,
          0.24
        ),
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-[#143b51]/80
        bg-[#06151f]/85
        shadow-[0_20px_60px_rgba(0,0,0,0.20)]
        backdrop-blur-xl
        transition-all
        duration-500

        hover:-translate-y-[5px]
        hover:border-[#168fdc]/60
        hover:shadow-[0_28px_85px_rgba(0,117,255,0.11)]
      "
    >
      {/* =====================================================
          FULL IMAGE PREVIEW
      ====================================================== */}

      <a
        href={
          project.url
        }
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="
          block
          cursor-pointer
        "
      >
        <div
          className="
            relative
            flex
            aspect-[16/10]
            w-full
            items-center
            justify-center
            overflow-hidden
            border-b
            border-[#14384d]/70
            bg-[#071722]

            sm:aspect-[16/9]
          "
        >
          {/* =================================================
              IMPORTANT CHANGE

              object-contain = NO CROPPING
          ================================================== */}

          <img
            src={
              project.image
            }
            alt={`${project.title} website preview`}
            loading={
              index === 0
                ? "eager"
                : "lazy"
            }
            decoding="async"
            className="
              h-full
              w-full
              object-contain
              object-center
              transition-transform
              duration-700
              ease-out

              group-hover:scale-[1.025]
            "
          />

          {/* SOFT DARK GRADIENT */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-[#03101a]/25
              via-transparent
              to-transparent
            "
          />

          {/* BLUE HOVER OVERLAY */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#0075ff]/0
              transition-colors
              duration-500

              group-hover:bg-[#0075ff]/[0.025]
            "
          />

          {/* NUMBER */}

          <span
            className="
              absolute
              right-3
              top-3
              z-20
              rounded-full
              border
              border-white/10
              bg-[#03111a]/85
              px-2.5
              py-[5px]
              text-[7px]
              font-semibold
              tracking-[1px]
              text-white/70
              backdrop-blur-xl
            "
          >
            {project.number}
          </span>

          {/* VIEW ICON */}

          <div
            className="
              absolute
              bottom-3
              right-3
              z-20
              flex
              h-[36px]
              w-[36px]
              translate-y-2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-[#03111a]/90
              text-white
              opacity-0
              backdrop-blur-xl
              transition-all
              duration-300

              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <ArrowUpRight
              size={14}
            />
          </div>

          {/* SHIMMER */}

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-[-60%]
              w-[40%]
              skew-x-[-20deg]
              bg-gradient-to-r
              from-transparent
              via-white/[0.07]
              to-transparent
              transition-all
              duration-1000

              group-hover:left-[130%]
            "
          />
        </div>
      </a>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-5
        "
      >
        {/* CATEGORY */}

        <div
          className="
            mb-2
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-[5px]
              w-[5px]
              rounded-full
              bg-[#32bdff]
              shadow-[0_0_10px_rgba(50,189,255,0.75)]
            "
          />

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[1.5px]
              text-[#54788d]
            "
          >
            {project.category}
          </span>
        </div>

        {/* TITLE */}

        <h3
          className="
            text-[15px]
            font-semibold
            leading-[1.35]
            tracking-[-0.3px]
            text-white
            transition-colors
            duration-300

            group-hover:text-[#48c5ff]

            sm:text-[16px]
          "
        >
          {project.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            line-clamp-3
            text-[9px]
            leading-[1.7]
            text-[#8296a3]

            sm:text-[10px]
          "
        >
          {project.description}
        </p>

        {/* TECHNOLOGIES */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-1.5
          "
        >
          {project.technologies.map(
            (
              technology
            ) => (
              <span
                key={
                  technology
                }
                className="
                  rounded-full
                  border
                  border-[#153c52]
                  bg-[#03111a]/70
                  px-2.5
                  py-[5px]
                  text-[7px]
                  font-medium
                  text-[#7999ab]
                  transition-all
                  duration-300

                  hover:border-[#168fdc]/50
                  hover:bg-[#0075ff]/10
                  hover:text-[#41c0ff]
                "
              >
                {technology}
              </span>
            )
          )}
        </div>

        {/* VIEW PROJECT */}

        <div
          className="
            mt-auto
            pt-5
          "
        >
          <a
            href={
              project.url
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/link
              inline-flex
              cursor-pointer
              items-center
              gap-2
              text-[9px]
              font-semibold
              text-[#38baff]
              transition-colors
              duration-300

              hover:text-white
            "
          >
            View Project

            <ArrowUpRight
              size={12}
              className="
                transition-transform
                duration-300

                group-hover/link:translate-x-1
                group-hover/link:-translate-y-1
              "
            />
          </a>
        </div>
      </div>

      {/* BOTTOM BLUE LINE */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-gradient-to-r
          from-[#22c0ff]
          to-[#0075ff]
          transition-all
          duration-500

          group-hover:w-full
        "
      />
    </motion.article>
  );
}