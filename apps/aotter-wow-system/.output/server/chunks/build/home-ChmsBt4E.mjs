import { _ as __nuxt_component_0 } from './nuxt-link-jAXwbDa0.mjs';
import { ref, reactive, resolveComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u9996\u9801 - Aotter Wow \u7CFB\u7D71",
      meta: [
        { name: "description", content: "Aotter Wow \u7CFB\u7D71\u9996\u9801\uFF0C\u63A2\u7D22\u793E\u7FA4\u8CBC\u6587\u548C Wow \u8A55\u50F9\u529F\u80FD" }
      ]
    });
    const posts = ref([]);
    const loading = ref(false);
    const error = ref("");
    const stats = reactive({
      users: 0,
      posts: 0,
      wows: 0,
      categories: 0
    });
    const getInitials = (name) => {
      return name.substring(0, 2).toUpperCase();
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-TW");
    };
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      if (diff < 6e4) return "\u525B\u525B";
      if (diff < 36e5) return `${Math.floor(diff / 6e4)} \u5206\u9418\u524D`;
      if (diff < 864e5) return `${Math.floor(diff / 36e5)} \u5C0F\u6642\u524D`;
      return `${Math.floor(diff / 864e5)} \u5929\u524D`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = resolveComponent("Icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wow-container py-8" }, _attrs))} data-v-758cd735><div class="wow-card wow-fade-in mb-8" data-v-758cd735><div class="text-center" data-v-758cd735><h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-v-758cd735> \u6B61\u8FCE\u4F86\u5230 Aotter Wow \u7CFB\u7D71 </h1><p class="text-lg text-gray-600 dark:text-gray-400 mb-6" data-v-758cd735> \u4E00\u500B\u4EE5 Wow \u8A55\u50F9\u70BA\u6838\u5FC3\u7684\u793E\u7FA4\u8CBC\u6587\u5E73\u53F0 </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-758cd735>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/create",
        class: "wow-button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u958B\u59CB\u767C\u6587 `);
          } else {
            return [
              createTextVNode(" \u958B\u59CB\u767C\u6587 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/ranking",
        class: "wow-button-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u67E5\u770B\u6392\u884C\u699C `);
          } else {
            return [
              createTextVNode(" \u67E5\u770B\u6392\u884C\u699C ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="mb-8" data-v-758cd735><div class="flex justify-between items-center mb-6" data-v-758cd735><h2 class="text-2xl font-semibold text-gray-900 dark:text-white" data-v-758cd735>\u6700\u65B0\u8CBC\u6587</h2><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="wow-button-secondary" data-v-758cd735>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-4 h-4 animate-spin mr-2"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "\u8F09\u5165\u4E2D..." : "\u91CD\u65B0\u6574\u7406")}</button></div>`);
      if (unref(loading) && unref(posts).length === 0) {
        _push(`<div class="text-center py-8" data-v-758cd735><div class="wow-loading mx-auto mb-4" data-v-758cd735></div><p class="text-gray-600 dark:text-gray-400" data-v-758cd735>\u8F09\u5165\u8CBC\u6587\u4E2D...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="wow-card bg-red-50 border-red-200 text-red-800" data-v-758cd735><p class="font-medium" data-v-758cd735>\u8F09\u5165\u5931\u6557</p><p class="text-sm mt-1" data-v-758cd735>${ssrInterpolate(unref(error))}</p></div>`);
      } else if (unref(posts).length > 0) {
        _push(`<div class="wow-grid" data-v-758cd735><!--[-->`);
        ssrRenderList(unref(posts), (post) => {
          var _a, _b, _c;
          _push(`<div class="wow-card wow-card-hover" data-v-758cd735><div class="flex items-center justify-between mb-4" data-v-758cd735><div class="flex items-center space-x-3" data-v-758cd735><div class="wow-avatar" data-v-758cd735>${ssrInterpolate(getInitials(((_a = post.author) == null ? void 0 : _a.username) || "U"))}</div><div data-v-758cd735><h3 class="font-medium text-gray-900 dark:text-white" data-v-758cd735>${ssrInterpolate(((_b = post.author) == null ? void 0 : _b.username) || "\u533F\u540D\u7528\u6236")}</h3><p class="text-sm text-gray-500 dark:text-gray-400" data-v-758cd735>${ssrInterpolate(formatDate(post.createdAt))}</p></div></div><div class="wow-badge wow-badge-primary" data-v-758cd735>${ssrInterpolate(((_c = post.category) == null ? void 0 : _c.name) || "\u672A\u5206\u985E")}</div></div><div class="mb-4" data-v-758cd735><h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-v-758cd735>${ssrInterpolate(post.title)}</h4><p class="text-gray-600 dark:text-gray-400 line-clamp-3" data-v-758cd735>${ssrInterpolate(post.content)}</p></div><div class="flex items-center justify-between" data-v-758cd735><div class="flex items-center space-x-4" data-v-758cd735><button class="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors" data-v-758cd735>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:heart",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`<span data-v-758cd735>${ssrInterpolate(post.wowCount || 0)}</span></button></div><time class="text-sm text-gray-500 dark:text-gray-400" data-v-758cd735>${ssrInterpolate(formatTime(post.createdAt))}</time></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12" data-v-758cd735>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:document-text",
          class: "w-16 h-16 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-v-758cd735>\u9084\u6C92\u6709\u8CBC\u6587</h3><p class="text-gray-600 dark:text-gray-400 mb-4" data-v-758cd735>\u6210\u70BA\u7B2C\u4E00\u500B\u767C\u6587\u7684\u4EBA\u5427\uFF01</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/create",
          class: "wow-button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u767C\u8868\u7B2C\u4E00\u7BC7\u8CBC\u6587 `);
            } else {
              return [
                createTextVNode(" \u767C\u8868\u7B2C\u4E00\u7BC7\u8CBC\u6587 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="wow-card" data-v-758cd735><h2 class="text-2xl font-semibold mb-6 text-center" data-v-758cd735>\u5E73\u53F0\u7D71\u8A08</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-6" data-v-758cd735><div class="text-center" data-v-758cd735><div class="text-3xl font-bold text-primary-600 mb-2" data-v-758cd735>${ssrInterpolate(unref(stats).users)}</div><div class="text-gray-600 dark:text-gray-400" data-v-758cd735>\u8A3B\u518A\u7528\u6236</div></div><div class="text-center" data-v-758cd735><div class="text-3xl font-bold text-primary-600 mb-2" data-v-758cd735>${ssrInterpolate(unref(stats).posts)}</div><div class="text-gray-600 dark:text-gray-400" data-v-758cd735>\u7E3D\u8CBC\u6587\u6578</div></div><div class="text-center" data-v-758cd735><div class="text-3xl font-bold text-primary-600 mb-2" data-v-758cd735>${ssrInterpolate(unref(stats).wows)}</div><div class="text-gray-600 dark:text-gray-400" data-v-758cd735>Wow \u8A55\u50F9</div></div><div class="text-center" data-v-758cd735><div class="text-3xl font-bold text-primary-600 mb-2" data-v-758cd735>${ssrInterpolate(unref(stats).categories)}</div><div class="text-gray-600 dark:text-gray-400" data-v-758cd735>\u5206\u985E\u6578\u91CF</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-758cd735"]]);

export { home as default };
//# sourceMappingURL=home-ChmsBt4E.mjs.map
