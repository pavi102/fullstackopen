import { Link } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  background-color: aliceblue;
  padding: 12px 0;
`;

const StyledMenu = styled.menu`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding-inline-start: 0;

  & li {
    display: inline;
    padding: 0 8px;
  }

  & a {
    text-decoration: none;
  }

  & li:hover {
    opacity: 0.9;
  }
`;

const Navbar = ({ loggedInUser, logoutHandler }) => {
  if (!loggedInUser) return;
  return (
    <StyledNavbar>
      <StyledMenu>
        <div>
          <li>
            <Link to={"/"}>Blogs</Link>
          </li>
          <li>
            <Link to={"/users"}>Users</Link>
          </li>
        </div>
        <div>
          <li>
            {loggedInUser.name} is logged in{" "}
            <Button rounded={true} size="sm" onClick={logoutHandler}>
              logout
            </Button>
          </li>
        </div>
      </StyledMenu>
    </StyledNavbar>
  );
};
export default Navbar;
