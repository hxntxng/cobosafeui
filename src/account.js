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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CoboSmartAccount = exports.CoboSafeAccount = void 0;
var ownable_1 = require("./ownable");
var utils_1 = require("./utils");
var gnosissafe_1 = require("./gnosissafe");
var Operation;
(function (Operation) {
    Operation[Operation["CALL"] = 0] = "CALL";
    Operation[Operation["DELEGATE_CALL"] = 1] = "DELEGATE_CALL";
})(Operation || (Operation = {}));
var CoboAccount = /** @class */ (function (_super) {
    __extends(CoboAccount, _super);
    function CoboAccount(accountAddr, delegate) {
        if (delegate === void 0) { delegate = null; }
        var _this = _super.call(this, accountAddr) || this;
        _this.delegate = delegate;
        return _this;
    }
    CoboAccount.prototype.getAuthorizer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.authorizer()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.getRoleManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.roleManager()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.getDelegates = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getAllDelegates()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.getWalletAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getAccountAddress()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.addDelegate = function () {
        var delegates = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            delegates[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (_a = this.contract).addDelegates.apply(_a, delegates)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.execTransaction = function (to_1) {
        return __awaiter(this, arguments, void 0, function (to, data, value, flag, useHint, extra, delegate) {
            var tx, ret;
            if (data === void 0) { data = '0x'; }
            if (value === void 0) { value = 0; }
            if (flag === void 0) { flag = Operation.CALL; }
            if (useHint === void 0) { useHint = true; }
            if (extra === void 0) { extra = '0x'; }
            if (delegate === void 0) { delegate = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!delegate) {
                            delegate = this.delegate;
                        }
                        if (!delegate) {
                            throw new Error("Delegate not set");
                        }
                        tx = [flag, to, value, data, '0x', extra];
                        if (!useHint) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.contract.execTransaction.call(tx, { from: delegate })];
                    case 1:
                        ret = _a.sent();
                        tx[4] = ret[2]; // CallData.hint = TransactionResult.hint
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.contract.execTransaction(tx, { from: delegate })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.execTransactionEx = function (to_1, funcSig_1, args_1) {
        return __awaiter(this, arguments, void 0, function (to, funcSig, args, value, flag, useHint, extra, delegate) {
            var data;
            if (value === void 0) { value = 0; }
            if (flag === void 0) { flag = Operation.CALL; }
            if (useHint === void 0) { useHint = true; }
            if (extra === void 0) { extra = '0x'; }
            if (delegate === void 0) { delegate = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = (0, utils_1.abiEncodeWithSig)(funcSig, args);
                        return [4 /*yield*/, this.execTransaction(to, data, value, flag, useHint, extra, delegate)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.execRawTx = function (tx_1) {
        return __awaiter(this, arguments, void 0, function (tx, flag, useHint, extra, delegate) {
            var to, value, data;
            if (flag === void 0) { flag = Operation.CALL; }
            if (useHint === void 0) { useHint = true; }
            if (extra === void 0) { extra = '0x'; }
            if (delegate === void 0) { delegate = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = tx.to, value = tx.value, data = tx.data;
                        return [4 /*yield*/, this.execTransaction(to, data, value, flag, useHint, extra, delegate)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoboAccount.prototype.toString = function () {
        return "<".concat(this.constructor.name, " ").concat(this.contract.address, ">");
    };
    CoboAccount.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var authorizerElement, _a, _b, roleManagerElement, _c, _d, delegatesElement, _e, _f, dumpModule, _g, _h, _j, _k;
            if (full === void 0) { full = false; }
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _l.sent();
                        authorizerElement = document.getElementById('authorizer');
                        if (!authorizerElement) return [3 /*break*/, 3];
                        _a = authorizerElement;
                        _b = "Authorizer: ".concat;
                        return [4 /*yield*/, this.getAuthorizer()];
                    case 2:
                        _a.innerHTML = _b.apply("Authorizer: ", [_l.sent()]);
                        _l.label = 3;
                    case 3:
                        roleManagerElement = document.getElementById('role-manager');
                        if (!roleManagerElement) return [3 /*break*/, 5];
                        _c = roleManagerElement;
                        _d = "Role manager: ".concat;
                        return [4 /*yield*/, this.getRoleManager()];
                    case 4:
                        _c.innerHTML = _d.apply("Role manager: ", [_l.sent()]);
                        _l.label = 5;
                    case 5:
                        delegatesElement = document.getElementById('delegates');
                        if (!delegatesElement) return [3 /*break*/, 7];
                        _e = delegatesElement;
                        _f = "Delegates: ".concat;
                        return [4 /*yield*/, this.getDelegates()];
                    case 6:
                        _e.innerHTML = _f.apply("Delegates: ", [(_l.sent()).join(',')]);
                        _l.label = 7;
                    case 7:
                        if (!full) return [3 /*break*/, 13];
                        (0, utils_1.printLine)();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./autocontract.js')); })];
                    case 8:
                        dumpModule = _l.sent();
                        _h = (_g = dumpModule).dump;
                        return [4 /*yield*/, this.getRoleManager()];
                    case 9: return [4 /*yield*/, _h.apply(_g, [_l.sent(), full])];
                    case 10:
                        _l.sent();
                        (0, utils_1.printLine)();
                        _k = (_j = dumpModule).dump;
                        return [4 /*yield*/, this.getAuthorizer()];
                    case 11: return [4 /*yield*/, _k.apply(_j, [_l.sent(), full])];
                    case 12:
                        _l.sent();
                        _l.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return CoboAccount;
}(ownable_1.BaseOwnable));
var CoboSafeAccount = /** @class */ (function (_super) {
    __extends(CoboSafeAccount, _super);
    function CoboSafeAccount(accountAddr, delegate, safeOwner) {
        if (delegate === void 0) { delegate = null; }
        if (safeOwner === void 0) { safeOwner = null; }
        var _this = _super.call(this, accountAddr, delegate) || this;
        _this.safeOwner = safeOwner;
        return _this;
    }
    CoboSafeAccount.prototype.getSafe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = gnosissafe_1.GnosisSafe.bind;
                        return [4 /*yield*/, this.getOwner()];
                    case 1: return [2 /*return*/, new (_a.apply(gnosissafe_1.GnosisSafe, [void 0, _b.sent(), this.safeOwner]))()];
                }
            });
        });
    };
    CoboSafeAccount.prototype.enable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var safe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSafe()];
                    case 1:
                        safe = _a.sent();
                        return [4 /*yield*/, safe.enableModule(this.contract.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CoboSafeAccount;
}(CoboAccount));
exports.CoboSafeAccount = CoboSafeAccount;
var CoboSmartAccount = /** @class */ (function (_super) {
    __extends(CoboSmartAccount, _super);
    function CoboSmartAccount(accountAddr, delegate) {
        if (delegate === void 0) { delegate = null; }
        return _super.call(this, accountAddr, delegate) || this;
    }
    return CoboSmartAccount;
}(CoboAccount));
exports.CoboSmartAccount = CoboSmartAccount;
