import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  margin: 20px auto 0;
  font-size: 16px;
  padding: 10px 30px;
  border: 1px solid #ababab;
  border-radius: 3px;
  background-color: white;
  transition: linear 200ms;

  &:hover {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
`;
