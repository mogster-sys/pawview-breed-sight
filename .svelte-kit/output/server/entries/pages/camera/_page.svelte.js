import { O as head, P as attr, Q as attr_class, T as attr_style, V as stringify } from "../../../chunks/index2.js";
import "../../../chunks/photoGallery.js";
import { k as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let breed = "labrador";
    let retinalMode = "visual-streak";
    let filters = { dichro: true, contrast: false, brightness: false };
    let galleryCount = 0;
    let viewMode = "split";
    let splitPosition = 50;
    const VIDEO_W = 700;
    const VIDEO_H = 440;
    head("ho7xw4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dog Vision Camera Simulator</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-b from-blue-50/70 to-yellow-50"><nav class="bg-white/80 backdrop-blur-sm shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" class="text-2xl font-bold text-blue-800">🐕 My Doggles</a> <div class="flex gap-4"><a href="/camera" class="text-blue-700">Camera</a> <a href="/gallery" class="text-blue-700">Gallery (${escape_html(galleryCount)})</a> <a href="/learn" class="text-blue-700">Learn</a></div></div></nav> <div class="max-w-4xl mx-auto mt-10 px-4"><h1 class="font-bold text-3xl text-blue-800 mb-6 text-center">Dog Vision Camera</h1> <div class="flex flex-col md:flex-row gap-8"><div class="flex flex-col gap-4 flex-1"><div class="bg-white p-4 rounded-lg shadow"><label class="block text-sm font-medium mb-2">Breed</label> `);
    $$renderer2.select({ value: breed, class: "w-full p-2 border rounded" }, ($$renderer3) => {
      $$renderer3.option({ value: "labrador" }, ($$renderer4) => {
        $$renderer4.push(`Labrador`);
      });
      $$renderer3.option({ value: "greyhound" }, ($$renderer4) => {
        $$renderer4.push(`Greyhound`);
      });
      $$renderer3.option({ value: "pug" }, ($$renderer4) => {
        $$renderer4.push(`Pug`);
      });
      $$renderer3.option({ value: "beagle" }, ($$renderer4) => {
        $$renderer4.push(`Beagle`);
      });
    });
    $$renderer2.push(`</div> <div class="bg-white p-4 rounded-lg shadow"><label class="block text-sm font-medium mb-2">Retinal Mode</label> `);
    $$renderer2.select({ value: retinalMode, class: "w-full p-2 border rounded" }, ($$renderer3) => {
      $$renderer3.option({ value: "visual-streak" }, ($$renderer4) => {
        $$renderer4.push(`Visual Streak (VS)`);
      });
      $$renderer3.option({ value: "area-centralis" }, ($$renderer4) => {
        $$renderer4.push(`Area Centralis (AC)`);
      });
    });
    $$renderer2.push(`</div> <div class="bg-white p-4 rounded-lg shadow"><div class="space-y-2"><label class="flex items-center"><input type="checkbox"${attr("checked", filters.dichro, true)} class="mr-2"/> Dichromatic (Color)</label> <label class="flex items-center"><input type="checkbox"${attr("checked", filters.contrast, true)} class="mr-2"/> Lower Contrast</label> <label class="flex items-center"><input type="checkbox"${attr("checked", filters.brightness, true)} class="mr-2"/> Higher Brightness</label></div></div> <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save to Gallery</button></div> <div class="flex-1"><div class="flex gap-2 mb-4"><button${attr_class("", void 0, { "font-bold": viewMode === "split" })}>Split</button> <button${attr_class("", void 0, { "font-bold": viewMode === "dog" })}>Dog</button> <button${attr_class("", void 0, { "font-bold": viewMode === "human" })}>Human</button></div> <div${attr_style(`width: ${stringify(VIDEO_W)}px; height: ${stringify(VIDEO_H)}px; position: relative;`)}>`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div style="position: relative; overflow: hidden; width: 100%; height: 100%;"><canvas${attr("width", VIDEO_W)}${attr("height", VIDEO_H)} style="position: absolute; left: 0; top: 0; background: #222;"></canvas> <div${attr_style(`position: absolute; left: ${stringify(splitPosition)}%; top: 0; width: ${stringify(100 - splitPosition)}%; height: 100%; overflow: hidden;`)}><canvas${attr("width", VIDEO_W)}${attr("height", VIDEO_H)}${attr_style(`position: absolute; right: 0; top: 0; background: #222; transform: translateX(${stringify((100 - splitPosition) * VIDEO_W / 100)}px);`)}></canvas></div> <input type="range"${attr("value", splitPosition)} min="0" max="100" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4"/></div>`);
    }
    $$renderer2.push(`<!--]--></div> <video${attr("width", VIDEO_W)}${attr("height", VIDEO_H)} style="display: none;" playsinline muted></video></div></div></div></div>`);
  });
}
export {
  _page as default
};
