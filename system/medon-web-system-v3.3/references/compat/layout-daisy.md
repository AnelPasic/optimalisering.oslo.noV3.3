# Daisy UI Wireframe Blueprint (Universal System File)

This file serves as a styleguide-agnostic layout specification for **Daisy UI & Tailwind CSS**. Copy and append this to your project-specific `design.md` or feed it directly as a prompt/context for automated coding engines (like Antigravity, Codex, or Claude Code) to build lightning-fast, high-converting layouts.

---

## 1. Global Setup (Daisy UI Semantic Core)
To ensure accessibility, seamless dark/light mode toggles, and instant styling, your HTML envelope must utilize Daisy UI's semantic framework:

*   **HTML Envelope:** Utilize `<html data-theme="light" class="scroll-smooth">` for the container. Toggling themes is as simple as switching the `data-theme` attribute (e.g., `dark`, `corporate`, `nord`).
*   **Colors:** Always use Daisy UI semantic color classes instead of raw hex values:
    *   `bg-base-100` (Main background)
    *   `text-neutral` or `text-base-content` (Main body copy)
    *   `btn-primary` (Branding actions)
    *   `btn-accent` (Main high-contrast CTA button)
    *   `badge-success`, `badge-warning`, `badge-error` (Status indicator tags)

---

## 2. Above-the-Fold Section (Responsive Daisy Hero)
The above-the-fold interface must be encapsulated in a single responsive container:

```html
<section class="hero min-h-[85vh] bg-base-100 py-12 px-4 md:px-8">
  <div class="hero-content flex-col lg:flex-row gap-12 max-w-7xl">
    <!-- LEFT: Copy & Contact Form -->
    <!-- RIGHT: Hero Illustration/Visual Proof Card -->
  </div>
</section>
```

### A. Left Column Setup (Lead Capture Block)
*   **Social Proof Star Badge:** 
    Use a Daisy UI rating block to immediately establish trust above the fold.
    ```html
    <div class="inline-flex items-center gap-2 bg-base-200 text-neutral text-xs font-semibold px-3 py-1.5 rounded-full">
      <div class="rating rating-xs">
        <input type="radio" class="mask mask-star-2 bg-warning" disabled checked />
        <input type="radio" class="mask mask-star-2 bg-warning" disabled checked />
        <input type="radio" class="mask mask-star-2 bg-warning" disabled checked />
        <input type="radio" class="mask mask-star-2 bg-warning" disabled checked />
        <input type="radio" class="mask mask-star-2 bg-warning" disabled checked />
      </div>
      <span>4.9/5 Rating – Trusted by [X] Brands</span>
    </div>
    ```
*   **Headline (`h1`):** Size must be set to `text-4xl md:text-5xl lg:text-6xl font-black text-neutral leading-[1.1] tracking-tight`. Use the **"So That"** formula for the main text.
*   **Sub-Headline (`p`):** Size `text-lg text-base-content/70`. Use the **"Without"** pain-reduction qualifier.
*   **Lead Capture Card:** Keep fields vertically stacked (`flex flex-col gap-4`) inside a `card bg-base-100 border border-base-200 shadow-2xl p-6` container.
    *   **Fields:** Include 3 clean, stacked inputs (Website, Phone, Email) using:
        `<input type="..." class="input input-bordered w-full" required />`
    *   **Action Button:** Set to `btn btn-accent btn-lg w-full text-white font-bold tracking-wide`.

---

## 3. Social Proof Section (The Anti-Carousel Stacked Grid)
*   **Layout Rule:** Testimonials must never be hidden inside carousel sliders. 
*   **Daisy Component:** Arrange reviews in a stacked grid (`grid grid-cols-1 md:grid-cols-2 gap-6`) using Daisy UI Card panels:
    ```html
    <div class="card bg-base-100 border border-base-300 shadow-md p-6 space-y-4">
      <div class="flex items-center gap-3">
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content rounded-full w-12 font-bold">[Initials]</div>
        </div>
        <div>
          <h3 class="font-bold text-lg">[Client Name]</h3>
          <p class="text-xs text-base-content/60">[Title, Company]</p>
        </div>
      </div>
      <p class="text-base-content/80 text-sm italic">"[Testimonial Quote...]"</p>
      <div class="badge badge-success text-xs font-bold p-3">[Measurable Outcome, e.g., +64% Conversions]</div>
    </div>
    ```

---

## 4. "How It Works" Section (Strict 3-Step Flow)
*   **Constraint:** Do not exceed 3 or 4 simple visual steps to prevent cognitive overload.
*   **Daisy Component:** Wrap columns in a clean container (`grid grid-cols-1 md:grid-cols-3 gap-8`), styled using Daisy UI avatar placeholders for step counts:
    ```html
    <div class="card bg-base-100 p-6 border border-base-200 shadow-sm items-center text-center">
      <div class="avatar placeholder mb-4">
        <div class="bg-primary text-primary-content rounded-full w-12 font-black text-lg">[Step Number 1-3]</div>
      </div>
      <h3 class="text-xl font-bold">[Step Title]</h3>
      <p class="text-base-content/70 text-sm mt-2">[Frictionless description of actions and outcomes]</p>
    </div>
    ```

---

## 5. FAQ Accordion Block (Zero-JS Objections Handling)
To keep the site load speed fast while handling critical buyer objections in real-time, use Daisy UI's native, pure-CSS accordion components:

```html
<div class="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="faq-accordion" checked="checked" /> 
  <div class="collapse-title text-lg font-bold">
    [FUD/Objection Phrase written as a Question?]
  </div>
  <div class="collapse-content text-sm text-base-content/80">
    <p>[Logical, comforting explanation proving success likelihood/removing sacrifice.]</p>
  </div>
</div>
```

---

## 6. Footer Closer Section (Conversion-Focused Close)
*   **Layout Rule:** Mirror the Above-the-Fold header precisely.
*   **Daisy Component:** Wrap in a `py-20 px-6 bg-neutral text-neutral-content text-center relative overflow-hidden` wrapper. Inside, place a carbon copy of the 3-field contact card styled to contrast beautifully against the dark background.
