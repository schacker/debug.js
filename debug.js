// Generated by CoffeeScript 1.7.1
(function(WIN, DOC) {
  "use strict";
  var DANGER, Debug, ERROR, LOG, NULL, SUCCESS, UNDEFINED, WARN, dom, entry, exports, getBody, isArray, isObejct, noop, toString;
  UNDEFINED = void 0;
  NULL = null;
  LOG = "log";
  DANGER = "danger";
  WARN = "warn";
  SUCCESS = "success";
  ERROR = "error";
  noop = function() {};
  dom = DOC.querySelectorAll || DOC.getElementsByTagName;
  toString = {}.toString;
  isArray = Array.isArray || function(val) {
    return val.constructor === Array;
  };
  isObejct = function(obj) {
    return obj.constructor === Object;
  };
  getBody = function() {
    var _ref, _ref1;
    return DOC["body"] || ((_ref = dom("body")) != null ? _ref[0] : void 0) || ((_ref1 = dom("html")) != null ? _ref1[0] : void 0);
  };
  Debug = (function() {
    var childCss, colorMap, fn, joinCss, parentCss, render;

    colorMap = {
      log: "0074cc",
      danger: "da4f49",
      warn: "faa732",
      success: "5bb75b",
      error: "bd362f"
    };

    render = function(msg) {
      var arr, item, text, _i, _len;
      text = [];
      arr = [];
      if (isArray(msg)) {
        for (_i = 0, _len = msg.length; _i < _len; _i++) {
          item = msg[_i];
          arr.push("" + item);
        }
        text = "[" + arr.join(',') + "]";
      } else if (isObejct(msg)) {
        for (item in msg) {
          arr.push("" + item + ": " + msg[item]);
        }
        text = "{" + arr.join(',') + "}";
      } else {
        text = String(msg);
      }
      return text;
    };

    joinCss = function(css) {
      return css.join(";");
    };

    childCss = ["margin-top:-1px", "padding:.5em", "border-top:1px solid rgba(255,255,255,.3)", "margin:0"];

    parentCss = ["-webkit-overflow-scrolling:touch", "pointer-events:none", "overflow:auto", "line-height:1.5", "z-index:5000", "position:fixed", "left:0", "top:0", "max-width:50%", "max-width:100%", "font-size:11px", "background:rgba(0,0,0,.8)", "color:#fff", "width:100%"];

    function Debug() {
      var color, fn, isInit, msg, parent;
      isInit = false;
      msg = fn = color = "";
      parent = NULL;
    }

    Debug.prototype.init = function() {
      var body, el;
      el = this.el = DOC.createElement("div");
      el.setAttribute("style", joinCss(parentCss));
      body = getBody();
      body.appendChild(el);
      this.isInit = true;
      return this;
    };

    Debug.prototype.print = function() {
      var child, css;
      if (!this.isInit) {
        this.init();
      }
      css = childCss.concat(["color:#" + this.color]);
      child = DOC.createElement("p");
      child.setAttribute("style", joinCss(css));
      child.innerHTML = this.msg;
      this.el.appendChild(child);
      return this;
    };

    for (fn in colorMap) {
      Debug.prototype[fn] = (function(fn) {
        return function(msg) {
          this.fn = fn;
          this.msg = render(msg);
          this.color = colorMap[fn];
          return this.print();
        };
      })(fn);
    }

    return Debug;

  })();
  entry = new Debug();
  if (typeof exports !== "undefined" && module.exports) {
    return module.exports = exports = entry;
  } else if (typeof define === "function") {
    return define(function(require, exports, module) {
      return module.exports = exports = entry;
    });
  } else {
    return WIN["debug"] = entry;
  }
})(window, document);
