import styled from "styled-components";

interface Props {
  entry: string;
}

export default function UserEntryTitles({ entry }: Props) {
  return (
    <RowContainer>
      <Title>ID</Title>
      <Title>Bezeichnung</Title>
      <Title>Funktion</Title>
      <Title>Kanton/Region</Title>
      <Title></Title>
    </RowContainer>
  );
}

const RowContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
`;

const Title = styled.div`
  flex: 1;
  margin-left: 15px;
  font-weight: bold;
  color: #fffecb;
  justify-content: flex-end;
`;
