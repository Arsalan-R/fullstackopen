import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const result = await axios.post(baseUrl, blog, config);
  return result.data;
};

const update = async (blog, id) => {
  const result = await axios.put(`${baseUrl}/${id}`, blog);
  return result.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const result = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return result.data;
};

export default { getAll, setToken, create, update, deleteBlog };
