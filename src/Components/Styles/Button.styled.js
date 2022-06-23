import styled from "styled-components";

const Button = styled.button`
  font-family: 'Roboto', sans-serif;

  background-color: ${props => props.theme.darkPink};
  color: white;
  
  border: 1px solid black;
  padding: 0.25rem;
`;

export default Button;