import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_BASEURL;

const apiClient = axios.create({
  baseURL: baseurl, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
