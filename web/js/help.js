(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/var/www/site/js/entry-help.js":[function(require,module,exports){
"use strict";

var _functionalUtils = require("functional-utils");

var _redux = require("redux");

require("is-nan").shim();

var PC_A = 0.005;
var AC_A = 0.02;

var find = function find() {
    var context = null;
    var selector = null;

    if (arguments.length < 2) {
        context = document;
        selector = arguments.length <= 0 ? undefined : arguments[0];
    } else {
        context = arguments.length <= 0 ? undefined : arguments[0];
        selector = arguments.length <= 1 ? undefined : arguments[1];
    }

    return Array.prototype.slice.apply(context.querySelectorAll(selector));
};

var get = function get() {
    return find.apply(undefined, arguments)[0];
};

var MAX_AMOUNT_LENGTH = 10;

document.addEventListener("DOMContentLoaded", function () {
    find(".section-donate-form").forEach(function (form) {
        var initialState = {
            paymentType: "AC",
            amountOption: "500",
            amount: 500
        };

        var donationFormReducer = function donationFormReducer() {
            var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
            var action = arguments[1];

            switch (action.type) {
                case "SET_PAYMENT_TYPE":
                    {
                        return (0, _functionalUtils.merge)(state, { paymentType: action.value });
                    }
                case "SET_AMOUNT_OPTION":
                    {
                        return (0, _functionalUtils.merge)(state, {
                            amountOption: action.value,
                            amount: action.value !== "free" ? parseInt(action.value, 10) : state.amount
                        });
                    }
                case "SET_AMOUNT":
                    {
                        var number = Number(action.text);
                        if (action.text.length > MAX_AMOUNT_LENGTH || Number.isNaN(number)) {
                            return state;
                        } else {
                            return (0, _functionalUtils.merge)(state, { amount: Math.abs(Math.round(number)) });
                        }
                    }
                default:
                    return state;
            }
        };

        var store = (0, _redux.createStore)(donationFormReducer);
        var renderer = function renderer() {
            var _store$getState = store.getState();

            var paymentType = _store$getState.paymentType;
            var amountOption = _store$getState.amountOption;
            var amount = _store$getState.amount;


            find(form, "[data-role=payment-options] .section-donate-form_option").forEach(function (option) {
                if (option.getAttribute("data-value") === paymentType) {
                    option.classList.add("section-donate-form_option--active");
                } else {
                    option.classList.remove("section-donate-form_option--active");
                }
            });

            find(form, "[data-role=amount-options]  .section-donate-form_option").forEach(function (option) {
                if (option.getAttribute("data-value") === amountOption) {
                    option.classList.add("section-donate-form_option--active");
                } else {
                    option.classList.remove("section-donate-form_option--active");
                }
            });

            if (amountOption !== "free") {
                get(form, ".section-donate-form_amount-input").classList.add("hidden");
                get(form, ".section-donate-form_amount").classList.remove("hidden");
            } else {
                get(form, ".section-donate-form_amount-input").classList.remove("hidden");
                get(form, ".section-donate-form_amount").classList.add("hidden");
            }
            get(form, ".section-donate-form_amount-input input").value = amount;
            get(form, ".section-donate-form_amount").textContent = amount + " ₽";

            var amountDue = paymentType === "PC" ? amount - amount * (PC_A / (1 + PC_A)) : amount * (1 - AC_A);

            var fee = amount - amountDue;

            get(form, "[data-role=amount-due]").textContent = amountDue.toFixed(2);
            get(form, "[data-role=fee]").textContent = fee.toFixed(2);

            get(form, "[data-role=submit]").disabled = amount === 0;

            get(form, "[data-role=hidden-sum]").value = amount;
            get(form, "[data-role=hidden-paymentType]").value = paymentType;

            find(".section-donate-info").forEach(function (info) {
                find(info, ".section-donate-info_block").forEach(function (div) {
                    if (div.getAttribute("date-value") === amountOption) {
                        div.classList.remove("hidden");
                    } else {
                        div.classList.add("hidden");

                        find(div, ".section-donate-info_desc-container").forEach(function (container) {
                            // Show random description
                            var descs = find(container, ".section-donate-info_desc");
                            if (descs.length > 1) {
                                descs.forEach(function (desc) {
                                    return desc.classList.add("hidden");
                                });
                                descs[Math.floor(Math.random() * descs.length)].classList.remove("hidden");
                            }
                        });
                    }
                });
            });
        };
        renderer();
        store.subscribe(renderer);

        find(form, "[data-role=payment-options] .section-donate-form_option").forEach(function (option) {
            option.addEventListener("click", function () {
                store.dispatch({ type: "SET_PAYMENT_TYPE", value: option.getAttribute("data-value") });
            });
        });
        find(form, "[data-role=amount-options] .section-donate-form_option").forEach(function (option) {
            option.addEventListener("click", function () {
                store.dispatch({ type: "SET_AMOUNT_OPTION", value: option.getAttribute("data-value") });
            });
        });
        get(form, "[data-role=amount-input] input").addEventListener("input", function (e) {
            store.dispatch({ type: "SET_AMOUNT", text: e.target.value });
        });
    });
});

// Left menu bar
var STICKY_MARGIN = 5;

document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.slice.apply(document.querySelectorAll(".category-menu")).forEach(function (menu) {
        // Highlight current item
        var highlightItems = function highlightItems() {
            Array.prototype.slice.apply(menu.querySelectorAll(".category-menu_item")).forEach(function (item) {
                var url = new URL(item.getAttribute("href"), window.location);
                if (url.href === location.href) {
                    item.classList.add("category-menu_item--active");
                } else {
                    item.classList.remove("category-menu_item--active");
                }
            });
        };
        window.addEventListener("hashchange", highlightItems, false);
        highlightItems();

        // Make sticky menu
        var body = menu.querySelector(".category-menu_body");
        var checkSticky = function checkSticky() {
            var bodyRect = document.body.getBoundingClientRect();
            var menuRect = menu.getBoundingClientRect();
            var pos = menuRect.top - bodyRect.top;

            var bodyScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            var dif = Math.max(bodyScroll - pos + STICKY_MARGIN, 0);

            body.style.top = dif + "px";
        };
        document.addEventListener("scroll", checkSticky);
        checkSticky();
    });
});

},{"functional-utils":"functional-utils","is-nan":"is-nan","redux":"redux"}]},{},["/var/www/site/js/entry-help.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lbnRyeS1oZWxwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNHQTs7QUFDQTs7QUFKQSxRQUFRLFFBQVIsRUFBa0IsSUFBbEI7O0FBTUEsSUFBTSxPQUFPLEtBQWI7QUFDQSxJQUFNLE9BQU8sSUFBYjs7QUFFQSxJQUFNLE9BQU8sU0FBUCxJQUFPLEdBQWM7QUFDdkIsUUFBSSxVQUFVLElBQWQ7QUFDQSxRQUFJLFdBQVcsSUFBZjs7QUFFQSxRQUFJLFVBQU0sTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ2xCLGtCQUFVLFFBQVY7QUFDQTtBQUNILEtBSEQsTUFJSztBQUNEO0FBQ0E7QUFDSDs7QUFFRCxXQUFPLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixLQUF0QixDQUE0QixRQUFRLGdCQUFSLENBQXlCLFFBQXpCLENBQTVCLENBQVA7QUFDSCxDQWREOztBQWdCQSxJQUFNLE1BQU0sU0FBTixHQUFNO0FBQUEsV0FBYyxpQ0FBZSxDQUFmLENBQWQ7QUFBQSxDQUFaOztBQUVBLElBQU0sb0JBQW9CLEVBQTFCOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaEQsU0FBSyxzQkFBTCxFQUE2QixPQUE3QixDQUFxQyxVQUFDLElBQUQsRUFBVTtBQUMzQyxZQUFNLGVBQWU7QUFDakIseUJBQWEsSUFESTtBQUVqQiwwQkFBYyxLQUZHO0FBR2pCLG9CQUFRO0FBSFMsU0FBckI7O0FBTUEsWUFBTSxzQkFBc0IsU0FBdEIsbUJBQXNCLEdBQWtDO0FBQUEsZ0JBQWpDLEtBQWlDLHlEQUF6QixZQUF5QjtBQUFBLGdCQUFYLE1BQVc7O0FBQzFELG9CQUFRLE9BQU8sSUFBZjtBQUNJLHFCQUFLLGtCQUFMO0FBQXlCO0FBQ3JCLCtCQUFPLDRCQUFNLEtBQU4sRUFBYSxFQUFDLGFBQWEsT0FBTyxLQUFyQixFQUFiLENBQVA7QUFDSDtBQUNE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LEVBQW1DLE9BQU8sUUFBMUMsQ0FBWjtBQUNBLG9CQUFJLElBQUksSUFBSixLQUFhLFNBQVMsSUFBMUIsRUFBZ0M7QUFDNUIseUJBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsNEJBQW5CO0FBQ0gsaUJBRkQsTUFHSztBQUNELHlCQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLDRCQUF0QjtBQUNIO0FBQ0osYUFSRDtBQVNILFNBVkQ7QUFXQSxlQUFPLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLGNBQXRDLEVBQXNELEtBQXREO0FBQ0E7OztBQUdBLFlBQU0sT0FBTyxLQUFLLGFBQUwsQ0FBbUIscUJBQW5CLENBQWI7QUFDQSxZQUFNLGNBQWMsU0FBZCxXQUFjLEdBQU07QUFDdEIsZ0JBQU0sV0FBVyxTQUFTLElBQVQsQ0FBYyxxQkFBZCxFQUFqQjtBQUNBLGdCQUFNLFdBQVcsS0FBSyxxQkFBTCxFQUFqQjtBQUNBLGdCQUFNLE1BQU0sU0FBUyxHQUFULEdBQWUsU0FBUyxHQUFwQzs7QUFFQSxnQkFBTSxhQUFhLE9BQU8sV0FBUCxJQUNaLFNBQVMsZUFBVCxDQUF5QixTQURiLElBRVosU0FBUyxJQUFULENBQWMsU0FGRixJQUVlLENBRmxDOztBQUlBLGdCQUFNLE1BQU0sS0FBSyxHQUFMLENBQVMsYUFBYSxHQUFiLEdBQW1CLGFBQTVCLEVBQTJDLENBQTNDLENBQVo7O0FBRUEsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBb0IsR0FBcEI7QUFDSCxTQVpEO0FBYUEsaUJBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsV0FBcEM7QUFDQTtBQUNILEtBakNEO0FBa0NILENBbkNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoXCJpcy1uYW5cIikuc2hpbSgpXG5cblxuaW1wb3J0IHttZXJnZX0gZnJvbSBcImZ1bmN0aW9uYWwtdXRpbHNcIlxuaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSBcInJlZHV4XCJcblxuY29uc3QgUENfQSA9IDAuMDA1XG5jb25zdCBBQ19BID0gMC4wMlxuXG5jb25zdCBmaW5kID0gKC4uLmF0dHJzKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBudWxsXG4gICAgbGV0IHNlbGVjdG9yID0gbnVsbFxuXG4gICAgaWYgKGF0dHJzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgY29udGV4dCA9IGRvY3VtZW50XG4gICAgICAgIHNlbGVjdG9yID0gYXR0cnNbMF1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnRleHQgPSBhdHRyc1swXVxuICAgICAgICBzZWxlY3RvciA9IGF0dHJzWzFdXG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxufVxuXG5jb25zdCBnZXQgPSAoLi4uYXR0cnMpID0+IGZpbmQoLi4uYXR0cnMpWzBdXG5cbmNvbnN0IE1BWF9BTU9VTlRfTEVOR1RIID0gMTBcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGZpbmQoXCIuc2VjdGlvbi1kb25hdGUtZm9ybVwiKS5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgICAgIHBheW1lbnRUeXBlOiBcIkFDXCIsXG4gICAgICAgICAgICBhbW91bnRPcHRpb246IFwiNTAwXCIsXG4gICAgICAgICAgICBhbW91bnQ6IDUwMCxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRvbmF0aW9uRm9ybVJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJTRVRfUEFZTUVOVF9UWVBFXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHN0YXRlLCB7cGF5bWVudFR5cGU6IGFjdGlvbi52YWx1ZX0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgXCJTRVRfQU1PVU5UX09QVElPTlwiOiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXJnZShzdGF0ZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50T3B0aW9uOiBhY3Rpb24udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFjdGlvbi52YWx1ZSAhPT0gXCJmcmVlXCIgPyBwYXJzZUludChhY3Rpb24udmFsdWUsIDEwKSA6IHN0YXRlLmFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcIlNFVF9BTU9VTlRcIjoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIoYWN0aW9uLnRleHQpXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24udGV4dC5sZW5ndGggPiBNQVhfQU1PVU5UX0xFTkdUSCB8fCBOdW1iZXIuaXNOYU4obnVtYmVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVyZ2Uoc3RhdGUsIHthbW91bnQ6IE1hdGguYWJzKE1hdGgucm91bmQobnVtYmVyKSl9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShkb25hdGlvbkZvcm1SZWR1Y2VyKVxuICAgICAgICBjb25zdCByZW5kZXJlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtwYXltZW50VHlwZSwgYW1vdW50T3B0aW9uLCBhbW91bnR9ID0gc3RvcmUuZ2V0U3RhdGUoKVxuXG4gICAgICAgICAgICBmaW5kKGZvcm0sIFwiW2RhdGEtcm9sZT1wYXltZW50LW9wdGlvbnNdIC5zZWN0aW9uLWRvbmF0ZS1mb3JtX29wdGlvblwiKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikgPT09IHBheW1lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKFwic2VjdGlvbi1kb25hdGUtZm9ybV9vcHRpb24tLWFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWN0aW9uLWRvbmF0ZS1mb3JtX29wdGlvbi0tYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgZmluZChmb3JtLCBcIltkYXRhLXJvbGU9YW1vdW50LW9wdGlvbnNdICAuc2VjdGlvbi1kb25hdGUtZm9ybV9vcHRpb25cIikuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpID09PSBhbW91bnRPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJzZWN0aW9uLWRvbmF0ZS1mb3JtX29wdGlvbi0tYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LnJlbW92ZShcInNlY3Rpb24tZG9uYXRlLWZvcm1fb3B0aW9uLS1hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoYW1vdW50T3B0aW9uICE9PSBcImZyZWVcIikge1xuICAgICAgICAgICAgICAgIGdldChmb3JtLCBcIi5zZWN0aW9uLWRvbmF0ZS1mb3JtX2Ftb3VudC1pbnB1dFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgZ2V0KGZvcm0sIFwiLnNlY3Rpb24tZG9uYXRlLWZvcm1fYW1vdW50XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdldChmb3JtLCBcIi5zZWN0aW9uLWRvbmF0ZS1mb3JtX2Ftb3VudC1pbnB1dFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgZ2V0KGZvcm0sIFwiLnNlY3Rpb24tZG9uYXRlLWZvcm1fYW1vdW50XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdldChmb3JtLCBcIi5zZWN0aW9uLWRvbmF0ZS1mb3JtX2Ftb3VudC1pbnB1dCBpbnB1dFwiKS52YWx1ZSA9IGFtb3VudFxuICAgICAgICAgICAgZ2V0KGZvcm0sIFwiLnNlY3Rpb24tZG9uYXRlLWZvcm1fYW1vdW50XCIpLnRleHRDb250ZW50ID0gYW1vdW50ICsgXCIg4oK9XCJcblxuICAgICAgICAgICAgY29uc3QgYW1vdW50RHVlID0gKHBheW1lbnRUeXBlID09PSBcIlBDXCIpXG4gICAgICAgICAgICAgICAgPyBhbW91bnQgLSBhbW91bnQgKiAoUENfQSAvICgxICsgUENfQSkpXG4gICAgICAgICAgICAgICAgOiBhbW91bnQgKiAoMSAtIEFDX0EpXG5cbiAgICAgICAgICAgIGNvbnN0IGZlZSA9IGFtb3VudCAtIGFtb3VudER1ZVxuXG5cbiAgICAgICAgICAgIGdldChmb3JtLCBcIltkYXRhLXJvbGU9YW1vdW50LWR1ZV1cIikudGV4dENvbnRlbnQgPSBhbW91bnREdWUudG9GaXhlZCgyKVxuICAgICAgICAgICAgZ2V0KGZvcm0sIFwiW2RhdGEtcm9sZT1mZWVdXCIpLnRleHRDb250ZW50ID0gZmVlLnRvRml4ZWQoMilcblxuICAgICAgICAgICAgZ2V0KGZvcm0sIFwiW2RhdGEtcm9sZT1zdWJtaXRdXCIpLmRpc2FibGVkID0gYW1vdW50ID09PSAwXG5cbiAgICAgICAgICAgIGdldChmb3JtLCBcIltkYXRhLXJvbGU9aGlkZGVuLXN1bV1cIikudmFsdWUgPSBhbW91bnRcbiAgICAgICAgICAgIGdldChmb3JtLCBcIltkYXRhLXJvbGU9aGlkZGVuLXBheW1lbnRUeXBlXVwiKS52YWx1ZSA9IHBheW1lbnRUeXBlXG5cblxuICAgICAgICAgICAgZmluZChcIi5zZWN0aW9uLWRvbmF0ZS1pbmZvXCIpLmZvckVhY2goKGluZm8pID0+IHtcbiAgICAgICAgICAgICAgICBmaW5kKGluZm8sIFwiLnNlY3Rpb24tZG9uYXRlLWluZm9fYmxvY2tcIikuZm9yRWFjaCgoZGl2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXYuZ2V0QXR0cmlidXRlKFwiZGF0ZS12YWx1ZVwiKSA9PT0gYW1vdW50T3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIilcblxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZChkaXYsIFwiLnNlY3Rpb24tZG9uYXRlLWluZm9fZGVzYy1jb250YWluZXJcIikuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2hvdyByYW5kb20gZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjcyA9IGZpbmQoY29udGFpbmVyLCBcIi5zZWN0aW9uLWRvbmF0ZS1pbmZvX2Rlc2NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcy5mb3JFYWNoKChkZXNjKSA9PiBkZXNjLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGRlc2NzLmxlbmd0aCldLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyZXIoKVxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUocmVuZGVyZXIpXG5cbiAgICAgICAgZmluZChmb3JtLCBcIltkYXRhLXJvbGU9cGF5bWVudC1vcHRpb25zXSAuc2VjdGlvbi1kb25hdGUtZm9ybV9vcHRpb25cIikuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogXCJTRVRfUEFZTUVOVF9UWVBFXCIsIHZhbHVlOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKX0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBmaW5kKGZvcm0sIFwiW2RhdGEtcm9sZT1hbW91bnQtb3B0aW9uc10gLnNlY3Rpb24tZG9uYXRlLWZvcm1fb3B0aW9uXCIpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6IFwiU0VUX0FNT1VOVF9PUFRJT05cIiwgdmFsdWU6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGdldChmb3JtLCBcIltkYXRhLXJvbGU9YW1vdW50LWlucHV0XSBpbnB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOiBcIlNFVF9BTU9VTlRcIiwgdGV4dDogZS50YXJnZXQudmFsdWV9KVxuICAgICAgICB9KVxuICAgIH0pXG59KVxuXG4vLyBMZWZ0IG1lbnUgYmFyXG5jb25zdCBTVElDS1lfTUFSR0lOID0gNVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2F0ZWdvcnktbWVudVwiKSkuZm9yRWFjaCgobWVudSkgPT4ge1xuICAgICAgICAvLyBIaWdobGlnaHQgY3VycmVudCBpdGVtXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodEl0ZW1zID0gKCkgPT4ge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KG1lbnUucXVlcnlTZWxlY3RvckFsbChcIi5jYXRlZ29yeS1tZW51X2l0ZW1cIikpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGl0ZW0uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSwgd2luZG93LmxvY2F0aW9uKVxuICAgICAgICAgICAgICAgIGlmICh1cmwuaHJlZiA9PT0gbG9jYXRpb24uaHJlZikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJjYXRlZ29yeS1tZW51X2l0ZW0tLWFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY2F0ZWdvcnktbWVudV9pdGVtLS1hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBoaWdobGlnaHRJdGVtcywgZmFsc2UpXG4gICAgICAgIGhpZ2hsaWdodEl0ZW1zKClcblxuICAgICAgICAvLyBNYWtlIHN0aWNreSBtZW51XG4gICAgICAgIGNvbnN0IGJvZHkgPSBtZW51LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0ZWdvcnktbWVudV9ib2R5XCIpXG4gICAgICAgIGNvbnN0IGNoZWNrU3RpY2t5ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYm9keVJlY3QgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBjb25zdCBtZW51UmVjdCA9IG1lbnUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IG1lbnVSZWN0LnRvcCAtIGJvZHlSZWN0LnRvcFxuXG4gICAgICAgICAgICBjb25zdCBib2R5U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICAgICAgICAgICAgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDBcblxuICAgICAgICAgICAgY29uc3QgZGlmID0gTWF0aC5tYXgoYm9keVNjcm9sbCAtIHBvcyArIFNUSUNLWV9NQVJHSU4sIDApXG5cbiAgICAgICAgICAgIGJvZHkuc3R5bGUudG9wID0gYCR7ZGlmfXB4YFxuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgY2hlY2tTdGlja3kpXG4gICAgICAgIGNoZWNrU3RpY2t5KClcbiAgICB9KVxufSlcbiJdfQ==
