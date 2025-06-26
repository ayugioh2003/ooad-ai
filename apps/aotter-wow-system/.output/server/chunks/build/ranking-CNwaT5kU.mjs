import { _ as __nuxt_component_0 } from './nuxt-link-jAXwbDa0.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useHead } from './v3-IP17QAdS.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ranking",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Aotter Wow - Wow \u6392\u884C\u699C"
    });
    const loading = ref(true);
    const error = ref("");
    const posts = ref([]);
    const categories = ref([]);
    const selectedCategory = ref("");
    const limit = ref(10);
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toLocaleDateString("zh-TW");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-1525a6dd><nav class="bg-white shadow-sm border-b" data-v-1525a6dd><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-1525a6dd><div class="flex justify-between items-center h-16" data-v-1525a6dd><div class="flex items-center" data-v-1525a6dd>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-bold text-gray-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Aotter <span class="text-purple-600" data-v-1525a6dd${_scopeId}>Wow</span>`);
          } else {
            return [
              createTextVNode(" Aotter "),
              createVNode("span", { class: "text-purple-600" }, "Wow")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center space-x-4" data-v-1525a6dd>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-gray-600 hover:text-purple-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u56DE\u5230\u9996\u9801 `);
          } else {
            return [
              createTextVNode(" \u56DE\u5230\u9996\u9801 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/create",
        class: "wow-button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u767C\u8868\u8CBC\u6587 `);
          } else {
            return [
              createTextVNode(" \u767C\u8868\u8CBC\u6587 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav><main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" data-v-1525a6dd><div class="text-center mb-12" data-v-1525a6dd><h1 class="text-4xl font-bold text-gray-900 mb-4" data-v-1525a6dd> \u{1F3C6} Wow \u6392\u884C\u699C </h1><p class="text-xl text-gray-600" data-v-1525a6dd> \u767C\u73FE\u6700\u53D7\u6B61\u8FCE\u7684\u7CBE\u5F69\u5167\u5BB9 </p></div><div class="wow-card mb-8" data-v-1525a6dd><div class="flex flex-wrap items-center gap-4" data-v-1525a6dd><div data-v-1525a6dd><label for="category-filter" class="block text-sm font-medium text-gray-700 mb-1" data-v-1525a6dd> \u985E\u5225\u7BE9\u9078 </label><select id="category-filter" class="wow-input w-48" data-v-1525a6dd><option value="" data-v-1525a6dd${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>\u6240\u6709\u985E\u5225</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)} data-v-1525a6dd${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), category.id) : ssrLooseEqual(unref(selectedCategory), category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div data-v-1525a6dd><label for="limit-filter" class="block text-sm font-medium text-gray-700 mb-1" data-v-1525a6dd> \u986F\u793A\u6578\u91CF </label><select id="limit-filter" class="wow-input w-32" data-v-1525a6dd><option value="10" data-v-1525a6dd${ssrIncludeBooleanAttr(Array.isArray(unref(limit)) ? ssrLooseContain(unref(limit), "10") : ssrLooseEqual(unref(limit), "10")) ? " selected" : ""}>\u524D 10 \u540D</option><option value="20" data-v-1525a6dd${ssrIncludeBooleanAttr(Array.isArray(unref(limit)) ? ssrLooseContain(unref(limit), "20") : ssrLooseEqual(unref(limit), "20")) ? " selected" : ""}>\u524D 20 \u540D</option><option value="50" data-v-1525a6dd${ssrIncludeBooleanAttr(Array.isArray(unref(limit)) ? ssrLooseContain(unref(limit), "50") : ssrLooseEqual(unref(limit), "50")) ? " selected" : ""}>\u524D 50 \u540D</option></select></div><div class="flex-1" data-v-1525a6dd></div><button class="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded-lg transition-colors" data-v-1525a6dd><svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1525a6dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-1525a6dd></path></svg> \u91CD\u65B0\u6574\u7406 </button></div></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-12" data-v-1525a6dd><div class="inline-flex items-center" data-v-1525a6dd><svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-1525a6dd><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-1525a6dd></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-1525a6dd></path></svg><span class="text-lg text-gray-600" data-v-1525a6dd>\u8F09\u5165\u6392\u884C\u699C\u4E2D...</span></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12" data-v-1525a6dd><div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto" data-v-1525a6dd><p class="text-red-600" data-v-1525a6dd>${ssrInterpolate(unref(error))}</p><button class="mt-4 wow-button" data-v-1525a6dd> \u91CD\u8A66 </button></div></div>`);
      } else if (unref(posts).length === 0) {
        _push(`<div class="text-center py-12" data-v-1525a6dd><div class="text-gray-500" data-v-1525a6dd><svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1525a6dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-1525a6dd></path></svg><p class="text-lg" data-v-1525a6dd>\u76EE\u524D\u9084\u6C92\u6709\u8CBC\u6587</p><p class="text-sm mt-2" data-v-1525a6dd>\u6210\u70BA\u7B2C\u4E00\u500B\u767C\u6587\u7684\u4EBA\u5427\uFF01</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/create",
          class: "wow-button mt-4 inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u7ACB\u5373\u767C\u6587 `);
            } else {
              return [
                createTextVNode(" \u7ACB\u5373\u767C\u6587 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="space-y-4" data-v-1525a6dd><!--[-->`);
        ssrRenderList(unref(posts), (post, index) => {
          var _a, _b;
          _push(`<div class="wow-card hover:shadow-lg transition-all duration-200" data-v-1525a6dd><div class="flex items-start space-x-4" data-v-1525a6dd><div class="flex-shrin-0" data-v-1525a6dd><div class="${ssrRenderClass([
            "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
            index === 0 ? "bg-yellow-100 text-yellow-800" : index === 1 ? "bg-gray-100 text-gray-800" : index === 2 ? "bg-orange-100 text-orange-800" : "bg-purple-100 text-purple-800"
          ])}" data-v-1525a6dd>${ssrInterpolate(index + 1)}</div></div><div class="flex-1 min-w-0" data-v-1525a6dd><div class="flex items-start justify-between" data-v-1525a6dd><div class="flex-1" data-v-1525a6dd><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-1525a6dd>${ssrInterpolate(post.title)}</h3><p class="text-gray-600 mb-3 line-clamp-2" data-v-1525a6dd>${ssrInterpolate(post.content)}</p><div class="flex items-center space-x-4 text-sm text-gray-500" data-v-1525a6dd><span class="flex items-center" data-v-1525a6dd><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1525a6dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-1525a6dd></path></svg> ${ssrInterpolate((_a = post.author) == null ? void 0 : _a.username)}</span><span class="flex items-center" data-v-1525a6dd><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1525a6dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-1525a6dd></path></svg> ${ssrInterpolate((_b = post.category) == null ? void 0 : _b.name)}</span><span data-v-1525a6dd>${ssrInterpolate(formatDate(post.publishDate))}</span></div></div><div class="flex items-center space-x-2 ml-4" data-v-1525a6dd><div class="flex items-center space-x-1 bg-purple-50 text-purple-600 px-3 py-2 rounded-full" data-v-1525a6dd><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-1525a6dd><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" data-v-1525a6dd></path></svg><span class="font-bold" data-v-1525a6dd>${ssrInterpolate(post.wowCount)}</span></div></div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(posts).length >= unref(limit) && !unref(loading)) {
        _push(`<div class="text-center mt-8" data-v-1525a6dd><button class="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 font-bold py-2 px-6 rounded-lg transition-all duration-200" data-v-1525a6dd> \u986F\u793A\u66F4\u591A </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ranking.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ranking = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1525a6dd"]]);

export { ranking as default };
//# sourceMappingURL=ranking-CNwaT5kU.mjs.map
