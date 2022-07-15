import Proptypes from "prop-types";
import styled from "styled-components";

const sizes = {
  sm: "8px 16px",
  md: "12px 24px",
  lg: "16px 32px",
};

const StyledButton = styled.button`
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => (props.rounded ? "25px" : "0px")};
  color: ${props => props.color};
  padding: ${props => sizes[props.size]};
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Button = ({
  children,
  onClick,
  type = "submit",
  color = "white",
  backgroundColor = "black",
  rounded = false,
  size = "md",
}) => {
  return (
    <StyledButton
      color={color}
      backgroundColor={backgroundColor}
      rounded={rounded}
      type={type}
      onClick={onClick}
      size={size}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: Proptypes.string,
  onClick: Proptypes.func,
  type: Proptypes.string,
  color: Proptypes.string,
  backgroundColor: Proptypes.string,
  rounded: Proptypes.bool,
  size: Proptypes.string,
};

export default Button;
