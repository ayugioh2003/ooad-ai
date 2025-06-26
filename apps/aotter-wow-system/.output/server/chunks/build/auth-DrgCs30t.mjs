import { defineComponent, ref, reactive, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useHead } from './v3-IP17QAdS.mjs';
import './server.mjs';
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
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Aotter Wow - \u767B\u5165 / \u8A3B\u518A"
    });
    const isLogin = ref(true);
    const loading = ref(false);
    const error = ref("");
    const success = ref("");
    const form = reactive({
      username: "",
      email: "",
      password: ""
    });
    watch([isLogin, form], () => {
      error.value = "";
      success.value = "";
    });
    const clearForm = () => {
      form.username = "";
      form.email = "";
      form.password = "";
    };
    watch(isLogin, () => {
      clearForm();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4" }, _attrs))}><div class="max-w-md w-full space-y-8"><div class="text-center"><h1 class="text-4xl font-bold text-gray-900 mb-2"> Aotter <span class="text-purple-600">Wow</span></h1><p class="text-gray-600">\u6B61\u8FCE\u52A0\u5165\u6B63\u5411\u8A55\u50F9\u793E\u7FA4</p></div><div class="flex bg-gray-100 rounded-lg p-1"><button class="${ssrRenderClass([
        "flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all",
        unref(isLogin) ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
      ])}"> \u767B\u5165 </button><button class="${ssrRenderClass([
        "flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all",
        !unref(isLogin) ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
      ])}"> \u8A3B\u518A </button></div><div class="wow-card"><form class="space-y-6">`);
      if (!unref(isLogin)) {
        _push(`<div><label for="username" class="block text-sm font-medium text-gray-700 mb-2"> \u4F7F\u7528\u8005\u540D\u7A31 </label><input id="username"${ssrRenderAttr("value", unref(form).username)} type="text" required class="wow-input" placeholder="\u8ACB\u8F38\u5165\u4F7F\u7528\u8005\u540D\u7A31"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email </label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required class="wow-input" placeholder="\u8ACB\u8F38\u5165 Email"></div><div><label for="password" class="block text-sm font-medium text-gray-700 mb-2"> \u5BC6\u78BC </label><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" required class="wow-input" placeholder="\u8ACB\u8F38\u5165\u5BC6\u78BC"></div>`);
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
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full wow-button disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (unref(loading)) {
        _push(`<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> \u8655\u7406\u4E2D... </span>`);
      } else {
        _push(`<span>${ssrInterpolate(unref(isLogin) ? "\u767B\u5165" : "\u8A3B\u518A")}</span>`);
      }
      _push(`</button></form></div><div class="text-center"><p class="text-sm text-gray-600">${ssrInterpolate(unref(isLogin) ? "\u9084\u6C92\u6709\u5E33\u865F\uFF1F" : "\u5DF2\u7D93\u6709\u5E33\u865F\u4E86\uFF1F")} <button class="text-purple-600 hover:text-purple-700 font-medium">${ssrInterpolate(unref(isLogin) ? "\u7ACB\u5373\u8A3B\u518A" : "\u7ACB\u5373\u767B\u5165")}</button></p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-DrgCs30t.mjs.map
