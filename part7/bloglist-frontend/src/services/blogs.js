import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const update = async blog => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return res.data;
};

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const createComment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return res.data;
};

const defaultExports = { getAll, setToken, create, update, remove, createComment };
export default defaultExports;
