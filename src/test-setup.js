import {
    configure,
} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {
    JSDOM,
} from "jsdom";

configure({
    adapter: new Adapter(),
});

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const {
    window,
} = jsdom;

const copyProps = (src, target) => {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === "undefined")
        .reduce(
            (result, prop) => ({
                ...result,
                [prop]: Object.getOwnPropertyDescriptor(src, prop),
            }), {},
        );
    Object.defineProperties(target, props);
};

global.window = window;
global.document = window.document;
Object.defineProperty(global.window, "localStorage", {
    value: {},
    configurable: true,
    enumerable: true,
    writable: true,
});
global.chrome = {};
global.navigator = {
    userAgent: "node.js",
};
global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
};
copyProps(window, global);
