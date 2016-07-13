(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/var/www/site/js/entry-main.js":[function(require,module,exports){
"use strict";

var _redux = require("redux");

var _reduxDomBinding = require("./redux-dom-binding");

var _functionalUtils = require("functional-utils");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
    value: 1000,
    focused: false
};

var donationFormReducer = function donationFormReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case "DOM_FOCUS":
            {
                return (0, _functionalUtils.merge)(state, { focused: true });
            }
        case "DOM_BLUR":
            {
                return (0, _functionalUtils.merge)(state, { focused: false });
            }
        case "DOM_INPUT":
            {
                var number = Number(action.text);
                if (Number.isNaN(number)) {
                    return state;
                } else {
                    return (0, _functionalUtils.merge)(state, { value: number });
                }
            }
        default:
            return state;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    [].concat(_toConsumableArray(document.querySelectorAll(".common-donation"))).forEach(function (formDiv) {
        var form = formDiv.querySelector(".common-donation_form");

        var tips = formDiv.querySelector(".common-donation_tips");
        var input = formDiv.querySelector(".common-donation_amount");
        var button = formDiv.querySelector(".common-donation_donate-button");

        var sumInput = form.querySelector("input[name=sum]");

        // Configure rendering
        var store = (0, _redux.createStore)(donationFormReducer);
        var render = function render() {
            var _store$getState = store.getState();

            var value = _store$getState.value;
            var focused = _store$getState.focused;

            // Calculate derived values

            var a = 0.005; // coefficient for PC payment type
            var amountDue = value - value * (a / (1 + a));
            var fee = value - amountDue;

            // Update view
            input.value = value + (!focused ? " ₽" : "");
            button.disabled = !(value > 0);
            tips.innerText = "Будет переведено " + amountDue.toFixed(2) + " ₽ (комиссия " + fee.toFixed(2) + " ₽)";
            sumInput.value = value;
        };
        store.subscribe(render);
        render();

        // Bind some events to store dispatching
        (0, _reduxDomBinding.bindEvents)(input, ["input", "focus", "blur"], store);
    });

    [].concat(_toConsumableArray(document.querySelectorAll(".special-project_donate"))).forEach(function (form) {
        var input = form.querySelector(".special-project_donate-amount");
        var button = form.querySelector(".special-project_donate-button");

        var sumInput = form.querySelector("input[name=sum]");

        // Configure rendering
        var store = (0, _redux.createStore)(donationFormReducer);
        var render = function render() {
            var _store$getState2 = store.getState();

            var value = _store$getState2.value;
            var focused = _store$getState2.focused;

            // Update view

            input.value = value + (!focused ? " ₽" : "");
            button.disabled = !(value > 0);
            sumInput.value = value;
        };
        store.subscribe(render);
        render();

        // Bind some events to store dispatching
        (0, _reduxDomBinding.bindEvents)(input, ["input", "focus", "blur"], store);
    });
});

},{"./redux-dom-binding":"/var/www/site/js/redux-dom-binding.js","functional-utils":"functional-utils","redux":"redux"}],"/var/www/site/js/redux-dom-binding.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allEventTypes = ["input", "focus", "blur"]; //todo: add support for all other events

var allTranslations = {};
allEventTypes.forEach(function (eventType) {
    allTranslations[eventType] = function () {
        switch (eventType) {
            case "input":
                return function (e) {
                    return { type: "DOM_INPUT", text: e.target.value };
                };
            case "focus":
                return function (_e) {
                    return { type: "DOM_FOCUS" };
                };
            case "blur":
                return function (_e) {
                    return { type: "DOM_BLUR" };
                };
            default:
                throw new Error("Unsupported event: " + eventType);
        }
    }();
});

var allEventBinders = {};
allEventTypes.forEach(function (eventType) {
    var translation = allTranslations[eventType];
    allEventBinders[eventType] = function (element, store) {
        element.addEventListener(eventType, function (e) {
            store.dispatch(translation(e));
        });
    };
});

/**
 * Add event listeners for DOM elements, which translate DOM specified events to redux actions
 * @param {object|object[]} elements DOM targets to add event listeners, could be
 * a single DOM element, NodeList or an array
 * @param {string|string[]} events events to bind, could be a space-separated string or and array of strings
 * @param {object} store store for dispatch actions to
 * @returns {undefined}
 */
var bindEvents = exports.bindEvents = function bindEvents(elements, events, store) {
    var eventsArray = typeof events === "string" ? events.split(" ") : events; //todo: check for other types

    var elementsArray = "length" in elements ? [].concat(_toConsumableArray(elements)) : [elements];

    elementsArray.forEach(function (element) {
        eventsArray.forEach(function (eventType) {
            if (!(eventType in allEventBinders)) {
                throw new Error("Undefined event type: " + eventType);
            }
            var binder = allEventBinders[eventType];
            binder(element, store);
        });
    });
};

},{}]},{},["/var/www/site/js/entry-main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lbnRyeS1tYWluLmpzIiwianMvcmVkdXgtZG9tLWJpbmRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxlQUFlO0FBQ2pCLFdBQU8sSUFEVTtBQUVqQixhQUFTO0FBRlEsQ0FBckI7O0FBS0EsSUFBTSxzQkFBc0IsU0FBdEIsbUJBQXNCLEdBQWtDO0FBQUEsUUFBakMsS0FBaUMseURBQXpCLFlBQXlCO0FBQUEsUUFBWCxNQUFXOztBQUMxRCxZQUFRLE9BQU8sSUFBZjtBQUNJLGFBQUssV0FBTDtBQUFrQjtBQUNkLHVCQUFPLDRCQUFNLEtBQU4sRUFBYSxFQUFDLFNBQVMsSUFBVixFQUFiLENBQVA7QUFDSDtBQUNELGFBQUssVUFBTDtBQUFpQjtBQUNiLHVCQUFPLDRCQUFNLEtBQU4sRUFBYSxFQUFDLFNBQVMsS0FBVixFQUFiLENBQVA7QUFDSDtBQUNELGFBQUssV0FBTDtBQUFrQjtBQUNkLG9CQUFNLFNBQVMsT0FBTyxPQUFPLElBQWQsQ0FBZjtBQUNBLG9CQUFJLE9BQU8sS0FBUCxDQUFhLE1BQWIsQ0FBSixFQUEwQjtBQUN0QiwyQkFBTyxLQUFQO0FBQ0gsaUJBRkQsTUFHSztBQUNELDJCQUFPLDRCQUFNLEtBQU4sRUFBYSxFQUFDLE9BQU8sTUFBUixFQUFiLENBQVA7QUFDSDtBQUNKO0FBQ0Q7QUFBUyxtQkFBTyxLQUFQO0FBaEJiO0FBa0JILENBbkJEOztBQXFCQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hELGlDQUFJLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQUosR0FBbUQsT0FBbkQsQ0FBMkQsVUFBQyxPQUFELEVBQWE7QUFDcEUsWUFBTSxPQUFPLFFBQVEsYUFBUixDQUFzQix1QkFBdEIsQ0FBYjs7QUFFQSxZQUFNLE9BQU8sUUFBUSxhQUFSLENBQXNCLHVCQUF0QixDQUFiO0FBQ0EsWUFBTSxRQUFRLFFBQVEsYUFBUixDQUFzQix5QkFBdEIsQ0FBZDtBQUNBLFlBQU0sU0FBUyxRQUFRLGFBQVIsQ0FBc0IsZ0NBQXRCLENBQWY7O0FBRUEsWUFBTSxXQUFXLEtBQUssYUFBTCxDQUFtQixpQkFBbkIsQ0FBakI7OztBQUdBLFlBQU0sUUFBUSx3QkFBWSxtQkFBWixDQUFkO0FBQ0EsWUFBTSxTQUFTLFNBQVQsTUFBUyxHQUFNO0FBQUEsa0NBQ1EsTUFBTSxRQUFOLEVBRFI7O0FBQUEsZ0JBQ1YsS0FEVSxtQkFDVixLQURVO0FBQUEsZ0JBQ0gsT0FERyxtQkFDSCxPQURHOzs7O0FBSWpCLGdCQUFNLElBQUksS0FBVixDO0FBQ0EsZ0JBQU0sWUFBWSxRQUFRLFNBQVMsS0FBSyxJQUFJLENBQVQsQ0FBVCxDQUExQjtBQUNBLGdCQUFNLE1BQU0sUUFBUSxTQUFwQjs7O0FBR0Esa0JBQU0sS0FBTixHQUFjLFNBQVMsQ0FBQyxPQUFELEdBQVcsSUFBWCxHQUFrQixFQUEzQixDQUFkO0FBQ0EsbUJBQU8sUUFBUCxHQUFrQixFQUFFLFFBQVEsQ0FBVixDQUFsQjtBQUNBLGlCQUFLLFNBQUwseUJBQXFDLFVBQVUsT0FBVixDQUFrQixDQUFsQixDQUFyQyxxQkFBeUUsSUFBSSxPQUFKLENBQVksQ0FBWixDQUF6RTtBQUNBLHFCQUFTLEtBQVQsR0FBaUIsS0FBakI7QUFDSCxTQWJEO0FBY0EsY0FBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ0E7OztBQUdBLHlDQUFXLEtBQVgsRUFBa0IsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixNQUFuQixDQUFsQixFQUE4QyxLQUE5QztBQUNILEtBOUJEOztBQWdDQSxpQ0FBSSxTQUFTLGdCQUFULENBQTBCLHlCQUExQixDQUFKLEdBQTBELE9BQTFELENBQWtFLFVBQUMsSUFBRCxFQUFVO0FBQ3hFLFlBQU0sUUFBUSxLQUFLLGFBQUwsQ0FBbUIsZ0NBQW5CLENBQWQ7QUFDQSxZQUFNLFNBQVMsS0FBSyxhQUFMLENBQW1CLGdDQUFuQixDQUFmOztBQUVBLFlBQU0sV0FBVyxLQUFLLGFBQUwsQ0FBbUIsaUJBQW5CLENBQWpCOzs7QUFHQSxZQUFNLFFBQVEsd0JBQVksbUJBQVosQ0FBZDtBQUNBLFlBQU0sU0FBUyxTQUFULE1BQVMsR0FBTTtBQUFBLG1DQUNRLE1BQU0sUUFBTixFQURSOztBQUFBLGdCQUNWLEtBRFUsb0JBQ1YsS0FEVTtBQUFBLGdCQUNILE9BREcsb0JBQ0gsT0FERzs7OztBQUlqQixrQkFBTSxLQUFOLEdBQWMsU0FBUyxDQUFDLE9BQUQsR0FBVyxJQUFYLEdBQWtCLEVBQTNCLENBQWQ7QUFDQSxtQkFBTyxRQUFQLEdBQWtCLEVBQUUsUUFBUSxDQUFWLENBQWxCO0FBQ0EscUJBQVMsS0FBVCxHQUFpQixLQUFqQjtBQUNILFNBUEQ7QUFRQSxjQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDQTs7O0FBR0EseUNBQVcsS0FBWCxFQUFrQixDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLE1BQW5CLENBQWxCLEVBQThDLEtBQTlDO0FBQ0gsS0FyQkQ7QUFzQkgsQ0F2REQ7Ozs7Ozs7Ozs7O0FDOUJBLElBQU0sZ0JBQWdCLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsTUFBbkIsQ0FBdEIsQzs7QUFFQSxJQUFNLGtCQUFrQixFQUF4QjtBQUNBLGNBQWMsT0FBZCxDQUFzQixVQUFDLFNBQUQsRUFBZTtBQUNqQyxvQkFBZ0IsU0FBaEIsSUFBOEIsWUFBTTtBQUNoQyxnQkFBUSxTQUFSO0FBQ0ksaUJBQUssT0FBTDtBQUNJLHVCQUFPLFVBQUMsQ0FBRDtBQUFBLDJCQUFRLEVBQUMsTUFBTSxXQUFQLEVBQW9CLE1BQU0sRUFBRSxNQUFGLENBQVMsS0FBbkMsRUFBUjtBQUFBLGlCQUFQO0FBQ0osaUJBQUssT0FBTDtBQUNJLHVCQUFPLFVBQUMsRUFBRDtBQUFBLDJCQUFTLEVBQUMsTUFBTSxXQUFQLEVBQVQ7QUFBQSxpQkFBUDtBQUNKLGlCQUFLLE1BQUw7QUFDSSx1QkFBTyxVQUFDLEVBQUQ7QUFBQSwyQkFBUyxFQUFDLE1BQU0sVUFBUCxFQUFUO0FBQUEsaUJBQVA7QUFDSjtBQUNJLHNCQUFNLElBQUksS0FBSixDQUFVLHdCQUF3QixTQUFsQyxDQUFOO0FBUlI7QUFVSCxLQVg0QixFQUE3QjtBQVlILENBYkQ7O0FBZUEsSUFBTSxrQkFBa0IsRUFBeEI7QUFDQSxjQUFjLE9BQWQsQ0FBc0IsVUFBQyxTQUFELEVBQWU7QUFDakMsUUFBTSxjQUFjLGdCQUFnQixTQUFoQixDQUFwQjtBQUNBLG9CQUFnQixTQUFoQixJQUE2QixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQzdDLGdCQUFRLGdCQUFSLENBQXlCLFNBQXpCLEVBQW9DLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZDLGtCQUFNLFFBQU4sQ0FBZSxZQUFZLENBQVosQ0FBZjtBQUNILFNBRkQ7QUFHSCxLQUpEO0FBS0gsQ0FQRDs7Ozs7Ozs7OztBQWlCTyxJQUFNLGtDQUFhLFNBQWIsVUFBYSxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLEtBQW5CLEVBQTZCO0FBQ25ELFFBQU0sY0FBZSxPQUFPLE1BQVAsS0FBa0IsUUFBbkIsR0FDZCxPQUFPLEtBQVAsQ0FBYSxHQUFiLENBRGMsR0FFZCxNQUZOLEM7O0FBSUEsUUFBTSxnQkFBaUIsWUFBWSxRQUFiLGdDQUE2QixRQUE3QixLQUF5QyxDQUFDLFFBQUQsQ0FBL0Q7O0FBRUEsa0JBQWMsT0FBZCxDQUFzQixVQUFDLE9BQUQsRUFBYTtBQUMvQixvQkFBWSxPQUFaLENBQW9CLFVBQUMsU0FBRCxFQUFlO0FBQy9CLGdCQUFJLEVBQUUsYUFBYSxlQUFmLENBQUosRUFBcUM7QUFDakMsc0JBQU0sSUFBSSxLQUFKLENBQVUsMkJBQTJCLFNBQXJDLENBQU47QUFDSDtBQUNELGdCQUFNLFNBQVMsZ0JBQWdCLFNBQWhCLENBQWY7QUFDQSxtQkFBTyxPQUFQLEVBQWdCLEtBQWhCO0FBQ0gsU0FORDtBQU9ILEtBUkQ7QUFTSCxDQWhCTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtiaW5kRXZlbnRzfSBmcm9tIFwiLi9yZWR1eC1kb20tYmluZGluZ1wiXG5pbXBvcnQge21lcmdlfSBmcm9tIFwiZnVuY3Rpb25hbC11dGlsc1wiXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICB2YWx1ZTogMTAwMCxcbiAgICBmb2N1c2VkOiBmYWxzZSxcbn1cblxuY29uc3QgZG9uYXRpb25Gb3JtUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiRE9NX0ZPQ1VTXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZShzdGF0ZSwge2ZvY3VzZWQ6IHRydWV9KVxuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJET01fQkxVUlwiOiB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2Uoc3RhdGUsIHtmb2N1c2VkOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkRPTV9JTlBVVFwiOiB7XG4gICAgICAgICAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIoYWN0aW9uLnRleHQpXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKG51bWJlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXJnZShzdGF0ZSwge3ZhbHVlOiBudW1iZXJ9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbW1vbi1kb25hdGlvblwiKV0uZm9yRWFjaCgoZm9ybURpdikgPT4ge1xuICAgICAgICBjb25zdCBmb3JtID0gZm9ybURpdi5xdWVyeVNlbGVjdG9yKFwiLmNvbW1vbi1kb25hdGlvbl9mb3JtXCIpXG5cbiAgICAgICAgY29uc3QgdGlwcyA9IGZvcm1EaXYucXVlcnlTZWxlY3RvcihcIi5jb21tb24tZG9uYXRpb25fdGlwc1wiKVxuICAgICAgICBjb25zdCBpbnB1dCA9IGZvcm1EaXYucXVlcnlTZWxlY3RvcihcIi5jb21tb24tZG9uYXRpb25fYW1vdW50XCIpXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGZvcm1EaXYucXVlcnlTZWxlY3RvcihcIi5jb21tb24tZG9uYXRpb25fZG9uYXRlLWJ1dHRvblwiKVxuXG4gICAgICAgIGNvbnN0IHN1bUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1zdW1dXCIpXG5cbiAgICAgICAgLy8gQ29uZmlndXJlIHJlbmRlcmluZ1xuICAgICAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKGRvbmF0aW9uRm9ybVJlZHVjZXIpXG4gICAgICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHt2YWx1ZSwgZm9jdXNlZH0gPSBzdG9yZS5nZXRTdGF0ZSgpXG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBkZXJpdmVkIHZhbHVlc1xuICAgICAgICAgICAgY29uc3QgYSA9IDAuMDA1IC8vIGNvZWZmaWNpZW50IGZvciBQQyBwYXltZW50IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudER1ZSA9IHZhbHVlIC0gdmFsdWUgKiAoYSAvICgxICsgYSkpXG4gICAgICAgICAgICBjb25zdCBmZWUgPSB2YWx1ZSAtIGFtb3VudER1ZVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdmlld1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZSArICghZm9jdXNlZCA/IFwiIOKCvVwiIDogXCJcIilcbiAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9ICEodmFsdWUgPiAwKVxuICAgICAgICAgICAgdGlwcy5pbm5lclRleHQgPSBg0JHRg9C00LXRgiDQv9C10YDQtdCy0LXQtNC10L3QviAke2Ftb3VudER1ZS50b0ZpeGVkKDIpfSDigr0gKNC60L7QvNC40YHRgdC40Y8gJHtmZWUudG9GaXhlZCgyKX0g4oK9KWBcbiAgICAgICAgICAgIHN1bUlucHV0LnZhbHVlID0gdmFsdWVcbiAgICAgICAgfVxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUocmVuZGVyKVxuICAgICAgICByZW5kZXIoKVxuXG4gICAgICAgIC8vIEJpbmQgc29tZSBldmVudHMgdG8gc3RvcmUgZGlzcGF0Y2hpbmdcbiAgICAgICAgYmluZEV2ZW50cyhpbnB1dCwgW1wiaW5wdXRcIiwgXCJmb2N1c1wiLCBcImJsdXJcIl0sIHN0b3JlKVxuICAgIH0pO1xuXG4gICAgWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3BlY2lhbC1wcm9qZWN0X2RvbmF0ZVwiKV0uZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5zcGVjaWFsLXByb2plY3RfZG9uYXRlLWFtb3VudFwiKVxuICAgICAgICBjb25zdCBidXR0b24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuc3BlY2lhbC1wcm9qZWN0X2RvbmF0ZS1idXR0b25cIilcblxuICAgICAgICBjb25zdCBzdW1JbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9c3VtXVwiKVxuXG4gICAgICAgIC8vIENvbmZpZ3VyZSByZW5kZXJpbmdcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShkb25hdGlvbkZvcm1SZWR1Y2VyKVxuICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7dmFsdWUsIGZvY3VzZWR9ID0gc3RvcmUuZ2V0U3RhdGUoKVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdmlld1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZSArICghZm9jdXNlZCA/IFwiIOKCvVwiIDogXCJcIilcbiAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9ICEodmFsdWUgPiAwKVxuICAgICAgICAgICAgc3VtSW5wdXQudmFsdWUgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHN0b3JlLnN1YnNjcmliZShyZW5kZXIpXG4gICAgICAgIHJlbmRlcigpXG5cbiAgICAgICAgLy8gQmluZCBzb21lIGV2ZW50cyB0byBzdG9yZSBkaXNwYXRjaGluZ1xuICAgICAgICBiaW5kRXZlbnRzKGlucHV0LCBbXCJpbnB1dFwiLCBcImZvY3VzXCIsIFwiYmx1clwiXSwgc3RvcmUpXG4gICAgfSlcbn0pXG4iLCJjb25zdCBhbGxFdmVudFR5cGVzID0gW1wiaW5wdXRcIiwgXCJmb2N1c1wiLCBcImJsdXJcIl0gLy90b2RvOiBhZGQgc3VwcG9ydCBmb3IgYWxsIG90aGVyIGV2ZW50c1xuXG5jb25zdCBhbGxUcmFuc2xhdGlvbnMgPSB7fVxuYWxsRXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBhbGxUcmFuc2xhdGlvbnNbZXZlbnRUeXBlXSA9ICgoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGUpID0+ICh7dHlwZTogXCJET01fSU5QVVRcIiwgdGV4dDogZS50YXJnZXQudmFsdWV9KVxuICAgICAgICAgICAgY2FzZSBcImZvY3VzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfZSkgPT4gKHt0eXBlOiBcIkRPTV9GT0NVU1wifSlcbiAgICAgICAgICAgIGNhc2UgXCJibHVyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfZSkgPT4gKHt0eXBlOiBcIkRPTV9CTFVSXCJ9KVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBldmVudDogXCIgKyBldmVudFR5cGUpXG4gICAgICAgIH1cbiAgICB9KSgpXG59KVxuXG5jb25zdCBhbGxFdmVudEJpbmRlcnMgPSB7fVxuYWxsRXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IGFsbFRyYW5zbGF0aW9uc1tldmVudFR5cGVdXG4gICAgYWxsRXZlbnRCaW5kZXJzW2V2ZW50VHlwZV0gPSAoZWxlbWVudCwgc3RvcmUpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHRyYW5zbGF0aW9uKGUpKVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbi8qKlxuICogQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgRE9NIGVsZW1lbnRzLCB3aGljaCB0cmFuc2xhdGUgRE9NIHNwZWNpZmllZCBldmVudHMgdG8gcmVkdXggYWN0aW9uc1xuICogQHBhcmFtIHtvYmplY3R8b2JqZWN0W119IGVsZW1lbnRzIERPTSB0YXJnZXRzIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMsIGNvdWxkIGJlXG4gKiBhIHNpbmdsZSBET00gZWxlbWVudCwgTm9kZUxpc3Qgb3IgYW4gYXJyYXlcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBldmVudHMgZXZlbnRzIHRvIGJpbmQsIGNvdWxkIGJlIGEgc3BhY2Utc2VwYXJhdGVkIHN0cmluZyBvciBhbmQgYXJyYXkgb2Ygc3RyaW5nc1xuICogQHBhcmFtIHtvYmplY3R9IHN0b3JlIHN0b3JlIGZvciBkaXNwYXRjaCBhY3Rpb25zIHRvXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5leHBvcnQgY29uc3QgYmluZEV2ZW50cyA9IChlbGVtZW50cywgZXZlbnRzLCBzdG9yZSkgPT4ge1xuICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gKHR5cGVvZiBldmVudHMgPT09IFwic3RyaW5nXCIpXG4gICAgICAgID8gZXZlbnRzLnNwbGl0KFwiIFwiKVxuICAgICAgICA6IGV2ZW50cyAvL3RvZG86IGNoZWNrIGZvciBvdGhlciB0eXBlc1xuXG4gICAgY29uc3QgZWxlbWVudHNBcnJheSA9IChcImxlbmd0aFwiIGluIGVsZW1lbnRzKSA/IFsuLi5lbGVtZW50c10gOiBbZWxlbWVudHNdXG5cbiAgICBlbGVtZW50c0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZXZlbnRzQXJyYXkuZm9yRWFjaCgoZXZlbnRUeXBlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudFR5cGUgaW4gYWxsRXZlbnRCaW5kZXJzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBldmVudCB0eXBlOiBcIiArIGV2ZW50VHlwZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJpbmRlciA9IGFsbEV2ZW50QmluZGVyc1tldmVudFR5cGVdXG4gICAgICAgICAgICBiaW5kZXIoZWxlbWVudCwgc3RvcmUpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiJdfQ==
