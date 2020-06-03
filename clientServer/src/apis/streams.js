import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "",
});
