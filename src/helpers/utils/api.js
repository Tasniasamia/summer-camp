// utils/api.js
import api from "./axios"; // axios interceptor already configured

// GET
export const fetchData = async (url, params) => {
  const { data } = await api.get(url, { params });
  return data;
};

// POST
export const postData = async (url, payload) => {
  const { data } = await api.post(url, payload);
  return data;
};

// PUT
export const updateData = async (url, payload) => {
  const { data } = await api.put(url, payload);
  return data;
};

// DELETE
export const deleteData = async (url) => {
  const { data } = await api.delete(url);
  return data;
};
