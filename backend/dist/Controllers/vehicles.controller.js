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
exports.getOneVehicle = exports.getAllVehicles = exports.registerVehicle = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = __importDefault(require("../DbHelper/dbhelper"));
const registerVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let vehicle_id = (0, uuid_1.v4)();
        let { driver_id, capacity, registration_no, brand, year_of_manufacture } = req.body;
        let vehicles = (yield dbhelper_1.default.execute('registerVehicle', { vehicle_id, driver_id, capacity, registration_no, brand, year_of_manufacture })).rowsAffected;
        console.log(vehicles);
        return res.status(200).json({
            message: "Ride registered successfully"
        });
    }
    catch (error) {
        return res.json({
            error
        });
    }
});
exports.registerVehicle = registerVehicle;
const getAllVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let vehicles = (yield dbhelper_1.default.execute('getAllVehicles', {})).recordset;
        return res.status(200).json({
            vehicles
        });
    }
    catch (error) {
        return res.json({
            error
        });
    }
});
exports.getAllVehicles = getAllVehicles;
const getOneVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { vehicle_id } = req.params;
        let query = `SELECT * FROM Vehicles WHERE vehicle_id = '${vehicle_id}'`;
        let vehicle = (yield dbhelper_1.default.query(query)).recordset;
        return res.status(200).json({
            vehicle
        });
    }
    catch (error) {
        return res.json({
            error
        });
    }
});
exports.getOneVehicle = getOneVehicle;
