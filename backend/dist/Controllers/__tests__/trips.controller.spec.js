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
const dbhelper_1 = __importDefault(require("../../DbHelper/dbhelper"));
const trips_controller_1 = require("../trips.controller");
jest.mock("../../DbHelper/dbhelper");
describe('Trips Test Suite', () => {
    let res;
    let trips;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        trips = {
            recordset: [
                {
                    customer_id: "4756cf7d-ff5c-4b78-965d-864691cbe560",
                    driver_id: "62df57e4-f2d7-4ddd-898c-022f91582113",
                    trip_id: "87d0728f-d4ea-4151-bf7e-f6c098fe659d",
                    where_from: "Nyeri",
                    destination: "Nanyuki",
                    price: "1500 KSH",
                    vehicle_size: "SM",
                    pickup_time: "2024-02-08T10:09:21.287Z",
                    dropoff_time: null,
                    status: "pending",
                    user_id: "4756cf7d-ff5c-4b78-965d-864691cbe560",
                    name: "Nyambura Chomba",
                    email: "sheila@yopmail.com",
                    phone_number: "0787654321",
                    role: "customer",
                    Password: "12345678",
                    profile_image: "",
                    location: "Nyeri",
                    isDeleted: false,
                    isWelcomed: true
                },
            ]
        };
    });
    it("gets a customers trips", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                customer_id: '4756cf7d-ff5c-4b78-965d-864691cbe560'
            }
        };
        dbhelper_1.default.execute.mockResolvedValueOnce({
            recordset: trips.recordset
        });
        yield (0, trips_controller_1.getCustomerTrips)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            trips: trips.recordset
        });
    }));
    it('gets drivers trips', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                driver_id: '4756cf7d-ff5c-4b78-965d-864691cbe560'
            }
        };
        dbhelper_1.default.query.mockResolvedValueOnce({
            recordset: trips.recordset
        });
        yield (0, trips_controller_1.getDriversTrips)(req, res);
        expect(res.json).toHaveBeenCalledWith({ trips: trips.recordset });
    }));
});
