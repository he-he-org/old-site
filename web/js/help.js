(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/var/www/site/js/entry-help.js":[function(require,module,exports){
"use strict";

var _functionalUtils = require("functional-utils");

var _redux = require("redux");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    return [].concat(_toConsumableArray(context.querySelectorAll(selector)));
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
    [].concat(_toConsumableArray(document.querySelectorAll(".category-menu"))).forEach(function (menu) {
        // Highlight current item
        var highlightItems = function highlightItems() {
            [].concat(_toConsumableArray(menu.querySelectorAll(".category-menu_item"))).forEach(function (item) {
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

},{"functional-utils":"functional-utils","redux":"redux"}]},{},["/var/www/site/js/entry-help.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lbnRyeS1oZWxwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7OztBQUVBLElBQU0sT0FBTyxLQUFiO0FBQ0EsSUFBTSxPQUFPLElBQWI7O0FBRUEsSUFBTSxPQUFPLFNBQVAsSUFBTyxHQUFjO0FBQ3ZCLFFBQUksVUFBVSxJQUFkO0FBQ0EsUUFBSSxXQUFXLElBQWY7O0FBRUEsUUFBSSxVQUFNLE1BQU4sR0FBZSxDQUFuQixFQUFzQjtBQUNsQixrQkFBVSxRQUFWO0FBQ0E7QUFDSCxLQUhELE1BSUs7QUFDRDtBQUNBO0FBQ0g7O0FBRUQsd0NBQVcsUUFBUSxnQkFBUixDQUF5QixRQUF6QixDQUFYO0FBQ0gsQ0FkRDs7QUFnQkEsSUFBTSxNQUFNLFNBQU4sR0FBTTtBQUFBLFdBQWMsaUNBQWUsQ0FBZixDQUFkO0FBQUEsQ0FBWjs7QUFFQSxJQUFNLG9CQUFvQixFQUExQjs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hELFNBQUssc0JBQUwsRUFBNkIsT0FBN0IsQ0FBcUMsVUFBQyxJQUFELEVBQVU7QUFDM0MsWUFBTSxlQUFlO0FBQ2pCLHlCQUFhLElBREk7QUFFakIsMEJBQWMsS0FGRztBQUdqQixvQkFBUTtBQUhTLFNBQXJCOztBQU1BLFlBQU0sc0JBQXNCLFNBQXRCLG1CQUFzQixHQUFrQztBQUFBLGdCQUFqQyxLQUFpQyx5REFBekIsWUFBeUI7QUFBQSxnQkFBWCxNQUFXOztBQUMxRCxvQkFBUSxPQUFPLElBQWY7QUFDSSxxQkFBSyxrQkFBTDtBQUF5QjtBQUNyQiwrQkFBTyw0QkFBTSxLQUFOLEVBQWEsRUFBQyxhQUFhLE9BQU8sS0FBckIsRUFBYixDQUFQO0FBQ0g7QUFDRCxxQkFBSyxtQkFBTDtBQUEwQjtBQUN0QiwrQkFBTyw0QkFBTSxLQUFOLEVBQWE7QUFDaEIsMENBQWMsT0FBTyxLQURMO0FB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QUVaLFNBQVMsSUFBVCxDQUFjLFNBRkYsSUFFZSxDQUZsQzs7QUFJQSxnQkFBTSxNQUFNLEtBQUssR0FBTCxDQUFTLGFBQWEsR0FBYixHQUFtQixhQUE1QixFQUEyQyxDQUEzQyxDQUFaOztBQUVBLGlCQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQW9CLEdBQXBCO0FBQ0gsU0FaRDtBQWFBLGlCQUFTLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLFdBQXBDO0FBQ0E7QUFDSCxLQWxDRDtBQW1DSCxDQXBDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge21lcmdlfSBmcm9tIFwiZnVuY3Rpb25hbC11dGlsc1wiXG5pbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tIFwicmVkdXhcIlxuXG5jb25zdCBQQ19BID0gMC4wMDVcbmNvbnN0IEFDX0EgPSAwLjAyXG5cbmNvbnN0IGZpbmQgPSAoLi4uYXR0cnMpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG51bGxcbiAgICBsZXQgc2VsZWN0b3IgPSBudWxsXG5cbiAgICBpZiAoYXR0cnMubGVuZ3RoIDwgMikge1xuICAgICAgICBjb250ZXh0ID0gZG9jdW1lbnRcbiAgICAgICAgc2VsZWN0b3IgPSBhdHRyc1swXVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udGV4dCA9IGF0dHJzWzBdXG4gICAgICAgIHNlbGVjdG9yID0gYXR0cnNbMV1cbiAgICB9XG5cbiAgICByZXR1cm4gWy4uLmNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcildXG59XG5cbmNvbnN0IGdldCA9ICguLi5hdHRycykgPT4gZmluZCguLi5hdHRycylbMF1cblxuY29uc3QgTUFYX0FNT1VOVF9MRU5HVEggPSAxMFxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgZmluZChcIi5zZWN0aW9uLWRvbmF0ZS1mb3JtXCIpLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICAgICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgICAgICAgcGF5bWVudFR5cGU6IFwiQUNcIixcbiAgICAgICAgICAgIGFtb3VudE9wdGlvbjogXCI1MDBcIixcbiAgICAgICAgICAgIGFtb3VudDogNTAwLFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZG9uYXRpb25Gb3JtUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlNFVF9QQVlNRU5UX1RZUEVcIjoge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVyZ2Uoc3RhdGUsIHtwYXltZW50VHlwZTogYWN0aW9uLnZhbHVlfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcIlNFVF9BTU9VTlRfT1BUSU9OXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnRPcHRpb246IGFjdGlvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYWN0aW9uLnZhbHVlICE9PSBcImZyZWVcIiA/IHBhcnNlSW50KGFjdGlvbi52YWx1ZSwgMTApIDogc3RhdGUuYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFwiU0VUX0FNT1VOVFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlciA9IE51bWJlcihhY3Rpb24udGV4dClcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi50ZXh0Lmxlbmd0aCA+IE1BWF9BTU9VTlRfTEVOR1RIIHx8IE51bWJlci5pc05hTihudW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXJnZShzdGF0ZSwge2Ftb3VudDogTWF0aC5hYnMoTWF0aC5yb3VuZChudW1iZXIpKX0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKGRvbmF0aW9uRm9ybVJlZHVjZXIpXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qge3BheW1lbnRUeXBlLCBhbW91bnRPcHRpb24sIGFtb3VudH0gPSBzdG9yZS5nZXRTdGF0ZSgpXG5cbiAgICAgICAgICAgIGZpbmQoZm9ybSwgXCJbZGF0YS1yb2xlPXBheW1lbnQtb3B0aW9uc10gLnNlY3Rpb24tZG9uYXRlLWZvcm1fb3B0aW9uXCIpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKSA9PT0gcGF5bWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJzZWN0aW9uLWRvbmF0ZS1mb3JtX29wdGlvbi0tYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LnJlbW92ZShcInNlY3Rpb24tZG9uYXRlLWZvcm1fb3B0aW9uLS1hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBmaW5kKGZvcm0sIFwiW2RhdGEtcm9sZT1hbW91bnQtb3B0aW9uc10gIC5zZWN0aW9uLWRvbmF0ZS1mb3JtX29wdGlvblwiKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikgPT09IGFtb3VudE9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LmFkZChcInNlY3Rpb24tZG9uYXRlLWZvcm1fb3B0aW9uLS1hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwic2VjdGlvbi1kb25hdGUtZm9ybV9vcHRpb24tLWFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChhbW91bnRPcHRpb24gIT09IFwiZnJlZVwiKSB7XG4gICAgICAgICAgICAgICAgZ2V0KGZvcm0sIFwiLnNlY3Rpb24tZG9uYXRlLWZvcm1fYW1vdW50LWlucHV0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICBnZXQoZm9ybSwgXCIuc2VjdGlvbi1kb25hdGUtZm9ybV9hbW91bnRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0KGZvcm0sIFwiLnNlY3Rpb24tZG9uYXRlLWZvcm1fYW1vdW50LWlucHV0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICBnZXQoZm9ybSwgXCIuc2VjdGlvbi1kb25hdGUtZm9ybV9hbW91bnRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2V0KGZvcm0sIFwiLnNlY3Rpb24tZG9uYXRlLWZvcm1fYW1vdW50LWlucHV0IGlucHV0XCIpLnZhbHVlID0gYW1vdW50XG4gICAgICAgICAgICBnZXQoZm9ybSwgXCIuc2VjdGlvbi1kb25hdGUtZm9ybV9hbW91bnRcIikudGV4dENvbnRlbnQgPSBhbW91bnQgKyBcIiDigr1cIlxuXG4gICAgICAgICAgICBjb25zdCBhbW91bnREdWUgPSAocGF5bWVudFR5cGUgPT09IFwiUENcIilcbiAgICAgICAgICAgICAgICA/IGFtb3VudCAtIGFtb3VudCAqIChQQ19BIC8gKDEgKyBQQ19BKSlcbiAgICAgICAgICAgICAgICA6IGFtb3VudCAqICgxIC0gQUNfQSlcblxuICAgICAgICAgICAgY29uc3QgZmVlID0gYW1vdW50IC0gYW1vdW50RHVlXG5cblxuICAgICAgICAgICAgZ2V0KGZvcm0sIFwiW2RhdGEtcm9sZT1hbW91bnQtZHVlXVwiKS50ZXh0Q29udGVudCA9IGFtb3VudER1ZS50b0ZpeGVkKDIpXG4gICAgICAgICAgICBnZXQoZm9ybSwgXCJbZGF0YS1yb2xlPWZlZV1cIikudGV4dENvbnRlbnQgPSBmZWUudG9GaXhlZCgyKVxuXG4gICAgICAgICAgICBnZXQoZm9ybSwgXCJbZGF0YS1yb2xlPXN1Ym1pdF1cIikuZGlzYWJsZWQgPSBhbW91bnQgPT09IDBcblxuICAgICAgICAgICAgZ2V0KGZvcm0sIFwiW2RhdGEtcm9sZT1oaWRkZW4tc3VtXVwiKS52YWx1ZSA9IGFtb3VudFxuICAgICAgICAgICAgZ2V0KGZvcm0sIFwiW2RhdGEtcm9sZT1oaWRkZW4tcGF5bWVudFR5cGVdXCIpLnZhbHVlID0gcGF5bWVudFR5cGVcblxuXG4gICAgICAgICAgICBmaW5kKFwiLnNlY3Rpb24tZG9uYXRlLWluZm9cIikuZm9yRWFjaCgoaW5mbykgPT4ge1xuICAgICAgICAgICAgICAgIGZpbmQoaW5mbywgXCIuc2VjdGlvbi1kb25hdGUtaW5mb19ibG9ja1wiKS5mb3JFYWNoKChkaXYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpdi5nZXRBdHRyaWJ1dGUoXCJkYXRlLXZhbHVlXCIpID09PSBhbW91bnRPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyZXIoKVxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUocmVuZGVyZXIpXG5cbiAgICAgICAgZmluZChmb3JtLCBcIltkYXRhLXJvbGU9cGF5bWVudC1vcHRpb25zXSAuc2VjdGlvbi1kb25hdGUtZm9ybV9vcHRpb25cIikuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogXCJTRVRfUEFZTUVOVF9UWVBFXCIsIHZhbHVlOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKX0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBmaW5kKGZvcm0sIFwiW2RhdGEtcm9sZT1hbW91bnQtb3B0aW9uc10gLnNlY3Rpb24tZG9uYXRlLWZvcm1fb3B0aW9uXCIpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6IFwiU0VUX0FNT1VOVF9PUFRJT05cIiwgdmFsdWU6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGdldChmb3JtLCBcIltkYXRhLXJvbGU9YW1vdW50LWlucHV0XSBpbnB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOiBcIlNFVF9BTU9VTlRcIiwgdGV4dDogZS50YXJnZXQudmFsdWV9KVxuICAgICAgICB9KVxuICAgIH0pXG59KVxuXG4vLyBMZWZ0IG1lbnUgYmFyXG5jb25zdCBTVElDS1lfTUFSR0lOID0gNVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2F0ZWdvcnktbWVudVwiKV0uZm9yRWFjaCgobWVudSkgPT4ge1xuICAgICAgICAvLyBIaWdobGlnaHQgY3VycmVudCBpdGVtXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodEl0ZW1zID0gKCkgPT4ge1xuICAgICAgICAgICAgWy4uLm1lbnUucXVlcnlTZWxlY3RvckFsbChcIi5jYXRlZ29yeS1tZW51X2l0ZW1cIildLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGl0ZW0uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSwgd2luZG93LmxvY2F0aW9uKVxuICAgICAgICAgICAgICAgIGlmICh1cmwuaHJlZiA9PT0gbG9jYXRpb24uaHJlZikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJjYXRlZ29yeS1tZW51X2l0ZW0tLWFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY2F0ZWdvcnktbWVudV9pdGVtLS1hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBoaWdobGlnaHRJdGVtcywgZmFsc2UpXG4gICAgICAgIGhpZ2hsaWdodEl0ZW1zKClcblxuICAgICAgICAvLyBNYWtlIHN0aWNreSBtZW51XG4gICAgICAgIGNvbnN0IGJvZHkgPSBtZW51LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0ZWdvcnktbWVudV9ib2R5XCIpXG5cbiAgICAgICAgY29uc3QgY2hlY2tTdGlja3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBib2R5UmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGNvbnN0IG1lbnVSZWN0ID0gbWVudS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgY29uc3QgcG9zID0gbWVudVJlY3QudG9wIC0gYm9keVJlY3QudG9wXG5cbiAgICAgICAgICAgIGNvbnN0IGJvZHlTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgICAgICAgICAgICAgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuXG4gICAgICAgICAgICBjb25zdCBkaWYgPSBNYXRoLm1heChib2R5U2Nyb2xsIC0gcG9zICsgU1RJQ0tZX01BUkdJTiwgMClcblxuICAgICAgICAgICAgYm9keS5zdHlsZS50b3AgPSBgJHtkaWZ9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBjaGVja1N0aWNreSlcbiAgICAgICAgY2hlY2tTdGlja3koKVxuICAgIH0pXG59KVxuIl19
