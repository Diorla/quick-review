import mockResponse from "../src/fetchSurvey/mockResponse";
import { apiUrl } from "../src/fetchSurvey/apiUrl";
import fetchSurvey from "../src/fetchSurvey/index";

// Mock fetch and environment
global.fetch = jest.fn();
console.log = jest.fn();
console.error = jest.fn();

// Store original NODE_ENV and reset after tests
const originalNodeEnv = process.env.NODE_ENV;

const mockApiKey = "3d0426a2-a064-412a-b0e0-b426434205be";

describe("fetchSurvey", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  test("should call the correct URL with apiKey", async () => {
    const mockApiKey = "test-api-key";
    const mockResponseObj = {
      status: 200,
      json: jest.fn().mockResolvedValue({ data: "some data" }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponseObj.json());

    await fetchSurvey(mockApiKey);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/endpoint/${mockApiKey}`
    );
  });

  test("should return mockResponse when no apiKey is provided in non-production", async () => {
    process.env.NODE_ENV = "development";

    const result = await fetchSurvey();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toEqual({
      data: mockResponse,
      error: new Error("No API key provided"),
    });
  });

  test("should throw an error when no apiKey is provided in production", async () => {
    process.env.NODE_ENV = "production";

    const result = await fetchSurvey();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toEqual({
      data: null,
      error: new Error("No API key provided"),
    });
  });

  test("should handle fetch errors correctly", async () => {
    const mockError = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValue(mockError);

    await fetchSurvey(mockApiKey);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/endpoint/${mockApiKey}`
    );
  });

  test("should catch and return unexpected errors", async () => {
    const mockError = new Error("Unexpected error");
    (global.fetch as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    const result = await fetchSurvey(mockApiKey);

    expect(result).toEqual({ data: null, error: mockError });
  });
});
