"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = require("./verifyToken");
let mockRequest = () => {
    return {
        headers: {
            token: "valid_token_for_testing_dskjgjfls_fdsjgfdj_fjhggkfsakjh"
        }
    };
};
let mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };
};
let mockNext = jest.fn();
describe('Testing the Middleware', () => {
    it('authorises the user', () => {
        let mockUser = {
            user_id: "62df57e4-f2d7-4ddd-898c-022f91582113",
            name: "James Kariuki",
            email: "jamesew2605@gmail.com",
            role: "driver",
        };
        let outputResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            info: mockUser
        };
        jest.spyOn(jsonwebtoken_1.default, 'verify').mockResolvedValueOnce({
            outputResponse
        });
        let next = mockNext();
        (0, verifyToken_1.verifyToken)(mockRequest, outputResponse, next);
        expect(mockNext).toHaveBeenCalled();
    });
    it('throws an error if token is missing', () => {
        let req = {
            headers: {}
        };
        let res = mockResponse();
        let next = mockNext();
        (0, verifyToken_1.verifyToken)(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
            message: "You do not have access"
        });
    });
});
