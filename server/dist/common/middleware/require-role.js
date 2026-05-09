"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
function requireRole(allowed) {
    return (req, res, next) => {
        if (!req.auth || !allowed.includes(req.auth.role)) {
            res.status(403).json({ success: false, message: "Forbidden" });
            return;
        }
        next();
    };
}
