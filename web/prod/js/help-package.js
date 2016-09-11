!function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var s="function"==typeof require&&require;if(!u&&s)return s(i,!0);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[i]={exports:{}};t[i][0].call(d.exports,function(e){var n=t[i][1][e];return o(n?n:e)},d,d.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({"/var/www/site/js/entry-help-package.js":[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=e("promise-polyfill"),i=r(a),u=e("react-markup"),s=e("react-dom"),c=r(s),d=e("./shared/redux-helpers"),p=e("./i18n"),l=r(p),f=e("react-redux"),m=e("./react/reducers/donate-modal-reducer"),y=e("./react/container/donate-popup"),h=r(y),v=e("./react/action-creators/main-donation-form"),w=e("./react/action-creators/modal"),O=e("./shared/definitions");e("is-nan").shim(),new i["default"](function(e){document.addEventListener("DOMContentLoaded",e)}).then(function(){return l["default"].create({strings:["help/donate/donate-button-title","help/donate/provider-options/ym","help/donate/amount-options/other-amount","help/main-donation-form/money-template","help/donate/info/for-us/title","help/donate/info/for-them/title","help/donate/info/300/for-us/options/1","help/donate/info/300/for-us/options/2","help/donate/info/300/for-us/options/3","help/donate/info/300/for-them/options/1","help/donate/info/500/for-us/options/1","help/donate/info/500/for-us/options/2","help/donate/info/500/for-us/options/3","help/donate/info/500/for-them/options/1","help/donate/info/1000/for-us/options/1","help/donate/info/1000/for-us/options/2","help/donate/info/1000/for-them/options/1","help/donate/info/1000/for-them/options/2","help/donate/info/1000/for-them/options/3","help/donate/formcomment","help/donate/short-dest","help/donate/targets"],texts:[]})}).then(function(e){var t=e.detectLanguage(),n=t===O.LanguageType.RU?O.ProvideType.YANDEX_MONEY:O.ProvideType.PAYPAL,r=O.CurrencyType[e.settings.language[t].defaultCurrency],a={modal:m.initialState.modal,form:o({},m.initialState.form,{currencySettings:e.settings.currency})},i=(0,d.createStore)(m.reducer,a);c["default"].render((0,u.h)(f.Provider,{store:i},(0,u.h)((0,h["default"])(e))),document.querySelector("#react-popup-entry")),Array.prototype.slice.apply(document.querySelectorAll(".packages .package")).forEach(function(e){e.addEventListener("submit",function(t){t.preventDefault(),i.dispatch((0,v.setProvider)(n)),i.dispatch((0,v.setCurrency)(r)),i.dispatch((0,v.setAmount)(parseInt(e.querySelector("input[name=sum]").value,10))),i.dispatch((0,v.setTargets)(e.querySelector("input[name=formcomment]").value)),i.dispatch((0,v.setFormComment)(e.querySelector("input[name=short-dest]").value)),i.dispatch((0,v.setShortDesc)(e.querySelector("input[name=targets]").value)),i.dispatch((0,w.setModalDisplayed)(!0))})})})["catch"](function(e){console.error(e.stack)});var g=5;document.addEventListener("DOMContentLoaded",function(){Array.prototype.slice.apply(document.querySelectorAll(".category-menu")).forEach(function(e){var t=function(){Array.prototype.slice.apply(e.querySelectorAll(".category-menu_item")).forEach(function(e){var t=new URL(e.getAttribute("href"),window.location);t.href===location.href?e.classList.add("category-menu_item--active"):e.classList.remove("category-menu_item--active")})};window.addEventListener("hashchange",t,!1),t();var n=e.querySelector(".category-menu_body"),r=function(){var t=document.body.getBoundingClientRect(),r=e.getBoundingClientRect(),o=r.top-t.top,a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,i=Math.max(a-o+g,0);n.style.top=i+"px"};document.addEventListener("scroll",r),r()})})},{"./i18n":"/var/www/site/js/i18n.js","./react/action-creators/main-donation-form":"/var/www/site/js/react/action-creators/main-donation-form.js","./react/action-creators/modal":"/var/www/site/js/react/action-creators/modal.js","./react/container/donate-popup":"/var/www/site/js/react/container/donate-popup.js","./react/reducers/donate-modal-reducer":"/var/www/site/js/react/reducers/donate-modal-reducer.js","./shared/definitions":"/var/www/site/js/shared/definitions.js","./shared/redux-helpers":"/var/www/site/js/shared/redux-helpers.js","is-nan":"is-nan","promise-polyfill":"promise-polyfill","react-dom":"react-dom","react-markup":"react-markup","react-redux":"react-redux"}],"/var/www/site/js/i18n.js":[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(s){o=!0,a=s}finally{try{!r&&u["return"]&&u["return"]()}finally{if(o)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=e("promise-polyfill"),c=r(s),d=e("./shared/definitions"),p=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o(this,e),this.data=t,this.settings=n}return u(e,[{key:"detectLanguage",value:function(){return e.detectLanguage()}},{key:"t",value:function(e,t){var n=this.data[e];if("undefined"==typeof n)throw new Error("Wrong category "+e);if(!(t in n))throw new Error("Wrong key: "+e+"/"+t);return n[t]}}],[{key:"create",value:function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={language:e.detectLanguage()},r=new c["default"](function(e,t){var n=new XMLHttpRequest;n.addEventListener("load",function(){var r=200;n.status===r?e(JSON.parse(n.responseText)):t(n.responseText)}),n.addEventListener("error",function(){t(n.responseText)}),n.open("POST","/i18n/settings"),n.setRequestHeader("Content-type","application/json"),n.send("")}),o=new c["default"](function(e,r){var o=new XMLHttpRequest;o.addEventListener("load",function(){var t=200;o.status===t?e(JSON.parse(o.responseText)):r(o.responseText)}),o.addEventListener("error",function(){r(o.responseText)}),o.open("POST","/i18n/translate"),o.setRequestHeader("Content-type","application/json"),o.send(JSON.stringify(i({},t,n)))});return c["default"].all([o,r]).then(function(t){var n=a(t,2),r=n[0],o=n[1];return new e(r,o)})}},{key:"detectLanguage",value:function(){return/^(\/en$)|(\/en\/)/.test(window.location.pathname)?d.LanguageType.EN:/^(\/es$)|(\/es\/)/.test(window.location.pathname)?d.LanguageType.ES:d.LanguageType.RU}}]),e}();n["default"]=p},{"./shared/definitions":"/var/www/site/js/shared/definitions.js","promise-polyfill":"promise-polyfill"}],"/var/www/site/js/react/action-creators/main-donation-form.js":[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.setProvider=function(e){return{type:"SET_PROVIDER",provider:e}},n.setCurrency=function(e){return{type:"SET_CURRENCY",currency:e}},n.setAmountOption=function(e){return{type:"SET_AMOUNT_OPTION",amountOption:e}},n.setAmount=function(e){return{type:"SET_AMOUNT",amount:e}},n.setTargets=function(e){return{type:"SET_TARGETS",targets:e}},n.setFormComment=function(e){return{type:"SET_FORM_COMMENT",formComment:e}},n.setShortDesc=function(e){return{type:"SET_SHORT_DESC",shortDesc:e}}},{}],"/var/www/site/js/react/action-creators/modal.js":[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.setModalDisplayed=function(e){return{type:"SET_MODAL_DISPLAYED",displayed:e}}},{}],"/var/www/site/js/react/container/donate-popup.js":[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=e("react-redux"),u=e("redux"),s=e("../presentational/shared/donate-modal"),c=o(s),d=e("../action-creators/main-donation-form"),p=r(d),l=e("../action-creators/modal"),f=r(l);e("is-nan").shim();var m=function(e){return function(t){return a({},t,{i18n:e})}},y=function(e){return a({},(0,u.bindActionCreators)(p,e),(0,u.bindActionCreators)(f,e))};n["default"]=function(e){return(0,i.connect)(m(e),y)(c["default"])}},{"../action-creators/main-donation-form":"/var/www/site/js/react/action-creators/main-donation-form.js","../action-creators/modal":"/var/www/site/js/react/action-creators/modal.js","../presentational/shared/donate-modal":"/var/www/site/js/react/presentational/shared/donate-modal.js","is-nan":"is-nan","react-redux":"react-redux",redux:"redux"}],"/var/www/site/js/react/presentational/shared/donate-modal.js":[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=e("react"),d=e("react-markup"),p=e("./modal"),l=r(p),f=e("./main-donation-form"),m=r(f),y=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"render",value:function(){var e=this.props.i18n,t=this.props,n=t.modal,r=t.form,o=this.props.setModalDisplayed,a=this.props,i=a.setProvider,s=a.setCurrency,c=a.setAmountOption,p=a.setAmount;return(0,d.h)(l["default"],u({},n,{onClose:function(){return o(!1)}}),(0,d.h)(m["default"],u({i18n:e,onChangeProvider:i,onChangeCurrency:s,onChangeAmountOption:c,onChangeAmount:p},r)))}}]),t}(c.Component);n["default"]=y},{"./main-donation-form":"/var/www/site/js/react/presentational/shared/main-donation-form.js","./modal":"/var/www/site/js/react/presentational/shared/modal.js",react:"react","react-markup":"react-markup"}],"/var/www/site/js/react/presentational/shared/main-donation-form.js":[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=e("react"),d=e("react-markup"),p=e("bem-prefixer"),l=r(p),f=e("../../../shared/definitions"),m=f.ProvideType.YANDEX_MONEY,y=f.ProvideType.PAYPAL,h=f.CurrencyType.RUB,v=f.CurrencyType.USD,w=f.CurrencyType.EUR,O=f.AmountOptionType.OPTION_SUM_1,g=f.AmountOptionType.OPTION_SUM_2,b=f.AmountOptionType.OPTION_SUM_3,_=f.AmountOptionType.OPTION_OTHER,T="https://money.yandex.ru/quickpay/confirm.xml",j="410012180500847",E="donate",P="PC",S="/paypal",C=(0,l["default"])("main-donate-form"),A=function(e){function t(){var e,n,r,i;o(this,t);for(var s=arguments.length,c=Array(s),p=0;p<s;p++)c[p]=arguments[p];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.formatMoney=function(e,t){var n=r.props.i18n;return n.t("strings","help/main-donation-form/money-template").replace(/\{amount\}/g,e).replace(/\{currency\}/g,n.settings.currency[t].symbol)},r.handleChangeAmount=function(e){var t=e.target.value;/^[0-9]*$/.test(t)&&r.props.onChangeAmount(Number(t))},r.renderProviderOptions=function(){var e=r.props,t=e.i18n,n=e.provider,o=e.onChangeProvider;return(0,d.h)(C("div#options"),(0,d.h)(C("div","option",n===m?["active"]:[]),{onClick:o.bind(null,f.ProvideType.YANDEX_MONEY)},t.t("strings","help/donate/provider-options/ym")),(0,d.h)(C("div","option",n===y?["active"]:[]),{onClick:o.bind(null,f.ProvideType.PAYPAL)},"PayPal"))},r.renderCurrencyOptions=function(){var e=r.props,t=e.i18n,n=e.currency,o=e.provider,a=e.onChangeCurrency;return o===y?(0,d.h)(C("div#options"),(0,d.h)(C("div","option",n===h?["active"]:[]),{onClick:a.bind(null,h)},t.settings.currency[h].symbol),(0,d.h)(C("div","option",n===v?["active"]:[]),{onClick:a.bind(null,v)},t.settings.currency[v].symbol),(0,d.h)(C("div","option",n===w?["active"]:[]),{onClick:a.bind(null,w)},t.settings.currency[w].symbol)):null},r.renderAmountOptions=function(){var e=r.props,t=e.i18n,n=e.currency,o=e.amountOption,a=e.onChangeAmountOption;return(0,d.h)(C("div#options"),(0,d.h)(C("div","option",o===O?["active"]:[]),{onClick:a.bind(null,O)},t.settings.currency[n].donationOption1),(0,d.h)(C("div","option",o===g?["active"]:[]),{onClick:a.bind(null,g)},t.settings.currency[n].donationOption2),(0,d.h)(C("div","option",o===b?["active"]:[]),{onClick:a.bind(null,b)},t.settings.currency[n].donationOption3),(0,d.h)(C("div","option",o===_?["active"]:[]),{onClick:a.bind(null,_)},t.t("strings","help/donate/amount-options/other-amount")))},r.renderAmount=function(){var e=r.props,t=e.i18n,n=e.amount,o=e.amountOption,a=e.currency;if(o!==f.AmountOptionType.OPTION_OTHER)return(0,d.h)(C("div#amount-info"),(0,d.h)(C("div#amount"),r.formatMoney(n,a)));var i=function(){var e=t.t("strings","help/main-donation-form/money-template").replace(/ /g," "),o=e.split("{amount}"),i=[];return o.forEach(function(e,o){0!==o&&i.push((0,d.h)("input",{value:n,size:4,onChange:r.handleChangeAmount})),i.push(e.replace("{currency}",t.settings.currency[a].symbol))}),{v:(0,d.h)(C("div#amount-info"),d.h.apply(void 0,[C("div#amount-input")].concat(i)))}}();return"object"===("undefined"==typeof i?"undefined":u(i))?i.v:void 0},r.renderYandexForm=function(){var e=r.props,t=e.i18n,n=e.amount,o=e.targets,a=e.formComment,i=e.shortDesc;return(0,d.h)(C("form#form"),{action:T},(0,d.h)("input",{type:"hidden",name:"sum",value:n}),(0,d.h)("input",{type:"hidden",name:"receiver",value:j}),(0,d.h)("input",{type:"hidden",name:"formcomment",value:a}),(0,d.h)("input",{type:"hidden",name:"short-dest",value:i}),(0,d.h)("input",{type:"hidden",name:"quickpay-form",value:E}),(0,d.h)("input",{type:"hidden",name:"targets",value:o}),(0,d.h)("input",{type:"hidden",name:"paymentType",value:P}),(0,d.h)(C("button#submit"),t.t("strings","help/donate/donate-button-title")))},r.renderPaypalForm=function(){var e=r.props,t=e.i18n,n=e.amount,o=e.currency,a=o;if(o===h)a="RUB";else if(o===v)a="USD";else{if(o!==w)throw new Error("Currency isn't supported: "+o);a="EUR"}return(0,d.h)(C("form#form"),{action:S},(0,d.h)("input",{type:"hidden",name:"amount",value:n}),(0,d.h)("input",{type:"hidden",name:"currency",value:a}),(0,d.h)(C("button#submit"),t.t("strings","help/donate/donate-button-title")))},r.renderButton=function(){var e=r.props.provider;if(e===m)return r.renderYandexForm();if(e===y)return r.renderPaypalForm();throw new Error("Wrong provider value: "+e)},i=n,a(r,i)}return i(t,e),s(t,[{key:"render",value:function(){return(0,d.h)(C("div"),this.renderProviderOptions(),this.renderCurrencyOptions(),this.renderAmountOptions(),this.renderAmount(),this.renderButton())}}]),t}(c.Component);n["default"]=A},{"../../../shared/definitions":"/var/www/site/js/shared/definitions.js","bem-prefixer":"bem-prefixer",react:"react","react-markup":"react-markup"}],"/var/www/site/js/react/presentational/shared/modal.js":[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=e("react"),c=e("react-markup"),d=e("bem-prefixer"),p=r(d),l=(0,p["default"])("modal"),f=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this;this.listener=window.addEventListener("keydown",function(t){if(e.props.displayed){var n=27;t.keyCode===n&&e.props.onClose()}})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.listener)}},{key:"render",value:function(){var e=this.props.displayed,t=this.props.onClose,n=e?[]:["hidden"];return(0,c.h)(l("div",n),(0,c.h)(l("div#content"),this.props.children),(0,c.h)(l("div#background"),{onClick:t}))}}]),t}(s.Component);n["default"]=f},{"bem-prefixer":"bem-prefixer",react:"react","react-markup":"react-markup"}],"/var/www/site/js/react/reducers/donate-modal-reducer.js":[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.initialState=n.reducer=void 0;var o=e("redux"),a=e("./main-donation-form-reducer"),i=r(a),u=e("./modal-reducer"),s=r(u);n.reducer=(0,o.combineReducers)({form:i["default"],modal:s["default"]}),n.initialState={form:a.initialState,modal:u.initialState}},{"./main-donation-form-reducer":"/var/www/site/js/react/reducers/main-donation-form-reducer.js","./modal-reducer":"/var/www/site/js/react/reducers/modal-reducer.js",redux:"redux"}],"/var/www/site/js/react/reducers/main-donation-form-reducer.js":[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.initialState=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=e("../../shared/definitions"),a=o.AmountOptionType.OPTION_SUM_1,i=o.AmountOptionType.OPTION_SUM_2,u=o.AmountOptionType.OPTION_SUM_3,s=o.AmountOptionType.OPTION_OTHER,c=n.initialState={provider:o.ProvideType.YANDEX_MONEY,currency:o.CurrencyType.RUB,amountOption:i,amount:0,targets:"",formComment:"",shortDesc:"",currencySettings:{}},d=function(e,t){if(t===s)return e.amount;var n=e.currencySettings[e.currency];if(!n)return e.amount;var r=n[t];return r?r:e.amount},p=function(){var e=arguments.length<=0||void 0===arguments[0]?c:arguments[0],t=arguments[1];switch(t.type){case"SET_PROVIDER":var n=t.provider,p=e.amountOption,l=n===o.ProvideType.YANDEX_MONEY?o.CurrencyType.RUB:e.currency,f=d(e,p);return r({},e,{provider:n,currency:l,amount:f});case"SET_CURRENCY":var m=e.provider;if(m===o.ProvideType.PAYPAL){var y=t.currency,h=e.amountOption,v=h===s?e.amount:d(e,h);return r({},e,{currency:y,amount:v})}return e;case"SET_AMOUNT_OPTION":var w=t.amountOption,O=d(e,w);return r({},e,{amountOption:w,amount:O});case"SET_AMOUNT":var g=t.amount,b=null;return b=g===d(e,a)?a:g===d(e,i)?i:g===d(e,u)?u:s,r({},e,{amountOption:b,amount:g});case"SET_TARGETS":var _=t.targets;return r({},e,{targets:_});case"SET_FORM_COMMENT":var T=t.formComment;return r({},e,{formComment:T});case"SET_SHORT_DESC":var j=t.shortdesc;return r({},e,{shortdesc:j});default:return e}};n["default"]=p},{"../../shared/definitions":"/var/www/site/js/shared/definitions.js"}],"/var/www/site/js/react/reducers/modal-reducer.js":[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n.initialState={displayed:!1};n["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?o:arguments[0],t=arguments[1];switch(t.type){case"SET_MODAL_DISPLAYED":return r({},e,{displayed:t.displayed});default:return e}}},{}],"/var/www/site/js/shared/definitions.js":[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={EN:"en-US",RU:"ru-RU",ES:"es-ES"},o={YANDEX_MONEY:"YANDEX_MONEY",PAYPAL:"PAYPAL"},a={ACCOUNT:"ACCOUNT",CARD:"CARD"},i={RUB:"RUB",USD:"USD",EUR:"EUR"},u={OPTION_SUM_1:"donationOption1",OPTION_SUM_2:"donationOption2",OPTION_SUM_3:"donationOption3",OPTION_OTHER:"OPTION_OTHER"};n.LanguageType=r,n.ProvideType=o,n.MethodType=a,n.CurrencyType=i,n.AmountOptionType=u},{}],"/var/www/site/js/shared/redux-helpers.js":[function(e,t,n){(function(t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}Object.defineProperty(n,"__esModule",{value:!0}),n.createStore=void 0;var a=e("redux"),i=o(a),u=e("redux-logger"),s=r(u);(0,s["default"])(),n.createStore=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return i.createStore.apply(i,t)}}).call(this,e("_process"))},{_process:"/var/www/site/node_modules/process/browser.js",redux:"redux","redux-logger":"redux-logger"}],"/var/www/site/node_modules/process/browser.js":[function(e,t,n){"use strict";function r(e){if(c===setTimeout)return setTimeout(e,0);try{return c(e,0)}catch(t){try{return c.call(null,e,0)}catch(t){return c.call(this,e,0)}}}function o(e){if(d===clearTimeout)return clearTimeout(e);try{return d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}function a(){m&&l&&(m=!1,l.length?f=l.concat(f):y=-1,f.length&&i())}function i(){if(!m){var e=r(a);m=!0;for(var t=f.length;t;){for(l=f,f=[];++y<t;)l&&l[y].run();y=-1,t=f.length}l=null,m=!1,o(e)}}function u(e,t){this.fun=e,this.array=t}function s(){}var c,d,p=t.exports={};!function(){try{c=setTimeout}catch(e){c=function(){throw new Error("setTimeout is not defined")}}try{d=clearTimeout}catch(e){d=function(){throw new Error("clearTimeout is not defined")}}}();var l,f=[],m=!1,y=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];f.push(new u(e,t)),1!==f.length||m||r(i)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=s,p.addListener=s,p.once=s,p.off=s,p.removeListener=s,p.removeAllListeners=s,p.emit=s,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}]},{},["/var/www/site/js/entry-help-package.js"]);