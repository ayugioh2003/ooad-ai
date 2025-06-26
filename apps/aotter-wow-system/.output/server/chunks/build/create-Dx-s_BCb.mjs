import { _ as __nuxt_component_0 } from './nuxt-link-jAXwbDa0.mjs';
import { defineComponent, ref, reactive, computed, watch, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Aotter Wow - \u767C\u8868\u8CBC\u6587"
    });
    const loading = ref(false);
    const error = ref("");
    const success = ref("");
    const categories = ref([]);
    const form = reactive({
      title: "",
      content: "",
      categoryId: ""
    });
    const selectedCategoryName = computed(() => {
      if (!form.categoryId) return "";
      const category = categories.value.find((c) => c.id === Number(form.categoryId));
      return (category == null ? void 0 : category.name) || "";
    });
    watch([() => form.title, () => form.content, () => form.categoryId], () => {
      if (error.value) {
        error.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><nav class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-bold text-gray-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Aotter <span class="text-purple-600"${_scopeId}>Wow</span>`);
          } else {
            return [
              createTextVNode(" Aotter "),
              createVNode("span", { class: "text-purple-600" }, "Wow")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center space-x-4">`);
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
      _push(`</div></div></div></nav><main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"><div class="wow-card"><h1 class="text-3xl font-bold text-gray-900 mb-8">\u767C\u8868\u65B0\u8CBC\u6587</h1><form class="space-y-6"><div><label for="title" class="block text-sm font-medium text-gray-700 mb-2"> \u6A19\u984C * </label><input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" required maxlength="200" class="wow-input" placeholder="\u8ACB\u8F38\u5165\u8CBC\u6587\u6A19\u984C"><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(unref(form).title.length)}/200 \u5B57\u5143</p></div><div><label for="category" class="block text-sm font-medium text-gray-700 mb-2"> \u985E\u5225 * </label><select id="category" required class="wow-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoryId) ? ssrLooseContain(unref(form).categoryId, "") : ssrLooseEqual(unref(form).categoryId, "")) ? " selected" : ""}>\u8ACB\u9078\u64C7\u985E\u5225</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoryId) ? ssrLooseContain(unref(form).categoryId, category.id) : ssrLooseEqual(unref(form).categoryId, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label for="content" class="block text-sm font-medium text-gray-700 mb-2"> \u5167\u5BB9 * </label><textarea id="content" required rows="8" maxlength="5000" class="wow-input resize-none" placeholder="\u5206\u4EAB\u4F60\u7684\u7F8E\u597D\u9AD4\u9A57...">${ssrInterpolate(unref(form).content)}</textarea><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(unref(form).content.length)}/5000 \u5B57\u5143</p></div>`);
      if (unref(error)) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-md p-3"><p class="text-sm text-red-600">${ssrInterpolate(unref(error))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(success)) {
        _push(`<div class="bg-green-50 border border-green-200 rounded-md p-3"><p class="text-sm text-green-600">${ssrInterpolate(unref(success))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between"><button type="button" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors"> \u6E05\u7A7A\u5167\u5BB9 </button><div class="space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u53D6\u6D88 `);
          } else {
            return [
              createTextVNode(" \u53D6\u6D88 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="wow-button disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (unref(loading)) {
        _push(`<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> \u767C\u8868\u4E2D... </span>`);
      } else {
        _push(`<span>\u767C\u8868\u8CBC\u6587</span>`);
      }
      _push(`</button></div></div></form></div>`);
      if (unref(form).title || unref(form).content) {
        _push(`<div class="wow-card mt-8"><h2 class="text-xl font-bold text-gray-900 mb-4">\u9810\u89BD</h2><div class="border border-gray-200 rounded-lg p-4"><h3 class="text-lg font-semibold text-gray-900 mb-2">${ssrInterpolate(unref(form).title || "\u6A19\u984C\u9810\u89BD")}</h3><p class="text-gray-600 mb-3 whitespace-pre-wrap">${ssrInterpolate(unref(form).content || "\u5167\u5BB9\u9810\u89BD")}</p><div class="flex items-center space-x-4 text-sm text-gray-500"><span>\u60A8\u7684\u540D\u7A31</span><span>${ssrInterpolate(unref(selectedCategoryName) || "\u672A\u9078\u64C7\u985E\u5225")}</span><span>${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("zh-TW"))}</span></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-Dx-s_BCb.mjs.map
