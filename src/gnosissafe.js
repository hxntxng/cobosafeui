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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GnosisSafe = void 0;
var lru_cache_1 = require("lru-cache");
var utils_1 = require("./utils");
var Operation;
(function (Operation) {
    Operation[Operation["CALL"] = 0] = "CALL";
    Operation[Operation["DELEGATE_CALL"] = 1] = "DELEGATE_CALL";
})(Operation || (Operation = {}));
var GnosisSafe = /** @class */ (function () {
    function GnosisSafe(cobosafeAddr, owner) {
        if (owner === void 0) { owner = null; }
        this.contract = (0, utils_1.loadContract)("GnosisSafe", cobosafeAddr);
        this.owner = owner;
        this.cache = new lru_cache_1.LRUCache({ max: 100 });
        var threshold = this.getThreshold();
        var owners = this.getOwners();
        if (owner) {
            if (threshold !== 1) {
                throw new Error("threshold = ".concat(threshold, " > 1, not supported now"));
            }
            if (!owners.includes(owner.toLowerCase())) {
                throw new Error("owner ".concat(owner, " not in safe owners list ").concat(owners));
            }
        }
        else {
            if (threshold === 1) {
                this.owner = owners[0];
            }
        }
    }
    Object.defineProperty(GnosisSafe.prototype, "address", {
        get: function () {
            return this.contract.address;
        },
        enumerable: false,
        configurable: true
    });
    GnosisSafe.prototype.getThreshold = function () {
        var cacheKey = 'threshold';
        if (!this.cache.has(cacheKey)) {
            this.cache.set(cacheKey, this.contract.getThreshold());
        }
        return this.cache.get(cacheKey);
    };
    GnosisSafe.prototype.getOwners = function () {
        var cacheKey = 'owners';
        if (!this.cache.has(cacheKey)) {
            this.cache.set(cacheKey, this.contract.getOwners());
        }
        return this.cache.get(cacheKey);
    };
    GnosisSafe.createSingleSignature = function (address) {
        var ethers = require('./node_modules/ethers');
        return ethers.utils.concat([
            ethers.utils.defaultAbiCoder.encode(["address", "address"], [address, address]),
            ethers.utils.hexZeroPad(ethers.BigNumber.from(1), 1)
        ]);
    };
    GnosisSafe.prototype.execTransaction = function (to_1, data_1) {
        return __awaiter(this, arguments, void 0, function (to, data, // help uint8 array or string?
        value, signatures, callType) {
            if (value === void 0) { value = 0; }
            if (signatures === void 0) { signatures = null; }
            if (callType === void 0) { callType = Operation.CALL; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!signatures) {
                            if (this.getThreshold() !== 1) {
                                throw new Error("Cannot exec as threshold = ".concat(this.getThreshold(), " > 1"));
                            }
                            signatures = GnosisSafe.createSingleSignature(this.owner);
                        }
                        return [4 /*yield*/, this.contract.execTransaction(to, value, data, callType, 0, 0, 0, utils_1.ZERO_ADDRESS, utils_1.ZERO_ADDRESS, signatures, { from: this.owner })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GnosisSafe.prototype.execTransactionEx = function (to_1, funcSig_1, args_1) {
        return __awaiter(this, arguments, void 0, function (to, funcSig, args, value, signatures, callType) {
            var data;
            if (value === void 0) { value = 0; }
            if (signatures === void 0) { signatures = null; }
            if (callType === void 0) { callType = Operation.CALL; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = (0, utils_1.abiEncodeWithSig)(funcSig, args);
                        return [4 /*yield*/, this.execTransaction(to, data, value, signatures, callType)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GnosisSafe.prototype.execRawTx = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var to, value, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = tx.to, value = tx.value, data = tx.data;
                        return [4 /*yield*/, this.execTransaction(to, data, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GnosisSafe.prototype.delegateCall = function (to, funcSig, args) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = (0, utils_1.abiEncodeWithSig)(funcSig, args);
                        return [4 /*yield*/, this.execTransaction(to, data, 0, null, Operation.DELEGATE_CALL)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GnosisSafe.prototype.enableModule = function (coboSafeModule) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execTransactionEx(this.address, "enableModule(address)", [coboSafeModule])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GnosisSafe.prototype.approveToken = function (token_1, to_1) {
        return __awaiter(this, arguments, void 0, function (token, to, amount) {
            var ethers_1;
            if (amount === void 0) { amount = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (amount === null) {
                            ethers_1 = require('./node_modules/ethers');
                            amount = ethers_1.BigNumber.from(2).pow(256).sub(1).toNumber();
                        }
                        return [4 /*yield*/, this.execTransactionEx(token, "approve(address,uint256)", [to, amount])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GnosisSafe.prototype.toString = function () {
        return "<".concat(this.constructor.name, " ").concat(this.address, ">");
    };
    return GnosisSafe;
}());
exports.GnosisSafe = GnosisSafe;
exports.default = GnosisSafe;
