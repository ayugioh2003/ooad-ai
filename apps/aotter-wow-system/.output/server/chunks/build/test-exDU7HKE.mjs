import { _ as __nuxt_component_0 } from './nuxt-link-jAXwbDa0.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "test",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u529F\u80FD\u6E2C\u8A66 - Aotter Wow \u7CFB\u7D71"
    });
    const currentUser = ref(null);
    const isLoggedIn = computed(() => !!currentUser.value);
    const wowLoading = ref(false);
    const wowResult = ref(null);
    const apiResult = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wow-container py-8" }, _attrs))}><div class="wow-card mb-8"><h2 class="text-2xl font-semibold mb-4">\u7528\u6236\u72C0\u614B\u7BA1\u7406\u6E2C\u8A66</h2>`);
      if (!unref(isLoggedIn)) {
        _push(`<div class="space-y-4"><p class="text-gray-600">\u76EE\u524D\u672A\u767B\u5165</p><div class="flex space-x-4"><button class="wow-button"> \u6A21\u64EC\u767B\u5165 </button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth",
          class: "wow-button-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u524D\u5F80\u767B\u5165\u9801 `);
            } else {
              return [
                createTextVNode(" \u524D\u5F80\u767B\u5165\u9801 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="space-y-4"><p class="text-green-600">\u5DF2\u767B\u5165\u7528\u6236\uFF1A${ssrInterpolate((_a = unref(currentUser)) == null ? void 0 : _a.username)}</p><button class="wow-button-secondary"> \u767B\u51FA </button></div>`);
      }
      _push(`</div><div class="wow-card mb-8"><h2 class="text-2xl font-semibold mb-4">Wow \u8A55\u50F9\u529F\u80FD\u6E2C\u8A66</h2><div class="space-y-4"><div class="flex items-center space-x-4"><span>\u6E2C\u8A66\u8CBC\u6587 ID: post_1</span><button class="wow-button"${ssrIncludeBooleanAttr(unref(wowLoading)) ? " disabled" : ""}>${ssrInterpolate(unref(wowLoading) ? "\u8655\u7406\u4E2D..." : "\u2764\uFE0F \u9EDE\u8B9A")}</button><button class="wow-button"${ssrIncludeBooleanAttr(unref(wowLoading)) ? " disabled" : ""}>${ssrInterpolate(unref(wowLoading) ? "\u8655\u7406\u4E2D..." : "\u{1F62E} \u9A5A\u8277")}</button></div>`);
      if (unref(wowResult)) {
        _push(`<div class="${ssrRenderClass([unref(wowResult).success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800", "p-4 rounded-md"])}"><p class="font-medium">${ssrInterpolate(unref(wowResult).success ? "\u6210\u529F" : "\u5931\u6557")}</p><p class="text-sm mt-1">${ssrInterpolate(unref(wowResult).message)}</p>`);
        if (unref(wowResult).data) {
          _push(`<pre class="text-xs mt-2 p-2 bg-gray-100 rounded">${ssrInterpolate(JSON.stringify(unref(wowResult).data, null, 2))}</pre>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="wow-card mb-8"><h2 class="text-2xl font-semibold mb-4">API \u7AEF\u9EDE\u6E2C\u8A66</h2><div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><button class="wow-button-outline"> \u6E2C\u8A66\u5206\u985E API </button><button class="wow-button-outline"> \u6E2C\u8A66\u8CBC\u6587 API </button></div>`);
      if (unref(apiResult)) {
        _push(`<div class="p-4 bg-gray-50 rounded-md"><p class="font-medium mb-2">API \u56DE\u61C9:</p><pre class="text-sm overflow-auto">${ssrInterpolate(JSON.stringify(unref(apiResult), null, 2))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="wow-card"><h2 class="text-2xl font-semibold mb-4">\u5DF2\u5B8C\u6210\u7684\u6838\u5FC3\u529F\u80FD</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-3"><h3 class="font-semibold text-green-600">\u2705 \u5DF2\u5BE6\u4F5C</h3><ul class="space-y-2 text-sm"><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-green-500 rounded-full"></span><span>\u5C08\u6848\u57FA\u790E\u67B6\u69CB (Nuxt 3 + TypeScript)</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-green-500 rounded-full"></span><span>\u8CC7\u6599\u578B\u5225\u5B9A\u7FA9\u8207\u67B6\u69CB\u8A2D\u8A08</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-green-500 rounded-full"></span><span>\u8A18\u61B6\u9AD4\u8CC7\u6599\u5EAB\u5BE6\u4F5C</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-green-500 rounded-full"></span><span>API \u7AEF\u9EDE\u57FA\u790E\u67B6\u69CB</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-green-500 rounded-full"></span><span>\u524D\u7AEF\u9801\u9762\u8207\u7D44\u4EF6</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-green-500 rounded-full"></span><span>\u97FF\u61C9\u5F0F UI \u8A2D\u8A08</span></li></ul></div><div class="space-y-3"><h3 class="font-semibold text-yellow-600">\u{1F504} \u9032\u884C\u4E2D</h3><ul class="space-y-2 text-sm"><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-yellow-500 rounded-full"></span><span>API TypeScript \u985E\u578B\u4FEE\u6B63</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-yellow-500 rounded-full"></span><span>Wow \u8A55\u50F9\u529F\u80FD\u5BE6\u4F5C</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-yellow-500 rounded-full"></span><span>\u7528\u6236\u8A8D\u8B49\u72C0\u614B\u7BA1\u7406</span></li><li class="flex items-center space-x-2"><span class="w-2 h-2 bg-yellow-500 rounded-full"></span><span>\u8CBC\u6587 CRUD \u529F\u80FD</span></li></ul></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=test-exDU7HKE.mjs.map
