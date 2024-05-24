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
exports.ArgusRootAuthorizer = exports.BaseAuthorizer = void 0;
var utils_js_1 = require("./utils.js");
var ownable_js_1 = require("./ownable.js");
var subclasses_js_1 = require("./subclasses.js");
var account_js_1 = require("./account.js");
var rolemanager_js_1 = require("./rolemanager.js");
function getSymbol(addr) {
    if (addr.toLowerCase() === utils_js_1.ETH_ADDRESS.toLowerCase()) {
        return "ETH(".concat(addr, ")");
    }
    try {
        return "".concat(new ownable_js_1.ERC20(addr).symbol, "(").concat(addr, ")");
    }
    catch (error) {
        return addr;
    }
}
var BaseAuthorizer = /** @class */ (function (_super) {
    __extends(BaseAuthorizer, _super);
    function BaseAuthorizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseAuthorizer.prototype.getCaller = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.caller()];
                    case 1: // help is this allowed to be null
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseAuthorizer.prototype.getTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = utils_js_1.s32;
                        return [4 /*yield*/, this.contract.tag()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseAuthorizer.prototype.getFlag = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.flag()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseAuthorizer.prototype.getFlagStr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var flag, flags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFlag()];
                    case 1:
                        flag = _a.sent();
                        flags = [];
                        if ((flag & BaseAuthorizer.HAS_PRE_CHECK_MASK) > 0) {
                            flags.push("PreCheck");
                        }
                        if ((flag & BaseAuthorizer.HAS_POST_CHECK_MASK) > 0) {
                            flags.push("PostCheck");
                        }
                        if ((flag & BaseAuthorizer.HAS_PRE_PROC_MASK) > 0) {
                            flags.push("PreProcess");
                        }
                        if ((flag & BaseAuthorizer.HAS_POST_PROC_MASK) > 0) {
                            flags.push("PostProcess");
                        }
                        if ((flag & BaseAuthorizer.SUPPORT_HINT_MASK) > 0) {
                            flags.push("SupportHint");
                        }
                        return [2 /*return*/, flags.join(",")];
                }
            });
        });
    };
    BaseAuthorizer.prototype.getType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = utils_js_1.s32;
                        return [4 /*yield*/, this.contract.TYPE()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        error_2 = _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseAuthorizer.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var callerElement, caller, error_3, flagsElement, flags, error_4, typeElement, type, error_5, tagElement, tag, error_6;
            if (full === void 0) { full = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _a.sent();
                        callerElement = document.getElementById('caller');
                        if (!callerElement) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.getCaller()];
                    case 3:
                        caller = _a.sent();
                        callerElement.innerText = "Caller: ".concat(caller);
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.error("Error:", error_3);
                        return [3 /*break*/, 5];
                    case 5:
                        flagsElement = document.getElementById('flags');
                        if (!flagsElement) return [3 /*break*/, 9];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.getFlagStr()];
                    case 7:
                        flags = _a.sent();
                        flagsElement.innerText = "Flags: ".concat(flags);
                        return [3 /*break*/, 9];
                    case 8:
                        error_4 = _a.sent();
                        console.error("Error:", error_4);
                        return [3 /*break*/, 9];
                    case 9:
                        typeElement = document.getElementById('type');
                        if (!typeElement) return [3 /*break*/, 13];
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.getType()];
                    case 11:
                        type = _a.sent();
                        typeElement.innerText = "Type: ".concat(type);
                        return [3 /*break*/, 13];
                    case 12:
                        error_5 = _a.sent();
                        console.error("Error:", error_5);
                        return [3 /*break*/, 13];
                    case 13:
                        tagElement = document.getElementById('tag');
                        if (!tagElement) return [3 /*break*/, 17];
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, this.getTag()];
                    case 15:
                        tag = _a.sent();
                        tagElement.innerText = "Tag: ".concat(tag);
                        return [3 /*break*/, 17];
                    case 16:
                        error_6 = _a.sent();
                        console.error("Error:", error_6);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    // Flags
    BaseAuthorizer.HAS_PRE_CHECK_MASK = 0x1;
    BaseAuthorizer.HAS_POST_CHECK_MASK = 0x2;
    BaseAuthorizer.HAS_PRE_PROC_MASK = 0x4;
    BaseAuthorizer.HAS_POST_PROC_MASK = 0x8;
    BaseAuthorizer.SUPPORT_HINT_MASK = 0x40;
    return BaseAuthorizer;
}(ownable_js_1.BaseOwnable));
exports.BaseAuthorizer = BaseAuthorizer;
(0, subclasses_js_1.registerSubclass)('BaseAuthorizer', BaseAuthorizer);
var ArgusRootAuthorizer = /** @class */ (function (_super) {
    __extends(ArgusRootAuthorizer, _super);
    function ArgusRootAuthorizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgusRootAuthorizer.prototype.getRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roleList, uniqueRoles, roles, error_7, caller, callerName, roleManager, _a, roles, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        roleList = [];
                        uniqueRoles = {};
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.contract.getAllRoles()];
                    case 2:
                        roles = _b.sent();
                        roles.forEach(function (role) {
                            var roleStr = (0, utils_js_1.s32)(role);
                            if (!uniqueRoles[roleStr]) {
                                uniqueRoles[roleStr] = true;
                                roleList.push(roleStr);
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _b.sent();
                        console.error("Error:", error_7);
                        return [3 /*break*/, 4];
                    case 4:
                        _b.trys.push([4, 10, , 11]);
                        return [4 /*yield*/, this.getCaller()];
                    case 5:
                        caller = _b.sent();
                        return [4 /*yield*/, new ownable_js_1.BaseOwnable(caller).getName()];
                    case 6:
                        callerName = _b.sent();
                        if (!(callerName === "CoboSafeAccount" || callerName === "CoboSmartAccount")) return [3 /*break*/, 9];
                        _a = rolemanager_js_1.FlatRoleManager.bind;
                        return [4 /*yield*/, new account_js_1.CoboSafeAccount(caller).getRoleManager()];
                    case 7:
                        roleManager = new (_a.apply(rolemanager_js_1.FlatRoleManager, [void 0, _b.sent()]))();
                        return [4 /*yield*/, roleManager.getAllRoles()];
                    case 8:
                        roles = _b.sent();
                        roles.forEach(function (role) {
                            if (!uniqueRoles[role]) {
                                uniqueRoles[role] = true;
                                roleList.push(role);
                            }
                        });
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_8 = _b.sent();
                        console.error("Error:", error_8);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/, roleList];
                }
            });
        });
    };
    ArgusRootAuthorizer.prototype.getDelegates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var delegateToRole, caller, _a, roleManager, delegateList, _i, delegateList_1, delegate, roles, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        delegateToRole = {};
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, this.getCaller()];
                    case 2:
                        caller = _b.sent();
                        return [4 /*yield*/, new ownable_js_1.BaseOwnable(caller).getName()];
                    case 3:
                        _a = (_b.sent()) == "CoboSafeAccount";
                        if (_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, new ownable_js_1.BaseOwnable(caller).getName()];
                    case 4:
                        _a = (_b.sent()) == "CoboSmartAccount";
                        _b.label = 5;
                    case 5:
                        if (!_a) return [3 /*break*/, 10];
                        roleManager = new rolemanager_js_1.FlatRoleManager(new account_js_1.CoboSafeAccount(caller).getRoleManager);
                        return [4 /*yield*/, roleManager.getAllDelegates()];
                    case 6:
                        delegateList = _b.sent();
                        _i = 0, delegateList_1 = delegateList;
                        _b.label = 7;
                    case 7:
                        if (!(_i < delegateList_1.length)) return [3 /*break*/, 10];
                        delegate = delegateList_1[_i];
                        return [4 /*yield*/, roleManager.getRoles(delegate)];
                    case 8:
                        roles = _b.sent();
                        delegateToRole[delegate] = roles.map(function (role) { return (0, utils_js_1.s32)(role); }).join(",");
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_9 = _b.sent();
                        console.error("Error:", error_9);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, delegateToRole];
                }
            });
        });
    };
    ArgusRootAuthorizer.prototype.getAuthorizers = function (role_1) {
        return __awaiter(this, arguments, void 0, function (role, delegatecall) {
            var error_10;
            if (delegatecall === void 0) { delegatecall = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.contract.getAllAuthorizers(delegatecall, role)];
                    case 1: return [2 /*return*/, _a.sent()]; // make sure role is encoded
                    case 2:
                        error_10 = _a.sent();
                        console.error("Error:", error_10);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArgusRootAuthorizer.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var authorizersElement, delegatesElement, addr, addrs, roles, i, role, auths, j, authStrings, j, auth, name_1, delegates, delegate, _i, addrs_1, addr_1, error_11;
            if (full === void 0) { full = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _a.sent();
                        authorizersElement = document.getElementById('authorizers');
                        delegatesElement = document.getElementById('delegates');
                        if (!(authorizersElement && delegatesElement)) return [3 /*break*/, 14];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 13, , 14]);
                        addr = this.contract.address;
                        authorizersElement.innerHTML = "Authorizers:<br>";
                        delegatesElement.innerHTML = "Delegates:<br>";
                        addrs = [];
                        return [4 /*yield*/, this.getRoles()];
                    case 3:
                        roles = _a.sent();
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < roles.length)) return [3 /*break*/, 11];
                        role = roles[i];
                        return [4 /*yield*/, this.getAuthorizers(role)];
                    case 5:
                        auths = _a.sent();
                        // Use for loop instead of spread operator
                        for (j = 0; j < auths.length; j++) {
                            addrs.push(auths[j]);
                        }
                        authStrings = [];
                        j = 0;
                        _a.label = 6;
                    case 6:
                        if (!(j < auths.length)) return [3 /*break*/, 9];
                        auth = auths[j];
                        return [4 /*yield*/, new ownable_js_1.BaseOwnable(auth).getName()];
                    case 7:
                        name_1 = (_a.sent()) || "";
                        authStrings.push(name_1 + "(" + auth + ")");
                        _a.label = 8;
                    case 8:
                        j++;
                        return [3 /*break*/, 6];
                    case 9:
                        authorizersElement.innerHTML += "&nbsp;&nbsp;" + role + ": " + authStrings.join(", ") + "<br>";
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 4];
                    case 11: return [4 /*yield*/, this.getDelegates()];
                    case 12:
                        delegates = _a.sent();
                        for (delegate in delegates) {
                            delegatesElement.innerHTML += "&nbsp;&nbsp;".concat(delegate, ": ").concat(delegates[delegate], "<br>");
                        }
                        if (full) {
                            for (_i = 0, addrs_1 = addrs; _i < addrs_1.length; _i++) {
                                addr_1 = addrs_1[_i];
                                // await console.logline();
                                // Assuming the "dump" function is async
                                // await dump(addr, full);
                            }
                        }
                        return [3 /*break*/, 14];
                    case 13:
                        error_11 = _a.sent();
                        console.error("Error:", error_11);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return ArgusRootAuthorizer;
}(BaseAuthorizer));
exports.ArgusRootAuthorizer = ArgusRootAuthorizer;
(0, subclasses_js_1.registerSubclass)('ArgusRootAuthorizer', ArgusRootAuthorizer);
var TransferAuthorizer = /** @class */ (function (_super) {
    __extends(TransferAuthorizer, _super);
    function TransferAuthorizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferAuthorizer.prototype.getTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getAllToken()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TransferAuthorizer.prototype.getReceivers = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getTokenReceivers(token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TransferAuthorizer.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var tokenReceiversElement, _i, _a, token, receivers, tokenSymbol;
            if (full === void 0) { full = false; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _b.sent();
                        tokenReceiversElement = document.getElementById('token-receivers');
                        if (!tokenReceiversElement) return [3 /*break*/, 6];
                        tokenReceiversElement.innerHTML = "Token -> Receivers:<br>";
                        _i = 0;
                        return [4 /*yield*/, this.getTokens()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        token = _a[_i];
                        return [4 /*yield*/, this.getReceivers(token)];
                    case 4:
                        receivers = _b.sent();
                        tokenSymbol = getSymbol(token);
                        tokenReceiversElement.innerHTML += "".concat(tokenSymbol, ": ").concat(receivers.join(","), "<br>");
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TransferAuthorizer.TYPE = "TransferType";
    return TransferAuthorizer;
}(BaseAuthorizer));
(0, subclasses_js_1.registerSubclass)('TransferAuthorizer', TransferAuthorizer);
var FuncAuthorizer = /** @class */ (function (_super) {
    __extends(FuncAuthorizer, _super);
    function FuncAuthorizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FuncAuthorizer.prototype.getContracts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getAllContracts()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FuncAuthorizer.prototype.getFuncs = function (contract) {
        return __awaiter(this, void 0, void 0, function () {
            var funcs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getFuncsByContract(contract)];
                    case 1:
                        funcs = _a.sent();
                        return [2 /*return*/, funcs.map(function (f) { return "0x" + f.hex().slice(0, 8); })];
                }
            });
        });
    };
    FuncAuthorizer.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var contractFunctionsElement, _i, _a, contract, funcs;
            if (full === void 0) { full = false; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _b.sent();
                        contractFunctionsElement = document.getElementById('contract-functions');
                        if (!contractFunctionsElement) return [3 /*break*/, 6];
                        contractFunctionsElement.innerHTML = "Contract -> Functions:<br>";
                        _i = 0;
                        return [4 /*yield*/, this.getContracts()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        contract = _a[_i];
                        return [4 /*yield*/, this.getFuncs(contract)];
                    case 4:
                        funcs = _b.sent();
                        contractFunctionsElement.innerHTML += "".concat(contract, ": ").concat(funcs.join(","), "<br>");
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FuncAuthorizer.TYPE = "FunctionType";
    return FuncAuthorizer;
}(BaseAuthorizer));
(0, subclasses_js_1.registerSubclass)('FuncAuthorizer', FuncAuthorizer);
var BaseACL = /** @class */ (function (_super) {
    __extends(BaseACL, _super);
    function BaseACL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseACL.prototype.getContracts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.contracts()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseACL.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var contractsElement, _a, _b;
            if (full === void 0) { full = false; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _c.sent();
                        contractsElement = document.getElementById('contracts');
                        if (!contractsElement) return [3 /*break*/, 3];
                        contractsElement.innerHTML = "Contracts:<br>";
                        _a = contractsElement;
                        _b = _a.innerHTML;
                        return [4 /*yield*/, this.getContracts()];
                    case 2:
                        _a.innerHTML = _b + ((_c.sent()).join(",") + "<br>");
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseACL.TYPE = "CommonType";
    return BaseACL;
}(BaseAuthorizer));
(0, subclasses_js_1.registerSubclass)('BaseACL', BaseACL);
var DEXBaseACL = /** @class */ (function (_super) {
    __extends(DEXBaseACL, _super);
    function DEXBaseACL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DEXBaseACL.prototype.getInTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getSwapInTokens()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DEXBaseACL.prototype.getOutTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getSwapOutTokens()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DEXBaseACL.prototype.getInTokenSymbols = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInTokens()];
                    case 1: return [2 /*return*/, (_a.sent()).map(getSymbol)];
                }
            });
        });
    };
    DEXBaseACL.prototype.getOutTokenSymbols = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOutTokens()];
                    case 1: return [2 /*return*/, (_a.sent()).map(getSymbol)];
                }
            });
        });
    };
    DEXBaseACL.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var inTokensElement, outTokensElement, _a, _b, _c, _d;
            if (full === void 0) { full = false; }
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _e.sent();
                        inTokensElement = document.getElementById('in-tokens');
                        outTokensElement = document.getElementById('out-tokens');
                        if (!(inTokensElement && outTokensElement)) return [3 /*break*/, 4];
                        inTokensElement.innerHTML = "In tokens:<br>";
                        outTokensElement.innerHTML = "Out tokens:<br>";
                        _a = inTokensElement;
                        _b = _a.innerHTML;
                        return [4 /*yield*/, this.getInTokenSymbols()];
                    case 2:
                        _a.innerHTML = _b + ((_e.sent()).join(",") + "<br>");
                        _c = outTokensElement;
                        _d = _c.innerHTML;
                        return [4 /*yield*/, this.getOutTokenSymbols()];
                    case 3:
                        _c.innerHTML = _d + ((_e.sent()).join(",") + "<br>");
                        _e.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DEXBaseACL.TYPE = "DexType";
    return DEXBaseACL;
}(BaseACL));
(0, subclasses_js_1.registerSubclass)('DEXBaseACL', DEXBaseACL);
var FarmingBaseACL = /** @class */ (function (_super) {
    __extends(FarmingBaseACL, _super);
    function FarmingBaseACL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FarmingBaseACL.prototype.getWhitelistIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getPoolIdWhiteList()];
                    case 1: return [2 /*return*/, (_a.sent()).map(String)];
                }
            });
        });
    };
    FarmingBaseACL.prototype.getWhitelistAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.getPoolAddressWhiteList()];
                    case 1: return [2 /*return*/, (_a.sent()).map(String)];
                }
            });
        });
    };
    FarmingBaseACL.prototype.dump = function () {
        return __awaiter(this, arguments, void 0, function (full) {
            var whitelistIdsElement, whitelistAddressesElement, _a, _b, _c, _d;
            if (full === void 0) { full = false; }
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, _super.prototype.dump.call(this, full)];
                    case 1:
                        _e.sent();
                        whitelistIdsElement = document.getElementById('whitelist-ids');
                        whitelistAddressesElement = document.getElementById('whitelist-addresses');
                        if (!(whitelistIdsElement && whitelistAddressesElement)) return [3 /*break*/, 4];
                        whitelistIdsElement.innerHTML = "Whitelist IDs:<br>";
                        whitelistAddressesElement.innerHTML = "Whitelist addresses:<br>";
                        _a = whitelistIdsElement;
                        _b = _a.innerHTML;
                        return [4 /*yield*/, this.getWhitelistIds()];
                    case 2:
                        _a.innerHTML = _b + ((_e.sent()).join(", ") + "<br>");
                        _c = whitelistAddressesElement;
                        _d = _c.innerHTML;
                        return [4 /*yield*/, this.getWhitelistAddresses()];
                    case 3:
                        _c.innerHTML = _d + ((_e.sent()).join(", ") + "<br>");
                        _e.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FarmingBaseACL.TYPE = "CommonType";
    return FarmingBaseACL;
}(BaseACL));
(0, subclasses_js_1.registerSubclass)('FarmingBaseACL', FarmingBaseACL);
