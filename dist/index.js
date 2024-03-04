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
const express_1 = __importDefault(require("express"));
const HuaweiParser_1 = __importDefault(require("./tools/HuaweiParser"));
const ZteParser_1 = __importDefault(require("./tools/ZteParser"));
const app = (0, express_1.default)();
// Sera um post (mas para teste estarei usando um get para visualizar)
app.get('/data', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Ler arquivos estaticamente
    const DataHuawei = yield (0, HuaweiParser_1.default)('OntInfo - Huawei');
    const DataZte = yield (0, ZteParser_1.default)('OntInfo - ZTE - SNs', 'OntInfo - ZTE - SNs - State');
    response.send({
        DataHuawei,
        DataZte
    });
    // Salvar no banco de dados
}));
// app.get('/data', (request, response) => {
//   // Recuperar dados do banco e enviar para o front
// });
app.listen(5000, () => console.log('Servidor rodando na porta: 5000'));
