var ov = (l) => {
  throw TypeError(l);
};
var Jc = (l, i, o) => i.has(l) || ov("Cannot " + o);
var M = (l, i, o) => (Jc(l, i, "read from private field"), o ? o.call(l) : i.get(l)), pe = (l, i, o) => i.has(l) ? ov("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(l) : i.set(l, o), ne = (l, i, o, u) => (Jc(l, i, "write to private field"), u ? u.call(l, o) : i.set(l, o), o), De = (l, i, o) => (Jc(l, i, "access private method"), o);
var nu = (l, i, o, u) => ({
  set _(c) {
    ne(l, i, c, o);
  },
  get _() {
    return M(l, i, u);
  }
});
function WS(l, i) {
  for (var o = 0; o < i.length; o++) {
    const u = i[o];
    if (typeof u != "string" && !Array.isArray(u)) {
      for (const c in u)
        if (c !== "default" && !(c in l)) {
          const f = Object.getOwnPropertyDescriptor(u, c);
          f && Object.defineProperty(l, c, f.get ? f : {
            enumerable: !0,
            get: () => u[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(l, Symbol.toStringTag, { value: "Module" }));
}
function fg(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var Fc = { exports: {} }, Er = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uv;
function $S() {
  if (uv) return Er;
  uv = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function o(u, c, f) {
    var h = null;
    if (f !== void 0 && (h = "" + f), c.key !== void 0 && (h = "" + c.key), "key" in c) {
      f = {};
      for (var m in c)
        m !== "key" && (f[m] = c[m]);
    } else f = c;
    return c = f.ref, {
      $$typeof: l,
      type: u,
      key: h,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  return Er.Fragment = i, Er.jsx = o, Er.jsxs = o, Er;
}
var Wc = { exports: {} }, xe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sv;
function IS() {
  if (sv) return xe;
  sv = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), x = Symbol.iterator;
  function T(A) {
    return A === null || typeof A != "object" ? null : (A = x && A[x] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var R = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, _ = Object.assign, S = {};
  function C(A, X, $) {
    this.props = A, this.context = X, this.refs = S, this.updater = $ || R;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(A, X) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, X, "setState");
  }, C.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function N() {
  }
  N.prototype = C.prototype;
  function z(A, X, $) {
    this.props = A, this.context = X, this.refs = S, this.updater = $ || R;
  }
  var H = z.prototype = new N();
  H.constructor = z, _(H, C.prototype), H.isPureReactComponent = !0;
  var k = Array.isArray, Q = { H: null, A: null, T: null, S: null, V: null }, W = Object.prototype.hasOwnProperty;
  function J(A, X, $, F, ee, be) {
    return $ = be.ref, {
      $$typeof: l,
      type: A,
      key: X,
      ref: $ !== void 0 ? $ : null,
      props: be
    };
  }
  function K(A, X) {
    return J(
      A.type,
      X,
      void 0,
      void 0,
      void 0,
      A.props
    );
  }
  function te(A) {
    return typeof A == "object" && A !== null && A.$$typeof === l;
  }
  function re(A) {
    var X = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function($) {
      return X[$];
    });
  }
  var ge = /\/+/g;
  function ce(A, X) {
    return typeof A == "object" && A !== null && A.key != null ? re("" + A.key) : X.toString(36);
  }
  function ye() {
  }
  function Se(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(ye, ye) : (A.status = "pending", A.then(
          function(X) {
            A.status === "pending" && (A.status = "fulfilled", A.value = X);
          },
          function(X) {
            A.status === "pending" && (A.status = "rejected", A.reason = X);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function ve(A, X, $, F, ee) {
    var be = typeof A;
    (be === "undefined" || be === "boolean") && (A = null);
    var se = !1;
    if (A === null) se = !0;
    else
      switch (be) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case l:
            case i:
              se = !0;
              break;
            case b:
              return se = A._init, ve(
                se(A._payload),
                X,
                $,
                F,
                ee
              );
          }
      }
    if (se)
      return ee = ee(A), se = F === "" ? "." + ce(A, 0) : F, k(ee) ? ($ = "", se != null && ($ = se.replace(ge, "$&/") + "/"), ve(ee, X, $, "", function(He) {
        return He;
      })) : ee != null && (te(ee) && (ee = K(
        ee,
        $ + (ee.key == null || A && A.key === ee.key ? "" : ("" + ee.key).replace(
          ge,
          "$&/"
        ) + "/") + se
      )), X.push(ee)), 1;
    se = 0;
    var I = F === "" ? "." : F + ":";
    if (k(A))
      for (var fe = 0; fe < A.length; fe++)
        F = A[fe], be = I + ce(F, fe), se += ve(
          F,
          X,
          $,
          be,
          ee
        );
    else if (fe = T(A), typeof fe == "function")
      for (A = fe.call(A), fe = 0; !(F = A.next()).done; )
        F = F.value, be = I + ce(F, fe++), se += ve(
          F,
          X,
          $,
          be,
          ee
        );
    else if (be === "object") {
      if (typeof A.then == "function")
        return ve(
          Se(A),
          X,
          $,
          F,
          ee
        );
      throw X = String(A), Error(
        "Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return se;
  }
  function j(A, X, $) {
    if (A == null) return A;
    var F = [], ee = 0;
    return ve(A, F, "", "", function(be) {
      return X.call($, be, ee++);
    }), F;
  }
  function P(A) {
    if (A._status === -1) {
      var X = A._result;
      X = X(), X.then(
        function($) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = $);
        },
        function($) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = $);
        }
      ), A._status === -1 && (A._status = 0, A._result = X);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var G = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var X = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(X)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  };
  function ue() {
  }
  return xe.Children = {
    map: j,
    forEach: function(A, X, $) {
      j(
        A,
        function() {
          X.apply(this, arguments);
        },
        $
      );
    },
    count: function(A) {
      var X = 0;
      return j(A, function() {
        X++;
      }), X;
    },
    toArray: function(A) {
      return j(A, function(X) {
        return X;
      }) || [];
    },
    only: function(A) {
      if (!te(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  }, xe.Component = C, xe.Fragment = o, xe.Profiler = c, xe.PureComponent = z, xe.StrictMode = u, xe.Suspense = p, xe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, xe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return Q.H.useMemoCache(A);
    }
  }, xe.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, xe.cloneElement = function(A, X, $) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var F = _({}, A.props), ee = A.key, be = void 0;
    if (X != null)
      for (se in X.ref !== void 0 && (be = void 0), X.key !== void 0 && (ee = "" + X.key), X)
        !W.call(X, se) || se === "key" || se === "__self" || se === "__source" || se === "ref" && X.ref === void 0 || (F[se] = X[se]);
    var se = arguments.length - 2;
    if (se === 1) F.children = $;
    else if (1 < se) {
      for (var I = Array(se), fe = 0; fe < se; fe++)
        I[fe] = arguments[fe + 2];
      F.children = I;
    }
    return J(A.type, ee, void 0, void 0, be, F);
  }, xe.createContext = function(A) {
    return A = {
      $$typeof: h,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: f,
      _context: A
    }, A;
  }, xe.createElement = function(A, X, $) {
    var F, ee = {}, be = null;
    if (X != null)
      for (F in X.key !== void 0 && (be = "" + X.key), X)
        W.call(X, F) && F !== "key" && F !== "__self" && F !== "__source" && (ee[F] = X[F]);
    var se = arguments.length - 2;
    if (se === 1) ee.children = $;
    else if (1 < se) {
      for (var I = Array(se), fe = 0; fe < se; fe++)
        I[fe] = arguments[fe + 2];
      ee.children = I;
    }
    if (A && A.defaultProps)
      for (F in se = A.defaultProps, se)
        ee[F] === void 0 && (ee[F] = se[F]);
    return J(A, be, void 0, void 0, null, ee);
  }, xe.createRef = function() {
    return { current: null };
  }, xe.forwardRef = function(A) {
    return { $$typeof: m, render: A };
  }, xe.isValidElement = te, xe.lazy = function(A) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: A },
      _init: P
    };
  }, xe.memo = function(A, X) {
    return {
      $$typeof: v,
      type: A,
      compare: X === void 0 ? null : X
    };
  }, xe.startTransition = function(A) {
    var X = Q.T, $ = {};
    Q.T = $;
    try {
      var F = A(), ee = Q.S;
      ee !== null && ee($, F), typeof F == "object" && F !== null && typeof F.then == "function" && F.then(ue, G);
    } catch (be) {
      G(be);
    } finally {
      Q.T = X;
    }
  }, xe.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, xe.use = function(A) {
    return Q.H.use(A);
  }, xe.useActionState = function(A, X, $) {
    return Q.H.useActionState(A, X, $);
  }, xe.useCallback = function(A, X) {
    return Q.H.useCallback(A, X);
  }, xe.useContext = function(A) {
    return Q.H.useContext(A);
  }, xe.useDebugValue = function() {
  }, xe.useDeferredValue = function(A, X) {
    return Q.H.useDeferredValue(A, X);
  }, xe.useEffect = function(A, X, $) {
    var F = Q.H;
    if (typeof $ == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return F.useEffect(A, X);
  }, xe.useId = function() {
    return Q.H.useId();
  }, xe.useImperativeHandle = function(A, X, $) {
    return Q.H.useImperativeHandle(A, X, $);
  }, xe.useInsertionEffect = function(A, X) {
    return Q.H.useInsertionEffect(A, X);
  }, xe.useLayoutEffect = function(A, X) {
    return Q.H.useLayoutEffect(A, X);
  }, xe.useMemo = function(A, X) {
    return Q.H.useMemo(A, X);
  }, xe.useOptimistic = function(A, X) {
    return Q.H.useOptimistic(A, X);
  }, xe.useReducer = function(A, X, $) {
    return Q.H.useReducer(A, X, $);
  }, xe.useRef = function(A) {
    return Q.H.useRef(A);
  }, xe.useState = function(A) {
    return Q.H.useState(A);
  }, xe.useSyncExternalStore = function(A, X, $) {
    return Q.H.useSyncExternalStore(
      A,
      X,
      $
    );
  }, xe.useTransition = function() {
    return Q.H.useTransition();
  }, xe.version = "19.1.0", xe;
}
var cv;
function Zf() {
  return cv || (cv = 1, Wc.exports = IS()), Wc.exports;
}
var fv;
function ex() {
  return fv || (fv = 1, Fc.exports = $S()), Fc.exports;
}
var w = ex(), y = Zf();
const ml = /* @__PURE__ */ fg(y), dg = /* @__PURE__ */ WS({
  __proto__: null,
  default: ml
}, [y]);
var $c = { exports: {} }, wr = {}, Ic = { exports: {} }, ef = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dv;
function tx() {
  return dv || (dv = 1, function(l) {
    function i(j, P) {
      var G = j.length;
      j.push(P);
      e: for (; 0 < G; ) {
        var ue = G - 1 >>> 1, A = j[ue];
        if (0 < c(A, P))
          j[ue] = P, j[G] = A, G = ue;
        else break e;
      }
    }
    function o(j) {
      return j.length === 0 ? null : j[0];
    }
    function u(j) {
      if (j.length === 0) return null;
      var P = j[0], G = j.pop();
      if (G !== P) {
        j[0] = G;
        e: for (var ue = 0, A = j.length, X = A >>> 1; ue < X; ) {
          var $ = 2 * (ue + 1) - 1, F = j[$], ee = $ + 1, be = j[ee];
          if (0 > c(F, G))
            ee < A && 0 > c(be, F) ? (j[ue] = be, j[ee] = G, ue = ee) : (j[ue] = F, j[$] = G, ue = $);
          else if (ee < A && 0 > c(be, G))
            j[ue] = be, j[ee] = G, ue = ee;
          else break e;
        }
      }
      return P;
    }
    function c(j, P) {
      var G = j.sortIndex - P.sortIndex;
      return G !== 0 ? G : j.id - P.id;
    }
    if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      l.unstable_now = function() {
        return f.now();
      };
    } else {
      var h = Date, m = h.now();
      l.unstable_now = function() {
        return h.now() - m;
      };
    }
    var p = [], v = [], b = 1, x = null, T = 3, R = !1, _ = !1, S = !1, C = !1, N = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, H = typeof setImmediate < "u" ? setImmediate : null;
    function k(j) {
      for (var P = o(v); P !== null; ) {
        if (P.callback === null) u(v);
        else if (P.startTime <= j)
          u(v), P.sortIndex = P.expirationTime, i(p, P);
        else break;
        P = o(v);
      }
    }
    function Q(j) {
      if (S = !1, k(j), !_)
        if (o(p) !== null)
          _ = !0, W || (W = !0, ce());
        else {
          var P = o(v);
          P !== null && ve(Q, P.startTime - j);
        }
    }
    var W = !1, J = -1, K = 5, te = -1;
    function re() {
      return C ? !0 : !(l.unstable_now() - te < K);
    }
    function ge() {
      if (C = !1, W) {
        var j = l.unstable_now();
        te = j;
        var P = !0;
        try {
          e: {
            _ = !1, S && (S = !1, z(J), J = -1), R = !0;
            var G = T;
            try {
              t: {
                for (k(j), x = o(p); x !== null && !(x.expirationTime > j && re()); ) {
                  var ue = x.callback;
                  if (typeof ue == "function") {
                    x.callback = null, T = x.priorityLevel;
                    var A = ue(
                      x.expirationTime <= j
                    );
                    if (j = l.unstable_now(), typeof A == "function") {
                      x.callback = A, k(j), P = !0;
                      break t;
                    }
                    x === o(p) && u(p), k(j);
                  } else u(p);
                  x = o(p);
                }
                if (x !== null) P = !0;
                else {
                  var X = o(v);
                  X !== null && ve(
                    Q,
                    X.startTime - j
                  ), P = !1;
                }
              }
              break e;
            } finally {
              x = null, T = G, R = !1;
            }
            P = void 0;
          }
        } finally {
          P ? ce() : W = !1;
        }
      }
    }
    var ce;
    if (typeof H == "function")
      ce = function() {
        H(ge);
      };
    else if (typeof MessageChannel < "u") {
      var ye = new MessageChannel(), Se = ye.port2;
      ye.port1.onmessage = ge, ce = function() {
        Se.postMessage(null);
      };
    } else
      ce = function() {
        N(ge, 0);
      };
    function ve(j, P) {
      J = N(function() {
        j(l.unstable_now());
      }, P);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, l.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : K = 0 < j ? Math.floor(1e3 / j) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return T;
    }, l.unstable_next = function(j) {
      switch (T) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = T;
      }
      var G = T;
      T = P;
      try {
        return j();
      } finally {
        T = G;
      }
    }, l.unstable_requestPaint = function() {
      C = !0;
    }, l.unstable_runWithPriority = function(j, P) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var G = T;
      T = j;
      try {
        return P();
      } finally {
        T = G;
      }
    }, l.unstable_scheduleCallback = function(j, P, G) {
      var ue = l.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? ue + G : ue) : G = ue, j) {
        case 1:
          var A = -1;
          break;
        case 2:
          A = 250;
          break;
        case 5:
          A = 1073741823;
          break;
        case 4:
          A = 1e4;
          break;
        default:
          A = 5e3;
      }
      return A = G + A, j = {
        id: b++,
        callback: P,
        priorityLevel: j,
        startTime: G,
        expirationTime: A,
        sortIndex: -1
      }, G > ue ? (j.sortIndex = G, i(v, j), o(p) === null && j === o(v) && (S ? (z(J), J = -1) : S = !0, ve(Q, G - ue))) : (j.sortIndex = A, i(p, j), _ || R || (_ = !0, W || (W = !0, ce()))), j;
    }, l.unstable_shouldYield = re, l.unstable_wrapCallback = function(j) {
      var P = T;
      return function() {
        var G = T;
        T = P;
        try {
          return j.apply(this, arguments);
        } finally {
          T = G;
        }
      };
    };
  }(ef)), ef;
}
var hv;
function nx() {
  return hv || (hv = 1, Ic.exports = tx()), Ic.exports;
}
var tf = { exports: {} }, yt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mv;
function lx() {
  if (mv) return yt;
  mv = 1;
  var l = Zf();
  function i(p) {
    var v = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        v += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + p + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var u = {
    d: {
      f: o,
      r: function() {
        throw Error(i(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, c = Symbol.for("react.portal");
  function f(p, v, b) {
    var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: x == null ? null : "" + x,
      children: p,
      containerInfo: v,
      implementation: b
    };
  }
  var h = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, v) {
    if (p === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, yt.createPortal = function(p, v) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(i(299));
    return f(p, v, null, b);
  }, yt.flushSync = function(p) {
    var v = h.T, b = u.p;
    try {
      if (h.T = null, u.p = 2, p) return p();
    } finally {
      h.T = v, u.p = b, u.d.f();
    }
  }, yt.preconnect = function(p, v) {
    typeof p == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, u.d.C(p, v));
  }, yt.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, yt.preinit = function(p, v) {
    if (typeof p == "string" && v && typeof v.as == "string") {
      var b = v.as, x = m(b, v.crossOrigin), T = typeof v.integrity == "string" ? v.integrity : void 0, R = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      b === "style" ? u.d.S(
        p,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: x,
          integrity: T,
          fetchPriority: R
        }
      ) : b === "script" && u.d.X(p, {
        crossOrigin: x,
        integrity: T,
        fetchPriority: R,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, yt.preinitModule = function(p, v) {
    if (typeof p == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var b = m(
            v.as,
            v.crossOrigin
          );
          u.d.M(p, {
            crossOrigin: b,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && u.d.M(p);
  }, yt.preload = function(p, v) {
    if (typeof p == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var b = v.as, x = m(b, v.crossOrigin);
      u.d.L(p, b, {
        crossOrigin: x,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, yt.preloadModule = function(p, v) {
    if (typeof p == "string")
      if (v) {
        var b = m(v.as, v.crossOrigin);
        u.d.m(p, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: b,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else u.d.m(p);
  }, yt.requestFormReset = function(p) {
    u.d.r(p);
  }, yt.unstable_batchedUpdates = function(p, v) {
    return p(v);
  }, yt.useFormState = function(p, v, b) {
    return h.H.useFormState(p, v, b);
  }, yt.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, yt.version = "19.1.0", yt;
}
var pv;
function hg() {
  if (pv) return tf.exports;
  pv = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), tf.exports = lx(), tf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vv;
function ax() {
  if (vv) return wr;
  vv = 1;
  var l = nx(), i = Zf(), o = hg();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function f(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (f(e) !== e)
      throw Error(u(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (t = f(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var r = n.return;
      if (r === null) break;
      var s = r.alternate;
      if (s === null) {
        if (a = r.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (r.child === s.child) {
        for (s = r.child; s; ) {
          if (s === n) return m(r), e;
          if (s === a) return m(r), t;
          s = s.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== a.return) n = r, a = s;
      else {
        for (var d = !1, g = r.child; g; ) {
          if (g === n) {
            d = !0, n = r, a = s;
            break;
          }
          if (g === a) {
            d = !0, a = r, n = s;
            break;
          }
          g = g.sibling;
        }
        if (!d) {
          for (g = s.child; g; ) {
            if (g === n) {
              d = !0, n = s, a = r;
              break;
            }
            if (g === a) {
              d = !0, a = s, n = r;
              break;
            }
            g = g.sibling;
          }
          if (!d) throw Error(u(189));
        }
      }
      if (n.alternate !== a) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = v(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign, x = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), N = Symbol.for("react.provider"), z = Symbol.for("react.consumer"), H = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), te = Symbol.for("react.activity"), re = Symbol.for("react.memo_cache_sentinel"), ge = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != "object" ? null : (e = ge && e[ge] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ye = Symbol.for("react.client.reference");
  function Se(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ye ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case _:
        return "Fragment";
      case C:
        return "Profiler";
      case S:
        return "StrictMode";
      case Q:
        return "Suspense";
      case W:
        return "SuspenseList";
      case te:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case R:
          return "Portal";
        case H:
          return (e.displayName || "Context") + ".Provider";
        case z:
          return (e._context.displayName || "Context") + ".Consumer";
        case k:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case J:
          return t = e.displayName || null, t !== null ? t : Se(e.type) || "Memo";
        case K:
          t = e._payload, e = e._init;
          try {
            return Se(e(t));
          } catch {
          }
      }
    return null;
  }
  var ve = Array.isArray, j = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ue = [], A = -1;
  function X(e) {
    return { current: e };
  }
  function $(e) {
    0 > A || (e.current = ue[A], ue[A] = null, A--);
  }
  function F(e, t) {
    A++, ue[A] = e.current, e.current = t;
  }
  var ee = X(null), be = X(null), se = X(null), I = X(null);
  function fe(e, t) {
    switch (F(se, t), F(be, e), F(ee, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Up(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Up(t), e = Hp(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    $(ee), F(ee, e);
  }
  function He() {
    $(ee), $(be), $(se);
  }
  function Me(e) {
    e.memoizedState !== null && F(I, e);
    var t = ee.current, n = Hp(t, e.type);
    t !== n && (F(be, e), F(ee, n));
  }
  function Ae(e) {
    be.current === e && ($(ee), $(be)), I.current === e && ($(I), gr._currentValue = G);
  }
  var Re = Object.prototype.hasOwnProperty, ct = l.unstable_scheduleCallback, Tt = l.unstable_cancelCallback, Dl = l.unstable_shouldYield, _l = l.unstable_requestPaint, pt = l.unstable_now, Lu = l.unstable_getCurrentPriorityLevel, Nl = l.unstable_ImmediatePriority, vd = l.unstable_UserBlockingPriority, Qr = l.unstable_NormalPriority, Nb = l.unstable_LowPriority, gd = l.unstable_IdlePriority, zb = l.log, jb = l.unstable_setDisableYieldValue, Ai = null, Nt = null;
  function kn(e) {
    if (typeof zb == "function" && jb(e), Nt && typeof Nt.setStrictMode == "function")
      try {
        Nt.setStrictMode(Ai, e);
      } catch {
      }
  }
  var zt = Math.clz32 ? Math.clz32 : Lb, Ub = Math.log, Hb = Math.LN2;
  function Lb(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ub(e) / Hb | 0) | 0;
  }
  var Yr = 256, kr = 4194304;
  function zl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Vr(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var r = 0, s = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var g = a & 134217727;
    return g !== 0 ? (a = g & ~s, a !== 0 ? r = zl(a) : (d &= g, d !== 0 ? r = zl(d) : n || (n = g & ~e, n !== 0 && (r = zl(n))))) : (g = a & ~s, g !== 0 ? r = zl(g) : d !== 0 ? r = zl(d) : n || (n = a & ~e, n !== 0 && (r = zl(n)))), r === 0 ? 0 : t !== 0 && t !== r && (t & s) === 0 && (s = r & -r, n = t & -t, s >= n || s === 32 && (n & 4194048) !== 0) ? t : r;
  }
  function Ri(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Bb(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function yd() {
    var e = Yr;
    return Yr <<= 1, (Yr & 4194048) === 0 && (Yr = 256), e;
  }
  function bd() {
    var e = kr;
    return kr <<= 1, (kr & 62914560) === 0 && (kr = 4194304), e;
  }
  function Bu(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Ci(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function qb(e, t, n, a, r, s) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var g = e.entanglements, E = e.expirationTimes, L = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var Y = 31 - zt(n), Z = 1 << Y;
      g[Y] = 0, E[Y] = -1;
      var B = L[Y];
      if (B !== null)
        for (L[Y] = null, Y = 0; Y < B.length; Y++) {
          var q = B[Y];
          q !== null && (q.lane &= -536870913);
        }
      n &= ~Z;
    }
    a !== 0 && Sd(e, a, 0), s !== 0 && r === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(d & ~t));
  }
  function Sd(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - zt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | n & 4194090;
  }
  function xd(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var a = 31 - zt(n), r = 1 << a;
      r & t | e[a] & t && (e[a] |= t), n &= ~r;
    }
  }
  function qu(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Gu(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ed() {
    var e = P.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : tv(e.type));
  }
  function Gb(e, t) {
    var n = P.p;
    try {
      return P.p = e, t();
    } finally {
      P.p = n;
    }
  }
  var Vn = Math.random().toString(36).slice(2), vt = "__reactFiber$" + Vn, At = "__reactProps$" + Vn, ma = "__reactContainer$" + Vn, Qu = "__reactEvents$" + Vn, Qb = "__reactListeners$" + Vn, Yb = "__reactHandles$" + Vn, wd = "__reactResources$" + Vn, Oi = "__reactMarker$" + Vn;
  function Yu(e) {
    delete e[vt], delete e[At], delete e[Qu], delete e[Qb], delete e[Yb];
  }
  function pa(e) {
    var t = e[vt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[ma] || n[vt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Gp(e); e !== null; ) {
            if (n = e[vt]) return n;
            e = Gp(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function va(e) {
    if (e = e[vt] || e[ma]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Mi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function ga(e) {
    var t = e[wd];
    return t || (t = e[wd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function rt(e) {
    e[Oi] = !0;
  }
  var Td = /* @__PURE__ */ new Set(), Ad = {};
  function jl(e, t) {
    ya(e, t), ya(e + "Capture", t);
  }
  function ya(e, t) {
    for (Ad[e] = t, e = 0; e < t.length; e++)
      Td.add(t[e]);
  }
  var kb = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Rd = {}, Cd = {};
  function Vb(e) {
    return Re.call(Cd, e) ? !0 : Re.call(Rd, e) ? !1 : kb.test(e) ? Cd[e] = !0 : (Rd[e] = !0, !1);
  }
  function Xr(e, t, n) {
    if (Vb(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Zr(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function wn(e, t, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + a);
    }
  }
  var ku, Od;
  function ba(e) {
    if (ku === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ku = t && t[1] || "", Od = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ku + e + Od;
  }
  var Vu = !1;
  function Xu(e, t) {
    if (!e || Vu) return "";
    Vu = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var Z = function() {
                throw Error();
              };
              if (Object.defineProperty(Z.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Z, []);
                } catch (q) {
                  var B = q;
                }
                Reflect.construct(e, [], Z);
              } else {
                try {
                  Z.call();
                } catch (q) {
                  B = q;
                }
                e.call(Z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                B = q;
              }
              (Z = e()) && typeof Z.catch == "function" && Z.catch(function() {
              });
            }
          } catch (q) {
            if (q && B && typeof q.stack == "string")
              return [q.stack, B.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      r && r.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var s = a.DetermineComponentFrameRoot(), d = s[0], g = s[1];
      if (d && g) {
        var E = d.split(`
`), L = g.split(`
`);
        for (r = a = 0; a < E.length && !E[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; r < L.length && !L[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (a === E.length || r === L.length)
          for (a = E.length - 1, r = L.length - 1; 1 <= a && 0 <= r && E[a] !== L[r]; )
            r--;
        for (; 1 <= a && 0 <= r; a--, r--)
          if (E[a] !== L[r]) {
            if (a !== 1 || r !== 1)
              do
                if (a--, r--, 0 > r || E[a] !== L[r]) {
                  var Y = `
` + E[a].replace(" at new ", " at ");
                  return e.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", e.displayName)), Y;
                }
              while (1 <= a && 0 <= r);
            break;
          }
      }
    } finally {
      Vu = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? ba(n) : "";
  }
  function Xb(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ba(e.type);
      case 16:
        return ba("Lazy");
      case 13:
        return ba("Suspense");
      case 19:
        return ba("SuspenseList");
      case 0:
      case 15:
        return Xu(e.type, !1);
      case 11:
        return Xu(e.type.render, !1);
      case 1:
        return Xu(e.type, !0);
      case 31:
        return ba("Activity");
      default:
        return "";
    }
  }
  function Md(e) {
    try {
      var t = "";
      do
        t += Xb(e), e = e.return;
      while (e);
      return t;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  function kt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Dd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Zb(e) {
    var t = Dd(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    ), a = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var r = n.get, s = n.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(d) {
          a = "" + d, s.call(this, d);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(d) {
          a = "" + d;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Kr(e) {
    e._valueTracker || (e._valueTracker = Zb(e));
  }
  function _d(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), a = "";
    return e && (a = Dd(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Pr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Kb = /[\n"\\]/g;
  function Vt(e) {
    return e.replace(
      Kb,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Zu(e, t, n, a, r, s, d, g) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + kt(t)) : e.value !== "" + kt(t) && (e.value = "" + kt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Ku(e, d, kt(t)) : n != null ? Ku(e, d, kt(n)) : a != null && e.removeAttribute("value"), r == null && s != null && (e.defaultChecked = !!s), r != null && (e.checked = r && typeof r != "function" && typeof r != "symbol"), g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.name = "" + kt(g) : e.removeAttribute("name");
  }
  function Nd(e, t, n, a, r, s, d, g) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || n != null) {
      if (!(s !== "submit" && s !== "reset" || t != null))
        return;
      n = n != null ? "" + kt(n) : "", t = t != null ? "" + kt(t) : n, g || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? r, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = g ? e.checked : !!a, e.defaultChecked = !!a, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d);
  }
  function Ku(e, t, n) {
    t === "number" && Pr(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Sa(e, t, n, a) {
    if (e = e.options, t) {
      t = {};
      for (var r = 0; r < n.length; r++)
        t["$" + n[r]] = !0;
      for (n = 0; n < e.length; n++)
        r = t.hasOwnProperty("$" + e[n].value), e[n].selected !== r && (e[n].selected = r), r && a && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + kt(n), t = null, r = 0; r < e.length; r++) {
        if (e[r].value === n) {
          e[r].selected = !0, a && (e[r].defaultSelected = !0);
          return;
        }
        t !== null || e[r].disabled || (t = e[r]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function zd(e, t, n) {
    if (t != null && (t = "" + kt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + kt(n) : "";
  }
  function jd(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(u(92));
        if (ve(a)) {
          if (1 < a.length) throw Error(u(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), t = n;
    }
    n = kt(t), e.defaultValue = n, a = e.textContent, a === n && a !== "" && a !== null && (e.value = a);
  }
  function xa(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Pb = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ud(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Pb.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Hd(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var r in t)
        a = t[r], t.hasOwnProperty(r) && n[r] !== a && Ud(e, r, a);
    } else
      for (var s in t)
        t.hasOwnProperty(s) && Ud(e, s, t[s]);
  }
  function Pu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jb = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Fb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Jr(e) {
    return Fb.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  var Ju = null;
  function Fu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ea = null, wa = null;
  function Ld(e) {
    var t = va(e);
    if (t && (e = t.stateNode)) {
      var n = e[At] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Zu(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + Vt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var r = a[At] || null;
                if (!r) throw Error(u(90));
                Zu(
                  a,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              a = n[t], a.form === e.form && _d(a);
          }
          break e;
        case "textarea":
          zd(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Sa(e, !!n.multiple, t, !1);
      }
    }
  }
  var Wu = !1;
  function Bd(e, t, n) {
    if (Wu) return e(t, n);
    Wu = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (Wu = !1, (Ea !== null || wa !== null) && (Uo(), Ea && (t = Ea, e = wa, wa = Ea = null, Ld(t), e)))
        for (t = 0; t < e.length; t++) Ld(e[t]);
    }
  }
  function Di(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[At] || null;
    if (a === null) return null;
    n = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        u(231, t, typeof n)
      );
    return n;
  }
  var Tn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $u = !1;
  if (Tn)
    try {
      var _i = {};
      Object.defineProperty(_i, "passive", {
        get: function() {
          $u = !0;
        }
      }), window.addEventListener("test", _i, _i), window.removeEventListener("test", _i, _i);
    } catch {
      $u = !1;
    }
  var Xn = null, Iu = null, Fr = null;
  function qd() {
    if (Fr) return Fr;
    var e, t = Iu, n = t.length, a, r = "value" in Xn ? Xn.value : Xn.textContent, s = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++) ;
    var d = n - e;
    for (a = 1; a <= d && t[n - a] === r[s - a]; a++) ;
    return Fr = r.slice(e, 1 < a ? 1 - a : void 0);
  }
  function Wr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function $r() {
    return !0;
  }
  function Gd() {
    return !1;
  }
  function Rt(e) {
    function t(n, a, r, s, d) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = s, this.target = d, this.currentTarget = null;
      for (var g in e)
        e.hasOwnProperty(g) && (n = e[g], this[g] = n ? n(s) : s[g]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? $r : Gd, this.isPropagationStopped = Gd, this;
    }
    return b(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = $r);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = $r);
      },
      persist: function() {
      },
      isPersistent: $r
    }), t;
  }
  var Ul = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ir = Rt(Ul), Ni = b({}, Ul, { view: 0, detail: 0 }), Wb = Rt(Ni), es, ts, zi, eo = b({}, Ni, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ls,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== zi && (zi && e.type === "mousemove" ? (es = e.screenX - zi.screenX, ts = e.screenY - zi.screenY) : ts = es = 0, zi = e), es);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ts;
    }
  }), Qd = Rt(eo), $b = b({}, eo, { dataTransfer: 0 }), Ib = Rt($b), e0 = b({}, Ni, { relatedTarget: 0 }), ns = Rt(e0), t0 = b({}, Ul, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), n0 = Rt(t0), l0 = b({}, Ul, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), a0 = Rt(l0), i0 = b({}, Ul, { data: 0 }), Yd = Rt(i0), r0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, o0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, u0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function s0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = u0[e]) ? !!t[e] : !1;
  }
  function ls() {
    return s0;
  }
  var c0 = b({}, Ni, {
    key: function(e) {
      if (e.key) {
        var t = r0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Wr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? o0[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ls,
    charCode: function(e) {
      return e.type === "keypress" ? Wr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Wr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), f0 = Rt(c0), d0 = b({}, eo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), kd = Rt(d0), h0 = b({}, Ni, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ls
  }), m0 = Rt(h0), p0 = b({}, Ul, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), v0 = Rt(p0), g0 = b({}, eo, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), y0 = Rt(g0), b0 = b({}, Ul, {
    newState: 0,
    oldState: 0
  }), S0 = Rt(b0), x0 = [9, 13, 27, 32], as = Tn && "CompositionEvent" in window, ji = null;
  Tn && "documentMode" in document && (ji = document.documentMode);
  var E0 = Tn && "TextEvent" in window && !ji, Vd = Tn && (!as || ji && 8 < ji && 11 >= ji), Xd = " ", Zd = !1;
  function Kd(e, t) {
    switch (e) {
      case "keyup":
        return x0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Pd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ta = !1;
  function w0(e, t) {
    switch (e) {
      case "compositionend":
        return Pd(t);
      case "keypress":
        return t.which !== 32 ? null : (Zd = !0, Xd);
      case "textInput":
        return e = t.data, e === Xd && Zd ? null : e;
      default:
        return null;
    }
  }
  function T0(e, t) {
    if (Ta)
      return e === "compositionend" || !as && Kd(e, t) ? (e = qd(), Fr = Iu = Xn = null, Ta = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Vd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var A0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Jd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!A0[e.type] : t === "textarea";
  }
  function Fd(e, t, n, a) {
    Ea ? wa ? wa.push(a) : wa = [a] : Ea = a, t = Qo(t, "onChange"), 0 < t.length && (n = new Ir(
      "onChange",
      "change",
      null,
      n,
      a
    ), e.push({ event: n, listeners: t }));
  }
  var Ui = null, Hi = null;
  function R0(e) {
    Dp(e, 0);
  }
  function to(e) {
    var t = Mi(e);
    if (_d(t)) return e;
  }
  function Wd(e, t) {
    if (e === "change") return t;
  }
  var $d = !1;
  if (Tn) {
    var is;
    if (Tn) {
      var rs = "oninput" in document;
      if (!rs) {
        var Id = document.createElement("div");
        Id.setAttribute("oninput", "return;"), rs = typeof Id.oninput == "function";
      }
      is = rs;
    } else is = !1;
    $d = is && (!document.documentMode || 9 < document.documentMode);
  }
  function eh() {
    Ui && (Ui.detachEvent("onpropertychange", th), Hi = Ui = null);
  }
  function th(e) {
    if (e.propertyName === "value" && to(Hi)) {
      var t = [];
      Fd(
        t,
        Hi,
        e,
        Fu(e)
      ), Bd(R0, t);
    }
  }
  function C0(e, t, n) {
    e === "focusin" ? (eh(), Ui = t, Hi = n, Ui.attachEvent("onpropertychange", th)) : e === "focusout" && eh();
  }
  function O0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return to(Hi);
  }
  function M0(e, t) {
    if (e === "click") return to(t);
  }
  function D0(e, t) {
    if (e === "input" || e === "change")
      return to(t);
  }
  function _0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var jt = typeof Object.is == "function" ? Object.is : _0;
  function Li(e, t) {
    if (jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var r = n[a];
      if (!Re.call(t, r) || !jt(e[r], t[r]))
        return !1;
    }
    return !0;
  }
  function nh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function lh(e, t) {
    var n = nh(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (a = e + n.textContent.length, e <= t && a >= t)
          return { node: n, offset: t - e };
        e = a;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = nh(n);
    }
  }
  function ah(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ah(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ih(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Pr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Pr(e.document);
    }
    return t;
  }
  function os(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var N0 = Tn && "documentMode" in document && 11 >= document.documentMode, Aa = null, us = null, Bi = null, ss = !1;
  function rh(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ss || Aa == null || Aa !== Pr(a) || (a = Aa, "selectionStart" in a && os(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Bi && Li(Bi, a) || (Bi = a, a = Qo(us, "onSelect"), 0 < a.length && (t = new Ir(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: a }), t.target = Aa)));
  }
  function Hl(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Ra = {
    animationend: Hl("Animation", "AnimationEnd"),
    animationiteration: Hl("Animation", "AnimationIteration"),
    animationstart: Hl("Animation", "AnimationStart"),
    transitionrun: Hl("Transition", "TransitionRun"),
    transitionstart: Hl("Transition", "TransitionStart"),
    transitioncancel: Hl("Transition", "TransitionCancel"),
    transitionend: Hl("Transition", "TransitionEnd")
  }, cs = {}, oh = {};
  Tn && (oh = document.createElement("div").style, "AnimationEvent" in window || (delete Ra.animationend.animation, delete Ra.animationiteration.animation, delete Ra.animationstart.animation), "TransitionEvent" in window || delete Ra.transitionend.transition);
  function Ll(e) {
    if (cs[e]) return cs[e];
    if (!Ra[e]) return e;
    var t = Ra[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in oh)
        return cs[e] = t[n];
    return e;
  }
  var uh = Ll("animationend"), sh = Ll("animationiteration"), ch = Ll("animationstart"), z0 = Ll("transitionrun"), j0 = Ll("transitionstart"), U0 = Ll("transitioncancel"), fh = Ll("transitionend"), dh = /* @__PURE__ */ new Map(), fs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  fs.push("scrollEnd");
  function It(e, t) {
    dh.set(e, t), jl(t, [e]);
  }
  var hh = /* @__PURE__ */ new WeakMap();
  function Xt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = hh.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: Md(t)
      }, hh.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Md(t)
    };
  }
  var Zt = [], Ca = 0, ds = 0;
  function no() {
    for (var e = Ca, t = ds = Ca = 0; t < e; ) {
      var n = Zt[t];
      Zt[t++] = null;
      var a = Zt[t];
      Zt[t++] = null;
      var r = Zt[t];
      Zt[t++] = null;
      var s = Zt[t];
      if (Zt[t++] = null, a !== null && r !== null) {
        var d = a.pending;
        d === null ? r.next = r : (r.next = d.next, d.next = r), a.pending = r;
      }
      s !== 0 && mh(n, r, s);
    }
  }
  function lo(e, t, n, a) {
    Zt[Ca++] = e, Zt[Ca++] = t, Zt[Ca++] = n, Zt[Ca++] = a, ds |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function hs(e, t, n, a) {
    return lo(e, t, n, a), ao(e);
  }
  function Oa(e, t) {
    return lo(e, null, null, t), ao(e);
  }
  function mh(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var r = !1, s = e.return; s !== null; )
      s.childLanes |= n, a = s.alternate, a !== null && (a.childLanes |= n), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (r = !0)), e = s, s = s.return;
    return e.tag === 3 ? (s = e.stateNode, r && t !== null && (r = 31 - zt(n), e = s.hiddenUpdates, a = e[r], a === null ? e[r] = [t] : a.push(t), t.lane = n | 536870912), s) : null;
  }
  function ao(e) {
    if (50 < sr)
      throw sr = 0, bc = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ma = {};
  function H0(e, t, n, a) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ut(e, t, n, a) {
    return new H0(e, t, n, a);
  }
  function ms(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function An(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ut(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function ph(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function io(e, t, n, a, r, s) {
    var d = 0;
    if (a = e, typeof e == "function") ms(e) && (d = 1);
    else if (typeof e == "string")
      d = BS(
        e,
        n,
        ee.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case te:
          return e = Ut(31, n, t, r), e.elementType = te, e.lanes = s, e;
        case _:
          return Bl(n.children, r, s, t);
        case S:
          d = 8, r |= 24;
          break;
        case C:
          return e = Ut(12, n, t, r | 2), e.elementType = C, e.lanes = s, e;
        case Q:
          return e = Ut(13, n, t, r), e.elementType = Q, e.lanes = s, e;
        case W:
          return e = Ut(19, n, t, r), e.elementType = W, e.lanes = s, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case N:
              case H:
                d = 10;
                break e;
              case z:
                d = 9;
                break e;
              case k:
                d = 11;
                break e;
              case J:
                d = 14;
                break e;
              case K:
                d = 16, a = null;
                break e;
            }
          d = 29, n = Error(
            u(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = Ut(d, n, t, r), t.elementType = e, t.type = a, t.lanes = s, t;
  }
  function Bl(e, t, n, a) {
    return e = Ut(7, e, a, t), e.lanes = n, e;
  }
  function ps(e, t, n) {
    return e = Ut(6, e, null, t), e.lanes = n, e;
  }
  function vs(e, t, n) {
    return t = Ut(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Da = [], _a = 0, ro = null, oo = 0, Kt = [], Pt = 0, ql = null, Rn = 1, Cn = "";
  function Gl(e, t) {
    Da[_a++] = oo, Da[_a++] = ro, ro = e, oo = t;
  }
  function vh(e, t, n) {
    Kt[Pt++] = Rn, Kt[Pt++] = Cn, Kt[Pt++] = ql, ql = e;
    var a = Rn;
    e = Cn;
    var r = 32 - zt(a) - 1;
    a &= ~(1 << r), n += 1;
    var s = 32 - zt(t) + r;
    if (30 < s) {
      var d = r - r % 5;
      s = (a & (1 << d) - 1).toString(32), a >>= d, r -= d, Rn = 1 << 32 - zt(t) + r | n << r | a, Cn = s + e;
    } else
      Rn = 1 << s | n << r | a, Cn = e;
  }
  function gs(e) {
    e.return !== null && (Gl(e, 1), vh(e, 1, 0));
  }
  function ys(e) {
    for (; e === ro; )
      ro = Da[--_a], Da[_a] = null, oo = Da[--_a], Da[_a] = null;
    for (; e === ql; )
      ql = Kt[--Pt], Kt[Pt] = null, Cn = Kt[--Pt], Kt[Pt] = null, Rn = Kt[--Pt], Kt[Pt] = null;
  }
  var xt = null, Je = null, je = !1, Ql = null, cn = !1, bs = Error(u(519));
  function Yl(e) {
    var t = Error(u(418, ""));
    throw Qi(Xt(t, e)), bs;
  }
  function gh(e) {
    var t = e.stateNode, n = e.type, a = e.memoizedProps;
    switch (t[vt] = e, t[At] = a, n) {
      case "dialog":
        Oe("cancel", t), Oe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Oe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < fr.length; n++)
          Oe(fr[n], t);
        break;
      case "source":
        Oe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Oe("error", t), Oe("load", t);
        break;
      case "details":
        Oe("toggle", t);
        break;
      case "input":
        Oe("invalid", t), Nd(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        ), Kr(t);
        break;
      case "select":
        Oe("invalid", t);
        break;
      case "textarea":
        Oe("invalid", t), jd(t, a.value, a.defaultValue, a.children), Kr(t);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || a.suppressHydrationWarning === !0 || jp(t.textContent, n) ? (a.popover != null && (Oe("beforetoggle", t), Oe("toggle", t)), a.onScroll != null && Oe("scroll", t), a.onScrollEnd != null && Oe("scrollend", t), a.onClick != null && (t.onclick = Yo), t = !0) : t = !1, t || Yl(e);
  }
  function yh(e) {
    for (xt = e.return; xt; )
      switch (xt.tag) {
        case 5:
        case 13:
          cn = !1;
          return;
        case 27:
        case 3:
          cn = !0;
          return;
        default:
          xt = xt.return;
      }
  }
  function qi(e) {
    if (e !== xt) return !1;
    if (!je) return yh(e), je = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Uc(e.type, e.memoizedProps)), n = !n), n && Je && Yl(e), yh(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (n = e.data, n === "/$") {
              if (t === 0) {
                Je = tn(e.nextSibling);
                break e;
              }
              t--;
            } else
              n !== "$" && n !== "$!" && n !== "$?" || t++;
          e = e.nextSibling;
        }
        Je = null;
      }
    } else
      t === 27 ? (t = Je, ol(e.type) ? (e = qc, qc = null, Je = e) : Je = t) : Je = xt ? tn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Gi() {
    Je = xt = null, je = !1;
  }
  function bh() {
    var e = Ql;
    return e !== null && (Mt === null ? Mt = e : Mt.push.apply(
      Mt,
      e
    ), Ql = null), e;
  }
  function Qi(e) {
    Ql === null ? Ql = [e] : Ql.push(e);
  }
  var Ss = X(null), kl = null, On = null;
  function Zn(e, t, n) {
    F(Ss, t._currentValue), t._currentValue = n;
  }
  function Mn(e) {
    e._currentValue = Ss.current, $(Ss);
  }
  function xs(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Es(e, t, n, a) {
    var r = e.child;
    for (r !== null && (r.return = e); r !== null; ) {
      var s = r.dependencies;
      if (s !== null) {
        var d = r.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var g = s;
          s = r;
          for (var E = 0; E < t.length; E++)
            if (g.context === t[E]) {
              s.lanes |= n, g = s.alternate, g !== null && (g.lanes |= n), xs(
                s.return,
                n,
                e
              ), a || (d = null);
              break e;
            }
          s = g.next;
        }
      } else if (r.tag === 18) {
        if (d = r.return, d === null) throw Error(u(341));
        d.lanes |= n, s = d.alternate, s !== null && (s.lanes |= n), xs(d, n, e), d = null;
      } else d = r.child;
      if (d !== null) d.return = r;
      else
        for (d = r; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (r = d.sibling, r !== null) {
            r.return = d.return, d = r;
            break;
          }
          d = d.return;
        }
      r = d;
    }
  }
  function Yi(e, t, n, a) {
    e = null;
    for (var r = t, s = !1; r !== null; ) {
      if (!s) {
        if ((r.flags & 524288) !== 0) s = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var d = r.alternate;
        if (d === null) throw Error(u(387));
        if (d = d.memoizedProps, d !== null) {
          var g = r.type;
          jt(r.pendingProps.value, d.value) || (e !== null ? e.push(g) : e = [g]);
        }
      } else if (r === I.current) {
        if (d = r.alternate, d === null) throw Error(u(387));
        d.memoizedState.memoizedState !== r.memoizedState.memoizedState && (e !== null ? e.push(gr) : e = [gr]);
      }
      r = r.return;
    }
    e !== null && Es(
      t,
      e,
      n,
      a
    ), t.flags |= 262144;
  }
  function uo(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!jt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Vl(e) {
    kl = e, On = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function gt(e) {
    return Sh(kl, e);
  }
  function so(e, t) {
    return kl === null && Vl(e), Sh(e, t);
  }
  function Sh(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, On === null) {
      if (e === null) throw Error(u(308));
      On = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else On = On.next = t;
    return n;
  }
  var L0 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, B0 = l.unstable_scheduleCallback, q0 = l.unstable_NormalPriority, lt = {
    $$typeof: H,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ws() {
    return {
      controller: new L0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ki(e) {
    e.refCount--, e.refCount === 0 && B0(q0, function() {
      e.controller.abort();
    });
  }
  var Vi = null, Ts = 0, Na = 0, za = null;
  function G0(e, t) {
    if (Vi === null) {
      var n = Vi = [];
      Ts = 0, Na = Rc(), za = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return Ts++, t.then(xh, xh), t;
  }
  function xh() {
    if (--Ts === 0 && Vi !== null) {
      za !== null && (za.status = "fulfilled");
      var e = Vi;
      Vi = null, Na = 0, za = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Q0(e, t) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(r) {
        n.push(r);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var r = 0; r < n.length; r++) (0, n[r])(t);
      },
      function(r) {
        for (a.status = "rejected", a.reason = r, r = 0; r < n.length; r++)
          (0, n[r])(void 0);
      }
    ), a;
  }
  var Eh = j.S;
  j.S = function(e, t) {
    typeof t == "object" && t !== null && typeof t.then == "function" && G0(e, t), Eh !== null && Eh(e, t);
  };
  var Xl = X(null);
  function As() {
    var e = Xl.current;
    return e !== null ? e : Xe.pooledCache;
  }
  function co(e, t) {
    t === null ? F(Xl, Xl.current) : F(Xl, t.pool);
  }
  function wh() {
    var e = As();
    return e === null ? null : { parent: lt._currentValue, pool: e };
  }
  var Xi = Error(u(460)), Th = Error(u(474)), fo = Error(u(542)), Rs = { then: function() {
  } };
  function Ah(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function ho() {
  }
  function Rh(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(ho, ho), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Oh(e), e;
      default:
        if (typeof t.status == "string") t.then(ho, ho);
        else {
          if (e = Xe, e !== null && 100 < e.shellSuspendCounter)
            throw Error(u(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var r = t;
                r.status = "fulfilled", r.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var r = t;
                r.status = "rejected", r.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Oh(e), e;
        }
        throw Zi = t, Xi;
    }
  }
  var Zi = null;
  function Ch() {
    if (Zi === null) throw Error(u(459));
    var e = Zi;
    return Zi = null, e;
  }
  function Oh(e) {
    if (e === Xi || e === fo)
      throw Error(u(483));
  }
  var Kn = !1;
  function Cs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Os(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Pn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Jn(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Be & 2) !== 0) {
      var r = a.pending;
      return r === null ? t.next = t : (t.next = r.next, r.next = t), a.pending = t, t = ao(e), mh(e, null, n), t;
    }
    return lo(e, a, t, n), ao(e);
  }
  function Ki(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, xd(e, n);
    }
  }
  function Ms(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var r = null, s = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          s === null ? r = s = d : s = s.next = d, n = n.next;
        } while (n !== null);
        s === null ? r = s = t : s = s.next = t;
      } else r = s = t;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: s,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Ds = !1;
  function Pi() {
    if (Ds) {
      var e = za;
      if (e !== null) throw e;
    }
  }
  function Ji(e, t, n, a) {
    Ds = !1;
    var r = e.updateQueue;
    Kn = !1;
    var s = r.firstBaseUpdate, d = r.lastBaseUpdate, g = r.shared.pending;
    if (g !== null) {
      r.shared.pending = null;
      var E = g, L = E.next;
      E.next = null, d === null ? s = L : d.next = L, d = E;
      var Y = e.alternate;
      Y !== null && (Y = Y.updateQueue, g = Y.lastBaseUpdate, g !== d && (g === null ? Y.firstBaseUpdate = L : g.next = L, Y.lastBaseUpdate = E));
    }
    if (s !== null) {
      var Z = r.baseState;
      d = 0, Y = L = E = null, g = s;
      do {
        var B = g.lane & -536870913, q = B !== g.lane;
        if (q ? (Ne & B) === B : (a & B) === B) {
          B !== 0 && B === Na && (Ds = !0), Y !== null && (Y = Y.next = {
            lane: 0,
            tag: g.tag,
            payload: g.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, de = g;
            B = t;
            var Ye = n;
            switch (de.tag) {
              case 1:
                if (me = de.payload, typeof me == "function") {
                  Z = me.call(Ye, Z, B);
                  break e;
                }
                Z = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = de.payload, B = typeof me == "function" ? me.call(Ye, Z, B) : me, B == null) break e;
                Z = b({}, Z, B);
                break e;
              case 2:
                Kn = !0;
            }
          }
          B = g.callback, B !== null && (e.flags |= 64, q && (e.flags |= 8192), q = r.callbacks, q === null ? r.callbacks = [B] : q.push(B));
        } else
          q = {
            lane: B,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null
          }, Y === null ? (L = Y = q, E = Z) : Y = Y.next = q, d |= B;
        if (g = g.next, g === null) {
          if (g = r.shared.pending, g === null)
            break;
          q = g, g = q.next, q.next = null, r.lastBaseUpdate = q, r.shared.pending = null;
        }
      } while (!0);
      Y === null && (E = Z), r.baseState = E, r.firstBaseUpdate = L, r.lastBaseUpdate = Y, s === null && (r.shared.lanes = 0), ll |= d, e.lanes = d, e.memoizedState = Z;
    }
  }
  function Mh(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function Dh(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Mh(n[e], t);
  }
  var ja = X(null), mo = X(0);
  function _h(e, t) {
    e = Hn, F(mo, e), F(ja, t), Hn = e | t.baseLanes;
  }
  function _s() {
    F(mo, Hn), F(ja, ja.current);
  }
  function Ns() {
    Hn = mo.current, $(ja), $(mo);
  }
  var Fn = 0, Ee = null, Ge = null, tt = null, po = !1, Ua = !1, Zl = !1, vo = 0, Fi = 0, Ha = null, Y0 = 0;
  function $e() {
    throw Error(u(321));
  }
  function zs(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!jt(e[n], t[n])) return !1;
    return !0;
  }
  function js(e, t, n, a, r, s) {
    return Fn = s, Ee = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e === null || e.memoizedState === null ? mm : pm, Zl = !1, s = n(a, r), Zl = !1, Ua && (s = zh(
      t,
      n,
      a,
      r
    )), Nh(e), s;
  }
  function Nh(e) {
    j.H = Eo;
    var t = Ge !== null && Ge.next !== null;
    if (Fn = 0, tt = Ge = Ee = null, po = !1, Fi = 0, Ha = null, t) throw Error(u(300));
    e === null || ot || (e = e.dependencies, e !== null && uo(e) && (ot = !0));
  }
  function zh(e, t, n, a) {
    Ee = e;
    var r = 0;
    do {
      if (Ua && (Ha = null), Fi = 0, Ua = !1, 25 <= r) throw Error(u(301));
      if (r += 1, tt = Ge = null, e.updateQueue != null) {
        var s = e.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      j.H = J0, s = t(n, a);
    } while (Ua);
    return s;
  }
  function k0() {
    var e = j.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Wi(t) : t, e = e.useState()[0], (Ge !== null ? Ge.memoizedState : null) !== e && (Ee.flags |= 1024), t;
  }
  function Us() {
    var e = vo !== 0;
    return vo = 0, e;
  }
  function Hs(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Ls(e) {
    if (po) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      po = !1;
    }
    Fn = 0, tt = Ge = Ee = null, Ua = !1, Fi = vo = 0, Ha = null;
  }
  function Ct() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return tt === null ? Ee.memoizedState = tt = e : tt = tt.next = e, tt;
  }
  function nt() {
    if (Ge === null) {
      var e = Ee.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ge.next;
    var t = tt === null ? Ee.memoizedState : tt.next;
    if (t !== null)
      tt = t, Ge = e;
    else {
      if (e === null)
        throw Ee.alternate === null ? Error(u(467)) : Error(u(310));
      Ge = e, e = {
        memoizedState: Ge.memoizedState,
        baseState: Ge.baseState,
        baseQueue: Ge.baseQueue,
        queue: Ge.queue,
        next: null
      }, tt === null ? Ee.memoizedState = tt = e : tt = tt.next = e;
    }
    return tt;
  }
  function Bs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Wi(e) {
    var t = Fi;
    return Fi += 1, Ha === null && (Ha = []), e = Rh(Ha, e, t), t = Ee, (tt === null ? t.memoizedState : tt.next) === null && (t = t.alternate, j.H = t === null || t.memoizedState === null ? mm : pm), e;
  }
  function go(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Wi(e);
      if (e.$$typeof === H) return gt(e);
    }
    throw Error(u(438, String(e)));
  }
  function qs(e) {
    var t = null, n = Ee.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var a = Ee.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Bs(), Ee.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++)
        n[a] = re;
    return t.index++, n;
  }
  function Dn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function yo(e) {
    var t = nt();
    return Gs(t, Ge, e);
  }
  function Gs(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = n;
    var r = e.baseQueue, s = a.pending;
    if (s !== null) {
      if (r !== null) {
        var d = r.next;
        r.next = s.next, s.next = d;
      }
      t.baseQueue = r = s, a.pending = null;
    }
    if (s = e.baseState, r === null) e.memoizedState = s;
    else {
      t = r.next;
      var g = d = null, E = null, L = t, Y = !1;
      do {
        var Z = L.lane & -536870913;
        if (Z !== L.lane ? (Ne & Z) === Z : (Fn & Z) === Z) {
          var B = L.revertLane;
          if (B === 0)
            E !== null && (E = E.next = {
              lane: 0,
              revertLane: 0,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null
            }), Z === Na && (Y = !0);
          else if ((Fn & B) === B) {
            L = L.next, B === Na && (Y = !0);
            continue;
          } else
            Z = {
              lane: 0,
              revertLane: L.revertLane,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null
            }, E === null ? (g = E = Z, d = s) : E = E.next = Z, Ee.lanes |= B, ll |= B;
          Z = L.action, Zl && n(s, Z), s = L.hasEagerState ? L.eagerState : n(s, Z);
        } else
          B = {
            lane: Z,
            revertLane: L.revertLane,
            action: L.action,
            hasEagerState: L.hasEagerState,
            eagerState: L.eagerState,
            next: null
          }, E === null ? (g = E = B, d = s) : E = E.next = B, Ee.lanes |= Z, ll |= Z;
        L = L.next;
      } while (L !== null && L !== t);
      if (E === null ? d = s : E.next = g, !jt(s, e.memoizedState) && (ot = !0, Y && (n = za, n !== null)))
        throw n;
      e.memoizedState = s, e.baseState = d, e.baseQueue = E, a.lastRenderedState = s;
    }
    return r === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Qs(e) {
    var t = nt(), n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch, r = n.pending, s = t.memoizedState;
    if (r !== null) {
      n.pending = null;
      var d = r = r.next;
      do
        s = e(s, d.action), d = d.next;
      while (d !== r);
      jt(s, t.memoizedState) || (ot = !0), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), n.lastRenderedState = s;
    }
    return [s, a];
  }
  function jh(e, t, n) {
    var a = Ee, r = nt(), s = je;
    if (s) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var d = !jt(
      (Ge || r).memoizedState,
      n
    );
    d && (r.memoizedState = n, ot = !0), r = r.queue;
    var g = Lh.bind(null, a, r, e);
    if ($i(2048, 8, g, [e]), r.getSnapshot !== t || d || tt !== null && tt.memoizedState.tag & 1) {
      if (a.flags |= 2048, La(
        9,
        bo(),
        Hh.bind(
          null,
          a,
          r,
          n,
          t
        ),
        null
      ), Xe === null) throw Error(u(349));
      s || (Fn & 124) !== 0 || Uh(a, t, n);
    }
    return n;
  }
  function Uh(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ee.updateQueue, t === null ? (t = Bs(), Ee.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Hh(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Bh(t) && qh(e);
  }
  function Lh(e, t, n) {
    return n(function() {
      Bh(t) && qh(e);
    });
  }
  function Bh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !jt(e, n);
    } catch {
      return !0;
    }
  }
  function qh(e) {
    var t = Oa(e, 2);
    t !== null && Gt(t, e, 2);
  }
  function Ys(e) {
    var t = Ct();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Zl) {
        kn(!0);
        try {
          n();
        } finally {
          kn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Dn,
      lastRenderedState: e
    }, t;
  }
  function Gh(e, t, n, a) {
    return e.baseState = n, Gs(
      e,
      Ge,
      typeof a == "function" ? a : Dn
    );
  }
  function V0(e, t, n, a, r) {
    if (xo(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var s = {
        payload: r,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(d) {
          s.listeners.push(d);
        }
      };
      j.T !== null ? n(!0) : s.isTransition = !1, a(s), n = t.pending, n === null ? (s.next = t.pending = s, Qh(t, s)) : (s.next = n.next, t.pending = n.next = s);
    }
  }
  function Qh(e, t) {
    var n = t.action, a = t.payload, r = e.state;
    if (t.isTransition) {
      var s = j.T, d = {};
      j.T = d;
      try {
        var g = n(r, a), E = j.S;
        E !== null && E(d, g), Yh(e, t, g);
      } catch (L) {
        ks(e, t, L);
      } finally {
        j.T = s;
      }
    } else
      try {
        s = n(r, a), Yh(e, t, s);
      } catch (L) {
        ks(e, t, L);
      }
  }
  function Yh(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        kh(e, t, a);
      },
      function(a) {
        return ks(e, t, a);
      }
    ) : kh(e, t, n);
  }
  function kh(e, t, n) {
    t.status = "fulfilled", t.value = n, Vh(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Qh(e, n)));
  }
  function ks(e, t, n) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = n, Vh(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Vh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Xh(e, t) {
    return t;
  }
  function Zh(e, t) {
    if (je) {
      var n = Xe.formState;
      if (n !== null) {
        e: {
          var a = Ee;
          if (je) {
            if (Je) {
              t: {
                for (var r = Je, s = cn; r.nodeType !== 8; ) {
                  if (!s) {
                    r = null;
                    break t;
                  }
                  if (r = tn(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break t;
                  }
                }
                s = r.data, r = s === "F!" || s === "F" ? r : null;
              }
              if (r) {
                Je = tn(
                  r.nextSibling
                ), a = r.data === "F!";
                break e;
              }
            }
            Yl(a);
          }
          a = !1;
        }
        a && (t = n[0]);
      }
    }
    return n = Ct(), n.memoizedState = n.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xh,
      lastRenderedState: t
    }, n.queue = a, n = fm.bind(
      null,
      Ee,
      a
    ), a.dispatch = n, a = Ys(!1), s = Ps.bind(
      null,
      Ee,
      !1,
      a.queue
    ), a = Ct(), r = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = r, n = V0.bind(
      null,
      Ee,
      r,
      s,
      n
    ), r.dispatch = n, a.memoizedState = e, [t, n, !1];
  }
  function Kh(e) {
    var t = nt();
    return Ph(t, Ge, e);
  }
  function Ph(e, t, n) {
    if (t = Gs(
      e,
      t,
      Xh
    )[0], e = yo(Dn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Wi(t);
      } catch (d) {
        throw d === Xi ? fo : d;
      }
    else a = t;
    t = nt();
    var r = t.queue, s = r.dispatch;
    return n !== t.memoizedState && (Ee.flags |= 2048, La(
      9,
      bo(),
      X0.bind(null, r, n),
      null
    )), [a, s, e];
  }
  function X0(e, t) {
    e.action = t;
  }
  function Jh(e) {
    var t = nt(), n = Ge;
    if (n !== null)
      return Ph(t, n, e);
    nt(), t = t.memoizedState, n = nt();
    var a = n.queue.dispatch;
    return n.memoizedState = e, [t, a, !1];
  }
  function La(e, t, n, a) {
    return e = { tag: e, create: n, deps: a, inst: t, next: null }, t = Ee.updateQueue, t === null && (t = Bs(), Ee.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, t.lastEffect = e), e;
  }
  function bo() {
    return { destroy: void 0, resource: void 0 };
  }
  function Fh() {
    return nt().memoizedState;
  }
  function So(e, t, n, a) {
    var r = Ct();
    a = a === void 0 ? null : a, Ee.flags |= e, r.memoizedState = La(
      1 | t,
      bo(),
      n,
      a
    );
  }
  function $i(e, t, n, a) {
    var r = nt();
    a = a === void 0 ? null : a;
    var s = r.memoizedState.inst;
    Ge !== null && a !== null && zs(a, Ge.memoizedState.deps) ? r.memoizedState = La(t, s, n, a) : (Ee.flags |= e, r.memoizedState = La(
      1 | t,
      s,
      n,
      a
    ));
  }
  function Wh(e, t) {
    So(8390656, 8, e, t);
  }
  function $h(e, t) {
    $i(2048, 8, e, t);
  }
  function Ih(e, t) {
    return $i(4, 2, e, t);
  }
  function em(e, t) {
    return $i(4, 4, e, t);
  }
  function tm(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function nm(e, t, n) {
    n = n != null ? n.concat([e]) : null, $i(4, 4, tm.bind(null, t, e), n);
  }
  function Vs() {
  }
  function lm(e, t) {
    var n = nt();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && zs(t, a[1]) ? a[0] : (n.memoizedState = [e, t], e);
  }
  function am(e, t) {
    var n = nt();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && zs(t, a[1]))
      return a[0];
    if (a = e(), Zl) {
      kn(!0);
      try {
        e();
      } finally {
        kn(!1);
      }
    }
    return n.memoizedState = [a, t], a;
  }
  function Xs(e, t, n) {
    return n === void 0 || (Fn & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = n, e = op(), Ee.lanes |= e, ll |= e, n);
  }
  function im(e, t, n, a) {
    return jt(n, t) ? n : ja.current !== null ? (e = Xs(e, n, a), jt(e, t) || (ot = !0), e) : (Fn & 42) === 0 ? (ot = !0, e.memoizedState = n) : (e = op(), Ee.lanes |= e, ll |= e, t);
  }
  function rm(e, t, n, a, r) {
    var s = P.p;
    P.p = s !== 0 && 8 > s ? s : 8;
    var d = j.T, g = {};
    j.T = g, Ps(e, !1, t, n);
    try {
      var E = r(), L = j.S;
      if (L !== null && L(g, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var Y = Q0(
          E,
          a
        );
        Ii(
          e,
          t,
          Y,
          qt(e)
        );
      } else
        Ii(
          e,
          t,
          a,
          qt(e)
        );
    } catch (Z) {
      Ii(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Z },
        qt()
      );
    } finally {
      P.p = s, j.T = d;
    }
  }
  function Z0() {
  }
  function Zs(e, t, n, a) {
    if (e.tag !== 5) throw Error(u(476));
    var r = om(e).queue;
    rm(
      e,
      r,
      t,
      G,
      n === null ? Z0 : function() {
        return um(e), n(a);
      }
    );
  }
  function om(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: G,
      baseState: G,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dn,
        lastRenderedState: G
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function um(e) {
    var t = om(e).next.queue;
    Ii(e, t, {}, qt());
  }
  function Ks() {
    return gt(gr);
  }
  function sm() {
    return nt().memoizedState;
  }
  function cm() {
    return nt().memoizedState;
  }
  function K0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = qt();
          e = Pn(n);
          var a = Jn(t, e, n);
          a !== null && (Gt(a, t, n), Ki(a, t, n)), t = { cache: ws() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function P0(e, t, n) {
    var a = qt();
    n = {
      lane: a,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, xo(e) ? dm(t, n) : (n = hs(e, t, n, a), n !== null && (Gt(n, e, a), hm(n, t, a)));
  }
  function fm(e, t, n) {
    var a = qt();
    Ii(e, t, n, a);
  }
  function Ii(e, t, n, a) {
    var r = {
      lane: a,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (xo(e)) dm(t, r);
    else {
      var s = e.alternate;
      if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null))
        try {
          var d = t.lastRenderedState, g = s(d, n);
          if (r.hasEagerState = !0, r.eagerState = g, jt(g, d))
            return lo(e, t, r, 0), Xe === null && no(), !1;
        } catch {
        } finally {
        }
      if (n = hs(e, t, r, a), n !== null)
        return Gt(n, e, a), hm(n, t, a), !0;
    }
    return !1;
  }
  function Ps(e, t, n, a) {
    if (a = {
      lane: 2,
      revertLane: Rc(),
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, xo(e)) {
      if (t) throw Error(u(479));
    } else
      t = hs(
        e,
        n,
        a,
        2
      ), t !== null && Gt(t, e, 2);
  }
  function xo(e) {
    var t = e.alternate;
    return e === Ee || t !== null && t === Ee;
  }
  function dm(e, t) {
    Ua = po = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function hm(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, xd(e, n);
    }
  }
  var Eo = {
    readContext: gt,
    use: go,
    useCallback: $e,
    useContext: $e,
    useEffect: $e,
    useImperativeHandle: $e,
    useLayoutEffect: $e,
    useInsertionEffect: $e,
    useMemo: $e,
    useReducer: $e,
    useRef: $e,
    useState: $e,
    useDebugValue: $e,
    useDeferredValue: $e,
    useTransition: $e,
    useSyncExternalStore: $e,
    useId: $e,
    useHostTransitionStatus: $e,
    useFormState: $e,
    useActionState: $e,
    useOptimistic: $e,
    useMemoCache: $e,
    useCacheRefresh: $e
  }, mm = {
    readContext: gt,
    use: go,
    useCallback: function(e, t) {
      return Ct().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: gt,
    useEffect: Wh,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, So(
        4194308,
        4,
        tm.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return So(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      So(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = Ct();
      t = t === void 0 ? null : t;
      var a = e();
      if (Zl) {
        kn(!0);
        try {
          e();
        } finally {
          kn(!1);
        }
      }
      return n.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, n) {
      var a = Ct();
      if (n !== void 0) {
        var r = n(t);
        if (Zl) {
          kn(!0);
          try {
            n(t);
          } finally {
            kn(!1);
          }
        }
      } else r = t;
      return a.memoizedState = a.baseState = r, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: r
      }, a.queue = e, e = e.dispatch = P0.bind(
        null,
        Ee,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = Ct();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Ys(e);
      var t = e.queue, n = fm.bind(null, Ee, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Vs,
    useDeferredValue: function(e, t) {
      var n = Ct();
      return Xs(n, e, t);
    },
    useTransition: function() {
      var e = Ys(!1);
      return e = rm.bind(
        null,
        Ee,
        e.queue,
        !0,
        !1
      ), Ct().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var a = Ee, r = Ct();
      if (je) {
        if (n === void 0)
          throw Error(u(407));
        n = n();
      } else {
        if (n = t(), Xe === null)
          throw Error(u(349));
        (Ne & 124) !== 0 || Uh(a, t, n);
      }
      r.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return r.queue = s, Wh(Lh.bind(null, a, s, e), [
        e
      ]), a.flags |= 2048, La(
        9,
        bo(),
        Hh.bind(
          null,
          a,
          s,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = Ct(), t = Xe.identifierPrefix;
      if (je) {
        var n = Cn, a = Rn;
        n = (a & ~(1 << 32 - zt(a) - 1)).toString(32) + n, t = "«" + t + "R" + n, n = vo++, 0 < n && (t += "H" + n.toString(32)), t += "»";
      } else
        n = Y0++, t = "«" + t + "r" + n.toString(32) + "»";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Ks,
    useFormState: Zh,
    useActionState: Zh,
    useOptimistic: function(e) {
      var t = Ct();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Ps.bind(
        null,
        Ee,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: qs,
    useCacheRefresh: function() {
      return Ct().memoizedState = K0.bind(
        null,
        Ee
      );
    }
  }, pm = {
    readContext: gt,
    use: go,
    useCallback: lm,
    useContext: gt,
    useEffect: $h,
    useImperativeHandle: nm,
    useInsertionEffect: Ih,
    useLayoutEffect: em,
    useMemo: am,
    useReducer: yo,
    useRef: Fh,
    useState: function() {
      return yo(Dn);
    },
    useDebugValue: Vs,
    useDeferredValue: function(e, t) {
      var n = nt();
      return im(
        n,
        Ge.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = yo(Dn)[0], t = nt().memoizedState;
      return [
        typeof e == "boolean" ? e : Wi(e),
        t
      ];
    },
    useSyncExternalStore: jh,
    useId: sm,
    useHostTransitionStatus: Ks,
    useFormState: Kh,
    useActionState: Kh,
    useOptimistic: function(e, t) {
      var n = nt();
      return Gh(n, Ge, e, t);
    },
    useMemoCache: qs,
    useCacheRefresh: cm
  }, J0 = {
    readContext: gt,
    use: go,
    useCallback: lm,
    useContext: gt,
    useEffect: $h,
    useImperativeHandle: nm,
    useInsertionEffect: Ih,
    useLayoutEffect: em,
    useMemo: am,
    useReducer: Qs,
    useRef: Fh,
    useState: function() {
      return Qs(Dn);
    },
    useDebugValue: Vs,
    useDeferredValue: function(e, t) {
      var n = nt();
      return Ge === null ? Xs(n, e, t) : im(
        n,
        Ge.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Qs(Dn)[0], t = nt().memoizedState;
      return [
        typeof e == "boolean" ? e : Wi(e),
        t
      ];
    },
    useSyncExternalStore: jh,
    useId: sm,
    useHostTransitionStatus: Ks,
    useFormState: Jh,
    useActionState: Jh,
    useOptimistic: function(e, t) {
      var n = nt();
      return Ge !== null ? Gh(n, Ge, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: qs,
    useCacheRefresh: cm
  }, Ba = null, er = 0;
  function wo(e) {
    var t = er;
    return er += 1, Ba === null && (Ba = []), Rh(Ba, e, t);
  }
  function tr(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function To(e, t) {
    throw t.$$typeof === x ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function vm(e) {
    var t = e._init;
    return t(e._payload);
  }
  function gm(e) {
    function t(D, O) {
      if (e) {
        var U = D.deletions;
        U === null ? (D.deletions = [O], D.flags |= 16) : U.push(O);
      }
    }
    function n(D, O) {
      if (!e) return null;
      for (; O !== null; )
        t(D, O), O = O.sibling;
      return null;
    }
    function a(D) {
      for (var O = /* @__PURE__ */ new Map(); D !== null; )
        D.key !== null ? O.set(D.key, D) : O.set(D.index, D), D = D.sibling;
      return O;
    }
    function r(D, O) {
      return D = An(D, O), D.index = 0, D.sibling = null, D;
    }
    function s(D, O, U) {
      return D.index = U, e ? (U = D.alternate, U !== null ? (U = U.index, U < O ? (D.flags |= 67108866, O) : U) : (D.flags |= 67108866, O)) : (D.flags |= 1048576, O);
    }
    function d(D) {
      return e && D.alternate === null && (D.flags |= 67108866), D;
    }
    function g(D, O, U, V) {
      return O === null || O.tag !== 6 ? (O = ps(U, D.mode, V), O.return = D, O) : (O = r(O, U), O.return = D, O);
    }
    function E(D, O, U, V) {
      var le = U.type;
      return le === _ ? Y(
        D,
        O,
        U.props.children,
        V,
        U.key
      ) : O !== null && (O.elementType === le || typeof le == "object" && le !== null && le.$$typeof === K && vm(le) === O.type) ? (O = r(O, U.props), tr(O, U), O.return = D, O) : (O = io(
        U.type,
        U.key,
        U.props,
        null,
        D.mode,
        V
      ), tr(O, U), O.return = D, O);
    }
    function L(D, O, U, V) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== U.containerInfo || O.stateNode.implementation !== U.implementation ? (O = vs(U, D.mode, V), O.return = D, O) : (O = r(O, U.children || []), O.return = D, O);
    }
    function Y(D, O, U, V, le) {
      return O === null || O.tag !== 7 ? (O = Bl(
        U,
        D.mode,
        V,
        le
      ), O.return = D, O) : (O = r(O, U), O.return = D, O);
    }
    function Z(D, O, U) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return O = ps(
          "" + O,
          D.mode,
          U
        ), O.return = D, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case T:
            return U = io(
              O.type,
              O.key,
              O.props,
              null,
              D.mode,
              U
            ), tr(U, O), U.return = D, U;
          case R:
            return O = vs(
              O,
              D.mode,
              U
            ), O.return = D, O;
          case K:
            var V = O._init;
            return O = V(O._payload), Z(D, O, U);
        }
        if (ve(O) || ce(O))
          return O = Bl(
            O,
            D.mode,
            U,
            null
          ), O.return = D, O;
        if (typeof O.then == "function")
          return Z(D, wo(O), U);
        if (O.$$typeof === H)
          return Z(
            D,
            so(D, O),
            U
          );
        To(D, O);
      }
      return null;
    }
    function B(D, O, U, V) {
      var le = O !== null ? O.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return le !== null ? null : g(D, O, "" + U, V);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case T:
            return U.key === le ? E(D, O, U, V) : null;
          case R:
            return U.key === le ? L(D, O, U, V) : null;
          case K:
            return le = U._init, U = le(U._payload), B(D, O, U, V);
        }
        if (ve(U) || ce(U))
          return le !== null ? null : Y(D, O, U, V, null);
        if (typeof U.then == "function")
          return B(
            D,
            O,
            wo(U),
            V
          );
        if (U.$$typeof === H)
          return B(
            D,
            O,
            so(D, U),
            V
          );
        To(D, U);
      }
      return null;
    }
    function q(D, O, U, V, le) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return D = D.get(U) || null, g(O, D, "" + V, le);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case T:
            return D = D.get(
              V.key === null ? U : V.key
            ) || null, E(O, D, V, le);
          case R:
            return D = D.get(
              V.key === null ? U : V.key
            ) || null, L(O, D, V, le);
          case K:
            var Te = V._init;
            return V = Te(V._payload), q(
              D,
              O,
              U,
              V,
              le
            );
        }
        if (ve(V) || ce(V))
          return D = D.get(U) || null, Y(O, D, V, le, null);
        if (typeof V.then == "function")
          return q(
            D,
            O,
            U,
            wo(V),
            le
          );
        if (V.$$typeof === H)
          return q(
            D,
            O,
            U,
            so(O, V),
            le
          );
        To(O, V);
      }
      return null;
    }
    function me(D, O, U, V) {
      for (var le = null, Te = null, oe = O, he = O = 0, st = null; oe !== null && he < U.length; he++) {
        oe.index > he ? (st = oe, oe = null) : st = oe.sibling;
        var ze = B(
          D,
          oe,
          U[he],
          V
        );
        if (ze === null) {
          oe === null && (oe = st);
          break;
        }
        e && oe && ze.alternate === null && t(D, oe), O = s(ze, O, he), Te === null ? le = ze : Te.sibling = ze, Te = ze, oe = st;
      }
      if (he === U.length)
        return n(D, oe), je && Gl(D, he), le;
      if (oe === null) {
        for (; he < U.length; he++)
          oe = Z(D, U[he], V), oe !== null && (O = s(
            oe,
            O,
            he
          ), Te === null ? le = oe : Te.sibling = oe, Te = oe);
        return je && Gl(D, he), le;
      }
      for (oe = a(oe); he < U.length; he++)
        st = q(
          oe,
          D,
          he,
          U[he],
          V
        ), st !== null && (e && st.alternate !== null && oe.delete(
          st.key === null ? he : st.key
        ), O = s(
          st,
          O,
          he
        ), Te === null ? le = st : Te.sibling = st, Te = st);
      return e && oe.forEach(function(dl) {
        return t(D, dl);
      }), je && Gl(D, he), le;
    }
    function de(D, O, U, V) {
      if (U == null) throw Error(u(151));
      for (var le = null, Te = null, oe = O, he = O = 0, st = null, ze = U.next(); oe !== null && !ze.done; he++, ze = U.next()) {
        oe.index > he ? (st = oe, oe = null) : st = oe.sibling;
        var dl = B(D, oe, ze.value, V);
        if (dl === null) {
          oe === null && (oe = st);
          break;
        }
        e && oe && dl.alternate === null && t(D, oe), O = s(dl, O, he), Te === null ? le = dl : Te.sibling = dl, Te = dl, oe = st;
      }
      if (ze.done)
        return n(D, oe), je && Gl(D, he), le;
      if (oe === null) {
        for (; !ze.done; he++, ze = U.next())
          ze = Z(D, ze.value, V), ze !== null && (O = s(ze, O, he), Te === null ? le = ze : Te.sibling = ze, Te = ze);
        return je && Gl(D, he), le;
      }
      for (oe = a(oe); !ze.done; he++, ze = U.next())
        ze = q(oe, D, he, ze.value, V), ze !== null && (e && ze.alternate !== null && oe.delete(ze.key === null ? he : ze.key), O = s(ze, O, he), Te === null ? le = ze : Te.sibling = ze, Te = ze);
      return e && oe.forEach(function(FS) {
        return t(D, FS);
      }), je && Gl(D, he), le;
    }
    function Ye(D, O, U, V) {
      if (typeof U == "object" && U !== null && U.type === _ && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case T:
            e: {
              for (var le = U.key; O !== null; ) {
                if (O.key === le) {
                  if (le = U.type, le === _) {
                    if (O.tag === 7) {
                      n(
                        D,
                        O.sibling
                      ), V = r(
                        O,
                        U.props.children
                      ), V.return = D, D = V;
                      break e;
                    }
                  } else if (O.elementType === le || typeof le == "object" && le !== null && le.$$typeof === K && vm(le) === O.type) {
                    n(
                      D,
                      O.sibling
                    ), V = r(O, U.props), tr(V, U), V.return = D, D = V;
                    break e;
                  }
                  n(D, O);
                  break;
                } else t(D, O);
                O = O.sibling;
              }
              U.type === _ ? (V = Bl(
                U.props.children,
                D.mode,
                V,
                U.key
              ), V.return = D, D = V) : (V = io(
                U.type,
                U.key,
                U.props,
                null,
                D.mode,
                V
              ), tr(V, U), V.return = D, D = V);
            }
            return d(D);
          case R:
            e: {
              for (le = U.key; O !== null; ) {
                if (O.key === le)
                  if (O.tag === 4 && O.stateNode.containerInfo === U.containerInfo && O.stateNode.implementation === U.implementation) {
                    n(
                      D,
                      O.sibling
                    ), V = r(O, U.children || []), V.return = D, D = V;
                    break e;
                  } else {
                    n(D, O);
                    break;
                  }
                else t(D, O);
                O = O.sibling;
              }
              V = vs(U, D.mode, V), V.return = D, D = V;
            }
            return d(D);
          case K:
            return le = U._init, U = le(U._payload), Ye(
              D,
              O,
              U,
              V
            );
        }
        if (ve(U))
          return me(
            D,
            O,
            U,
            V
          );
        if (ce(U)) {
          if (le = ce(U), typeof le != "function") throw Error(u(150));
          return U = le.call(U), de(
            D,
            O,
            U,
            V
          );
        }
        if (typeof U.then == "function")
          return Ye(
            D,
            O,
            wo(U),
            V
          );
        if (U.$$typeof === H)
          return Ye(
            D,
            O,
            so(D, U),
            V
          );
        To(D, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint" ? (U = "" + U, O !== null && O.tag === 6 ? (n(D, O.sibling), V = r(O, U), V.return = D, D = V) : (n(D, O), V = ps(U, D.mode, V), V.return = D, D = V), d(D)) : n(D, O);
    }
    return function(D, O, U, V) {
      try {
        er = 0;
        var le = Ye(
          D,
          O,
          U,
          V
        );
        return Ba = null, le;
      } catch (oe) {
        if (oe === Xi || oe === fo) throw oe;
        var Te = Ut(29, oe, null, D.mode);
        return Te.lanes = V, Te.return = D, Te;
      } finally {
      }
    };
  }
  var qa = gm(!0), ym = gm(!1), Jt = X(null), fn = null;
  function Wn(e) {
    var t = e.alternate;
    F(at, at.current & 1), F(Jt, e), fn === null && (t === null || ja.current !== null || t.memoizedState !== null) && (fn = e);
  }
  function bm(e) {
    if (e.tag === 22) {
      if (F(at, at.current), F(Jt, e), fn === null) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (fn = e);
      }
    } else $n();
  }
  function $n() {
    F(at, at.current), F(Jt, Jt.current);
  }
  function _n(e) {
    $(Jt), fn === e && (fn = null), $(at);
  }
  var at = X(0);
  function Ao(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || Bc(n)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  function Js(e, t, n, a) {
    t = e.memoizedState, n = n(a, t), n = n == null ? t : b({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Fs = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var a = qt(), r = Pn(a);
      r.payload = t, n != null && (r.callback = n), t = Jn(e, r, a), t !== null && (Gt(t, e, a), Ki(t, e, a));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var a = qt(), r = Pn(a);
      r.tag = 1, r.payload = t, n != null && (r.callback = n), t = Jn(e, r, a), t !== null && (Gt(t, e, a), Ki(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = qt(), a = Pn(n);
      a.tag = 2, t != null && (a.callback = t), t = Jn(e, a, n), t !== null && (Gt(t, e, n), Ki(t, e, n));
    }
  };
  function Sm(e, t, n, a, r, s, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, s, d) : t.prototype && t.prototype.isPureReactComponent ? !Li(n, a) || !Li(r, s) : !0;
  }
  function xm(e, t, n, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== e && Fs.enqueueReplaceState(t, t.state, null);
  }
  function Kl(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t)
        a !== "ref" && (n[a] = t[a]);
    }
    if (e = e.defaultProps) {
      n === t && (n = b({}, n));
      for (var r in e)
        n[r] === void 0 && (n[r] = e[r]);
    }
    return n;
  }
  var Ro = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  };
  function Em(e) {
    Ro(e);
  }
  function wm(e) {
    console.error(e);
  }
  function Tm(e) {
    Ro(e);
  }
  function Co(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Am(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Ws(e, t, n) {
    return n = Pn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Co(e, t);
    }, n;
  }
  function Rm(e) {
    return e = Pn(e), e.tag = 3, e;
  }
  function Cm(e, t, n, a) {
    var r = n.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var s = a.value;
      e.payload = function() {
        return r(s);
      }, e.callback = function() {
        Am(t, n, a);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      Am(t, n, a), typeof r != "function" && (al === null ? al = /* @__PURE__ */ new Set([this]) : al.add(this));
      var g = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: g !== null ? g : ""
      });
    });
  }
  function F0(e, t, n, a, r) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = n.alternate, t !== null && Yi(
        t,
        n,
        r,
        !0
      ), n = Jt.current, n !== null) {
        switch (n.tag) {
          case 13:
            return fn === null ? xc() : n.alternate === null && Fe === 0 && (Fe = 3), n.flags &= -257, n.flags |= 65536, n.lanes = r, a === Rs ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), wc(e, a, r)), !1;
          case 22:
            return n.flags |= 65536, a === Rs ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), wc(e, a, r)), !1;
        }
        throw Error(u(435, n.tag));
      }
      return wc(e, a, r), xc(), !1;
    }
    if (je)
      return t = Jt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = r, a !== bs && (e = Error(u(422), { cause: a }), Qi(Xt(e, n)))) : (a !== bs && (t = Error(u(423), {
        cause: a
      }), Qi(
        Xt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, r &= -r, e.lanes |= r, a = Xt(a, n), r = Ws(
        e.stateNode,
        a,
        r
      ), Ms(e, r), Fe !== 4 && (Fe = 2)), !1;
    var s = Error(u(520), { cause: a });
    if (s = Xt(s, n), ur === null ? ur = [s] : ur.push(s), Fe !== 4 && (Fe = 2), t === null) return !0;
    a = Xt(a, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = r & -r, n.lanes |= e, e = Ws(n.stateNode, a, e), Ms(n, e), !1;
        case 1:
          if (t = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (al === null || !al.has(s))))
            return n.flags |= 65536, r &= -r, n.lanes |= r, r = Rm(r), Cm(
              r,
              e,
              n,
              a
            ), Ms(n, r), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Om = Error(u(461)), ot = !1;
  function ft(e, t, n, a) {
    t.child = e === null ? ym(t, null, n, a) : qa(
      t,
      e.child,
      n,
      a
    );
  }
  function Mm(e, t, n, a, r) {
    n = n.render;
    var s = t.ref;
    if ("ref" in a) {
      var d = {};
      for (var g in a)
        g !== "ref" && (d[g] = a[g]);
    } else d = a;
    return Vl(t), a = js(
      e,
      t,
      n,
      d,
      s,
      r
    ), g = Us(), e !== null && !ot ? (Hs(e, t, r), Nn(e, t, r)) : (je && g && gs(t), t.flags |= 1, ft(e, t, a, r), t.child);
  }
  function Dm(e, t, n, a, r) {
    if (e === null) {
      var s = n.type;
      return typeof s == "function" && !ms(s) && s.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = s, _m(
        e,
        t,
        s,
        a,
        r
      )) : (e = io(
        n.type,
        null,
        a,
        t,
        t.mode,
        r
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (s = e.child, !ic(e, r)) {
      var d = s.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Li, n(d, a) && e.ref === t.ref)
        return Nn(e, t, r);
    }
    return t.flags |= 1, e = An(s, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function _m(e, t, n, a, r) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Li(s, a) && e.ref === t.ref)
        if (ot = !1, t.pendingProps = a = s, ic(e, r))
          (e.flags & 131072) !== 0 && (ot = !0);
        else
          return t.lanes = e.lanes, Nn(e, t, r);
    }
    return $s(
      e,
      t,
      n,
      a,
      r
    );
  }
  function Nm(e, t, n) {
    var a = t.pendingProps, r = a.children, s = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (a = s !== null ? s.baseLanes | n : n, e !== null) {
          for (r = t.child = e.child, s = 0; r !== null; )
            s = s | r.lanes | r.childLanes, r = r.sibling;
          t.childLanes = s & ~a;
        } else t.childLanes = 0, t.child = null;
        return zm(
          e,
          t,
          a,
          n
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && co(
          t,
          s !== null ? s.cachePool : null
        ), s !== null ? _h(t, s) : _s(), bm(t);
      else
        return t.lanes = t.childLanes = 536870912, zm(
          e,
          t,
          s !== null ? s.baseLanes | n : n,
          n
        );
    } else
      s !== null ? (co(t, s.cachePool), _h(t, s), $n(), t.memoizedState = null) : (e !== null && co(t, null), _s(), $n());
    return ft(e, t, r, n), t.child;
  }
  function zm(e, t, n, a) {
    var r = As();
    return r = r === null ? null : { parent: lt._currentValue, pool: r }, t.memoizedState = {
      baseLanes: n,
      cachePool: r
    }, e !== null && co(t, null), _s(), bm(t), e !== null && Yi(e, t, a, !0), null;
  }
  function Oo(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function $s(e, t, n, a, r) {
    return Vl(t), n = js(
      e,
      t,
      n,
      a,
      void 0,
      r
    ), a = Us(), e !== null && !ot ? (Hs(e, t, r), Nn(e, t, r)) : (je && a && gs(t), t.flags |= 1, ft(e, t, n, r), t.child);
  }
  function jm(e, t, n, a, r, s) {
    return Vl(t), t.updateQueue = null, n = zh(
      t,
      a,
      n,
      r
    ), Nh(e), a = Us(), e !== null && !ot ? (Hs(e, t, s), Nn(e, t, s)) : (je && a && gs(t), t.flags |= 1, ft(e, t, n, s), t.child);
  }
  function Um(e, t, n, a, r) {
    if (Vl(t), t.stateNode === null) {
      var s = Ma, d = n.contextType;
      typeof d == "object" && d !== null && (s = gt(d)), s = new n(a, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Fs, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = a, s.state = t.memoizedState, s.refs = {}, Cs(t), d = n.contextType, s.context = typeof d == "object" && d !== null ? gt(d) : Ma, s.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (Js(
        t,
        n,
        d,
        a
      ), s.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (d = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), d !== s.state && Fs.enqueueReplaceState(s, s.state, null), Ji(t, a, s, r), Pi(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      s = t.stateNode;
      var g = t.memoizedProps, E = Kl(n, g);
      s.props = E;
      var L = s.context, Y = n.contextType;
      d = Ma, typeof Y == "object" && Y !== null && (d = gt(Y));
      var Z = n.getDerivedStateFromProps;
      Y = typeof Z == "function" || typeof s.getSnapshotBeforeUpdate == "function", g = t.pendingProps !== g, Y || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (g || L !== d) && xm(
        t,
        s,
        a,
        d
      ), Kn = !1;
      var B = t.memoizedState;
      s.state = B, Ji(t, a, s, r), Pi(), L = t.memoizedState, g || B !== L || Kn ? (typeof Z == "function" && (Js(
        t,
        n,
        Z,
        a
      ), L = t.memoizedState), (E = Kn || Sm(
        t,
        n,
        E,
        a,
        B,
        L,
        d
      )) ? (Y || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = L), s.props = a, s.state = L, s.context = d, a = E) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      s = t.stateNode, Os(e, t), d = t.memoizedProps, Y = Kl(n, d), s.props = Y, Z = t.pendingProps, B = s.context, L = n.contextType, E = Ma, typeof L == "object" && L !== null && (E = gt(L)), g = n.getDerivedStateFromProps, (L = typeof g == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (d !== Z || B !== E) && xm(
        t,
        s,
        a,
        E
      ), Kn = !1, B = t.memoizedState, s.state = B, Ji(t, a, s, r), Pi();
      var q = t.memoizedState;
      d !== Z || B !== q || Kn || e !== null && e.dependencies !== null && uo(e.dependencies) ? (typeof g == "function" && (Js(
        t,
        n,
        g,
        a
      ), q = t.memoizedState), (Y = Kn || Sm(
        t,
        n,
        Y,
        a,
        B,
        q,
        E
      ) || e !== null && e.dependencies !== null && uo(e.dependencies)) ? (L || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(a, q, E), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        a,
        q,
        E
      )), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = q), s.props = a, s.state = q, s.context = E, a = Y) : (typeof s.componentDidUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return s = a, Oo(e, t), a = (t.flags & 128) !== 0, s || a ? (s = t.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && a ? (t.child = qa(
      t,
      e.child,
      null,
      r
    ), t.child = qa(
      t,
      null,
      n,
      r
    )) : ft(e, t, n, r), t.memoizedState = s.state, e = t.child) : e = Nn(
      e,
      t,
      r
    ), e;
  }
  function Hm(e, t, n, a) {
    return Gi(), t.flags |= 256, ft(e, t, n, a), t.child;
  }
  var Is = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ec(e) {
    return { baseLanes: e, cachePool: wh() };
  }
  function tc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Ft), e;
  }
  function Lm(e, t, n) {
    var a = t.pendingProps, r = !1, s = (t.flags & 128) !== 0, d;
    if ((d = s) || (d = e !== null && e.memoizedState === null ? !1 : (at.current & 2) !== 0), d && (r = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (je) {
        if (r ? Wn(t) : $n(), je) {
          var g = Je, E;
          if (E = g) {
            e: {
              for (E = g, g = cn; E.nodeType !== 8; ) {
                if (!g) {
                  g = null;
                  break e;
                }
                if (E = tn(
                  E.nextSibling
                ), E === null) {
                  g = null;
                  break e;
                }
              }
              g = E;
            }
            g !== null ? (t.memoizedState = {
              dehydrated: g,
              treeContext: ql !== null ? { id: Rn, overflow: Cn } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, E = Ut(
              18,
              null,
              null,
              0
            ), E.stateNode = g, E.return = t, t.child = E, xt = t, Je = null, E = !0) : E = !1;
          }
          E || Yl(t);
        }
        if (g = t.memoizedState, g !== null && (g = g.dehydrated, g !== null))
          return Bc(g) ? t.lanes = 32 : t.lanes = 536870912, null;
        _n(t);
      }
      return g = a.children, a = a.fallback, r ? ($n(), r = t.mode, g = Mo(
        { mode: "hidden", children: g },
        r
      ), a = Bl(
        a,
        r,
        n,
        null
      ), g.return = t, a.return = t, g.sibling = a, t.child = g, r = t.child, r.memoizedState = ec(n), r.childLanes = tc(
        e,
        d,
        n
      ), t.memoizedState = Is, a) : (Wn(t), nc(t, g));
    }
    if (E = e.memoizedState, E !== null && (g = E.dehydrated, g !== null)) {
      if (s)
        t.flags & 256 ? (Wn(t), t.flags &= -257, t = lc(
          e,
          t,
          n
        )) : t.memoizedState !== null ? ($n(), t.child = e.child, t.flags |= 128, t = null) : ($n(), r = a.fallback, g = t.mode, a = Mo(
          { mode: "visible", children: a.children },
          g
        ), r = Bl(
          r,
          g,
          n,
          null
        ), r.flags |= 2, a.return = t, r.return = t, a.sibling = r, t.child = a, qa(
          t,
          e.child,
          null,
          n
        ), a = t.child, a.memoizedState = ec(n), a.childLanes = tc(
          e,
          d,
          n
        ), t.memoizedState = Is, t = r);
      else if (Wn(t), Bc(g)) {
        if (d = g.nextSibling && g.nextSibling.dataset, d) var L = d.dgst;
        d = L, a = Error(u(419)), a.stack = "", a.digest = d, Qi({ value: a, source: null, stack: null }), t = lc(
          e,
          t,
          n
        );
      } else if (ot || Yi(e, t, n, !1), d = (n & e.childLanes) !== 0, ot || d) {
        if (d = Xe, d !== null && (a = n & -n, a = (a & 42) !== 0 ? 1 : qu(a), a = (a & (d.suspendedLanes | n)) !== 0 ? 0 : a, a !== 0 && a !== E.retryLane))
          throw E.retryLane = a, Oa(e, a), Gt(d, e, a), Om;
        g.data === "$?" || xc(), t = lc(
          e,
          t,
          n
        );
      } else
        g.data === "$?" ? (t.flags |= 192, t.child = e.child, t = null) : (e = E.treeContext, Je = tn(
          g.nextSibling
        ), xt = t, je = !0, Ql = null, cn = !1, e !== null && (Kt[Pt++] = Rn, Kt[Pt++] = Cn, Kt[Pt++] = ql, Rn = e.id, Cn = e.overflow, ql = t), t = nc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return r ? ($n(), r = a.fallback, g = t.mode, E = e.child, L = E.sibling, a = An(E, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = E.subtreeFlags & 65011712, L !== null ? r = An(L, r) : (r = Bl(
      r,
      g,
      n,
      null
    ), r.flags |= 2), r.return = t, a.return = t, a.sibling = r, t.child = a, a = r, r = t.child, g = e.child.memoizedState, g === null ? g = ec(n) : (E = g.cachePool, E !== null ? (L = lt._currentValue, E = E.parent !== L ? { parent: L, pool: L } : E) : E = wh(), g = {
      baseLanes: g.baseLanes | n,
      cachePool: E
    }), r.memoizedState = g, r.childLanes = tc(
      e,
      d,
      n
    ), t.memoizedState = Is, a) : (Wn(t), n = e.child, e = n.sibling, n = An(n, {
      mode: "visible",
      children: a.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function nc(e, t) {
    return t = Mo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Mo(e, t) {
    return e = Ut(22, e, null, t), e.lanes = 0, e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, e;
  }
  function lc(e, t, n) {
    return qa(t, e.child, null, n), e = nc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Bm(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), xs(e.return, t, n);
  }
  function ac(e, t, n, a, r) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: r
    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = a, s.tail = n, s.tailMode = r);
  }
  function qm(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, s = a.tail;
    if (ft(e, t, a.children, n), a = at.current, (a & 2) !== 0)
      a = a & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && Bm(e, n, t);
          else if (e.tag === 19)
            Bm(e, n, t);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      a &= 1;
    }
    switch (F(at, a), r) {
      case "forwards":
        for (n = t.child, r = null; n !== null; )
          e = n.alternate, e !== null && Ao(e) === null && (r = n), n = n.sibling;
        n = r, n === null ? (r = t.child, t.child = null) : (r = n.sibling, n.sibling = null), ac(
          t,
          !1,
          r,
          n,
          s
        );
        break;
      case "backwards":
        for (n = null, r = t.child, t.child = null; r !== null; ) {
          if (e = r.alternate, e !== null && Ao(e) === null) {
            t.child = r;
            break;
          }
          e = r.sibling, r.sibling = n, n = r, r = e;
        }
        ac(
          t,
          !0,
          n,
          null,
          s
        );
        break;
      case "together":
        ac(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Nn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ll |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Yi(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, n = An(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = An(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function ic(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && uo(e)));
  }
  function W0(e, t, n) {
    switch (t.tag) {
      case 3:
        fe(t, t.stateNode.containerInfo), Zn(t, lt, e.memoizedState.cache), Gi();
        break;
      case 27:
      case 5:
        Me(t);
        break;
      case 4:
        fe(t, t.stateNode.containerInfo);
        break;
      case 10:
        Zn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Wn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Lm(e, t, n) : (Wn(t), e = Nn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        Wn(t);
        break;
      case 19:
        var r = (e.flags & 128) !== 0;
        if (a = (n & t.childLanes) !== 0, a || (Yi(
          e,
          t,
          n,
          !1
        ), a = (n & t.childLanes) !== 0), r) {
          if (a)
            return qm(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (r = t.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), F(at, at.current), a) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Nm(e, t, n);
      case 24:
        Zn(t, lt, e.memoizedState.cache);
    }
    return Nn(e, t, n);
  }
  function Gm(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        ot = !0;
      else {
        if (!ic(e, n) && (t.flags & 128) === 0)
          return ot = !1, W0(
            e,
            t,
            n
          );
        ot = (e.flags & 131072) !== 0;
      }
    else
      ot = !1, je && (t.flags & 1048576) !== 0 && vh(t, oo, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          e = t.pendingProps;
          var a = t.elementType, r = a._init;
          if (a = r(a._payload), t.type = a, typeof a == "function")
            ms(a) ? (e = Kl(a, e), t.tag = 1, t = Um(
              null,
              t,
              a,
              e,
              n
            )) : (t.tag = 0, t = $s(
              null,
              t,
              a,
              e,
              n
            ));
          else {
            if (a != null) {
              if (r = a.$$typeof, r === k) {
                t.tag = 11, t = Mm(
                  null,
                  t,
                  a,
                  e,
                  n
                );
                break e;
              } else if (r === J) {
                t.tag = 14, t = Dm(
                  null,
                  t,
                  a,
                  e,
                  n
                );
                break e;
              }
            }
            throw t = Se(a) || a, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return $s(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return a = t.type, r = Kl(
          a,
          t.pendingProps
        ), Um(
          e,
          t,
          a,
          r,
          n
        );
      case 3:
        e: {
          if (fe(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          a = t.pendingProps;
          var s = t.memoizedState;
          r = s.element, Os(e, t), Ji(t, a, null, n);
          var d = t.memoizedState;
          if (a = d.cache, Zn(t, lt, a), a !== s.cache && Es(
            t,
            [lt],
            n,
            !0
          ), Pi(), a = d.element, s.isDehydrated)
            if (s = {
              element: a,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
              t = Hm(
                e,
                t,
                a,
                n
              );
              break e;
            } else if (a !== r) {
              r = Xt(
                Error(u(424)),
                t
              ), Qi(r), t = Hm(
                e,
                t,
                a,
                n
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Je = tn(e.firstChild), xt = t, je = !0, Ql = null, cn = !0, n = ym(
                t,
                null,
                a,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (Gi(), a === r) {
              t = Nn(
                e,
                t,
                n
              );
              break e;
            }
            ft(
              e,
              t,
              a,
              n
            );
          }
          t = t.child;
        }
        return t;
      case 26:
        return Oo(e, t), e === null ? (n = Vp(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : je || (n = t.type, e = t.pendingProps, a = ko(
          se.current
        ).createElement(n), a[vt] = t, a[At] = e, ht(a, n, e), rt(a), t.stateNode = a) : t.memoizedState = Vp(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Me(t), e === null && je && (a = t.stateNode = Qp(
          t.type,
          t.pendingProps,
          se.current
        ), xt = t, cn = !0, r = Je, ol(t.type) ? (qc = r, Je = tn(
          a.firstChild
        )) : Je = r), ft(
          e,
          t,
          t.pendingProps.children,
          n
        ), Oo(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && je && ((r = a = Je) && (a = AS(
          a,
          t.type,
          t.pendingProps,
          cn
        ), a !== null ? (t.stateNode = a, xt = t, Je = tn(
          a.firstChild
        ), cn = !1, r = !0) : r = !1), r || Yl(t)), Me(t), r = t.type, s = t.pendingProps, d = e !== null ? e.memoizedProps : null, a = s.children, Uc(r, s) ? a = null : d !== null && Uc(r, d) && (t.flags |= 32), t.memoizedState !== null && (r = js(
          e,
          t,
          k0,
          null,
          null,
          n
        ), gr._currentValue = r), Oo(e, t), ft(e, t, a, n), t.child;
      case 6:
        return e === null && je && ((e = n = Je) && (n = RS(
          n,
          t.pendingProps,
          cn
        ), n !== null ? (t.stateNode = n, xt = t, Je = null, e = !0) : e = !1), e || Yl(t)), null;
      case 13:
        return Lm(e, t, n);
      case 4:
        return fe(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = qa(
          t,
          null,
          a,
          n
        ) : ft(
          e,
          t,
          a,
          n
        ), t.child;
      case 11:
        return Mm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return ft(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return ft(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return ft(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return a = t.pendingProps, Zn(t, t.type, a.value), ft(
          e,
          t,
          a.children,
          n
        ), t.child;
      case 9:
        return r = t.type._context, a = t.pendingProps.children, Vl(t), r = gt(r), a = a(r), t.flags |= 1, ft(e, t, a, n), t.child;
      case 14:
        return Dm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return _m(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return qm(e, t, n);
      case 31:
        return a = t.pendingProps, n = t.mode, a = {
          mode: a.mode,
          children: a.children
        }, e === null ? (n = Mo(
          a,
          n
        ), n.ref = t.ref, t.child = n, n.return = t, t = n) : (n = An(e.child, a), n.ref = t.ref, t.child = n, n.return = t, t = n), t;
      case 22:
        return Nm(e, t, n);
      case 24:
        return Vl(t), a = gt(lt), e === null ? (r = As(), r === null && (r = Xe, s = ws(), r.pooledCache = s, s.refCount++, s !== null && (r.pooledCacheLanes |= n), r = s), t.memoizedState = {
          parent: a,
          cache: r
        }, Cs(t), Zn(t, lt, r)) : ((e.lanes & n) !== 0 && (Os(e, t), Ji(t, null, null, n), Pi()), r = e.memoizedState, s = t.memoizedState, r.parent !== a ? (r = { parent: a, cache: a }, t.memoizedState = r, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = r), Zn(t, lt, a)) : (a = s.cache, Zn(t, lt, a), a !== r.cache && Es(
          t,
          [lt],
          n,
          !0
        ))), ft(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function zn(e) {
    e.flags |= 4;
  }
  function Qm(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Jp(t)) {
      if (t = Jt.current, t !== null && ((Ne & 4194048) === Ne ? fn !== null : (Ne & 62914560) !== Ne && (Ne & 536870912) === 0 || t !== fn))
        throw Zi = Rs, Th;
      e.flags |= 8192;
    }
  }
  function Do(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? bd() : 536870912, e.lanes |= t, ka |= t);
  }
  function nr(e, t) {
    if (!je)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function Ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, a = 0;
    if (t)
      for (var r = e.child; r !== null; )
        n |= r.lanes | r.childLanes, a |= r.subtreeFlags & 65011712, a |= r.flags & 65011712, r.return = e, r = r.sibling;
    else
      for (r = e.child; r !== null; )
        n |= r.lanes | r.childLanes, a |= r.subtreeFlags, a |= r.flags, r.return = e, r = r.sibling;
    return e.subtreeFlags |= a, e.childLanes = n, t;
  }
  function $0(e, t, n) {
    var a = t.pendingProps;
    switch (ys(t), t.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ke(t), null;
      case 1:
        return Ke(t), null;
      case 3:
        return n = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Mn(lt), He(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (qi(t) ? zn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, bh())), Ke(t), null;
      case 26:
        return n = t.memoizedState, e === null ? (zn(t), n !== null ? (Ke(t), Qm(t, n)) : (Ke(t), t.flags &= -16777217)) : n ? n !== e.memoizedState ? (zn(t), Ke(t), Qm(t, n)) : (Ke(t), t.flags &= -16777217) : (e.memoizedProps !== a && zn(t), Ke(t), t.flags &= -16777217), null;
      case 27:
        Ae(t), n = se.current;
        var r = t.type;
        if (e !== null && t.stateNode != null)
          e.memoizedProps !== a && zn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ke(t), null;
          }
          e = ee.current, qi(t) ? gh(t) : (e = Qp(r, a, n), t.stateNode = e, zn(t));
        }
        return Ke(t), null;
      case 5:
        if (Ae(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && zn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ke(t), null;
          }
          if (e = ee.current, qi(t))
            gh(t);
          else {
            switch (r = ko(
              se.current
            ), e) {
              case 1:
                e = r.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                e = r.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    e = r.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    e = r.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    e = r.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                    break;
                  case "select":
                    e = typeof a.is == "string" ? r.createElement("select", { is: a.is }) : r.createElement("select"), a.multiple ? e.multiple = !0 : a.size && (e.size = a.size);
                    break;
                  default:
                    e = typeof a.is == "string" ? r.createElement(n, { is: a.is }) : r.createElement(n);
                }
            }
            e[vt] = t, e[At] = a;
            e: for (r = t.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6)
                e.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue;
              }
              if (r === t) break e;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === t)
                  break e;
                r = r.return;
              }
              r.sibling.return = r.return, r = r.sibling;
            }
            t.stateNode = e;
            e: switch (ht(e, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!a.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && zn(t);
          }
        }
        return Ke(t), t.flags &= -16777217, null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && zn(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(u(166));
          if (e = se.current, qi(t)) {
            if (e = t.stateNode, n = t.memoizedProps, a = null, r = xt, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  a = r.memoizedProps;
              }
            e[vt] = t, e = !!(e.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || jp(e.nodeValue, n)), e || Yl(t);
          } else
            e = ko(e).createTextNode(
              a
            ), e[vt] = t, t.stateNode = e;
        }
        return Ke(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (r = qi(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!r) throw Error(u(318));
              if (r = t.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(u(317));
              r[vt] = t;
            } else
              Gi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ke(t), r = !1;
          } else
            r = bh(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return t.flags & 256 ? (_n(t), t) : (_n(t), null);
        }
        if (_n(t), (t.flags & 128) !== 0)
          return t.lanes = n, t;
        if (n = a !== null, e = e !== null && e.memoizedState !== null, n) {
          a = t.child, r = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (r = a.alternate.memoizedState.cachePool.pool);
          var s = null;
          a.memoizedState !== null && a.memoizedState.cachePool !== null && (s = a.memoizedState.cachePool.pool), s !== r && (a.flags |= 2048);
        }
        return n !== e && n && (t.child.flags |= 8192), Do(t, t.updateQueue), Ke(t), null;
      case 4:
        return He(), e === null && Dc(t.stateNode.containerInfo), Ke(t), null;
      case 10:
        return Mn(t.type), Ke(t), null;
      case 19:
        if ($(at), r = t.memoizedState, r === null) return Ke(t), null;
        if (a = (t.flags & 128) !== 0, s = r.rendering, s === null)
          if (a) nr(r, !1);
          else {
            if (Fe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (s = Ao(e), s !== null) {
                  for (t.flags |= 128, nr(r, !1), e = s.updateQueue, t.updateQueue = e, Do(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    ph(n, e), n = n.sibling;
                  return F(
                    at,
                    at.current & 1 | 2
                  ), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && pt() > zo && (t.flags |= 128, a = !0, nr(r, !1), t.lanes = 4194304);
          }
        else {
          if (!a)
            if (e = Ao(s), e !== null) {
              if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Do(t, e), nr(r, !0), r.tail === null && r.tailMode === "hidden" && !s.alternate && !je)
                return Ke(t), null;
            } else
              2 * pt() - r.renderingStartTime > zo && n !== 536870912 && (t.flags |= 128, a = !0, nr(r, !1), t.lanes = 4194304);
          r.isBackwards ? (s.sibling = t.child, t.child = s) : (e = r.last, e !== null ? e.sibling = s : t.child = s, r.last = s);
        }
        return r.tail !== null ? (t = r.tail, r.rendering = t, r.tail = t.sibling, r.renderingStartTime = pt(), t.sibling = null, e = at.current, F(at, a ? e & 1 | 2 : e & 1), t) : (Ke(t), null);
      case 22:
      case 23:
        return _n(t), Ns(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ke(t), n = t.updateQueue, n !== null && Do(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== n && (t.flags |= 2048), e !== null && $(Xl), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Mn(lt), Ke(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function I0(e, t) {
    switch (ys(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Mn(lt), He(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ae(t), null;
      case 13:
        if (_n(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          Gi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return $(at), null;
      case 4:
        return He(), null;
      case 10:
        return Mn(t.type), null;
      case 22:
      case 23:
        return _n(t), Ns(), e !== null && $(Xl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Mn(lt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ym(e, t) {
    switch (ys(t), t.tag) {
      case 3:
        Mn(lt), He();
        break;
      case 26:
      case 27:
      case 5:
        Ae(t);
        break;
      case 4:
        He();
        break;
      case 13:
        _n(t);
        break;
      case 19:
        $(at);
        break;
      case 10:
        Mn(t.type);
        break;
      case 22:
      case 23:
        _n(t), Ns(), e !== null && $(Xl);
        break;
      case 24:
        Mn(lt);
    }
  }
  function lr(e, t) {
    try {
      var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var r = a.next;
        n = r;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var s = n.create, d = n.inst;
            a = s(), d.destroy = a;
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (g) {
      Ve(t, t.return, g);
    }
  }
  function In(e, t, n) {
    try {
      var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var s = r.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            var d = a.inst, g = d.destroy;
            if (g !== void 0) {
              d.destroy = void 0, r = t;
              var E = n, L = g;
              try {
                L();
              } catch (Y) {
                Ve(
                  r,
                  E,
                  Y
                );
              }
            }
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (Y) {
      Ve(t, t.return, Y);
    }
  }
  function km(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Dh(t, n);
      } catch (a) {
        Ve(e, e.return, a);
      }
    }
  }
  function Vm(e, t, n) {
    n.props = Kl(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      Ve(e, t, a);
    }
  }
  function ar(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(a) : n.current = a;
      }
    } catch (r) {
      Ve(e, t, r);
    }
  }
  function dn(e, t) {
    var n = e.ref, a = e.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (r) {
          Ve(e, t, r);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          Ve(e, t, r);
        }
      else n.current = null;
  }
  function Xm(e) {
    var t = e.type, n = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break e;
        case "img":
          n.src ? a.src = n.src : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (r) {
      Ve(e, e.return, r);
    }
  }
  function rc(e, t, n) {
    try {
      var a = e.stateNode;
      SS(a, e.type, n, t), a[At] = t;
    } catch (r) {
      Ve(e, e.return, r);
    }
  }
  function Zm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ol(e.type) || e.tag === 4;
  }
  function oc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Zm(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ol(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function uc(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Yo));
    else if (a !== 4 && (a === 27 && ol(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (uc(e, t, n), e = e.sibling; e !== null; )
        uc(e, t, n), e = e.sibling;
  }
  function _o(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && (a === 27 && ol(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (_o(e, t, n), e = e.sibling; e !== null; )
        _o(e, t, n), e = e.sibling;
  }
  function Km(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var a = e.type, r = t.attributes; r.length; )
        t.removeAttributeNode(r[0]);
      ht(t, a, n), t[vt] = e, t[At] = n;
    } catch (s) {
      Ve(e, e.return, s);
    }
  }
  var jn = !1, Ie = !1, sc = !1, Pm = typeof WeakSet == "function" ? WeakSet : Set, ut = null;
  function eS(e, t) {
    if (e = e.containerInfo, zc = Jo, e = ih(e), os(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var r = a.anchorOffset, s = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, s.nodeType;
            } catch {
              n = null;
              break e;
            }
            var d = 0, g = -1, E = -1, L = 0, Y = 0, Z = e, B = null;
            t: for (; ; ) {
              for (var q; Z !== n || r !== 0 && Z.nodeType !== 3 || (g = d + r), Z !== s || a !== 0 && Z.nodeType !== 3 || (E = d + a), Z.nodeType === 3 && (d += Z.nodeValue.length), (q = Z.firstChild) !== null; )
                B = Z, Z = q;
              for (; ; ) {
                if (Z === e) break t;
                if (B === n && ++L === r && (g = d), B === s && ++Y === a && (E = d), (q = Z.nextSibling) !== null) break;
                Z = B, B = Z.parentNode;
              }
              Z = q;
            }
            n = g === -1 || E === -1 ? null : { start: g, end: E };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (jc = { focusedElem: e, selectionRange: n }, Jo = !1, ut = t; ut !== null; )
      if (t = ut, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null)
        e.return = t, ut = e;
      else
        for (; ut !== null; ) {
          switch (t = ut, s = t.alternate, e = t.flags, t.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                e = void 0, n = t, r = s.memoizedProps, s = s.memoizedState, a = n.stateNode;
                try {
                  var me = Kl(
                    n.type,
                    r,
                    n.elementType === n.type
                  );
                  e = a.getSnapshotBeforeUpdate(
                    me,
                    s
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (de) {
                  Ve(
                    n,
                    n.return,
                    de
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  Lc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Lc(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, ut = e;
            break;
          }
          ut = t.return;
        }
  }
  function Jm(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        el(e, n), a & 4 && lr(5, n);
        break;
      case 1:
        if (el(e, n), a & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              Ve(n, n.return, d);
            }
          else {
            var r = Kl(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                r,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (d) {
              Ve(
                n,
                n.return,
                d
              );
            }
          }
        a & 64 && km(n), a & 512 && ar(n, n.return);
        break;
      case 3:
        if (el(e, n), a & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Dh(e, t);
          } catch (d) {
            Ve(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Km(n);
      case 26:
      case 5:
        el(e, n), t === null && a & 4 && Xm(n), a & 512 && ar(n, n.return);
        break;
      case 12:
        el(e, n);
        break;
      case 13:
        el(e, n), a & 4 && $m(e, n), a & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = sS.bind(
          null,
          n
        ), CS(e, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || jn, !a) {
          t = t !== null && t.memoizedState !== null || Ie, r = jn;
          var s = Ie;
          jn = a, (Ie = t) && !s ? tl(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : el(e, n), jn = r, Ie = s;
        }
        break;
      case 30:
        break;
      default:
        el(e, n);
    }
  }
  function Fm(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Fm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Yu(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ze = null, Ot = !1;
  function Un(e, t, n) {
    for (n = n.child; n !== null; )
      Wm(e, t, n), n = n.sibling;
  }
  function Wm(e, t, n) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function")
      try {
        Nt.onCommitFiberUnmount(Ai, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Ie || dn(n, t), Un(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ie || dn(n, t);
        var a = Ze, r = Ot;
        ol(n.type) && (Ze = n.stateNode, Ot = !1), Un(
          e,
          t,
          n
        ), hr(n.stateNode), Ze = a, Ot = r;
        break;
      case 5:
        Ie || dn(n, t);
      case 6:
        if (a = Ze, r = Ot, Ze = null, Un(
          e,
          t,
          n
        ), Ze = a, Ot = r, Ze !== null)
          if (Ot)
            try {
              (Ze.nodeType === 9 ? Ze.body : Ze.nodeName === "HTML" ? Ze.ownerDocument.body : Ze).removeChild(n.stateNode);
            } catch (s) {
              Ve(
                n,
                t,
                s
              );
            }
          else
            try {
              Ze.removeChild(n.stateNode);
            } catch (s) {
              Ve(
                n,
                t,
                s
              );
            }
        break;
      case 18:
        Ze !== null && (Ot ? (e = Ze, qp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), xr(e)) : qp(Ze, n.stateNode));
        break;
      case 4:
        a = Ze, r = Ot, Ze = n.stateNode.containerInfo, Ot = !0, Un(
          e,
          t,
          n
        ), Ze = a, Ot = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ie || In(2, n, t), Ie || In(4, n, t), Un(
          e,
          t,
          n
        );
        break;
      case 1:
        Ie || (dn(n, t), a = n.stateNode, typeof a.componentWillUnmount == "function" && Vm(
          n,
          t,
          a
        )), Un(
          e,
          t,
          n
        );
        break;
      case 21:
        Un(
          e,
          t,
          n
        );
        break;
      case 22:
        Ie = (a = Ie) || n.memoizedState !== null, Un(
          e,
          t,
          n
        ), Ie = a;
        break;
      default:
        Un(
          e,
          t,
          n
        );
    }
  }
  function $m(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        xr(e);
      } catch (n) {
        Ve(t, t.return, n);
      }
  }
  function tS(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Pm()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Pm()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function cc(e, t) {
    var n = tS(e);
    t.forEach(function(a) {
      var r = cS.bind(null, e, a);
      n.has(a) || (n.add(a), a.then(r, r));
    });
  }
  function Ht(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var r = n[a], s = e, d = t, g = d;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (ol(g.type)) {
                Ze = g.stateNode, Ot = !1;
                break e;
              }
              break;
            case 5:
              Ze = g.stateNode, Ot = !1;
              break e;
            case 3:
            case 4:
              Ze = g.stateNode.containerInfo, Ot = !0;
              break e;
          }
          g = g.return;
        }
        if (Ze === null) throw Error(u(160));
        Wm(s, d, r), Ze = null, Ot = !1, s = r.alternate, s !== null && (s.return = null), r.return = null;
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; )
        Im(t, e), t = t.sibling;
  }
  var en = null;
  function Im(e, t) {
    var n = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ht(t, e), Lt(e), a & 4 && (In(3, e, e.return), lr(3, e), In(5, e, e.return));
        break;
      case 1:
        Ht(t, e), Lt(e), a & 512 && (Ie || n === null || dn(n, n.return)), a & 64 && jn && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var r = en;
        if (Ht(t, e), Lt(e), a & 512 && (Ie || n === null || dn(n, n.return)), a & 4) {
          var s = n !== null ? n.memoizedState : null;
          if (a = e.memoizedState, n === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, n = e.memoizedProps, r = r.ownerDocument || r;
                  t: switch (a) {
                    case "title":
                      s = r.getElementsByTagName("title")[0], (!s || s[Oi] || s[vt] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = r.createElement(a), r.head.insertBefore(
                        s,
                        r.querySelector("head > title")
                      )), ht(s, a, n), s[vt] = e, rt(s), a = s;
                      break e;
                    case "link":
                      var d = Kp(
                        "link",
                        "href",
                        r
                      ).get(a + (n.href || ""));
                      if (d) {
                        for (var g = 0; g < d.length; g++)
                          if (s = d[g], s.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && s.getAttribute("rel") === (n.rel == null ? null : n.rel) && s.getAttribute("title") === (n.title == null ? null : n.title) && s.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            d.splice(g, 1);
                            break t;
                          }
                      }
                      s = r.createElement(a), ht(s, a, n), r.head.appendChild(s);
                      break;
                    case "meta":
                      if (d = Kp(
                        "meta",
                        "content",
                        r
                      ).get(a + (n.content || ""))) {
                        for (g = 0; g < d.length; g++)
                          if (s = d[g], s.getAttribute("content") === (n.content == null ? null : "" + n.content) && s.getAttribute("name") === (n.name == null ? null : n.name) && s.getAttribute("property") === (n.property == null ? null : n.property) && s.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && s.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            d.splice(g, 1);
                            break t;
                          }
                      }
                      s = r.createElement(a), ht(s, a, n), r.head.appendChild(s);
                      break;
                    default:
                      throw Error(u(468, a));
                  }
                  s[vt] = e, rt(s), a = s;
                }
                e.stateNode = a;
              } else
                Pp(
                  r,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Zp(
                r,
                a,
                e.memoizedProps
              );
          else
            s !== a ? (s === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : s.count--, a === null ? Pp(
              r,
              e.type,
              e.stateNode
            ) : Zp(
              r,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && rc(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        Ht(t, e), Lt(e), a & 512 && (Ie || n === null || dn(n, n.return)), n !== null && a & 4 && rc(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (Ht(t, e), Lt(e), a & 512 && (Ie || n === null || dn(n, n.return)), e.flags & 32) {
          r = e.stateNode;
          try {
            xa(r, "");
          } catch (q) {
            Ve(e, e.return, q);
          }
        }
        a & 4 && e.stateNode != null && (r = e.memoizedProps, rc(
          e,
          r,
          n !== null ? n.memoizedProps : r
        )), a & 1024 && (sc = !0);
        break;
      case 6:
        if (Ht(t, e), Lt(e), a & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          a = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = a;
          } catch (q) {
            Ve(e, e.return, q);
          }
        }
        break;
      case 3:
        if (Zo = null, r = en, en = Vo(t.containerInfo), Ht(t, e), en = r, Lt(e), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            xr(t.containerInfo);
          } catch (q) {
            Ve(e, e.return, q);
          }
        sc && (sc = !1, ep(e));
        break;
      case 4:
        a = en, en = Vo(
          e.stateNode.containerInfo
        ), Ht(t, e), Lt(e), en = a;
        break;
      case 12:
        Ht(t, e), Lt(e);
        break;
      case 13:
        Ht(t, e), Lt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (vc = pt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, cc(e, a)));
        break;
      case 22:
        r = e.memoizedState !== null;
        var E = n !== null && n.memoizedState !== null, L = jn, Y = Ie;
        if (jn = L || r, Ie = Y || E, Ht(t, e), Ie = Y, jn = L, Lt(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = r ? t._visibility & -2 : t._visibility | 1, r && (n === null || E || jn || Ie || Pl(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                E = n = t;
                try {
                  if (s = E.stateNode, r)
                    d = s.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    g = E.stateNode;
                    var Z = E.memoizedProps.style, B = Z != null && Z.hasOwnProperty("display") ? Z.display : null;
                    g.style.display = B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (q) {
                  Ve(E, E.return, q);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = r ? "" : E.memoizedProps;
                } catch (q) {
                  Ve(E, E.return, q);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), t = t.return;
            }
            n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = e.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, cc(e, n))));
        break;
      case 19:
        Ht(t, e), Lt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, cc(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ht(t, e), Lt(e);
    }
  }
  function Lt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, a = e.return; a !== null; ) {
          if (Zm(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var r = n.stateNode, s = oc(e);
            _o(e, s, r);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (xa(d, ""), n.flags &= -33);
            var g = oc(e);
            _o(e, g, d);
            break;
          case 3:
          case 4:
            var E = n.stateNode.containerInfo, L = oc(e);
            uc(
              e,
              L,
              E
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (Y) {
        Ve(e, e.return, Y);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ep(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        ep(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function el(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Jm(e, t.alternate, t), t = t.sibling;
  }
  function Pl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          In(4, t, t.return), Pl(t);
          break;
        case 1:
          dn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Vm(
            t,
            t.return,
            n
          ), Pl(t);
          break;
        case 27:
          hr(t.stateNode);
        case 26:
        case 5:
          dn(t, t.return), Pl(t);
          break;
        case 22:
          t.memoizedState === null && Pl(t);
          break;
        case 30:
          Pl(t);
          break;
        default:
          Pl(t);
      }
      e = e.sibling;
    }
  }
  function tl(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, r = e, s = t, d = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          tl(
            r,
            s,
            n
          ), lr(4, s);
          break;
        case 1:
          if (tl(
            r,
            s,
            n
          ), a = s, r = a.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (L) {
              Ve(a, a.return, L);
            }
          if (a = s, r = a.updateQueue, r !== null) {
            var g = a.stateNode;
            try {
              var E = r.shared.hiddenCallbacks;
              if (E !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < E.length; r++)
                  Mh(E[r], g);
            } catch (L) {
              Ve(a, a.return, L);
            }
          }
          n && d & 64 && km(s), ar(s, s.return);
          break;
        case 27:
          Km(s);
        case 26:
        case 5:
          tl(
            r,
            s,
            n
          ), n && a === null && d & 4 && Xm(s), ar(s, s.return);
          break;
        case 12:
          tl(
            r,
            s,
            n
          );
          break;
        case 13:
          tl(
            r,
            s,
            n
          ), n && d & 4 && $m(r, s);
          break;
        case 22:
          s.memoizedState === null && tl(
            r,
            s,
            n
          ), ar(s, s.return);
          break;
        case 30:
          break;
        default:
          tl(
            r,
            s,
            n
          );
      }
      t = t.sibling;
    }
  }
  function fc(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ki(n));
  }
  function dc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ki(e));
  }
  function hn(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        tp(
          e,
          t,
          n,
          a
        ), t = t.sibling;
  }
  function tp(e, t, n, a) {
    var r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        hn(
          e,
          t,
          n,
          a
        ), r & 2048 && lr(9, t);
        break;
      case 1:
        hn(
          e,
          t,
          n,
          a
        );
        break;
      case 3:
        hn(
          e,
          t,
          n,
          a
        ), r & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ki(e)));
        break;
      case 12:
        if (r & 2048) {
          hn(
            e,
            t,
            n,
            a
          ), e = t.stateNode;
          try {
            var s = t.memoizedProps, d = s.id, g = s.onPostCommit;
            typeof g == "function" && g(
              d,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (E) {
            Ve(t, t.return, E);
          }
        } else
          hn(
            e,
            t,
            n,
            a
          );
        break;
      case 13:
        hn(
          e,
          t,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        s = t.stateNode, d = t.alternate, t.memoizedState !== null ? s._visibility & 2 ? hn(
          e,
          t,
          n,
          a
        ) : ir(e, t) : s._visibility & 2 ? hn(
          e,
          t,
          n,
          a
        ) : (s._visibility |= 2, Ga(
          e,
          t,
          n,
          a,
          (t.subtreeFlags & 10256) !== 0
        )), r & 2048 && fc(d, t);
        break;
      case 24:
        hn(
          e,
          t,
          n,
          a
        ), r & 2048 && dc(t.alternate, t);
        break;
      default:
        hn(
          e,
          t,
          n,
          a
        );
    }
  }
  function Ga(e, t, n, a, r) {
    for (r = r && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var s = e, d = t, g = n, E = a, L = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ga(
            s,
            d,
            g,
            E,
            r
          ), lr(8, d);
          break;
        case 23:
          break;
        case 22:
          var Y = d.stateNode;
          d.memoizedState !== null ? Y._visibility & 2 ? Ga(
            s,
            d,
            g,
            E,
            r
          ) : ir(
            s,
            d
          ) : (Y._visibility |= 2, Ga(
            s,
            d,
            g,
            E,
            r
          )), r && L & 2048 && fc(
            d.alternate,
            d
          );
          break;
        case 24:
          Ga(
            s,
            d,
            g,
            E,
            r
          ), r && L & 2048 && dc(d.alternate, d);
          break;
        default:
          Ga(
            s,
            d,
            g,
            E,
            r
          );
      }
      t = t.sibling;
    }
  }
  function ir(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, a = t, r = a.flags;
        switch (a.tag) {
          case 22:
            ir(n, a), r & 2048 && fc(
              a.alternate,
              a
            );
            break;
          case 24:
            ir(n, a), r & 2048 && dc(a.alternate, a);
            break;
          default:
            ir(n, a);
        }
        t = t.sibling;
      }
  }
  var rr = 8192;
  function Qa(e) {
    if (e.subtreeFlags & rr)
      for (e = e.child; e !== null; )
        np(e), e = e.sibling;
  }
  function np(e) {
    switch (e.tag) {
      case 26:
        Qa(e), e.flags & rr && e.memoizedState !== null && GS(
          en,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Qa(e);
        break;
      case 3:
      case 4:
        var t = en;
        en = Vo(e.stateNode.containerInfo), Qa(e), en = t;
        break;
      case 22:
        e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = rr, rr = 16777216, Qa(e), rr = t) : Qa(e));
        break;
      default:
        Qa(e);
    }
  }
  function lp(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function or(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          ut = a, ip(
            a,
            e
          );
        }
      lp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ap(e), e = e.sibling;
  }
  function ap(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        or(e), e.flags & 2048 && In(9, e, e.return);
        break;
      case 3:
        or(e);
        break;
      case 12:
        or(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, No(e)) : or(e);
        break;
      default:
        or(e);
    }
  }
  function No(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          ut = a, ip(
            a,
            e
          );
        }
      lp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          In(8, t, t.return), No(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, No(t));
          break;
        default:
          No(t);
      }
      e = e.sibling;
    }
  }
  function ip(e, t) {
    for (; ut !== null; ) {
      var n = ut;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          In(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          ki(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, ut = a;
      else
        e: for (n = e; ut !== null; ) {
          a = ut;
          var r = a.sibling, s = a.return;
          if (Fm(a), a === n) {
            ut = null;
            break e;
          }
          if (r !== null) {
            r.return = s, ut = r;
            break e;
          }
          ut = s;
        }
    }
  }
  var nS = {
    getCacheForType: function(e) {
      var t = gt(lt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    }
  }, lS = typeof WeakMap == "function" ? WeakMap : Map, Be = 0, Xe = null, Ce = null, Ne = 0, qe = 0, Bt = null, nl = !1, Ya = !1, hc = !1, Hn = 0, Fe = 0, ll = 0, Jl = 0, mc = 0, Ft = 0, ka = 0, ur = null, Mt = null, pc = !1, vc = 0, zo = 1 / 0, jo = null, al = null, dt = 0, il = null, Va = null, Xa = 0, gc = 0, yc = null, rp = null, sr = 0, bc = null;
  function qt() {
    if ((Be & 2) !== 0 && Ne !== 0)
      return Ne & -Ne;
    if (j.T !== null) {
      var e = Na;
      return e !== 0 ? e : Rc();
    }
    return Ed();
  }
  function op() {
    Ft === 0 && (Ft = (Ne & 536870912) === 0 || je ? yd() : 536870912);
    var e = Jt.current;
    return e !== null && (e.flags |= 32), Ft;
  }
  function Gt(e, t, n) {
    (e === Xe && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null) && (Za(e, 0), rl(
      e,
      Ne,
      Ft,
      !1
    )), Ci(e, n), ((Be & 2) === 0 || e !== Xe) && (e === Xe && ((Be & 2) === 0 && (Jl |= n), Fe === 4 && rl(
      e,
      Ne,
      Ft,
      !1
    )), mn(e));
  }
  function up(e, t, n) {
    if ((Be & 6) !== 0) throw Error(u(327));
    var a = !n && (t & 124) === 0 && (t & e.expiredLanes) === 0 || Ri(e, t), r = a ? rS(e, t) : Ec(e, t, !0), s = a;
    do {
      if (r === 0) {
        Ya && !a && rl(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, s && !aS(n)) {
          r = Ec(e, t, !1), s = !1;
          continue;
        }
        if (r === 2) {
          if (s = t, e.errorRecoveryDisabledLanes & s)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var g = e;
              r = ur;
              var E = g.current.memoizedState.isDehydrated;
              if (E && (Za(g, d).flags |= 256), d = Ec(
                g,
                d,
                !1
              ), d !== 2) {
                if (hc && !E) {
                  g.errorRecoveryDisabledLanes |= s, Jl |= s, r = 4;
                  break e;
                }
                s = Mt, Mt = r, s !== null && (Mt === null ? Mt = s : Mt.push.apply(
                  Mt,
                  s
                ));
              }
              r = d;
            }
            if (s = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          Za(e, 0), rl(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, s = r, s) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              rl(
                a,
                t,
                Ft,
                !nl
              );
              break e;
            case 2:
              Mt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (r = vc + 300 - pt(), 10 < r)) {
            if (rl(
              a,
              t,
              Ft,
              !nl
            ), Vr(a, 0, !0) !== 0) break e;
            a.timeoutHandle = Lp(
              sp.bind(
                null,
                a,
                n,
                Mt,
                jo,
                pc,
                t,
                Ft,
                Jl,
                ka,
                nl,
                s,
                2,
                -0,
                0
              ),
              r
            );
            break e;
          }
          sp(
            a,
            n,
            Mt,
            jo,
            pc,
            t,
            Ft,
            Jl,
            ka,
            nl,
            s,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    mn(e);
  }
  function sp(e, t, n, a, r, s, d, g, E, L, Y, Z, B, q) {
    if (e.timeoutHandle = -1, Z = t.subtreeFlags, (Z & 8192 || (Z & 16785408) === 16785408) && (vr = { stylesheets: null, count: 0, unsuspend: qS }, np(t), Z = QS(), Z !== null)) {
      e.cancelPendingCommit = Z(
        vp.bind(
          null,
          e,
          t,
          s,
          n,
          a,
          r,
          d,
          g,
          E,
          Y,
          1,
          B,
          q
        )
      ), rl(e, s, d, !L);
      return;
    }
    vp(
      e,
      t,
      s,
      n,
      a,
      r,
      d,
      g,
      E
    );
  }
  function aS(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var r = n[a], s = r.getSnapshot;
          r = r.value;
          try {
            if (!jt(s(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function rl(e, t, n, a) {
    t &= ~mc, t &= ~Jl, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var r = t; 0 < r; ) {
      var s = 31 - zt(r), d = 1 << s;
      a[s] = -1, r &= ~d;
    }
    n !== 0 && Sd(e, n, t);
  }
  function Uo() {
    return (Be & 6) === 0 ? (cr(0), !1) : !0;
  }
  function Sc() {
    if (Ce !== null) {
      if (qe === 0)
        var e = Ce.return;
      else
        e = Ce, On = kl = null, Ls(e), Ba = null, er = 0, e = Ce;
      for (; e !== null; )
        Ym(e.alternate, e), e = e.return;
      Ce = null;
    }
  }
  function Za(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, ES(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Sc(), Xe = e, Ce = n = An(e.current, null), Ne = t, qe = 0, Bt = null, nl = !1, Ya = Ri(e, t), hc = !1, ka = Ft = mc = Jl = ll = Fe = 0, Mt = ur = null, pc = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var r = 31 - zt(a), s = 1 << r;
        t |= e[r], a &= ~s;
      }
    return Hn = t, no(), n;
  }
  function cp(e, t) {
    Ee = null, j.H = Eo, t === Xi || t === fo ? (t = Ch(), qe = 3) : t === Th ? (t = Ch(), qe = 4) : qe = t === Om ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Bt = t, Ce === null && (Fe = 1, Co(
      e,
      Xt(t, e.current)
    ));
  }
  function fp() {
    var e = j.H;
    return j.H = Eo, e === null ? Eo : e;
  }
  function dp() {
    var e = j.A;
    return j.A = nS, e;
  }
  function xc() {
    Fe = 4, nl || (Ne & 4194048) !== Ne && Jt.current !== null || (Ya = !0), (ll & 134217727) === 0 && (Jl & 134217727) === 0 || Xe === null || rl(
      Xe,
      Ne,
      Ft,
      !1
    );
  }
  function Ec(e, t, n) {
    var a = Be;
    Be |= 2;
    var r = fp(), s = dp();
    (Xe !== e || Ne !== t) && (jo = null, Za(e, t)), t = !1;
    var d = Fe;
    e: do
      try {
        if (qe !== 0 && Ce !== null) {
          var g = Ce, E = Bt;
          switch (qe) {
            case 8:
              Sc(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Jt.current === null && (t = !0);
              var L = qe;
              if (qe = 0, Bt = null, Ka(e, g, E, L), n && Ya) {
                d = 0;
                break e;
              }
              break;
            default:
              L = qe, qe = 0, Bt = null, Ka(e, g, E, L);
          }
        }
        iS(), d = Fe;
        break;
      } catch (Y) {
        cp(e, Y);
      }
    while (!0);
    return t && e.shellSuspendCounter++, On = kl = null, Be = a, j.H = r, j.A = s, Ce === null && (Xe = null, Ne = 0, no()), d;
  }
  function iS() {
    for (; Ce !== null; ) hp(Ce);
  }
  function rS(e, t) {
    var n = Be;
    Be |= 2;
    var a = fp(), r = dp();
    Xe !== e || Ne !== t ? (jo = null, zo = pt() + 500, Za(e, t)) : Ya = Ri(
      e,
      t
    );
    e: do
      try {
        if (qe !== 0 && Ce !== null) {
          t = Ce;
          var s = Bt;
          t: switch (qe) {
            case 1:
              qe = 0, Bt = null, Ka(e, t, s, 1);
              break;
            case 2:
            case 9:
              if (Ah(s)) {
                qe = 0, Bt = null, mp(t);
                break;
              }
              t = function() {
                qe !== 2 && qe !== 9 || Xe !== e || (qe = 7), mn(e);
              }, s.then(t, t);
              break e;
            case 3:
              qe = 7;
              break e;
            case 4:
              qe = 5;
              break e;
            case 7:
              Ah(s) ? (qe = 0, Bt = null, mp(t)) : (qe = 0, Bt = null, Ka(e, t, s, 7));
              break;
            case 5:
              var d = null;
              switch (Ce.tag) {
                case 26:
                  d = Ce.memoizedState;
                case 5:
                case 27:
                  var g = Ce;
                  if (!d || Jp(d)) {
                    qe = 0, Bt = null;
                    var E = g.sibling;
                    if (E !== null) Ce = E;
                    else {
                      var L = g.return;
                      L !== null ? (Ce = L, Ho(L)) : Ce = null;
                    }
                    break t;
                  }
              }
              qe = 0, Bt = null, Ka(e, t, s, 5);
              break;
            case 6:
              qe = 0, Bt = null, Ka(e, t, s, 6);
              break;
            case 8:
              Sc(), Fe = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        oS();
        break;
      } catch (Y) {
        cp(e, Y);
      }
    while (!0);
    return On = kl = null, j.H = a, j.A = r, Be = n, Ce !== null ? 0 : (Xe = null, Ne = 0, no(), Fe);
  }
  function oS() {
    for (; Ce !== null && !Dl(); )
      hp(Ce);
  }
  function hp(e) {
    var t = Gm(e.alternate, e, Hn);
    e.memoizedProps = e.pendingProps, t === null ? Ho(e) : Ce = t;
  }
  function mp(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = jm(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ne
        );
        break;
      case 11:
        t = jm(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ne
        );
        break;
      case 5:
        Ls(t);
      default:
        Ym(n, t), t = Ce = ph(t, Hn), t = Gm(n, t, Hn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Ho(e) : Ce = t;
  }
  function Ka(e, t, n, a) {
    On = kl = null, Ls(t), Ba = null, er = 0;
    var r = t.return;
    try {
      if (F0(
        e,
        r,
        t,
        n,
        Ne
      )) {
        Fe = 1, Co(
          e,
          Xt(n, e.current)
        ), Ce = null;
        return;
      }
    } catch (s) {
      if (r !== null) throw Ce = r, s;
      Fe = 1, Co(
        e,
        Xt(n, e.current)
      ), Ce = null;
      return;
    }
    t.flags & 32768 ? (je || a === 1 ? e = !0 : Ya || (Ne & 536870912) !== 0 ? e = !1 : (nl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Jt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), pp(t, e)) : Ho(t);
  }
  function Ho(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        pp(
          t,
          nl
        );
        return;
      }
      e = t.return;
      var n = $0(
        t.alternate,
        t,
        Hn
      );
      if (n !== null) {
        Ce = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ce = t;
        return;
      }
      Ce = t = e;
    } while (t !== null);
    Fe === 0 && (Fe = 5);
  }
  function pp(e, t) {
    do {
      var n = I0(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, Ce = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ce = e;
        return;
      }
      Ce = e = n;
    } while (e !== null);
    Fe = 6, Ce = null;
  }
  function vp(e, t, n, a, r, s, d, g, E) {
    e.cancelPendingCommit = null;
    do
      Lo();
    while (dt !== 0);
    if ((Be & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (s = t.lanes | t.childLanes, s |= ds, qb(
        e,
        n,
        s,
        d,
        g,
        E
      ), e === Xe && (Ce = Xe = null, Ne = 0), Va = t, il = e, Xa = n, gc = s, yc = r, rp = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, fS(Qr, function() {
        return xp(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = j.T, j.T = null, r = P.p, P.p = 2, d = Be, Be |= 4;
        try {
          eS(e, t, n);
        } finally {
          Be = d, P.p = r, j.T = a;
        }
      }
      dt = 1, gp(), yp(), bp();
    }
  }
  function gp() {
    if (dt === 1) {
      dt = 0;
      var e = il, t = Va, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = j.T, j.T = null;
        var a = P.p;
        P.p = 2;
        var r = Be;
        Be |= 4;
        try {
          Im(t, e);
          var s = jc, d = ih(e.containerInfo), g = s.focusedElem, E = s.selectionRange;
          if (d !== g && g && g.ownerDocument && ah(
            g.ownerDocument.documentElement,
            g
          )) {
            if (E !== null && os(g)) {
              var L = E.start, Y = E.end;
              if (Y === void 0 && (Y = L), "selectionStart" in g)
                g.selectionStart = L, g.selectionEnd = Math.min(
                  Y,
                  g.value.length
                );
              else {
                var Z = g.ownerDocument || document, B = Z && Z.defaultView || window;
                if (B.getSelection) {
                  var q = B.getSelection(), me = g.textContent.length, de = Math.min(E.start, me), Ye = E.end === void 0 ? de : Math.min(E.end, me);
                  !q.extend && de > Ye && (d = Ye, Ye = de, de = d);
                  var D = lh(
                    g,
                    de
                  ), O = lh(
                    g,
                    Ye
                  );
                  if (D && O && (q.rangeCount !== 1 || q.anchorNode !== D.node || q.anchorOffset !== D.offset || q.focusNode !== O.node || q.focusOffset !== O.offset)) {
                    var U = Z.createRange();
                    U.setStart(D.node, D.offset), q.removeAllRanges(), de > Ye ? (q.addRange(U), q.extend(O.node, O.offset)) : (U.setEnd(O.node, O.offset), q.addRange(U));
                  }
                }
              }
            }
            for (Z = [], q = g; q = q.parentNode; )
              q.nodeType === 1 && Z.push({
                element: q,
                left: q.scrollLeft,
                top: q.scrollTop
              });
            for (typeof g.focus == "function" && g.focus(), g = 0; g < Z.length; g++) {
              var V = Z[g];
              V.element.scrollLeft = V.left, V.element.scrollTop = V.top;
            }
          }
          Jo = !!zc, jc = zc = null;
        } finally {
          Be = r, P.p = a, j.T = n;
        }
      }
      e.current = t, dt = 2;
    }
  }
  function yp() {
    if (dt === 2) {
      dt = 0;
      var e = il, t = Va, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = j.T, j.T = null;
        var a = P.p;
        P.p = 2;
        var r = Be;
        Be |= 4;
        try {
          Jm(e, t.alternate, t);
        } finally {
          Be = r, P.p = a, j.T = n;
        }
      }
      dt = 3;
    }
  }
  function bp() {
    if (dt === 4 || dt === 3) {
      dt = 0, _l();
      var e = il, t = Va, n = Xa, a = rp;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? dt = 5 : (dt = 0, Va = il = null, Sp(e, e.pendingLanes));
      var r = e.pendingLanes;
      if (r === 0 && (al = null), Gu(n), t = t.stateNode, Nt && typeof Nt.onCommitFiberRoot == "function")
        try {
          Nt.onCommitFiberRoot(
            Ai,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = j.T, r = P.p, P.p = 2, j.T = null;
        try {
          for (var s = e.onRecoverableError, d = 0; d < a.length; d++) {
            var g = a[d];
            s(g.value, {
              componentStack: g.stack
            });
          }
        } finally {
          j.T = t, P.p = r;
        }
      }
      (Xa & 3) !== 0 && Lo(), mn(e), r = e.pendingLanes, (n & 4194090) !== 0 && (r & 42) !== 0 ? e === bc ? sr++ : (sr = 0, bc = e) : sr = 0, cr(0);
    }
  }
  function Sp(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ki(t)));
  }
  function Lo(e) {
    return gp(), yp(), bp(), xp();
  }
  function xp() {
    if (dt !== 5) return !1;
    var e = il, t = gc;
    gc = 0;
    var n = Gu(Xa), a = j.T, r = P.p;
    try {
      P.p = 32 > n ? 32 : n, j.T = null, n = yc, yc = null;
      var s = il, d = Xa;
      if (dt = 0, Va = il = null, Xa = 0, (Be & 6) !== 0) throw Error(u(331));
      var g = Be;
      if (Be |= 4, ap(s.current), tp(
        s,
        s.current,
        d,
        n
      ), Be = g, cr(0, !1), Nt && typeof Nt.onPostCommitFiberRoot == "function")
        try {
          Nt.onPostCommitFiberRoot(Ai, s);
        } catch {
        }
      return !0;
    } finally {
      P.p = r, j.T = a, Sp(e, t);
    }
  }
  function Ep(e, t, n) {
    t = Xt(n, t), t = Ws(e.stateNode, t, 2), e = Jn(e, t, 2), e !== null && (Ci(e, 2), mn(e));
  }
  function Ve(e, t, n) {
    if (e.tag === 3)
      Ep(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ep(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (al === null || !al.has(a))) {
            e = Xt(n, e), n = Rm(2), a = Jn(t, n, 2), a !== null && (Cm(
              n,
              a,
              t,
              e
            ), Ci(a, 2), mn(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function wc(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new lS();
      var r = /* @__PURE__ */ new Set();
      a.set(t, r);
    } else
      r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r));
    r.has(n) || (hc = !0, r.add(n), e = uS.bind(null, e, t, n), t.then(e, e));
  }
  function uS(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Xe === e && (Ne & n) === n && (Fe === 4 || Fe === 3 && (Ne & 62914560) === Ne && 300 > pt() - vc ? (Be & 2) === 0 && Za(e, 0) : mc |= n, ka === Ne && (ka = 0)), mn(e);
  }
  function wp(e, t) {
    t === 0 && (t = bd()), e = Oa(e, t), e !== null && (Ci(e, t), mn(e));
  }
  function sS(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), wp(e, n);
  }
  function cS(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode, r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    a !== null && a.delete(t), wp(e, n);
  }
  function fS(e, t) {
    return ct(e, t);
  }
  var Bo = null, Pa = null, Tc = !1, qo = !1, Ac = !1, Fl = 0;
  function mn(e) {
    e !== Pa && e.next === null && (Pa === null ? Bo = Pa = e : Pa = Pa.next = e), qo = !0, Tc || (Tc = !0, hS());
  }
  function cr(e, t) {
    if (!Ac && qo) {
      Ac = !0;
      do
        for (var n = !1, a = Bo; a !== null; ) {
          if (e !== 0) {
            var r = a.pendingLanes;
            if (r === 0) var s = 0;
            else {
              var d = a.suspendedLanes, g = a.pingedLanes;
              s = (1 << 31 - zt(42 | e) + 1) - 1, s &= r & ~(d & ~g), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (n = !0, Cp(a, s));
          } else
            s = Ne, s = Vr(
              a,
              a === Xe ? s : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (s & 3) === 0 || Ri(a, s) || (n = !0, Cp(a, s));
          a = a.next;
        }
      while (n);
      Ac = !1;
    }
  }
  function dS() {
    Tp();
  }
  function Tp() {
    qo = Tc = !1;
    var e = 0;
    Fl !== 0 && (xS() && (e = Fl), Fl = 0);
    for (var t = pt(), n = null, a = Bo; a !== null; ) {
      var r = a.next, s = Ap(a, t);
      s === 0 ? (a.next = null, n === null ? Bo = r : n.next = r, r === null && (Pa = n)) : (n = a, (e !== 0 || (s & 3) !== 0) && (qo = !0)), a = r;
    }
    cr(e);
  }
  function Ap(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, r = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
      var d = 31 - zt(s), g = 1 << d, E = r[d];
      E === -1 ? ((g & n) === 0 || (g & a) !== 0) && (r[d] = Bb(g, t)) : E <= t && (e.expiredLanes |= g), s &= ~g;
    }
    if (t = Xe, n = Ne, n = Vr(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, n === 0 || e === t && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && Tt(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Ri(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (a !== null && Tt(a), Gu(n)) {
        case 2:
        case 8:
          n = vd;
          break;
        case 32:
          n = Qr;
          break;
        case 268435456:
          n = gd;
          break;
        default:
          n = Qr;
      }
      return a = Rp.bind(null, e), n = ct(n, a), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return a !== null && a !== null && Tt(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Rp(e, t) {
    if (dt !== 0 && dt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Lo() && e.callbackNode !== n)
      return null;
    var a = Ne;
    return a = Vr(
      e,
      e === Xe ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (up(e, a, t), Ap(e, pt()), e.callbackNode != null && e.callbackNode === n ? Rp.bind(null, e) : null);
  }
  function Cp(e, t) {
    if (Lo()) return null;
    up(e, t, !0);
  }
  function hS() {
    wS(function() {
      (Be & 6) !== 0 ? ct(
        Nl,
        dS
      ) : Tp();
    });
  }
  function Rc() {
    return Fl === 0 && (Fl = yd()), Fl;
  }
  function Op(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Jr("" + e);
  }
  function Mp(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function mS(e, t, n, a, r) {
    if (t === "submit" && n && n.stateNode === r) {
      var s = Op(
        (r[At] || null).action
      ), d = a.submitter;
      d && (t = (t = d[At] || null) ? Op(t.formAction) : d.getAttribute("formAction"), t !== null && (s = t, d = null));
      var g = new Ir(
        "action",
        "action",
        null,
        a,
        r
      );
      e.push({
        event: g,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Fl !== 0) {
                  var E = d ? Mp(r, d) : new FormData(r);
                  Zs(
                    n,
                    {
                      pending: !0,
                      data: E,
                      method: r.method,
                      action: s
                    },
                    null,
                    E
                  );
                }
              } else
                typeof s == "function" && (g.preventDefault(), E = d ? Mp(r, d) : new FormData(r), Zs(
                  n,
                  {
                    pending: !0,
                    data: E,
                    method: r.method,
                    action: s
                  },
                  s,
                  E
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var Cc = 0; Cc < fs.length; Cc++) {
    var Oc = fs[Cc], pS = Oc.toLowerCase(), vS = Oc[0].toUpperCase() + Oc.slice(1);
    It(
      pS,
      "on" + vS
    );
  }
  It(uh, "onAnimationEnd"), It(sh, "onAnimationIteration"), It(ch, "onAnimationStart"), It("dblclick", "onDoubleClick"), It("focusin", "onFocus"), It("focusout", "onBlur"), It(z0, "onTransitionRun"), It(j0, "onTransitionStart"), It(U0, "onTransitionCancel"), It(fh, "onTransitionEnd"), ya("onMouseEnter", ["mouseout", "mouseover"]), ya("onMouseLeave", ["mouseout", "mouseover"]), ya("onPointerEnter", ["pointerout", "pointerover"]), ya("onPointerLeave", ["pointerout", "pointerover"]), jl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), jl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), jl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), jl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), jl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), jl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var fr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), gS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fr)
  );
  function Dp(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n], r = a.event;
      a = a.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var g = a[d], E = g.instance, L = g.currentTarget;
            if (g = g.listener, E !== s && r.isPropagationStopped())
              break e;
            s = g, r.currentTarget = L;
            try {
              s(r);
            } catch (Y) {
              Ro(Y);
            }
            r.currentTarget = null, s = E;
          }
        else
          for (d = 0; d < a.length; d++) {
            if (g = a[d], E = g.instance, L = g.currentTarget, g = g.listener, E !== s && r.isPropagationStopped())
              break e;
            s = g, r.currentTarget = L;
            try {
              s(r);
            } catch (Y) {
              Ro(Y);
            }
            r.currentTarget = null, s = E;
          }
      }
    }
  }
  function Oe(e, t) {
    var n = t[Qu];
    n === void 0 && (n = t[Qu] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    n.has(a) || (_p(t, e, 2, !1), n.add(a));
  }
  function Mc(e, t, n) {
    var a = 0;
    t && (a |= 4), _p(
      n,
      e,
      a,
      t
    );
  }
  var Go = "_reactListening" + Math.random().toString(36).slice(2);
  function Dc(e) {
    if (!e[Go]) {
      e[Go] = !0, Td.forEach(function(n) {
        n !== "selectionchange" && (gS.has(n) || Mc(n, !1, e), Mc(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Go] || (t[Go] = !0, Mc("selectionchange", !1, t));
    }
  }
  function _p(e, t, n, a) {
    switch (tv(t)) {
      case 2:
        var r = VS;
        break;
      case 8:
        r = XS;
        break;
      default:
        r = Vc;
    }
    n = r.bind(
      null,
      t,
      n,
      e
    ), r = void 0, !$u || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (r = !0), a ? r !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: r
    }) : e.addEventListener(t, n, !0) : r !== void 0 ? e.addEventListener(t, n, {
      passive: r
    }) : e.addEventListener(t, n, !1);
  }
  function _c(e, t, n, a, r) {
    var s = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var d = a.tag;
        if (d === 3 || d === 4) {
          var g = a.stateNode.containerInfo;
          if (g === r) break;
          if (d === 4)
            for (d = a.return; d !== null; ) {
              var E = d.tag;
              if ((E === 3 || E === 4) && d.stateNode.containerInfo === r)
                return;
              d = d.return;
            }
          for (; g !== null; ) {
            if (d = pa(g), d === null) return;
            if (E = d.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              a = s = d;
              continue e;
            }
            g = g.parentNode;
          }
        }
        a = a.return;
      }
    Bd(function() {
      var L = s, Y = Fu(n), Z = [];
      e: {
        var B = dh.get(e);
        if (B !== void 0) {
          var q = Ir, me = e;
          switch (e) {
            case "keypress":
              if (Wr(n) === 0) break e;
            case "keydown":
            case "keyup":
              q = f0;
              break;
            case "focusin":
              me = "focus", q = ns;
              break;
            case "focusout":
              me = "blur", q = ns;
              break;
            case "beforeblur":
            case "afterblur":
              q = ns;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = Qd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = Ib;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = m0;
              break;
            case uh:
            case sh:
            case ch:
              q = n0;
              break;
            case fh:
              q = v0;
              break;
            case "scroll":
            case "scrollend":
              q = Wb;
              break;
            case "wheel":
              q = y0;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = a0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = kd;
              break;
            case "toggle":
            case "beforetoggle":
              q = S0;
          }
          var de = (t & 4) !== 0, Ye = !de && (e === "scroll" || e === "scrollend"), D = de ? B !== null ? B + "Capture" : null : B;
          de = [];
          for (var O = L, U; O !== null; ) {
            var V = O;
            if (U = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || U === null || D === null || (V = Di(O, D), V != null && de.push(
              dr(O, V, U)
            )), Ye) break;
            O = O.return;
          }
          0 < de.length && (B = new q(
            B,
            me,
            null,
            n,
            Y
          ), Z.push({ event: B, listeners: de }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (B = e === "mouseover" || e === "pointerover", q = e === "mouseout" || e === "pointerout", B && n !== Ju && (me = n.relatedTarget || n.fromElement) && (pa(me) || me[ma]))
            break e;
          if ((q || B) && (B = Y.window === Y ? Y : (B = Y.ownerDocument) ? B.defaultView || B.parentWindow : window, q ? (me = n.relatedTarget || n.toElement, q = L, me = me ? pa(me) : null, me !== null && (Ye = f(me), de = me.tag, me !== Ye || de !== 5 && de !== 27 && de !== 6) && (me = null)) : (q = null, me = L), q !== me)) {
            if (de = Qd, V = "onMouseLeave", D = "onMouseEnter", O = "mouse", (e === "pointerout" || e === "pointerover") && (de = kd, V = "onPointerLeave", D = "onPointerEnter", O = "pointer"), Ye = q == null ? B : Mi(q), U = me == null ? B : Mi(me), B = new de(
              V,
              O + "leave",
              q,
              n,
              Y
            ), B.target = Ye, B.relatedTarget = U, V = null, pa(Y) === L && (de = new de(
              D,
              O + "enter",
              me,
              n,
              Y
            ), de.target = U, de.relatedTarget = Ye, V = de), Ye = V, q && me)
              t: {
                for (de = q, D = me, O = 0, U = de; U; U = Ja(U))
                  O++;
                for (U = 0, V = D; V; V = Ja(V))
                  U++;
                for (; 0 < O - U; )
                  de = Ja(de), O--;
                for (; 0 < U - O; )
                  D = Ja(D), U--;
                for (; O--; ) {
                  if (de === D || D !== null && de === D.alternate)
                    break t;
                  de = Ja(de), D = Ja(D);
                }
                de = null;
              }
            else de = null;
            q !== null && Np(
              Z,
              B,
              q,
              de,
              !1
            ), me !== null && Ye !== null && Np(
              Z,
              Ye,
              me,
              de,
              !0
            );
          }
        }
        e: {
          if (B = L ? Mi(L) : window, q = B.nodeName && B.nodeName.toLowerCase(), q === "select" || q === "input" && B.type === "file")
            var le = Wd;
          else if (Jd(B))
            if ($d)
              le = D0;
            else {
              le = O0;
              var Te = C0;
            }
          else
            q = B.nodeName, !q || q.toLowerCase() !== "input" || B.type !== "checkbox" && B.type !== "radio" ? L && Pu(L.elementType) && (le = Wd) : le = M0;
          if (le && (le = le(e, L))) {
            Fd(
              Z,
              le,
              n,
              Y
            );
            break e;
          }
          Te && Te(e, B, L), e === "focusout" && L && B.type === "number" && L.memoizedProps.value != null && Ku(B, "number", B.value);
        }
        switch (Te = L ? Mi(L) : window, e) {
          case "focusin":
            (Jd(Te) || Te.contentEditable === "true") && (Aa = Te, us = L, Bi = null);
            break;
          case "focusout":
            Bi = us = Aa = null;
            break;
          case "mousedown":
            ss = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ss = !1, rh(Z, n, Y);
            break;
          case "selectionchange":
            if (N0) break;
          case "keydown":
          case "keyup":
            rh(Z, n, Y);
        }
        var oe;
        if (as)
          e: {
            switch (e) {
              case "compositionstart":
                var he = "onCompositionStart";
                break e;
              case "compositionend":
                he = "onCompositionEnd";
                break e;
              case "compositionupdate":
                he = "onCompositionUpdate";
                break e;
            }
            he = void 0;
          }
        else
          Ta ? Kd(e, n) && (he = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (he = "onCompositionStart");
        he && (Vd && n.locale !== "ko" && (Ta || he !== "onCompositionStart" ? he === "onCompositionEnd" && Ta && (oe = qd()) : (Xn = Y, Iu = "value" in Xn ? Xn.value : Xn.textContent, Ta = !0)), Te = Qo(L, he), 0 < Te.length && (he = new Yd(
          he,
          e,
          null,
          n,
          Y
        ), Z.push({ event: he, listeners: Te }), oe ? he.data = oe : (oe = Pd(n), oe !== null && (he.data = oe)))), (oe = E0 ? w0(e, n) : T0(e, n)) && (he = Qo(L, "onBeforeInput"), 0 < he.length && (Te = new Yd(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          Y
        ), Z.push({
          event: Te,
          listeners: he
        }), Te.data = oe)), mS(
          Z,
          e,
          L,
          n,
          Y
        );
      }
      Dp(Z, t);
    });
  }
  function dr(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Qo(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var r = e, s = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || s === null || (r = Di(e, n), r != null && a.unshift(
        dr(e, r, s)
      ), r = Di(e, t), r != null && a.push(
        dr(e, r, s)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function Ja(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Np(e, t, n, a, r) {
    for (var s = t._reactName, d = []; n !== null && n !== a; ) {
      var g = n, E = g.alternate, L = g.stateNode;
      if (g = g.tag, E !== null && E === a) break;
      g !== 5 && g !== 26 && g !== 27 || L === null || (E = L, r ? (L = Di(n, s), L != null && d.unshift(
        dr(n, L, E)
      )) : r || (L = Di(n, s), L != null && d.push(
        dr(n, L, E)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var yS = /\r\n?/g, bS = /\u0000|\uFFFD/g;
  function zp(e) {
    return (typeof e == "string" ? e : "" + e).replace(yS, `
`).replace(bS, "");
  }
  function jp(e, t) {
    return t = zp(t), zp(e) === t;
  }
  function Yo() {
  }
  function Qe(e, t, n, a, r, s) {
    switch (n) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || xa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && xa(e, "" + a);
        break;
      case "className":
        Zr(e, "class", a);
        break;
      case "tabIndex":
        Zr(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Zr(e, n, a);
        break;
      case "style":
        Hd(e, a, s);
        break;
      case "data":
        if (t !== "object") {
          Zr(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = Jr("" + a), e.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == "function" && (n === "formAction" ? (t !== "input" && Qe(e, t, "name", r.name, r, null), Qe(
            e,
            t,
            "formEncType",
            r.formEncType,
            r,
            null
          ), Qe(
            e,
            t,
            "formMethod",
            r.formMethod,
            r,
            null
          ), Qe(
            e,
            t,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (Qe(e, t, "encType", r.encType, r, null), Qe(e, t, "method", r.method, r, null), Qe(e, t, "target", r.target, r, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = Jr("" + a), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = Yo);
        break;
      case "onScroll":
        a != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(u(61));
          if (n = a.__html, n != null) {
            if (r.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Jr("" + a), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "" + a) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(n, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(n) : e.setAttribute(n, a);
        break;
      case "popover":
        Oe("beforetoggle", e), Oe("toggle", e), Xr(e, "popover", a);
        break;
      case "xlinkActuate":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Xr(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Jb.get(n) || n, Xr(e, n, a));
    }
  }
  function Nc(e, t, n, a, r, s) {
    switch (n) {
      case "style":
        Hd(e, a, s);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(u(61));
          if (n = a.__html, n != null) {
            if (r.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? xa(e, a) : (typeof a == "number" || typeof a == "bigint") && xa(e, "" + a);
        break;
      case "onScroll":
        a != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Oe("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Yo);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ad.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (r = n.endsWith("Capture"), t = n.slice(2, r ? n.length - 7 : void 0), s = e[At] || null, s = s != null ? s[n] : null, typeof s == "function" && e.removeEventListener(t, s, r), typeof a == "function")) {
              typeof s != "function" && s !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, a, r);
              break e;
            }
            n in e ? e[n] = a : a === !0 ? e.setAttribute(n, "") : Xr(e, n, a);
          }
    }
  }
  function ht(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Oe("error", e), Oe("load", e);
        var a = !1, r = !1, s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var d = n[s];
            if (d != null)
              switch (s) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Qe(e, t, s, d, n, null);
              }
          }
        r && Qe(e, t, "srcSet", n.srcSet, n, null), a && Qe(e, t, "src", n.src, n, null);
        return;
      case "input":
        Oe("invalid", e);
        var g = s = d = r = null, E = null, L = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var Y = n[a];
            if (Y != null)
              switch (a) {
                case "name":
                  r = Y;
                  break;
                case "type":
                  d = Y;
                  break;
                case "checked":
                  E = Y;
                  break;
                case "defaultChecked":
                  L = Y;
                  break;
                case "value":
                  s = Y;
                  break;
                case "defaultValue":
                  g = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Qe(e, t, a, Y, n, null);
              }
          }
        Nd(
          e,
          s,
          g,
          E,
          L,
          d,
          r,
          !1
        ), Kr(e);
        return;
      case "select":
        Oe("invalid", e), a = d = s = null;
        for (r in n)
          if (n.hasOwnProperty(r) && (g = n[r], g != null))
            switch (r) {
              case "value":
                s = g;
                break;
              case "defaultValue":
                d = g;
                break;
              case "multiple":
                a = g;
              default:
                Qe(e, t, r, g, n, null);
            }
        t = s, n = d, e.multiple = !!a, t != null ? Sa(e, !!a, t, !1) : n != null && Sa(e, !!a, n, !0);
        return;
      case "textarea":
        Oe("invalid", e), s = r = a = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (g = n[d], g != null))
            switch (d) {
              case "value":
                a = g;
                break;
              case "defaultValue":
                r = g;
                break;
              case "children":
                s = g;
                break;
              case "dangerouslySetInnerHTML":
                if (g != null) throw Error(u(91));
                break;
              default:
                Qe(e, t, d, g, n, null);
            }
        jd(e, a, r, s), Kr(e);
        return;
      case "option":
        for (E in n)
          if (n.hasOwnProperty(E) && (a = n[E], a != null))
            switch (E) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Qe(e, t, E, a, n, null);
            }
        return;
      case "dialog":
        Oe("beforetoggle", e), Oe("toggle", e), Oe("cancel", e), Oe("close", e);
        break;
      case "iframe":
      case "object":
        Oe("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < fr.length; a++)
          Oe(fr[a], e);
        break;
      case "image":
        Oe("error", e), Oe("load", e);
        break;
      case "details":
        Oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Oe("error", e), Oe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (L in n)
          if (n.hasOwnProperty(L) && (a = n[L], a != null))
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Qe(e, t, L, a, n, null);
            }
        return;
      default:
        if (Pu(t)) {
          for (Y in n)
            n.hasOwnProperty(Y) && (a = n[Y], a !== void 0 && Nc(
              e,
              t,
              Y,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (g in n)
      n.hasOwnProperty(g) && (a = n[g], a != null && Qe(e, t, g, a, n, null));
  }
  function SS(e, t, n, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var r = null, s = null, d = null, g = null, E = null, L = null, Y = null;
        for (q in n) {
          var Z = n[q];
          if (n.hasOwnProperty(q) && Z != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = Z;
              default:
                a.hasOwnProperty(q) || Qe(e, t, q, null, a, Z);
            }
        }
        for (var B in a) {
          var q = a[B];
          if (Z = n[B], a.hasOwnProperty(B) && (q != null || Z != null))
            switch (B) {
              case "type":
                s = q;
                break;
              case "name":
                r = q;
                break;
              case "checked":
                L = q;
                break;
              case "defaultChecked":
                Y = q;
                break;
              case "value":
                d = q;
                break;
              case "defaultValue":
                g = q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null)
                  throw Error(u(137, t));
                break;
              default:
                q !== Z && Qe(
                  e,
                  t,
                  B,
                  q,
                  a,
                  Z
                );
            }
        }
        Zu(
          e,
          d,
          g,
          E,
          L,
          Y,
          s,
          r
        );
        return;
      case "select":
        q = d = g = B = null;
        for (s in n)
          if (E = n[s], n.hasOwnProperty(s) && E != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                q = E;
              default:
                a.hasOwnProperty(s) || Qe(
                  e,
                  t,
                  s,
                  null,
                  a,
                  E
                );
            }
        for (r in a)
          if (s = a[r], E = n[r], a.hasOwnProperty(r) && (s != null || E != null))
            switch (r) {
              case "value":
                B = s;
                break;
              case "defaultValue":
                g = s;
                break;
              case "multiple":
                d = s;
              default:
                s !== E && Qe(
                  e,
                  t,
                  r,
                  s,
                  a,
                  E
                );
            }
        t = g, n = d, a = q, B != null ? Sa(e, !!n, B, !1) : !!a != !!n && (t != null ? Sa(e, !!n, t, !0) : Sa(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        q = B = null;
        for (g in n)
          if (r = n[g], n.hasOwnProperty(g) && r != null && !a.hasOwnProperty(g))
            switch (g) {
              case "value":
                break;
              case "children":
                break;
              default:
                Qe(e, t, g, null, a, r);
            }
        for (d in a)
          if (r = a[d], s = n[d], a.hasOwnProperty(d) && (r != null || s != null))
            switch (d) {
              case "value":
                B = r;
                break;
              case "defaultValue":
                q = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(u(91));
                break;
              default:
                r !== s && Qe(e, t, d, r, a, s);
            }
        zd(e, B, q);
        return;
      case "option":
        for (var me in n)
          if (B = n[me], n.hasOwnProperty(me) && B != null && !a.hasOwnProperty(me))
            switch (me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Qe(
                  e,
                  t,
                  me,
                  null,
                  a,
                  B
                );
            }
        for (E in a)
          if (B = a[E], q = n[E], a.hasOwnProperty(E) && B !== q && (B != null || q != null))
            switch (E) {
              case "selected":
                e.selected = B && typeof B != "function" && typeof B != "symbol";
                break;
              default:
                Qe(
                  e,
                  t,
                  E,
                  B,
                  a,
                  q
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var de in n)
          B = n[de], n.hasOwnProperty(de) && B != null && !a.hasOwnProperty(de) && Qe(e, t, de, null, a, B);
        for (L in a)
          if (B = a[L], q = n[L], a.hasOwnProperty(L) && B !== q && (B != null || q != null))
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null)
                  throw Error(u(137, t));
                break;
              default:
                Qe(
                  e,
                  t,
                  L,
                  B,
                  a,
                  q
                );
            }
        return;
      default:
        if (Pu(t)) {
          for (var Ye in n)
            B = n[Ye], n.hasOwnProperty(Ye) && B !== void 0 && !a.hasOwnProperty(Ye) && Nc(
              e,
              t,
              Ye,
              void 0,
              a,
              B
            );
          for (Y in a)
            B = a[Y], q = n[Y], !a.hasOwnProperty(Y) || B === q || B === void 0 && q === void 0 || Nc(
              e,
              t,
              Y,
              B,
              a,
              q
            );
          return;
        }
    }
    for (var D in n)
      B = n[D], n.hasOwnProperty(D) && B != null && !a.hasOwnProperty(D) && Qe(e, t, D, null, a, B);
    for (Z in a)
      B = a[Z], q = n[Z], !a.hasOwnProperty(Z) || B === q || B == null && q == null || Qe(e, t, Z, B, a, q);
  }
  var zc = null, jc = null;
  function ko(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Up(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Hp(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Uc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Hc = null;
  function xS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Hc ? !1 : (Hc = e, !0) : (Hc = null, !1);
  }
  var Lp = typeof setTimeout == "function" ? setTimeout : void 0, ES = typeof clearTimeout == "function" ? clearTimeout : void 0, Bp = typeof Promise == "function" ? Promise : void 0, wS = typeof queueMicrotask == "function" ? queueMicrotask : typeof Bp < "u" ? function(e) {
    return Bp.resolve(null).then(e).catch(TS);
  } : Lp;
  function TS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ol(e) {
    return e === "head";
  }
  function qp(e, t) {
    var n = t, a = 0, r = 0;
    do {
      var s = n.nextSibling;
      if (e.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$") {
          if (0 < a && 8 > a) {
            n = a;
            var d = e.ownerDocument;
            if (n & 1 && hr(d.documentElement), n & 2 && hr(d.body), n & 4)
              for (n = d.head, hr(n), d = n.firstChild; d; ) {
                var g = d.nextSibling, E = d.nodeName;
                d[Oi] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && d.rel.toLowerCase() === "stylesheet" || n.removeChild(d), d = g;
              }
          }
          if (r === 0) {
            e.removeChild(s), xr(t);
            return;
          }
          r--;
        } else
          n === "$" || n === "$?" || n === "$!" ? r++ : a = n.charCodeAt(0) - 48;
      else a = 0;
      n = s;
    } while (n);
    xr(t);
  }
  function Lc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Lc(n), Yu(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function AS(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var r = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[Oi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (s = e.getAttribute("rel"), s === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (s !== r.rel || e.getAttribute("href") !== (r.href == null || r.href === "" ? null : r.href) || e.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin) || e.getAttribute("title") !== (r.title == null ? null : r.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (s = e.getAttribute("src"), (s !== (r.src == null ? null : r.src) || e.getAttribute("type") !== (r.type == null ? null : r.type) || e.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin)) && s && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var s = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && e.getAttribute("name") === s)
          return e;
      } else return e;
      if (e = tn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function RS(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = tn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Bc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState === "complete";
  }
  function CS(e, t) {
    var n = e.ownerDocument;
    if (e.data !== "$?" || n.readyState === "complete")
      t();
    else {
      var a = function() {
        t(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
    }
  }
  function tn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var qc = null;
  function Gp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Qp(e, t, n) {
    switch (t = ko(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function hr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Yu(e);
  }
  var Wt = /* @__PURE__ */ new Map(), Yp = /* @__PURE__ */ new Set();
  function Vo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ln = P.d;
  P.d = {
    f: OS,
    r: MS,
    D: DS,
    C: _S,
    L: NS,
    m: zS,
    X: US,
    S: jS,
    M: HS
  };
  function OS() {
    var e = Ln.f(), t = Uo();
    return e || t;
  }
  function MS(e) {
    var t = va(e);
    t !== null && t.tag === 5 && t.type === "form" ? um(t) : Ln.r(e);
  }
  var Fa = typeof document > "u" ? null : document;
  function kp(e, t, n) {
    var a = Fa;
    if (a && typeof t == "string" && t) {
      var r = Vt(t);
      r = 'link[rel="' + e + '"][href="' + r + '"]', typeof n == "string" && (r += '[crossorigin="' + n + '"]'), Yp.has(r) || (Yp.add(r), e = { rel: e, crossOrigin: n, href: t }, a.querySelector(r) === null && (t = a.createElement("link"), ht(t, "link", e), rt(t), a.head.appendChild(t)));
    }
  }
  function DS(e) {
    Ln.D(e), kp("dns-prefetch", e, null);
  }
  function _S(e, t) {
    Ln.C(e, t), kp("preconnect", e, t);
  }
  function NS(e, t, n) {
    Ln.L(e, t, n);
    var a = Fa;
    if (a && e && t) {
      var r = 'link[rel="preload"][as="' + Vt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (r += '[imagesrcset="' + Vt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (r += '[imagesizes="' + Vt(
        n.imageSizes
      ) + '"]')) : r += '[href="' + Vt(e) + '"]';
      var s = r;
      switch (t) {
        case "style":
          s = Wa(e);
          break;
        case "script":
          s = $a(e);
      }
      Wt.has(s) || (e = b(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Wt.set(s, e), a.querySelector(r) !== null || t === "style" && a.querySelector(mr(s)) || t === "script" && a.querySelector(pr(s)) || (t = a.createElement("link"), ht(t, "link", e), rt(t), a.head.appendChild(t)));
    }
  }
  function zS(e, t) {
    Ln.m(e, t);
    var n = Fa;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", r = 'link[rel="modulepreload"][as="' + Vt(a) + '"][href="' + Vt(e) + '"]', s = r;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = $a(e);
      }
      if (!Wt.has(s) && (e = b({ rel: "modulepreload", href: e }, t), Wt.set(s, e), n.querySelector(r) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(pr(s)))
              return;
        }
        a = n.createElement("link"), ht(a, "link", e), rt(a), n.head.appendChild(a);
      }
    }
  }
  function jS(e, t, n) {
    Ln.S(e, t, n);
    var a = Fa;
    if (a && e) {
      var r = ga(a).hoistableStyles, s = Wa(e);
      t = t || "default";
      var d = r.get(s);
      if (!d) {
        var g = { loading: 0, preload: null };
        if (d = a.querySelector(
          mr(s)
        ))
          g.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Wt.get(s)) && Gc(e, n);
          var E = d = a.createElement("link");
          rt(E), ht(E, "link", e), E._p = new Promise(function(L, Y) {
            E.onload = L, E.onerror = Y;
          }), E.addEventListener("load", function() {
            g.loading |= 1;
          }), E.addEventListener("error", function() {
            g.loading |= 2;
          }), g.loading |= 4, Xo(d, t, a);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: g
        }, r.set(s, d);
      }
    }
  }
  function US(e, t) {
    Ln.X(e, t);
    var n = Fa;
    if (n && e) {
      var a = ga(n).hoistableScripts, r = $a(e), s = a.get(r);
      s || (s = n.querySelector(pr(r)), s || (e = b({ src: e, async: !0 }, t), (t = Wt.get(r)) && Qc(e, t), s = n.createElement("script"), rt(s), ht(s, "link", e), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, a.set(r, s));
    }
  }
  function HS(e, t) {
    Ln.M(e, t);
    var n = Fa;
    if (n && e) {
      var a = ga(n).hoistableScripts, r = $a(e), s = a.get(r);
      s || (s = n.querySelector(pr(r)), s || (e = b({ src: e, async: !0, type: "module" }, t), (t = Wt.get(r)) && Qc(e, t), s = n.createElement("script"), rt(s), ht(s, "link", e), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, a.set(r, s));
    }
  }
  function Vp(e, t, n, a) {
    var r = (r = se.current) ? Vo(r) : null;
    if (!r) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Wa(n.href), n = ga(
          r
        ).hoistableStyles, a = n.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Wa(n.href);
          var s = ga(
            r
          ).hoistableStyles, d = s.get(e);
          if (d || (r = r.ownerDocument || r, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(e, d), (s = r.querySelector(
            mr(e)
          )) && !s._p && (d.instance = s, d.state.loading = 5), Wt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Wt.set(e, n), s || LS(
            r,
            e,
            n,
            d.state
          ))), t && a === null)
            throw Error(u(528, ""));
          return d;
        }
        if (t && a !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = $a(n), n = ga(
          r
        ).hoistableScripts, a = n.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function Wa(e) {
    return 'href="' + Vt(e) + '"';
  }
  function mr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Xp(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function LS(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), ht(t, "link", n), rt(t), e.head.appendChild(t));
  }
  function $a(e) {
    return '[src="' + Vt(e) + '"]';
  }
  function pr(e) {
    return "script[async]" + e;
  }
  function Zp(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Vt(n.href) + '"]'
          );
          if (a)
            return t.instance = a, rt(a), a;
          var r = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), rt(a), ht(a, "style", r), Xo(a, n.precedence, e), t.instance = a;
        case "stylesheet":
          r = Wa(n.href);
          var s = e.querySelector(
            mr(r)
          );
          if (s)
            return t.state.loading |= 4, t.instance = s, rt(s), s;
          a = Xp(n), (r = Wt.get(r)) && Gc(a, r), s = (e.ownerDocument || e).createElement("link"), rt(s);
          var d = s;
          return d._p = new Promise(function(g, E) {
            d.onload = g, d.onerror = E;
          }), ht(s, "link", a), t.state.loading |= 4, Xo(s, n.precedence, e), t.instance = s;
        case "script":
          return s = $a(n.src), (r = e.querySelector(
            pr(s)
          )) ? (t.instance = r, rt(r), r) : (a = n, (r = Wt.get(s)) && (a = b({}, n), Qc(a, r)), e = e.ownerDocument || e, r = e.createElement("script"), rt(r), ht(r, "link", a), e.head.appendChild(r), t.instance = r);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Xo(a, n.precedence, e));
    return t.instance;
  }
  function Xo(e, t, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = a.length ? a[a.length - 1] : null, s = r, d = 0; d < a.length; d++) {
      var g = a[d];
      if (g.dataset.precedence === t) s = g;
      else if (s !== r) break;
    }
    s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Gc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Qc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Zo = null;
  function Kp(e, t, n) {
    if (Zo === null) {
      var a = /* @__PURE__ */ new Map(), r = Zo = /* @__PURE__ */ new Map();
      r.set(n, a);
    } else
      r = Zo, a = r.get(n), a || (a = /* @__PURE__ */ new Map(), r.set(n, a));
    if (a.has(e)) return a;
    for (a.set(e, null), n = n.getElementsByTagName(e), r = 0; r < n.length; r++) {
      var s = n[r];
      if (!(s[Oi] || s[vt] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = s.getAttribute(t) || "";
        d = e + d;
        var g = a.get(d);
        g ? g.push(s) : a.set(d, [s]);
      }
    }
    return a;
  }
  function Pp(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function BS(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Jp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var vr = null;
  function qS() {
  }
  function GS(e, t, n) {
    if (vr === null) throw Error(u(475));
    var a = vr;
    if (t.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (t.state.loading & 4) === 0) {
      if (t.instance === null) {
        var r = Wa(n.href), s = e.querySelector(
          mr(r)
        );
        if (s) {
          e = s._p, e !== null && typeof e == "object" && typeof e.then == "function" && (a.count++, a = Ko.bind(a), e.then(a, a)), t.state.loading |= 4, t.instance = s, rt(s);
          return;
        }
        s = e.ownerDocument || e, n = Xp(n), (r = Wt.get(r)) && Gc(n, r), s = s.createElement("link"), rt(s);
        var d = s;
        d._p = new Promise(function(g, E) {
          d.onload = g, d.onerror = E;
        }), ht(s, "link", n), t.instance = s;
      }
      a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & 3) === 0 && (a.count++, t = Ko.bind(a), e.addEventListener("load", t), e.addEventListener("error", t));
    }
  }
  function QS() {
    if (vr === null) throw Error(u(475));
    var e = vr;
    return e.stylesheets && e.count === 0 && Yc(e, e.stylesheets), 0 < e.count ? function(t) {
      var n = setTimeout(function() {
        if (e.stylesheets && Yc(e, e.stylesheets), e.unsuspend) {
          var a = e.unsuspend;
          e.unsuspend = null, a();
        }
      }, 6e4);
      return e.unsuspend = t, function() {
        e.unsuspend = null, clearTimeout(n);
      };
    } : null;
  }
  function Ko() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Yc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Po = null;
  function Yc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Po = /* @__PURE__ */ new Map(), t.forEach(YS, e), Po = null, Ko.call(e));
  }
  function YS(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Po.get(e);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Po.set(e, n);
        for (var r = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < r.length; s++) {
          var d = r[s];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), a = d);
        }
        a && n.set(null, a);
      }
      r = t.instance, d = r.getAttribute("data-precedence"), s = n.get(d) || a, s === a && n.set(null, r), n.set(d, r), this.count++, a = Ko.bind(this), r.addEventListener("load", a), r.addEventListener("error", a), s ? s.parentNode.insertBefore(r, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(r, e.firstChild)), t.state.loading |= 4;
    }
  }
  var gr = {
    $$typeof: H,
    Provider: null,
    Consumer: null,
    _currentValue: G,
    _currentValue2: G,
    _threadCount: 0
  };
  function kS(e, t, n, a, r, s, d, g) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Bu(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Bu(0), this.hiddenUpdates = Bu(null), this.identifierPrefix = a, this.onUncaughtError = r, this.onCaughtError = s, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Fp(e, t, n, a, r, s, d, g, E, L, Y, Z) {
    return e = new kS(
      e,
      t,
      n,
      d,
      g,
      E,
      L,
      Z
    ), t = 1, s === !0 && (t |= 24), s = Ut(3, null, null, t), e.current = s, s.stateNode = e, t = ws(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: t
    }, Cs(s), e;
  }
  function Wp(e) {
    return e ? (e = Ma, e) : Ma;
  }
  function $p(e, t, n, a, r, s) {
    r = Wp(r), a.context === null ? a.context = r : a.pendingContext = r, a = Pn(t), a.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (a.callback = s), n = Jn(e, a, t), n !== null && (Gt(n, e, t), Ki(n, e, t));
  }
  function Ip(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function kc(e, t) {
    Ip(e, t), (e = e.alternate) && Ip(e, t);
  }
  function ev(e) {
    if (e.tag === 13) {
      var t = Oa(e, 67108864);
      t !== null && Gt(t, e, 67108864), kc(e, 67108864);
    }
  }
  var Jo = !0;
  function VS(e, t, n, a) {
    var r = j.T;
    j.T = null;
    var s = P.p;
    try {
      P.p = 2, Vc(e, t, n, a);
    } finally {
      P.p = s, j.T = r;
    }
  }
  function XS(e, t, n, a) {
    var r = j.T;
    j.T = null;
    var s = P.p;
    try {
      P.p = 8, Vc(e, t, n, a);
    } finally {
      P.p = s, j.T = r;
    }
  }
  function Vc(e, t, n, a) {
    if (Jo) {
      var r = Xc(a);
      if (r === null)
        _c(
          e,
          t,
          a,
          Fo,
          n
        ), nv(e, a);
      else if (KS(
        r,
        e,
        t,
        n,
        a
      ))
        a.stopPropagation();
      else if (nv(e, a), t & 4 && -1 < ZS.indexOf(e)) {
        for (; r !== null; ) {
          var s = va(r);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var d = zl(s.pendingLanes);
                  if (d !== 0) {
                    var g = s;
                    for (g.pendingLanes |= 2, g.entangledLanes |= 2; d; ) {
                      var E = 1 << 31 - zt(d);
                      g.entanglements[1] |= E, d &= ~E;
                    }
                    mn(s), (Be & 6) === 0 && (zo = pt() + 500, cr(0));
                  }
                }
                break;
              case 13:
                g = Oa(s, 2), g !== null && Gt(g, s, 2), Uo(), kc(s, 2);
            }
          if (s = Xc(a), s === null && _c(
            e,
            t,
            a,
            Fo,
            n
          ), s === r) break;
          r = s;
        }
        r !== null && a.stopPropagation();
      } else
        _c(
          e,
          t,
          a,
          null,
          n
        );
    }
  }
  function Xc(e) {
    return e = Fu(e), Zc(e);
  }
  var Fo = null;
  function Zc(e) {
    if (Fo = null, e = pa(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Fo = e, null;
  }
  function tv(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Lu()) {
          case Nl:
            return 2;
          case vd:
            return 8;
          case Qr:
          case Nb:
            return 32;
          case gd:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Kc = !1, ul = null, sl = null, cl = null, yr = /* @__PURE__ */ new Map(), br = /* @__PURE__ */ new Map(), fl = [], ZS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function nv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ul = null;
        break;
      case "dragenter":
      case "dragleave":
        sl = null;
        break;
      case "mouseover":
      case "mouseout":
        cl = null;
        break;
      case "pointerover":
      case "pointerout":
        yr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        br.delete(t.pointerId);
    }
  }
  function Sr(e, t, n, a, r, s) {
    return e === null || e.nativeEvent !== s ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: s,
      targetContainers: [r]
    }, t !== null && (t = va(t), t !== null && ev(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, r !== null && t.indexOf(r) === -1 && t.push(r), e);
  }
  function KS(e, t, n, a, r) {
    switch (t) {
      case "focusin":
        return ul = Sr(
          ul,
          e,
          t,
          n,
          a,
          r
        ), !0;
      case "dragenter":
        return sl = Sr(
          sl,
          e,
          t,
          n,
          a,
          r
        ), !0;
      case "mouseover":
        return cl = Sr(
          cl,
          e,
          t,
          n,
          a,
          r
        ), !0;
      case "pointerover":
        var s = r.pointerId;
        return yr.set(
          s,
          Sr(
            yr.get(s) || null,
            e,
            t,
            n,
            a,
            r
          )
        ), !0;
      case "gotpointercapture":
        return s = r.pointerId, br.set(
          s,
          Sr(
            br.get(s) || null,
            e,
            t,
            n,
            a,
            r
          )
        ), !0;
    }
    return !1;
  }
  function lv(e) {
    var t = pa(e.target);
    if (t !== null) {
      var n = f(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = h(n), t !== null) {
            e.blockedOn = t, Gb(e.priority, function() {
              if (n.tag === 13) {
                var a = qt();
                a = qu(a);
                var r = Oa(n, a);
                r !== null && Gt(r, n, a), kc(n, a);
              }
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Wo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Xc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        Ju = a, n.target.dispatchEvent(a), Ju = null;
      } else
        return t = va(n), t !== null && ev(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function av(e, t, n) {
    Wo(e) && n.delete(t);
  }
  function PS() {
    Kc = !1, ul !== null && Wo(ul) && (ul = null), sl !== null && Wo(sl) && (sl = null), cl !== null && Wo(cl) && (cl = null), yr.forEach(av), br.forEach(av);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Kc || (Kc = !0, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      PS
    )));
  }
  var Io = null;
  function iv(e) {
    Io !== e && (Io = e, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      function() {
        Io === e && (Io = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], a = e[t + 1], r = e[t + 2];
          if (typeof a != "function") {
            if (Zc(a || n) === null)
              continue;
            break;
          }
          var s = va(n);
          s !== null && (e.splice(t, 3), t -= 3, Zs(
            s,
            {
              pending: !0,
              data: r,
              method: n.method,
              action: a
            },
            a,
            r
          ));
        }
      }
    ));
  }
  function xr(e) {
    function t(E) {
      return $o(E, e);
    }
    ul !== null && $o(ul, e), sl !== null && $o(sl, e), cl !== null && $o(cl, e), yr.forEach(t), br.forEach(t);
    for (var n = 0; n < fl.length; n++) {
      var a = fl[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < fl.length && (n = fl[0], n.blockedOn === null); )
      lv(n), n.blockedOn === null && fl.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var r = n[a], s = n[a + 1], d = r[At] || null;
        if (typeof s == "function")
          d || iv(n);
        else if (d) {
          var g = null;
          if (s && s.hasAttribute("formAction")) {
            if (r = s, d = s[At] || null)
              g = d.formAction;
            else if (Zc(r) !== null) continue;
          } else g = d.action;
          typeof g == "function" ? n[a + 1] = g : (n.splice(a, 3), a -= 3), iv(n);
        }
      }
  }
  function Pc(e) {
    this._internalRoot = e;
  }
  eu.prototype.render = Pc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var n = t.current, a = qt();
    $p(n, a, e, t, null, null);
  }, eu.prototype.unmount = Pc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      $p(e.current, 2, null, e, null, null), Uo(), t[ma] = null;
    }
  };
  function eu(e) {
    this._internalRoot = e;
  }
  eu.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ed();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < fl.length && t !== 0 && t < fl[n].priority; n++) ;
      fl.splice(n, 0, e), n === 0 && lv(e);
    }
  };
  var rv = i.version;
  if (rv !== "19.1.0")
    throw Error(
      u(
        527,
        rv,
        "19.1.0"
      )
    );
  P.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = p(t), e = e !== null ? v(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var JS = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: j,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var tu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!tu.isDisabled && tu.supportsFiber)
      try {
        Ai = tu.inject(
          JS
        ), Nt = tu;
      } catch {
      }
  }
  return wr.createRoot = function(e, t) {
    if (!c(e)) throw Error(u(299));
    var n = !1, a = "", r = Em, s = wm, d = Tm, g = null;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (r = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (g = t.unstable_transitionCallbacks)), t = Fp(
      e,
      1,
      !1,
      null,
      null,
      n,
      a,
      r,
      s,
      d,
      g,
      null
    ), e[ma] = t.current, Dc(e), new Pc(t);
  }, wr.hydrateRoot = function(e, t, n) {
    if (!c(e)) throw Error(u(299));
    var a = !1, r = "", s = Em, d = wm, g = Tm, E = null, L = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (g = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (E = n.unstable_transitionCallbacks), n.formState !== void 0 && (L = n.formState)), t = Fp(
      e,
      1,
      !0,
      t,
      n ?? null,
      a,
      r,
      s,
      d,
      g,
      E,
      L
    ), t.context = Wp(null), n = t.current, a = qt(), a = qu(a), r = Pn(a), r.callback = null, Jn(n, r, a), n = a, t.current.lanes = n, Ci(t, n), mn(t), e[ma] = t.current, Dc(e), new eu(t);
  }, wr.version = "19.1.0", wr;
}
var gv;
function ix() {
  if (gv) return $c.exports;
  gv = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), $c.exports = ax(), $c.exports;
}
var rx = ix();
function yv(l, i) {
  if (typeof l == "function")
    return l(i);
  l != null && (l.current = i);
}
function mg(...l) {
  return (i) => {
    let o = !1;
    const u = l.map((c) => {
      const f = yv(c, i);
      return !o && typeof f == "function" && (o = !0), f;
    });
    if (o)
      return () => {
        for (let c = 0; c < u.length; c++) {
          const f = u[c];
          typeof f == "function" ? f() : yv(l[c], null);
        }
      };
  };
}
function Pe(...l) {
  return y.useCallback(mg(...l), l);
}
// @__NO_SIDE_EFFECTS__
function Cr(l) {
  const i = /* @__PURE__ */ ox(l), o = y.forwardRef((u, c) => {
    const { children: f, ...h } = u, m = y.Children.toArray(f), p = m.find(sx);
    if (p) {
      const v = p.props.children, b = m.map((x) => x === p ? y.Children.count(v) > 1 ? y.Children.only(null) : y.isValidElement(v) ? v.props.children : null : x);
      return /* @__PURE__ */ w.jsx(i, { ...h, ref: c, children: y.isValidElement(v) ? y.cloneElement(v, void 0, b) : null });
    }
    return /* @__PURE__ */ w.jsx(i, { ...h, ref: c, children: f });
  });
  return o.displayName = `${l}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function ox(l) {
  const i = y.forwardRef((o, u) => {
    const { children: c, ...f } = o;
    if (y.isValidElement(c)) {
      const h = fx(c), m = cx(f, c.props);
      return c.type !== y.Fragment && (m.ref = u ? mg(u, h) : h), y.cloneElement(c, m);
    }
    return y.Children.count(c) > 1 ? y.Children.only(null) : null;
  });
  return i.displayName = `${l}.SlotClone`, i;
}
var pg = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function ux(l) {
  const i = ({ children: o }) => /* @__PURE__ */ w.jsx(w.Fragment, { children: o });
  return i.displayName = `${l}.Slottable`, i.__radixId = pg, i;
}
function sx(l) {
  return y.isValidElement(l) && typeof l.type == "function" && "__radixId" in l.type && l.type.__radixId === pg;
}
function cx(l, i) {
  const o = { ...i };
  for (const u in i) {
    const c = l[u], f = i[u];
    /^on[A-Z]/.test(u) ? c && f ? o[u] = (...m) => {
      const p = f(...m);
      return c(...m), p;
    } : c && (o[u] = c) : u === "style" ? o[u] = { ...c, ...f } : u === "className" && (o[u] = [c, f].filter(Boolean).join(" "));
  }
  return { ...l, ...o };
}
function fx(l) {
  var u, c;
  let i = (u = Object.getOwnPropertyDescriptor(l.props, "ref")) == null ? void 0 : u.get, o = i && "isReactWarning" in i && i.isReactWarning;
  return o ? l.ref : (i = (c = Object.getOwnPropertyDescriptor(l, "ref")) == null ? void 0 : c.get, o = i && "isReactWarning" in i && i.isReactWarning, o ? l.props.ref : l.props.ref || l.ref);
}
function vg(l) {
  var i, o, u = "";
  if (typeof l == "string" || typeof l == "number") u += l;
  else if (typeof l == "object") if (Array.isArray(l)) {
    var c = l.length;
    for (i = 0; i < c; i++) l[i] && (o = vg(l[i])) && (u && (u += " "), u += o);
  } else for (o in l) l[o] && (u && (u += " "), u += o);
  return u;
}
function dx() {
  for (var l, i, o = 0, u = "", c = arguments.length; o < c; o++) (l = arguments[o]) && (i = vg(l)) && (u && (u += " "), u += i);
  return u;
}
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hx = (l) => l.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), mx = (l) => l.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (i, o, u) => u ? u.toUpperCase() : o.toLowerCase()
), bv = (l) => {
  const i = mx(l);
  return i.charAt(0).toUpperCase() + i.slice(1);
}, gg = (...l) => l.filter((i, o, u) => !!i && i.trim() !== "" && u.indexOf(i) === o).join(" ").trim(), px = (l) => {
  for (const i in l)
    if (i.startsWith("aria-") || i === "role" || i === "title")
      return !0;
};
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var vx = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gx = y.forwardRef(
  ({
    color: l = "currentColor",
    size: i = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: u,
    className: c = "",
    children: f,
    iconNode: h,
    ...m
  }, p) => y.createElement(
    "svg",
    {
      ref: p,
      ...vx,
      width: i,
      height: i,
      stroke: l,
      strokeWidth: u ? Number(o) * 24 / Number(i) : o,
      className: gg("lucide", c),
      ...!f && !px(m) && { "aria-hidden": "true" },
      ...m
    },
    [
      ...h.map(([v, b]) => y.createElement(v, b)),
      ...Array.isArray(f) ? f : [f]
    ]
  )
);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ha = (l, i) => {
  const o = y.forwardRef(
    ({ className: u, ...c }, f) => y.createElement(gx, {
      ref: f,
      iconNode: i,
      className: gg(
        `lucide-${hx(bv(l))}`,
        `lucide-${l}`,
        u
      ),
      ...c
    })
  );
  return o.displayName = bv(l), o;
};
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yx = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], bx = ha("check", yx);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sx = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], yg = ha("chevron-down", Sx);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xx = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Ex = ha("chevron-up", xx);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wx = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Tx = ha("circle-alert", wx);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ax = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Rx = ha("circle-check", Ax);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cx = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Kf = ha("loader-circle", Cx);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ox = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Mx = ha("x", Ox), nf = 768;
function Dx() {
  const [l, i] = y.useState(void 0);
  return y.useEffect(() => {
    const o = window.matchMedia(`(max-width: ${nf - 1}px)`), u = () => {
      i(window.innerWidth < nf);
    };
    return o.addEventListener("change", u), i(window.innerWidth < nf), () => o.removeEventListener("change", u);
  }, []), !!l;
}
const Pf = "-", _x = (l) => {
  const i = zx(l), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: u
  } = l;
  return {
    getClassGroupId: (h) => {
      const m = h.split(Pf);
      return m[0] === "" && m.length !== 1 && m.shift(), bg(m, i) || Nx(h);
    },
    getConflictingClassGroupIds: (h, m) => {
      const p = o[h] || [];
      return m && u[h] ? [...p, ...u[h]] : p;
    }
  };
}, bg = (l, i) => {
  var h;
  if (l.length === 0)
    return i.classGroupId;
  const o = l[0], u = i.nextPart.get(o), c = u ? bg(l.slice(1), u) : void 0;
  if (c)
    return c;
  if (i.validators.length === 0)
    return;
  const f = l.join(Pf);
  return (h = i.validators.find(({
    validator: m
  }) => m(f))) == null ? void 0 : h.classGroupId;
}, Sv = /^\[(.+)\]$/, Nx = (l) => {
  if (Sv.test(l)) {
    const i = Sv.exec(l)[1], o = i == null ? void 0 : i.substring(0, i.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, zx = (l) => {
  const {
    theme: i,
    classGroups: o
  } = l, u = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const c in o)
    vf(o[c], u, c, i);
  return u;
}, vf = (l, i, o, u) => {
  l.forEach((c) => {
    if (typeof c == "string") {
      const f = c === "" ? i : xv(i, c);
      f.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (jx(c)) {
        vf(c(u), i, o, u);
        return;
      }
      i.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([f, h]) => {
      vf(h, xv(i, f), o, u);
    });
  });
}, xv = (l, i) => {
  let o = l;
  return i.split(Pf).forEach((u) => {
    o.nextPart.has(u) || o.nextPart.set(u, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(u);
  }), o;
}, jx = (l) => l.isThemeGetter, Ux = (l) => {
  if (l < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let i = 0, o = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  const c = (f, h) => {
    o.set(f, h), i++, i > l && (i = 0, u = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(f) {
      let h = o.get(f);
      if (h !== void 0)
        return h;
      if ((h = u.get(f)) !== void 0)
        return c(f, h), h;
    },
    set(f, h) {
      o.has(f) ? o.set(f, h) : c(f, h);
    }
  };
}, gf = "!", yf = ":", Hx = yf.length, Lx = (l) => {
  const {
    prefix: i,
    experimentalParseClassName: o
  } = l;
  let u = (c) => {
    const f = [];
    let h = 0, m = 0, p = 0, v;
    for (let _ = 0; _ < c.length; _++) {
      let S = c[_];
      if (h === 0 && m === 0) {
        if (S === yf) {
          f.push(c.slice(p, _)), p = _ + Hx;
          continue;
        }
        if (S === "/") {
          v = _;
          continue;
        }
      }
      S === "[" ? h++ : S === "]" ? h-- : S === "(" ? m++ : S === ")" && m--;
    }
    const b = f.length === 0 ? c : c.substring(p), x = Bx(b), T = x !== b, R = v && v > p ? v - p : void 0;
    return {
      modifiers: f,
      hasImportantModifier: T,
      baseClassName: x,
      maybePostfixModifierPosition: R
    };
  };
  if (i) {
    const c = i + yf, f = u;
    u = (h) => h.startsWith(c) ? f(h.substring(c.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: h,
      maybePostfixModifierPosition: void 0
    };
  }
  if (o) {
    const c = u;
    u = (f) => o({
      className: f,
      parseClassName: c
    });
  }
  return u;
}, Bx = (l) => l.endsWith(gf) ? l.substring(0, l.length - 1) : l.startsWith(gf) ? l.substring(1) : l, qx = (l) => {
  const i = Object.fromEntries(l.orderSensitiveModifiers.map((u) => [u, !0]));
  return (u) => {
    if (u.length <= 1)
      return u;
    const c = [];
    let f = [];
    return u.forEach((h) => {
      h[0] === "[" || i[h] ? (c.push(...f.sort(), h), f = []) : f.push(h);
    }), c.push(...f.sort()), c;
  };
}, Gx = (l) => ({
  cache: Ux(l.cacheSize),
  parseClassName: Lx(l),
  sortModifiers: qx(l),
  ..._x(l)
}), Qx = /\s+/, Yx = (l, i) => {
  const {
    parseClassName: o,
    getClassGroupId: u,
    getConflictingClassGroupIds: c,
    sortModifiers: f
  } = i, h = [], m = l.trim().split(Qx);
  let p = "";
  for (let v = m.length - 1; v >= 0; v -= 1) {
    const b = m[v], {
      isExternal: x,
      modifiers: T,
      hasImportantModifier: R,
      baseClassName: _,
      maybePostfixModifierPosition: S
    } = o(b);
    if (x) {
      p = b + (p.length > 0 ? " " + p : p);
      continue;
    }
    let C = !!S, N = u(C ? _.substring(0, S) : _);
    if (!N) {
      if (!C) {
        p = b + (p.length > 0 ? " " + p : p);
        continue;
      }
      if (N = u(_), !N) {
        p = b + (p.length > 0 ? " " + p : p);
        continue;
      }
      C = !1;
    }
    const z = f(T).join(":"), H = R ? z + gf : z, k = H + N;
    if (h.includes(k))
      continue;
    h.push(k);
    const Q = c(N, C);
    for (let W = 0; W < Q.length; ++W) {
      const J = Q[W];
      h.push(H + J);
    }
    p = b + (p.length > 0 ? " " + p : p);
  }
  return p;
};
function kx() {
  let l = 0, i, o, u = "";
  for (; l < arguments.length; )
    (i = arguments[l++]) && (o = Sg(i)) && (u && (u += " "), u += o);
  return u;
}
const Sg = (l) => {
  if (typeof l == "string")
    return l;
  let i, o = "";
  for (let u = 0; u < l.length; u++)
    l[u] && (i = Sg(l[u])) && (o && (o += " "), o += i);
  return o;
};
function Vx(l, ...i) {
  let o, u, c, f = h;
  function h(p) {
    const v = i.reduce((b, x) => x(b), l());
    return o = Gx(v), u = o.cache.get, c = o.cache.set, f = m, m(p);
  }
  function m(p) {
    const v = u(p);
    if (v)
      return v;
    const b = Yx(p, o);
    return c(p, b), b;
  }
  return function() {
    return f(kx.apply(null, arguments));
  };
}
const it = (l) => {
  const i = (o) => o[l] || [];
  return i.isThemeGetter = !0, i;
}, xg = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Eg = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Xx = /^\d+\/\d+$/, Zx = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Kx = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Px = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Jx = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Fx = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ia = (l) => Xx.test(l), we = (l) => !!l && !Number.isNaN(Number(l)), hl = (l) => !!l && Number.isInteger(Number(l)), lf = (l) => l.endsWith("%") && we(l.slice(0, -1)), Bn = (l) => Zx.test(l), Wx = () => !0, $x = (l) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Kx.test(l) && !Px.test(l)
), wg = () => !1, Ix = (l) => Jx.test(l), e1 = (l) => Fx.test(l), t1 = (l) => !ae(l) && !ie(l), n1 = (l) => Si(l, Rg, wg), ae = (l) => xg.test(l), Wl = (l) => Si(l, Cg, $x), af = (l) => Si(l, o1, we), Ev = (l) => Si(l, Tg, wg), l1 = (l) => Si(l, Ag, e1), lu = (l) => Si(l, Og, Ix), ie = (l) => Eg.test(l), Tr = (l) => xi(l, Cg), a1 = (l) => xi(l, u1), wv = (l) => xi(l, Tg), i1 = (l) => xi(l, Rg), r1 = (l) => xi(l, Ag), au = (l) => xi(l, Og, !0), Si = (l, i, o) => {
  const u = xg.exec(l);
  return u ? u[1] ? i(u[1]) : o(u[2]) : !1;
}, xi = (l, i, o = !1) => {
  const u = Eg.exec(l);
  return u ? u[1] ? i(u[1]) : o : !1;
}, Tg = (l) => l === "position" || l === "percentage", Ag = (l) => l === "image" || l === "url", Rg = (l) => l === "length" || l === "size" || l === "bg-size", Cg = (l) => l === "length", o1 = (l) => l === "number", u1 = (l) => l === "family-name", Og = (l) => l === "shadow", s1 = () => {
  const l = it("color"), i = it("font"), o = it("text"), u = it("font-weight"), c = it("tracking"), f = it("leading"), h = it("breakpoint"), m = it("container"), p = it("spacing"), v = it("radius"), b = it("shadow"), x = it("inset-shadow"), T = it("text-shadow"), R = it("drop-shadow"), _ = it("blur"), S = it("perspective"), C = it("aspect"), N = it("ease"), z = it("animate"), H = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], Q = () => [...k(), ie, ae], W = () => ["auto", "hidden", "clip", "visible", "scroll"], J = () => ["auto", "contain", "none"], K = () => [ie, ae, p], te = () => [Ia, "full", "auto", ...K()], re = () => [hl, "none", "subgrid", ie, ae], ge = () => ["auto", {
    span: ["full", hl, ie, ae]
  }, hl, ie, ae], ce = () => [hl, "auto", ie, ae], ye = () => ["auto", "min", "max", "fr", ie, ae], Se = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ve = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], j = () => ["auto", ...K()], P = () => [Ia, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...K()], G = () => [l, ie, ae], ue = () => [...k(), wv, Ev, {
    position: [ie, ae]
  }], A = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], X = () => ["auto", "cover", "contain", i1, n1, {
    size: [ie, ae]
  }], $ = () => [lf, Tr, Wl], F = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    v,
    ie,
    ae
  ], ee = () => ["", we, Tr, Wl], be = () => ["solid", "dashed", "dotted", "double"], se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], I = () => [we, lf, wv, Ev], fe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    _,
    ie,
    ae
  ], He = () => ["none", we, ie, ae], Me = () => ["none", we, ie, ae], Ae = () => [we, ie, ae], Re = () => [Ia, "full", ...K()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Bn],
      breakpoint: [Bn],
      color: [Wx],
      container: [Bn],
      "drop-shadow": [Bn],
      ease: ["in", "out", "in-out"],
      font: [t1],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Bn],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Bn],
      shadow: [Bn],
      spacing: ["px", we],
      text: [Bn],
      "text-shadow": [Bn],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Ia, ae, ie, C]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [we, ae, ie, m]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": H()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": H()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: Q()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: W()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": W()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": W()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: J()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": J()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": J()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: te()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": te()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": te()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: te()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: te()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: te()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: te()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: te()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: te()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [hl, "auto", ie, ae]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ia, "full", "auto", m, ...K()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [we, Ia, "auto", "initial", "none", ae]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", we, ie, ae]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", we, ie, ae]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [hl, "first", "last", "none", ie, ae]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": re()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ge()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ce()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ce()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": re()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ge()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ce()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ce()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ye()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ye()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: K()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": K()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": K()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Se(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...ve(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...ve()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Se()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...ve(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...ve(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Se()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...ve(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...ve()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: K()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: K()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: K()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: K()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: K()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: K()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: K()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: K()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: K()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: j()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: j()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: j()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: j()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: j()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: j()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: j()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: j()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: j()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": K()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": K()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: P()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [m, "screen", ...P()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          m,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...P()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          m,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [h]
          },
          ...P()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...P()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...P()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...P()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, Tr, Wl]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [u, ie, af]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", lf, ae]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [a1, ae, i]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [c, ie, ae]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [we, "none", ie, af]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          f,
          ...K()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ie, ae]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", ie, ae]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: G()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: G()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...be(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [we, "from-font", "auto", ie, Wl]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: G()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [we, "auto", ie, ae]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: K()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ie, ae]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ie, ae]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: ue()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: A()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: X()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, hl, ie, ae],
          radial: ["", ie, ae],
          conic: [hl, ie, ae]
        }, r1, l1]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: G()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: $()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: $()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: $()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: G()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: G()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: G()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: F()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": F()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": F()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": F()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": F()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": F()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": F()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": F()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": F()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": F()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": F()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": F()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": F()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": F()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": F()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ee()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ee()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ee()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ee()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ee()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ee()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ee()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ee()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ee()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ee()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": ee()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...be(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...be(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: G()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": G()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": G()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": G()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": G()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": G()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": G()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": G()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": G()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: G()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...be(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [we, ie, ae]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", we, Tr, Wl]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: G()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          b,
          au,
          lu
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: G()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", x, au, lu]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": G()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ee()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: G()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [we, Wl]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": G()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ee()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": G()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", T, au, lu]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": G()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [we, ie, ae]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...se(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": se()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [we]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": I()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": G()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": G()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": I()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": G()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": G()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": I()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": G()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": G()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": I()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": G()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": G()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": I()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": G()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": G()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": I()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": G()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": G()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": I()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": G()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": G()
      }],
      "mask-image-radial": [{
        "mask-radial": [ie, ae]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": I()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": I()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": G()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": G()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": k()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [we]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": I()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": I()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": G()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": G()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: ue()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: A()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: X()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", ie, ae]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ie,
          ae
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: fe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [we, ie, ae]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [we, ie, ae]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          R,
          au,
          lu
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": G()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", we, ie, ae]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [we, ie, ae]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", we, ie, ae]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [we, ie, ae]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", we, ie, ae]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ie,
          ae
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": fe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [we, ie, ae]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [we, ie, ae]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", we, ie, ae]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [we, ie, ae]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", we, ie, ae]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [we, ie, ae]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [we, ie, ae]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", we, ie, ae]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": K()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": K()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": K()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ie, ae]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [we, "initial", ie, ae]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", N, ie, ae]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [we, ie, ae]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", z, ie, ae]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [S, ie, ae]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": Q()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: He()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": He()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": He()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": He()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Me()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Me()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Me()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Me()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Ae()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ae()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ae()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ie, ae, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: Q()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Re()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Re()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Re()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Re()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: G()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: G()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ie, ae]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": K()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": K()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": K()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": K()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": K()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": K()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": K()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": K()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": K()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": K()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": K()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": K()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": K()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": K()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": K()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": K()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": K()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": K()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ie, ae]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...G()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [we, Tr, Wl, af]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...G()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, c1 = /* @__PURE__ */ Vx(s1);
function et(...l) {
  return c1(dx(l));
}
var Hr = hg();
const f1 = /* @__PURE__ */ fg(Hr);
var d1 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], ke = d1.reduce((l, i) => {
  const o = /* @__PURE__ */ Cr(`Primitive.${i}`), u = y.forwardRef((c, f) => {
    const { asChild: h, ...m } = c, p = h ? o : i;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w.jsx(p, { ...m, ref: f });
  });
  return u.displayName = `Primitive.${i}`, { ...l, [i]: u };
}, {});
function h1(l, i) {
  l && Hr.flushSync(() => l.dispatchEvent(i));
}
var m1 = "Separator", Tv = "horizontal", p1 = ["horizontal", "vertical"], Mg = y.forwardRef((l, i) => {
  const { decorative: o, orientation: u = Tv, ...c } = l, f = v1(u) ? u : Tv, m = o ? { role: "none" } : { "aria-orientation": f === "vertical" ? f : void 0, role: "separator" };
  return /* @__PURE__ */ w.jsx(
    ke.div,
    {
      "data-orientation": f,
      ...m,
      ...c,
      ref: i
    }
  );
});
Mg.displayName = m1;
function v1(l) {
  return p1.includes(l);
}
var g1 = Mg;
function y1({
  className: l,
  orientation: i = "horizontal",
  decorative: o = !0,
  ...u
}) {
  return /* @__PURE__ */ w.jsx(
    g1,
    {
      "data-slot": "separator",
      decorative: o,
      orientation: i,
      className: et(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        l
      ),
      ...u
    }
  );
}
function Ue(l, i, { checkForDefaultPrevented: o = !0 } = {}) {
  return function(c) {
    if (l == null || l(c), o === !1 || !c.defaultPrevented)
      return i == null ? void 0 : i(c);
  };
}
function b1(l, i) {
  const o = y.createContext(i), u = (f) => {
    const { children: h, ...m } = f, p = y.useMemo(() => m, Object.values(m));
    return /* @__PURE__ */ w.jsx(o.Provider, { value: p, children: h });
  };
  u.displayName = l + "Provider";
  function c(f) {
    const h = y.useContext(o);
    if (h) return h;
    if (i !== void 0) return i;
    throw new Error(`\`${f}\` must be used within \`${l}\``);
  }
  return [u, c];
}
function Lr(l, i = []) {
  let o = [];
  function u(f, h) {
    const m = y.createContext(h), p = o.length;
    o = [...o, h];
    const v = (x) => {
      var N;
      const { scope: T, children: R, ..._ } = x, S = ((N = T == null ? void 0 : T[l]) == null ? void 0 : N[p]) || m, C = y.useMemo(() => _, Object.values(_));
      return /* @__PURE__ */ w.jsx(S.Provider, { value: C, children: R });
    };
    v.displayName = f + "Provider";
    function b(x, T) {
      var S;
      const R = ((S = T == null ? void 0 : T[l]) == null ? void 0 : S[p]) || m, _ = y.useContext(R);
      if (_) return _;
      if (h !== void 0) return h;
      throw new Error(`\`${x}\` must be used within \`${f}\``);
    }
    return [v, b];
  }
  const c = () => {
    const f = o.map((h) => y.createContext(h));
    return function(m) {
      const p = (m == null ? void 0 : m[l]) || f;
      return y.useMemo(
        () => ({ [`__scope${l}`]: { ...m, [l]: p } }),
        [m, p]
      );
    };
  };
  return c.scopeName = l, [u, S1(c, ...i)];
}
function S1(...l) {
  const i = l[0];
  if (l.length === 1) return i;
  const o = () => {
    const u = l.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return function(f) {
      const h = u.reduce((m, { useScope: p, scopeName: v }) => {
        const x = p(f)[`__scope${v}`];
        return { ...m, ...x };
      }, {});
      return y.useMemo(() => ({ [`__scope${i.scopeName}`]: h }), [h]);
    };
  };
  return o.scopeName = i.scopeName, o;
}
var St = globalThis != null && globalThis.document ? y.useLayoutEffect : () => {
}, x1 = dg[" useId ".trim().toString()] || (() => {
}), E1 = 0;
function li(l) {
  const [i, o] = y.useState(x1());
  return St(() => {
    o((u) => u ?? String(E1++));
  }, [l]), i ? `radix-${i}` : "";
}
var w1 = dg[" useInsertionEffect ".trim().toString()] || St;
function bf({
  prop: l,
  defaultProp: i,
  onChange: o = () => {
  },
  caller: u
}) {
  const [c, f, h] = T1({
    defaultProp: i,
    onChange: o
  }), m = l !== void 0, p = m ? l : c;
  {
    const b = y.useRef(l !== void 0);
    y.useEffect(() => {
      const x = b.current;
      x !== m && console.warn(
        `${u} is changing from ${x ? "controlled" : "uncontrolled"} to ${m ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), b.current = m;
    }, [m, u]);
  }
  const v = y.useCallback(
    (b) => {
      var x;
      if (m) {
        const T = A1(b) ? b(l) : b;
        T !== l && ((x = h.current) == null || x.call(h, T));
      } else
        f(b);
    },
    [m, l, f, h]
  );
  return [p, v];
}
function T1({
  defaultProp: l,
  onChange: i
}) {
  const [o, u] = y.useState(l), c = y.useRef(o), f = y.useRef(i);
  return w1(() => {
    f.current = i;
  }, [i]), y.useEffect(() => {
    var h;
    c.current !== o && ((h = f.current) == null || h.call(f, o), c.current = o);
  }, [o, c]), [o, u, f];
}
function A1(l) {
  return typeof l == "function";
}
function oa(l) {
  const i = y.useRef(l);
  return y.useEffect(() => {
    i.current = l;
  }), y.useMemo(() => (...o) => {
    var u;
    return (u = i.current) == null ? void 0 : u.call(i, ...o);
  }, []);
}
function R1(l, i = globalThis == null ? void 0 : globalThis.document) {
  const o = oa(l);
  y.useEffect(() => {
    const u = (c) => {
      c.key === "Escape" && o(c);
    };
    return i.addEventListener("keydown", u, { capture: !0 }), () => i.removeEventListener("keydown", u, { capture: !0 });
  }, [o, i]);
}
var C1 = "DismissableLayer", Sf = "dismissableLayer.update", O1 = "dismissableLayer.pointerDownOutside", M1 = "dismissableLayer.focusOutside", Av, Dg = y.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Au = y.forwardRef(
  (l, i) => {
    const {
      disableOutsidePointerEvents: o = !1,
      onEscapeKeyDown: u,
      onPointerDownOutside: c,
      onFocusOutside: f,
      onInteractOutside: h,
      onDismiss: m,
      ...p
    } = l, v = y.useContext(Dg), [b, x] = y.useState(null), T = (b == null ? void 0 : b.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, R] = y.useState({}), _ = Pe(i, (J) => x(J)), S = Array.from(v.layers), [C] = [...v.layersWithOutsidePointerEventsDisabled].slice(-1), N = S.indexOf(C), z = b ? S.indexOf(b) : -1, H = v.layersWithOutsidePointerEventsDisabled.size > 0, k = z >= N, Q = N1((J) => {
      const K = J.target, te = [...v.branches].some((re) => re.contains(K));
      !k || te || (c == null || c(J), h == null || h(J), J.defaultPrevented || m == null || m());
    }, T), W = z1((J) => {
      const K = J.target;
      [...v.branches].some((re) => re.contains(K)) || (f == null || f(J), h == null || h(J), J.defaultPrevented || m == null || m());
    }, T);
    return R1((J) => {
      z === v.layers.size - 1 && (u == null || u(J), !J.defaultPrevented && m && (J.preventDefault(), m()));
    }, T), y.useEffect(() => {
      if (b)
        return o && (v.layersWithOutsidePointerEventsDisabled.size === 0 && (Av = T.body.style.pointerEvents, T.body.style.pointerEvents = "none"), v.layersWithOutsidePointerEventsDisabled.add(b)), v.layers.add(b), Rv(), () => {
          o && v.layersWithOutsidePointerEventsDisabled.size === 1 && (T.body.style.pointerEvents = Av);
        };
    }, [b, T, o, v]), y.useEffect(() => () => {
      b && (v.layers.delete(b), v.layersWithOutsidePointerEventsDisabled.delete(b), Rv());
    }, [b, v]), y.useEffect(() => {
      const J = () => R({});
      return document.addEventListener(Sf, J), () => document.removeEventListener(Sf, J);
    }, []), /* @__PURE__ */ w.jsx(
      ke.div,
      {
        ...p,
        ref: _,
        style: {
          pointerEvents: H ? k ? "auto" : "none" : void 0,
          ...l.style
        },
        onFocusCapture: Ue(l.onFocusCapture, W.onFocusCapture),
        onBlurCapture: Ue(l.onBlurCapture, W.onBlurCapture),
        onPointerDownCapture: Ue(
          l.onPointerDownCapture,
          Q.onPointerDownCapture
        )
      }
    );
  }
);
Au.displayName = C1;
var D1 = "DismissableLayerBranch", _1 = y.forwardRef((l, i) => {
  const o = y.useContext(Dg), u = y.useRef(null), c = Pe(i, u);
  return y.useEffect(() => {
    const f = u.current;
    if (f)
      return o.branches.add(f), () => {
        o.branches.delete(f);
      };
  }, [o.branches]), /* @__PURE__ */ w.jsx(ke.div, { ...l, ref: c });
});
_1.displayName = D1;
function N1(l, i = globalThis == null ? void 0 : globalThis.document) {
  const o = oa(l), u = y.useRef(!1), c = y.useRef(() => {
  });
  return y.useEffect(() => {
    const f = (m) => {
      if (m.target && !u.current) {
        let p = function() {
          _g(
            O1,
            o,
            v,
            { discrete: !0 }
          );
        };
        const v = { originalEvent: m };
        m.pointerType === "touch" ? (i.removeEventListener("click", c.current), c.current = p, i.addEventListener("click", c.current, { once: !0 })) : p();
      } else
        i.removeEventListener("click", c.current);
      u.current = !1;
    }, h = window.setTimeout(() => {
      i.addEventListener("pointerdown", f);
    }, 0);
    return () => {
      window.clearTimeout(h), i.removeEventListener("pointerdown", f), i.removeEventListener("click", c.current);
    };
  }, [i, o]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => u.current = !0
  };
}
function z1(l, i = globalThis == null ? void 0 : globalThis.document) {
  const o = oa(l), u = y.useRef(!1);
  return y.useEffect(() => {
    const c = (f) => {
      f.target && !u.current && _g(M1, o, { originalEvent: f }, {
        discrete: !1
      });
    };
    return i.addEventListener("focusin", c), () => i.removeEventListener("focusin", c);
  }, [i, o]), {
    onFocusCapture: () => u.current = !0,
    onBlurCapture: () => u.current = !1
  };
}
function Rv() {
  const l = new CustomEvent(Sf);
  document.dispatchEvent(l);
}
function _g(l, i, o, { discrete: u }) {
  const c = o.originalEvent.target, f = new CustomEvent(l, { bubbles: !1, cancelable: !0, detail: o });
  i && c.addEventListener(l, i, { once: !0 }), u ? h1(c, f) : c.dispatchEvent(f);
}
var rf = "focusScope.autoFocusOnMount", of = "focusScope.autoFocusOnUnmount", Cv = { bubbles: !1, cancelable: !0 }, j1 = "FocusScope", Jf = y.forwardRef((l, i) => {
  const {
    loop: o = !1,
    trapped: u = !1,
    onMountAutoFocus: c,
    onUnmountAutoFocus: f,
    ...h
  } = l, [m, p] = y.useState(null), v = oa(c), b = oa(f), x = y.useRef(null), T = Pe(i, (S) => p(S)), R = y.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  y.useEffect(() => {
    if (u) {
      let S = function(H) {
        if (R.paused || !m) return;
        const k = H.target;
        m.contains(k) ? x.current = k : pl(x.current, { select: !0 });
      }, C = function(H) {
        if (R.paused || !m) return;
        const k = H.relatedTarget;
        k !== null && (m.contains(k) || pl(x.current, { select: !0 }));
      }, N = function(H) {
        if (document.activeElement === document.body)
          for (const Q of H)
            Q.removedNodes.length > 0 && pl(m);
      };
      document.addEventListener("focusin", S), document.addEventListener("focusout", C);
      const z = new MutationObserver(N);
      return m && z.observe(m, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", S), document.removeEventListener("focusout", C), z.disconnect();
      };
    }
  }, [u, m, R.paused]), y.useEffect(() => {
    if (m) {
      Mv.add(R);
      const S = document.activeElement;
      if (!m.contains(S)) {
        const N = new CustomEvent(rf, Cv);
        m.addEventListener(rf, v), m.dispatchEvent(N), N.defaultPrevented || (U1(G1(Ng(m)), { select: !0 }), document.activeElement === S && pl(m));
      }
      return () => {
        m.removeEventListener(rf, v), setTimeout(() => {
          const N = new CustomEvent(of, Cv);
          m.addEventListener(of, b), m.dispatchEvent(N), N.defaultPrevented || pl(S ?? document.body, { select: !0 }), m.removeEventListener(of, b), Mv.remove(R);
        }, 0);
      };
    }
  }, [m, v, b, R]);
  const _ = y.useCallback(
    (S) => {
      if (!o && !u || R.paused) return;
      const C = S.key === "Tab" && !S.altKey && !S.ctrlKey && !S.metaKey, N = document.activeElement;
      if (C && N) {
        const z = S.currentTarget, [H, k] = H1(z);
        H && k ? !S.shiftKey && N === k ? (S.preventDefault(), o && pl(H, { select: !0 })) : S.shiftKey && N === H && (S.preventDefault(), o && pl(k, { select: !0 })) : N === z && S.preventDefault();
      }
    },
    [o, u, R.paused]
  );
  return /* @__PURE__ */ w.jsx(ke.div, { tabIndex: -1, ...h, ref: T, onKeyDown: _ });
});
Jf.displayName = j1;
function U1(l, { select: i = !1 } = {}) {
  const o = document.activeElement;
  for (const u of l)
    if (pl(u, { select: i }), document.activeElement !== o) return;
}
function H1(l) {
  const i = Ng(l), o = Ov(i, l), u = Ov(i.reverse(), l);
  return [o, u];
}
function Ng(l) {
  const i = [], o = document.createTreeWalker(l, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (u) => {
      const c = u.tagName === "INPUT" && u.type === "hidden";
      return u.disabled || u.hidden || c ? NodeFilter.FILTER_SKIP : u.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; o.nextNode(); ) i.push(o.currentNode);
  return i;
}
function Ov(l, i) {
  for (const o of l)
    if (!L1(o, { upTo: i })) return o;
}
function L1(l, { upTo: i }) {
  if (getComputedStyle(l).visibility === "hidden") return !0;
  for (; l; ) {
    if (i !== void 0 && l === i) return !1;
    if (getComputedStyle(l).display === "none") return !0;
    l = l.parentElement;
  }
  return !1;
}
function B1(l) {
  return l instanceof HTMLInputElement && "select" in l;
}
function pl(l, { select: i = !1 } = {}) {
  if (l && l.focus) {
    const o = document.activeElement;
    l.focus({ preventScroll: !0 }), l !== o && B1(l) && i && l.select();
  }
}
var Mv = q1();
function q1() {
  let l = [];
  return {
    add(i) {
      const o = l[0];
      i !== o && (o == null || o.pause()), l = Dv(l, i), l.unshift(i);
    },
    remove(i) {
      var o;
      l = Dv(l, i), (o = l[0]) == null || o.resume();
    }
  };
}
function Dv(l, i) {
  const o = [...l], u = o.indexOf(i);
  return u !== -1 && o.splice(u, 1), o;
}
function G1(l) {
  return l.filter((i) => i.tagName !== "A");
}
var Q1 = "Portal", Ff = y.forwardRef((l, i) => {
  var m;
  const { container: o, ...u } = l, [c, f] = y.useState(!1);
  St(() => f(!0), []);
  const h = o || c && ((m = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : m.body);
  return h ? f1.createPortal(/* @__PURE__ */ w.jsx(ke.div, { ...u, ref: i }), h) : null;
});
Ff.displayName = Q1;
function Y1(l, i) {
  return y.useReducer((o, u) => i[o][u] ?? o, l);
}
var Br = (l) => {
  const { present: i, children: o } = l, u = k1(i), c = typeof o == "function" ? o({ present: u.isPresent }) : y.Children.only(o), f = Pe(u.ref, V1(c));
  return typeof o == "function" || u.isPresent ? y.cloneElement(c, { ref: f }) : null;
};
Br.displayName = "Presence";
function k1(l) {
  const [i, o] = y.useState(), u = y.useRef(null), c = y.useRef(l), f = y.useRef("none"), h = l ? "mounted" : "unmounted", [m, p] = Y1(h, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return y.useEffect(() => {
    const v = iu(u.current);
    f.current = m === "mounted" ? v : "none";
  }, [m]), St(() => {
    const v = u.current, b = c.current;
    if (b !== l) {
      const T = f.current, R = iu(v);
      l ? p("MOUNT") : R === "none" || (v == null ? void 0 : v.display) === "none" ? p("UNMOUNT") : p(b && T !== R ? "ANIMATION_OUT" : "UNMOUNT"), c.current = l;
    }
  }, [l, p]), St(() => {
    if (i) {
      let v;
      const b = i.ownerDocument.defaultView ?? window, x = (R) => {
        const S = iu(u.current).includes(R.animationName);
        if (R.target === i && S && (p("ANIMATION_END"), !c.current)) {
          const C = i.style.animationFillMode;
          i.style.animationFillMode = "forwards", v = b.setTimeout(() => {
            i.style.animationFillMode === "forwards" && (i.style.animationFillMode = C);
          });
        }
      }, T = (R) => {
        R.target === i && (f.current = iu(u.current));
      };
      return i.addEventListener("animationstart", T), i.addEventListener("animationcancel", x), i.addEventListener("animationend", x), () => {
        b.clearTimeout(v), i.removeEventListener("animationstart", T), i.removeEventListener("animationcancel", x), i.removeEventListener("animationend", x);
      };
    } else
      p("ANIMATION_END");
  }, [i, p]), {
    isPresent: ["mounted", "unmountSuspended"].includes(m),
    ref: y.useCallback((v) => {
      u.current = v ? getComputedStyle(v) : null, o(v);
    }, [])
  };
}
function iu(l) {
  return (l == null ? void 0 : l.animationName) || "none";
}
function V1(l) {
  var u, c;
  let i = (u = Object.getOwnPropertyDescriptor(l.props, "ref")) == null ? void 0 : u.get, o = i && "isReactWarning" in i && i.isReactWarning;
  return o ? l.ref : (i = (c = Object.getOwnPropertyDescriptor(l, "ref")) == null ? void 0 : c.get, o = i && "isReactWarning" in i && i.isReactWarning, o ? l.props.ref : l.props.ref || l.ref);
}
var uf = 0;
function zg() {
  y.useEffect(() => {
    const l = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", l[0] ?? _v()), document.body.insertAdjacentElement("beforeend", l[1] ?? _v()), uf++, () => {
      uf === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((i) => i.remove()), uf--;
    };
  }, []);
}
function _v() {
  const l = document.createElement("span");
  return l.setAttribute("data-radix-focus-guard", ""), l.tabIndex = 0, l.style.outline = "none", l.style.opacity = "0", l.style.position = "fixed", l.style.pointerEvents = "none", l;
}
var yn = function() {
  return yn = Object.assign || function(i) {
    for (var o, u = 1, c = arguments.length; u < c; u++) {
      o = arguments[u];
      for (var f in o) Object.prototype.hasOwnProperty.call(o, f) && (i[f] = o[f]);
    }
    return i;
  }, yn.apply(this, arguments);
};
function jg(l, i) {
  var o = {};
  for (var u in l) Object.prototype.hasOwnProperty.call(l, u) && i.indexOf(u) < 0 && (o[u] = l[u]);
  if (l != null && typeof Object.getOwnPropertySymbols == "function")
    for (var c = 0, u = Object.getOwnPropertySymbols(l); c < u.length; c++)
      i.indexOf(u[c]) < 0 && Object.prototype.propertyIsEnumerable.call(l, u[c]) && (o[u[c]] = l[u[c]]);
  return o;
}
function X1(l, i, o) {
  if (o || arguments.length === 2) for (var u = 0, c = i.length, f; u < c; u++)
    (f || !(u in i)) && (f || (f = Array.prototype.slice.call(i, 0, u)), f[u] = i[u]);
  return l.concat(f || Array.prototype.slice.call(i));
}
var du = "right-scroll-bar-position", hu = "width-before-scroll-bar", Z1 = "with-scroll-bars-hidden", K1 = "--removed-body-scroll-bar-size";
function sf(l, i) {
  return typeof l == "function" ? l(i) : l && (l.current = i), l;
}
function P1(l, i) {
  var o = y.useState(function() {
    return {
      // value
      value: l,
      // last callback
      callback: i,
      // "memoized" public interface
      facade: {
        get current() {
          return o.value;
        },
        set current(u) {
          var c = o.value;
          c !== u && (o.value = u, o.callback(u, c));
        }
      }
    };
  })[0];
  return o.callback = i, o.facade;
}
var J1 = typeof window < "u" ? y.useLayoutEffect : y.useEffect, Nv = /* @__PURE__ */ new WeakMap();
function F1(l, i) {
  var o = P1(null, function(u) {
    return l.forEach(function(c) {
      return sf(c, u);
    });
  });
  return J1(function() {
    var u = Nv.get(o);
    if (u) {
      var c = new Set(u), f = new Set(l), h = o.current;
      c.forEach(function(m) {
        f.has(m) || sf(m, null);
      }), f.forEach(function(m) {
        c.has(m) || sf(m, h);
      });
    }
    Nv.set(o, l);
  }, [l]), o;
}
function W1(l) {
  return l;
}
function $1(l, i) {
  i === void 0 && (i = W1);
  var o = [], u = !1, c = {
    read: function() {
      if (u)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return o.length ? o[o.length - 1] : l;
    },
    useMedium: function(f) {
      var h = i(f, u);
      return o.push(h), function() {
        o = o.filter(function(m) {
          return m !== h;
        });
      };
    },
    assignSyncMedium: function(f) {
      for (u = !0; o.length; ) {
        var h = o;
        o = [], h.forEach(f);
      }
      o = {
        push: function(m) {
          return f(m);
        },
        filter: function() {
          return o;
        }
      };
    },
    assignMedium: function(f) {
      u = !0;
      var h = [];
      if (o.length) {
        var m = o;
        o = [], m.forEach(f), h = o;
      }
      var p = function() {
        var b = h;
        h = [], b.forEach(f);
      }, v = function() {
        return Promise.resolve().then(p);
      };
      v(), o = {
        push: function(b) {
          h.push(b), v();
        },
        filter: function(b) {
          return h = h.filter(b), o;
        }
      };
    }
  };
  return c;
}
function I1(l) {
  l === void 0 && (l = {});
  var i = $1(null);
  return i.options = yn({ async: !0, ssr: !1 }, l), i;
}
var Ug = function(l) {
  var i = l.sideCar, o = jg(l, ["sideCar"]);
  if (!i)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var u = i.read();
  if (!u)
    throw new Error("Sidecar medium not found");
  return y.createElement(u, yn({}, o));
};
Ug.isSideCarExport = !0;
function eE(l, i) {
  return l.useMedium(i), Ug;
}
var Hg = I1(), cf = function() {
}, Ru = y.forwardRef(function(l, i) {
  var o = y.useRef(null), u = y.useState({
    onScrollCapture: cf,
    onWheelCapture: cf,
    onTouchMoveCapture: cf
  }), c = u[0], f = u[1], h = l.forwardProps, m = l.children, p = l.className, v = l.removeScrollBar, b = l.enabled, x = l.shards, T = l.sideCar, R = l.noRelative, _ = l.noIsolation, S = l.inert, C = l.allowPinchZoom, N = l.as, z = N === void 0 ? "div" : N, H = l.gapMode, k = jg(l, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), Q = T, W = F1([o, i]), J = yn(yn({}, k), c);
  return y.createElement(
    y.Fragment,
    null,
    b && y.createElement(Q, { sideCar: Hg, removeScrollBar: v, shards: x, noRelative: R, noIsolation: _, inert: S, setCallbacks: f, allowPinchZoom: !!C, lockRef: o, gapMode: H }),
    h ? y.cloneElement(y.Children.only(m), yn(yn({}, J), { ref: W })) : y.createElement(z, yn({}, J, { className: p, ref: W }), m)
  );
});
Ru.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ru.classNames = {
  fullWidth: hu,
  zeroRight: du
};
var tE = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function nE() {
  if (!document)
    return null;
  var l = document.createElement("style");
  l.type = "text/css";
  var i = tE();
  return i && l.setAttribute("nonce", i), l;
}
function lE(l, i) {
  l.styleSheet ? l.styleSheet.cssText = i : l.appendChild(document.createTextNode(i));
}
function aE(l) {
  var i = document.head || document.getElementsByTagName("head")[0];
  i.appendChild(l);
}
var iE = function() {
  var l = 0, i = null;
  return {
    add: function(o) {
      l == 0 && (i = nE()) && (lE(i, o), aE(i)), l++;
    },
    remove: function() {
      l--, !l && i && (i.parentNode && i.parentNode.removeChild(i), i = null);
    }
  };
}, rE = function() {
  var l = iE();
  return function(i, o) {
    y.useEffect(function() {
      return l.add(i), function() {
        l.remove();
      };
    }, [i && o]);
  };
}, Lg = function() {
  var l = rE(), i = function(o) {
    var u = o.styles, c = o.dynamic;
    return l(u, c), null;
  };
  return i;
}, oE = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ff = function(l) {
  return parseInt(l || "", 10) || 0;
}, uE = function(l) {
  var i = window.getComputedStyle(document.body), o = i[l === "padding" ? "paddingLeft" : "marginLeft"], u = i[l === "padding" ? "paddingTop" : "marginTop"], c = i[l === "padding" ? "paddingRight" : "marginRight"];
  return [ff(o), ff(u), ff(c)];
}, sE = function(l) {
  if (l === void 0 && (l = "margin"), typeof window > "u")
    return oE;
  var i = uE(l), o = document.documentElement.clientWidth, u = window.innerWidth;
  return {
    left: i[0],
    top: i[1],
    right: i[2],
    gap: Math.max(0, u - o + i[2] - i[0])
  };
}, cE = Lg(), ai = "data-scroll-locked", fE = function(l, i, o, u) {
  var c = l.left, f = l.top, h = l.right, m = l.gap;
  return o === void 0 && (o = "margin"), `
  .`.concat(Z1, ` {
   overflow: hidden `).concat(u, `;
   padding-right: `).concat(m, "px ").concat(u, `;
  }
  body[`).concat(ai, `] {
    overflow: hidden `).concat(u, `;
    overscroll-behavior: contain;
    `).concat([
    i && "position: relative ".concat(u, ";"),
    o === "margin" && `
    padding-left: `.concat(c, `px;
    padding-top: `).concat(f, `px;
    padding-right: `).concat(h, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m, "px ").concat(u, `;
    `),
    o === "padding" && "padding-right: ".concat(m, "px ").concat(u, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(du, ` {
    right: `).concat(m, "px ").concat(u, `;
  }
  
  .`).concat(hu, ` {
    margin-right: `).concat(m, "px ").concat(u, `;
  }
  
  .`).concat(du, " .").concat(du, ` {
    right: 0 `).concat(u, `;
  }
  
  .`).concat(hu, " .").concat(hu, ` {
    margin-right: 0 `).concat(u, `;
  }
  
  body[`).concat(ai, `] {
    `).concat(K1, ": ").concat(m, `px;
  }
`);
}, zv = function() {
  var l = parseInt(document.body.getAttribute(ai) || "0", 10);
  return isFinite(l) ? l : 0;
}, dE = function() {
  y.useEffect(function() {
    return document.body.setAttribute(ai, (zv() + 1).toString()), function() {
      var l = zv() - 1;
      l <= 0 ? document.body.removeAttribute(ai) : document.body.setAttribute(ai, l.toString());
    };
  }, []);
}, hE = function(l) {
  var i = l.noRelative, o = l.noImportant, u = l.gapMode, c = u === void 0 ? "margin" : u;
  dE();
  var f = y.useMemo(function() {
    return sE(c);
  }, [c]);
  return y.createElement(cE, { styles: fE(f, !i, c, o ? "" : "!important") });
}, xf = !1;
if (typeof window < "u")
  try {
    var ru = Object.defineProperty({}, "passive", {
      get: function() {
        return xf = !0, !0;
      }
    });
    window.addEventListener("test", ru, ru), window.removeEventListener("test", ru, ru);
  } catch {
    xf = !1;
  }
var ei = xf ? { passive: !1 } : !1, mE = function(l) {
  return l.tagName === "TEXTAREA";
}, Bg = function(l, i) {
  if (!(l instanceof Element))
    return !1;
  var o = window.getComputedStyle(l);
  return (
    // not-not-scrollable
    o[i] !== "hidden" && // contains scroll inside self
    !(o.overflowY === o.overflowX && !mE(l) && o[i] === "visible")
  );
}, pE = function(l) {
  return Bg(l, "overflowY");
}, vE = function(l) {
  return Bg(l, "overflowX");
}, jv = function(l, i) {
  var o = i.ownerDocument, u = i;
  do {
    typeof ShadowRoot < "u" && u instanceof ShadowRoot && (u = u.host);
    var c = qg(l, u);
    if (c) {
      var f = Gg(l, u), h = f[1], m = f[2];
      if (h > m)
        return !0;
    }
    u = u.parentNode;
  } while (u && u !== o.body);
  return !1;
}, gE = function(l) {
  var i = l.scrollTop, o = l.scrollHeight, u = l.clientHeight;
  return [
    i,
    o,
    u
  ];
}, yE = function(l) {
  var i = l.scrollLeft, o = l.scrollWidth, u = l.clientWidth;
  return [
    i,
    o,
    u
  ];
}, qg = function(l, i) {
  return l === "v" ? pE(i) : vE(i);
}, Gg = function(l, i) {
  return l === "v" ? gE(i) : yE(i);
}, bE = function(l, i) {
  return l === "h" && i === "rtl" ? -1 : 1;
}, SE = function(l, i, o, u, c) {
  var f = bE(l, window.getComputedStyle(i).direction), h = f * u, m = o.target, p = i.contains(m), v = !1, b = h > 0, x = 0, T = 0;
  do {
    if (!m)
      break;
    var R = Gg(l, m), _ = R[0], S = R[1], C = R[2], N = S - C - f * _;
    (_ || N) && qg(l, m) && (x += N, T += _);
    var z = m.parentNode;
    m = z && z.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? z.host : z;
  } while (
    // portaled content
    !p && m !== document.body || // self content
    p && (i.contains(m) || i === m)
  );
  return (b && Math.abs(x) < 1 || !b && Math.abs(T) < 1) && (v = !0), v;
}, ou = function(l) {
  return "changedTouches" in l ? [l.changedTouches[0].clientX, l.changedTouches[0].clientY] : [0, 0];
}, Uv = function(l) {
  return [l.deltaX, l.deltaY];
}, Hv = function(l) {
  return l && "current" in l ? l.current : l;
}, xE = function(l, i) {
  return l[0] === i[0] && l[1] === i[1];
}, EE = function(l) {
  return `
  .block-interactivity-`.concat(l, ` {pointer-events: none;}
  .allow-interactivity-`).concat(l, ` {pointer-events: all;}
`);
}, wE = 0, ti = [];
function TE(l) {
  var i = y.useRef([]), o = y.useRef([0, 0]), u = y.useRef(), c = y.useState(wE++)[0], f = y.useState(Lg)[0], h = y.useRef(l);
  y.useEffect(function() {
    h.current = l;
  }, [l]), y.useEffect(function() {
    if (l.inert) {
      document.body.classList.add("block-interactivity-".concat(c));
      var S = X1([l.lockRef.current], (l.shards || []).map(Hv), !0).filter(Boolean);
      return S.forEach(function(C) {
        return C.classList.add("allow-interactivity-".concat(c));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(c)), S.forEach(function(C) {
          return C.classList.remove("allow-interactivity-".concat(c));
        });
      };
    }
  }, [l.inert, l.lockRef.current, l.shards]);
  var m = y.useCallback(function(S, C) {
    if ("touches" in S && S.touches.length === 2 || S.type === "wheel" && S.ctrlKey)
      return !h.current.allowPinchZoom;
    var N = ou(S), z = o.current, H = "deltaX" in S ? S.deltaX : z[0] - N[0], k = "deltaY" in S ? S.deltaY : z[1] - N[1], Q, W = S.target, J = Math.abs(H) > Math.abs(k) ? "h" : "v";
    if ("touches" in S && J === "h" && W.type === "range")
      return !1;
    var K = jv(J, W);
    if (!K)
      return !0;
    if (K ? Q = J : (Q = J === "v" ? "h" : "v", K = jv(J, W)), !K)
      return !1;
    if (!u.current && "changedTouches" in S && (H || k) && (u.current = Q), !Q)
      return !0;
    var te = u.current || Q;
    return SE(te, C, S, te === "h" ? H : k);
  }, []), p = y.useCallback(function(S) {
    var C = S;
    if (!(!ti.length || ti[ti.length - 1] !== f)) {
      var N = "deltaY" in C ? Uv(C) : ou(C), z = i.current.filter(function(Q) {
        return Q.name === C.type && (Q.target === C.target || C.target === Q.shadowParent) && xE(Q.delta, N);
      })[0];
      if (z && z.should) {
        C.cancelable && C.preventDefault();
        return;
      }
      if (!z) {
        var H = (h.current.shards || []).map(Hv).filter(Boolean).filter(function(Q) {
          return Q.contains(C.target);
        }), k = H.length > 0 ? m(C, H[0]) : !h.current.noIsolation;
        k && C.cancelable && C.preventDefault();
      }
    }
  }, []), v = y.useCallback(function(S, C, N, z) {
    var H = { name: S, delta: C, target: N, should: z, shadowParent: AE(N) };
    i.current.push(H), setTimeout(function() {
      i.current = i.current.filter(function(k) {
        return k !== H;
      });
    }, 1);
  }, []), b = y.useCallback(function(S) {
    o.current = ou(S), u.current = void 0;
  }, []), x = y.useCallback(function(S) {
    v(S.type, Uv(S), S.target, m(S, l.lockRef.current));
  }, []), T = y.useCallback(function(S) {
    v(S.type, ou(S), S.target, m(S, l.lockRef.current));
  }, []);
  y.useEffect(function() {
    return ti.push(f), l.setCallbacks({
      onScrollCapture: x,
      onWheelCapture: x,
      onTouchMoveCapture: T
    }), document.addEventListener("wheel", p, ei), document.addEventListener("touchmove", p, ei), document.addEventListener("touchstart", b, ei), function() {
      ti = ti.filter(function(S) {
        return S !== f;
      }), document.removeEventListener("wheel", p, ei), document.removeEventListener("touchmove", p, ei), document.removeEventListener("touchstart", b, ei);
    };
  }, []);
  var R = l.removeScrollBar, _ = l.inert;
  return y.createElement(
    y.Fragment,
    null,
    _ ? y.createElement(f, { styles: EE(c) }) : null,
    R ? y.createElement(hE, { noRelative: l.noRelative, gapMode: l.gapMode }) : null
  );
}
function AE(l) {
  for (var i = null; l !== null; )
    l instanceof ShadowRoot && (i = l.host, l = l.host), l = l.parentNode;
  return i;
}
const RE = eE(Hg, TE);
var Wf = y.forwardRef(function(l, i) {
  return y.createElement(Ru, yn({}, l, { ref: i, sideCar: RE }));
});
Wf.classNames = Ru.classNames;
var CE = function(l) {
  if (typeof document > "u")
    return null;
  var i = Array.isArray(l) ? l[0] : l;
  return i.ownerDocument.body;
}, ni = /* @__PURE__ */ new WeakMap(), uu = /* @__PURE__ */ new WeakMap(), su = {}, df = 0, Qg = function(l) {
  return l && (l.host || Qg(l.parentNode));
}, OE = function(l, i) {
  return i.map(function(o) {
    if (l.contains(o))
      return o;
    var u = Qg(o);
    return u && l.contains(u) ? u : (console.error("aria-hidden", o, "in not contained inside", l, ". Doing nothing"), null);
  }).filter(function(o) {
    return !!o;
  });
}, ME = function(l, i, o, u) {
  var c = OE(i, Array.isArray(l) ? l : [l]);
  su[o] || (su[o] = /* @__PURE__ */ new WeakMap());
  var f = su[o], h = [], m = /* @__PURE__ */ new Set(), p = new Set(c), v = function(x) {
    !x || m.has(x) || (m.add(x), v(x.parentNode));
  };
  c.forEach(v);
  var b = function(x) {
    !x || p.has(x) || Array.prototype.forEach.call(x.children, function(T) {
      if (m.has(T))
        b(T);
      else
        try {
          var R = T.getAttribute(u), _ = R !== null && R !== "false", S = (ni.get(T) || 0) + 1, C = (f.get(T) || 0) + 1;
          ni.set(T, S), f.set(T, C), h.push(T), S === 1 && _ && uu.set(T, !0), C === 1 && T.setAttribute(o, "true"), _ || T.setAttribute(u, "true");
        } catch (N) {
          console.error("aria-hidden: cannot operate on ", T, N);
        }
    });
  };
  return b(i), m.clear(), df++, function() {
    h.forEach(function(x) {
      var T = ni.get(x) - 1, R = f.get(x) - 1;
      ni.set(x, T), f.set(x, R), T || (uu.has(x) || x.removeAttribute(u), uu.delete(x)), R || x.removeAttribute(o);
    }), df--, df || (ni = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap(), uu = /* @__PURE__ */ new WeakMap(), su = {});
  };
}, Yg = function(l, i, o) {
  o === void 0 && (o = "data-aria-hidden");
  var u = Array.from(Array.isArray(l) ? l : [l]), c = CE(l);
  return c ? (u.push.apply(u, Array.from(c.querySelectorAll("[aria-live], script"))), ME(u, c, o, "aria-hidden")) : function() {
    return null;
  };
}, Cu = "Dialog", [kg, dR] = Lr(Cu), [DE, sn] = kg(Cu), Vg = (l) => {
  const {
    __scopeDialog: i,
    children: o,
    open: u,
    defaultOpen: c,
    onOpenChange: f,
    modal: h = !0
  } = l, m = y.useRef(null), p = y.useRef(null), [v, b] = bf({
    prop: u,
    defaultProp: c ?? !1,
    onChange: f,
    caller: Cu
  });
  return /* @__PURE__ */ w.jsx(
    DE,
    {
      scope: i,
      triggerRef: m,
      contentRef: p,
      contentId: li(),
      titleId: li(),
      descriptionId: li(),
      open: v,
      onOpenChange: b,
      onOpenToggle: y.useCallback(() => b((x) => !x), [b]),
      modal: h,
      children: o
    }
  );
};
Vg.displayName = Cu;
var Xg = "DialogTrigger", _E = y.forwardRef(
  (l, i) => {
    const { __scopeDialog: o, ...u } = l, c = sn(Xg, o), f = Pe(i, c.triggerRef);
    return /* @__PURE__ */ w.jsx(
      ke.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": c.open,
        "aria-controls": c.contentId,
        "data-state": ed(c.open),
        ...u,
        ref: f,
        onClick: Ue(l.onClick, c.onOpenToggle)
      }
    );
  }
);
_E.displayName = Xg;
var $f = "DialogPortal", [NE, Zg] = kg($f, {
  forceMount: void 0
}), Kg = (l) => {
  const { __scopeDialog: i, forceMount: o, children: u, container: c } = l, f = sn($f, i);
  return /* @__PURE__ */ w.jsx(NE, { scope: i, forceMount: o, children: y.Children.map(u, (h) => /* @__PURE__ */ w.jsx(Br, { present: o || f.open, children: /* @__PURE__ */ w.jsx(Ff, { asChild: !0, container: c, children: h }) })) });
};
Kg.displayName = $f;
var pu = "DialogOverlay", Pg = y.forwardRef(
  (l, i) => {
    const o = Zg(pu, l.__scopeDialog), { forceMount: u = o.forceMount, ...c } = l, f = sn(pu, l.__scopeDialog);
    return f.modal ? /* @__PURE__ */ w.jsx(Br, { present: u || f.open, children: /* @__PURE__ */ w.jsx(jE, { ...c, ref: i }) }) : null;
  }
);
Pg.displayName = pu;
var zE = /* @__PURE__ */ Cr("DialogOverlay.RemoveScroll"), jE = y.forwardRef(
  (l, i) => {
    const { __scopeDialog: o, ...u } = l, c = sn(pu, o);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ w.jsx(Wf, { as: zE, allowPinchZoom: !0, shards: [c.contentRef], children: /* @__PURE__ */ w.jsx(
        ke.div,
        {
          "data-state": ed(c.open),
          ...u,
          ref: i,
          style: { pointerEvents: "auto", ...u.style }
        }
      ) })
    );
  }
), ua = "DialogContent", Jg = y.forwardRef(
  (l, i) => {
    const o = Zg(ua, l.__scopeDialog), { forceMount: u = o.forceMount, ...c } = l, f = sn(ua, l.__scopeDialog);
    return /* @__PURE__ */ w.jsx(Br, { present: u || f.open, children: f.modal ? /* @__PURE__ */ w.jsx(UE, { ...c, ref: i }) : /* @__PURE__ */ w.jsx(HE, { ...c, ref: i }) });
  }
);
Jg.displayName = ua;
var UE = y.forwardRef(
  (l, i) => {
    const o = sn(ua, l.__scopeDialog), u = y.useRef(null), c = Pe(i, o.contentRef, u);
    return y.useEffect(() => {
      const f = u.current;
      if (f) return Yg(f);
    }, []), /* @__PURE__ */ w.jsx(
      Fg,
      {
        ...l,
        ref: c,
        trapFocus: o.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Ue(l.onCloseAutoFocus, (f) => {
          var h;
          f.preventDefault(), (h = o.triggerRef.current) == null || h.focus();
        }),
        onPointerDownOutside: Ue(l.onPointerDownOutside, (f) => {
          const h = f.detail.originalEvent, m = h.button === 0 && h.ctrlKey === !0;
          (h.button === 2 || m) && f.preventDefault();
        }),
        onFocusOutside: Ue(
          l.onFocusOutside,
          (f) => f.preventDefault()
        )
      }
    );
  }
), HE = y.forwardRef(
  (l, i) => {
    const o = sn(ua, l.__scopeDialog), u = y.useRef(!1), c = y.useRef(!1);
    return /* @__PURE__ */ w.jsx(
      Fg,
      {
        ...l,
        ref: i,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (f) => {
          var h, m;
          (h = l.onCloseAutoFocus) == null || h.call(l, f), f.defaultPrevented || (u.current || (m = o.triggerRef.current) == null || m.focus(), f.preventDefault()), u.current = !1, c.current = !1;
        },
        onInteractOutside: (f) => {
          var p, v;
          (p = l.onInteractOutside) == null || p.call(l, f), f.defaultPrevented || (u.current = !0, f.detail.originalEvent.type === "pointerdown" && (c.current = !0));
          const h = f.target;
          ((v = o.triggerRef.current) == null ? void 0 : v.contains(h)) && f.preventDefault(), f.detail.originalEvent.type === "focusin" && c.current && f.preventDefault();
        }
      }
    );
  }
), Fg = y.forwardRef(
  (l, i) => {
    const { __scopeDialog: o, trapFocus: u, onOpenAutoFocus: c, onCloseAutoFocus: f, ...h } = l, m = sn(ua, o), p = y.useRef(null), v = Pe(i, p);
    return zg(), /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
      /* @__PURE__ */ w.jsx(
        Jf,
        {
          asChild: !0,
          loop: !0,
          trapped: u,
          onMountAutoFocus: c,
          onUnmountAutoFocus: f,
          children: /* @__PURE__ */ w.jsx(
            Au,
            {
              role: "dialog",
              id: m.contentId,
              "aria-describedby": m.descriptionId,
              "aria-labelledby": m.titleId,
              "data-state": ed(m.open),
              ...h,
              ref: v,
              onDismiss: () => m.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
        /* @__PURE__ */ w.jsx(LE, { titleId: m.titleId }),
        /* @__PURE__ */ w.jsx(qE, { contentRef: p, descriptionId: m.descriptionId })
      ] })
    ] });
  }
), If = "DialogTitle", Wg = y.forwardRef(
  (l, i) => {
    const { __scopeDialog: o, ...u } = l, c = sn(If, o);
    return /* @__PURE__ */ w.jsx(ke.h2, { id: c.titleId, ...u, ref: i });
  }
);
Wg.displayName = If;
var $g = "DialogDescription", Ig = y.forwardRef(
  (l, i) => {
    const { __scopeDialog: o, ...u } = l, c = sn($g, o);
    return /* @__PURE__ */ w.jsx(ke.p, { id: c.descriptionId, ...u, ref: i });
  }
);
Ig.displayName = $g;
var ey = "DialogClose", ty = y.forwardRef(
  (l, i) => {
    const { __scopeDialog: o, ...u } = l, c = sn(ey, o);
    return /* @__PURE__ */ w.jsx(
      ke.button,
      {
        type: "button",
        ...u,
        ref: i,
        onClick: Ue(l.onClick, () => c.onOpenChange(!1))
      }
    );
  }
);
ty.displayName = ey;
function ed(l) {
  return l ? "open" : "closed";
}
var ny = "DialogTitleWarning", [hR, ly] = b1(ny, {
  contentName: ua,
  titleName: If,
  docsSlug: "dialog"
}), LE = ({ titleId: l }) => {
  const i = ly(ny), o = `\`${i.contentName}\` requires a \`${i.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${i.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${i.docsSlug}`;
  return y.useEffect(() => {
    l && (document.getElementById(l) || console.error(o));
  }, [o, l]), null;
}, BE = "DialogDescriptionWarning", qE = ({ contentRef: l, descriptionId: i }) => {
  const u = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${ly(BE).contentName}}.`;
  return y.useEffect(() => {
    var f;
    const c = (f = l.current) == null ? void 0 : f.getAttribute("aria-describedby");
    i && c && (document.getElementById(i) || console.warn(u));
  }, [u, l, i]), null;
}, GE = Vg, QE = Kg, YE = Pg, kE = Jg, VE = Wg, XE = Ig, ZE = ty;
function KE({ ...l }) {
  return /* @__PURE__ */ w.jsx(GE, { "data-slot": "sheet", ...l });
}
function PE({
  ...l
}) {
  return /* @__PURE__ */ w.jsx(QE, { "data-slot": "sheet-portal", ...l });
}
function JE({
  className: l,
  ...i
}) {
  return /* @__PURE__ */ w.jsx(
    YE,
    {
      "data-slot": "sheet-overlay",
      className: et(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        l
      ),
      ...i
    }
  );
}
function FE({
  className: l,
  children: i,
  side: o = "right",
  ...u
}) {
  return /* @__PURE__ */ w.jsxs(PE, { children: [
    /* @__PURE__ */ w.jsx(JE, {}),
    /* @__PURE__ */ w.jsxs(
      kE,
      {
        "data-slot": "sheet-content",
        className: et(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          o === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          o === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          o === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          o === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          l
        ),
        ...u,
        children: [
          i,
          /* @__PURE__ */ w.jsxs(ZE, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ w.jsx(Mx, { className: "size-4" }),
            /* @__PURE__ */ w.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function WE({ className: l, ...i }) {
  return /* @__PURE__ */ w.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: et("flex flex-col gap-1.5 p-4", l),
      ...i
    }
  );
}
function $E({
  className: l,
  ...i
}) {
  return /* @__PURE__ */ w.jsx(
    VE,
    {
      "data-slot": "sheet-title",
      className: et("text-foreground font-semibold", l),
      ...i
    }
  );
}
function IE({
  className: l,
  ...i
}) {
  return /* @__PURE__ */ w.jsx(
    XE,
    {
      "data-slot": "sheet-description",
      className: et("text-muted-foreground text-sm", l),
      ...i
    }
  );
}
const ew = ["top", "right", "bottom", "left"], Rl = Math.min, Qt = Math.max, vu = Math.round, cu = Math.floor, Sn = (l) => ({
  x: l,
  y: l
}), tw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, nw = {
  start: "end",
  end: "start"
};
function Ef(l, i, o) {
  return Qt(l, Rl(i, o));
}
function Qn(l, i) {
  return typeof l == "function" ? l(i) : l;
}
function Yn(l) {
  return l.split("-")[0];
}
function Ei(l) {
  return l.split("-")[1];
}
function td(l) {
  return l === "x" ? "y" : "x";
}
function nd(l) {
  return l === "y" ? "height" : "width";
}
function bn(l) {
  return ["top", "bottom"].includes(Yn(l)) ? "y" : "x";
}
function ld(l) {
  return td(bn(l));
}
function lw(l, i, o) {
  o === void 0 && (o = !1);
  const u = Ei(l), c = ld(l), f = nd(c);
  let h = c === "x" ? u === (o ? "end" : "start") ? "right" : "left" : u === "start" ? "bottom" : "top";
  return i.reference[f] > i.floating[f] && (h = gu(h)), [h, gu(h)];
}
function aw(l) {
  const i = gu(l);
  return [wf(l), i, wf(i)];
}
function wf(l) {
  return l.replace(/start|end/g, (i) => nw[i]);
}
function iw(l, i, o) {
  const u = ["left", "right"], c = ["right", "left"], f = ["top", "bottom"], h = ["bottom", "top"];
  switch (l) {
    case "top":
    case "bottom":
      return o ? i ? c : u : i ? u : c;
    case "left":
    case "right":
      return i ? f : h;
    default:
      return [];
  }
}
function rw(l, i, o, u) {
  const c = Ei(l);
  let f = iw(Yn(l), o === "start", u);
  return c && (f = f.map((h) => h + "-" + c), i && (f = f.concat(f.map(wf)))), f;
}
function gu(l) {
  return l.replace(/left|right|bottom|top/g, (i) => tw[i]);
}
function ow(l) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...l
  };
}
function ay(l) {
  return typeof l != "number" ? ow(l) : {
    top: l,
    right: l,
    bottom: l,
    left: l
  };
}
function yu(l) {
  const {
    x: i,
    y: o,
    width: u,
    height: c
  } = l;
  return {
    width: u,
    height: c,
    top: o,
    left: i,
    right: i + u,
    bottom: o + c,
    x: i,
    y: o
  };
}
function Lv(l, i, o) {
  let {
    reference: u,
    floating: c
  } = l;
  const f = bn(i), h = ld(i), m = nd(h), p = Yn(i), v = f === "y", b = u.x + u.width / 2 - c.width / 2, x = u.y + u.height / 2 - c.height / 2, T = u[m] / 2 - c[m] / 2;
  let R;
  switch (p) {
    case "top":
      R = {
        x: b,
        y: u.y - c.height
      };
      break;
    case "bottom":
      R = {
        x: b,
        y: u.y + u.height
      };
      break;
    case "right":
      R = {
        x: u.x + u.width,
        y: x
      };
      break;
    case "left":
      R = {
        x: u.x - c.width,
        y: x
      };
      break;
    default:
      R = {
        x: u.x,
        y: u.y
      };
  }
  switch (Ei(i)) {
    case "start":
      R[h] -= T * (o && v ? -1 : 1);
      break;
    case "end":
      R[h] += T * (o && v ? -1 : 1);
      break;
  }
  return R;
}
const uw = async (l, i, o) => {
  const {
    placement: u = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: h
  } = o, m = f.filter(Boolean), p = await (h.isRTL == null ? void 0 : h.isRTL(i));
  let v = await h.getElementRects({
    reference: l,
    floating: i,
    strategy: c
  }), {
    x: b,
    y: x
  } = Lv(v, u, p), T = u, R = {}, _ = 0;
  for (let S = 0; S < m.length; S++) {
    const {
      name: C,
      fn: N
    } = m[S], {
      x: z,
      y: H,
      data: k,
      reset: Q
    } = await N({
      x: b,
      y: x,
      initialPlacement: u,
      placement: T,
      strategy: c,
      middlewareData: R,
      rects: v,
      platform: h,
      elements: {
        reference: l,
        floating: i
      }
    });
    b = z ?? b, x = H ?? x, R = {
      ...R,
      [C]: {
        ...R[C],
        ...k
      }
    }, Q && _ <= 50 && (_++, typeof Q == "object" && (Q.placement && (T = Q.placement), Q.rects && (v = Q.rects === !0 ? await h.getElementRects({
      reference: l,
      floating: i,
      strategy: c
    }) : Q.rects), {
      x: b,
      y: x
    } = Lv(v, T, p)), S = -1);
  }
  return {
    x: b,
    y: x,
    placement: T,
    strategy: c,
    middlewareData: R
  };
};
async function Or(l, i) {
  var o;
  i === void 0 && (i = {});
  const {
    x: u,
    y: c,
    platform: f,
    rects: h,
    elements: m,
    strategy: p
  } = l, {
    boundary: v = "clippingAncestors",
    rootBoundary: b = "viewport",
    elementContext: x = "floating",
    altBoundary: T = !1,
    padding: R = 0
  } = Qn(i, l), _ = ay(R), C = m[T ? x === "floating" ? "reference" : "floating" : x], N = yu(await f.getClippingRect({
    element: (o = await (f.isElement == null ? void 0 : f.isElement(C))) == null || o ? C : C.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(m.floating)),
    boundary: v,
    rootBoundary: b,
    strategy: p
  })), z = x === "floating" ? {
    x: u,
    y: c,
    width: h.floating.width,
    height: h.floating.height
  } : h.reference, H = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m.floating)), k = await (f.isElement == null ? void 0 : f.isElement(H)) ? await (f.getScale == null ? void 0 : f.getScale(H)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, Q = yu(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: z,
    offsetParent: H,
    strategy: p
  }) : z);
  return {
    top: (N.top - Q.top + _.top) / k.y,
    bottom: (Q.bottom - N.bottom + _.bottom) / k.y,
    left: (N.left - Q.left + _.left) / k.x,
    right: (Q.right - N.right + _.right) / k.x
  };
}
const sw = (l) => ({
  name: "arrow",
  options: l,
  async fn(i) {
    const {
      x: o,
      y: u,
      placement: c,
      rects: f,
      platform: h,
      elements: m,
      middlewareData: p
    } = i, {
      element: v,
      padding: b = 0
    } = Qn(l, i) || {};
    if (v == null)
      return {};
    const x = ay(b), T = {
      x: o,
      y: u
    }, R = ld(c), _ = nd(R), S = await h.getDimensions(v), C = R === "y", N = C ? "top" : "left", z = C ? "bottom" : "right", H = C ? "clientHeight" : "clientWidth", k = f.reference[_] + f.reference[R] - T[R] - f.floating[_], Q = T[R] - f.reference[R], W = await (h.getOffsetParent == null ? void 0 : h.getOffsetParent(v));
    let J = W ? W[H] : 0;
    (!J || !await (h.isElement == null ? void 0 : h.isElement(W))) && (J = m.floating[H] || f.floating[_]);
    const K = k / 2 - Q / 2, te = J / 2 - S[_] / 2 - 1, re = Rl(x[N], te), ge = Rl(x[z], te), ce = re, ye = J - S[_] - ge, Se = J / 2 - S[_] / 2 + K, ve = Ef(ce, Se, ye), j = !p.arrow && Ei(c) != null && Se !== ve && f.reference[_] / 2 - (Se < ce ? re : ge) - S[_] / 2 < 0, P = j ? Se < ce ? Se - ce : Se - ye : 0;
    return {
      [R]: T[R] + P,
      data: {
        [R]: ve,
        centerOffset: Se - ve - P,
        ...j && {
          alignmentOffset: P
        }
      },
      reset: j
    };
  }
}), cw = function(l) {
  return l === void 0 && (l = {}), {
    name: "flip",
    options: l,
    async fn(i) {
      var o, u;
      const {
        placement: c,
        middlewareData: f,
        rects: h,
        initialPlacement: m,
        platform: p,
        elements: v
      } = i, {
        mainAxis: b = !0,
        crossAxis: x = !0,
        fallbackPlacements: T,
        fallbackStrategy: R = "bestFit",
        fallbackAxisSideDirection: _ = "none",
        flipAlignment: S = !0,
        ...C
      } = Qn(l, i);
      if ((o = f.arrow) != null && o.alignmentOffset)
        return {};
      const N = Yn(c), z = bn(m), H = Yn(m) === m, k = await (p.isRTL == null ? void 0 : p.isRTL(v.floating)), Q = T || (H || !S ? [gu(m)] : aw(m)), W = _ !== "none";
      !T && W && Q.push(...rw(m, S, _, k));
      const J = [m, ...Q], K = await Or(i, C), te = [];
      let re = ((u = f.flip) == null ? void 0 : u.overflows) || [];
      if (b && te.push(K[N]), x) {
        const Se = lw(c, h, k);
        te.push(K[Se[0]], K[Se[1]]);
      }
      if (re = [...re, {
        placement: c,
        overflows: te
      }], !te.every((Se) => Se <= 0)) {
        var ge, ce;
        const Se = (((ge = f.flip) == null ? void 0 : ge.index) || 0) + 1, ve = J[Se];
        if (ve && (!(x === "alignment" ? z !== bn(ve) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        re.every((G) => G.overflows[0] > 0 && bn(G.placement) === z)))
          return {
            data: {
              index: Se,
              overflows: re
            },
            reset: {
              placement: ve
            }
          };
        let j = (ce = re.filter((P) => P.overflows[0] <= 0).sort((P, G) => P.overflows[1] - G.overflows[1])[0]) == null ? void 0 : ce.placement;
        if (!j)
          switch (R) {
            case "bestFit": {
              var ye;
              const P = (ye = re.filter((G) => {
                if (W) {
                  const ue = bn(G.placement);
                  return ue === z || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ue === "y";
                }
                return !0;
              }).map((G) => [G.placement, G.overflows.filter((ue) => ue > 0).reduce((ue, A) => ue + A, 0)]).sort((G, ue) => G[1] - ue[1])[0]) == null ? void 0 : ye[0];
              P && (j = P);
              break;
            }
            case "initialPlacement":
              j = m;
              break;
          }
        if (c !== j)
          return {
            reset: {
              placement: j
            }
          };
      }
      return {};
    }
  };
};
function Bv(l, i) {
  return {
    top: l.top - i.height,
    right: l.right - i.width,
    bottom: l.bottom - i.height,
    left: l.left - i.width
  };
}
function qv(l) {
  return ew.some((i) => l[i] >= 0);
}
const fw = function(l) {
  return l === void 0 && (l = {}), {
    name: "hide",
    options: l,
    async fn(i) {
      const {
        rects: o
      } = i, {
        strategy: u = "referenceHidden",
        ...c
      } = Qn(l, i);
      switch (u) {
        case "referenceHidden": {
          const f = await Or(i, {
            ...c,
            elementContext: "reference"
          }), h = Bv(f, o.reference);
          return {
            data: {
              referenceHiddenOffsets: h,
              referenceHidden: qv(h)
            }
          };
        }
        case "escaped": {
          const f = await Or(i, {
            ...c,
            altBoundary: !0
          }), h = Bv(f, o.floating);
          return {
            data: {
              escapedOffsets: h,
              escaped: qv(h)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function dw(l, i) {
  const {
    placement: o,
    platform: u,
    elements: c
  } = l, f = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), h = Yn(o), m = Ei(o), p = bn(o) === "y", v = ["left", "top"].includes(h) ? -1 : 1, b = f && p ? -1 : 1, x = Qn(i, l);
  let {
    mainAxis: T,
    crossAxis: R,
    alignmentAxis: _
  } = typeof x == "number" ? {
    mainAxis: x,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: x.mainAxis || 0,
    crossAxis: x.crossAxis || 0,
    alignmentAxis: x.alignmentAxis
  };
  return m && typeof _ == "number" && (R = m === "end" ? _ * -1 : _), p ? {
    x: R * b,
    y: T * v
  } : {
    x: T * v,
    y: R * b
  };
}
const hw = function(l) {
  return l === void 0 && (l = 0), {
    name: "offset",
    options: l,
    async fn(i) {
      var o, u;
      const {
        x: c,
        y: f,
        placement: h,
        middlewareData: m
      } = i, p = await dw(i, l);
      return h === ((o = m.offset) == null ? void 0 : o.placement) && (u = m.arrow) != null && u.alignmentOffset ? {} : {
        x: c + p.x,
        y: f + p.y,
        data: {
          ...p,
          placement: h
        }
      };
    }
  };
}, mw = function(l) {
  return l === void 0 && (l = {}), {
    name: "shift",
    options: l,
    async fn(i) {
      const {
        x: o,
        y: u,
        placement: c
      } = i, {
        mainAxis: f = !0,
        crossAxis: h = !1,
        limiter: m = {
          fn: (C) => {
            let {
              x: N,
              y: z
            } = C;
            return {
              x: N,
              y: z
            };
          }
        },
        ...p
      } = Qn(l, i), v = {
        x: o,
        y: u
      }, b = await Or(i, p), x = bn(Yn(c)), T = td(x);
      let R = v[T], _ = v[x];
      if (f) {
        const C = T === "y" ? "top" : "left", N = T === "y" ? "bottom" : "right", z = R + b[C], H = R - b[N];
        R = Ef(z, R, H);
      }
      if (h) {
        const C = x === "y" ? "top" : "left", N = x === "y" ? "bottom" : "right", z = _ + b[C], H = _ - b[N];
        _ = Ef(z, _, H);
      }
      const S = m.fn({
        ...i,
        [T]: R,
        [x]: _
      });
      return {
        ...S,
        data: {
          x: S.x - o,
          y: S.y - u,
          enabled: {
            [T]: f,
            [x]: h
          }
        }
      };
    }
  };
}, pw = function(l) {
  return l === void 0 && (l = {}), {
    options: l,
    fn(i) {
      const {
        x: o,
        y: u,
        placement: c,
        rects: f,
        middlewareData: h
      } = i, {
        offset: m = 0,
        mainAxis: p = !0,
        crossAxis: v = !0
      } = Qn(l, i), b = {
        x: o,
        y: u
      }, x = bn(c), T = td(x);
      let R = b[T], _ = b[x];
      const S = Qn(m, i), C = typeof S == "number" ? {
        mainAxis: S,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...S
      };
      if (p) {
        const H = T === "y" ? "height" : "width", k = f.reference[T] - f.floating[H] + C.mainAxis, Q = f.reference[T] + f.reference[H] - C.mainAxis;
        R < k ? R = k : R > Q && (R = Q);
      }
      if (v) {
        var N, z;
        const H = T === "y" ? "width" : "height", k = ["top", "left"].includes(Yn(c)), Q = f.reference[x] - f.floating[H] + (k && ((N = h.offset) == null ? void 0 : N[x]) || 0) + (k ? 0 : C.crossAxis), W = f.reference[x] + f.reference[H] + (k ? 0 : ((z = h.offset) == null ? void 0 : z[x]) || 0) - (k ? C.crossAxis : 0);
        _ < Q ? _ = Q : _ > W && (_ = W);
      }
      return {
        [T]: R,
        [x]: _
      };
    }
  };
}, vw = function(l) {
  return l === void 0 && (l = {}), {
    name: "size",
    options: l,
    async fn(i) {
      var o, u;
      const {
        placement: c,
        rects: f,
        platform: h,
        elements: m
      } = i, {
        apply: p = () => {
        },
        ...v
      } = Qn(l, i), b = await Or(i, v), x = Yn(c), T = Ei(c), R = bn(c) === "y", {
        width: _,
        height: S
      } = f.floating;
      let C, N;
      x === "top" || x === "bottom" ? (C = x, N = T === (await (h.isRTL == null ? void 0 : h.isRTL(m.floating)) ? "start" : "end") ? "left" : "right") : (N = x, C = T === "end" ? "top" : "bottom");
      const z = S - b.top - b.bottom, H = _ - b.left - b.right, k = Rl(S - b[C], z), Q = Rl(_ - b[N], H), W = !i.middlewareData.shift;
      let J = k, K = Q;
      if ((o = i.middlewareData.shift) != null && o.enabled.x && (K = H), (u = i.middlewareData.shift) != null && u.enabled.y && (J = z), W && !T) {
        const re = Qt(b.left, 0), ge = Qt(b.right, 0), ce = Qt(b.top, 0), ye = Qt(b.bottom, 0);
        R ? K = _ - 2 * (re !== 0 || ge !== 0 ? re + ge : Qt(b.left, b.right)) : J = S - 2 * (ce !== 0 || ye !== 0 ? ce + ye : Qt(b.top, b.bottom));
      }
      await p({
        ...i,
        availableWidth: K,
        availableHeight: J
      });
      const te = await h.getDimensions(m.floating);
      return _ !== te.width || S !== te.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ou() {
  return typeof window < "u";
}
function wi(l) {
  return iy(l) ? (l.nodeName || "").toLowerCase() : "#document";
}
function Yt(l) {
  var i;
  return (l == null || (i = l.ownerDocument) == null ? void 0 : i.defaultView) || window;
}
function En(l) {
  var i;
  return (i = (iy(l) ? l.ownerDocument : l.document) || window.document) == null ? void 0 : i.documentElement;
}
function iy(l) {
  return Ou() ? l instanceof Node || l instanceof Yt(l).Node : !1;
}
function on(l) {
  return Ou() ? l instanceof Element || l instanceof Yt(l).Element : !1;
}
function xn(l) {
  return Ou() ? l instanceof HTMLElement || l instanceof Yt(l).HTMLElement : !1;
}
function Gv(l) {
  return !Ou() || typeof ShadowRoot > "u" ? !1 : l instanceof ShadowRoot || l instanceof Yt(l).ShadowRoot;
}
function qr(l) {
  const {
    overflow: i,
    overflowX: o,
    overflowY: u,
    display: c
  } = un(l);
  return /auto|scroll|overlay|hidden|clip/.test(i + u + o) && !["inline", "contents"].includes(c);
}
function gw(l) {
  return ["table", "td", "th"].includes(wi(l));
}
function Mu(l) {
  return [":popover-open", ":modal"].some((i) => {
    try {
      return l.matches(i);
    } catch {
      return !1;
    }
  });
}
function ad(l) {
  const i = id(), o = on(l) ? un(l) : l;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((u) => o[u] ? o[u] !== "none" : !1) || (o.containerType ? o.containerType !== "normal" : !1) || !i && (o.backdropFilter ? o.backdropFilter !== "none" : !1) || !i && (o.filter ? o.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((u) => (o.willChange || "").includes(u)) || ["paint", "layout", "strict", "content"].some((u) => (o.contain || "").includes(u));
}
function yw(l) {
  let i = Cl(l);
  for (; xn(i) && !yi(i); ) {
    if (ad(i))
      return i;
    if (Mu(i))
      return null;
    i = Cl(i);
  }
  return null;
}
function id() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function yi(l) {
  return ["html", "body", "#document"].includes(wi(l));
}
function un(l) {
  return Yt(l).getComputedStyle(l);
}
function Du(l) {
  return on(l) ? {
    scrollLeft: l.scrollLeft,
    scrollTop: l.scrollTop
  } : {
    scrollLeft: l.scrollX,
    scrollTop: l.scrollY
  };
}
function Cl(l) {
  if (wi(l) === "html")
    return l;
  const i = (
    // Step into the shadow DOM of the parent of a slotted node.
    l.assignedSlot || // DOM Element detected.
    l.parentNode || // ShadowRoot detected.
    Gv(l) && l.host || // Fallback.
    En(l)
  );
  return Gv(i) ? i.host : i;
}
function ry(l) {
  const i = Cl(l);
  return yi(i) ? l.ownerDocument ? l.ownerDocument.body : l.body : xn(i) && qr(i) ? i : ry(i);
}
function Mr(l, i, o) {
  var u;
  i === void 0 && (i = []), o === void 0 && (o = !0);
  const c = ry(l), f = c === ((u = l.ownerDocument) == null ? void 0 : u.body), h = Yt(c);
  if (f) {
    const m = Tf(h);
    return i.concat(h, h.visualViewport || [], qr(c) ? c : [], m && o ? Mr(m) : []);
  }
  return i.concat(c, Mr(c, [], o));
}
function Tf(l) {
  return l.parent && Object.getPrototypeOf(l.parent) ? l.frameElement : null;
}
function oy(l) {
  const i = un(l);
  let o = parseFloat(i.width) || 0, u = parseFloat(i.height) || 0;
  const c = xn(l), f = c ? l.offsetWidth : o, h = c ? l.offsetHeight : u, m = vu(o) !== f || vu(u) !== h;
  return m && (o = f, u = h), {
    width: o,
    height: u,
    $: m
  };
}
function rd(l) {
  return on(l) ? l : l.contextElement;
}
function ii(l) {
  const i = rd(l);
  if (!xn(i))
    return Sn(1);
  const o = i.getBoundingClientRect(), {
    width: u,
    height: c,
    $: f
  } = oy(i);
  let h = (f ? vu(o.width) : o.width) / u, m = (f ? vu(o.height) : o.height) / c;
  return (!h || !Number.isFinite(h)) && (h = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: h,
    y: m
  };
}
const bw = /* @__PURE__ */ Sn(0);
function uy(l) {
  const i = Yt(l);
  return !id() || !i.visualViewport ? bw : {
    x: i.visualViewport.offsetLeft,
    y: i.visualViewport.offsetTop
  };
}
function Sw(l, i, o) {
  return i === void 0 && (i = !1), !o || i && o !== Yt(l) ? !1 : i;
}
function sa(l, i, o, u) {
  i === void 0 && (i = !1), o === void 0 && (o = !1);
  const c = l.getBoundingClientRect(), f = rd(l);
  let h = Sn(1);
  i && (u ? on(u) && (h = ii(u)) : h = ii(l));
  const m = Sw(f, o, u) ? uy(f) : Sn(0);
  let p = (c.left + m.x) / h.x, v = (c.top + m.y) / h.y, b = c.width / h.x, x = c.height / h.y;
  if (f) {
    const T = Yt(f), R = u && on(u) ? Yt(u) : u;
    let _ = T, S = Tf(_);
    for (; S && u && R !== _; ) {
      const C = ii(S), N = S.getBoundingClientRect(), z = un(S), H = N.left + (S.clientLeft + parseFloat(z.paddingLeft)) * C.x, k = N.top + (S.clientTop + parseFloat(z.paddingTop)) * C.y;
      p *= C.x, v *= C.y, b *= C.x, x *= C.y, p += H, v += k, _ = Yt(S), S = Tf(_);
    }
  }
  return yu({
    width: b,
    height: x,
    x: p,
    y: v
  });
}
function od(l, i) {
  const o = Du(l).scrollLeft;
  return i ? i.left + o : sa(En(l)).left + o;
}
function sy(l, i, o) {
  o === void 0 && (o = !1);
  const u = l.getBoundingClientRect(), c = u.left + i.scrollLeft - (o ? 0 : (
    // RTL <body> scrollbar.
    od(l, u)
  )), f = u.top + i.scrollTop;
  return {
    x: c,
    y: f
  };
}
function xw(l) {
  let {
    elements: i,
    rect: o,
    offsetParent: u,
    strategy: c
  } = l;
  const f = c === "fixed", h = En(u), m = i ? Mu(i.floating) : !1;
  if (u === h || m && f)
    return o;
  let p = {
    scrollLeft: 0,
    scrollTop: 0
  }, v = Sn(1);
  const b = Sn(0), x = xn(u);
  if ((x || !x && !f) && ((wi(u) !== "body" || qr(h)) && (p = Du(u)), xn(u))) {
    const R = sa(u);
    v = ii(u), b.x = R.x + u.clientLeft, b.y = R.y + u.clientTop;
  }
  const T = h && !x && !f ? sy(h, p, !0) : Sn(0);
  return {
    width: o.width * v.x,
    height: o.height * v.y,
    x: o.x * v.x - p.scrollLeft * v.x + b.x + T.x,
    y: o.y * v.y - p.scrollTop * v.y + b.y + T.y
  };
}
function Ew(l) {
  return Array.from(l.getClientRects());
}
function ww(l) {
  const i = En(l), o = Du(l), u = l.ownerDocument.body, c = Qt(i.scrollWidth, i.clientWidth, u.scrollWidth, u.clientWidth), f = Qt(i.scrollHeight, i.clientHeight, u.scrollHeight, u.clientHeight);
  let h = -o.scrollLeft + od(l);
  const m = -o.scrollTop;
  return un(u).direction === "rtl" && (h += Qt(i.clientWidth, u.clientWidth) - c), {
    width: c,
    height: f,
    x: h,
    y: m
  };
}
function Tw(l, i) {
  const o = Yt(l), u = En(l), c = o.visualViewport;
  let f = u.clientWidth, h = u.clientHeight, m = 0, p = 0;
  if (c) {
    f = c.width, h = c.height;
    const v = id();
    (!v || v && i === "fixed") && (m = c.offsetLeft, p = c.offsetTop);
  }
  return {
    width: f,
    height: h,
    x: m,
    y: p
  };
}
function Aw(l, i) {
  const o = sa(l, !0, i === "fixed"), u = o.top + l.clientTop, c = o.left + l.clientLeft, f = xn(l) ? ii(l) : Sn(1), h = l.clientWidth * f.x, m = l.clientHeight * f.y, p = c * f.x, v = u * f.y;
  return {
    width: h,
    height: m,
    x: p,
    y: v
  };
}
function Qv(l, i, o) {
  let u;
  if (i === "viewport")
    u = Tw(l, o);
  else if (i === "document")
    u = ww(En(l));
  else if (on(i))
    u = Aw(i, o);
  else {
    const c = uy(l);
    u = {
      x: i.x - c.x,
      y: i.y - c.y,
      width: i.width,
      height: i.height
    };
  }
  return yu(u);
}
function cy(l, i) {
  const o = Cl(l);
  return o === i || !on(o) || yi(o) ? !1 : un(o).position === "fixed" || cy(o, i);
}
function Rw(l, i) {
  const o = i.get(l);
  if (o)
    return o;
  let u = Mr(l, [], !1).filter((m) => on(m) && wi(m) !== "body"), c = null;
  const f = un(l).position === "fixed";
  let h = f ? Cl(l) : l;
  for (; on(h) && !yi(h); ) {
    const m = un(h), p = ad(h);
    !p && m.position === "fixed" && (c = null), (f ? !p && !c : !p && m.position === "static" && !!c && ["absolute", "fixed"].includes(c.position) || qr(h) && !p && cy(l, h)) ? u = u.filter((b) => b !== h) : c = m, h = Cl(h);
  }
  return i.set(l, u), u;
}
function Cw(l) {
  let {
    element: i,
    boundary: o,
    rootBoundary: u,
    strategy: c
  } = l;
  const h = [...o === "clippingAncestors" ? Mu(i) ? [] : Rw(i, this._c) : [].concat(o), u], m = h[0], p = h.reduce((v, b) => {
    const x = Qv(i, b, c);
    return v.top = Qt(x.top, v.top), v.right = Rl(x.right, v.right), v.bottom = Rl(x.bottom, v.bottom), v.left = Qt(x.left, v.left), v;
  }, Qv(i, m, c));
  return {
    width: p.right - p.left,
    height: p.bottom - p.top,
    x: p.left,
    y: p.top
  };
}
function Ow(l) {
  const {
    width: i,
    height: o
  } = oy(l);
  return {
    width: i,
    height: o
  };
}
function Mw(l, i, o) {
  const u = xn(i), c = En(i), f = o === "fixed", h = sa(l, !0, f, i);
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const p = Sn(0);
  function v() {
    p.x = od(c);
  }
  if (u || !u && !f)
    if ((wi(i) !== "body" || qr(c)) && (m = Du(i)), u) {
      const R = sa(i, !0, f, i);
      p.x = R.x + i.clientLeft, p.y = R.y + i.clientTop;
    } else c && v();
  f && !u && c && v();
  const b = c && !u && !f ? sy(c, m) : Sn(0), x = h.left + m.scrollLeft - p.x - b.x, T = h.top + m.scrollTop - p.y - b.y;
  return {
    x,
    y: T,
    width: h.width,
    height: h.height
  };
}
function hf(l) {
  return un(l).position === "static";
}
function Yv(l, i) {
  if (!xn(l) || un(l).position === "fixed")
    return null;
  if (i)
    return i(l);
  let o = l.offsetParent;
  return En(l) === o && (o = o.ownerDocument.body), o;
}
function fy(l, i) {
  const o = Yt(l);
  if (Mu(l))
    return o;
  if (!xn(l)) {
    let c = Cl(l);
    for (; c && !yi(c); ) {
      if (on(c) && !hf(c))
        return c;
      c = Cl(c);
    }
    return o;
  }
  let u = Yv(l, i);
  for (; u && gw(u) && hf(u); )
    u = Yv(u, i);
  return u && yi(u) && hf(u) && !ad(u) ? o : u || yw(l) || o;
}
const Dw = async function(l) {
  const i = this.getOffsetParent || fy, o = this.getDimensions, u = await o(l.floating);
  return {
    reference: Mw(l.reference, await i(l.floating), l.strategy),
    floating: {
      x: 0,
      y: 0,
      width: u.width,
      height: u.height
    }
  };
};
function _w(l) {
  return un(l).direction === "rtl";
}
const Nw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: xw,
  getDocumentElement: En,
  getClippingRect: Cw,
  getOffsetParent: fy,
  getElementRects: Dw,
  getClientRects: Ew,
  getDimensions: Ow,
  getScale: ii,
  isElement: on,
  isRTL: _w
};
function dy(l, i) {
  return l.x === i.x && l.y === i.y && l.width === i.width && l.height === i.height;
}
function zw(l, i) {
  let o = null, u;
  const c = En(l);
  function f() {
    var m;
    clearTimeout(u), (m = o) == null || m.disconnect(), o = null;
  }
  function h(m, p) {
    m === void 0 && (m = !1), p === void 0 && (p = 1), f();
    const v = l.getBoundingClientRect(), {
      left: b,
      top: x,
      width: T,
      height: R
    } = v;
    if (m || i(), !T || !R)
      return;
    const _ = cu(x), S = cu(c.clientWidth - (b + T)), C = cu(c.clientHeight - (x + R)), N = cu(b), H = {
      rootMargin: -_ + "px " + -S + "px " + -C + "px " + -N + "px",
      threshold: Qt(0, Rl(1, p)) || 1
    };
    let k = !0;
    function Q(W) {
      const J = W[0].intersectionRatio;
      if (J !== p) {
        if (!k)
          return h();
        J ? h(!1, J) : u = setTimeout(() => {
          h(!1, 1e-7);
        }, 1e3);
      }
      J === 1 && !dy(v, l.getBoundingClientRect()) && h(), k = !1;
    }
    try {
      o = new IntersectionObserver(Q, {
        ...H,
        // Handle <iframe>s
        root: c.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(Q, H);
    }
    o.observe(l);
  }
  return h(!0), f;
}
function jw(l, i, o, u) {
  u === void 0 && (u = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: h = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: p = !1
  } = u, v = rd(l), b = c || f ? [...v ? Mr(v) : [], ...Mr(i)] : [];
  b.forEach((N) => {
    c && N.addEventListener("scroll", o, {
      passive: !0
    }), f && N.addEventListener("resize", o);
  });
  const x = v && m ? zw(v, o) : null;
  let T = -1, R = null;
  h && (R = new ResizeObserver((N) => {
    let [z] = N;
    z && z.target === v && R && (R.unobserve(i), cancelAnimationFrame(T), T = requestAnimationFrame(() => {
      var H;
      (H = R) == null || H.observe(i);
    })), o();
  }), v && !p && R.observe(v), R.observe(i));
  let _, S = p ? sa(l) : null;
  p && C();
  function C() {
    const N = sa(l);
    S && !dy(S, N) && o(), S = N, _ = requestAnimationFrame(C);
  }
  return o(), () => {
    var N;
    b.forEach((z) => {
      c && z.removeEventListener("scroll", o), f && z.removeEventListener("resize", o);
    }), x == null || x(), (N = R) == null || N.disconnect(), R = null, p && cancelAnimationFrame(_);
  };
}
const Uw = hw, Hw = mw, Lw = cw, Bw = vw, qw = fw, kv = sw, Gw = pw, Qw = (l, i, o) => {
  const u = /* @__PURE__ */ new Map(), c = {
    platform: Nw,
    ...o
  }, f = {
    ...c.platform,
    _c: u
  };
  return uw(l, i, {
    ...c,
    platform: f
  });
};
var Yw = typeof document < "u", kw = function() {
}, mu = Yw ? y.useLayoutEffect : kw;
function bu(l, i) {
  if (l === i)
    return !0;
  if (typeof l != typeof i)
    return !1;
  if (typeof l == "function" && l.toString() === i.toString())
    return !0;
  let o, u, c;
  if (l && i && typeof l == "object") {
    if (Array.isArray(l)) {
      if (o = l.length, o !== i.length) return !1;
      for (u = o; u-- !== 0; )
        if (!bu(l[u], i[u]))
          return !1;
      return !0;
    }
    if (c = Object.keys(l), o = c.length, o !== Object.keys(i).length)
      return !1;
    for (u = o; u-- !== 0; )
      if (!{}.hasOwnProperty.call(i, c[u]))
        return !1;
    for (u = o; u-- !== 0; ) {
      const f = c[u];
      if (!(f === "_owner" && l.$$typeof) && !bu(l[f], i[f]))
        return !1;
    }
    return !0;
  }
  return l !== l && i !== i;
}
function hy(l) {
  return typeof window > "u" ? 1 : (l.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Vv(l, i) {
  const o = hy(l);
  return Math.round(i * o) / o;
}
function mf(l) {
  const i = y.useRef(l);
  return mu(() => {
    i.current = l;
  }), i;
}
function Vw(l) {
  l === void 0 && (l = {});
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: u = [],
    platform: c,
    elements: {
      reference: f,
      floating: h
    } = {},
    transform: m = !0,
    whileElementsMounted: p,
    open: v
  } = l, [b, x] = y.useState({
    x: 0,
    y: 0,
    strategy: o,
    placement: i,
    middlewareData: {},
    isPositioned: !1
  }), [T, R] = y.useState(u);
  bu(T, u) || R(u);
  const [_, S] = y.useState(null), [C, N] = y.useState(null), z = y.useCallback((G) => {
    G !== W.current && (W.current = G, S(G));
  }, []), H = y.useCallback((G) => {
    G !== J.current && (J.current = G, N(G));
  }, []), k = f || _, Q = h || C, W = y.useRef(null), J = y.useRef(null), K = y.useRef(b), te = p != null, re = mf(p), ge = mf(c), ce = mf(v), ye = y.useCallback(() => {
    if (!W.current || !J.current)
      return;
    const G = {
      placement: i,
      strategy: o,
      middleware: T
    };
    ge.current && (G.platform = ge.current), Qw(W.current, J.current, G).then((ue) => {
      const A = {
        ...ue,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: ce.current !== !1
      };
      Se.current && !bu(K.current, A) && (K.current = A, Hr.flushSync(() => {
        x(A);
      }));
    });
  }, [T, i, o, ge, ce]);
  mu(() => {
    v === !1 && K.current.isPositioned && (K.current.isPositioned = !1, x((G) => ({
      ...G,
      isPositioned: !1
    })));
  }, [v]);
  const Se = y.useRef(!1);
  mu(() => (Se.current = !0, () => {
    Se.current = !1;
  }), []), mu(() => {
    if (k && (W.current = k), Q && (J.current = Q), k && Q) {
      if (re.current)
        return re.current(k, Q, ye);
      ye();
    }
  }, [k, Q, ye, re, te]);
  const ve = y.useMemo(() => ({
    reference: W,
    floating: J,
    setReference: z,
    setFloating: H
  }), [z, H]), j = y.useMemo(() => ({
    reference: k,
    floating: Q
  }), [k, Q]), P = y.useMemo(() => {
    const G = {
      position: o,
      left: 0,
      top: 0
    };
    if (!j.floating)
      return G;
    const ue = Vv(j.floating, b.x), A = Vv(j.floating, b.y);
    return m ? {
      ...G,
      transform: "translate(" + ue + "px, " + A + "px)",
      ...hy(j.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: o,
      left: ue,
      top: A
    };
  }, [o, m, j.floating, b.x, b.y]);
  return y.useMemo(() => ({
    ...b,
    update: ye,
    refs: ve,
    elements: j,
    floatingStyles: P
  }), [b, ye, ve, j, P]);
}
const Xw = (l) => {
  function i(o) {
    return {}.hasOwnProperty.call(o, "current");
  }
  return {
    name: "arrow",
    options: l,
    fn(o) {
      const {
        element: u,
        padding: c
      } = typeof l == "function" ? l(o) : l;
      return u && i(u) ? u.current != null ? kv({
        element: u.current,
        padding: c
      }).fn(o) : {} : u ? kv({
        element: u,
        padding: c
      }).fn(o) : {};
    }
  };
}, Zw = (l, i) => ({
  ...Uw(l),
  options: [l, i]
}), Kw = (l, i) => ({
  ...Hw(l),
  options: [l, i]
}), Pw = (l, i) => ({
  ...Gw(l),
  options: [l, i]
}), Jw = (l, i) => ({
  ...Lw(l),
  options: [l, i]
}), Fw = (l, i) => ({
  ...Bw(l),
  options: [l, i]
}), Ww = (l, i) => ({
  ...qw(l),
  options: [l, i]
}), $w = (l, i) => ({
  ...Xw(l),
  options: [l, i]
});
var Iw = "Arrow", my = y.forwardRef((l, i) => {
  const { children: o, width: u = 10, height: c = 5, ...f } = l;
  return /* @__PURE__ */ w.jsx(
    ke.svg,
    {
      ...f,
      ref: i,
      width: u,
      height: c,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: l.asChild ? o : /* @__PURE__ */ w.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
my.displayName = Iw;
var eT = my;
function tT(l) {
  const [i, o] = y.useState(void 0);
  return St(() => {
    if (l) {
      o({ width: l.offsetWidth, height: l.offsetHeight });
      const u = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const f = c[0];
        let h, m;
        if ("borderBoxSize" in f) {
          const p = f.borderBoxSize, v = Array.isArray(p) ? p[0] : p;
          h = v.inlineSize, m = v.blockSize;
        } else
          h = l.offsetWidth, m = l.offsetHeight;
        o({ width: h, height: m });
      });
      return u.observe(l, { box: "border-box" }), () => u.unobserve(l);
    } else
      o(void 0);
  }, [l]), i;
}
var ud = "Popper", [py, _u] = Lr(ud), [nT, vy] = py(ud), gy = (l) => {
  const { __scopePopper: i, children: o } = l, [u, c] = y.useState(null);
  return /* @__PURE__ */ w.jsx(nT, { scope: i, anchor: u, onAnchorChange: c, children: o });
};
gy.displayName = ud;
var yy = "PopperAnchor", by = y.forwardRef(
  (l, i) => {
    const { __scopePopper: o, virtualRef: u, ...c } = l, f = vy(yy, o), h = y.useRef(null), m = Pe(i, h);
    return y.useEffect(() => {
      f.onAnchorChange((u == null ? void 0 : u.current) || h.current);
    }), u ? null : /* @__PURE__ */ w.jsx(ke.div, { ...c, ref: m });
  }
);
by.displayName = yy;
var sd = "PopperContent", [lT, aT] = py(sd), Sy = y.forwardRef(
  (l, i) => {
    var I, fe, He, Me, Ae, Re;
    const {
      __scopePopper: o,
      side: u = "bottom",
      sideOffset: c = 0,
      align: f = "center",
      alignOffset: h = 0,
      arrowPadding: m = 0,
      avoidCollisions: p = !0,
      collisionBoundary: v = [],
      collisionPadding: b = 0,
      sticky: x = "partial",
      hideWhenDetached: T = !1,
      updatePositionStrategy: R = "optimized",
      onPlaced: _,
      ...S
    } = l, C = vy(sd, o), [N, z] = y.useState(null), H = Pe(i, (ct) => z(ct)), [k, Q] = y.useState(null), W = tT(k), J = (W == null ? void 0 : W.width) ?? 0, K = (W == null ? void 0 : W.height) ?? 0, te = u + (f !== "center" ? "-" + f : ""), re = typeof b == "number" ? b : { top: 0, right: 0, bottom: 0, left: 0, ...b }, ge = Array.isArray(v) ? v : [v], ce = ge.length > 0, ye = {
      padding: re,
      boundary: ge.filter(rT),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: ce
    }, { refs: Se, floatingStyles: ve, placement: j, isPositioned: P, middlewareData: G } = Vw({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: te,
      whileElementsMounted: (...ct) => jw(...ct, {
        animationFrame: R === "always"
      }),
      elements: {
        reference: C.anchor
      },
      middleware: [
        Zw({ mainAxis: c + K, alignmentAxis: h }),
        p && Kw({
          mainAxis: !0,
          crossAxis: !1,
          limiter: x === "partial" ? Pw() : void 0,
          ...ye
        }),
        p && Jw({ ...ye }),
        Fw({
          ...ye,
          apply: ({ elements: ct, rects: Tt, availableWidth: Dl, availableHeight: _l }) => {
            const { width: pt, height: Lu } = Tt.reference, Nl = ct.floating.style;
            Nl.setProperty("--radix-popper-available-width", `${Dl}px`), Nl.setProperty("--radix-popper-available-height", `${_l}px`), Nl.setProperty("--radix-popper-anchor-width", `${pt}px`), Nl.setProperty("--radix-popper-anchor-height", `${Lu}px`);
          }
        }),
        k && $w({ element: k, padding: m }),
        oT({ arrowWidth: J, arrowHeight: K }),
        T && Ww({ strategy: "referenceHidden", ...ye })
      ]
    }), [ue, A] = wy(j), X = oa(_);
    St(() => {
      P && (X == null || X());
    }, [P, X]);
    const $ = (I = G.arrow) == null ? void 0 : I.x, F = (fe = G.arrow) == null ? void 0 : fe.y, ee = ((He = G.arrow) == null ? void 0 : He.centerOffset) !== 0, [be, se] = y.useState();
    return St(() => {
      N && se(window.getComputedStyle(N).zIndex);
    }, [N]), /* @__PURE__ */ w.jsx(
      "div",
      {
        ref: Se.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...ve,
          transform: P ? ve.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: be,
          "--radix-popper-transform-origin": [
            (Me = G.transformOrigin) == null ? void 0 : Me.x,
            (Ae = G.transformOrigin) == null ? void 0 : Ae.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Re = G.hide) == null ? void 0 : Re.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: l.dir,
        children: /* @__PURE__ */ w.jsx(
          lT,
          {
            scope: o,
            placedSide: ue,
            onArrowChange: Q,
            arrowX: $,
            arrowY: F,
            shouldHideArrow: ee,
            children: /* @__PURE__ */ w.jsx(
              ke.div,
              {
                "data-side": ue,
                "data-align": A,
                ...S,
                ref: H,
                style: {
                  ...S.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: P ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Sy.displayName = sd;
var xy = "PopperArrow", iT = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ey = y.forwardRef(function(i, o) {
  const { __scopePopper: u, ...c } = i, f = aT(xy, u), h = iT[f.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ w.jsx(
      "span",
      {
        ref: f.onArrowChange,
        style: {
          position: "absolute",
          left: f.arrowX,
          top: f.arrowY,
          [h]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[f.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[f.placedSide],
          visibility: f.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ w.jsx(
          eT,
          {
            ...c,
            ref: o,
            style: {
              ...c.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Ey.displayName = xy;
function rT(l) {
  return l !== null;
}
var oT = (l) => ({
  name: "transformOrigin",
  options: l,
  fn(i) {
    var C, N, z;
    const { placement: o, rects: u, middlewareData: c } = i, h = ((C = c.arrow) == null ? void 0 : C.centerOffset) !== 0, m = h ? 0 : l.arrowWidth, p = h ? 0 : l.arrowHeight, [v, b] = wy(o), x = { start: "0%", center: "50%", end: "100%" }[b], T = (((N = c.arrow) == null ? void 0 : N.x) ?? 0) + m / 2, R = (((z = c.arrow) == null ? void 0 : z.y) ?? 0) + p / 2;
    let _ = "", S = "";
    return v === "bottom" ? (_ = h ? x : `${T}px`, S = `${-p}px`) : v === "top" ? (_ = h ? x : `${T}px`, S = `${u.floating.height + p}px`) : v === "right" ? (_ = `${-p}px`, S = h ? x : `${R}px`) : v === "left" && (_ = `${u.floating.width + p}px`, S = h ? x : `${R}px`), { data: { x: _, y: S } };
  }
});
function wy(l) {
  const [i, o = "center"] = l.split("-");
  return [i, o];
}
var uT = gy, Ty = by, Ay = Sy, Ry = Ey, Cy = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), sT = "VisuallyHidden", Oy = y.forwardRef(
  (l, i) => /* @__PURE__ */ w.jsx(
    ke.span,
    {
      ...l,
      ref: i,
      style: { ...Cy, ...l.style }
    }
  )
);
Oy.displayName = sT;
var cT = Oy, [Nu, mR] = Lr("Tooltip", [
  _u
]), cd = _u(), My = "TooltipProvider", fT = 700, Xv = "tooltip.open", [dT, Dy] = Nu(My), _y = (l) => {
  const {
    __scopeTooltip: i,
    delayDuration: o = fT,
    skipDelayDuration: u = 300,
    disableHoverableContent: c = !1,
    children: f
  } = l, h = y.useRef(!0), m = y.useRef(!1), p = y.useRef(0);
  return y.useEffect(() => {
    const v = p.current;
    return () => window.clearTimeout(v);
  }, []), /* @__PURE__ */ w.jsx(
    dT,
    {
      scope: i,
      isOpenDelayedRef: h,
      delayDuration: o,
      onOpen: y.useCallback(() => {
        window.clearTimeout(p.current), h.current = !1;
      }, []),
      onClose: y.useCallback(() => {
        window.clearTimeout(p.current), p.current = window.setTimeout(
          () => h.current = !0,
          u
        );
      }, [u]),
      isPointerInTransitRef: m,
      onPointerInTransitChange: y.useCallback((v) => {
        m.current = v;
      }, []),
      disableHoverableContent: c,
      children: f
    }
  );
};
_y.displayName = My;
var Ny = "Tooltip", [pR, zu] = Nu(Ny), Af = "TooltipTrigger", hT = y.forwardRef(
  (l, i) => {
    const { __scopeTooltip: o, ...u } = l, c = zu(Af, o), f = Dy(Af, o), h = cd(o), m = y.useRef(null), p = Pe(i, m, c.onTriggerChange), v = y.useRef(!1), b = y.useRef(!1), x = y.useCallback(() => v.current = !1, []);
    return y.useEffect(() => () => document.removeEventListener("pointerup", x), [x]), /* @__PURE__ */ w.jsx(Ty, { asChild: !0, ...h, children: /* @__PURE__ */ w.jsx(
      ke.button,
      {
        "aria-describedby": c.open ? c.contentId : void 0,
        "data-state": c.stateAttribute,
        ...u,
        ref: p,
        onPointerMove: Ue(l.onPointerMove, (T) => {
          T.pointerType !== "touch" && !b.current && !f.isPointerInTransitRef.current && (c.onTriggerEnter(), b.current = !0);
        }),
        onPointerLeave: Ue(l.onPointerLeave, () => {
          c.onTriggerLeave(), b.current = !1;
        }),
        onPointerDown: Ue(l.onPointerDown, () => {
          c.open && c.onClose(), v.current = !0, document.addEventListener("pointerup", x, { once: !0 });
        }),
        onFocus: Ue(l.onFocus, () => {
          v.current || c.onOpen();
        }),
        onBlur: Ue(l.onBlur, c.onClose),
        onClick: Ue(l.onClick, c.onClose)
      }
    ) });
  }
);
hT.displayName = Af;
var mT = "TooltipPortal", [vR, pT] = Nu(mT, {
  forceMount: void 0
}), bi = "TooltipContent", vT = y.forwardRef(
  (l, i) => {
    const o = pT(bi, l.__scopeTooltip), { forceMount: u = o.forceMount, side: c = "top", ...f } = l, h = zu(bi, l.__scopeTooltip);
    return /* @__PURE__ */ w.jsx(Br, { present: u || h.open, children: h.disableHoverableContent ? /* @__PURE__ */ w.jsx(zy, { side: c, ...f, ref: i }) : /* @__PURE__ */ w.jsx(gT, { side: c, ...f, ref: i }) });
  }
), gT = y.forwardRef((l, i) => {
  const o = zu(bi, l.__scopeTooltip), u = Dy(bi, l.__scopeTooltip), c = y.useRef(null), f = Pe(i, c), [h, m] = y.useState(null), { trigger: p, onClose: v } = o, b = c.current, { onPointerInTransitChange: x } = u, T = y.useCallback(() => {
    m(null), x(!1);
  }, [x]), R = y.useCallback(
    (_, S) => {
      const C = _.currentTarget, N = { x: _.clientX, y: _.clientY }, z = ET(N, C.getBoundingClientRect()), H = wT(N, z), k = TT(S.getBoundingClientRect()), Q = RT([...H, ...k]);
      m(Q), x(!0);
    },
    [x]
  );
  return y.useEffect(() => () => T(), [T]), y.useEffect(() => {
    if (p && b) {
      const _ = (C) => R(C, b), S = (C) => R(C, p);
      return p.addEventListener("pointerleave", _), b.addEventListener("pointerleave", S), () => {
        p.removeEventListener("pointerleave", _), b.removeEventListener("pointerleave", S);
      };
    }
  }, [p, b, R, T]), y.useEffect(() => {
    if (h) {
      const _ = (S) => {
        const C = S.target, N = { x: S.clientX, y: S.clientY }, z = (p == null ? void 0 : p.contains(C)) || (b == null ? void 0 : b.contains(C)), H = !AT(N, h);
        z ? T() : H && (T(), v());
      };
      return document.addEventListener("pointermove", _), () => document.removeEventListener("pointermove", _);
    }
  }, [p, b, h, v, T]), /* @__PURE__ */ w.jsx(zy, { ...l, ref: f });
}), [yT, bT] = Nu(Ny, { isInside: !1 }), ST = /* @__PURE__ */ ux("TooltipContent"), zy = y.forwardRef(
  (l, i) => {
    const {
      __scopeTooltip: o,
      children: u,
      "aria-label": c,
      onEscapeKeyDown: f,
      onPointerDownOutside: h,
      ...m
    } = l, p = zu(bi, o), v = cd(o), { onClose: b } = p;
    return y.useEffect(() => (document.addEventListener(Xv, b), () => document.removeEventListener(Xv, b)), [b]), y.useEffect(() => {
      if (p.trigger) {
        const x = (T) => {
          const R = T.target;
          R != null && R.contains(p.trigger) && b();
        };
        return window.addEventListener("scroll", x, { capture: !0 }), () => window.removeEventListener("scroll", x, { capture: !0 });
      }
    }, [p.trigger, b]), /* @__PURE__ */ w.jsx(
      Au,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: f,
        onPointerDownOutside: h,
        onFocusOutside: (x) => x.preventDefault(),
        onDismiss: b,
        children: /* @__PURE__ */ w.jsxs(
          Ay,
          {
            "data-state": p.stateAttribute,
            ...v,
            ...m,
            ref: i,
            style: {
              ...m.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ w.jsx(ST, { children: u }),
              /* @__PURE__ */ w.jsx(yT, { scope: o, isInside: !0, children: /* @__PURE__ */ w.jsx(cT, { id: p.contentId, role: "tooltip", children: c || u }) })
            ]
          }
        )
      }
    );
  }
);
vT.displayName = bi;
var jy = "TooltipArrow", xT = y.forwardRef(
  (l, i) => {
    const { __scopeTooltip: o, ...u } = l, c = cd(o);
    return bT(
      jy,
      o
    ).isInside ? null : /* @__PURE__ */ w.jsx(Ry, { ...c, ...u, ref: i });
  }
);
xT.displayName = jy;
function ET(l, i) {
  const o = Math.abs(i.top - l.y), u = Math.abs(i.bottom - l.y), c = Math.abs(i.right - l.x), f = Math.abs(i.left - l.x);
  switch (Math.min(o, u, c, f)) {
    case f:
      return "left";
    case c:
      return "right";
    case o:
      return "top";
    case u:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function wT(l, i, o = 5) {
  const u = [];
  switch (i) {
    case "top":
      u.push(
        { x: l.x - o, y: l.y + o },
        { x: l.x + o, y: l.y + o }
      );
      break;
    case "bottom":
      u.push(
        { x: l.x - o, y: l.y - o },
        { x: l.x + o, y: l.y - o }
      );
      break;
    case "left":
      u.push(
        { x: l.x + o, y: l.y - o },
        { x: l.x + o, y: l.y + o }
      );
      break;
    case "right":
      u.push(
        { x: l.x - o, y: l.y - o },
        { x: l.x - o, y: l.y + o }
      );
      break;
  }
  return u;
}
function TT(l) {
  const { top: i, right: o, bottom: u, left: c } = l;
  return [
    { x: c, y: i },
    { x: o, y: i },
    { x: o, y: u },
    { x: c, y: u }
  ];
}
function AT(l, i) {
  const { x: o, y: u } = l;
  let c = !1;
  for (let f = 0, h = i.length - 1; f < i.length; h = f++) {
    const m = i[f], p = i[h], v = m.x, b = m.y, x = p.x, T = p.y;
    b > u != T > u && o < (x - v) * (u - b) / (T - b) + v && (c = !c);
  }
  return c;
}
function RT(l) {
  const i = l.slice();
  return i.sort((o, u) => o.x < u.x ? -1 : o.x > u.x ? 1 : o.y < u.y ? -1 : o.y > u.y ? 1 : 0), CT(i);
}
function CT(l) {
  if (l.length <= 1) return l.slice();
  const i = [];
  for (let u = 0; u < l.length; u++) {
    const c = l[u];
    for (; i.length >= 2; ) {
      const f = i[i.length - 1], h = i[i.length - 2];
      if ((f.x - h.x) * (c.y - h.y) >= (f.y - h.y) * (c.x - h.x)) i.pop();
      else break;
    }
    i.push(c);
  }
  i.pop();
  const o = [];
  for (let u = l.length - 1; u >= 0; u--) {
    const c = l[u];
    for (; o.length >= 2; ) {
      const f = o[o.length - 1], h = o[o.length - 2];
      if ((f.x - h.x) * (c.y - h.y) >= (f.y - h.y) * (c.x - h.x)) o.pop();
      else break;
    }
    o.push(c);
  }
  return o.pop(), i.length === 1 && o.length === 1 && i[0].x === o[0].x && i[0].y === o[0].y ? i : i.concat(o);
}
var OT = _y;
function MT({
  delayDuration: l = 0,
  ...i
}) {
  return /* @__PURE__ */ w.jsx(
    OT,
    {
      "data-slot": "tooltip-provider",
      delayDuration: l,
      ...i
    }
  );
}
const DT = "sidebar_state", _T = 60 * 60 * 24 * 7, NT = "16rem", zT = "18rem", jT = "3rem", UT = "b", Uy = y.createContext(null);
function HT() {
  const l = y.useContext(Uy);
  if (!l)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return l;
}
function LT({
  defaultOpen: l = !0,
  open: i,
  onOpenChange: o,
  className: u,
  style: c,
  children: f,
  ...h
}) {
  const m = Dx(), [p, v] = y.useState(!1), [b, x] = y.useState(l), T = i ?? b, R = y.useCallback(
    (N) => {
      const z = typeof N == "function" ? N(T) : N;
      o ? o(z) : x(z), document.cookie = `${DT}=${z}; path=/; max-age=${_T}`;
    },
    [o, T]
  ), _ = y.useCallback(() => m ? v((N) => !N) : R((N) => !N), [m, R, v]);
  y.useEffect(() => {
    const N = (z) => {
      z.key === UT && (z.metaKey || z.ctrlKey) && (z.preventDefault(), _());
    };
    return window.addEventListener("keydown", N), () => window.removeEventListener("keydown", N);
  }, [_]);
  const S = T ? "expanded" : "collapsed", C = y.useMemo(
    () => ({
      state: S,
      open: T,
      setOpen: R,
      isMobile: m,
      openMobile: p,
      setOpenMobile: v,
      toggleSidebar: _
    }),
    [S, T, R, m, p, v, _]
  );
  return /* @__PURE__ */ w.jsx(Uy.Provider, { value: C, children: /* @__PURE__ */ w.jsx(MT, { delayDuration: 0, children: /* @__PURE__ */ w.jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": NT,
        "--sidebar-width-icon": jT,
        ...c
      },
      className: et(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        u
      ),
      ...h,
      children: f
    }
  ) }) });
}
function BT({
  side: l = "left",
  variant: i = "sidebar",
  collapsible: o = "offcanvas",
  className: u,
  children: c,
  ...f
}) {
  const { isMobile: h, state: m, openMobile: p, setOpenMobile: v } = HT();
  return o === "none" ? /* @__PURE__ */ w.jsx(
    "div",
    {
      "data-slot": "sidebar",
      className: et(
        "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
        u
      ),
      ...f,
      children: c
    }
  ) : h ? /* @__PURE__ */ w.jsx(KE, { open: p, onOpenChange: v, ...f, children: /* @__PURE__ */ w.jsxs(
    FE,
    {
      "data-sidebar": "sidebar",
      "data-slot": "sidebar",
      "data-mobile": "true",
      className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
      style: {
        "--sidebar-width": zT
      },
      side: l,
      children: [
        /* @__PURE__ */ w.jsxs(WE, { className: "sr-only", children: [
          /* @__PURE__ */ w.jsx($E, { children: "Sidebar" }),
          /* @__PURE__ */ w.jsx(IE, { children: "Displays the mobile sidebar." })
        ] }),
        /* @__PURE__ */ w.jsx("div", { className: "flex h-full w-full flex-col", children: c })
      ]
    }
  ) }) : /* @__PURE__ */ w.jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": m,
      "data-collapsible": m === "collapsed" ? o : "",
      "data-variant": i,
      "data-side": l,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ w.jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: et(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              i === "floating" || i === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ w.jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: et(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              l === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              i === "floating" || i === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              u
            ),
            ...f,
            children: /* @__PURE__ */ w.jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children: c
              }
            )
          }
        )
      ]
    }
  );
}
function qT({ className: l, ...i }) {
  return /* @__PURE__ */ w.jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: et("flex flex-col gap-2 p-2", l),
      ...i
    }
  );
}
function GT({ className: l, ...i }) {
  return /* @__PURE__ */ w.jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: et(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        l
      ),
      ...i
    }
  );
}
function QT({ className: l, ...i }) {
  return /* @__PURE__ */ w.jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: et("relative flex w-full min-w-0 flex-col p-2", l),
      ...i
    }
  );
}
var Gr = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(l) {
    return this.listeners.add(l), this.onSubscribe(), () => {
      this.listeners.delete(l), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, ca = typeof window > "u" || "Deno" in globalThis;
function _t() {
}
function YT(l, i) {
  return typeof l == "function" ? l(i) : l;
}
function Rf(l) {
  return typeof l == "number" && l >= 0 && l !== 1 / 0;
}
function Hy(l, i) {
  return Math.max(l + (i || 0) - Date.now(), 0);
}
function Al(l, i) {
  return typeof l == "function" ? l(i) : l;
}
function rn(l, i) {
  return typeof l == "function" ? l(i) : l;
}
function Zv(l, i) {
  const {
    type: o = "all",
    exact: u,
    fetchStatus: c,
    predicate: f,
    queryKey: h,
    stale: m
  } = l;
  if (h) {
    if (u) {
      if (i.queryHash !== fd(h, i.options))
        return !1;
    } else if (!_r(i.queryKey, h))
      return !1;
  }
  if (o !== "all") {
    const p = i.isActive();
    if (o === "active" && !p || o === "inactive" && p)
      return !1;
  }
  return !(typeof m == "boolean" && i.isStale() !== m || c && c !== i.state.fetchStatus || f && !f(i));
}
function Kv(l, i) {
  const { exact: o, status: u, predicate: c, mutationKey: f } = l;
  if (f) {
    if (!i.options.mutationKey)
      return !1;
    if (o) {
      if (Dr(i.options.mutationKey) !== Dr(f))
        return !1;
    } else if (!_r(i.options.mutationKey, f))
      return !1;
  }
  return !(u && i.state.status !== u || c && !c(i));
}
function fd(l, i) {
  return ((i == null ? void 0 : i.queryKeyHashFn) || Dr)(l);
}
function Dr(l) {
  return JSON.stringify(
    l,
    (i, o) => Of(o) ? Object.keys(o).sort().reduce((u, c) => (u[c] = o[c], u), {}) : o
  );
}
function _r(l, i) {
  return l === i ? !0 : typeof l != typeof i ? !1 : l && i && typeof l == "object" && typeof i == "object" ? Object.keys(i).every((o) => _r(l[o], i[o])) : !1;
}
function Ly(l, i) {
  if (l === i)
    return l;
  const o = Pv(l) && Pv(i);
  if (o || Of(l) && Of(i)) {
    const u = o ? l : Object.keys(l), c = u.length, f = o ? i : Object.keys(i), h = f.length, m = o ? [] : {}, p = new Set(u);
    let v = 0;
    for (let b = 0; b < h; b++) {
      const x = o ? b : f[b];
      (!o && p.has(x) || o) && l[x] === void 0 && i[x] === void 0 ? (m[x] = void 0, v++) : (m[x] = Ly(l[x], i[x]), m[x] === l[x] && l[x] !== void 0 && v++);
    }
    return c === h && v === c ? l : m;
  }
  return i;
}
function Cf(l, i) {
  if (!i || Object.keys(l).length !== Object.keys(i).length)
    return !1;
  for (const o in l)
    if (l[o] !== i[o])
      return !1;
  return !0;
}
function Pv(l) {
  return Array.isArray(l) && l.length === Object.keys(l).length;
}
function Of(l) {
  if (!Jv(l))
    return !1;
  const i = l.constructor;
  if (i === void 0)
    return !0;
  const o = i.prototype;
  return !(!Jv(o) || !o.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(l) !== Object.prototype);
}
function Jv(l) {
  return Object.prototype.toString.call(l) === "[object Object]";
}
function kT(l) {
  return new Promise((i) => {
    setTimeout(i, l);
  });
}
function Mf(l, i, o) {
  return typeof o.structuralSharing == "function" ? o.structuralSharing(l, i) : o.structuralSharing !== !1 ? Ly(l, i) : i;
}
function VT(l, i, o = 0) {
  const u = [...l, i];
  return o && u.length > o ? u.slice(1) : u;
}
function XT(l, i, o = 0) {
  const u = [i, ...l];
  return o && u.length > o ? u.slice(0, -1) : u;
}
var dd = Symbol();
function By(l, i) {
  return !l.queryFn && (i != null && i.initialPromise) ? () => i.initialPromise : !l.queryFn || l.queryFn === dd ? () => Promise.reject(new Error(`Missing queryFn: '${l.queryHash}'`)) : l.queryFn;
}
function ZT(l, i) {
  return typeof l == "function" ? l(...i) : !!l;
}
var $l, gl, ri, ng, KT = (ng = class extends Gr {
  constructor() {
    super();
    pe(this, $l);
    pe(this, gl);
    pe(this, ri);
    ne(this, ri, (i) => {
      if (!ca && window.addEventListener) {
        const o = () => i();
        return window.addEventListener("visibilitychange", o, !1), () => {
          window.removeEventListener("visibilitychange", o);
        };
      }
    });
  }
  onSubscribe() {
    M(this, gl) || this.setEventListener(M(this, ri));
  }
  onUnsubscribe() {
    var i;
    this.hasListeners() || ((i = M(this, gl)) == null || i.call(this), ne(this, gl, void 0));
  }
  setEventListener(i) {
    var o;
    ne(this, ri, i), (o = M(this, gl)) == null || o.call(this), ne(this, gl, i((u) => {
      typeof u == "boolean" ? this.setFocused(u) : this.onFocus();
    }));
  }
  setFocused(i) {
    M(this, $l) !== i && (ne(this, $l, i), this.onFocus());
  }
  onFocus() {
    const i = this.isFocused();
    this.listeners.forEach((o) => {
      o(i);
    });
  }
  isFocused() {
    var i;
    return typeof M(this, $l) == "boolean" ? M(this, $l) : ((i = globalThis.document) == null ? void 0 : i.visibilityState) !== "hidden";
  }
}, $l = new WeakMap(), gl = new WeakMap(), ri = new WeakMap(), ng), hd = new KT(), oi, yl, ui, lg, PT = (lg = class extends Gr {
  constructor() {
    super();
    pe(this, oi, !0);
    pe(this, yl);
    pe(this, ui);
    ne(this, ui, (i) => {
      if (!ca && window.addEventListener) {
        const o = () => i(!0), u = () => i(!1);
        return window.addEventListener("online", o, !1), window.addEventListener("offline", u, !1), () => {
          window.removeEventListener("online", o), window.removeEventListener("offline", u);
        };
      }
    });
  }
  onSubscribe() {
    M(this, yl) || this.setEventListener(M(this, ui));
  }
  onUnsubscribe() {
    var i;
    this.hasListeners() || ((i = M(this, yl)) == null || i.call(this), ne(this, yl, void 0));
  }
  setEventListener(i) {
    var o;
    ne(this, ui, i), (o = M(this, yl)) == null || o.call(this), ne(this, yl, i(this.setOnline.bind(this)));
  }
  setOnline(i) {
    M(this, oi) !== i && (ne(this, oi, i), this.listeners.forEach((u) => {
      u(i);
    }));
  }
  isOnline() {
    return M(this, oi);
  }
}, oi = new WeakMap(), yl = new WeakMap(), ui = new WeakMap(), lg), Su = new PT();
function Df() {
  let l, i;
  const o = new Promise((c, f) => {
    l = c, i = f;
  });
  o.status = "pending", o.catch(() => {
  });
  function u(c) {
    Object.assign(o, c), delete o.resolve, delete o.reject;
  }
  return o.resolve = (c) => {
    u({
      status: "fulfilled",
      value: c
    }), l(c);
  }, o.reject = (c) => {
    u({
      status: "rejected",
      reason: c
    }), i(c);
  }, o;
}
function JT(l) {
  return Math.min(1e3 * 2 ** l, 3e4);
}
function qy(l) {
  return (l ?? "online") === "online" ? Su.isOnline() : !0;
}
var Gy = class extends Error {
  constructor(l) {
    super("CancelledError"), this.revert = l == null ? void 0 : l.revert, this.silent = l == null ? void 0 : l.silent;
  }
};
function pf(l) {
  return l instanceof Gy;
}
function Qy(l) {
  let i = !1, o = 0, u = !1, c;
  const f = Df(), h = (S) => {
    var C;
    u || (T(new Gy(S)), (C = l.abort) == null || C.call(l));
  }, m = () => {
    i = !0;
  }, p = () => {
    i = !1;
  }, v = () => hd.isFocused() && (l.networkMode === "always" || Su.isOnline()) && l.canRun(), b = () => qy(l.networkMode) && l.canRun(), x = (S) => {
    var C;
    u || (u = !0, (C = l.onSuccess) == null || C.call(l, S), c == null || c(), f.resolve(S));
  }, T = (S) => {
    var C;
    u || (u = !0, (C = l.onError) == null || C.call(l, S), c == null || c(), f.reject(S));
  }, R = () => new Promise((S) => {
    var C;
    c = (N) => {
      (u || v()) && S(N);
    }, (C = l.onPause) == null || C.call(l);
  }).then(() => {
    var S;
    c = void 0, u || (S = l.onContinue) == null || S.call(l);
  }), _ = () => {
    if (u)
      return;
    let S;
    const C = o === 0 ? l.initialPromise : void 0;
    try {
      S = C ?? l.fn();
    } catch (N) {
      S = Promise.reject(N);
    }
    Promise.resolve(S).then(x).catch((N) => {
      var W;
      if (u)
        return;
      const z = l.retry ?? (ca ? 0 : 3), H = l.retryDelay ?? JT, k = typeof H == "function" ? H(o, N) : H, Q = z === !0 || typeof z == "number" && o < z || typeof z == "function" && z(o, N);
      if (i || !Q) {
        T(N);
        return;
      }
      o++, (W = l.onFail) == null || W.call(l, o, N), kT(k).then(() => v() ? void 0 : R()).then(() => {
        i ? T(N) : _();
      });
    });
  };
  return {
    promise: f,
    cancel: h,
    continue: () => (c == null || c(), f),
    cancelRetry: m,
    continueRetry: p,
    canStart: b,
    start: () => (b() ? _() : R().then(_), f)
  };
}
var FT = (l) => setTimeout(l, 0);
function WT() {
  let l = [], i = 0, o = (m) => {
    m();
  }, u = (m) => {
    m();
  }, c = FT;
  const f = (m) => {
    i ? l.push(m) : c(() => {
      o(m);
    });
  }, h = () => {
    const m = l;
    l = [], m.length && c(() => {
      u(() => {
        m.forEach((p) => {
          o(p);
        });
      });
    });
  };
  return {
    batch: (m) => {
      let p;
      i++;
      try {
        p = m();
      } finally {
        i--, i || h();
      }
      return p;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (m) => (...p) => {
      f(() => {
        m(...p);
      });
    },
    schedule: f,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (m) => {
      o = m;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (m) => {
      u = m;
    },
    setScheduler: (m) => {
      c = m;
    }
  };
}
var mt = WT(), Il, ag, Yy = (ag = class {
  constructor() {
    pe(this, Il);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), Rf(this.gcTime) && ne(this, Il, setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(l) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      l ?? (ca ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    M(this, Il) && (clearTimeout(M(this, Il)), ne(this, Il, void 0));
  }
}, Il = new WeakMap(), ag), si, ea, $t, ta, bt, Nr, na, ln, qn, ig, $T = (ig = class extends Yy {
  constructor(i) {
    super();
    pe(this, ln);
    pe(this, si);
    pe(this, ea);
    pe(this, $t);
    pe(this, ta);
    pe(this, bt);
    pe(this, Nr);
    pe(this, na);
    ne(this, na, !1), ne(this, Nr, i.defaultOptions), this.setOptions(i.options), this.observers = [], ne(this, ta, i.client), ne(this, $t, M(this, ta).getQueryCache()), this.queryKey = i.queryKey, this.queryHash = i.queryHash, ne(this, si, IT(this.options)), this.state = i.state ?? M(this, si), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var i;
    return (i = M(this, bt)) == null ? void 0 : i.promise;
  }
  setOptions(i) {
    this.options = { ...M(this, Nr), ...i }, this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && M(this, $t).remove(this);
  }
  setData(i, o) {
    const u = Mf(this.state.data, i, this.options);
    return De(this, ln, qn).call(this, {
      data: u,
      type: "success",
      dataUpdatedAt: o == null ? void 0 : o.updatedAt,
      manual: o == null ? void 0 : o.manual
    }), u;
  }
  setState(i, o) {
    De(this, ln, qn).call(this, { type: "setState", state: i, setStateOptions: o });
  }
  cancel(i) {
    var u, c;
    const o = (u = M(this, bt)) == null ? void 0 : u.promise;
    return (c = M(this, bt)) == null || c.cancel(i), o ? o.then(_t).catch(_t) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(M(this, si));
  }
  isActive() {
    return this.observers.some(
      (i) => rn(i.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === dd || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (i) => Al(i.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (i) => i.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(i = 0) {
    return this.state.data === void 0 ? !0 : i === "static" ? !1 : this.state.isInvalidated ? !0 : !Hy(this.state.dataUpdatedAt, i);
  }
  onFocus() {
    var o;
    const i = this.observers.find((u) => u.shouldFetchOnWindowFocus());
    i == null || i.refetch({ cancelRefetch: !1 }), (o = M(this, bt)) == null || o.continue();
  }
  onOnline() {
    var o;
    const i = this.observers.find((u) => u.shouldFetchOnReconnect());
    i == null || i.refetch({ cancelRefetch: !1 }), (o = M(this, bt)) == null || o.continue();
  }
  addObserver(i) {
    this.observers.includes(i) || (this.observers.push(i), this.clearGcTimeout(), M(this, $t).notify({ type: "observerAdded", query: this, observer: i }));
  }
  removeObserver(i) {
    this.observers.includes(i) && (this.observers = this.observers.filter((o) => o !== i), this.observers.length || (M(this, bt) && (M(this, na) ? M(this, bt).cancel({ revert: !0 }) : M(this, bt).cancelRetry()), this.scheduleGc()), M(this, $t).notify({ type: "observerRemoved", query: this, observer: i }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || De(this, ln, qn).call(this, { type: "invalidate" });
  }
  fetch(i, o) {
    var v, b, x;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && (o != null && o.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (M(this, bt))
        return M(this, bt).continueRetry(), M(this, bt).promise;
    }
    if (i && this.setOptions(i), !this.options.queryFn) {
      const T = this.observers.find((R) => R.options.queryFn);
      T && this.setOptions(T.options);
    }
    const u = new AbortController(), c = (T) => {
      Object.defineProperty(T, "signal", {
        enumerable: !0,
        get: () => (ne(this, na, !0), u.signal)
      });
    }, f = () => {
      const T = By(this.options, o), _ = (() => {
        const S = {
          client: M(this, ta),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return c(S), S;
      })();
      return ne(this, na, !1), this.options.persister ? this.options.persister(
        T,
        _,
        this
      ) : T(_);
    }, m = (() => {
      const T = {
        fetchOptions: o,
        options: this.options,
        queryKey: this.queryKey,
        client: M(this, ta),
        state: this.state,
        fetchFn: f
      };
      return c(T), T;
    })();
    (v = this.options.behavior) == null || v.onFetch(m, this), ne(this, ea, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((b = m.fetchOptions) == null ? void 0 : b.meta)) && De(this, ln, qn).call(this, { type: "fetch", meta: (x = m.fetchOptions) == null ? void 0 : x.meta });
    const p = (T) => {
      var R, _, S, C;
      pf(T) && T.silent || De(this, ln, qn).call(this, {
        type: "error",
        error: T
      }), pf(T) || ((_ = (R = M(this, $t).config).onError) == null || _.call(
        R,
        T,
        this
      ), (C = (S = M(this, $t).config).onSettled) == null || C.call(
        S,
        this.state.data,
        T,
        this
      )), this.scheduleGc();
    };
    return ne(this, bt, Qy({
      initialPromise: o == null ? void 0 : o.initialPromise,
      fn: m.fetchFn,
      abort: u.abort.bind(u),
      onSuccess: (T) => {
        var R, _, S, C;
        if (T === void 0) {
          p(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(T);
        } catch (N) {
          p(N);
          return;
        }
        (_ = (R = M(this, $t).config).onSuccess) == null || _.call(R, T, this), (C = (S = M(this, $t).config).onSettled) == null || C.call(
          S,
          T,
          this.state.error,
          this
        ), this.scheduleGc();
      },
      onError: p,
      onFail: (T, R) => {
        De(this, ln, qn).call(this, { type: "failed", failureCount: T, error: R });
      },
      onPause: () => {
        De(this, ln, qn).call(this, { type: "pause" });
      },
      onContinue: () => {
        De(this, ln, qn).call(this, { type: "continue" });
      },
      retry: m.options.retry,
      retryDelay: m.options.retryDelay,
      networkMode: m.options.networkMode,
      canRun: () => !0
    })), M(this, bt).start();
  }
}, si = new WeakMap(), ea = new WeakMap(), $t = new WeakMap(), ta = new WeakMap(), bt = new WeakMap(), Nr = new WeakMap(), na = new WeakMap(), ln = new WeakSet(), qn = function(i) {
  const o = (u) => {
    switch (i.type) {
      case "failed":
        return {
          ...u,
          fetchFailureCount: i.failureCount,
          fetchFailureReason: i.error
        };
      case "pause":
        return {
          ...u,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...u,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...u,
          ...ky(u.data, this.options),
          fetchMeta: i.meta ?? null
        };
      case "success":
        return ne(this, ea, void 0), {
          ...u,
          data: i.data,
          dataUpdateCount: u.dataUpdateCount + 1,
          dataUpdatedAt: i.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: !1,
          status: "success",
          ...!i.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const c = i.error;
        return pf(c) && c.revert && M(this, ea) ? { ...M(this, ea), fetchStatus: "idle" } : {
          ...u,
          error: c,
          errorUpdateCount: u.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: u.fetchFailureCount + 1,
          fetchFailureReason: c,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...u,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...u,
          ...i.state
        };
    }
  };
  this.state = o(this.state), mt.batch(() => {
    this.observers.forEach((u) => {
      u.onQueryUpdate();
    }), M(this, $t).notify({ query: this, type: "updated", action: i });
  });
}, ig);
function ky(l, i) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: qy(i.networkMode) ? "fetching" : "paused",
    ...l === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function IT(l) {
  const i = typeof l.initialData == "function" ? l.initialData() : l.initialData, o = i !== void 0, u = o ? typeof l.initialDataUpdatedAt == "function" ? l.initialDataUpdatedAt() : l.initialDataUpdatedAt : 0;
  return {
    data: i,
    dataUpdateCount: 0,
    dataUpdatedAt: o ? u ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: o ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var pn, rg, eA = (rg = class extends Gr {
  constructor(i = {}) {
    super();
    pe(this, pn);
    this.config = i, ne(this, pn, /* @__PURE__ */ new Map());
  }
  build(i, o, u) {
    const c = o.queryKey, f = o.queryHash ?? fd(c, o);
    let h = this.get(f);
    return h || (h = new $T({
      client: i,
      queryKey: c,
      queryHash: f,
      options: i.defaultQueryOptions(o),
      state: u,
      defaultOptions: i.getQueryDefaults(c)
    }), this.add(h)), h;
  }
  add(i) {
    M(this, pn).has(i.queryHash) || (M(this, pn).set(i.queryHash, i), this.notify({
      type: "added",
      query: i
    }));
  }
  remove(i) {
    const o = M(this, pn).get(i.queryHash);
    o && (i.destroy(), o === i && M(this, pn).delete(i.queryHash), this.notify({ type: "removed", query: i }));
  }
  clear() {
    mt.batch(() => {
      this.getAll().forEach((i) => {
        this.remove(i);
      });
    });
  }
  get(i) {
    return M(this, pn).get(i);
  }
  getAll() {
    return [...M(this, pn).values()];
  }
  find(i) {
    const o = { exact: !0, ...i };
    return this.getAll().find(
      (u) => Zv(o, u)
    );
  }
  findAll(i = {}) {
    const o = this.getAll();
    return Object.keys(i).length > 0 ? o.filter((u) => Zv(i, u)) : o;
  }
  notify(i) {
    mt.batch(() => {
      this.listeners.forEach((o) => {
        o(i);
      });
    });
  }
  onFocus() {
    mt.batch(() => {
      this.getAll().forEach((i) => {
        i.onFocus();
      });
    });
  }
  onOnline() {
    mt.batch(() => {
      this.getAll().forEach((i) => {
        i.onOnline();
      });
    });
  }
}, pn = new WeakMap(), rg), vn, Et, la, gn, vl, og, tA = (og = class extends Yy {
  constructor(i) {
    super();
    pe(this, gn);
    pe(this, vn);
    pe(this, Et);
    pe(this, la);
    this.mutationId = i.mutationId, ne(this, Et, i.mutationCache), ne(this, vn, []), this.state = i.state || nA(), this.setOptions(i.options), this.scheduleGc();
  }
  setOptions(i) {
    this.options = i, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(i) {
    M(this, vn).includes(i) || (M(this, vn).push(i), this.clearGcTimeout(), M(this, Et).notify({
      type: "observerAdded",
      mutation: this,
      observer: i
    }));
  }
  removeObserver(i) {
    ne(this, vn, M(this, vn).filter((o) => o !== i)), this.scheduleGc(), M(this, Et).notify({
      type: "observerRemoved",
      mutation: this,
      observer: i
    });
  }
  optionalRemove() {
    M(this, vn).length || (this.state.status === "pending" ? this.scheduleGc() : M(this, Et).remove(this));
  }
  continue() {
    var i;
    return ((i = M(this, la)) == null ? void 0 : i.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(i) {
    var f, h, m, p, v, b, x, T, R, _, S, C, N, z, H, k, Q, W, J, K;
    const o = () => {
      De(this, gn, vl).call(this, { type: "continue" });
    };
    ne(this, la, Qy({
      fn: () => this.options.mutationFn ? this.options.mutationFn(i) : Promise.reject(new Error("No mutationFn found")),
      onFail: (te, re) => {
        De(this, gn, vl).call(this, { type: "failed", failureCount: te, error: re });
      },
      onPause: () => {
        De(this, gn, vl).call(this, { type: "pause" });
      },
      onContinue: o,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => M(this, Et).canRun(this)
    }));
    const u = this.state.status === "pending", c = !M(this, la).canStart();
    try {
      if (u)
        o();
      else {
        De(this, gn, vl).call(this, { type: "pending", variables: i, isPaused: c }), await ((h = (f = M(this, Et).config).onMutate) == null ? void 0 : h.call(
          f,
          i,
          this
        ));
        const re = await ((p = (m = this.options).onMutate) == null ? void 0 : p.call(m, i));
        re !== this.state.context && De(this, gn, vl).call(this, {
          type: "pending",
          context: re,
          variables: i,
          isPaused: c
        });
      }
      const te = await M(this, la).start();
      return await ((b = (v = M(this, Et).config).onSuccess) == null ? void 0 : b.call(
        v,
        te,
        i,
        this.state.context,
        this
      )), await ((T = (x = this.options).onSuccess) == null ? void 0 : T.call(x, te, i, this.state.context)), await ((_ = (R = M(this, Et).config).onSettled) == null ? void 0 : _.call(
        R,
        te,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((C = (S = this.options).onSettled) == null ? void 0 : C.call(S, te, null, i, this.state.context)), De(this, gn, vl).call(this, { type: "success", data: te }), te;
    } catch (te) {
      try {
        throw await ((z = (N = M(this, Et).config).onError) == null ? void 0 : z.call(
          N,
          te,
          i,
          this.state.context,
          this
        )), await ((k = (H = this.options).onError) == null ? void 0 : k.call(
          H,
          te,
          i,
          this.state.context
        )), await ((W = (Q = M(this, Et).config).onSettled) == null ? void 0 : W.call(
          Q,
          void 0,
          te,
          this.state.variables,
          this.state.context,
          this
        )), await ((K = (J = this.options).onSettled) == null ? void 0 : K.call(
          J,
          void 0,
          te,
          i,
          this.state.context
        )), te;
      } finally {
        De(this, gn, vl).call(this, { type: "error", error: te });
      }
    } finally {
      M(this, Et).runNext(this);
    }
  }
}, vn = new WeakMap(), Et = new WeakMap(), la = new WeakMap(), gn = new WeakSet(), vl = function(i) {
  const o = (u) => {
    switch (i.type) {
      case "failed":
        return {
          ...u,
          failureCount: i.failureCount,
          failureReason: i.error
        };
      case "pause":
        return {
          ...u,
          isPaused: !0
        };
      case "continue":
        return {
          ...u,
          isPaused: !1
        };
      case "pending":
        return {
          ...u,
          context: i.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: i.isPaused,
          status: "pending",
          variables: i.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...u,
          data: i.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...u,
          data: void 0,
          error: i.error,
          failureCount: u.failureCount + 1,
          failureReason: i.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = o(this.state), mt.batch(() => {
    M(this, vn).forEach((u) => {
      u.onMutationUpdate(i);
    }), M(this, Et).notify({
      mutation: this,
      type: "updated",
      action: i
    });
  });
}, og);
function nA() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var Gn, an, zr, ug, lA = (ug = class extends Gr {
  constructor(i = {}) {
    super();
    pe(this, Gn);
    pe(this, an);
    pe(this, zr);
    this.config = i, ne(this, Gn, /* @__PURE__ */ new Set()), ne(this, an, /* @__PURE__ */ new Map()), ne(this, zr, 0);
  }
  build(i, o, u) {
    const c = new tA({
      mutationCache: this,
      mutationId: ++nu(this, zr)._,
      options: i.defaultMutationOptions(o),
      state: u
    });
    return this.add(c), c;
  }
  add(i) {
    M(this, Gn).add(i);
    const o = fu(i);
    if (typeof o == "string") {
      const u = M(this, an).get(o);
      u ? u.push(i) : M(this, an).set(o, [i]);
    }
    this.notify({ type: "added", mutation: i });
  }
  remove(i) {
    if (M(this, Gn).delete(i)) {
      const o = fu(i);
      if (typeof o == "string") {
        const u = M(this, an).get(o);
        if (u)
          if (u.length > 1) {
            const c = u.indexOf(i);
            c !== -1 && u.splice(c, 1);
          } else u[0] === i && M(this, an).delete(o);
      }
    }
    this.notify({ type: "removed", mutation: i });
  }
  canRun(i) {
    const o = fu(i);
    if (typeof o == "string") {
      const u = M(this, an).get(o), c = u == null ? void 0 : u.find(
        (f) => f.state.status === "pending"
      );
      return !c || c === i;
    } else
      return !0;
  }
  runNext(i) {
    var u;
    const o = fu(i);
    if (typeof o == "string") {
      const c = (u = M(this, an).get(o)) == null ? void 0 : u.find((f) => f !== i && f.state.isPaused);
      return (c == null ? void 0 : c.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    mt.batch(() => {
      M(this, Gn).forEach((i) => {
        this.notify({ type: "removed", mutation: i });
      }), M(this, Gn).clear(), M(this, an).clear();
    });
  }
  getAll() {
    return Array.from(M(this, Gn));
  }
  find(i) {
    const o = { exact: !0, ...i };
    return this.getAll().find(
      (u) => Kv(o, u)
    );
  }
  findAll(i = {}) {
    return this.getAll().filter((o) => Kv(i, o));
  }
  notify(i) {
    mt.batch(() => {
      this.listeners.forEach((o) => {
        o(i);
      });
    });
  }
  resumePausedMutations() {
    const i = this.getAll().filter((o) => o.state.isPaused);
    return mt.batch(
      () => Promise.all(
        i.map((o) => o.continue().catch(_t))
      )
    );
  }
}, Gn = new WeakMap(), an = new WeakMap(), zr = new WeakMap(), ug);
function fu(l) {
  var i;
  return (i = l.options.scope) == null ? void 0 : i.id;
}
function Fv(l) {
  return {
    onFetch: (i, o) => {
      var b, x, T, R, _;
      const u = i.options, c = (T = (x = (b = i.fetchOptions) == null ? void 0 : b.meta) == null ? void 0 : x.fetchMore) == null ? void 0 : T.direction, f = ((R = i.state.data) == null ? void 0 : R.pages) || [], h = ((_ = i.state.data) == null ? void 0 : _.pageParams) || [];
      let m = { pages: [], pageParams: [] }, p = 0;
      const v = async () => {
        let S = !1;
        const C = (H) => {
          Object.defineProperty(H, "signal", {
            enumerable: !0,
            get: () => (i.signal.aborted ? S = !0 : i.signal.addEventListener("abort", () => {
              S = !0;
            }), i.signal)
          });
        }, N = By(i.options, i.fetchOptions), z = async (H, k, Q) => {
          if (S)
            return Promise.reject();
          if (k == null && H.pages.length)
            return Promise.resolve(H);
          const J = (() => {
            const ge = {
              client: i.client,
              queryKey: i.queryKey,
              pageParam: k,
              direction: Q ? "backward" : "forward",
              meta: i.options.meta
            };
            return C(ge), ge;
          })(), K = await N(J), { maxPages: te } = i.options, re = Q ? XT : VT;
          return {
            pages: re(H.pages, K, te),
            pageParams: re(H.pageParams, k, te)
          };
        };
        if (c && f.length) {
          const H = c === "backward", k = H ? aA : Wv, Q = {
            pages: f,
            pageParams: h
          }, W = k(u, Q);
          m = await z(Q, W, H);
        } else {
          const H = l ?? f.length;
          do {
            const k = p === 0 ? h[0] ?? u.initialPageParam : Wv(u, m);
            if (p > 0 && k == null)
              break;
            m = await z(m, k), p++;
          } while (p < H);
        }
        return m;
      };
      i.options.persister ? i.fetchFn = () => {
        var S, C;
        return (C = (S = i.options).persister) == null ? void 0 : C.call(
          S,
          v,
          {
            client: i.client,
            queryKey: i.queryKey,
            meta: i.options.meta,
            signal: i.signal
          },
          o
        );
      } : i.fetchFn = v;
    }
  };
}
function Wv(l, { pages: i, pageParams: o }) {
  const u = i.length - 1;
  return i.length > 0 ? l.getNextPageParam(
    i[u],
    i,
    o[u],
    o
  ) : void 0;
}
function aA(l, { pages: i, pageParams: o }) {
  var u;
  return i.length > 0 ? (u = l.getPreviousPageParam) == null ? void 0 : u.call(l, i[0], i, o[0], o) : void 0;
}
var We, bl, Sl, ci, fi, xl, di, hi, sg, iA = (sg = class {
  constructor(l = {}) {
    pe(this, We);
    pe(this, bl);
    pe(this, Sl);
    pe(this, ci);
    pe(this, fi);
    pe(this, xl);
    pe(this, di);
    pe(this, hi);
    ne(this, We, l.queryCache || new eA()), ne(this, bl, l.mutationCache || new lA()), ne(this, Sl, l.defaultOptions || {}), ne(this, ci, /* @__PURE__ */ new Map()), ne(this, fi, /* @__PURE__ */ new Map()), ne(this, xl, 0);
  }
  mount() {
    nu(this, xl)._++, M(this, xl) === 1 && (ne(this, di, hd.subscribe(async (l) => {
      l && (await this.resumePausedMutations(), M(this, We).onFocus());
    })), ne(this, hi, Su.subscribe(async (l) => {
      l && (await this.resumePausedMutations(), M(this, We).onOnline());
    })));
  }
  unmount() {
    var l, i;
    nu(this, xl)._--, M(this, xl) === 0 && ((l = M(this, di)) == null || l.call(this), ne(this, di, void 0), (i = M(this, hi)) == null || i.call(this), ne(this, hi, void 0));
  }
  isFetching(l) {
    return M(this, We).findAll({ ...l, fetchStatus: "fetching" }).length;
  }
  isMutating(l) {
    return M(this, bl).findAll({ ...l, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(l) {
    var o;
    const i = this.defaultQueryOptions({ queryKey: l });
    return (o = M(this, We).get(i.queryHash)) == null ? void 0 : o.state.data;
  }
  ensureQueryData(l) {
    const i = this.defaultQueryOptions(l), o = M(this, We).build(this, i), u = o.state.data;
    return u === void 0 ? this.fetchQuery(l) : (l.revalidateIfStale && o.isStaleByTime(Al(i.staleTime, o)) && this.prefetchQuery(i), Promise.resolve(u));
  }
  getQueriesData(l) {
    return M(this, We).findAll(l).map(({ queryKey: i, state: o }) => {
      const u = o.data;
      return [i, u];
    });
  }
  setQueryData(l, i, o) {
    const u = this.defaultQueryOptions({ queryKey: l }), c = M(this, We).get(
      u.queryHash
    ), f = c == null ? void 0 : c.state.data, h = YT(i, f);
    if (h !== void 0)
      return M(this, We).build(this, u).setData(h, { ...o, manual: !0 });
  }
  setQueriesData(l, i, o) {
    return mt.batch(
      () => M(this, We).findAll(l).map(({ queryKey: u }) => [
        u,
        this.setQueryData(u, i, o)
      ])
    );
  }
  getQueryState(l) {
    var o;
    const i = this.defaultQueryOptions({ queryKey: l });
    return (o = M(this, We).get(
      i.queryHash
    )) == null ? void 0 : o.state;
  }
  removeQueries(l) {
    const i = M(this, We);
    mt.batch(() => {
      i.findAll(l).forEach((o) => {
        i.remove(o);
      });
    });
  }
  resetQueries(l, i) {
    const o = M(this, We);
    return mt.batch(() => (o.findAll(l).forEach((u) => {
      u.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...l
      },
      i
    )));
  }
  cancelQueries(l, i = {}) {
    const o = { revert: !0, ...i }, u = mt.batch(
      () => M(this, We).findAll(l).map((c) => c.cancel(o))
    );
    return Promise.all(u).then(_t).catch(_t);
  }
  invalidateQueries(l, i = {}) {
    return mt.batch(() => (M(this, We).findAll(l).forEach((o) => {
      o.invalidate();
    }), (l == null ? void 0 : l.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...l,
        type: (l == null ? void 0 : l.refetchType) ?? (l == null ? void 0 : l.type) ?? "active"
      },
      i
    )));
  }
  refetchQueries(l, i = {}) {
    const o = {
      ...i,
      cancelRefetch: i.cancelRefetch ?? !0
    }, u = mt.batch(
      () => M(this, We).findAll(l).filter((c) => !c.isDisabled() && !c.isStatic()).map((c) => {
        let f = c.fetch(void 0, o);
        return o.throwOnError || (f = f.catch(_t)), c.state.fetchStatus === "paused" ? Promise.resolve() : f;
      })
    );
    return Promise.all(u).then(_t);
  }
  fetchQuery(l) {
    const i = this.defaultQueryOptions(l);
    i.retry === void 0 && (i.retry = !1);
    const o = M(this, We).build(this, i);
    return o.isStaleByTime(
      Al(i.staleTime, o)
    ) ? o.fetch(i) : Promise.resolve(o.state.data);
  }
  prefetchQuery(l) {
    return this.fetchQuery(l).then(_t).catch(_t);
  }
  fetchInfiniteQuery(l) {
    return l.behavior = Fv(l.pages), this.fetchQuery(l);
  }
  prefetchInfiniteQuery(l) {
    return this.fetchInfiniteQuery(l).then(_t).catch(_t);
  }
  ensureInfiniteQueryData(l) {
    return l.behavior = Fv(l.pages), this.ensureQueryData(l);
  }
  resumePausedMutations() {
    return Su.isOnline() ? M(this, bl).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return M(this, We);
  }
  getMutationCache() {
    return M(this, bl);
  }
  getDefaultOptions() {
    return M(this, Sl);
  }
  setDefaultOptions(l) {
    ne(this, Sl, l);
  }
  setQueryDefaults(l, i) {
    M(this, ci).set(Dr(l), {
      queryKey: l,
      defaultOptions: i
    });
  }
  getQueryDefaults(l) {
    const i = [...M(this, ci).values()], o = {};
    return i.forEach((u) => {
      _r(l, u.queryKey) && Object.assign(o, u.defaultOptions);
    }), o;
  }
  setMutationDefaults(l, i) {
    M(this, fi).set(Dr(l), {
      mutationKey: l,
      defaultOptions: i
    });
  }
  getMutationDefaults(l) {
    const i = [...M(this, fi).values()], o = {};
    return i.forEach((u) => {
      _r(l, u.mutationKey) && Object.assign(o, u.defaultOptions);
    }), o;
  }
  defaultQueryOptions(l) {
    if (l._defaulted)
      return l;
    const i = {
      ...M(this, Sl).queries,
      ...this.getQueryDefaults(l.queryKey),
      ...l,
      _defaulted: !0
    };
    return i.queryHash || (i.queryHash = fd(
      i.queryKey,
      i
    )), i.refetchOnReconnect === void 0 && (i.refetchOnReconnect = i.networkMode !== "always"), i.throwOnError === void 0 && (i.throwOnError = !!i.suspense), !i.networkMode && i.persister && (i.networkMode = "offlineFirst"), i.queryFn === dd && (i.enabled = !1), i;
  }
  defaultMutationOptions(l) {
    return l != null && l._defaulted ? l : {
      ...M(this, Sl).mutations,
      ...(l == null ? void 0 : l.mutationKey) && this.getMutationDefaults(l.mutationKey),
      ...l,
      _defaulted: !0
    };
  }
  clear() {
    M(this, We).clear(), M(this, bl).clear();
  }
}, We = new WeakMap(), bl = new WeakMap(), Sl = new WeakMap(), ci = new WeakMap(), fi = new WeakMap(), xl = new WeakMap(), di = new WeakMap(), hi = new WeakMap(), sg), Dt, _e, jr, wt, aa, mi, El, wl, Ur, pi, vi, ia, ra, Tl, gi, Le, Ar, _f, Nf, zf, jf, Uf, Hf, Lf, Vy, cg, rA = (cg = class extends Gr {
  constructor(i, o) {
    super();
    pe(this, Le);
    pe(this, Dt);
    pe(this, _e);
    pe(this, jr);
    pe(this, wt);
    pe(this, aa);
    pe(this, mi);
    pe(this, El);
    pe(this, wl);
    pe(this, Ur);
    pe(this, pi);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    pe(this, vi);
    pe(this, ia);
    pe(this, ra);
    pe(this, Tl);
    pe(this, gi, /* @__PURE__ */ new Set());
    this.options = o, ne(this, Dt, i), ne(this, wl, null), ne(this, El, Df()), this.options.experimental_prefetchInRender || M(this, El).reject(
      new Error("experimental_prefetchInRender feature flag is not enabled")
    ), this.bindMethods(), this.setOptions(o);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (M(this, _e).addObserver(this), $v(M(this, _e), this.options) ? De(this, Le, Ar).call(this) : this.updateResult(), De(this, Le, jf).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Bf(
      M(this, _e),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return Bf(
      M(this, _e),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), De(this, Le, Uf).call(this), De(this, Le, Hf).call(this), M(this, _e).removeObserver(this);
  }
  setOptions(i) {
    const o = this.options, u = M(this, _e);
    if (this.options = M(this, Dt).defaultQueryOptions(i), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof rn(this.options.enabled, M(this, _e)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    De(this, Le, Lf).call(this), M(this, _e).setOptions(this.options), o._defaulted && !Cf(this.options, o) && M(this, Dt).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: M(this, _e),
      observer: this
    });
    const c = this.hasListeners();
    c && Iv(
      M(this, _e),
      u,
      this.options,
      o
    ) && De(this, Le, Ar).call(this), this.updateResult(), c && (M(this, _e) !== u || rn(this.options.enabled, M(this, _e)) !== rn(o.enabled, M(this, _e)) || Al(this.options.staleTime, M(this, _e)) !== Al(o.staleTime, M(this, _e))) && De(this, Le, _f).call(this);
    const f = De(this, Le, Nf).call(this);
    c && (M(this, _e) !== u || rn(this.options.enabled, M(this, _e)) !== rn(o.enabled, M(this, _e)) || f !== M(this, Tl)) && De(this, Le, zf).call(this, f);
  }
  getOptimisticResult(i) {
    const o = M(this, Dt).getQueryCache().build(M(this, Dt), i), u = this.createResult(o, i);
    return uA(this, u) && (ne(this, wt, u), ne(this, mi, this.options), ne(this, aa, M(this, _e).state)), u;
  }
  getCurrentResult() {
    return M(this, wt);
  }
  trackResult(i, o) {
    return new Proxy(i, {
      get: (u, c) => (this.trackProp(c), o == null || o(c), Reflect.get(u, c))
    });
  }
  trackProp(i) {
    M(this, gi).add(i);
  }
  getCurrentQuery() {
    return M(this, _e);
  }
  refetch({ ...i } = {}) {
    return this.fetch({
      ...i
    });
  }
  fetchOptimistic(i) {
    const o = M(this, Dt).defaultQueryOptions(i), u = M(this, Dt).getQueryCache().build(M(this, Dt), o);
    return u.fetch().then(() => this.createResult(u, o));
  }
  fetch(i) {
    return De(this, Le, Ar).call(this, {
      ...i,
      cancelRefetch: i.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), M(this, wt)));
  }
  createResult(i, o) {
    var te;
    const u = M(this, _e), c = this.options, f = M(this, wt), h = M(this, aa), m = M(this, mi), v = i !== u ? i.state : M(this, jr), { state: b } = i;
    let x = { ...b }, T = !1, R;
    if (o._optimisticResults) {
      const re = this.hasListeners(), ge = !re && $v(i, o), ce = re && Iv(i, u, o, c);
      (ge || ce) && (x = {
        ...x,
        ...ky(b.data, i.options)
      }), o._optimisticResults === "isRestoring" && (x.fetchStatus = "idle");
    }
    let { error: _, errorUpdatedAt: S, status: C } = x;
    R = x.data;
    let N = !1;
    if (o.placeholderData !== void 0 && R === void 0 && C === "pending") {
      let re;
      f != null && f.isPlaceholderData && o.placeholderData === (m == null ? void 0 : m.placeholderData) ? (re = f.data, N = !0) : re = typeof o.placeholderData == "function" ? o.placeholderData(
        (te = M(this, vi)) == null ? void 0 : te.state.data,
        M(this, vi)
      ) : o.placeholderData, re !== void 0 && (C = "success", R = Mf(
        f == null ? void 0 : f.data,
        re,
        o
      ), T = !0);
    }
    if (o.select && R !== void 0 && !N)
      if (f && R === (h == null ? void 0 : h.data) && o.select === M(this, Ur))
        R = M(this, pi);
      else
        try {
          ne(this, Ur, o.select), R = o.select(R), R = Mf(f == null ? void 0 : f.data, R, o), ne(this, pi, R), ne(this, wl, null);
        } catch (re) {
          ne(this, wl, re);
        }
    M(this, wl) && (_ = M(this, wl), R = M(this, pi), S = Date.now(), C = "error");
    const z = x.fetchStatus === "fetching", H = C === "pending", k = C === "error", Q = H && z, W = R !== void 0, K = {
      status: C,
      fetchStatus: x.fetchStatus,
      isPending: H,
      isSuccess: C === "success",
      isError: k,
      isInitialLoading: Q,
      isLoading: Q,
      data: R,
      dataUpdatedAt: x.dataUpdatedAt,
      error: _,
      errorUpdatedAt: S,
      failureCount: x.fetchFailureCount,
      failureReason: x.fetchFailureReason,
      errorUpdateCount: x.errorUpdateCount,
      isFetched: x.dataUpdateCount > 0 || x.errorUpdateCount > 0,
      isFetchedAfterMount: x.dataUpdateCount > v.dataUpdateCount || x.errorUpdateCount > v.errorUpdateCount,
      isFetching: z,
      isRefetching: z && !H,
      isLoadingError: k && !W,
      isPaused: x.fetchStatus === "paused",
      isPlaceholderData: T,
      isRefetchError: k && W,
      isStale: md(i, o),
      refetch: this.refetch,
      promise: M(this, El)
    };
    if (this.options.experimental_prefetchInRender) {
      const re = (ye) => {
        K.status === "error" ? ye.reject(K.error) : K.data !== void 0 && ye.resolve(K.data);
      }, ge = () => {
        const ye = ne(this, El, K.promise = Df());
        re(ye);
      }, ce = M(this, El);
      switch (ce.status) {
        case "pending":
          i.queryHash === u.queryHash && re(ce);
          break;
        case "fulfilled":
          (K.status === "error" || K.data !== ce.value) && ge();
          break;
        case "rejected":
          (K.status !== "error" || K.error !== ce.reason) && ge();
          break;
      }
    }
    return K;
  }
  updateResult() {
    const i = M(this, wt), o = this.createResult(M(this, _e), this.options);
    if (ne(this, aa, M(this, _e).state), ne(this, mi, this.options), M(this, aa).data !== void 0 && ne(this, vi, M(this, _e)), Cf(o, i))
      return;
    ne(this, wt, o);
    const u = () => {
      if (!i)
        return !0;
      const { notifyOnChangeProps: c } = this.options, f = typeof c == "function" ? c() : c;
      if (f === "all" || !f && !M(this, gi).size)
        return !0;
      const h = new Set(
        f ?? M(this, gi)
      );
      return this.options.throwOnError && h.add("error"), Object.keys(M(this, wt)).some((m) => {
        const p = m;
        return M(this, wt)[p] !== i[p] && h.has(p);
      });
    };
    De(this, Le, Vy).call(this, { listeners: u() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && De(this, Le, jf).call(this);
  }
}, Dt = new WeakMap(), _e = new WeakMap(), jr = new WeakMap(), wt = new WeakMap(), aa = new WeakMap(), mi = new WeakMap(), El = new WeakMap(), wl = new WeakMap(), Ur = new WeakMap(), pi = new WeakMap(), vi = new WeakMap(), ia = new WeakMap(), ra = new WeakMap(), Tl = new WeakMap(), gi = new WeakMap(), Le = new WeakSet(), Ar = function(i) {
  De(this, Le, Lf).call(this);
  let o = M(this, _e).fetch(
    this.options,
    i
  );
  return i != null && i.throwOnError || (o = o.catch(_t)), o;
}, _f = function() {
  De(this, Le, Uf).call(this);
  const i = Al(
    this.options.staleTime,
    M(this, _e)
  );
  if (ca || M(this, wt).isStale || !Rf(i))
    return;
  const u = Hy(M(this, wt).dataUpdatedAt, i) + 1;
  ne(this, ia, setTimeout(() => {
    M(this, wt).isStale || this.updateResult();
  }, u));
}, Nf = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(M(this, _e)) : this.options.refetchInterval) ?? !1;
}, zf = function(i) {
  De(this, Le, Hf).call(this), ne(this, Tl, i), !(ca || rn(this.options.enabled, M(this, _e)) === !1 || !Rf(M(this, Tl)) || M(this, Tl) === 0) && ne(this, ra, setInterval(() => {
    (this.options.refetchIntervalInBackground || hd.isFocused()) && De(this, Le, Ar).call(this);
  }, M(this, Tl)));
}, jf = function() {
  De(this, Le, _f).call(this), De(this, Le, zf).call(this, De(this, Le, Nf).call(this));
}, Uf = function() {
  M(this, ia) && (clearTimeout(M(this, ia)), ne(this, ia, void 0));
}, Hf = function() {
  M(this, ra) && (clearInterval(M(this, ra)), ne(this, ra, void 0));
}, Lf = function() {
  const i = M(this, Dt).getQueryCache().build(M(this, Dt), this.options);
  if (i === M(this, _e))
    return;
  const o = M(this, _e);
  ne(this, _e, i), ne(this, jr, i.state), this.hasListeners() && (o == null || o.removeObserver(this), i.addObserver(this));
}, Vy = function(i) {
  mt.batch(() => {
    i.listeners && this.listeners.forEach((o) => {
      o(M(this, wt));
    }), M(this, Dt).getQueryCache().notify({
      query: M(this, _e),
      type: "observerResultsUpdated"
    });
  });
}, cg);
function oA(l, i) {
  return rn(i.enabled, l) !== !1 && l.state.data === void 0 && !(l.state.status === "error" && i.retryOnMount === !1);
}
function $v(l, i) {
  return oA(l, i) || l.state.data !== void 0 && Bf(l, i, i.refetchOnMount);
}
function Bf(l, i, o) {
  if (rn(i.enabled, l) !== !1 && Al(i.staleTime, l) !== "static") {
    const u = typeof o == "function" ? o(l) : o;
    return u === "always" || u !== !1 && md(l, i);
  }
  return !1;
}
function Iv(l, i, o, u) {
  return (l !== i || rn(u.enabled, l) === !1) && (!o.suspense || l.state.status !== "error") && md(l, o);
}
function md(l, i) {
  return rn(i.enabled, l) !== !1 && l.isStaleByTime(Al(i.staleTime, l));
}
function uA(l, i) {
  return !Cf(l.getCurrentResult(), i);
}
var Xy = y.createContext(
  void 0
), sA = (l) => {
  const i = y.useContext(Xy);
  if (!i)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return i;
}, cA = ({
  client: l,
  children: i
}) => (y.useEffect(() => (l.mount(), () => {
  l.unmount();
}), [l]), /* @__PURE__ */ w.jsx(Xy.Provider, { value: l, children: i })), Zy = y.createContext(!1), fA = () => y.useContext(Zy);
Zy.Provider;
function dA() {
  let l = !1;
  return {
    clearReset: () => {
      l = !1;
    },
    reset: () => {
      l = !0;
    },
    isReset: () => l
  };
}
var hA = y.createContext(dA()), mA = () => y.useContext(hA), pA = (l, i) => {
  (l.suspense || l.throwOnError || l.experimental_prefetchInRender) && (i.isReset() || (l.retryOnMount = !1));
}, vA = (l) => {
  y.useEffect(() => {
    l.clearReset();
  }, [l]);
}, gA = ({
  result: l,
  errorResetBoundary: i,
  throwOnError: o,
  query: u,
  suspense: c
}) => l.isError && !i.isReset() && !l.isFetching && u && (c && l.data === void 0 || ZT(o, [l.error, u])), yA = (l) => {
  if (l.suspense) {
    const i = (u) => u === "static" ? u : Math.max(u ?? 1e3, 1e3), o = l.staleTime;
    l.staleTime = typeof o == "function" ? (...u) => i(o(...u)) : i(o), typeof l.gcTime == "number" && (l.gcTime = Math.max(l.gcTime, 1e3));
  }
}, bA = (l, i) => l.isLoading && l.isFetching && !i, SA = (l, i) => (l == null ? void 0 : l.suspense) && i.isPending, eg = (l, i, o) => i.fetchOptimistic(l).catch(() => {
  o.clearReset();
});
function xA(l, i, o) {
  var x, T, R, _, S;
  const u = fA(), c = mA(), f = sA(), h = f.defaultQueryOptions(l);
  (T = (x = f.getDefaultOptions().queries) == null ? void 0 : x._experimental_beforeQuery) == null || T.call(
    x,
    h
  ), h._optimisticResults = u ? "isRestoring" : "optimistic", yA(h), pA(h, c), vA(c);
  const m = !f.getQueryCache().get(h.queryHash), [p] = y.useState(
    () => new i(
      f,
      h
    )
  ), v = p.getOptimisticResult(h), b = !u && l.subscribed !== !1;
  if (y.useSyncExternalStore(
    y.useCallback(
      (C) => {
        const N = b ? p.subscribe(mt.batchCalls(C)) : _t;
        return p.updateResult(), N;
      },
      [p, b]
    ),
    () => p.getCurrentResult(),
    () => p.getCurrentResult()
  ), y.useEffect(() => {
    p.setOptions(h);
  }, [h, p]), SA(h, v))
    throw eg(h, p, c);
  if (gA({
    result: v,
    errorResetBoundary: c,
    throwOnError: h.throwOnError,
    query: f.getQueryCache().get(h.queryHash),
    suspense: h.suspense
  }))
    throw v.error;
  if ((_ = (R = f.getDefaultOptions().queries) == null ? void 0 : R._experimental_afterQuery) == null || _.call(
    R,
    h,
    v
  ), h.experimental_prefetchInRender && !ca && bA(v, u)) {
    const C = m ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      eg(h, p, c)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      (S = f.getQueryCache().get(h.queryHash)) == null ? void 0 : S.promise
    );
    C == null || C.catch(_t).finally(() => {
      p.updateResult();
    });
  }
  return h.notifyOnChangeProps ? v : p.trackResult(v);
}
function Ky(l, i) {
  return xA(l, rA);
}
async function EA() {
  const l = await fetch("/data/plugin/loss_slicer/tags");
  if (!l.ok)
    throw new Error(`Failed to load tags: ${l.statusText}`);
  return l.json();
}
async function wA(l, i) {
  const o = await fetch(
    `/data/plugin/loss_slicer/slices?run=${encodeURIComponent(l)}&tag=${encodeURIComponent(i)}`
  );
  if (!o.ok)
    throw new Error(`Failed to load slice data: ${o.statusText}`);
  return o.json();
}
function Py() {
  return Ky({
    queryKey: ["runsAndTags"],
    queryFn: EA
  });
}
function TA(l, i) {
  return Ky({
    queryKey: ["sliceData", l, i],
    queryFn: () => {
      if (!l || !i)
        throw new Error("Run and tag are required");
      return wA(l, i);
    },
    enabled: !!l && !!i
    // Only fetch if run and tag are provided
  });
}
function tg(l, [i, o]) {
  return Math.min(o, Math.max(i, l));
}
function AA(l) {
  const i = l + "CollectionProvider", [o, u] = Lr(i), [c, f] = o(
    i,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), h = (S) => {
    const { scope: C, children: N } = S, z = ml.useRef(null), H = ml.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ w.jsx(c, { scope: C, itemMap: H, collectionRef: z, children: N });
  };
  h.displayName = i;
  const m = l + "CollectionSlot", p = /* @__PURE__ */ Cr(m), v = ml.forwardRef(
    (S, C) => {
      const { scope: N, children: z } = S, H = f(m, N), k = Pe(C, H.collectionRef);
      return /* @__PURE__ */ w.jsx(p, { ref: k, children: z });
    }
  );
  v.displayName = m;
  const b = l + "CollectionItemSlot", x = "data-radix-collection-item", T = /* @__PURE__ */ Cr(b), R = ml.forwardRef(
    (S, C) => {
      const { scope: N, children: z, ...H } = S, k = ml.useRef(null), Q = Pe(C, k), W = f(b, N);
      return ml.useEffect(() => (W.itemMap.set(k, { ref: k, ...H }), () => void W.itemMap.delete(k))), /* @__PURE__ */ w.jsx(T, { [x]: "", ref: Q, children: z });
    }
  );
  R.displayName = b;
  function _(S) {
    const C = f(l + "CollectionConsumer", S);
    return ml.useCallback(() => {
      const z = C.collectionRef.current;
      if (!z) return [];
      const H = Array.from(z.querySelectorAll(`[${x}]`));
      return Array.from(C.itemMap.values()).sort(
        (W, J) => H.indexOf(W.ref.current) - H.indexOf(J.ref.current)
      );
    }, [C.collectionRef, C.itemMap]);
  }
  return [
    { Provider: h, Slot: v, ItemSlot: R },
    _,
    u
  ];
}
var RA = y.createContext(void 0);
function CA(l) {
  const i = y.useContext(RA);
  return l || i || "ltr";
}
function OA(l) {
  const i = y.useRef({ value: l, previous: l });
  return y.useMemo(() => (i.current.value !== l && (i.current.previous = i.current.value, i.current.value = l), i.current.previous), [l]);
}
var MA = [" ", "Enter", "ArrowUp", "ArrowDown"], DA = [" ", "Enter"], fa = "Select", [ju, Uu, _A] = AA(fa), [Ti, gR] = Lr(fa, [
  _A,
  _u
]), Hu = _u(), [NA, Ol] = Ti(fa), [zA, jA] = Ti(fa), Jy = (l) => {
  const {
    __scopeSelect: i,
    children: o,
    open: u,
    defaultOpen: c,
    onOpenChange: f,
    value: h,
    defaultValue: m,
    onValueChange: p,
    dir: v,
    name: b,
    autoComplete: x,
    disabled: T,
    required: R,
    form: _
  } = l, S = Hu(i), [C, N] = y.useState(null), [z, H] = y.useState(null), [k, Q] = y.useState(!1), W = CA(v), [J, K] = bf({
    prop: u,
    defaultProp: c ?? !1,
    onChange: f,
    caller: fa
  }), [te, re] = bf({
    prop: h,
    defaultProp: m,
    onChange: p,
    caller: fa
  }), ge = y.useRef(null), ce = C ? _ || !!C.closest("form") : !0, [ye, Se] = y.useState(/* @__PURE__ */ new Set()), ve = Array.from(ye).map((j) => j.props.value).join(";");
  return /* @__PURE__ */ w.jsx(uT, { ...S, children: /* @__PURE__ */ w.jsxs(
    NA,
    {
      required: R,
      scope: i,
      trigger: C,
      onTriggerChange: N,
      valueNode: z,
      onValueNodeChange: H,
      valueNodeHasChildren: k,
      onValueNodeHasChildrenChange: Q,
      contentId: li(),
      value: te,
      onValueChange: re,
      open: J,
      onOpenChange: K,
      dir: W,
      triggerPointerDownPosRef: ge,
      disabled: T,
      children: [
        /* @__PURE__ */ w.jsx(ju.Provider, { scope: i, children: /* @__PURE__ */ w.jsx(
          zA,
          {
            scope: l.__scopeSelect,
            onNativeOptionAdd: y.useCallback((j) => {
              Se((P) => new Set(P).add(j));
            }, []),
            onNativeOptionRemove: y.useCallback((j) => {
              Se((P) => {
                const G = new Set(P);
                return G.delete(j), G;
              });
            }, []),
            children: o
          }
        ) }),
        ce ? /* @__PURE__ */ w.jsxs(
          bb,
          {
            "aria-hidden": !0,
            required: R,
            tabIndex: -1,
            name: b,
            autoComplete: x,
            value: te,
            onChange: (j) => re(j.target.value),
            disabled: T,
            form: _,
            children: [
              te === void 0 ? /* @__PURE__ */ w.jsx("option", { value: "" }) : null,
              Array.from(ye)
            ]
          },
          ve
        ) : null
      ]
    }
  ) });
};
Jy.displayName = fa;
var Fy = "SelectTrigger", Wy = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, disabled: u = !1, ...c } = l, f = Hu(o), h = Ol(Fy, o), m = h.disabled || u, p = Pe(i, h.onTriggerChange), v = Uu(o), b = y.useRef("touch"), [x, T, R] = xb((S) => {
      const C = v().filter((H) => !H.disabled), N = C.find((H) => H.value === h.value), z = Eb(C, S, N);
      z !== void 0 && h.onValueChange(z.value);
    }), _ = (S) => {
      m || (h.onOpenChange(!0), R()), S && (h.triggerPointerDownPosRef.current = {
        x: Math.round(S.pageX),
        y: Math.round(S.pageY)
      });
    };
    return /* @__PURE__ */ w.jsx(Ty, { asChild: !0, ...f, children: /* @__PURE__ */ w.jsx(
      ke.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": h.contentId,
        "aria-expanded": h.open,
        "aria-required": h.required,
        "aria-autocomplete": "none",
        dir: h.dir,
        "data-state": h.open ? "open" : "closed",
        disabled: m,
        "data-disabled": m ? "" : void 0,
        "data-placeholder": Sb(h.value) ? "" : void 0,
        ...c,
        ref: p,
        onClick: Ue(c.onClick, (S) => {
          S.currentTarget.focus(), b.current !== "mouse" && _(S);
        }),
        onPointerDown: Ue(c.onPointerDown, (S) => {
          b.current = S.pointerType;
          const C = S.target;
          C.hasPointerCapture(S.pointerId) && C.releasePointerCapture(S.pointerId), S.button === 0 && S.ctrlKey === !1 && S.pointerType === "mouse" && (_(S), S.preventDefault());
        }),
        onKeyDown: Ue(c.onKeyDown, (S) => {
          const C = x.current !== "";
          !(S.ctrlKey || S.altKey || S.metaKey) && S.key.length === 1 && T(S.key), !(C && S.key === " ") && MA.includes(S.key) && (_(), S.preventDefault());
        })
      }
    ) });
  }
);
Wy.displayName = Fy;
var $y = "SelectValue", Iy = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, className: u, style: c, children: f, placeholder: h = "", ...m } = l, p = Ol($y, o), { onValueNodeHasChildrenChange: v } = p, b = f !== void 0, x = Pe(i, p.onValueNodeChange);
    return St(() => {
      v(b);
    }, [v, b]), /* @__PURE__ */ w.jsx(
      ke.span,
      {
        ...m,
        ref: x,
        style: { pointerEvents: "none" },
        children: Sb(p.value) ? /* @__PURE__ */ w.jsx(w.Fragment, { children: h }) : f
      }
    );
  }
);
Iy.displayName = $y;
var UA = "SelectIcon", eb = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, children: u, ...c } = l;
    return /* @__PURE__ */ w.jsx(ke.span, { "aria-hidden": !0, ...c, ref: i, children: u || "▼" });
  }
);
eb.displayName = UA;
var HA = "SelectPortal", tb = (l) => /* @__PURE__ */ w.jsx(Ff, { asChild: !0, ...l });
tb.displayName = HA;
var da = "SelectContent", nb = y.forwardRef(
  (l, i) => {
    const o = Ol(da, l.__scopeSelect), [u, c] = y.useState();
    if (St(() => {
      c(new DocumentFragment());
    }, []), !o.open) {
      const f = u;
      return f ? Hr.createPortal(
        /* @__PURE__ */ w.jsx(lb, { scope: l.__scopeSelect, children: /* @__PURE__ */ w.jsx(ju.Slot, { scope: l.__scopeSelect, children: /* @__PURE__ */ w.jsx("div", { children: l.children }) }) }),
        f
      ) : null;
    }
    return /* @__PURE__ */ w.jsx(ab, { ...l, ref: i });
  }
);
nb.displayName = da;
var nn = 10, [lb, Ml] = Ti(da), LA = "SelectContentImpl", BA = /* @__PURE__ */ Cr("SelectContent.RemoveScroll"), ab = y.forwardRef(
  (l, i) => {
    const {
      __scopeSelect: o,
      position: u = "item-aligned",
      onCloseAutoFocus: c,
      onEscapeKeyDown: f,
      onPointerDownOutside: h,
      //
      // PopperContent props
      side: m,
      sideOffset: p,
      align: v,
      alignOffset: b,
      arrowPadding: x,
      collisionBoundary: T,
      collisionPadding: R,
      sticky: _,
      hideWhenDetached: S,
      avoidCollisions: C,
      //
      ...N
    } = l, z = Ol(da, o), [H, k] = y.useState(null), [Q, W] = y.useState(null), J = Pe(i, (I) => k(I)), [K, te] = y.useState(null), [re, ge] = y.useState(
      null
    ), ce = Uu(o), [ye, Se] = y.useState(!1), ve = y.useRef(!1);
    y.useEffect(() => {
      if (H) return Yg(H);
    }, [H]), zg();
    const j = y.useCallback(
      (I) => {
        const [fe, ...He] = ce().map((Re) => Re.ref.current), [Me] = He.slice(-1), Ae = document.activeElement;
        for (const Re of I)
          if (Re === Ae || (Re == null || Re.scrollIntoView({ block: "nearest" }), Re === fe && Q && (Q.scrollTop = 0), Re === Me && Q && (Q.scrollTop = Q.scrollHeight), Re == null || Re.focus(), document.activeElement !== Ae)) return;
      },
      [ce, Q]
    ), P = y.useCallback(
      () => j([K, H]),
      [j, K, H]
    );
    y.useEffect(() => {
      ye && P();
    }, [ye, P]);
    const { onOpenChange: G, triggerPointerDownPosRef: ue } = z;
    y.useEffect(() => {
      if (H) {
        let I = { x: 0, y: 0 };
        const fe = (Me) => {
          var Ae, Re;
          I = {
            x: Math.abs(Math.round(Me.pageX) - (((Ae = ue.current) == null ? void 0 : Ae.x) ?? 0)),
            y: Math.abs(Math.round(Me.pageY) - (((Re = ue.current) == null ? void 0 : Re.y) ?? 0))
          };
        }, He = (Me) => {
          I.x <= 10 && I.y <= 10 ? Me.preventDefault() : H.contains(Me.target) || G(!1), document.removeEventListener("pointermove", fe), ue.current = null;
        };
        return ue.current !== null && (document.addEventListener("pointermove", fe), document.addEventListener("pointerup", He, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", fe), document.removeEventListener("pointerup", He, { capture: !0 });
        };
      }
    }, [H, G, ue]), y.useEffect(() => {
      const I = () => G(!1);
      return window.addEventListener("blur", I), window.addEventListener("resize", I), () => {
        window.removeEventListener("blur", I), window.removeEventListener("resize", I);
      };
    }, [G]);
    const [A, X] = xb((I) => {
      const fe = ce().filter((Ae) => !Ae.disabled), He = fe.find((Ae) => Ae.ref.current === document.activeElement), Me = Eb(fe, I, He);
      Me && setTimeout(() => Me.ref.current.focus());
    }), $ = y.useCallback(
      (I, fe, He) => {
        const Me = !ve.current && !He;
        (z.value !== void 0 && z.value === fe || Me) && (te(I), Me && (ve.current = !0));
      },
      [z.value]
    ), F = y.useCallback(() => H == null ? void 0 : H.focus(), [H]), ee = y.useCallback(
      (I, fe, He) => {
        const Me = !ve.current && !He;
        (z.value !== void 0 && z.value === fe || Me) && ge(I);
      },
      [z.value]
    ), be = u === "popper" ? qf : ib, se = be === qf ? {
      side: m,
      sideOffset: p,
      align: v,
      alignOffset: b,
      arrowPadding: x,
      collisionBoundary: T,
      collisionPadding: R,
      sticky: _,
      hideWhenDetached: S,
      avoidCollisions: C
    } : {};
    return /* @__PURE__ */ w.jsx(
      lb,
      {
        scope: o,
        content: H,
        viewport: Q,
        onViewportChange: W,
        itemRefCallback: $,
        selectedItem: K,
        onItemLeave: F,
        itemTextRefCallback: ee,
        focusSelectedItem: P,
        selectedItemText: re,
        position: u,
        isPositioned: ye,
        searchRef: A,
        children: /* @__PURE__ */ w.jsx(Wf, { as: BA, allowPinchZoom: !0, children: /* @__PURE__ */ w.jsx(
          Jf,
          {
            asChild: !0,
            trapped: z.open,
            onMountAutoFocus: (I) => {
              I.preventDefault();
            },
            onUnmountAutoFocus: Ue(c, (I) => {
              var fe;
              (fe = z.trigger) == null || fe.focus({ preventScroll: !0 }), I.preventDefault();
            }),
            children: /* @__PURE__ */ w.jsx(
              Au,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: f,
                onPointerDownOutside: h,
                onFocusOutside: (I) => I.preventDefault(),
                onDismiss: () => z.onOpenChange(!1),
                children: /* @__PURE__ */ w.jsx(
                  be,
                  {
                    role: "listbox",
                    id: z.contentId,
                    "data-state": z.open ? "open" : "closed",
                    dir: z.dir,
                    onContextMenu: (I) => I.preventDefault(),
                    ...N,
                    ...se,
                    onPlaced: () => Se(!0),
                    ref: J,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...N.style
                    },
                    onKeyDown: Ue(N.onKeyDown, (I) => {
                      const fe = I.ctrlKey || I.altKey || I.metaKey;
                      if (I.key === "Tab" && I.preventDefault(), !fe && I.key.length === 1 && X(I.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(I.key)) {
                        let Me = ce().filter((Ae) => !Ae.disabled).map((Ae) => Ae.ref.current);
                        if (["ArrowUp", "End"].includes(I.key) && (Me = Me.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(I.key)) {
                          const Ae = I.target, Re = Me.indexOf(Ae);
                          Me = Me.slice(Re + 1);
                        }
                        setTimeout(() => j(Me)), I.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
ab.displayName = LA;
var qA = "SelectItemAlignedPosition", ib = y.forwardRef((l, i) => {
  const { __scopeSelect: o, onPlaced: u, ...c } = l, f = Ol(da, o), h = Ml(da, o), [m, p] = y.useState(null), [v, b] = y.useState(null), x = Pe(i, (J) => b(J)), T = Uu(o), R = y.useRef(!1), _ = y.useRef(!0), { viewport: S, selectedItem: C, selectedItemText: N, focusSelectedItem: z } = h, H = y.useCallback(() => {
    if (f.trigger && f.valueNode && m && v && S && C && N) {
      const J = f.trigger.getBoundingClientRect(), K = v.getBoundingClientRect(), te = f.valueNode.getBoundingClientRect(), re = N.getBoundingClientRect();
      if (f.dir !== "rtl") {
        const Ae = re.left - K.left, Re = te.left - Ae, ct = J.left - Re, Tt = J.width + ct, Dl = Math.max(Tt, K.width), _l = window.innerWidth - nn, pt = tg(Re, [
          nn,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(nn, _l - Dl)
        ]);
        m.style.minWidth = Tt + "px", m.style.left = pt + "px";
      } else {
        const Ae = K.right - re.right, Re = window.innerWidth - te.right - Ae, ct = window.innerWidth - J.right - Re, Tt = J.width + ct, Dl = Math.max(Tt, K.width), _l = window.innerWidth - nn, pt = tg(Re, [
          nn,
          Math.max(nn, _l - Dl)
        ]);
        m.style.minWidth = Tt + "px", m.style.right = pt + "px";
      }
      const ge = T(), ce = window.innerHeight - nn * 2, ye = S.scrollHeight, Se = window.getComputedStyle(v), ve = parseInt(Se.borderTopWidth, 10), j = parseInt(Se.paddingTop, 10), P = parseInt(Se.borderBottomWidth, 10), G = parseInt(Se.paddingBottom, 10), ue = ve + j + ye + G + P, A = Math.min(C.offsetHeight * 5, ue), X = window.getComputedStyle(S), $ = parseInt(X.paddingTop, 10), F = parseInt(X.paddingBottom, 10), ee = J.top + J.height / 2 - nn, be = ce - ee, se = C.offsetHeight / 2, I = C.offsetTop + se, fe = ve + j + I, He = ue - fe;
      if (fe <= ee) {
        const Ae = ge.length > 0 && C === ge[ge.length - 1].ref.current;
        m.style.bottom = "0px";
        const Re = v.clientHeight - S.offsetTop - S.offsetHeight, ct = Math.max(
          be,
          se + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (Ae ? F : 0) + Re + P
        ), Tt = fe + ct;
        m.style.height = Tt + "px";
      } else {
        const Ae = ge.length > 0 && C === ge[0].ref.current;
        m.style.top = "0px";
        const ct = Math.max(
          ee,
          ve + S.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (Ae ? $ : 0) + se
        ) + He;
        m.style.height = ct + "px", S.scrollTop = fe - ee + S.offsetTop;
      }
      m.style.margin = `${nn}px 0`, m.style.minHeight = A + "px", m.style.maxHeight = ce + "px", u == null || u(), requestAnimationFrame(() => R.current = !0);
    }
  }, [
    T,
    f.trigger,
    f.valueNode,
    m,
    v,
    S,
    C,
    N,
    f.dir,
    u
  ]);
  St(() => H(), [H]);
  const [k, Q] = y.useState();
  St(() => {
    v && Q(window.getComputedStyle(v).zIndex);
  }, [v]);
  const W = y.useCallback(
    (J) => {
      J && _.current === !0 && (H(), z == null || z(), _.current = !1);
    },
    [H, z]
  );
  return /* @__PURE__ */ w.jsx(
    QA,
    {
      scope: o,
      contentWrapper: m,
      shouldExpandOnScrollRef: R,
      onScrollButtonChange: W,
      children: /* @__PURE__ */ w.jsx(
        "div",
        {
          ref: p,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: k
          },
          children: /* @__PURE__ */ w.jsx(
            ke.div,
            {
              ...c,
              ref: x,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...c.style
              }
            }
          )
        }
      )
    }
  );
});
ib.displayName = qA;
var GA = "SelectPopperPosition", qf = y.forwardRef((l, i) => {
  const {
    __scopeSelect: o,
    align: u = "start",
    collisionPadding: c = nn,
    ...f
  } = l, h = Hu(o);
  return /* @__PURE__ */ w.jsx(
    Ay,
    {
      ...h,
      ...f,
      ref: i,
      align: u,
      collisionPadding: c,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...f.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
qf.displayName = GA;
var [QA, pd] = Ti(da, {}), Gf = "SelectViewport", rb = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, nonce: u, ...c } = l, f = Ml(Gf, o), h = pd(Gf, o), m = Pe(i, f.onViewportChange), p = y.useRef(0);
    return /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
      /* @__PURE__ */ w.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: u
        }
      ),
      /* @__PURE__ */ w.jsx(ju.Slot, { scope: o, children: /* @__PURE__ */ w.jsx(
        ke.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...c,
          ref: m,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...c.style
          },
          onScroll: Ue(c.onScroll, (v) => {
            const b = v.currentTarget, { contentWrapper: x, shouldExpandOnScrollRef: T } = h;
            if (T != null && T.current && x) {
              const R = Math.abs(p.current - b.scrollTop);
              if (R > 0) {
                const _ = window.innerHeight - nn * 2, S = parseFloat(x.style.minHeight), C = parseFloat(x.style.height), N = Math.max(S, C);
                if (N < _) {
                  const z = N + R, H = Math.min(_, z), k = z - H;
                  x.style.height = H + "px", x.style.bottom === "0px" && (b.scrollTop = k > 0 ? k : 0, x.style.justifyContent = "flex-end");
                }
              }
            }
            p.current = b.scrollTop;
          })
        }
      ) })
    ] });
  }
);
rb.displayName = Gf;
var ob = "SelectGroup", [YA, kA] = Ti(ob), VA = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, ...u } = l, c = li();
    return /* @__PURE__ */ w.jsx(YA, { scope: o, id: c, children: /* @__PURE__ */ w.jsx(ke.div, { role: "group", "aria-labelledby": c, ...u, ref: i }) });
  }
);
VA.displayName = ob;
var ub = "SelectLabel", sb = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, ...u } = l, c = kA(ub, o);
    return /* @__PURE__ */ w.jsx(ke.div, { id: c.id, ...u, ref: i });
  }
);
sb.displayName = ub;
var xu = "SelectItem", [XA, cb] = Ti(xu), fb = y.forwardRef(
  (l, i) => {
    const {
      __scopeSelect: o,
      value: u,
      disabled: c = !1,
      textValue: f,
      ...h
    } = l, m = Ol(xu, o), p = Ml(xu, o), v = m.value === u, [b, x] = y.useState(f ?? ""), [T, R] = y.useState(!1), _ = Pe(
      i,
      (z) => {
        var H;
        return (H = p.itemRefCallback) == null ? void 0 : H.call(p, z, u, c);
      }
    ), S = li(), C = y.useRef("touch"), N = () => {
      c || (m.onValueChange(u), m.onOpenChange(!1));
    };
    if (u === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ w.jsx(
      XA,
      {
        scope: o,
        value: u,
        disabled: c,
        textId: S,
        isSelected: v,
        onItemTextChange: y.useCallback((z) => {
          x((H) => H || ((z == null ? void 0 : z.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ w.jsx(
          ju.ItemSlot,
          {
            scope: o,
            value: u,
            disabled: c,
            textValue: b,
            children: /* @__PURE__ */ w.jsx(
              ke.div,
              {
                role: "option",
                "aria-labelledby": S,
                "data-highlighted": T ? "" : void 0,
                "aria-selected": v && T,
                "data-state": v ? "checked" : "unchecked",
                "aria-disabled": c || void 0,
                "data-disabled": c ? "" : void 0,
                tabIndex: c ? void 0 : -1,
                ...h,
                ref: _,
                onFocus: Ue(h.onFocus, () => R(!0)),
                onBlur: Ue(h.onBlur, () => R(!1)),
                onClick: Ue(h.onClick, () => {
                  C.current !== "mouse" && N();
                }),
                onPointerUp: Ue(h.onPointerUp, () => {
                  C.current === "mouse" && N();
                }),
                onPointerDown: Ue(h.onPointerDown, (z) => {
                  C.current = z.pointerType;
                }),
                onPointerMove: Ue(h.onPointerMove, (z) => {
                  var H;
                  C.current = z.pointerType, c ? (H = p.onItemLeave) == null || H.call(p) : C.current === "mouse" && z.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Ue(h.onPointerLeave, (z) => {
                  var H;
                  z.currentTarget === document.activeElement && ((H = p.onItemLeave) == null || H.call(p));
                }),
                onKeyDown: Ue(h.onKeyDown, (z) => {
                  var k;
                  ((k = p.searchRef) == null ? void 0 : k.current) !== "" && z.key === " " || (DA.includes(z.key) && N(), z.key === " " && z.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
fb.displayName = xu;
var Rr = "SelectItemText", db = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, className: u, style: c, ...f } = l, h = Ol(Rr, o), m = Ml(Rr, o), p = cb(Rr, o), v = jA(Rr, o), [b, x] = y.useState(null), T = Pe(
      i,
      (N) => x(N),
      p.onItemTextChange,
      (N) => {
        var z;
        return (z = m.itemTextRefCallback) == null ? void 0 : z.call(m, N, p.value, p.disabled);
      }
    ), R = b == null ? void 0 : b.textContent, _ = y.useMemo(
      () => /* @__PURE__ */ w.jsx("option", { value: p.value, disabled: p.disabled, children: R }, p.value),
      [p.disabled, p.value, R]
    ), { onNativeOptionAdd: S, onNativeOptionRemove: C } = v;
    return St(() => (S(_), () => C(_)), [S, C, _]), /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
      /* @__PURE__ */ w.jsx(ke.span, { id: p.textId, ...f, ref: T }),
      p.isSelected && h.valueNode && !h.valueNodeHasChildren ? Hr.createPortal(f.children, h.valueNode) : null
    ] });
  }
);
db.displayName = Rr;
var hb = "SelectItemIndicator", mb = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, ...u } = l;
    return cb(hb, o).isSelected ? /* @__PURE__ */ w.jsx(ke.span, { "aria-hidden": !0, ...u, ref: i }) : null;
  }
);
mb.displayName = hb;
var Qf = "SelectScrollUpButton", pb = y.forwardRef((l, i) => {
  const o = Ml(Qf, l.__scopeSelect), u = pd(Qf, l.__scopeSelect), [c, f] = y.useState(!1), h = Pe(i, u.onScrollButtonChange);
  return St(() => {
    if (o.viewport && o.isPositioned) {
      let m = function() {
        const v = p.scrollTop > 0;
        f(v);
      };
      const p = o.viewport;
      return m(), p.addEventListener("scroll", m), () => p.removeEventListener("scroll", m);
    }
  }, [o.viewport, o.isPositioned]), c ? /* @__PURE__ */ w.jsx(
    gb,
    {
      ...l,
      ref: h,
      onAutoScroll: () => {
        const { viewport: m, selectedItem: p } = o;
        m && p && (m.scrollTop = m.scrollTop - p.offsetHeight);
      }
    }
  ) : null;
});
pb.displayName = Qf;
var Yf = "SelectScrollDownButton", vb = y.forwardRef((l, i) => {
  const o = Ml(Yf, l.__scopeSelect), u = pd(Yf, l.__scopeSelect), [c, f] = y.useState(!1), h = Pe(i, u.onScrollButtonChange);
  return St(() => {
    if (o.viewport && o.isPositioned) {
      let m = function() {
        const v = p.scrollHeight - p.clientHeight, b = Math.ceil(p.scrollTop) < v;
        f(b);
      };
      const p = o.viewport;
      return m(), p.addEventListener("scroll", m), () => p.removeEventListener("scroll", m);
    }
  }, [o.viewport, o.isPositioned]), c ? /* @__PURE__ */ w.jsx(
    gb,
    {
      ...l,
      ref: h,
      onAutoScroll: () => {
        const { viewport: m, selectedItem: p } = o;
        m && p && (m.scrollTop = m.scrollTop + p.offsetHeight);
      }
    }
  ) : null;
});
vb.displayName = Yf;
var gb = y.forwardRef((l, i) => {
  const { __scopeSelect: o, onAutoScroll: u, ...c } = l, f = Ml("SelectScrollButton", o), h = y.useRef(null), m = Uu(o), p = y.useCallback(() => {
    h.current !== null && (window.clearInterval(h.current), h.current = null);
  }, []);
  return y.useEffect(() => () => p(), [p]), St(() => {
    var b;
    const v = m().find((x) => x.ref.current === document.activeElement);
    (b = v == null ? void 0 : v.ref.current) == null || b.scrollIntoView({ block: "nearest" });
  }, [m]), /* @__PURE__ */ w.jsx(
    ke.div,
    {
      "aria-hidden": !0,
      ...c,
      ref: i,
      style: { flexShrink: 0, ...c.style },
      onPointerDown: Ue(c.onPointerDown, () => {
        h.current === null && (h.current = window.setInterval(u, 50));
      }),
      onPointerMove: Ue(c.onPointerMove, () => {
        var v;
        (v = f.onItemLeave) == null || v.call(f), h.current === null && (h.current = window.setInterval(u, 50));
      }),
      onPointerLeave: Ue(c.onPointerLeave, () => {
        p();
      })
    }
  );
}), ZA = "SelectSeparator", yb = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, ...u } = l;
    return /* @__PURE__ */ w.jsx(ke.div, { "aria-hidden": !0, ...u, ref: i });
  }
);
yb.displayName = ZA;
var kf = "SelectArrow", KA = y.forwardRef(
  (l, i) => {
    const { __scopeSelect: o, ...u } = l, c = Hu(o), f = Ol(kf, o), h = Ml(kf, o);
    return f.open && h.position === "popper" ? /* @__PURE__ */ w.jsx(Ry, { ...c, ...u, ref: i }) : null;
  }
);
KA.displayName = kf;
var PA = "SelectBubbleInput", bb = y.forwardRef(
  ({ __scopeSelect: l, value: i, ...o }, u) => {
    const c = y.useRef(null), f = Pe(u, c), h = OA(i);
    return y.useEffect(() => {
      const m = c.current;
      if (!m) return;
      const p = window.HTMLSelectElement.prototype, b = Object.getOwnPropertyDescriptor(
        p,
        "value"
      ).set;
      if (h !== i && b) {
        const x = new Event("change", { bubbles: !0 });
        b.call(m, i), m.dispatchEvent(x);
      }
    }, [h, i]), /* @__PURE__ */ w.jsx(
      ke.select,
      {
        ...o,
        style: { ...Cy, ...o.style },
        ref: f,
        defaultValue: i
      }
    );
  }
);
bb.displayName = PA;
function Sb(l) {
  return l === "" || l === void 0;
}
function xb(l) {
  const i = oa(l), o = y.useRef(""), u = y.useRef(0), c = y.useCallback(
    (h) => {
      const m = o.current + h;
      i(m), function p(v) {
        o.current = v, window.clearTimeout(u.current), v !== "" && (u.current = window.setTimeout(() => p(""), 1e3));
      }(m);
    },
    [i]
  ), f = y.useCallback(() => {
    o.current = "", window.clearTimeout(u.current);
  }, []);
  return y.useEffect(() => () => window.clearTimeout(u.current), []), [o, c, f];
}
function Eb(l, i, o) {
  const c = i.length > 1 && Array.from(i).every((v) => v === i[0]) ? i[0] : i, f = o ? l.indexOf(o) : -1;
  let h = JA(l, Math.max(f, 0));
  c.length === 1 && (h = h.filter((v) => v !== o));
  const p = h.find(
    (v) => v.textValue.toLowerCase().startsWith(c.toLowerCase())
  );
  return p !== o ? p : void 0;
}
function JA(l, i) {
  return l.map((o, u) => l[(i + u) % l.length]);
}
var FA = Jy, wb = Wy, WA = Iy, $A = eb, IA = tb, Tb = nb, eR = rb, Ab = sb, Rb = fb, tR = db, nR = mb, Cb = pb, Ob = vb, Mb = yb;
const Vf = FA, Xf = WA, Eu = y.forwardRef(({ className: l, children: i, ...o }, u) => /* @__PURE__ */ w.jsxs(
  wb,
  {
    ref: u,
    className: et(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      l
    ),
    ...o,
    children: [
      i,
      /* @__PURE__ */ w.jsx($A, { asChild: !0, children: /* @__PURE__ */ w.jsx(yg, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
Eu.displayName = wb.displayName;
const Db = y.forwardRef(({ className: l, ...i }, o) => /* @__PURE__ */ w.jsx(
  Cb,
  {
    ref: o,
    className: et(
      "flex cursor-default items-center justify-center py-1",
      l
    ),
    ...i,
    children: /* @__PURE__ */ w.jsx(Ex, { className: "h-4 w-4" })
  }
));
Db.displayName = Cb.displayName;
const _b = y.forwardRef(({ className: l, ...i }, o) => /* @__PURE__ */ w.jsx(
  Ob,
  {
    ref: o,
    className: et(
      "flex cursor-default items-center justify-center py-1",
      l
    ),
    ...i,
    children: /* @__PURE__ */ w.jsx(yg, { className: "h-4 w-4" })
  }
));
_b.displayName = Ob.displayName;
const wu = y.forwardRef(({ className: l, children: i, position: o = "popper", ...u }, c) => /* @__PURE__ */ w.jsx(IA, { children: /* @__PURE__ */ w.jsxs(
  Tb,
  {
    ref: c,
    className: et(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      o === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      l
    ),
    position: o,
    ...u,
    children: [
      /* @__PURE__ */ w.jsx(Db, {}),
      /* @__PURE__ */ w.jsx(
        eR,
        {
          className: et(
            "p-1",
            o === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: i
        }
      ),
      /* @__PURE__ */ w.jsx(_b, {})
    ]
  }
) }));
wu.displayName = Tb.displayName;
const lR = y.forwardRef(({ className: l, ...i }, o) => /* @__PURE__ */ w.jsx(
  Ab,
  {
    ref: o,
    className: et("py-1.5 pl-8 pr-2 text-sm font-semibold", l),
    ...i
  }
));
lR.displayName = Ab.displayName;
const Tu = y.forwardRef(({ className: l, children: i, ...o }, u) => /* @__PURE__ */ w.jsxs(
  Rb,
  {
    ref: u,
    className: et(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      l
    ),
    ...o,
    children: [
      /* @__PURE__ */ w.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ w.jsx(nR, { children: /* @__PURE__ */ w.jsx(bx, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ w.jsx(tR, { children: i })
    ]
  }
));
Tu.displayName = Rb.displayName;
const aR = y.forwardRef(({ className: l, ...i }, o) => /* @__PURE__ */ w.jsx(
  Mb,
  {
    ref: o,
    className: et("-mx-1 my-1 h-px bg-muted", l),
    ...i
  }
));
aR.displayName = Mb.displayName;
function iR({ onRunChange: l }) {
  const { data: i, isLoading: o, error: u } = Py();
  if (o)
    return /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Run" }),
      /* @__PURE__ */ w.jsxs("div", { className: "flex items-center gap-2 h-10 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ w.jsx(Kf, { className: "h-4 w-4 animate-spin" }),
        /* @__PURE__ */ w.jsx("span", { children: "Loading runs..." })
      ] })
    ] });
  if (u)
    return /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Run" }),
      /* @__PURE__ */ w.jsx("div", { className: "text-sm text-destructive", children: "Error loading runs" })
    ] });
  const c = Object.keys(i || {});
  return c.length === 0 ? /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Run" }),
    /* @__PURE__ */ w.jsx("div", { className: "text-sm text-muted-foreground", children: "No runs available" })
  ] }) : /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Run" }),
    /* @__PURE__ */ w.jsxs(Vf, { onValueChange: l, children: [
      /* @__PURE__ */ w.jsx(Eu, { className: "h-9", children: /* @__PURE__ */ w.jsx(Xf, { placeholder: "Select a run" }) }),
      /* @__PURE__ */ w.jsx(wu, { children: c.map((f) => /* @__PURE__ */ w.jsx(Tu, { value: f, children: f }, f)) })
    ] })
  ] });
}
function rR({ run: l, onTagChange: i }) {
  const { data: o, isLoading: u } = Py();
  if (u)
    return /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Tag" }),
      /* @__PURE__ */ w.jsxs("div", { className: "flex items-center gap-2 h-10 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ w.jsx(Kf, { className: "h-4 w-4 animate-spin" }),
        /* @__PURE__ */ w.jsx("span", { children: "Loading tags..." })
      ] })
    ] });
  if (!l || !o)
    return /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Tag" }),
      /* @__PURE__ */ w.jsxs(Vf, { disabled: !0, children: [
        /* @__PURE__ */ w.jsx(Eu, { className: "h-9", children: /* @__PURE__ */ w.jsx(Xf, { placeholder: "Select a run first" }) }),
        /* @__PURE__ */ w.jsx(wu, { children: /* @__PURE__ */ w.jsx(Tu, { value: "placeholder", children: "Select a run first" }) })
      ] })
    ] });
  const c = o[l] || [];
  return c.length === 0 ? /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Tag" }),
    /* @__PURE__ */ w.jsx("div", { className: "text-sm text-muted-foreground", children: "No tags available for this run" })
  ] }) : /* @__PURE__ */ w.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ w.jsx("label", { className: "text-sm font-medium", children: "Select Tag" }),
    /* @__PURE__ */ w.jsxs(Vf, { onValueChange: i, children: [
      /* @__PURE__ */ w.jsx(Eu, { className: "h-9", children: /* @__PURE__ */ w.jsx(Xf, { placeholder: "Select a tag" }) }),
      /* @__PURE__ */ w.jsx(wu, { children: c.map((f) => /* @__PURE__ */ w.jsx(Tu, { value: f, children: f }, f)) })
    ] })
  ] });
}
function oR() {
  const [l, i] = y.useState(void 0), [o, u] = y.useState(void 0), { isLoading: c, isError: f, data: h } = TA(l, o), m = (b) => {
    i(b), u(void 0);
  }, p = (b) => {
    u(b);
  }, v = () => !l || !o ? null : c ? /* @__PURE__ */ w.jsxs("div", { className: "flex items-center text-xs text-muted-foreground", children: [
    /* @__PURE__ */ w.jsx(Kf, { className: "h-3 w-3 mr-1 animate-spin" }),
    "Loading..."
  ] }) : f ? /* @__PURE__ */ w.jsxs("div", { className: "flex items-center text-xs text-destructive", children: [
    /* @__PURE__ */ w.jsx(Tx, { className: "h-3 w-3 mr-1" }),
    "Failed to load"
  ] }) : h ? /* @__PURE__ */ w.jsxs("div", { className: "flex items-center text-xs text-green-600", children: [
    /* @__PURE__ */ w.jsx(Rx, { className: "h-3 w-3 mr-1" }),
    h.alphas.length,
    " data points"
  ] }) : null;
  return /* @__PURE__ */ w.jsxs("div", { className: "space-y-4 p-2", children: [
    /* @__PURE__ */ w.jsx("div", { children: /* @__PURE__ */ w.jsx(iR, { onRunChange: m }) }),
    /* @__PURE__ */ w.jsx("div", { className: "mt-2", children: /* @__PURE__ */ w.jsx(rR, { run: l, onTagChange: p }) }),
    /* @__PURE__ */ w.jsx("div", { className: "mt-1 px-1", children: v() }),
    /* @__PURE__ */ w.jsx(y1, {})
  ] });
}
function uR() {
  return /* @__PURE__ */ w.jsxs(BT, { children: [
    /* @__PURE__ */ w.jsx(qT, { children: /* @__PURE__ */ w.jsx("h2", { className: "text-lg font-semibold", children: "Loss Slicer" }) }),
    /* @__PURE__ */ w.jsx(GT, { children: /* @__PURE__ */ w.jsx(QT, { children: /* @__PURE__ */ w.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ w.jsx(oR, {}) }) }) })
  ] });
}
const sR = new iA({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: !1,
      staleTime: 3e4
    }
  }
});
function cR() {
  return /* @__PURE__ */ w.jsx(cA, { client: sR, children: /* @__PURE__ */ w.jsxs(LT, { children: [
    /* @__PURE__ */ w.jsx(uR, {}),
    /* @__PURE__ */ w.jsx("main", { className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ w.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ w.jsx("p", { className: "text-muted-foreground text-center", children: "Select a run and tag from the sidebar to view your data" }) }) })
  ] }) });
}
rx.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ w.jsx(y.StrictMode, { children: /* @__PURE__ */ w.jsx(cR, {}) })
);
