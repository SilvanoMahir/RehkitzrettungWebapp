import styled from 'styled-components'

export default function RegionEntryTitles() {
	return (
		<RowContainer>
			<Title>ID</Title>
			<Title>Name Region</Title>
			<Title>Distrikt</Title>
			<Title>Verantwortlicher</Title>
			<Title>E-Mail</Title>
		</RowContainer>
	)
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