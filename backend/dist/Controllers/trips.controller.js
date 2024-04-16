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
exports.getDriversTrips = exports.getCustomerTrips = exports.createTrip = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = __importDefault(require("../DbHelper/dbhelper"));
// const dbhelper = new Connection
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id, driver_id, where_from, destination, price, vehicle_size } = req.body;
        let trip_id = (0, uuid_1.v4)();
        // const pool = await mssql.connect(sqlConfig)
        // let result = (await pool.request()
        // .input("customer_id", customer_id)
        // .input("driver_id", driver_id)
        // .input("trip_id", trip_id)
        // .input("where_from", where_from)
        // .input("destination", destination)
        // .input("price", price)
        // .input("vehicle_size", vehicle_size)
        // .execute("orderRhide")).rowsAffected
        let result = yield (dbhelper_1.default.execute("orderRhide", {
            customer_id, driver_id, trip_id, where_from, destination, price, vehicle_size
        }));
        if (result.rowsAffected[0] < 1) {
            return res.json({
                error: "Trip creation failed"
            });
        }
        else {
            return res.json({
                message: "Your driver is on the way"
            });
        }
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.createTrip = createTrip;
const getCustomerTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.customer_id;
        // const pool = await mssql.connect(sqlConfig)
        // const trips = await(await pool.request()
        // .input("user_id", id)
        // .execute("getMyTrips")).recordset
        // console.log(trips);
        let trips = yield (yield dbhelper_1.default.execute("getMyTrips", { user_id: id })).recordset;
        if (trips.length > 0) {
            return res.json({
                trips
            });
        }
        else {
            return res.json({
                message: "No trips found"
            });
        }
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.getCustomerTrips = getCustomerTrips;
const getDriversTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.driver_id;
        console.log(id);
        let query = `SELECT * FROM Trip WHERE driver_id = '${id}'`;
        let driver_trips = yield dbhelper_1.default.query(query);
        console.log(driver_trips);
        if (driver_trips.recordset.length > 0) {
            return res.json({
                trips: driver_trips.recordset
            });
        }
        else {
            return res.json({
                message: "No trips found"
            });
        }
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.getDriversTrips = getDriversTrips;
