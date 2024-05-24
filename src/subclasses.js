"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubclass = exports.registerSubclass = void 0;
var subclasses = {};
// Function to register a subclass
function registerSubclass(className, subclass) {
    subclasses[className] = subclass;
}
exports.registerSubclass = registerSubclass;
// Function to retrieve a subclass by class name
function getSubclass(className) {
    return subclasses[className];
}
exports.getSubclass = getSubclass;
