// @ts-nocheck
import request from "supertest";
import app from "../../../src/app";

jest.mock("multer", () => {
  return jest.fn().mockImplementation(() => {
    return {
      single: jest.fn().mockImplementation((fieldName) => {
        return (req, res, next) => {
          req.file = {
            originalname: "file.jpg",
            buffer: Buffer.from("file"),
          };
          next();
        };
      }),
      array: jest.fn().mockImplementation((fieldName, maxCount) => {
        return (req, res, next) => {
          req.files = [
            {
              originalname: "file1.jpg",
              buffer: Buffer.from("file1"),
            },
            {
              originalname: "file2.jpg",
              buffer: Buffer.from("file2"),
            },
          ];
          next();
        };
      }),
    };
  });
});

jest.mock("../../../src/clients/db-client", () => {
  return {
    returnDbClient: jest.fn().mockResolvedValue(null),
  };
});

jest.mock("../../../src/controllers/utils/s3-utils", () => {
  return {
    uploadFileToS3: jest
      .fn()
      .mockImplementationOnce(() => {
        return "https://s3.amazonaws.com/bucket/file.jpg";
      })
      .mockImplementationOnce(() => {
        throw new Error("Failed to upload file to S3");
      }),
    uploadFilesToS3: jest
      .fn()
      .mockImplementationOnce(() => {
        return [
          "https://s3.amazonaws.com/bucket/file1.jpg",
          "https://s3.amazonaws.com/bucket/file2.jpg",
        ];
      })
      .mockImplementationOnce(() => {
        throw new Error("Failed to upload files to S3");
      }),
  };
});

describe("S3-api", () => {
  describe("GET /upload-single", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 200 and return location of uploaded file as string", async () => {
      const mockFile = {
        originalname: "file.jpg",
        buffer: Buffer.from("file"),
      };

      const expectedResponse = {
        Location: "https://s3.amazonaws.com/bucket/file.jpg",
      };

      // Make the request
      const response = await request(app).post("/v1/s3/upload-single").send({
        file: mockFile,
      });

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      // Add more assertions as needed
    });

    it("should return 500 and error message if file upload fails", async () => {
      const mockFile = {
        originalname: "file.jpg",
        buffer: Buffer.from("file"),
      };

      const expectedResponse = { error: "Failed to upload file to S3" };

      // Make the request
      const response = await request(app).post("/v1/s3/upload-single").send({
        file: mockFile,
      });

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe("GET /upload-multiple", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 200 and return location of uploaded files as array of strings", async () => {
      const mockFiles = [
        {
          originalname: "file1.jpg",
          buffer: Buffer.from("file1"),
        },
        {
          originalname: "file2.jpg",
          buffer: Buffer.from("file2"),
        },
      ];

      const expectedResponse = {
        Locations: [
          "https://s3.amazonaws.com/bucket/file1.jpg",
          "https://s3.amazonaws.com/bucket/file2.jpg",
        ],
      };

      // Make the request
      const response = await request(app).post("/v1/s3/upload-multiple").send({
        files: mockFiles,
      });

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      // Add more assertions as needed
    });

    it("should return 500 and error message if file upload fails", async () => {
      const mockFiles = [
        {
          originalname: "file1.jpg",
          buffer: Buffer.from("file1"),
        },
        {
          originalname: "file2.jpg",
          buffer: Buffer.from("file2"),
        },
      ];

      const expectedResponse = { error: "Failed to upload files to S3" };

      // Make the request
      const response = await request(app).post("/v1/s3/upload-multiple").send({
        files: mockFiles,
      });

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
