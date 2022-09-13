import styled, { css } from "styled-components";

interface Props {
  variant?: "primary" | "secondary";
}

const Button = styled.button<Props>`
  position: relative;
  display: inline-block;
  padding: 8px 10px;
  max-width: 500px;
  color: #000;
  font-weight: 200;
  text-align: left;
  background-color: transparent;
  overflow: hidden;
  border: none;
  font-size: 0.875rem;
  line-height: 1.43;
  &:hover {
    color: #000;
    background-color: #f5f5f5;
  }
  ${(props) =>
    props.variant === "primary" &&
    css`
      background: rgb(25, 118, 210);
      color: white;
    `}
`;

export default Button;
