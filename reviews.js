/* ============================================================
   Khadafi's Recipe Book — recipe reviews (1-5 stars + comment)
   ============================================================

   Reviews are stored in a free Supabase database, because a static
   GitHub Pages site has nowhere to keep shared data on its own.

   SETUP (one time):
   1. Go to https://supabase.com -> New project (free plan is fine).
   2. Open SQL Editor -> New query, paste everything between the
      dashed lines, and click Run:

      ----------------------------------------------------------
      create table public.reviews (
        id         uuid primary key default gen_random_uuid(),
        recipe_id  text not null check (char_length(recipe_id) between 1 and 40),
        name       text check (char_length(name) <= 40),
        rating     smallint not null check (rating between 1 and 5),
        comment    text check (char_length(comment) <= 1000),
        approved   boolean not null default true,
        created_at timestamptz not null default now()
      );
      create index on public.reviews (recipe_id, created_at desc);

      alter table public.reviews enable row level security;
      grant select, insert on public.reviews to anon;

      create policy "visitors can read approved reviews"
        on public.reviews for select to anon
        using (approved = true);

      create policy "visitors can submit reviews"
        on public.reviews for insert to anon
        with check (approved = true);
      ----------------------------------------------------------

   3. Project Settings -> API: copy the Project URL and the anon
      (a.k.a. "publishable") key into the two constants below.
      That key is MEANT to be public. The policies above are what keep
      the table safe: visitors can add reviews and read visible ones,
      but can never edit or delete anything.

   REMOVING A REVIEW (reviews go live instantly, you clean up after):
   Supabase -> Table Editor -> reviews, then either
     - untick `approved` on the row to hide it (easy to undo), or
     - delete the row to remove it for good.

   Want to approve reviews BEFORE they show instead? Run this SQL, then
   set REVIEWS_MODERATED to true below:

      alter table public.reviews alter column approved set default false;
      drop policy "visitors can submit reviews" on public.reviews;
      create policy "visitors can submit unapproved reviews"
        on public.reviews for insert to anon with check (approved = false);
   ============================================================ */

const SUPABASE_URL = "https://czprcwfrpwptyiqosesv.supabase.co";
const SUPABASE_KEY = "sb_publishable_yhyqWh3Q4OTWcD7G7GL6BQ_5tipyP4m";
const REVIEWS_MODERATED = false;

/* ---------- API helpers ---------- */

function reviewsConfigured() {
  return /^https?:\/\//.test(SUPABASE_URL) && !SUPABASE_KEY.startsWith("REPLACE");
}

function reviewsApi(path) {
  return SUPABASE_URL.replace(/\/+$/, "") + "/rest/v1/" + path;
}

function reviewsHeaders(extra) {
  const headers = Object.assign({ apikey: SUPABASE_KEY }, extra);
  // Legacy anon keys are JWTs and go in Authorization too; the newer
  // publishable keys are not JWTs and only go in the apikey header.
  if (SUPABASE_KEY.startsWith("eyJ")) {
    headers.Authorization = "Bearer " + SUPABASE_KEY;
  }
  return headers;
}

async function fetchReviews(recipeId) {
  const query = new URLSearchParams({
    select: "name,rating,comment,created_at",
    recipe_id: "eq." + recipeId,
    approved: "eq.true",
    order: "created_at.desc",
    limit: "100",
  });
  const res = await fetch(reviewsApi("reviews?" + query), {
    headers: reviewsHeaders(),
  });
  if (!res.ok) throw new Error("load-failed");
  return res.json();
}

async function submitReview(review) {
  const res = await fetch(reviewsApi("reviews"), {
    method: "POST",
    headers: reviewsHeaders({
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    }),
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("submit-failed");
}

/* ---------- rendering (user text only ever goes in via textContent) ---------- */

function h(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function starsNode(count) {
  const n = Math.min(5, Math.max(0, Math.round(Number(count) || 0)));
  const wrap = h("span", "stars");
  wrap.setAttribute("role", "img");
  wrap.setAttribute("aria-label", n + " out of 5 stars");
  wrap.appendChild(document.createTextNode("★".repeat(n)));
  if (n < 5) wrap.appendChild(h("span", "stars-empty", "★".repeat(5 - n)));
  return wrap;
}

function renderReviews(summaryEl, listEl, reviews) {
  summaryEl.replaceChildren();
  listEl.replaceChildren();

  if (!reviews.length) {
    summaryEl.textContent = "No reviews yet — be the first to leave one.";
    return;
  }

  const total = reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
  const average = total / reviews.length;
  summaryEl.append(
    h("strong", null, average.toFixed(1)),
    starsNode(average),
    h("span", null, reviews.length + (reviews.length === 1 ? " review" : " reviews"))
  );

  reviews.forEach((r) => {
    const item = h("div", "review-item");
    const meta = h("div", "review-meta");
    const date = new Date(r.created_at);
    meta.append(
      starsNode(r.rating),
      h("strong", null, r.name || "Anonymous"),
      h(
        "span",
        null,
        isNaN(date)
          ? ""
          : date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
      )
    );
    item.append(meta);
    if (r.comment) item.append(h("p", "review-comment", r.comment));
    listEl.append(item);
  });
}

function reviewFormHtml() {
  const stars = [5, 4, 3, 2, 1]
    .map(
      (n) =>
        `<input type="radio" name="rating" id="rate-${n}" value="${n}">` +
        `<label for="rate-${n}" title="${n} star${n === 1 ? "" : "s"}">` +
        `<span aria-hidden="true">★</span>` +
        `<span class="visually-hidden">${n} star${n === 1 ? "" : "s"}</span></label>`
    )
    .join("");

  return `
    <h3>Leave a review</h3>
    <form class="review-form" novalidate>
      <fieldset class="star-picker-group">
        <legend>Your rating</legend>
        <div class="star-picker">${stars}</div>
      </fieldset>
      <div class="mb-3">
        <label for="review-name" class="form-label">Name (optional)</label>
        <input type="text" class="form-control" id="review-name" name="name" maxlength="40" autocomplete="name">
      </div>
      <div class="mb-3">
        <label for="review-comment" class="form-label">Comment (optional)</label>
        <textarea class="form-control" id="review-comment" name="comment" rows="4" maxlength="1000"></textarea>
      </div>
      <div class="review-hp" aria-hidden="true">
        <input type="text" name="website" tabindex="-1" autocomplete="off">
      </div>
      <button type="submit" class="btn btn-accent">Submit review</button>
      <p class="review-message" role="status"></p>
    </form>`;
}

/* ---------- page setup ---------- */

function initReviews() {
  const mount = document.getElementById("reviews");
  if (!mount) return;

  // No reviews on unknown recipes or on the hidden/special page.
  const recipe = getRecipeById(new URLSearchParams(window.location.search).get("id"));
  if (!recipe || recipe.special || recipe.hidden) return;

  const recipeId = String(recipe.id);
  const storeKey = "reviewed:" + recipeId;

  const card = h("div", "reviews-card");
  const summaryEl = h("div", "review-summary");
  const listEl = h("div", "review-list");
  const formWrap = h("div", "review-form-wrap");
  card.append(h("h2", null, "Reviews"), summaryEl, listEl, formWrap);
  mount.append(card);

  function loadList() {
    if (!reviewsConfigured()) {
      summaryEl.textContent = "Reviews aren't set up yet.";
      return;
    }
    fetchReviews(recipeId)
      .then((reviews) => renderReviews(summaryEl, listEl, reviews))
      .catch(() => {
        summaryEl.textContent = "Couldn't load reviews right now.";
      });
  }

  function showThanks(text) {
    formWrap.replaceChildren(h("p", "review-thanks", text));
  }

  let alreadyReviewed = false;
  try {
    alreadyReviewed = !!localStorage.getItem(storeKey);
  } catch (e) {}

  if (alreadyReviewed) {
    showThanks("Thanks for reviewing this recipe!");
  } else {
    formWrap.innerHTML = reviewFormHtml();
    const form = formWrap.querySelector("form");
    const button = form.querySelector("button");
    const message = form.querySelector(".review-message");

    function setMessage(text, kind) {
      message.textContent = text;
      message.className = "review-message" + (kind ? " " + kind : "");
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const rating = Number(form.elements.rating.value);
      if (!rating) {
        setMessage("Please choose a star rating first.", "error");
        return;
      }
      // Bots fill the hidden field; pretend it worked and drop the review.
      if (form.elements.website.value) {
        showThanks("Thanks for your review!");
        return;
      }
      if (!reviewsConfigured()) {
        setMessage("Reviews aren't set up yet.", "error");
        return;
      }

      const name = form.elements.name.value.trim();
      const comment = form.elements.comment.value.trim();

      button.disabled = true;
      button.textContent = "Submitting...";
      setMessage("");

      try {
        await submitReview({
          recipe_id: recipeId,
          name: name || null,
          rating: rating,
          comment: comment || null,
        });
        try {
          localStorage.setItem(storeKey, "1");
        } catch (err) {}
        showThanks(
          REVIEWS_MODERATED
            ? "Thanks for your review! It will show up here once it's been approved."
            : "Thanks for your review!"
        );
        if (!REVIEWS_MODERATED) loadList();
      } catch (err) {
        button.disabled = false;
        button.textContent = "Submit review";
        setMessage("Couldn't submit your review. Please try again later.", "error");
      }
    });
  }

  loadList();
}

document.addEventListener("DOMContentLoaded", initReviews);
