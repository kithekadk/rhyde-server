"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trips_controller_1 = require("../Controllers/trips.controller");
const trips_router = (0, express_1.Router)();
trips_router.post('/order_rhide', trips_controller_1.createTrip);
trips_router.get('/customer/:customer_id', trips_controller_1.getCustomerTrips);
trips_router.get('/driver/:driver_id', trips_controller_1.getDriversTrips);
exports.default = trips_router;
