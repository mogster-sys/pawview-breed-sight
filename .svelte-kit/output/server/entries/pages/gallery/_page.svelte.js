import { O as head, F as ensure_array_like, P as attr } from "../../../chunks/index2.js";
import "../../../chunks/photoGallery.js";
import { k as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let photos = [];
    head("16h6p05", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Photo Gallery - My Doggles</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100"><nav class="bg-white/80 backdrop-blur-sm shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" class="text-2xl font-bold text-blue-800">🐕 My Doggles</a> <div class="flex gap-4"><a href="/camera" class="text-blue-700">Camera</a> <a href="/gallery" class="text-blue-700">Gallery</a> <a href="/learn" class="text-blue-700">Learn</a></div></div></nav> <div class="max-w-6xl mx-auto mt-10 px-4"><h1 class="font-bold text-3xl text-blue-800 mb-6">Photo Gallery</h1> `);
    if (photos.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-20"><p class="text-gray-600 text-lg mb-4">No photos yet!</p> <a href="/camera" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Take Your First Photo</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array = ensure_array_like(photos);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let photo = each_array[$$index];
        $$renderer2.push(`<div class="bg-white rounded-lg shadow-md overflow-hidden"><img${attr("src", photo.imageUrl)} alt="Dog vision" class="w-full aspect-video object-cover"/> <div class="p-4"><div class="flex justify-between items-start mb-2"><div><p class="font-semibold capitalize">${escape_html(photo.breed)}</p> <p class="text-sm text-gray-600">${escape_html(photo.retinalMode)}</p></div> <button class="text-red-600 hover:text-red-800">Delete</button></div> <p class="text-xs text-gray-500">${escape_html(new Date(photo.timestamp).toLocaleDateString())}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
