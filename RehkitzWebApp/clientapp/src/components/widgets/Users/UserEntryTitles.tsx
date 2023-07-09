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
    </RowContainer>
  );
}

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: stretch;

  @media (max-width: 426px) {
    display: flex;
    justify-content: center; 
    align-items: center; 
  } 
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  font-weight: bold;
  font-size: 1.25em;
  color: #fffecb;
`