import { z as head, F as attr } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { k as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    head("1s728sz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Sign In - My Doggles</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100 flex items-center justify-center"><div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"><h1 class="text-3xl font-bold text-blue-800 mb-6 text-center">${escape_html("Sign In")}</h1> <form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" id="email"${attr("value", email)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/></div> <div><label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label> <input type="password" id="password"${attr("value", password)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/></div> <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">${escape_html("Sign In")}</button></form> <div class="mt-4 text-center"><button class="text-blue-600 hover:underline text-sm">${escape_html(
      "Need an account? Sign up"
    )}</button></div></div></div>`);
  });
}
export {
  _page as default
};
