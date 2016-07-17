(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/var/www/site/js/entry-main.js":[function(require,module,exports){
"use strict";

var _redux = require("redux");

var _reduxDomBinding = require("./redux-dom-binding");

var _functionalUtils = require("functional-utils");

require("is-nan").shim();

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
    /*
        Common donation logic
     */
    Array.prototype.slice.apply(document.querySelectorAll(".common-donation")).forEach(function (formDiv) {
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

    /*
     Special projects logic
     */
    Array.prototype.slice.apply(document.querySelectorAll(".special-project_donate")).forEach(function (form) {
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

    /*
       Shuffle team members
     */
    var teamRow = document.querySelector(".team-row");
    var members = teamRow.querySelectorAll(".team-member");
    for (var i = 0; i < members.length; ++i) {
        teamRow.appendChild(members[Math.floor(Math.random() * members.length)]);
    }
});

},{"./redux-dom-binding":"/var/www/site/js/redux-dom-binding.js","functional-utils":"functional-utils","is-nan":"is-nan","redux":"redux"}],"/var/www/site/js/redux-dom-binding.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

    var elementsArray = "length" in elements ? Array.prototype.slice.apply(elements) : [elements];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lbnRyeS1tYWluLmpzIiwianMvcmVkdXgtZG9tLWJpbmRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUpBLFFBQVEsUUFBUixFQUFrQixJQUFsQjs7QUFNQSxJQUFNLGVBQWU7QUFDakIsV0FBTyxJQURVO0FBRWpCLGFBQVM7QUFGUSxDQUFyQjs7QUFLQSxJQUFNLHNCQUFzQixTQUF0QixtQkFBc0IsR0FBa0M7QUFBQSxRQUFqQyxLQUFpQyx5REFBekIsWUFBeUI7QUFBQSxRQUFYLE1BQVc7O0FBQzFELFlBQVEsT0FBTyxJQUFmO0FBQ0ksYUFBSyxXQUFMO0FBQWtCO0FBQ2QsdUJBQU8sNEJBQU0sS0FBTixFQUFhLEVBQUMsU0FBUyxJQUFWLEVBQWIsQ0FBUDtBQUNIO0FBQ0QsYUFBSyxVQUFMO0FBQWlCO0FBQ2IsdUJBQU8sNEJBQU0sS0FBTixFQUFhLEVBQUMsU0FBUyxLQUFWLEVBQWIsQ0FBUDtBQUNIO0FBQ0QsYUFBSyxXQUFMO0FBQWtCO0FBQ2Qsb0JBQU0sU0FBUyxPQUFPLE9BQU8sSUFBZCxDQUFmO0FBQ0Esb0JBQUksT0FBTyxLQUFQLENBQWEsTUFBYixDQUFKLEVBQTBCO0FBQ3RCLDJCQUFPLEtBQVA7QUFDSCxpQkFGRCxNQUdLO0FBQ0QsMkJBQU8sNEJBQU0sS0FBTixFQUFhLEVBQUMsT0FBTyxNQUFSLEVBQWIsQ0FBUDtBQUNIO0FBQ0o7QUFDRDtBQUFTLG1CQUFPLEtBQVA7QUFoQmI7QUFrQkgsQ0FuQkQ7O0FBcUJBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07Ozs7QUFJaEQsVUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLEtBQXRCLENBQTRCLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQTVCLEVBQTJFLE9BQTNFLENBQW1GLFVBQUMsT0FBRCxFQUFhO0FBQzVGLFlBQU0sT0FB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Q0FBZ0IsS0FBaEIsQ0FBc0IsS0FBdEIsQ0FBNEIsUUFBNUIsQ0FBekIsR0FBaUUsQ0FBQyxRQUFELENBQXZGOztBQUVBLGtCQUFjLE9BQWQsQ0FBc0IsVUFBQyxPQUFELEVBQWE7QUFDL0Isb0JBQVksT0FBWixDQUFvQixVQUFDLFNBQUQsRUFBZTtBQUMvQixnQkFBSSxFQUFFLGFBQWEsZUFBZixDQUFKLEVBQXFDO0FBQ2pDLHNCQUFNLElBQUksS0FBSixDQUFVLDJCQUEyQixTQUFyQyxDQUFOO0FBQ0g7QUFDRCxnQkFBTSxTQUFTLGdCQUFnQixTQUFoQixDQUFmO0FBQ0EsbUJBQU8sT0FBUCxFQUFnQixLQUFoQjtBQUNILFNBTkQ7QUFPSCxLQVJEO0FBU0gsQ0FoQk0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZShcImlzLW5hblwiKS5zaGltKClcblxuaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7YmluZEV2ZW50c30gZnJvbSBcIi4vcmVkdXgtZG9tLWJpbmRpbmdcIlxuaW1wb3J0IHttZXJnZX0gZnJvbSBcImZ1bmN0aW9uYWwtdXRpbHNcIlxuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgdmFsdWU6IDEwMDAsXG4gICAgZm9jdXNlZDogZmFsc2UsXG59XG5cbmNvbnN0IGRvbmF0aW9uRm9ybVJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIkRPTV9GT0NVU1wiOiB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2Uoc3RhdGUsIHtmb2N1c2VkOiB0cnVlfSlcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiRE9NX0JMVVJcIjoge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHN0YXRlLCB7Zm9jdXNlZDogZmFsc2V9KVxuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJET01fSU5QVVRcIjoge1xuICAgICAgICAgICAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGFjdGlvbi50ZXh0KVxuICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihudW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVyZ2Uoc3RhdGUsIHt2YWx1ZTogbnVtYmVyfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAvKlxuICAgICAgICBDb21tb24gZG9uYXRpb24gbG9naWNcbiAgICAgKi9cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb21tb24tZG9uYXRpb25cIikpLmZvckVhY2goKGZvcm1EaXYpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGZvcm1EaXYucXVlcnlTZWxlY3RvcihcIi5jb21tb24tZG9uYXRpb25fZm9ybVwiKVxuXG4gICAgICAgIGNvbnN0IHRpcHMgPSBmb3JtRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuY29tbW9uLWRvbmF0aW9uX3RpcHNcIilcbiAgICAgICAgY29uc3QgaW5wdXQgPSBmb3JtRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuY29tbW9uLWRvbmF0aW9uX2Ftb3VudFwiKVxuICAgICAgICBjb25zdCBidXR0b24gPSBmb3JtRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuY29tbW9uLWRvbmF0aW9uX2RvbmF0ZS1idXR0b25cIilcblxuICAgICAgICBjb25zdCBzdW1JbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9c3VtXVwiKVxuXG4gICAgICAgIC8vIENvbmZpZ3VyZSByZW5kZXJpbmdcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShkb25hdGlvbkZvcm1SZWR1Y2VyKVxuICAgICAgICBjb25zdCByZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7dmFsdWUsIGZvY3VzZWR9ID0gc3RvcmUuZ2V0U3RhdGUoKVxuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgZGVyaXZlZCB2YWx1ZXNcbiAgICAgICAgICAgIGNvbnN0IGEgPSAwLjAwNSAvLyBjb2VmZmljaWVudCBmb3IgUEMgcGF5bWVudCB0eXBlXG4gICAgICAgICAgICBjb25zdCBhbW91bnREdWUgPSB2YWx1ZSAtIHZhbHVlICogKGEgLyAoMSArIGEpKVxuICAgICAgICAgICAgY29uc3QgZmVlID0gdmFsdWUgLSBhbW91bnREdWVcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHZpZXdcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWUgKyAoIWZvY3VzZWQgPyBcIiDigr1cIiA6IFwiXCIpXG4gICAgICAgICAgICBidXR0b24uZGlzYWJsZWQgPSAhKHZhbHVlID4gMClcbiAgICAgICAgICAgIHRpcHMuaW5uZXJUZXh0ID0gYNCR0YPQtNC10YIg0L/QtdGA0LXQstC10LTQtdC90L4gJHthbW91bnREdWUudG9GaXhlZCgyKX0g4oK9ICjQutC+0LzQuNGB0YHQuNGPICR7ZmVlLnRvRml4ZWQoMil9IOKCvSlgXG4gICAgICAgICAgICBzdW1JbnB1dC52YWx1ZSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgc3RvcmUuc3Vic2NyaWJlKHJlbmRlcilcbiAgICAgICAgcmVuZGVyKClcblxuICAgICAgICAvLyBCaW5kIHNvbWUgZXZlbnRzIHRvIHN0b3JlIGRpc3BhdGNoaW5nXG4gICAgICAgIGJpbmRFdmVudHMoaW5wdXQsIFtcImlucHV0XCIsIFwiZm9jdXNcIiwgXCJibHVyXCJdLCBzdG9yZSlcbiAgICB9KVxuXG4gICAgLypcbiAgICAgU3BlY2lhbCBwcm9qZWN0cyBsb2dpY1xuICAgICAqL1xuICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNwZWNpYWwtcHJvamVjdF9kb25hdGVcIikpLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuc3BlY2lhbC1wcm9qZWN0X2RvbmF0ZS1hbW91bnRcIilcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLnNwZWNpYWwtcHJvamVjdF9kb25hdGUtYnV0dG9uXCIpXG5cbiAgICAgICAgY29uc3Qgc3VtSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXN1bV1cIilcblxuICAgICAgICAvLyBDb25maWd1cmUgcmVuZGVyaW5nXG4gICAgICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoZG9uYXRpb25Gb3JtUmVkdWNlcilcbiAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qge3ZhbHVlLCBmb2N1c2VkfSA9IHN0b3JlLmdldFN0YXRlKClcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHZpZXdcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWUgKyAoIWZvY3VzZWQgPyBcIiDigr1cIiA6IFwiXCIpXG4gICAgICAgICAgICBidXR0b24uZGlzYWJsZWQgPSAhKHZhbHVlID4gMClcbiAgICAgICAgICAgIHN1bUlucHV0LnZhbHVlID0gdmFsdWVcbiAgICAgICAgfVxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUocmVuZGVyKVxuICAgICAgICByZW5kZXIoKVxuXG4gICAgICAgIC8vIEJpbmQgc29tZSBldmVudHMgdG8gc3RvcmUgZGlzcGF0Y2hpbmdcbiAgICAgICAgYmluZEV2ZW50cyhpbnB1dCwgW1wiaW5wdXRcIiwgXCJmb2N1c1wiLCBcImJsdXJcIl0sIHN0b3JlKVxuICAgIH0pXG5cbiAgICAvKlxuICAgICAgIFNodWZmbGUgdGVhbSBtZW1iZXJzXG4gICAgICovXG4gICAgY29uc3QgdGVhbVJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVhbS1yb3dcIilcbiAgICBjb25zdCBtZW1iZXJzID0gdGVhbVJvdy5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlYW0tbWVtYmVyXCIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHRlYW1Sb3cuYXBwZW5kQ2hpbGQobWVtYmVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtZW1iZXJzLmxlbmd0aCldKVxuICAgIH1cbn0pXG4iLCJjb25zdCBhbGxFdmVudFR5cGVzID0gW1wiaW5wdXRcIiwgXCJmb2N1c1wiLCBcImJsdXJcIl0gLy90b2RvOiBhZGQgc3VwcG9ydCBmb3IgYWxsIG90aGVyIGV2ZW50c1xuXG5jb25zdCBhbGxUcmFuc2xhdGlvbnMgPSB7fVxuYWxsRXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBhbGxUcmFuc2xhdGlvbnNbZXZlbnRUeXBlXSA9ICgoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGUpID0+ICh7dHlwZTogXCJET01fSU5QVVRcIiwgdGV4dDogZS50YXJnZXQudmFsdWV9KVxuICAgICAgICAgICAgY2FzZSBcImZvY3VzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfZSkgPT4gKHt0eXBlOiBcIkRPTV9GT0NVU1wifSlcbiAgICAgICAgICAgIGNhc2UgXCJibHVyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfZSkgPT4gKHt0eXBlOiBcIkRPTV9CTFVSXCJ9KVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBldmVudDogXCIgKyBldmVudFR5cGUpXG4gICAgICAgIH1cbiAgICB9KSgpXG59KVxuXG5jb25zdCBhbGxFdmVudEJpbmRlcnMgPSB7fVxuYWxsRXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IGFsbFRyYW5zbGF0aW9uc1tldmVudFR5cGVdXG4gICAgYWxsRXZlbnRCaW5kZXJzW2V2ZW50VHlwZV0gPSAoZWxlbWVudCwgc3RvcmUpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHRyYW5zbGF0aW9uKGUpKVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbi8qKlxuICogQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgRE9NIGVsZW1lbnRzLCB3aGljaCB0cmFuc2xhdGUgRE9NIHNwZWNpZmllZCBldmVudHMgdG8gcmVkdXggYWN0aW9uc1xuICogQHBhcmFtIHtvYmplY3R8b2JqZWN0W119IGVsZW1lbnRzIERPTSB0YXJnZXRzIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMsIGNvdWxkIGJlXG4gKiBhIHNpbmdsZSBET00gZWxlbWVudCwgTm9kZUxpc3Qgb3IgYW4gYXJyYXlcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBldmVudHMgZXZlbnRzIHRvIGJpbmQsIGNvdWxkIGJlIGEgc3BhY2Utc2VwYXJhdGVkIHN0cmluZyBvciBhbmQgYXJyYXkgb2Ygc3RyaW5nc1xuICogQHBhcmFtIHtvYmplY3R9IHN0b3JlIHN0b3JlIGZvciBkaXNwYXRjaCBhY3Rpb25zIHRvXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5leHBvcnQgY29uc3QgYmluZEV2ZW50cyA9IChlbGVtZW50cywgZXZlbnRzLCBzdG9yZSkgPT4ge1xuICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gKHR5cGVvZiBldmVudHMgPT09IFwic3RyaW5nXCIpXG4gICAgICAgID8gZXZlbnRzLnNwbGl0KFwiIFwiKVxuICAgICAgICA6IGV2ZW50cyAvL3RvZG86IGNoZWNrIGZvciBvdGhlciB0eXBlc1xuXG4gICAgY29uc3QgZWxlbWVudHNBcnJheSA9IChcImxlbmd0aFwiIGluIGVsZW1lbnRzKSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbGVtZW50cykgOiBbZWxlbWVudHNdXG5cbiAgICBlbGVtZW50c0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZXZlbnRzQXJyYXkuZm9yRWFjaCgoZXZlbnRUeXBlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudFR5cGUgaW4gYWxsRXZlbnRCaW5kZXJzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBldmVudCB0eXBlOiBcIiArIGV2ZW50VHlwZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJpbmRlciA9IGFsbEV2ZW50QmluZGVyc1tldmVudFR5cGVdXG4gICAgICAgICAgICBiaW5kZXIoZWxlbWVudCwgc3RvcmUpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiJdfQ==
