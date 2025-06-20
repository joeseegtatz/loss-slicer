var of = { exports: {} }, Du = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yd;
function d0() {
  if (yd) return Du;
  yd = 1;
  var f = Symbol.for("react.transitional.element"), z = Symbol.for("react.fragment");
  function S(o, O, R) {
    var q = null;
    if (R !== void 0 && (q = "" + R), O.key !== void 0 && (q = "" + O.key), "key" in O) {
      R = {};
      for (var j in O)
        j !== "key" && (R[j] = O[j]);
    } else R = O;
    return O = R.ref, {
      $$typeof: f,
      type: o,
      key: q,
      ref: O !== void 0 ? O : null,
      props: R
    };
  }
  return Du.Fragment = z, Du.jsx = S, Du.jsxs = S, Du;
}
var sf = { exports: {} }, J = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hd;
function m0() {
  if (hd) return J;
  hd = 1;
  var f = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), q = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), K = Symbol.iterator;
  function k(r) {
    return r === null || typeof r != "object" ? null : (r = K && r[K] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var Sl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, il = Object.assign, yl = {};
  function gl(r, M, H) {
    this.props = r, this.context = M, this.refs = yl, this.updater = H || Sl;
  }
  gl.prototype.isReactComponent = {}, gl.prototype.setState = function(r, M) {
    if (typeof r != "object" && typeof r != "function" && r != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, r, M, "setState");
  }, gl.prototype.forceUpdate = function(r) {
    this.updater.enqueueForceUpdate(this, r, "forceUpdate");
  };
  function Jl() {
  }
  Jl.prototype = gl.prototype;
  function $l(r, M, H) {
    this.props = r, this.context = M, this.refs = yl, this.updater = H || Sl;
  }
  var Al = $l.prototype = new Jl();
  Al.constructor = $l, il(Al, gl.prototype), Al.isPureReactComponent = !0;
  var Yl = Array.isArray, W = { H: null, A: null, T: null, S: null, V: null }, Ml = Object.prototype.hasOwnProperty;
  function Nl(r, M, H, D, B, P) {
    return H = P.ref, {
      $$typeof: f,
      type: r,
      key: M,
      ref: H !== void 0 ? H : null,
      props: P
    };
  }
  function Q(r, M) {
    return Nl(
      r.type,
      M,
      void 0,
      void 0,
      void 0,
      r.props
    );
  }
  function Dl(r) {
    return typeof r == "object" && r !== null && r.$$typeof === f;
  }
  function Ht(r) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + r.replace(/[=:]/g, function(H) {
      return M[H];
    });
  }
  var dt = /\/+/g;
  function Ol(r, M) {
    return typeof r == "object" && r !== null && r.key != null ? Ht("" + r.key) : M.toString(36);
  }
  function Ot() {
  }
  function At(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (typeof r.status == "string" ? r.then(Ot, Ot) : (r.status = "pending", r.then(
          function(M) {
            r.status === "pending" && (r.status = "fulfilled", r.value = M);
          },
          function(M) {
            r.status === "pending" && (r.status = "rejected", r.reason = M);
          }
        )), r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function pl(r, M, H, D, B) {
    var P = typeof r;
    (P === "undefined" || P === "boolean") && (r = null);
    var L = !1;
    if (r === null) L = !0;
    else
      switch (P) {
        case "bigint":
        case "string":
        case "number":
          L = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case f:
            case z:
              L = !0;
              break;
            case N:
              return L = r._init, pl(
                L(r._payload),
                M,
                H,
                D,
                B
              );
          }
      }
    if (L)
      return B = B(r), L = D === "" ? "." + Ol(r, 0) : D, Yl(B) ? (H = "", L != null && (H = L.replace(dt, "$&/") + "/"), pl(B, M, H, "", function(et) {
        return et;
      })) : B != null && (Dl(B) && (B = Q(
        B,
        H + (B.key == null || r && r.key === B.key ? "" : ("" + B.key).replace(
          dt,
          "$&/"
        ) + "/") + L
      )), M.push(B)), 1;
    L = 0;
    var al = D === "" ? "." : D + ":";
    if (Yl(r))
      for (var ml = 0; ml < r.length; ml++)
        D = r[ml], P = al + Ol(D, ml), L += pl(
          D,
          M,
          H,
          P,
          B
        );
    else if (ml = k(r), typeof ml == "function")
      for (r = ml.call(r), ml = 0; !(D = r.next()).done; )
        D = D.value, P = al + Ol(D, ml++), L += pl(
          D,
          M,
          H,
          P,
          B
        );
    else if (P === "object") {
      if (typeof r.then == "function")
        return pl(
          At(r),
          M,
          H,
          D,
          B
        );
      throw M = String(r), Error(
        "Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return L;
  }
  function p(r, M, H) {
    if (r == null) return r;
    var D = [], B = 0;
    return pl(r, D, "", "", function(P) {
      return M.call(H, P, B++);
    }), D;
  }
  function U(r) {
    if (r._status === -1) {
      var M = r._result;
      M = M(), M.then(
        function(H) {
          (r._status === 0 || r._status === -1) && (r._status = 1, r._result = H);
        },
        function(H) {
          (r._status === 0 || r._status === -1) && (r._status = 2, r._result = H);
        }
      ), r._status === -1 && (r._status = 0, r._result = M);
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var _ = typeof reportError == "function" ? reportError : function(r) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var M = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
        error: r
      });
      if (!window.dispatchEvent(M)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", r);
      return;
    }
    console.error(r);
  };
  function cl() {
  }
  return J.Children = {
    map: p,
    forEach: function(r, M, H) {
      p(
        r,
        function() {
          M.apply(this, arguments);
        },
        H
      );
    },
    count: function(r) {
      var M = 0;
      return p(r, function() {
        M++;
      }), M;
    },
    toArray: function(r) {
      return p(r, function(M) {
        return M;
      }) || [];
    },
    only: function(r) {
      if (!Dl(r))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return r;
    }
  }, J.Component = gl, J.Fragment = S, J.Profiler = O, J.PureComponent = $l, J.StrictMode = o, J.Suspense = x, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(r) {
      return W.H.useMemoCache(r);
    }
  }, J.cache = function(r) {
    return function() {
      return r.apply(null, arguments);
    };
  }, J.cloneElement = function(r, M, H) {
    if (r == null)
      throw Error(
        "The argument must be a React element, but you passed " + r + "."
      );
    var D = il({}, r.props), B = r.key, P = void 0;
    if (M != null)
      for (L in M.ref !== void 0 && (P = void 0), M.key !== void 0 && (B = "" + M.key), M)
        !Ml.call(M, L) || L === "key" || L === "__self" || L === "__source" || L === "ref" && M.ref === void 0 || (D[L] = M[L]);
    var L = arguments.length - 2;
    if (L === 1) D.children = H;
    else if (1 < L) {
      for (var al = Array(L), ml = 0; ml < L; ml++)
        al[ml] = arguments[ml + 2];
      D.children = al;
    }
    return Nl(r.type, B, void 0, void 0, P, D);
  }, J.createContext = function(r) {
    return r = {
      $$typeof: q,
      _currentValue: r,
      _currentValue2: r,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, r.Provider = r, r.Consumer = {
      $$typeof: R,
      _context: r
    }, r;
  }, J.createElement = function(r, M, H) {
    var D, B = {}, P = null;
    if (M != null)
      for (D in M.key !== void 0 && (P = "" + M.key), M)
        Ml.call(M, D) && D !== "key" && D !== "__self" && D !== "__source" && (B[D] = M[D]);
    var L = arguments.length - 2;
    if (L === 1) B.children = H;
    else if (1 < L) {
      for (var al = Array(L), ml = 0; ml < L; ml++)
        al[ml] = arguments[ml + 2];
      B.children = al;
    }
    if (r && r.defaultProps)
      for (D in L = r.defaultProps, L)
        B[D] === void 0 && (B[D] = L[D]);
    return Nl(r, P, void 0, void 0, null, B);
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(r) {
    return { $$typeof: j, render: r };
  }, J.isValidElement = Dl, J.lazy = function(r) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: r },
      _init: U
    };
  }, J.memo = function(r, M) {
    return {
      $$typeof: b,
      type: r,
      compare: M === void 0 ? null : M
    };
  }, J.startTransition = function(r) {
    var M = W.T, H = {};
    W.T = H;
    try {
      var D = r(), B = W.S;
      B !== null && B(H, D), typeof D == "object" && D !== null && typeof D.then == "function" && D.then(cl, _);
    } catch (P) {
      _(P);
    } finally {
      W.T = M;
    }
  }, J.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, J.use = function(r) {
    return W.H.use(r);
  }, J.useActionState = function(r, M, H) {
    return W.H.useActionState(r, M, H);
  }, J.useCallback = function(r, M) {
    return W.H.useCallback(r, M);
  }, J.useContext = function(r) {
    return W.H.useContext(r);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(r, M) {
    return W.H.useDeferredValue(r, M);
  }, J.useEffect = function(r, M, H) {
    var D = W.H;
    if (typeof H == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return D.useEffect(r, M);
  }, J.useId = function() {
    return W.H.useId();
  }, J.useImperativeHandle = function(r, M, H) {
    return W.H.useImperativeHandle(r, M, H);
  }, J.useInsertionEffect = function(r, M) {
    return W.H.useInsertionEffect(r, M);
  }, J.useLayoutEffect = function(r, M) {
    return W.H.useLayoutEffect(r, M);
  }, J.useMemo = function(r, M) {
    return W.H.useMemo(r, M);
  }, J.useOptimistic = function(r, M) {
    return W.H.useOptimistic(r, M);
  }, J.useReducer = function(r, M, H) {
    return W.H.useReducer(r, M, H);
  }, J.useRef = function(r) {
    return W.H.useRef(r);
  }, J.useState = function(r) {
    return W.H.useState(r);
  }, J.useSyncExternalStore = function(r, M, H) {
    return W.H.useSyncExternalStore(
      r,
      M,
      H
    );
  }, J.useTransition = function() {
    return W.H.useTransition();
  }, J.version = "19.1.0", J;
}
var gd;
function pf() {
  return gd || (gd = 1, sf.exports = m0()), sf.exports;
}
var bd;
function v0() {
  return bd || (bd = 1, of.exports = d0()), of.exports;
}
var Ve = v0(), Wl = pf(), rf = { exports: {} }, Ru = {}, df = { exports: {} }, mf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sd;
function y0() {
  return Sd || (Sd = 1, function(f) {
    function z(p, U) {
      var _ = p.length;
      p.push(U);
      l: for (; 0 < _; ) {
        var cl = _ - 1 >>> 1, r = p[cl];
        if (0 < O(r, U))
          p[cl] = U, p[_] = r, _ = cl;
        else break l;
      }
    }
    function S(p) {
      return p.length === 0 ? null : p[0];
    }
    function o(p) {
      if (p.length === 0) return null;
      var U = p[0], _ = p.pop();
      if (_ !== U) {
        p[0] = _;
        l: for (var cl = 0, r = p.length, M = r >>> 1; cl < M; ) {
          var H = 2 * (cl + 1) - 1, D = p[H], B = H + 1, P = p[B];
          if (0 > O(D, _))
            B < r && 0 > O(P, D) ? (p[cl] = P, p[B] = _, cl = B) : (p[cl] = D, p[H] = _, cl = H);
          else if (B < r && 0 > O(P, _))
            p[cl] = P, p[B] = _, cl = B;
          else break l;
        }
      }
      return U;
    }
    function O(p, U) {
      var _ = p.sortIndex - U.sortIndex;
      return _ !== 0 ? _ : p.id - U.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var R = performance;
      f.unstable_now = function() {
        return R.now();
      };
    } else {
      var q = Date, j = q.now();
      f.unstable_now = function() {
        return q.now() - j;
      };
    }
    var x = [], b = [], N = 1, K = null, k = 3, Sl = !1, il = !1, yl = !1, gl = !1, Jl = typeof setTimeout == "function" ? setTimeout : null, $l = typeof clearTimeout == "function" ? clearTimeout : null, Al = typeof setImmediate < "u" ? setImmediate : null;
    function Yl(p) {
      for (var U = S(b); U !== null; ) {
        if (U.callback === null) o(b);
        else if (U.startTime <= p)
          o(b), U.sortIndex = U.expirationTime, z(x, U);
        else break;
        U = S(b);
      }
    }
    function W(p) {
      if (yl = !1, Yl(p), !il)
        if (S(x) !== null)
          il = !0, Ml || (Ml = !0, Ol());
        else {
          var U = S(b);
          U !== null && pl(W, U.startTime - p);
        }
    }
    var Ml = !1, Nl = -1, Q = 5, Dl = -1;
    function Ht() {
      return gl ? !0 : !(f.unstable_now() - Dl < Q);
    }
    function dt() {
      if (gl = !1, Ml) {
        var p = f.unstable_now();
        Dl = p;
        var U = !0;
        try {
          l: {
            il = !1, yl && (yl = !1, $l(Nl), Nl = -1), Sl = !0;
            var _ = k;
            try {
              t: {
                for (Yl(p), K = S(x); K !== null && !(K.expirationTime > p && Ht()); ) {
                  var cl = K.callback;
                  if (typeof cl == "function") {
                    K.callback = null, k = K.priorityLevel;
                    var r = cl(
                      K.expirationTime <= p
                    );
                    if (p = f.unstable_now(), typeof r == "function") {
                      K.callback = r, Yl(p), U = !0;
                      break t;
                    }
                    K === S(x) && o(x), Yl(p);
                  } else o(x);
                  K = S(x);
                }
                if (K !== null) U = !0;
                else {
                  var M = S(b);
                  M !== null && pl(
                    W,
                    M.startTime - p
                  ), U = !1;
                }
              }
              break l;
            } finally {
              K = null, k = _, Sl = !1;
            }
            U = void 0;
          }
        } finally {
          U ? Ol() : Ml = !1;
        }
      }
    }
    var Ol;
    if (typeof Al == "function")
      Ol = function() {
        Al(dt);
      };
    else if (typeof MessageChannel < "u") {
      var Ot = new MessageChannel(), At = Ot.port2;
      Ot.port1.onmessage = dt, Ol = function() {
        At.postMessage(null);
      };
    } else
      Ol = function() {
        Jl(dt, 0);
      };
    function pl(p, U) {
      Nl = Jl(function() {
        p(f.unstable_now());
      }, U);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(p) {
      p.callback = null;
    }, f.unstable_forceFrameRate = function(p) {
      0 > p || 125 < p ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Q = 0 < p ? Math.floor(1e3 / p) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return k;
    }, f.unstable_next = function(p) {
      switch (k) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = k;
      }
      var _ = k;
      k = U;
      try {
        return p();
      } finally {
        k = _;
      }
    }, f.unstable_requestPaint = function() {
      gl = !0;
    }, f.unstable_runWithPriority = function(p, U) {
      switch (p) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          p = 3;
      }
      var _ = k;
      k = p;
      try {
        return U();
      } finally {
        k = _;
      }
    }, f.unstable_scheduleCallback = function(p, U, _) {
      var cl = f.unstable_now();
      switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? cl + _ : cl) : _ = cl, p) {
        case 1:
          var r = -1;
          break;
        case 2:
          r = 250;
          break;
        case 5:
          r = 1073741823;
          break;
        case 4:
          r = 1e4;
          break;
        default:
          r = 5e3;
      }
      return r = _ + r, p = {
        id: N++,
        callback: U,
        priorityLevel: p,
        startTime: _,
        expirationTime: r,
        sortIndex: -1
      }, _ > cl ? (p.sortIndex = _, z(b, p), S(x) === null && p === S(b) && (yl ? ($l(Nl), Nl = -1) : yl = !0, pl(W, _ - cl))) : (p.sortIndex = r, z(x, p), il || Sl || (il = !0, Ml || (Ml = !0, Ol()))), p;
    }, f.unstable_shouldYield = Ht, f.unstable_wrapCallback = function(p) {
      var U = k;
      return function() {
        var _ = k;
        k = U;
        try {
          return p.apply(this, arguments);
        } finally {
          k = _;
        }
      };
    };
  }(mf)), mf;
}
var pd;
function h0() {
  return pd || (pd = 1, df.exports = y0()), df.exports;
}
var vf = { exports: {} }, Kl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Td;
function g0() {
  if (Td) return Kl;
  Td = 1;
  var f = pf();
  function z(x) {
    var b = "https://react.dev/errors/" + x;
    if (1 < arguments.length) {
      b += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        b += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + x + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function S() {
  }
  var o = {
    d: {
      f: S,
      r: function() {
        throw Error(z(522));
      },
      D: S,
      C: S,
      L: S,
      m: S,
      X: S,
      S,
      M: S
    },
    p: 0,
    findDOMNode: null
  }, O = Symbol.for("react.portal");
  function R(x, b, N) {
    var K = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: O,
      key: K == null ? null : "" + K,
      children: x,
      containerInfo: b,
      implementation: N
    };
  }
  var q = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function j(x, b) {
    if (x === "font") return "";
    if (typeof b == "string")
      return b === "use-credentials" ? b : "";
  }
  return Kl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Kl.createPortal = function(x, b) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!b || b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11)
      throw Error(z(299));
    return R(x, b, null, N);
  }, Kl.flushSync = function(x) {
    var b = q.T, N = o.p;
    try {
      if (q.T = null, o.p = 2, x) return x();
    } finally {
      q.T = b, o.p = N, o.d.f();
    }
  }, Kl.preconnect = function(x, b) {
    typeof x == "string" && (b ? (b = b.crossOrigin, b = typeof b == "string" ? b === "use-credentials" ? b : "" : void 0) : b = null, o.d.C(x, b));
  }, Kl.prefetchDNS = function(x) {
    typeof x == "string" && o.d.D(x);
  }, Kl.preinit = function(x, b) {
    if (typeof x == "string" && b && typeof b.as == "string") {
      var N = b.as, K = j(N, b.crossOrigin), k = typeof b.integrity == "string" ? b.integrity : void 0, Sl = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
      N === "style" ? o.d.S(
        x,
        typeof b.precedence == "string" ? b.precedence : void 0,
        {
          crossOrigin: K,
          integrity: k,
          fetchPriority: Sl
        }
      ) : N === "script" && o.d.X(x, {
        crossOrigin: K,
        integrity: k,
        fetchPriority: Sl,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0
      });
    }
  }, Kl.preinitModule = function(x, b) {
    if (typeof x == "string")
      if (typeof b == "object" && b !== null) {
        if (b.as == null || b.as === "script") {
          var N = j(
            b.as,
            b.crossOrigin
          );
          o.d.M(x, {
            crossOrigin: N,
            integrity: typeof b.integrity == "string" ? b.integrity : void 0,
            nonce: typeof b.nonce == "string" ? b.nonce : void 0
          });
        }
      } else b == null && o.d.M(x);
  }, Kl.preload = function(x, b) {
    if (typeof x == "string" && typeof b == "object" && b !== null && typeof b.as == "string") {
      var N = b.as, K = j(N, b.crossOrigin);
      o.d.L(x, N, {
        crossOrigin: K,
        integrity: typeof b.integrity == "string" ? b.integrity : void 0,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0,
        type: typeof b.type == "string" ? b.type : void 0,
        fetchPriority: typeof b.fetchPriority == "string" ? b.fetchPriority : void 0,
        referrerPolicy: typeof b.referrerPolicy == "string" ? b.referrerPolicy : void 0,
        imageSrcSet: typeof b.imageSrcSet == "string" ? b.imageSrcSet : void 0,
        imageSizes: typeof b.imageSizes == "string" ? b.imageSizes : void 0,
        media: typeof b.media == "string" ? b.media : void 0
      });
    }
  }, Kl.preloadModule = function(x, b) {
    if (typeof x == "string")
      if (b) {
        var N = j(b.as, b.crossOrigin);
        o.d.m(x, {
          as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
          crossOrigin: N,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0
        });
      } else o.d.m(x);
  }, Kl.requestFormReset = function(x) {
    o.d.r(x);
  }, Kl.unstable_batchedUpdates = function(x, b) {
    return x(b);
  }, Kl.useFormState = function(x, b, N) {
    return q.H.useFormState(x, b, N);
  }, Kl.useFormStatus = function() {
    return q.H.useHostTransitionStatus();
  }, Kl.version = "19.1.0", Kl;
}
var Ad;
function b0() {
  if (Ad) return vf.exports;
  Ad = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (z) {
        console.error(z);
      }
  }
  return f(), vf.exports = g0(), vf.exports;
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
var Ed;
function S0() {
  if (Ed) return Ru;
  Ed = 1;
  var f = h0(), z = pf(), S = b0();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function O(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function R(l) {
    var t = l, e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function q(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function j(l) {
    if (R(l) !== l)
      throw Error(o(188));
  }
  function x(l) {
    var t = l.alternate;
    if (!t) {
      if (t = R(l), t === null) throw Error(o(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return j(u), l;
          if (n === a) return j(u), t;
          n = n.sibling;
        }
        throw Error(o(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? l : t;
  }
  function b(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = b(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var N = Object.assign, K = Symbol.for("react.element"), k = Symbol.for("react.transitional.element"), Sl = Symbol.for("react.portal"), il = Symbol.for("react.fragment"), yl = Symbol.for("react.strict_mode"), gl = Symbol.for("react.profiler"), Jl = Symbol.for("react.provider"), $l = Symbol.for("react.consumer"), Al = Symbol.for("react.context"), Yl = Symbol.for("react.forward_ref"), W = Symbol.for("react.suspense"), Ml = Symbol.for("react.suspense_list"), Nl = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), Dl = Symbol.for("react.activity"), Ht = Symbol.for("react.memo_cache_sentinel"), dt = Symbol.iterator;
  function Ol(l) {
    return l === null || typeof l != "object" ? null : (l = dt && l[dt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ot = Symbol.for("react.client.reference");
  function At(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ot ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case il:
        return "Fragment";
      case gl:
        return "Profiler";
      case yl:
        return "StrictMode";
      case W:
        return "Suspense";
      case Ml:
        return "SuspenseList";
      case Dl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Sl:
          return "Portal";
        case Al:
          return (l.displayName || "Context") + ".Provider";
        case $l:
          return (l._context.displayName || "Context") + ".Consumer";
        case Yl:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Nl:
          return t = l.displayName || null, t !== null ? t : At(l.type) || "Memo";
        case Q:
          t = l._payload, l = l._init;
          try {
            return At(l(t));
          } catch {
          }
      }
    return null;
  }
  var pl = Array.isArray, p = z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = S.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, cl = [], r = -1;
  function M(l) {
    return { current: l };
  }
  function H(l) {
    0 > r || (l.current = cl[r], cl[r] = null, r--);
  }
  function D(l, t) {
    r++, cl[r] = l.current, l.current = t;
  }
  var B = M(null), P = M(null), L = M(null), al = M(null);
  function ml(l, t) {
    switch (D(L, t), D(P, l), D(B, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Vr(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Vr(t), l = wr(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    H(B), D(B, l);
  }
  function et() {
    H(B), H(P), H(L);
  }
  function $t(l) {
    l.memoizedState !== null && D(al, l);
    var t = B.current, e = wr(t, l.type);
    t !== e && (D(P, l), D(B, e));
  }
  function Ft(l) {
    P.current === l && (H(B), H(P)), al.current === l && (H(al), zu._currentValue = _);
  }
  var It = Object.prototype.hasOwnProperty, Wn = f.unstable_scheduleCallback, $n = f.unstable_cancelCallback, wd = f.unstable_shouldYield, Ld = f.unstable_requestPaint, _t = f.unstable_now, Kd = f.unstable_getCurrentPriorityLevel, Af = f.unstable_ImmediatePriority, Ef = f.unstable_UserBlockingPriority, Nu = f.unstable_NormalPriority, Jd = f.unstable_LowPriority, zf = f.unstable_IdlePriority, kd = f.log, Wd = f.unstable_setDisableYieldValue, Na = null, at = null;
  function Pt(l) {
    if (typeof kd == "function" && Wd(l), at && typeof at.setStrictMode == "function")
      try {
        at.setStrictMode(Na, l);
      } catch {
      }
  }
  var ut = Math.clz32 ? Math.clz32 : Id, $d = Math.log, Fd = Math.LN2;
  function Id(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - ($d(l) / Fd | 0) | 0;
  }
  var Hu = 256, qu = 4194304;
  function ze(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
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
        return l & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
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
        return l;
    }
  }
  function Bu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = ze(a) : (i &= c, i !== 0 ? u = ze(i) : e || (e = c & ~l, e !== 0 && (u = ze(e))))) : (c = a & ~n, c !== 0 ? u = ze(c) : i !== 0 ? u = ze(i) : e || (e = a & ~l, e !== 0 && (u = ze(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function Ha(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Pd(l, t) {
    switch (l) {
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
  function Mf() {
    var l = Hu;
    return Hu <<= 1, (Hu & 4194048) === 0 && (Hu = 256), l;
  }
  function Of() {
    var l = qu;
    return qu <<= 1, (qu & 62914560) === 0 && (qu = 4194304), l;
  }
  function Fn(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function qa(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function lm(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, s = l.expirationTimes, y = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - ut(e), E = 1 << T;
      c[T] = 0, s[T] = -1;
      var h = y[T];
      if (h !== null)
        for (y[T] = null, T = 0; T < h.length; T++) {
          var g = h[T];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~E;
    }
    a !== 0 && _f(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function _f(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - ut(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 4194090;
  }
  function xf(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - ut(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function In(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
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
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Pn(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Df() {
    var l = U.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : od(l.type));
  }
  function tm(l, t) {
    var e = U.p;
    try {
      return U.p = l, t();
    } finally {
      U.p = e;
    }
  }
  var le = Math.random().toString(36).slice(2), wl = "__reactFiber$" + le, Fl = "__reactProps$" + le, we = "__reactContainer$" + le, li = "__reactEvents$" + le, em = "__reactListeners$" + le, am = "__reactHandles$" + le, Rf = "__reactResources$" + le, Ba = "__reactMarker$" + le;
  function ti(l) {
    delete l[wl], delete l[Fl], delete l[li], delete l[em], delete l[am];
  }
  function Le(l) {
    var t = l[wl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[we] || e[wl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = kr(l); l !== null; ) {
            if (e = l[wl]) return e;
            l = kr(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function Ke(l) {
    if (l = l[wl] || l[we]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function Ya(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function Je(l) {
    var t = l[Rf];
    return t || (t = l[Rf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Gl(l) {
    l[Ba] = !0;
  }
  var Uf = /* @__PURE__ */ new Set(), Nf = {};
  function Me(l, t) {
    ke(l, t), ke(l + "Capture", t);
  }
  function ke(l, t) {
    for (Nf[l] = t, l = 0; l < t.length; l++)
      Uf.add(t[l]);
  }
  var um = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hf = {}, qf = {};
  function nm(l) {
    return It.call(qf, l) ? !0 : It.call(Hf, l) ? !1 : um.test(l) ? qf[l] = !0 : (Hf[l] = !0, !1);
  }
  function Yu(l, t, e) {
    if (nm(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function Gu(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function qt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  var ei, Bf;
  function We(l) {
    if (ei === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        ei = t && t[1] || "", Bf = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ei + l + Bf;
  }
  var ai = !1;
  function ui(l, t) {
    if (!l || ai) return "";
    ai = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var E = function() {
                throw Error();
              };
              if (Object.defineProperty(E.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(E, []);
                } catch (g) {
                  var h = g;
                }
                Reflect.construct(l, [], E);
              } else {
                try {
                  E.call();
                } catch (g) {
                  h = g;
                }
                l.call(E.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                h = g;
              }
              (E = l()) && typeof E.catch == "function" && E.catch(function() {
              });
            }
          } catch (g) {
            if (g && h && typeof g.stack == "string")
              return [g.stack, h.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var s = i.split(`
`), y = c.split(`
`);
        for (u = a = 0; a < s.length && !s[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < y.length && !y[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === s.length || u === y.length)
          for (a = s.length - 1, u = y.length - 1; 1 <= a && 0 <= u && s[a] !== y[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (s[a] !== y[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || s[a] !== y[u]) {
                  var T = `
` + s[a].replace(" at new ", " at ");
                  return l.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", l.displayName)), T;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ai = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? We(e) : "";
  }
  function im(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return We(l.type);
      case 16:
        return We("Lazy");
      case 13:
        return We("Suspense");
      case 19:
        return We("SuspenseList");
      case 0:
      case 15:
        return ui(l.type, !1);
      case 11:
        return ui(l.type.render, !1);
      case 1:
        return ui(l.type, !0);
      case 31:
        return We("Activity");
      default:
        return "";
    }
  }
  function Yf(l) {
    try {
      var t = "";
      do
        t += im(l), l = l.return;
      while (l);
      return t;
    } catch (e) {
      return `
Error generating stack: ` + e.message + `
` + e.stack;
    }
  }
  function mt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Gf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function cm(l) {
    var t = Gf(l) ? "checked" : "value", e = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    ), a = "" + l[t];
    if (!l.hasOwnProperty(t) && typeof e < "u" && typeof e.get == "function" && typeof e.set == "function") {
      var u = e.get, n = e.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          a = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: e.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(i) {
          a = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function Cu(l) {
    l._valueTracker || (l._valueTracker = cm(l));
  }
  function Cf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Gf(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function Xu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var fm = /[\n"\\]/g;
  function vt(l) {
    return l.replace(
      fm,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ni(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + mt(t)) : l.value !== "" + mt(t) && (l.value = "" + mt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? ii(l, i, mt(t)) : e != null ? ii(l, i, mt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + mt(c) : l.removeAttribute("name");
  }
  function Xf(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null))
        return;
      e = e != null ? "" + mt(e) : "", t = t != null ? "" + mt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i);
  }
  function ii(l, t, e) {
    t === "number" && Xu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function $e(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++)
        t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + mt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = !0, a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Qf(l, t, e) {
    if (t != null && (t = "" + mt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + mt(e) : "";
  }
  function jf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (pl(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = mt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a);
  }
  function Fe(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var om = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Zf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || om.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Vf(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && Zf(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Zf(l, n, t[n]);
  }
  function ci(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
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
  var sm = /* @__PURE__ */ new Map([
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
  ]), rm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Qu(l) {
    return rm.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  var fi = null;
  function oi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Ie = null, Pe = null;
  function wf(l) {
    var t = Ke(l);
    if (t && (l = t.stateNode)) {
      var e = l[Fl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (ni(
            l,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + vt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[Fl] || null;
                if (!u) throw Error(o(90));
                ni(
                  a,
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
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && Cf(a);
          }
          break l;
        case "textarea":
          Qf(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && $e(l, !!e.multiple, t, !1);
      }
    }
  }
  var si = !1;
  function Lf(l, t, e) {
    if (si) return l(t, e);
    si = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (si = !1, (Ie !== null || Pe !== null) && (On(), Ie && (t = Ie, l = Pe, Pe = Ie = null, wf(t), l)))
        for (t = 0; t < l.length; t++) wf(l[t]);
    }
  }
  function Ga(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[Fl] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
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
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function")
      throw Error(
        o(231, t, typeof e)
      );
    return e;
  }
  var Bt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ri = !1;
  if (Bt)
    try {
      var Ca = {};
      Object.defineProperty(Ca, "passive", {
        get: function() {
          ri = !0;
        }
      }), window.addEventListener("test", Ca, Ca), window.removeEventListener("test", Ca, Ca);
    } catch {
      ri = !1;
    }
  var te = null, di = null, ju = null;
  function Kf() {
    if (ju) return ju;
    var l, t = di, e = t.length, a, u = "value" in te ? te.value : te.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return ju = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Zu(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Vu() {
    return !0;
  }
  function Jf() {
    return !1;
  }
  function Il(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Vu : Jf, this.isPropagationStopped = Jf, this;
    }
    return N(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Vu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Vu);
      },
      persist: function() {
      },
      isPersistent: Vu
    }), t;
  }
  var Oe = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, wu = Il(Oe), Xa = N({}, Oe, { view: 0, detail: 0 }), dm = Il(Xa), mi, vi, Qa, Lu = N({}, Xa, {
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
    getModifierState: hi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Qa && (Qa && l.type === "mousemove" ? (mi = l.screenX - Qa.screenX, vi = l.screenY - Qa.screenY) : vi = mi = 0, Qa = l), mi);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : vi;
    }
  }), kf = Il(Lu), mm = N({}, Lu, { dataTransfer: 0 }), vm = Il(mm), ym = N({}, Xa, { relatedTarget: 0 }), yi = Il(ym), hm = N({}, Oe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), gm = Il(hm), bm = N({}, Oe, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Sm = Il(bm), pm = N({}, Oe, { data: 0 }), Wf = Il(pm), Tm = {
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
  }, Am = {
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
  }, Em = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function zm(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Em[l]) ? !!t[l] : !1;
  }
  function hi() {
    return zm;
  }
  var Mm = N({}, Xa, {
    key: function(l) {
      if (l.key) {
        var t = Tm[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Zu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Am[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: hi,
    charCode: function(l) {
      return l.type === "keypress" ? Zu(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Zu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Om = Il(Mm), _m = N({}, Lu, {
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
  }), $f = Il(_m), xm = N({}, Xa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hi
  }), Dm = Il(xm), Rm = N({}, Oe, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Um = Il(Rm), Nm = N({}, Lu, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Hm = Il(Nm), qm = N({}, Oe, {
    newState: 0,
    oldState: 0
  }), Bm = Il(qm), Ym = [9, 13, 27, 32], gi = Bt && "CompositionEvent" in window, ja = null;
  Bt && "documentMode" in document && (ja = document.documentMode);
  var Gm = Bt && "TextEvent" in window && !ja, Ff = Bt && (!gi || ja && 8 < ja && 11 >= ja), If = " ", Pf = !1;
  function lo(l, t) {
    switch (l) {
      case "keyup":
        return Ym.indexOf(t.keyCode) !== -1;
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
  function to(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var la = !1;
  function Cm(l, t) {
    switch (l) {
      case "compositionend":
        return to(t);
      case "keypress":
        return t.which !== 32 ? null : (Pf = !0, If);
      case "textInput":
        return l = t.data, l === If && Pf ? null : l;
      default:
        return null;
    }
  }
  function Xm(l, t) {
    if (la)
      return l === "compositionend" || !gi && lo(l, t) ? (l = Kf(), ju = di = te = null, la = !1, l) : null;
    switch (l) {
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
        return Ff && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Qm = {
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
  function eo(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Qm[l.type] : t === "textarea";
  }
  function ao(l, t, e, a) {
    Ie ? Pe ? Pe.push(a) : Pe = [a] : Ie = a, t = Nn(t, "onChange"), 0 < t.length && (e = new wu(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var Za = null, Va = null;
  function jm(l) {
    Cr(l, 0);
  }
  function Ku(l) {
    var t = Ya(l);
    if (Cf(t)) return l;
  }
  function uo(l, t) {
    if (l === "change") return t;
  }
  var no = !1;
  if (Bt) {
    var bi;
    if (Bt) {
      var Si = "oninput" in document;
      if (!Si) {
        var io = document.createElement("div");
        io.setAttribute("oninput", "return;"), Si = typeof io.oninput == "function";
      }
      bi = Si;
    } else bi = !1;
    no = bi && (!document.documentMode || 9 < document.documentMode);
  }
  function co() {
    Za && (Za.detachEvent("onpropertychange", fo), Va = Za = null);
  }
  function fo(l) {
    if (l.propertyName === "value" && Ku(Va)) {
      var t = [];
      ao(
        t,
        Va,
        l,
        oi(l)
      ), Lf(jm, t);
    }
  }
  function Zm(l, t, e) {
    l === "focusin" ? (co(), Za = t, Va = e, Za.attachEvent("onpropertychange", fo)) : l === "focusout" && co();
  }
  function Vm(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Ku(Va);
  }
  function wm(l, t) {
    if (l === "click") return Ku(t);
  }
  function Lm(l, t) {
    if (l === "input" || l === "change")
      return Ku(t);
  }
  function Km(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var nt = typeof Object.is == "function" ? Object.is : Km;
  function wa(l, t) {
    if (nt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!It.call(t, u) || !nt(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function oo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function so(l, t) {
    var e = oo(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t)
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = oo(e);
    }
  }
  function ro(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ro(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function mo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Xu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Xu(l.document);
    }
    return t;
  }
  function pi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Jm = Bt && "documentMode" in document && 11 >= document.documentMode, ta = null, Ti = null, La = null, Ai = !1;
  function vo(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Ai || ta == null || ta !== Xu(a) || (a = ta, "selectionStart" in a && pi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), La && wa(La, a) || (La = a, a = Nn(Ti, "onSelect"), 0 < a.length && (t = new wu(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = ta)));
  }
  function _e(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var ea = {
    animationend: _e("Animation", "AnimationEnd"),
    animationiteration: _e("Animation", "AnimationIteration"),
    animationstart: _e("Animation", "AnimationStart"),
    transitionrun: _e("Transition", "TransitionRun"),
    transitionstart: _e("Transition", "TransitionStart"),
    transitioncancel: _e("Transition", "TransitionCancel"),
    transitionend: _e("Transition", "TransitionEnd")
  }, Ei = {}, yo = {};
  Bt && (yo = document.createElement("div").style, "AnimationEvent" in window || (delete ea.animationend.animation, delete ea.animationiteration.animation, delete ea.animationstart.animation), "TransitionEvent" in window || delete ea.transitionend.transition);
  function xe(l) {
    if (Ei[l]) return Ei[l];
    if (!ea[l]) return l;
    var t = ea[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in yo)
        return Ei[l] = t[e];
    return l;
  }
  var ho = xe("animationend"), go = xe("animationiteration"), bo = xe("animationstart"), km = xe("transitionrun"), Wm = xe("transitionstart"), $m = xe("transitioncancel"), So = xe("transitionend"), po = /* @__PURE__ */ new Map(), zi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  zi.push("scrollEnd");
  function Et(l, t) {
    po.set(l, t), Me(t, [l]);
  }
  var To = /* @__PURE__ */ new WeakMap();
  function yt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = To.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Yf(t)
      }, To.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Yf(t)
    };
  }
  var ht = [], aa = 0, Mi = 0;
  function Ju() {
    for (var l = aa, t = Mi = aa = 0; t < l; ) {
      var e = ht[t];
      ht[t++] = null;
      var a = ht[t];
      ht[t++] = null;
      var u = ht[t];
      ht[t++] = null;
      var n = ht[t];
      if (ht[t++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && Ao(e, u, n);
    }
  }
  function ku(l, t, e, a) {
    ht[aa++] = l, ht[aa++] = t, ht[aa++] = e, ht[aa++] = a, Mi |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Oi(l, t, e, a) {
    return ku(l, t, e, a), Wu(l);
  }
  function ua(l, t) {
    return ku(l, null, null, t), Wu(l);
  }
  function Ao(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - ut(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Wu(l) {
    if (50 < hu)
      throw hu = 0, Nc = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var na = {};
  function Fm(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function it(l, t, e, a) {
    return new Fm(l, t, e, a);
  }
  function _i(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Yt(l, t) {
    var e = l.alternate;
    return e === null ? (e = it(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function Eo(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function $u(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") _i(l) && (i = 1);
    else if (typeof l == "string")
      i = Pv(
        l,
        e,
        B.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Dl:
          return l = it(31, e, t, u), l.elementType = Dl, l.lanes = n, l;
        case il:
          return De(e.children, u, n, t);
        case yl:
          i = 8, u |= 24;
          break;
        case gl:
          return l = it(12, e, t, u | 2), l.elementType = gl, l.lanes = n, l;
        case W:
          return l = it(13, e, t, u), l.elementType = W, l.lanes = n, l;
        case Ml:
          return l = it(19, e, t, u), l.elementType = Ml, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Jl:
              case Al:
                i = 10;
                break l;
              case $l:
                i = 9;
                break l;
              case Yl:
                i = 11;
                break l;
              case Nl:
                i = 14;
                break l;
              case Q:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            o(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = it(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function De(l, t, e, a) {
    return l = it(7, l, a, t), l.lanes = e, l;
  }
  function xi(l, t, e) {
    return l = it(6, l, null, t), l.lanes = e, l;
  }
  function Di(l, t, e) {
    return t = it(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = e, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var ia = [], ca = 0, Fu = null, Iu = 0, gt = [], bt = 0, Re = null, Gt = 1, Ct = "";
  function Ue(l, t) {
    ia[ca++] = Iu, ia[ca++] = Fu, Fu = l, Iu = t;
  }
  function zo(l, t, e) {
    gt[bt++] = Gt, gt[bt++] = Ct, gt[bt++] = Re, Re = l;
    var a = Gt;
    l = Ct;
    var u = 32 - ut(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - ut(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Gt = 1 << 32 - ut(t) + u | e << u | a, Ct = n + l;
    } else
      Gt = 1 << n | e << u | a, Ct = l;
  }
  function Ri(l) {
    l.return !== null && (Ue(l, 1), zo(l, 1, 0));
  }
  function Ui(l) {
    for (; l === Fu; )
      Fu = ia[--ca], ia[ca] = null, Iu = ia[--ca], ia[ca] = null;
    for (; l === Re; )
      Re = gt[--bt], gt[bt] = null, Ct = gt[--bt], gt[bt] = null, Gt = gt[--bt], gt[bt] = null;
  }
  var kl = null, El = null, nl = !1, Ne = null, xt = !1, Ni = Error(o(519));
  function He(l) {
    var t = Error(o(418, ""));
    throw ka(yt(t, l)), Ni;
  }
  function Mo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[wl] = l, t[Fl] = a, e) {
      case "dialog":
        tl("cancel", t), tl("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        tl("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < bu.length; e++)
          tl(bu[e], t);
        break;
      case "source":
        tl("error", t);
        break;
      case "img":
      case "image":
      case "link":
        tl("error", t), tl("load", t);
        break;
      case "details":
        tl("toggle", t);
        break;
      case "input":
        tl("invalid", t), Xf(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        ), Cu(t);
        break;
      case "select":
        tl("invalid", t);
        break;
      case "textarea":
        tl("invalid", t), jf(t, a.value, a.defaultValue, a.children), Cu(t);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Zr(t.textContent, e) ? (a.popover != null && (tl("beforetoggle", t), tl("toggle", t)), a.onScroll != null && tl("scroll", t), a.onScrollEnd != null && tl("scrollend", t), a.onClick != null && (t.onclick = Hn), t = !0) : t = !1, t || He(l);
  }
  function Oo(l) {
    for (kl = l.return; kl; )
      switch (kl.tag) {
        case 5:
        case 13:
          xt = !1;
          return;
        case 27:
        case 3:
          xt = !0;
          return;
        default:
          kl = kl.return;
      }
  }
  function Ka(l) {
    if (l !== kl) return !1;
    if (!nl) return Oo(l), nl = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || kc(l.type, l.memoizedProps)), e = !e), e && El && He(l), Oo(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      l: {
        for (l = l.nextSibling, t = 0; l; ) {
          if (l.nodeType === 8)
            if (e = l.data, e === "/$") {
              if (t === 0) {
                El = Mt(l.nextSibling);
                break l;
              }
              t--;
            } else
              e !== "$" && e !== "$!" && e !== "$?" || t++;
          l = l.nextSibling;
        }
        El = null;
      }
    } else
      t === 27 ? (t = El, ge(l.type) ? (l = Ic, Ic = null, El = l) : El = t) : El = kl ? Mt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ja() {
    El = kl = null, nl = !1;
  }
  function _o() {
    var l = Ne;
    return l !== null && (tt === null ? tt = l : tt.push.apply(
      tt,
      l
    ), Ne = null), l;
  }
  function ka(l) {
    Ne === null ? Ne = [l] : Ne.push(l);
  }
  var Hi = M(null), qe = null, Xt = null;
  function ee(l, t, e) {
    D(Hi, t._currentValue), t._currentValue = e;
  }
  function Qt(l) {
    l._currentValue = Hi.current, H(Hi);
  }
  function qi(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Bi(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var s = 0; s < t.length; s++)
            if (c.context === t[s]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), qi(
                n.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(o(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), qi(i, e, l), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (u = i.sibling, u !== null) {
            u.return = i.return, i = u;
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function Wa(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(o(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          nt(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === al.current) {
        if (i = u.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(zu) : l = [zu]);
      }
      u = u.return;
    }
    l !== null && Bi(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Pu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!nt(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Be(l) {
    qe = l, Xt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Ll(l) {
    return xo(qe, l);
  }
  function ln(l, t) {
    return qe === null && Be(l), xo(l, t);
  }
  function xo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Xt === null) {
      if (l === null) throw Error(o(308));
      Xt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Xt = Xt.next = t;
    return e;
  }
  var Im = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(e) {
        return e();
      });
    };
  }, Pm = f.unstable_scheduleCallback, lv = f.unstable_NormalPriority, Hl = {
    $$typeof: Al,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Yi() {
    return {
      controller: new Im(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function $a(l) {
    l.refCount--, l.refCount === 0 && Pm(lv, function() {
      l.controller.abort();
    });
  }
  var Fa = null, Gi = 0, fa = 0, oa = null;
  function tv(l, t) {
    if (Fa === null) {
      var e = Fa = [];
      Gi = 0, fa = Xc(), oa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Gi++, t.then(Do, Do), t;
  }
  function Do() {
    if (--Gi === 0 && Fa !== null) {
      oa !== null && (oa.status = "fulfilled");
      var l = Fa;
      Fa = null, fa = 0, oa = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function ev(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var u = 0; u < e.length; u++) (0, e[u])(t);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var Ro = p.S;
  p.S = function(l, t) {
    typeof t == "object" && t !== null && typeof t.then == "function" && tv(l, t), Ro !== null && Ro(l, t);
  };
  var Ye = M(null);
  function Ci() {
    var l = Ye.current;
    return l !== null ? l : hl.pooledCache;
  }
  function tn(l, t) {
    t === null ? D(Ye, Ye.current) : D(Ye, t.pool);
  }
  function Uo() {
    var l = Ci();
    return l === null ? null : { parent: Hl._currentValue, pool: l };
  }
  var Ia = Error(o(460)), No = Error(o(474)), en = Error(o(542)), Xi = { then: function() {
  } };
  function Ho(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function an() {
  }
  function qo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(an, an), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Yo(l), l;
      default:
        if (typeof t.status == "string") t.then(an, an);
        else {
          if (l = hl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(o(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Yo(l), l;
        }
        throw Pa = t, Ia;
    }
  }
  var Pa = null;
  function Bo() {
    if (Pa === null) throw Error(o(459));
    var l = Pa;
    return Pa = null, l;
  }
  function Yo(l) {
    if (l === Ia || l === en)
      throw Error(o(483));
  }
  var ae = !1;
  function Qi(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ji(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ue(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ne(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (fl & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Wu(l), Ao(l, null, e), t;
    }
    return ku(l, a, t, e), Wu(l);
  }
  function lu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, xf(l, e);
    }
  }
  function Zi(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var Vi = !1;
  function tu() {
    if (Vi) {
      var l = oa;
      if (l !== null) throw l;
    }
  }
  function eu(l, t, e, a) {
    Vi = !1;
    var u = l.updateQueue;
    ae = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var s = c, y = s.next;
      s.next = null, i === null ? n = y : i.next = y, i = s;
      var T = l.alternate;
      T !== null && (T = T.updateQueue, c = T.lastBaseUpdate, c !== i && (c === null ? T.firstBaseUpdate = y : c.next = y, T.lastBaseUpdate = s));
    }
    if (n !== null) {
      var E = u.baseState;
      i = 0, T = y = s = null, c = n;
      do {
        var h = c.lane & -536870913, g = h !== c.lane;
        if (g ? (el & h) === h : (a & h) === h) {
          h !== 0 && h === fa && (Vi = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var w = l, Z = c;
            h = t;
            var dl = e;
            switch (Z.tag) {
              case 1:
                if (w = Z.payload, typeof w == "function") {
                  E = w.call(dl, E, h);
                  break l;
                }
                E = w;
                break l;
              case 3:
                w.flags = w.flags & -65537 | 128;
              case 0:
                if (w = Z.payload, h = typeof w == "function" ? w.call(dl, E, h) : w, h == null) break l;
                E = N({}, E, h);
                break l;
              case 2:
                ae = !0;
            }
          }
          h = c.callback, h !== null && (l.flags |= 64, g && (l.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [h] : g.push(h));
        } else
          g = {
            lane: h,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, T === null ? (y = T = g, s = E) : T = T.next = g, i |= h;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          g = c, c = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      T === null && (s = E), u.baseState = s, u.firstBaseUpdate = y, u.lastBaseUpdate = T, n === null && (u.shared.lanes = 0), me |= i, l.lanes = i, l.memoizedState = E;
    }
  }
  function Go(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function Co(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Go(e[l], t);
  }
  var sa = M(null), un = M(0);
  function Xo(l, t) {
    l = Jt, D(un, l), D(sa, t), Jt = l | t.baseLanes;
  }
  function wi() {
    D(un, Jt), D(sa, sa.current);
  }
  function Li() {
    Jt = un.current, H(sa), H(un);
  }
  var ie = 0, $ = null, sl = null, Rl = null, nn = !1, ra = !1, Ge = !1, cn = 0, au = 0, da = null, av = 0;
  function _l() {
    throw Error(o(321));
  }
  function Ki(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!nt(l[e], t[e])) return !1;
    return !0;
  }
  function Ji(l, t, e, a, u, n) {
    return ie = n, $ = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, p.H = l === null || l.memoizedState === null ? As : Es, Ge = !1, n = e(a, u), Ge = !1, ra && (n = jo(
      t,
      e,
      a,
      u
    )), Qo(l), n;
  }
  function Qo(l) {
    p.H = mn;
    var t = sl !== null && sl.next !== null;
    if (ie = 0, Rl = sl = $ = null, nn = !1, au = 0, da = null, t) throw Error(o(300));
    l === null || Cl || (l = l.dependencies, l !== null && Pu(l) && (Cl = !0));
  }
  function jo(l, t, e, a) {
    $ = l;
    var u = 0;
    do {
      if (ra && (da = null), au = 0, ra = !1, 25 <= u) throw Error(o(301));
      if (u += 1, Rl = sl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      p.H = sv, n = t(e, a);
    } while (ra);
    return n;
  }
  function uv() {
    var l = p.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? uu(t) : t, l = l.useState()[0], (sl !== null ? sl.memoizedState : null) !== l && ($.flags |= 1024), t;
  }
  function ki() {
    var l = cn !== 0;
    return cn = 0, l;
  }
  function Wi(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function $i(l) {
    if (nn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      nn = !1;
    }
    ie = 0, Rl = sl = $ = null, ra = !1, au = cn = 0, da = null;
  }
  function Pl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Rl === null ? $.memoizedState = Rl = l : Rl = Rl.next = l, Rl;
  }
  function Ul() {
    if (sl === null) {
      var l = $.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = sl.next;
    var t = Rl === null ? $.memoizedState : Rl.next;
    if (t !== null)
      Rl = t, sl = l;
    else {
      if (l === null)
        throw $.alternate === null ? Error(o(467)) : Error(o(310));
      sl = l, l = {
        memoizedState: sl.memoizedState,
        baseState: sl.baseState,
        baseQueue: sl.baseQueue,
        queue: sl.queue,
        next: null
      }, Rl === null ? $.memoizedState = Rl = l : Rl = Rl.next = l;
    }
    return Rl;
  }
  function Fi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function uu(l) {
    var t = au;
    return au += 1, da === null && (da = []), l = qo(da, l, t), t = $, (Rl === null ? t.memoizedState : Rl.next) === null && (t = t.alternate, p.H = t === null || t.memoizedState === null ? As : Es), l;
  }
  function fn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return uu(l);
      if (l.$$typeof === Al) return Ll(l);
    }
    throw Error(o(438, String(l)));
  }
  function Ii(l) {
    var t = null, e = $.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = $.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Fi(), $.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = Ht;
    return t.index++, e;
  }
  function jt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function on(l) {
    var t = Ul();
    return Pi(t, sl, l);
  }
  function Pi(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      t.baseQueue = u = n, a.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var c = i = null, s = null, y = t, T = !1;
      do {
        var E = y.lane & -536870913;
        if (E !== y.lane ? (el & E) === E : (ie & E) === E) {
          var h = y.revertLane;
          if (h === 0)
            s !== null && (s = s.next = {
              lane: 0,
              revertLane: 0,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), E === fa && (T = !0);
          else if ((ie & h) === h) {
            y = y.next, h === fa && (T = !0);
            continue;
          } else
            E = {
              lane: 0,
              revertLane: y.revertLane,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, s === null ? (c = s = E, i = n) : s = s.next = E, $.lanes |= h, me |= h;
          E = y.action, Ge && e(n, E), n = y.hasEagerState ? y.eagerState : e(n, E);
        } else
          h = {
            lane: E,
            revertLane: y.revertLane,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, s === null ? (c = s = h, i = n) : s = s.next = h, $.lanes |= E, me |= E;
        y = y.next;
      } while (y !== null && y !== t);
      if (s === null ? i = n : s.next = c, !nt(n, l.memoizedState) && (Cl = !0, T && (e = oa, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = s, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function lc(l) {
    var t = Ul(), e = t.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      nt(n, t.memoizedState) || (Cl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Zo(l, t, e) {
    var a = $, u = Ul(), n = nl;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var i = !nt(
      (sl || u).memoizedState,
      e
    );
    i && (u.memoizedState = e, Cl = !0), u = u.queue;
    var c = Lo.bind(null, a, u, l);
    if (nu(2048, 8, c, [l]), u.getSnapshot !== t || i || Rl !== null && Rl.memoizedState.tag & 1) {
      if (a.flags |= 2048, ma(
        9,
        sn(),
        wo.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), hl === null) throw Error(o(349));
      n || (ie & 124) !== 0 || Vo(a, t, e);
    }
    return e;
  }
  function Vo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = $.updateQueue, t === null ? (t = Fi(), $.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function wo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Ko(t) && Jo(l);
  }
  function Lo(l, t, e) {
    return e(function() {
      Ko(t) && Jo(l);
    });
  }
  function Ko(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !nt(l, e);
    } catch {
      return !0;
    }
  }
  function Jo(l) {
    var t = ua(l, 2);
    t !== null && rt(t, l, 2);
  }
  function tc(l) {
    var t = Pl();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), Ge) {
        Pt(!0);
        try {
          e();
        } finally {
          Pt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jt,
      lastRenderedState: l
    }, t;
  }
  function ko(l, t, e, a) {
    return l.baseState = e, Pi(
      l,
      sl,
      typeof a == "function" ? a : jt
    );
  }
  function nv(l, t, e, a, u) {
    if (dn(l)) throw Error(o(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          n.listeners.push(i);
        }
      };
      p.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, Wo(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function Wo(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = p.T, i = {};
      p.T = i;
      try {
        var c = e(u, a), s = p.S;
        s !== null && s(i, c), $o(l, t, c);
      } catch (y) {
        ec(l, t, y);
      } finally {
        p.T = n;
      }
    } else
      try {
        n = e(u, a), $o(l, t, n);
      } catch (y) {
        ec(l, t, y);
      }
  }
  function $o(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Fo(l, t, a);
      },
      function(a) {
        return ec(l, t, a);
      }
    ) : Fo(l, t, e);
  }
  function Fo(l, t, e) {
    t.status = "fulfilled", t.value = e, Io(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Wo(l, e)));
  }
  function ec(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, Io(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Io(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Po(l, t) {
    return t;
  }
  function ls(l, t) {
    if (nl) {
      var e = hl.formState;
      if (e !== null) {
        l: {
          var a = $;
          if (nl) {
            if (El) {
              t: {
                for (var u = El, n = xt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = Mt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                El = Mt(
                  u.nextSibling
                ), a = u.data === "F!";
                break l;
              }
            }
            He(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = Pl(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Po,
      lastRenderedState: t
    }, e.queue = a, e = Ss.bind(
      null,
      $,
      a
    ), a.dispatch = e, a = tc(!1), n = cc.bind(
      null,
      $,
      !1,
      a.queue
    ), a = Pl(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = nv.bind(
      null,
      $,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function ts(l) {
    var t = Ul();
    return es(t, sl, l);
  }
  function es(l, t, e) {
    if (t = Pi(
      l,
      t,
      Po
    )[0], l = on(jt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = uu(t);
      } catch (i) {
        throw i === Ia ? en : i;
      }
    else a = t;
    t = Ul();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && ($.flags |= 2048, ma(
      9,
      sn(),
      iv.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function iv(l, t) {
    l.action = t;
  }
  function as(l) {
    var t = Ul(), e = sl;
    if (e !== null)
      return es(t, e, l);
    Ul(), t = t.memoizedState, e = Ul();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function ma(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = $.updateQueue, t === null && (t = Fi(), $.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function sn() {
    return { destroy: void 0, resource: void 0 };
  }
  function us() {
    return Ul().memoizedState;
  }
  function rn(l, t, e, a) {
    var u = Pl();
    a = a === void 0 ? null : a, $.flags |= l, u.memoizedState = ma(
      1 | t,
      sn(),
      e,
      a
    );
  }
  function nu(l, t, e, a) {
    var u = Ul();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    sl !== null && a !== null && Ki(a, sl.memoizedState.deps) ? u.memoizedState = ma(t, n, e, a) : ($.flags |= l, u.memoizedState = ma(
      1 | t,
      n,
      e,
      a
    ));
  }
  function ns(l, t) {
    rn(8390656, 8, l, t);
  }
  function is(l, t) {
    nu(2048, 8, l, t);
  }
  function cs(l, t) {
    return nu(4, 2, l, t);
  }
  function fs(l, t) {
    return nu(4, 4, l, t);
  }
  function os(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function ss(l, t, e) {
    e = e != null ? e.concat([l]) : null, nu(4, 4, os.bind(null, t, l), e);
  }
  function ac() {
  }
  function rs(l, t) {
    var e = Ul();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Ki(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function ds(l, t) {
    var e = Ul();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Ki(t, a[1]))
      return a[0];
    if (a = l(), Ge) {
      Pt(!0);
      try {
        l();
      } finally {
        Pt(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function uc(l, t, e) {
    return e === void 0 || (ie & 1073741824) !== 0 ? l.memoizedState = t : (l.memoizedState = e, l = yr(), $.lanes |= l, me |= l, e);
  }
  function ms(l, t, e, a) {
    return nt(e, t) ? e : sa.current !== null ? (l = uc(l, e, a), nt(l, t) || (Cl = !0), l) : (ie & 42) === 0 ? (Cl = !0, l.memoizedState = e) : (l = yr(), $.lanes |= l, me |= l, t);
  }
  function vs(l, t, e, a, u) {
    var n = U.p;
    U.p = n !== 0 && 8 > n ? n : 8;
    var i = p.T, c = {};
    p.T = c, cc(l, !1, t, e);
    try {
      var s = u(), y = p.S;
      if (y !== null && y(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var T = ev(
          s,
          a
        );
        iu(
          l,
          t,
          T,
          st(l)
        );
      } else
        iu(
          l,
          t,
          a,
          st(l)
        );
    } catch (E) {
      iu(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: E },
        st()
      );
    } finally {
      U.p = n, p.T = i;
    }
  }
  function cv() {
  }
  function nc(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = ys(l).queue;
    vs(
      l,
      u,
      t,
      _,
      e === null ? cv : function() {
        return hs(l), e(a);
      }
    );
  }
  function ys(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: _,
      baseState: _,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jt,
        lastRenderedState: _
      },
      next: null
    };
    var e = {};
    return t.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jt,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function hs(l) {
    var t = ys(l).next.queue;
    iu(l, t, {}, st());
  }
  function ic() {
    return Ll(zu);
  }
  function gs() {
    return Ul().memoizedState;
  }
  function bs() {
    return Ul().memoizedState;
  }
  function fv(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = st();
          l = ue(e);
          var a = ne(t, l, e);
          a !== null && (rt(a, t, e), lu(a, t, e)), t = { cache: Yi() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ov(l, t, e) {
    var a = st();
    e = {
      lane: a,
      revertLane: 0,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, dn(l) ? ps(t, e) : (e = Oi(l, t, e, a), e !== null && (rt(e, l, a), Ts(e, t, a)));
  }
  function Ss(l, t, e) {
    var a = st();
    iu(l, t, e, a);
  }
  function iu(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (dn(l)) ps(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, nt(c, i))
            return ku(l, t, u, 0), hl === null && Ju(), !1;
        } catch {
        } finally {
        }
      if (e = Oi(l, t, u, a), e !== null)
        return rt(e, l, a), Ts(e, t, a), !0;
    }
    return !1;
  }
  function cc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: Xc(),
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, dn(l)) {
      if (t) throw Error(o(479));
    } else
      t = Oi(
        l,
        e,
        a,
        2
      ), t !== null && rt(t, l, 2);
  }
  function dn(l) {
    var t = l.alternate;
    return l === $ || t !== null && t === $;
  }
  function ps(l, t) {
    ra = nn = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function Ts(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, xf(l, e);
    }
  }
  var mn = {
    readContext: Ll,
    use: fn,
    useCallback: _l,
    useContext: _l,
    useEffect: _l,
    useImperativeHandle: _l,
    useLayoutEffect: _l,
    useInsertionEffect: _l,
    useMemo: _l,
    useReducer: _l,
    useRef: _l,
    useState: _l,
    useDebugValue: _l,
    useDeferredValue: _l,
    useTransition: _l,
    useSyncExternalStore: _l,
    useId: _l,
    useHostTransitionStatus: _l,
    useFormState: _l,
    useActionState: _l,
    useOptimistic: _l,
    useMemoCache: _l,
    useCacheRefresh: _l
  }, As = {
    readContext: Ll,
    use: fn,
    useCallback: function(l, t) {
      return Pl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Ll,
    useEffect: ns,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, rn(
        4194308,
        4,
        os.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return rn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      rn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = Pl();
      t = t === void 0 ? null : t;
      var a = l();
      if (Ge) {
        Pt(!0);
        try {
          l();
        } finally {
          Pt(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = Pl();
      if (e !== void 0) {
        var u = e(t);
        if (Ge) {
          Pt(!0);
          try {
            e(t);
          } finally {
            Pt(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = ov.bind(
        null,
        $,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Pl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = tc(l);
      var t = l.queue, e = Ss.bind(null, $, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: ac,
    useDeferredValue: function(l, t) {
      var e = Pl();
      return uc(e, l, t);
    },
    useTransition: function() {
      var l = tc(!1);
      return l = vs.bind(
        null,
        $,
        l.queue,
        !0,
        !1
      ), Pl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = $, u = Pl();
      if (nl) {
        if (e === void 0)
          throw Error(o(407));
        e = e();
      } else {
        if (e = t(), hl === null)
          throw Error(o(349));
        (el & 124) !== 0 || Vo(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, ns(Lo.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, ma(
        9,
        sn(),
        wo.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = Pl(), t = hl.identifierPrefix;
      if (nl) {
        var e = Ct, a = Gt;
        e = (a & ~(1 << 32 - ut(a) - 1)).toString(32) + e, t = "«" + t + "R" + e, e = cn++, 0 < e && (t += "H" + e.toString(32)), t += "»";
      } else
        e = av++, t = "«" + t + "r" + e.toString(32) + "»";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: ic,
    useFormState: ls,
    useActionState: ls,
    useOptimistic: function(l) {
      var t = Pl();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = cc.bind(
        null,
        $,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Ii,
    useCacheRefresh: function() {
      return Pl().memoizedState = fv.bind(
        null,
        $
      );
    }
  }, Es = {
    readContext: Ll,
    use: fn,
    useCallback: rs,
    useContext: Ll,
    useEffect: is,
    useImperativeHandle: ss,
    useInsertionEffect: cs,
    useLayoutEffect: fs,
    useMemo: ds,
    useReducer: on,
    useRef: us,
    useState: function() {
      return on(jt);
    },
    useDebugValue: ac,
    useDeferredValue: function(l, t) {
      var e = Ul();
      return ms(
        e,
        sl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = on(jt)[0], t = Ul().memoizedState;
      return [
        typeof l == "boolean" ? l : uu(l),
        t
      ];
    },
    useSyncExternalStore: Zo,
    useId: gs,
    useHostTransitionStatus: ic,
    useFormState: ts,
    useActionState: ts,
    useOptimistic: function(l, t) {
      var e = Ul();
      return ko(e, sl, l, t);
    },
    useMemoCache: Ii,
    useCacheRefresh: bs
  }, sv = {
    readContext: Ll,
    use: fn,
    useCallback: rs,
    useContext: Ll,
    useEffect: is,
    useImperativeHandle: ss,
    useInsertionEffect: cs,
    useLayoutEffect: fs,
    useMemo: ds,
    useReducer: lc,
    useRef: us,
    useState: function() {
      return lc(jt);
    },
    useDebugValue: ac,
    useDeferredValue: function(l, t) {
      var e = Ul();
      return sl === null ? uc(e, l, t) : ms(
        e,
        sl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = lc(jt)[0], t = Ul().memoizedState;
      return [
        typeof l == "boolean" ? l : uu(l),
        t
      ];
    },
    useSyncExternalStore: Zo,
    useId: gs,
    useHostTransitionStatus: ic,
    useFormState: as,
    useActionState: as,
    useOptimistic: function(l, t) {
      var e = Ul();
      return sl !== null ? ko(e, sl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Ii,
    useCacheRefresh: bs
  }, va = null, cu = 0;
  function vn(l) {
    var t = cu;
    return cu += 1, va === null && (va = []), qo(va, l, t);
  }
  function fu(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function yn(l, t) {
    throw t.$$typeof === K ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function zs(l) {
    var t = l._init;
    return t(l._payload);
  }
  function Ms(l) {
    function t(m, d) {
      if (l) {
        var v = m.deletions;
        v === null ? (m.deletions = [d], m.flags |= 16) : v.push(d);
      }
    }
    function e(m, d) {
      if (!l) return null;
      for (; d !== null; )
        t(m, d), d = d.sibling;
      return null;
    }
    function a(m) {
      for (var d = /* @__PURE__ */ new Map(); m !== null; )
        m.key !== null ? d.set(m.key, m) : d.set(m.index, m), m = m.sibling;
      return d;
    }
    function u(m, d) {
      return m = Yt(m, d), m.index = 0, m.sibling = null, m;
    }
    function n(m, d, v) {
      return m.index = v, l ? (v = m.alternate, v !== null ? (v = v.index, v < d ? (m.flags |= 67108866, d) : v) : (m.flags |= 67108866, d)) : (m.flags |= 1048576, d);
    }
    function i(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function c(m, d, v, A) {
      return d === null || d.tag !== 6 ? (d = xi(v, m.mode, A), d.return = m, d) : (d = u(d, v), d.return = m, d);
    }
    function s(m, d, v, A) {
      var Y = v.type;
      return Y === il ? T(
        m,
        d,
        v.props.children,
        A,
        v.key
      ) : d !== null && (d.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Q && zs(Y) === d.type) ? (d = u(d, v.props), fu(d, v), d.return = m, d) : (d = $u(
        v.type,
        v.key,
        v.props,
        null,
        m.mode,
        A
      ), fu(d, v), d.return = m, d);
    }
    function y(m, d, v, A) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== v.containerInfo || d.stateNode.implementation !== v.implementation ? (d = Di(v, m.mode, A), d.return = m, d) : (d = u(d, v.children || []), d.return = m, d);
    }
    function T(m, d, v, A, Y) {
      return d === null || d.tag !== 7 ? (d = De(
        v,
        m.mode,
        A,
        Y
      ), d.return = m, d) : (d = u(d, v), d.return = m, d);
    }
    function E(m, d, v) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return d = xi(
          "" + d,
          m.mode,
          v
        ), d.return = m, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case k:
            return v = $u(
              d.type,
              d.key,
              d.props,
              null,
              m.mode,
              v
            ), fu(v, d), v.return = m, v;
          case Sl:
            return d = Di(
              d,
              m.mode,
              v
            ), d.return = m, d;
          case Q:
            var A = d._init;
            return d = A(d._payload), E(m, d, v);
        }
        if (pl(d) || Ol(d))
          return d = De(
            d,
            m.mode,
            v,
            null
          ), d.return = m, d;
        if (typeof d.then == "function")
          return E(m, vn(d), v);
        if (d.$$typeof === Al)
          return E(
            m,
            ln(m, d),
            v
          );
        yn(m, d);
      }
      return null;
    }
    function h(m, d, v, A) {
      var Y = d !== null ? d.key : null;
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return Y !== null ? null : c(m, d, "" + v, A);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case k:
            return v.key === Y ? s(m, d, v, A) : null;
          case Sl:
            return v.key === Y ? y(m, d, v, A) : null;
          case Q:
            return Y = v._init, v = Y(v._payload), h(m, d, v, A);
        }
        if (pl(v) || Ol(v))
          return Y !== null ? null : T(m, d, v, A, null);
        if (typeof v.then == "function")
          return h(
            m,
            d,
            vn(v),
            A
          );
        if (v.$$typeof === Al)
          return h(
            m,
            d,
            ln(m, v),
            A
          );
        yn(m, v);
      }
      return null;
    }
    function g(m, d, v, A, Y) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return m = m.get(v) || null, c(d, m, "" + A, Y);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case k:
            return m = m.get(
              A.key === null ? v : A.key
            ) || null, s(d, m, A, Y);
          case Sl:
            return m = m.get(
              A.key === null ? v : A.key
            ) || null, y(d, m, A, Y);
          case Q:
            var I = A._init;
            return A = I(A._payload), g(
              m,
              d,
              v,
              A,
              Y
            );
        }
        if (pl(A) || Ol(A))
          return m = m.get(v) || null, T(d, m, A, Y, null);
        if (typeof A.then == "function")
          return g(
            m,
            d,
            v,
            vn(A),
            Y
          );
        if (A.$$typeof === Al)
          return g(
            m,
            d,
            v,
            ln(d, A),
            Y
          );
        yn(d, A);
      }
      return null;
    }
    function w(m, d, v, A) {
      for (var Y = null, I = null, X = d, V = d = 0, Ql = null; X !== null && V < v.length; V++) {
        X.index > V ? (Ql = X, X = null) : Ql = X.sibling;
        var ul = h(
          m,
          X,
          v[V],
          A
        );
        if (ul === null) {
          X === null && (X = Ql);
          break;
        }
        l && X && ul.alternate === null && t(m, X), d = n(ul, d, V), I === null ? Y = ul : I.sibling = ul, I = ul, X = Ql;
      }
      if (V === v.length)
        return e(m, X), nl && Ue(m, V), Y;
      if (X === null) {
        for (; V < v.length; V++)
          X = E(m, v[V], A), X !== null && (d = n(
            X,
            d,
            V
          ), I === null ? Y = X : I.sibling = X, I = X);
        return nl && Ue(m, V), Y;
      }
      for (X = a(X); V < v.length; V++)
        Ql = g(
          X,
          m,
          V,
          v[V],
          A
        ), Ql !== null && (l && Ql.alternate !== null && X.delete(
          Ql.key === null ? V : Ql.key
        ), d = n(
          Ql,
          d,
          V
        ), I === null ? Y = Ql : I.sibling = Ql, I = Ql);
      return l && X.forEach(function(Ae) {
        return t(m, Ae);
      }), nl && Ue(m, V), Y;
    }
    function Z(m, d, v, A) {
      if (v == null) throw Error(o(151));
      for (var Y = null, I = null, X = d, V = d = 0, Ql = null, ul = v.next(); X !== null && !ul.done; V++, ul = v.next()) {
        X.index > V ? (Ql = X, X = null) : Ql = X.sibling;
        var Ae = h(m, X, ul.value, A);
        if (Ae === null) {
          X === null && (X = Ql);
          break;
        }
        l && X && Ae.alternate === null && t(m, X), d = n(Ae, d, V), I === null ? Y = Ae : I.sibling = Ae, I = Ae, X = Ql;
      }
      if (ul.done)
        return e(m, X), nl && Ue(m, V), Y;
      if (X === null) {
        for (; !ul.done; V++, ul = v.next())
          ul = E(m, ul.value, A), ul !== null && (d = n(ul, d, V), I === null ? Y = ul : I.sibling = ul, I = ul);
        return nl && Ue(m, V), Y;
      }
      for (X = a(X); !ul.done; V++, ul = v.next())
        ul = g(X, m, V, ul.value, A), ul !== null && (l && ul.alternate !== null && X.delete(ul.key === null ? V : ul.key), d = n(ul, d, V), I === null ? Y = ul : I.sibling = ul, I = ul);
      return l && X.forEach(function(r0) {
        return t(m, r0);
      }), nl && Ue(m, V), Y;
    }
    function dl(m, d, v, A) {
      if (typeof v == "object" && v !== null && v.type === il && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case k:
            l: {
              for (var Y = v.key; d !== null; ) {
                if (d.key === Y) {
                  if (Y = v.type, Y === il) {
                    if (d.tag === 7) {
                      e(
                        m,
                        d.sibling
                      ), A = u(
                        d,
                        v.props.children
                      ), A.return = m, m = A;
                      break l;
                    }
                  } else if (d.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Q && zs(Y) === d.type) {
                    e(
                      m,
                      d.sibling
                    ), A = u(d, v.props), fu(A, v), A.return = m, m = A;
                    break l;
                  }
                  e(m, d);
                  break;
                } else t(m, d);
                d = d.sibling;
              }
              v.type === il ? (A = De(
                v.props.children,
                m.mode,
                A,
                v.key
              ), A.return = m, m = A) : (A = $u(
                v.type,
                v.key,
                v.props,
                null,
                m.mode,
                A
              ), fu(A, v), A.return = m, m = A);
            }
            return i(m);
          case Sl:
            l: {
              for (Y = v.key; d !== null; ) {
                if (d.key === Y)
                  if (d.tag === 4 && d.stateNode.containerInfo === v.containerInfo && d.stateNode.implementation === v.implementation) {
                    e(
                      m,
                      d.sibling
                    ), A = u(d, v.children || []), A.return = m, m = A;
                    break l;
                  } else {
                    e(m, d);
                    break;
                  }
                else t(m, d);
                d = d.sibling;
              }
              A = Di(v, m.mode, A), A.return = m, m = A;
            }
            return i(m);
          case Q:
            return Y = v._init, v = Y(v._payload), dl(
              m,
              d,
              v,
              A
            );
        }
        if (pl(v))
          return w(
            m,
            d,
            v,
            A
          );
        if (Ol(v)) {
          if (Y = Ol(v), typeof Y != "function") throw Error(o(150));
          return v = Y.call(v), Z(
            m,
            d,
            v,
            A
          );
        }
        if (typeof v.then == "function")
          return dl(
            m,
            d,
            vn(v),
            A
          );
        if (v.$$typeof === Al)
          return dl(
            m,
            d,
            ln(m, v),
            A
          );
        yn(m, v);
      }
      return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, d !== null && d.tag === 6 ? (e(m, d.sibling), A = u(d, v), A.return = m, m = A) : (e(m, d), A = xi(v, m.mode, A), A.return = m, m = A), i(m)) : e(m, d);
    }
    return function(m, d, v, A) {
      try {
        cu = 0;
        var Y = dl(
          m,
          d,
          v,
          A
        );
        return va = null, Y;
      } catch (X) {
        if (X === Ia || X === en) throw X;
        var I = it(29, X, null, m.mode);
        return I.lanes = A, I.return = m, I;
      } finally {
      }
    };
  }
  var ya = Ms(!0), Os = Ms(!1), St = M(null), Dt = null;
  function ce(l) {
    var t = l.alternate;
    D(ql, ql.current & 1), D(St, l), Dt === null && (t === null || sa.current !== null || t.memoizedState !== null) && (Dt = l);
  }
  function _s(l) {
    if (l.tag === 22) {
      if (D(ql, ql.current), D(St, l), Dt === null) {
        var t = l.alternate;
        t !== null && t.memoizedState !== null && (Dt = l);
      }
    } else fe();
  }
  function fe() {
    D(ql, ql.current), D(St, St.current);
  }
  function Zt(l) {
    H(St), Dt === l && (Dt = null), H(ql);
  }
  var ql = M(0);
  function hn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || e.data === "$?" || Fc(e)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  function fc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : N({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var oc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = st(), u = ue(a);
      u.payload = t, e != null && (u.callback = e), t = ne(l, u, a), t !== null && (rt(t, l, a), lu(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = st(), u = ue(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = ne(l, u, a), t !== null && (rt(t, l, a), lu(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = st(), a = ue(e);
      a.tag = 2, t != null && (a.callback = t), t = ne(l, a, e), t !== null && (rt(t, l, e), lu(t, l, e));
    }
  };
  function xs(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !wa(e, a) || !wa(u, n) : !0;
  }
  function Ds(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && oc.enqueueReplaceState(t, t.state, null);
  }
  function Ce(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = N({}, e));
      for (var u in l)
        e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  var gn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  function Rs(l) {
    gn(l);
  }
  function Us(l) {
    console.error(l);
  }
  function Ns(l) {
    gn(l);
  }
  function bn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Hs(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function sc(l, t, e) {
    return e = ue(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      bn(l, t);
    }, e;
  }
  function qs(l) {
    return l = ue(l), l.tag = 3, l;
  }
  function Bs(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        Hs(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Hs(t, e, a), typeof u != "function" && (ve === null ? ve = /* @__PURE__ */ new Set([this]) : ve.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function rv(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Wa(
        t,
        e,
        u,
        !0
      ), e = St.current, e !== null) {
        switch (e.tag) {
          case 13:
            return Dt === null ? qc() : e.alternate === null && zl === 0 && (zl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Xi ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Yc(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Xi ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Yc(l, a, u)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return Yc(l, a, u), qc(), !1;
    }
    if (nl)
      return t = St.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== Ni && (l = Error(o(422), { cause: a }), ka(yt(l, e)))) : (a !== Ni && (t = Error(o(423), {
        cause: a
      }), ka(
        yt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = yt(a, e), u = sc(
        l.stateNode,
        a,
        u
      ), Zi(l, u), zl !== 4 && (zl = 2)), !1;
    var n = Error(o(520), { cause: a });
    if (n = yt(n, e), yu === null ? yu = [n] : yu.push(n), zl !== 4 && (zl = 2), t === null) return !0;
    a = yt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = sc(e.stateNode, a, l), Zi(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ve === null || !ve.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = qs(u), Bs(
              u,
              l,
              e,
              a
            ), Zi(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Ys = Error(o(461)), Cl = !1;
  function jl(l, t, e, a) {
    t.child = l === null ? Os(t, null, e, a) : ya(
      t,
      l.child,
      e,
      a
    );
  }
  function Gs(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Be(t), a = Ji(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = ki(), l !== null && !Cl ? (Wi(l, t, u), Vt(l, t, u)) : (nl && c && Ri(t), t.flags |= 1, jl(l, t, a, u), t.child);
  }
  function Cs(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !_i(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Xs(
        l,
        t,
        n,
        a,
        u
      )) : (l = $u(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !bc(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : wa, e(i, a) && l.ref === t.ref)
        return Vt(l, t, u);
    }
    return t.flags |= 1, l = Yt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Xs(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (wa(n, a) && l.ref === t.ref)
        if (Cl = !1, t.pendingProps = a = n, bc(l, u))
          (l.flags & 131072) !== 0 && (Cl = !0);
        else
          return t.lanes = l.lanes, Vt(l, t, u);
    }
    return rc(
      l,
      t,
      e,
      a,
      u
    );
  }
  function Qs(l, t, e) {
    var a = t.pendingProps, u = a.children, n = l !== null ? l.memoizedState : null;
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (a = n !== null ? n.baseLanes | e : e, l !== null) {
          for (u = t.child = l.child, n = 0; u !== null; )
            n = n | u.lanes | u.childLanes, u = u.sibling;
          t.childLanes = n & ~a;
        } else t.childLanes = 0, t.child = null;
        return js(
          l,
          t,
          a,
          e
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && tn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Xo(t, n) : wi(), _s(t);
      else
        return t.lanes = t.childLanes = 536870912, js(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e
        );
    } else
      n !== null ? (tn(t, n.cachePool), Xo(t, n), fe(), t.memoizedState = null) : (l !== null && tn(t, null), wi(), fe());
    return jl(l, t, u, e), t.child;
  }
  function js(l, t, e, a) {
    var u = Ci();
    return u = u === null ? null : { parent: Hl._currentValue, pool: u }, t.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, l !== null && tn(t, null), wi(), _s(t), l !== null && Wa(l, t, a, !0), null;
  }
  function Sn(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function rc(l, t, e, a, u) {
    return Be(t), e = Ji(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = ki(), l !== null && !Cl ? (Wi(l, t, u), Vt(l, t, u)) : (nl && a && Ri(t), t.flags |= 1, jl(l, t, e, u), t.child);
  }
  function Zs(l, t, e, a, u, n) {
    return Be(t), t.updateQueue = null, e = jo(
      t,
      a,
      e,
      u
    ), Qo(l), a = ki(), l !== null && !Cl ? (Wi(l, t, n), Vt(l, t, n)) : (nl && a && Ri(t), t.flags |= 1, jl(l, t, e, n), t.child);
  }
  function Vs(l, t, e, a, u) {
    if (Be(t), t.stateNode === null) {
      var n = na, i = e.contextType;
      typeof i == "object" && i !== null && (n = Ll(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = oc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Qi(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? Ll(i) : na, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (fc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && oc.enqueueReplaceState(n, n.state, null), eu(t, a, n, u), tu(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, s = Ce(e, c);
      n.props = s;
      var y = n.context, T = e.contextType;
      i = na, typeof T == "object" && T !== null && (i = Ll(T));
      var E = e.getDerivedStateFromProps;
      T = typeof E == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, T || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || y !== i) && Ds(
        t,
        n,
        a,
        i
      ), ae = !1;
      var h = t.memoizedState;
      n.state = h, eu(t, a, n, u), tu(), y = t.memoizedState, c || h !== y || ae ? (typeof E == "function" && (fc(
        t,
        e,
        E,
        a
      ), y = t.memoizedState), (s = ae || xs(
        t,
        e,
        s,
        a,
        h,
        y,
        i
      )) ? (T || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = y), n.props = a, n.state = y, n.context = i, a = s) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, ji(l, t), i = t.memoizedProps, T = Ce(e, i), n.props = T, E = t.pendingProps, h = n.context, y = e.contextType, s = na, typeof y == "object" && y !== null && (s = Ll(y)), c = e.getDerivedStateFromProps, (y = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== E || h !== s) && Ds(
        t,
        n,
        a,
        s
      ), ae = !1, h = t.memoizedState, n.state = h, eu(t, a, n, u), tu();
      var g = t.memoizedState;
      i !== E || h !== g || ae || l !== null && l.dependencies !== null && Pu(l.dependencies) ? (typeof c == "function" && (fc(
        t,
        e,
        c,
        a
      ), g = t.memoizedState), (T = ae || xs(
        t,
        e,
        T,
        a,
        h,
        g,
        s
      ) || l !== null && l.dependencies !== null && Pu(l.dependencies)) ? (y || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, g, s), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        g,
        s
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = g), n.props = a, n.state = g, n.context = s, a = T) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, Sn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = ya(
      t,
      l.child,
      null,
      u
    ), t.child = ya(
      t,
      null,
      e,
      u
    )) : jl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = Vt(
      l,
      t,
      u
    ), l;
  }
  function ws(l, t, e, a) {
    return Ja(), t.flags |= 256, jl(l, t, e, a), t.child;
  }
  var dc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mc(l) {
    return { baseLanes: l, cachePool: Uo() };
  }
  function vc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= pt), l;
  }
  function Ls(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (ql.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (nl) {
        if (u ? ce(t) : fe(), nl) {
          var c = El, s;
          if (s = c) {
            l: {
              for (s = c, c = xt; s.nodeType !== 8; ) {
                if (!c) {
                  c = null;
                  break l;
                }
                if (s = Mt(
                  s.nextSibling
                ), s === null) {
                  c = null;
                  break l;
                }
              }
              c = s;
            }
            c !== null ? (t.memoizedState = {
              dehydrated: c,
              treeContext: Re !== null ? { id: Gt, overflow: Ct } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, s = it(
              18,
              null,
              null,
              0
            ), s.stateNode = c, s.return = t, t.child = s, kl = t, El = null, s = !0) : s = !1;
          }
          s || He(t);
        }
        if (c = t.memoizedState, c !== null && (c = c.dehydrated, c !== null))
          return Fc(c) ? t.lanes = 32 : t.lanes = 536870912, null;
        Zt(t);
      }
      return c = a.children, a = a.fallback, u ? (fe(), u = t.mode, c = pn(
        { mode: "hidden", children: c },
        u
      ), a = De(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, u = t.child, u.memoizedState = mc(e), u.childLanes = vc(
        l,
        i,
        e
      ), t.memoizedState = dc, a) : (ce(t), yc(t, c));
    }
    if (s = l.memoizedState, s !== null && (c = s.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (ce(t), t.flags &= -257, t = hc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (fe(), t.child = l.child, t.flags |= 128, t = null) : (fe(), u = a.fallback, c = t.mode, a = pn(
          { mode: "visible", children: a.children },
          c
        ), u = De(
          u,
          c,
          e,
          null
        ), u.flags |= 2, a.return = t, u.return = t, a.sibling = u, t.child = a, ya(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = mc(e), a.childLanes = vc(
          l,
          i,
          e
        ), t.memoizedState = dc, t = u);
      else if (ce(t), Fc(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var y = i.dgst;
        i = y, a = Error(o(419)), a.stack = "", a.digest = i, ka({ value: a, source: null, stack: null }), t = hc(
          l,
          t,
          e
        );
      } else if (Cl || Wa(l, t, e, !1), i = (e & l.childLanes) !== 0, Cl || i) {
        if (i = hl, i !== null && (a = e & -e, a = (a & 42) !== 0 ? 1 : In(a), a = (a & (i.suspendedLanes | e)) !== 0 ? 0 : a, a !== 0 && a !== s.retryLane))
          throw s.retryLane = a, ua(l, a), rt(i, l, a), Ys;
        c.data === "$?" || qc(), t = hc(
          l,
          t,
          e
        );
      } else
        c.data === "$?" ? (t.flags |= 192, t.child = l.child, t = null) : (l = s.treeContext, El = Mt(
          c.nextSibling
        ), kl = t, nl = !0, Ne = null, xt = !1, l !== null && (gt[bt++] = Gt, gt[bt++] = Ct, gt[bt++] = Re, Gt = l.id, Ct = l.overflow, Re = t), t = yc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (fe(), u = a.fallback, c = t.mode, s = l.child, y = s.sibling, a = Yt(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 65011712, y !== null ? u = Yt(y, u) : (u = De(
      u,
      c,
      e,
      null
    ), u.flags |= 2), u.return = t, a.return = t, a.sibling = u, t.child = a, a = u, u = t.child, c = l.child.memoizedState, c === null ? c = mc(e) : (s = c.cachePool, s !== null ? (y = Hl._currentValue, s = s.parent !== y ? { parent: y, pool: y } : s) : s = Uo(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: s
    }), u.memoizedState = c, u.childLanes = vc(
      l,
      i,
      e
    ), t.memoizedState = dc, a) : (ce(t), e = l.child, l = e.sibling, e = Yt(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function yc(l, t) {
    return t = pn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function pn(l, t) {
    return l = it(22, l, null, t), l.lanes = 0, l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, l;
  }
  function hc(l, t, e) {
    return ya(t, l.child, null, e), l = yc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Ks(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), qi(l.return, t, e);
  }
  function gc(l, t, e, a, u) {
    var n = l.memoizedState;
    n === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u
    } : (n.isBackwards = t, n.rendering = null, n.renderingStartTime = 0, n.last = a, n.tail = e, n.tailMode = u);
  }
  function Js(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    if (jl(l, t, a.children, e), a = ql.current, (a & 2) !== 0)
      a = a & 1 | 2, t.flags |= 128;
    else {
      if (l !== null && (l.flags & 128) !== 0)
        l: for (l = t.child; l !== null; ) {
          if (l.tag === 13)
            l.memoizedState !== null && Ks(l, e, t);
          else if (l.tag === 19)
            Ks(l, e, t);
          else if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
          if (l === t) break l;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === t)
              break l;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      a &= 1;
    }
    switch (D(ql, a), u) {
      case "forwards":
        for (e = t.child, u = null; e !== null; )
          l = e.alternate, l !== null && hn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), gc(
          t,
          !1,
          u,
          e,
          n
        );
        break;
      case "backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && hn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        gc(
          t,
          !0,
          e,
          null,
          n
        );
        break;
      case "together":
        gc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Vt(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), me |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (Wa(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (l = t.child, e = Yt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = Yt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function bc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Pu(l)));
  }
  function dv(l, t, e) {
    switch (t.tag) {
      case 3:
        ml(t, t.stateNode.containerInfo), ee(t, Hl, l.memoizedState.cache), Ja();
        break;
      case 27:
      case 5:
        $t(t);
        break;
      case 4:
        ml(t, t.stateNode.containerInfo);
        break;
      case 10:
        ee(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ce(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Ls(l, t, e) : (ce(t), l = Vt(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        ce(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (Wa(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return Js(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), D(ql, ql.current), a) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Qs(l, t, e);
      case 24:
        ee(t, Hl, l.memoizedState.cache);
    }
    return Vt(l, t, e);
  }
  function ks(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Cl = !0;
      else {
        if (!bc(l, e) && (t.flags & 128) === 0)
          return Cl = !1, dv(
            l,
            t,
            e
          );
        Cl = (l.flags & 131072) !== 0;
      }
    else
      Cl = !1, nl && (t.flags & 1048576) !== 0 && zo(t, Iu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          l = t.pendingProps;
          var a = t.elementType, u = a._init;
          if (a = u(a._payload), t.type = a, typeof a == "function")
            _i(a) ? (l = Ce(a, l), t.tag = 1, t = Vs(
              null,
              t,
              a,
              l,
              e
            )) : (t.tag = 0, t = rc(
              null,
              t,
              a,
              l,
              e
            ));
          else {
            if (a != null) {
              if (u = a.$$typeof, u === Yl) {
                t.tag = 11, t = Gs(
                  null,
                  t,
                  a,
                  l,
                  e
                );
                break l;
              } else if (u === Nl) {
                t.tag = 14, t = Cs(
                  null,
                  t,
                  a,
                  l,
                  e
                );
                break l;
              }
            }
            throw t = At(a) || a, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return rc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = Ce(
          a,
          t.pendingProps
        ), Vs(
          l,
          t,
          a,
          u,
          e
        );
      case 3:
        l: {
          if (ml(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(o(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, ji(l, t), eu(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, ee(t, Hl, a), a !== n.cache && Bi(
            t,
            [Hl],
            e,
            !0
          ), tu(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = ws(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = yt(
                Error(o(424)),
                t
              ), ka(u), t = ws(
                l,
                t,
                a,
                e
              );
              break l;
            } else {
              switch (l = t.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (El = Mt(l.firstChild), kl = t, nl = !0, Ne = null, xt = !0, e = Os(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (Ja(), a === u) {
              t = Vt(
                l,
                t,
                e
              );
              break l;
            }
            jl(
              l,
              t,
              a,
              e
            );
          }
          t = t.child;
        }
        return t;
      case 26:
        return Sn(l, t), l === null ? (e = Ir(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : nl || (e = t.type, l = t.pendingProps, a = qn(
          L.current
        ).createElement(e), a[wl] = t, a[Fl] = l, Vl(a, e, l), Gl(a), t.stateNode = a) : t.memoizedState = Ir(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return $t(t), l === null && nl && (a = t.stateNode = Wr(
          t.type,
          t.pendingProps,
          L.current
        ), kl = t, xt = !0, u = El, ge(t.type) ? (Ic = u, El = Mt(
          a.firstChild
        )) : El = u), jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), Sn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && nl && ((u = a = El) && (a = Qv(
          a,
          t.type,
          t.pendingProps,
          xt
        ), a !== null ? (t.stateNode = a, kl = t, El = Mt(
          a.firstChild
        ), xt = !1, u = !0) : u = !1), u || He(t)), $t(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, kc(u, n) ? a = null : i !== null && kc(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Ji(
          l,
          t,
          uv,
          null,
          null,
          e
        ), zu._currentValue = u), Sn(l, t), jl(l, t, a, e), t.child;
      case 6:
        return l === null && nl && ((l = e = El) && (e = jv(
          e,
          t.pendingProps,
          xt
        ), e !== null ? (t.stateNode = e, kl = t, El = null, l = !0) : l = !1), l || He(t)), null;
      case 13:
        return Ls(l, t, e);
      case 4:
        return ml(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ya(
          t,
          null,
          a,
          e
        ) : jl(
          l,
          t,
          a,
          e
        ), t.child;
      case 11:
        return Gs(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return jl(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, ee(t, t.type, a.value), jl(
          l,
          t,
          a.children,
          e
        ), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, Be(t), u = Ll(u), a = a(u), t.flags |= 1, jl(l, t, a, e), t.child;
      case 14:
        return Cs(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Xs(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Js(l, t, e);
      case 31:
        return a = t.pendingProps, e = t.mode, a = {
          mode: a.mode,
          children: a.children
        }, l === null ? (e = pn(
          a,
          e
        ), e.ref = t.ref, t.child = e, e.return = t, t = e) : (e = Yt(l.child, a), e.ref = t.ref, t.child = e, e.return = t, t = e), t;
      case 22:
        return Qs(l, t, e);
      case 24:
        return Be(t), a = Ll(Hl), l === null ? (u = Ci(), u === null && (u = hl, n = Yi(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = {
          parent: a,
          cache: u
        }, Qi(t), ee(t, Hl, u)) : ((l.lanes & e) !== 0 && (ji(l, t), eu(t, null, null, e), tu()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ee(t, Hl, a)) : (a = n.cache, ee(t, Hl, a), a !== u.cache && Bi(
          t,
          [Hl],
          e,
          !0
        ))), jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function wt(l) {
    l.flags |= 4;
  }
  function Ws(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !ad(t)) {
      if (t = St.current, t !== null && ((el & 4194048) === el ? Dt !== null : (el & 62914560) !== el && (el & 536870912) === 0 || t !== Dt))
        throw Pa = Xi, No;
      l.flags |= 8192;
    }
  }
  function Tn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Of() : 536870912, l.lanes |= t, Sa |= t);
  }
  function ou(l, t) {
    if (!nl)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            t.alternate !== null && (e = t), t = t.sibling;
          e === null ? l.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function Tl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function mv(l, t, e) {
    var a = t.pendingProps;
    switch (Ui(t), t.tag) {
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
        return Tl(t), null;
      case 1:
        return Tl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Qt(Hl), et(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ka(t) ? wt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, _o())), Tl(t), null;
      case 26:
        return e = t.memoizedState, l === null ? (wt(t), e !== null ? (Tl(t), Ws(t, e)) : (Tl(t), t.flags &= -16777217)) : e ? e !== l.memoizedState ? (wt(t), Tl(t), Ws(t, e)) : (Tl(t), t.flags &= -16777217) : (l.memoizedProps !== a && wt(t), Tl(t), t.flags &= -16777217), null;
      case 27:
        Ft(t), e = L.current;
        var u = t.type;
        if (l !== null && t.stateNode != null)
          l.memoizedProps !== a && wt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Tl(t), null;
          }
          l = B.current, Ka(t) ? Mo(t) : (l = Wr(u, a, e), t.stateNode = l, wt(t));
        }
        return Tl(t), null;
      case 5:
        if (Ft(t), e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && wt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Tl(t), null;
          }
          if (l = B.current, Ka(t))
            Mo(t);
          else {
            switch (u = qn(
              L.current
            ), l) {
              case 1:
                l = u.createElementNS(
                  "http://www.w3.org/2000/svg",
                  e
                );
                break;
              case 2:
                l = u.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  e
                );
                break;
              default:
                switch (e) {
                  case "svg":
                    l = u.createElementNS(
                      "http://www.w3.org/2000/svg",
                      e
                    );
                    break;
                  case "math":
                    l = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      e
                    );
                    break;
                  case "script":
                    l = u.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                    break;
                  case "select":
                    l = typeof a.is == "string" ? u.createElement("select", { is: a.is }) : u.createElement("select"), a.multiple ? l.multiple = !0 : a.size && (l.size = a.size);
                    break;
                  default:
                    l = typeof a.is == "string" ? u.createElement(e, { is: a.is }) : u.createElement(e);
                }
            }
            l[wl] = t, l[Fl] = a;
            l: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6)
                l.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                u.child.return = u, u = u.child;
                continue;
              }
              if (u === t) break l;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t)
                  break l;
                u = u.return;
              }
              u.sibling.return = u.return, u = u.sibling;
            }
            t.stateNode = l;
            l: switch (Vl(l, e, a), e) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!a.autoFocus;
                break l;
              case "img":
                l = !0;
                break l;
              default:
                l = !1;
            }
            l && wt(t);
          }
        }
        return Tl(t), t.flags &= -16777217, null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && wt(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(o(166));
          if (l = L.current, Ka(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = kl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[wl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Zr(l.nodeValue, e)), l || He(t);
          } else
            l = qn(l).createTextNode(
              a
            ), l[wl] = t, t.stateNode = l;
        }
        return Tl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = Ka(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[wl] = t;
            } else
              Ja(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Tl(t), u = !1;
          } else
            u = _o(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Zt(t), t) : (Zt(t), null);
        }
        if (Zt(t), (t.flags & 128) !== 0)
          return t.lanes = e, t;
        if (e = a !== null, l = l !== null && l.memoizedState !== null, e) {
          a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool);
          var n = null;
          a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048);
        }
        return e !== l && e && (t.child.flags |= 8192), Tn(t, t.updateQueue), Tl(t), null;
      case 4:
        return et(), l === null && Vc(t.stateNode.containerInfo), Tl(t), null;
      case 10:
        return Qt(t.type), Tl(t), null;
      case 19:
        if (H(ql), u = t.memoizedState, u === null) return Tl(t), null;
        if (a = (t.flags & 128) !== 0, n = u.rendering, n === null)
          if (a) ou(u, !1);
          else {
            if (zl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = hn(l), n !== null) {
                  for (t.flags |= 128, ou(u, !1), l = n.updateQueue, t.updateQueue = l, Tn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    Eo(e, l), e = e.sibling;
                  return D(
                    ql,
                    ql.current & 1 | 2
                  ), t.child;
                }
                l = l.sibling;
              }
            u.tail !== null && _t() > zn && (t.flags |= 128, a = !0, ou(u, !1), t.lanes = 4194304);
          }
        else {
          if (!a)
            if (l = hn(n), l !== null) {
              if (t.flags |= 128, a = !0, l = l.updateQueue, t.updateQueue = l, Tn(t, l), ou(u, !0), u.tail === null && u.tailMode === "hidden" && !n.alternate && !nl)
                return Tl(t), null;
            } else
              2 * _t() - u.renderingStartTime > zn && e !== 536870912 && (t.flags |= 128, a = !0, ou(u, !1), t.lanes = 4194304);
          u.isBackwards ? (n.sibling = t.child, t.child = n) : (l = u.last, l !== null ? l.sibling = n : t.child = n, u.last = n);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = _t(), t.sibling = null, l = ql.current, D(ql, a ? l & 1 | 2 : l & 1), t) : (Tl(t), null);
      case 22:
      case 23:
        return Zt(t), Li(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Tl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Tl(t), e = t.updateQueue, e !== null && Tn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && H(Ye), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Qt(Hl), Tl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function vv(l, t) {
    switch (Ui(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Qt(Hl), et(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ft(t), null;
      case 13:
        if (Zt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Ja();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return H(ql), null;
      case 4:
        return et(), null;
      case 10:
        return Qt(t.type), null;
      case 22:
      case 23:
        return Zt(t), Li(), l !== null && H(Ye), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Qt(Hl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $s(l, t) {
    switch (Ui(t), t.tag) {
      case 3:
        Qt(Hl), et();
        break;
      case 26:
      case 27:
      case 5:
        Ft(t);
        break;
      case 4:
        et();
        break;
      case 13:
        Zt(t);
        break;
      case 19:
        H(ql);
        break;
      case 10:
        Qt(t.type);
        break;
      case 22:
      case 23:
        Zt(t), Li(), l !== null && H(Ye);
        break;
      case 24:
        Qt(Hl);
    }
  }
  function su(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      vl(t, t.return, c);
    }
  }
  function oe(l, t, e) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = t;
              var s = e, y = c;
              try {
                y();
              } catch (T) {
                vl(
                  u,
                  s,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (T) {
      vl(t, t.return, T);
    }
  }
  function Fs(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Co(t, e);
      } catch (a) {
        vl(l, l.return, a);
      }
    }
  }
  function Is(l, t, e) {
    e.props = Ce(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      vl(l, t, a);
    }
  }
  function ru(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (u) {
      vl(l, t, u);
    }
  }
  function Rt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          vl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          vl(l, t, u);
        }
      else e.current = null;
  }
  function Ps(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      vl(l, l.return, u);
    }
  }
  function Sc(l, t, e) {
    try {
      var a = l.stateNode;
      Bv(a, l.type, e, t), a[Fl] = t;
    } catch (u) {
      vl(l, l.return, u);
    }
  }
  function lr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ge(l.type) || l.tag === 4;
  }
  function pc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || lr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ge(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Tc(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Hn));
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (Tc(l, t, e), l = l.sibling; l !== null; )
        Tc(l, t, e), l = l.sibling;
  }
  function An(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (An(l, t, e), l = l.sibling; l !== null; )
        An(l, t, e), l = l.sibling;
  }
  function tr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Vl(t, a, e), t[wl] = l, t[Fl] = e;
    } catch (n) {
      vl(l, l.return, n);
    }
  }
  var Lt = !1, xl = !1, Ac = !1, er = typeof WeakSet == "function" ? WeakSet : Set, Xl = null;
  function yv(l, t) {
    if (l = l.containerInfo, Kc = Qn, l = mo(l), pi(l)) {
      if ("selectionStart" in l)
        var e = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          e = (e = l.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break l;
            }
            var i = 0, c = -1, s = -1, y = 0, T = 0, E = l, h = null;
            t: for (; ; ) {
              for (var g; E !== e || u !== 0 && E.nodeType !== 3 || (c = i + u), E !== n || a !== 0 && E.nodeType !== 3 || (s = i + a), E.nodeType === 3 && (i += E.nodeValue.length), (g = E.firstChild) !== null; )
                h = E, E = g;
              for (; ; ) {
                if (E === l) break t;
                if (h === e && ++y === u && (c = i), h === n && ++T === a && (s = i), (g = E.nextSibling) !== null) break;
                E = h, h = E.parentNode;
              }
              E = g;
            }
            e = c === -1 || s === -1 ? null : { start: c, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Jc = { focusedElem: l, selectionRange: e }, Qn = !1, Xl = t; Xl !== null; )
      if (t = Xl, l = t.child, (t.subtreeFlags & 1024) !== 0 && l !== null)
        l.return = t, Xl = l;
      else
        for (; Xl !== null; ) {
          switch (t = Xl, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, e = t, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var w = Ce(
                    e.type,
                    u,
                    e.elementType === e.type
                  );
                  l = a.getSnapshotBeforeUpdate(
                    w,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (Z) {
                  vl(
                    e,
                    e.return,
                    Z
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  $c(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      $c(l);
                      break;
                    default:
                      l.textContent = "";
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
              if ((l & 1024) !== 0) throw Error(o(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Xl = l;
            break;
          }
          Xl = t.return;
        }
  }
  function ar(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        se(l, e), a & 4 && su(5, e);
        break;
      case 1:
        if (se(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              vl(e, e.return, i);
            }
          else {
            var u = Ce(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                u,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              vl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Fs(e), a & 512 && ru(e, e.return);
        break;
      case 3:
        if (se(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Co(l, t);
          } catch (i) {
            vl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && tr(e);
      case 26:
      case 5:
        se(l, e), t === null && a & 4 && Ps(e), a & 512 && ru(e, e.return);
        break;
      case 12:
        se(l, e);
        break;
      case 13:
        se(l, e), a & 4 && ir(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = zv.bind(
          null,
          e
        ), Zv(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Lt, !a) {
          t = t !== null && t.memoizedState !== null || xl, u = Lt;
          var n = xl;
          Lt = a, (xl = t) && !n ? re(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : se(l, e), Lt = u, xl = n;
        }
        break;
      case 30:
        break;
      default:
        se(l, e);
    }
  }
  function ur(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, ur(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && ti(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var bl = null, lt = !1;
  function Kt(l, t, e) {
    for (e = e.child; e !== null; )
      nr(l, t, e), e = e.sibling;
  }
  function nr(l, t, e) {
    if (at && typeof at.onCommitFiberUnmount == "function")
      try {
        at.onCommitFiberUnmount(Na, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        xl || Rt(e, t), Kt(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        xl || Rt(e, t);
        var a = bl, u = lt;
        ge(e.type) && (bl = e.stateNode, lt = !1), Kt(
          l,
          t,
          e
        ), pu(e.stateNode), bl = a, lt = u;
        break;
      case 5:
        xl || Rt(e, t);
      case 6:
        if (a = bl, u = lt, bl = null, Kt(
          l,
          t,
          e
        ), bl = a, lt = u, bl !== null)
          if (lt)
            try {
              (bl.nodeType === 9 ? bl.body : bl.nodeName === "HTML" ? bl.ownerDocument.body : bl).removeChild(e.stateNode);
            } catch (n) {
              vl(
                e,
                t,
                n
              );
            }
          else
            try {
              bl.removeChild(e.stateNode);
            } catch (n) {
              vl(
                e,
                t,
                n
              );
            }
        break;
      case 18:
        bl !== null && (lt ? (l = bl, Jr(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), xu(l)) : Jr(bl, e.stateNode));
        break;
      case 4:
        a = bl, u = lt, bl = e.stateNode.containerInfo, lt = !0, Kt(
          l,
          t,
          e
        ), bl = a, lt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        xl || oe(2, e, t), xl || oe(4, e, t), Kt(
          l,
          t,
          e
        );
        break;
      case 1:
        xl || (Rt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Is(
          e,
          t,
          a
        )), Kt(
          l,
          t,
          e
        );
        break;
      case 21:
        Kt(
          l,
          t,
          e
        );
        break;
      case 22:
        xl = (a = xl) || e.memoizedState !== null, Kt(
          l,
          t,
          e
        ), xl = a;
        break;
      default:
        Kt(
          l,
          t,
          e
        );
    }
  }
  function ir(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        xu(l);
      } catch (e) {
        vl(t, t.return, e);
      }
  }
  function hv(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new er()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new er()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function Ec(l, t) {
    var e = hv(l);
    t.forEach(function(a) {
      var u = Mv.bind(null, l, a);
      e.has(a) || (e.add(a), a.then(u, u));
    });
  }
  function ct(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = l, i = t, c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (ge(c.type)) {
                bl = c.stateNode, lt = !1;
                break l;
              }
              break;
            case 5:
              bl = c.stateNode, lt = !1;
              break l;
            case 3:
            case 4:
              bl = c.stateNode.containerInfo, lt = !0;
              break l;
          }
          c = c.return;
        }
        if (bl === null) throw Error(o(160));
        nr(n, i, u), bl = null, lt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; )
        cr(t, l), t = t.sibling;
  }
  var zt = null;
  function cr(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ct(t, l), ft(l), a & 4 && (oe(3, l, l.return), su(3, l), oe(5, l, l.return));
        break;
      case 1:
        ct(t, l), ft(l), a & 512 && (xl || e === null || Rt(e, e.return)), a & 64 && Lt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = zt;
        if (ct(t, l), ft(l), a & 512 && (xl || e === null || Rt(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[Ba] || n[wl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), Vl(n, a, e), n[wl] = l, Gl(n), a = n;
                      break l;
                    case "link":
                      var i = td(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), Vl(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = td(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), Vl(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  n[wl] = l, Gl(n), a = n;
                }
                l.stateNode = a;
              } else
                ed(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = ld(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? ed(
              u,
              l.type,
              l.stateNode
            ) : ld(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && Sc(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ct(t, l), ft(l), a & 512 && (xl || e === null || Rt(e, e.return)), e !== null && a & 4 && Sc(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ct(t, l), ft(l), a & 512 && (xl || e === null || Rt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Fe(u, "");
          } catch (g) {
            vl(l, l.return, g);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, Sc(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (Ac = !0);
        break;
      case 6:
        if (ct(t, l), ft(l), a & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (g) {
            vl(l, l.return, g);
          }
        }
        break;
      case 3:
        if (Gn = null, u = zt, zt = Bn(t.containerInfo), ct(t, l), zt = u, ft(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            xu(t.containerInfo);
          } catch (g) {
            vl(l, l.return, g);
          }
        Ac && (Ac = !1, fr(l));
        break;
      case 4:
        a = zt, zt = Bn(
          l.stateNode.containerInfo
        ), ct(t, l), ft(l), zt = a;
        break;
      case 12:
        ct(t, l), ft(l);
        break;
      case 13:
        ct(t, l), ft(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Dc = _t()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Ec(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null, y = Lt, T = xl;
        if (Lt = y || u, xl = T || s, ct(t, l), xl = T, Lt = y, ft(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || s || Lt || xl || Xe(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                s = e = t;
                try {
                  if (n = s.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = s.stateNode;
                    var E = s.memoizedProps.style, h = E != null && E.hasOwnProperty("display") ? E.display : null;
                    c.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (g) {
                  vl(s, s.return, g);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                } catch (g) {
                  vl(s, s.return, g);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              e === t && (e = null), t = t.return;
            }
            e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Ec(l, e))));
        break;
      case 19:
        ct(t, l), ft(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Ec(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ct(t, l), ft(l);
    }
  }
  function ft(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (lr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = pc(l);
            An(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Fe(i, ""), e.flags &= -33);
            var c = pc(l);
            An(l, c, i);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo, y = pc(l);
            Tc(
              l,
              y,
              s
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (T) {
        vl(l, l.return, T);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function fr(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        fr(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function se(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        ar(l, t.alternate, t), t = t.sibling;
  }
  function Xe(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oe(4, t, t.return), Xe(t);
          break;
        case 1:
          Rt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Is(
            t,
            t.return,
            e
          ), Xe(t);
          break;
        case 27:
          pu(t.stateNode);
        case 26:
        case 5:
          Rt(t, t.return), Xe(t);
          break;
        case 22:
          t.memoizedState === null && Xe(t);
          break;
        case 30:
          Xe(t);
          break;
        default:
          Xe(t);
      }
      l = l.sibling;
    }
  }
  function re(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          re(
            u,
            n,
            e
          ), su(4, n);
          break;
        case 1:
          if (re(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (y) {
              vl(a, a.return, y);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var s = u.shared.hiddenCallbacks;
              if (s !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < s.length; u++)
                  Go(s[u], c);
            } catch (y) {
              vl(a, a.return, y);
            }
          }
          e && i & 64 && Fs(n), ru(n, n.return);
          break;
        case 27:
          tr(n);
        case 26:
        case 5:
          re(
            u,
            n,
            e
          ), e && a === null && i & 4 && Ps(n), ru(n, n.return);
          break;
        case 12:
          re(
            u,
            n,
            e
          );
          break;
        case 13:
          re(
            u,
            n,
            e
          ), e && i & 4 && ir(u, n);
          break;
        case 22:
          n.memoizedState === null && re(
            u,
            n,
            e
          ), ru(n, n.return);
          break;
        case 30:
          break;
        default:
          re(
            u,
            n,
            e
          );
      }
      t = t.sibling;
    }
  }
  function zc(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && $a(e));
  }
  function Mc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && $a(l));
  }
  function Ut(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        or(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function or(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ut(
          l,
          t,
          e,
          a
        ), u & 2048 && su(9, t);
        break;
      case 1:
        Ut(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Ut(
          l,
          t,
          e,
          a
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && $a(l)));
        break;
      case 12:
        if (u & 2048) {
          Ut(
            l,
            t,
            e,
            a
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, i = n.id, c = n.onPostCommit;
            typeof c == "function" && c(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (s) {
            vl(t, t.return, s);
          }
        } else
          Ut(
            l,
            t,
            e,
            a
          );
        break;
      case 13:
        Ut(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Ut(
          l,
          t,
          e,
          a
        ) : du(l, t) : n._visibility & 2 ? Ut(
          l,
          t,
          e,
          a
        ) : (n._visibility |= 2, ha(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0
        )), u & 2048 && zc(i, t);
        break;
      case 24:
        Ut(
          l,
          t,
          e,
          a
        ), u & 2048 && Mc(t.alternate, t);
        break;
      default:
        Ut(
          l,
          t,
          e,
          a
        );
    }
  }
  function ha(l, t, e, a, u) {
    for (u = u && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var n = l, i = t, c = e, s = a, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ha(
            n,
            i,
            c,
            s,
            u
          ), su(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? ha(
            n,
            i,
            c,
            s,
            u
          ) : du(
            n,
            i
          ) : (T._visibility |= 2, ha(
            n,
            i,
            c,
            s,
            u
          )), u && y & 2048 && zc(
            i.alternate,
            i
          );
          break;
        case 24:
          ha(
            n,
            i,
            c,
            s,
            u
          ), u && y & 2048 && Mc(i.alternate, i);
          break;
        default:
          ha(
            n,
            i,
            c,
            s,
            u
          );
      }
      t = t.sibling;
    }
  }
  function du(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            du(e, a), u & 2048 && zc(
              a.alternate,
              a
            );
            break;
          case 24:
            du(e, a), u & 2048 && Mc(a.alternate, a);
            break;
          default:
            du(e, a);
        }
        t = t.sibling;
      }
  }
  var mu = 8192;
  function ga(l) {
    if (l.subtreeFlags & mu)
      for (l = l.child; l !== null; )
        sr(l), l = l.sibling;
  }
  function sr(l) {
    switch (l.tag) {
      case 26:
        ga(l), l.flags & mu && l.memoizedState !== null && t0(
          zt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        ga(l);
        break;
      case 3:
      case 4:
        var t = zt;
        zt = Bn(l.stateNode.containerInfo), ga(l), zt = t;
        break;
      case 22:
        l.memoizedState === null && (t = l.alternate, t !== null && t.memoizedState !== null ? (t = mu, mu = 16777216, ga(l), mu = t) : ga(l));
        break;
      default:
        ga(l);
    }
  }
  function rr(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function vu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Xl = a, mr(
            a,
            l
          );
        }
      rr(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        dr(l), l = l.sibling;
  }
  function dr(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        vu(l), l.flags & 2048 && oe(9, l, l.return);
        break;
      case 3:
        vu(l);
        break;
      case 12:
        vu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, En(l)) : vu(l);
        break;
      default:
        vu(l);
    }
  }
  function En(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Xl = a, mr(
            a,
            l
          );
        }
      rr(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          oe(8, t, t.return), En(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, En(t));
          break;
        default:
          En(t);
      }
      l = l.sibling;
    }
  }
  function mr(l, t) {
    for (; Xl !== null; ) {
      var e = Xl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          oe(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          $a(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Xl = a;
      else
        l: for (e = l; Xl !== null; ) {
          a = Xl;
          var u = a.sibling, n = a.return;
          if (ur(a), a === e) {
            Xl = null;
            break l;
          }
          if (u !== null) {
            u.return = n, Xl = u;
            break l;
          }
          Xl = n;
        }
    }
  }
  var gv = {
    getCacheForType: function(l) {
      var t = Ll(Hl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    }
  }, bv = typeof WeakMap == "function" ? WeakMap : Map, fl = 0, hl = null, ll = null, el = 0, ol = 0, ot = null, de = !1, ba = !1, Oc = !1, Jt = 0, zl = 0, me = 0, Qe = 0, _c = 0, pt = 0, Sa = 0, yu = null, tt = null, xc = !1, Dc = 0, zn = 1 / 0, Mn = null, ve = null, Zl = 0, ye = null, pa = null, Ta = 0, Rc = 0, Uc = null, vr = null, hu = 0, Nc = null;
  function st() {
    if ((fl & 2) !== 0 && el !== 0)
      return el & -el;
    if (p.T !== null) {
      var l = fa;
      return l !== 0 ? l : Xc();
    }
    return Df();
  }
  function yr() {
    pt === 0 && (pt = (el & 536870912) === 0 || nl ? Mf() : 536870912);
    var l = St.current;
    return l !== null && (l.flags |= 32), pt;
  }
  function rt(l, t, e) {
    (l === hl && (ol === 2 || ol === 9) || l.cancelPendingCommit !== null) && (Aa(l, 0), he(
      l,
      el,
      pt,
      !1
    )), qa(l, e), ((fl & 2) === 0 || l !== hl) && (l === hl && ((fl & 2) === 0 && (Qe |= e), zl === 4 && he(
      l,
      el,
      pt,
      !1
    )), Nt(l));
  }
  function hr(l, t, e) {
    if ((fl & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 124) === 0 && (t & l.expiredLanes) === 0 || Ha(l, t), u = a ? Tv(l, t) : Bc(l, t, !0), n = a;
    do {
      if (u === 0) {
        ba && !a && he(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !Sv(e)) {
          u = Bc(l, t, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = yu;
              var s = c.current.memoizedState.isDehydrated;
              if (s && (Aa(c, i).flags |= 256), i = Bc(
                c,
                i,
                !1
              ), i !== 2) {
                if (Oc && !s) {
                  c.errorRecoveryDisabledLanes |= n, Qe |= n, u = 4;
                  break l;
                }
                n = tt, tt = u, n !== null && (tt === null ? tt = n : tt.push.apply(
                  tt,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Aa(l, 0), he(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              he(
                a,
                t,
                pt,
                !de
              );
              break l;
            case 2:
              tt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (u = Dc + 300 - _t(), 10 < u)) {
            if (he(
              a,
              t,
              pt,
              !de
            ), Bu(a, 0, !0) !== 0) break l;
            a.timeoutHandle = Lr(
              gr.bind(
                null,
                a,
                e,
                tt,
                Mn,
                xc,
                t,
                pt,
                Qe,
                Sa,
                de,
                n,
                2,
                -0,
                0
              ),
              u
            );
            break l;
          }
          gr(
            a,
            e,
            tt,
            Mn,
            xc,
            t,
            pt,
            Qe,
            Sa,
            de,
            n,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Nt(l);
  }
  function gr(l, t, e, a, u, n, i, c, s, y, T, E, h, g) {
    if (l.timeoutHandle = -1, E = t.subtreeFlags, (E & 8192 || (E & 16785408) === 16785408) && (Eu = { stylesheets: null, count: 0, unsuspend: l0 }, sr(t), E = e0(), E !== null)) {
      l.cancelPendingCommit = E(
        zr.bind(
          null,
          l,
          t,
          n,
          e,
          a,
          u,
          i,
          c,
          s,
          T,
          1,
          h,
          g
        )
      ), he(l, n, i, !y);
      return;
    }
    zr(
      l,
      t,
      n,
      e,
      a,
      u,
      i,
      c,
      s
    );
  }
  function Sv(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!nt(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null)
        e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function he(l, t, e, a) {
    t &= ~_c, t &= ~Qe, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - ut(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && _f(l, e, t);
  }
  function On() {
    return (fl & 6) === 0 ? (gu(0), !1) : !0;
  }
  function Hc() {
    if (ll !== null) {
      if (ol === 0)
        var l = ll.return;
      else
        l = ll, Xt = qe = null, $i(l), va = null, cu = 0, l = ll;
      for (; l !== null; )
        $s(l.alternate, l), l = l.return;
      ll = null;
    }
  }
  function Aa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Gv(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), Hc(), hl = l, ll = e = Yt(l.current, null), el = t, ol = 0, ot = null, de = !1, ba = Ha(l, t), Oc = !1, Sa = pt = _c = Qe = me = zl = 0, tt = yu = null, xc = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - ut(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return Jt = t, Ju(), e;
  }
  function br(l, t) {
    $ = null, p.H = mn, t === Ia || t === en ? (t = Bo(), ol = 3) : t === No ? (t = Bo(), ol = 4) : ol = t === Ys ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ot = t, ll === null && (zl = 1, bn(
      l,
      yt(t, l.current)
    ));
  }
  function Sr() {
    var l = p.H;
    return p.H = mn, l === null ? mn : l;
  }
  function pr() {
    var l = p.A;
    return p.A = gv, l;
  }
  function qc() {
    zl = 4, de || (el & 4194048) !== el && St.current !== null || (ba = !0), (me & 134217727) === 0 && (Qe & 134217727) === 0 || hl === null || he(
      hl,
      el,
      pt,
      !1
    );
  }
  function Bc(l, t, e) {
    var a = fl;
    fl |= 2;
    var u = Sr(), n = pr();
    (hl !== l || el !== t) && (Mn = null, Aa(l, t)), t = !1;
    var i = zl;
    l: do
      try {
        if (ol !== 0 && ll !== null) {
          var c = ll, s = ot;
          switch (ol) {
            case 8:
              Hc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              St.current === null && (t = !0);
              var y = ol;
              if (ol = 0, ot = null, Ea(l, c, s, y), e && ba) {
                i = 0;
                break l;
              }
              break;
            default:
              y = ol, ol = 0, ot = null, Ea(l, c, s, y);
          }
        }
        pv(), i = zl;
        break;
      } catch (T) {
        br(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Xt = qe = null, fl = a, p.H = u, p.A = n, ll === null && (hl = null, el = 0, Ju()), i;
  }
  function pv() {
    for (; ll !== null; ) Tr(ll);
  }
  function Tv(l, t) {
    var e = fl;
    fl |= 2;
    var a = Sr(), u = pr();
    hl !== l || el !== t ? (Mn = null, zn = _t() + 500, Aa(l, t)) : ba = Ha(
      l,
      t
    );
    l: do
      try {
        if (ol !== 0 && ll !== null) {
          t = ll;
          var n = ot;
          t: switch (ol) {
            case 1:
              ol = 0, ot = null, Ea(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Ho(n)) {
                ol = 0, ot = null, Ar(t);
                break;
              }
              t = function() {
                ol !== 2 && ol !== 9 || hl !== l || (ol = 7), Nt(l);
              }, n.then(t, t);
              break l;
            case 3:
              ol = 7;
              break l;
            case 4:
              ol = 5;
              break l;
            case 7:
              Ho(n) ? (ol = 0, ot = null, Ar(t)) : (ol = 0, ot = null, Ea(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (ll.tag) {
                case 26:
                  i = ll.memoizedState;
                case 5:
                case 27:
                  var c = ll;
                  if (!i || ad(i)) {
                    ol = 0, ot = null;
                    var s = c.sibling;
                    if (s !== null) ll = s;
                    else {
                      var y = c.return;
                      y !== null ? (ll = y, _n(y)) : ll = null;
                    }
                    break t;
                  }
              }
              ol = 0, ot = null, Ea(l, t, n, 5);
              break;
            case 6:
              ol = 0, ot = null, Ea(l, t, n, 6);
              break;
            case 8:
              Hc(), zl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        Av();
        break;
      } catch (T) {
        br(l, T);
      }
    while (!0);
    return Xt = qe = null, p.H = a, p.A = u, fl = e, ll !== null ? 0 : (hl = null, el = 0, Ju(), zl);
  }
  function Av() {
    for (; ll !== null && !wd(); )
      Tr(ll);
  }
  function Tr(l) {
    var t = ks(l.alternate, l, Jt);
    l.memoizedProps = l.pendingProps, t === null ? _n(l) : ll = t;
  }
  function Ar(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Zs(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          el
        );
        break;
      case 11:
        t = Zs(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          el
        );
        break;
      case 5:
        $i(t);
      default:
        $s(e, t), t = ll = Eo(t, Jt), t = ks(e, t, Jt);
    }
    l.memoizedProps = l.pendingProps, t === null ? _n(l) : ll = t;
  }
  function Ea(l, t, e, a) {
    Xt = qe = null, $i(t), va = null, cu = 0;
    var u = t.return;
    try {
      if (rv(
        l,
        u,
        t,
        e,
        el
      )) {
        zl = 1, bn(
          l,
          yt(e, l.current)
        ), ll = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw ll = u, n;
      zl = 1, bn(
        l,
        yt(e, l.current)
      ), ll = null;
      return;
    }
    t.flags & 32768 ? (nl || a === 1 ? l = !0 : ba || (el & 536870912) !== 0 ? l = !1 : (de = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = St.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Er(t, l)) : _n(t);
  }
  function _n(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Er(
          t,
          de
        );
        return;
      }
      l = t.return;
      var e = mv(
        t.alternate,
        t,
        Jt
      );
      if (e !== null) {
        ll = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        ll = t;
        return;
      }
      ll = t = l;
    } while (t !== null);
    zl === 0 && (zl = 5);
  }
  function Er(l, t) {
    do {
      var e = vv(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, ll = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        ll = l;
        return;
      }
      ll = l = e;
    } while (l !== null);
    zl = 6, ll = null;
  }
  function zr(l, t, e, a, u, n, i, c, s) {
    l.cancelPendingCommit = null;
    do
      xn();
    while (Zl !== 0);
    if ((fl & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= Mi, lm(
        l,
        e,
        n,
        i,
        c,
        s
      ), l === hl && (ll = hl = null, el = 0), pa = t, ye = l, Ta = e, Rc = n, Uc = u, vr = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Ov(Nu, function() {
        return Dr(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = p.T, p.T = null, u = U.p, U.p = 2, i = fl, fl |= 4;
        try {
          yv(l, t, e);
        } finally {
          fl = i, U.p = u, p.T = a;
        }
      }
      Zl = 1, Mr(), Or(), _r();
    }
  }
  function Mr() {
    if (Zl === 1) {
      Zl = 0;
      var l = ye, t = pa, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = p.T, p.T = null;
        var a = U.p;
        U.p = 2;
        var u = fl;
        fl |= 4;
        try {
          cr(t, l);
          var n = Jc, i = mo(l.containerInfo), c = n.focusedElem, s = n.selectionRange;
          if (i !== c && c && c.ownerDocument && ro(
            c.ownerDocument.documentElement,
            c
          )) {
            if (s !== null && pi(c)) {
              var y = s.start, T = s.end;
              if (T === void 0 && (T = y), "selectionStart" in c)
                c.selectionStart = y, c.selectionEnd = Math.min(
                  T,
                  c.value.length
                );
              else {
                var E = c.ownerDocument || document, h = E && E.defaultView || window;
                if (h.getSelection) {
                  var g = h.getSelection(), w = c.textContent.length, Z = Math.min(s.start, w), dl = s.end === void 0 ? Z : Math.min(s.end, w);
                  !g.extend && Z > dl && (i = dl, dl = Z, Z = i);
                  var m = so(
                    c,
                    Z
                  ), d = so(
                    c,
                    dl
                  );
                  if (m && d && (g.rangeCount !== 1 || g.anchorNode !== m.node || g.anchorOffset !== m.offset || g.focusNode !== d.node || g.focusOffset !== d.offset)) {
                    var v = E.createRange();
                    v.setStart(m.node, m.offset), g.removeAllRanges(), Z > dl ? (g.addRange(v), g.extend(d.node, d.offset)) : (v.setEnd(d.node, d.offset), g.addRange(v));
                  }
                }
              }
            }
            for (E = [], g = c; g = g.parentNode; )
              g.nodeType === 1 && E.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < E.length; c++) {
              var A = E[c];
              A.element.scrollLeft = A.left, A.element.scrollTop = A.top;
            }
          }
          Qn = !!Kc, Jc = Kc = null;
        } finally {
          fl = u, U.p = a, p.T = e;
        }
      }
      l.current = t, Zl = 2;
    }
  }
  function Or() {
    if (Zl === 2) {
      Zl = 0;
      var l = ye, t = pa, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = p.T, p.T = null;
        var a = U.p;
        U.p = 2;
        var u = fl;
        fl |= 4;
        try {
          ar(l, t.alternate, t);
        } finally {
          fl = u, U.p = a, p.T = e;
        }
      }
      Zl = 3;
    }
  }
  function _r() {
    if (Zl === 4 || Zl === 3) {
      Zl = 0, Ld();
      var l = ye, t = pa, e = Ta, a = vr;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Zl = 5 : (Zl = 0, pa = ye = null, xr(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (ve = null), Pn(e), t = t.stateNode, at && typeof at.onCommitFiberRoot == "function")
        try {
          at.onCommitFiberRoot(
            Na,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = p.T, u = U.p, U.p = 2, p.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          p.T = t, U.p = u;
        }
      }
      (Ta & 3) !== 0 && xn(), Nt(l), u = l.pendingLanes, (e & 4194090) !== 0 && (u & 42) !== 0 ? l === Nc ? hu++ : (hu = 0, Nc = l) : hu = 0, gu(0);
    }
  }
  function xr(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, $a(t)));
  }
  function xn(l) {
    return Mr(), Or(), _r(), Dr();
  }
  function Dr() {
    if (Zl !== 5) return !1;
    var l = ye, t = Rc;
    Rc = 0;
    var e = Pn(Ta), a = p.T, u = U.p;
    try {
      U.p = 32 > e ? 32 : e, p.T = null, e = Uc, Uc = null;
      var n = ye, i = Ta;
      if (Zl = 0, pa = ye = null, Ta = 0, (fl & 6) !== 0) throw Error(o(331));
      var c = fl;
      if (fl |= 4, dr(n.current), or(
        n,
        n.current,
        i,
        e
      ), fl = c, gu(0, !1), at && typeof at.onPostCommitFiberRoot == "function")
        try {
          at.onPostCommitFiberRoot(Na, n);
        } catch {
        }
      return !0;
    } finally {
      U.p = u, p.T = a, xr(l, t);
    }
  }
  function Rr(l, t, e) {
    t = yt(e, t), t = sc(l.stateNode, t, 2), l = ne(l, t, 2), l !== null && (qa(l, 2), Nt(l));
  }
  function vl(l, t, e) {
    if (l.tag === 3)
      Rr(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Rr(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ve === null || !ve.has(a))) {
            l = yt(e, l), e = qs(2), a = ne(t, e, 2), a !== null && (Bs(
              e,
              a,
              t,
              l
            ), qa(a, 2), Nt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Yc(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new bv();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (Oc = !0, u.add(e), l = Ev.bind(null, l, t, e), t.then(l, l));
  }
  function Ev(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, hl === l && (el & e) === e && (zl === 4 || zl === 3 && (el & 62914560) === el && 300 > _t() - Dc ? (fl & 2) === 0 && Aa(l, 0) : _c |= e, Sa === el && (Sa = 0)), Nt(l);
  }
  function Ur(l, t) {
    t === 0 && (t = Of()), l = ua(l, t), l !== null && (qa(l, t), Nt(l));
  }
  function zv(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Ur(l, e);
  }
  function Mv(l, t) {
    var e = 0;
    switch (l.tag) {
      case 13:
        var a = l.stateNode, u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(t), Ur(l, e);
  }
  function Ov(l, t) {
    return Wn(l, t);
  }
  var Dn = null, za = null, Gc = !1, Rn = !1, Cc = !1, je = 0;
  function Nt(l) {
    l !== za && l.next === null && (za === null ? Dn = za = l : za = za.next = l), Rn = !0, Gc || (Gc = !0, xv());
  }
  function gu(l, t) {
    if (!Cc && Rn) {
      Cc = !0;
      do
        for (var e = !1, a = Dn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - ut(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Br(a, n));
          } else
            n = el, n = Bu(
              a,
              a === hl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Ha(a, n) || (e = !0, Br(a, n));
          a = a.next;
        }
      while (e);
      Cc = !1;
    }
  }
  function _v() {
    Nr();
  }
  function Nr() {
    Rn = Gc = !1;
    var l = 0;
    je !== 0 && (Yv() && (l = je), je = 0);
    for (var t = _t(), e = null, a = Dn; a !== null; ) {
      var u = a.next, n = Hr(a, t);
      n === 0 ? (a.next = null, e === null ? Dn = u : e.next = u, u === null && (za = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (Rn = !0)), a = u;
    }
    gu(l);
  }
  function Hr(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - ut(n), c = 1 << i, s = u[i];
      s === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = Pd(c, t)) : s <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = hl, e = el, e = Bu(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (ol === 2 || ol === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && $n(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || Ha(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && $n(a), Pn(e)) {
        case 2:
        case 8:
          e = Ef;
          break;
        case 32:
          e = Nu;
          break;
        case 268435456:
          e = zf;
          break;
        default:
          e = Nu;
      }
      return a = qr.bind(null, l), e = Wn(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && $n(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function qr(l, t) {
    if (Zl !== 0 && Zl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (xn() && l.callbackNode !== e)
      return null;
    var a = el;
    return a = Bu(
      l,
      l === hl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (hr(l, a, t), Hr(l, _t()), l.callbackNode != null && l.callbackNode === e ? qr.bind(null, l) : null);
  }
  function Br(l, t) {
    if (xn()) return null;
    hr(l, t, !0);
  }
  function xv() {
    Cv(function() {
      (fl & 6) !== 0 ? Wn(
        Af,
        _v
      ) : Nr();
    });
  }
  function Xc() {
    return je === 0 && (je = Mf()), je;
  }
  function Yr(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Qu("" + l);
  }
  function Gr(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Dv(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Yr(
        (u[Fl] || null).action
      ), i = a.submitter;
      i && (t = (t = i[Fl] || null) ? Yr(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new wu(
        "action",
        "action",
        null,
        a,
        u
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (je !== 0) {
                  var s = i ? Gr(u, i) : new FormData(u);
                  nc(
                    e,
                    {
                      pending: !0,
                      data: s,
                      method: u.method,
                      action: n
                    },
                    null,
                    s
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), s = i ? Gr(u, i) : new FormData(u), nc(
                  e,
                  {
                    pending: !0,
                    data: s,
                    method: u.method,
                    action: n
                  },
                  n,
                  s
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Qc = 0; Qc < zi.length; Qc++) {
    var jc = zi[Qc], Rv = jc.toLowerCase(), Uv = jc[0].toUpperCase() + jc.slice(1);
    Et(
      Rv,
      "on" + Uv
    );
  }
  Et(ho, "onAnimationEnd"), Et(go, "onAnimationIteration"), Et(bo, "onAnimationStart"), Et("dblclick", "onDoubleClick"), Et("focusin", "onFocus"), Et("focusout", "onBlur"), Et(km, "onTransitionRun"), Et(Wm, "onTransitionStart"), Et($m, "onTransitionCancel"), Et(So, "onTransitionEnd"), ke("onMouseEnter", ["mouseout", "mouseover"]), ke("onMouseLeave", ["mouseout", "mouseover"]), ke("onPointerEnter", ["pointerout", "pointerover"]), ke("onPointerLeave", ["pointerout", "pointerover"]), Me(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Me(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Me("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Me(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Me(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Me(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var bu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Nv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bu)
  );
  function Cr(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], s = c.instance, y = c.currentTarget;
            if (c = c.listener, s !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (T) {
              gn(T);
            }
            u.currentTarget = null, n = s;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], s = c.instance, y = c.currentTarget, c = c.listener, s !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (T) {
              gn(T);
            }
            u.currentTarget = null, n = s;
          }
      }
    }
  }
  function tl(l, t) {
    var e = t[li];
    e === void 0 && (e = t[li] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Xr(t, l, 2, !1), e.add(a));
  }
  function Zc(l, t, e) {
    var a = 0;
    t && (a |= 4), Xr(
      e,
      l,
      a,
      t
    );
  }
  var Un = "_reactListening" + Math.random().toString(36).slice(2);
  function Vc(l) {
    if (!l[Un]) {
      l[Un] = !0, Uf.forEach(function(e) {
        e !== "selectionchange" && (Nv.has(e) || Zc(e, !1, l), Zc(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Un] || (t[Un] = !0, Zc("selectionchange", !1, t));
    }
  }
  function Xr(l, t, e, a) {
    switch (od(t)) {
      case 2:
        var u = n0;
        break;
      case 8:
        u = i0;
        break;
      default:
        u = af;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !ri || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function wc(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var s = i.tag;
              if ((s === 3 || s === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = Le(c), i === null) return;
            if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Lf(function() {
      var y = n, T = oi(e), E = [];
      l: {
        var h = po.get(l);
        if (h !== void 0) {
          var g = wu, w = l;
          switch (l) {
            case "keypress":
              if (Zu(e) === 0) break l;
            case "keydown":
            case "keyup":
              g = Om;
              break;
            case "focusin":
              w = "focus", g = yi;
              break;
            case "focusout":
              w = "blur", g = yi;
              break;
            case "beforeblur":
            case "afterblur":
              g = yi;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = kf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = vm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Dm;
              break;
            case ho:
            case go:
            case bo:
              g = gm;
              break;
            case So:
              g = Um;
              break;
            case "scroll":
            case "scrollend":
              g = dm;
              break;
            case "wheel":
              g = Hm;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = Sm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = $f;
              break;
            case "toggle":
            case "beforetoggle":
              g = Bm;
          }
          var Z = (t & 4) !== 0, dl = !Z && (l === "scroll" || l === "scrollend"), m = Z ? h !== null ? h + "Capture" : null : h;
          Z = [];
          for (var d = y, v; d !== null; ) {
            var A = d;
            if (v = A.stateNode, A = A.tag, A !== 5 && A !== 26 && A !== 27 || v === null || m === null || (A = Ga(d, m), A != null && Z.push(
              Su(d, A, v)
            )), dl) break;
            d = d.return;
          }
          0 < Z.length && (h = new g(
            h,
            w,
            null,
            e,
            T
          ), E.push({ event: h, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (h = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", h && e !== fi && (w = e.relatedTarget || e.fromElement) && (Le(w) || w[we]))
            break l;
          if ((g || h) && (h = T.window === T ? T : (h = T.ownerDocument) ? h.defaultView || h.parentWindow : window, g ? (w = e.relatedTarget || e.toElement, g = y, w = w ? Le(w) : null, w !== null && (dl = R(w), Z = w.tag, w !== dl || Z !== 5 && Z !== 27 && Z !== 6) && (w = null)) : (g = null, w = y), g !== w)) {
            if (Z = kf, A = "onMouseLeave", m = "onMouseEnter", d = "mouse", (l === "pointerout" || l === "pointerover") && (Z = $f, A = "onPointerLeave", m = "onPointerEnter", d = "pointer"), dl = g == null ? h : Ya(g), v = w == null ? h : Ya(w), h = new Z(
              A,
              d + "leave",
              g,
              e,
              T
            ), h.target = dl, h.relatedTarget = v, A = null, Le(T) === y && (Z = new Z(
              m,
              d + "enter",
              w,
              e,
              T
            ), Z.target = v, Z.relatedTarget = dl, A = Z), dl = A, g && w)
              t: {
                for (Z = g, m = w, d = 0, v = Z; v; v = Ma(v))
                  d++;
                for (v = 0, A = m; A; A = Ma(A))
                  v++;
                for (; 0 < d - v; )
                  Z = Ma(Z), d--;
                for (; 0 < v - d; )
                  m = Ma(m), v--;
                for (; d--; ) {
                  if (Z === m || m !== null && Z === m.alternate)
                    break t;
                  Z = Ma(Z), m = Ma(m);
                }
                Z = null;
              }
            else Z = null;
            g !== null && Qr(
              E,
              h,
              g,
              Z,
              !1
            ), w !== null && dl !== null && Qr(
              E,
              dl,
              w,
              Z,
              !0
            );
          }
        }
        l: {
          if (h = y ? Ya(y) : window, g = h.nodeName && h.nodeName.toLowerCase(), g === "select" || g === "input" && h.type === "file")
            var Y = uo;
          else if (eo(h))
            if (no)
              Y = Lm;
            else {
              Y = Vm;
              var I = Zm;
            }
          else
            g = h.nodeName, !g || g.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? y && ci(y.elementType) && (Y = uo) : Y = wm;
          if (Y && (Y = Y(l, y))) {
            ao(
              E,
              Y,
              e,
              T
            );
            break l;
          }
          I && I(l, h, y), l === "focusout" && y && h.type === "number" && y.memoizedProps.value != null && ii(h, "number", h.value);
        }
        switch (I = y ? Ya(y) : window, l) {
          case "focusin":
            (eo(I) || I.contentEditable === "true") && (ta = I, Ti = y, La = null);
            break;
          case "focusout":
            La = Ti = ta = null;
            break;
          case "mousedown":
            Ai = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ai = !1, vo(E, e, T);
            break;
          case "selectionchange":
            if (Jm) break;
          case "keydown":
          case "keyup":
            vo(E, e, T);
        }
        var X;
        if (gi)
          l: {
            switch (l) {
              case "compositionstart":
                var V = "onCompositionStart";
                break l;
              case "compositionend":
                V = "onCompositionEnd";
                break l;
              case "compositionupdate":
                V = "onCompositionUpdate";
                break l;
            }
            V = void 0;
          }
        else
          la ? lo(l, e) && (V = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (V = "onCompositionStart");
        V && (Ff && e.locale !== "ko" && (la || V !== "onCompositionStart" ? V === "onCompositionEnd" && la && (X = Kf()) : (te = T, di = "value" in te ? te.value : te.textContent, la = !0)), I = Nn(y, V), 0 < I.length && (V = new Wf(
          V,
          l,
          null,
          e,
          T
        ), E.push({ event: V, listeners: I }), X ? V.data = X : (X = to(e), X !== null && (V.data = X)))), (X = Gm ? Cm(l, e) : Xm(l, e)) && (V = Nn(y, "onBeforeInput"), 0 < V.length && (I = new Wf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), E.push({
          event: I,
          listeners: V
        }), I.data = X)), Dv(
          E,
          l,
          y,
          e,
          T
        );
      }
      Cr(E, t);
    });
  }
  function Su(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function Nn(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Ga(l, e), u != null && a.unshift(
        Su(l, u, n)
      ), u = Ga(l, t), u != null && a.push(
        Su(l, u, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Ma(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Qr(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, s = c.alternate, y = c.stateNode;
      if (c = c.tag, s !== null && s === a) break;
      c !== 5 && c !== 26 && c !== 27 || y === null || (s = y, u ? (y = Ga(e, n), y != null && i.unshift(
        Su(e, y, s)
      )) : u || (y = Ga(e, n), y != null && i.push(
        Su(e, y, s)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Hv = /\r\n?/g, qv = /\u0000|\uFFFD/g;
  function jr(l) {
    return (typeof l == "string" ? l : "" + l).replace(Hv, `
`).replace(qv, "");
  }
  function Zr(l, t) {
    return t = jr(t), jr(l) === t;
  }
  function Hn() {
  }
  function rl(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Fe(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Fe(l, "" + a);
        break;
      case "className":
        Gu(l, "class", a);
        break;
      case "tabIndex":
        Gu(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Gu(l, e, a);
        break;
      case "style":
        Vf(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Gu(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Qu("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (t !== "input" && rl(l, t, "name", u.name, u, null), rl(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), rl(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), rl(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (rl(l, t, "encType", u.encType, u, null), rl(l, t, "method", u.method, u, null), rl(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Qu("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Hn);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
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
          l.removeAttribute("xlink:href");
          break;
        }
        e = Qu("" + a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        tl("beforetoggle", l), tl("toggle", l), Yu(l, "popover", a);
        break;
      case "xlinkActuate":
        qt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        qt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        qt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        qt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        qt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        qt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        qt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        qt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        qt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Yu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = sm.get(e) || e, Yu(l, e, a));
    }
  }
  function Lc(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Vf(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Fe(l, a) : (typeof a == "number" || typeof a == "bigint") && Fe(l, "" + a);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Hn);
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
        if (!Nf.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[Fl] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : Yu(l, e, a);
          }
    }
  }
  function Vl(l, t, e) {
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
        tl("error", l), tl("load", l);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  rl(l, t, n, i, e, null);
              }
          }
        u && rl(l, t, "srcSet", e.srcSet, e, null), a && rl(l, t, "src", e.src, e, null);
        return;
      case "input":
        tl("invalid", l);
        var c = n = i = u = null, s = null, y = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var T = e[a];
            if (T != null)
              switch (a) {
                case "name":
                  u = T;
                  break;
                case "type":
                  i = T;
                  break;
                case "checked":
                  s = T;
                  break;
                case "defaultChecked":
                  y = T;
                  break;
                case "value":
                  n = T;
                  break;
                case "defaultValue":
                  c = T;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (T != null)
                    throw Error(o(137, t));
                  break;
                default:
                  rl(l, t, a, T, e, null);
              }
          }
        Xf(
          l,
          n,
          c,
          s,
          y,
          i,
          u,
          !1
        ), Cu(l);
        return;
      case "select":
        tl("invalid", l), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (c = e[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                rl(l, t, u, c, e, null);
            }
        t = n, e = i, l.multiple = !!a, t != null ? $e(l, !!a, t, !1) : e != null && $e(l, !!a, e, !0);
        return;
      case "textarea":
        tl("invalid", l), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(o(91));
                break;
              default:
                rl(l, t, i, c, e, null);
            }
        jf(l, a, u, n), Cu(l);
        return;
      case "option":
        for (s in e)
          if (e.hasOwnProperty(s) && (a = e[s], a != null))
            switch (s) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                rl(l, t, s, a, e, null);
            }
        return;
      case "dialog":
        tl("beforetoggle", l), tl("toggle", l), tl("cancel", l), tl("close", l);
        break;
      case "iframe":
      case "object":
        tl("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < bu.length; a++)
          tl(bu[a], l);
        break;
      case "image":
        tl("error", l), tl("load", l);
        break;
      case "details":
        tl("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        tl("error", l), tl("load", l);
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
        for (y in e)
          if (e.hasOwnProperty(y) && (a = e[y], a != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                rl(l, t, y, a, e, null);
            }
        return;
      default:
        if (ci(t)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && Lc(
              l,
              t,
              T,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && rl(l, t, c, a, e, null));
  }
  function Bv(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, s = null, y = null, T = null;
        for (g in e) {
          var E = e[g];
          if (e.hasOwnProperty(g) && E != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = E;
              default:
                a.hasOwnProperty(g) || rl(l, t, g, null, a, E);
            }
        }
        for (var h in a) {
          var g = a[h];
          if (E = e[h], a.hasOwnProperty(h) && (g != null || E != null))
            switch (h) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                y = g;
                break;
              case "defaultChecked":
                T = g;
                break;
              case "value":
                i = g;
                break;
              case "defaultValue":
                c = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(o(137, t));
                break;
              default:
                g !== E && rl(
                  l,
                  t,
                  h,
                  g,
                  a,
                  E
                );
            }
        }
        ni(
          l,
          i,
          c,
          s,
          y,
          T,
          n,
          u
        );
        return;
      case "select":
        g = i = c = h = null;
        for (n in e)
          if (s = e[n], e.hasOwnProperty(n) && s != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = s;
              default:
                a.hasOwnProperty(n) || rl(
                  l,
                  t,
                  n,
                  null,
                  a,
                  s
                );
            }
        for (u in a)
          if (n = a[u], s = e[u], a.hasOwnProperty(u) && (n != null || s != null))
            switch (u) {
              case "value":
                h = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== s && rl(
                  l,
                  t,
                  u,
                  n,
                  a,
                  s
                );
            }
        t = c, e = i, a = g, h != null ? $e(l, !!e, h, !1) : !!a != !!e && (t != null ? $e(l, !!e, t, !0) : $e(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        g = h = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                rl(l, t, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                h = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== n && rl(l, t, i, u, a, n);
            }
        Qf(l, h, g);
        return;
      case "option":
        for (var w in e)
          if (h = e[w], e.hasOwnProperty(w) && h != null && !a.hasOwnProperty(w))
            switch (w) {
              case "selected":
                l.selected = !1;
                break;
              default:
                rl(
                  l,
                  t,
                  w,
                  null,
                  a,
                  h
                );
            }
        for (s in a)
          if (h = a[s], g = e[s], a.hasOwnProperty(s) && h !== g && (h != null || g != null))
            switch (s) {
              case "selected":
                l.selected = h && typeof h != "function" && typeof h != "symbol";
                break;
              default:
                rl(
                  l,
                  t,
                  s,
                  h,
                  a,
                  g
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
        for (var Z in e)
          h = e[Z], e.hasOwnProperty(Z) && h != null && !a.hasOwnProperty(Z) && rl(l, t, Z, null, a, h);
        for (y in a)
          if (h = a[y], g = e[y], a.hasOwnProperty(y) && h !== g && (h != null || g != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null)
                  throw Error(o(137, t));
                break;
              default:
                rl(
                  l,
                  t,
                  y,
                  h,
                  a,
                  g
                );
            }
        return;
      default:
        if (ci(t)) {
          for (var dl in e)
            h = e[dl], e.hasOwnProperty(dl) && h !== void 0 && !a.hasOwnProperty(dl) && Lc(
              l,
              t,
              dl,
              void 0,
              a,
              h
            );
          for (T in a)
            h = a[T], g = e[T], !a.hasOwnProperty(T) || h === g || h === void 0 && g === void 0 || Lc(
              l,
              t,
              T,
              h,
              a,
              g
            );
          return;
        }
    }
    for (var m in e)
      h = e[m], e.hasOwnProperty(m) && h != null && !a.hasOwnProperty(m) && rl(l, t, m, null, a, h);
    for (E in a)
      h = a[E], g = e[E], !a.hasOwnProperty(E) || h === g || h == null && g == null || rl(l, t, E, h, a, g);
  }
  var Kc = null, Jc = null;
  function qn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Vr(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wr(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function kc(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Wc = null;
  function Yv() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Wc ? !1 : (Wc = l, !0) : (Wc = null, !1);
  }
  var Lr = typeof setTimeout == "function" ? setTimeout : void 0, Gv = typeof clearTimeout == "function" ? clearTimeout : void 0, Kr = typeof Promise == "function" ? Promise : void 0, Cv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Kr < "u" ? function(l) {
    return Kr.resolve(null).then(l).catch(Xv);
  } : Lr;
  function Xv(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ge(l) {
    return l === "head";
  }
  function Jr(l, t) {
    var e = t, a = 0, u = 0;
    do {
      var n = e.nextSibling;
      if (l.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$") {
          if (0 < a && 8 > a) {
            e = a;
            var i = l.ownerDocument;
            if (e & 1 && pu(i.documentElement), e & 2 && pu(i.body), e & 4)
              for (e = i.head, pu(e), i = e.firstChild; i; ) {
                var c = i.nextSibling, s = i.nodeName;
                i[Ba] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && i.rel.toLowerCase() === "stylesheet" || e.removeChild(i), i = c;
              }
          }
          if (u === 0) {
            l.removeChild(n), xu(t);
            return;
          }
          u--;
        } else
          e === "$" || e === "$?" || e === "$!" ? u++ : a = e.charCodeAt(0) - 48;
      else a = 0;
      e = n;
    } while (e);
    xu(t);
  }
  function $c(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          $c(e), ti(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Qv(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[Ba])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = Mt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function jv(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Mt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Fc(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
  }
  function Zv(l, t) {
    var e = l.ownerDocument;
    if (l.data !== "$?" || e.readyState === "complete")
      t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function Mt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
          break;
        if (t === "/$") return null;
      }
    }
    return l;
  }
  var Ic = null;
  function kr(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?") {
          if (t === 0) return l;
          t--;
        } else e === "/$" && t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Wr(l, t, e) {
    switch (t = qn(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(o(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(o(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(o(454));
        return l;
      default:
        throw Error(o(451));
    }
  }
  function pu(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    ti(l);
  }
  var Tt = /* @__PURE__ */ new Map(), $r = /* @__PURE__ */ new Set();
  function Bn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var kt = U.d;
  U.d = {
    f: Vv,
    r: wv,
    D: Lv,
    C: Kv,
    L: Jv,
    m: kv,
    X: $v,
    S: Wv,
    M: Fv
  };
  function Vv() {
    var l = kt.f(), t = On();
    return l || t;
  }
  function wv(l) {
    var t = Ke(l);
    t !== null && t.tag === 5 && t.type === "form" ? hs(t) : kt.r(l);
  }
  var Oa = typeof document > "u" ? null : document;
  function Fr(l, t, e) {
    var a = Oa;
    if (a && typeof t == "string" && t) {
      var u = vt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), $r.has(u) || ($r.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), Vl(t, "link", l), Gl(t), a.head.appendChild(t)));
    }
  }
  function Lv(l) {
    kt.D(l), Fr("dns-prefetch", l, null);
  }
  function Kv(l, t) {
    kt.C(l, t), Fr("preconnect", l, t);
  }
  function Jv(l, t, e) {
    kt.L(l, t, e);
    var a = Oa;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + vt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + vt(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + vt(
        e.imageSizes
      ) + '"]')) : u += '[href="' + vt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = _a(l);
          break;
        case "script":
          n = xa(l);
      }
      Tt.has(n) || (l = N(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Tt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(Tu(n)) || t === "script" && a.querySelector(Au(n)) || (t = a.createElement("link"), Vl(t, "link", l), Gl(t), a.head.appendChild(t)));
    }
  }
  function kv(l, t) {
    kt.m(l, t);
    var e = Oa;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + vt(a) + '"][href="' + vt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = xa(l);
      }
      if (!Tt.has(n) && (l = N({ rel: "modulepreload", href: l }, t), Tt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Au(n)))
              return;
        }
        a = e.createElement("link"), Vl(a, "link", l), Gl(a), e.head.appendChild(a);
      }
    }
  }
  function Wv(l, t, e) {
    kt.S(l, t, e);
    var a = Oa;
    if (a && l) {
      var u = Je(a).hoistableStyles, n = _a(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Tu(n)
        ))
          c.loading = 5;
        else {
          l = N(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Tt.get(n)) && Pc(l, e);
          var s = i = a.createElement("link");
          Gl(s), Vl(s, "link", l), s._p = new Promise(function(y, T) {
            s.onload = y, s.onerror = T;
          }), s.addEventListener("load", function() {
            c.loading |= 1;
          }), s.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Yn(i, t, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, u.set(n, i);
      }
    }
  }
  function $v(l, t) {
    kt.X(l, t);
    var e = Oa;
    if (e && l) {
      var a = Je(e).hoistableScripts, u = xa(l), n = a.get(u);
      n || (n = e.querySelector(Au(u)), n || (l = N({ src: l, async: !0 }, t), (t = Tt.get(u)) && lf(l, t), n = e.createElement("script"), Gl(n), Vl(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Fv(l, t) {
    kt.M(l, t);
    var e = Oa;
    if (e && l) {
      var a = Je(e).hoistableScripts, u = xa(l), n = a.get(u);
      n || (n = e.querySelector(Au(u)), n || (l = N({ src: l, async: !0, type: "module" }, t), (t = Tt.get(u)) && lf(l, t), n = e.createElement("script"), Gl(n), Vl(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Ir(l, t, e, a) {
    var u = (u = L.current) ? Bn(u) : null;
    if (!u) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = _a(e.href), e = Je(
          u
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = _a(e.href);
          var n = Je(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            Tu(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Tt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Tt.set(l, e), n || Iv(
            u,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(o(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = xa(e), e = Je(
          u
        ).hoistableScripts, a = e.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, l));
    }
  }
  function _a(l) {
    return 'href="' + vt(l) + '"';
  }
  function Tu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Pr(l) {
    return N({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Iv(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Vl(t, "link", e), Gl(t), l.head.appendChild(t));
  }
  function xa(l) {
    return '[src="' + vt(l) + '"]';
  }
  function Au(l) {
    return "script[async]" + l;
  }
  function ld(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + vt(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Gl(a), a;
          var u = N({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Gl(a), Vl(a, "style", u), Yn(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = _a(e.href);
          var n = l.querySelector(
            Tu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Gl(n), n;
          a = Pr(e), (u = Tt.get(u)) && Pc(a, u), n = (l.ownerDocument || l).createElement("link"), Gl(n);
          var i = n;
          return i._p = new Promise(function(c, s) {
            i.onload = c, i.onerror = s;
          }), Vl(n, "link", a), t.state.loading |= 4, Yn(n, e.precedence, l), t.instance = n;
        case "script":
          return n = xa(e.src), (u = l.querySelector(
            Au(n)
          )) ? (t.instance = u, Gl(u), u) : (a = e, (u = Tt.get(n)) && (a = N({}, e), lf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Gl(u), Vl(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Yn(a, e.precedence, l));
    return t.instance;
  }
  function Yn(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Pc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function lf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Gn = null;
  function td(l, t, e) {
    if (Gn === null) {
      var a = /* @__PURE__ */ new Map(), u = Gn = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = Gn, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Ba] || n[wl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function ed(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Pv(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
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
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function ad(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  var Eu = null;
  function l0() {
  }
  function t0(l, t, e) {
    if (Eu === null) throw Error(o(475));
    var a = Eu;
    if (t.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (t.state.loading & 4) === 0) {
      if (t.instance === null) {
        var u = _a(e.href), n = l.querySelector(
          Tu(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (a.count++, a = Cn.bind(a), l.then(a, a)), t.state.loading |= 4, t.instance = n, Gl(n);
          return;
        }
        n = l.ownerDocument || l, e = Pr(e), (u = Tt.get(u)) && Pc(e, u), n = n.createElement("link"), Gl(n);
        var i = n;
        i._p = new Promise(function(c, s) {
          i.onload = c, i.onerror = s;
        }), Vl(n, "link", e), t.instance = n;
      }
      a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(t, l), (l = t.state.preload) && (t.state.loading & 3) === 0 && (a.count++, t = Cn.bind(a), l.addEventListener("load", t), l.addEventListener("error", t));
    }
  }
  function e0() {
    if (Eu === null) throw Error(o(475));
    var l = Eu;
    return l.stylesheets && l.count === 0 && tf(l, l.stylesheets), 0 < l.count ? function(t) {
      var e = setTimeout(function() {
        if (l.stylesheets && tf(l, l.stylesheets), l.unsuspend) {
          var a = l.unsuspend;
          l.unsuspend = null, a();
        }
      }, 6e4);
      return l.unsuspend = t, function() {
        l.unsuspend = null, clearTimeout(e);
      };
    } : null;
  }
  function Cn() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) tf(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Xn = null;
  function tf(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Xn = /* @__PURE__ */ new Map(), t.forEach(a0, l), Xn = null, Cn.call(l));
  }
  function a0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Xn.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Xn.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = Cn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var zu = {
    $$typeof: Al,
    Provider: null,
    Consumer: null,
    _currentValue: _,
    _currentValue2: _,
    _threadCount: 0
  };
  function u0(l, t, e, a, u, n, i, c) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fn(0), this.hiddenUpdates = Fn(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ud(l, t, e, a, u, n, i, c, s, y, T, E) {
    return l = new u0(
      l,
      t,
      e,
      i,
      c,
      s,
      y,
      E
    ), t = 1, n === !0 && (t |= 24), n = it(3, null, null, t), l.current = n, n.stateNode = l, t = Yi(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Qi(n), l;
  }
  function nd(l) {
    return l ? (l = na, l) : na;
  }
  function id(l, t, e, a, u, n) {
    u = nd(u), a.context === null ? a.context = u : a.pendingContext = u, a = ue(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = ne(l, a, t), e !== null && (rt(e, l, t), lu(e, l, t));
  }
  function cd(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function ef(l, t) {
    cd(l, t), (l = l.alternate) && cd(l, t);
  }
  function fd(l) {
    if (l.tag === 13) {
      var t = ua(l, 67108864);
      t !== null && rt(t, l, 67108864), ef(l, 67108864);
    }
  }
  var Qn = !0;
  function n0(l, t, e, a) {
    var u = p.T;
    p.T = null;
    var n = U.p;
    try {
      U.p = 2, af(l, t, e, a);
    } finally {
      U.p = n, p.T = u;
    }
  }
  function i0(l, t, e, a) {
    var u = p.T;
    p.T = null;
    var n = U.p;
    try {
      U.p = 8, af(l, t, e, a);
    } finally {
      U.p = n, p.T = u;
    }
  }
  function af(l, t, e, a) {
    if (Qn) {
      var u = uf(a);
      if (u === null)
        wc(
          l,
          t,
          a,
          jn,
          e
        ), sd(l, a);
      else if (f0(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (sd(l, a), t & 4 && -1 < c0.indexOf(l)) {
        for (; u !== null; ) {
          var n = Ke(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = ze(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var s = 1 << 31 - ut(i);
                      c.entanglements[1] |= s, i &= ~s;
                    }
                    Nt(n), (fl & 6) === 0 && (zn = _t() + 500, gu(0));
                  }
                }
                break;
              case 13:
                c = ua(n, 2), c !== null && rt(c, n, 2), On(), ef(n, 2);
            }
          if (n = uf(a), n === null && wc(
            l,
            t,
            a,
            jn,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        wc(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function uf(l) {
    return l = oi(l), nf(l);
  }
  var jn = null;
  function nf(l) {
    if (jn = null, l = Le(l), l !== null) {
      var t = R(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = q(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return jn = l, null;
  }
  function od(l) {
    switch (l) {
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
        switch (Kd()) {
          case Af:
            return 2;
          case Ef:
            return 8;
          case Nu:
          case Jd:
            return 32;
          case zf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var cf = !1, be = null, Se = null, pe = null, Mu = /* @__PURE__ */ new Map(), Ou = /* @__PURE__ */ new Map(), Te = [], c0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function sd(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        be = null;
        break;
      case "dragenter":
      case "dragleave":
        Se = null;
        break;
      case "mouseover":
      case "mouseout":
        pe = null;
        break;
      case "pointerover":
      case "pointerout":
        Mu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ou.delete(t.pointerId);
    }
  }
  function _u(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = Ke(t), t !== null && fd(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function f0(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return be = _u(
          be,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Se = _u(
          Se,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return pe = _u(
          pe,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return Mu.set(
          n,
          _u(
            Mu.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, Ou.set(
          n,
          _u(
            Ou.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function rd(l) {
    var t = Le(l.target);
    if (t !== null) {
      var e = R(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = q(e), t !== null) {
            l.blockedOn = t, tm(l.priority, function() {
              if (e.tag === 13) {
                var a = st();
                a = In(a);
                var u = ua(e, a);
                u !== null && rt(u, e, a), ef(e, a);
              }
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Zn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = uf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        fi = a, e.target.dispatchEvent(a), fi = null;
      } else
        return t = Ke(e), t !== null && fd(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function dd(l, t, e) {
    Zn(l) && e.delete(t);
  }
  function o0() {
    cf = !1, be !== null && Zn(be) && (be = null), Se !== null && Zn(Se) && (Se = null), pe !== null && Zn(pe) && (pe = null), Mu.forEach(dd), Ou.forEach(dd);
  }
  function Vn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, cf || (cf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      o0
    )));
  }
  var wn = null;
  function md(l) {
    wn !== l && (wn = l, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        wn === l && (wn = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (nf(a || e) === null)
              continue;
            break;
          }
          var n = Ke(e);
          n !== null && (l.splice(t, 3), t -= 3, nc(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function xu(l) {
    function t(s) {
      return Vn(s, l);
    }
    be !== null && Vn(be, l), Se !== null && Vn(Se, l), pe !== null && Vn(pe, l), Mu.forEach(t), Ou.forEach(t);
    for (var e = 0; e < Te.length; e++) {
      var a = Te[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Te.length && (e = Te[0], e.blockedOn === null); )
      rd(e), e.blockedOn === null && Te.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[Fl] || null;
        if (typeof n == "function")
          i || md(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[Fl] || null)
              c = i.formAction;
            else if (nf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), md(e);
        }
      }
  }
  function ff(l) {
    this._internalRoot = l;
  }
  Ln.prototype.render = ff.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = st();
    id(e, a, l, t, null, null);
  }, Ln.prototype.unmount = ff.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      id(l.current, 2, null, l, null, null), On(), t[we] = null;
    }
  };
  function Ln(l) {
    this._internalRoot = l;
  }
  Ln.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Df();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Te.length && t !== 0 && t < Te[e].priority; e++) ;
      Te.splice(e, 0, l), e === 0 && rd(l);
    }
  };
  var vd = z.version;
  if (vd !== "19.1.0")
    throw Error(
      o(
        527,
        vd,
        "19.1.0"
      )
    );
  U.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = x(t), l = l !== null ? b(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var s0 = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: p,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Kn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Kn.isDisabled && Kn.supportsFiber)
      try {
        Na = Kn.inject(
          s0
        ), at = Kn;
      } catch {
      }
  }
  return Ru.createRoot = function(l, t) {
    if (!O(l)) throw Error(o(299));
    var e = !1, a = "", u = Rs, n = Us, i = Ns, c = null;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (c = t.unstable_transitionCallbacks)), t = ud(
      l,
      1,
      !1,
      null,
      null,
      e,
      a,
      u,
      n,
      i,
      c,
      null
    ), l[we] = t.current, Vc(l), new ff(t);
  }, Ru.hydrateRoot = function(l, t, e) {
    if (!O(l)) throw Error(o(299));
    var a = !1, u = "", n = Rs, i = Us, c = Ns, s = null, y = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (s = e.unstable_transitionCallbacks), e.formState !== void 0 && (y = e.formState)), t = ud(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      u,
      n,
      i,
      c,
      s,
      y
    ), t.context = nd(null), e = t.current, a = st(), a = In(a), u = ue(a), u.callback = null, ne(e, u, a), e = a, t.current.lanes = e, qa(t, e), Nt(t), l[we] = t.current, Vc(l), new Ln(t);
  }, Ru.version = "19.1.0", Ru;
}
var zd;
function p0() {
  if (zd) return rf.exports;
  zd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (z) {
        console.error(z);
      }
  }
  return f(), rf.exports = S0(), rf.exports;
}
var T0 = p0();
function Md(f, z) {
  if (typeof f == "function")
    return f(z);
  f != null && (f.current = z);
}
function A0(...f) {
  return (z) => {
    let S = !1;
    const o = f.map((O) => {
      const R = Md(O, z);
      return !S && typeof R == "function" && (S = !0), R;
    });
    if (S)
      return () => {
        for (let O = 0; O < o.length; O++) {
          const R = o[O];
          typeof R == "function" ? R() : Md(f[O], null);
        }
      };
  };
}
// @__NO_SIDE_EFFECTS__
function E0(f) {
  const z = /* @__PURE__ */ M0(f), S = Wl.forwardRef((o, O) => {
    const { children: R, ...q } = o, j = Wl.Children.toArray(R), x = j.find(_0);
    if (x) {
      const b = x.props.children, N = j.map((K) => K === x ? Wl.Children.count(b) > 1 ? Wl.Children.only(null) : Wl.isValidElement(b) ? b.props.children : null : K);
      return /* @__PURE__ */ Ve.jsx(z, { ...q, ref: O, children: Wl.isValidElement(b) ? Wl.cloneElement(b, void 0, N) : null });
    }
    return /* @__PURE__ */ Ve.jsx(z, { ...q, ref: O, children: R });
  });
  return S.displayName = `${f}.Slot`, S;
}
var z0 = /* @__PURE__ */ E0("Slot");
// @__NO_SIDE_EFFECTS__
function M0(f) {
  const z = Wl.forwardRef((S, o) => {
    const { children: O, ...R } = S;
    if (Wl.isValidElement(O)) {
      const q = D0(O), j = x0(R, O.props);
      return O.type !== Wl.Fragment && (j.ref = o ? A0(o, q) : q), Wl.cloneElement(O, j);
    }
    return Wl.Children.count(O) > 1 ? Wl.Children.only(null) : null;
  });
  return z.displayName = `${f}.SlotClone`, z;
}
var O0 = Symbol("radix.slottable");
function _0(f) {
  return Wl.isValidElement(f) && typeof f.type == "function" && "__radixId" in f.type && f.type.__radixId === O0;
}
function x0(f, z) {
  const S = { ...z };
  for (const o in z) {
    const O = f[o], R = z[o];
    /^on[A-Z]/.test(o) ? O && R ? S[o] = (...j) => {
      const x = R(...j);
      return O(...j), x;
    } : O && (S[o] = O) : o === "style" ? S[o] = { ...O, ...R } : o === "className" && (S[o] = [O, R].filter(Boolean).join(" "));
  }
  return { ...f, ...S };
}
function D0(f) {
  var o, O;
  let z = (o = Object.getOwnPropertyDescriptor(f.props, "ref")) == null ? void 0 : o.get, S = z && "isReactWarning" in z && z.isReactWarning;
  return S ? f.ref : (z = (O = Object.getOwnPropertyDescriptor(f, "ref")) == null ? void 0 : O.get, S = z && "isReactWarning" in z && z.isReactWarning, S ? f.props.ref : f.props.ref || f.ref);
}
function Nd(f) {
  var z, S, o = "";
  if (typeof f == "string" || typeof f == "number") o += f;
  else if (typeof f == "object") if (Array.isArray(f)) {
    var O = f.length;
    for (z = 0; z < O; z++) f[z] && (S = Nd(f[z])) && (o && (o += " "), o += S);
  } else for (S in f) f[S] && (o && (o += " "), o += S);
  return o;
}
function Hd() {
  for (var f, z, S = 0, o = "", O = arguments.length; S < O; S++) (f = arguments[S]) && (z = Nd(f)) && (o && (o += " "), o += z);
  return o;
}
const Od = (f) => typeof f == "boolean" ? `${f}` : f === 0 ? "0" : f, _d = Hd, R0 = (f, z) => (S) => {
  var o;
  if ((z == null ? void 0 : z.variants) == null) return _d(f, S == null ? void 0 : S.class, S == null ? void 0 : S.className);
  const { variants: O, defaultVariants: R } = z, q = Object.keys(O).map((b) => {
    const N = S == null ? void 0 : S[b], K = R == null ? void 0 : R[b];
    if (N === null) return null;
    const k = Od(N) || Od(K);
    return O[b][k];
  }), j = S && Object.entries(S).reduce((b, N) => {
    let [K, k] = N;
    return k === void 0 || (b[K] = k), b;
  }, {}), x = z == null || (o = z.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((b, N) => {
    let { class: K, className: k, ...Sl } = N;
    return Object.entries(Sl).every((il) => {
      let [yl, gl] = il;
      return Array.isArray(gl) ? gl.includes({
        ...R,
        ...j
      }[yl]) : {
        ...R,
        ...j
      }[yl] === gl;
    }) ? [
      ...b,
      K,
      k
    ] : b;
  }, []);
  return _d(f, q, x, S == null ? void 0 : S.class, S == null ? void 0 : S.className);
}, Tf = "-", U0 = (f) => {
  const z = H0(f), {
    conflictingClassGroups: S,
    conflictingClassGroupModifiers: o
  } = f;
  return {
    getClassGroupId: (q) => {
      const j = q.split(Tf);
      return j[0] === "" && j.length !== 1 && j.shift(), qd(j, z) || N0(q);
    },
    getConflictingClassGroupIds: (q, j) => {
      const x = S[q] || [];
      return j && o[q] ? [...x, ...o[q]] : x;
    }
  };
}, qd = (f, z) => {
  var q;
  if (f.length === 0)
    return z.classGroupId;
  const S = f[0], o = z.nextPart.get(S), O = o ? qd(f.slice(1), o) : void 0;
  if (O)
    return O;
  if (z.validators.length === 0)
    return;
  const R = f.join(Tf);
  return (q = z.validators.find(({
    validator: j
  }) => j(R))) == null ? void 0 : q.classGroupId;
}, xd = /^\[(.+)\]$/, N0 = (f) => {
  if (xd.test(f)) {
    const z = xd.exec(f)[1], S = z == null ? void 0 : z.substring(0, z.indexOf(":"));
    if (S)
      return "arbitrary.." + S;
  }
}, H0 = (f) => {
  const {
    theme: z,
    classGroups: S
  } = f, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const O in S)
    gf(S[O], o, O, z);
  return o;
}, gf = (f, z, S, o) => {
  f.forEach((O) => {
    if (typeof O == "string") {
      const R = O === "" ? z : Dd(z, O);
      R.classGroupId = S;
      return;
    }
    if (typeof O == "function") {
      if (q0(O)) {
        gf(O(o), z, S, o);
        return;
      }
      z.validators.push({
        validator: O,
        classGroupId: S
      });
      return;
    }
    Object.entries(O).forEach(([R, q]) => {
      gf(q, Dd(z, R), S, o);
    });
  });
}, Dd = (f, z) => {
  let S = f;
  return z.split(Tf).forEach((o) => {
    S.nextPart.has(o) || S.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), S = S.nextPart.get(o);
  }), S;
}, q0 = (f) => f.isThemeGetter, B0 = (f) => {
  if (f < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let z = 0, S = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const O = (R, q) => {
    S.set(R, q), z++, z > f && (z = 0, o = S, S = /* @__PURE__ */ new Map());
  };
  return {
    get(R) {
      let q = S.get(R);
      if (q !== void 0)
        return q;
      if ((q = o.get(R)) !== void 0)
        return O(R, q), q;
    },
    set(R, q) {
      S.has(R) ? S.set(R, q) : O(R, q);
    }
  };
}, bf = "!", Sf = ":", Y0 = Sf.length, G0 = (f) => {
  const {
    prefix: z,
    experimentalParseClassName: S
  } = f;
  let o = (O) => {
    const R = [];
    let q = 0, j = 0, x = 0, b;
    for (let il = 0; il < O.length; il++) {
      let yl = O[il];
      if (q === 0 && j === 0) {
        if (yl === Sf) {
          R.push(O.slice(x, il)), x = il + Y0;
          continue;
        }
        if (yl === "/") {
          b = il;
          continue;
        }
      }
      yl === "[" ? q++ : yl === "]" ? q-- : yl === "(" ? j++ : yl === ")" && j--;
    }
    const N = R.length === 0 ? O : O.substring(x), K = C0(N), k = K !== N, Sl = b && b > x ? b - x : void 0;
    return {
      modifiers: R,
      hasImportantModifier: k,
      baseClassName: K,
      maybePostfixModifierPosition: Sl
    };
  };
  if (z) {
    const O = z + Sf, R = o;
    o = (q) => q.startsWith(O) ? R(q.substring(O.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: q,
      maybePostfixModifierPosition: void 0
    };
  }
  if (S) {
    const O = o;
    o = (R) => S({
      className: R,
      parseClassName: O
    });
  }
  return o;
}, C0 = (f) => f.endsWith(bf) ? f.substring(0, f.length - 1) : f.startsWith(bf) ? f.substring(1) : f, X0 = (f) => {
  const z = Object.fromEntries(f.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const O = [];
    let R = [];
    return o.forEach((q) => {
      q[0] === "[" || z[q] ? (O.push(...R.sort(), q), R = []) : R.push(q);
    }), O.push(...R.sort()), O;
  };
}, Q0 = (f) => ({
  cache: B0(f.cacheSize),
  parseClassName: G0(f),
  sortModifiers: X0(f),
  ...U0(f)
}), j0 = /\s+/, Z0 = (f, z) => {
  const {
    parseClassName: S,
    getClassGroupId: o,
    getConflictingClassGroupIds: O,
    sortModifiers: R
  } = z, q = [], j = f.trim().split(j0);
  let x = "";
  for (let b = j.length - 1; b >= 0; b -= 1) {
    const N = j[b], {
      isExternal: K,
      modifiers: k,
      hasImportantModifier: Sl,
      baseClassName: il,
      maybePostfixModifierPosition: yl
    } = S(N);
    if (K) {
      x = N + (x.length > 0 ? " " + x : x);
      continue;
    }
    let gl = !!yl, Jl = o(gl ? il.substring(0, yl) : il);
    if (!Jl) {
      if (!gl) {
        x = N + (x.length > 0 ? " " + x : x);
        continue;
      }
      if (Jl = o(il), !Jl) {
        x = N + (x.length > 0 ? " " + x : x);
        continue;
      }
      gl = !1;
    }
    const $l = R(k).join(":"), Al = Sl ? $l + bf : $l, Yl = Al + Jl;
    if (q.includes(Yl))
      continue;
    q.push(Yl);
    const W = O(Jl, gl);
    for (let Ml = 0; Ml < W.length; ++Ml) {
      const Nl = W[Ml];
      q.push(Al + Nl);
    }
    x = N + (x.length > 0 ? " " + x : x);
  }
  return x;
};
function V0() {
  let f = 0, z, S, o = "";
  for (; f < arguments.length; )
    (z = arguments[f++]) && (S = Bd(z)) && (o && (o += " "), o += S);
  return o;
}
const Bd = (f) => {
  if (typeof f == "string")
    return f;
  let z, S = "";
  for (let o = 0; o < f.length; o++)
    f[o] && (z = Bd(f[o])) && (S && (S += " "), S += z);
  return S;
};
function w0(f, ...z) {
  let S, o, O, R = q;
  function q(x) {
    const b = z.reduce((N, K) => K(N), f());
    return S = Q0(b), o = S.cache.get, O = S.cache.set, R = j, j(x);
  }
  function j(x) {
    const b = o(x);
    if (b)
      return b;
    const N = Z0(x, S);
    return O(x, N), N;
  }
  return function() {
    return R(V0.apply(null, arguments));
  };
}
const Bl = (f) => {
  const z = (S) => S[f] || [];
  return z.isThemeGetter = !0, z;
}, Yd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Gd = /^\((?:(\w[\w-]*):)?(.+)\)$/i, L0 = /^\d+\/\d+$/, K0 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, J0 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, k0 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, W0 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, $0 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Da = (f) => L0.test(f), F = (f) => !!f && !Number.isNaN(Number(f)), Ee = (f) => !!f && Number.isInteger(Number(f)), yf = (f) => f.endsWith("%") && F(f.slice(0, -1)), Wt = (f) => K0.test(f), F0 = () => !0, I0 = (f) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  J0.test(f) && !k0.test(f)
), Cd = () => !1, P0 = (f) => W0.test(f), ly = (f) => $0.test(f), ty = (f) => !G(f) && !C(f), ey = (f) => Ra(f, jd, Cd), G = (f) => Yd.test(f), Ze = (f) => Ra(f, Zd, I0), hf = (f) => Ra(f, cy, F), Rd = (f) => Ra(f, Xd, Cd), ay = (f) => Ra(f, Qd, ly), Jn = (f) => Ra(f, Vd, P0), C = (f) => Gd.test(f), Uu = (f) => Ua(f, Zd), uy = (f) => Ua(f, fy), Ud = (f) => Ua(f, Xd), ny = (f) => Ua(f, jd), iy = (f) => Ua(f, Qd), kn = (f) => Ua(f, Vd, !0), Ra = (f, z, S) => {
  const o = Yd.exec(f);
  return o ? o[1] ? z(o[1]) : S(o[2]) : !1;
}, Ua = (f, z, S = !1) => {
  const o = Gd.exec(f);
  return o ? o[1] ? z(o[1]) : S : !1;
}, Xd = (f) => f === "position" || f === "percentage", Qd = (f) => f === "image" || f === "url", jd = (f) => f === "length" || f === "size" || f === "bg-size", Zd = (f) => f === "length", cy = (f) => f === "number", fy = (f) => f === "family-name", Vd = (f) => f === "shadow", oy = () => {
  const f = Bl("color"), z = Bl("font"), S = Bl("text"), o = Bl("font-weight"), O = Bl("tracking"), R = Bl("leading"), q = Bl("breakpoint"), j = Bl("container"), x = Bl("spacing"), b = Bl("radius"), N = Bl("shadow"), K = Bl("inset-shadow"), k = Bl("text-shadow"), Sl = Bl("drop-shadow"), il = Bl("blur"), yl = Bl("perspective"), gl = Bl("aspect"), Jl = Bl("ease"), $l = Bl("animate"), Al = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Yl = () => [
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
  ], W = () => [...Yl(), C, G], Ml = () => ["auto", "hidden", "clip", "visible", "scroll"], Nl = () => ["auto", "contain", "none"], Q = () => [C, G, x], Dl = () => [Da, "full", "auto", ...Q()], Ht = () => [Ee, "none", "subgrid", C, G], dt = () => ["auto", {
    span: ["full", Ee, C, G]
  }, Ee, C, G], Ol = () => [Ee, "auto", C, G], Ot = () => ["auto", "min", "max", "fr", C, G], At = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], pl = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], p = () => ["auto", ...Q()], U = () => [Da, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...Q()], _ = () => [f, C, G], cl = () => [...Yl(), Ud, Rd, {
    position: [C, G]
  }], r = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], M = () => ["auto", "cover", "contain", ny, ey, {
    size: [C, G]
  }], H = () => [yf, Uu, Ze], D = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    b,
    C,
    G
  ], B = () => ["", F, Uu, Ze], P = () => ["solid", "dashed", "dotted", "double"], L = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], al = () => [F, yf, Ud, Rd], ml = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    il,
    C,
    G
  ], et = () => ["none", F, C, G], $t = () => ["none", F, C, G], Ft = () => [F, C, G], It = () => [Da, "full", ...Q()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Wt],
      breakpoint: [Wt],
      color: [F0],
      container: [Wt],
      "drop-shadow": [Wt],
      ease: ["in", "out", "in-out"],
      font: [ty],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Wt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Wt],
      shadow: [Wt],
      spacing: ["px", F],
      text: [Wt],
      "text-shadow": [Wt],
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
        aspect: ["auto", "square", Da, G, C, gl]
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
        columns: [F, G, C, j]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Al()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Al()
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
        object: W()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Ml()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Ml()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Ml()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Nl()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Nl()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Nl()
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
        inset: Dl()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": Dl()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": Dl()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: Dl()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: Dl()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: Dl()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: Dl()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: Dl()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: Dl()
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
        z: [Ee, "auto", C, G]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Da, "full", "auto", j, ...Q()]
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
        flex: [F, Da, "auto", "initial", "none", G]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", F, C, G]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", F, C, G]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ee, "first", "last", "none", C, G]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": Ht()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: dt()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Ol()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Ol()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": Ht()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: dt()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Ol()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Ol()
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
        "auto-cols": Ot()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Ot()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: Q()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": Q()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": Q()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...At(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...pl(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...pl()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...At()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...pl(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...pl(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": At()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...pl(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...pl()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: Q()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: Q()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: Q()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: Q()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: Q()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: Q()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: Q()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: Q()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: Q()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: p()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: p()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: p()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: p()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: p()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: p()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: p()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: p()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: p()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": Q()
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
        "space-y": Q()
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
        size: U()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [j, "screen", ...U()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          j,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...U()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          j,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [q]
          },
          ...U()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...U()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...U()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...U()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", S, Uu, Ze]
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
        font: [o, C, hf]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", yf, G]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [uy, G, z]
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
        tracking: [O, C, G]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [F, "none", C, hf]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          R,
          ...Q()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", C, G]
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
        list: ["disc", "decimal", "none", C, G]
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
        placeholder: _()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: _()
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
        decoration: [...P(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [F, "from-font", "auto", C, Ze]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: _()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [F, "auto", C, G]
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
        indent: Q()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", C, G]
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
        content: ["none", C, G]
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
        bg: cl()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: r()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: M()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ee, C, G],
          radial: ["", C, G],
          conic: [Ee, C, G]
        }, iy, ay]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: _()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: H()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: H()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: H()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: _()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: _()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: _()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: D()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": D()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": D()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": D()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": D()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": D()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": D()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": D()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": D()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": D()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": D()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": D()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": D()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": D()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": D()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: B()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": B()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": B()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": B()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": B()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": B()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": B()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": B()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": B()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": B()
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
        "divide-y": B()
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
        border: [...P(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...P(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: _()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": _()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": _()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": _()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": _()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": _()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": _()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": _()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": _()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: _()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...P(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [F, C, G]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", F, Uu, Ze]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: _()
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
          N,
          kn,
          Jn
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: _()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", K, kn, Jn]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": _()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: B()
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
        ring: _()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [F, Ze]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": _()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": B()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": _()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", k, kn, Jn]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": _()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [F, C, G]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...L(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": L()
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
        "mask-linear": [F]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": al()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": al()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": _()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": _()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": al()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": al()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": _()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": _()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": al()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": al()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": _()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": _()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": al()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": al()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": _()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": _()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": al()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": al()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": _()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": _()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": al()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": al()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": _()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": _()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": al()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": al()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": _()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": _()
      }],
      "mask-image-radial": [{
        "mask-radial": [C, G]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": al()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": al()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": _()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": _()
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
        "mask-radial-at": Yl()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [F]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": al()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": al()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": _()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": _()
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
        mask: cl()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: r()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: M()
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
        mask: ["none", C, G]
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
          C,
          G
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ml()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [F, C, G]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [F, C, G]
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
          Sl,
          kn,
          Jn
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": _()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", F, C, G]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [F, C, G]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", F, C, G]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [F, C, G]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", F, C, G]
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
          C,
          G
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ml()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [F, C, G]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [F, C, G]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", F, C, G]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [F, C, G]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", F, C, G]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [F, C, G]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [F, C, G]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", F, C, G]
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
        "border-spacing": Q()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": Q()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": Q()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", C, G]
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
        duration: [F, "initial", C, G]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", Jl, C, G]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [F, C, G]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", $l, C, G]
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
        perspective: [yl, C, G]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": W()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: et()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": et()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": et()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": et()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: $t()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": $t()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": $t()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": $t()
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
        skew: Ft()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ft()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ft()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [C, G, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: W()
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
        translate: It()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": It()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": It()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": It()
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
        accent: _()
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
        caret: _()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", C, G]
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
        "scroll-m": Q()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": Q()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": Q()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": Q()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": Q()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": Q()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": Q()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": Q()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": Q()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": Q()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": Q()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": Q()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": Q()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": Q()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": Q()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": Q()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": Q()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": Q()
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
        "will-change": ["auto", "scroll", "contents", "transform", C, G]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ..._()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [F, Uu, Ze, hf]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ..._()]
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
}, sy = /* @__PURE__ */ w0(oy);
function ry(...f) {
  return sy(Hd(f));
}
const dy = R0(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function my({
  className: f,
  variant: z,
  size: S,
  asChild: o = !1,
  ...O
}) {
  const R = o ? z0 : "button";
  return /* @__PURE__ */ Ve.jsx(
    R,
    {
      "data-slot": "button",
      className: ry(dy({ variant: z, size: S, className: f })),
      ...O
    }
  );
}
function vy() {
  return /* @__PURE__ */ Ve.jsx("div", { className: "flex min-h-svh flex-col items-center justify-center", children: /* @__PURE__ */ Ve.jsx(my, { children: "Click me" }) });
}
T0.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ Ve.jsx(Wl.StrictMode, { children: /* @__PURE__ */ Ve.jsx(vy, {}) })
);
