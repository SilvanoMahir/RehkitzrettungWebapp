import React, { Component } from 'react'

export default class App extends Component<{}, { protocols: [], loading: boolean }> {
    static displayName = App.name

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = { protocols: [], loading: true }
    }

    componentDidMount() {
        this.populateProtocolData()
    }

    static renderProtocolsTable(protocols: any[]) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Protokoll-Code</th>
                        <th>Name des Klienten</th>
                        <th>Name des Lokals</th>
                        <th>Name des Piloten</th>
                    </tr>
                </thead>
                <tbody>
                    {protocols.map(protocol =>
                        <tr key={protocol.protocolId}>
                            <td>{protocol.protocolCode}</td>
                            <td>{protocol.clientFullName}</td>
                            <td>{protocol.localName}</td>
                            <td>{protocol.pilotFullName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderProtocolsTable(this.state.protocols)

        return (
            <div>
                <h1 id="tabelLabel" >Rehkitzrettung Webapp Protokolle</h1>
                {contents}
            </div>
        );
    }

    async populateProtocolData() {
        const response = await fetch('api/protocols')
        const data = await response.json()
        this.setState({ protocols: data, loading: false })
    }
}
