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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function ZteParser(filename_SN, filename_State) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath_SN = path_1.default.join(__dirname, '..', 'Inputs', `${filename_SN}.txt`);
        const dataSN = yield promises_1.default.readFile(filePath_SN, 'utf8');
        const filePath_State = path_1.default.join(__dirname, '..', 'Inputs', `${filename_State}.txt`);
        const dataState = yield promises_1.default.readFile(filePath_State, 'utf8');
        const arrSN = dataSN.split('\n');
        let filterArrSN = arrSN.filter(item => !item.includes("---") &&
            !item.includes("OnuIndex"));
        const arrItemsSN = filterArrSN.map(item => {
            const campos = item.split(/\s+/g);
            return {
                slot: campos[0][11],
                port: campos[0][13],
                ont_id: campos[0][15],
                sn: campos[3]
            };
        });
        const arrState = dataState.split('\n');
        let filterArrState = arrState.filter(item => !item.includes("#show") &&
            !item.includes("---") &&
            !item.includes("OnuIndex"));
        const arrItemsState = filterArrState.map(item => {
            const campos = item.split(/\s+/g);
            return {
                slot: campos[0][2],
                port: campos[0][4],
                ont_id: campos[0][6],
                status: campos[3]
            };
        });
        function findMatchingItem(snItem, stateItems) {
            return stateItems.find(stateItem => snItem.slot === stateItem.slot &&
                snItem.port === stateItem.port &&
                snItem.ont_id === stateItem.ont_id);
        }
        const combinedItems = arrItemsSN.map(snItem => {
            var _a;
            const matchingStateItem = findMatchingItem(snItem, arrItemsState);
            if (matchingStateItem) {
                if (matchingStateItem.status === "working")
                    matchingStateItem.status = "online";
                return {
                    slot: snItem.slot,
                    port: snItem.port,
                    ont_id: snItem.ont_id,
                    sn: (_a = snItem.sn) === null || _a === void 0 ? void 0 : _a.replace("SN:", ""),
                    state: matchingStateItem.status
                };
            }
            else {
                return Object.assign(Object.assign({}, snItem), { state: undefined });
            }
        });
        return combinedItems;
    });
}
exports.default = ZteParser;
