"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInputJson = toInputJson;
exports.toNullableInputJson = toNullableInputJson;
const client_1 = require("@prisma/client");
function toInputJson(value) {
    return (value ?? client_1.Prisma.JsonNull);
}
function toNullableInputJson(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return client_1.Prisma.JsonNull;
    }
    return value;
}
