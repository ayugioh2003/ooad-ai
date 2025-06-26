import { _ as __nuxt_component_0 } from './nuxt-link-jAXwbDa0.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useHead } from './v3-IP17QAdS.mjs';
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
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Aotter Wow - \u6B63\u5411\u8A55\u50F9\u793E\u7FA4"
    });
    const user = ref(null);
    const posts = ref([]);
    const loading = ref(true);
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toLocaleDateString("zh-TW");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><nav class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center"><h1 class="text-2xl font-bold text-gray-900"> Aotter <span class="text-purple-600">Wow</span></h1></div><div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u9996\u9801 `);
          } else {
            return [
              createTextVNode(" \u9996\u9801 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/ranking",
        class: "text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Wow \u6392\u884C\u699C `);
          } else {
            return [
              createTextVNode(" Wow \u6392\u884C\u699C ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/create",
        class: "text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
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
      _push(`</div></div><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<!--[--><span class="text-sm text-gray-700">\u6B61\u8FCE\uFF0C${ssrInterpolate(unref(user).username)}</span><button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"> \u767B\u51FA </button><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth",
          class: "wow-button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u767B\u5165 / \u8A3B\u518A `);
            } else {
              return [
                createTextVNode(" \u767B\u5165 / \u8A3B\u518A ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></div></nav><main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4"> \u6B61\u8FCE\u4F86\u5230 Aotter Wow </h2><p class="text-xl text-gray-600 mb-8"> \u5206\u4EAB\u7F8E\u597D\u4E8B\u7269\uFF0C\u7D66\u4E88\u6B63\u5411\u8A55\u50F9\uFF0C\u8B93\u4E16\u754C\u66F4\u52A0\u7F8E\u597D\uFF01 </p>`);
      if (!unref(user)) {
        _push(`<div class="space-x-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth",
          class: "wow-button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u7ACB\u5373\u52A0\u5165 `);
            } else {
              return [
                createTextVNode(" \u7ACB\u5373\u52A0\u5165 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 font-bold py-2 px-4 rounded-lg transition-all duration-200"> \u4E86\u89E3\u66F4\u591A </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid md:grid-cols-3 gap-8 mb-12"><div class="wow-card text-center"><div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-2">\u767C\u8868\u8CBC\u6587</h3><p class="text-gray-600">\u5206\u4EAB\u4F60\u7684\u7F8E\u597D\u9AD4\u9A57\uFF0C\u8B93\u5176\u4ED6\u4EBA\u4E5F\u80FD\u767C\u73FE\u597D\u4E8B\u7269</p></div><div class="wow-card text-center"><div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-2">\u7D66\u4E88 Wow</h3><p class="text-gray-600">\u5C0D\u559C\u6B61\u7684\u5167\u5BB9\u7D66\u4E88 Wow \u8A55\u50F9\uFF0C\u50B3\u905E\u6B63\u5411\u80FD\u91CF</p></div><div class="wow-card text-center"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-2">\u67E5\u770B\u6392\u884C</h3><p class="text-gray-600">\u63A2\u7D22\u6700\u53D7\u6B61\u8FCE\u7684\u5167\u5BB9\uFF0C\u767C\u73FE\u66F4\u591A\u7CBE\u5F69</p></div></div><div class="wow-card"><h3 class="text-2xl font-bold text-gray-900 mb-6">\u6700\u65B0\u8CBC\u6587</h3>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> \u8F09\u5165\u4E2D... </div></div>`);
      } else if (unref(posts).length === 0) {
        _push(`<div class="text-center py-8 text-gray-500"> \u9084\u6C92\u6709\u4EFB\u4F55\u8CBC\u6587\uFF0C\u6210\u70BA\u7B2C\u4E00\u500B\u767C\u6587\u7684\u4EBA\u5427\uFF01 </div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(posts), (post) => {
          var _a, _b;
          _push(`<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"><div class="flex items-start justify-between"><div class="flex-1"><h4 class="text-lg font-semibold text-gray-900 mb-2">${ssrInterpolate(post.title)}</h4><p class="text-gray-600 mb-3">${ssrInterpolate(post.content)}</p><div class="flex items-center space-x-4 text-sm text-gray-500"><span>${ssrInterpolate((_a = post.author) == null ? void 0 : _a.username)}</span><span>${ssrInterpolate((_b = post.category) == null ? void 0 : _b.name)}</span><span>${ssrInterpolate(formatDate(post.publishDate))}</span></div></div><div class="flex items-center space-x-2"><button class="flex items-center space-x-1 text-purple-600 hover:text-purple-700"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg><span>${ssrInterpolate(post.wowCount)}</span></button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="text-center mt-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/posts",
        class: "text-purple-600 hover:text-purple-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u67E5\u770B\u66F4\u591A\u8CBC\u6587 \u2192 `);
          } else {
            return [
              createTextVNode(" \u67E5\u770B\u66F4\u591A\u8CBC\u6587 \u2192 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BEOPHI7T.mjs.map
