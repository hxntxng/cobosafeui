"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20 = exports.BaseOwnable = void 0;
var ethers_1 = require("ethers");
var BaseOwnable_json_1 = __importDefault(require("../abi/BaseOwnable.json"));
var utils_1 = require("./utils");
var BaseOwnable = /** @class */ (function () {
    function BaseOwnable(addr, provider) {
        if (provider === void 0) { provider = utils_1.ETHEREUM_PROVIDER; }
        this.contract = new ethers_1.ethers.Contract(addr, BaseOwnable_json_1.default, provider);
        this.addr = addr;
        this.name = "BaseOwnable";
    }
    BaseOwnable.prototype.getName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contractName, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.contract.NAME()];
                    case 1:
                        contractName = _a.sent();
                        return [2 /*return*/, (0, utils_1.s32)(contractName)];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error:", error_1);
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseOwnable.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.addr];
            });
        });
    };
    BaseOwnable.prototype.getVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryVersion, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.contract.VERSION()];
                    case 1:
                        factoryVersion = _a.sent();
                        return [2 /*return*/, factoryVersion.toHexString()];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error:", error_2);
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseOwnable.prototype.getOwner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryOwner, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.contract.owner()];
                    case 1:
                        factoryOwner = _a.sent();
                        return [2 /*return*/, factoryOwner];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error:", error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseOwnable.prototype.getPendingOwner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryPendingOwner, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.contract.pendingOwner()];
                    case 1:
                        factoryPendingOwner = _a.sent();
                        return [2 /*return*/, factoryPendingOwner];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Error:", error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseOwnable.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var factoryNameElement, name_1, error_5, factoryAddressElement, factoryVersionElement, version, error_6, factoryOwnerElement, owner, error_7, factoryPendingOwnerElement, pendingOwner, error_8;
            if (full === void 0) { full = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        factoryNameElement = document.getElementById('factory-name');
                        if (!factoryNameElement) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getName()];
                    case 2:
                        name_1 = _a.sent();
                        factoryNameElement.innerText = "Factory Name: ".concat(name_1 || '');
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error("Error:", error_5);
                        return [3 /*break*/, 4];
                    case 4:
                        factoryAddressElement = document.getElementById('factory-address');
                        if (factoryAddressElement) {
                            factoryAddressElement.innerText = "Factory Address: ".concat(this.addr);
                        }
                        factoryVersionElement = document.getElementById('factory-version');
                        if (!factoryVersionElement) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getVersion()];
                    case 6:
                        version = _a.sent();
                        factoryVersionElement.innerText = "Factory Version: ".concat(version);
                        return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        console.error("Error:", error_6);
                        return [3 /*break*/, 8];
                    case 8:
                        factoryOwnerElement = document.getElementById('factory-owner');
                        if (!factoryOwnerElement) return [3 /*break*/, 12];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.getOwner()];
                    case 10:
                        owner = _a.sent();
                        factoryOwnerElement.innerText = "Factory Owner: ".concat(owner);
                        return [3 /*break*/, 12];
                    case 11:
                        error_7 = _a.sent();
                        console.error("Error:", error_7);
                        return [3 /*break*/, 12];
                    case 12:
                        factoryPendingOwnerElement = document.getElementById('factory-pending-owner');
                        if (!factoryPendingOwnerElement) return [3 /*break*/, 16];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, this.getPendingOwner()];
                    case 14:
                        pendingOwner = _a.sent();
                        if (pendingOwner !== "0x0000000000000000000000000000000000000000") {
                            factoryPendingOwnerElement.innerText = "Factory Pending Owner: ".concat(pendingOwner);
                        }
                        return [3 /*break*/, 16];
                    case 15:
                        error_8 = _a.sent();
                        console.error("Error:", error_8);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return BaseOwnable;
}());
exports.BaseOwnable = BaseOwnable;
var ERC20 = /** @class */ (function () {
    function ERC20(addr) {
        this.contract = (0, utils_1.loadContract)("ERC20", addr);
    }
    Object.defineProperty(ERC20.prototype, "address", {
        get: function () {
            return this.contract.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ERC20.prototype, "symbol", {
        get: function () {
            var ethers = require('./node_modules/ethers');
            var provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth'); // help not standardized
            var network = provider.getNetwork(); // help idk if it needs an await
            var chainId = network.chainId;
            var tag = "".concat(chainId, " ").concat(this.address);
            // Cache to speed.
            if (!(tag in ERC20._CACHE)) {
                ERC20._CACHE[tag] = this.contract.symbol();
            }
            return ERC20._CACHE[tag];
        },
        enumerable: false,
        configurable: true
    });
    ERC20._CACHE = {};
    return ERC20;
}());
exports.ERC20 = ERC20;
