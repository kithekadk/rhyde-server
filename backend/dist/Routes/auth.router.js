"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../Controllers/auth.controller");
const verifyToken_1 = require("../Middlewares/verifyToken");
const auth_router = (0, express_1.Router)();
auth_router.post('/login', auth_controller_1.loginUser);
auth_router.get('/checkdetails', verifyToken_1.verifyToken, auth_controller_1.checkUserDetails);
auth_router.put('/reset_pwd', auth_controller_1.resetPassword);
exports.default = auth_router;
