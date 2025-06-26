import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, getRequestURL, getResponseHeader, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, createError, getRouterParam, assertMethod, setCookie, deleteCookie, getCookie, getHeader, getResponseStatusText } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/@vue+shared@3.5.17/node_modules/@vue/shared/dist/shared.cjs.js';
import bcrypt from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/bcryptjs@2.4.3/node_modules/bcryptjs/index.js';
import jwt from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/vue-bundle-renderer@2.1.1/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, joinRelativeURL } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/ufo@1.6.1/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/vue@3.5.17_typescript@5.8.3/node_modules/vue/server-renderer/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/node-mock-http@1.0.1/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2_sqlite3@5.1.7__ioredis@5.6.1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2_sqlite3@5.1.7__ioredis@5.6.1/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/youch-core@0.3.2/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/youch@4.1.0-beta.8/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/errx@0.1.0/node_modules/errx/dist/index.js';
import { isVNode, toValue, isRef } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/vue@3.5.17_typescript@5.8.3/node_modules/vue/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/unhead@2.0.11/node_modules/unhead/dist/server.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/unhead@2.0.11/node_modules/unhead/dist/plugins.mjs';
import { walkResolver } from 'file:///Users/aotter/Documents/hobby/ooad-ai/node_modules/.pnpm/unhead@2.0.11/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('db', unstorage_47drivers_47fs({"driver":"fs","base":"./data"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "apiBase": "/api"
  },
  "jwtSecret": "your-secret-key"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _I7t2o2gWepwF3CLGC5Y9SjN6Oa11oUMv1MNv7u4ZWU = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _FEyc5gvdFXw68zMtGDn4_yeqnpbC1uHso6RX9mFRPzY = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _I7t2o2gWepwF3CLGC5Y9SjN6Oa11oUMv1MNv7u4ZWU,
_FEyc5gvdFXw68zMtGDn4_yeqnpbC1uHso6RX9mFRPzY
];

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file:///Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file:///Users/aotter/Documents/hobby/ooad-ai/apps/aotter-wow-system/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (error) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", error);
    throw error;
  });
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  islandHead.link ||= [];
  islandHead.style ||= [];
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_Iff_cf = () => Promise.resolve().then(function () { return loginNew_post$1; });
const _lazy__DhTXw = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_iaevMc = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_707RuP = () => Promise.resolve().then(function () { return registerNew_post$1; });
const _lazy_4fcbvo = () => Promise.resolve().then(function () { return register_post$1; });
const _lazy_4UNtHt = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_vJ9Djl = () => Promise.resolve().then(function () { return database_get$1; });
const _lazy_WpYfYZ = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_ejVQ_1 = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_j1Zkhi = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy_bsK7hH = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_2AI0Zd = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/auth/login-new', handler: _lazy_Iff_cf, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy__DhTXw, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_iaevMc, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register-new', handler: _lazy_707RuP, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register', handler: _lazy_4fcbvo, lazy: true, middleware: false, method: "post" },
  { route: '/api/categories', handler: _lazy_4UNtHt, lazy: true, middleware: false, method: "get" },
  { route: '/api/debug/database', handler: _lazy_vJ9Djl, lazy: true, middleware: false, method: "get" },
  { route: '/api/posts', handler: _lazy_WpYfYZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/posts', handler: _lazy_ejVQ_1, lazy: true, middleware: false, method: "post" },
  { route: '/api/wows/create', handler: _lazy_j1Zkhi, lazy: true, middleware: false, method: "post" },
  { route: '/api/wows', handler: _lazy_bsK7hH, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_2AI0Zd, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_2AI0Zd, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 pointer-events-none right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["USER"] = "user";
  UserRole2["ADMIN"] = "admin";
  UserRole2["MODERATOR"] = "moderator";
  return UserRole2;
})(UserRole || {});

const getJwtSecret = () => {
  return process.env.JWT_SECRET || "your-secret-key-change-in-production";
};
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
const generateToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d"
    // 7天過期
  });
};
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    return decoded;
  } catch (error) {
    return null;
  }
};
const toUserPublic = (user) => {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
};
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidPassword = (password) => {
  return password.length >= 6;
};
const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
class MemoryDatabase {
  constructor() {
    __publicField$7(this, "storage", {
      users: {},
      categories: {},
      posts: {},
      wows: {}
    });
    __publicField$7(this, "idCounters", {
      users: 1,
      categories: 1,
      posts: 1,
      wows: 1
    });
  }
  // 生成 ID
  generateId(table) {
    const id = `${table.slice(0, -1)}_${this.idCounters[table]}`;
    this.idCounters[table]++;
    return id;
  }
  // 初始化資料庫表格
  async initTables() {
    console.log("\u{1F5C4}\uFE0F \u521D\u59CB\u5316\u8A18\u61B6\u9AD4\u8CC7\u6599\u5EAB...");
    if (Object.keys(this.storage.categories).length === 0) {
      const categories = [
        { name: "\u52D5\u7269", description: "\u53EF\u611B\u7684\u52D5\u7269\u76F8\u95DC\u5167\u5BB9", color: "#ef4444", icon: "\u{1F43E}" },
        { name: "\u7F8E\u98DF", description: "\u7F8E\u5473\u7684\u98DF\u7269\u548C\u9910\u5EF3\u63A8\u85A6", color: "#f97316", icon: "\u{1F355}" },
        { name: "\u65C5\u904A", description: "\u65C5\u904A\u666F\u9EDE\u548C\u9AD4\u9A57\u5206\u4EAB", color: "#eab308", icon: "\u2708\uFE0F" },
        { name: "\u670D\u52D9", description: "\u5404\u7A2E\u670D\u52D9\u9AD4\u9A57\u548C\u8A55\u50F9", color: "#22c55e", icon: "\u{1F527}" },
        { name: "\u751F\u6D3B", description: "\u65E5\u5E38\u751F\u6D3B\u76F8\u95DC\u5167\u5BB9", color: "#3b82f6", icon: "\u{1F3E0}" },
        { name: "\u79D1\u6280", description: "\u79D1\u6280\u7522\u54C1\u548C\u8DA8\u52E2\u8A0E\u8AD6", color: "#8b5cf6", icon: "\u{1F4BB}" },
        { name: "\u5A1B\u6A02", description: "\u96FB\u5F71\u3001\u97F3\u6A02\u3001\u904A\u6232\u7B49\u5A1B\u6A02\u5167\u5BB9", color: "#ec4899", icon: "\u{1F3AE}" },
        { name: "\u904B\u52D5", description: "\u904B\u52D5\u5065\u8EAB\u548C\u6BD4\u8CFD\u8A0E\u8AD6", color: "#06b6d4", icon: "\u26BD" }
      ];
      for (const category of categories) {
        const id = this.generateId("categories");
        this.storage.categories[id] = {
          id,
          name: category.name,
          description: category.description,
          color: category.color,
          icon: category.icon,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
      }
      console.log(`\u2705 \u5DF2\u5275\u5EFA ${categories.length} \u500B\u9810\u8A2D\u5206\u985E`);
    }
    if (Object.keys(this.storage.users).length === 0) {
      const adminId = this.generateId("users");
      const adminPasswordHash = await hashPassword("admin123");
      this.storage.users[adminId] = {
        id: adminId,
        username: "admin",
        email: "admin@aotter-wow.com",
        passwordHash: adminPasswordHash,
        role: UserRole.ADMIN,
        profile: {
          displayName: "\u7CFB\u7D71\u7BA1\u7406\u54E1",
          bio: "Aotter Wow \u7CFB\u7D71\u7BA1\u7406\u54E1",
          avatar: ""
        },
        isActive: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      console.log("\u2705 \u5DF2\u5275\u5EFA\u9810\u8A2D\u7BA1\u7406\u54E1\u5E33\u865F (admin@aotter-wow.com / admin123)");
    }
    console.log("\u{1F680} \u8A18\u61B6\u9AD4\u8CC7\u6599\u5EAB\u521D\u59CB\u5316\u5B8C\u6210");
  }
  // 插入記錄
  async insert(table, data) {
    const id = this.generateId(table);
    this.storage[table][id] = {
      id,
      ...data,
      createdAt: data.createdAt || /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    return { lastID: id };
  }
  // 查詢單一記錄 by ID
  async findById(table, id) {
    return this.storage[table][id] || null;
  }
  // 查詢單一記錄
  async get(table, condition) {
    const records = Object.values(this.storage[table]);
    return records.find(condition) || null;
  }
  // 查詢所有符合條件的記錄
  async all(table, condition) {
    const records = Object.values(this.storage[table]);
    return condition ? records.filter(condition) : records;
  }
  // 更新記錄
  async update(table, id, data) {
    if (this.storage[table][id]) {
      this.storage[table][id] = {
        ...this.storage[table][id],
        ...data,
        updatedAt: /* @__PURE__ */ new Date()
      };
      return true;
    }
    return false;
  }
  // 刪除記錄
  async delete(table, id) {
    if (this.storage[table][id]) {
      delete this.storage[table][id];
      return true;
    }
    return false;
  }
  // 計數
  async count(table, condition) {
    const records = Object.values(this.storage[table]);
    return condition ? records.filter(condition).length : records.length;
  }
  // 獲取所有表格的統計資訊
  getStats() {
    return {
      users: Object.keys(this.storage.users).length,
      categories: Object.keys(this.storage.categories).length,
      posts: Object.keys(this.storage.posts).length,
      wows: Object.keys(this.storage.wows).length
    };
  }
  // 清空所有資料 (僅供測試使用)
  async clearAll() {
    this.storage = {
      users: {},
      categories: {},
      posts: {},
      wows: {}
    };
    this.idCounters = {
      users: 1,
      categories: 1,
      posts: 1,
      wows: 1
    };
  }
}
let dbInstance = null;
const getDatabase = () => {
  if (!dbInstance) {
    dbInstance = new MemoryDatabase();
  }
  return dbInstance;
};

const loginNew_post = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");
    const body = await readBody(event);
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: email, password"
      });
    }
    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid email format"
      });
    }
    const db = getDatabase();
    const user = await db.get("users", (u) => u.email === body.email);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password"
      });
    }
    if (!user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: "Account is disabled"
      });
    }
    const isPasswordValid = await verifyPassword(body.password, user.passwordHash);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password"
      });
    }
    const tokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role
    };
    const token = generateToken(tokenPayload);
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    const { passwordHash: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: "Login successful"
    };
  } catch (error) {
    console.error("Login API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const loginNew_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: loginNew_post
});

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, key + "" , value);
class UserRepository {
  constructor() {
    __publicField$6(this, "db", getDatabase());
  }
  // 根據 ID 查找使用者
  async findById(id) {
    const user = await this.db.get("users", (record) => record.id === id);
    if (!user) return null;
    return this.mapToUser(user);
  }
  // 根據 Email 查找使用者
  async findByEmail(email) {
    const user = await this.db.get("users", (record) => record.email === email);
    if (!user) return null;
    return this.mapToUser(user);
  }
  // 根據使用者名稱查找使用者
  async findByUsername(username) {
    const user = await this.db.get("users", (record) => record.username === username);
    if (!user) return null;
    return this.mapToUser(user);
  }
  // 創建新使用者
  async create(userRegistration) {
    const result = await this.db.insert("users", {
      username: userRegistration.username,
      email: userRegistration.email,
      password: userRegistration.password,
      join_date: (/* @__PURE__ */ new Date()).toISOString(),
      user_type: "regular"
    });
    const userId = result.lastID;
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("Failed to retrieve created user");
    }
    return user;
  }
  // 更新使用者資料
  async update(id, updates) {
    const updateData = {};
    if (updates.username) updateData.username = updates.username;
    if (updates.email) updateData.email = updates.email;
    if (updates.password) updateData.password = updates.password;
    if (updates.userType) updateData.user_type = updates.userType;
    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }
    const result = await this.db.update("users", id, updateData);
    if (result.changes === 0) {
      return null;
    }
    return this.findById(id);
  }
  // 刪除使用者
  async delete(id) {
    const result = await this.db.delete("users", id);
    return result.changes > 0;
  }
  // 獲取所有使用者（管理員功能）
  async findAll(limit = 50, offset = 0) {
    const allUsers = await this.db.all("users");
    const sortedUsers = allUsers.sort((a, b) => new Date(b.join_date).getTime() - new Date(a.join_date).getTime()).slice(offset, offset + limit);
    return sortedUsers.map((user) => this.mapToUserPublic(user));
  }
  // 統計使用者總數
  async countAll() {
    return await this.db.count("users");
  }
  // 檢查 Email 是否已存在
  async emailExists(email) {
    const user = await this.db.get("users", (record) => record.email === email);
    return !!user;
  }
  // 檢查使用者名稱是否已存在
  async usernameExists(username) {
    const user = await this.db.get("users", (record) => record.username === username);
    return !!user;
  }
  // 將資料庫記錄映射為 User 物件
  mapToUser(row) {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      joinDate: new Date(row.join_date),
      userType: row.user_type
    };
  }
  // 將資料庫記錄映射為 UserPublic 物件
  mapToUserPublic(row) {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      joinDate: new Date(row.join_date),
      userType: row.user_type
    };
  }
}

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, key + "" , value);
class UserService {
  constructor() {
    __publicField$5(this, "userRepository", new UserRepository());
  }
  // 使用者註冊
  async register(userRegistration) {
    try {
      const validation = this.validateRegistrationData(userRegistration);
      if (!validation.success) {
        return validation;
      }
      const emailExists = await this.userRepository.emailExists(userRegistration.email);
      if (emailExists) {
        return {
          success: false,
          error: "Email \u5DF2\u88AB\u4F7F\u7528"
        };
      }
      const usernameExists = await this.userRepository.usernameExists(userRegistration.username);
      if (usernameExists) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u540D\u7A31\u5DF2\u88AB\u4F7F\u7528"
        };
      }
      const hashedPassword = await hashPassword(userRegistration.password);
      const user = await this.userRepository.create({
        ...userRegistration,
        password: hashedPassword
      });
      const userPublic = toUserPublic(user);
      const token = generateToken(userPublic);
      return {
        success: true,
        data: {
          user: userPublic,
          token
        },
        message: "\u8A3B\u518A\u6210\u529F"
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: "\u8A3B\u518A\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66"
      };
    }
  }
  // 使用者登入
  async login(userLogin) {
    try {
      if (!userLogin.email || !userLogin.password) {
        return {
          success: false,
          error: "Email \u548C\u5BC6\u78BC\u70BA\u5FC5\u586B\u6B04\u4F4D"
        };
      }
      if (!isValidEmail(userLogin.email)) {
        return {
          success: false,
          error: "Email \u683C\u5F0F\u4E0D\u6B63\u78BA"
        };
      }
      const user = await this.userRepository.findByEmail(userLogin.email);
      if (!user) {
        return {
          success: false,
          error: "Email \u6216\u5BC6\u78BC\u932F\u8AA4"
        };
      }
      const isPasswordValid = await verifyPassword(userLogin.password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          error: "Email \u6216\u5BC6\u78BC\u932F\u8AA4"
        };
      }
      const userPublic = toUserPublic(user);
      const token = generateToken(userPublic);
      return {
        success: true,
        data: {
          user: userPublic,
          token
        },
        message: "\u767B\u5165\u6210\u529F"
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "\u767B\u5165\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66"
      };
    }
  }
  // 根據 ID 獲取使用者資料
  async getUserById(id) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        data: toUserPublic(user)
      };
    } catch (error) {
      console.error("Get user error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u4F7F\u7528\u8005\u8CC7\u6599\u5931\u6557"
      };
    }
  }
  // 更新使用者資料
  async updateUser(id, updates) {
    try {
      if (updates.password) {
        if (!isValidPassword(updates.password)) {
          return {
            success: false,
            error: "\u5BC6\u78BC\u81F3\u5C11\u9700\u8981 6 \u500B\u5B57\u5143"
          };
        }
        updates.password = await hashPassword(updates.password);
      }
      if (updates.email && !isValidEmail(updates.email)) {
        return {
          success: false,
          error: "Email \u683C\u5F0F\u4E0D\u6B63\u78BA"
        };
      }
      if (updates.username && !isValidUsername(updates.username)) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u540D\u7A31\u53EA\u80FD\u5305\u542B\u82F1\u6587\u3001\u6578\u5B57\u3001\u5E95\u7DDA\uFF0C\u9577\u5EA6 3-20 \u5B57\u5143"
        };
      }
      const user = await this.userRepository.update(id, updates);
      if (!user) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        data: toUserPublic(user),
        message: "\u66F4\u65B0\u6210\u529F"
      };
    } catch (error) {
      console.error("Update user error:", error);
      return {
        success: false,
        error: "\u66F4\u65B0\u5931\u6557"
      };
    }
  }
  // 刪除使用者（管理員功能）
  async deleteUser(id) {
    try {
      const success = await this.userRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        message: "\u522A\u9664\u6210\u529F"
      };
    } catch (error) {
      console.error("Delete user error:", error);
      return {
        success: false,
        error: "\u522A\u9664\u5931\u6557"
      };
    }
  }
  // 驗證註冊資料
  validateRegistrationData(data) {
    const errors = [];
    if (!data.username) {
      errors.push("\u4F7F\u7528\u8005\u540D\u7A31\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (!isValidUsername(data.username)) {
      errors.push("\u4F7F\u7528\u8005\u540D\u7A31\u53EA\u80FD\u5305\u542B\u82F1\u6587\u3001\u6578\u5B57\u3001\u5E95\u7DDA\uFF0C\u9577\u5EA6 3-20 \u5B57\u5143");
    }
    if (!data.email) {
      errors.push("Email \u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (!isValidEmail(data.email)) {
      errors.push("Email \u683C\u5F0F\u4E0D\u6B63\u78BA");
    }
    if (!data.password) {
      errors.push("\u5BC6\u78BC\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (!isValidPassword(data.password)) {
      errors.push("\u5BC6\u78BC\u81F3\u5C11\u9700\u8981 6 \u500B\u5B57\u5143");
    }
    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join(", ")
      };
    }
    return {
      success: true
    };
  }
}

const login_post = defineEventHandler(async (event) => {
  var _a, _b;
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing email or password"
      });
    }
    const userLogin = {
      email: body.email,
      password: body.password
    };
    const userService = new UserService();
    const result = await userService.login(userLogin);
    if (!result.success) {
      throw createError({
        statusCode: 401,
        statusMessage: result.error || "Login failed"
      });
    }
    const token = (_a = result.data) == null ? void 0 : _a.token;
    if (token) {
      setCookie(event, "auth-token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
    }
    return {
      success: true,
      data: {
        user: (_b = result.data) == null ? void 0 : _b.user
      },
      message: result.message
    };
  } catch (error) {
    console.error("Login API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: login_post
});

const logout_post = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    deleteCookie(event, "auth-token");
    return {
      success: true,
      message: "\u767B\u51FA\u6210\u529F"
    };
  } catch (error) {
    console.error("Logout API error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

const logout_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: logout_post
});

const registerNew_post = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");
    const body = await readBody(event);
    if (!body.username || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: username, email, password"
      });
    }
    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid email format"
      });
    }
    if (!isValidPassword(body.password)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password must be at least 6 characters long"
      });
    }
    const db = getDatabase();
    const existingUserByEmail = await db.get("users", (user) => user.email === body.email);
    if (existingUserByEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email already exists"
      });
    }
    const existingUserByUsername = await db.get("users", (user) => user.username === body.username);
    if (existingUserByUsername) {
      throw createError({
        statusCode: 409,
        statusMessage: "Username already exists"
      });
    }
    const passwordHash = await hashPassword(body.password);
    const result = await db.insert("users", {
      username: body.username,
      email: body.email,
      passwordHash,
      role: UserRole.USER,
      profile: {
        displayName: body.displayName || body.username,
        bio: "",
        avatar: ""
      },
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    const newUser = await db.findById("users", result.lastID);
    const tokenPayload = {
      userId: newUser.id,
      username: newUser.username,
      role: newUser.role
    };
    const token = generateToken(tokenPayload);
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: "Registration successful"
    };
  } catch (error) {
    console.error("Register API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const registerNew_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: registerNew_post
});

const register_post = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");
    const body = await readBody(event);
    if (!body.username || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: username, email, password"
      });
    }
    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid email format"
      });
    }
    if (!isValidPassword(body.password)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password must be at least 6 characters long"
      });
    }
    const db = getDatabase();
    const existingUserByEmail = await db.get("users", (user) => user.email === body.email);
    if (existingUserByEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email already exists"
      });
    }
    const existingUserByUsername = await db.get("users", (user) => user.username === body.username);
    if (existingUserByUsername) {
      throw createError({
        statusCode: 409,
        statusMessage: "Username already exists"
      });
    }
    const passwordHash = await hashPassword(body.password);
    const result = await db.insert("users", {
      username: body.username,
      email: body.email,
      passwordHash,
      role: UserRole.USER,
      profile: {
        displayName: body.displayName || body.username,
        bio: "",
        avatar: ""
      },
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    const newUser = await db.findById("users", result.lastID);
    const token = generateToken({
      userId: newUser.id,
      username: newUser.username,
      role: newUser.role
    });
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: "Registration successful"
    };
  } catch (error) {
    console.error("Register API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const register_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: register_post
});

const index_get$2 = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "GET");
    const db = getDatabase();
    const categories = await db.all("categories");
    return {
      success: true,
      data: categories
    };
  } catch (error) {
    console.error("Categories API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$2
});

const database_get = defineEventHandler(async (event) => {
  try {
    const db = getDatabase();
    await db.initTables();
    const categories = await db.all("categories");
    return {
      success: true,
      message: "Database debug info",
      data: {
        categories,
        categoriesCount: categories.length,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
});

const database_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: database_get
});

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, key + "" , value);
class PostRepository {
  constructor() {
    __publicField$4(this, "db", getDatabase());
  }
  // 根據 ID 查找貼文
  async findById(id) {
    const post = await this.db.get("posts", (record) => record.id === id);
    if (!post) return null;
    const author = await this.db.get("users", (record) => record.id === post.author_id);
    const category = await this.db.get("categories", (record) => record.id === post.category_id);
    return this.mapToPost(post, author, category);
  }
  // 創建新貼文
  async create(postCreate, authorId) {
    const result = await this.db.insert("posts", {
      title: postCreate.title,
      content: postCreate.content,
      category_id: postCreate.categoryId,
      author_id: authorId,
      publish_date: (/* @__PURE__ */ new Date()).toISOString(),
      wow_count: 0
    });
    const postId = result.lastID;
    const post = await this.findById(postId);
    if (!post) {
      throw new Error("Failed to retrieve created post");
    }
    return post;
  }
  // 查詢貼文（支援篩選和排序）
  async findPosts(options = {}) {
    let posts = await this.db.all("posts");
    if (options.categoryId) {
      posts = posts.filter((post) => post.category_id === options.categoryId);
    }
    if (options.authorId) {
      posts = posts.filter((post) => post.author_id === options.authorId);
    }
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      posts = posts.filter(
        (post) => post.title.toLowerCase().includes(searchLower) || post.content.toLowerCase().includes(searchLower)
      );
    }
    const sortBy = options.sortBy || "publishDate";
    const sortOrder = options.sortOrder || "desc";
    posts.sort((a, b) => {
      let compareValue = 0;
      if (sortBy === "publishDate") {
        compareValue = new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime();
      } else if (sortBy === "wowCount") {
        compareValue = a.wow_count - b.wow_count;
      }
      return sortOrder === "desc" ? -compareValue : compareValue;
    });
    if (options.offset) {
      posts = posts.slice(options.offset);
    }
    if (options.limit) {
      posts = posts.slice(0, options.limit);
    }
    const result = [];
    for (const post of posts) {
      const author = await this.db.get("users", (record) => record.id === post.author_id);
      const category = await this.db.get("categories", (record) => record.id === post.category_id);
      result.push(this.mapToPost(post, author, category));
    }
    return result;
  }
  // 更新貼文
  async update(id, updates) {
    const updateData = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.content) updateData.content = updates.content;
    if (updates.categoryId) updateData.category_id = updates.categoryId;
    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }
    const result = await this.db.update("posts", id, updateData);
    if (result.changes === 0) {
      return null;
    }
    return this.findById(id);
  }
  // 刪除貼文
  async delete(id) {
    const result = await this.db.delete("posts", id);
    return result.changes > 0;
  }
  // 增加 Wow 計數
  async incrementWowCount(id) {
    const post = await this.db.get("posts", (record) => record.id === id);
    if (!post) return false;
    const result = await this.db.update("posts", id, {
      wow_count: post.wow_count + 1
    });
    return result.changes > 0;
  }
  // 減少 Wow 計數
  async decrementWowCount(id) {
    const post = await this.db.get("posts", (record) => record.id === id);
    if (!post) return false;
    const newCount = Math.max(0, post.wow_count - 1);
    const result = await this.db.update("posts", id, {
      wow_count: newCount
    });
    return result.changes > 0;
  }
  // 統計貼文總數
  async countAll() {
    return await this.db.count("posts");
  }
  // 根據作者統計貼文數量
  async countByAuthor(authorId) {
    return await this.db.count("posts", (record) => record.author_id === authorId);
  }
  // 根據類別統計貼文數量
  async countByCategory(categoryId) {
    return await this.db.count("posts", (record) => record.category_id === categoryId);
  }
  // 獲取 Wow 排行榜
  async getWowRanking(limit = 10) {
    const posts = await this.db.all("posts");
    const sortedPosts = posts.sort((a, b) => b.wow_count - a.wow_count).slice(0, limit);
    const result = [];
    for (const post of sortedPosts) {
      const author = await this.db.get("users", (record) => record.id === post.author_id);
      const category = await this.db.get("categories", (record) => record.id === post.category_id);
      result.push(this.mapToPost(post, author, category));
    }
    return result;
  }
  // 將資料庫記錄映射為 Post 物件
  mapToPost(post, author, category) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      publishDate: new Date(post.publish_date),
      authorId: post.author_id,
      categoryId: post.category_id,
      wowCount: post.wow_count,
      author: author ? {
        id: author.id,
        username: author.username
      } : void 0,
      category: category ? {
        id: category.id,
        name: category.name
      } : void 0
    };
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
class CategoryRepository {
  constructor() {
    __publicField$3(this, "db", getDatabase());
  }
  // 根據 ID 查找類別
  async findById(id) {
    const category = await this.db.get("categories", (record) => record.id === id);
    if (!category) return null;
    return this.mapToCategory(category);
  }
  // 根據名稱查找類別
  async findByName(name) {
    const category = await this.db.get("categories", (record) => record.name === name);
    if (!category) return null;
    return this.mapToCategory(category);
  }
  // 獲取所有類別
  async findAll() {
    const categories = await this.db.all("categories");
    return categories.sort((a, b) => a.name.localeCompare(b.name)).map((category) => this.mapToCategory(category));
  }
  // 創建新類別
  async create(name, description) {
    const result = await this.db.insert("categories", {
      name,
      description,
      created_date: (/* @__PURE__ */ new Date()).toISOString()
    });
    const categoryId = result.lastID;
    const category = await this.findById(categoryId);
    if (!category) {
      throw new Error("Failed to retrieve created category");
    }
    return category;
  }
  // 更新類別
  async update(id, updates) {
    const updateData = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.description) updateData.description = updates.description;
    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }
    const result = await this.db.update("categories", id, updateData);
    if (result.changes === 0) {
      return null;
    }
    return this.findById(id);
  }
  // 刪除類別
  async delete(id) {
    const result = await this.db.delete("categories", id);
    return result.changes > 0;
  }
  // 統計類別總數
  async countAll() {
    return await this.db.count("categories");
  }
  // 檢查類別名稱是否已存在
  async nameExists(name) {
    const category = await this.db.get("categories", (record) => record.name === name);
    return !!category;
  }
  // 將資料庫記錄映射為 Category 物件
  mapToCategory(row) {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      createdDate: new Date(row.created_date)
    };
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, key + "" , value);
class WowRepository {
  constructor() {
    __publicField$2(this, "db", getDatabase());
  }
  // 根據 ID 查找 Wow
  async findById(id) {
    const wow = await this.db.get("wows", (record) => record.id === id);
    if (!wow) return null;
    return this.mapToWow(wow);
  }
  // 檢查使用者是否已對貼文給過 Wow
  async findByUserAndPost(userId, postId) {
    const wow = await this.db.get(
      "wows",
      (record) => record.user_id === userId && record.post_id === postId
    );
    if (!wow) return null;
    return this.mapToWow(wow);
  }
  // 創建新的 Wow 評價
  async create(userId, postId) {
    const existingWow = await this.findByUserAndPost(userId, postId);
    if (existingWow) {
      throw new Error("User has already given wow to this post");
    }
    const result = await this.db.insert("wows", {
      user_id: userId,
      post_id: postId,
      wow_date: (/* @__PURE__ */ new Date()).toISOString()
    });
    const wowId = result.lastID;
    const wow = await this.findById(wowId);
    if (!wow) {
      throw new Error("Failed to retrieve created wow");
    }
    return wow;
  }
  // 刪除 Wow 評價
  async delete(id) {
    const result = await this.db.delete("wows", id);
    return result.changes > 0;
  }
  // 根據使用者和貼文刪除 Wow
  async deleteByUserAndPost(userId, postId) {
    const wow = await this.findByUserAndPost(userId, postId);
    if (!wow) return false;
    return await this.delete(wow.id);
  }
  // 獲取貼文的所有 Wow
  async findByPost(postId) {
    const wows = await this.db.all("wows", (record) => record.post_id === postId);
    return wows.sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime()).map((wow) => this.mapToWow(wow));
  }
  // 獲取使用者給過的所有 Wow
  async findByUser(userId) {
    const wows = await this.db.all("wows", (record) => record.user_id === userId);
    return wows.sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime()).map((wow) => this.mapToWow(wow));
  }
  // 統計貼文的 Wow 數量
  async countByPost(postId) {
    return await this.db.count("wows", (record) => record.post_id === postId);
  }
  // 統計使用者給過的 Wow 數量
  async countByUser(userId) {
    return await this.db.count("wows", (record) => record.user_id === userId);
  }
  // 統計總 Wow 數量
  async countAll() {
    return await this.db.count("wows");
  }
  // 獲取最近的 Wow 活動
  async getRecentWows(limit = 10) {
    const wows = await this.db.all("wows");
    return wows.sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime()).slice(0, limit).map((wow) => this.mapToWow(wow));
  }
  // 將資料庫記錄映射為 Wow 物件
  mapToWow(row) {
    return {
      id: row.id,
      userId: row.user_id,
      postId: row.post_id,
      wowDate: new Date(row.wow_date)
    };
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
class PostService {
  constructor() {
    __publicField$1(this, "postRepository", new PostRepository());
    __publicField$1(this, "categoryRepository", new CategoryRepository());
    __publicField$1(this, "wowRepository", new WowRepository());
  }
  // 創建新貼文
  async createPost(postCreate, authorId) {
    try {
      const validation = this.validatePostData(postCreate);
      if (!validation.success) {
        return validation;
      }
      const category = await this.categoryRepository.findById(postCreate.categoryId);
      if (!category) {
        return {
          success: false,
          error: "\u6307\u5B9A\u7684\u985E\u5225\u4E0D\u5B58\u5728"
        };
      }
      const post = await this.postRepository.create(postCreate, authorId);
      return {
        success: true,
        data: post,
        message: "\u8CBC\u6587\u767C\u8868\u6210\u529F"
      };
    } catch (error) {
      console.error("Create post error:", error);
      return {
        success: false,
        error: "\u767C\u8868\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 獲取貼文列表
  async getPosts(options = {}) {
    try {
      const limit = options.limit || 10;
      const offset = options.offset || 0;
      const page = Math.floor(offset / limit) + 1;
      const posts = await this.postRepository.findPosts({
        ...options,
        limit: limit + 1
        // 多取一筆來判斷是否還有下一頁
      });
      const hasNextPage = posts.length > limit;
      if (hasNextPage) {
        posts.pop();
      }
      const total = await this.postRepository.countAll();
      const totalPages = Math.ceil(total / limit);
      return {
        success: true,
        data: {
          items: posts,
          total,
          page,
          limit,
          totalPages
        }
      };
    } catch (error) {
      console.error("Get posts error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u8CBC\u6587\u5217\u8868\u5931\u6557"
      };
    }
  }
  // 根據 ID 獲取單一貼文
  async getPostById(id) {
    try {
      const post = await this.postRepository.findById(id);
      if (!post) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        data: post
      };
    } catch (error) {
      console.error("Get post error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 更新貼文
  async updatePost(id, updates, userId) {
    try {
      const existingPost = await this.postRepository.findById(id);
      if (!existingPost) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      if (existingPost.authorId !== userId) {
        return {
          success: false,
          error: "\u6C92\u6709\u6B0A\u9650\u7DE8\u8F2F\u6B64\u8CBC\u6587"
        };
      }
      if (updates.categoryId) {
        const category = await this.categoryRepository.findById(updates.categoryId);
        if (!category) {
          return {
            success: false,
            error: "\u6307\u5B9A\u7684\u985E\u5225\u4E0D\u5B58\u5728"
          };
        }
      }
      if (updates.title && updates.title.trim().length < 1) {
        return {
          success: false,
          error: "\u6A19\u984C\u4E0D\u80FD\u70BA\u7A7A"
        };
      }
      if (updates.content && updates.content.trim().length < 1) {
        return {
          success: false,
          error: "\u5167\u5BB9\u4E0D\u80FD\u70BA\u7A7A"
        };
      }
      const post = await this.postRepository.update(id, updates);
      if (!post) {
        return {
          success: false,
          error: "\u66F4\u65B0\u5931\u6557"
        };
      }
      return {
        success: true,
        data: post,
        message: "\u8CBC\u6587\u66F4\u65B0\u6210\u529F"
      };
    } catch (error) {
      console.error("Update post error:", error);
      return {
        success: false,
        error: "\u66F4\u65B0\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 刪除貼文
  async deletePost(id, userId, isAdmin = false) {
    try {
      const existingPost = await this.postRepository.findById(id);
      if (!existingPost) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      if (existingPost.authorId !== userId && !isAdmin) {
        return {
          success: false,
          error: "\u6C92\u6709\u6B0A\u9650\u522A\u9664\u6B64\u8CBC\u6587"
        };
      }
      const success = await this.postRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: "\u522A\u9664\u5931\u6557"
        };
      }
      return {
        success: true,
        message: "\u8CBC\u6587\u522A\u9664\u6210\u529F"
      };
    } catch (error) {
      console.error("Delete post error:", error);
      return {
        success: false,
        error: "\u522A\u9664\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 獲取 Wow 排行榜
  async getWowRanking(limit = 10) {
    try {
      const posts = await this.postRepository.getWowRanking(limit);
      return {
        success: true,
        data: posts
      };
    } catch (error) {
      console.error("Get wow ranking error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u6392\u884C\u699C\u5931\u6557"
      };
    }
  }
  // 驗證貼文資料
  validatePostData(data) {
    const errors = [];
    if (!data.title || data.title.trim().length < 1) {
      errors.push("\u6A19\u984C\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (data.title.length > 200) {
      errors.push("\u6A19\u984C\u4E0D\u80FD\u8D85\u904E 200 \u5B57\u5143");
    }
    if (!data.content || data.content.trim().length < 1) {
      errors.push("\u5167\u5BB9\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (data.content.length > 5e3) {
      errors.push("\u5167\u5BB9\u4E0D\u80FD\u8D85\u904E 5000 \u5B57\u5143");
    }
    if (!data.categoryId || data.categoryId < 1) {
      errors.push("\u8ACB\u9078\u64C7\u985E\u5225");
    }
    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join(", ")
      };
    }
    return {
      success: true
    };
  }
}

const index_get = defineEventHandler(async (event) => {
  if (event.node.req.method !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const query = getQuery$1(event);
    const options = {
      categoryId: query.categoryId ? Number(query.categoryId) : void 0,
      authorId: query.authorId ? Number(query.authorId) : void 0,
      search: query.search ? String(query.search) : void 0,
      sortBy: query.sortBy || "publishDate",
      sortOrder: query.sortOrder || "desc",
      limit: query.limit ? Number(query.limit) : 10,
      offset: query.offset ? Number(query.offset) : 0
    };
    const postService = new PostService();
    const result = await postService.getPosts(options);
    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || "Failed to get posts"
      });
    }
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error("Get posts API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get
});

const index_post$2 = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const token = getCookie(event, "auth-token");
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid token"
      });
    }
    const body = await readBody(event);
    if (!body.title || !body.content || !body.categoryId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields"
      });
    }
    const postCreate = {
      title: body.title,
      content: body.content,
      categoryId: body.categoryId
    };
    const postService = new PostService();
    const result = await postService.createPost(postCreate, payload.userId);
    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || "Failed to create post"
      });
    }
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error("Create post API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$2
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class WowService {
  constructor() {
    __publicField(this, "wowRepository", new WowRepository());
    __publicField(this, "postRepository", new PostRepository());
  }
  // 給貼文 Wow 評價
  async giveWow(userId, postId) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      const existingWow = await this.wowRepository.findByUserAndPost(userId, postId);
      if (existingWow) {
        return {
          success: false,
          error: "\u60A8\u5DF2\u7D93\u5C0D\u6B64\u8CBC\u6587\u7D66\u904E Wow \u4E86"
        };
      }
      if (post.authorId === userId) {
        return {
          success: false,
          error: "\u4E0D\u80FD\u5C0D\u81EA\u5DF1\u7684\u8CBC\u6587\u7D66 Wow"
        };
      }
      const wow = await this.wowRepository.create(userId, postId);
      await this.postRepository.incrementWowCount(postId);
      return {
        success: true,
        data: wow,
        message: "Wow \u6210\u529F\uFF01"
      };
    } catch (error) {
      console.error("Give wow error:", error);
      return {
        success: false,
        error: "\u7D66 Wow \u5931\u6557"
      };
    }
  }
  // 取消 Wow 評價
  async removeWow(userId, postId) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      const existingWow = await this.wowRepository.findByUserAndPost(userId, postId);
      if (!existingWow) {
        return {
          success: false,
          error: "\u60A8\u9084\u6C92\u6709\u5C0D\u6B64\u8CBC\u6587\u7D66\u904E Wow"
        };
      }
      const success = await this.wowRepository.deleteByUserAndPost(userId, postId);
      if (!success) {
        return {
          success: false,
          error: "\u53D6\u6D88 Wow \u5931\u6557"
        };
      }
      await this.postRepository.decrementWowCount(postId);
      return {
        success: true,
        message: "\u5DF2\u53D6\u6D88 Wow"
      };
    } catch (error) {
      console.error("Remove wow error:", error);
      return {
        success: false,
        error: "\u53D6\u6D88 Wow \u5931\u6557"
      };
    }
  }
  // 檢查使用者是否已對貼文給過 Wow
  async hasUserWowed(userId, postId) {
    try {
      const wow = await this.wowRepository.findByUserAndPost(userId, postId);
      return {
        success: true,
        data: !!wow
      };
    } catch (error) {
      console.error("Check wow status error:", error);
      return {
        success: false,
        error: "\u6AA2\u67E5 Wow \u72C0\u614B\u5931\u6557"
      };
    }
  }
  // 獲取貼文的 Wow 列表
  async getPostWows(postId) {
    try {
      const wows = await this.wowRepository.findByPost(postId);
      return {
        success: true,
        data: wows
      };
    } catch (error) {
      console.error("Get post wows error:", error);
      return {
        success: false,
        error: "\u7372\u53D6 Wow \u5217\u8868\u5931\u6557"
      };
    }
  }
  // 獲取使用者給過的 Wow 列表
  async getUserWows(userId) {
    try {
      const wows = await this.wowRepository.findByUser(userId);
      return {
        success: true,
        data: wows
      };
    } catch (error) {
      console.error("Get user wows error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u4F7F\u7528\u8005 Wow \u5217\u8868\u5931\u6557"
      };
    }
  }
  // 獲取統計資訊
  async getWowStats() {
    try {
      const totalWows = await this.wowRepository.countAll();
      const totalPosts = await this.postRepository.countAll();
      const avgWowsPerPost = totalPosts > 0 ? totalWows / totalPosts : 0;
      return {
        success: true,
        data: {
          totalWows,
          totalPosts,
          avgWowsPerPost: Math.round(avgWowsPerPost * 100) / 100
        }
      };
    } catch (error) {
      console.error("Get wow stats error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u7D71\u8A08\u8CC7\u8A0A\u5931\u6557"
      };
    }
  }
}

const create_post = defineEventHandler(async (event) => {
  var _a;
  try {
    assertMethod(event, "POST");
    const token = getCookie(event, "auth-token") || ((_a = getHeader(event, "authorization")) == null ? void 0 : _a.replace("Bearer ", ""));
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Missing authentication token"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid or expired token"
      });
    }
    const body = await readBody(event);
    if (!body.postId || !body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: postId and category"
      });
    }
    const wowData = {
      userId: payload.userId,
      postId: body.postId,
      category: body.category
    };
    const wowService = new WowService();
    const result = await wowService.createWow(wowData);
    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || "Failed to create wow"
      });
    }
    return {
      success: true,
      data: result.data,
      message: "Wow \u8A55\u50F9\u5DF2\u6210\u529F\u6DFB\u52A0"
    };
  } catch (error) {
    console.error("Wow API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const create_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: create_post
});

const index_post = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");
    const body = await readBody(event);
    if (!body.postId || !body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: postId and category"
      });
    }
    const userId = "user_test_1";
    const db = getDatabase();
    const post = await db.findById("posts", body.postId);
    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found"
      });
    }
    const existingWow = await db.get(
      "wows",
      (wow) => wow.userId === userId && wow.postId === body.postId
    );
    if (existingWow) {
      await db.update("wows", existingWow.id, {
        category: body.category,
        updatedAt: /* @__PURE__ */ new Date()
      });
    } else {
      await db.insert("wows", {
        userId,
        postId: body.postId,
        category: body.category,
        createdAt: /* @__PURE__ */ new Date()
      });
      const currentWowCount = post.wowCount || 0;
      await db.update("posts", body.postId, {
        wowCount: currentWowCount + 1
      });
    }
    return {
      success: true,
      message: "Wow \u8A55\u50F9\u5DF2\u6210\u529F\u66F4\u65B0",
      data: {
        postId: body.postId,
        category: body.category,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("Wow API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});
//# sourceMappingURL=index.mjs.map
