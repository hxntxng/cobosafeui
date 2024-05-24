"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoboFactory = void 0;
var utils_1 = require("./utils");
var ownable_1 = require("./ownable");
var utils_js_1 = require("./utils.js");
var CoboFactory = /** @class */ (function (_super) {
    __extends(CoboFactory, _super);
    function CoboFactory(address, provider) {
        if (address === void 0) { address = utils_1.FACTORY_ADDRESS; }
        if (provider === void 0) { provider = utils_1.ETHEREUM_PROVIDER; }
        return _super.call(this, address, provider) || this;
    }
    CoboFactory.prototype.getAllNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contractNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getAllNames()];
                    case 1:
                        contractNames = _a.sent();
                        return [2 /*return*/, contractNames];
                }
            });
        });
    };
    CoboFactory.prototype.getAddr = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getLatestImplementation(name)];
                    case 1:
                        contractAddress = _a.sent();
                        return [2 /*return*/, contractAddress];
                }
            });
        });
    };
    // // TODO
    // async create()
    // async create2()
    CoboFactory.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var contractNames, contractsList_1, promises, error_1;
            var _this = this;
            if (full === void 0) { full = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.dump.call(this, full);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getAllNames()];
                    case 2:
                        contractNames = _a.sent();
                        document.getElementById('implementation').innerHTML = "<h3>Latest implementations (Total ".concat(contractNames.length, "):<h3>");
                        contractsList_1 = document.getElementById('contracts-list');
                        contractsList_1.innerHTML = '';
                        promises = contractNames.map(function (name) { return __awaiter(_this, void 0, void 0, function () {
                            var contractAddress;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getAddr(name)];
                                    case 1:
                                        contractAddress = _a.sent();
                                        return [2 /*return*/, { name: name, address: contractAddress }];
                                }
                            });
                        }); });
                        Promise.all(promises)
                            .then(function (results) {
                            results.forEach(function (_a) {
                                var name = _a.name, address = _a.address;
                                var contractDiv = document.createElement('div');
                                contractDiv.innerText = "".concat((0, utils_js_1.s32)(name), ": ").concat(address);
                                contractsList_1.appendChild(contractDiv);
                            });
                        })
                            .catch(function (error) {
                            console.error(error);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CoboFactory;
}(ownable_1.BaseOwnable));
exports.CoboFactory = CoboFactory;
// }
// this.getAllNames().then((value) => {
//     const contractNames = value;
//     document.getElementById('implementation').innerHTML =  `<h3>Latest implementations (Total ${contractNames.length}):<h3>`;
//     const contractsList = document.getElementById('contracts-list');
//     contractsList.innerHTML = '';
//     const promises = contractNames.map(async (name) => {
//         const contractAddress = await this.getAddr(name);
//         return { name, address: contractAddress };
//     });
//     Promise.all(promises)
//         .then((results) => {
//             results.forEach(({ name, address }) => {
//                 const contractDiv = document.createElement('div');
//                 // console.log(s32(name));
//                 // console.log(address);
//                 contractDiv.innerText = `${s32(name)}: ${address}`;
//                 contractsList.appendChild(contractDiv);
//             });
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// }).catch((error) => {
//     console.error("Error:", error);
// });
// }
// }
exports.default = CoboFactory;
