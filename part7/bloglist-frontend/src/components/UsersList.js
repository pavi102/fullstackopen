import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initalizeUsers } from "../reducers/usersReducer";
import { useSelector, useDispatch } from "react-redux";

const UsersList = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initalizeUsers());
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={user.id}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
