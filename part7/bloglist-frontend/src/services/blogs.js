import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
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

const addComment = async (comment) => {
  const req = {
    comment: comment.content
  }
  const result = await axios.put(`${baseUrl}/${comment.id}/comments`, req)
  return result.data
}

export default { getAll, setToken, create, update, deleteBlog, addComment };
