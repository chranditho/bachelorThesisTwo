/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const ideas_module_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(12);
const users_module_1 = __webpack_require__(13);
const drafts_module_1 = __webpack_require__(16);
const environment_1 = __webpack_require__(18);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_1.environment.mongodb.uri),
            ideas_module_1.IdeasModule,
            users_module_1.UsersModule,
            drafts_module_1.DraftsModule,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const ideas_controller_1 = __webpack_require__(6);
const ideas_service_1 = __webpack_require__(7);
let IdeasModule = class IdeasModule {
};
exports.IdeasModule = IdeasModule;
exports.IdeasModule = IdeasModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [ideas_controller_1.IdeasController],
        providers: [ideas_service_1.IdeasService],
    })
], IdeasModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var IdeasController_1;
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const ideas_service_1 = __webpack_require__(7);
const model_1 = __webpack_require__(10);
let IdeasController = IdeasController_1 = class IdeasController {
    constructor(ideasService) {
        this.ideasService = ideasService;
    }
    findAll() {
        common_1.Logger.log('Getting all ideas', IdeasController_1.name);
        return this.ideasService.findAll();
    }
    async create(createIdeaDto) {
        try {
            common_1.Logger.log(`Creating new Idea: ${createIdeaDto.title} ${createIdeaDto.description}`, IdeasController_1.name);
            common_1.Logger.debug(createIdeaDto);
            await this.ideasService.create(createIdeaDto);
            const successMessage = 'Idea created successfully!';
            common_1.Logger.warn(successMessage, IdeasController_1.name);
            return { message: successMessage };
        }
        catch (error) {
            common_1.Logger.error(`Error creating new idea: ${error.message || 'Invalid idea'}`, IdeasController_1.name);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Bad Request: Invalid Idea',
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }
    async updateStatus(changeStatusDto) {
        return this.ideasService.updateStatus(changeStatusDto);
    }
    async addComment(createCommentDto) {
        return this.ideasService.addComment(createCommentDto);
    }
};
exports.IdeasController = IdeasController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], IdeasController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Post)('new'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof model_1.CreateIdeaDto !== "undefined" && model_1.CreateIdeaDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], IdeasController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)('update'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof model_1.ChangeStatusDto !== "undefined" && model_1.ChangeStatusDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], IdeasController.prototype, "updateStatus", null);
tslib_1.__decorate([
    (0, common_1.Post)('comment'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof model_1.CreateCommentDto !== "undefined" && model_1.CreateCommentDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], IdeasController.prototype, "addComment", null);
exports.IdeasController = IdeasController = IdeasController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('ideas'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ideas_service_1.IdeasService !== "undefined" && ideas_service_1.IdeasService) === "function" ? _a : Object])
], IdeasController);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
const rxjs_1 = __webpack_require__(9);
let IdeasService = class IdeasService {
    constructor() {
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'ideas_queue',
                queueOptions: { durable: false },
            },
        });
    }
    async findAll() {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'get_all_ideas' }, {}));
    }
    async create(createIdeaDto) {
        await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_idea' }, createIdeaDto));
    }
    async updateStatus(changeStatusDto) {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_status' }, changeStatusDto));
    }
    async addComment(createCommentDto) {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'add_comment' }, createCommentDto));
    }
};
exports.IdeasService = IdeasService;
exports.IdeasService = IdeasService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], IdeasService);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(11), exports);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRole = exports.Status = void 0;
exports.model = model;
function model() {
    return 'model';
}
var Status;
(function (Status) {
    Status["Draft"] = "Draft";
    Status["Submitted"] = "Submitted";
    Status["InReview"] = "In Review";
    Status["Accepted"] = "Accepted";
    Status["Rejected"] = "Rejected";
    Status["Finished"] = "Finished";
})(Status || (exports.Status = Status = {}));
var UserRole;
(function (UserRole) {
    UserRole["User"] = "User";
    UserRole["Reviewer"] = "Reviewer";
})(UserRole || (exports.UserRole = UserRole = {}));


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_controller_1 = __webpack_require__(14);
const users_service_1 = __webpack_require__(15);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UserController],
        providers: [users_service_1.UserService],
    })
], UsersModule);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_service_1 = __webpack_require__(15);
const model_1 = __webpack_require__(10);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAll() {
        return this.userService.findAll();
    }
    getLoggedIn() {
        return this.userService.getLoggedIn();
    }
    login(id, test) {
        common_1.Logger.log(`Logging in User with ID ${id} ${test}`, common_1.Controller.name);
        return this.userService.logIn(id);
    }
    switchRole(id, role) {
        return this.userService.switchUserRole(id, role);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('/current'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "getLoggedIn", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id/login'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)('test')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id/role'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)('role')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof model_1.UserRole !== "undefined" && model_1.UserRole) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "switchRole", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UserService !== "undefined" && users_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
const rxjs_1 = __webpack_require__(9);
let UserService = class UserService {
    constructor() {
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'users_queue',
                queueOptions: { durable: false },
            },
        });
    }
    async findAll() {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'get_all_users' }, {}));
    }
    async getLoggedIn() {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'get_loggedIn' }, {}));
    }
    async logIn(id) {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'log_in' }, { id }));
    }
    async switchUserRole(id, role) {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'switch_role' }, { id, role }));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], UserService);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DraftsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const drafts_controller_1 = __webpack_require__(17);
const mongoose_1 = __webpack_require__(12);
const draft_schema_1 = __webpack_require__(19);
let DraftsModule = class DraftsModule {
};
exports.DraftsModule = DraftsModule;
exports.DraftsModule = DraftsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: draft_schema_1.Draft.name, schema: draft_schema_1.DraftSchema }]),
        ],
        controllers: [drafts_controller_1.DraftsController],
    })
], DraftsModule);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DraftsController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DraftsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const model_1 = __webpack_require__(10);
const microservices_1 = __webpack_require__(8);
const rxjs_1 = __webpack_require__(9);
const environment_1 = __webpack_require__(18);
let DraftsController = DraftsController_1 = class DraftsController {
    constructor() {
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [environment_1.environment.rabbitmq.url],
                queue: environment_1.environment.rabbitmq.queue,
                queueOptions: environment_1.environment.rabbitmq.queueOptions,
            },
        });
    }
    async create(createIdeaDto) {
        common_1.Logger.log(`Creating new Draft:  ${createIdeaDto.title} ${createIdeaDto.description}`, DraftsController_1.name);
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_draft' }, createIdeaDto));
    }
    findAll() {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'get_all_drafts' }, {}));
    }
    update(id, updateDraftDto) {
        return (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_draft' }, { id, updateDraftDto }));
    }
    remove(id) {
        return this.client.send({ cmd: 'delete_draft' }, { id });
    }
};
exports.DraftsController = DraftsController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof model_1.CreateIdeaDto !== "undefined" && model_1.CreateIdeaDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DraftsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DraftsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof model_1.UpdateDraftDto !== "undefined" && model_1.UpdateDraftDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DraftsController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], DraftsController.prototype, "remove", null);
exports.DraftsController = DraftsController = DraftsController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('drafts'),
    tslib_1.__metadata("design:paramtypes", [])
], DraftsController);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


/**
 * Development environment configuration for conidea-api
 * This file should not be committed to source control
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    port: 3000,
    mongodb: {
        uri: 'mongodb://localhost:27017/conidea',
    },
    rabbitmq: {
        url: 'amqp://localhost:5672',
        queue: 'ideas_queue',
        queueOptions: { durable: false },
    },
    cors: {
        origin: '*',
    }
};


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DraftSchema = exports.Draft = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(12);
const mongoose_2 = __webpack_require__(20);
let Draft = class Draft {
};
exports.Draft = Draft;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    tslib_1.__metadata("design:type", String)
], Draft.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Draft.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Draft.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date, default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Draft.prototype, "createdAt", void 0);
exports.Draft = Draft = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Draft);
exports.DraftSchema = mongoose_1.SchemaFactory.createForClass(Draft);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(21);
const environment_1 = __webpack_require__(18);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('ConIdea API')
        .setDescription('The API provides access to data and operations')
        .setVersion('1.0')
        .addTag(globalPrefix)
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(globalPrefix, app, documentFactory);
    app.enableCors({
        origin: environment_1.environment.cors.origin,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });
    const port = environment_1.environment.port;
    await app.listen(port);
    common_1.Logger.log(`🚀 conidea-api is running on port ${port} with prefix /${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;