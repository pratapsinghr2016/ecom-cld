import styled from "styled-components";

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 4px;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.secondaryHover};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
export default IconButton;
