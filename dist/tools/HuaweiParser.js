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
function HuaweiParser(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, '..', 'Inputs', `${filename}.txt`);
        const data = yield promises_1.default.readFile(filePath, 'utf8');
        const arrStr = data.split('\n');
        for (let i = 0; i < 8; i++)
            arrStr.splice(0, 1);
        let filterArr = arrStr.filter(item => !item.includes("---") &&
            !item.includes("@") &&
            !item.includes("F/S/P") &&
            !item.includes("'") &&
            !item.includes("In port"));
        filterArr.splice(filterArr.length - 2, 2);
        const arrItems = filterArr.map(item => {
            const campos = item.split(/\s+/g);
            return {
                slot: campos[2][0],
                port: campos[2][2],
                ont_id: campos[3],
                sn: campos[4],
                state: campos[6]
            };
        });
        return arrItems;
    });
}
exports.default = HuaweiParser;
