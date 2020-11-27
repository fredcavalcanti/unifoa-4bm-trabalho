"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var port = process.env.PORT || 3333;
app.get('/', function (req, res) {
    res.json({ msg: 'Hello World' });
});
app.listen(port, function () { return console.log("Servidor Rodando na porta " + port); });
