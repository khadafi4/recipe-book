/* ============================================================
   Khadafi's Recipe Book — Mailchimp newsletter signup
   ============================================================

   SETUP — fill in these two values from your own Mailchimp account:

   1. Log into Mailchimp -> Audience -> Signup forms -> Embedded forms
   2. Choose the "Classic" style and click Continue
   3. In the generated code, find the <form> tag's `action="..."` URL
      and paste it below as MAILCHIMP_POST_URL.
   4. In that same code, find the hidden anti-bot input that looks like
        <input type="text" name="b_xxxxxxxxxxxxxxxxxxxxxxxxx_yyyyyyyyyy" ...>
      and paste just the `name` value below as MAILCHIMP_HONEYPOT_NAME.

   Everything else on this page works automatically once those two
   values are set — no other code needs to change.
   ============================================================ */

const MAILCHIMP_POST_URL =
  "https://khadafisrecipebook.us20.list-manage.com/subscribe/post?u=ab4adff1aeb7acd3c56072c76&id=e557a57e4c&f_id=002dc2e1f0";
const MAILCHIMP_HONEYPOT_NAME = "b_ab4adff1aeb7acd3c56072c76_e557a57e4c";

/**
 * Submits an email to Mailchimp via JSONP. A plain fetch()/XHR can't be
 * used here because Mailchimp's endpoint doesn't allow cross-origin
 * requests (no CORS headers) — JSONP (loading a <script> tag) is the
 * standard workaround for static sites with no backend of their own.
 */
function submitToMailchimp(email) {
  return new Promise((resolve, reject) => {
    if (!MAILCHIMP_POST_URL.startsWith("http")) {
      reject(new Error("not-configured"));
      return;
    }

    const callbackName = "mcCallback" + Date.now();
    const jsonpUrl = MAILCHIMP_POST_URL.replace("/post?", "/post-json?");

    const params = new URLSearchParams({
      EMAIL: email,
      c: callbackName,
    });
    if (
      MAILCHIMP_HONEYPOT_NAME &&
      !MAILCHIMP_HONEYPOT_NAME.startsWith("REPLACE")
    ) {
      params.set(MAILCHIMP_HONEYPOT_NAME, "");
    }

    const script = document.createElement("script");
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, 8000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = function (data) {
      cleanup();
      resolve(data);
    };

    script.src = jsonpUrl + "&" + params.toString();
    script.onerror = () => {
      cleanup();
      reject(new Error("network"));
    };
    document.body.appendChild(script);
  });
}

function initNewsletterForms() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach((form) => {
    const emailInput = form.querySelector('input[type="email"]');
    const messageEl = form.parentElement.querySelector(".signup-message");
    const button = form.querySelector("button");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return;

      button.disabled = true;
      button.textContent = "Signing up...";
      if (messageEl) {
        messageEl.textContent = "";
        messageEl.className = "signup-message";
      }

      submitToMailchimp(email)
        .then((data) => {
          if (data && data.result === "success") {
            if (messageEl) {
              messageEl.textContent =
                "You're in! Check your inbox to confirm.";
              messageEl.className = "signup-message success";
            }
            form.reset();
          } else {
            const msg =
              (data && data.msg && data.msg.replace(/<[^>]*>/g, "")) ||
              "Something went wrong. Please try again.";
            if (messageEl) {
              messageEl.textContent = msg;
              messageEl.className = "signup-message error";
            }
          }
        })
        .catch((err) => {
          if (messageEl) {
            messageEl.textContent =
              err.message === "not-configured"
                ? "Signup form isn't set up yet."
                : "Couldn't reach the signup service. Please try again later.";
            messageEl.className = "signup-message error";
          }
        })
        .finally(() => {
          button.disabled = false;
          button.textContent = "Sign Up";
        });
    });
  });
}

document.addEventListener("DOMContentLoaded", initNewsletterForms);
