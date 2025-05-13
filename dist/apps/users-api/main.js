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
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const user_schema_1 = __webpack_require__(8);
const users_service_1 = __webpack_require__(11);
const users_controller_1 = __webpack_require__(13);
const environment_1 = __webpack_require__(15);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_1.environment.mongodb.uri),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UserController],
        providers: [app_service_1.AppService, users_service_1.UserService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(7);
const model_1 = __webpack_require__(9);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: model_1.UserRole,
        type: String,
        default: model_1.UserRole.User,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof model_1.UserRole !== "undefined" && model_1.UserRole) === "function" ? _a : Object)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isLoggedIn", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(10), exports);


/***/ }),
/* 10 */
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
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(12);
const model_1 = __webpack_require__(9);
const user_schema_1 = __webpack_require__(8);
let UserService = UserService_1 = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
        this.REVIEWER = {
            email: 'reviewer@reviewer.test',
            firstname: 'Ronald',
            lastname: 'Reviewer',
            role: model_1.UserRole.Reviewer,
            isLoggedIn: false,
        };
        this.DEFAULT_USER = {
            email: 'user@user.test',
            firstname: 'Udo',
            lastname: 'User',
            role: model_1.UserRole.User,
            isLoggedIn: true,
        };
    }
    async onModuleInit() {
        common_1.Logger.warn('User collection only consists of mocked data until an Identity Provider is supplied', UserService_1.name);
        await this.insertManyIfNotExist([this.DEFAULT_USER, this.REVIEWER]);
    }
    async findAll() {
        const users = await this.userModel.find().exec();
        return users.map((user) => ({
            _id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            isLoggedIn: user.isLoggedIn,
        }));
    }
    getLoggedIn() {
        return this.userModel.findOne({ isLoggedIn: true }).exec();
    }
    async logIn(_id) {
        await this.userModel
            .findOneAndUpdate({ isLoggedIn: true }, { isLoggedIn: false })
            .exec();
        return this.userModel
            .findByIdAndUpdate(_id, { isLoggedIn: true }, { new: true })
            .exec();
    }
    async switchUserRole(userId, newRole) {
        return this.userModel
            .findByIdAndUpdate(userId, { role: newRole }, { new: true })
            .exec();
    }
    async insertManyIfNotExist(users) {
        for (const user of users) {
            const uniqueEmails = user.email;
            const existingUser = await this.userModel.findOneAndUpdate({ email: uniqueEmails }, { $setOnInsert: user }, { upsert: true, new: true });
            common_1.Logger.log(`Started conidea-api with user: ${existingUser}`, UserService_1.name);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserController_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(14);
const users_service_1 = __webpack_require__(11);
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers() {
        common_1.Logger.debug('Getting all users', UserController_1.name);
        return this.userService.findAll();
    }
    async getLoggedIn() {
        common_1.Logger.debug('Getting logged in user', UserController_1.name);
        return this.userService.getLoggedIn();
    }
    async logIn({ id }) {
        common_1.Logger.debug(`Logging in User with ID ${id}`, UserController_1.name);
        return this.userService.logIn(id);
    }
    async switchRole({ id, role }) {
        common_1.Logger.debug(`Switching role for User with ID ${id}`, UserController_1.name);
        return this.userService.switchUserRole(id, role);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_users' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_loggedIn' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getLoggedIn", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'log_in' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logIn", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'switch_role' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "switchRole", null);
exports.UserController = UserController = UserController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UserService !== "undefined" && users_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


/**
 * Development environment configuration for users-api
 * This file should not be committed to source control
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    mongodb: {
        uri: 'mongodb://localhost:27017/conidea',
    },
    rabbitmq: {
        url: 'amqp://localhost:5672',
        queue: 'users_queue',
        queueOptions: { durable: false },
    }
};


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
const microservices_1 = __webpack_require__(14);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RMQ || 'amqp://localhost:5672'],
            queue: 'users_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.listen();
    common_1.Logger.log(`🚀 Users microservice is running`);
}
void bootstrap();

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;