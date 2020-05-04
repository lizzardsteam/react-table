import React from 'react';
import Table from './components/table/Table';

const tableHead = [
    {
        label: 'ID',
        identifier: 'id',
    },
    {
        label: 'Name',
        identifier: 'name'
    },
    {
        label: 'Company',
        identifier: 'company'
    },
    {
        label: 'CEO',
        identifier: 'ceo'
    },
    {
        label: 'Date',
        identifier: 'date'
    }
];

const tableBody = [
    {
        id: 1,
        name: '2',
        company: 'Company Name',
        ceo: 'First Person',
        date: '2020-02-11'
    },
    {
        id: 2,
        name: '1',
        company: 'Second Company',
        ceo: 'Person Two',
        date: '2019-06-11'
    },
    {
        id: 3,
        name: '3',
        company: 'Company 3rd',
        ceo: 'Person 3',
        date: '2018-03-15'
    },
];

function App() {
    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Table
                            headers={tableHead}
                            body={tableBody}
                            bordered={true}
                            hoverable={true}
                            searchBar={true}
                            searchFields={['id', 'name', 'ceo', 'company']}
                            countItems={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
