!function e(t,r,n){function o(i,a){if(!r[i]){if(!t[i]){var c="function"==typeof require&&require;if(!a&&c)return c(i,!0);if(u)return u(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var d=r[i]={exports:{}};t[i][0].call(d.exports,function(e){var r=t[i][1][e];return o(r?r:e)},d,d.exports,e,t,r,n)}return r[i].exports}for(var u="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({"/var/www/site/js/entry-main.js":[function(e,t,r){"use strict";var n=e("redux"),o=e("./redux-dom-binding"),u=e("functional-utils");e("is-nan").shim();var i={value:1e3,focused:!1},a=function(){var e=arguments.length<=0||void 0===arguments[0]?i:arguments[0],t=arguments[1];switch(t.type){case"DOM_FOCUS":return(0,u.merge)(e,{focused:!0});case"DOM_BLUR":return(0,u.merge)(e,{focused:!1});case"DOM_INPUT":var r=Number(t.text);return Number.isNaN(r)?e:(0,u.merge)(e,{value:r});default:return e}};document.addEventListener("DOMContentLoaded",function(){Array.prototype.slice.apply(document.querySelectorAll(".widget-main-donate-form")).forEach(function(e){var t=e.querySelector(".widget-main-donate-form_form"),r=e.querySelector(".widget-main-donate-form_tips"),u=e.querySelector(".widget-main-donate-form_amount"),i=e.querySelector(".widget-main-donate-form_donate-button"),c=t.querySelector("input[name=sum]"),s=r.innerText,d=(0,n.createStore)(a),l=function(){var e=d.getState(),t=e.value,n=e.focused,o=.005,a=t-t*(o/(1+o)),l=t-a;u.value=t+(n?"":" ₽"),i.disabled=!(t>0),r.innerText=s.replace("{amount}",a.toFixed(2)).replace("{fee}",l.toFixed(2)),r.classList.remove("hidden"),c.value=t};d.subscribe(l),l(),(0,o.bindEvents)(u,["input","focus","blur"],d)}),Array.prototype.slice.apply(document.querySelectorAll(".special-project_donate")).forEach(function(e){var t=e.querySelector(".special-project_donate-amount"),r=e.querySelector(".special-project_donate-button"),u=e.querySelector("input[name=sum]"),i=(0,n.createStore)(a),c=function(){var e=i.getState(),n=e.value,o=e.focused;t.value=n+(o?"":" ₽"),r.disabled=!(n>0),u.value=n};i.subscribe(c),c(),(0,o.bindEvents)(t,["input","focus","blur"],i)});for(var e=document.querySelector(".team-row"),t=e.querySelectorAll(".team-member"),r=0;r<t.length;++r)e.appendChild(t[Math.floor(Math.random()*t.length)])})},{"./redux-dom-binding":"/var/www/site/js/redux-dom-binding.js","functional-utils":"functional-utils","is-nan":"is-nan",redux:"redux"}],"/var/www/site/js/redux-dom-binding.js":[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=["input","focus","blur"],o={};n.forEach(function(e){o[e]=function(){switch(e){case"input":return function(e){return{type:"DOM_INPUT",text:e.target.value}};case"focus":return function(e){return{type:"DOM_FOCUS"}};case"blur":return function(e){return{type:"DOM_BLUR"}};default:throw new Error("Unsupported event: "+e)}}()});var u={};n.forEach(function(e){var t=o[e];u[e]=function(r,n){r.addEventListener(e,function(e){n.dispatch(t(e))})}});r.bindEvents=function(e,t,r){var n="string"==typeof t?t.split(" "):t,o="length"in e?Array.prototype.slice.apply(e):[e];o.forEach(function(e){n.forEach(function(t){if(!(t in u))throw new Error("Undefined event type: "+t);var n=u[t];n(e,r)})})}},{}]},{},["/var/www/site/js/entry-main.js"]);