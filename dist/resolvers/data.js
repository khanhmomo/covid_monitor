"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const PostMutationResponse_1 = require("../types/PostMutationResponse");
const CreatePostInput_1 = require("../types/CreatePostInput");
const Data_1 = require("../entities/Data");
const UpdateDataInput_1 = require("../types/UpdateDataInput");
const checkAuth_1 = require("../middleware/checkAuth");
let PostResolver = class PostResolver {
    createPost({ title, infected, healed, death }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = Data_1.Data.create({
                    title,
                    infected,
                    healed,
                    death
                });
                yield newPost.save();
                return {
                    code: 200,
                    success: true,
                    message: 'Data created!',
                    post: newPost
                };
            }
            catch (error) {
                console.log(error);
                return {
                    code: 500,
                    success: false,
                    message: `Internal server error ${error.message}`
                };
            }
        });
    }
    datas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Data_1.Data.find();
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    data(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Data_1.Data.findOne(id);
                return data;
            }
            catch (error) {
                console.log(error);
                return undefined;
            }
        });
    }
    updateData({ id, title, infected, healed, death }) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingData = yield Data_1.Data.findOne(id);
            if (!existingData)
                return {
                    code: 400,
                    success: false,
                    message: 'Post not found'
                };
            existingData.title = title;
            existingData.infected = infected;
            existingData.healed = healed;
            existingData.death = death;
            yield existingData.save();
            return {
                code: 200,
                success: true,
                message: 'Data updated successfully',
                post: existingData
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(_return => PostMutationResponse_1.PostMutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('createPostInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostInput_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Query)(_return => [Data_1.Data], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "datas", null);
__decorate([
    (0, type_graphql_1.Query)(_return => Data_1.Data, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', _type => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "data", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => PostMutationResponse_1.PostMutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('updateDataInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateDataInput_1.UpdateDataInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updateData", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=data.js.map