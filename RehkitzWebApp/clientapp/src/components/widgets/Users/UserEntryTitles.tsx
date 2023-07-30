import styled from "styled-components";

export default function UserEntryTitles() {
	return (
		<RowContainer>
			<Title>ID</Title>
			<Title>Bezeichnung</Title>
			<Title>Funktion</Title>
			<Title>Region</Title>
		</RowContainer>
	);
}

const RowContainer = styled.div`
	display: grid;
  	grid-template-columns: repeat(5, 1fr);
  	justify-items: stretch;
  	@media (max-width: 700px) {
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
  	color: #ffeccb;
`