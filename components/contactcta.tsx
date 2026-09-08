"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ToastState = {
  type:
    | "success"
    | "error";

  title: string;

  message: string;
} | null;

/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

/* =========================================================
   COMPONENT
========================================================= */

export default function ContactCTA() {
  const reduceMotion =
    useReducedMotion();

  const [
    modalOpen,
    setModalOpen,
  ] =
    useState(false);

  const [
    form,
    setForm,
  ] =
    useState<ContactForm>(
      initialForm
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    toast,
    setToast,
  ] =
    useState<ToastState>(
      null
    );

  /* =======================================================
     MODAL SCROLL LOCK
  ======================================================== */

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    const oldOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    const closeEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setModalOpen(
          false
        );
      }
    };

    window.addEventListener(
      "keydown",
      closeEscape
    );

    return () => {
      document.body.style.overflow =
        oldOverflow;

      window.removeEventListener(
        "keydown",
        closeEscape
      );
    };
  }, [modalOpen]);

  /* =======================================================
     TOAST AUTO CLOSE
  ======================================================== */

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          setToast(
            null
          );
        },
        4000
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [toast]);

  /* =======================================================
     UPDATE FIELD
  ======================================================== */

  const updateField = (
    field:
      keyof ContactForm,

    value: string
  ) => {
    setForm(
      (previous) => ({
        ...previous,

        [field]:
          value,
      })
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================== */

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      const name =
        form.name.trim();

      const email =
        form.email.trim();

      const phone =
        form.phone.trim();

      const message =
        form.message.trim();

      /* ===================================================
         REQUIRED
      ==================================================== */

      if (
        !name ||
        !email ||
        !phone ||
        !message
      ) {
        setToast({
          type:
            "error",

          title:
            "Incomplete form",

          message:
            "Please fill all fields before sending.",
        });

        return;
      }

      /* ===================================================
         EMAIL
      ==================================================== */

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email
        )
      ) {
        setToast({
          type:
            "error",

          title:
            "Invalid email",

          message:
            "Please enter a valid email address.",
        });

        return;
      }

      /* ===================================================
         PHONE
      ==================================================== */

      if (
        !/^[0-9+\-\s()]{7,20}$/.test(
          phone
        )
      ) {
        setToast({
          type:
            "error",

          title:
            "Invalid phone",

          message:
            "Please enter a valid phone number.",
        });

        return;
      }

      try {
        setLoading(
          true
        );

        /* ===============================================
           NEXT.JS API
        =============================================== */

        const response =
          await fetch(
            "/api/contact",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  name,
                  email,
                  phone,
                  message,

                  pageUrl:
                    window
                      .location
                      .href,
                }),
            }
          );

        const data:
          {
            success?:
              boolean;

            message?:
              string;
          } =
          await response.json();

        /* ===============================================
           REAL FAILURE
        =============================================== */

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Unable to send message."
          );
        }

        /* ===============================================
           REAL SUCCESS
        =============================================== */

        setForm(
          initialForm
        );

        setModalOpen(
          false
        );

        setToast({
          type:
            "success",

          title:
            "Message sent successfully",

          message:
            "Thanks for reaching out! I’ll get back to you soon.",
        });

      } catch (error) {
        console.error(
          "Contact form error:",
          error
        );

        setToast({
          type:
            "error",

          title:
            "Message not sent",

          message:
            error instanceof
            Error
              ? error.message
              : "Something went wrong. Please try again.",
        });

      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <>
      {/* =====================================================
          CONTACT CTA
      ====================================================== */}

      <section
        id="contact"
        className="
          relative
          isolate

          min-h-[430px]

          overflow-hidden

          bg-[#020a12]

          text-white

          sm:min-h-[470px]

          lg:min-h-[500px]
        "
      >
        {/* MOBILE BACKGROUND */}

        <div
          className="
            absolute
            inset-0

            bg-[url('/images/contact-cta-mobile.png')]

            bg-cover
            bg-center
            bg-no-repeat

            md:hidden
          "
        />

        {/* DESKTOP BACKGROUND */}

        <div
          className="
            absolute
            inset-0

            hidden

            bg-[url('/images/contact-cta-desktop.png')]

            bg-cover
            bg-center
            bg-no-repeat

            md:block
          "
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r

            from-[#020a12]/95
            via-[#020a12]/60
            to-[#020a12]/10

            md:from-[#020a12]/88
            md:via-[#020a12]/35
            md:to-transparent
          "
        />

        {/* MOBILE BOTTOM FADE */}

        <div
          className="
            absolute

            inset-x-0
            bottom-0

            h-[60%]

            bg-gradient-to-t

            from-[#020a12]

            to-transparent

            md:hidden
          "
        />

        {/* BLUE GLOW */}

        {!reduceMotion && (
          <motion.div
            animate={{
              opacity: [
                0.15,
                0.35,
                0.15,
              ],

              scale: [
                1,
                1.1,
                1,
              ],
            }}
            transition={{
              duration: 8,

              repeat:
                Infinity,

              ease:
                "easeInOut",
            }}
            className="
              pointer-events-none

              absolute

              left-[10%]
              top-[15%]

              h-[300px]
              w-[300px]

              rounded-full

              bg-[#0075ff]/10

              blur-[110px]
            "
          />
        )}

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            mx-auto

            flex

            min-h-[430px]

            w-full
            max-w-[1440px]

            items-center

            px-5
            py-14

            sm:min-h-[470px]
            sm:px-8

            md:px-10

            lg:min-h-[500px]
            lg:px-12

            xl:px-14

            2xl:px-16
          "
        >
          <motion.div
            initial={{
              opacity: 0,

              y: 30,
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
              duration: 0.8,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              w-full
              max-w-[510px]
            "
          >
            {/* LABEL */}

            <motion.div
              initial={{
                opacity: 0,

                x: -12,
              }}
              whileInView={{
                opacity: 1,

                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,

                delay: 0.1,
              }}
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
                        rotate: [
                          0,
                          8,
                          -8,
                          0,
                        ],
                      }
                }
                transition={{
                  duration: 4,

                  repeat:
                    Infinity,

                  ease:
                    "easeInOut",
                }}
              >
                <Sparkles
                  size={12}

                  className="
                    text-[#50c8ff]
                  "
                />
              </motion.div>

              <span
                className="
                  text-[9px]

                  font-bold

                  uppercase

                  tracking-[3px]

                  text-[#76cfff]
                "
              >
                Let&apos;s Connect
              </span>
            </motion.div>

            {/* HEADING */}

            <motion.h2
              initial={{
                opacity: 0,

                y: 18,
              }}
              whileInView={{
                opacity: 1,

                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.75,

                delay: 0.16,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                text-[34px]

                font-bold

                leading-[1.06]

                tracking-[-1.4px]

                sm:text-[42px]

                lg:text-[47px]
              "
            >
              <span className="block">
                Let&apos;s Build
                Something
              </span>

              <span
                className="
                  block
                  w-fit

                  pb-[10px]

                  bg-gradient-to-r

                  from-[#61d1ff]

                  via-[#1ba5ff]

                  to-[#0075ff]

                  bg-clip-text

                  text-transparent
                "
              >
                Amazing
              </span>

              <span className="block">
                Together!
              </span>
            </motion.h2>

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,

                y: 12,
              }}
              whileInView={{
                opacity: 1,

                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,

                delay: 0.27,
              }}
              className="
                mt-5

                max-w-[430px]

                text-[12px]

                leading-[1.8]

                text-[#b3c3cd]

                sm:text-[13px]
              "
            >
              Have a project in mind or
              want to collaborate?
              I&apos;m always open to new
              opportunities and exciting
              ideas.
            </motion.p>

            {/* =================================================
                PREMIUM GET IN TOUCH
            ================================================== */}

            <motion.button
              type="button"

              onClick={() =>
                setModalOpen(
                  true
                )
              }

              whileHover={{
                y: -5,

                scale: 1.035,
              }}

              whileTap={{
                y: -1,

                scale: 0.97,
              }}

              transition={{
                type:
                  "spring",

                stiffness:
                  320,

                damping:
                  20,
              }}

              className="
                group
                relative

                mt-7

                flex

                h-[48px]

                min-w-[155px]

                cursor-pointer

                items-center

                justify-center

                gap-3

                overflow-hidden

                rounded-full

                border

                border-white/70

                bg-white

                px-6

                text-[11px]

                font-semibold

                text-[#06131d]

                shadow-[0_15px_40px_rgba(0,0,0,0.25)]

                transition-shadow

                duration-300

                hover:shadow-[0_18px_48px_rgba(0,117,255,0.32)]
              "
            >
              {/* BLUE FILL */}

              <span
                className="
                  absolute
                  inset-0

                  origin-left

                  scale-x-0

                  bg-gradient-to-r

                  from-[#32bdff]

                  via-[#149fff]

                  to-[#0075ff]

                  transition-transform

                  duration-500

                  ease-out

                  group-hover:scale-x-100
                "
              />

              {/* SHINE */}

              <span
                className="
                  absolute

                  inset-y-0

                  left-[-45%]

                  w-[35%]

                  skew-x-[-22deg]

                  bg-gradient-to-r

                  from-transparent

                  via-white/40

                  to-transparent

                  transition-all

                  duration-700

                  group-hover:left-[120%]
                "
              />

              <span
                className="
                  relative
                  z-10

                  transition-colors

                  duration-300

                  group-hover:text-white
                "
              >
                Get In Touch
              </span>

              <ArrowRight
                size={15}

                className="
                  relative
                  z-10

                  transition-all

                  duration-300

                  group-hover:translate-x-1

                  group-hover:text-white
                "
              />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}

      <AnimatePresence>
        {modalOpen && (
          <ContactModal
            form={form}

            loading={
              loading
            }

            onChange={
              updateField
            }

            onSubmit={
              handleSubmit
            }

            onClose={() =>
              setModalOpen(
                false
              )
            }
          />
        )}
      </AnimatePresence>

      {/* TOAST */}

      <AnimatePresence>
        {toast && (
          <Toast
            toast={
              toast
            }

            onClose={() =>
              setToast(
                null
              )
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   CONTACT MODAL
========================================================= */

function ContactModal({
  form,
  loading,
  onChange,
  onSubmit,
  onClose,
}: {
  form:
    ContactForm;

  loading:
    boolean;

  onChange: (
    field:
      keyof ContactForm,

    value:
      string
  ) => void;

  onSubmit: (
    event:
      FormEvent<HTMLFormElement>
  ) => void;

  onClose:
    () => void;
}) {
  return (
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
        duration: 0.22,
      }}
      onMouseDown={(
        event
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
      className="
        fixed
        inset-0

        z-[999]

        flex

        items-center

        justify-center

        overflow-y-auto

        bg-[#01070c]/85

        p-4

        backdrop-blur-[12px]
      "
    >
      <motion.div
        initial={{
          opacity: 0,

          scale: 0.92,

          y: 25,
        }}
        animate={{
          opacity: 1,

          scale: 1,

          y: 0,
        }}
        exit={{
          opacity: 0,

          scale: 0.95,

          y: 15,
        }}
        transition={{
          type:
            "spring",

          stiffness:
            240,

          damping:
            25,
        }}
        className="
          relative

          my-auto

          w-full

          max-w-[500px]

          overflow-hidden

          rounded-[24px]

          border

          border-[#194963]/60

          bg-[#06141e]/95

          shadow-[0_35px_110px_rgba(0,0,0,0.65)]

          backdrop-blur-2xl
        "
      >
        {/* TOP LINE */}

        <div
          className="
            absolute

            inset-x-[12%]

            top-0

            h-[1px]

            bg-gradient-to-r

            from-transparent

            via-[#4bc8ff]

            to-transparent
          "
        />

        {/* HEADER */}

        <div
          className="
            flex

            items-start

            justify-between

            gap-4

            border-b

            border-white/[0.05]

            px-5

            py-5

            sm:px-6
          "
        >
          <div>
            <div
              className="
                mb-2

                flex

                items-center

                gap-2
              "
            >
              <Sparkles
                size={11}

                className="
                  text-[#3bbcff]
                "
              />

              <span
                className="
                  text-[8px]

                  font-bold

                  uppercase

                  tracking-[2px]

                  text-[#5a8ba4]
                "
              >
                Start a conversation
              </span>
            </div>

            <h3
              className="
                text-[22px]

                font-bold

                text-white

                sm:text-[25px]
              "
            >
              Tell me about your project.
            </h3>

            <p
              className="
                mt-2

                text-[10px]

                text-[#738b99]
              "
            >
              Fill the details and
              I&apos;ll get back to you.
            </p>
          </div>

          {/* CLOSE */}

          <motion.button
            type="button"

            onClick={
              onClose
            }

            whileHover={{
              rotate: 90,

              scale: 1.06,
            }}

            whileTap={{
              scale: 0.92,
            }}

            aria-label="Close"

            className="
              flex

              h-9
              w-9

              shrink-0

              cursor-pointer

              items-center

              justify-center

              rounded-xl

              border

              border-white/[0.07]

              bg-white/[0.025]

              text-[#899eac]

              transition-colors

              hover:bg-white/[0.05]

              hover:text-white
            "
          >
            <X
              size={16}
            />
          </motion.button>
        </div>

        {/* FORM */}

        <form
          onSubmit={
            onSubmit
          }
          className="
            space-y-4

            px-5
            py-5

            sm:px-6
            sm:py-6
          "
        >
          <div
            className="
              grid

              gap-4

              sm:grid-cols-2
            "
          >
            <InputField
              id="contact-name"

              label="Name"

              type="text"

              value={
                form.name
              }

              placeholder="Your name"

              onChange={(
                value
              ) =>
                onChange(
                  "name",
                  value
                )
              }
            />

            <InputField
              id="contact-phone"

              label="Phone Number"

              type="tel"

              value={
                form.phone
              }

              placeholder="+91 98765 43210"

              onChange={(
                value
              ) =>
                onChange(
                  "phone",
                  value
                )
              }
            />
          </div>

          <InputField
            id="contact-email"

            label="Email"

            type="email"

            value={
              form.email
            }

            placeholder="you@example.com"

            onChange={(
              value
            ) =>
              onChange(
                "email",
                value
              )
            }
          />

          {/* MESSAGE */}

          <div>
            <label
              htmlFor="contact-message"

              className="
                mb-2

                block

                text-[8px]

                font-semibold

                uppercase

                tracking-[1.4px]

                text-[#627f91]
              "
            >
              Message
            </label>

            <textarea
              id="contact-message"

              required

              rows={4}

              value={
                form.message
              }

              onChange={(
                event
              ) =>
                onChange(
                  "message",

                  event.target
                    .value
                )
              }

              placeholder="Tell me about your project..."

              className="
                min-h-[110px]

                w-full

                resize-none

                rounded-[13px]

                border

                border-[#173c51]/70

                bg-[#020c14]/70

                px-4

                py-3

                text-[11px]

                text-white

                outline-none

                transition-all

                duration-300

                placeholder:text-[#3b5566]

                focus:border-[#168fdc]/60

                focus:bg-[#03111b]

                focus:shadow-[0_0_0_3px_rgba(0,117,255,0.06)]
              "
            />
          </div>

          {/* =================================================
              PREMIUM SUBMIT
          ================================================== */}

          <motion.button
            type="submit"

            disabled={
              loading
            }

            whileHover={
              loading
                ? undefined
                : {
                    y: -3,

                    scale:
                      1.01,
                  }
            }

            whileTap={
              loading
                ? undefined
                : {
                    scale:
                      0.98,
                  }
            }

            transition={{
              type:
                "spring",

              stiffness:
                320,

              damping:
                22,
            }}

            className="
              group
              relative

              flex

              h-[48px]

              w-full

              cursor-pointer

              items-center

              justify-center

              gap-2.5

              overflow-hidden

              rounded-[13px]

              border

              border-[#4bc7ff]/35

              bg-gradient-to-r

              from-[#2abaff]

              via-[#149fff]

              to-[#0075ff]

              text-[11px]

              font-semibold

              text-white

              shadow-[0_12px_35px_rgba(0,117,255,0.20)]

              transition-shadow

              duration-300

              hover:shadow-[0_16px_45px_rgba(0,117,255,0.32)]

              disabled:cursor-not-allowed

              disabled:opacity-60
            "
          >
            {/* SHIMMER */}

            {!loading && (
              <span
                className="
                  absolute

                  inset-y-0

                  left-[-45%]

                  w-[35%]

                  skew-x-[-22deg]

                  bg-gradient-to-r

                  from-transparent

                  via-white/25

                  to-transparent

                  transition-all

                  duration-700

                  group-hover:left-[120%]
                "
              />
            )}

            <span
              className="
                relative
                z-10

                flex

                items-center

                justify-center

                gap-2.5
              "
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={16}

                    className="
                      animate-spin
                    "
                  />

                  Sending...
                </>
              ) : (
                <>
                  Send Message

                  <Send
                    size={14}

                    className="
                      transition-transform

                      duration-300

                      group-hover:translate-x-1

                      group-hover:-translate-y-1
                    "
                  />
                </>
              )}
            </span>
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  id,
  label,
  type,
  value,
  placeholder,
  onChange,
}: {
  id:
    string;

  label:
    string;

  type:
    string;

  value:
    string;

  placeholder:
    string;

  onChange: (
    value:
      string
  ) => void;
}) {
  return (
    <div>
      <label
        htmlFor={
          id
        }
        className="
          mb-2

          block

          text-[8px]

          font-semibold

          uppercase

          tracking-[1.4px]

          text-[#627f91]
        "
      >
        {label}
      </label>

      <input
        id={
          id
        }

        required

        type={
          type
        }

        value={
          value
        }

        placeholder={
          placeholder
        }

        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }

        className="
          h-[45px]

          w-full

          rounded-[13px]

          border

          border-[#173c51]/70

          bg-[#020c14]/70

          px-4

          text-[11px]

          text-white

          outline-none

          transition-all

          duration-300

          placeholder:text-[#3b5566]

          focus:border-[#168fdc]/60

          focus:bg-[#03111b]

          focus:shadow-[0_0_0_3px_rgba(0,117,255,0.06)]
        "
      />
    </div>
  );
}

/* =========================================================
   TOAST
========================================================= */

function Toast({
  toast,
  onClose,
}: {
  toast:
    Exclude<
      ToastState,
      null
    >;

  onClose:
    () => void;
}) {
  const success =
    toast.type ===
    "success";

  return (
    <motion.div
      initial={{
        opacity: 0,

        x: 35,

        scale: 0.95,
      }}
      animate={{
        opacity: 1,

        x: 0,

        scale: 1,
      }}
      exit={{
        opacity: 0,

        x: 30,

        scale: 0.96,
      }}
      transition={{
        type:
          "spring",

        stiffness:
          300,

        damping:
          25,
      }}
      className="
        fixed

        right-4
        top-5

        z-[1200]

        w-[calc(100%-32px)]

        max-w-[390px]

        sm:right-6

        sm:top-6
      "
    >
      <div
        className={`
          relative

          overflow-hidden

          rounded-[16px]

          border

          px-4
          py-4

          shadow-[0_22px_70px_rgba(0,0,0,0.45)]

          backdrop-blur-2xl

          ${
            success
              ? `
                border-[#00dcae]/20

                bg-[#071b1f]/95
              `
              : `
                border-[#ff6262]/20

                bg-[#201014]/95
              `
          }
        `}
      >
        <div
          className="
            flex

            items-center

            gap-3
          "
        >
          <motion.div
            initial={{
              scale: 0,

              rotate: -18,
            }}
            animate={{
              scale: 1,

              rotate: 0,
            }}
            className={`
              flex

              h-10
              w-10

              shrink-0

              items-center

              justify-center

              rounded-xl

              ${
                success
                  ? `
                    bg-[#00dcae]/10

                    text-[#00dcae]
                  `
                  : `
                    bg-[#ff6262]/10

                    text-[#ff7474]
                  `
              }
            `}
          >
            {success ? (
              <CheckCircle2
                size={19}
              />
            ) : (
              <X
                size={17}
              />
            )}
          </motion.div>

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <p
              className="
                text-[11px]

                font-semibold

                text-white
              "
            >
              {toast.title}
            </p>

            <p
              className="
                mt-[3px]

                text-[9px]

                leading-[1.5]

                text-[#879ca8]
              "
            >
              {toast.message}
            </p>
          </div>

          <button
            type="button"

            onClick={
              onClose
            }

            className="
              flex

              h-7
              w-7

              cursor-pointer

              items-center

              justify-center

              rounded-lg

              text-[#667e8c]

              transition-all

              hover:bg-white/[0.05]

              hover:text-white
            "
          >
            <X
              size={13}
            />
          </button>
        </div>

        {/* PROGRESS */}

        <motion.div
          initial={{
            scaleX: 1,
          }}
          animate={{
            scaleX: 0,
          }}
          transition={{
            duration: 4,

            ease: "linear",
          }}
          className={`
            absolute

            bottom-0
            left-0

            h-[2px]

            w-full

            origin-left

            ${
              success
                ? `
                  bg-gradient-to-r

                  from-[#00dcae]

                  to-[#0075ff]
                `
                : `
                  bg-gradient-to-r

                  from-[#ff6262]

                  to-[#ff9b75]
                `
            }
          `}
        />
      </div>
    </motion.div>
  );
}