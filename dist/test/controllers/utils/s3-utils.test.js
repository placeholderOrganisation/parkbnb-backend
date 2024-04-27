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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s3_utils_1 = require("../../../src/controllers/utils/s3-utils");
jest.mock("../../../src/clients/s3-client", () => {
    return {
        returnS3Client: jest.fn().mockReturnValue({
            upload: jest.fn().mockReturnThis(),
            promise: jest
                .fn()
                .mockImplementationOnce(() => {
                return Promise.resolve({
                    Location: "http://example.com",
                });
            })
                .mockImplementationOnce(() => {
                return Promise.reject("Failed to upload file to S3");
            })
                .mockImplementationOnce(() => {
                return Promise.resolve({
                    Location: "http://example.com",
                });
            })
                .mockImplementationOnce(() => {
                return Promise.resolve({
                    Location: "http://example.com",
                });
            })
                .mockImplementationOnce(() => {
                return Promise.reject("Failed to upload file to S3");
            })
                .mockImplementationOnce(() => {
                return Promise.reject("Failed to upload file to S3");
            }),
        }),
    };
});
describe("uploadFileToS3", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should upload a file to S3 and return the url as response", () => __awaiter(void 0, void 0, void 0, function* () {
        const file = {
            buffer: Buffer.from("test"),
            originalname: "test.txt",
        };
        const result = yield (0, s3_utils_1.uploadFileToS3)(file);
        expect(s3_utils_1.s3.upload).toHaveBeenCalledTimes(1);
        expect(s3_utils_1.s3.upload).toHaveBeenCalledWith({
            Bucket: process.env.BUCKET_NAME,
            Key: "test.txt",
            Body: Buffer.from("test"),
            ACL: "public-read",
        });
        expect(result).toBe("http://example.com");
    }));
    it("should return an error message if the file upload fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const file = {
            buffer: Buffer.from("test"),
            originalname: "test.txt",
        };
        try {
            yield (0, s3_utils_1.uploadFileToS3)(file);
        }
        catch (error) {
            expect(s3_utils_1.s3.upload).toHaveBeenCalledTimes(1);
            expect(s3_utils_1.s3.upload).toHaveBeenCalledWith({
                Bucket: process.env.BUCKET_NAME,
                Key: "test.txt",
                Body: Buffer.from("test"),
                ACL: "public-read",
            });
            expect(error).toBe("Failed to upload file to S3");
        }
    }));
});
describe("uploadFilesToS3", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should upload multiple files to S3 and return the urls as response", () => __awaiter(void 0, void 0, void 0, function* () {
        const files = [
            {
                buffer: Buffer.from("test"),
                originalname: "test.txt",
            },
            {
                buffer: Buffer.from("test2"),
                originalname: "test2.txt",
            },
        ];
        const result = yield (0, s3_utils_1.uploadFilesToS3)(files);
        expect(result).toEqual(["http://example.com", "http://example.com"]);
        expect(s3_utils_1.s3.upload).toHaveBeenCalledTimes(2);
        expect(s3_utils_1.s3.upload).toHaveBeenCalledWith({
            Bucket: process.env.BUCKET_NAME,
            Key: "test.txt",
            Body: Buffer.from("test"),
            ACL: "public-read",
        });
        expect(s3_utils_1.s3.upload).toHaveBeenCalledWith({
            Bucket: process.env.BUCKET_NAME,
            Key: "test2.txt",
            Body: Buffer.from("test2"),
            ACL: "public-read",
        });
    }));
    it("should return an error message if the file upload fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const files = [
            {
                buffer: Buffer.from("test"),
                originalname: "test.txt",
            },
            {
                buffer: Buffer.from("test2"),
                originalname: "test2.txt",
            },
        ];
        try {
            yield (0, s3_utils_1.uploadFilesToS3)(files);
        }
        catch (error) {
            expect(error).toBe("Failed to upload file to S3");
            expect(s3_utils_1.s3.upload).toHaveBeenCalledTimes(2);
            expect(s3_utils_1.s3.upload).toHaveBeenCalledWith({
                Bucket: process.env.BUCKET_NAME,
                Key: "test.txt",
                Body: Buffer.from("test"),
                ACL: "public-read",
            });
            expect(s3_utils_1.s3.upload).toHaveBeenCalledWith({
                Bucket: process.env.BUCKET_NAME,
                Key: "test2.txt",
                Body: Buffer.from("test2"),
                ACL: "public-read",
            });
        }
    }));
});
//# sourceMappingURL=s3-utils.test.js.map