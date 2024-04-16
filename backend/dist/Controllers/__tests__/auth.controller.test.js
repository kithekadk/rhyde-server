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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mssql_1 = __importDefault(require("mssql"));
const auth_controller_1 = require("../auth.controller");
describe('Login Test Cases', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    it('successfully logs in a user and return token', () => __awaiter(void 0, void 0, void 0, function* () {
        let expectedUser = {
            user_id: '62df57e4-f2d7-4ddd-898c-022f91582113',
            name: 'James Kariuki',
            email: 'jamesew2605@gmail.com',
            phone_number: '0798678330',
            role: 'driver',
            Password: '$2b$05$BB8VD5zI2iqrXjOVBeonG.pD4y7r0rCc10tVmDkxFL05bHxjXgx6i',
            profile_image: 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_640.png',
            location: 'Nairobi',
            isDeleted: false,
            isWelcomed: true
        };
        const req = {
            body: {
                email: expectedUser.email,
                password: "correctPassword"
            }
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedUser] })
        });
        jest.spyOn(bcrypt_1.default, 'compare').mockResolvedValueOnce(true);
        jest.spyOn(jsonwebtoken_1.default, 'sign').mockReturnValueOnce('generated-token-ijdgfsgfoia-djfgkjkjg-dsfjgfds');
        yield (0, auth_controller_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            message: "Logged in successfully",
            token: "generated-token-ijdgfsgfoia-djfgkjkjg-dsfjgfds"
        });
    }));
    test('Returns a validation error if email or password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {}
        };
        yield (0, auth_controller_1.loginUser)(req, res);
        expect(res.json).toHaveBeenLastCalledWith({
            "error": "\"email\" is required"
        });
    }));
    it('Returns a validation error if email or password is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "",
                password: ""
            }
        };
        yield (0, auth_controller_1.loginUser)(req, res);
        expect(res.json).toHaveBeenLastCalledWith({
            "error": "\"email\" is not allowed to be empty"
        });
    }));
    it('Returns an error if email is not in database', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: 'incorrect@gmail.com',
                password: '12345678'
            }
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [] })
        });
        yield (0, auth_controller_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            "error": "User not found"
        });
    }));
    it("Handles incorrect password scenarion", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: 'correct@gmail.com',
                password: 'wrongPassword'
            }
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [
                    {
                        email: 'correct@gmail.com',
                        password: 'hashedpwd-38698bf-fdnbnfdbnbdiiiyifds'
                    }
                ] })
        });
        jest.spyOn(bcrypt_1.default, 'compare').mockResolvedValueOnce(false);
        yield (0, auth_controller_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            "error": "Incorrect password"
        });
    }));
});
