/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 983);
/******/ })
/************************************************************************/
/******/ ({

/***/ 983:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var panelCreated = function panelCreated(panel) {
  var queuedMessages = [];
  var panelWindow = void 0;
  var tabId = chrome.devtools.inspectedWindow.tabId;
  var port = chrome.extension.connect({
    name: "skig-" + tabId
  });

  port.onMessage.addListener(function (msg) {
    var event = new CustomEvent('newData', { detail: msg });

    if (panelWindow) {
      panelWindow.document.dispatchEvent(event);
    } else {
      queuedMessages.push(event);
    }
  });

  /**
   * Called when the devtools panel is first shown
   */
  var _onPanelFirstShow = void 0;
  _onPanelFirstShow = function onPanelFirstShow(panelWindowRef) {
    panel.onShown.removeListener(_onPanelFirstShow); // Ensure this fires only once.

    panelWindow = panelWindowRef;

    var event = void 0;
    while (event = queuedMessages.shift()) {
      panelWindow.document.dispatchEvent(event);
    };

    // Mutate the PanelWindow to create a way for it to talk to us
    panelWindow.sendToDevtoolsPage = function (msg) {
      return port.postMessage(msg);
    };
  };

  panel.onShown.addListener(_onPanelFirstShow);
};

chrome.devtools.panels.create("Ski Goggles", "images/ski-googles-icon.png", "panel.html", panelCreated);

/***/ })

/******/ });