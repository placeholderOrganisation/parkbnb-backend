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
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const user_utils_1 = require("../utils/user-utils");
const user_model_1 = require("../../models/user-model");
exports.userController = express_1.default.Router();
// Route to create a new User
exports.userController.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
        return res.status(400).json({ message: "User data is required" });
    }
    const passwordHash = yield (0, user_utils_1.hashPassword)(userData.password);
    const userObj = (0, user_utils_1.assembleNewUserBody)(Object.assign(Object.assign({}, userData), { passwordHash }));
    try {
        const existingUser = yield user_model_1.User.findOne({ email: userObj.email });
        // If user already exists, return an error
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Validate the user data before saving
        yield user_model_1.User.validate(userObj);
        const newUser = yield user_model_1.User.create(userObj);
        const partialUser = (0, user_utils_1.getPartialUserObject)(newUser);
        res.status(201).json(partialUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Route to update a User given an ID
exports.userController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userData = req.body;
        if (!userData || Object.keys(userData).length === 0 || userData.id) {
            return res.status(400).json({ message: "User data is required" });
        }
        const updatedUser = yield user_model_1.User.findOneAndUpdate({ id: userId }, userData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const partialUser = (0, user_utils_1.getPartialUserObject)(updatedUser);
        res.status(200).json(partialUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Route to get a User given an ID
exports.userController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId || userId === "") {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const user = yield user_model_1.User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const partialUser = (0, user_utils_1.getPartialUserObject)(user);
        res.status(200).json(partialUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
//# sourceMappingURL=user-api.js.map