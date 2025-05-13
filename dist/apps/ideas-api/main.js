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
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const ideas_controller_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(8);
const status_transition_validator_service_1 = __webpack_require__(12);
const ideas_service_1 = __webpack_require__(7);
const ideas_schema_1 = __webpack_require__(13);
const drafts_controller_1 = __webpack_require__(14);
const drafts_service_1 = __webpack_require__(15);
const environment_1 = __webpack_require__(16);
const user_schema_1 = __webpack_require__(17);
let IdeasModule = class IdeasModule {
};
exports.IdeasModule = IdeasModule;
exports.IdeasModule = IdeasModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_1.environment.mongodb.uri),
            mongoose_1.MongooseModule.forFeature([{ name: ideas_schema_1.Idea.name, schema: ideas_schema_1.IdeaSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [ideas_controller_1.IdeasController, drafts_controller_1.DraftsController],
        providers: [ideas_service_1.IdeasService, status_transition_validator_service_1.StatusTransitionValidatorService, drafts_service_1.DraftsService],
    })
], IdeasModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const ideas_service_1 = __webpack_require__(7);
const microservices_1 = __webpack_require__(3);
const model_1 = __webpack_require__(10);
let IdeasController = class IdeasController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllIdeas() {
        return this.userService.findAll();
    }
    async createIdea(createIdeaDto) {
        console.log('Creating new Idea:', createIdeaDto);
        await this.userService.create(createIdeaDto);
        return { success: true };
    }
    async updateStatus(changeStatusDto) {
        return this.userService.updateStatus(changeStatusDto);
    }
    async addComment(createCommentDto) {
        return this.userService.addComment(createCommentDto);
    }
    async submitDraft(createDraftDto) {
        return this.userService.submitDraft(createDraftDto);
    }
};
exports.IdeasController = IdeasController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_ideas' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], IdeasController.prototype, "getAllIdeas", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_idea' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof model_1.CreateIdeaDto !== "undefined" && model_1.CreateIdeaDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IdeasController.prototype, "createIdea", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_status' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof model_1.ChangeStatusDto !== "undefined" && model_1.ChangeStatusDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IdeasController.prototype, "updateStatus", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'add_comment' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof model_1.CreateCommentDto !== "undefined" && model_1.CreateCommentDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IdeasController.prototype, "addComment", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'submit_draft' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof model_1.CreateDraftDto !== "undefined" && model_1.CreateDraftDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IdeasController.prototype, "submitDraft", null);
exports.IdeasController = IdeasController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ideas_service_1.IdeasService !== "undefined" && ideas_service_1.IdeasService) === "function" ? _a : Object])
], IdeasController);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var IdeasService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(8);
const mongoose_2 = __webpack_require__(9);
const model_1 = __webpack_require__(10);
const status_transition_validator_service_1 = __webpack_require__(12);
const ideas_schema_1 = __webpack_require__(13);
let IdeasService = IdeasService_1 = class IdeasService {
    constructor(ideaModel) {
        this.ideaModel = ideaModel;
    }
    async findAll() {
        const ideas = await this.ideaModel
            .find({ status: { $ne: model_1.Status.Draft } })
            .exec();
        return ideas.map((idea) => {
            const dto = {
                _id: idea.id,
                title: idea.title,
                description: idea.description,
                status: idea.status,
                author: {
                    userId: idea.author.id,
                    name: idea.author.name,
                },
                comments: idea.comments,
                createdAt: idea.createdAt,
            };
            return dto;
        });
    }
    async create(createIdeaDto) {
        try {
            await this.ideaModel.create({
                ...createIdeaDto,
                author: createIdeaDto.author,
            });
        }
        catch (error) {
            common_1.Logger.error(error, IdeasService_1.name);
        }
    }
    async updateStatus(changeStatusDto) {
        await this.checkForValidTransition(changeStatusDto);
        return this.ideaModel
            .findByIdAndUpdate(changeStatusDto.ideaId, { status: changeStatusDto.status }, { new: true })
            .exec();
    }
    async checkForValidTransition(changeStatusDto) {
        const idea = await this.getIdea(changeStatusDto.ideaId);
        const validTransition = status_transition_validator_service_1.StatusTransitionValidatorService.checkStatusTransitionValidity(idea.status, changeStatusDto.status);
        if (!validTransition) {
            throw new common_1.BadRequestException(`Invalid status transition from ${idea.status} to ${changeStatusDto.status}`);
        }
    }
    async addComment(createCommentDto) {
        await this.ideaModel.updateOne({ _id: createCommentDto.ideaId }, { $push: { comments: createCommentDto.comment } });
        return this.ideaModel.findById(createCommentDto.ideaId);
    }
    async submitDraft(createDraftDto) {
        return await this.createFromDraft(createDraftDto);
    }
    async getIdea(id) {
        return this.ideaModel.findById(id).orFail(() => {
            throw new common_1.NotFoundException('Idea not found');
        });
    }
    async createFromDraft(createDraftDto) {
        try {
            return await this.ideaModel.create({
                ...createDraftDto,
                status: model_1.Status.Draft,
            });
        }
        catch (error) {
            common_1.Logger.error(error, IdeasService_1.name);
        }
    }
};
exports.IdeasService = IdeasService;
exports.IdeasService = IdeasService = IdeasService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(ideas_schema_1.Idea.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], IdeasService);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusTransitionValidatorService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const model_1 = __webpack_require__(10);
let StatusTransitionValidatorService = class StatusTransitionValidatorService {
    static checkStatusTransitionValidity(from, to) {
        return this.validTransitions()[from].includes(to);
    }
    static validTransitions() {
        return {
            [model_1.Status.Draft]: [model_1.Status.Submitted],
            [model_1.Status.Submitted]: [model_1.Status.InReview],
            [model_1.Status.InReview]: [model_1.Status.Submitted, model_1.Status.Accepted, model_1.Status.Rejected],
            [model_1.Status.Rejected]: [model_1.Status.Submitted, model_1.Status.InReview, model_1.Status.Accepted],
            [model_1.Status.Accepted]: [
                model_1.Status.Submitted,
                model_1.Status.InReview,
                model_1.Status.Rejected,
                model_1.Status.Finished,
            ],
            [model_1.Status.Finished]: [],
        };
    }
};
exports.StatusTransitionValidatorService = StatusTransitionValidatorService;
exports.StatusTransitionValidatorService = StatusTransitionValidatorService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], StatusTransitionValidatorService);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeaSchema = exports.Idea = void 0;
const tslib_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(8);
const model_1 = __webpack_require__(10);
let Idea = class Idea {
};
exports.Idea = Idea;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    tslib_1.__metadata("design:type", typeof (_a = typeof model_1.Author !== "undefined" && model_1.Author) === "function" ? _a : Object)
], Idea.prototype, "author", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date, default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Idea.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: model_1.Status,
        type: String,
        default: model_1.Status.Submitted,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof model_1.Status !== "undefined" && model_1.Status) === "function" ? _c : Object)
], Idea.prototype, "status", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Idea.prototype, "comments", void 0);
exports.Idea = Idea = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Idea);
exports.IdeaSchema = mongoose_1.SchemaFactory.createForClass(Idea);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DraftsController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DraftsController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const drafts_service_1 = __webpack_require__(15);
const model_1 = __webpack_require__(10);
const microservices_1 = __webpack_require__(3);
let DraftsController = DraftsController_1 = class DraftsController {
    constructor(draftsService) {
        this.draftsService = draftsService;
    }
    async create(createIdeaDto) {
        common_1.Logger.log(`Creating new Draft: ${createIdeaDto.title} ${createIdeaDto.description}`, DraftsController_1.name);
        await this.draftsService.create(createIdeaDto);
        return { message: 'Draft created successfully!' };
    }
    async update(payload) {
        return this.draftsService.update(payload.id, payload.dto);
    }
    findAll() {
        return this.draftsService.findAll();
    }
    remove(payload) {
        return this.draftsService.remove(payload.id);
    }
};
exports.DraftsController = DraftsController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_draft' }),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof model_1.CreateIdeaDto !== "undefined" && model_1.CreateIdeaDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DraftsController.prototype, "create", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_draft' }),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DraftsController.prototype, "update", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_drafts' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], DraftsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_draft' }),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DraftsController.prototype, "remove", null);
exports.DraftsController = DraftsController = DraftsController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof drafts_service_1.DraftsService !== "undefined" && drafts_service_1.DraftsService) === "function" ? _a : Object])
], DraftsController);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DraftsService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const model_1 = __webpack_require__(10);
const mongoose_1 = __webpack_require__(9);
const mongoose_2 = __webpack_require__(8);
const ideas_schema_1 = __webpack_require__(13);
let DraftsService = class DraftsService {
    constructor(ideaModel) {
        this.ideaModel = ideaModel;
    }
    async create(createIdeaDto) {
        await this.ideaModel.create({ ...createIdeaDto, status: model_1.Status.Draft });
    }
    async findAll() {
        const drafts = await this.ideaModel.find({ status: model_1.Status.Draft });
        return drafts.map((draft) => {
            const dto = {
                _id: draft.id,
                title: draft.title,
                description: draft.description,
                author: {
                    userId: draft.author.id,
                    name: draft.author.name,
                },
                createdAt: draft.createdAt,
            };
            return dto;
        });
    }
    update(id, updateDraftDto) {
        return this.ideaModel.findByIdAndUpdate(id, updateDraftDto).exec();
    }
    remove(id) {
        return this.ideaModel.findByIdAndDelete(id).exec();
    }
};
exports.DraftsService = DraftsService;
exports.DraftsService = DraftsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(ideas_schema_1.Idea.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], DraftsService);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


/**
 * Development environment configuration for ideas-api
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
        queue: 'ideas_queue',
        queueOptions: { durable: false },
    }
};


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(8);
const model_1 = __webpack_require__(10);
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
const microservices_1 = __webpack_require__(3);
const ideas_module_1 = __webpack_require__(4);
const environment_1 = __webpack_require__(16);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(ideas_module_1.IdeasModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [environment_1.environment.rabbitmq.url],
            queue: environment_1.environment.rabbitmq.queue,
            queueOptions: environment_1.environment.rabbitmq.queueOptions,
        },
    });
    await app.listen();
    common_1.Logger.log(`🚀 Ideas microservice is running`);
}
void bootstrap();

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;