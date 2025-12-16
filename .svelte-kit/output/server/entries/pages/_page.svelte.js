import { x as spread_props, w as slot, y as sanitize_props, z as head } from "../../chunks/index2.js";
import { I as Icon } from "../../chunks/Icon.js";
function Book_text($$renderer, $$props) {
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
        "d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { "d": "M8 11h8" }],
    ["path", { "d": "M8 7h6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "book-text" },
    $$sanitized_props,
    {
      /**
       * @component @name BookText
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCAxOS41di0xNUEyLjUgMi41IDAgMCAxIDYuNSAySDE5YTEgMSAwIDAgMSAxIDF2MThhMSAxIDAgMCAxLTEgMUg2LjVhMSAxIDAgMCAxIDAtNUgyMCIgLz4KICA8cGF0aCBkPSJNOCAxMWg4IiAvPgogIDxwYXRoIGQ9Ik04IDdoNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/book-text
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
function Camera($$renderer, $$props) {
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
        "d": "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
      }
    ],
    ["circle", { "cx": "12", "cy": "13", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "camera" },
    $$sanitized_props,
    {
      /**
       * @component @name Camera
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQuNSA0aC01TDcgN0g0YTIgMiAwIDAgMC0yIDJ2OWEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yaC0zbC0yLjUtM3oiIC8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMyIgcj0iMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/camera
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
function Folder($$renderer, $$props) {
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
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "folder" },
    $$sanitized_props,
    {
      /**
       * @component @name Folder
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMjBhMiAyIDAgMCAwIDItMlY4YTIgMiAwIDAgMC0yLTJoLTcuOWEyIDIgMCAwIDEtMS42OS0uOUw5LjYgMy45QTIgMiAwIDAgMCA3LjkzIDNINGEyIDIgMCAwIDAtMiAydjEzYTIgMiAwIDAgMCAyIDJaIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/folder
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
function _page($$renderer) {
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>My Doggles - See Through Your Dog's Eyes</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Experience the world as your dog does. Simulate dog vision with breed-specific filters, retinal configurations, and live camera effects."/>`);
  });
  $$renderer.push(`<div class="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100"><nav class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" data-sveltekit-reload="" class="text-2xl font-bold text-blue-800">🐕 My Doggles</a> <div class="flex gap-4"><a href="/camera" data-sveltekit-reload="" class="text-blue-700 hover:text-blue-900">Camera</a> <a href="/gallery" data-sveltekit-reload="" class="text-blue-700 hover:text-blue-900">Gallery</a> <a href="/learn" data-sveltekit-reload="" class="text-blue-700 hover:text-blue-900">Learn</a></div></div></nav> <div class="max-w-5xl mx-auto py-8 px-2"><header class="my-10 text-center"><h1 class="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow">🦴 My Doggles</h1> <h2 class="text-xl font-medium text-blue-700 mb-8">Your dog sees the world different to you, share their experience with My Doggles</h2> <div class="text-lg text-gray-800 max-w-2xl mx-auto mb-7">All dogs' experience of color is different to humans, lacking red but did you know their visual field differs across breeds according to which of two configurations of retinal cells your dog has, an Area Centralis or Visual Streak. Select your dog's breed, activate the live camera filter, and see exactly how different dogs experience vision. Educational, fun, and science-backed!</div></header> <div class="flex flex-wrap gap-8 justify-center items-stretch mt-10 mb-24"><a href="/camera" data-sveltekit-reload="" class="flex flex-col justify-between items-center border rounded-xl bg-white shadow-md hover:shadow-xl transition p-8 min-w-[260px] h-64 group"><div class="mb-4">`);
  Camera($$renderer, { class: "text-yellow-400", size: 54 });
  $$renderer.push(`<!----></div> <div><div class="font-semibold text-xl text-blue-900 group-hover:text-yellow-500">Live Dog Vision Camera</div> <div class="text-gray-500 mt-2">See through your dog's eyes in real time—choose retinal mode (AC/VS), split view comparison. Capture and save filtered 'dog view' photos!</div></div></a> <a href="/gallery" data-sveltekit-reload="" class="flex flex-col justify-between items-center border rounded-xl bg-white shadow-md hover:shadow-xl transition p-8 min-w-[260px] h-64 group"><div class="mb-4">`);
  Folder($$renderer, { class: "text-blue-400", size: 50 });
  $$renderer.push(`<!----></div> <div><div class="font-semibold text-xl text-blue-900 group-hover:text-yellow-500">Photo Gallery</div> <div class="text-gray-500 mt-2">View and compare your saved dog vision photos side-by-side. Analyze different breeds and retinal configurations.</div></div></a> <a href="/learn" data-sveltekit-reload="" class="flex flex-col justify-between items-center border rounded-xl bg-white shadow-md hover:shadow-xl transition p-8 min-w-[260px] h-64 group"><div class="mb-4">`);
  Book_text($$renderer, { class: "text-blue-500", size: 50 });
  $$renderer.push(`<!----></div> <div><div class="font-semibold text-xl text-blue-900 group-hover:text-yellow-500">Learn &amp; Compare</div> <div class="text-gray-500 mt-2">Dive into breed vision facts, simulator types, and interactive education.</div></div></a></div></div></div>`);
}
export {
  _page as default
};
