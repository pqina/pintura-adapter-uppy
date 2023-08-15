var ie = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ct(r) {
  if (r.__esModule)
    return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function s() {
      if (this instanceof s) {
        var n = [null];
        n.push.apply(n, arguments);
        var i = Function.bind.apply(e, n);
        return new i();
      }
      return e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(s) {
    var n = Object.getOwnPropertyDescriptor(r, s);
    Object.defineProperty(t, s, n.get ? n : {
      enumerable: !0,
      get: function() {
        return r[s];
      }
    });
  }), t;
}
var ve = { exports: {} }, q = {};
function ce(r) {
  return r < 10 ? `0${r}` : r.toString();
}
function pt() {
  const r = /* @__PURE__ */ new Date(), e = ce(r.getHours()), t = ce(r.getMinutes()), s = ce(r.getSeconds());
  return `${e}:${t}:${s}`;
}
var ht = pt;
Object.defineProperty(q, "__esModule", {
  value: !0
});
q.justErrorsLogger = q.debugLogger = void 0;
const ne = ht, ft = {
  debug: () => {
  },
  warn: () => {
  },
  error: function() {
    for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
      e[t] = arguments[t];
    return console.error(`[Uppy] [${ne()}]`, ...e);
  }
};
q.justErrorsLogger = ft;
const gt = {
  debug: function() {
    for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
      e[t] = arguments[t];
    return console.debug(`[Uppy] [${ne()}]`, ...e);
  },
  warn: function() {
    for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
      e[t] = arguments[t];
    return console.warn(`[Uppy] [${ne()}]`, ...e);
  },
  error: function() {
    for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
      e[t] = arguments[t];
    return console.error(`[Uppy] [${ne()}]`, ...e);
  }
};
q.debugLogger = gt;
let mt = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", _t = (r, e = 21) => (t = e) => {
  let s = "", n = t;
  for (; n--; )
    s += r[Math.random() * r.length | 0];
  return s;
}, vt = (r = 21) => {
  let e = "", t = r;
  for (; t--; )
    e += mt[Math.random() * 64 | 0];
  return e;
};
var yt = { nanoid: vt, customAlphabet: _t }, C = {}, bt = function(e) {
  if (typeof e != "number" || isNaN(e))
    throw new TypeError("Expected a number, got " + typeof e);
  var t = e < 0, s = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (t && (e = -e), e < 1)
    return (t ? "-" : "") + e + " B";
  var n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), s.length - 1);
  e = Number(e / Math.pow(1024, n));
  var i = s[n];
  return e >= 10 || e % 1 === 0 ? (t ? "-" : "") + e.toFixed(0) + " " + i : (t ? "-" : "") + e.toFixed(1) + " " + i;
};
function Be(r, e) {
  this.text = r = r || "", this.hasWild = ~r.indexOf("*"), this.separator = e, this.parts = r.split(e);
}
Be.prototype.match = function(r) {
  var e = !0, t = this.parts, s, n = t.length, i;
  if (typeof r == "string" || r instanceof String)
    if (!this.hasWild && this.text != r)
      e = !1;
    else {
      for (i = (r || "").split(this.separator), s = 0; e && s < n; s++)
        t[s] !== "*" && (s < i.length ? e = t[s] === i[s] : e = !1);
      e = e && i;
    }
  else if (typeof r.splice == "function")
    for (e = [], s = r.length; s--; )
      this.match(r[s]) && (e[e.length] = r[s]);
  else if (typeof r == "object") {
    e = {};
    for (var o in r)
      this.match(o) && (e[o] = r[o]);
  }
  return e;
};
var wt = function(r, e, t) {
  var s = new Be(r, t || /[\/\.]/);
  return typeof e < "u" ? s.match(e) : s;
}, St = wt, Ft = /[\/\+\.]/, Pt = function(r, e) {
  function t(s) {
    var n = St(s, r, Ft);
    return n && n.length >= 2;
  }
  return e ? t(e.split(";")[0]) : t;
};
Object.defineProperty(C, "__esModule", {
  value: !0
});
C.defaultOptions = C.RestrictionError = C.Restricter = void 0;
const pe = bt, xt = Pt, Et = {
  maxFileSize: null,
  minFileSize: null,
  maxTotalFileSize: null,
  maxNumberOfFiles: null,
  minNumberOfFiles: null,
  allowedFileTypes: null,
  requiredMetaFields: []
};
C.defaultOptions = Et;
class k extends Error {
  constructor() {
    super(...arguments), this.isRestriction = !0;
  }
}
C.RestrictionError = k;
typeof AggregateError > "u" && (globalThis.AggregateError = class extends Error {
  constructor(e, t) {
    super(t), this.errors = e;
  }
});
class Ot {
  constructor(e, t) {
    this.i18n = t, this.getOpts = () => {
      const s = e();
      if (s.restrictions.allowedFileTypes != null && !Array.isArray(s.restrictions.allowedFileTypes))
        throw new TypeError("`restrictions.allowedFileTypes` must be an array");
      return s;
    };
  }
  validate(e, t) {
    const {
      maxFileSize: s,
      minFileSize: n,
      maxTotalFileSize: i,
      maxNumberOfFiles: o,
      allowedFileTypes: l
    } = this.getOpts().restrictions;
    if (o && t.filter((d) => !d.isGhost).length + 1 > o)
      throw new k(`${this.i18n("youCanOnlyUploadX", {
        smart_count: o
      })}`);
    if (l && !l.some((d) => d.includes("/") ? e.type ? xt(e.type.replace(/;.*?$/, ""), d) : !1 : d[0] === "." && e.extension ? e.extension.toLowerCase() === d.slice(1).toLowerCase() : !1)) {
      const d = l.join(", ");
      throw new k(this.i18n("youCanOnlyUploadFileTypes", {
        types: d
      }));
    }
    if (i && e.size != null && t.reduce((d, a) => d + a.size, e.size) > i)
      throw new k(this.i18n("exceedsSize", {
        size: pe(i),
        file: e.name
      }));
    if (s && e.size != null && e.size > s)
      throw new k(this.i18n("exceedsSize", {
        size: pe(s),
        file: e.name
      }));
    if (n && e.size != null && e.size < n)
      throw new k(this.i18n("inferiorSize", {
        size: pe(n)
      }));
  }
  validateMinNumberOfFiles(e) {
    const {
      minNumberOfFiles: t
    } = this.getOpts().restrictions;
    if (Object.keys(e).length < t)
      throw new k(this.i18n("youHaveToAtLeastSelectX", {
        smart_count: t
      }));
  }
  getMissingRequiredMetaFields(e) {
    const t = new k(this.i18n("missingRequiredMetaFieldOnFile", {
      fileName: e.name
    })), {
      requiredMetaFields: s
    } = this.getOpts().restrictions, n = Object.prototype.hasOwnProperty, i = [];
    for (const o of s)
      (!n.call(e.meta, o) || e.meta[o] === "") && i.push(o);
    return {
      missingFields: i,
      error: t
    };
  }
}
C.Restricter = Ot;
function Ut(r, e) {
  return Object.prototype.hasOwnProperty.call(r, e);
}
var Tt = Ut;
function xe(r, e) {
  if (!Object.prototype.hasOwnProperty.call(r, e))
    throw new TypeError("attempted to use private field on non-instance");
  return r;
}
var $t = 0;
function At(r) {
  return "__private_" + $t++ + "_" + r;
}
const jt = Tt;
function Mt(r, e, t) {
  const s = [];
  return r.forEach((n) => typeof n != "string" ? s.push(n) : e[Symbol.split](n).forEach((i, o, l) => {
    i !== "" && s.push(i), o < l.length - 1 && s.push(t);
  })), s;
}
/**
 * Takes a string with placeholder variables like `%{smart_count} file selected`
 * and replaces it with values from options `{smart_count: 5}`
 *
 * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
 * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
 *
 * @param {string} phrase that needs interpolation, with placeholders
 * @param {object} options with values that will be used to replace placeholders
 * @returns {any[]} interpolated
 */
function Ee(r, e) {
  const t = /\$/g, s = "$$$$";
  let n = [r];
  if (e == null)
    return n;
  for (const i of Object.keys(e))
    if (i !== "_") {
      let o = e[i];
      typeof o == "string" && (o = t[Symbol.replace](o, s)), n = Mt(n, new RegExp(`%\\{${i}\\}`, "g"), o);
    }
  return n;
}
var Y = /* @__PURE__ */ At("apply");
let kt = class {
  /**
   * @param {object|Array<object>} locales - locale or list of locales.
   */
  constructor(e) {
    Object.defineProperty(this, Y, {
      value: Ct
    }), this.locale = {
      strings: {},
      pluralize(t) {
        return t === 1 ? 0 : 1;
      }
    }, Array.isArray(e) ? e.forEach(xe(this, Y)[Y], this) : xe(this, Y)[Y](e);
  }
  /**
   * Public translate method
   *
   * @param {string} key
   * @param {object} options with values that will be used later to replace placeholders in string
   * @returns {string} translated (and interpolated)
   */
  translate(e, t) {
    return this.translateArray(e, t).join("");
  }
  /**
   * Get a translation and return the translated and interpolated parts as an array.
   *
   * @param {string} key
   * @param {object} options with values that will be used to replace placeholders
   * @returns {Array} The translated and interpolated parts, in order.
   */
  translateArray(e, t) {
    if (!jt(this.locale.strings, e))
      throw new Error(`missing string: ${e}`);
    const s = this.locale.strings[e];
    if (typeof s == "object") {
      if (t && typeof t.smart_count < "u") {
        const i = this.locale.pluralize(t.smart_count);
        return Ee(s[i], t);
      }
      throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
    }
    return Ee(s, t);
  }
};
function Ct(r) {
  if (!(r != null && r.strings))
    return;
  const e = this.locale;
  this.locale = {
    ...e,
    strings: {
      ...e.strings,
      ...r.strings
    }
  }, this.locale.pluralize = r.pluralize || e.pluralize;
}
var Ie = kt, Nt = function() {
  var e = {}, t = e._fns = {};
  e.emit = function(o, l, u, d, a, p, g) {
    var c = s(o);
    c.length && n(o, c, [l, u, d, a, p, g]);
  }, e.on = function(o, l) {
    t[o] || (t[o] = []), t[o].push(l);
  }, e.once = function(o, l) {
    function u() {
      l.apply(this, arguments), e.off(o, u);
    }
    this.on(o, u);
  }, e.off = function(o, l) {
    var u = [];
    if (o && l) {
      var d = this._fns[o], a = 0, p = d ? d.length : 0;
      for (a; a < p; a++)
        d[a] !== l && u.push(d[a]);
    }
    u.length ? this._fns[o] = u : delete this._fns[o];
  };
  function s(i) {
    var o = t[i] ? t[i] : [], l = i.indexOf(":"), u = l === -1 ? [i] : [i.substring(0, l), i.substring(l + 1)], d = Object.keys(t), a = 0, p = d.length;
    for (a; a < p; a++) {
      var g = d[a];
      if (g === "*" && (o = o.concat(t[g])), u.length === 2 && u[0] === g) {
        o = o.concat(t[g]);
        break;
      }
    }
    return o;
  }
  function n(i, o, l) {
    var u = 0, d = o.length;
    for (u; u < d && o[u]; u++)
      o[u].event = i, o[u].apply(o[u], l);
  }
  return e;
}, qe = "Expected a function", Oe = 0 / 0, Rt = "[object Symbol]", Lt = /^\s+|\s+$/g, zt = /^[-+]0x[0-9a-f]+$/i, Bt = /^0b[01]+$/i, It = /^0o[0-7]+$/i, qt = parseInt, Wt = typeof ie == "object" && ie && ie.Object === Object && ie, Gt = typeof self == "object" && self && self.Object === Object && self, Ht = Wt || Gt || Function("return this")(), Yt = Object.prototype, Vt = Yt.toString, Xt = Math.max, Kt = Math.min, he = function() {
  return Ht.Date.now();
};
function Jt(r, e, t) {
  var s, n, i, o, l, u, d = 0, a = !1, p = !1, g = !0;
  if (typeof r != "function")
    throw new TypeError(qe);
  e = Ue(e) || 0, oe(t) && (a = !!t.leading, p = "maxWait" in t, i = p ? Xt(Ue(t.maxWait) || 0, e) : i, g = "trailing" in t ? !!t.trailing : g);
  function c(_) {
    var x = s, w = n;
    return s = n = void 0, d = _, o = r.apply(w, x), o;
  }
  function f(_) {
    return d = _, l = setTimeout(y, e), a ? c(_) : o;
  }
  function E(_) {
    var x = _ - u, w = _ - d, R = e - x;
    return p ? Kt(R, i - w) : R;
  }
  function m(_) {
    var x = _ - u, w = _ - d;
    return u === void 0 || x >= e || x < 0 || p && w >= i;
  }
  function y() {
    var _ = he();
    if (m(_))
      return F(_);
    l = setTimeout(y, E(_));
  }
  function F(_) {
    return l = void 0, g && s ? c(_) : (s = n = void 0, o);
  }
  function W() {
    l !== void 0 && clearTimeout(l), d = 0, s = u = n = l = void 0;
  }
  function N() {
    return l === void 0 ? o : F(he());
  }
  function G() {
    var _ = he(), x = m(_);
    if (s = arguments, n = this, u = _, x) {
      if (l === void 0)
        return f(u);
      if (p)
        return l = setTimeout(y, e), c(u);
    }
    return l === void 0 && (l = setTimeout(y, e)), o;
  }
  return G.cancel = W, G.flush = N, G;
}
function Zt(r, e, t) {
  var s = !0, n = !0;
  if (typeof r != "function")
    throw new TypeError(qe);
  return oe(t) && (s = "leading" in t ? !!t.leading : s, n = "trailing" in t ? !!t.trailing : n), Jt(r, e, {
    leading: s,
    maxWait: e,
    trailing: n
  });
}
function oe(r) {
  var e = typeof r;
  return !!r && (e == "object" || e == "function");
}
function Dt(r) {
  return !!r && typeof r == "object";
}
function Qt(r) {
  return typeof r == "symbol" || Dt(r) && Vt.call(r) == Rt;
}
function Ue(r) {
  if (typeof r == "number")
    return r;
  if (Qt(r))
    return Oe;
  if (oe(r)) {
    var e = typeof r.valueOf == "function" ? r.valueOf() : r;
    r = oe(e) ? e + "" : e;
  }
  if (typeof r != "string")
    return r === 0 ? r : +r;
  r = r.replace(Lt, "");
  var t = Bt.test(r);
  return t || It.test(r) ? qt(r.slice(2), t ? 2 : 8) : zt.test(r) ? Oe : +r;
}
var er = Zt;
function tr(r, e) {
  if (!Object.prototype.hasOwnProperty.call(r, e))
    throw new TypeError("attempted to use private field on non-instance");
  return r;
}
var rr = 0;
function sr(r) {
  return "__private_" + rr++ + "_" + r;
}
const ir = {
  version: "2.1.1"
};
var fe = /* @__PURE__ */ sr("publish");
let We = class {
  constructor() {
    Object.defineProperty(this, fe, {
      value: nr
    }), this.state = {}, this.callbacks = [];
  }
  getState() {
    return this.state;
  }
  setState(e) {
    const t = {
      ...this.state
    }, s = {
      ...this.state,
      ...e
    };
    this.state = s, tr(this, fe)[fe](t, s, e);
  }
  subscribe(e) {
    return this.callbacks.push(e), () => {
      this.callbacks.splice(this.callbacks.indexOf(e), 1);
    };
  }
};
function nr() {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
    e[t] = arguments[t];
  this.callbacks.forEach((s) => {
    s(...e);
  });
}
We.VERSION = ir.version;
function or() {
  return new We();
}
var ar = or;
function lr(r) {
  const e = r.lastIndexOf(".");
  return e === -1 || e === r.length - 1 ? {
    name: r,
    extension: void 0
  } : {
    name: r.slice(0, e),
    extension: r.slice(e + 1)
  };
}
var Ge = lr, dr = {
  md: "text/markdown",
  markdown: "text/markdown",
  mp4: "video/mp4",
  mp3: "audio/mp3",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
  yaml: "text/yaml",
  yml: "text/yaml",
  csv: "text/csv",
  tsv: "text/tab-separated-values",
  tab: "text/tab-separated-values",
  avi: "video/x-msvideo",
  mks: "video/x-matroska",
  mkv: "video/x-matroska",
  mov: "video/quicktime",
  dicom: "application/dicom",
  doc: "application/msword",
  docm: "application/vnd.ms-word.document.macroenabled.12",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  dot: "application/msword",
  dotm: "application/vnd.ms-word.template.macroenabled.12",
  dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  xla: "application/vnd.ms-excel",
  xlam: "application/vnd.ms-excel.addin.macroenabled.12",
  xlc: "application/vnd.ms-excel",
  xlf: "application/x-xliff+xml",
  xlm: "application/vnd.ms-excel",
  xls: "application/vnd.ms-excel",
  xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
  xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xlt: "application/vnd.ms-excel",
  xltm: "application/vnd.ms-excel.template.macroenabled.12",
  xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  xlw: "application/vnd.ms-excel",
  txt: "text/plain",
  text: "text/plain",
  conf: "text/plain",
  log: "text/plain",
  pdf: "application/pdf",
  zip: "application/zip",
  "7z": "application/x-7z-compressed",
  rar: "application/x-rar-compressed",
  tar: "application/x-tar",
  gz: "application/gzip",
  dmg: "application/x-apple-diskimage"
};
const ur = Ge, Te = dr;
function cr(r) {
  var e;
  if (r.type)
    return r.type;
  const t = r.name ? (e = ur(r.name).extension) == null ? void 0 : e.toLowerCase() : null;
  return t && t in Te ? Te[t] : "application/octet-stream";
}
var pr = cr;
function hr(r) {
  return r.charCodeAt(0).toString(32);
}
function $e(r) {
  let e = "";
  return r.replace(/[^A-Z0-9]/ig, (t) => (e += `-${hr(t)}`, "/")) + e;
}
function fr(r) {
  let e = "uppy";
  return typeof r.name == "string" && (e += `-${$e(r.name.toLowerCase())}`), r.type !== void 0 && (e += `-${r.type}`), r.meta && typeof r.meta.relativePath == "string" && (e += `-${$e(r.meta.relativePath.toLowerCase())}`), r.data.size !== void 0 && (e += `-${r.data.size}`), r.data.lastModified !== void 0 && (e += `-${r.data.lastModified}`), e;
}
var gr = fr;
function mr(r) {
  if (r == null && typeof navigator < "u" && (r = navigator.userAgent), !r)
    return !0;
  const e = /Edge\/(\d+\.\d+)/.exec(r);
  if (!e)
    return !0;
  const t = e[1];
  let [s, n] = t.split(".");
  return s = parseInt(s, 10), n = parseInt(n, 10), s < 15 || s === 15 && n < 15063 || s > 18 || s === 18 && n >= 18218;
}
var _r = mr;
function vr(r, e) {
  return e.name ? e.name : r.split("/")[0] === "image" ? `${r.split("/")[0]}.${r.split("/")[1]}` : "noname";
}
var yr = vr, br = {
  strings: {
    addBulkFilesFailed: {
      0: "Failed to add %{smart_count} file due to an internal error",
      1: "Failed to add %{smart_count} files due to internal errors"
    },
    youCanOnlyUploadX: {
      0: "You can only upload %{smart_count} file",
      1: "You can only upload %{smart_count} files"
    },
    youHaveToAtLeastSelectX: {
      0: "You have to select at least %{smart_count} file",
      1: "You have to select at least %{smart_count} files"
    },
    exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
    missingRequiredMetaField: "Missing required meta fields",
    missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
    inferiorSize: "This file is smaller than the allowed size of %{size}",
    youCanOnlyUploadFileTypes: "You can only upload: %{types}",
    noMoreFilesAllowed: "Cannot add more files",
    noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
    companionError: "Connection with Companion failed",
    authAborted: "Authentication aborted",
    companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
    failedToUpload: "Failed to upload %{file}",
    noInternetConnection: "No Internet connection",
    connectedToInternet: "Connected to the Internet",
    // Strings for remote providers
    noFilesFound: "You have no files or folders here",
    selectX: {
      0: "Select %{smart_count}",
      1: "Select %{smart_count}"
    },
    allFilesFromFolderNamed: "All files from folder %{name}",
    openFolderNamed: "Open folder %{name}",
    cancel: "Cancel",
    logOut: "Log out",
    filter: "Filter",
    resetFilter: "Reset filter",
    loading: "Loading...",
    authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
    authenticateWith: "Connect to %{pluginName}",
    signInWithGoogle: "Sign in with Google",
    searchImages: "Search for images",
    enterTextToSearch: "Enter text to search for images",
    search: "Search",
    emptyFolderAdded: "No files were added from empty folder",
    folderAlreadyAdded: 'The folder "%{folder}" was already added',
    folderAdded: {
      0: "Added %{smart_count} file from %{folder}",
      1: "Added %{smart_count} files from %{folder}"
    }
  }
}, wr = yt, Ae = q, H = C;
let He, Ye;
function h(r, e) {
  if (!Object.prototype.hasOwnProperty.call(r, e))
    throw new TypeError("attempted to use private field on non-instance");
  return r;
}
var Sr = 0;
function b(r) {
  return "__private_" + Sr++ + "_" + r;
}
const Fr = Ie, Pr = Nt, xr = er, Er = ar, Or = pr, Ur = Ge, Tr = gr, $r = _r, Ar = yr, jr = {
  version: "2.3.4"
}, Mr = br;
var S = /* @__PURE__ */ b("plugins"), O = /* @__PURE__ */ b("restricter"), V = /* @__PURE__ */ b("storeUnsubscribe"), T = /* @__PURE__ */ b("emitter"), L = /* @__PURE__ */ b("preProcessors"), z = /* @__PURE__ */ b("uploaders"), j = /* @__PURE__ */ b("postProcessors"), P = /* @__PURE__ */ b("informAndEmit"), ee = /* @__PURE__ */ b("checkRequiredMetaFieldsOnFile"), ge = /* @__PURE__ */ b("checkRequiredMetaFields"), X = /* @__PURE__ */ b("assertNewUploadAllowed"), K = /* @__PURE__ */ b("checkAndCreateFileStateObject"), J = /* @__PURE__ */ b("startIfAutoProceed"), me = /* @__PURE__ */ b("addListeners"), U = /* @__PURE__ */ b("updateOnlineStatus"), $ = /* @__PURE__ */ b("createUpload"), _e = /* @__PURE__ */ b("getUpload"), I = /* @__PURE__ */ b("removeUpload"), A = /* @__PURE__ */ b("runUpload");
He = Symbol.for("uppy test: getPlugins");
Ye = Symbol.for("uppy test: createUpload");
class Ve {
  /** @type {Record<string, BasePlugin[]>} */
  /**
   * Instantiate Uppy
   *
   * @param {object} opts — Uppy options
   */
  constructor(e) {
    Object.defineProperty(this, A, {
      value: Gr
    }), Object.defineProperty(this, I, {
      value: Wr
    }), Object.defineProperty(this, _e, {
      value: qr
    }), Object.defineProperty(this, $, {
      value: Ir
    }), Object.defineProperty(this, me, {
      value: Br
    }), Object.defineProperty(this, J, {
      value: zr
    }), Object.defineProperty(this, K, {
      value: Lr
    }), Object.defineProperty(this, X, {
      value: Rr
    }), Object.defineProperty(this, ge, {
      value: Nr
    }), Object.defineProperty(this, ee, {
      value: Cr
    }), Object.defineProperty(this, P, {
      value: kr
    }), Object.defineProperty(this, S, {
      writable: !0,
      value: /* @__PURE__ */ Object.create(null)
    }), Object.defineProperty(this, O, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, V, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, T, {
      writable: !0,
      value: Pr()
    }), Object.defineProperty(this, L, {
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), Object.defineProperty(this, z, {
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), Object.defineProperty(this, j, {
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), Object.defineProperty(this, U, {
      writable: !0,
      value: this.updateOnlineStatus.bind(this)
    }), this.defaultLocale = Mr;
    const t = {
      id: "uppy",
      autoProceed: !1,
      /**
       * @deprecated The method should not be used
       */
      allowMultipleUploads: !0,
      allowMultipleUploadBatches: !0,
      debug: !1,
      restrictions: H.defaultOptions,
      meta: {},
      onBeforeFileAdded: (s) => s,
      onBeforeUpload: (s) => s,
      store: Er(),
      logger: Ae.justErrorsLogger,
      infoTimeout: 5e3
    };
    this.opts = {
      ...t,
      ...e,
      restrictions: {
        ...t.restrictions,
        ...e && e.restrictions
      }
    }, e && e.logger && e.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : e && e.debug && (this.opts.logger = Ae.debugLogger), this.log(`Using Core v${this.constructor.VERSION}`), this.i18nInit(), this.calculateProgress = xr(this.calculateProgress.bind(this), 500, {
      leading: !0,
      trailing: !0
    }), this.store = this.opts.store, this.setState({
      plugins: {},
      files: {},
      currentUploads: {},
      allowNewUpload: !0,
      capabilities: {
        uploadProgress: $r(),
        individualCancellation: !0,
        resumableUploads: !1
      },
      totalProgress: 0,
      meta: {
        ...this.opts.meta
      },
      info: [],
      recoveredState: null
    }), h(this, O)[O] = new H.Restricter(() => this.opts, this.i18n), h(this, V)[V] = this.store.subscribe((s, n, i) => {
      this.emit("state-update", s, n, i), this.updateAll(n);
    }), this.opts.debug && typeof window < "u" && (window[this.opts.id] = this), h(this, me)[me]();
  }
  emit(e) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    h(this, T)[T].emit(e, ...s);
  }
  on(e, t) {
    return h(this, T)[T].on(e, t), this;
  }
  once(e, t) {
    return h(this, T)[T].once(e, t), this;
  }
  off(e, t) {
    return h(this, T)[T].off(e, t), this;
  }
  /**
   * Iterate on all plugins and run `update` on them.
   * Called each time state changes.
   *
   */
  updateAll(e) {
    this.iteratePlugins((t) => {
      t.update(e);
    });
  }
  /**
   * Updates state with a patch
   *
   * @param {object} patch {foo: 'bar'}
   */
  setState(e) {
    this.store.setState(e);
  }
  /**
   * Returns current state.
   *
   * @returns {object}
   */
  getState() {
    return this.store.getState();
  }
  /**
   * Back compat for when uppy.state is used instead of uppy.getState().
   *
   * @deprecated
   */
  get state() {
    return this.getState();
  }
  /**
   * Shorthand to set state for a specific file.
   */
  setFileState(e, t) {
    if (!this.getState().files[e])
      throw new Error(`Can’t set state for ${e} (the file could have been removed)`);
    this.setState({
      files: {
        ...this.getState().files,
        [e]: {
          ...this.getState().files[e],
          ...t
        }
      }
    });
  }
  i18nInit() {
    const e = new Fr([this.defaultLocale, this.opts.locale]);
    this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.locale = e.locale;
  }
  setOptions(e) {
    this.opts = {
      ...this.opts,
      ...e,
      restrictions: {
        ...this.opts.restrictions,
        ...e && e.restrictions
      }
    }, e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins((t) => {
      t.setOptions();
    }), this.setState();
  }
  resetProgress() {
    const e = {
      percentage: 0,
      bytesUploaded: 0,
      uploadComplete: !1,
      uploadStarted: null
    }, t = {
      ...this.getState().files
    }, s = {};
    Object.keys(t).forEach((n) => {
      const i = {
        ...t[n]
      };
      i.progress = {
        ...i.progress,
        ...e
      }, s[n] = i;
    }), this.setState({
      files: s,
      totalProgress: 0
    }), this.emit("reset-progress");
  }
  addPreProcessor(e) {
    h(this, L)[L].add(e);
  }
  removePreProcessor(e) {
    return h(this, L)[L].delete(e);
  }
  addPostProcessor(e) {
    h(this, j)[j].add(e);
  }
  removePostProcessor(e) {
    return h(this, j)[j].delete(e);
  }
  addUploader(e) {
    h(this, z)[z].add(e);
  }
  removeUploader(e) {
    return h(this, z)[z].delete(e);
  }
  setMeta(e) {
    const t = {
      ...this.getState().meta,
      ...e
    }, s = {
      ...this.getState().files
    };
    Object.keys(s).forEach((n) => {
      s[n] = {
        ...s[n],
        meta: {
          ...s[n].meta,
          ...e
        }
      };
    }), this.log("Adding metadata:"), this.log(e), this.setState({
      meta: t,
      files: s
    });
  }
  setFileMeta(e, t) {
    const s = {
      ...this.getState().files
    };
    if (!s[e]) {
      this.log("Was trying to set metadata for a file that has been removed: ", e);
      return;
    }
    const n = {
      ...s[e].meta,
      ...t
    };
    s[e] = {
      ...s[e],
      meta: n
    }, this.setState({
      files: s
    });
  }
  /**
   * Get a file object.
   *
   * @param {string} fileID The ID of the file object to return.
   */
  getFile(e) {
    return this.getState().files[e];
  }
  /**
   * Get all files in an array.
   */
  getFiles() {
    const {
      files: e
    } = this.getState();
    return Object.values(e);
  }
  getObjectOfFilesPerState() {
    const {
      files: e,
      totalProgress: t,
      error: s
    } = this.getState(), n = Object.values(e), i = n.filter((f) => {
      let {
        progress: E
      } = f;
      return !E.uploadComplete && E.uploadStarted;
    }), o = n.filter((f) => !f.progress.uploadStarted), l = n.filter((f) => f.progress.uploadStarted || f.progress.preprocess || f.progress.postprocess), u = n.filter((f) => f.progress.uploadStarted), d = n.filter((f) => f.isPaused), a = n.filter((f) => f.progress.uploadComplete), p = n.filter((f) => f.error), g = i.filter((f) => !f.isPaused), c = n.filter((f) => f.progress.preprocess || f.progress.postprocess);
    return {
      newFiles: o,
      startedFiles: l,
      uploadStartedFiles: u,
      pausedFiles: d,
      completeFiles: a,
      erroredFiles: p,
      inProgressFiles: i,
      inProgressNotPausedFiles: g,
      processingFiles: c,
      isUploadStarted: u.length > 0,
      isAllComplete: t === 100 && a.length === n.length && c.length === 0,
      isAllErrored: !!s && p.length === n.length,
      isAllPaused: i.length !== 0 && d.length === i.length,
      isUploadInProgress: i.length > 0,
      isSomeGhost: n.some((f) => f.isGhost)
    };
  }
  /*
  * @constructs
  * @param { Error } error
  * @param { undefined } file
  */
  /*
  * @constructs
  * @param { RestrictionError } error
  * @param { UppyFile | undefined } file
  */
  validateRestrictions(e, t) {
    t === void 0 && (t = this.getFiles());
    try {
      return h(this, O)[O].validate(e, t), {
        result: !0
      };
    } catch (s) {
      return {
        result: !1,
        reason: s.message
      };
    }
  }
  checkIfFileAlreadyExists(e) {
    const {
      files: t
    } = this.getState();
    return !!(t[e] && !t[e].isGhost);
  }
  /**
   * Create a file state object based on user-provided `addFile()` options.
   *
   * Note this is extremely side-effectful and should only be done when a file state object
   * will be added to state immediately afterward!
   *
   * The `files` value is passed in because it may be updated by the caller without updating the store.
   */
  /**
   * Add a new file to `state.files`. This will run `onBeforeFileAdded`,
   * try to guess file type in a clever way, check file against restrictions,
   * and start an upload if `autoProceed === true`.
   *
   * @param {object} file object to add
   * @returns {string} id for the added file
   */
  addFile(e) {
    h(this, X)[X](e);
    const {
      files: t
    } = this.getState();
    let s = h(this, K)[K](t, e);
    return t[s.id] && t[s.id].isGhost && (s = {
      ...t[s.id],
      data: e.data,
      isGhost: !1
    }, this.log(`Replaced the blob in the restored ghost file: ${s.name}, ${s.id}`)), this.setState({
      files: {
        ...t,
        [s.id]: s
      }
    }), this.emit("file-added", s), this.emit("files-added", [s]), this.log(`Added file: ${s.name}, ${s.id}, mime type: ${s.type}`), h(this, J)[J](), s.id;
  }
  /**
   * Add multiple files to `state.files`. See the `addFile()` documentation.
   *
   * If an error occurs while adding a file, it is logged and the user is notified.
   * This is good for UI plugins, but not for programmatic use.
   * Programmatic users should usually still use `addFile()` on individual files.
   */
  addFiles(e) {
    h(this, X)[X]();
    const t = {
      ...this.getState().files
    }, s = [], n = [];
    for (let i = 0; i < e.length; i++)
      try {
        let o = h(this, K)[K](t, e[i]);
        t[o.id] && t[o.id].isGhost && (o = {
          ...t[o.id],
          data: e[i].data,
          isGhost: !1
        }, this.log(`Replaced blob in a ghost file: ${o.name}, ${o.id}`)), t[o.id] = o, s.push(o);
      } catch (o) {
        o.isRestriction || n.push(o);
      }
    if (this.setState({
      files: t
    }), s.forEach((i) => {
      this.emit("file-added", i);
    }), this.emit("files-added", s), s.length > 5 ? this.log(`Added batch of ${s.length} files`) : Object.keys(s).forEach((i) => {
      this.log(`Added file: ${s[i].name}
 id: ${s[i].id}
 type: ${s[i].type}`);
    }), s.length > 0 && h(this, J)[J](), n.length > 0) {
      let i = `Multiple errors occurred while adding files:
`;
      if (n.forEach((o) => {
        i += `
 * ${o.message}`;
      }), this.info({
        message: this.i18n("addBulkFilesFailed", {
          smart_count: n.length
        }),
        details: i
      }, "error", this.opts.infoTimeout), typeof AggregateError == "function")
        throw new AggregateError(n, i);
      {
        const o = new Error(i);
        throw o.errors = n, o;
      }
    }
  }
  removeFiles(e, t) {
    const {
      files: s,
      currentUploads: n
    } = this.getState(), i = {
      ...s
    }, o = {
      ...n
    }, l = /* @__PURE__ */ Object.create(null);
    e.forEach((p) => {
      s[p] && (l[p] = s[p], delete i[p]);
    });
    function u(p) {
      return l[p] === void 0;
    }
    Object.keys(o).forEach((p) => {
      const g = n[p].fileIDs.filter(u);
      if (g.length === 0) {
        delete o[p];
        return;
      }
      const {
        capabilities: c
      } = this.getState();
      if (g.length !== n[p].fileIDs.length && !c.individualCancellation)
        throw new Error("individualCancellation is disabled");
      o[p] = {
        ...n[p],
        fileIDs: g
      };
    });
    const d = {
      currentUploads: o,
      files: i
    };
    Object.keys(i).length === 0 && (d.allowNewUpload = !0, d.error = null, d.recoveredState = null), this.setState(d), this.calculateTotalProgress();
    const a = Object.keys(l);
    a.forEach((p) => {
      this.emit("file-removed", l[p], t);
    }), a.length > 5 ? this.log(`Removed ${a.length} files`) : this.log(`Removed files: ${a.join(", ")}`);
  }
  removeFile(e, t) {
    t === void 0 && (t = null), this.removeFiles([e], t);
  }
  pauseResume(e) {
    if (!this.getState().capabilities.resumableUploads || this.getFile(e).uploadComplete)
      return;
    const s = !(this.getFile(e).isPaused || !1);
    return this.setFileState(e, {
      isPaused: s
    }), this.emit("upload-pause", e, s), s;
  }
  pauseAll() {
    const e = {
      ...this.getState().files
    };
    Object.keys(e).filter((s) => !e[s].progress.uploadComplete && e[s].progress.uploadStarted).forEach((s) => {
      const n = {
        ...e[s],
        isPaused: !0
      };
      e[s] = n;
    }), this.setState({
      files: e
    }), this.emit("pause-all");
  }
  resumeAll() {
    const e = {
      ...this.getState().files
    };
    Object.keys(e).filter((s) => !e[s].progress.uploadComplete && e[s].progress.uploadStarted).forEach((s) => {
      const n = {
        ...e[s],
        isPaused: !1,
        error: null
      };
      e[s] = n;
    }), this.setState({
      files: e
    }), this.emit("resume-all");
  }
  retryAll() {
    const e = {
      ...this.getState().files
    }, t = Object.keys(e).filter((n) => e[n].error);
    if (t.forEach((n) => {
      const i = {
        ...e[n],
        isPaused: !1,
        error: null
      };
      e[n] = i;
    }), this.setState({
      files: e,
      error: null
    }), this.emit("retry-all", t), t.length === 0)
      return Promise.resolve({
        successful: [],
        failed: []
      });
    const s = h(this, $)[$](t, {
      forceAllowNewUpload: !0
      // create new upload even if allowNewUpload: false
    });
    return h(this, A)[A](s);
  }
  cancelAll(e) {
    let {
      reason: t = "user"
    } = e === void 0 ? {} : e;
    if (this.emit("cancel-all", {
      reason: t
    }), t === "user") {
      const {
        files: s
      } = this.getState(), n = Object.keys(s);
      n.length && this.removeFiles(n, "cancel-all"), this.setState({
        totalProgress: 0,
        error: null,
        recoveredState: null
      });
    }
  }
  retryUpload(e) {
    this.setFileState(e, {
      error: null,
      isPaused: !1
    }), this.emit("upload-retry", e);
    const t = h(this, $)[$]([e], {
      forceAllowNewUpload: !0
      // create new upload even if allowNewUpload: false
    });
    return h(this, A)[A](t);
  }
  // todo remove in next major. what is the point of the reset method when we have cancelAll or vice versa?
  reset() {
    this.cancelAll(...arguments);
  }
  logout() {
    this.iteratePlugins((e) => {
      e.provider && e.provider.logout && e.provider.logout();
    });
  }
  calculateProgress(e, t) {
    if (e == null || !this.getFile(e.id)) {
      this.log(`Not setting progress for a file that has been removed: ${e == null ? void 0 : e.id}`);
      return;
    }
    const s = Number.isFinite(t.bytesTotal) && t.bytesTotal > 0;
    this.setFileState(e.id, {
      progress: {
        ...this.getFile(e.id).progress,
        bytesUploaded: t.bytesUploaded,
        bytesTotal: t.bytesTotal,
        percentage: s ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : 0
      }
    }), this.calculateTotalProgress();
  }
  calculateTotalProgress() {
    const t = this.getFiles().filter((d) => d.progress.uploadStarted || d.progress.preprocess || d.progress.postprocess);
    if (t.length === 0) {
      this.emit("progress", 0), this.setState({
        totalProgress: 0
      });
      return;
    }
    const s = t.filter((d) => d.progress.bytesTotal != null), n = t.filter((d) => d.progress.bytesTotal == null);
    if (s.length === 0) {
      const d = t.length * 100, a = n.reduce((g, c) => g + c.progress.percentage, 0), p = Math.round(a / d * 100);
      this.setState({
        totalProgress: p
      });
      return;
    }
    let i = s.reduce((d, a) => d + a.progress.bytesTotal, 0);
    const o = i / s.length;
    i += o * n.length;
    let l = 0;
    s.forEach((d) => {
      l += d.progress.bytesUploaded;
    }), n.forEach((d) => {
      l += o * (d.progress.percentage || 0) / 100;
    });
    let u = i === 0 ? 0 : Math.round(l / i * 100);
    u > 100 && (u = 100), this.setState({
      totalProgress: u
    }), this.emit("progress", u);
  }
  /**
   * Registers listeners for all global actions, like:
   * `error`, `file-removed`, `upload-progress`
   */
  updateOnlineStatus() {
    (typeof window.navigator.onLine < "u" ? window.navigator.onLine : !0) ? (this.emit("is-online"), this.wasOffline && (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), this.wasOffline = !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0);
  }
  getID() {
    return this.opts.id;
  }
  /**
   * Registers a plugin with Core.
   *
   * @param {object} Plugin object
   * @param {object} [opts] object with options to be passed to Plugin
   * @returns {object} self for chaining
   */
  // eslint-disable-next-line no-shadow
  use(e, t) {
    if (typeof e != "function") {
      const o = `Expected a plugin class, but got ${e === null ? "null" : typeof e}. Please verify that the plugin was imported and spelled correctly.`;
      throw new TypeError(o);
    }
    const s = new e(this, t), n = s.id;
    if (!n)
      throw new Error("Your plugin must have an id");
    if (!s.type)
      throw new Error("Your plugin must have a type");
    const i = this.getPlugin(n);
    if (i) {
      const o = `Already found a plugin named '${i.id}'. Tried to use: '${n}'.
Uppy plugins must have unique \`id\` options. See https://uppy.io/docs/plugins/#id.`;
      throw new Error(o);
    }
    return e.VERSION && this.log(`Using ${n} v${e.VERSION}`), s.type in h(this, S)[S] ? h(this, S)[S][s.type].push(s) : h(this, S)[S][s.type] = [s], s.install(), this;
  }
  /**
   * Find one Plugin by name.
   *
   * @param {string} id plugin id
   * @returns {BasePlugin|undefined}
   */
  getPlugin(e) {
    for (const t of Object.values(h(this, S)[S])) {
      const s = t.find((n) => n.id === e);
      if (s != null)
        return s;
    }
  }
  [He](e) {
    return h(this, S)[S][e];
  }
  /**
   * Iterate through all `use`d plugins.
   *
   * @param {Function} method that will be run on each plugin
   */
  iteratePlugins(e) {
    Object.values(h(this, S)[S]).flat(1).forEach(e);
  }
  /**
   * Uninstall and remove a plugin.
   *
   * @param {object} instance The plugin instance to remove.
   */
  removePlugin(e) {
    this.log(`Removing plugin ${e.id}`), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
    const t = h(this, S)[S][e.type], s = t.findIndex((o) => o.id === e.id);
    s !== -1 && t.splice(s, 1);
    const i = {
      plugins: {
        ...this.getState().plugins,
        [e.id]: void 0
      }
    };
    this.setState(i);
  }
  /**
   * Uninstall all plugins and close down this Uppy instance.
   */
  close(e) {
    let {
      reason: t
    } = e === void 0 ? {} : e;
    this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`), this.cancelAll({
      reason: t
    }), h(this, V)[V](), this.iteratePlugins((s) => {
      this.removePlugin(s);
    }), typeof window < "u" && window.removeEventListener && (window.removeEventListener("online", h(this, U)[U]), window.removeEventListener("offline", h(this, U)[U]));
  }
  hideInfo() {
    const {
      info: e
    } = this.getState();
    this.setState({
      info: e.slice(1)
    }), this.emit("info-hidden");
  }
  /**
   * Set info message in `state.info`, so that UI plugins like `Informer`
   * can display the message.
   *
   * @param {string | object} message Message to be displayed by the informer
   * @param {string} [type]
   * @param {number} [duration]
   */
  info(e, t, s) {
    t === void 0 && (t = "info"), s === void 0 && (s = 3e3);
    const n = typeof e == "object";
    this.setState({
      info: [...this.getState().info, {
        type: t,
        message: n ? e.message : e,
        details: n ? e.details : null
      }]
    }), setTimeout(() => this.hideInfo(), s), this.emit("info-visible");
  }
  /**
   * Passes messages to a function, provided in `opts.logger`.
   * If `opts.logger: Uppy.debugLogger` or `opts.debug: true`, logs to the browser console.
   *
   * @param {string|object} message to log
   * @param {string} [type] optional `error` or `warning`
   */
  log(e, t) {
    const {
      logger: s
    } = this.opts;
    switch (t) {
      case "error":
        s.error(e);
        break;
      case "warning":
        s.warn(e);
        break;
      default:
        s.debug(e);
        break;
    }
  }
  /**
   * Restore an upload by its ID.
   */
  restore(e) {
    return this.log(`Core: attempting to restore upload "${e}"`), this.getState().currentUploads[e] ? h(this, A)[A](e) : (h(this, I)[I](e), Promise.reject(new Error("Nonexistent upload")));
  }
  /**
   * Create an upload for a bunch of files.
   *
   * @param {Array<string>} fileIDs File IDs to include in this upload.
   * @returns {string} ID of this upload.
   */
  [Ye]() {
    return h(this, $)[$](...arguments);
  }
  /**
   * Add data to an upload's result object.
   *
   * @param {string} uploadID The ID of the upload.
   * @param {object} data Data properties to add to the result object.
   */
  addResultData(e, t) {
    if (!h(this, _e)[_e](e)) {
      this.log(`Not setting result for an upload that has been removed: ${e}`);
      return;
    }
    const {
      currentUploads: s
    } = this.getState(), n = {
      ...s[e],
      result: {
        ...s[e].result,
        ...t
      }
    };
    this.setState({
      currentUploads: {
        ...s,
        [e]: n
      }
    });
  }
  /**
   * Remove an upload, eg. if it has been canceled or completed.
   *
   * @param {string} uploadID The ID of the upload.
   */
  /**
   * Start an upload for all the files that are not currently being uploaded.
   *
   * @returns {Promise}
   */
  upload() {
    var e;
    (e = h(this, S)[S].uploader) != null && e.length || this.log("No uploader type plugins are used", "warning");
    let {
      files: t
    } = this.getState();
    const s = this.opts.onBeforeUpload(t);
    return s === !1 ? Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false")) : (s && typeof s == "object" && (t = s, this.setState({
      files: t
    })), Promise.resolve().then(() => h(this, O)[O].validateMinNumberOfFiles(t)).catch((n) => {
      throw h(this, P)[P](n), n;
    }).then(() => {
      if (!h(this, ge)[ge](t))
        throw new H.RestrictionError(this.i18n("missingRequiredMetaField"));
    }).catch((n) => {
      throw n;
    }).then(() => {
      const {
        currentUploads: n
      } = this.getState(), i = Object.values(n).flatMap((u) => u.fileIDs), o = [];
      Object.keys(t).forEach((u) => {
        const d = this.getFile(u);
        !d.progress.uploadStarted && i.indexOf(u) === -1 && o.push(d.id);
      });
      const l = h(this, $)[$](o);
      return h(this, A)[A](l);
    }).catch((n) => {
      throw this.emit("error", n), this.log(n, "error"), n;
    }));
  }
}
function kr(r, e) {
  const {
    message: t,
    details: s = ""
  } = r;
  r.isRestriction ? this.emit("restriction-failed", e, r) : this.emit("error", r), this.info({
    message: t,
    details: s
  }, "error", this.opts.infoTimeout), this.log(`${t} ${s}`.trim(), "error");
}
function Cr(r) {
  const {
    missingFields: e,
    error: t
  } = h(this, O)[O].getMissingRequiredMetaFields(r);
  return e.length > 0 ? (this.setFileState(r.id, {
    missingRequiredMetaFields: e
  }), this.log(t.message), this.emit("restriction-failed", r, t), !1) : !0;
}
function Nr(r) {
  let e = !0;
  for (const t of Object.values(r))
    h(this, ee)[ee](t) || (e = !1);
  return e;
}
function Rr(r) {
  const {
    allowNewUpload: e
  } = this.getState();
  if (e === !1) {
    const t = new H.RestrictionError(this.i18n("noMoreFilesAllowed"));
    throw h(this, P)[P](t, r), t;
  }
}
function Lr(r, e) {
  const t = Or(e), s = Ar(t, e), n = Ur(s).extension, i = !!e.isRemote, o = Tr({
    ...e,
    type: t
  });
  if (this.checkIfFileAlreadyExists(o)) {
    const p = new H.RestrictionError(this.i18n("noDuplicates", {
      fileName: s
    }));
    throw h(this, P)[P](p, e), p;
  }
  const l = e.meta || {};
  l.name = s, l.type = t;
  const u = Number.isFinite(e.data.size) ? e.data.size : null;
  let d = {
    source: e.source || "",
    id: o,
    name: s,
    extension: n || "",
    meta: {
      ...this.getState().meta,
      ...l
    },
    type: t,
    data: e.data,
    progress: {
      percentage: 0,
      bytesUploaded: 0,
      bytesTotal: u,
      uploadComplete: !1,
      uploadStarted: null
    },
    size: u,
    isRemote: i,
    remote: e.remote || "",
    preview: e.preview
  };
  const a = this.opts.onBeforeFileAdded(d, r);
  if (a === !1) {
    const p = new H.RestrictionError("Cannot add the file because onBeforeFileAdded returned false.");
    throw this.emit("restriction-failed", e, p), p;
  } else
    typeof a == "object" && a !== null && (d = a);
  try {
    const p = Object.keys(r).map((g) => r[g]);
    h(this, O)[O].validate(d, p);
  } catch (p) {
    throw h(this, P)[P](p, d), p;
  }
  return d;
}
function zr() {
  this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(() => {
    this.scheduledAutoProceed = null, this.upload().catch((r) => {
      r.isRestriction || this.log(r.stack || r.message || r);
    });
  }, 4));
}
function Br() {
  const r = (e, t, s) => {
    let n = e.message || "Unknown error";
    e.details && (n += ` ${e.details}`), this.setState({
      error: n
    }), t != null && t.id in this.getState().files && this.setFileState(t.id, {
      error: n,
      response: s
    });
  };
  this.on("error", r), this.on("upload-error", (e, t, s) => {
    if (r(t, e, s), typeof t == "object" && t.message) {
      const n = new Error(t.message);
      n.details = t.message, t.details && (n.details += ` ${t.details}`), n.message = this.i18n("failedToUpload", {
        file: e == null ? void 0 : e.name
      }), h(this, P)[P](n);
    } else
      h(this, P)[P](t);
  }), this.on("upload", () => {
    this.setState({
      error: null
    });
  }), this.on("upload-started", (e) => {
    if (e == null || !this.getFile(e.id)) {
      this.log(`Not setting progress for a file that has been removed: ${e == null ? void 0 : e.id}`);
      return;
    }
    this.setFileState(e.id, {
      progress: {
        uploadStarted: Date.now(),
        uploadComplete: !1,
        percentage: 0,
        bytesUploaded: 0,
        bytesTotal: e.size
      }
    });
  }), this.on("upload-progress", this.calculateProgress), this.on("upload-success", (e, t) => {
    if (e == null || !this.getFile(e.id)) {
      this.log(`Not setting progress for a file that has been removed: ${e == null ? void 0 : e.id}`);
      return;
    }
    const s = this.getFile(e.id).progress;
    this.setFileState(e.id, {
      progress: {
        ...s,
        postprocess: h(this, j)[j].size > 0 ? {
          mode: "indeterminate"
        } : null,
        uploadComplete: !0,
        percentage: 100,
        bytesUploaded: s.bytesTotal
      },
      response: t,
      uploadURL: t.uploadURL,
      isPaused: !1
    }), e.size == null && this.setFileState(e.id, {
      size: t.bytesUploaded || s.bytesTotal
    }), this.calculateTotalProgress();
  }), this.on("preprocess-progress", (e, t) => {
    if (e == null || !this.getFile(e.id)) {
      this.log(`Not setting progress for a file that has been removed: ${e == null ? void 0 : e.id}`);
      return;
    }
    this.setFileState(e.id, {
      progress: {
        ...this.getFile(e.id).progress,
        preprocess: t
      }
    });
  }), this.on("preprocess-complete", (e) => {
    if (e == null || !this.getFile(e.id)) {
      this.log(`Not setting progress for a file that has been removed: ${e == null ? void 0 : e.id}`);
      return;
    }
    const t = {
      ...this.getState().files
    };
    t[e.id] = {
      ...t[e.id],
      progress: {
        ...t[e.id].progress
      }
    }, delete t[e.id].progress.preprocess, this.setState({
      files: t
    });
  }), this.on("postprocess-progress", (e, t) => {
    if (e == null || !this.getFile(e.id)) {
      this.log(`Not setting progress for a file that has been removed: ${e == null ? void 0 : e.id}`);
      return;
    }
    this.setFileState(e.id, {
      progress: {
        ...this.getState().files[e.id].progress,
        postprocess: t
      }
    });
  }), this.on("postprocess-complete", (e) => {
    if (e == null || !this.getFile(e.id)) {
      this.log(`Not setting progress for a file that has been removed: ${e == null ? void 0 : e.id}`);
      return;
    }
    const t = {
      ...this.getState().files
    };
    t[e.id] = {
      ...t[e.id],
      progress: {
        ...t[e.id].progress
      }
    }, delete t[e.id].progress.postprocess, this.setState({
      files: t
    });
  }), this.on("restored", () => {
    this.calculateTotalProgress();
  }), this.on("dashboard:file-edit-complete", (e) => {
    e && h(this, ee)[ee](e);
  }), typeof window < "u" && window.addEventListener && (window.addEventListener("online", h(this, U)[U]), window.addEventListener("offline", h(this, U)[U]), setTimeout(h(this, U)[U], 3e3));
}
function Ir(r, e) {
  e === void 0 && (e = {});
  const {
    forceAllowNewUpload: t = !1
  } = e, {
    allowNewUpload: s,
    currentUploads: n
  } = this.getState();
  if (!s && !t)
    throw new Error("Cannot create a new upload: already uploading.");
  const i = (0, wr.nanoid)();
  return this.emit("upload", {
    id: i,
    fileIDs: r
  }), this.setState({
    allowNewUpload: this.opts.allowMultipleUploadBatches !== !1 && this.opts.allowMultipleUploads !== !1,
    currentUploads: {
      ...n,
      [i]: {
        fileIDs: r,
        step: 0,
        result: {}
      }
    }
  }), i;
}
function qr(r) {
  const {
    currentUploads: e
  } = this.getState();
  return e[r];
}
function Wr(r) {
  const e = {
    ...this.getState().currentUploads
  };
  delete e[r], this.setState({
    currentUploads: e
  });
}
async function Gr(r) {
  let {
    currentUploads: e
  } = this.getState(), t = e[r];
  const s = t.step || 0, n = [...h(this, L)[L], ...h(this, z)[z], ...h(this, j)[j]];
  try {
    for (let o = s; o < n.length && t; o++) {
      const l = n[o], u = {
        ...t,
        step: o
      };
      this.setState({
        currentUploads: {
          ...e,
          [r]: u
        }
      }), await l(u.fileIDs, r), e = this.getState().currentUploads, t = e[r];
    }
  } catch (o) {
    throw h(this, I)[I](r), o;
  }
  if (t) {
    t.fileIDs.forEach((d) => {
      const a = this.getFile(d);
      a && a.progress.postprocess && this.emit("postprocess-complete", a);
    });
    const o = t.fileIDs.map((d) => this.getFile(d)), l = o.filter((d) => !d.error), u = o.filter((d) => d.error);
    await this.addResultData(r, {
      successful: l,
      failed: u,
      uploadID: r
    }), e = this.getState().currentUploads, t = e[r];
  }
  let i;
  return t && (i = t.result, this.emit("complete", i), h(this, I)[I](r)), i == null && this.log(`Not setting result for an upload that has been removed: ${r}`), i;
}
Ve.VERSION = jr.version;
var je = Ve, re, v, Xe, Ke, B, Me, Je, ye, Ze, ae = {}, De = [], Hr = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ue = Array.isArray;
function M(r, e) {
  for (var t in e)
    r[t] = e[t];
  return r;
}
function Qe(r) {
  var e = r.parentNode;
  e && e.removeChild(r);
}
function be(r, e, t) {
  var s, n, i, o = {};
  for (i in e)
    i == "key" ? s = e[i] : i == "ref" ? n = e[i] : o[i] = e[i];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? re.call(arguments, 2) : t), typeof r == "function" && r.defaultProps != null)
    for (i in r.defaultProps)
      o[i] === void 0 && (o[i] = r.defaultProps[i]);
  return D(r, o, s, n, null);
}
function D(r, e, t, s, n) {
  var i = { type: r, props: e, key: t, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: n ?? ++Xe };
  return n == null && v.vnode != null && v.vnode(i), i;
}
function Yr() {
  return { current: null };
}
function se(r) {
  return r.children;
}
function Q(r, e) {
  this.props = r, this.context = e;
}
function te(r, e) {
  if (e == null)
    return r.__ ? te(r.__, r.__.__k.indexOf(r) + 1) : null;
  for (var t; e < r.__k.length; e++)
    if ((t = r.__k[e]) != null && t.__e != null)
      return t.__e;
  return typeof r.type == "function" ? te(r) : null;
}
function et(r) {
  var e, t;
  if ((r = r.__) != null && r.__c != null) {
    for (r.__e = r.__c.base = null, e = 0; e < r.__k.length; e++)
      if ((t = r.__k[e]) != null && t.__e != null) {
        r.__e = r.__c.base = t.__e;
        break;
      }
    return et(r);
  }
}
function we(r) {
  (!r.__d && (r.__d = !0) && B.push(r) && !le.__r++ || Me !== v.debounceRendering) && ((Me = v.debounceRendering) || Je)(le);
}
function le() {
  var r, e, t, s, n, i, o, l;
  for (B.sort(ye); r = B.shift(); )
    r.__d && (e = B.length, s = void 0, n = void 0, o = (i = (t = r).__v).__e, (l = t.__P) && (s = [], (n = M({}, i)).__v = i.__v + 1, Fe(l, i, n, t.__n, l.ownerSVGElement !== void 0, i.__h != null ? [o] : null, s, o ?? te(i), i.__h), ot(s, i), i.__e != o && et(i)), B.length > e && B.sort(ye));
  le.__r = 0;
}
function tt(r, e, t, s, n, i, o, l, u, d) {
  var a, p, g, c, f, E, m, y = s && s.__k || De, F = y.length;
  for (t.__k = [], a = 0; a < e.length; a++)
    if ((c = t.__k[a] = (c = e[a]) == null || typeof c == "boolean" || typeof c == "function" ? null : typeof c == "string" || typeof c == "number" || typeof c == "bigint" ? D(null, c, null, null, c) : ue(c) ? D(se, { children: c }, null, null, null) : c.__b > 0 ? D(c.type, c.props, c.key, c.ref ? c.ref : null, c.__v) : c) != null) {
      if (c.__ = t, c.__b = t.__b + 1, (g = y[a]) === null || g && c.key == g.key && c.type === g.type)
        y[a] = void 0;
      else
        for (p = 0; p < F; p++) {
          if ((g = y[p]) && c.key == g.key && c.type === g.type) {
            y[p] = void 0;
            break;
          }
          g = null;
        }
      Fe(r, c, g = g || ae, n, i, o, l, u, d), f = c.__e, (p = c.ref) && g.ref != p && (m || (m = []), g.ref && m.push(g.ref, null, c), m.push(p, c.__c || f, c)), f != null ? (E == null && (E = f), typeof c.type == "function" && c.__k === g.__k ? c.__d = u = rt(c, u, r) : u = it(r, c, g, y, f, u), typeof t.type == "function" && (t.__d = u)) : u && g.__e == u && u.parentNode != r && (u = te(g));
    }
  for (t.__e = E, a = F; a--; )
    y[a] != null && (typeof t.type == "function" && y[a].__e != null && y[a].__e == t.__d && (t.__d = nt(s).nextSibling), lt(y[a], y[a]));
  if (m)
    for (a = 0; a < m.length; a++)
      at(m[a], m[++a], m[++a]);
}
function rt(r, e, t) {
  for (var s, n = r.__k, i = 0; n && i < n.length; i++)
    (s = n[i]) && (s.__ = r, e = typeof s.type == "function" ? rt(s, e, t) : it(t, s, s, n, s.__e, e));
  return e;
}
function st(r, e) {
  return e = e || [], r == null || typeof r == "boolean" || (ue(r) ? r.some(function(t) {
    st(t, e);
  }) : e.push(r)), e;
}
function it(r, e, t, s, n, i) {
  var o, l, u;
  if (e.__d !== void 0)
    o = e.__d, e.__d = void 0;
  else if (t == null || n != i || n.parentNode == null)
    e:
      if (i == null || i.parentNode !== r)
        r.appendChild(n), o = null;
      else {
        for (l = i, u = 0; (l = l.nextSibling) && u < s.length; u += 1)
          if (l == n)
            break e;
        r.insertBefore(n, i), o = i;
      }
  return o !== void 0 ? o : n.nextSibling;
}
function nt(r) {
  var e, t, s;
  if (r.type == null || typeof r.type == "string")
    return r.__e;
  if (r.__k) {
    for (e = r.__k.length - 1; e >= 0; e--)
      if ((t = r.__k[e]) && (s = nt(t)))
        return s;
  }
  return null;
}
function Vr(r, e, t, s, n) {
  var i;
  for (i in t)
    i === "children" || i === "key" || i in e || de(r, i, null, t[i], s);
  for (i in e)
    n && typeof e[i] != "function" || i === "children" || i === "key" || i === "value" || i === "checked" || t[i] === e[i] || de(r, i, e[i], t[i], s);
}
function ke(r, e, t) {
  e[0] === "-" ? r.setProperty(e, t ?? "") : r[e] = t == null ? "" : typeof t != "number" || Hr.test(e) ? t : t + "px";
}
function de(r, e, t, s, n) {
  var i;
  e:
    if (e === "style")
      if (typeof t == "string")
        r.style.cssText = t;
      else {
        if (typeof s == "string" && (r.style.cssText = s = ""), s)
          for (e in s)
            t && e in t || ke(r.style, e, "");
        if (t)
          for (e in t)
            s && t[e] === s[e] || ke(r.style, e, t[e]);
      }
    else if (e[0] === "o" && e[1] === "n")
      i = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in r ? e.toLowerCase().slice(2) : e.slice(2), r.l || (r.l = {}), r.l[e + i] = t, t ? s || r.addEventListener(e, i ? Ne : Ce, i) : r.removeEventListener(e, i ? Ne : Ce, i);
    else if (e !== "dangerouslySetInnerHTML") {
      if (n)
        e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (e !== "width" && e !== "height" && e !== "href" && e !== "list" && e !== "form" && e !== "tabIndex" && e !== "download" && e !== "rowSpan" && e !== "colSpan" && e in r)
        try {
          r[e] = t ?? "";
          break e;
        } catch {
        }
      typeof t == "function" || (t == null || t === !1 && e[4] !== "-" ? r.removeAttribute(e) : r.setAttribute(e, t));
    }
}
function Ce(r) {
  return this.l[r.type + !1](v.event ? v.event(r) : r);
}
function Ne(r) {
  return this.l[r.type + !0](v.event ? v.event(r) : r);
}
function Fe(r, e, t, s, n, i, o, l, u) {
  var d, a, p, g, c, f, E, m, y, F, W, N, G, _, x, w = e.type;
  if (e.constructor !== void 0)
    return null;
  t.__h != null && (u = t.__h, l = e.__e = t.__e, e.__h = null, i = [l]), (d = v.__b) && d(e);
  try {
    e:
      if (typeof w == "function") {
        if (m = e.props, y = (d = w.contextType) && s[d.__c], F = d ? y ? y.props.value : d.__ : s, t.__c ? E = (a = e.__c = t.__c).__ = a.__E : ("prototype" in w && w.prototype.render ? e.__c = a = new w(m, F) : (e.__c = a = new Q(m, F), a.constructor = w, a.render = Kr), y && y.sub(a), a.props = m, a.state || (a.state = {}), a.context = F, a.__n = s, p = a.__d = !0, a.__h = [], a._sb = []), a.__s == null && (a.__s = a.state), w.getDerivedStateFromProps != null && (a.__s == a.state && (a.__s = M({}, a.__s)), M(a.__s, w.getDerivedStateFromProps(m, a.__s))), g = a.props, c = a.state, a.__v = e, p)
          w.getDerivedStateFromProps == null && a.componentWillMount != null && a.componentWillMount(), a.componentDidMount != null && a.__h.push(a.componentDidMount);
        else {
          if (w.getDerivedStateFromProps == null && m !== g && a.componentWillReceiveProps != null && a.componentWillReceiveProps(m, F), !a.__e && a.shouldComponentUpdate != null && a.shouldComponentUpdate(m, a.__s, F) === !1 || e.__v === t.__v) {
            for (e.__v !== t.__v && (a.props = m, a.state = a.__s, a.__d = !1), a.__e = !1, e.__e = t.__e, e.__k = t.__k, e.__k.forEach(function(R) {
              R && (R.__ = e);
            }), W = 0; W < a._sb.length; W++)
              a.__h.push(a._sb[W]);
            a._sb = [], a.__h.length && o.push(a);
            break e;
          }
          a.componentWillUpdate != null && a.componentWillUpdate(m, a.__s, F), a.componentDidUpdate != null && a.__h.push(function() {
            a.componentDidUpdate(g, c, f);
          });
        }
        if (a.context = F, a.props = m, a.__P = r, N = v.__r, G = 0, "prototype" in w && w.prototype.render) {
          for (a.state = a.__s, a.__d = !1, N && N(e), d = a.render(a.props, a.state, a.context), _ = 0; _ < a._sb.length; _++)
            a.__h.push(a._sb[_]);
          a._sb = [];
        } else
          do
            a.__d = !1, N && N(e), d = a.render(a.props, a.state, a.context), a.state = a.__s;
          while (a.__d && ++G < 25);
        a.state = a.__s, a.getChildContext != null && (s = M(M({}, s), a.getChildContext())), p || a.getSnapshotBeforeUpdate == null || (f = a.getSnapshotBeforeUpdate(g, c)), tt(r, ue(x = d != null && d.type === se && d.key == null ? d.props.children : d) ? x : [x], e, t, s, n, i, o, l, u), a.base = e.__e, e.__h = null, a.__h.length && o.push(a), E && (a.__E = a.__ = null), a.__e = !1;
      } else
        i == null && e.__v === t.__v ? (e.__k = t.__k, e.__e = t.__e) : e.__e = Xr(t.__e, e, t, s, n, i, o, u);
    (d = v.diffed) && d(e);
  } catch (R) {
    e.__v = null, (u || i != null) && (e.__e = l, e.__h = !!u, i[i.indexOf(l)] = null), v.__e(R, e, t);
  }
}
function ot(r, e) {
  v.__c && v.__c(e, r), r.some(function(t) {
    try {
      r = t.__h, t.__h = [], r.some(function(s) {
        s.call(t);
      });
    } catch (s) {
      v.__e(s, t.__v);
    }
  });
}
function Xr(r, e, t, s, n, i, o, l) {
  var u, d, a, p = t.props, g = e.props, c = e.type, f = 0;
  if (c === "svg" && (n = !0), i != null) {
    for (; f < i.length; f++)
      if ((u = i[f]) && "setAttribute" in u == !!c && (c ? u.localName === c : u.nodeType === 3)) {
        r = u, i[f] = null;
        break;
      }
  }
  if (r == null) {
    if (c === null)
      return document.createTextNode(g);
    r = n ? document.createElementNS("http://www.w3.org/2000/svg", c) : document.createElement(c, g.is && g), i = null, l = !1;
  }
  if (c === null)
    p === g || l && r.data === g || (r.data = g);
  else {
    if (i = i && re.call(r.childNodes), d = (p = t.props || ae).dangerouslySetInnerHTML, a = g.dangerouslySetInnerHTML, !l) {
      if (i != null)
        for (p = {}, f = 0; f < r.attributes.length; f++)
          p[r.attributes[f].name] = r.attributes[f].value;
      (a || d) && (a && (d && a.__html == d.__html || a.__html === r.innerHTML) || (r.innerHTML = a && a.__html || ""));
    }
    if (Vr(r, g, p, n, l), a)
      e.__k = [];
    else if (tt(r, ue(f = e.props.children) ? f : [f], e, t, s, n && c !== "foreignObject", i, o, i ? i[0] : t.__k && te(t, 0), l), i != null)
      for (f = i.length; f--; )
        i[f] != null && Qe(i[f]);
    l || ("value" in g && (f = g.value) !== void 0 && (f !== r.value || c === "progress" && !f || c === "option" && f !== p.value) && de(r, "value", f, p.value, !1), "checked" in g && (f = g.checked) !== void 0 && f !== r.checked && de(r, "checked", f, p.checked, !1));
  }
  return r;
}
function at(r, e, t) {
  try {
    typeof r == "function" ? r(e) : r.current = e;
  } catch (s) {
    v.__e(s, t);
  }
}
function lt(r, e, t) {
  var s, n;
  if (v.unmount && v.unmount(r), (s = r.ref) && (s.current && s.current !== r.__e || at(s, null, e)), (s = r.__c) != null) {
    if (s.componentWillUnmount)
      try {
        s.componentWillUnmount();
      } catch (i) {
        v.__e(i, e);
      }
    s.base = s.__P = null, r.__c = void 0;
  }
  if (s = r.__k)
    for (n = 0; n < s.length; n++)
      s[n] && lt(s[n], e, t || typeof r.type != "function");
  t || r.__e == null || Qe(r.__e), r.__ = r.__e = r.__d = void 0;
}
function Kr(r, e, t) {
  return this.constructor(r, t);
}
function dt(r, e, t) {
  var s, n, i;
  v.__ && v.__(r, e), n = (s = typeof t == "function") ? null : t && t.__k || e.__k, i = [], Fe(e, r = (!s && t || e).__k = be(se, null, [r]), n || ae, ae, e.ownerSVGElement !== void 0, !s && t ? [t] : n ? null : e.firstChild ? re.call(e.childNodes) : null, i, !s && t ? t : n ? n.__e : e.firstChild, s), ot(i, r);
}
function ut(r, e) {
  dt(r, e, ut);
}
function Jr(r, e, t) {
  var s, n, i, o, l = M({}, r.props);
  for (i in r.type && r.type.defaultProps && (o = r.type.defaultProps), e)
    i == "key" ? s = e[i] : i == "ref" ? n = e[i] : l[i] = e[i] === void 0 && o !== void 0 ? o[i] : e[i];
  return arguments.length > 2 && (l.children = arguments.length > 3 ? re.call(arguments, 2) : t), D(r.type, l, s || r.key, n || r.ref, null);
}
function Zr(r, e) {
  var t = { __c: e = "__cC" + Ze++, __: r, Consumer: function(s, n) {
    return s.children(n);
  }, Provider: function(s) {
    var n, i;
    return this.getChildContext || (n = [], (i = {})[e] = this, this.getChildContext = function() {
      return i;
    }, this.shouldComponentUpdate = function(o) {
      this.props.value !== o.value && n.some(function(l) {
        l.__e = !0, we(l);
      });
    }, this.sub = function(o) {
      n.push(o);
      var l = o.componentWillUnmount;
      o.componentWillUnmount = function() {
        n.splice(n.indexOf(o), 1), l && l.call(o);
      };
    }), s.children;
  } };
  return t.Provider.__ = t.Consumer.contextType = t;
}
re = De.slice, v = { __e: function(r, e, t, s) {
  for (var n, i, o; e = e.__; )
    if ((n = e.__c) && !n.__)
      try {
        if ((i = n.constructor) && i.getDerivedStateFromError != null && (n.setState(i.getDerivedStateFromError(r)), o = n.__d), n.componentDidCatch != null && (n.componentDidCatch(r, s || {}), o = n.__d), o)
          return n.__E = n;
      } catch (l) {
        r = l;
      }
  throw r;
} }, Xe = 0, Ke = function(r) {
  return r != null && r.constructor === void 0;
}, Q.prototype.setState = function(r, e) {
  var t;
  t = this.__s != null && this.__s !== this.state ? this.__s : this.__s = M({}, this.state), typeof r == "function" && (r = r(M({}, t), this.props)), r && M(t, r), r != null && this.__v && (e && this._sb.push(e), we(this));
}, Q.prototype.forceUpdate = function(r) {
  this.__v && (this.__e = !0, r && this.__h.push(r), we(this));
}, Q.prototype.render = se, B = [], Je = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ye = function(r, e) {
  return r.__v.__b - e.__v.__b;
}, le.__r = 0, Ze = 0;
const Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component: Q,
  Fragment: se,
  cloneElement: Jr,
  createContext: Zr,
  createElement: be,
  createRef: Yr,
  h: be,
  hydrate: ut,
  get isValidElement() {
    return Ke;
  },
  get options() {
    return v;
  },
  render: dt,
  toChildArray: st
}, Symbol.toStringTag, { value: "Module" })), Qr = /* @__PURE__ */ ct(Dr);
function es(r) {
  return (r == null ? void 0 : r.nodeType) === Node.ELEMENT_NODE;
}
var ts = es;
const rs = ts;
function ss(r, e) {
  return e === void 0 && (e = document), typeof r == "string" ? e.querySelector(r) : rs(r) ? r : null;
}
var is = ss;
function ns(r) {
  for (var e; r && !r.dir; )
    r = r.parentNode;
  return (e = r) == null ? void 0 : e.dir;
}
var os = ns;
const as = Ie;
let ls = class {
  constructor(e, t) {
    t === void 0 && (t = {}), this.uppy = e, this.opts = t;
  }
  getPluginState() {
    const {
      plugins: e
    } = this.uppy.getState();
    return e[this.id] || {};
  }
  setPluginState(e) {
    const {
      plugins: t
    } = this.uppy.getState();
    this.uppy.setState({
      plugins: {
        ...t,
        [this.id]: {
          ...t[this.id],
          ...e
        }
      }
    });
  }
  setOptions(e) {
    this.opts = {
      ...this.opts,
      ...e
    }, this.setPluginState(), this.i18nInit();
  }
  i18nInit() {
    const e = new as([this.defaultLocale, this.uppy.locale, this.opts.locale]);
    this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.setPluginState();
  }
  /**
   * Extendable methods
   * ==================
   * These methods are here to serve as an overview of the extendable methods as well as
   * making them not conditional in use, such as `if (this.afterUpdate)`.
   */
  // eslint-disable-next-line class-methods-use-this
  addTarget() {
    throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
  }
  // eslint-disable-next-line class-methods-use-this
  install() {
  }
  // eslint-disable-next-line class-methods-use-this
  uninstall() {
  }
  /**
   * Called when plugin is mounted, whether in DOM or into another plugin.
   * Needed because sometimes plugins are mounted separately/after `install`,
   * so this.el and this.parent might not be available in `install`.
   * This is the case with @uppy/react plugins, for example.
   */
  render() {
    throw new Error("Extend the render method to add your plugin to a DOM element");
  }
  // TODO: remove in the next major version. It's not feasible to
  // try to use plugins with other frameworks.
  // eslint-disable-next-line class-methods-use-this
  update() {
  }
  // Called after every state update, after everything's mounted. Debounced.
  // eslint-disable-next-line class-methods-use-this
  afterUpdate() {
  }
};
var Se = ls, Re = Qr;
function Le(r, e) {
  if (!Object.prototype.hasOwnProperty.call(r, e))
    throw new TypeError("attempted to use private field on non-instance");
  return r;
}
var ds = 0;
function us(r) {
  return "__private_" + ds++ + "_" + r;
}
const cs = is, ps = os, hs = Se;
function fs(r) {
  let e = null, t = null;
  return function() {
    for (var s = arguments.length, n = new Array(s), i = 0; i < s; i++)
      n[i] = arguments[i];
    return t = n, e || (e = Promise.resolve().then(() => (e = null, r(...t)))), e;
  };
}
var Z = /* @__PURE__ */ us("updateUI");
class Pe extends hs {
  constructor() {
    super(...arguments), Object.defineProperty(this, Z, {
      writable: !0,
      value: void 0
    });
  }
  /**
   * Check if supplied `target` is a DOM element or an `object`.
   * If it’s an object — target is a plugin, and we search `plugins`
   * for a plugin with same name and return its target.
   */
  mount(e, t) {
    const s = t.id, n = cs(e);
    if (n) {
      this.isTargetDOMEl = !0;
      const l = document.createElement("div");
      return l.classList.add("uppy-Root"), Le(this, Z)[Z] = fs((u) => {
        this.uppy.getPlugin(this.id) && ((0, Re.render)(this.render(u), l), this.afterUpdate());
      }), this.uppy.log(`Installing ${s} to a DOM element '${e}'`), this.opts.replaceTargetContent && (n.innerHTML = ""), (0, Re.render)(this.render(this.uppy.getState()), l), this.el = l, n.appendChild(l), l.dir = this.opts.direction || ps(l) || "ltr", this.onMount(), this.el;
    }
    let i;
    if (typeof e == "object" && e instanceof Pe)
      i = e;
    else if (typeof e == "function") {
      const l = e;
      this.uppy.iteratePlugins((u) => {
        u instanceof l && (i = u);
      });
    }
    if (i)
      return this.uppy.log(`Installing ${s} to ${i.id}`), this.parent = i, this.el = i.addTarget(t), this.onMount(), this.el;
    this.uppy.log(`Not installing ${s}`);
    let o = `Invalid target option given to ${s}.`;
    throw typeof e == "function" ? o += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly." : o += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.", new Error(o);
  }
  update(e) {
    if (this.el != null) {
      var t, s;
      (t = (s = Le(this, Z))[Z]) == null || t.call(s, e);
    }
  }
  unmount() {
    if (this.isTargetDOMEl) {
      var e;
      (e = this.el) == null || e.remove();
    }
    this.onUnmount();
  }
  // eslint-disable-next-line class-methods-use-this
  onMount() {
  }
  // eslint-disable-next-line class-methods-use-this
  onUnmount() {
  }
}
var ze = Pe;
(function(r, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.Uppy = e.UIPlugin = e.BasePlugin = void 0, Object.defineProperty(e, "debugLogger", {
    enumerable: !0,
    get: function() {
      return t.debugLogger;
    }
  });
  var t = q;
  r.exports = je;
  const s = ze;
  e.UIPlugin = s;
  const n = Se;
  e.BasePlugin = n;
  const i = je;
  e.Uppy = i;
  const o = ze, l = Se;
  i.Uppy = i, i.UIPlugin = o, i.BasePlugin = l, i.debugLogger = t.debugLogger;
})(ve, ve.exports);
var gs = ve.exports;
const ms = (r, e, t) => {
  const s = [], n = () => {
    const o = s[0];
    o && o();
  }, i = (o) => {
    s.push(function() {
      const l = e({
        ...t,
        // file blob as src
        src: o.data
      });
      l.on("hide", () => {
        s.shift(), n();
      }), l.on("processerror", console.log), l.on("process", ({ dest: u }) => {
        u && r.addFile({
          // clone file
          ...o,
          // overwrite file data
          data: u,
          // update metadata so we know this file was edited
          meta: {
            ...o.meta,
            didEdit: !0
          }
        });
      });
    }), s.length === 1 && n();
  };
  return {
    canEditFile(o) {
      return o.isRemote || !(o.data instanceof Blob) ? !1 : /^image/.test(o.type) && !/svg/.test(o.type);
    },
    didEditFile(o) {
      return !!o.meta.didEdit;
    },
    editFile(o) {
      i(o);
    },
    destroy() {
      s = [];
    }
  };
};
class ws extends gs.UIPlugin {
  constructor(e, t) {
    super(e), this.id = "PinturaEditor", this.type = "editor";
    const { factory: s, options: n = {} } = t;
    s && (delete n.src, this.factory = s, this.options = n, this.didAddFile = (i) => this.onAddFile(i));
  }
  onAddFile(e) {
    this.editor.canEditFile(e) && !this.editor.didEditFile(e) && (this.uppy.removeFile(e.id), this.editor.editFile(e));
  }
  install() {
    this.editor = ms(this.uppy, this.factory, this.options), this.uppy.on("file-added", this.didAddFile);
  }
  uninstall() {
    this.editor.destroy(), this.uppy.off("file-added", this.didAddFile);
  }
}
export {
  ws as default
};
