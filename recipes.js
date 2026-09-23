/* ============================================================
   Khadafi's Recipe Book — shared recipe data + page rendering
   ============================================================ */

const RECIPES = [
  {
    id: 1,
    name: "Jerk Chicken Pasta",
    category: "Mains",
    difficulty: 5,
    time: "45 mins",
    servings: 4,
    image: "https://i.postimg.cc/CL3rCHyM/IMG-9410.jpg",
    blurb:
      "Creamy rasta-style pasta with smoky, spicy jerk chicken and sweet peppers.",
    ingredients: [
      "2 chicken breasts, sliced",
      "3 tbsp jerk marinade or seasoning",
      "12 oz penne pasta",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "3 cloves garlic, minced",
      "1 cup heavy cream",
      "1/2 cup grated parmesan",
      "2 tbsp olive oil",
      "Salt, black pepper, and fresh parsley",
    ],
    steps: [
      "Toss the sliced chicken with the jerk seasoning and let it marinate for at least 20 minutes.",
      "Cook the penne in salted boiling water until al dente, then drain and reserve 1/2 cup of pasta water.",
      "Heat the olive oil in a large skillet over medium-high heat and sear the chicken until cooked through, about 6 minutes. Remove and set aside.",
      "Add the peppers and garlic to the same pan and cook until softened, about 4 minutes.",
      "Pour in the cream, bring to a gentle simmer, then stir in the parmesan until smooth.",
      "Return the chicken and pasta to the pan, loosen with a splash of pasta water, and toss to coat.",
      "Season to taste and finish with fresh parsley.",
    ],
  },
  {
    id: 2,
    name: "Beef Short Ribs",
    category: "Mains",
    difficulty: 7,
    time: "4 hrs",
    servings: 4,
    image: "https://i.postimg.cc/6Q9kRLRs/IMG-9875.jpg",
    blurb:
      "Fall-off-the-bone braised short ribs in a deep red wine and herb gravy.",
    ingredients: [
      "4 lbs bone-in beef short ribs",
      "2 tbsp vegetable oil",
      "1 onion, diced",
      "2 carrots, chopped",
      "2 celery stalks, chopped",
      "4 cloves garlic, crushed",
      "2 tbsp tomato paste",
      "2 cups dry red wine",
      "3 cups beef stock",
      "3 sprigs thyme and 2 bay leaves",
      "Salt and black pepper",
    ],
    steps: [
      "Preheat the oven to 325°F (160°C). Pat the ribs dry and season generously with salt and pepper.",
      "Sear the ribs in the oil in a Dutch oven over high heat until browned on all sides, then set aside.",
      "Lower the heat to medium and cook the onion, carrots, and celery until softened, about 8 minutes.",
      "Stir in the garlic and tomato paste and cook for 1 minute.",
      "Pour in the red wine, scraping the bottom of the pot, and simmer until reduced by half.",
      "Return the ribs to the pot, add the stock and herbs, and bring to a simmer.",
      "Cover and braise in the oven for 3 to 3.5 hours, until the meat is tender.",
      "Skim the fat, strain the sauce if you like it smooth, and spoon over the ribs to serve.",
    ],
  },
  {
    id: 3,
    name: "Baked Salmon",
    category: "Mains",
    difficulty: 4,
    time: "35 mins",
    servings: 4,
    image: "https://i.postimg.cc/76B9cSfK/IMG-3707.jpg",
    blurb:
      "A weeknight salmon fillet baked with garlic butter, lemon, and herbs.",
    ingredients: [
      "4 salmon fillets (about 6 oz each)",
      "3 tbsp butter, melted",
      "3 cloves garlic, minced",
      "1 lemon (half juiced, half sliced)",
      "1 tsp dried oregano",
      "2 tbsp chopped fresh dill or parsley",
      "Salt and black pepper",
      "Olive oil for the pan",
    ],
    steps: [
      "Preheat the oven to 400°F (200°C) and line a baking sheet with parchment or foil.",
      "Whisk together the melted butter, garlic, lemon juice, and oregano.",
      "Place the salmon on the sheet, brush with olive oil, and season with salt and pepper.",
      "Spoon the garlic butter over each fillet and top with lemon slices.",
      "Bake for 12 to 15 minutes, until the salmon flakes easily with a fork.",
      "Scatter with fresh herbs and serve with extra lemon.",
    ],
  },
  {
    id: 4,
    name: "Chopped Cheese",
    category: "Snacks",
    difficulty: 2,
    time: "30 mins",
    servings: 2,
    image: "https://i.postimg.cc/QNHqvV1M/IMG-2431.jpg",
    blurb:
      "The New York bodega classic: griddled seasoned beef, melted cheese, and toasted hero.",
    ingredients: [
      "3/4 lb ground beef (80/20)",
      "1 small onion, finely chopped",
      "4 slices American cheese",
      "2 hero or sub rolls",
      "1 tsp garlic powder",
      "1 tsp seasoning salt",
      "Lettuce, tomato, and pickles",
      "Ketchup, mayo, and hot sauce",
      "1 tbsp oil or butter",
    ],
    steps: [
      "Heat the oil on a flat griddle or large skillet over medium-high heat.",
      "Add the onion and cook for 2 minutes, then add the beef.",
      "Season with garlic powder and seasoning salt, breaking the beef into small pieces as it browns.",
      "Once cooked, chop everything together with a spatula and gather it into two piles.",
      "Lay two cheese slices over each pile and let them melt.",
      "Split the rolls, toast them face down on the griddle, then spread with ketchup and mayo.",
      "Scoop the beef and cheese into the rolls and top with lettuce, tomato, and pickles.",
    ],
  },
  {
    id: 5,
    name: "Carrot Cake",
    category: "Desserts",
    difficulty: 8,
    time: "3 hrs",
    servings: 12,
    image: "https://i.postimg.cc/5yS9sf4d/IMG-3048.jpg",
    blurb:
      "A tall, spiced three-layer carrot cake with tangy cream cheese frosting.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tsp baking soda",
      "2 tsp ground cinnamon",
      "1/2 tsp nutmeg and 1/2 tsp salt",
      "1 1/4 cups vegetable oil",
      "1 cup granulated sugar and 1 cup brown sugar",
      "4 large eggs",
      "3 cups grated carrots",
      "1 cup chopped walnuts (optional)",
      "For the frosting: 16 oz cream cheese, 1/2 cup butter, 4 cups powdered sugar, 2 tsp vanilla",
    ],
    steps: [
      "Preheat the oven to 350°F (175°C) and grease and line three 8-inch cake pans.",
      "Whisk together the flour, baking soda, cinnamon, nutmeg, and salt.",
      "In a large bowl, beat the oil, both sugars, and eggs until smooth.",
      "Fold the dry ingredients into the wet, then stir in the carrots and walnuts.",
      "Divide between the pans and bake for 28 to 32 minutes, until a skewer comes out clean.",
      "Cool the layers completely on a wire rack.",
      "Beat the cream cheese and butter until fluffy, then add the powdered sugar and vanilla.",
      "Stack the layers with frosting between each, then coat the top and sides.",
    ],
  },
  {
    id: 6,
    name: "Chicken Wings",
    category: "Snacks",
    difficulty: 3,
    time: "1.5 hrs",
    servings: 4,
    image: "https://i.postimg.cc/gkGCjWvC/IMG-7372.jpg",
    blurb:
      "Extra-crispy oven-baked wings tossed in a buttery hot sauce glaze.",
    ingredients: [
      "3 lbs chicken wings, split",
      "1 tbsp baking powder (not baking soda)",
      "1 tsp salt",
      "1 tsp garlic powder",
      "1/2 tsp black pepper",
      "1/2 cup hot sauce",
      "4 tbsp butter",
      "1 tbsp honey",
    ],
    steps: [
      "Pat the wings very dry and toss with the baking powder, salt, garlic powder, and pepper.",
      "Arrange on a wire rack set over a baking sheet and chill uncovered for 30 minutes if you have time.",
      "Bake at 250°F (120°C) for 30 minutes on a low oven rack.",
      "Move the tray to the top rack, raise the heat to 425°F (220°C), and bake for 40 to 45 minutes more, flipping once, until deep golden and crisp.",
      "Melt the butter with the hot sauce and honey in a small pan.",
      "Toss the hot wings in the sauce and serve right away.",
    ],
  },
  {
    id: 7,
    name: "Strawberry Shortcake",
    category: "Desserts",
    difficulty: 6,
    time: "1 hr",
    servings: 6,
    image:
      "https://japan.recipetineats.com/wp-content/uploads/2020/08/Strawberry_Shortcake_5140sq.jpg",
    blurb:
      "Buttery biscuits split and layered with macerated strawberries and whipped cream.",
    ingredients: [
      "2 cups all-purpose flour",
      "1 tbsp baking powder",
      "1/4 cup sugar, plus more for the berries",
      "1/2 tsp salt",
      "6 tbsp cold butter, cubed",
      "3/4 cup cold milk",
      "1 lb strawberries, sliced",
      "1 1/2 cups heavy cream",
      "1 tsp vanilla extract",
    ],
    steps: [
      "Toss the sliced strawberries with 3 tbsp sugar and set aside to macerate for 30 minutes.",
      "Preheat the oven to 425°F (220°C).",
      "Whisk the flour, baking powder, 1/4 cup sugar, and salt, then cut in the butter until crumbly.",
      "Stir in the milk just until a shaggy dough forms, then pat out and cut into 6 rounds.",
      "Bake for 12 to 15 minutes, until risen and golden, then cool slightly.",
      "Whip the cream with the vanilla and a spoonful of sugar to soft peaks.",
      "Split each biscuit, spoon on the berries and their juice, and top with whipped cream.",
    ],
  },
  /* ============================================================
     TEMPORARY — easter egg for Jennifer. Delete this whole object
     after the date to remove it from the site.
     ============================================================ */
  {
    id: "off-menu",
    hidden: true, // keeps it out of the home page + all-recipes grid
    special: true, // shows the RSVP buttons on the detail page
    name: "A Recipe Made for Jennifer",
    category: "Special Occasion",
    difficulty: 1,
    time: "One evening",
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=60",
    blurb: "Serves two. Let's find out if we're a good pair.",
    ingredients: [
      "1 dinner reservation, my treat",
      "A chance to actually get to know each other",
      "Good conversation — we'll see where it goes",
      "Zero pressure, just good company",
      "One evening to see if we click",
    ],
    steps: [
      "Jennifer — I don't know you all that well yet, but I'd like to change that.",
      "I'd like to take you out. Nothing fancy required, just dinner and good conversation.",
      "Pick a night that works for you, I'm flexible.",
      "Wear whatever you're comfortable in.",
      "Say yes below, and I'll text you the details.",
    ],
  },
];

/* ---------- helpers ---------- */

function difficultyLabel(n) {
  if (n <= 3) return "Easy";
  if (n <= 6) return "Medium";
  return "Hard";
}

function getRecipeById(id) {
  return RECIPES.find((r) => String(r.id) === String(id));
}

function recipeCard(recipe) {
  return `
    <div class="col-sm-6 col-lg-4 mb-4">
      <a class="recipe-card" href="recipe.html?id=${recipe.id}">
        <div class="recipe-card-img" style="background-image:url('${recipe.image}')"></div>
        <div class="recipe-card-body">
          <span class="badge-category">${recipe.category}</span>
          <h3>${recipe.name}</h3>
          <p class="recipe-blurb">${recipe.blurb}</p>
          <div class="recipe-meta">
            <span>&#9201; ${recipe.time}</span>
            <span>&#127860; Serves ${recipe.servings}</span>
            <span>&#128293; ${difficultyLabel(recipe.difficulty)}</span>
          </div>
        </div>
      </a>
    </div>`;
}

/* ---------- home page ---------- */

function renderHome() {
  const featured = document.getElementById("featured-recipes");
  if (!featured) return;
  featured.innerHTML = RECIPES.filter((r) => !r.hidden)
    .slice(0, 6)
    .map(recipeCard)
    .join("");
}

/* ---------- all recipes page ---------- */

function renderList() {
  const grid = document.getElementById("recipe-grid");
  if (!grid) return;

  const searchInput = document.getElementById("searchInput");
  const filterBar = document.getElementById("category-filters");
  let activeCategory = "All";

  const visibleRecipes = RECIPES.filter((r) => !r.hidden);
  const categories = ["All", ...new Set(visibleRecipes.map((r) => r.category))];
  if (filterBar) {
    filterBar.innerHTML = categories
      .map(
        (c) =>
          `<button type="button" class="filter-btn${
            c === "All" ? " active" : ""
          }" data-category="${c}">${c}</button>`
      )
      .join("");
  }

  function draw() {
    const term = (searchInput ? searchInput.value : "").toLowerCase().trim();
    const results = visibleRecipes.filter((r) => {
      const matchesCategory =
        activeCategory === "All" || r.category === activeCategory;
      const matchesTerm =
        !term ||
        r.name.toLowerCase().includes(term) ||
        r.blurb.toLowerCase().includes(term) ||
        r.ingredients.join(" ").toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });

    grid.innerHTML = results.length
      ? results.map(recipeCard).join("")
      : `<p class="text-center text-muted py-5">No recipes match your search.</p>`;
  }

  if (searchInput) searchInput.addEventListener("input", draw);
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeCategory = btn.dataset.category;
      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.toggle("active", b === btn));
      draw();
    });
  }

  draw();
}

/* ---------- single recipe page ---------- */

function renderDetail() {
  const container = document.getElementById("recipe-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const recipe = getRecipeById(params.get("id"));

  if (!recipe) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h2>Recipe not found</h2>
        <p><a href="recipes.html">Back to all recipes</a></p>
      </div>`;
    return;
  }

  document.title = `${recipe.name} — Khadafi's Recipe Book`;

  container.innerHTML = `
    <div class="recipe-hero" style="background-image:url('${recipe.image}')"></div>
    <div class="recipe-detail-body">
      <a class="back-link" href="recipes.html">&larr; All recipes</a>
      <span class="badge-category">${recipe.category}</span>
      <h1>${recipe.name}</h1>
      <p class="lead">${recipe.blurb}</p>

      <div class="recipe-stats">
        <div><strong>${recipe.time}</strong><span>Total time</span></div>
        <div><strong>Serves ${recipe.servings}</strong><span>Portions</span></div>
        <div><strong>${difficultyLabel(recipe.difficulty)}</strong><span>${recipe.difficulty}/10 difficulty</span></div>
      </div>

      <div class="row mt-4">
        <div class="col-md-5 mb-4">
          <h2>Ingredients</h2>
          <ul class="ingredient-list">
            ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </div>
        <div class="col-md-7">
          <h2>Method</h2>
          <ol class="method-list">
            ${recipe.steps.map((s) => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      </div>

      ${recipe.special ? proposalRsvpHtml() : ""}
    </div>`;

  if (recipe.special) initProposalRsvp();
}

/* ---------- TEMPORARY: proposal RSVP (remove with the recipe entry) ---------- */

function proposalRsvpHtml() {
  return `
    <div class="proposal-rsvp">
      <button type="button" id="rsvp-yes" class="btn btn-accent">Yes 😊</button>
      <button type="button" id="rsvp-wait" class="btn btn-outline-dark">I need a sec 😏</button>
      <p id="rsvp-message" class="rsvp-message"></p>
    </div>`;
}

function spawnConfetti() {
  const emoji = ["🎉", "❤️", "✨", "🥂"];
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = emoji[Math.floor(Math.random() * emoji.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * 0.4 + "s";
    piece.style.fontSize = 16 + Math.random() * 16 + "px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

function initProposalRsvp() {
  const yesBtn = document.getElementById("rsvp-yes");
  const waitBtn = document.getElementById("rsvp-wait");
  const message = document.getElementById("rsvp-message");

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      message.textContent = "Yay! I'll text you the details, Jennifer 🎉";
      spawnConfetti();
    });
  }
  if (waitBtn) {
    waitBtn.addEventListener("click", () => {
      message.textContent = "Totally fine — take your time. The offer stands. 😊";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderHome();
  renderList();
  renderDetail();
});
