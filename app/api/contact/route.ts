import {
  NextRequest,
  NextResponse,
} from "next/server";

/* =========================================================
   GOOGLE APPS SCRIPT
========================================================= */

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwVIXIQ5xfyAnzxBLxhZan9AKQClbCdYKGygkWYfItml2zVBxfZIgfkhKcVIOTWM_NJ/exec";

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    /* =====================================================
       READ FRONTEND BODY
    ====================================================== */

    const body =
      await request.json();

    const name =
      String(
        body.name || ""
      ).trim();

    const email =
      String(
        body.email || ""
      ).trim();

    const phone =
      String(
        body.phone || ""
      ).trim();

    const message =
      String(
        body.message || ""
      ).trim();

    const pageUrl =
      String(
        body.pageUrl || ""
      ).trim();

    /* =====================================================
       VALIDATION
    ====================================================== */

    if (
      !name ||
      !email ||
      !phone ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !/^[0-9+\-\s()]{7,20}$/.test(
        phone
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid phone number.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       URL ENCODE FORM
    ====================================================== */

    const formData =
      new URLSearchParams();

    formData.set(
      "name",
      name
    );

    formData.set(
      "email",
      email
    );

    formData.set(
      "phone",
      phone
    );

    formData.set(
      "message",
      message
    );

    formData.set(
      "source",
      "Balaji Portfolio"
    );

    formData.set(
      "pageUrl",
      pageUrl
    );

    /* =====================================================
       SEND TO GOOGLE
    ====================================================== */

    const googleResponse =
      await fetch(
        APPS_SCRIPT_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded;charset=UTF-8",
          },

          body:
            formData.toString(),

          redirect:
            "follow",

          cache:
            "no-store",
        }
      );

    const responseText =
      await googleResponse.text();

    console.log(
      "Apps Script status:",
      googleResponse.status
    );

    console.log(
      "Apps Script response:",
      responseText
    );

    /* =====================================================
       PARSE JSON
    ====================================================== */

    let result: {
      success?: boolean;
      message?: string;
      row?: number;
    };

    try {
      result =
        JSON.parse(
          responseText
        );
    } catch {
      console.error(
        "Invalid Apps Script response:",
        responseText
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "The message was received but Apps Script returned an invalid response. Redeploy the latest Code.gs version.",
        },
        {
          status: 502,
        }
      );
    }

    /* =====================================================
       GOOGLE ERROR
    ====================================================== */

    if (
      !googleResponse.ok ||
      !result.success
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            result.message ||
            "Google Sheet write failed.",
        },
        {
          status: 502,
        }
      );
    }

    /* =====================================================
       SUCCESS
    ====================================================== */

    return NextResponse.json({
      success: true,

      message:
        result.message ||
        "Message saved successfully.",

      row:
        result.row,
    });

  } catch (error) {
    console.error(
      "Contact API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to submit message.",
      },
      {
        status: 500,
      }
    );
  }
}