"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    phone_number: joi_1.default.number().min(10).required(),
    password: joi_1.default.string().required(),
    role: joi_1.default.string().min(4).required(),
    profile_image: joi_1.default.string(),
    location: joi_1.default.string()
});
