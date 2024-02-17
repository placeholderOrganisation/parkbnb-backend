// @ts-nocheck
import {
  s3,
  uploadFileToS3,
  uploadFilesToS3,
} from "../../../src/controllers/utils/s3-utils";

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

  it("should upload a file to S3 and return the url as response", async () => {
    const file = {
      buffer: Buffer.from("test"),
      originalname: "test.txt",
    };
    const result = await uploadFileToS3(file);
    expect(s3.upload).toHaveBeenCalledTimes(1);
    expect(s3.upload).toHaveBeenCalledWith({
      Bucket: process.env.BUCKET_NAME,
      Key: "test.txt",
      Body: Buffer.from("test"),
      ACL: "public-read",
    });
    expect(result).toBe("http://example.com");
  });

  it("should return an error message if the file upload fails", async () => {
    const file = {
      buffer: Buffer.from("test"),
      originalname: "test.txt",
    };
    try {
      await uploadFileToS3(file);
    } catch (error) {
      expect(s3.upload).toHaveBeenCalledTimes(1);
      expect(s3.upload).toHaveBeenCalledWith({
        Bucket: process.env.BUCKET_NAME,
        Key: "test.txt",
        Body: Buffer.from("test"),
        ACL: "public-read",
      });
      expect(error).toBe("Failed to upload file to S3");
    }
  });
});

describe("uploadFilesToS3", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should upload multiple files to S3 and return the urls as response", async () => {
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
    const result = await uploadFilesToS3(files);
    expect(result).toEqual(["http://example.com", "http://example.com"]);
    expect(s3.upload).toHaveBeenCalledTimes(2);
    expect(s3.upload).toHaveBeenCalledWith({
      Bucket: process.env.BUCKET_NAME,
      Key: "test.txt",
      Body: Buffer.from("test"),
      ACL: "public-read",
    });
    expect(s3.upload).toHaveBeenCalledWith({
      Bucket: process.env.BUCKET_NAME,
      Key: "test2.txt",
      Body: Buffer.from("test2"),
      ACL: "public-read",
    });
  });

  it("should return an error message if the file upload fails", async () => {
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
      await uploadFilesToS3(files);
    } catch (error) {
      expect(error).toBe("Failed to upload file to S3");
      expect(s3.upload).toHaveBeenCalledTimes(2);
      expect(s3.upload).toHaveBeenCalledWith({
        Bucket: process.env.BUCKET_NAME,
        Key: "test.txt",
        Body: Buffer.from("test"),
        ACL: "public-read",
      });
      expect(s3.upload).toHaveBeenCalledWith({
        Bucket: process.env.BUCKET_NAME,
        Key: "test2.txt",
        Body: Buffer.from("test2"),
        ACL: "public-read",
      });
    }
  });
});
