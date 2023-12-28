"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// type CustomFile = Express.Multer.File;
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    limits: {
        fileSize: 2000000,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileFilter: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const error = new Error('File type is not supported');
            cb(error, false);
            return;
        }
        cb(null, true);
    },
});
