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

const update = async (id, newBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlog);
  return res.data;
};

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const defaultExports = { getAll, setToken, create, update, remove };
export default defaultExports;
