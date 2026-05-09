"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, _req, res, _next) {
    if (error instanceof Error) {
        res.status(400).json({ success: false, message: error.message });
        return;
    }
    res.status(500).json({ success: false, message: "Unexpected server error" });
}
