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
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
describe('TDD for Vehicles Controller', () => {
    it('get all vehicles', () => __awaiter(void 0, void 0, void 0, function* () {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJkZjU3ZTQtZjJkNy00ZGRkLTg5OGMtMDIyZjkxNTgyMTEzIiwibmFtZSI6IkphbWVzIEthcml1a2kiLCJlbWFpbCI6ImphbWVzZXcyNjA1QGdtYWlsLmNvbSIsInJvbGUiOiJkcml2ZXIiLCJpYXQiOjE3MDg1OTQ2NTksImV4cCI6MTcwODU5ODI1OX0.US7MByo3_ZfQh6Ghqd45oJv9GCt-K6yosNT8CkVIl_o';
        let res = yield (0, supertest_1.default)(server_1.default).get('/vehicles').set('token', token);
        expect(res.status).toBe(200);
        expect(res.body.vehicles).toBeInstanceOf(Array);
    }));
    it('get a single Vehicle by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield (0, supertest_1.default)(server_1.default).get('/vehicles/c4fd4d53-f88f-4030-b469-11595d6dc62e');
        expect(res.status).toBe(200);
        expect(res.body.vehicle).toEqual(expect.arrayContaining([
            expect.objectContaining({
                vehicle_id: expect.any(String),
                driver_id: expect.any(String),
                capacity: expect.any(Number),
                registration_no: expect.any(String),
                brand: expect.any(String),
                year_of_manufacture: expect.any(Number),
                verified: expect.any(Boolean)
            })
        ]));
    }));
});
