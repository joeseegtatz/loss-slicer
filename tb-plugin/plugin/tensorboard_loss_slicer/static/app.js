function Tp(a, c) {
  for (var r = 0; r < c.length; r++) {
    const o = c[r];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const f in o)
        if (f !== "default" && !(f in a)) {
          const d = Object.getOwnPropertyDescriptor(o, f);
          d && Object.defineProperty(a, f, d.get ? d : {
            enumerable: !0,
            get: () => o[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
function jh(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var gr = { exports: {} }, fu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Im;
function wp() {
  if (Im) return fu;
  Im = 1;
  var a = Symbol.for("react.transitional.element"), c = Symbol.for("react.fragment");
  function r(o, f, d) {
    var h = null;
    if (d !== void 0 && (h = "" + d), f.key !== void 0 && (h = "" + f.key), "key" in f) {
      d = {};
      for (var g in f)
        g !== "key" && (d[g] = f[g]);
    } else d = f;
    return f = d.ref, {
      $$typeof: a,
      type: o,
      key: h,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return fu.Fragment = c, fu.jsx = r, fu.jsxs = r, fu;
}
var yr = { exports: {} }, rt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var th;
function Op() {
  if (th) return rt;
  th = 1;
  var a = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), h = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), A = Symbol.iterator;
  function O(S) {
    return S === null || typeof S != "object" ? null : (S = A && S[A] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  var z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, U = Object.assign, R = {};
  function B(S, q, $) {
    this.props = S, this.context = q, this.refs = R, this.updater = $ || z;
  }
  B.prototype.isReactComponent = {}, B.prototype.setState = function(S, q) {
    if (typeof S != "object" && typeof S != "function" && S != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, S, q, "setState");
  }, B.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function L() {
  }
  L.prototype = B.prototype;
  function Q(S, q, $) {
    this.props = S, this.context = q, this.refs = R, this.updater = $ || z;
  }
  var k = Q.prototype = new L();
  k.constructor = Q, U(k, B.prototype), k.isPureReactComponent = !0;
  var J = Array.isArray, G = { H: null, A: null, T: null, S: null, V: null }, et = Object.prototype.hasOwnProperty;
  function W(S, q, $, Z, F, st) {
    return $ = st.ref, {
      $$typeof: a,
      type: S,
      key: q,
      ref: $ !== void 0 ? $ : null,
      props: st
    };
  }
  function K(S, q) {
    return W(
      S.type,
      q,
      void 0,
      void 0,
      void 0,
      S.props
    );
  }
  function ot(S) {
    return typeof S == "object" && S !== null && S.$$typeof === a;
  }
  function xt(S) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function($) {
      return q[$];
    });
  }
  var Mt = /\/+/g;
  function ht(S, q) {
    return typeof S == "object" && S !== null && S.key != null ? xt("" + S.key) : q.toString(36);
  }
  function Tt() {
  }
  function St(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (typeof S.status == "string" ? S.then(Tt, Tt) : (S.status = "pending", S.then(
          function(q) {
            S.status === "pending" && (S.status = "fulfilled", S.value = q);
          },
          function(q) {
            S.status === "pending" && (S.status = "rejected", S.reason = q);
          }
        )), S.status) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  function vt(S, q, $, Z, F) {
    var st = typeof S;
    (st === "undefined" || st === "boolean") && (S = null);
    var ut = !1;
    if (S === null) ut = !0;
    else
      switch (st) {
        case "bigint":
        case "string":
        case "number":
          ut = !0;
          break;
        case "object":
          switch (S.$$typeof) {
            case a:
            case c:
              ut = !0;
              break;
            case b:
              return ut = S._init, vt(
                ut(S._payload),
                q,
                $,
                Z,
                F
              );
          }
      }
    if (ut)
      return F = F(S), ut = Z === "" ? "." + ht(S, 0) : Z, J(F) ? ($ = "", ut != null && ($ = ut.replace(Mt, "$&/") + "/"), vt(F, q, $, "", function(Pt) {
        return Pt;
      })) : F != null && (ot(F) && (F = K(
        F,
        $ + (F.key == null || S && S.key === F.key ? "" : ("" + F.key).replace(
          Mt,
          "$&/"
        ) + "/") + ut
      )), q.push(F)), 1;
    ut = 0;
    var pt = Z === "" ? "." : Z + ":";
    if (J(S))
      for (var wt = 0; wt < S.length; wt++)
        Z = S[wt], st = pt + ht(Z, wt), ut += vt(
          Z,
          q,
          $,
          st,
          F
        );
    else if (wt = O(S), typeof wt == "function")
      for (S = wt.call(S), wt = 0; !(Z = S.next()).done; )
        Z = Z.value, st = pt + ht(Z, wt++), ut += vt(
          Z,
          q,
          $,
          st,
          F
        );
    else if (st === "object") {
      if (typeof S.then == "function")
        return vt(
          St(S),
          q,
          $,
          Z,
          F
        );
      throw q = String(S), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ut;
  }
  function _(S, q, $) {
    if (S == null) return S;
    var Z = [], F = 0;
    return vt(S, Z, "", "", function(st) {
      return q.call($, st, F++);
    }), Z;
  }
  function V(S) {
    if (S._status === -1) {
      var q = S._result;
      q = q(), q.then(
        function($) {
          (S._status === 0 || S._status === -1) && (S._status = 1, S._result = $);
        },
        function($) {
          (S._status === 0 || S._status === -1) && (S._status = 2, S._result = $);
        }
      ), S._status === -1 && (S._status = 0, S._result = q);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var N = typeof reportError == "function" ? reportError : function(S) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S),
        error: S
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", S);
      return;
    }
    console.error(S);
  };
  function ct() {
  }
  return rt.Children = {
    map: _,
    forEach: function(S, q, $) {
      _(
        S,
        function() {
          q.apply(this, arguments);
        },
        $
      );
    },
    count: function(S) {
      var q = 0;
      return _(S, function() {
        q++;
      }), q;
    },
    toArray: function(S) {
      return _(S, function(q) {
        return q;
      }) || [];
    },
    only: function(S) {
      if (!ot(S))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return S;
    }
  }, rt.Component = B, rt.Fragment = r, rt.Profiler = f, rt.PureComponent = Q, rt.StrictMode = o, rt.Suspense = y, rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, rt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(S) {
      return G.H.useMemoCache(S);
    }
  }, rt.cache = function(S) {
    return function() {
      return S.apply(null, arguments);
    };
  }, rt.cloneElement = function(S, q, $) {
    if (S == null)
      throw Error(
        "The argument must be a React element, but you passed " + S + "."
      );
    var Z = U({}, S.props), F = S.key, st = void 0;
    if (q != null)
      for (ut in q.ref !== void 0 && (st = void 0), q.key !== void 0 && (F = "" + q.key), q)
        !et.call(q, ut) || ut === "key" || ut === "__self" || ut === "__source" || ut === "ref" && q.ref === void 0 || (Z[ut] = q[ut]);
    var ut = arguments.length - 2;
    if (ut === 1) Z.children = $;
    else if (1 < ut) {
      for (var pt = Array(ut), wt = 0; wt < ut; wt++)
        pt[wt] = arguments[wt + 2];
      Z.children = pt;
    }
    return W(S.type, F, void 0, void 0, st, Z);
  }, rt.createContext = function(S) {
    return S = {
      $$typeof: h,
      _currentValue: S,
      _currentValue2: S,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, S.Provider = S, S.Consumer = {
      $$typeof: d,
      _context: S
    }, S;
  }, rt.createElement = function(S, q, $) {
    var Z, F = {}, st = null;
    if (q != null)
      for (Z in q.key !== void 0 && (st = "" + q.key), q)
        et.call(q, Z) && Z !== "key" && Z !== "__self" && Z !== "__source" && (F[Z] = q[Z]);
    var ut = arguments.length - 2;
    if (ut === 1) F.children = $;
    else if (1 < ut) {
      for (var pt = Array(ut), wt = 0; wt < ut; wt++)
        pt[wt] = arguments[wt + 2];
      F.children = pt;
    }
    if (S && S.defaultProps)
      for (Z in ut = S.defaultProps, ut)
        F[Z] === void 0 && (F[Z] = ut[Z]);
    return W(S, st, void 0, void 0, null, F);
  }, rt.createRef = function() {
    return { current: null };
  }, rt.forwardRef = function(S) {
    return { $$typeof: g, render: S };
  }, rt.isValidElement = ot, rt.lazy = function(S) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: S },
      _init: V
    };
  }, rt.memo = function(S, q) {
    return {
      $$typeof: v,
      type: S,
      compare: q === void 0 ? null : q
    };
  }, rt.startTransition = function(S) {
    var q = G.T, $ = {};
    G.T = $;
    try {
      var Z = S(), F = G.S;
      F !== null && F($, Z), typeof Z == "object" && Z !== null && typeof Z.then == "function" && Z.then(ct, N);
    } catch (st) {
      N(st);
    } finally {
      G.T = q;
    }
  }, rt.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, rt.use = function(S) {
    return G.H.use(S);
  }, rt.useActionState = function(S, q, $) {
    return G.H.useActionState(S, q, $);
  }, rt.useCallback = function(S, q) {
    return G.H.useCallback(S, q);
  }, rt.useContext = function(S) {
    return G.H.useContext(S);
  }, rt.useDebugValue = function() {
  }, rt.useDeferredValue = function(S, q) {
    return G.H.useDeferredValue(S, q);
  }, rt.useEffect = function(S, q, $) {
    var Z = G.H;
    if (typeof $ == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return Z.useEffect(S, q);
  }, rt.useId = function() {
    return G.H.useId();
  }, rt.useImperativeHandle = function(S, q, $) {
    return G.H.useImperativeHandle(S, q, $);
  }, rt.useInsertionEffect = function(S, q) {
    return G.H.useInsertionEffect(S, q);
  }, rt.useLayoutEffect = function(S, q) {
    return G.H.useLayoutEffect(S, q);
  }, rt.useMemo = function(S, q) {
    return G.H.useMemo(S, q);
  }, rt.useOptimistic = function(S, q) {
    return G.H.useOptimistic(S, q);
  }, rt.useReducer = function(S, q, $) {
    return G.H.useReducer(S, q, $);
  }, rt.useRef = function(S) {
    return G.H.useRef(S);
  }, rt.useState = function(S) {
    return G.H.useState(S);
  }, rt.useSyncExternalStore = function(S, q, $) {
    return G.H.useSyncExternalStore(
      S,
      q,
      $
    );
  }, rt.useTransition = function() {
    return G.H.useTransition();
  }, rt.version = "19.1.0", rt;
}
var eh;
function Qr() {
  return eh || (eh = 1, yr.exports = Op()), yr.exports;
}
var nh;
function Rp() {
  return nh || (nh = 1, gr.exports = wp()), gr.exports;
}
var X = Rp(), x = Qr();
const Mp = /* @__PURE__ */ jh(x), Lh = /* @__PURE__ */ Tp({
  __proto__: null,
  default: Mp
}, [x]);
var pr = { exports: {} }, du = {}, br = { exports: {} }, Sr = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lh;
function Dp() {
  return lh || (lh = 1, function(a) {
    function c(_, V) {
      var N = _.length;
      _.push(V);
      t: for (; 0 < N; ) {
        var ct = N - 1 >>> 1, S = _[ct];
        if (0 < f(S, V))
          _[ct] = V, _[N] = S, N = ct;
        else break t;
      }
    }
    function r(_) {
      return _.length === 0 ? null : _[0];
    }
    function o(_) {
      if (_.length === 0) return null;
      var V = _[0], N = _.pop();
      if (N !== V) {
        _[0] = N;
        t: for (var ct = 0, S = _.length, q = S >>> 1; ct < q; ) {
          var $ = 2 * (ct + 1) - 1, Z = _[$], F = $ + 1, st = _[F];
          if (0 > f(Z, N))
            F < S && 0 > f(st, Z) ? (_[ct] = st, _[F] = N, ct = F) : (_[ct] = Z, _[$] = N, ct = $);
          else if (F < S && 0 > f(st, N))
            _[ct] = st, _[F] = N, ct = F;
          else break t;
        }
      }
      return V;
    }
    function f(_, V) {
      var N = _.sortIndex - V.sortIndex;
      return N !== 0 ? N : _.id - V.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, g = h.now();
      a.unstable_now = function() {
        return h.now() - g;
      };
    }
    var y = [], v = [], b = 1, A = null, O = 3, z = !1, U = !1, R = !1, B = !1, L = typeof setTimeout == "function" ? setTimeout : null, Q = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function J(_) {
      for (var V = r(v); V !== null; ) {
        if (V.callback === null) o(v);
        else if (V.startTime <= _)
          o(v), V.sortIndex = V.expirationTime, c(y, V);
        else break;
        V = r(v);
      }
    }
    function G(_) {
      if (R = !1, J(_), !U)
        if (r(y) !== null)
          U = !0, et || (et = !0, ht());
        else {
          var V = r(v);
          V !== null && vt(G, V.startTime - _);
        }
    }
    var et = !1, W = -1, K = 5, ot = -1;
    function xt() {
      return B ? !0 : !(a.unstable_now() - ot < K);
    }
    function Mt() {
      if (B = !1, et) {
        var _ = a.unstable_now();
        ot = _;
        var V = !0;
        try {
          t: {
            U = !1, R && (R = !1, Q(W), W = -1), z = !0;
            var N = O;
            try {
              e: {
                for (J(_), A = r(y); A !== null && !(A.expirationTime > _ && xt()); ) {
                  var ct = A.callback;
                  if (typeof ct == "function") {
                    A.callback = null, O = A.priorityLevel;
                    var S = ct(
                      A.expirationTime <= _
                    );
                    if (_ = a.unstable_now(), typeof S == "function") {
                      A.callback = S, J(_), V = !0;
                      break e;
                    }
                    A === r(y) && o(y), J(_);
                  } else o(y);
                  A = r(y);
                }
                if (A !== null) V = !0;
                else {
                  var q = r(v);
                  q !== null && vt(
                    G,
                    q.startTime - _
                  ), V = !1;
                }
              }
              break t;
            } finally {
              A = null, O = N, z = !1;
            }
            V = void 0;
          }
        } finally {
          V ? ht() : et = !1;
        }
      }
    }
    var ht;
    if (typeof k == "function")
      ht = function() {
        k(Mt);
      };
    else if (typeof MessageChannel < "u") {
      var Tt = new MessageChannel(), St = Tt.port2;
      Tt.port1.onmessage = Mt, ht = function() {
        St.postMessage(null);
      };
    } else
      ht = function() {
        L(Mt, 0);
      };
    function vt(_, V) {
      W = L(function() {
        _(a.unstable_now());
      }, V);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, a.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : K = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return O;
    }, a.unstable_next = function(_) {
      switch (O) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = O;
      }
      var N = O;
      O = V;
      try {
        return _();
      } finally {
        O = N;
      }
    }, a.unstable_requestPaint = function() {
      B = !0;
    }, a.unstable_runWithPriority = function(_, V) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var N = O;
      O = _;
      try {
        return V();
      } finally {
        O = N;
      }
    }, a.unstable_scheduleCallback = function(_, V, N) {
      var ct = a.unstable_now();
      switch (typeof N == "object" && N !== null ? (N = N.delay, N = typeof N == "number" && 0 < N ? ct + N : ct) : N = ct, _) {
        case 1:
          var S = -1;
          break;
        case 2:
          S = 250;
          break;
        case 5:
          S = 1073741823;
          break;
        case 4:
          S = 1e4;
          break;
        default:
          S = 5e3;
      }
      return S = N + S, _ = {
        id: b++,
        callback: V,
        priorityLevel: _,
        startTime: N,
        expirationTime: S,
        sortIndex: -1
      }, N > ct ? (_.sortIndex = N, c(v, _), r(y) === null && _ === r(v) && (R ? (Q(W), W = -1) : R = !0, vt(G, N - ct))) : (_.sortIndex = S, c(y, _), U || z || (U = !0, et || (et = !0, ht()))), _;
    }, a.unstable_shouldYield = xt, a.unstable_wrapCallback = function(_) {
      var V = O;
      return function() {
        var N = O;
        O = V;
        try {
          return _.apply(this, arguments);
        } finally {
          O = N;
        }
      };
    };
  }(Sr)), Sr;
}
var ah;
function _p() {
  return ah || (ah = 1, br.exports = Dp()), br.exports;
}
var xr = { exports: {} }, ee = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uh;
function Cp() {
  if (uh) return ee;
  uh = 1;
  var a = Qr();
  function c(y) {
    var v = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        v += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + y + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var o = {
    d: {
      f: r,
      r: function() {
        throw Error(c(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal");
  function d(y, v, b) {
    var A = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: A == null ? null : "" + A,
      children: y,
      containerInfo: v,
      implementation: b
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(y, v) {
    if (y === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, ee.createPortal = function(y, v) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(c(299));
    return d(y, v, null, b);
  }, ee.flushSync = function(y) {
    var v = h.T, b = o.p;
    try {
      if (h.T = null, o.p = 2, y) return y();
    } finally {
      h.T = v, o.p = b, o.d.f();
    }
  }, ee.preconnect = function(y, v) {
    typeof y == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, o.d.C(y, v));
  }, ee.prefetchDNS = function(y) {
    typeof y == "string" && o.d.D(y);
  }, ee.preinit = function(y, v) {
    if (typeof y == "string" && v && typeof v.as == "string") {
      var b = v.as, A = g(b, v.crossOrigin), O = typeof v.integrity == "string" ? v.integrity : void 0, z = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      b === "style" ? o.d.S(
        y,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: A,
          integrity: O,
          fetchPriority: z
        }
      ) : b === "script" && o.d.X(y, {
        crossOrigin: A,
        integrity: O,
        fetchPriority: z,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, ee.preinitModule = function(y, v) {
    if (typeof y == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var b = g(
            v.as,
            v.crossOrigin
          );
          o.d.M(y, {
            crossOrigin: b,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && o.d.M(y);
  }, ee.preload = function(y, v) {
    if (typeof y == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var b = v.as, A = g(b, v.crossOrigin);
      o.d.L(y, b, {
        crossOrigin: A,
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
  }, ee.preloadModule = function(y, v) {
    if (typeof y == "string")
      if (v) {
        var b = g(v.as, v.crossOrigin);
        o.d.m(y, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: b,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else o.d.m(y);
  }, ee.requestFormReset = function(y) {
    o.d.r(y);
  }, ee.unstable_batchedUpdates = function(y, v) {
    return y(v);
  }, ee.useFormState = function(y, v, b) {
    return h.H.useFormState(y, v, b);
  }, ee.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, ee.version = "19.1.0", ee;
}
var ih;
function Yh() {
  if (ih) return xr.exports;
  ih = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return a(), xr.exports = Cp(), xr.exports;
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
var ch;
function zp() {
  if (ch) return du;
  ch = 1;
  var a = _p(), c = Qr(), r = Yh();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    var e = t, n = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (n = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? n : null;
  }
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (d(t) !== t)
      throw Error(o(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var n = t, l = e; ; ) {
      var u = n.return;
      if (u === null) break;
      var i = u.alternate;
      if (i === null) {
        if (l = u.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (u.child === i.child) {
        for (i = u.child; i; ) {
          if (i === n) return g(u), t;
          if (i === l) return g(u), e;
          i = i.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== l.return) n = u, l = i;
      else {
        for (var s = !1, m = u.child; m; ) {
          if (m === n) {
            s = !0, n = u, l = i;
            break;
          }
          if (m === l) {
            s = !0, l = u, n = i;
            break;
          }
          m = m.sibling;
        }
        if (!s) {
          for (m = i.child; m; ) {
            if (m === n) {
              s = !0, n = i, l = u;
              break;
            }
            if (m === l) {
              s = !0, l = i, n = u;
              break;
            }
            m = m.sibling;
          }
          if (!s) throw Error(o(189));
        }
      }
      if (n.alternate !== l) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? t : e;
  }
  function v(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = v(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var b = Object.assign, A = Symbol.for("react.element"), O = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), L = Symbol.for("react.provider"), Q = Symbol.for("react.consumer"), k = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), G = Symbol.for("react.suspense"), et = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), ot = Symbol.for("react.activity"), xt = Symbol.for("react.memo_cache_sentinel"), Mt = Symbol.iterator;
  function ht(t) {
    return t === null || typeof t != "object" ? null : (t = Mt && t[Mt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Tt = Symbol.for("react.client.reference");
  function St(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Tt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case U:
        return "Fragment";
      case B:
        return "Profiler";
      case R:
        return "StrictMode";
      case G:
        return "Suspense";
      case et:
        return "SuspenseList";
      case ot:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case z:
          return "Portal";
        case k:
          return (t.displayName || "Context") + ".Provider";
        case Q:
          return (t._context.displayName || "Context") + ".Consumer";
        case J:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case W:
          return e = t.displayName || null, e !== null ? e : St(t.type) || "Memo";
        case K:
          e = t._payload, t = t._init;
          try {
            return St(t(e));
          } catch {
          }
      }
    return null;
  }
  var vt = Array.isArray, _ = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, N = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], S = -1;
  function q(t) {
    return { current: t };
  }
  function $(t) {
    0 > S || (t.current = ct[S], ct[S] = null, S--);
  }
  function Z(t, e) {
    S++, ct[S] = t.current, t.current = e;
  }
  var F = q(null), st = q(null), ut = q(null), pt = q(null);
  function wt(t, e) {
    switch (Z(ut, e), Z(st, t), Z(F, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Rm(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Rm(e), t = Mm(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    $(F), Z(F, t);
  }
  function Pt() {
    $(F), $(st), $(ut);
  }
  function ze(t) {
    t.memoizedState !== null && Z(pt, t);
    var e = F.current, n = Mm(e, t.type);
    e !== n && (Z(st, t), Z(F, n));
  }
  function Ne(t) {
    st.current === t && ($(F), $(st)), pt.current === t && ($(pt), iu._currentValue = N);
  }
  var Ue = Object.prototype.hasOwnProperty, Pe = a.unstable_scheduleCallback, vl = a.unstable_cancelCallback, ec = a.unstable_shouldYield, nc = a.unstable_requestPaint, Ee = a.unstable_now, lc = a.unstable_getCurrentPriorityLevel, Kn = a.unstable_ImmediatePriority, cs = a.unstable_UserBlockingPriority, pu = a.unstable_NormalPriority, ug = a.unstable_LowPriority, os = a.unstable_IdlePriority, ig = a.log, cg = a.unstable_setDisableYieldValue, ha = null, se = null;
  function pn(t) {
    if (typeof ig == "function" && cg(t), se && typeof se.setStrictMode == "function")
      try {
        se.setStrictMode(ha, t);
      } catch {
      }
  }
  var fe = Math.clz32 ? Math.clz32 : sg, og = Math.log, rg = Math.LN2;
  function sg(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (og(t) / rg | 0) | 0;
  }
  var bu = 256, Su = 4194304;
  function Jn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function xu(t, e, n) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var u = 0, i = t.suspendedLanes, s = t.pingedLanes;
    t = t.warmLanes;
    var m = l & 134217727;
    return m !== 0 ? (l = m & ~i, l !== 0 ? u = Jn(l) : (s &= m, s !== 0 ? u = Jn(s) : n || (n = m & ~t, n !== 0 && (u = Jn(n))))) : (m = l & ~i, m !== 0 ? u = Jn(m) : s !== 0 ? u = Jn(s) : n || (n = l & ~t, n !== 0 && (u = Jn(n)))), u === 0 ? 0 : e !== 0 && e !== u && (e & i) === 0 && (i = u & -u, n = e & -e, i >= n || i === 32 && (n & 4194048) !== 0) ? e : u;
  }
  function va(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function fg(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function rs() {
    var t = bu;
    return bu <<= 1, (bu & 4194048) === 0 && (bu = 256), t;
  }
  function ss() {
    var t = Su;
    return Su <<= 1, (Su & 62914560) === 0 && (Su = 4194304), t;
  }
  function ac(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function ga(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function dg(t, e, n, l, u, i) {
    var s = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var m = t.entanglements, p = t.expirationTimes, M = t.hiddenUpdates;
    for (n = s & ~n; 0 < n; ) {
      var H = 31 - fe(n), Y = 1 << H;
      m[H] = 0, p[H] = -1;
      var D = M[H];
      if (D !== null)
        for (M[H] = null, H = 0; H < D.length; H++) {
          var C = D[H];
          C !== null && (C.lane &= -536870913);
        }
      n &= ~Y;
    }
    l !== 0 && fs(t, l, 0), i !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(s & ~e));
  }
  function fs(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var l = 31 - fe(e);
    t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | n & 4194090;
  }
  function ds(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var l = 31 - fe(n), u = 1 << l;
      u & e | t[l] & e && (t[l] |= e), n &= ~u;
    }
  }
  function uc(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function ic(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ms() {
    var t = V.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Km(t.type));
  }
  function mg(t, e) {
    var n = V.p;
    try {
      return V.p = t, e();
    } finally {
      V.p = n;
    }
  }
  var bn = Math.random().toString(36).slice(2), It = "__reactFiber$" + bn, le = "__reactProps$" + bn, gl = "__reactContainer$" + bn, cc = "__reactEvents$" + bn, hg = "__reactListeners$" + bn, vg = "__reactHandles$" + bn, hs = "__reactResources$" + bn, ya = "__reactMarker$" + bn;
  function oc(t) {
    delete t[It], delete t[le], delete t[cc], delete t[hg], delete t[vg];
  }
  function yl(t) {
    var e = t[It];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[gl] || n[It]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = zm(t); t !== null; ) {
            if (n = t[It]) return n;
            t = zm(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function pl(t) {
    if (t = t[It] || t[gl]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function pa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function bl(t) {
    var e = t[hs];
    return e || (e = t[hs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Zt(t) {
    t[ya] = !0;
  }
  var vs = /* @__PURE__ */ new Set(), gs = {};
  function Wn(t, e) {
    Sl(t, e), Sl(t + "Capture", e);
  }
  function Sl(t, e) {
    for (gs[t] = e, t = 0; t < e.length; t++)
      vs.add(e[t]);
  }
  var gg = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ys = {}, ps = {};
  function yg(t) {
    return Ue.call(ps, t) ? !0 : Ue.call(ys, t) ? !1 : gg.test(t) ? ps[t] = !0 : (ys[t] = !0, !1);
  }
  function Eu(t, e, n) {
    if (yg(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
  }
  function Au(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + n);
    }
  }
  function Ie(t, e, n, l) {
    if (l === null) t.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, "" + l);
    }
  }
  var rc, bs;
  function xl(t) {
    if (rc === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        rc = e && e[1] || "", bs = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + rc + t + bs;
  }
  var sc = !1;
  function fc(t, e) {
    if (!t || sc) return "";
    sc = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var Y = function() {
                throw Error();
              };
              if (Object.defineProperty(Y.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Y, []);
                } catch (C) {
                  var D = C;
                }
                Reflect.construct(t, [], Y);
              } else {
                try {
                  Y.call();
                } catch (C) {
                  D = C;
                }
                t.call(Y.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (C) {
                D = C;
              }
              (Y = t()) && typeof Y.catch == "function" && Y.catch(function() {
              });
            }
          } catch (C) {
            if (C && D && typeof C.stack == "string")
              return [C.stack, D.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var i = l.DetermineComponentFrameRoot(), s = i[0], m = i[1];
      if (s && m) {
        var p = s.split(`
`), M = m.split(`
`);
        for (u = l = 0; l < p.length && !p[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < M.length && !M[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === p.length || u === M.length)
          for (l = p.length - 1, u = M.length - 1; 1 <= l && 0 <= u && p[l] !== M[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (p[l] !== M[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || p[l] !== M[u]) {
                  var H = `
` + p[l].replace(" at new ", " at ");
                  return t.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", t.displayName)), H;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      sc = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? xl(n) : "";
  }
  function pg(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return xl(t.type);
      case 16:
        return xl("Lazy");
      case 13:
        return xl("Suspense");
      case 19:
        return xl("SuspenseList");
      case 0:
      case 15:
        return fc(t.type, !1);
      case 11:
        return fc(t.type.render, !1);
      case 1:
        return fc(t.type, !0);
      case 31:
        return xl("Activity");
      default:
        return "";
    }
  }
  function Ss(t) {
    try {
      var e = "";
      do
        e += pg(t), t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  function Ae(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function xs(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function bg(t) {
    var e = xs(t) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    ), l = "" + t[e];
    if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var u = n.get, i = n.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(s) {
          l = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(s) {
          l = "" + s;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Tu(t) {
    t._valueTracker || (t._valueTracker = bg(t));
  }
  function Es(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), l = "";
    return t && (l = xs(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== n ? (e.setValue(t), !0) : !1;
  }
  function wu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Sg = /[\n"\\]/g;
  function Te(t) {
    return t.replace(
      Sg,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function dc(t, e, n, l, u, i, s, m) {
    t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), e != null ? s === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ae(e)) : t.value !== "" + Ae(e) && (t.value = "" + Ae(e)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), e != null ? mc(t, s, Ae(e)) : n != null ? mc(t, s, Ae(n)) : l != null && t.removeAttribute("value"), u == null && i != null && (t.defaultChecked = !!i), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.name = "" + Ae(m) : t.removeAttribute("name");
  }
  function As(t, e, n, l, u, i, s, m) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.type = i), e != null || n != null) {
      if (!(i !== "submit" && i !== "reset" || e != null))
        return;
      n = n != null ? "" + Ae(n) : "", e = e != null ? "" + Ae(e) : n, m || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = m ? t.checked : !!l, t.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s);
  }
  function mc(t, e, n) {
    e === "number" && wu(t.ownerDocument) === t || t.defaultValue === "" + n || (t.defaultValue = "" + n);
  }
  function El(t, e, n, l) {
    if (t = t.options, e) {
      e = {};
      for (var u = 0; u < n.length; u++)
        e["$" + n[u]] = !0;
      for (n = 0; n < t.length; n++)
        u = e.hasOwnProperty("$" + t[n].value), t[n].selected !== u && (t[n].selected = u), u && l && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + Ae(n), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === n) {
          t[u].selected = !0, l && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Ts(t, e, n) {
    if (e != null && (e = "" + Ae(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + Ae(n) : "";
  }
  function ws(t, e, n, l) {
    if (e == null) {
      if (l != null) {
        if (n != null) throw Error(o(92));
        if (vt(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), e = n;
    }
    n = Ae(e), t.defaultValue = n, l = t.textContent, l === n && l !== "" && l !== null && (t.value = l);
  }
  function Al(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var xg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Os(t, e, n) {
    var l = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, n) : typeof n != "number" || n === 0 || xg.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Rs(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(o(62));
    if (t = t.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var u in e)
        l = e[u], e.hasOwnProperty(u) && n[u] !== l && Os(t, u, l);
    } else
      for (var i in e)
        e.hasOwnProperty(i) && Os(t, i, e[i]);
  }
  function hc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var Eg = /* @__PURE__ */ new Map([
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
  ]), Ag = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ou(t) {
    return Ag.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var vc = null;
  function gc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Tl = null, wl = null;
  function Ms(t) {
    var e = pl(t);
    if (e && (t = e.stateNode)) {
      var n = t[le] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (dc(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + Te(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var l = n[e];
              if (l !== t && l.form === t.form) {
                var u = l[le] || null;
                if (!u) throw Error(o(90));
                dc(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              l = n[e], l.form === t.form && Es(l);
          }
          break t;
        case "textarea":
          Ts(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && El(t, !!n.multiple, e, !1);
      }
    }
  }
  var yc = !1;
  function Ds(t, e, n) {
    if (yc) return t(e, n);
    yc = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (yc = !1, (Tl !== null || wl !== null) && (fi(), Tl && (e = Tl, t = wl, wl = Tl = null, Ms(e), t)))
        for (e = 0; e < t.length; e++) Ms(t[e]);
    }
  }
  function ba(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var l = n[le] || null;
    if (l === null) return null;
    n = l[e];
    t: switch (e) {
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
        (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        o(231, e, typeof n)
      );
    return n;
  }
  var tn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), pc = !1;
  if (tn)
    try {
      var Sa = {};
      Object.defineProperty(Sa, "passive", {
        get: function() {
          pc = !0;
        }
      }), window.addEventListener("test", Sa, Sa), window.removeEventListener("test", Sa, Sa);
    } catch {
      pc = !1;
    }
  var Sn = null, bc = null, Ru = null;
  function _s() {
    if (Ru) return Ru;
    var t, e = bc, n = e.length, l, u = "value" in Sn ? Sn.value : Sn.textContent, i = u.length;
    for (t = 0; t < n && e[t] === u[t]; t++) ;
    var s = n - t;
    for (l = 1; l <= s && e[n - l] === u[i - l]; l++) ;
    return Ru = u.slice(t, 1 < l ? 1 - l : void 0);
  }
  function Mu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Du() {
    return !0;
  }
  function Cs() {
    return !1;
  }
  function ae(t) {
    function e(n, l, u, i, s) {
      this._reactName = n, this._targetInst = u, this.type = l, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var m in t)
        t.hasOwnProperty(m) && (n = t[m], this[m] = n ? n(i) : i[m]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Du : Cs, this.isPropagationStopped = Cs, this;
    }
    return b(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Du);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Du);
      },
      persist: function() {
      },
      isPersistent: Du
    }), e;
  }
  var $n = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _u = ae($n), xa = b({}, $n, { view: 0, detail: 0 }), Tg = ae(xa), Sc, xc, Ea, Cu = b({}, xa, {
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
    getModifierState: Ac,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ea && (Ea && t.type === "mousemove" ? (Sc = t.screenX - Ea.screenX, xc = t.screenY - Ea.screenY) : xc = Sc = 0, Ea = t), Sc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : xc;
    }
  }), zs = ae(Cu), wg = b({}, Cu, { dataTransfer: 0 }), Og = ae(wg), Rg = b({}, xa, { relatedTarget: 0 }), Ec = ae(Rg), Mg = b({}, $n, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Dg = ae(Mg), _g = b({}, $n, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Cg = ae(_g), zg = b({}, $n, { data: 0 }), Ns = ae(zg), Ng = {
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
  }, Ug = {
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
  }, Hg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Bg(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Hg[t]) ? !!e[t] : !1;
  }
  function Ac() {
    return Bg;
  }
  var jg = b({}, xa, {
    key: function(t) {
      if (t.key) {
        var e = Ng[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Mu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Ug[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ac,
    charCode: function(t) {
      return t.type === "keypress" ? Mu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Mu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Lg = ae(jg), Yg = b({}, Cu, {
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
  }), Us = ae(Yg), qg = b({}, xa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ac
  }), Gg = ae(qg), Xg = b({}, $n, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Vg = ae(Xg), Qg = b({}, Cu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zg = ae(Qg), kg = b({}, $n, {
    newState: 0,
    oldState: 0
  }), Kg = ae(kg), Jg = [9, 13, 27, 32], Tc = tn && "CompositionEvent" in window, Aa = null;
  tn && "documentMode" in document && (Aa = document.documentMode);
  var Wg = tn && "TextEvent" in window && !Aa, Hs = tn && (!Tc || Aa && 8 < Aa && 11 >= Aa), Bs = " ", js = !1;
  function Ls(t, e) {
    switch (t) {
      case "keyup":
        return Jg.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ys(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ol = !1;
  function $g(t, e) {
    switch (t) {
      case "compositionend":
        return Ys(e);
      case "keypress":
        return e.which !== 32 ? null : (js = !0, Bs);
      case "textInput":
        return t = e.data, t === Bs && js ? null : t;
      default:
        return null;
    }
  }
  function Fg(t, e) {
    if (Ol)
      return t === "compositionend" || !Tc && Ls(t, e) ? (t = _s(), Ru = bc = Sn = null, Ol = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Hs && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Pg = {
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
  function qs(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Pg[t.type] : e === "textarea";
  }
  function Gs(t, e, n, l) {
    Tl ? wl ? wl.push(l) : wl = [l] : Tl = l, e = yi(e, "onChange"), 0 < e.length && (n = new _u(
      "onChange",
      "change",
      null,
      n,
      l
    ), t.push({ event: n, listeners: e }));
  }
  var Ta = null, wa = null;
  function Ig(t) {
    Em(t, 0);
  }
  function zu(t) {
    var e = pa(t);
    if (Es(e)) return t;
  }
  function Xs(t, e) {
    if (t === "change") return e;
  }
  var Vs = !1;
  if (tn) {
    var wc;
    if (tn) {
      var Oc = "oninput" in document;
      if (!Oc) {
        var Qs = document.createElement("div");
        Qs.setAttribute("oninput", "return;"), Oc = typeof Qs.oninput == "function";
      }
      wc = Oc;
    } else wc = !1;
    Vs = wc && (!document.documentMode || 9 < document.documentMode);
  }
  function Zs() {
    Ta && (Ta.detachEvent("onpropertychange", ks), wa = Ta = null);
  }
  function ks(t) {
    if (t.propertyName === "value" && zu(wa)) {
      var e = [];
      Gs(
        e,
        wa,
        t,
        gc(t)
      ), Ds(Ig, e);
    }
  }
  function ty(t, e, n) {
    t === "focusin" ? (Zs(), Ta = e, wa = n, Ta.attachEvent("onpropertychange", ks)) : t === "focusout" && Zs();
  }
  function ey(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return zu(wa);
  }
  function ny(t, e) {
    if (t === "click") return zu(e);
  }
  function ly(t, e) {
    if (t === "input" || t === "change")
      return zu(e);
  }
  function ay(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var de = typeof Object.is == "function" ? Object.is : ay;
  function Oa(t, e) {
    if (de(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), l = Object.keys(e);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var u = n[l];
      if (!Ue.call(e, u) || !de(t[u], e[u]))
        return !1;
    }
    return !0;
  }
  function Ks(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Js(t, e) {
    var n = Ks(t);
    t = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = t + n.textContent.length, t <= e && l >= e)
          return { node: n, offset: e - t };
        t = l;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Ks(n);
    }
  }
  function Ws(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Ws(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function $s(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = wu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = wu(t.document);
    }
    return e;
  }
  function Rc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var uy = tn && "documentMode" in document && 11 >= document.documentMode, Rl = null, Mc = null, Ra = null, Dc = !1;
  function Fs(t, e, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Dc || Rl == null || Rl !== wu(l) || (l = Rl, "selectionStart" in l && Rc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ra && Oa(Ra, l) || (Ra = l, l = yi(Mc, "onSelect"), 0 < l.length && (e = new _u(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }), e.target = Rl)));
  }
  function Fn(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var Ml = {
    animationend: Fn("Animation", "AnimationEnd"),
    animationiteration: Fn("Animation", "AnimationIteration"),
    animationstart: Fn("Animation", "AnimationStart"),
    transitionrun: Fn("Transition", "TransitionRun"),
    transitionstart: Fn("Transition", "TransitionStart"),
    transitioncancel: Fn("Transition", "TransitionCancel"),
    transitionend: Fn("Transition", "TransitionEnd")
  }, _c = {}, Ps = {};
  tn && (Ps = document.createElement("div").style, "AnimationEvent" in window || (delete Ml.animationend.animation, delete Ml.animationiteration.animation, delete Ml.animationstart.animation), "TransitionEvent" in window || delete Ml.transitionend.transition);
  function Pn(t) {
    if (_c[t]) return _c[t];
    if (!Ml[t]) return t;
    var e = Ml[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Ps)
        return _c[t] = e[n];
    return t;
  }
  var Is = Pn("animationend"), tf = Pn("animationiteration"), ef = Pn("animationstart"), iy = Pn("transitionrun"), cy = Pn("transitionstart"), oy = Pn("transitioncancel"), nf = Pn("transitionend"), lf = /* @__PURE__ */ new Map(), Cc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Cc.push("scrollEnd");
  function He(t, e) {
    lf.set(t, e), Wn(e, [t]);
  }
  var af = /* @__PURE__ */ new WeakMap();
  function we(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = af.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Ss(e)
      }, af.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Ss(e)
    };
  }
  var Oe = [], Dl = 0, zc = 0;
  function Nu() {
    for (var t = Dl, e = zc = Dl = 0; e < t; ) {
      var n = Oe[e];
      Oe[e++] = null;
      var l = Oe[e];
      Oe[e++] = null;
      var u = Oe[e];
      Oe[e++] = null;
      var i = Oe[e];
      if (Oe[e++] = null, l !== null && u !== null) {
        var s = l.pending;
        s === null ? u.next = u : (u.next = s.next, s.next = u), l.pending = u;
      }
      i !== 0 && uf(n, u, i);
    }
  }
  function Uu(t, e, n, l) {
    Oe[Dl++] = t, Oe[Dl++] = e, Oe[Dl++] = n, Oe[Dl++] = l, zc |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function Nc(t, e, n, l) {
    return Uu(t, e, n, l), Hu(t);
  }
  function _l(t, e) {
    return Uu(t, null, null, e), Hu(t);
  }
  function uf(t, e, n) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n);
    for (var u = !1, i = t.return; i !== null; )
      i.childLanes |= n, l = i.alternate, l !== null && (l.childLanes |= n), i.tag === 22 && (t = i.stateNode, t === null || t._visibility & 1 || (u = !0)), t = i, i = i.return;
    return t.tag === 3 ? (i = t.stateNode, u && e !== null && (u = 31 - fe(n), t = i.hiddenUpdates, l = t[u], l === null ? t[u] = [e] : l.push(e), e.lane = n | 536870912), i) : null;
  }
  function Hu(t) {
    if (50 < Pa)
      throw Pa = 0, qo = null, Error(o(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Cl = {};
  function ry(t, e, n, l) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function me(t, e, n, l) {
    return new ry(t, e, n, l);
  }
  function Uc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function en(t, e) {
    var n = t.alternate;
    return n === null ? (n = me(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 65011712, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function cf(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Bu(t, e, n, l, u, i) {
    var s = 0;
    if (l = t, typeof t == "function") Uc(t) && (s = 1);
    else if (typeof t == "string")
      s = fp(
        t,
        n,
        F.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case ot:
          return t = me(31, n, e, u), t.elementType = ot, t.lanes = i, t;
        case U:
          return In(n.children, u, i, e);
        case R:
          s = 8, u |= 24;
          break;
        case B:
          return t = me(12, n, e, u | 2), t.elementType = B, t.lanes = i, t;
        case G:
          return t = me(13, n, e, u), t.elementType = G, t.lanes = i, t;
        case et:
          return t = me(19, n, e, u), t.elementType = et, t.lanes = i, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case L:
              case k:
                s = 10;
                break t;
              case Q:
                s = 9;
                break t;
              case J:
                s = 11;
                break t;
              case W:
                s = 14;
                break t;
              case K:
                s = 16, l = null;
                break t;
            }
          s = 29, n = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = me(s, n, e, u), e.elementType = t, e.type = l, e.lanes = i, e;
  }
  function In(t, e, n, l) {
    return t = me(7, t, l, e), t.lanes = n, t;
  }
  function Hc(t, e, n) {
    return t = me(6, t, null, e), t.lanes = n, t;
  }
  function Bc(t, e, n) {
    return e = me(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var zl = [], Nl = 0, ju = null, Lu = 0, Re = [], Me = 0, tl = null, nn = 1, ln = "";
  function el(t, e) {
    zl[Nl++] = Lu, zl[Nl++] = ju, ju = t, Lu = e;
  }
  function of(t, e, n) {
    Re[Me++] = nn, Re[Me++] = ln, Re[Me++] = tl, tl = t;
    var l = nn;
    t = ln;
    var u = 32 - fe(l) - 1;
    l &= ~(1 << u), n += 1;
    var i = 32 - fe(e) + u;
    if (30 < i) {
      var s = u - u % 5;
      i = (l & (1 << s) - 1).toString(32), l >>= s, u -= s, nn = 1 << 32 - fe(e) + u | n << u | l, ln = i + t;
    } else
      nn = 1 << i | n << u | l, ln = t;
  }
  function jc(t) {
    t.return !== null && (el(t, 1), of(t, 1, 0));
  }
  function Lc(t) {
    for (; t === ju; )
      ju = zl[--Nl], zl[Nl] = null, Lu = zl[--Nl], zl[Nl] = null;
    for (; t === tl; )
      tl = Re[--Me], Re[Me] = null, ln = Re[--Me], Re[Me] = null, nn = Re[--Me], Re[Me] = null;
  }
  var ne = null, Bt = null, At = !1, nl = null, Xe = !1, Yc = Error(o(519));
  function ll(t) {
    var e = Error(o(418, ""));
    throw _a(we(e, t)), Yc;
  }
  function rf(t) {
    var e = t.stateNode, n = t.type, l = t.memoizedProps;
    switch (e[It] = t, e[le] = l, n) {
      case "dialog":
        yt("cancel", e), yt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        yt("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < tu.length; n++)
          yt(tu[n], e);
        break;
      case "source":
        yt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        yt("error", e), yt("load", e);
        break;
      case "details":
        yt("toggle", e);
        break;
      case "input":
        yt("invalid", e), As(
          e,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), Tu(e);
        break;
      case "select":
        yt("invalid", e);
        break;
      case "textarea":
        yt("invalid", e), ws(e, l.value, l.defaultValue, l.children), Tu(e);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || l.suppressHydrationWarning === !0 || Om(e.textContent, n) ? (l.popover != null && (yt("beforetoggle", e), yt("toggle", e)), l.onScroll != null && yt("scroll", e), l.onScrollEnd != null && yt("scrollend", e), l.onClick != null && (e.onclick = pi), e = !0) : e = !1, e || ll(t);
  }
  function sf(t) {
    for (ne = t.return; ne; )
      switch (ne.tag) {
        case 5:
        case 13:
          Xe = !1;
          return;
        case 27:
        case 3:
          Xe = !0;
          return;
        default:
          ne = ne.return;
      }
  }
  function Ma(t) {
    if (t !== ne) return !1;
    if (!At) return sf(t), At = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || nr(t.type, t.memoizedProps)), n = !n), n && Bt && ll(t), sf(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      t: {
        for (t = t.nextSibling, e = 0; t; ) {
          if (t.nodeType === 8)
            if (n = t.data, n === "/$") {
              if (e === 0) {
                Bt = je(t.nextSibling);
                break t;
              }
              e--;
            } else
              n !== "$" && n !== "$!" && n !== "$?" || e++;
          t = t.nextSibling;
        }
        Bt = null;
      }
    } else
      e === 27 ? (e = Bt, Bn(t.type) ? (t = ir, ir = null, Bt = t) : Bt = e) : Bt = ne ? je(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Da() {
    Bt = ne = null, At = !1;
  }
  function ff() {
    var t = nl;
    return t !== null && (ce === null ? ce = t : ce.push.apply(
      ce,
      t
    ), nl = null), t;
  }
  function _a(t) {
    nl === null ? nl = [t] : nl.push(t);
  }
  var qc = q(null), al = null, an = null;
  function xn(t, e, n) {
    Z(qc, e._currentValue), e._currentValue = n;
  }
  function un(t) {
    t._currentValue = qc.current, $(qc);
  }
  function Gc(t, e, n) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function Xc(t, e, n, l) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var i = u.dependencies;
      if (i !== null) {
        var s = u.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var m = i;
          i = u;
          for (var p = 0; p < e.length; p++)
            if (m.context === e[p]) {
              i.lanes |= n, m = i.alternate, m !== null && (m.lanes |= n), Gc(
                i.return,
                n,
                t
              ), l || (s = null);
              break t;
            }
          i = m.next;
        }
      } else if (u.tag === 18) {
        if (s = u.return, s === null) throw Error(o(341));
        s.lanes |= n, i = s.alternate, i !== null && (i.lanes |= n), Gc(s, n, t), s = null;
      } else s = u.child;
      if (s !== null) s.return = u;
      else
        for (s = u; s !== null; ) {
          if (s === t) {
            s = null;
            break;
          }
          if (u = s.sibling, u !== null) {
            u.return = s.return, s = u;
            break;
          }
          s = s.return;
        }
      u = s;
    }
  }
  function Ca(t, e, n, l) {
    t = null;
    for (var u = e, i = !1; u !== null; ) {
      if (!i) {
        if ((u.flags & 524288) !== 0) i = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var s = u.alternate;
        if (s === null) throw Error(o(387));
        if (s = s.memoizedProps, s !== null) {
          var m = u.type;
          de(u.pendingProps.value, s.value) || (t !== null ? t.push(m) : t = [m]);
        }
      } else if (u === pt.current) {
        if (s = u.alternate, s === null) throw Error(o(387));
        s.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(iu) : t = [iu]);
      }
      u = u.return;
    }
    t !== null && Xc(
      e,
      t,
      n,
      l
    ), e.flags |= 262144;
  }
  function Yu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!de(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ul(t) {
    al = t, an = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function te(t) {
    return df(al, t);
  }
  function qu(t, e) {
    return al === null && ul(t), df(t, e);
  }
  function df(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, an === null) {
      if (t === null) throw Error(o(308));
      an = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else an = an.next = e;
    return n;
  }
  var sy = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, fy = a.unstable_scheduleCallback, dy = a.unstable_NormalPriority, Xt = {
    $$typeof: k,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Vc() {
    return {
      controller: new sy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function za(t) {
    t.refCount--, t.refCount === 0 && fy(dy, function() {
      t.controller.abort();
    });
  }
  var Na = null, Qc = 0, Ul = 0, Hl = null;
  function my(t, e) {
    if (Na === null) {
      var n = Na = [];
      Qc = 0, Ul = Ko(), Hl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return Qc++, e.then(mf, mf), e;
  }
  function mf() {
    if (--Qc === 0 && Na !== null) {
      Hl !== null && (Hl.status = "fulfilled");
      var t = Na;
      Na = null, Ul = 0, Hl = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function hy(t, e) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        n.push(u);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = e;
        for (var u = 0; u < n.length; u++) (0, n[u])(e);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < n.length; u++)
          (0, n[u])(void 0);
      }
    ), l;
  }
  var hf = _.S;
  _.S = function(t, e) {
    typeof e == "object" && e !== null && typeof e.then == "function" && my(t, e), hf !== null && hf(t, e);
  };
  var il = q(null);
  function Zc() {
    var t = il.current;
    return t !== null ? t : Nt.pooledCache;
  }
  function Gu(t, e) {
    e === null ? Z(il, il.current) : Z(il, e.pool);
  }
  function vf() {
    var t = Zc();
    return t === null ? null : { parent: Xt._currentValue, pool: t };
  }
  var Ua = Error(o(460)), gf = Error(o(474)), Xu = Error(o(542)), kc = { then: function() {
  } };
  function yf(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Vu() {
  }
  function pf(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(Vu, Vu), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Sf(t), t;
      default:
        if (typeof e.status == "string") e.then(Vu, Vu);
        else {
          if (t = Nt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = e, t.status = "pending", t.then(
            function(l) {
              if (e.status === "pending") {
                var u = e;
                u.status = "fulfilled", u.value = l;
              }
            },
            function(l) {
              if (e.status === "pending") {
                var u = e;
                u.status = "rejected", u.reason = l;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Sf(t), t;
        }
        throw Ha = e, Ua;
    }
  }
  var Ha = null;
  function bf() {
    if (Ha === null) throw Error(o(459));
    var t = Ha;
    return Ha = null, t;
  }
  function Sf(t) {
    if (t === Ua || t === Xu)
      throw Error(o(483));
  }
  var En = !1;
  function Kc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Jc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function An(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Tn(t, e, n) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ot & 2) !== 0) {
      var u = l.pending;
      return u === null ? e.next = e : (e.next = u.next, u.next = e), l.pending = e, e = Hu(t), uf(t, null, n), e;
    }
    return Uu(t, l, e, n), Hu(t);
  }
  function Ba(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, ds(t, n);
    }
  }
  function Wc(t, e) {
    var n = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var u = null, i = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var s = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          i === null ? u = i = s : i = i.next = s, n = n.next;
        } while (n !== null);
        i === null ? u = i = e : i = i.next = e;
      } else u = i = e;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var $c = !1;
  function ja() {
    if ($c) {
      var t = Hl;
      if (t !== null) throw t;
    }
  }
  function La(t, e, n, l) {
    $c = !1;
    var u = t.updateQueue;
    En = !1;
    var i = u.firstBaseUpdate, s = u.lastBaseUpdate, m = u.shared.pending;
    if (m !== null) {
      u.shared.pending = null;
      var p = m, M = p.next;
      p.next = null, s === null ? i = M : s.next = M, s = p;
      var H = t.alternate;
      H !== null && (H = H.updateQueue, m = H.lastBaseUpdate, m !== s && (m === null ? H.firstBaseUpdate = M : m.next = M, H.lastBaseUpdate = p));
    }
    if (i !== null) {
      var Y = u.baseState;
      s = 0, H = M = p = null, m = i;
      do {
        var D = m.lane & -536870913, C = D !== m.lane;
        if (C ? (bt & D) === D : (l & D) === D) {
          D !== 0 && D === Ul && ($c = !0), H !== null && (H = H.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          t: {
            var it = t, lt = m;
            D = e;
            var Ct = n;
            switch (lt.tag) {
              case 1:
                if (it = lt.payload, typeof it == "function") {
                  Y = it.call(Ct, Y, D);
                  break t;
                }
                Y = it;
                break t;
              case 3:
                it.flags = it.flags & -65537 | 128;
              case 0:
                if (it = lt.payload, D = typeof it == "function" ? it.call(Ct, Y, D) : it, D == null) break t;
                Y = b({}, Y, D);
                break t;
              case 2:
                En = !0;
            }
          }
          D = m.callback, D !== null && (t.flags |= 64, C && (t.flags |= 8192), C = u.callbacks, C === null ? u.callbacks = [D] : C.push(D));
        } else
          C = {
            lane: D,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, H === null ? (M = H = C, p = Y) : H = H.next = C, s |= D;
        if (m = m.next, m === null) {
          if (m = u.shared.pending, m === null)
            break;
          C = m, m = C.next, C.next = null, u.lastBaseUpdate = C, u.shared.pending = null;
        }
      } while (!0);
      H === null && (p = Y), u.baseState = p, u.firstBaseUpdate = M, u.lastBaseUpdate = H, i === null && (u.shared.lanes = 0), zn |= s, t.lanes = s, t.memoizedState = Y;
    }
  }
  function xf(t, e) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(e);
  }
  function Ef(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        xf(n[t], e);
  }
  var Bl = q(null), Qu = q(0);
  function Af(t, e) {
    t = mn, Z(Qu, t), Z(Bl, e), mn = t | e.baseLanes;
  }
  function Fc() {
    Z(Qu, mn), Z(Bl, Bl.current);
  }
  function Pc() {
    mn = Qu.current, $(Bl), $(Qu);
  }
  var wn = 0, ft = null, Dt = null, qt = null, Zu = !1, jl = !1, cl = !1, ku = 0, Ya = 0, Ll = null, vy = 0;
  function Lt() {
    throw Error(o(321));
  }
  function Ic(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!de(t[n], e[n])) return !1;
    return !0;
  }
  function to(t, e, n, l, u, i) {
    return wn = i, ft = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, _.H = t === null || t.memoizedState === null ? id : cd, cl = !1, i = n(l, u), cl = !1, jl && (i = wf(
      e,
      n,
      l,
      u
    )), Tf(t), i;
  }
  function Tf(t) {
    _.H = Pu;
    var e = Dt !== null && Dt.next !== null;
    if (wn = 0, qt = Dt = ft = null, Zu = !1, Ya = 0, Ll = null, e) throw Error(o(300));
    t === null || kt || (t = t.dependencies, t !== null && Yu(t) && (kt = !0));
  }
  function wf(t, e, n, l) {
    ft = t;
    var u = 0;
    do {
      if (jl && (Ll = null), Ya = 0, jl = !1, 25 <= u) throw Error(o(301));
      if (u += 1, qt = Dt = null, t.updateQueue != null) {
        var i = t.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      _.H = Ey, i = e(n, l);
    } while (jl);
    return i;
  }
  function gy() {
    var t = _.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? qa(e) : e, t = t.useState()[0], (Dt !== null ? Dt.memoizedState : null) !== t && (ft.flags |= 1024), e;
  }
  function eo() {
    var t = ku !== 0;
    return ku = 0, t;
  }
  function no(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function lo(t) {
    if (Zu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Zu = !1;
    }
    wn = 0, qt = Dt = ft = null, jl = !1, Ya = ku = 0, Ll = null;
  }
  function ue() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return qt === null ? ft.memoizedState = qt = t : qt = qt.next = t, qt;
  }
  function Gt() {
    if (Dt === null) {
      var t = ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Dt.next;
    var e = qt === null ? ft.memoizedState : qt.next;
    if (e !== null)
      qt = e, Dt = t;
    else {
      if (t === null)
        throw ft.alternate === null ? Error(o(467)) : Error(o(310));
      Dt = t, t = {
        memoizedState: Dt.memoizedState,
        baseState: Dt.baseState,
        baseQueue: Dt.baseQueue,
        queue: Dt.queue,
        next: null
      }, qt === null ? ft.memoizedState = qt = t : qt = qt.next = t;
    }
    return qt;
  }
  function ao() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function qa(t) {
    var e = Ya;
    return Ya += 1, Ll === null && (Ll = []), t = pf(Ll, t, e), e = ft, (qt === null ? e.memoizedState : qt.next) === null && (e = e.alternate, _.H = e === null || e.memoizedState === null ? id : cd), t;
  }
  function Ku(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return qa(t);
      if (t.$$typeof === k) return te(t);
    }
    throw Error(o(438, String(t)));
  }
  function uo(t) {
    var e = null, n = ft.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var l = ft.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (e = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = ao(), ft.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), l = 0; l < t; l++)
        n[l] = xt;
    return e.index++, n;
  }
  function cn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Ju(t) {
    var e = Gt();
    return io(e, Dt, t);
  }
  function io(t, e, n) {
    var l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = n;
    var u = t.baseQueue, i = l.pending;
    if (i !== null) {
      if (u !== null) {
        var s = u.next;
        u.next = i.next, i.next = s;
      }
      e.baseQueue = u = i, l.pending = null;
    }
    if (i = t.baseState, u === null) t.memoizedState = i;
    else {
      e = u.next;
      var m = s = null, p = null, M = e, H = !1;
      do {
        var Y = M.lane & -536870913;
        if (Y !== M.lane ? (bt & Y) === Y : (wn & Y) === Y) {
          var D = M.revertLane;
          if (D === 0)
            p !== null && (p = p.next = {
              lane: 0,
              revertLane: 0,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }), Y === Ul && (H = !0);
          else if ((wn & D) === D) {
            M = M.next, D === Ul && (H = !0);
            continue;
          } else
            Y = {
              lane: 0,
              revertLane: M.revertLane,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }, p === null ? (m = p = Y, s = i) : p = p.next = Y, ft.lanes |= D, zn |= D;
          Y = M.action, cl && n(i, Y), i = M.hasEagerState ? M.eagerState : n(i, Y);
        } else
          D = {
            lane: Y,
            revertLane: M.revertLane,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          }, p === null ? (m = p = D, s = i) : p = p.next = D, ft.lanes |= Y, zn |= Y;
        M = M.next;
      } while (M !== null && M !== e);
      if (p === null ? s = i : p.next = m, !de(i, t.memoizedState) && (kt = !0, H && (n = Hl, n !== null)))
        throw n;
      t.memoizedState = i, t.baseState = s, t.baseQueue = p, l.lastRenderedState = i;
    }
    return u === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function co(t) {
    var e = Gt(), n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = t;
    var l = n.dispatch, u = n.pending, i = e.memoizedState;
    if (u !== null) {
      n.pending = null;
      var s = u = u.next;
      do
        i = t(i, s.action), s = s.next;
      while (s !== u);
      de(i, e.memoizedState) || (kt = !0), e.memoizedState = i, e.baseQueue === null && (e.baseState = i), n.lastRenderedState = i;
    }
    return [i, l];
  }
  function Of(t, e, n) {
    var l = ft, u = Gt(), i = At;
    if (i) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = e();
    var s = !de(
      (Dt || u).memoizedState,
      n
    );
    s && (u.memoizedState = n, kt = !0), u = u.queue;
    var m = Df.bind(null, l, u, t);
    if (Ga(2048, 8, m, [t]), u.getSnapshot !== e || s || qt !== null && qt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Yl(
        9,
        Wu(),
        Mf.bind(
          null,
          l,
          u,
          n,
          e
        ),
        null
      ), Nt === null) throw Error(o(349));
      i || (wn & 124) !== 0 || Rf(l, e, n);
    }
    return n;
  }
  function Rf(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = ft.updateQueue, e === null ? (e = ao(), ft.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Mf(t, e, n, l) {
    e.value = n, e.getSnapshot = l, _f(e) && Cf(t);
  }
  function Df(t, e, n) {
    return n(function() {
      _f(e) && Cf(t);
    });
  }
  function _f(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !de(t, n);
    } catch {
      return !0;
    }
  }
  function Cf(t) {
    var e = _l(t, 2);
    e !== null && pe(e, t, 2);
  }
  function oo(t) {
    var e = ue();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), cl) {
        pn(!0);
        try {
          n();
        } finally {
          pn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: cn,
      lastRenderedState: t
    }, e;
  }
  function zf(t, e, n, l) {
    return t.baseState = n, io(
      t,
      Dt,
      typeof l == "function" ? l : cn
    );
  }
  function yy(t, e, n, l, u) {
    if (Fu(t)) throw Error(o(485));
    if (t = e.action, t !== null) {
      var i = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          i.listeners.push(s);
        }
      };
      _.T !== null ? n(!0) : i.isTransition = !1, l(i), n = e.pending, n === null ? (i.next = e.pending = i, Nf(e, i)) : (i.next = n.next, e.pending = n.next = i);
    }
  }
  function Nf(t, e) {
    var n = e.action, l = e.payload, u = t.state;
    if (e.isTransition) {
      var i = _.T, s = {};
      _.T = s;
      try {
        var m = n(u, l), p = _.S;
        p !== null && p(s, m), Uf(t, e, m);
      } catch (M) {
        ro(t, e, M);
      } finally {
        _.T = i;
      }
    } else
      try {
        i = n(u, l), Uf(t, e, i);
      } catch (M) {
        ro(t, e, M);
      }
  }
  function Uf(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Hf(t, e, l);
      },
      function(l) {
        return ro(t, e, l);
      }
    ) : Hf(t, e, n);
  }
  function Hf(t, e, n) {
    e.status = "fulfilled", e.value = n, Bf(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Nf(t, n)));
  }
  function ro(t, e, n) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = n, Bf(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function Bf(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function jf(t, e) {
    return e;
  }
  function Lf(t, e) {
    if (At) {
      var n = Nt.formState;
      if (n !== null) {
        t: {
          var l = ft;
          if (At) {
            if (Bt) {
              e: {
                for (var u = Bt, i = Xe; u.nodeType !== 8; ) {
                  if (!i) {
                    u = null;
                    break e;
                  }
                  if (u = je(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                i = u.data, u = i === "F!" || i === "F" ? u : null;
              }
              if (u) {
                Bt = je(
                  u.nextSibling
                ), l = u.data === "F!";
                break t;
              }
            }
            ll(l);
          }
          l = !1;
        }
        l && (e = n[0]);
      }
    }
    return n = ue(), n.memoizedState = n.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jf,
      lastRenderedState: e
    }, n.queue = l, n = ld.bind(
      null,
      ft,
      l
    ), l.dispatch = n, l = oo(!1), i = vo.bind(
      null,
      ft,
      !1,
      l.queue
    ), l = ue(), u = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = u, n = yy.bind(
      null,
      ft,
      u,
      i,
      n
    ), u.dispatch = n, l.memoizedState = t, [e, n, !1];
  }
  function Yf(t) {
    var e = Gt();
    return qf(e, Dt, t);
  }
  function qf(t, e, n) {
    if (e = io(
      t,
      e,
      jf
    )[0], t = Ju(cn)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = qa(e);
      } catch (s) {
        throw s === Ua ? Xu : s;
      }
    else l = e;
    e = Gt();
    var u = e.queue, i = u.dispatch;
    return n !== e.memoizedState && (ft.flags |= 2048, Yl(
      9,
      Wu(),
      py.bind(null, u, n),
      null
    )), [l, i, t];
  }
  function py(t, e) {
    t.action = e;
  }
  function Gf(t) {
    var e = Gt(), n = Dt;
    if (n !== null)
      return qf(e, n, t);
    Gt(), e = e.memoizedState, n = Gt();
    var l = n.queue.dispatch;
    return n.memoizedState = t, [e, l, !1];
  }
  function Yl(t, e, n, l) {
    return t = { tag: t, create: n, deps: l, inst: e, next: null }, e = ft.updateQueue, e === null && (e = ao(), ft.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (l = n.next, n.next = t, t.next = l, e.lastEffect = t), t;
  }
  function Wu() {
    return { destroy: void 0, resource: void 0 };
  }
  function Xf() {
    return Gt().memoizedState;
  }
  function $u(t, e, n, l) {
    var u = ue();
    l = l === void 0 ? null : l, ft.flags |= t, u.memoizedState = Yl(
      1 | e,
      Wu(),
      n,
      l
    );
  }
  function Ga(t, e, n, l) {
    var u = Gt();
    l = l === void 0 ? null : l;
    var i = u.memoizedState.inst;
    Dt !== null && l !== null && Ic(l, Dt.memoizedState.deps) ? u.memoizedState = Yl(e, i, n, l) : (ft.flags |= t, u.memoizedState = Yl(
      1 | e,
      i,
      n,
      l
    ));
  }
  function Vf(t, e) {
    $u(8390656, 8, t, e);
  }
  function Qf(t, e) {
    Ga(2048, 8, t, e);
  }
  function Zf(t, e) {
    return Ga(4, 2, t, e);
  }
  function kf(t, e) {
    return Ga(4, 4, t, e);
  }
  function Kf(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Jf(t, e, n) {
    n = n != null ? n.concat([t]) : null, Ga(4, 4, Kf.bind(null, e, t), n);
  }
  function so() {
  }
  function Wf(t, e) {
    var n = Gt();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    return e !== null && Ic(e, l[1]) ? l[0] : (n.memoizedState = [t, e], t);
  }
  function $f(t, e) {
    var n = Gt();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    if (e !== null && Ic(e, l[1]))
      return l[0];
    if (l = t(), cl) {
      pn(!0);
      try {
        t();
      } finally {
        pn(!1);
      }
    }
    return n.memoizedState = [l, e], l;
  }
  function fo(t, e, n) {
    return n === void 0 || (wn & 1073741824) !== 0 ? t.memoizedState = e : (t.memoizedState = n, t = Id(), ft.lanes |= t, zn |= t, n);
  }
  function Ff(t, e, n, l) {
    return de(n, e) ? n : Bl.current !== null ? (t = fo(t, n, l), de(t, e) || (kt = !0), t) : (wn & 42) === 0 ? (kt = !0, t.memoizedState = n) : (t = Id(), ft.lanes |= t, zn |= t, e);
  }
  function Pf(t, e, n, l, u) {
    var i = V.p;
    V.p = i !== 0 && 8 > i ? i : 8;
    var s = _.T, m = {};
    _.T = m, vo(t, !1, e, n);
    try {
      var p = u(), M = _.S;
      if (M !== null && M(m, p), p !== null && typeof p == "object" && typeof p.then == "function") {
        var H = hy(
          p,
          l
        );
        Xa(
          t,
          e,
          H,
          ye(t)
        );
      } else
        Xa(
          t,
          e,
          l,
          ye(t)
        );
    } catch (Y) {
      Xa(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: Y },
        ye()
      );
    } finally {
      V.p = i, _.T = s;
    }
  }
  function by() {
  }
  function mo(t, e, n, l) {
    if (t.tag !== 5) throw Error(o(476));
    var u = If(t).queue;
    Pf(
      t,
      u,
      e,
      N,
      n === null ? by : function() {
        return td(t), n(l);
      }
    );
  }
  function If(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: N,
      baseState: N,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cn,
        lastRenderedState: N
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cn,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function td(t) {
    var e = If(t).next.queue;
    Xa(t, e, {}, ye());
  }
  function ho() {
    return te(iu);
  }
  function ed() {
    return Gt().memoizedState;
  }
  function nd() {
    return Gt().memoizedState;
  }
  function Sy(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = ye();
          t = An(n);
          var l = Tn(e, t, n);
          l !== null && (pe(l, e, n), Ba(l, e, n)), e = { cache: Vc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function xy(t, e, n) {
    var l = ye();
    n = {
      lane: l,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fu(t) ? ad(e, n) : (n = Nc(t, e, n, l), n !== null && (pe(n, t, l), ud(n, e, l)));
  }
  function ld(t, e, n) {
    var l = ye();
    Xa(t, e, n, l);
  }
  function Xa(t, e, n, l) {
    var u = {
      lane: l,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Fu(t)) ad(e, u);
    else {
      var i = t.alternate;
      if (t.lanes === 0 && (i === null || i.lanes === 0) && (i = e.lastRenderedReducer, i !== null))
        try {
          var s = e.lastRenderedState, m = i(s, n);
          if (u.hasEagerState = !0, u.eagerState = m, de(m, s))
            return Uu(t, e, u, 0), Nt === null && Nu(), !1;
        } catch {
        } finally {
        }
      if (n = Nc(t, e, u, l), n !== null)
        return pe(n, t, l), ud(n, e, l), !0;
    }
    return !1;
  }
  function vo(t, e, n, l) {
    if (l = {
      lane: 2,
      revertLane: Ko(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fu(t)) {
      if (e) throw Error(o(479));
    } else
      e = Nc(
        t,
        n,
        l,
        2
      ), e !== null && pe(e, t, 2);
  }
  function Fu(t) {
    var e = t.alternate;
    return t === ft || e !== null && e === ft;
  }
  function ad(t, e) {
    jl = Zu = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function ud(t, e, n) {
    if ((n & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, ds(t, n);
    }
  }
  var Pu = {
    readContext: te,
    use: Ku,
    useCallback: Lt,
    useContext: Lt,
    useEffect: Lt,
    useImperativeHandle: Lt,
    useLayoutEffect: Lt,
    useInsertionEffect: Lt,
    useMemo: Lt,
    useReducer: Lt,
    useRef: Lt,
    useState: Lt,
    useDebugValue: Lt,
    useDeferredValue: Lt,
    useTransition: Lt,
    useSyncExternalStore: Lt,
    useId: Lt,
    useHostTransitionStatus: Lt,
    useFormState: Lt,
    useActionState: Lt,
    useOptimistic: Lt,
    useMemoCache: Lt,
    useCacheRefresh: Lt
  }, id = {
    readContext: te,
    use: Ku,
    useCallback: function(t, e) {
      return ue().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: te,
    useEffect: Vf,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, $u(
        4194308,
        4,
        Kf.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return $u(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      $u(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = ue();
      e = e === void 0 ? null : e;
      var l = t();
      if (cl) {
        pn(!0);
        try {
          t();
        } finally {
          pn(!1);
        }
      }
      return n.memoizedState = [l, e], l;
    },
    useReducer: function(t, e, n) {
      var l = ue();
      if (n !== void 0) {
        var u = n(e);
        if (cl) {
          pn(!0);
          try {
            n(e);
          } finally {
            pn(!1);
          }
        }
      } else u = e;
      return l.memoizedState = l.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, l.queue = t, t = t.dispatch = xy.bind(
        null,
        ft,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var e = ue();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = oo(t);
      var e = t.queue, n = ld.bind(null, ft, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: so,
    useDeferredValue: function(t, e) {
      var n = ue();
      return fo(n, t, e);
    },
    useTransition: function() {
      var t = oo(!1);
      return t = Pf.bind(
        null,
        ft,
        t.queue,
        !0,
        !1
      ), ue().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var l = ft, u = ue();
      if (At) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = e(), Nt === null)
          throw Error(o(349));
        (bt & 124) !== 0 || Rf(l, e, n);
      }
      u.memoizedState = n;
      var i = { value: n, getSnapshot: e };
      return u.queue = i, Vf(Df.bind(null, l, i, t), [
        t
      ]), l.flags |= 2048, Yl(
        9,
        Wu(),
        Mf.bind(
          null,
          l,
          i,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = ue(), e = Nt.identifierPrefix;
      if (At) {
        var n = ln, l = nn;
        n = (l & ~(1 << 32 - fe(l) - 1)).toString(32) + n, e = "«" + e + "R" + n, n = ku++, 0 < n && (e += "H" + n.toString(32)), e += "»";
      } else
        n = vy++, e = "«" + e + "r" + n.toString(32) + "»";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: ho,
    useFormState: Lf,
    useActionState: Lf,
    useOptimistic: function(t) {
      var e = ue();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = vo.bind(
        null,
        ft,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: uo,
    useCacheRefresh: function() {
      return ue().memoizedState = Sy.bind(
        null,
        ft
      );
    }
  }, cd = {
    readContext: te,
    use: Ku,
    useCallback: Wf,
    useContext: te,
    useEffect: Qf,
    useImperativeHandle: Jf,
    useInsertionEffect: Zf,
    useLayoutEffect: kf,
    useMemo: $f,
    useReducer: Ju,
    useRef: Xf,
    useState: function() {
      return Ju(cn);
    },
    useDebugValue: so,
    useDeferredValue: function(t, e) {
      var n = Gt();
      return Ff(
        n,
        Dt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ju(cn)[0], e = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : qa(t),
        e
      ];
    },
    useSyncExternalStore: Of,
    useId: ed,
    useHostTransitionStatus: ho,
    useFormState: Yf,
    useActionState: Yf,
    useOptimistic: function(t, e) {
      var n = Gt();
      return zf(n, Dt, t, e);
    },
    useMemoCache: uo,
    useCacheRefresh: nd
  }, Ey = {
    readContext: te,
    use: Ku,
    useCallback: Wf,
    useContext: te,
    useEffect: Qf,
    useImperativeHandle: Jf,
    useInsertionEffect: Zf,
    useLayoutEffect: kf,
    useMemo: $f,
    useReducer: co,
    useRef: Xf,
    useState: function() {
      return co(cn);
    },
    useDebugValue: so,
    useDeferredValue: function(t, e) {
      var n = Gt();
      return Dt === null ? fo(n, t, e) : Ff(
        n,
        Dt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = co(cn)[0], e = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : qa(t),
        e
      ];
    },
    useSyncExternalStore: Of,
    useId: ed,
    useHostTransitionStatus: ho,
    useFormState: Gf,
    useActionState: Gf,
    useOptimistic: function(t, e) {
      var n = Gt();
      return Dt !== null ? zf(n, Dt, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: uo,
    useCacheRefresh: nd
  }, ql = null, Va = 0;
  function Iu(t) {
    var e = Va;
    return Va += 1, ql === null && (ql = []), pf(ql, t, e);
  }
  function Qa(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function ti(t, e) {
    throw e.$$typeof === A ? Error(o(525)) : (t = Object.prototype.toString.call(e), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function od(t) {
    var e = t._init;
    return e(t._payload);
  }
  function rd(t) {
    function e(T, E) {
      if (t) {
        var w = T.deletions;
        w === null ? (T.deletions = [E], T.flags |= 16) : w.push(E);
      }
    }
    function n(T, E) {
      if (!t) return null;
      for (; E !== null; )
        e(T, E), E = E.sibling;
      return null;
    }
    function l(T) {
      for (var E = /* @__PURE__ */ new Map(); T !== null; )
        T.key !== null ? E.set(T.key, T) : E.set(T.index, T), T = T.sibling;
      return E;
    }
    function u(T, E) {
      return T = en(T, E), T.index = 0, T.sibling = null, T;
    }
    function i(T, E, w) {
      return T.index = w, t ? (w = T.alternate, w !== null ? (w = w.index, w < E ? (T.flags |= 67108866, E) : w) : (T.flags |= 67108866, E)) : (T.flags |= 1048576, E);
    }
    function s(T) {
      return t && T.alternate === null && (T.flags |= 67108866), T;
    }
    function m(T, E, w, j) {
      return E === null || E.tag !== 6 ? (E = Hc(w, T.mode, j), E.return = T, E) : (E = u(E, w), E.return = T, E);
    }
    function p(T, E, w, j) {
      var P = w.type;
      return P === U ? H(
        T,
        E,
        w.props.children,
        j,
        w.key
      ) : E !== null && (E.elementType === P || typeof P == "object" && P !== null && P.$$typeof === K && od(P) === E.type) ? (E = u(E, w.props), Qa(E, w), E.return = T, E) : (E = Bu(
        w.type,
        w.key,
        w.props,
        null,
        T.mode,
        j
      ), Qa(E, w), E.return = T, E);
    }
    function M(T, E, w, j) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== w.containerInfo || E.stateNode.implementation !== w.implementation ? (E = Bc(w, T.mode, j), E.return = T, E) : (E = u(E, w.children || []), E.return = T, E);
    }
    function H(T, E, w, j, P) {
      return E === null || E.tag !== 7 ? (E = In(
        w,
        T.mode,
        j,
        P
      ), E.return = T, E) : (E = u(E, w), E.return = T, E);
    }
    function Y(T, E, w) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = Hc(
          "" + E,
          T.mode,
          w
        ), E.return = T, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case O:
            return w = Bu(
              E.type,
              E.key,
              E.props,
              null,
              T.mode,
              w
            ), Qa(w, E), w.return = T, w;
          case z:
            return E = Bc(
              E,
              T.mode,
              w
            ), E.return = T, E;
          case K:
            var j = E._init;
            return E = j(E._payload), Y(T, E, w);
        }
        if (vt(E) || ht(E))
          return E = In(
            E,
            T.mode,
            w,
            null
          ), E.return = T, E;
        if (typeof E.then == "function")
          return Y(T, Iu(E), w);
        if (E.$$typeof === k)
          return Y(
            T,
            qu(T, E),
            w
          );
        ti(T, E);
      }
      return null;
    }
    function D(T, E, w, j) {
      var P = E !== null ? E.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return P !== null ? null : m(T, E, "" + w, j);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case O:
            return w.key === P ? p(T, E, w, j) : null;
          case z:
            return w.key === P ? M(T, E, w, j) : null;
          case K:
            return P = w._init, w = P(w._payload), D(T, E, w, j);
        }
        if (vt(w) || ht(w))
          return P !== null ? null : H(T, E, w, j, null);
        if (typeof w.then == "function")
          return D(
            T,
            E,
            Iu(w),
            j
          );
        if (w.$$typeof === k)
          return D(
            T,
            E,
            qu(T, w),
            j
          );
        ti(T, w);
      }
      return null;
    }
    function C(T, E, w, j, P) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return T = T.get(w) || null, m(E, T, "" + j, P);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case O:
            return T = T.get(
              j.key === null ? w : j.key
            ) || null, p(E, T, j, P);
          case z:
            return T = T.get(
              j.key === null ? w : j.key
            ) || null, M(E, T, j, P);
          case K:
            var mt = j._init;
            return j = mt(j._payload), C(
              T,
              E,
              w,
              j,
              P
            );
        }
        if (vt(j) || ht(j))
          return T = T.get(w) || null, H(E, T, j, P, null);
        if (typeof j.then == "function")
          return C(
            T,
            E,
            w,
            Iu(j),
            P
          );
        if (j.$$typeof === k)
          return C(
            T,
            E,
            w,
            qu(E, j),
            P
          );
        ti(E, j);
      }
      return null;
    }
    function it(T, E, w, j) {
      for (var P = null, mt = null, nt = E, at = E = 0, Jt = null; nt !== null && at < w.length; at++) {
        nt.index > at ? (Jt = nt, nt = null) : Jt = nt.sibling;
        var Et = D(
          T,
          nt,
          w[at],
          j
        );
        if (Et === null) {
          nt === null && (nt = Jt);
          break;
        }
        t && nt && Et.alternate === null && e(T, nt), E = i(Et, E, at), mt === null ? P = Et : mt.sibling = Et, mt = Et, nt = Jt;
      }
      if (at === w.length)
        return n(T, nt), At && el(T, at), P;
      if (nt === null) {
        for (; at < w.length; at++)
          nt = Y(T, w[at], j), nt !== null && (E = i(
            nt,
            E,
            at
          ), mt === null ? P = nt : mt.sibling = nt, mt = nt);
        return At && el(T, at), P;
      }
      for (nt = l(nt); at < w.length; at++)
        Jt = C(
          nt,
          T,
          at,
          w[at],
          j
        ), Jt !== null && (t && Jt.alternate !== null && nt.delete(
          Jt.key === null ? at : Jt.key
        ), E = i(
          Jt,
          E,
          at
        ), mt === null ? P = Jt : mt.sibling = Jt, mt = Jt);
      return t && nt.forEach(function(Gn) {
        return e(T, Gn);
      }), At && el(T, at), P;
    }
    function lt(T, E, w, j) {
      if (w == null) throw Error(o(151));
      for (var P = null, mt = null, nt = E, at = E = 0, Jt = null, Et = w.next(); nt !== null && !Et.done; at++, Et = w.next()) {
        nt.index > at ? (Jt = nt, nt = null) : Jt = nt.sibling;
        var Gn = D(T, nt, Et.value, j);
        if (Gn === null) {
          nt === null && (nt = Jt);
          break;
        }
        t && nt && Gn.alternate === null && e(T, nt), E = i(Gn, E, at), mt === null ? P = Gn : mt.sibling = Gn, mt = Gn, nt = Jt;
      }
      if (Et.done)
        return n(T, nt), At && el(T, at), P;
      if (nt === null) {
        for (; !Et.done; at++, Et = w.next())
          Et = Y(T, Et.value, j), Et !== null && (E = i(Et, E, at), mt === null ? P = Et : mt.sibling = Et, mt = Et);
        return At && el(T, at), P;
      }
      for (nt = l(nt); !Et.done; at++, Et = w.next())
        Et = C(nt, T, at, Et.value, j), Et !== null && (t && Et.alternate !== null && nt.delete(Et.key === null ? at : Et.key), E = i(Et, E, at), mt === null ? P = Et : mt.sibling = Et, mt = Et);
      return t && nt.forEach(function(Ap) {
        return e(T, Ap);
      }), At && el(T, at), P;
    }
    function Ct(T, E, w, j) {
      if (typeof w == "object" && w !== null && w.type === U && w.key === null && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case O:
            t: {
              for (var P = w.key; E !== null; ) {
                if (E.key === P) {
                  if (P = w.type, P === U) {
                    if (E.tag === 7) {
                      n(
                        T,
                        E.sibling
                      ), j = u(
                        E,
                        w.props.children
                      ), j.return = T, T = j;
                      break t;
                    }
                  } else if (E.elementType === P || typeof P == "object" && P !== null && P.$$typeof === K && od(P) === E.type) {
                    n(
                      T,
                      E.sibling
                    ), j = u(E, w.props), Qa(j, w), j.return = T, T = j;
                    break t;
                  }
                  n(T, E);
                  break;
                } else e(T, E);
                E = E.sibling;
              }
              w.type === U ? (j = In(
                w.props.children,
                T.mode,
                j,
                w.key
              ), j.return = T, T = j) : (j = Bu(
                w.type,
                w.key,
                w.props,
                null,
                T.mode,
                j
              ), Qa(j, w), j.return = T, T = j);
            }
            return s(T);
          case z:
            t: {
              for (P = w.key; E !== null; ) {
                if (E.key === P)
                  if (E.tag === 4 && E.stateNode.containerInfo === w.containerInfo && E.stateNode.implementation === w.implementation) {
                    n(
                      T,
                      E.sibling
                    ), j = u(E, w.children || []), j.return = T, T = j;
                    break t;
                  } else {
                    n(T, E);
                    break;
                  }
                else e(T, E);
                E = E.sibling;
              }
              j = Bc(w, T.mode, j), j.return = T, T = j;
            }
            return s(T);
          case K:
            return P = w._init, w = P(w._payload), Ct(
              T,
              E,
              w,
              j
            );
        }
        if (vt(w))
          return it(
            T,
            E,
            w,
            j
          );
        if (ht(w)) {
          if (P = ht(w), typeof P != "function") throw Error(o(150));
          return w = P.call(w), lt(
            T,
            E,
            w,
            j
          );
        }
        if (typeof w.then == "function")
          return Ct(
            T,
            E,
            Iu(w),
            j
          );
        if (w.$$typeof === k)
          return Ct(
            T,
            E,
            qu(T, w),
            j
          );
        ti(T, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint" ? (w = "" + w, E !== null && E.tag === 6 ? (n(T, E.sibling), j = u(E, w), j.return = T, T = j) : (n(T, E), j = Hc(w, T.mode, j), j.return = T, T = j), s(T)) : n(T, E);
    }
    return function(T, E, w, j) {
      try {
        Va = 0;
        var P = Ct(
          T,
          E,
          w,
          j
        );
        return ql = null, P;
      } catch (nt) {
        if (nt === Ua || nt === Xu) throw nt;
        var mt = me(29, nt, null, T.mode);
        return mt.lanes = j, mt.return = T, mt;
      } finally {
      }
    };
  }
  var Gl = rd(!0), sd = rd(!1), De = q(null), Ve = null;
  function On(t) {
    var e = t.alternate;
    Z(Vt, Vt.current & 1), Z(De, t), Ve === null && (e === null || Bl.current !== null || e.memoizedState !== null) && (Ve = t);
  }
  function fd(t) {
    if (t.tag === 22) {
      if (Z(Vt, Vt.current), Z(De, t), Ve === null) {
        var e = t.alternate;
        e !== null && e.memoizedState !== null && (Ve = t);
      }
    } else Rn();
  }
  function Rn() {
    Z(Vt, Vt.current), Z(De, De.current);
  }
  function on(t) {
    $(De), Ve === t && (Ve = null), $(Vt);
  }
  var Vt = q(0);
  function ei(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || ur(n)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  function go(t, e, n, l) {
    e = t.memoizedState, n = n(l, e), n = n == null ? e : b({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var yo = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var l = ye(), u = An(l);
      u.payload = e, n != null && (u.callback = n), e = Tn(t, u, l), e !== null && (pe(e, t, l), Ba(e, t, l));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var l = ye(), u = An(l);
      u.tag = 1, u.payload = e, n != null && (u.callback = n), e = Tn(t, u, l), e !== null && (pe(e, t, l), Ba(e, t, l));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = ye(), l = An(n);
      l.tag = 2, e != null && (l.callback = e), e = Tn(t, l, n), e !== null && (pe(e, t, n), Ba(e, t, n));
    }
  };
  function dd(t, e, n, l, u, i, s) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, i, s) : e.prototype && e.prototype.isPureReactComponent ? !Oa(n, l) || !Oa(u, i) : !0;
  }
  function md(t, e, n, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, l), e.state !== t && yo.enqueueReplaceState(e, e.state, null);
  }
  function ol(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var l in e)
        l !== "ref" && (n[l] = e[l]);
    }
    if (t = t.defaultProps) {
      n === e && (n = b({}, n));
      for (var u in t)
        n[u] === void 0 && (n[u] = t[u]);
    }
    return n;
  }
  var ni = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function hd(t) {
    ni(t);
  }
  function vd(t) {
    console.error(t);
  }
  function gd(t) {
    ni(t);
  }
  function li(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function yd(t, e, n) {
    try {
      var l = t.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function po(t, e, n) {
    return n = An(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      li(t, e);
    }, n;
  }
  function pd(t) {
    return t = An(t), t.tag = 3, t;
  }
  function bd(t, e, n, l) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var i = l.value;
      t.payload = function() {
        return u(i);
      }, t.callback = function() {
        yd(e, n, l);
      };
    }
    var s = n.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      yd(e, n, l), typeof u != "function" && (Nn === null ? Nn = /* @__PURE__ */ new Set([this]) : Nn.add(this));
      var m = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function Ay(t, e, n, l, u) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (e = n.alternate, e !== null && Ca(
        e,
        n,
        u,
        !0
      ), n = De.current, n !== null) {
        switch (n.tag) {
          case 13:
            return Ve === null ? Xo() : n.alternate === null && jt === 0 && (jt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, l === kc ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), Qo(t, l, u)), !1;
          case 22:
            return n.flags |= 65536, l === kc ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Qo(t, l, u)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return Qo(t, l, u), Xo(), !1;
    }
    if (At)
      return e = De.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = u, l !== Yc && (t = Error(o(422), { cause: l }), _a(we(t, n)))) : (l !== Yc && (e = Error(o(423), {
        cause: l
      }), _a(
        we(e, n)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, l = we(l, n), u = po(
        t.stateNode,
        l,
        u
      ), Wc(t, u), jt !== 4 && (jt = 2)), !1;
    var i = Error(o(520), { cause: l });
    if (i = we(i, n), Fa === null ? Fa = [i] : Fa.push(i), jt !== 4 && (jt = 2), e === null) return !0;
    l = we(l, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = u & -u, n.lanes |= t, t = po(n.stateNode, l, t), Wc(n, t), !1;
        case 1:
          if (e = n.type, i = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Nn === null || !Nn.has(i))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = pd(u), bd(
              u,
              t,
              n,
              l
            ), Wc(n, u), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Sd = Error(o(461)), kt = !1;
  function Wt(t, e, n, l) {
    e.child = t === null ? sd(e, null, n, l) : Gl(
      e,
      t.child,
      n,
      l
    );
  }
  function xd(t, e, n, l, u) {
    n = n.render;
    var i = e.ref;
    if ("ref" in l) {
      var s = {};
      for (var m in l)
        m !== "ref" && (s[m] = l[m]);
    } else s = l;
    return ul(e), l = to(
      t,
      e,
      n,
      s,
      i,
      u
    ), m = eo(), t !== null && !kt ? (no(t, e, u), rn(t, e, u)) : (At && m && jc(e), e.flags |= 1, Wt(t, e, l, u), e.child);
  }
  function Ed(t, e, n, l, u) {
    if (t === null) {
      var i = n.type;
      return typeof i == "function" && !Uc(i) && i.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = i, Ad(
        t,
        e,
        i,
        l,
        u
      )) : (t = Bu(
        n.type,
        null,
        l,
        e,
        e.mode,
        u
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (i = t.child, !Oo(t, u)) {
      var s = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Oa, n(s, l) && t.ref === e.ref)
        return rn(t, e, u);
    }
    return e.flags |= 1, t = en(i, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Ad(t, e, n, l, u) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (Oa(i, l) && t.ref === e.ref)
        if (kt = !1, e.pendingProps = l = i, Oo(t, u))
          (t.flags & 131072) !== 0 && (kt = !0);
        else
          return e.lanes = t.lanes, rn(t, e, u);
    }
    return bo(
      t,
      e,
      n,
      l,
      u
    );
  }
  function Td(t, e, n) {
    var l = e.pendingProps, u = l.children, i = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (l = i !== null ? i.baseLanes | n : n, t !== null) {
          for (u = e.child = t.child, i = 0; u !== null; )
            i = i | u.lanes | u.childLanes, u = u.sibling;
          e.childLanes = i & ~l;
        } else e.childLanes = 0, e.child = null;
        return wd(
          t,
          e,
          l,
          n
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Gu(
          e,
          i !== null ? i.cachePool : null
        ), i !== null ? Af(e, i) : Fc(), fd(e);
      else
        return e.lanes = e.childLanes = 536870912, wd(
          t,
          e,
          i !== null ? i.baseLanes | n : n,
          n
        );
    } else
      i !== null ? (Gu(e, i.cachePool), Af(e, i), Rn(), e.memoizedState = null) : (t !== null && Gu(e, null), Fc(), Rn());
    return Wt(t, e, u, n), e.child;
  }
  function wd(t, e, n, l) {
    var u = Zc();
    return u = u === null ? null : { parent: Xt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, t !== null && Gu(e, null), Fc(), fd(e), t !== null && Ca(t, e, l, !0), null;
  }
  function ai(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function bo(t, e, n, l, u) {
    return ul(e), n = to(
      t,
      e,
      n,
      l,
      void 0,
      u
    ), l = eo(), t !== null && !kt ? (no(t, e, u), rn(t, e, u)) : (At && l && jc(e), e.flags |= 1, Wt(t, e, n, u), e.child);
  }
  function Od(t, e, n, l, u, i) {
    return ul(e), e.updateQueue = null, n = wf(
      e,
      l,
      n,
      u
    ), Tf(t), l = eo(), t !== null && !kt ? (no(t, e, i), rn(t, e, i)) : (At && l && jc(e), e.flags |= 1, Wt(t, e, n, i), e.child);
  }
  function Rd(t, e, n, l, u) {
    if (ul(e), e.stateNode === null) {
      var i = Cl, s = n.contextType;
      typeof s == "object" && s !== null && (i = te(s)), i = new n(l, i), e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = yo, e.stateNode = i, i._reactInternals = e, i = e.stateNode, i.props = l, i.state = e.memoizedState, i.refs = {}, Kc(e), s = n.contextType, i.context = typeof s == "object" && s !== null ? te(s) : Cl, i.state = e.memoizedState, s = n.getDerivedStateFromProps, typeof s == "function" && (go(
        e,
        n,
        s,
        l
      ), i.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && yo.enqueueReplaceState(i, i.state, null), La(e, l, i, u), ja(), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      i = e.stateNode;
      var m = e.memoizedProps, p = ol(n, m);
      i.props = p;
      var M = i.context, H = n.contextType;
      s = Cl, typeof H == "object" && H !== null && (s = te(H));
      var Y = n.getDerivedStateFromProps;
      H = typeof Y == "function" || typeof i.getSnapshotBeforeUpdate == "function", m = e.pendingProps !== m, H || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (m || M !== s) && md(
        e,
        i,
        l,
        s
      ), En = !1;
      var D = e.memoizedState;
      i.state = D, La(e, l, i, u), ja(), M = e.memoizedState, m || D !== M || En ? (typeof Y == "function" && (go(
        e,
        n,
        Y,
        l
      ), M = e.memoizedState), (p = En || dd(
        e,
        n,
        p,
        l,
        D,
        M,
        s
      )) ? (H || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = M), i.props = l, i.state = M, i.context = s, l = p) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      i = e.stateNode, Jc(t, e), s = e.memoizedProps, H = ol(n, s), i.props = H, Y = e.pendingProps, D = i.context, M = n.contextType, p = Cl, typeof M == "object" && M !== null && (p = te(M)), m = n.getDerivedStateFromProps, (M = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== Y || D !== p) && md(
        e,
        i,
        l,
        p
      ), En = !1, D = e.memoizedState, i.state = D, La(e, l, i, u), ja();
      var C = e.memoizedState;
      s !== Y || D !== C || En || t !== null && t.dependencies !== null && Yu(t.dependencies) ? (typeof m == "function" && (go(
        e,
        n,
        m,
        l
      ), C = e.memoizedState), (H = En || dd(
        e,
        n,
        H,
        l,
        D,
        C,
        p
      ) || t !== null && t.dependencies !== null && Yu(t.dependencies)) ? (M || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(l, C, p), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        l,
        C,
        p
      )), typeof i.componentDidUpdate == "function" && (e.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = C), i.props = l, i.state = C, i.context = p, l = H) : (typeof i.componentDidUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return i = l, ai(t, e), l = (e.flags & 128) !== 0, i || l ? (i = e.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : i.render(), e.flags |= 1, t !== null && l ? (e.child = Gl(
      e,
      t.child,
      null,
      u
    ), e.child = Gl(
      e,
      null,
      n,
      u
    )) : Wt(t, e, n, u), e.memoizedState = i.state, t = e.child) : t = rn(
      t,
      e,
      u
    ), t;
  }
  function Md(t, e, n, l) {
    return Da(), e.flags |= 256, Wt(t, e, n, l), e.child;
  }
  var So = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function xo(t) {
    return { baseLanes: t, cachePool: vf() };
  }
  function Eo(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= _e), t;
  }
  function Dd(t, e, n) {
    var l = e.pendingProps, u = !1, i = (e.flags & 128) !== 0, s;
    if ((s = i) || (s = t !== null && t.memoizedState === null ? !1 : (Vt.current & 2) !== 0), s && (u = !0, e.flags &= -129), s = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (At) {
        if (u ? On(e) : Rn(), At) {
          var m = Bt, p;
          if (p = m) {
            t: {
              for (p = m, m = Xe; p.nodeType !== 8; ) {
                if (!m) {
                  m = null;
                  break t;
                }
                if (p = je(
                  p.nextSibling
                ), p === null) {
                  m = null;
                  break t;
                }
              }
              m = p;
            }
            m !== null ? (e.memoizedState = {
              dehydrated: m,
              treeContext: tl !== null ? { id: nn, overflow: ln } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, p = me(
              18,
              null,
              null,
              0
            ), p.stateNode = m, p.return = e, e.child = p, ne = e, Bt = null, p = !0) : p = !1;
          }
          p || ll(e);
        }
        if (m = e.memoizedState, m !== null && (m = m.dehydrated, m !== null))
          return ur(m) ? e.lanes = 32 : e.lanes = 536870912, null;
        on(e);
      }
      return m = l.children, l = l.fallback, u ? (Rn(), u = e.mode, m = ui(
        { mode: "hidden", children: m },
        u
      ), l = In(
        l,
        u,
        n,
        null
      ), m.return = e, l.return = e, m.sibling = l, e.child = m, u = e.child, u.memoizedState = xo(n), u.childLanes = Eo(
        t,
        s,
        n
      ), e.memoizedState = So, l) : (On(e), Ao(e, m));
    }
    if (p = t.memoizedState, p !== null && (m = p.dehydrated, m !== null)) {
      if (i)
        e.flags & 256 ? (On(e), e.flags &= -257, e = To(
          t,
          e,
          n
        )) : e.memoizedState !== null ? (Rn(), e.child = t.child, e.flags |= 128, e = null) : (Rn(), u = l.fallback, m = e.mode, l = ui(
          { mode: "visible", children: l.children },
          m
        ), u = In(
          u,
          m,
          n,
          null
        ), u.flags |= 2, l.return = e, u.return = e, l.sibling = u, e.child = l, Gl(
          e,
          t.child,
          null,
          n
        ), l = e.child, l.memoizedState = xo(n), l.childLanes = Eo(
          t,
          s,
          n
        ), e.memoizedState = So, e = u);
      else if (On(e), ur(m)) {
        if (s = m.nextSibling && m.nextSibling.dataset, s) var M = s.dgst;
        s = M, l = Error(o(419)), l.stack = "", l.digest = s, _a({ value: l, source: null, stack: null }), e = To(
          t,
          e,
          n
        );
      } else if (kt || Ca(t, e, n, !1), s = (n & t.childLanes) !== 0, kt || s) {
        if (s = Nt, s !== null && (l = n & -n, l = (l & 42) !== 0 ? 1 : uc(l), l = (l & (s.suspendedLanes | n)) !== 0 ? 0 : l, l !== 0 && l !== p.retryLane))
          throw p.retryLane = l, _l(t, l), pe(s, t, l), Sd;
        m.data === "$?" || Xo(), e = To(
          t,
          e,
          n
        );
      } else
        m.data === "$?" ? (e.flags |= 192, e.child = t.child, e = null) : (t = p.treeContext, Bt = je(
          m.nextSibling
        ), ne = e, At = !0, nl = null, Xe = !1, t !== null && (Re[Me++] = nn, Re[Me++] = ln, Re[Me++] = tl, nn = t.id, ln = t.overflow, tl = e), e = Ao(
          e,
          l.children
        ), e.flags |= 4096);
      return e;
    }
    return u ? (Rn(), u = l.fallback, m = e.mode, p = t.child, M = p.sibling, l = en(p, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = p.subtreeFlags & 65011712, M !== null ? u = en(M, u) : (u = In(
      u,
      m,
      n,
      null
    ), u.flags |= 2), u.return = e, l.return = e, l.sibling = u, e.child = l, l = u, u = e.child, m = t.child.memoizedState, m === null ? m = xo(n) : (p = m.cachePool, p !== null ? (M = Xt._currentValue, p = p.parent !== M ? { parent: M, pool: M } : p) : p = vf(), m = {
      baseLanes: m.baseLanes | n,
      cachePool: p
    }), u.memoizedState = m, u.childLanes = Eo(
      t,
      s,
      n
    ), e.memoizedState = So, l) : (On(e), n = t.child, t = n.sibling, n = en(n, {
      mode: "visible",
      children: l.children
    }), n.return = e, n.sibling = null, t !== null && (s = e.deletions, s === null ? (e.deletions = [t], e.flags |= 16) : s.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Ao(t, e) {
    return e = ui(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function ui(t, e) {
    return t = me(22, t, null, e), t.lanes = 0, t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, t;
  }
  function To(t, e, n) {
    return Gl(e, t.child, null, n), t = Ao(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function _d(t, e, n) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), Gc(t.return, e, n);
  }
  function wo(t, e, n, l, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: u
    } : (i.isBackwards = e, i.rendering = null, i.renderingStartTime = 0, i.last = l, i.tail = n, i.tailMode = u);
  }
  function Cd(t, e, n) {
    var l = e.pendingProps, u = l.revealOrder, i = l.tail;
    if (Wt(t, e, l.children, n), l = Vt.current, (l & 2) !== 0)
      l = l & 1 | 2, e.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && _d(t, n, e);
          else if (t.tag === 19)
            _d(t, n, e);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
              break t;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      l &= 1;
    }
    switch (Z(Vt, l), u) {
      case "forwards":
        for (n = e.child, u = null; n !== null; )
          t = n.alternate, t !== null && ei(t) === null && (u = n), n = n.sibling;
        n = u, n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null), wo(
          e,
          !1,
          u,
          n,
          i
        );
        break;
      case "backwards":
        for (n = null, u = e.child, e.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && ei(t) === null) {
            e.child = u;
            break;
          }
          t = u.sibling, u.sibling = n, n = u, u = t;
        }
        wo(
          e,
          !0,
          n,
          null,
          i
        );
        break;
      case "together":
        wo(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function rn(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), zn |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Ca(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, n = en(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = en(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Oo(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Yu(t)));
  }
  function Ty(t, e, n) {
    switch (e.tag) {
      case 3:
        wt(e, e.stateNode.containerInfo), xn(e, Xt, t.memoizedState.cache), Da();
        break;
      case 27:
      case 5:
        ze(e);
        break;
      case 4:
        wt(e, e.stateNode.containerInfo);
        break;
      case 10:
        xn(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (On(e), e.flags |= 128, null) : (n & e.child.childLanes) !== 0 ? Dd(t, e, n) : (On(e), t = rn(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        On(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (l = (n & e.childLanes) !== 0, l || (Ca(
          t,
          e,
          n,
          !1
        ), l = (n & e.childLanes) !== 0), u) {
          if (l)
            return Cd(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (u = e.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Z(Vt, Vt.current), l) break;
        return null;
      case 22:
      case 23:
        return e.lanes = 0, Td(t, e, n);
      case 24:
        xn(e, Xt, t.memoizedState.cache);
    }
    return rn(t, e, n);
  }
  function zd(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        kt = !0;
      else {
        if (!Oo(t, n) && (e.flags & 128) === 0)
          return kt = !1, Ty(
            t,
            e,
            n
          );
        kt = (t.flags & 131072) !== 0;
      }
    else
      kt = !1, At && (e.flags & 1048576) !== 0 && of(e, Lu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          t = e.pendingProps;
          var l = e.elementType, u = l._init;
          if (l = u(l._payload), e.type = l, typeof l == "function")
            Uc(l) ? (t = ol(l, t), e.tag = 1, e = Rd(
              null,
              e,
              l,
              t,
              n
            )) : (e.tag = 0, e = bo(
              null,
              e,
              l,
              t,
              n
            ));
          else {
            if (l != null) {
              if (u = l.$$typeof, u === J) {
                e.tag = 11, e = xd(
                  null,
                  e,
                  l,
                  t,
                  n
                );
                break t;
              } else if (u === W) {
                e.tag = 14, e = Ed(
                  null,
                  e,
                  l,
                  t,
                  n
                );
                break t;
              }
            }
            throw e = St(l) || l, Error(o(306, e, ""));
          }
        }
        return e;
      case 0:
        return bo(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return l = e.type, u = ol(
          l,
          e.pendingProps
        ), Rd(
          t,
          e,
          l,
          u,
          n
        );
      case 3:
        t: {
          if (wt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          l = e.pendingProps;
          var i = e.memoizedState;
          u = i.element, Jc(t, e), La(e, l, null, n);
          var s = e.memoizedState;
          if (l = s.cache, xn(e, Xt, l), l !== i.cache && Xc(
            e,
            [Xt],
            n,
            !0
          ), ja(), l = s.element, i.isDehydrated)
            if (i = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
            }, e.updateQueue.baseState = i, e.memoizedState = i, e.flags & 256) {
              e = Md(
                t,
                e,
                l,
                n
              );
              break t;
            } else if (l !== u) {
              u = we(
                Error(o(424)),
                e
              ), _a(u), e = Md(
                t,
                e,
                l,
                n
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Bt = je(t.firstChild), ne = e, At = !0, nl = null, Xe = !0, n = sd(
                e,
                null,
                l,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (Da(), l === u) {
              e = rn(
                t,
                e,
                n
              );
              break t;
            }
            Wt(
              t,
              e,
              l,
              n
            );
          }
          e = e.child;
        }
        return e;
      case 26:
        return ai(t, e), t === null ? (n = Bm(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : At || (n = e.type, t = e.pendingProps, l = bi(
          ut.current
        ).createElement(n), l[It] = e, l[le] = t, Ft(l, n, t), Zt(l), e.stateNode = l) : e.memoizedState = Bm(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ze(e), t === null && At && (l = e.stateNode = Nm(
          e.type,
          e.pendingProps,
          ut.current
        ), ne = e, Xe = !0, u = Bt, Bn(e.type) ? (ir = u, Bt = je(
          l.firstChild
        )) : Bt = u), Wt(
          t,
          e,
          e.pendingProps.children,
          n
        ), ai(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && At && ((u = l = Bt) && (l = Py(
          l,
          e.type,
          e.pendingProps,
          Xe
        ), l !== null ? (e.stateNode = l, ne = e, Bt = je(
          l.firstChild
        ), Xe = !1, u = !0) : u = !1), u || ll(e)), ze(e), u = e.type, i = e.pendingProps, s = t !== null ? t.memoizedProps : null, l = i.children, nr(u, i) ? l = null : s !== null && nr(u, s) && (e.flags |= 32), e.memoizedState !== null && (u = to(
          t,
          e,
          gy,
          null,
          null,
          n
        ), iu._currentValue = u), ai(t, e), Wt(t, e, l, n), e.child;
      case 6:
        return t === null && At && ((t = n = Bt) && (n = Iy(
          n,
          e.pendingProps,
          Xe
        ), n !== null ? (e.stateNode = n, ne = e, Bt = null, t = !0) : t = !1), t || ll(e)), null;
      case 13:
        return Dd(t, e, n);
      case 4:
        return wt(
          e,
          e.stateNode.containerInfo
        ), l = e.pendingProps, t === null ? e.child = Gl(
          e,
          null,
          l,
          n
        ) : Wt(
          t,
          e,
          l,
          n
        ), e.child;
      case 11:
        return xd(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return Wt(
          t,
          e,
          e.pendingProps,
          n
        ), e.child;
      case 8:
        return Wt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return Wt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return l = e.pendingProps, xn(e, e.type, l.value), Wt(
          t,
          e,
          l.children,
          n
        ), e.child;
      case 9:
        return u = e.type._context, l = e.pendingProps.children, ul(e), u = te(u), l = l(u), e.flags |= 1, Wt(t, e, l, n), e.child;
      case 14:
        return Ed(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return Ad(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Cd(t, e, n);
      case 31:
        return l = e.pendingProps, n = e.mode, l = {
          mode: l.mode,
          children: l.children
        }, t === null ? (n = ui(
          l,
          n
        ), n.ref = e.ref, e.child = n, n.return = e, e = n) : (n = en(t.child, l), n.ref = e.ref, e.child = n, n.return = e, e = n), e;
      case 22:
        return Td(t, e, n);
      case 24:
        return ul(e), l = te(Xt), t === null ? (u = Zc(), u === null && (u = Nt, i = Vc(), u.pooledCache = i, i.refCount++, i !== null && (u.pooledCacheLanes |= n), u = i), e.memoizedState = {
          parent: l,
          cache: u
        }, Kc(e), xn(e, Xt, u)) : ((t.lanes & n) !== 0 && (Jc(t, e), La(e, null, null, n), ja()), u = t.memoizedState, i = e.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, e.memoizedState = u, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u), xn(e, Xt, l)) : (l = i.cache, xn(e, Xt, l), l !== u.cache && Xc(
          e,
          [Xt],
          n,
          !0
        ))), Wt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function sn(t) {
    t.flags |= 4;
  }
  function Nd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Gm(e)) {
      if (e = De.current, e !== null && ((bt & 4194048) === bt ? Ve !== null : (bt & 62914560) !== bt && (bt & 536870912) === 0 || e !== Ve))
        throw Ha = kc, gf;
      t.flags |= 8192;
    }
  }
  function ii(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? ss() : 536870912, t.lanes |= e, Zl |= e);
  }
  function Za(t, e) {
    if (!At)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = t.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
      }
  }
  function Ht(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, l = 0;
    if (e)
      for (var u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= l, t.childLanes = n, e;
  }
  function wy(t, e, n) {
    var l = e.pendingProps;
    switch (Lc(e), e.tag) {
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
        return Ht(e), null;
      case 1:
        return Ht(e), null;
      case 3:
        return n = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), un(Xt), Pt(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Ma(e) ? sn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ff())), Ht(e), null;
      case 26:
        return n = e.memoizedState, t === null ? (sn(e), n !== null ? (Ht(e), Nd(e, n)) : (Ht(e), e.flags &= -16777217)) : n ? n !== t.memoizedState ? (sn(e), Ht(e), Nd(e, n)) : (Ht(e), e.flags &= -16777217) : (t.memoizedProps !== l && sn(e), Ht(e), e.flags &= -16777217), null;
      case 27:
        Ne(e), n = ut.current;
        var u = e.type;
        if (t !== null && e.stateNode != null)
          t.memoizedProps !== l && sn(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Ht(e), null;
          }
          t = F.current, Ma(e) ? rf(e) : (t = Nm(u, l, n), e.stateNode = t, sn(e));
        }
        return Ht(e), null;
      case 5:
        if (Ne(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && sn(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Ht(e), null;
          }
          if (t = F.current, Ma(e))
            rf(e);
          else {
            switch (u = bi(
              ut.current
            ), t) {
              case 1:
                t = u.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                t = u.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    t = u.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    t = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    t = u.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
                    break;
                  case "select":
                    t = typeof l.is == "string" ? u.createElement("select", { is: l.is }) : u.createElement("select"), l.multiple ? t.multiple = !0 : l.size && (t.size = l.size);
                    break;
                  default:
                    t = typeof l.is == "string" ? u.createElement(n, { is: l.is }) : u.createElement(n);
                }
            }
            t[It] = e, t[le] = l;
            t: for (u = e.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6)
                t.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                u.child.return = u, u = u.child;
                continue;
              }
              if (u === e) break t;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === e)
                  break t;
                u = u.return;
              }
              u.sibling.return = u.return, u = u.sibling;
            }
            e.stateNode = t;
            t: switch (Ft(t, n, l), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!l.autoFocus;
                break t;
              case "img":
                t = !0;
                break t;
              default:
                t = !1;
            }
            t && sn(e);
          }
        }
        return Ht(e), e.flags &= -16777217, null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== l && sn(e);
        else {
          if (typeof l != "string" && e.stateNode === null)
            throw Error(o(166));
          if (t = ut.current, Ma(e)) {
            if (t = e.stateNode, n = e.memoizedProps, l = null, u = ne, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            t[It] = e, t = !!(t.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Om(t.nodeValue, n)), t || ll(e);
          } else
            t = bi(t).createTextNode(
              l
            ), t[It] = e, e.stateNode = t;
        }
        return Ht(e), null;
      case 13:
        if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Ma(e), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(o(318));
              if (u = e.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[It] = e;
            } else
              Da(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ht(e), u = !1;
          } else
            u = ff(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return e.flags & 256 ? (on(e), e) : (on(e), null);
        }
        if (on(e), (e.flags & 128) !== 0)
          return e.lanes = n, e;
        if (n = l !== null, t = t !== null && t.memoizedState !== null, n) {
          l = e.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool);
          var i = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (i = l.memoizedState.cachePool.pool), i !== u && (l.flags |= 2048);
        }
        return n !== t && n && (e.child.flags |= 8192), ii(e, e.updateQueue), Ht(e), null;
      case 4:
        return Pt(), t === null && Fo(e.stateNode.containerInfo), Ht(e), null;
      case 10:
        return un(e.type), Ht(e), null;
      case 19:
        if ($(Vt), u = e.memoizedState, u === null) return Ht(e), null;
        if (l = (e.flags & 128) !== 0, i = u.rendering, i === null)
          if (l) Za(u, !1);
          else {
            if (jt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (i = ei(t), i !== null) {
                  for (e.flags |= 128, Za(u, !1), t = i.updateQueue, e.updateQueue = t, ii(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    cf(n, t), n = n.sibling;
                  return Z(
                    Vt,
                    Vt.current & 1 | 2
                  ), e.child;
                }
                t = t.sibling;
              }
            u.tail !== null && Ee() > ri && (e.flags |= 128, l = !0, Za(u, !1), e.lanes = 4194304);
          }
        else {
          if (!l)
            if (t = ei(i), t !== null) {
              if (e.flags |= 128, l = !0, t = t.updateQueue, e.updateQueue = t, ii(e, t), Za(u, !0), u.tail === null && u.tailMode === "hidden" && !i.alternate && !At)
                return Ht(e), null;
            } else
              2 * Ee() - u.renderingStartTime > ri && n !== 536870912 && (e.flags |= 128, l = !0, Za(u, !1), e.lanes = 4194304);
          u.isBackwards ? (i.sibling = e.child, e.child = i) : (t = u.last, t !== null ? t.sibling = i : e.child = i, u.last = i);
        }
        return u.tail !== null ? (e = u.tail, u.rendering = e, u.tail = e.sibling, u.renderingStartTime = Ee(), e.sibling = null, t = Vt.current, Z(Vt, l ? t & 1 | 2 : t & 1), e) : (Ht(e), null);
      case 22:
      case 23:
        return on(e), Pc(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Ht(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ht(e), n = e.updateQueue, n !== null && ii(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== n && (e.flags |= 2048), t !== null && $(il), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), un(Xt), Ht(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function Oy(t, e) {
    switch (Lc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return un(Xt), Pt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Ne(e), null;
      case 13:
        if (on(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(o(340));
          Da();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return $(Vt), null;
      case 4:
        return Pt(), null;
      case 10:
        return un(e.type), null;
      case 22:
      case 23:
        return on(e), Pc(), t !== null && $(il), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return un(Xt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ud(t, e) {
    switch (Lc(e), e.tag) {
      case 3:
        un(Xt), Pt();
        break;
      case 26:
      case 27:
      case 5:
        Ne(e);
        break;
      case 4:
        Pt();
        break;
      case 13:
        on(e);
        break;
      case 19:
        $(Vt);
        break;
      case 10:
        un(e.type);
        break;
      case 22:
      case 23:
        on(e), Pc(), t !== null && $(il);
        break;
      case 24:
        un(Xt);
    }
  }
  function ka(t, e) {
    try {
      var n = e.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            l = void 0;
            var i = n.create, s = n.inst;
            l = i(), s.destroy = l;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (m) {
      zt(e, e.return, m);
    }
  }
  function Mn(t, e, n) {
    try {
      var l = e.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var i = u.next;
        l = i;
        do {
          if ((l.tag & t) === t) {
            var s = l.inst, m = s.destroy;
            if (m !== void 0) {
              s.destroy = void 0, u = e;
              var p = n, M = m;
              try {
                M();
              } catch (H) {
                zt(
                  u,
                  p,
                  H
                );
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (H) {
      zt(e, e.return, H);
    }
  }
  function Hd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        Ef(e, n);
      } catch (l) {
        zt(t, t.return, l);
      }
    }
  }
  function Bd(t, e, n) {
    n.props = ol(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      zt(t, e, l);
    }
  }
  function Ka(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(l) : n.current = l;
      }
    } catch (u) {
      zt(t, e, u);
    }
  }
  function Qe(t, e) {
    var n = t.ref, l = t.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          zt(t, e, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          zt(t, e, u);
        }
      else n.current = null;
  }
  function jd(t) {
    var e = t.type, n = t.memoizedProps, l = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break t;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (u) {
      zt(t, t.return, u);
    }
  }
  function Ro(t, e, n) {
    try {
      var l = t.stateNode;
      Ky(l, t.type, n, e), l[le] = e;
    } catch (u) {
      zt(t, t.return, u);
    }
  }
  function Ld(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Bn(t.type) || t.tag === 4;
  }
  function Mo(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ld(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Bn(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Do(t, e, n) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(t, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(t), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = pi));
    else if (l !== 4 && (l === 27 && Bn(t.type) && (n = t.stateNode, e = null), t = t.child, t !== null))
      for (Do(t, e, n), t = t.sibling; t !== null; )
        Do(t, e, n), t = t.sibling;
  }
  function ci(t, e, n) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
    else if (l !== 4 && (l === 27 && Bn(t.type) && (n = t.stateNode), t = t.child, t !== null))
      for (ci(t, e, n), t = t.sibling; t !== null; )
        ci(t, e, n), t = t.sibling;
  }
  function Yd(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var l = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      Ft(e, l, n), e[It] = t, e[le] = n;
    } catch (i) {
      zt(t, t.return, i);
    }
  }
  var fn = !1, Yt = !1, _o = !1, qd = typeof WeakSet == "function" ? WeakSet : Set, Kt = null;
  function Ry(t, e) {
    if (t = t.containerInfo, tr = wi, t = $s(t), Rc(t)) {
      if ("selectionStart" in t)
        var n = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          n = (n = t.ownerDocument) && n.defaultView || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var u = l.anchorOffset, i = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, i.nodeType;
            } catch {
              n = null;
              break t;
            }
            var s = 0, m = -1, p = -1, M = 0, H = 0, Y = t, D = null;
            e: for (; ; ) {
              for (var C; Y !== n || u !== 0 && Y.nodeType !== 3 || (m = s + u), Y !== i || l !== 0 && Y.nodeType !== 3 || (p = s + l), Y.nodeType === 3 && (s += Y.nodeValue.length), (C = Y.firstChild) !== null; )
                D = Y, Y = C;
              for (; ; ) {
                if (Y === t) break e;
                if (D === n && ++M === u && (m = s), D === i && ++H === l && (p = s), (C = Y.nextSibling) !== null) break;
                Y = D, D = Y.parentNode;
              }
              Y = C;
            }
            n = m === -1 || p === -1 ? null : { start: m, end: p };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (er = { focusedElem: t, selectionRange: n }, wi = !1, Kt = e; Kt !== null; )
      if (e = Kt, t = e.child, (e.subtreeFlags & 1024) !== 0 && t !== null)
        t.return = e, Kt = t;
      else
        for (; Kt !== null; ) {
          switch (e = Kt, i = e.alternate, t = e.flags, e.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                t = void 0, n = e, u = i.memoizedProps, i = i.memoizedState, l = n.stateNode;
                try {
                  var it = ol(
                    n.type,
                    u,
                    n.elementType === n.type
                  );
                  t = l.getSnapshotBeforeUpdate(
                    it,
                    i
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (lt) {
                  zt(
                    n,
                    n.return,
                    lt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, n = t.nodeType, n === 9)
                  ar(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ar(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Kt = t;
            break;
          }
          Kt = e.return;
        }
  }
  function Gd(t, e, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Dn(t, n), l & 4 && ka(5, n);
        break;
      case 1:
        if (Dn(t, n), l & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (s) {
              zt(n, n.return, s);
            }
          else {
            var u = ol(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (s) {
              zt(
                n,
                n.return,
                s
              );
            }
          }
        l & 64 && Hd(n), l & 512 && Ka(n, n.return);
        break;
      case 3:
        if (Dn(t, n), l & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            Ef(t, e);
          } catch (s) {
            zt(n, n.return, s);
          }
        }
        break;
      case 27:
        e === null && l & 4 && Yd(n);
      case 26:
      case 5:
        Dn(t, n), e === null && l & 4 && jd(n), l & 512 && Ka(n, n.return);
        break;
      case 12:
        Dn(t, n);
        break;
      case 13:
        Dn(t, n), l & 4 && Qd(t, n), l & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = By.bind(
          null,
          n
        ), tp(t, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || fn, !l) {
          e = e !== null && e.memoizedState !== null || Yt, u = fn;
          var i = Yt;
          fn = l, (Yt = e) && !i ? _n(
            t,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : Dn(t, n), fn = u, Yt = i;
        }
        break;
      case 30:
        break;
      default:
        Dn(t, n);
    }
  }
  function Xd(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Xd(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && oc(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ut = null, ie = !1;
  function dn(t, e, n) {
    for (n = n.child; n !== null; )
      Vd(t, e, n), n = n.sibling;
  }
  function Vd(t, e, n) {
    if (se && typeof se.onCommitFiberUnmount == "function")
      try {
        se.onCommitFiberUnmount(ha, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Yt || Qe(n, e), dn(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Yt || Qe(n, e);
        var l = Ut, u = ie;
        Bn(n.type) && (Ut = n.stateNode, ie = !1), dn(
          t,
          e,
          n
        ), nu(n.stateNode), Ut = l, ie = u;
        break;
      case 5:
        Yt || Qe(n, e);
      case 6:
        if (l = Ut, u = ie, Ut = null, dn(
          t,
          e,
          n
        ), Ut = l, ie = u, Ut !== null)
          if (ie)
            try {
              (Ut.nodeType === 9 ? Ut.body : Ut.nodeName === "HTML" ? Ut.ownerDocument.body : Ut).removeChild(n.stateNode);
            } catch (i) {
              zt(
                n,
                e,
                i
              );
            }
          else
            try {
              Ut.removeChild(n.stateNode);
            } catch (i) {
              zt(
                n,
                e,
                i
              );
            }
        break;
      case 18:
        Ut !== null && (ie ? (t = Ut, Cm(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), su(t)) : Cm(Ut, n.stateNode));
        break;
      case 4:
        l = Ut, u = ie, Ut = n.stateNode.containerInfo, ie = !0, dn(
          t,
          e,
          n
        ), Ut = l, ie = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Yt || Mn(2, n, e), Yt || Mn(4, n, e), dn(
          t,
          e,
          n
        );
        break;
      case 1:
        Yt || (Qe(n, e), l = n.stateNode, typeof l.componentWillUnmount == "function" && Bd(
          n,
          e,
          l
        )), dn(
          t,
          e,
          n
        );
        break;
      case 21:
        dn(
          t,
          e,
          n
        );
        break;
      case 22:
        Yt = (l = Yt) || n.memoizedState !== null, dn(
          t,
          e,
          n
        ), Yt = l;
        break;
      default:
        dn(
          t,
          e,
          n
        );
    }
  }
  function Qd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        su(t);
      } catch (n) {
        zt(e, e.return, n);
      }
  }
  function My(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new qd()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new qd()), e;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function Co(t, e) {
    var n = My(t);
    e.forEach(function(l) {
      var u = jy.bind(null, t, l);
      n.has(l) || (n.add(l), l.then(u, u));
    });
  }
  function he(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var u = n[l], i = t, s = e, m = s;
        t: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Bn(m.type)) {
                Ut = m.stateNode, ie = !1;
                break t;
              }
              break;
            case 5:
              Ut = m.stateNode, ie = !1;
              break t;
            case 3:
            case 4:
              Ut = m.stateNode.containerInfo, ie = !0;
              break t;
          }
          m = m.return;
        }
        if (Ut === null) throw Error(o(160));
        Vd(i, s, u), Ut = null, ie = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13878)
      for (e = e.child; e !== null; )
        Zd(e, t), e = e.sibling;
  }
  var Be = null;
  function Zd(t, e) {
    var n = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        he(e, t), ve(t), l & 4 && (Mn(3, t, t.return), ka(3, t), Mn(5, t, t.return));
        break;
      case 1:
        he(e, t), ve(t), l & 512 && (Yt || n === null || Qe(n, n.return)), l & 64 && fn && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var u = Be;
        if (he(e, t), ve(t), l & 512 && (Yt || n === null || Qe(n, n.return)), l & 4) {
          var i = n !== null ? n.memoizedState : null;
          if (l = t.memoizedState, n === null)
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  l = t.type, n = t.memoizedProps, u = u.ownerDocument || u;
                  e: switch (l) {
                    case "title":
                      i = u.getElementsByTagName("title")[0], (!i || i[ya] || i[It] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = u.createElement(l), u.head.insertBefore(
                        i,
                        u.querySelector("head > title")
                      )), Ft(i, l, n), i[It] = t, Zt(i), l = i;
                      break t;
                    case "link":
                      var s = Ym(
                        "link",
                        "href",
                        u
                      ).get(l + (n.href || ""));
                      if (s) {
                        for (var m = 0; m < s.length; m++)
                          if (i = s[m], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            s.splice(m, 1);
                            break e;
                          }
                      }
                      i = u.createElement(l), Ft(i, l, n), u.head.appendChild(i);
                      break;
                    case "meta":
                      if (s = Ym(
                        "meta",
                        "content",
                        u
                      ).get(l + (n.content || ""))) {
                        for (m = 0; m < s.length; m++)
                          if (i = s[m], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            s.splice(m, 1);
                            break e;
                          }
                      }
                      i = u.createElement(l), Ft(i, l, n), u.head.appendChild(i);
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  i[It] = t, Zt(i), l = i;
                }
                t.stateNode = l;
              } else
                qm(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Lm(
                u,
                l,
                t.memoizedProps
              );
          else
            i !== l ? (i === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : i.count--, l === null ? qm(
              u,
              t.type,
              t.stateNode
            ) : Lm(
              u,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && Ro(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        he(e, t), ve(t), l & 512 && (Yt || n === null || Qe(n, n.return)), n !== null && l & 4 && Ro(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (he(e, t), ve(t), l & 512 && (Yt || n === null || Qe(n, n.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            Al(u, "");
          } catch (C) {
            zt(t, t.return, C);
          }
        }
        l & 4 && t.stateNode != null && (u = t.memoizedProps, Ro(
          t,
          u,
          n !== null ? n.memoizedProps : u
        )), l & 1024 && (_o = !0);
        break;
      case 6:
        if (he(e, t), ve(t), l & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          l = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = l;
          } catch (C) {
            zt(t, t.return, C);
          }
        }
        break;
      case 3:
        if (Ei = null, u = Be, Be = Si(e.containerInfo), he(e, t), Be = u, ve(t), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            su(e.containerInfo);
          } catch (C) {
            zt(t, t.return, C);
          }
        _o && (_o = !1, kd(t));
        break;
      case 4:
        l = Be, Be = Si(
          t.stateNode.containerInfo
        ), he(e, t), ve(t), Be = l;
        break;
      case 12:
        he(e, t), ve(t);
        break;
      case 13:
        he(e, t), ve(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (jo = Ee()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Co(t, l)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var p = n !== null && n.memoizedState !== null, M = fn, H = Yt;
        if (fn = M || u, Yt = H || p, he(e, t), Yt = H, fn = M, ve(t), l & 8192)
          t: for (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, u && (n === null || p || fn || Yt || rl(t)), n = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                p = n = e;
                try {
                  if (i = p.stateNode, u)
                    s = i.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                  else {
                    m = p.stateNode;
                    var Y = p.memoizedProps.style, D = Y != null && Y.hasOwnProperty("display") ? Y.display : null;
                    m.style.display = D == null || typeof D == "boolean" ? "" : ("" + D).trim();
                  }
                } catch (C) {
                  zt(p, p.return, C);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                p = e;
                try {
                  p.stateNode.nodeValue = u ? "" : p.memoizedProps;
                } catch (C) {
                  zt(p, p.return, C);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              n === e && (n = null), e = e.return;
            }
            n === e && (n = null), e.sibling.return = e.return, e = e.sibling;
          }
        l & 4 && (l = t.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, Co(t, n))));
        break;
      case 19:
        he(e, t), ve(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Co(t, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        he(e, t), ve(t);
    }
  }
  function ve(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, l = t.return; l !== null; ) {
          if (Ld(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var u = n.stateNode, i = Mo(t);
            ci(t, i, u);
            break;
          case 5:
            var s = n.stateNode;
            n.flags & 32 && (Al(s, ""), n.flags &= -33);
            var m = Mo(t);
            ci(t, m, s);
            break;
          case 3:
          case 4:
            var p = n.stateNode.containerInfo, M = Mo(t);
            Do(
              t,
              M,
              p
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (H) {
        zt(t, t.return, H);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function kd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        kd(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function Dn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Gd(t, e.alternate, e), e = e.sibling;
  }
  function rl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Mn(4, e, e.return), rl(e);
          break;
        case 1:
          Qe(e, e.return);
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && Bd(
            e,
            e.return,
            n
          ), rl(e);
          break;
        case 27:
          nu(e.stateNode);
        case 26:
        case 5:
          Qe(e, e.return), rl(e);
          break;
        case 22:
          e.memoizedState === null && rl(e);
          break;
        case 30:
          rl(e);
          break;
        default:
          rl(e);
      }
      t = t.sibling;
    }
  }
  function _n(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var l = e.alternate, u = t, i = e, s = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          _n(
            u,
            i,
            n
          ), ka(4, i);
          break;
        case 1:
          if (_n(
            u,
            i,
            n
          ), l = i, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (M) {
              zt(l, l.return, M);
            }
          if (l = i, u = l.updateQueue, u !== null) {
            var m = l.stateNode;
            try {
              var p = u.shared.hiddenCallbacks;
              if (p !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < p.length; u++)
                  xf(p[u], m);
            } catch (M) {
              zt(l, l.return, M);
            }
          }
          n && s & 64 && Hd(i), Ka(i, i.return);
          break;
        case 27:
          Yd(i);
        case 26:
        case 5:
          _n(
            u,
            i,
            n
          ), n && l === null && s & 4 && jd(i), Ka(i, i.return);
          break;
        case 12:
          _n(
            u,
            i,
            n
          );
          break;
        case 13:
          _n(
            u,
            i,
            n
          ), n && s & 4 && Qd(u, i);
          break;
        case 22:
          i.memoizedState === null && _n(
            u,
            i,
            n
          ), Ka(i, i.return);
          break;
        case 30:
          break;
        default:
          _n(
            u,
            i,
            n
          );
      }
      e = e.sibling;
    }
  }
  function zo(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && za(n));
  }
  function No(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && za(t));
  }
  function Ze(t, e, n, l) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Kd(
          t,
          e,
          n,
          l
        ), e = e.sibling;
  }
  function Kd(t, e, n, l) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ze(
          t,
          e,
          n,
          l
        ), u & 2048 && ka(9, e);
        break;
      case 1:
        Ze(
          t,
          e,
          n,
          l
        );
        break;
      case 3:
        Ze(
          t,
          e,
          n,
          l
        ), u & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && za(t)));
        break;
      case 12:
        if (u & 2048) {
          Ze(
            t,
            e,
            n,
            l
          ), t = e.stateNode;
          try {
            var i = e.memoizedProps, s = i.id, m = i.onPostCommit;
            typeof m == "function" && m(
              s,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (p) {
            zt(e, e.return, p);
          }
        } else
          Ze(
            t,
            e,
            n,
            l
          );
        break;
      case 13:
        Ze(
          t,
          e,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, s = e.alternate, e.memoizedState !== null ? i._visibility & 2 ? Ze(
          t,
          e,
          n,
          l
        ) : Ja(t, e) : i._visibility & 2 ? Ze(
          t,
          e,
          n,
          l
        ) : (i._visibility |= 2, Xl(
          t,
          e,
          n,
          l,
          (e.subtreeFlags & 10256) !== 0
        )), u & 2048 && zo(s, e);
        break;
      case 24:
        Ze(
          t,
          e,
          n,
          l
        ), u & 2048 && No(e.alternate, e);
        break;
      default:
        Ze(
          t,
          e,
          n,
          l
        );
    }
  }
  function Xl(t, e, n, l, u) {
    for (u = u && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
      var i = t, s = e, m = n, p = l, M = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Xl(
            i,
            s,
            m,
            p,
            u
          ), ka(8, s);
          break;
        case 23:
          break;
        case 22:
          var H = s.stateNode;
          s.memoizedState !== null ? H._visibility & 2 ? Xl(
            i,
            s,
            m,
            p,
            u
          ) : Ja(
            i,
            s
          ) : (H._visibility |= 2, Xl(
            i,
            s,
            m,
            p,
            u
          )), u && M & 2048 && zo(
            s.alternate,
            s
          );
          break;
        case 24:
          Xl(
            i,
            s,
            m,
            p,
            u
          ), u && M & 2048 && No(s.alternate, s);
          break;
        default:
          Xl(
            i,
            s,
            m,
            p,
            u
          );
      }
      e = e.sibling;
    }
  }
  function Ja(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, l = e, u = l.flags;
        switch (l.tag) {
          case 22:
            Ja(n, l), u & 2048 && zo(
              l.alternate,
              l
            );
            break;
          case 24:
            Ja(n, l), u & 2048 && No(l.alternate, l);
            break;
          default:
            Ja(n, l);
        }
        e = e.sibling;
      }
  }
  var Wa = 8192;
  function Vl(t) {
    if (t.subtreeFlags & Wa)
      for (t = t.child; t !== null; )
        Jd(t), t = t.sibling;
  }
  function Jd(t) {
    switch (t.tag) {
      case 26:
        Vl(t), t.flags & Wa && t.memoizedState !== null && mp(
          Be,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Vl(t);
        break;
      case 3:
      case 4:
        var e = Be;
        Be = Si(t.stateNode.containerInfo), Vl(t), Be = e;
        break;
      case 22:
        t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = Wa, Wa = 16777216, Vl(t), Wa = e) : Vl(t));
        break;
      default:
        Vl(t);
    }
  }
  function Wd(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function $a(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          Kt = l, Fd(
            l,
            t
          );
        }
      Wd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        $d(t), t = t.sibling;
  }
  function $d(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        $a(t), t.flags & 2048 && Mn(9, t, t.return);
        break;
      case 3:
        $a(t);
        break;
      case 12:
        $a(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, oi(t)) : $a(t);
        break;
      default:
        $a(t);
    }
  }
  function oi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          Kt = l, Fd(
            l,
            t
          );
        }
      Wd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Mn(8, e, e.return), oi(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, oi(e));
          break;
        default:
          oi(e);
      }
      t = t.sibling;
    }
  }
  function Fd(t, e) {
    for (; Kt !== null; ) {
      var n = Kt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Mn(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          za(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Kt = l;
      else
        t: for (n = t; Kt !== null; ) {
          l = Kt;
          var u = l.sibling, i = l.return;
          if (Xd(l), l === n) {
            Kt = null;
            break t;
          }
          if (u !== null) {
            u.return = i, Kt = u;
            break t;
          }
          Kt = i;
        }
    }
  }
  var Dy = {
    getCacheForType: function(t) {
      var e = te(Xt), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    }
  }, _y = typeof WeakMap == "function" ? WeakMap : Map, Ot = 0, Nt = null, gt = null, bt = 0, Rt = 0, ge = null, Cn = !1, Ql = !1, Uo = !1, mn = 0, jt = 0, zn = 0, sl = 0, Ho = 0, _e = 0, Zl = 0, Fa = null, ce = null, Bo = !1, jo = 0, ri = 1 / 0, si = null, Nn = null, $t = 0, Un = null, kl = null, Kl = 0, Lo = 0, Yo = null, Pd = null, Pa = 0, qo = null;
  function ye() {
    if ((Ot & 2) !== 0 && bt !== 0)
      return bt & -bt;
    if (_.T !== null) {
      var t = Ul;
      return t !== 0 ? t : Ko();
    }
    return ms();
  }
  function Id() {
    _e === 0 && (_e = (bt & 536870912) === 0 || At ? rs() : 536870912);
    var t = De.current;
    return t !== null && (t.flags |= 32), _e;
  }
  function pe(t, e, n) {
    (t === Nt && (Rt === 2 || Rt === 9) || t.cancelPendingCommit !== null) && (Jl(t, 0), Hn(
      t,
      bt,
      _e,
      !1
    )), ga(t, n), ((Ot & 2) === 0 || t !== Nt) && (t === Nt && ((Ot & 2) === 0 && (sl |= n), jt === 4 && Hn(
      t,
      bt,
      _e,
      !1
    )), ke(t));
  }
  function tm(t, e, n) {
    if ((Ot & 6) !== 0) throw Error(o(327));
    var l = !n && (e & 124) === 0 && (e & t.expiredLanes) === 0 || va(t, e), u = l ? Ny(t, e) : Vo(t, e, !0), i = l;
    do {
      if (u === 0) {
        Ql && !l && Hn(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, i && !Cy(n)) {
          u = Vo(t, e, !1), i = !1;
          continue;
        }
        if (u === 2) {
          if (i = e, t.errorRecoveryDisabledLanes & i)
            var s = 0;
          else
            s = t.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            e = s;
            t: {
              var m = t;
              u = Fa;
              var p = m.current.memoizedState.isDehydrated;
              if (p && (Jl(m, s).flags |= 256), s = Vo(
                m,
                s,
                !1
              ), s !== 2) {
                if (Uo && !p) {
                  m.errorRecoveryDisabledLanes |= i, sl |= i, u = 4;
                  break t;
                }
                i = ce, ce = u, i !== null && (ce === null ? ce = i : ce.push.apply(
                  ce,
                  i
                ));
              }
              u = s;
            }
            if (i = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Jl(t, 0), Hn(t, e, 0, !0);
          break;
        }
        t: {
          switch (l = t, i = u, i) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Hn(
                l,
                e,
                _e,
                !Cn
              );
              break t;
            case 2:
              ce = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && (u = jo + 300 - Ee(), 10 < u)) {
            if (Hn(
              l,
              e,
              _e,
              !Cn
            ), xu(l, 0, !0) !== 0) break t;
            l.timeoutHandle = Dm(
              em.bind(
                null,
                l,
                n,
                ce,
                si,
                Bo,
                e,
                _e,
                sl,
                Zl,
                Cn,
                i,
                2,
                -0,
                0
              ),
              u
            );
            break t;
          }
          em(
            l,
            n,
            ce,
            si,
            Bo,
            e,
            _e,
            sl,
            Zl,
            Cn,
            i,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ke(t);
  }
  function em(t, e, n, l, u, i, s, m, p, M, H, Y, D, C) {
    if (t.timeoutHandle = -1, Y = e.subtreeFlags, (Y & 8192 || (Y & 16785408) === 16785408) && (uu = { stylesheets: null, count: 0, unsuspend: dp }, Jd(e), Y = hp(), Y !== null)) {
      t.cancelPendingCommit = Y(
        om.bind(
          null,
          t,
          e,
          i,
          n,
          l,
          u,
          s,
          m,
          p,
          H,
          1,
          D,
          C
        )
      ), Hn(t, i, s, !M);
      return;
    }
    om(
      t,
      e,
      i,
      n,
      l,
      u,
      s,
      m,
      p
    );
  }
  function Cy(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var u = n[l], i = u.getSnapshot;
          u = u.value;
          try {
            if (!de(i(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Hn(t, e, n, l) {
    e &= ~Ho, e &= ~sl, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var u = e; 0 < u; ) {
      var i = 31 - fe(u), s = 1 << i;
      l[i] = -1, u &= ~s;
    }
    n !== 0 && fs(t, n, e);
  }
  function fi() {
    return (Ot & 6) === 0 ? (Ia(0), !1) : !0;
  }
  function Go() {
    if (gt !== null) {
      if (Rt === 0)
        var t = gt.return;
      else
        t = gt, an = al = null, lo(t), ql = null, Va = 0, t = gt;
      for (; t !== null; )
        Ud(t.alternate, t), t = t.return;
      gt = null;
    }
  }
  function Jl(t, e) {
    var n = t.timeoutHandle;
    n !== -1 && (t.timeoutHandle = -1, Wy(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Go(), Nt = t, gt = n = en(t.current, null), bt = e, Rt = 0, ge = null, Cn = !1, Ql = va(t, e), Uo = !1, Zl = _e = Ho = sl = zn = jt = 0, ce = Fa = null, Bo = !1, (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var u = 31 - fe(l), i = 1 << u;
        e |= t[u], l &= ~i;
      }
    return mn = e, Nu(), n;
  }
  function nm(t, e) {
    ft = null, _.H = Pu, e === Ua || e === Xu ? (e = bf(), Rt = 3) : e === gf ? (e = bf(), Rt = 4) : Rt = e === Sd ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, ge = e, gt === null && (jt = 1, li(
      t,
      we(e, t.current)
    ));
  }
  function lm() {
    var t = _.H;
    return _.H = Pu, t === null ? Pu : t;
  }
  function am() {
    var t = _.A;
    return _.A = Dy, t;
  }
  function Xo() {
    jt = 4, Cn || (bt & 4194048) !== bt && De.current !== null || (Ql = !0), (zn & 134217727) === 0 && (sl & 134217727) === 0 || Nt === null || Hn(
      Nt,
      bt,
      _e,
      !1
    );
  }
  function Vo(t, e, n) {
    var l = Ot;
    Ot |= 2;
    var u = lm(), i = am();
    (Nt !== t || bt !== e) && (si = null, Jl(t, e)), e = !1;
    var s = jt;
    t: do
      try {
        if (Rt !== 0 && gt !== null) {
          var m = gt, p = ge;
          switch (Rt) {
            case 8:
              Go(), s = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              De.current === null && (e = !0);
              var M = Rt;
              if (Rt = 0, ge = null, Wl(t, m, p, M), n && Ql) {
                s = 0;
                break t;
              }
              break;
            default:
              M = Rt, Rt = 0, ge = null, Wl(t, m, p, M);
          }
        }
        zy(), s = jt;
        break;
      } catch (H) {
        nm(t, H);
      }
    while (!0);
    return e && t.shellSuspendCounter++, an = al = null, Ot = l, _.H = u, _.A = i, gt === null && (Nt = null, bt = 0, Nu()), s;
  }
  function zy() {
    for (; gt !== null; ) um(gt);
  }
  function Ny(t, e) {
    var n = Ot;
    Ot |= 2;
    var l = lm(), u = am();
    Nt !== t || bt !== e ? (si = null, ri = Ee() + 500, Jl(t, e)) : Ql = va(
      t,
      e
    );
    t: do
      try {
        if (Rt !== 0 && gt !== null) {
          e = gt;
          var i = ge;
          e: switch (Rt) {
            case 1:
              Rt = 0, ge = null, Wl(t, e, i, 1);
              break;
            case 2:
            case 9:
              if (yf(i)) {
                Rt = 0, ge = null, im(e);
                break;
              }
              e = function() {
                Rt !== 2 && Rt !== 9 || Nt !== t || (Rt = 7), ke(t);
              }, i.then(e, e);
              break t;
            case 3:
              Rt = 7;
              break t;
            case 4:
              Rt = 5;
              break t;
            case 7:
              yf(i) ? (Rt = 0, ge = null, im(e)) : (Rt = 0, ge = null, Wl(t, e, i, 7));
              break;
            case 5:
              var s = null;
              switch (gt.tag) {
                case 26:
                  s = gt.memoizedState;
                case 5:
                case 27:
                  var m = gt;
                  if (!s || Gm(s)) {
                    Rt = 0, ge = null;
                    var p = m.sibling;
                    if (p !== null) gt = p;
                    else {
                      var M = m.return;
                      M !== null ? (gt = M, di(M)) : gt = null;
                    }
                    break e;
                  }
              }
              Rt = 0, ge = null, Wl(t, e, i, 5);
              break;
            case 6:
              Rt = 0, ge = null, Wl(t, e, i, 6);
              break;
            case 8:
              Go(), jt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        Uy();
        break;
      } catch (H) {
        nm(t, H);
      }
    while (!0);
    return an = al = null, _.H = l, _.A = u, Ot = n, gt !== null ? 0 : (Nt = null, bt = 0, Nu(), jt);
  }
  function Uy() {
    for (; gt !== null && !ec(); )
      um(gt);
  }
  function um(t) {
    var e = zd(t.alternate, t, mn);
    t.memoizedProps = t.pendingProps, e === null ? di(t) : gt = e;
  }
  function im(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Od(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          bt
        );
        break;
      case 11:
        e = Od(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          bt
        );
        break;
      case 5:
        lo(e);
      default:
        Ud(n, e), e = gt = cf(e, mn), e = zd(n, e, mn);
    }
    t.memoizedProps = t.pendingProps, e === null ? di(t) : gt = e;
  }
  function Wl(t, e, n, l) {
    an = al = null, lo(e), ql = null, Va = 0;
    var u = e.return;
    try {
      if (Ay(
        t,
        u,
        e,
        n,
        bt
      )) {
        jt = 1, li(
          t,
          we(n, t.current)
        ), gt = null;
        return;
      }
    } catch (i) {
      if (u !== null) throw gt = u, i;
      jt = 1, li(
        t,
        we(n, t.current)
      ), gt = null;
      return;
    }
    e.flags & 32768 ? (At || l === 1 ? t = !0 : Ql || (bt & 536870912) !== 0 ? t = !1 : (Cn = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = De.current, l !== null && l.tag === 13 && (l.flags |= 16384))), cm(e, t)) : di(e);
  }
  function di(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        cm(
          e,
          Cn
        );
        return;
      }
      t = e.return;
      var n = wy(
        e.alternate,
        e,
        mn
      );
      if (n !== null) {
        gt = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        gt = e;
        return;
      }
      gt = e = t;
    } while (e !== null);
    jt === 0 && (jt = 5);
  }
  function cm(t, e) {
    do {
      var n = Oy(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, gt = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        gt = t;
        return;
      }
      gt = t = n;
    } while (t !== null);
    jt = 6, gt = null;
  }
  function om(t, e, n, l, u, i, s, m, p) {
    t.cancelPendingCommit = null;
    do
      mi();
    while ($t !== 0);
    if ((Ot & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (i = e.lanes | e.childLanes, i |= zc, dg(
        t,
        n,
        i,
        s,
        m,
        p
      ), t === Nt && (gt = Nt = null, bt = 0), kl = e, Un = t, Kl = n, Lo = i, Yo = u, Pd = l, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Ly(pu, function() {
        return mm(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
        l = _.T, _.T = null, u = V.p, V.p = 2, s = Ot, Ot |= 4;
        try {
          Ry(t, e, n);
        } finally {
          Ot = s, V.p = u, _.T = l;
        }
      }
      $t = 1, rm(), sm(), fm();
    }
  }
  function rm() {
    if ($t === 1) {
      $t = 0;
      var t = Un, e = kl, n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        n = _.T, _.T = null;
        var l = V.p;
        V.p = 2;
        var u = Ot;
        Ot |= 4;
        try {
          Zd(e, t);
          var i = er, s = $s(t.containerInfo), m = i.focusedElem, p = i.selectionRange;
          if (s !== m && m && m.ownerDocument && Ws(
            m.ownerDocument.documentElement,
            m
          )) {
            if (p !== null && Rc(m)) {
              var M = p.start, H = p.end;
              if (H === void 0 && (H = M), "selectionStart" in m)
                m.selectionStart = M, m.selectionEnd = Math.min(
                  H,
                  m.value.length
                );
              else {
                var Y = m.ownerDocument || document, D = Y && Y.defaultView || window;
                if (D.getSelection) {
                  var C = D.getSelection(), it = m.textContent.length, lt = Math.min(p.start, it), Ct = p.end === void 0 ? lt : Math.min(p.end, it);
                  !C.extend && lt > Ct && (s = Ct, Ct = lt, lt = s);
                  var T = Js(
                    m,
                    lt
                  ), E = Js(
                    m,
                    Ct
                  );
                  if (T && E && (C.rangeCount !== 1 || C.anchorNode !== T.node || C.anchorOffset !== T.offset || C.focusNode !== E.node || C.focusOffset !== E.offset)) {
                    var w = Y.createRange();
                    w.setStart(T.node, T.offset), C.removeAllRanges(), lt > Ct ? (C.addRange(w), C.extend(E.node, E.offset)) : (w.setEnd(E.node, E.offset), C.addRange(w));
                  }
                }
              }
            }
            for (Y = [], C = m; C = C.parentNode; )
              C.nodeType === 1 && Y.push({
                element: C,
                left: C.scrollLeft,
                top: C.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < Y.length; m++) {
              var j = Y[m];
              j.element.scrollLeft = j.left, j.element.scrollTop = j.top;
            }
          }
          wi = !!tr, er = tr = null;
        } finally {
          Ot = u, V.p = l, _.T = n;
        }
      }
      t.current = e, $t = 2;
    }
  }
  function sm() {
    if ($t === 2) {
      $t = 0;
      var t = Un, e = kl, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = _.T, _.T = null;
        var l = V.p;
        V.p = 2;
        var u = Ot;
        Ot |= 4;
        try {
          Gd(t, e.alternate, e);
        } finally {
          Ot = u, V.p = l, _.T = n;
        }
      }
      $t = 3;
    }
  }
  function fm() {
    if ($t === 4 || $t === 3) {
      $t = 0, nc();
      var t = Un, e = kl, n = Kl, l = Pd;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? $t = 5 : ($t = 0, kl = Un = null, dm(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (Nn = null), ic(n), e = e.stateNode, se && typeof se.onCommitFiberRoot == "function")
        try {
          se.onCommitFiberRoot(
            ha,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        e = _.T, u = V.p, V.p = 2, _.T = null;
        try {
          for (var i = t.onRecoverableError, s = 0; s < l.length; s++) {
            var m = l[s];
            i(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          _.T = e, V.p = u;
        }
      }
      (Kl & 3) !== 0 && mi(), ke(t), u = t.pendingLanes, (n & 4194090) !== 0 && (u & 42) !== 0 ? t === qo ? Pa++ : (Pa = 0, qo = t) : Pa = 0, Ia(0);
    }
  }
  function dm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, za(e)));
  }
  function mi(t) {
    return rm(), sm(), fm(), mm();
  }
  function mm() {
    if ($t !== 5) return !1;
    var t = Un, e = Lo;
    Lo = 0;
    var n = ic(Kl), l = _.T, u = V.p;
    try {
      V.p = 32 > n ? 32 : n, _.T = null, n = Yo, Yo = null;
      var i = Un, s = Kl;
      if ($t = 0, kl = Un = null, Kl = 0, (Ot & 6) !== 0) throw Error(o(331));
      var m = Ot;
      if (Ot |= 4, $d(i.current), Kd(
        i,
        i.current,
        s,
        n
      ), Ot = m, Ia(0, !1), se && typeof se.onPostCommitFiberRoot == "function")
        try {
          se.onPostCommitFiberRoot(ha, i);
        } catch {
        }
      return !0;
    } finally {
      V.p = u, _.T = l, dm(t, e);
    }
  }
  function hm(t, e, n) {
    e = we(n, e), e = po(t.stateNode, e, 2), t = Tn(t, e, 2), t !== null && (ga(t, 2), ke(t));
  }
  function zt(t, e, n) {
    if (t.tag === 3)
      hm(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          hm(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Nn === null || !Nn.has(l))) {
            t = we(n, t), n = pd(2), l = Tn(e, n, 2), l !== null && (bd(
              n,
              l,
              e,
              t
            ), ga(l, 2), ke(l));
            break;
          }
        }
        e = e.return;
      }
  }
  function Qo(t, e, n) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new _y();
      var u = /* @__PURE__ */ new Set();
      l.set(e, u);
    } else
      u = l.get(e), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(e, u));
    u.has(n) || (Uo = !0, u.add(n), t = Hy.bind(null, t, e, n), e.then(t, t));
  }
  function Hy(t, e, n) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Nt === t && (bt & n) === n && (jt === 4 || jt === 3 && (bt & 62914560) === bt && 300 > Ee() - jo ? (Ot & 2) === 0 && Jl(t, 0) : Ho |= n, Zl === bt && (Zl = 0)), ke(t);
  }
  function vm(t, e) {
    e === 0 && (e = ss()), t = _l(t, e), t !== null && (ga(t, e), ke(t));
  }
  function By(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), vm(t, n);
  }
  function jy(t, e) {
    var n = 0;
    switch (t.tag) {
      case 13:
        var l = t.stateNode, u = t.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    l !== null && l.delete(e), vm(t, n);
  }
  function Ly(t, e) {
    return Pe(t, e);
  }
  var hi = null, $l = null, Zo = !1, vi = !1, ko = !1, fl = 0;
  function ke(t) {
    t !== $l && t.next === null && ($l === null ? hi = $l = t : $l = $l.next = t), vi = !0, Zo || (Zo = !0, qy());
  }
  function Ia(t, e) {
    if (!ko && vi) {
      ko = !0;
      do
        for (var n = !1, l = hi; l !== null; ) {
          if (t !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var i = 0;
            else {
              var s = l.suspendedLanes, m = l.pingedLanes;
              i = (1 << 31 - fe(42 | t) + 1) - 1, i &= u & ~(s & ~m), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (n = !0, bm(l, i));
          } else
            i = bt, i = xu(
              l,
              l === Nt ? i : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (i & 3) === 0 || va(l, i) || (n = !0, bm(l, i));
          l = l.next;
        }
      while (n);
      ko = !1;
    }
  }
  function Yy() {
    gm();
  }
  function gm() {
    vi = Zo = !1;
    var t = 0;
    fl !== 0 && (Jy() && (t = fl), fl = 0);
    for (var e = Ee(), n = null, l = hi; l !== null; ) {
      var u = l.next, i = ym(l, e);
      i === 0 ? (l.next = null, n === null ? hi = u : n.next = u, u === null && ($l = n)) : (n = l, (t !== 0 || (i & 3) !== 0) && (vi = !0)), l = u;
    }
    Ia(t);
  }
  function ym(t, e) {
    for (var n = t.suspendedLanes, l = t.pingedLanes, u = t.expirationTimes, i = t.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - fe(i), m = 1 << s, p = u[s];
      p === -1 ? ((m & n) === 0 || (m & l) !== 0) && (u[s] = fg(m, e)) : p <= e && (t.expiredLanes |= m), i &= ~m;
    }
    if (e = Nt, n = bt, n = xu(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, n === 0 || t === e && (Rt === 2 || Rt === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && vl(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || va(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (l !== null && vl(l), ic(n)) {
        case 2:
        case 8:
          n = cs;
          break;
        case 32:
          n = pu;
          break;
        case 268435456:
          n = os;
          break;
        default:
          n = pu;
      }
      return l = pm.bind(null, t), n = Pe(n, l), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return l !== null && l !== null && vl(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function pm(t, e) {
    if ($t !== 0 && $t !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (mi() && t.callbackNode !== n)
      return null;
    var l = bt;
    return l = xu(
      t,
      t === Nt ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (tm(t, l, e), ym(t, Ee()), t.callbackNode != null && t.callbackNode === n ? pm.bind(null, t) : null);
  }
  function bm(t, e) {
    if (mi()) return null;
    tm(t, e, !0);
  }
  function qy() {
    $y(function() {
      (Ot & 6) !== 0 ? Pe(
        Kn,
        Yy
      ) : gm();
    });
  }
  function Ko() {
    return fl === 0 && (fl = rs()), fl;
  }
  function Sm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ou("" + t);
  }
  function xm(t, e) {
    var n = e.ownerDocument.createElement("input");
    return n.name = e.name, n.value = e.value, t.id && n.setAttribute("form", t.id), e.parentNode.insertBefore(n, e), t = new FormData(t), n.parentNode.removeChild(n), t;
  }
  function Gy(t, e, n, l, u) {
    if (e === "submit" && n && n.stateNode === u) {
      var i = Sm(
        (u[le] || null).action
      ), s = l.submitter;
      s && (e = (e = s[le] || null) ? Sm(e.formAction) : s.getAttribute("formAction"), e !== null && (i = e, s = null));
      var m = new _u(
        "action",
        "action",
        null,
        l,
        u
      );
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (fl !== 0) {
                  var p = s ? xm(u, s) : new FormData(u);
                  mo(
                    n,
                    {
                      pending: !0,
                      data: p,
                      method: u.method,
                      action: i
                    },
                    null,
                    p
                  );
                }
              } else
                typeof i == "function" && (m.preventDefault(), p = s ? xm(u, s) : new FormData(u), mo(
                  n,
                  {
                    pending: !0,
                    data: p,
                    method: u.method,
                    action: i
                  },
                  i,
                  p
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Jo = 0; Jo < Cc.length; Jo++) {
    var Wo = Cc[Jo], Xy = Wo.toLowerCase(), Vy = Wo[0].toUpperCase() + Wo.slice(1);
    He(
      Xy,
      "on" + Vy
    );
  }
  He(Is, "onAnimationEnd"), He(tf, "onAnimationIteration"), He(ef, "onAnimationStart"), He("dblclick", "onDoubleClick"), He("focusin", "onFocus"), He("focusout", "onBlur"), He(iy, "onTransitionRun"), He(cy, "onTransitionStart"), He(oy, "onTransitionCancel"), He(nf, "onTransitionEnd"), Sl("onMouseEnter", ["mouseout", "mouseover"]), Sl("onMouseLeave", ["mouseout", "mouseover"]), Sl("onPointerEnter", ["pointerout", "pointerover"]), Sl("onPointerLeave", ["pointerout", "pointerover"]), Wn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Wn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Wn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Wn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Wn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Wn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var tu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Qy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(tu)
  );
  function Em(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var l = t[n], u = l.event;
      l = l.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var s = l.length - 1; 0 <= s; s--) {
            var m = l[s], p = m.instance, M = m.currentTarget;
            if (m = m.listener, p !== i && u.isPropagationStopped())
              break t;
            i = m, u.currentTarget = M;
            try {
              i(u);
            } catch (H) {
              ni(H);
            }
            u.currentTarget = null, i = p;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (m = l[s], p = m.instance, M = m.currentTarget, m = m.listener, p !== i && u.isPropagationStopped())
              break t;
            i = m, u.currentTarget = M;
            try {
              i(u);
            } catch (H) {
              ni(H);
            }
            u.currentTarget = null, i = p;
          }
      }
    }
  }
  function yt(t, e) {
    var n = e[cc];
    n === void 0 && (n = e[cc] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    n.has(l) || (Am(e, t, 2, !1), n.add(l));
  }
  function $o(t, e, n) {
    var l = 0;
    e && (l |= 4), Am(
      n,
      t,
      l,
      e
    );
  }
  var gi = "_reactListening" + Math.random().toString(36).slice(2);
  function Fo(t) {
    if (!t[gi]) {
      t[gi] = !0, vs.forEach(function(n) {
        n !== "selectionchange" && (Qy.has(n) || $o(n, !1, t), $o(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[gi] || (e[gi] = !0, $o("selectionchange", !1, e));
    }
  }
  function Am(t, e, n, l) {
    switch (Km(e)) {
      case 2:
        var u = yp;
        break;
      case 8:
        u = pp;
        break;
      default:
        u = fr;
    }
    n = u.bind(
      null,
      e,
      n,
      t
    ), u = void 0, !pc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (u = !0), l ? u !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: u
    }) : t.addEventListener(e, n, !0) : u !== void 0 ? t.addEventListener(e, n, {
      passive: u
    }) : t.addEventListener(e, n, !1);
  }
  function Po(t, e, n, l, u) {
    var i = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var s = l.tag;
        if (s === 3 || s === 4) {
          var m = l.stateNode.containerInfo;
          if (m === u) break;
          if (s === 4)
            for (s = l.return; s !== null; ) {
              var p = s.tag;
              if ((p === 3 || p === 4) && s.stateNode.containerInfo === u)
                return;
              s = s.return;
            }
          for (; m !== null; ) {
            if (s = yl(m), s === null) return;
            if (p = s.tag, p === 5 || p === 6 || p === 26 || p === 27) {
              l = i = s;
              continue t;
            }
            m = m.parentNode;
          }
        }
        l = l.return;
      }
    Ds(function() {
      var M = i, H = gc(n), Y = [];
      t: {
        var D = lf.get(t);
        if (D !== void 0) {
          var C = _u, it = t;
          switch (t) {
            case "keypress":
              if (Mu(n) === 0) break t;
            case "keydown":
            case "keyup":
              C = Lg;
              break;
            case "focusin":
              it = "focus", C = Ec;
              break;
            case "focusout":
              it = "blur", C = Ec;
              break;
            case "beforeblur":
            case "afterblur":
              C = Ec;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              C = zs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              C = Og;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              C = Gg;
              break;
            case Is:
            case tf:
            case ef:
              C = Dg;
              break;
            case nf:
              C = Vg;
              break;
            case "scroll":
            case "scrollend":
              C = Tg;
              break;
            case "wheel":
              C = Zg;
              break;
            case "copy":
            case "cut":
            case "paste":
              C = Cg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              C = Us;
              break;
            case "toggle":
            case "beforetoggle":
              C = Kg;
          }
          var lt = (e & 4) !== 0, Ct = !lt && (t === "scroll" || t === "scrollend"), T = lt ? D !== null ? D + "Capture" : null : D;
          lt = [];
          for (var E = M, w; E !== null; ) {
            var j = E;
            if (w = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || w === null || T === null || (j = ba(E, T), j != null && lt.push(
              eu(E, j, w)
            )), Ct) break;
            E = E.return;
          }
          0 < lt.length && (D = new C(
            D,
            it,
            null,
            n,
            H
          ), Y.push({ event: D, listeners: lt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (D = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout", D && n !== vc && (it = n.relatedTarget || n.fromElement) && (yl(it) || it[gl]))
            break t;
          if ((C || D) && (D = H.window === H ? H : (D = H.ownerDocument) ? D.defaultView || D.parentWindow : window, C ? (it = n.relatedTarget || n.toElement, C = M, it = it ? yl(it) : null, it !== null && (Ct = d(it), lt = it.tag, it !== Ct || lt !== 5 && lt !== 27 && lt !== 6) && (it = null)) : (C = null, it = M), C !== it)) {
            if (lt = zs, j = "onMouseLeave", T = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (lt = Us, j = "onPointerLeave", T = "onPointerEnter", E = "pointer"), Ct = C == null ? D : pa(C), w = it == null ? D : pa(it), D = new lt(
              j,
              E + "leave",
              C,
              n,
              H
            ), D.target = Ct, D.relatedTarget = w, j = null, yl(H) === M && (lt = new lt(
              T,
              E + "enter",
              it,
              n,
              H
            ), lt.target = w, lt.relatedTarget = Ct, j = lt), Ct = j, C && it)
              e: {
                for (lt = C, T = it, E = 0, w = lt; w; w = Fl(w))
                  E++;
                for (w = 0, j = T; j; j = Fl(j))
                  w++;
                for (; 0 < E - w; )
                  lt = Fl(lt), E--;
                for (; 0 < w - E; )
                  T = Fl(T), w--;
                for (; E--; ) {
                  if (lt === T || T !== null && lt === T.alternate)
                    break e;
                  lt = Fl(lt), T = Fl(T);
                }
                lt = null;
              }
            else lt = null;
            C !== null && Tm(
              Y,
              D,
              C,
              lt,
              !1
            ), it !== null && Ct !== null && Tm(
              Y,
              Ct,
              it,
              lt,
              !0
            );
          }
        }
        t: {
          if (D = M ? pa(M) : window, C = D.nodeName && D.nodeName.toLowerCase(), C === "select" || C === "input" && D.type === "file")
            var P = Xs;
          else if (qs(D))
            if (Vs)
              P = ly;
            else {
              P = ey;
              var mt = ty;
            }
          else
            C = D.nodeName, !C || C.toLowerCase() !== "input" || D.type !== "checkbox" && D.type !== "radio" ? M && hc(M.elementType) && (P = Xs) : P = ny;
          if (P && (P = P(t, M))) {
            Gs(
              Y,
              P,
              n,
              H
            );
            break t;
          }
          mt && mt(t, D, M), t === "focusout" && M && D.type === "number" && M.memoizedProps.value != null && mc(D, "number", D.value);
        }
        switch (mt = M ? pa(M) : window, t) {
          case "focusin":
            (qs(mt) || mt.contentEditable === "true") && (Rl = mt, Mc = M, Ra = null);
            break;
          case "focusout":
            Ra = Mc = Rl = null;
            break;
          case "mousedown":
            Dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Dc = !1, Fs(Y, n, H);
            break;
          case "selectionchange":
            if (uy) break;
          case "keydown":
          case "keyup":
            Fs(Y, n, H);
        }
        var nt;
        if (Tc)
          t: {
            switch (t) {
              case "compositionstart":
                var at = "onCompositionStart";
                break t;
              case "compositionend":
                at = "onCompositionEnd";
                break t;
              case "compositionupdate":
                at = "onCompositionUpdate";
                break t;
            }
            at = void 0;
          }
        else
          Ol ? Ls(t, n) && (at = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (at = "onCompositionStart");
        at && (Hs && n.locale !== "ko" && (Ol || at !== "onCompositionStart" ? at === "onCompositionEnd" && Ol && (nt = _s()) : (Sn = H, bc = "value" in Sn ? Sn.value : Sn.textContent, Ol = !0)), mt = yi(M, at), 0 < mt.length && (at = new Ns(
          at,
          t,
          null,
          n,
          H
        ), Y.push({ event: at, listeners: mt }), nt ? at.data = nt : (nt = Ys(n), nt !== null && (at.data = nt)))), (nt = Wg ? $g(t, n) : Fg(t, n)) && (at = yi(M, "onBeforeInput"), 0 < at.length && (mt = new Ns(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          H
        ), Y.push({
          event: mt,
          listeners: at
        }), mt.data = nt)), Gy(
          Y,
          t,
          M,
          n,
          H
        );
      }
      Em(Y, e);
    });
  }
  function eu(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function yi(t, e) {
    for (var n = e + "Capture", l = []; t !== null; ) {
      var u = t, i = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || i === null || (u = ba(t, n), u != null && l.unshift(
        eu(t, u, i)
      ), u = ba(t, e), u != null && l.push(
        eu(t, u, i)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function Fl(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Tm(t, e, n, l, u) {
    for (var i = e._reactName, s = []; n !== null && n !== l; ) {
      var m = n, p = m.alternate, M = m.stateNode;
      if (m = m.tag, p !== null && p === l) break;
      m !== 5 && m !== 26 && m !== 27 || M === null || (p = M, u ? (M = ba(n, i), M != null && s.unshift(
        eu(n, M, p)
      )) : u || (M = ba(n, i), M != null && s.push(
        eu(n, M, p)
      ))), n = n.return;
    }
    s.length !== 0 && t.push({ event: e, listeners: s });
  }
  var Zy = /\r\n?/g, ky = /\u0000|\uFFFD/g;
  function wm(t) {
    return (typeof t == "string" ? t : "" + t).replace(Zy, `
`).replace(ky, "");
  }
  function Om(t, e) {
    return e = wm(e), wm(t) === e;
  }
  function pi() {
  }
  function _t(t, e, n, l, u, i) {
    switch (n) {
      case "children":
        typeof l == "string" ? e === "body" || e === "textarea" && l === "" || Al(t, l) : (typeof l == "number" || typeof l == "bigint") && e !== "body" && Al(t, "" + l);
        break;
      case "className":
        Au(t, "class", l);
        break;
      case "tabIndex":
        Au(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Au(t, n, l);
        break;
      case "style":
        Rs(t, l, i);
        break;
      case "data":
        if (e !== "object") {
          Au(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = Ou("" + l), t.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" && (n === "formAction" ? (e !== "input" && _t(t, e, "name", u.name, u, null), _t(
            t,
            e,
            "formEncType",
            u.formEncType,
            u,
            null
          ), _t(
            t,
            e,
            "formMethod",
            u.formMethod,
            u,
            null
          ), _t(
            t,
            e,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (_t(t, e, "encType", u.encType, u, null), _t(t, e, "method", u.method, u, null), _t(t, e, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = Ou("" + l), t.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (t.onclick = pi);
        break;
      case "onScroll":
        l != null && yt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && yt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
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
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = Ou("" + l), t.setAttributeNS(
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
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "" + l) : t.removeAttribute(n);
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
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(n) : t.setAttribute(n, l);
        break;
      case "popover":
        yt("beforetoggle", t), yt("toggle", t), Eu(t, "popover", l);
        break;
      case "xlinkActuate":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Eu(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Eg.get(n) || n, Eu(t, n, l));
    }
  }
  function Io(t, e, n, l, u, i) {
    switch (n) {
      case "style":
        Rs(t, l, i);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Al(t, l) : (typeof l == "number" || typeof l == "bigint") && Al(t, "" + l);
        break;
      case "onScroll":
        l != null && yt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && yt("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = pi);
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
        if (!gs.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), e = n.slice(2, u ? n.length - 7 : void 0), i = t[le] || null, i = i != null ? i[n] : null, typeof i == "function" && t.removeEventListener(e, i, u), typeof l == "function")) {
              typeof i != "function" && i !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(e, l, u);
              break t;
            }
            n in t ? t[n] = l : l === !0 ? t.setAttribute(n, "") : Eu(t, n, l);
          }
    }
  }
  function Ft(t, e, n) {
    switch (e) {
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
        yt("error", t), yt("load", t);
        var l = !1, u = !1, i;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var s = n[i];
            if (s != null)
              switch (i) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  _t(t, e, i, s, n, null);
              }
          }
        u && _t(t, e, "srcSet", n.srcSet, n, null), l && _t(t, e, "src", n.src, n, null);
        return;
      case "input":
        yt("invalid", t);
        var m = i = s = u = null, p = null, M = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var H = n[l];
            if (H != null)
              switch (l) {
                case "name":
                  u = H;
                  break;
                case "type":
                  s = H;
                  break;
                case "checked":
                  p = H;
                  break;
                case "defaultChecked":
                  M = H;
                  break;
                case "value":
                  i = H;
                  break;
                case "defaultValue":
                  m = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null)
                    throw Error(o(137, e));
                  break;
                default:
                  _t(t, e, l, H, n, null);
              }
          }
        As(
          t,
          i,
          m,
          p,
          M,
          s,
          u,
          !1
        ), Tu(t);
        return;
      case "select":
        yt("invalid", t), l = s = i = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (m = n[u], m != null))
            switch (u) {
              case "value":
                i = m;
                break;
              case "defaultValue":
                s = m;
                break;
              case "multiple":
                l = m;
              default:
                _t(t, e, u, m, n, null);
            }
        e = i, n = s, t.multiple = !!l, e != null ? El(t, !!l, e, !1) : n != null && El(t, !!l, n, !0);
        return;
      case "textarea":
        yt("invalid", t), i = u = l = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (m = n[s], m != null))
            switch (s) {
              case "value":
                l = m;
                break;
              case "defaultValue":
                u = m;
                break;
              case "children":
                i = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(o(91));
                break;
              default:
                _t(t, e, s, m, n, null);
            }
        ws(t, l, u, i), Tu(t);
        return;
      case "option":
        for (p in n)
          if (n.hasOwnProperty(p) && (l = n[p], l != null))
            switch (p) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                _t(t, e, p, l, n, null);
            }
        return;
      case "dialog":
        yt("beforetoggle", t), yt("toggle", t), yt("cancel", t), yt("close", t);
        break;
      case "iframe":
      case "object":
        yt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < tu.length; l++)
          yt(tu[l], t);
        break;
      case "image":
        yt("error", t), yt("load", t);
        break;
      case "details":
        yt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        yt("error", t), yt("load", t);
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
        for (M in n)
          if (n.hasOwnProperty(M) && (l = n[M], l != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                _t(t, e, M, l, n, null);
            }
        return;
      default:
        if (hc(e)) {
          for (H in n)
            n.hasOwnProperty(H) && (l = n[H], l !== void 0 && Io(
              t,
              e,
              H,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (l = n[m], l != null && _t(t, e, m, l, n, null));
  }
  function Ky(t, e, n, l) {
    switch (e) {
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
        var u = null, i = null, s = null, m = null, p = null, M = null, H = null;
        for (C in n) {
          var Y = n[C];
          if (n.hasOwnProperty(C) && Y != null)
            switch (C) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                p = Y;
              default:
                l.hasOwnProperty(C) || _t(t, e, C, null, l, Y);
            }
        }
        for (var D in l) {
          var C = l[D];
          if (Y = n[D], l.hasOwnProperty(D) && (C != null || Y != null))
            switch (D) {
              case "type":
                i = C;
                break;
              case "name":
                u = C;
                break;
              case "checked":
                M = C;
                break;
              case "defaultChecked":
                H = C;
                break;
              case "value":
                s = C;
                break;
              case "defaultValue":
                m = C;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(o(137, e));
                break;
              default:
                C !== Y && _t(
                  t,
                  e,
                  D,
                  C,
                  l,
                  Y
                );
            }
        }
        dc(
          t,
          s,
          m,
          p,
          M,
          H,
          i,
          u
        );
        return;
      case "select":
        C = s = m = D = null;
        for (i in n)
          if (p = n[i], n.hasOwnProperty(i) && p != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                C = p;
              default:
                l.hasOwnProperty(i) || _t(
                  t,
                  e,
                  i,
                  null,
                  l,
                  p
                );
            }
        for (u in l)
          if (i = l[u], p = n[u], l.hasOwnProperty(u) && (i != null || p != null))
            switch (u) {
              case "value":
                D = i;
                break;
              case "defaultValue":
                m = i;
                break;
              case "multiple":
                s = i;
              default:
                i !== p && _t(
                  t,
                  e,
                  u,
                  i,
                  l,
                  p
                );
            }
        e = m, n = s, l = C, D != null ? El(t, !!n, D, !1) : !!l != !!n && (e != null ? El(t, !!n, e, !0) : El(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        C = D = null;
        for (m in n)
          if (u = n[m], n.hasOwnProperty(m) && u != null && !l.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(t, e, m, null, l, u);
            }
        for (s in l)
          if (u = l[s], i = n[s], l.hasOwnProperty(s) && (u != null || i != null))
            switch (s) {
              case "value":
                D = u;
                break;
              case "defaultValue":
                C = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== i && _t(t, e, s, u, l, i);
            }
        Ts(t, D, C);
        return;
      case "option":
        for (var it in n)
          if (D = n[it], n.hasOwnProperty(it) && D != null && !l.hasOwnProperty(it))
            switch (it) {
              case "selected":
                t.selected = !1;
                break;
              default:
                _t(
                  t,
                  e,
                  it,
                  null,
                  l,
                  D
                );
            }
        for (p in l)
          if (D = l[p], C = n[p], l.hasOwnProperty(p) && D !== C && (D != null || C != null))
            switch (p) {
              case "selected":
                t.selected = D && typeof D != "function" && typeof D != "symbol";
                break;
              default:
                _t(
                  t,
                  e,
                  p,
                  D,
                  l,
                  C
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
        for (var lt in n)
          D = n[lt], n.hasOwnProperty(lt) && D != null && !l.hasOwnProperty(lt) && _t(t, e, lt, null, l, D);
        for (M in l)
          if (D = l[M], C = n[M], l.hasOwnProperty(M) && D !== C && (D != null || C != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null)
                  throw Error(o(137, e));
                break;
              default:
                _t(
                  t,
                  e,
                  M,
                  D,
                  l,
                  C
                );
            }
        return;
      default:
        if (hc(e)) {
          for (var Ct in n)
            D = n[Ct], n.hasOwnProperty(Ct) && D !== void 0 && !l.hasOwnProperty(Ct) && Io(
              t,
              e,
              Ct,
              void 0,
              l,
              D
            );
          for (H in l)
            D = l[H], C = n[H], !l.hasOwnProperty(H) || D === C || D === void 0 && C === void 0 || Io(
              t,
              e,
              H,
              D,
              l,
              C
            );
          return;
        }
    }
    for (var T in n)
      D = n[T], n.hasOwnProperty(T) && D != null && !l.hasOwnProperty(T) && _t(t, e, T, null, l, D);
    for (Y in l)
      D = l[Y], C = n[Y], !l.hasOwnProperty(Y) || D === C || D == null && C == null || _t(t, e, Y, D, l, C);
  }
  var tr = null, er = null;
  function bi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Rm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Mm(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function nr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var lr = null;
  function Jy() {
    var t = window.event;
    return t && t.type === "popstate" ? t === lr ? !1 : (lr = t, !0) : (lr = null, !1);
  }
  var Dm = typeof setTimeout == "function" ? setTimeout : void 0, Wy = typeof clearTimeout == "function" ? clearTimeout : void 0, _m = typeof Promise == "function" ? Promise : void 0, $y = typeof queueMicrotask == "function" ? queueMicrotask : typeof _m < "u" ? function(t) {
    return _m.resolve(null).then(t).catch(Fy);
  } : Dm;
  function Fy(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Bn(t) {
    return t === "head";
  }
  function Cm(t, e) {
    var n = e, l = 0, u = 0;
    do {
      var i = n.nextSibling;
      if (t.removeChild(n), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (0 < l && 8 > l) {
            n = l;
            var s = t.ownerDocument;
            if (n & 1 && nu(s.documentElement), n & 2 && nu(s.body), n & 4)
              for (n = s.head, nu(n), s = n.firstChild; s; ) {
                var m = s.nextSibling, p = s.nodeName;
                s[ya] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = m;
              }
          }
          if (u === 0) {
            t.removeChild(i), su(e);
            return;
          }
          u--;
        } else
          n === "$" || n === "$?" || n === "$!" ? u++ : l = n.charCodeAt(0) - 48;
      else l = 0;
      n = i;
    } while (n);
    su(e);
  }
  function ar(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ar(n), oc(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function Py(t, e, n, l) {
    for (; t.nodeType === 1; ) {
      var u = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[ya])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (i = t.getAttribute("rel"), i === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (i !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (i = t.getAttribute("src"), (i !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && i && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var i = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === i)
          return t;
      } else return t;
      if (t = je(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Iy(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = je(t.nextSibling), t === null)) return null;
    return t;
  }
  function ur(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
  }
  function tp(t, e) {
    var n = t.ownerDocument;
    if (t.data !== "$?" || n.readyState === "complete")
      e();
    else {
      var l = function() {
        e(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function je(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
          break;
        if (e === "/$") return null;
      }
    }
    return t;
  }
  var ir = null;
  function zm(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (e === 0) return t;
          e--;
        } else n === "/$" && e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Nm(t, e, n) {
    switch (e = bi(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function nu(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    oc(t);
  }
  var Ce = /* @__PURE__ */ new Map(), Um = /* @__PURE__ */ new Set();
  function Si(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var hn = V.d;
  V.d = {
    f: ep,
    r: np,
    D: lp,
    C: ap,
    L: up,
    m: ip,
    X: op,
    S: cp,
    M: rp
  };
  function ep() {
    var t = hn.f(), e = fi();
    return t || e;
  }
  function np(t) {
    var e = pl(t);
    e !== null && e.tag === 5 && e.type === "form" ? td(e) : hn.r(t);
  }
  var Pl = typeof document > "u" ? null : document;
  function Hm(t, e, n) {
    var l = Pl;
    if (l && typeof e == "string" && e) {
      var u = Te(e);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), Um.has(u) || (Um.add(u), t = { rel: t, crossOrigin: n, href: e }, l.querySelector(u) === null && (e = l.createElement("link"), Ft(e, "link", t), Zt(e), l.head.appendChild(e)));
    }
  }
  function lp(t) {
    hn.D(t), Hm("dns-prefetch", t, null);
  }
  function ap(t, e) {
    hn.C(t, e), Hm("preconnect", t, e);
  }
  function up(t, e, n) {
    hn.L(t, e, n);
    var l = Pl;
    if (l && t && e) {
      var u = 'link[rel="preload"][as="' + Te(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + Te(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + Te(
        n.imageSizes
      ) + '"]')) : u += '[href="' + Te(t) + '"]';
      var i = u;
      switch (e) {
        case "style":
          i = Il(t);
          break;
        case "script":
          i = ta(t);
      }
      Ce.has(i) || (t = b(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Ce.set(i, t), l.querySelector(u) !== null || e === "style" && l.querySelector(lu(i)) || e === "script" && l.querySelector(au(i)) || (e = l.createElement("link"), Ft(e, "link", t), Zt(e), l.head.appendChild(e)));
    }
  }
  function ip(t, e) {
    hn.m(t, e);
    var n = Pl;
    if (n && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", u = 'link[rel="modulepreload"][as="' + Te(l) + '"][href="' + Te(t) + '"]', i = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = ta(t);
      }
      if (!Ce.has(i) && (t = b({ rel: "modulepreload", href: t }, e), Ce.set(i, t), n.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(au(i)))
              return;
        }
        l = n.createElement("link"), Ft(l, "link", t), Zt(l), n.head.appendChild(l);
      }
    }
  }
  function cp(t, e, n) {
    hn.S(t, e, n);
    var l = Pl;
    if (l && t) {
      var u = bl(l).hoistableStyles, i = Il(t);
      e = e || "default";
      var s = u.get(i);
      if (!s) {
        var m = { loading: 0, preload: null };
        if (s = l.querySelector(
          lu(i)
        ))
          m.loading = 5;
        else {
          t = b(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Ce.get(i)) && cr(t, n);
          var p = s = l.createElement("link");
          Zt(p), Ft(p, "link", t), p._p = new Promise(function(M, H) {
            p.onload = M, p.onerror = H;
          }), p.addEventListener("load", function() {
            m.loading |= 1;
          }), p.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, xi(s, e, l);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: m
        }, u.set(i, s);
      }
    }
  }
  function op(t, e) {
    hn.X(t, e);
    var n = Pl;
    if (n && t) {
      var l = bl(n).hoistableScripts, u = ta(t), i = l.get(u);
      i || (i = n.querySelector(au(u)), i || (t = b({ src: t, async: !0 }, e), (e = Ce.get(u)) && or(t, e), i = n.createElement("script"), Zt(i), Ft(i, "link", t), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(u, i));
    }
  }
  function rp(t, e) {
    hn.M(t, e);
    var n = Pl;
    if (n && t) {
      var l = bl(n).hoistableScripts, u = ta(t), i = l.get(u);
      i || (i = n.querySelector(au(u)), i || (t = b({ src: t, async: !0, type: "module" }, e), (e = Ce.get(u)) && or(t, e), i = n.createElement("script"), Zt(i), Ft(i, "link", t), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(u, i));
    }
  }
  function Bm(t, e, n, l) {
    var u = (u = ut.current) ? Si(u) : null;
    if (!u) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (e = Il(n.href), n = bl(
          u
        ).hoistableStyles, l = n.get(e), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = Il(n.href);
          var i = bl(
            u
          ).hoistableStyles, s = i.get(t);
          if (s || (u = u.ownerDocument || u, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(t, s), (i = u.querySelector(
            lu(t)
          )) && !i._p && (s.instance = i, s.state.loading = 5), Ce.has(t) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Ce.set(t, n), i || sp(
            u,
            t,
            n,
            s.state
          ))), e && l === null)
            throw Error(o(528, ""));
          return s;
        }
        if (e && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = ta(n), n = bl(
          u
        ).hoistableScripts, l = n.get(e), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function Il(t) {
    return 'href="' + Te(t) + '"';
  }
  function lu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function jm(t) {
    return b({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function sp(t, e, n, l) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? l.loading = 1 : (e = t.createElement("link"), l.preload = e, e.addEventListener("load", function() {
      return l.loading |= 1;
    }), e.addEventListener("error", function() {
      return l.loading |= 2;
    }), Ft(e, "link", n), Zt(e), t.head.appendChild(e));
  }
  function ta(t) {
    return '[src="' + Te(t) + '"]';
  }
  function au(t) {
    return "script[async]" + t;
  }
  function Lm(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + Te(n.href) + '"]'
          );
          if (l)
            return e.instance = l, Zt(l), l;
          var u = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), Zt(l), Ft(l, "style", u), xi(l, n.precedence, t), e.instance = l;
        case "stylesheet":
          u = Il(n.href);
          var i = t.querySelector(
            lu(u)
          );
          if (i)
            return e.state.loading |= 4, e.instance = i, Zt(i), i;
          l = jm(n), (u = Ce.get(u)) && cr(l, u), i = (t.ownerDocument || t).createElement("link"), Zt(i);
          var s = i;
          return s._p = new Promise(function(m, p) {
            s.onload = m, s.onerror = p;
          }), Ft(i, "link", l), e.state.loading |= 4, xi(i, n.precedence, t), e.instance = i;
        case "script":
          return i = ta(n.src), (u = t.querySelector(
            au(i)
          )) ? (e.instance = u, Zt(u), u) : (l = n, (u = Ce.get(i)) && (l = b({}, n), or(l, u)), t = t.ownerDocument || t, u = t.createElement("script"), Zt(u), Ft(u, "link", l), t.head.appendChild(u), e.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, xi(l, n.precedence, t));
    return e.instance;
  }
  function xi(t, e, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, i = u, s = 0; s < l.length; s++) {
      var m = l[s];
      if (m.dataset.precedence === e) i = m;
      else if (i !== u) break;
    }
    i ? i.parentNode.insertBefore(t, i.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function cr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function or(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ei = null;
  function Ym(t, e, n) {
    if (Ei === null) {
      var l = /* @__PURE__ */ new Map(), u = Ei = /* @__PURE__ */ new Map();
      u.set(n, l);
    } else
      u = Ei, l = u.get(n), l || (l = /* @__PURE__ */ new Map(), u.set(n, l));
    if (l.has(t)) return l;
    for (l.set(t, null), n = n.getElementsByTagName(t), u = 0; u < n.length; u++) {
      var i = n[u];
      if (!(i[ya] || i[It] || t === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(e) || "";
        s = t + s;
        var m = l.get(s);
        m ? m.push(i) : l.set(s, [i]);
      }
    }
    return l;
  }
  function qm(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function fp(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function Gm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var uu = null;
  function dp() {
  }
  function mp(t, e, n) {
    if (uu === null) throw Error(o(475));
    var l = uu;
    if (e.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Il(n.href), i = t.querySelector(
          lu(u)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Ai.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = i, Zt(i);
          return;
        }
        i = t.ownerDocument || t, n = jm(n), (u = Ce.get(u)) && cr(n, u), i = i.createElement("link"), Zt(i);
        var s = i;
        s._p = new Promise(function(m, p) {
          s.onload = m, s.onerror = p;
        }), Ft(i, "link", n), e.instance = i;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = Ai.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  function hp() {
    if (uu === null) throw Error(o(475));
    var t = uu;
    return t.stylesheets && t.count === 0 && rr(t, t.stylesheets), 0 < t.count ? function(e) {
      var n = setTimeout(function() {
        if (t.stylesheets && rr(t, t.stylesheets), t.unsuspend) {
          var l = t.unsuspend;
          t.unsuspend = null, l();
        }
      }, 6e4);
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(n);
      };
    } : null;
  }
  function Ai() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) rr(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Ti = null;
  function rr(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Ti = /* @__PURE__ */ new Map(), e.forEach(vp, t), Ti = null, Ai.call(t));
  }
  function vp(t, e) {
    if (!(e.state.loading & 4)) {
      var n = Ti.get(t);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Ti.set(t, n);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < u.length; i++) {
          var s = u[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (n.set(s.dataset.precedence, s), l = s);
        }
        l && n.set(null, l);
      }
      u = e.instance, s = u.getAttribute("data-precedence"), i = n.get(s) || l, i === l && n.set(null, u), n.set(s, u), this.count++, l = Ai.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), i ? i.parentNode.insertBefore(u, i.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), e.state.loading |= 4;
    }
  }
  var iu = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: N,
    _currentValue2: N,
    _threadCount: 0
  };
  function gp(t, e, n, l, u, i, s, m) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ac(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ac(0), this.hiddenUpdates = ac(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Xm(t, e, n, l, u, i, s, m, p, M, H, Y) {
    return t = new gp(
      t,
      e,
      n,
      s,
      m,
      p,
      M,
      Y
    ), e = 1, i === !0 && (e |= 24), i = me(3, null, null, e), t.current = i, i.stateNode = t, e = Vc(), e.refCount++, t.pooledCache = e, e.refCount++, i.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: e
    }, Kc(i), t;
  }
  function Vm(t) {
    return t ? (t = Cl, t) : Cl;
  }
  function Qm(t, e, n, l, u, i) {
    u = Vm(u), l.context === null ? l.context = u : l.pendingContext = u, l = An(e), l.payload = { element: n }, i = i === void 0 ? null : i, i !== null && (l.callback = i), n = Tn(t, l, e), n !== null && (pe(n, t, e), Ba(n, t, e));
  }
  function Zm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function sr(t, e) {
    Zm(t, e), (t = t.alternate) && Zm(t, e);
  }
  function km(t) {
    if (t.tag === 13) {
      var e = _l(t, 67108864);
      e !== null && pe(e, t, 67108864), sr(t, 67108864);
    }
  }
  var wi = !0;
  function yp(t, e, n, l) {
    var u = _.T;
    _.T = null;
    var i = V.p;
    try {
      V.p = 2, fr(t, e, n, l);
    } finally {
      V.p = i, _.T = u;
    }
  }
  function pp(t, e, n, l) {
    var u = _.T;
    _.T = null;
    var i = V.p;
    try {
      V.p = 8, fr(t, e, n, l);
    } finally {
      V.p = i, _.T = u;
    }
  }
  function fr(t, e, n, l) {
    if (wi) {
      var u = dr(l);
      if (u === null)
        Po(
          t,
          e,
          l,
          Oi,
          n
        ), Jm(t, l);
      else if (Sp(
        u,
        t,
        e,
        n,
        l
      ))
        l.stopPropagation();
      else if (Jm(t, l), e & 4 && -1 < bp.indexOf(t)) {
        for (; u !== null; ) {
          var i = pl(u);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var s = Jn(i.pendingLanes);
                  if (s !== 0) {
                    var m = i;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; s; ) {
                      var p = 1 << 31 - fe(s);
                      m.entanglements[1] |= p, s &= ~p;
                    }
                    ke(i), (Ot & 6) === 0 && (ri = Ee() + 500, Ia(0));
                  }
                }
                break;
              case 13:
                m = _l(i, 2), m !== null && pe(m, i, 2), fi(), sr(i, 2);
            }
          if (i = dr(l), i === null && Po(
            t,
            e,
            l,
            Oi,
            n
          ), i === u) break;
          u = i;
        }
        u !== null && l.stopPropagation();
      } else
        Po(
          t,
          e,
          l,
          null,
          n
        );
    }
  }
  function dr(t) {
    return t = gc(t), mr(t);
  }
  var Oi = null;
  function mr(t) {
    if (Oi = null, t = yl(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = h(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Oi = t, null;
  }
  function Km(t) {
    switch (t) {
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
        switch (lc()) {
          case Kn:
            return 2;
          case cs:
            return 8;
          case pu:
          case ug:
            return 32;
          case os:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hr = !1, jn = null, Ln = null, Yn = null, cu = /* @__PURE__ */ new Map(), ou = /* @__PURE__ */ new Map(), qn = [], bp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Jm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        jn = null;
        break;
      case "dragenter":
      case "dragleave":
        Ln = null;
        break;
      case "mouseover":
      case "mouseout":
        Yn = null;
        break;
      case "pointerover":
      case "pointerout":
        cu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ou.delete(e.pointerId);
    }
  }
  function ru(t, e, n, l, u, i) {
    return t === null || t.nativeEvent !== i ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: i,
      targetContainers: [u]
    }, e !== null && (e = pl(e), e !== null && km(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, u !== null && e.indexOf(u) === -1 && e.push(u), t);
  }
  function Sp(t, e, n, l, u) {
    switch (e) {
      case "focusin":
        return jn = ru(
          jn,
          t,
          e,
          n,
          l,
          u
        ), !0;
      case "dragenter":
        return Ln = ru(
          Ln,
          t,
          e,
          n,
          l,
          u
        ), !0;
      case "mouseover":
        return Yn = ru(
          Yn,
          t,
          e,
          n,
          l,
          u
        ), !0;
      case "pointerover":
        var i = u.pointerId;
        return cu.set(
          i,
          ru(
            cu.get(i) || null,
            t,
            e,
            n,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return i = u.pointerId, ou.set(
          i,
          ru(
            ou.get(i) || null,
            t,
            e,
            n,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Wm(t) {
    var e = yl(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, mg(t.priority, function() {
              if (n.tag === 13) {
                var l = ye();
                l = uc(l);
                var u = _l(n, l);
                u !== null && pe(u, n, l), sr(n, l);
              }
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ri(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = dr(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        vc = l, n.target.dispatchEvent(l), vc = null;
      } else
        return e = pl(n), e !== null && km(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function $m(t, e, n) {
    Ri(t) && n.delete(e);
  }
  function xp() {
    hr = !1, jn !== null && Ri(jn) && (jn = null), Ln !== null && Ri(Ln) && (Ln = null), Yn !== null && Ri(Yn) && (Yn = null), cu.forEach($m), ou.forEach($m);
  }
  function Mi(t, e) {
    t.blockedOn === e && (t.blockedOn = null, hr || (hr = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      xp
    )));
  }
  var Di = null;
  function Fm(t) {
    Di !== t && (Di = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Di === t && (Di = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], l = t[e + 1], u = t[e + 2];
          if (typeof l != "function") {
            if (mr(l || n) === null)
              continue;
            break;
          }
          var i = pl(n);
          i !== null && (t.splice(e, 3), e -= 3, mo(
            i,
            {
              pending: !0,
              data: u,
              method: n.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function su(t) {
    function e(p) {
      return Mi(p, t);
    }
    jn !== null && Mi(jn, t), Ln !== null && Mi(Ln, t), Yn !== null && Mi(Yn, t), cu.forEach(e), ou.forEach(e);
    for (var n = 0; n < qn.length; n++) {
      var l = qn[n];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < qn.length && (n = qn[0], n.blockedOn === null); )
      Wm(n), n.blockedOn === null && qn.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var u = n[l], i = n[l + 1], s = u[le] || null;
        if (typeof i == "function")
          s || Fm(n);
        else if (s) {
          var m = null;
          if (i && i.hasAttribute("formAction")) {
            if (u = i, s = i[le] || null)
              m = s.formAction;
            else if (mr(u) !== null) continue;
          } else m = s.action;
          typeof m == "function" ? n[l + 1] = m : (n.splice(l, 3), l -= 3), Fm(n);
        }
      }
  }
  function vr(t) {
    this._internalRoot = t;
  }
  _i.prototype.render = vr.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(o(409));
    var n = e.current, l = ye();
    Qm(n, l, t, e, null, null);
  }, _i.prototype.unmount = vr.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Qm(t.current, 2, null, t, null, null), fi(), e[gl] = null;
    }
  };
  function _i(t) {
    this._internalRoot = t;
  }
  _i.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = ms();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < qn.length && e !== 0 && e < qn[n].priority; n++) ;
      qn.splice(n, 0, t), n === 0 && Wm(t);
    }
  };
  var Pm = c.version;
  if (Pm !== "19.1.0")
    throw Error(
      o(
        527,
        Pm,
        "19.1.0"
      )
    );
  V.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = y(e), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Ep = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ci = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ci.isDisabled && Ci.supportsFiber)
      try {
        ha = Ci.inject(
          Ep
        ), se = Ci;
      } catch {
      }
  }
  return du.createRoot = function(t, e) {
    if (!f(t)) throw Error(o(299));
    var n = !1, l = "", u = hd, i = vd, s = gd, m = null;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (m = e.unstable_transitionCallbacks)), e = Xm(
      t,
      1,
      !1,
      null,
      null,
      n,
      l,
      u,
      i,
      s,
      m,
      null
    ), t[gl] = e.current, Fo(t), new vr(e);
  }, du.hydrateRoot = function(t, e, n) {
    if (!f(t)) throw Error(o(299));
    var l = !1, u = "", i = hd, s = vd, m = gd, p = null, M = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (i = n.onUncaughtError), n.onCaughtError !== void 0 && (s = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (p = n.unstable_transitionCallbacks), n.formState !== void 0 && (M = n.formState)), e = Xm(
      t,
      1,
      !0,
      e,
      n ?? null,
      l,
      u,
      i,
      s,
      m,
      p,
      M
    ), e.context = Vm(null), n = e.current, l = ye(), l = uc(l), u = An(l), u.callback = null, Tn(n, u, l), n = l, e.current.lanes = n, ga(e, n), ke(e), t[gl] = e.current, Fo(t), new _i(e);
  }, du.version = "19.1.0", du;
}
var oh;
function Np() {
  if (oh) return pr.exports;
  oh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return a(), pr.exports = zp(), pr.exports;
}
var Up = Np();
function rh(a, c) {
  if (typeof a == "function")
    return a(c);
  a != null && (a.current = c);
}
function qh(...a) {
  return (c) => {
    let r = !1;
    const o = a.map((f) => {
      const d = rh(f, c);
      return !r && typeof d == "function" && (r = !0), d;
    });
    if (r)
      return () => {
        for (let f = 0; f < o.length; f++) {
          const d = o[f];
          typeof d == "function" ? d() : rh(a[f], null);
        }
      };
  };
}
function qe(...a) {
  return x.useCallback(qh(...a), a);
}
// @__NO_SIDE_EFFECTS__
function Gh(a) {
  const c = /* @__PURE__ */ Hp(a), r = x.forwardRef((o, f) => {
    const { children: d, ...h } = o, g = x.Children.toArray(d), y = g.find(jp);
    if (y) {
      const v = y.props.children, b = g.map((A) => A === y ? x.Children.count(v) > 1 ? x.Children.only(null) : x.isValidElement(v) ? v.props.children : null : A);
      return /* @__PURE__ */ X.jsx(c, { ...h, ref: f, children: x.isValidElement(v) ? x.cloneElement(v, void 0, b) : null });
    }
    return /* @__PURE__ */ X.jsx(c, { ...h, ref: f, children: d });
  });
  return r.displayName = `${a}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function Hp(a) {
  const c = x.forwardRef((r, o) => {
    const { children: f, ...d } = r;
    if (x.isValidElement(f)) {
      const h = Yp(f), g = Lp(d, f.props);
      return f.type !== x.Fragment && (g.ref = o ? qh(o, h) : h), x.cloneElement(f, g);
    }
    return x.Children.count(f) > 1 ? x.Children.only(null) : null;
  });
  return c.displayName = `${a}.SlotClone`, c;
}
var Xh = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Bp(a) {
  const c = ({ children: r }) => /* @__PURE__ */ X.jsx(X.Fragment, { children: r });
  return c.displayName = `${a}.Slottable`, c.__radixId = Xh, c;
}
function jp(a) {
  return x.isValidElement(a) && typeof a.type == "function" && "__radixId" in a.type && a.type.__radixId === Xh;
}
function Lp(a, c) {
  const r = { ...c };
  for (const o in c) {
    const f = a[o], d = c[o];
    /^on[A-Z]/.test(o) ? f && d ? r[o] = (...g) => {
      const y = d(...g);
      return f(...g), y;
    } : f && (r[o] = f) : o === "style" ? r[o] = { ...f, ...d } : o === "className" && (r[o] = [f, d].filter(Boolean).join(" "));
  }
  return { ...a, ...r };
}
function Yp(a) {
  var o, f;
  let c = (o = Object.getOwnPropertyDescriptor(a.props, "ref")) == null ? void 0 : o.get, r = c && "isReactWarning" in c && c.isReactWarning;
  return r ? a.ref : (c = (f = Object.getOwnPropertyDescriptor(a, "ref")) == null ? void 0 : f.get, r = c && "isReactWarning" in c && c.isReactWarning, r ? a.props.ref : a.props.ref || a.ref);
}
function Vh(a) {
  var c, r, o = "";
  if (typeof a == "string" || typeof a == "number") o += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var f = a.length;
    for (c = 0; c < f; c++) a[c] && (r = Vh(a[c])) && (o && (o += " "), o += r);
  } else for (r in a) a[r] && (o && (o += " "), o += r);
  return o;
}
function qp() {
  for (var a, c, r = 0, o = "", f = arguments.length; r < f; r++) (a = arguments[r]) && (c = Vh(a)) && (o && (o += " "), o += c);
  return o;
}
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gp = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Xp = (a) => a.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (c, r, o) => o ? o.toUpperCase() : r.toLowerCase()
), sh = (a) => {
  const c = Xp(a);
  return c.charAt(0).toUpperCase() + c.slice(1);
}, Qh = (...a) => a.filter((c, r, o) => !!c && c.trim() !== "" && o.indexOf(c) === r).join(" ").trim(), Vp = (a) => {
  for (const c in a)
    if (c.startsWith("aria-") || c === "role" || c === "title")
      return !0;
};
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Qp = {
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
const Zp = x.forwardRef(
  ({
    color: a = "currentColor",
    size: c = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: o,
    className: f = "",
    children: d,
    iconNode: h,
    ...g
  }, y) => x.createElement(
    "svg",
    {
      ref: y,
      ...Qp,
      width: c,
      height: c,
      stroke: a,
      strokeWidth: o ? Number(r) * 24 / Number(c) : r,
      className: Qh("lucide", f),
      ...!d && !Vp(g) && { "aria-hidden": "true" },
      ...g
    },
    [
      ...h.map(([v, b]) => x.createElement(v, b)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kp = (a, c) => {
  const r = x.forwardRef(
    ({ className: o, ...f }, d) => x.createElement(Zp, {
      ref: d,
      iconNode: c,
      className: Qh(
        `lucide-${Gp(sh(a))}`,
        `lucide-${a}`,
        o
      ),
      ...f
    })
  );
  return r.displayName = sh(a), r;
};
/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kp = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Jp = kp("x", Kp), Er = 768;
function Wp() {
  const [a, c] = x.useState(void 0);
  return x.useEffect(() => {
    const r = window.matchMedia(`(max-width: ${Er - 1}px)`), o = () => {
      c(window.innerWidth < Er);
    };
    return r.addEventListener("change", o), c(window.innerWidth < Er), () => r.removeEventListener("change", o);
  }, []), !!a;
}
const Zr = "-", $p = (a) => {
  const c = Pp(a), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: o
  } = a;
  return {
    getClassGroupId: (h) => {
      const g = h.split(Zr);
      return g[0] === "" && g.length !== 1 && g.shift(), Zh(g, c) || Fp(h);
    },
    getConflictingClassGroupIds: (h, g) => {
      const y = r[h] || [];
      return g && o[h] ? [...y, ...o[h]] : y;
    }
  };
}, Zh = (a, c) => {
  var h;
  if (a.length === 0)
    return c.classGroupId;
  const r = a[0], o = c.nextPart.get(r), f = o ? Zh(a.slice(1), o) : void 0;
  if (f)
    return f;
  if (c.validators.length === 0)
    return;
  const d = a.join(Zr);
  return (h = c.validators.find(({
    validator: g
  }) => g(d))) == null ? void 0 : h.classGroupId;
}, fh = /^\[(.+)\]$/, Fp = (a) => {
  if (fh.test(a)) {
    const c = fh.exec(a)[1], r = c == null ? void 0 : c.substring(0, c.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, Pp = (a) => {
  const {
    theme: c,
    classGroups: r
  } = a, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const f in r)
    Hr(r[f], o, f, c);
  return o;
}, Hr = (a, c, r, o) => {
  a.forEach((f) => {
    if (typeof f == "string") {
      const d = f === "" ? c : dh(c, f);
      d.classGroupId = r;
      return;
    }
    if (typeof f == "function") {
      if (Ip(f)) {
        Hr(f(o), c, r, o);
        return;
      }
      c.validators.push({
        validator: f,
        classGroupId: r
      });
      return;
    }
    Object.entries(f).forEach(([d, h]) => {
      Hr(h, dh(c, d), r, o);
    });
  });
}, dh = (a, c) => {
  let r = a;
  return c.split(Zr).forEach((o) => {
    r.nextPart.has(o) || r.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(o);
  }), r;
}, Ip = (a) => a.isThemeGetter, t0 = (a) => {
  if (a < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let c = 0, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const f = (d, h) => {
    r.set(d, h), c++, c > a && (c = 0, o = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(d) {
      let h = r.get(d);
      if (h !== void 0)
        return h;
      if ((h = o.get(d)) !== void 0)
        return f(d, h), h;
    },
    set(d, h) {
      r.has(d) ? r.set(d, h) : f(d, h);
    }
  };
}, Br = "!", jr = ":", e0 = jr.length, n0 = (a) => {
  const {
    prefix: c,
    experimentalParseClassName: r
  } = a;
  let o = (f) => {
    const d = [];
    let h = 0, g = 0, y = 0, v;
    for (let U = 0; U < f.length; U++) {
      let R = f[U];
      if (h === 0 && g === 0) {
        if (R === jr) {
          d.push(f.slice(y, U)), y = U + e0;
          continue;
        }
        if (R === "/") {
          v = U;
          continue;
        }
      }
      R === "[" ? h++ : R === "]" ? h-- : R === "(" ? g++ : R === ")" && g--;
    }
    const b = d.length === 0 ? f : f.substring(y), A = l0(b), O = A !== b, z = v && v > y ? v - y : void 0;
    return {
      modifiers: d,
      hasImportantModifier: O,
      baseClassName: A,
      maybePostfixModifierPosition: z
    };
  };
  if (c) {
    const f = c + jr, d = o;
    o = (h) => h.startsWith(f) ? d(h.substring(f.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: h,
      maybePostfixModifierPosition: void 0
    };
  }
  if (r) {
    const f = o;
    o = (d) => r({
      className: d,
      parseClassName: f
    });
  }
  return o;
}, l0 = (a) => a.endsWith(Br) ? a.substring(0, a.length - 1) : a.startsWith(Br) ? a.substring(1) : a, a0 = (a) => {
  const c = Object.fromEntries(a.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const f = [];
    let d = [];
    return o.forEach((h) => {
      h[0] === "[" || c[h] ? (f.push(...d.sort(), h), d = []) : d.push(h);
    }), f.push(...d.sort()), f;
  };
}, u0 = (a) => ({
  cache: t0(a.cacheSize),
  parseClassName: n0(a),
  sortModifiers: a0(a),
  ...$p(a)
}), i0 = /\s+/, c0 = (a, c) => {
  const {
    parseClassName: r,
    getClassGroupId: o,
    getConflictingClassGroupIds: f,
    sortModifiers: d
  } = c, h = [], g = a.trim().split(i0);
  let y = "";
  for (let v = g.length - 1; v >= 0; v -= 1) {
    const b = g[v], {
      isExternal: A,
      modifiers: O,
      hasImportantModifier: z,
      baseClassName: U,
      maybePostfixModifierPosition: R
    } = r(b);
    if (A) {
      y = b + (y.length > 0 ? " " + y : y);
      continue;
    }
    let B = !!R, L = o(B ? U.substring(0, R) : U);
    if (!L) {
      if (!B) {
        y = b + (y.length > 0 ? " " + y : y);
        continue;
      }
      if (L = o(U), !L) {
        y = b + (y.length > 0 ? " " + y : y);
        continue;
      }
      B = !1;
    }
    const Q = d(O).join(":"), k = z ? Q + Br : Q, J = k + L;
    if (h.includes(J))
      continue;
    h.push(J);
    const G = f(L, B);
    for (let et = 0; et < G.length; ++et) {
      const W = G[et];
      h.push(k + W);
    }
    y = b + (y.length > 0 ? " " + y : y);
  }
  return y;
};
function o0() {
  let a = 0, c, r, o = "";
  for (; a < arguments.length; )
    (c = arguments[a++]) && (r = kh(c)) && (o && (o += " "), o += r);
  return o;
}
const kh = (a) => {
  if (typeof a == "string")
    return a;
  let c, r = "";
  for (let o = 0; o < a.length; o++)
    a[o] && (c = kh(a[o])) && (r && (r += " "), r += c);
  return r;
};
function r0(a, ...c) {
  let r, o, f, d = h;
  function h(y) {
    const v = c.reduce((b, A) => A(b), a());
    return r = u0(v), o = r.cache.get, f = r.cache.set, d = g, g(y);
  }
  function g(y) {
    const v = o(y);
    if (v)
      return v;
    const b = c0(y, r);
    return f(y, b), b;
  }
  return function() {
    return d(o0.apply(null, arguments));
  };
}
const Qt = (a) => {
  const c = (r) => r[a] || [];
  return c.isThemeGetter = !0, c;
}, Kh = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Jh = /^\((?:(\w[\w-]*):)?(.+)\)$/i, s0 = /^\d+\/\d+$/, f0 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, d0 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, m0 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, h0 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, v0 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ea = (a) => s0.test(a), dt = (a) => !!a && !Number.isNaN(Number(a)), Xn = (a) => !!a && Number.isInteger(Number(a)), Ar = (a) => a.endsWith("%") && dt(a.slice(0, -1)), vn = (a) => f0.test(a), g0 = () => !0, y0 = (a) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  d0.test(a) && !m0.test(a)
), Wh = () => !1, p0 = (a) => h0.test(a), b0 = (a) => v0.test(a), S0 = (a) => !I(a) && !tt(a), x0 = (a) => sa(a, Ph, Wh), I = (a) => Kh.test(a), dl = (a) => sa(a, Ih, y0), Tr = (a) => sa(a, O0, dt), mh = (a) => sa(a, $h, Wh), E0 = (a) => sa(a, Fh, b0), zi = (a) => sa(a, tv, p0), tt = (a) => Jh.test(a), mu = (a) => fa(a, Ih), A0 = (a) => fa(a, R0), hh = (a) => fa(a, $h), T0 = (a) => fa(a, Ph), w0 = (a) => fa(a, Fh), Ni = (a) => fa(a, tv, !0), sa = (a, c, r) => {
  const o = Kh.exec(a);
  return o ? o[1] ? c(o[1]) : r(o[2]) : !1;
}, fa = (a, c, r = !1) => {
  const o = Jh.exec(a);
  return o ? o[1] ? c(o[1]) : r : !1;
}, $h = (a) => a === "position" || a === "percentage", Fh = (a) => a === "image" || a === "url", Ph = (a) => a === "length" || a === "size" || a === "bg-size", Ih = (a) => a === "length", O0 = (a) => a === "number", R0 = (a) => a === "family-name", tv = (a) => a === "shadow", M0 = () => {
  const a = Qt("color"), c = Qt("font"), r = Qt("text"), o = Qt("font-weight"), f = Qt("tracking"), d = Qt("leading"), h = Qt("breakpoint"), g = Qt("container"), y = Qt("spacing"), v = Qt("radius"), b = Qt("shadow"), A = Qt("inset-shadow"), O = Qt("text-shadow"), z = Qt("drop-shadow"), U = Qt("blur"), R = Qt("perspective"), B = Qt("aspect"), L = Qt("ease"), Q = Qt("animate"), k = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], J = () => [
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
  ], G = () => [...J(), tt, I], et = () => ["auto", "hidden", "clip", "visible", "scroll"], W = () => ["auto", "contain", "none"], K = () => [tt, I, y], ot = () => [ea, "full", "auto", ...K()], xt = () => [Xn, "none", "subgrid", tt, I], Mt = () => ["auto", {
    span: ["full", Xn, tt, I]
  }, Xn, tt, I], ht = () => [Xn, "auto", tt, I], Tt = () => ["auto", "min", "max", "fr", tt, I], St = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], vt = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], _ = () => ["auto", ...K()], V = () => [ea, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...K()], N = () => [a, tt, I], ct = () => [...J(), hh, mh, {
    position: [tt, I]
  }], S = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], q = () => ["auto", "cover", "contain", T0, x0, {
    size: [tt, I]
  }], $ = () => [Ar, mu, dl], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    v,
    tt,
    I
  ], F = () => ["", dt, mu, dl], st = () => ["solid", "dashed", "dotted", "double"], ut = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], pt = () => [dt, Ar, hh, mh], wt = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    U,
    tt,
    I
  ], Pt = () => ["none", dt, tt, I], ze = () => ["none", dt, tt, I], Ne = () => [dt, tt, I], Ue = () => [ea, "full", ...K()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [vn],
      breakpoint: [vn],
      color: [g0],
      container: [vn],
      "drop-shadow": [vn],
      ease: ["in", "out", "in-out"],
      font: [S0],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [vn],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [vn],
      shadow: [vn],
      spacing: ["px", dt],
      text: [vn],
      "text-shadow": [vn],
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
        aspect: ["auto", "square", ea, I, tt, B]
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
        columns: [dt, I, tt, g]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": k()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": k()
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
        object: G()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: et()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": et()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": et()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: W()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": W()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": W()
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
        inset: ot()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": ot()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": ot()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: ot()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: ot()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: ot()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: ot()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: ot()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: ot()
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
        z: [Xn, "auto", tt, I]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ea, "full", "auto", g, ...K()]
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
        flex: [dt, ea, "auto", "initial", "none", I]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", dt, tt, I]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", dt, tt, I]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Xn, "first", "last", "none", tt, I]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": xt()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: Mt()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ht()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ht()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": xt()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: Mt()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ht()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ht()
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
        "auto-cols": Tt()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Tt()
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
        justify: [...St(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...vt(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...vt()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...St()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...vt(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...vt(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": St()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...vt(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...vt()]
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
        m: _()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: _()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: _()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: _()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: _()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: _()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: _()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: _()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: _()
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
        size: V()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [g, "screen", ...V()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          g,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...V()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          g,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [h]
          },
          ...V()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...V()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...V()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...V()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, mu, dl]
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
        font: [o, tt, Tr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ar, I]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [A0, I, c]
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
        tracking: [f, tt, I]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [dt, "none", tt, Tr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          d,
          ...K()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", tt, I]
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
        list: ["disc", "decimal", "none", tt, I]
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
        placeholder: N()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: N()
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
        decoration: [...st(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [dt, "from-font", "auto", tt, dl]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: N()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [dt, "auto", tt, I]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", tt, I]
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
        content: ["none", tt, I]
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
        bg: ct()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: S()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: q()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Xn, tt, I],
          radial: ["", tt, I],
          conic: [Xn, tt, I]
        }, w0, E0]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: N()
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
        from: N()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: N()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: N()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Z()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Z()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Z()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Z()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Z()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Z()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Z()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Z()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Z()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Z()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Z()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Z()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Z()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Z()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Z()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: F()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": F()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": F()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": F()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": F()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": F()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": F()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": F()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": F()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": F()
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
        "divide-y": F()
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
        border: [...st(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...st(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: N()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": N()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": N()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": N()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": N()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": N()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": N()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": N()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": N()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: N()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...st(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [dt, tt, I]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", dt, mu, dl]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: N()
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
          Ni,
          zi
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: N()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", A, Ni, zi]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": N()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: F()
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
        ring: N()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [dt, dl]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": N()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": F()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": N()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", O, Ni, zi]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": N()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [dt, tt, I]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ut(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ut()
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
        "mask-linear": [dt]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": pt()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": pt()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": N()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": pt()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": pt()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": N()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": pt()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": pt()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": N()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": pt()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": pt()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": N()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": pt()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": pt()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": N()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": pt()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": pt()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": N()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": pt()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": pt()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": N()
      }],
      "mask-image-radial": [{
        "mask-radial": [tt, I]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": pt()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": pt()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": N()
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
        "mask-radial-at": J()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [dt]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": pt()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": pt()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": N()
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
        mask: ct()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: S()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: q()
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
        mask: ["none", tt, I]
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
          tt,
          I
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: wt()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [dt, tt, I]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [dt, tt, I]
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
          z,
          Ni,
          zi
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": N()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", dt, tt, I]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [dt, tt, I]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", dt, tt, I]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [dt, tt, I]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", dt, tt, I]
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
          tt,
          I
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": wt()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [dt, tt, I]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [dt, tt, I]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", dt, tt, I]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [dt, tt, I]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", dt, tt, I]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [dt, tt, I]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [dt, tt, I]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", dt, tt, I]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", tt, I]
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
        duration: [dt, "initial", tt, I]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", L, tt, I]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [dt, tt, I]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", Q, tt, I]
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
        perspective: [R, tt, I]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": G()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Pt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Pt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Pt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Pt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ze()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ze()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ze()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ze()
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
        skew: Ne()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ne()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ne()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [tt, I, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: G()
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
        translate: Ue()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Ue()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Ue()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Ue()
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
        accent: N()
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
        caret: N()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", tt, I]
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
        "will-change": ["auto", "scroll", "contents", "transform", tt, I]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...N()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [dt, mu, dl, Tr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...N()]
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
}, D0 = /* @__PURE__ */ r0(M0);
function Se(...a) {
  return D0(qp(a));
}
var kr = Yh();
const _0 = /* @__PURE__ */ jh(kr);
var C0 = [
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
], re = C0.reduce((a, c) => {
  const r = /* @__PURE__ */ Gh(`Primitive.${c}`), o = x.forwardRef((f, d) => {
    const { asChild: h, ...g } = f, y = h ? r : c;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ X.jsx(y, { ...g, ref: d });
  });
  return o.displayName = `Primitive.${c}`, { ...a, [c]: o };
}, {});
function z0(a, c) {
  a && kr.flushSync(() => a.dispatchEvent(c));
}
function oe(a, c, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(f) {
    if (a == null || a(f), r === !1 || !f.defaultPrevented)
      return c == null ? void 0 : c(f);
  };
}
function N0(a, c) {
  const r = x.createContext(c), o = (d) => {
    const { children: h, ...g } = d, y = x.useMemo(() => g, Object.values(g));
    return /* @__PURE__ */ X.jsx(r.Provider, { value: y, children: h });
  };
  o.displayName = a + "Provider";
  function f(d) {
    const h = x.useContext(r);
    if (h) return h;
    if (c !== void 0) return c;
    throw new Error(`\`${d}\` must be used within \`${a}\``);
  }
  return [o, f];
}
function Kr(a, c = []) {
  let r = [];
  function o(d, h) {
    const g = x.createContext(h), y = r.length;
    r = [...r, h];
    const v = (A) => {
      var L;
      const { scope: O, children: z, ...U } = A, R = ((L = O == null ? void 0 : O[a]) == null ? void 0 : L[y]) || g, B = x.useMemo(() => U, Object.values(U));
      return /* @__PURE__ */ X.jsx(R.Provider, { value: B, children: z });
    };
    v.displayName = d + "Provider";
    function b(A, O) {
      var R;
      const z = ((R = O == null ? void 0 : O[a]) == null ? void 0 : R[y]) || g, U = x.useContext(z);
      if (U) return U;
      if (h !== void 0) return h;
      throw new Error(`\`${A}\` must be used within \`${d}\``);
    }
    return [v, b];
  }
  const f = () => {
    const d = r.map((h) => x.createContext(h));
    return function(g) {
      const y = (g == null ? void 0 : g[a]) || d;
      return x.useMemo(
        () => ({ [`__scope${a}`]: { ...g, [a]: y } }),
        [g, y]
      );
    };
  };
  return f.scopeName = a, [o, U0(f, ...c)];
}
function U0(...a) {
  const c = a[0];
  if (a.length === 1) return c;
  const r = () => {
    const o = a.map((f) => ({
      useScope: f(),
      scopeName: f.scopeName
    }));
    return function(d) {
      const h = o.reduce((g, { useScope: y, scopeName: v }) => {
        const A = y(d)[`__scope${v}`];
        return { ...g, ...A };
      }, {});
      return x.useMemo(() => ({ [`__scope${c.scopeName}`]: h }), [h]);
    };
  };
  return r.scopeName = c.scopeName, r;
}
var Qn = globalThis != null && globalThis.document ? x.useLayoutEffect : () => {
}, H0 = Lh[" useId ".trim().toString()] || (() => {
}), B0 = 0;
function wr(a) {
  const [c, r] = x.useState(H0());
  return Qn(() => {
    r((o) => o ?? String(B0++));
  }, [a]), a || (c ? `radix-${c}` : "");
}
var j0 = Lh[" useInsertionEffect ".trim().toString()] || Qn;
function L0({
  prop: a,
  defaultProp: c,
  onChange: r = () => {
  },
  caller: o
}) {
  const [f, d, h] = Y0({
    defaultProp: c,
    onChange: r
  }), g = a !== void 0, y = g ? a : f;
  {
    const b = x.useRef(a !== void 0);
    x.useEffect(() => {
      const A = b.current;
      A !== g && console.warn(
        `${o} is changing from ${A ? "controlled" : "uncontrolled"} to ${g ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), b.current = g;
    }, [g, o]);
  }
  const v = x.useCallback(
    (b) => {
      var A;
      if (g) {
        const O = q0(b) ? b(a) : b;
        O !== a && ((A = h.current) == null || A.call(h, O));
      } else
        d(b);
    },
    [g, a, d, h]
  );
  return [y, v];
}
function Y0({
  defaultProp: a,
  onChange: c
}) {
  const [r, o] = x.useState(a), f = x.useRef(r), d = x.useRef(c);
  return j0(() => {
    d.current = c;
  }, [c]), x.useEffect(() => {
    var h;
    f.current !== r && ((h = d.current) == null || h.call(d, r), f.current = r);
  }, [r, f]), [r, o, d];
}
function q0(a) {
  return typeof a == "function";
}
function ca(a) {
  const c = x.useRef(a);
  return x.useEffect(() => {
    c.current = a;
  }), x.useMemo(() => (...r) => {
    var o;
    return (o = c.current) == null ? void 0 : o.call(c, ...r);
  }, []);
}
function G0(a, c = globalThis == null ? void 0 : globalThis.document) {
  const r = ca(a);
  x.useEffect(() => {
    const o = (f) => {
      f.key === "Escape" && r(f);
    };
    return c.addEventListener("keydown", o, { capture: !0 }), () => c.removeEventListener("keydown", o, { capture: !0 });
  }, [r, c]);
}
var X0 = "DismissableLayer", Lr = "dismissableLayer.update", V0 = "dismissableLayer.pointerDownOutside", Q0 = "dismissableLayer.focusOutside", vh, ev = x.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Jr = x.forwardRef(
  (a, c) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: f,
      onFocusOutside: d,
      onInteractOutside: h,
      onDismiss: g,
      ...y
    } = a, v = x.useContext(ev), [b, A] = x.useState(null), O = (b == null ? void 0 : b.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, z] = x.useState({}), U = qe(c, (W) => A(W)), R = Array.from(v.layers), [B] = [...v.layersWithOutsidePointerEventsDisabled].slice(-1), L = R.indexOf(B), Q = b ? R.indexOf(b) : -1, k = v.layersWithOutsidePointerEventsDisabled.size > 0, J = Q >= L, G = K0((W) => {
      const K = W.target, ot = [...v.branches].some((xt) => xt.contains(K));
      !J || ot || (f == null || f(W), h == null || h(W), W.defaultPrevented || g == null || g());
    }, O), et = J0((W) => {
      const K = W.target;
      [...v.branches].some((xt) => xt.contains(K)) || (d == null || d(W), h == null || h(W), W.defaultPrevented || g == null || g());
    }, O);
    return G0((W) => {
      Q === v.layers.size - 1 && (o == null || o(W), !W.defaultPrevented && g && (W.preventDefault(), g()));
    }, O), x.useEffect(() => {
      if (b)
        return r && (v.layersWithOutsidePointerEventsDisabled.size === 0 && (vh = O.body.style.pointerEvents, O.body.style.pointerEvents = "none"), v.layersWithOutsidePointerEventsDisabled.add(b)), v.layers.add(b), gh(), () => {
          r && v.layersWithOutsidePointerEventsDisabled.size === 1 && (O.body.style.pointerEvents = vh);
        };
    }, [b, O, r, v]), x.useEffect(() => () => {
      b && (v.layers.delete(b), v.layersWithOutsidePointerEventsDisabled.delete(b), gh());
    }, [b, v]), x.useEffect(() => {
      const W = () => z({});
      return document.addEventListener(Lr, W), () => document.removeEventListener(Lr, W);
    }, []), /* @__PURE__ */ X.jsx(
      re.div,
      {
        ...y,
        ref: U,
        style: {
          pointerEvents: k ? J ? "auto" : "none" : void 0,
          ...a.style
        },
        onFocusCapture: oe(a.onFocusCapture, et.onFocusCapture),
        onBlurCapture: oe(a.onBlurCapture, et.onBlurCapture),
        onPointerDownCapture: oe(
          a.onPointerDownCapture,
          G.onPointerDownCapture
        )
      }
    );
  }
);
Jr.displayName = X0;
var Z0 = "DismissableLayerBranch", k0 = x.forwardRef((a, c) => {
  const r = x.useContext(ev), o = x.useRef(null), f = qe(c, o);
  return x.useEffect(() => {
    const d = o.current;
    if (d)
      return r.branches.add(d), () => {
        r.branches.delete(d);
      };
  }, [r.branches]), /* @__PURE__ */ X.jsx(re.div, { ...a, ref: f });
});
k0.displayName = Z0;
function K0(a, c = globalThis == null ? void 0 : globalThis.document) {
  const r = ca(a), o = x.useRef(!1), f = x.useRef(() => {
  });
  return x.useEffect(() => {
    const d = (g) => {
      if (g.target && !o.current) {
        let y = function() {
          nv(
            V0,
            r,
            v,
            { discrete: !0 }
          );
        };
        const v = { originalEvent: g };
        g.pointerType === "touch" ? (c.removeEventListener("click", f.current), f.current = y, c.addEventListener("click", f.current, { once: !0 })) : y();
      } else
        c.removeEventListener("click", f.current);
      o.current = !1;
    }, h = window.setTimeout(() => {
      c.addEventListener("pointerdown", d);
    }, 0);
    return () => {
      window.clearTimeout(h), c.removeEventListener("pointerdown", d), c.removeEventListener("click", f.current);
    };
  }, [c, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => o.current = !0
  };
}
function J0(a, c = globalThis == null ? void 0 : globalThis.document) {
  const r = ca(a), o = x.useRef(!1);
  return x.useEffect(() => {
    const f = (d) => {
      d.target && !o.current && nv(Q0, r, { originalEvent: d }, {
        discrete: !1
      });
    };
    return c.addEventListener("focusin", f), () => c.removeEventListener("focusin", f);
  }, [c, r]), {
    onFocusCapture: () => o.current = !0,
    onBlurCapture: () => o.current = !1
  };
}
function gh() {
  const a = new CustomEvent(Lr);
  document.dispatchEvent(a);
}
function nv(a, c, r, { discrete: o }) {
  const f = r.originalEvent.target, d = new CustomEvent(a, { bubbles: !1, cancelable: !0, detail: r });
  c && f.addEventListener(a, c, { once: !0 }), o ? z0(f, d) : f.dispatchEvent(d);
}
var Or = "focusScope.autoFocusOnMount", Rr = "focusScope.autoFocusOnUnmount", yh = { bubbles: !1, cancelable: !0 }, W0 = "FocusScope", lv = x.forwardRef((a, c) => {
  const {
    loop: r = !1,
    trapped: o = !1,
    onMountAutoFocus: f,
    onUnmountAutoFocus: d,
    ...h
  } = a, [g, y] = x.useState(null), v = ca(f), b = ca(d), A = x.useRef(null), O = qe(c, (R) => y(R)), z = x.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  x.useEffect(() => {
    if (o) {
      let R = function(k) {
        if (z.paused || !g) return;
        const J = k.target;
        g.contains(J) ? A.current = J : Vn(A.current, { select: !0 });
      }, B = function(k) {
        if (z.paused || !g) return;
        const J = k.relatedTarget;
        J !== null && (g.contains(J) || Vn(A.current, { select: !0 }));
      }, L = function(k) {
        if (document.activeElement === document.body)
          for (const G of k)
            G.removedNodes.length > 0 && Vn(g);
      };
      document.addEventListener("focusin", R), document.addEventListener("focusout", B);
      const Q = new MutationObserver(L);
      return g && Q.observe(g, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", R), document.removeEventListener("focusout", B), Q.disconnect();
      };
    }
  }, [o, g, z.paused]), x.useEffect(() => {
    if (g) {
      bh.add(z);
      const R = document.activeElement;
      if (!g.contains(R)) {
        const L = new CustomEvent(Or, yh);
        g.addEventListener(Or, v), g.dispatchEvent(L), L.defaultPrevented || ($0(eb(av(g)), { select: !0 }), document.activeElement === R && Vn(g));
      }
      return () => {
        g.removeEventListener(Or, v), setTimeout(() => {
          const L = new CustomEvent(Rr, yh);
          g.addEventListener(Rr, b), g.dispatchEvent(L), L.defaultPrevented || Vn(R ?? document.body, { select: !0 }), g.removeEventListener(Rr, b), bh.remove(z);
        }, 0);
      };
    }
  }, [g, v, b, z]);
  const U = x.useCallback(
    (R) => {
      if (!r && !o || z.paused) return;
      const B = R.key === "Tab" && !R.altKey && !R.ctrlKey && !R.metaKey, L = document.activeElement;
      if (B && L) {
        const Q = R.currentTarget, [k, J] = F0(Q);
        k && J ? !R.shiftKey && L === J ? (R.preventDefault(), r && Vn(k, { select: !0 })) : R.shiftKey && L === k && (R.preventDefault(), r && Vn(J, { select: !0 })) : L === Q && R.preventDefault();
      }
    },
    [r, o, z.paused]
  );
  return /* @__PURE__ */ X.jsx(re.div, { tabIndex: -1, ...h, ref: O, onKeyDown: U });
});
lv.displayName = W0;
function $0(a, { select: c = !1 } = {}) {
  const r = document.activeElement;
  for (const o of a)
    if (Vn(o, { select: c }), document.activeElement !== r) return;
}
function F0(a) {
  const c = av(a), r = ph(c, a), o = ph(c.reverse(), a);
  return [r, o];
}
function av(a) {
  const c = [], r = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const f = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || f ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) c.push(r.currentNode);
  return c;
}
function ph(a, c) {
  for (const r of a)
    if (!P0(r, { upTo: c })) return r;
}
function P0(a, { upTo: c }) {
  if (getComputedStyle(a).visibility === "hidden") return !0;
  for (; a; ) {
    if (c !== void 0 && a === c) return !1;
    if (getComputedStyle(a).display === "none") return !0;
    a = a.parentElement;
  }
  return !1;
}
function I0(a) {
  return a instanceof HTMLInputElement && "select" in a;
}
function Vn(a, { select: c = !1 } = {}) {
  if (a && a.focus) {
    const r = document.activeElement;
    a.focus({ preventScroll: !0 }), a !== r && I0(a) && c && a.select();
  }
}
var bh = tb();
function tb() {
  let a = [];
  return {
    add(c) {
      const r = a[0];
      c !== r && (r == null || r.pause()), a = Sh(a, c), a.unshift(c);
    },
    remove(c) {
      var r;
      a = Sh(a, c), (r = a[0]) == null || r.resume();
    }
  };
}
function Sh(a, c) {
  const r = [...a], o = r.indexOf(c);
  return o !== -1 && r.splice(o, 1), r;
}
function eb(a) {
  return a.filter((c) => c.tagName !== "A");
}
var nb = "Portal", uv = x.forwardRef((a, c) => {
  var g;
  const { container: r, ...o } = a, [f, d] = x.useState(!1);
  Qn(() => d(!0), []);
  const h = r || f && ((g = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : g.body);
  return h ? _0.createPortal(/* @__PURE__ */ X.jsx(re.div, { ...o, ref: c }), h) : null;
});
uv.displayName = nb;
function lb(a, c) {
  return x.useReducer((r, o) => c[r][o] ?? r, a);
}
var gu = (a) => {
  const { present: c, children: r } = a, o = ab(c), f = typeof r == "function" ? r({ present: o.isPresent }) : x.Children.only(r), d = qe(o.ref, ub(f));
  return typeof r == "function" || o.isPresent ? x.cloneElement(f, { ref: d }) : null;
};
gu.displayName = "Presence";
function ab(a) {
  const [c, r] = x.useState(), o = x.useRef(null), f = x.useRef(a), d = x.useRef("none"), h = a ? "mounted" : "unmounted", [g, y] = lb(h, {
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
  return x.useEffect(() => {
    const v = Ui(o.current);
    d.current = g === "mounted" ? v : "none";
  }, [g]), Qn(() => {
    const v = o.current, b = f.current;
    if (b !== a) {
      const O = d.current, z = Ui(v);
      a ? y("MOUNT") : z === "none" || (v == null ? void 0 : v.display) === "none" ? y("UNMOUNT") : y(b && O !== z ? "ANIMATION_OUT" : "UNMOUNT"), f.current = a;
    }
  }, [a, y]), Qn(() => {
    if (c) {
      let v;
      const b = c.ownerDocument.defaultView ?? window, A = (z) => {
        const R = Ui(o.current).includes(z.animationName);
        if (z.target === c && R && (y("ANIMATION_END"), !f.current)) {
          const B = c.style.animationFillMode;
          c.style.animationFillMode = "forwards", v = b.setTimeout(() => {
            c.style.animationFillMode === "forwards" && (c.style.animationFillMode = B);
          });
        }
      }, O = (z) => {
        z.target === c && (d.current = Ui(o.current));
      };
      return c.addEventListener("animationstart", O), c.addEventListener("animationcancel", A), c.addEventListener("animationend", A), () => {
        b.clearTimeout(v), c.removeEventListener("animationstart", O), c.removeEventListener("animationcancel", A), c.removeEventListener("animationend", A);
      };
    } else
      y("ANIMATION_END");
  }, [c, y]), {
    isPresent: ["mounted", "unmountSuspended"].includes(g),
    ref: x.useCallback((v) => {
      o.current = v ? getComputedStyle(v) : null, r(v);
    }, [])
  };
}
function Ui(a) {
  return (a == null ? void 0 : a.animationName) || "none";
}
function ub(a) {
  var o, f;
  let c = (o = Object.getOwnPropertyDescriptor(a.props, "ref")) == null ? void 0 : o.get, r = c && "isReactWarning" in c && c.isReactWarning;
  return r ? a.ref : (c = (f = Object.getOwnPropertyDescriptor(a, "ref")) == null ? void 0 : f.get, r = c && "isReactWarning" in c && c.isReactWarning, r ? a.props.ref : a.props.ref || a.ref);
}
var Mr = 0;
function ib() {
  x.useEffect(() => {
    const a = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", a[0] ?? xh()), document.body.insertAdjacentElement("beforeend", a[1] ?? xh()), Mr++, () => {
      Mr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((c) => c.remove()), Mr--;
    };
  }, []);
}
function xh() {
  const a = document.createElement("span");
  return a.setAttribute("data-radix-focus-guard", ""), a.tabIndex = 0, a.style.outline = "none", a.style.opacity = "0", a.style.position = "fixed", a.style.pointerEvents = "none", a;
}
var Ke = function() {
  return Ke = Object.assign || function(c) {
    for (var r, o = 1, f = arguments.length; o < f; o++) {
      r = arguments[o];
      for (var d in r) Object.prototype.hasOwnProperty.call(r, d) && (c[d] = r[d]);
    }
    return c;
  }, Ke.apply(this, arguments);
};
function iv(a, c) {
  var r = {};
  for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && c.indexOf(o) < 0 && (r[o] = a[o]);
  if (a != null && typeof Object.getOwnPropertySymbols == "function")
    for (var f = 0, o = Object.getOwnPropertySymbols(a); f < o.length; f++)
      c.indexOf(o[f]) < 0 && Object.prototype.propertyIsEnumerable.call(a, o[f]) && (r[o[f]] = a[o[f]]);
  return r;
}
function cb(a, c, r) {
  if (r || arguments.length === 2) for (var o = 0, f = c.length, d; o < f; o++)
    (d || !(o in c)) && (d || (d = Array.prototype.slice.call(c, 0, o)), d[o] = c[o]);
  return a.concat(d || Array.prototype.slice.call(c));
}
var qi = "right-scroll-bar-position", Gi = "width-before-scroll-bar", ob = "with-scroll-bars-hidden", rb = "--removed-body-scroll-bar-size";
function Dr(a, c) {
  return typeof a == "function" ? a(c) : a && (a.current = c), a;
}
function sb(a, c) {
  var r = x.useState(function() {
    return {
      // value
      value: a,
      // last callback
      callback: c,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(o) {
          var f = r.value;
          f !== o && (r.value = o, r.callback(o, f));
        }
      }
    };
  })[0];
  return r.callback = c, r.facade;
}
var fb = typeof window < "u" ? x.useLayoutEffect : x.useEffect, Eh = /* @__PURE__ */ new WeakMap();
function db(a, c) {
  var r = sb(null, function(o) {
    return a.forEach(function(f) {
      return Dr(f, o);
    });
  });
  return fb(function() {
    var o = Eh.get(r);
    if (o) {
      var f = new Set(o), d = new Set(a), h = r.current;
      f.forEach(function(g) {
        d.has(g) || Dr(g, null);
      }), d.forEach(function(g) {
        f.has(g) || Dr(g, h);
      });
    }
    Eh.set(r, a);
  }, [a]), r;
}
function mb(a) {
  return a;
}
function hb(a, c) {
  c === void 0 && (c = mb);
  var r = [], o = !1, f = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : a;
    },
    useMedium: function(d) {
      var h = c(d, o);
      return r.push(h), function() {
        r = r.filter(function(g) {
          return g !== h;
        });
      };
    },
    assignSyncMedium: function(d) {
      for (o = !0; r.length; ) {
        var h = r;
        r = [], h.forEach(d);
      }
      r = {
        push: function(g) {
          return d(g);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(d) {
      o = !0;
      var h = [];
      if (r.length) {
        var g = r;
        r = [], g.forEach(d), h = r;
      }
      var y = function() {
        var b = h;
        h = [], b.forEach(d);
      }, v = function() {
        return Promise.resolve().then(y);
      };
      v(), r = {
        push: function(b) {
          h.push(b), v();
        },
        filter: function(b) {
          return h = h.filter(b), r;
        }
      };
    }
  };
  return f;
}
function vb(a) {
  a === void 0 && (a = {});
  var c = hb(null);
  return c.options = Ke({ async: !0, ssr: !1 }, a), c;
}
var cv = function(a) {
  var c = a.sideCar, r = iv(a, ["sideCar"]);
  if (!c)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = c.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return x.createElement(o, Ke({}, r));
};
cv.isSideCarExport = !0;
function gb(a, c) {
  return a.useMedium(c), cv;
}
var ov = vb(), _r = function() {
}, Ji = x.forwardRef(function(a, c) {
  var r = x.useRef(null), o = x.useState({
    onScrollCapture: _r,
    onWheelCapture: _r,
    onTouchMoveCapture: _r
  }), f = o[0], d = o[1], h = a.forwardProps, g = a.children, y = a.className, v = a.removeScrollBar, b = a.enabled, A = a.shards, O = a.sideCar, z = a.noRelative, U = a.noIsolation, R = a.inert, B = a.allowPinchZoom, L = a.as, Q = L === void 0 ? "div" : L, k = a.gapMode, J = iv(a, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), G = O, et = db([r, c]), W = Ke(Ke({}, J), f);
  return x.createElement(
    x.Fragment,
    null,
    b && x.createElement(G, { sideCar: ov, removeScrollBar: v, shards: A, noRelative: z, noIsolation: U, inert: R, setCallbacks: d, allowPinchZoom: !!B, lockRef: r, gapMode: k }),
    h ? x.cloneElement(x.Children.only(g), Ke(Ke({}, W), { ref: et })) : x.createElement(Q, Ke({}, W, { className: y, ref: et }), g)
  );
});
Ji.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ji.classNames = {
  fullWidth: Gi,
  zeroRight: qi
};
var yb = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function pb() {
  if (!document)
    return null;
  var a = document.createElement("style");
  a.type = "text/css";
  var c = yb();
  return c && a.setAttribute("nonce", c), a;
}
function bb(a, c) {
  a.styleSheet ? a.styleSheet.cssText = c : a.appendChild(document.createTextNode(c));
}
function Sb(a) {
  var c = document.head || document.getElementsByTagName("head")[0];
  c.appendChild(a);
}
var xb = function() {
  var a = 0, c = null;
  return {
    add: function(r) {
      a == 0 && (c = pb()) && (bb(c, r), Sb(c)), a++;
    },
    remove: function() {
      a--, !a && c && (c.parentNode && c.parentNode.removeChild(c), c = null);
    }
  };
}, Eb = function() {
  var a = xb();
  return function(c, r) {
    x.useEffect(function() {
      return a.add(c), function() {
        a.remove();
      };
    }, [c && r]);
  };
}, rv = function() {
  var a = Eb(), c = function(r) {
    var o = r.styles, f = r.dynamic;
    return a(o, f), null;
  };
  return c;
}, Ab = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Cr = function(a) {
  return parseInt(a || "", 10) || 0;
}, Tb = function(a) {
  var c = window.getComputedStyle(document.body), r = c[a === "padding" ? "paddingLeft" : "marginLeft"], o = c[a === "padding" ? "paddingTop" : "marginTop"], f = c[a === "padding" ? "paddingRight" : "marginRight"];
  return [Cr(r), Cr(o), Cr(f)];
}, wb = function(a) {
  if (a === void 0 && (a = "margin"), typeof window > "u")
    return Ab;
  var c = Tb(a), r = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: c[0],
    top: c[1],
    right: c[2],
    gap: Math.max(0, o - r + c[2] - c[0])
  };
}, Ob = rv(), ua = "data-scroll-locked", Rb = function(a, c, r, o) {
  var f = a.left, d = a.top, h = a.right, g = a.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(ob, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(g, "px ").concat(o, `;
  }
  body[`).concat(ua, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    c && "position: relative ".concat(o, ";"),
    r === "margin" && `
    padding-left: `.concat(f, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(h, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(g, "px ").concat(o, `;
    `),
    r === "padding" && "padding-right: ".concat(g, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(qi, ` {
    right: `).concat(g, "px ").concat(o, `;
  }
  
  .`).concat(Gi, ` {
    margin-right: `).concat(g, "px ").concat(o, `;
  }
  
  .`).concat(qi, " .").concat(qi, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(Gi, " .").concat(Gi, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(ua, `] {
    `).concat(rb, ": ").concat(g, `px;
  }
`);
}, Ah = function() {
  var a = parseInt(document.body.getAttribute(ua) || "0", 10);
  return isFinite(a) ? a : 0;
}, Mb = function() {
  x.useEffect(function() {
    return document.body.setAttribute(ua, (Ah() + 1).toString()), function() {
      var a = Ah() - 1;
      a <= 0 ? document.body.removeAttribute(ua) : document.body.setAttribute(ua, a.toString());
    };
  }, []);
}, Db = function(a) {
  var c = a.noRelative, r = a.noImportant, o = a.gapMode, f = o === void 0 ? "margin" : o;
  Mb();
  var d = x.useMemo(function() {
    return wb(f);
  }, [f]);
  return x.createElement(Ob, { styles: Rb(d, !c, f, r ? "" : "!important") });
}, Yr = !1;
if (typeof window < "u")
  try {
    var Hi = Object.defineProperty({}, "passive", {
      get: function() {
        return Yr = !0, !0;
      }
    });
    window.addEventListener("test", Hi, Hi), window.removeEventListener("test", Hi, Hi);
  } catch {
    Yr = !1;
  }
var na = Yr ? { passive: !1 } : !1, _b = function(a) {
  return a.tagName === "TEXTAREA";
}, sv = function(a, c) {
  if (!(a instanceof Element))
    return !1;
  var r = window.getComputedStyle(a);
  return (
    // not-not-scrollable
    r[c] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !_b(a) && r[c] === "visible")
  );
}, Cb = function(a) {
  return sv(a, "overflowY");
}, zb = function(a) {
  return sv(a, "overflowX");
}, Th = function(a, c) {
  var r = c.ownerDocument, o = c;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var f = fv(a, o);
    if (f) {
      var d = dv(a, o), h = d[1], g = d[2];
      if (h > g)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== r.body);
  return !1;
}, Nb = function(a) {
  var c = a.scrollTop, r = a.scrollHeight, o = a.clientHeight;
  return [
    c,
    r,
    o
  ];
}, Ub = function(a) {
  var c = a.scrollLeft, r = a.scrollWidth, o = a.clientWidth;
  return [
    c,
    r,
    o
  ];
}, fv = function(a, c) {
  return a === "v" ? Cb(c) : zb(c);
}, dv = function(a, c) {
  return a === "v" ? Nb(c) : Ub(c);
}, Hb = function(a, c) {
  return a === "h" && c === "rtl" ? -1 : 1;
}, Bb = function(a, c, r, o, f) {
  var d = Hb(a, window.getComputedStyle(c).direction), h = d * o, g = r.target, y = c.contains(g), v = !1, b = h > 0, A = 0, O = 0;
  do {
    if (!g)
      break;
    var z = dv(a, g), U = z[0], R = z[1], B = z[2], L = R - B - d * U;
    (U || L) && fv(a, g) && (A += L, O += U);
    var Q = g.parentNode;
    g = Q && Q.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Q.host : Q;
  } while (
    // portaled content
    !y && g !== document.body || // self content
    y && (c.contains(g) || c === g)
  );
  return (b && Math.abs(A) < 1 || !b && Math.abs(O) < 1) && (v = !0), v;
}, Bi = function(a) {
  return "changedTouches" in a ? [a.changedTouches[0].clientX, a.changedTouches[0].clientY] : [0, 0];
}, wh = function(a) {
  return [a.deltaX, a.deltaY];
}, Oh = function(a) {
  return a && "current" in a ? a.current : a;
}, jb = function(a, c) {
  return a[0] === c[0] && a[1] === c[1];
}, Lb = function(a) {
  return `
  .block-interactivity-`.concat(a, ` {pointer-events: none;}
  .allow-interactivity-`).concat(a, ` {pointer-events: all;}
`);
}, Yb = 0, la = [];
function qb(a) {
  var c = x.useRef([]), r = x.useRef([0, 0]), o = x.useRef(), f = x.useState(Yb++)[0], d = x.useState(rv)[0], h = x.useRef(a);
  x.useEffect(function() {
    h.current = a;
  }, [a]), x.useEffect(function() {
    if (a.inert) {
      document.body.classList.add("block-interactivity-".concat(f));
      var R = cb([a.lockRef.current], (a.shards || []).map(Oh), !0).filter(Boolean);
      return R.forEach(function(B) {
        return B.classList.add("allow-interactivity-".concat(f));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(f)), R.forEach(function(B) {
          return B.classList.remove("allow-interactivity-".concat(f));
        });
      };
    }
  }, [a.inert, a.lockRef.current, a.shards]);
  var g = x.useCallback(function(R, B) {
    if ("touches" in R && R.touches.length === 2 || R.type === "wheel" && R.ctrlKey)
      return !h.current.allowPinchZoom;
    var L = Bi(R), Q = r.current, k = "deltaX" in R ? R.deltaX : Q[0] - L[0], J = "deltaY" in R ? R.deltaY : Q[1] - L[1], G, et = R.target, W = Math.abs(k) > Math.abs(J) ? "h" : "v";
    if ("touches" in R && W === "h" && et.type === "range")
      return !1;
    var K = Th(W, et);
    if (!K)
      return !0;
    if (K ? G = W : (G = W === "v" ? "h" : "v", K = Th(W, et)), !K)
      return !1;
    if (!o.current && "changedTouches" in R && (k || J) && (o.current = G), !G)
      return !0;
    var ot = o.current || G;
    return Bb(ot, B, R, ot === "h" ? k : J);
  }, []), y = x.useCallback(function(R) {
    var B = R;
    if (!(!la.length || la[la.length - 1] !== d)) {
      var L = "deltaY" in B ? wh(B) : Bi(B), Q = c.current.filter(function(G) {
        return G.name === B.type && (G.target === B.target || B.target === G.shadowParent) && jb(G.delta, L);
      })[0];
      if (Q && Q.should) {
        B.cancelable && B.preventDefault();
        return;
      }
      if (!Q) {
        var k = (h.current.shards || []).map(Oh).filter(Boolean).filter(function(G) {
          return G.contains(B.target);
        }), J = k.length > 0 ? g(B, k[0]) : !h.current.noIsolation;
        J && B.cancelable && B.preventDefault();
      }
    }
  }, []), v = x.useCallback(function(R, B, L, Q) {
    var k = { name: R, delta: B, target: L, should: Q, shadowParent: Gb(L) };
    c.current.push(k), setTimeout(function() {
      c.current = c.current.filter(function(J) {
        return J !== k;
      });
    }, 1);
  }, []), b = x.useCallback(function(R) {
    r.current = Bi(R), o.current = void 0;
  }, []), A = x.useCallback(function(R) {
    v(R.type, wh(R), R.target, g(R, a.lockRef.current));
  }, []), O = x.useCallback(function(R) {
    v(R.type, Bi(R), R.target, g(R, a.lockRef.current));
  }, []);
  x.useEffect(function() {
    return la.push(d), a.setCallbacks({
      onScrollCapture: A,
      onWheelCapture: A,
      onTouchMoveCapture: O
    }), document.addEventListener("wheel", y, na), document.addEventListener("touchmove", y, na), document.addEventListener("touchstart", b, na), function() {
      la = la.filter(function(R) {
        return R !== d;
      }), document.removeEventListener("wheel", y, na), document.removeEventListener("touchmove", y, na), document.removeEventListener("touchstart", b, na);
    };
  }, []);
  var z = a.removeScrollBar, U = a.inert;
  return x.createElement(
    x.Fragment,
    null,
    U ? x.createElement(d, { styles: Lb(f) }) : null,
    z ? x.createElement(Db, { noRelative: a.noRelative, gapMode: a.gapMode }) : null
  );
}
function Gb(a) {
  for (var c = null; a !== null; )
    a instanceof ShadowRoot && (c = a.host, a = a.host), a = a.parentNode;
  return c;
}
const Xb = gb(ov, qb);
var mv = x.forwardRef(function(a, c) {
  return x.createElement(Ji, Ke({}, a, { ref: c, sideCar: Xb }));
});
mv.classNames = Ji.classNames;
var Vb = function(a) {
  if (typeof document > "u")
    return null;
  var c = Array.isArray(a) ? a[0] : a;
  return c.ownerDocument.body;
}, aa = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap(), Li = {}, zr = 0, hv = function(a) {
  return a && (a.host || hv(a.parentNode));
}, Qb = function(a, c) {
  return c.map(function(r) {
    if (a.contains(r))
      return r;
    var o = hv(r);
    return o && a.contains(o) ? o : (console.error("aria-hidden", r, "in not contained inside", a, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, Zb = function(a, c, r, o) {
  var f = Qb(c, Array.isArray(a) ? a : [a]);
  Li[r] || (Li[r] = /* @__PURE__ */ new WeakMap());
  var d = Li[r], h = [], g = /* @__PURE__ */ new Set(), y = new Set(f), v = function(A) {
    !A || g.has(A) || (g.add(A), v(A.parentNode));
  };
  f.forEach(v);
  var b = function(A) {
    !A || y.has(A) || Array.prototype.forEach.call(A.children, function(O) {
      if (g.has(O))
        b(O);
      else
        try {
          var z = O.getAttribute(o), U = z !== null && z !== "false", R = (aa.get(O) || 0) + 1, B = (d.get(O) || 0) + 1;
          aa.set(O, R), d.set(O, B), h.push(O), R === 1 && U && ji.set(O, !0), B === 1 && O.setAttribute(r, "true"), U || O.setAttribute(o, "true");
        } catch (L) {
          console.error("aria-hidden: cannot operate on ", O, L);
        }
    });
  };
  return b(c), g.clear(), zr++, function() {
    h.forEach(function(A) {
      var O = aa.get(A) - 1, z = d.get(A) - 1;
      aa.set(A, O), d.set(A, z), O || (ji.has(A) || A.removeAttribute(o), ji.delete(A)), z || A.removeAttribute(r);
    }), zr--, zr || (aa = /* @__PURE__ */ new WeakMap(), aa = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap(), Li = {});
  };
}, kb = function(a, c, r) {
  r === void 0 && (r = "data-aria-hidden");
  var o = Array.from(Array.isArray(a) ? a : [a]), f = Vb(a);
  return f ? (o.push.apply(o, Array.from(f.querySelectorAll("[aria-live], script"))), Zb(o, f, r, "aria-hidden")) : function() {
    return null;
  };
}, Wi = "Dialog", [vv, rx] = Kr(Wi), [Kb, Ge] = vv(Wi), gv = (a) => {
  const {
    __scopeDialog: c,
    children: r,
    open: o,
    defaultOpen: f,
    onOpenChange: d,
    modal: h = !0
  } = a, g = x.useRef(null), y = x.useRef(null), [v, b] = L0({
    prop: o,
    defaultProp: f ?? !1,
    onChange: d,
    caller: Wi
  });
  return /* @__PURE__ */ X.jsx(
    Kb,
    {
      scope: c,
      triggerRef: g,
      contentRef: y,
      contentId: wr(),
      titleId: wr(),
      descriptionId: wr(),
      open: v,
      onOpenChange: b,
      onOpenToggle: x.useCallback(() => b((A) => !A), [b]),
      modal: h,
      children: r
    }
  );
};
gv.displayName = Wi;
var yv = "DialogTrigger", Jb = x.forwardRef(
  (a, c) => {
    const { __scopeDialog: r, ...o } = a, f = Ge(yv, r), d = qe(c, f.triggerRef);
    return /* @__PURE__ */ X.jsx(
      re.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": f.open,
        "aria-controls": f.contentId,
        "data-state": Fr(f.open),
        ...o,
        ref: d,
        onClick: oe(a.onClick, f.onOpenToggle)
      }
    );
  }
);
Jb.displayName = yv;
var Wr = "DialogPortal", [Wb, pv] = vv(Wr, {
  forceMount: void 0
}), bv = (a) => {
  const { __scopeDialog: c, forceMount: r, children: o, container: f } = a, d = Ge(Wr, c);
  return /* @__PURE__ */ X.jsx(Wb, { scope: c, forceMount: r, children: x.Children.map(o, (h) => /* @__PURE__ */ X.jsx(gu, { present: r || d.open, children: /* @__PURE__ */ X.jsx(uv, { asChild: !0, container: f, children: h }) })) });
};
bv.displayName = Wr;
var Vi = "DialogOverlay", Sv = x.forwardRef(
  (a, c) => {
    const r = pv(Vi, a.__scopeDialog), { forceMount: o = r.forceMount, ...f } = a, d = Ge(Vi, a.__scopeDialog);
    return d.modal ? /* @__PURE__ */ X.jsx(gu, { present: o || d.open, children: /* @__PURE__ */ X.jsx(Fb, { ...f, ref: c }) }) : null;
  }
);
Sv.displayName = Vi;
var $b = /* @__PURE__ */ Gh("DialogOverlay.RemoveScroll"), Fb = x.forwardRef(
  (a, c) => {
    const { __scopeDialog: r, ...o } = a, f = Ge(Vi, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ X.jsx(mv, { as: $b, allowPinchZoom: !0, shards: [f.contentRef], children: /* @__PURE__ */ X.jsx(
        re.div,
        {
          "data-state": Fr(f.open),
          ...o,
          ref: c,
          style: { pointerEvents: "auto", ...o.style }
        }
      ) })
    );
  }
), ml = "DialogContent", xv = x.forwardRef(
  (a, c) => {
    const r = pv(ml, a.__scopeDialog), { forceMount: o = r.forceMount, ...f } = a, d = Ge(ml, a.__scopeDialog);
    return /* @__PURE__ */ X.jsx(gu, { present: o || d.open, children: d.modal ? /* @__PURE__ */ X.jsx(Pb, { ...f, ref: c }) : /* @__PURE__ */ X.jsx(Ib, { ...f, ref: c }) });
  }
);
xv.displayName = ml;
var Pb = x.forwardRef(
  (a, c) => {
    const r = Ge(ml, a.__scopeDialog), o = x.useRef(null), f = qe(c, r.contentRef, o);
    return x.useEffect(() => {
      const d = o.current;
      if (d) return kb(d);
    }, []), /* @__PURE__ */ X.jsx(
      Ev,
      {
        ...a,
        ref: f,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: oe(a.onCloseAutoFocus, (d) => {
          var h;
          d.preventDefault(), (h = r.triggerRef.current) == null || h.focus();
        }),
        onPointerDownOutside: oe(a.onPointerDownOutside, (d) => {
          const h = d.detail.originalEvent, g = h.button === 0 && h.ctrlKey === !0;
          (h.button === 2 || g) && d.preventDefault();
        }),
        onFocusOutside: oe(
          a.onFocusOutside,
          (d) => d.preventDefault()
        )
      }
    );
  }
), Ib = x.forwardRef(
  (a, c) => {
    const r = Ge(ml, a.__scopeDialog), o = x.useRef(!1), f = x.useRef(!1);
    return /* @__PURE__ */ X.jsx(
      Ev,
      {
        ...a,
        ref: c,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (d) => {
          var h, g;
          (h = a.onCloseAutoFocus) == null || h.call(a, d), d.defaultPrevented || (o.current || (g = r.triggerRef.current) == null || g.focus(), d.preventDefault()), o.current = !1, f.current = !1;
        },
        onInteractOutside: (d) => {
          var y, v;
          (y = a.onInteractOutside) == null || y.call(a, d), d.defaultPrevented || (o.current = !0, d.detail.originalEvent.type === "pointerdown" && (f.current = !0));
          const h = d.target;
          ((v = r.triggerRef.current) == null ? void 0 : v.contains(h)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && f.current && d.preventDefault();
        }
      }
    );
  }
), Ev = x.forwardRef(
  (a, c) => {
    const { __scopeDialog: r, trapFocus: o, onOpenAutoFocus: f, onCloseAutoFocus: d, ...h } = a, g = Ge(ml, r), y = x.useRef(null), v = qe(c, y);
    return ib(), /* @__PURE__ */ X.jsxs(X.Fragment, { children: [
      /* @__PURE__ */ X.jsx(
        lv,
        {
          asChild: !0,
          loop: !0,
          trapped: o,
          onMountAutoFocus: f,
          onUnmountAutoFocus: d,
          children: /* @__PURE__ */ X.jsx(
            Jr,
            {
              role: "dialog",
              id: g.contentId,
              "aria-describedby": g.descriptionId,
              "aria-labelledby": g.titleId,
              "data-state": Fr(g.open),
              ...h,
              ref: v,
              onDismiss: () => g.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ X.jsxs(X.Fragment, { children: [
        /* @__PURE__ */ X.jsx(t1, { titleId: g.titleId }),
        /* @__PURE__ */ X.jsx(n1, { contentRef: y, descriptionId: g.descriptionId })
      ] })
    ] });
  }
), $r = "DialogTitle", Av = x.forwardRef(
  (a, c) => {
    const { __scopeDialog: r, ...o } = a, f = Ge($r, r);
    return /* @__PURE__ */ X.jsx(re.h2, { id: f.titleId, ...o, ref: c });
  }
);
Av.displayName = $r;
var Tv = "DialogDescription", wv = x.forwardRef(
  (a, c) => {
    const { __scopeDialog: r, ...o } = a, f = Ge(Tv, r);
    return /* @__PURE__ */ X.jsx(re.p, { id: f.descriptionId, ...o, ref: c });
  }
);
wv.displayName = Tv;
var Ov = "DialogClose", Rv = x.forwardRef(
  (a, c) => {
    const { __scopeDialog: r, ...o } = a, f = Ge(Ov, r);
    return /* @__PURE__ */ X.jsx(
      re.button,
      {
        type: "button",
        ...o,
        ref: c,
        onClick: oe(a.onClick, () => f.onOpenChange(!1))
      }
    );
  }
);
Rv.displayName = Ov;
function Fr(a) {
  return a ? "open" : "closed";
}
var Mv = "DialogTitleWarning", [sx, Dv] = N0(Mv, {
  contentName: ml,
  titleName: $r,
  docsSlug: "dialog"
}), t1 = ({ titleId: a }) => {
  const c = Dv(Mv), r = `\`${c.contentName}\` requires a \`${c.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${c.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${c.docsSlug}`;
  return x.useEffect(() => {
    a && (document.getElementById(a) || console.error(r));
  }, [r, a]), null;
}, e1 = "DialogDescriptionWarning", n1 = ({ contentRef: a, descriptionId: c }) => {
  const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Dv(e1).contentName}}.`;
  return x.useEffect(() => {
    var d;
    const f = (d = a.current) == null ? void 0 : d.getAttribute("aria-describedby");
    c && f && (document.getElementById(c) || console.warn(o));
  }, [o, a, c]), null;
}, l1 = gv, a1 = bv, u1 = Sv, i1 = xv, c1 = Av, o1 = wv, r1 = Rv;
function s1({ ...a }) {
  return /* @__PURE__ */ X.jsx(l1, { "data-slot": "sheet", ...a });
}
function f1({
  ...a
}) {
  return /* @__PURE__ */ X.jsx(a1, { "data-slot": "sheet-portal", ...a });
}
function d1({
  className: a,
  ...c
}) {
  return /* @__PURE__ */ X.jsx(
    u1,
    {
      "data-slot": "sheet-overlay",
      className: Se(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        a
      ),
      ...c
    }
  );
}
function m1({
  className: a,
  children: c,
  side: r = "right",
  ...o
}) {
  return /* @__PURE__ */ X.jsxs(f1, { children: [
    /* @__PURE__ */ X.jsx(d1, {}),
    /* @__PURE__ */ X.jsxs(
      i1,
      {
        "data-slot": "sheet-content",
        className: Se(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          r === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          r === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          r === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          r === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          a
        ),
        ...o,
        children: [
          c,
          /* @__PURE__ */ X.jsxs(r1, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ X.jsx(Jp, { className: "size-4" }),
            /* @__PURE__ */ X.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function h1({ className: a, ...c }) {
  return /* @__PURE__ */ X.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: Se("flex flex-col gap-1.5 p-4", a),
      ...c
    }
  );
}
function v1({
  className: a,
  ...c
}) {
  return /* @__PURE__ */ X.jsx(
    c1,
    {
      "data-slot": "sheet-title",
      className: Se("text-foreground font-semibold", a),
      ...c
    }
  );
}
function g1({
  className: a,
  ...c
}) {
  return /* @__PURE__ */ X.jsx(
    o1,
    {
      "data-slot": "sheet-description",
      className: Se("text-muted-foreground text-sm", a),
      ...c
    }
  );
}
const y1 = ["top", "right", "bottom", "left"], Zn = Math.min, be = Math.max, Qi = Math.round, Yi = Math.floor, We = (a) => ({
  x: a,
  y: a
}), p1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, b1 = {
  start: "end",
  end: "start"
};
function qr(a, c, r) {
  return be(a, Zn(c, r));
}
function gn(a, c) {
  return typeof a == "function" ? a(c) : a;
}
function yn(a) {
  return a.split("-")[0];
}
function da(a) {
  return a.split("-")[1];
}
function Pr(a) {
  return a === "x" ? "y" : "x";
}
function Ir(a) {
  return a === "y" ? "height" : "width";
}
function Je(a) {
  return ["top", "bottom"].includes(yn(a)) ? "y" : "x";
}
function ts(a) {
  return Pr(Je(a));
}
function S1(a, c, r) {
  r === void 0 && (r = !1);
  const o = da(a), f = ts(a), d = Ir(f);
  let h = f === "x" ? o === (r ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return c.reference[d] > c.floating[d] && (h = Zi(h)), [h, Zi(h)];
}
function x1(a) {
  const c = Zi(a);
  return [Gr(a), c, Gr(c)];
}
function Gr(a) {
  return a.replace(/start|end/g, (c) => b1[c]);
}
function E1(a, c, r) {
  const o = ["left", "right"], f = ["right", "left"], d = ["top", "bottom"], h = ["bottom", "top"];
  switch (a) {
    case "top":
    case "bottom":
      return r ? c ? f : o : c ? o : f;
    case "left":
    case "right":
      return c ? d : h;
    default:
      return [];
  }
}
function A1(a, c, r, o) {
  const f = da(a);
  let d = E1(yn(a), r === "start", o);
  return f && (d = d.map((h) => h + "-" + f), c && (d = d.concat(d.map(Gr)))), d;
}
function Zi(a) {
  return a.replace(/left|right|bottom|top/g, (c) => p1[c]);
}
function T1(a) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...a
  };
}
function _v(a) {
  return typeof a != "number" ? T1(a) : {
    top: a,
    right: a,
    bottom: a,
    left: a
  };
}
function ki(a) {
  const {
    x: c,
    y: r,
    width: o,
    height: f
  } = a;
  return {
    width: o,
    height: f,
    top: r,
    left: c,
    right: c + o,
    bottom: r + f,
    x: c,
    y: r
  };
}
function Rh(a, c, r) {
  let {
    reference: o,
    floating: f
  } = a;
  const d = Je(c), h = ts(c), g = Ir(h), y = yn(c), v = d === "y", b = o.x + o.width / 2 - f.width / 2, A = o.y + o.height / 2 - f.height / 2, O = o[g] / 2 - f[g] / 2;
  let z;
  switch (y) {
    case "top":
      z = {
        x: b,
        y: o.y - f.height
      };
      break;
    case "bottom":
      z = {
        x: b,
        y: o.y + o.height
      };
      break;
    case "right":
      z = {
        x: o.x + o.width,
        y: A
      };
      break;
    case "left":
      z = {
        x: o.x - f.width,
        y: A
      };
      break;
    default:
      z = {
        x: o.x,
        y: o.y
      };
  }
  switch (da(c)) {
    case "start":
      z[h] -= O * (r && v ? -1 : 1);
      break;
    case "end":
      z[h] += O * (r && v ? -1 : 1);
      break;
  }
  return z;
}
const w1 = async (a, c, r) => {
  const {
    placement: o = "bottom",
    strategy: f = "absolute",
    middleware: d = [],
    platform: h
  } = r, g = d.filter(Boolean), y = await (h.isRTL == null ? void 0 : h.isRTL(c));
  let v = await h.getElementRects({
    reference: a,
    floating: c,
    strategy: f
  }), {
    x: b,
    y: A
  } = Rh(v, o, y), O = o, z = {}, U = 0;
  for (let R = 0; R < g.length; R++) {
    const {
      name: B,
      fn: L
    } = g[R], {
      x: Q,
      y: k,
      data: J,
      reset: G
    } = await L({
      x: b,
      y: A,
      initialPlacement: o,
      placement: O,
      strategy: f,
      middlewareData: z,
      rects: v,
      platform: h,
      elements: {
        reference: a,
        floating: c
      }
    });
    b = Q ?? b, A = k ?? A, z = {
      ...z,
      [B]: {
        ...z[B],
        ...J
      }
    }, G && U <= 50 && (U++, typeof G == "object" && (G.placement && (O = G.placement), G.rects && (v = G.rects === !0 ? await h.getElementRects({
      reference: a,
      floating: c,
      strategy: f
    }) : G.rects), {
      x: b,
      y: A
    } = Rh(v, O, y)), R = -1);
  }
  return {
    x: b,
    y: A,
    placement: O,
    strategy: f,
    middlewareData: z
  };
};
async function hu(a, c) {
  var r;
  c === void 0 && (c = {});
  const {
    x: o,
    y: f,
    platform: d,
    rects: h,
    elements: g,
    strategy: y
  } = a, {
    boundary: v = "clippingAncestors",
    rootBoundary: b = "viewport",
    elementContext: A = "floating",
    altBoundary: O = !1,
    padding: z = 0
  } = gn(c, a), U = _v(z), B = g[O ? A === "floating" ? "reference" : "floating" : A], L = ki(await d.getClippingRect({
    element: (r = await (d.isElement == null ? void 0 : d.isElement(B))) == null || r ? B : B.contextElement || await (d.getDocumentElement == null ? void 0 : d.getDocumentElement(g.floating)),
    boundary: v,
    rootBoundary: b,
    strategy: y
  })), Q = A === "floating" ? {
    x: o,
    y: f,
    width: h.floating.width,
    height: h.floating.height
  } : h.reference, k = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(g.floating)), J = await (d.isElement == null ? void 0 : d.isElement(k)) ? await (d.getScale == null ? void 0 : d.getScale(k)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, G = ki(d.convertOffsetParentRelativeRectToViewportRelativeRect ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: g,
    rect: Q,
    offsetParent: k,
    strategy: y
  }) : Q);
  return {
    top: (L.top - G.top + U.top) / J.y,
    bottom: (G.bottom - L.bottom + U.bottom) / J.y,
    left: (L.left - G.left + U.left) / J.x,
    right: (G.right - L.right + U.right) / J.x
  };
}
const O1 = (a) => ({
  name: "arrow",
  options: a,
  async fn(c) {
    const {
      x: r,
      y: o,
      placement: f,
      rects: d,
      platform: h,
      elements: g,
      middlewareData: y
    } = c, {
      element: v,
      padding: b = 0
    } = gn(a, c) || {};
    if (v == null)
      return {};
    const A = _v(b), O = {
      x: r,
      y: o
    }, z = ts(f), U = Ir(z), R = await h.getDimensions(v), B = z === "y", L = B ? "top" : "left", Q = B ? "bottom" : "right", k = B ? "clientHeight" : "clientWidth", J = d.reference[U] + d.reference[z] - O[z] - d.floating[U], G = O[z] - d.reference[z], et = await (h.getOffsetParent == null ? void 0 : h.getOffsetParent(v));
    let W = et ? et[k] : 0;
    (!W || !await (h.isElement == null ? void 0 : h.isElement(et))) && (W = g.floating[k] || d.floating[U]);
    const K = J / 2 - G / 2, ot = W / 2 - R[U] / 2 - 1, xt = Zn(A[L], ot), Mt = Zn(A[Q], ot), ht = xt, Tt = W - R[U] - Mt, St = W / 2 - R[U] / 2 + K, vt = qr(ht, St, Tt), _ = !y.arrow && da(f) != null && St !== vt && d.reference[U] / 2 - (St < ht ? xt : Mt) - R[U] / 2 < 0, V = _ ? St < ht ? St - ht : St - Tt : 0;
    return {
      [z]: O[z] + V,
      data: {
        [z]: vt,
        centerOffset: St - vt - V,
        ..._ && {
          alignmentOffset: V
        }
      },
      reset: _
    };
  }
}), R1 = function(a) {
  return a === void 0 && (a = {}), {
    name: "flip",
    options: a,
    async fn(c) {
      var r, o;
      const {
        placement: f,
        middlewareData: d,
        rects: h,
        initialPlacement: g,
        platform: y,
        elements: v
      } = c, {
        mainAxis: b = !0,
        crossAxis: A = !0,
        fallbackPlacements: O,
        fallbackStrategy: z = "bestFit",
        fallbackAxisSideDirection: U = "none",
        flipAlignment: R = !0,
        ...B
      } = gn(a, c);
      if ((r = d.arrow) != null && r.alignmentOffset)
        return {};
      const L = yn(f), Q = Je(g), k = yn(g) === g, J = await (y.isRTL == null ? void 0 : y.isRTL(v.floating)), G = O || (k || !R ? [Zi(g)] : x1(g)), et = U !== "none";
      !O && et && G.push(...A1(g, R, U, J));
      const W = [g, ...G], K = await hu(c, B), ot = [];
      let xt = ((o = d.flip) == null ? void 0 : o.overflows) || [];
      if (b && ot.push(K[L]), A) {
        const St = S1(f, h, J);
        ot.push(K[St[0]], K[St[1]]);
      }
      if (xt = [...xt, {
        placement: f,
        overflows: ot
      }], !ot.every((St) => St <= 0)) {
        var Mt, ht;
        const St = (((Mt = d.flip) == null ? void 0 : Mt.index) || 0) + 1, vt = W[St];
        if (vt && (!(A === "alignment" ? Q !== Je(vt) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        xt.every((N) => N.overflows[0] > 0 && Je(N.placement) === Q)))
          return {
            data: {
              index: St,
              overflows: xt
            },
            reset: {
              placement: vt
            }
          };
        let _ = (ht = xt.filter((V) => V.overflows[0] <= 0).sort((V, N) => V.overflows[1] - N.overflows[1])[0]) == null ? void 0 : ht.placement;
        if (!_)
          switch (z) {
            case "bestFit": {
              var Tt;
              const V = (Tt = xt.filter((N) => {
                if (et) {
                  const ct = Je(N.placement);
                  return ct === Q || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ct === "y";
                }
                return !0;
              }).map((N) => [N.placement, N.overflows.filter((ct) => ct > 0).reduce((ct, S) => ct + S, 0)]).sort((N, ct) => N[1] - ct[1])[0]) == null ? void 0 : Tt[0];
              V && (_ = V);
              break;
            }
            case "initialPlacement":
              _ = g;
              break;
          }
        if (f !== _)
          return {
            reset: {
              placement: _
            }
          };
      }
      return {};
    }
  };
};
function Mh(a, c) {
  return {
    top: a.top - c.height,
    right: a.right - c.width,
    bottom: a.bottom - c.height,
    left: a.left - c.width
  };
}
function Dh(a) {
  return y1.some((c) => a[c] >= 0);
}
const M1 = function(a) {
  return a === void 0 && (a = {}), {
    name: "hide",
    options: a,
    async fn(c) {
      const {
        rects: r
      } = c, {
        strategy: o = "referenceHidden",
        ...f
      } = gn(a, c);
      switch (o) {
        case "referenceHidden": {
          const d = await hu(c, {
            ...f,
            elementContext: "reference"
          }), h = Mh(d, r.reference);
          return {
            data: {
              referenceHiddenOffsets: h,
              referenceHidden: Dh(h)
            }
          };
        }
        case "escaped": {
          const d = await hu(c, {
            ...f,
            altBoundary: !0
          }), h = Mh(d, r.floating);
          return {
            data: {
              escapedOffsets: h,
              escaped: Dh(h)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function D1(a, c) {
  const {
    placement: r,
    platform: o,
    elements: f
  } = a, d = await (o.isRTL == null ? void 0 : o.isRTL(f.floating)), h = yn(r), g = da(r), y = Je(r) === "y", v = ["left", "top"].includes(h) ? -1 : 1, b = d && y ? -1 : 1, A = gn(c, a);
  let {
    mainAxis: O,
    crossAxis: z,
    alignmentAxis: U
  } = typeof A == "number" ? {
    mainAxis: A,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: A.mainAxis || 0,
    crossAxis: A.crossAxis || 0,
    alignmentAxis: A.alignmentAxis
  };
  return g && typeof U == "number" && (z = g === "end" ? U * -1 : U), y ? {
    x: z * b,
    y: O * v
  } : {
    x: O * v,
    y: z * b
  };
}
const _1 = function(a) {
  return a === void 0 && (a = 0), {
    name: "offset",
    options: a,
    async fn(c) {
      var r, o;
      const {
        x: f,
        y: d,
        placement: h,
        middlewareData: g
      } = c, y = await D1(c, a);
      return h === ((r = g.offset) == null ? void 0 : r.placement) && (o = g.arrow) != null && o.alignmentOffset ? {} : {
        x: f + y.x,
        y: d + y.y,
        data: {
          ...y,
          placement: h
        }
      };
    }
  };
}, C1 = function(a) {
  return a === void 0 && (a = {}), {
    name: "shift",
    options: a,
    async fn(c) {
      const {
        x: r,
        y: o,
        placement: f
      } = c, {
        mainAxis: d = !0,
        crossAxis: h = !1,
        limiter: g = {
          fn: (B) => {
            let {
              x: L,
              y: Q
            } = B;
            return {
              x: L,
              y: Q
            };
          }
        },
        ...y
      } = gn(a, c), v = {
        x: r,
        y: o
      }, b = await hu(c, y), A = Je(yn(f)), O = Pr(A);
      let z = v[O], U = v[A];
      if (d) {
        const B = O === "y" ? "top" : "left", L = O === "y" ? "bottom" : "right", Q = z + b[B], k = z - b[L];
        z = qr(Q, z, k);
      }
      if (h) {
        const B = A === "y" ? "top" : "left", L = A === "y" ? "bottom" : "right", Q = U + b[B], k = U - b[L];
        U = qr(Q, U, k);
      }
      const R = g.fn({
        ...c,
        [O]: z,
        [A]: U
      });
      return {
        ...R,
        data: {
          x: R.x - r,
          y: R.y - o,
          enabled: {
            [O]: d,
            [A]: h
          }
        }
      };
    }
  };
}, z1 = function(a) {
  return a === void 0 && (a = {}), {
    options: a,
    fn(c) {
      const {
        x: r,
        y: o,
        placement: f,
        rects: d,
        middlewareData: h
      } = c, {
        offset: g = 0,
        mainAxis: y = !0,
        crossAxis: v = !0
      } = gn(a, c), b = {
        x: r,
        y: o
      }, A = Je(f), O = Pr(A);
      let z = b[O], U = b[A];
      const R = gn(g, c), B = typeof R == "number" ? {
        mainAxis: R,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...R
      };
      if (y) {
        const k = O === "y" ? "height" : "width", J = d.reference[O] - d.floating[k] + B.mainAxis, G = d.reference[O] + d.reference[k] - B.mainAxis;
        z < J ? z = J : z > G && (z = G);
      }
      if (v) {
        var L, Q;
        const k = O === "y" ? "width" : "height", J = ["top", "left"].includes(yn(f)), G = d.reference[A] - d.floating[k] + (J && ((L = h.offset) == null ? void 0 : L[A]) || 0) + (J ? 0 : B.crossAxis), et = d.reference[A] + d.reference[k] + (J ? 0 : ((Q = h.offset) == null ? void 0 : Q[A]) || 0) - (J ? B.crossAxis : 0);
        U < G ? U = G : U > et && (U = et);
      }
      return {
        [O]: z,
        [A]: U
      };
    }
  };
}, N1 = function(a) {
  return a === void 0 && (a = {}), {
    name: "size",
    options: a,
    async fn(c) {
      var r, o;
      const {
        placement: f,
        rects: d,
        platform: h,
        elements: g
      } = c, {
        apply: y = () => {
        },
        ...v
      } = gn(a, c), b = await hu(c, v), A = yn(f), O = da(f), z = Je(f) === "y", {
        width: U,
        height: R
      } = d.floating;
      let B, L;
      A === "top" || A === "bottom" ? (B = A, L = O === (await (h.isRTL == null ? void 0 : h.isRTL(g.floating)) ? "start" : "end") ? "left" : "right") : (L = A, B = O === "end" ? "top" : "bottom");
      const Q = R - b.top - b.bottom, k = U - b.left - b.right, J = Zn(R - b[B], Q), G = Zn(U - b[L], k), et = !c.middlewareData.shift;
      let W = J, K = G;
      if ((r = c.middlewareData.shift) != null && r.enabled.x && (K = k), (o = c.middlewareData.shift) != null && o.enabled.y && (W = Q), et && !O) {
        const xt = be(b.left, 0), Mt = be(b.right, 0), ht = be(b.top, 0), Tt = be(b.bottom, 0);
        z ? K = U - 2 * (xt !== 0 || Mt !== 0 ? xt + Mt : be(b.left, b.right)) : W = R - 2 * (ht !== 0 || Tt !== 0 ? ht + Tt : be(b.top, b.bottom));
      }
      await y({
        ...c,
        availableWidth: K,
        availableHeight: W
      });
      const ot = await h.getDimensions(g.floating);
      return U !== ot.width || R !== ot.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function $i() {
  return typeof window < "u";
}
function ma(a) {
  return Cv(a) ? (a.nodeName || "").toLowerCase() : "#document";
}
function xe(a) {
  var c;
  return (a == null || (c = a.ownerDocument) == null ? void 0 : c.defaultView) || window;
}
function Fe(a) {
  var c;
  return (c = (Cv(a) ? a.ownerDocument : a.document) || window.document) == null ? void 0 : c.documentElement;
}
function Cv(a) {
  return $i() ? a instanceof Node || a instanceof xe(a).Node : !1;
}
function Le(a) {
  return $i() ? a instanceof Element || a instanceof xe(a).Element : !1;
}
function $e(a) {
  return $i() ? a instanceof HTMLElement || a instanceof xe(a).HTMLElement : !1;
}
function _h(a) {
  return !$i() || typeof ShadowRoot > "u" ? !1 : a instanceof ShadowRoot || a instanceof xe(a).ShadowRoot;
}
function yu(a) {
  const {
    overflow: c,
    overflowX: r,
    overflowY: o,
    display: f
  } = Ye(a);
  return /auto|scroll|overlay|hidden|clip/.test(c + o + r) && !["inline", "contents"].includes(f);
}
function U1(a) {
  return ["table", "td", "th"].includes(ma(a));
}
function Fi(a) {
  return [":popover-open", ":modal"].some((c) => {
    try {
      return a.matches(c);
    } catch {
      return !1;
    }
  });
}
function es(a) {
  const c = ns(), r = Le(a) ? Ye(a) : a;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => r[o] ? r[o] !== "none" : !1) || (r.containerType ? r.containerType !== "normal" : !1) || !c && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !c && (r.filter ? r.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (r.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (r.contain || "").includes(o));
}
function H1(a) {
  let c = kn(a);
  for (; $e(c) && !oa(c); ) {
    if (es(c))
      return c;
    if (Fi(c))
      return null;
    c = kn(c);
  }
  return null;
}
function ns() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function oa(a) {
  return ["html", "body", "#document"].includes(ma(a));
}
function Ye(a) {
  return xe(a).getComputedStyle(a);
}
function Pi(a) {
  return Le(a) ? {
    scrollLeft: a.scrollLeft,
    scrollTop: a.scrollTop
  } : {
    scrollLeft: a.scrollX,
    scrollTop: a.scrollY
  };
}
function kn(a) {
  if (ma(a) === "html")
    return a;
  const c = (
    // Step into the shadow DOM of the parent of a slotted node.
    a.assignedSlot || // DOM Element detected.
    a.parentNode || // ShadowRoot detected.
    _h(a) && a.host || // Fallback.
    Fe(a)
  );
  return _h(c) ? c.host : c;
}
function zv(a) {
  const c = kn(a);
  return oa(c) ? a.ownerDocument ? a.ownerDocument.body : a.body : $e(c) && yu(c) ? c : zv(c);
}
function vu(a, c, r) {
  var o;
  c === void 0 && (c = []), r === void 0 && (r = !0);
  const f = zv(a), d = f === ((o = a.ownerDocument) == null ? void 0 : o.body), h = xe(f);
  if (d) {
    const g = Xr(h);
    return c.concat(h, h.visualViewport || [], yu(f) ? f : [], g && r ? vu(g) : []);
  }
  return c.concat(f, vu(f, [], r));
}
function Xr(a) {
  return a.parent && Object.getPrototypeOf(a.parent) ? a.frameElement : null;
}
function Nv(a) {
  const c = Ye(a);
  let r = parseFloat(c.width) || 0, o = parseFloat(c.height) || 0;
  const f = $e(a), d = f ? a.offsetWidth : r, h = f ? a.offsetHeight : o, g = Qi(r) !== d || Qi(o) !== h;
  return g && (r = d, o = h), {
    width: r,
    height: o,
    $: g
  };
}
function ls(a) {
  return Le(a) ? a : a.contextElement;
}
function ia(a) {
  const c = ls(a);
  if (!$e(c))
    return We(1);
  const r = c.getBoundingClientRect(), {
    width: o,
    height: f,
    $: d
  } = Nv(c);
  let h = (d ? Qi(r.width) : r.width) / o, g = (d ? Qi(r.height) : r.height) / f;
  return (!h || !Number.isFinite(h)) && (h = 1), (!g || !Number.isFinite(g)) && (g = 1), {
    x: h,
    y: g
  };
}
const B1 = /* @__PURE__ */ We(0);
function Uv(a) {
  const c = xe(a);
  return !ns() || !c.visualViewport ? B1 : {
    x: c.visualViewport.offsetLeft,
    y: c.visualViewport.offsetTop
  };
}
function j1(a, c, r) {
  return c === void 0 && (c = !1), !r || c && r !== xe(a) ? !1 : c;
}
function hl(a, c, r, o) {
  c === void 0 && (c = !1), r === void 0 && (r = !1);
  const f = a.getBoundingClientRect(), d = ls(a);
  let h = We(1);
  c && (o ? Le(o) && (h = ia(o)) : h = ia(a));
  const g = j1(d, r, o) ? Uv(d) : We(0);
  let y = (f.left + g.x) / h.x, v = (f.top + g.y) / h.y, b = f.width / h.x, A = f.height / h.y;
  if (d) {
    const O = xe(d), z = o && Le(o) ? xe(o) : o;
    let U = O, R = Xr(U);
    for (; R && o && z !== U; ) {
      const B = ia(R), L = R.getBoundingClientRect(), Q = Ye(R), k = L.left + (R.clientLeft + parseFloat(Q.paddingLeft)) * B.x, J = L.top + (R.clientTop + parseFloat(Q.paddingTop)) * B.y;
      y *= B.x, v *= B.y, b *= B.x, A *= B.y, y += k, v += J, U = xe(R), R = Xr(U);
    }
  }
  return ki({
    width: b,
    height: A,
    x: y,
    y: v
  });
}
function as(a, c) {
  const r = Pi(a).scrollLeft;
  return c ? c.left + r : hl(Fe(a)).left + r;
}
function Hv(a, c, r) {
  r === void 0 && (r = !1);
  const o = a.getBoundingClientRect(), f = o.left + c.scrollLeft - (r ? 0 : (
    // RTL <body> scrollbar.
    as(a, o)
  )), d = o.top + c.scrollTop;
  return {
    x: f,
    y: d
  };
}
function L1(a) {
  let {
    elements: c,
    rect: r,
    offsetParent: o,
    strategy: f
  } = a;
  const d = f === "fixed", h = Fe(o), g = c ? Fi(c.floating) : !1;
  if (o === h || g && d)
    return r;
  let y = {
    scrollLeft: 0,
    scrollTop: 0
  }, v = We(1);
  const b = We(0), A = $e(o);
  if ((A || !A && !d) && ((ma(o) !== "body" || yu(h)) && (y = Pi(o)), $e(o))) {
    const z = hl(o);
    v = ia(o), b.x = z.x + o.clientLeft, b.y = z.y + o.clientTop;
  }
  const O = h && !A && !d ? Hv(h, y, !0) : We(0);
  return {
    width: r.width * v.x,
    height: r.height * v.y,
    x: r.x * v.x - y.scrollLeft * v.x + b.x + O.x,
    y: r.y * v.y - y.scrollTop * v.y + b.y + O.y
  };
}
function Y1(a) {
  return Array.from(a.getClientRects());
}
function q1(a) {
  const c = Fe(a), r = Pi(a), o = a.ownerDocument.body, f = be(c.scrollWidth, c.clientWidth, o.scrollWidth, o.clientWidth), d = be(c.scrollHeight, c.clientHeight, o.scrollHeight, o.clientHeight);
  let h = -r.scrollLeft + as(a);
  const g = -r.scrollTop;
  return Ye(o).direction === "rtl" && (h += be(c.clientWidth, o.clientWidth) - f), {
    width: f,
    height: d,
    x: h,
    y: g
  };
}
function G1(a, c) {
  const r = xe(a), o = Fe(a), f = r.visualViewport;
  let d = o.clientWidth, h = o.clientHeight, g = 0, y = 0;
  if (f) {
    d = f.width, h = f.height;
    const v = ns();
    (!v || v && c === "fixed") && (g = f.offsetLeft, y = f.offsetTop);
  }
  return {
    width: d,
    height: h,
    x: g,
    y
  };
}
function X1(a, c) {
  const r = hl(a, !0, c === "fixed"), o = r.top + a.clientTop, f = r.left + a.clientLeft, d = $e(a) ? ia(a) : We(1), h = a.clientWidth * d.x, g = a.clientHeight * d.y, y = f * d.x, v = o * d.y;
  return {
    width: h,
    height: g,
    x: y,
    y: v
  };
}
function Ch(a, c, r) {
  let o;
  if (c === "viewport")
    o = G1(a, r);
  else if (c === "document")
    o = q1(Fe(a));
  else if (Le(c))
    o = X1(c, r);
  else {
    const f = Uv(a);
    o = {
      x: c.x - f.x,
      y: c.y - f.y,
      width: c.width,
      height: c.height
    };
  }
  return ki(o);
}
function Bv(a, c) {
  const r = kn(a);
  return r === c || !Le(r) || oa(r) ? !1 : Ye(r).position === "fixed" || Bv(r, c);
}
function V1(a, c) {
  const r = c.get(a);
  if (r)
    return r;
  let o = vu(a, [], !1).filter((g) => Le(g) && ma(g) !== "body"), f = null;
  const d = Ye(a).position === "fixed";
  let h = d ? kn(a) : a;
  for (; Le(h) && !oa(h); ) {
    const g = Ye(h), y = es(h);
    !y && g.position === "fixed" && (f = null), (d ? !y && !f : !y && g.position === "static" && !!f && ["absolute", "fixed"].includes(f.position) || yu(h) && !y && Bv(a, h)) ? o = o.filter((b) => b !== h) : f = g, h = kn(h);
  }
  return c.set(a, o), o;
}
function Q1(a) {
  let {
    element: c,
    boundary: r,
    rootBoundary: o,
    strategy: f
  } = a;
  const h = [...r === "clippingAncestors" ? Fi(c) ? [] : V1(c, this._c) : [].concat(r), o], g = h[0], y = h.reduce((v, b) => {
    const A = Ch(c, b, f);
    return v.top = be(A.top, v.top), v.right = Zn(A.right, v.right), v.bottom = Zn(A.bottom, v.bottom), v.left = be(A.left, v.left), v;
  }, Ch(c, g, f));
  return {
    width: y.right - y.left,
    height: y.bottom - y.top,
    x: y.left,
    y: y.top
  };
}
function Z1(a) {
  const {
    width: c,
    height: r
  } = Nv(a);
  return {
    width: c,
    height: r
  };
}
function k1(a, c, r) {
  const o = $e(c), f = Fe(c), d = r === "fixed", h = hl(a, !0, d, c);
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const y = We(0);
  function v() {
    y.x = as(f);
  }
  if (o || !o && !d)
    if ((ma(c) !== "body" || yu(f)) && (g = Pi(c)), o) {
      const z = hl(c, !0, d, c);
      y.x = z.x + c.clientLeft, y.y = z.y + c.clientTop;
    } else f && v();
  d && !o && f && v();
  const b = f && !o && !d ? Hv(f, g) : We(0), A = h.left + g.scrollLeft - y.x - b.x, O = h.top + g.scrollTop - y.y - b.y;
  return {
    x: A,
    y: O,
    width: h.width,
    height: h.height
  };
}
function Nr(a) {
  return Ye(a).position === "static";
}
function zh(a, c) {
  if (!$e(a) || Ye(a).position === "fixed")
    return null;
  if (c)
    return c(a);
  let r = a.offsetParent;
  return Fe(a) === r && (r = r.ownerDocument.body), r;
}
function jv(a, c) {
  const r = xe(a);
  if (Fi(a))
    return r;
  if (!$e(a)) {
    let f = kn(a);
    for (; f && !oa(f); ) {
      if (Le(f) && !Nr(f))
        return f;
      f = kn(f);
    }
    return r;
  }
  let o = zh(a, c);
  for (; o && U1(o) && Nr(o); )
    o = zh(o, c);
  return o && oa(o) && Nr(o) && !es(o) ? r : o || H1(a) || r;
}
const K1 = async function(a) {
  const c = this.getOffsetParent || jv, r = this.getDimensions, o = await r(a.floating);
  return {
    reference: k1(a.reference, await c(a.floating), a.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function J1(a) {
  return Ye(a).direction === "rtl";
}
const W1 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: L1,
  getDocumentElement: Fe,
  getClippingRect: Q1,
  getOffsetParent: jv,
  getElementRects: K1,
  getClientRects: Y1,
  getDimensions: Z1,
  getScale: ia,
  isElement: Le,
  isRTL: J1
};
function Lv(a, c) {
  return a.x === c.x && a.y === c.y && a.width === c.width && a.height === c.height;
}
function $1(a, c) {
  let r = null, o;
  const f = Fe(a);
  function d() {
    var g;
    clearTimeout(o), (g = r) == null || g.disconnect(), r = null;
  }
  function h(g, y) {
    g === void 0 && (g = !1), y === void 0 && (y = 1), d();
    const v = a.getBoundingClientRect(), {
      left: b,
      top: A,
      width: O,
      height: z
    } = v;
    if (g || c(), !O || !z)
      return;
    const U = Yi(A), R = Yi(f.clientWidth - (b + O)), B = Yi(f.clientHeight - (A + z)), L = Yi(b), k = {
      rootMargin: -U + "px " + -R + "px " + -B + "px " + -L + "px",
      threshold: be(0, Zn(1, y)) || 1
    };
    let J = !0;
    function G(et) {
      const W = et[0].intersectionRatio;
      if (W !== y) {
        if (!J)
          return h();
        W ? h(!1, W) : o = setTimeout(() => {
          h(!1, 1e-7);
        }, 1e3);
      }
      W === 1 && !Lv(v, a.getBoundingClientRect()) && h(), J = !1;
    }
    try {
      r = new IntersectionObserver(G, {
        ...k,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(G, k);
    }
    r.observe(a);
  }
  return h(!0), d;
}
function F1(a, c, r, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: f = !0,
    ancestorResize: d = !0,
    elementResize: h = typeof ResizeObserver == "function",
    layoutShift: g = typeof IntersectionObserver == "function",
    animationFrame: y = !1
  } = o, v = ls(a), b = f || d ? [...v ? vu(v) : [], ...vu(c)] : [];
  b.forEach((L) => {
    f && L.addEventListener("scroll", r, {
      passive: !0
    }), d && L.addEventListener("resize", r);
  });
  const A = v && g ? $1(v, r) : null;
  let O = -1, z = null;
  h && (z = new ResizeObserver((L) => {
    let [Q] = L;
    Q && Q.target === v && z && (z.unobserve(c), cancelAnimationFrame(O), O = requestAnimationFrame(() => {
      var k;
      (k = z) == null || k.observe(c);
    })), r();
  }), v && !y && z.observe(v), z.observe(c));
  let U, R = y ? hl(a) : null;
  y && B();
  function B() {
    const L = hl(a);
    R && !Lv(R, L) && r(), R = L, U = requestAnimationFrame(B);
  }
  return r(), () => {
    var L;
    b.forEach((Q) => {
      f && Q.removeEventListener("scroll", r), d && Q.removeEventListener("resize", r);
    }), A == null || A(), (L = z) == null || L.disconnect(), z = null, y && cancelAnimationFrame(U);
  };
}
const P1 = _1, I1 = C1, tS = R1, eS = N1, nS = M1, Nh = O1, lS = z1, aS = (a, c, r) => {
  const o = /* @__PURE__ */ new Map(), f = {
    platform: W1,
    ...r
  }, d = {
    ...f.platform,
    _c: o
  };
  return w1(a, c, {
    ...f,
    platform: d
  });
};
var uS = typeof document < "u", iS = function() {
}, Xi = uS ? x.useLayoutEffect : iS;
function Ki(a, c) {
  if (a === c)
    return !0;
  if (typeof a != typeof c)
    return !1;
  if (typeof a == "function" && a.toString() === c.toString())
    return !0;
  let r, o, f;
  if (a && c && typeof a == "object") {
    if (Array.isArray(a)) {
      if (r = a.length, r !== c.length) return !1;
      for (o = r; o-- !== 0; )
        if (!Ki(a[o], c[o]))
          return !1;
      return !0;
    }
    if (f = Object.keys(a), r = f.length, r !== Object.keys(c).length)
      return !1;
    for (o = r; o-- !== 0; )
      if (!{}.hasOwnProperty.call(c, f[o]))
        return !1;
    for (o = r; o-- !== 0; ) {
      const d = f[o];
      if (!(d === "_owner" && a.$$typeof) && !Ki(a[d], c[d]))
        return !1;
    }
    return !0;
  }
  return a !== a && c !== c;
}
function Yv(a) {
  return typeof window > "u" ? 1 : (a.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Uh(a, c) {
  const r = Yv(a);
  return Math.round(c * r) / r;
}
function Ur(a) {
  const c = x.useRef(a);
  return Xi(() => {
    c.current = a;
  }), c;
}
function cS(a) {
  a === void 0 && (a = {});
  const {
    placement: c = "bottom",
    strategy: r = "absolute",
    middleware: o = [],
    platform: f,
    elements: {
      reference: d,
      floating: h
    } = {},
    transform: g = !0,
    whileElementsMounted: y,
    open: v
  } = a, [b, A] = x.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: c,
    middlewareData: {},
    isPositioned: !1
  }), [O, z] = x.useState(o);
  Ki(O, o) || z(o);
  const [U, R] = x.useState(null), [B, L] = x.useState(null), Q = x.useCallback((N) => {
    N !== et.current && (et.current = N, R(N));
  }, []), k = x.useCallback((N) => {
    N !== W.current && (W.current = N, L(N));
  }, []), J = d || U, G = h || B, et = x.useRef(null), W = x.useRef(null), K = x.useRef(b), ot = y != null, xt = Ur(y), Mt = Ur(f), ht = Ur(v), Tt = x.useCallback(() => {
    if (!et.current || !W.current)
      return;
    const N = {
      placement: c,
      strategy: r,
      middleware: O
    };
    Mt.current && (N.platform = Mt.current), aS(et.current, W.current, N).then((ct) => {
      const S = {
        ...ct,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: ht.current !== !1
      };
      St.current && !Ki(K.current, S) && (K.current = S, kr.flushSync(() => {
        A(S);
      }));
    });
  }, [O, c, r, Mt, ht]);
  Xi(() => {
    v === !1 && K.current.isPositioned && (K.current.isPositioned = !1, A((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [v]);
  const St = x.useRef(!1);
  Xi(() => (St.current = !0, () => {
    St.current = !1;
  }), []), Xi(() => {
    if (J && (et.current = J), G && (W.current = G), J && G) {
      if (xt.current)
        return xt.current(J, G, Tt);
      Tt();
    }
  }, [J, G, Tt, xt, ot]);
  const vt = x.useMemo(() => ({
    reference: et,
    floating: W,
    setReference: Q,
    setFloating: k
  }), [Q, k]), _ = x.useMemo(() => ({
    reference: J,
    floating: G
  }), [J, G]), V = x.useMemo(() => {
    const N = {
      position: r,
      left: 0,
      top: 0
    };
    if (!_.floating)
      return N;
    const ct = Uh(_.floating, b.x), S = Uh(_.floating, b.y);
    return g ? {
      ...N,
      transform: "translate(" + ct + "px, " + S + "px)",
      ...Yv(_.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: ct,
      top: S
    };
  }, [r, g, _.floating, b.x, b.y]);
  return x.useMemo(() => ({
    ...b,
    update: Tt,
    refs: vt,
    elements: _,
    floatingStyles: V
  }), [b, Tt, vt, _, V]);
}
const oS = (a) => {
  function c(r) {
    return {}.hasOwnProperty.call(r, "current");
  }
  return {
    name: "arrow",
    options: a,
    fn(r) {
      const {
        element: o,
        padding: f
      } = typeof a == "function" ? a(r) : a;
      return o && c(o) ? o.current != null ? Nh({
        element: o.current,
        padding: f
      }).fn(r) : {} : o ? Nh({
        element: o,
        padding: f
      }).fn(r) : {};
    }
  };
}, rS = (a, c) => ({
  ...P1(a),
  options: [a, c]
}), sS = (a, c) => ({
  ...I1(a),
  options: [a, c]
}), fS = (a, c) => ({
  ...lS(a),
  options: [a, c]
}), dS = (a, c) => ({
  ...tS(a),
  options: [a, c]
}), mS = (a, c) => ({
  ...eS(a),
  options: [a, c]
}), hS = (a, c) => ({
  ...nS(a),
  options: [a, c]
}), vS = (a, c) => ({
  ...oS(a),
  options: [a, c]
});
var gS = "Arrow", qv = x.forwardRef((a, c) => {
  const { children: r, width: o = 10, height: f = 5, ...d } = a;
  return /* @__PURE__ */ X.jsx(
    re.svg,
    {
      ...d,
      ref: c,
      width: o,
      height: f,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: a.asChild ? r : /* @__PURE__ */ X.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
qv.displayName = gS;
var yS = qv;
function pS(a) {
  const [c, r] = x.useState(void 0);
  return Qn(() => {
    if (a) {
      r({ width: a.offsetWidth, height: a.offsetHeight });
      const o = new ResizeObserver((f) => {
        if (!Array.isArray(f) || !f.length)
          return;
        const d = f[0];
        let h, g;
        if ("borderBoxSize" in d) {
          const y = d.borderBoxSize, v = Array.isArray(y) ? y[0] : y;
          h = v.inlineSize, g = v.blockSize;
        } else
          h = a.offsetWidth, g = a.offsetHeight;
        r({ width: h, height: g });
      });
      return o.observe(a, { box: "border-box" }), () => o.unobserve(a);
    } else
      r(void 0);
  }, [a]), c;
}
var Gv = "Popper", [Xv, Vv] = Kr(Gv), [fx, Qv] = Xv(Gv), Zv = "PopperAnchor", kv = x.forwardRef(
  (a, c) => {
    const { __scopePopper: r, virtualRef: o, ...f } = a, d = Qv(Zv, r), h = x.useRef(null), g = qe(c, h);
    return x.useEffect(() => {
      d.onAnchorChange((o == null ? void 0 : o.current) || h.current);
    }), o ? null : /* @__PURE__ */ X.jsx(re.div, { ...f, ref: g });
  }
);
kv.displayName = Zv;
var us = "PopperContent", [bS, SS] = Xv(us), Kv = x.forwardRef(
  (a, c) => {
    var pt, wt, Pt, ze, Ne, Ue;
    const {
      __scopePopper: r,
      side: o = "bottom",
      sideOffset: f = 0,
      align: d = "center",
      alignOffset: h = 0,
      arrowPadding: g = 0,
      avoidCollisions: y = !0,
      collisionBoundary: v = [],
      collisionPadding: b = 0,
      sticky: A = "partial",
      hideWhenDetached: O = !1,
      updatePositionStrategy: z = "optimized",
      onPlaced: U,
      ...R
    } = a, B = Qv(us, r), [L, Q] = x.useState(null), k = qe(c, (Pe) => Q(Pe)), [J, G] = x.useState(null), et = pS(J), W = (et == null ? void 0 : et.width) ?? 0, K = (et == null ? void 0 : et.height) ?? 0, ot = o + (d !== "center" ? "-" + d : ""), xt = typeof b == "number" ? b : { top: 0, right: 0, bottom: 0, left: 0, ...b }, Mt = Array.isArray(v) ? v : [v], ht = Mt.length > 0, Tt = {
      padding: xt,
      boundary: Mt.filter(ES),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: ht
    }, { refs: St, floatingStyles: vt, placement: _, isPositioned: V, middlewareData: N } = cS({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: ot,
      whileElementsMounted: (...Pe) => F1(...Pe, {
        animationFrame: z === "always"
      }),
      elements: {
        reference: B.anchor
      },
      middleware: [
        rS({ mainAxis: f + K, alignmentAxis: h }),
        y && sS({
          mainAxis: !0,
          crossAxis: !1,
          limiter: A === "partial" ? fS() : void 0,
          ...Tt
        }),
        y && dS({ ...Tt }),
        mS({
          ...Tt,
          apply: ({ elements: Pe, rects: vl, availableWidth: ec, availableHeight: nc }) => {
            const { width: Ee, height: lc } = vl.reference, Kn = Pe.floating.style;
            Kn.setProperty("--radix-popper-available-width", `${ec}px`), Kn.setProperty("--radix-popper-available-height", `${nc}px`), Kn.setProperty("--radix-popper-anchor-width", `${Ee}px`), Kn.setProperty("--radix-popper-anchor-height", `${lc}px`);
          }
        }),
        J && vS({ element: J, padding: g }),
        AS({ arrowWidth: W, arrowHeight: K }),
        O && hS({ strategy: "referenceHidden", ...Tt })
      ]
    }), [ct, S] = $v(_), q = ca(U);
    Qn(() => {
      V && (q == null || q());
    }, [V, q]);
    const $ = (pt = N.arrow) == null ? void 0 : pt.x, Z = (wt = N.arrow) == null ? void 0 : wt.y, F = ((Pt = N.arrow) == null ? void 0 : Pt.centerOffset) !== 0, [st, ut] = x.useState();
    return Qn(() => {
      L && ut(window.getComputedStyle(L).zIndex);
    }, [L]), /* @__PURE__ */ X.jsx(
      "div",
      {
        ref: St.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...vt,
          transform: V ? vt.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: st,
          "--radix-popper-transform-origin": [
            (ze = N.transformOrigin) == null ? void 0 : ze.x,
            (Ne = N.transformOrigin) == null ? void 0 : Ne.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Ue = N.hide) == null ? void 0 : Ue.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: a.dir,
        children: /* @__PURE__ */ X.jsx(
          bS,
          {
            scope: r,
            placedSide: ct,
            onArrowChange: G,
            arrowX: $,
            arrowY: Z,
            shouldHideArrow: F,
            children: /* @__PURE__ */ X.jsx(
              re.div,
              {
                "data-side": ct,
                "data-align": S,
                ...R,
                ref: k,
                style: {
                  ...R.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: V ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Kv.displayName = us;
var Jv = "PopperArrow", xS = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Wv = x.forwardRef(function(c, r) {
  const { __scopePopper: o, ...f } = c, d = SS(Jv, o), h = xS[d.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ X.jsx(
      "span",
      {
        ref: d.onArrowChange,
        style: {
          position: "absolute",
          left: d.arrowX,
          top: d.arrowY,
          [h]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[d.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[d.placedSide],
          visibility: d.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ X.jsx(
          yS,
          {
            ...f,
            ref: r,
            style: {
              ...f.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Wv.displayName = Jv;
function ES(a) {
  return a !== null;
}
var AS = (a) => ({
  name: "transformOrigin",
  options: a,
  fn(c) {
    var B, L, Q;
    const { placement: r, rects: o, middlewareData: f } = c, h = ((B = f.arrow) == null ? void 0 : B.centerOffset) !== 0, g = h ? 0 : a.arrowWidth, y = h ? 0 : a.arrowHeight, [v, b] = $v(r), A = { start: "0%", center: "50%", end: "100%" }[b], O = (((L = f.arrow) == null ? void 0 : L.x) ?? 0) + g / 2, z = (((Q = f.arrow) == null ? void 0 : Q.y) ?? 0) + y / 2;
    let U = "", R = "";
    return v === "bottom" ? (U = h ? A : `${O}px`, R = `${-y}px`) : v === "top" ? (U = h ? A : `${O}px`, R = `${o.floating.height + y}px`) : v === "right" ? (U = `${-y}px`, R = h ? A : `${z}px`) : v === "left" && (U = `${o.floating.width + y}px`, R = h ? A : `${z}px`), { data: { x: U, y: R } };
  }
});
function $v(a) {
  const [c, r = "center"] = a.split("-");
  return [c, r];
}
var TS = kv, wS = Kv, OS = Wv, RS = Object.freeze({
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
}), MS = "VisuallyHidden", Fv = x.forwardRef(
  (a, c) => /* @__PURE__ */ X.jsx(
    re.span,
    {
      ...a,
      ref: c,
      style: { ...RS, ...a.style }
    }
  )
);
Fv.displayName = MS;
var DS = Fv, [Ii, dx] = Kr("Tooltip", [
  Vv
]), is = Vv(), Pv = "TooltipProvider", _S = 700, Hh = "tooltip.open", [CS, Iv] = Ii(Pv), tg = (a) => {
  const {
    __scopeTooltip: c,
    delayDuration: r = _S,
    skipDelayDuration: o = 300,
    disableHoverableContent: f = !1,
    children: d
  } = a, h = x.useRef(!0), g = x.useRef(!1), y = x.useRef(0);
  return x.useEffect(() => {
    const v = y.current;
    return () => window.clearTimeout(v);
  }, []), /* @__PURE__ */ X.jsx(
    CS,
    {
      scope: c,
      isOpenDelayedRef: h,
      delayDuration: r,
      onOpen: x.useCallback(() => {
        window.clearTimeout(y.current), h.current = !1;
      }, []),
      onClose: x.useCallback(() => {
        window.clearTimeout(y.current), y.current = window.setTimeout(
          () => h.current = !0,
          o
        );
      }, [o]),
      isPointerInTransitRef: g,
      onPointerInTransitChange: x.useCallback((v) => {
        g.current = v;
      }, []),
      disableHoverableContent: f,
      children: d
    }
  );
};
tg.displayName = Pv;
var eg = "Tooltip", [mx, tc] = Ii(eg), Vr = "TooltipTrigger", zS = x.forwardRef(
  (a, c) => {
    const { __scopeTooltip: r, ...o } = a, f = tc(Vr, r), d = Iv(Vr, r), h = is(r), g = x.useRef(null), y = qe(c, g, f.onTriggerChange), v = x.useRef(!1), b = x.useRef(!1), A = x.useCallback(() => v.current = !1, []);
    return x.useEffect(() => () => document.removeEventListener("pointerup", A), [A]), /* @__PURE__ */ X.jsx(TS, { asChild: !0, ...h, children: /* @__PURE__ */ X.jsx(
      re.button,
      {
        "aria-describedby": f.open ? f.contentId : void 0,
        "data-state": f.stateAttribute,
        ...o,
        ref: y,
        onPointerMove: oe(a.onPointerMove, (O) => {
          O.pointerType !== "touch" && !b.current && !d.isPointerInTransitRef.current && (f.onTriggerEnter(), b.current = !0);
        }),
        onPointerLeave: oe(a.onPointerLeave, () => {
          f.onTriggerLeave(), b.current = !1;
        }),
        onPointerDown: oe(a.onPointerDown, () => {
          f.open && f.onClose(), v.current = !0, document.addEventListener("pointerup", A, { once: !0 });
        }),
        onFocus: oe(a.onFocus, () => {
          v.current || f.onOpen();
        }),
        onBlur: oe(a.onBlur, f.onClose),
        onClick: oe(a.onClick, f.onClose)
      }
    ) });
  }
);
zS.displayName = Vr;
var NS = "TooltipPortal", [hx, US] = Ii(NS, {
  forceMount: void 0
}), ra = "TooltipContent", HS = x.forwardRef(
  (a, c) => {
    const r = US(ra, a.__scopeTooltip), { forceMount: o = r.forceMount, side: f = "top", ...d } = a, h = tc(ra, a.__scopeTooltip);
    return /* @__PURE__ */ X.jsx(gu, { present: o || h.open, children: h.disableHoverableContent ? /* @__PURE__ */ X.jsx(ng, { side: f, ...d, ref: c }) : /* @__PURE__ */ X.jsx(BS, { side: f, ...d, ref: c }) });
  }
), BS = x.forwardRef((a, c) => {
  const r = tc(ra, a.__scopeTooltip), o = Iv(ra, a.__scopeTooltip), f = x.useRef(null), d = qe(c, f), [h, g] = x.useState(null), { trigger: y, onClose: v } = r, b = f.current, { onPointerInTransitChange: A } = o, O = x.useCallback(() => {
    g(null), A(!1);
  }, [A]), z = x.useCallback(
    (U, R) => {
      const B = U.currentTarget, L = { x: U.clientX, y: U.clientY }, Q = GS(L, B.getBoundingClientRect()), k = XS(L, Q), J = VS(R.getBoundingClientRect()), G = ZS([...k, ...J]);
      g(G), A(!0);
    },
    [A]
  );
  return x.useEffect(() => () => O(), [O]), x.useEffect(() => {
    if (y && b) {
      const U = (B) => z(B, b), R = (B) => z(B, y);
      return y.addEventListener("pointerleave", U), b.addEventListener("pointerleave", R), () => {
        y.removeEventListener("pointerleave", U), b.removeEventListener("pointerleave", R);
      };
    }
  }, [y, b, z, O]), x.useEffect(() => {
    if (h) {
      const U = (R) => {
        const B = R.target, L = { x: R.clientX, y: R.clientY }, Q = (y == null ? void 0 : y.contains(B)) || (b == null ? void 0 : b.contains(B)), k = !QS(L, h);
        Q ? O() : k && (O(), v());
      };
      return document.addEventListener("pointermove", U), () => document.removeEventListener("pointermove", U);
    }
  }, [y, b, h, v, O]), /* @__PURE__ */ X.jsx(ng, { ...a, ref: d });
}), [jS, LS] = Ii(eg, { isInside: !1 }), YS = /* @__PURE__ */ Bp("TooltipContent"), ng = x.forwardRef(
  (a, c) => {
    const {
      __scopeTooltip: r,
      children: o,
      "aria-label": f,
      onEscapeKeyDown: d,
      onPointerDownOutside: h,
      ...g
    } = a, y = tc(ra, r), v = is(r), { onClose: b } = y;
    return x.useEffect(() => (document.addEventListener(Hh, b), () => document.removeEventListener(Hh, b)), [b]), x.useEffect(() => {
      if (y.trigger) {
        const A = (O) => {
          const z = O.target;
          z != null && z.contains(y.trigger) && b();
        };
        return window.addEventListener("scroll", A, { capture: !0 }), () => window.removeEventListener("scroll", A, { capture: !0 });
      }
    }, [y.trigger, b]), /* @__PURE__ */ X.jsx(
      Jr,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: d,
        onPointerDownOutside: h,
        onFocusOutside: (A) => A.preventDefault(),
        onDismiss: b,
        children: /* @__PURE__ */ X.jsxs(
          wS,
          {
            "data-state": y.stateAttribute,
            ...v,
            ...g,
            ref: c,
            style: {
              ...g.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ X.jsx(YS, { children: o }),
              /* @__PURE__ */ X.jsx(jS, { scope: r, isInside: !0, children: /* @__PURE__ */ X.jsx(DS, { id: y.contentId, role: "tooltip", children: f || o }) })
            ]
          }
        )
      }
    );
  }
);
HS.displayName = ra;
var lg = "TooltipArrow", qS = x.forwardRef(
  (a, c) => {
    const { __scopeTooltip: r, ...o } = a, f = is(r);
    return LS(
      lg,
      r
    ).isInside ? null : /* @__PURE__ */ X.jsx(OS, { ...f, ...o, ref: c });
  }
);
qS.displayName = lg;
function GS(a, c) {
  const r = Math.abs(c.top - a.y), o = Math.abs(c.bottom - a.y), f = Math.abs(c.right - a.x), d = Math.abs(c.left - a.x);
  switch (Math.min(r, o, f, d)) {
    case d:
      return "left";
    case f:
      return "right";
    case r:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function XS(a, c, r = 5) {
  const o = [];
  switch (c) {
    case "top":
      o.push(
        { x: a.x - r, y: a.y + r },
        { x: a.x + r, y: a.y + r }
      );
      break;
    case "bottom":
      o.push(
        { x: a.x - r, y: a.y - r },
        { x: a.x + r, y: a.y - r }
      );
      break;
    case "left":
      o.push(
        { x: a.x + r, y: a.y - r },
        { x: a.x + r, y: a.y + r }
      );
      break;
    case "right":
      o.push(
        { x: a.x - r, y: a.y - r },
        { x: a.x - r, y: a.y + r }
      );
      break;
  }
  return o;
}
function VS(a) {
  const { top: c, right: r, bottom: o, left: f } = a;
  return [
    { x: f, y: c },
    { x: r, y: c },
    { x: r, y: o },
    { x: f, y: o }
  ];
}
function QS(a, c) {
  const { x: r, y: o } = a;
  let f = !1;
  for (let d = 0, h = c.length - 1; d < c.length; h = d++) {
    const g = c[d], y = c[h], v = g.x, b = g.y, A = y.x, O = y.y;
    b > o != O > o && r < (A - v) * (o - b) / (O - b) + v && (f = !f);
  }
  return f;
}
function ZS(a) {
  const c = a.slice();
  return c.sort((r, o) => r.x < o.x ? -1 : r.x > o.x ? 1 : r.y < o.y ? -1 : r.y > o.y ? 1 : 0), kS(c);
}
function kS(a) {
  if (a.length <= 1) return a.slice();
  const c = [];
  for (let o = 0; o < a.length; o++) {
    const f = a[o];
    for (; c.length >= 2; ) {
      const d = c[c.length - 1], h = c[c.length - 2];
      if ((d.x - h.x) * (f.y - h.y) >= (d.y - h.y) * (f.x - h.x)) c.pop();
      else break;
    }
    c.push(f);
  }
  c.pop();
  const r = [];
  for (let o = a.length - 1; o >= 0; o--) {
    const f = a[o];
    for (; r.length >= 2; ) {
      const d = r[r.length - 1], h = r[r.length - 2];
      if ((d.x - h.x) * (f.y - h.y) >= (d.y - h.y) * (f.x - h.x)) r.pop();
      else break;
    }
    r.push(f);
  }
  return r.pop(), c.length === 1 && r.length === 1 && c[0].x === r[0].x && c[0].y === r[0].y ? c : c.concat(r);
}
var KS = tg;
function JS({
  delayDuration: a = 0,
  ...c
}) {
  return /* @__PURE__ */ X.jsx(
    KS,
    {
      "data-slot": "tooltip-provider",
      delayDuration: a,
      ...c
    }
  );
}
const WS = "sidebar_state", $S = 60 * 60 * 24 * 7, FS = "16rem", PS = "18rem", IS = "3rem", tx = "b", ag = x.createContext(null);
function ex() {
  const a = x.useContext(ag);
  if (!a)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return a;
}
function nx({
  defaultOpen: a = !0,
  open: c,
  onOpenChange: r,
  className: o,
  style: f,
  children: d,
  ...h
}) {
  const g = Wp(), [y, v] = x.useState(!1), [b, A] = x.useState(a), O = c ?? b, z = x.useCallback(
    (L) => {
      const Q = typeof L == "function" ? L(O) : L;
      r ? r(Q) : A(Q), document.cookie = `${WS}=${Q}; path=/; max-age=${$S}`;
    },
    [r, O]
  ), U = x.useCallback(() => g ? v((L) => !L) : z((L) => !L), [g, z, v]);
  x.useEffect(() => {
    const L = (Q) => {
      Q.key === tx && (Q.metaKey || Q.ctrlKey) && (Q.preventDefault(), U());
    };
    return window.addEventListener("keydown", L), () => window.removeEventListener("keydown", L);
  }, [U]);
  const R = O ? "expanded" : "collapsed", B = x.useMemo(
    () => ({
      state: R,
      open: O,
      setOpen: z,
      isMobile: g,
      openMobile: y,
      setOpenMobile: v,
      toggleSidebar: U
    }),
    [R, O, z, g, y, v, U]
  );
  return /* @__PURE__ */ X.jsx(ag.Provider, { value: B, children: /* @__PURE__ */ X.jsx(JS, { delayDuration: 0, children: /* @__PURE__ */ X.jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": FS,
        "--sidebar-width-icon": IS,
        ...f
      },
      className: Se(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        o
      ),
      ...h,
      children: d
    }
  ) }) });
}
function lx({
  side: a = "left",
  variant: c = "sidebar",
  collapsible: r = "offcanvas",
  className: o,
  children: f,
  ...d
}) {
  const { isMobile: h, state: g, openMobile: y, setOpenMobile: v } = ex();
  return r === "none" ? /* @__PURE__ */ X.jsx(
    "div",
    {
      "data-slot": "sidebar",
      className: Se(
        "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
        o
      ),
      ...d,
      children: f
    }
  ) : h ? /* @__PURE__ */ X.jsx(s1, { open: y, onOpenChange: v, ...d, children: /* @__PURE__ */ X.jsxs(
    m1,
    {
      "data-sidebar": "sidebar",
      "data-slot": "sidebar",
      "data-mobile": "true",
      className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
      style: {
        "--sidebar-width": PS
      },
      side: a,
      children: [
        /* @__PURE__ */ X.jsxs(h1, { className: "sr-only", children: [
          /* @__PURE__ */ X.jsx(v1, { children: "Sidebar" }),
          /* @__PURE__ */ X.jsx(g1, { children: "Displays the mobile sidebar." })
        ] }),
        /* @__PURE__ */ X.jsx("div", { className: "flex h-full w-full flex-col", children: f })
      ]
    }
  ) }) : /* @__PURE__ */ X.jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": g,
      "data-collapsible": g === "collapsed" ? r : "",
      "data-variant": c,
      "data-side": a,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ X.jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: Se(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              c === "floating" || c === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ X.jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: Se(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              a === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              c === "floating" || c === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              o
            ),
            ...d,
            children: /* @__PURE__ */ X.jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children: f
              }
            )
          }
        )
      ]
    }
  );
}
function ax({ className: a, ...c }) {
  return /* @__PURE__ */ X.jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: Se("flex flex-col gap-2 p-2", a),
      ...c
    }
  );
}
function ux({ className: a, ...c }) {
  return /* @__PURE__ */ X.jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: Se("flex flex-col gap-2 p-2", a),
      ...c
    }
  );
}
function ix({ className: a, ...c }) {
  return /* @__PURE__ */ X.jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: Se(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        a
      ),
      ...c
    }
  );
}
function Bh({ className: a, ...c }) {
  return /* @__PURE__ */ X.jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: Se("relative flex w-full min-w-0 flex-col p-2", a),
      ...c
    }
  );
}
function cx() {
  return /* @__PURE__ */ X.jsxs(lx, { children: [
    /* @__PURE__ */ X.jsx(ax, {}),
    /* @__PURE__ */ X.jsxs(ix, { children: [
      /* @__PURE__ */ X.jsx(Bh, {}),
      /* @__PURE__ */ X.jsx(Bh, {})
    ] }),
    /* @__PURE__ */ X.jsx(ux, {})
  ] });
}
function ox() {
  return /* @__PURE__ */ X.jsxs(nx, { children: [
    /* @__PURE__ */ X.jsx(cx, {}),
    /* @__PURE__ */ X.jsx("main", {})
  ] });
}
Up.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ X.jsx(x.StrictMode, { children: /* @__PURE__ */ X.jsx(ox, {}) })
);
