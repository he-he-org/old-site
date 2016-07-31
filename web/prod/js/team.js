(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/var/www/site/js/entry-team.js":[function(require,module,exports){
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

},{}]},{},["/var/www/site/js/entry-team.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lbnRyeS10ZWFtLmpzIiwianMvcmVkdXgtZG9tLWJpbmRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUpBLFFBQVEsUUFBUixFQUFrQixJQUFsQjs7QUFNQSxJQUFNLGVBQWU7QUFDakIsV0FBTyxJQURVO0FBRWpCLGFBQVM7QUFGUSxDQUFyQjs7QUFLQSxJQUFNLHNCQUFzQixTQUF0QixtQkFBc0IsR0FBa0M7QUFBQSxRQUFqQyxLQUFpQyx5REFBekIsWUFBeUI7QUFBQSxRQUFYLE1BQVc7O0FBQzFELFlBQVEsT0FBTyxJQUFmO0FBQ0ksYUFBSyxXQUFMO0FBQWtCO0FBQ2QsdUJBQU8sNEJBQU0sS0FBTixFQUFhLEVBQUMsU0FBUyxJQUFWLEVBQWIsQ0FBUDtBQUNIO0FBQ0QsYUFBSyxVQUFMO0FBQWlCO0FBQ2IsdUJBQU8sNEJBQU0sS0FBTixFQUFhLEVBQUMsU0FBUyxLQUFWLEVBQWIsQ0FBUDtBQUNIO0FBQ0QsYUFBSyxXQUFMO0FBQWtCO0FBQ2Qsb0JBQU0sU0FBUyxPQUFPLE9BQU8sSUFBZCxDQUFmO0FBQ0Esb0JBQUksT0FBTyxLQUFQLENBQWEsTUFBYixDQUFKLEVBQTBCO0FBQ3RCLDJCQUFPLEtBQVA7QUFDSCxpQkFGRCxNQUdLO0FBQ0QsMkJBQU8sNEJBQU0sS0FBTixFQUFhLEVBQUMsT0FBTyxNQUFSLEVBQWIsQ0FBUDtBQUNIO0FBQ0o7QUFDRDtBQUFTLG1CQUFPLEtBQVA7QUFoQmI7QUFrQkgsQ0FuQkQ7O0FBcUJBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07Ozs7QUFJaEQsVUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLEtBQXRCLENBQTRCLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQTVCLEVBQTJFLE9BQTNFLENBQW1GLFVBQUMsT0FBRCxFQUFhO0FBQzVGLFlBQU0sT0FB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QWdCLEtBQWhCLENBQXNCLEtBQXRCLENBQTRCLFFBQTVCLENBQXpCLEdBQWlFLENBQUMsUUFBRCxDQUF2Rjs7QUFFQSxrQkFBYyxPQUFkLENBQXNCLFVBQUMsT0FBRCxFQUFhO0FBQy9CLG9CQUFZLE9BQVosQ0FBb0IsVUFBQyxTQUFELEVBQWU7QUFDL0IsZ0JBQUksRUFBRSxhQUFhLGVBQWYsQ0FBSixFQUFxQztBQUNqQyxzQkFBTSxJQUFJLEtBQUosQ0FBVSwyQkFBMkIsU0FBckMsQ0FBTjtBQUNIO0FBQ0QsZ0JBQU0sU0FBUyxnQkFBZ0IsU0FBaEIsQ0FBZjtBQUNBLG1CQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFDSCxTQU5EO0FBT0gsS0FSRDtBQVNILENBaEJNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoXCJpcy1uYW5cIikuc2hpbSgpXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge2JpbmRFdmVudHN9IGZyb20gXCIuL3JlZHV4LWRvbS1iaW5kaW5nXCJcbmltcG9ydCB7bWVyZ2V9IGZyb20gXCJmdW5jdGlvbmFsLXV0aWxzXCJcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIHZhbHVlOiAxMDAwLFxuICAgIGZvY3VzZWQ6IGZhbHNlLFxufVxuXG5jb25zdCBkb25hdGlvbkZvcm1SZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJET01fRk9DVVNcIjoge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHN0YXRlLCB7Zm9jdXNlZDogdHJ1ZX0pXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkRPTV9CTFVSXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZShzdGF0ZSwge2ZvY3VzZWQ6IGZhbHNlfSlcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiRE9NX0lOUFVUXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IG51bWJlciA9IE51bWJlcihhY3Rpb24udGV4dClcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4obnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHN0YXRlLCB7dmFsdWU6IG51bWJlcn0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgLypcbiAgICAgICAgQ29tbW9uIGRvbmF0aW9uIGxvZ2ljXG4gICAgICovXG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tbW9uLWRvbmF0aW9uXCIpKS5mb3JFYWNoKChmb3JtRGl2KSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBmb3JtRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuY29tbW9uLWRvbmF0aW9uX2Zvcm1cIilcblxuICAgICAgICBjb25zdCB0aXBzID0gZm9ybURpdi5xdWVyeVNlbGVjdG9yKFwiLmNvbW1vbi1kb25hdGlvbl90aXBzXCIpXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZm9ybURpdi5xdWVyeVNlbGVjdG9yKFwiLmNvbW1vbi1kb25hdGlvbl9hbW91bnRcIilcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZm9ybURpdi5xdWVyeVNlbGVjdG9yKFwiLmNvbW1vbi1kb25hdGlvbl9kb25hdGUtYnV0dG9uXCIpXG5cbiAgICAgICAgY29uc3Qgc3VtSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXN1bV1cIilcblxuICAgICAgICAvLyBDb25maWd1cmUgcmVuZGVyaW5nXG4gICAgICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoZG9uYXRpb25Gb3JtUmVkdWNlcilcbiAgICAgICAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qge3ZhbHVlLCBmb2N1c2VkfSA9IHN0b3JlLmdldFN0YXRlKClcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGRlcml2ZWQgdmFsdWVzXG4gICAgICAgICAgICBjb25zdCBhID0gMC4wMDUgLy8gY29lZmZpY2llbnQgZm9yIFBDIHBheW1lbnQgdHlwZVxuICAgICAgICAgICAgY29uc3QgYW1vdW50RHVlID0gdmFsdWUgLSB2YWx1ZSAqIChhIC8gKDEgKyBhKSlcbiAgICAgICAgICAgIGNvbnN0IGZlZSA9IHZhbHVlIC0gYW1vdW50RHVlXG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB2aWV3XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlICsgKCFmb2N1c2VkID8gXCIg4oK9XCIgOiBcIlwiKVxuICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gISh2YWx1ZSA+IDApXG4gICAgICAgICAgICB0aXBzLmlubmVyVGV4dCA9IGDQkdGD0LTQtdGCINC/0LXRgNC10LLQtdC00LXQvdC+ICR7YW1vdW50RHVlLnRvRml4ZWQoMil9IOKCvSAo0LrQvtC80LjRgdGB0LjRjyAke2ZlZS50b0ZpeGVkKDIpfSDigr0pYFxuICAgICAgICAgICAgc3VtSW5wdXQudmFsdWUgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHN0b3JlLnN1YnNjcmliZShyZW5kZXIpXG4gICAgICAgIHJlbmRlcigpXG5cbiAgICAgICAgLy8gQmluZCBzb21lIGV2ZW50cyB0byBzdG9yZSBkaXNwYXRjaGluZ1xuICAgICAgICBiaW5kRXZlbnRzKGlucHV0LCBbXCJpbnB1dFwiLCBcImZvY3VzXCIsIFwiYmx1clwiXSwgc3RvcmUpXG4gICAgfSlcbn0pXG4iLCJjb25zdCBhbGxFdmVudFR5cGVzID0gW1wiaW5wdXRcIiwgXCJmb2N1c1wiLCBcImJsdXJcIl0gLy90b2RvOiBhZGQgc3VwcG9ydCBmb3IgYWxsIG90aGVyIGV2ZW50c1xuXG5jb25zdCBhbGxUcmFuc2xhdGlvbnMgPSB7fVxuYWxsRXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBhbGxUcmFuc2xhdGlvbnNbZXZlbnRUeXBlXSA9ICgoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGUpID0+ICh7dHlwZTogXCJET01fSU5QVVRcIiwgdGV4dDogZS50YXJnZXQudmFsdWV9KVxuICAgICAgICAgICAgY2FzZSBcImZvY3VzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfZSkgPT4gKHt0eXBlOiBcIkRPTV9GT0NVU1wifSlcbiAgICAgICAgICAgIGNhc2UgXCJibHVyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfZSkgPT4gKHt0eXBlOiBcIkRPTV9CTFVSXCJ9KVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBldmVudDogXCIgKyBldmVudFR5cGUpXG4gICAgICAgIH1cbiAgICB9KSgpXG59KVxuXG5jb25zdCBhbGxFdmVudEJpbmRlcnMgPSB7fVxuYWxsRXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IGFsbFRyYW5zbGF0aW9uc1tldmVudFR5cGVdXG4gICAgYWxsRXZlbnRCaW5kZXJzW2V2ZW50VHlwZV0gPSAoZWxlbWVudCwgc3RvcmUpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHRyYW5zbGF0aW9uKGUpKVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbi8qKlxuICogQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgRE9NIGVsZW1lbnRzLCB3aGljaCB0cmFuc2xhdGUgRE9NIHNwZWNpZmllZCBldmVudHMgdG8gcmVkdXggYWN0aW9uc1xuICogQHBhcmFtIHtvYmplY3R8b2JqZWN0W119IGVsZW1lbnRzIERPTSB0YXJnZXRzIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMsIGNvdWxkIGJlXG4gKiBhIHNpbmdsZSBET00gZWxlbWVudCwgTm9kZUxpc3Qgb3IgYW4gYXJyYXlcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBldmVudHMgZXZlbnRzIHRvIGJpbmQsIGNvdWxkIGJlIGEgc3BhY2Utc2VwYXJhdGVkIHN0cmluZyBvciBhbmQgYXJyYXkgb2Ygc3RyaW5nc1xuICogQHBhcmFtIHtvYmplY3R9IHN0b3JlIHN0b3JlIGZvciBkaXNwYXRjaCBhY3Rpb25zIHRvXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5leHBvcnQgY29uc3QgYmluZEV2ZW50cyA9IChlbGVtZW50cywgZXZlbnRzLCBzdG9yZSkgPT4ge1xuICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gKHR5cGVvZiBldmVudHMgPT09IFwic3RyaW5nXCIpXG4gICAgICAgID8gZXZlbnRzLnNwbGl0KFwiIFwiKVxuICAgICAgICA6IGV2ZW50cyAvL3RvZG86IGNoZWNrIGZvciBvdGhlciB0eXBlc1xuXG4gICAgY29uc3QgZWxlbWVudHNBcnJheSA9IChcImxlbmd0aFwiIGluIGVsZW1lbnRzKSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbGVtZW50cykgOiBbZWxlbWVudHNdXG5cbiAgICBlbGVtZW50c0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZXZlbnRzQXJyYXkuZm9yRWFjaCgoZXZlbnRUeXBlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudFR5cGUgaW4gYWxsRXZlbnRCaW5kZXJzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBldmVudCB0eXBlOiBcIiArIGV2ZW50VHlwZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJpbmRlciA9IGFsbEV2ZW50QmluZGVyc1tldmVudFR5cGVdXG4gICAgICAgICAgICBiaW5kZXIoZWxlbWVudCwgc3RvcmUpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cbiJdfQ==
