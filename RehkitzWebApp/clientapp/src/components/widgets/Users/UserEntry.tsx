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
  	text-overflow: ellipsis;
  	font-weight: bold; 
	font-size: 1.25em;
	white-space: initial;
	overflow-wrap: anywhere;
	justify-content: flex-end;
    text-align: end;
    margin-right: 1em;
  	@media (max-width: 1200px) {
		display: flex;
    	flex: 1;
  	}
	@media (max-width: 480px) {
		display: flex;
    	flex: 1;
  	}
`

const Value = styled.div`
  	display: grid;
  	grid-template-columns: repeat(5, 1fr);
  	justify-items: stretch;
 	overflow: hidden;
  	text-overflow: ellipsis;
  	flex: 1;
	font-size: 1.25em;
	white-space: initial;
	overflow-wrap: anywhere;
	@media (max-width: 480px) {
    	flex: 1;
  	}
	@media (max-width: 1200px) {
		display: flex;
  	}
`