import api from "./api";

export const mockApi = {
  latest: async () => {
    const res = await api.get("/mock-test/latest");
    return res.data;
  },

  history: async () => {
    const res = await api.get("/mock-test/history");
    return res.data;
  },

  create: async (data: any) => {
    const res = await api.post("/mock-test", data);
    return res.data;
  },
};