import styled from "styled-components"

interface Props {
    entry: string
    value?: string | number
}

export default function UserEntry({ entry, value }: Props) {

    return (
        <RowContainer>
            <Entry>{entry}</Entry>
            <Value>{value}</Value>
        </RowContainer>
    )
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 0;
  flex-grow: 1;
  justify-content: center;
`

const Entry = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold; 
  @media (max-width: 426px) {
    margin-left: 15px;
    flex: 1;
  }
`

const Value = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: stretch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 15px;
  flex: 1;
`