"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
exports.authController = express_1.default.Router();
exports.authController.get("/login/success", (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    }
    return res.status(403).json({
        success: false,
        message: "unsuccessful",
        user: null,
    });
});
exports.authController.get("/login/failure", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
// currently not in use
exports.authController.get("/logout", (req, res) => {
    req.logout(req.user, (err) => {
        res.redirect("/");
    });
});
exports.authController.get("/google", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
exports.authController.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: process.env.SUCCESS_REDIRECT_FOR_SOCIAL,
    failureRedirect: process.env.FAILURE_REDIRECT_FOR_SOCIAL,
}));
exports.authController.get("/facebook", passport_1.default.authenticate("facebook", { scope: ["public_profile", "email"] }));
exports.authController.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    successRedirect: process.env.SUCCESS_REDIRECT_FOR_SOCIAL,
    failureRedirect: process.env.FAILURE_REDIRECT_FOR_SOCIAL,
}));
exports.authController.post("/local", passport_1.default.authenticate("local", {
    successRedirect: process.env.SUCCESS_REDIRECT_FOR_LOCAL,
    failureRedirect: process.env.FAILURE_REDIRECT_FOR_LOCAL,
}));
//# sourceMappingURL=auth-api.js.map