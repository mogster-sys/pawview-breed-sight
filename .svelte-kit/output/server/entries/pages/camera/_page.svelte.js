import { x as spread_props, w as slot, y as sanitize_props, z as head, F as attr, G as attr_class, J as ensure_array_like, K as stringify } from "../../../chunks/index2.js";
import { l as ssr_context, k as escape_html } from "../../../chunks/context.js";
import "clsx";
import "../../../chunks/photoGallery.js";
import { I as Icon } from "../../../chunks/Icon.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Flip_horizontal($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" }],
    ["path", { "d": "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "M12 14v2" }],
    ["path", { "d": "M12 8v2" }],
    ["path", { "d": "M12 2v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "flip-horizontal" },
    $$sanitized_props,
    {
      /**
       * @component @name FlipHorizontal
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAzSDVhMiAyIDAgMCAwLTIgMnYxNGMwIDEuMS45IDIgMiAyaDMiIC8+CiAgPHBhdGggZD0iTTE2IDNoM2EyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJoLTMiIC8+CiAgPHBhdGggZD0iTTEyIDIwdjIiIC8+CiAgPHBhdGggZD0iTTEyIDE0djIiIC8+CiAgPHBhdGggZD0iTTEyIDh2MiIgLz4KICA8cGF0aCBkPSJNMTIgMnYyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/flip-horizontal
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Save($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      }
    ],
    ["path", { "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
    ["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "save" },
    $$sanitized_props,
    {
      /**
       * @component @name Save
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUuMiAzYTIgMiAwIDAgMSAxLjQuNmwzLjggMy44YTIgMiAwIDAgMSAuNiAxLjRWMTlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yeiIgLz4KICA8cGF0aCBkPSJNMTcgMjF2LTdhMSAxIDAgMCAwLTEtMUg4YTEgMSAwIDAgMC0xIDF2NyIgLz4KICA8cGF0aCBkPSJNNyAzdjRhMSAxIDAgMCAwIDEgMWg3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/save
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Settings($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "settings" },
    $$sanitized_props,
    {
      /**
       * @component @name Settings
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIuMjIgMmgtLjQ0YTIgMiAwIDAgMC0yIDJ2LjE4YTIgMiAwIDAgMS0xIDEuNzNsLS40My4yNWEyIDIgMCAwIDEtMiAwbC0uMTUtLjA4YTIgMiAwIDAgMC0yLjczLjczbC0uMjIuMzhhMiAyIDAgMCAwIC43MyAyLjczbC4xNS4xYTIgMiAwIDAgMSAxIDEuNzJ2LjUxYTIgMiAwIDAgMS0xIDEuNzRsLS4xNS4wOWEyIDIgMCAwIDAtLjczIDIuNzNsLjIyLjM4YTIgMiAwIDAgMCAyLjczLjczbC4xNS0uMDhhMiAyIDAgMCAxIDIgMGwuNDMuMjVhMiAyIDAgMCAxIDEgMS43M1YyMGEyIDIgMCAwIDAgMiAyaC40NGEyIDIgMCAwIDAgMi0ydi0uMThhMiAyIDAgMCAxIDEtMS43M2wuNDMtLjI1YTIgMiAwIDAgMSAyIDBsLjE1LjA4YTIgMiAwIDAgMCAyLjczLS43M2wuMjItLjM5YTIgMiAwIDAgMC0uNzMtMi43M2wtLjE1LS4wOGEyIDIgMCAwIDEtMS0xLjc0di0uNWEyIDIgMCAwIDEgMS0xLjc0bC4xNS0uMDlhMiAyIDAgMCAwIC43My0yLjczbC0uMjItLjM4YTIgMiAwIDAgMC0yLjczLS43M2wtLjE1LjA4YTIgMiAwIDAgMS0yIDBsLS40My0uMjVhMiAyIDAgMCAxLTEtMS43M1Y0YTIgMiAwIDAgMC0yLTJ6IiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/settings
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
const breedConfigurations = {
  // Visual Streak breeds - optimized for horizon scanning and motion detection
  "labrador": {
    name: "Labrador Retriever",
    retinalMode: "visual-streak",
    description: "Wide peripheral vision for hunting and retrieving"
  },
  "greyhound": {
    name: "Greyhound",
    retinalMode: "visual-streak",
    description: "Exceptional motion tracking for pursuit"
  },
  "golden-retriever": {
    name: "Golden Retriever",
    retinalMode: "visual-streak",
    description: "Wide field vision for hunting"
  },
  "german-shepherd": {
    name: "German Shepherd",
    retinalMode: "visual-streak",
    description: "Alert scanning for herding and protection"
  },
  "collie": {
    name: "Border Collie",
    retinalMode: "visual-streak",
    description: "Wide vision for herding livestock"
  },
  "doberman": {
    name: "Doberman Pinscher",
    retinalMode: "visual-streak",
    description: "Vigilant scanning for guarding"
  },
  "german-pointer": {
    name: "German Shorthaired Pointer",
    retinalMode: "visual-streak",
    description: "Hunting and pointing vision"
  },
  "siberian-husky": {
    name: "Siberian Husky",
    retinalMode: "visual-streak",
    description: "Wide field vision for sledding"
  },
  "australian-shepherd": {
    name: "Australian Shepherd",
    retinalMode: "visual-streak",
    description: "Herding vision with wide periphery"
  },
  "rottweiler": {
    name: "Rottweiler",
    retinalMode: "visual-streak",
    description: "Guarding and protection vision"
  },
  "great-dane": {
    name: "Great Dane",
    retinalMode: "visual-streak",
    description: "Large breed with wide field vision"
  },
  "borzoi": {
    name: "Borzoi (Russian Wolfhound)",
    retinalMode: "visual-streak",
    description: "Sight hound with extreme motion tracking"
  },
  "saluki": {
    name: "Saluki",
    retinalMode: "visual-streak",
    description: "Ancient sight hound with pursuit vision"
  },
  "afghan-hound": {
    name: "Afghan Hound",
    retinalMode: "visual-streak",
    description: "Sight hound optimized for hunting"
  },
  "dachshund": {
    name: "Dachshund",
    retinalMode: "visual-streak",
    description: "Low profile hunting vision"
  },
  // Area Centralis breeds - optimized for central focus and close-up tasks
  "pug": {
    name: "Pug",
    retinalMode: "area-centralis",
    description: "Brachycephalic with central focus"
  },
  "beagle": {
    name: "Beagle",
    retinalMode: "area-centralis",
    description: "Scent hound with focused vision"
  },
  "bulldog": {
    name: "English Bulldog",
    retinalMode: "area-centralis",
    description: "Brachycephalic companion breed"
  },
  "french-bulldog": {
    name: "French Bulldog",
    retinalMode: "area-centralis",
    description: "Flat-faced with central focus"
  },
  "boxer": {
    name: "Boxer",
    retinalMode: "area-centralis",
    description: "Brachycephalic working breed"
  },
  "poodle": {
    name: "Poodle",
    retinalMode: "area-centralis",
    description: "Companion breed with detailed vision"
  },
  "corgi": {
    name: "Welsh Corgi",
    retinalMode: "area-centralis",
    description: "Short-legged herder with close focus"
  },
  "miniature-schnauzer": {
    name: "Miniature Schnauzer",
    retinalMode: "area-centralis",
    description: "Small breed with attentive vision"
  },
  "yorkshire-terrier": {
    name: "Yorkshire Terrier",
    retinalMode: "area-centralis",
    description: "Toy breed with focused vision"
  },
  "shih-tzu": {
    name: "Shih Tzu",
    retinalMode: "area-centralis",
    description: "Flat-faced companion breed"
  },
  "cavalier": {
    name: "Cavalier King Charles Spaniel",
    retinalMode: "area-centralis",
    description: "Companion breed with central focus"
  },
  // Custom for user experimentation
  "custom": {
    name: "Custom",
    retinalMode: "visual-streak",
    description: "Manual configuration"
  }
};
function getRetinalModeForBreed(breed) {
  return breedConfigurations[breed].retinalMode;
}
function getBreedsByRetinalMode() {
  const visualStreak = [];
  const areaCentralis = [];
  Object.keys(breedConfigurations).forEach((breed) => {
    if (breed === "custom") return;
    if (breedConfigurations[breed].retinalMode === "visual-streak") {
      visualStreak.push(breed);
    } else {
      areaCentralis.push(breed);
    }
  });
  return {
    "visual-streak": visualStreak,
    "area-centralis": areaCentralis
  };
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let breed = "labrador";
    let retinalMode = "visual-streak";
    let filters = { dichro: true, contrast: false, brightness: false };
    let galleryCount = 0;
    let isLandscape = false;
    let canvasWidth = 0;
    let canvasHeight = 0;
    const breedsByRetinal = getBreedsByRetinalMode();
    function updateOrientation() {
      isLandscape = window.innerWidth > window.innerHeight;
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
    }
    onDestroy(() => {
      window.removeEventListener("resize", updateOrientation);
    });
    {
      retinalMode = getRetinalModeForBreed(breed);
    }
    head("ho7xw4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dog Vision Camera</title>`);
      });
    });
    $$renderer2.push(`<div class="fixed inset-0 bg-black overflow-hidden"><div class="absolute inset-0">`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<canvas${attr("width", canvasWidth)}${attr("height", canvasHeight)} class="w-full h-full object-cover"></canvas>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <div id="flash" class="absolute inset-0 bg-white pointer-events-none transition-opacity duration-150" style="opacity: 0;"></div> <div class="absolute top-0 left-0 right-0 p-4 flex items-center justify-between"><a href="/" data-sveltekit-reload="" class="bg-black/70 backdrop-blur text-white p-3 rounded-full"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></a> <div class="flex gap-2 bg-black/70 backdrop-blur rounded-full p-1"><button${attr_class(`px-4 py-2 rounded-full font-semibold text-sm transition ${stringify("bg-white text-black")}`)}>Dog</button> <button${attr_class(`px-4 py-2 rounded-full font-semibold text-sm transition ${stringify("text-white")}`)}>Split</button> <button${attr_class(`px-4 py-2 rounded-full font-semibold text-sm transition ${stringify("text-white")}`)}>Normal</button></div> `);
    if (!isLandscape) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="bg-black/70 backdrop-blur text-white p-3 rounded-full">`);
      {
        $$renderer2.push("<!--[!-->");
        Settings($$renderer2, { size: 24 });
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="w-12"></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-6 items-end px-4"><button class="bg-white/90 backdrop-blur p-4 rounded-full shadow-2xl hover:bg-white transition">`);
    Flip_horizontal($$renderer2, { size: 28, class: "text-gray-800" });
    $$renderer2.push(`<!----></button> <button class="bg-blue-600 p-6 rounded-full shadow-2xl hover:bg-blue-700 transition ring-4 ring-white/30">`);
    Save($$renderer2, { size: 32, class: "text-white" });
    $$renderer2.push(`<!----></button> <a href="/gallery" data-sveltekit-reload="" class="bg-white/90 backdrop-blur px-5 py-4 rounded-full shadow-2xl hover:bg-white transition flex items-center gap-2"><svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span class="text-gray-800 font-semibold">${escape_html(galleryCount)}</span></a></div> `);
    if (isLandscape) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-black via-black/95 to-transparent backdrop-blur-xl p-4 overflow-y-auto border-l border-white/10"><div class="space-y-4 pt-20 pb-24"><div><label class="block text-white font-semibold mb-2 text-sm">Dog Breed</label> `);
      $$renderer2.select(
        {
          value: breed,
          class: "w-full p-3 bg-white/10 text-white text-sm border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur"
        },
        ($$renderer3) => {
          $$renderer3.push(`<optgroup label="Visual Streak (Wide Scanning)"><!--[-->`);
          const each_array = ensure_array_like(breedsByRetinal["visual-streak"]);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let breedKey = each_array[$$index];
            $$renderer3.option({ value: breedKey }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(breedConfigurations[breedKey].name)}`);
            });
          }
          $$renderer3.push(`<!--]--></optgroup><optgroup label="Area Centralis (Central Focus)"><!--[-->`);
          const each_array_1 = ensure_array_like(breedsByRetinal["area-centralis"]);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let breedKey = each_array_1[$$index_1];
            $$renderer3.option({ value: breedKey }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(breedConfigurations[breedKey].name)}`);
            });
          }
          $$renderer3.push(`<!--]--></optgroup>`);
          $$renderer3.option({ value: "custom" }, ($$renderer4) => {
            $$renderer4.push(`Custom Configuration`);
          });
        }
      );
      $$renderer2.push(` `);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-white/60 text-xs mt-2">${escape_html(breedConfigurations[breed].description)}</p>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="bg-white/5 p-3 rounded-xl"><p class="text-white/80 text-xs"><strong>Active Mode:</strong> ${escape_html(retinalMode === "visual-streak" ? "Visual Streak" : "Area Centralis")}</p> <p class="text-white/60 text-xs mt-1">${escape_html(retinalMode === "visual-streak" ? "Wide horizon scanning, enhanced motion detection" : "Central focus, detailed close-up vision")}</p></div>`);
      }
      $$renderer2.push(`<!--]--> <div><label class="block text-white font-semibold mb-2 text-sm">Vision Filters</label> <div class="space-y-2"><label class="flex items-center gap-2 cursor-pointer bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"><input type="checkbox"${attr("checked", filters.dichro, true)} class="w-5 h-5 rounded border-white/20"/> <div><div class="text-white text-xs font-medium">Dichromatic Color</div> <div class="text-white/60 text-xs">Blue-Yellow spectrum</div></div></label> <label class="flex items-center gap-2 cursor-pointer bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"><input type="checkbox"${attr("checked", filters.contrast, true)} class="w-5 h-5 rounded border-white/20"/> <div><div class="text-white text-xs font-medium">Enhanced Contrast</div> <div class="text-white/60 text-xs">Sharper edges</div></div></label> <label class="flex items-center gap-2 cursor-pointer bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"><input type="checkbox"${attr("checked", filters.brightness, true)} class="w-5 h-5 rounded border-white/20"/> <div><div class="text-white text-xs font-medium">Low-Light Boost</div> <div class="text-white/60 text-xs">Rod-cell sensitivity</div></div></label></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attr_class(`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${stringify("translate-y-full")}`)}><div class="bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl p-6 pb-32 rounded-t-3xl shadow-2xl border-t border-white/10"><div class="max-w-2xl mx-auto space-y-6"><div><label class="block text-white font-semibold mb-3 text-lg">Dog Breed</label> `);
      $$renderer2.select(
        {
          value: breed,
          class: "w-full p-4 bg-white/10 text-white border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur"
        },
        ($$renderer3) => {
          $$renderer3.push(`<optgroup label="Visual Streak (Wide Horizon Scanning)"><!--[-->`);
          const each_array_2 = ensure_array_like(breedsByRetinal["visual-streak"]);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let breedKey = each_array_2[$$index_2];
            $$renderer3.option({ value: breedKey }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(breedConfigurations[breedKey].name)}`);
            });
          }
          $$renderer3.push(`<!--]--></optgroup><optgroup label="Area Centralis (Central Focus)"><!--[-->`);
          const each_array_3 = ensure_array_like(breedsByRetinal["area-centralis"]);
          for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
            let breedKey = each_array_3[$$index_3];
            $$renderer3.option({ value: breedKey }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(breedConfigurations[breedKey].name)}`);
            });
          }
          $$renderer3.push(`<!--]--></optgroup>`);
          $$renderer3.option({ value: "custom" }, ($$renderer4) => {
            $$renderer4.push(`Custom Configuration`);
          });
        }
      );
      $$renderer2.push(` `);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-white/70 text-sm mt-2">${escape_html(breedConfigurations[breed].description)}</p>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="bg-white/5 p-4 rounded-xl"><p class="text-white font-medium">Active: ${escape_html(retinalMode === "visual-streak" ? "Visual Streak" : "Area Centralis")}</p> <p class="text-white/70 text-sm mt-1">${escape_html(retinalMode === "visual-streak" ? "Wide horizon scanning with enhanced motion detection at periphery" : "Central focus with sharp detail, blurred periphery")}</p></div>`);
      }
      $$renderer2.push(`<!--]--> <div><label class="block text-white font-semibold mb-3 text-lg">Vision Filters</label> <div class="space-y-3"><label class="flex items-center gap-3 cursor-pointer bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"><input type="checkbox"${attr("checked", filters.dichro, true)} class="w-6 h-6 rounded border-white/20"/> <div><div class="text-white font-medium">Dichromatic Color</div> <div class="text-white/60 text-sm">Blue-Yellow spectrum (no reds)</div></div></label> <label class="flex items-center gap-3 cursor-pointer bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"><input type="checkbox"${attr("checked", filters.contrast, true)} class="w-6 h-6 rounded border-white/20"/> <div><div class="text-white font-medium">Enhanced Contrast</div> <div class="text-white/60 text-sm">Sharper edge detection</div></div></label> <label class="flex items-center gap-3 cursor-pointer bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"><input type="checkbox"${attr("checked", filters.brightness, true)} class="w-6 h-6 rounded border-white/20"/> <div><div class="text-white font-medium">Low-Light Boost</div> <div class="text-white/60 text-sm">Enhanced rod-cell sensitivity</div></div></label></div></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> <video${attr("width", canvasWidth)}${attr("height", canvasHeight)} style="display: none;" playsinline muted autoplay></video></div>`);
  });
}
export {
  _page as default
};
