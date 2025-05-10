import axios from "axios";

const API_BASE_URL = "http://localhost:3000/palette"; // Backend URL

export const insertPalette = async (paletteData) => {
  const response = await axios.post(`${API_BASE_URL}/insert`, paletteData);
  return response.data;
};

export const getAllPalettes = async () => {
  const response = await axios.get(`${API_BASE_URL}/show`);
  return response.data;
};

export const getPaletteById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/get/${id}`);
  return response.data;
};

export const updatePalette = async (id, paletteData) => {
  const response = await axios.put(`${API_BASE_URL}/update/${id}`, paletteData);
  return response.data;
};

export const deletePalette = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data;
};
