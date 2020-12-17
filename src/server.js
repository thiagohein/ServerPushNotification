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
        while (_) try {
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
var express_1 = __importDefault(require("express"));
var connection_1 = __importDefault(require("./database/connection"));
var node_fetch_1 = __importDefault(require("node-fetch"));
// import routes from './routes';
// import controller from './controllers/PushNotificationController'
var app = express_1.default();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express_1.default.json());
function showNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var dataToken, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connection_1.default('tb_eventos_abertos')
                            .join('tb_usuarios_push_token', 'tb_eventos_abertos.id_usuario_operador', '=', 'tb_usuarios_push_token.id_usuario')
                            .where('tb_eventos_abertos.fl_notification', Boolean(false))
                            .where('tb_eventos_abertos.fl_abertura_evento', '=', Boolean(true))
                            .select('tb_eventos_abertos.idEventoApp', 'tb_eventos_abertos.id_usuario_operador', 'tb_usuarios_push_token.ds_token', 'tb_eventos_abertos.fl_abertura_evento').orderBy('tb_eventos_abertos.dtEvento', 'asc').first()];
                case 1:
                    dataToken = _a.sent();
                    if (dataToken === undefined) {
                        return [2 /*return*/, console.log('Sem notificações para serem enviadas!')];
                    }
                    console.log(dataToken);
                    sendToPushNotification(dataToken.idEventoApp, dataToken.id_usuario_operador, dataToken.ds_token, dataToken.fl_abertura_evento);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function endNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var dataToken, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connection_1.default('tb_eventos_encerrados')
                            .join('tb_usuarios_push_token', 'tb_eventos_encerrados.id_usuario_operador', '=', 'tb_usuarios_push_token.id_usuario')
                            .where('tb_eventos_encerrados.fl_notification', Boolean(false))
                            .select('tb_eventos_encerrados.idEventoApp', 'tb_eventos_encerrados.id_usuario_operador', 'tb_usuarios_push_token.ds_token', 'tb_eventos_encerrados.fl_encerrado').orderBy('tb_eventos_encerrados.dtEvento', 'asc').first()];
                case 1:
                    dataToken = _a.sent();
                    if (dataToken === undefined) {
                        return [2 /*return*/, console.log('Sem notificações para serem enviadas!')];
                    }
                    console.log(dataToken);
                    sendToEndPushNotification(dataToken.idEventoApp, dataToken.id_usuario_operador, dataToken.ds_token, dataToken.fl_encerrado);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateFlNotifications(idEventoApp, idUsuarioAgente) {
    return __awaiter(this, void 0, void 0, function () {
        var updateNotification, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connection_1.default('tb_eventos_abertos')
                            .where('id_usuario_operador', '=', Number(idUsuarioAgente))
                            .where('idEventoApp', '=', Number(idEventoApp))
                            .update({
                            fl_notification: Boolean(true),
                        })];
                case 1:
                    updateNotification = _a.sent();
                    if (updateNotification == undefined) {
                        console.log('Erro ao fazer update! ', idEventoApp);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function sendToPushNotification(idEventoApp, idUsuarioAgente, token, flAberturaEvento) {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            0;
            try {
                message = {
                    //to: `${'ExponentPushToken[TSab8oFFe2d6-ztfXU5fM_]'}`,
                    to: "" + token,
                    sound: 'default',
                    title: 'App Pronta Resposta',
                    //body : flAberturaEvento ? 'Novo Evento' : 'Evento Encerrado',
                    body: 'Novo Evento',
                    data: { data: 'goes here' },
                };
                node_fetch_1.default('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Accept-encoding': 'gzip, deflate',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message),
                }).then(function (response) {
                    if (response.status === 200) {
                        console.log(response.status);
                        updateFlNotifications(idEventoApp, idUsuarioAgente);
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
function updateEndFlNotifications(idEventoApp, idUsuarioAgente) {
    return __awaiter(this, void 0, void 0, function () {
        var updateNotification, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connection_1.default('tb_eventos_encerrados')
                            .where('id_usuario_operador', '=', Number(idUsuarioAgente))
                            .where('idEventoApp', '=', Number(idEventoApp))
                            .update({
                            fl_notification: Boolean(true),
                        })];
                case 1:
                    updateNotification = _a.sent();
                    if (updateNotification == undefined) {
                        console.log('Erro ao fazer update! ', idEventoApp);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function sendToEndPushNotification(idEventoApp, idUsuarioAgente, token, fl_encerrado) {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            0;
            try {
                message = {
                    //to: `${'ExponentPushToken[TSab8oFFe2d6-ztfXU5fM_]'}`,
                    to: "" + token,
                    sound: 'default',
                    title: 'App Pronta Resposta',
                    //body : flAberturaEvento ? 'Novo Evento' : 'Evento Encerrado',
                    body: 'Evento Encerrado',
                    data: { data: 'goes here' },
                };
                node_fetch_1.default('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Accept-encoding': 'gzip, deflate',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message),
                }).then(function (response) {
                    if (response.status === 200) {
                        console.log(response.status);
                        updateEndFlNotifications(idEventoApp, idUsuarioAgente);
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
setInterval(function () {
    showNotification();
    endNotification();
}, 10000);
//setInterval(showNotification,10000)
app.listen(3334);
