import React, {useState} from "react";

/**
 * Props:
 * @param headers: Array<{label: string, identifier: string}>
 * @param body: Array<{id: number, name: string, company: string, ceo: string, date: string}>
 * @param bordered: boolean
 * @param hoverable: boolean
 * @param searchBar: boolean
 * @param searchFields: Array<string>
 * @param countItems: boolean
 * */
export default function Table(props) {
    const [tHead] = useState(props.headers);
    const [cachedBody] = useState(props.body);
    const [tBody, setTBody] = useState(props.body);
    const [filter, setFilter] = useState({
        identifier: 'none',
        style: 'ascending'
    });

    const tableHead = (headers) => {
        let th = headers.map(head =>
            <th onClick={e => sortBody(head.identifier)} style={{'cursor': 'pointer'}}>
                {head.label}
                {(head.identifier === filter.identifier && filter.style === 'ascending') ? "↓" :
                    (head.identifier === filter.identifier && filter.style === 'descending') ? "↑" : ''}
            </th>);
        return (<tr> {th} </tr>);
    };

    const sortBody = (identifier) => {
        let sorted;
        if (filter.identifier === identifier && filter.style === 'descending') {
            sorted = tBody.sort((a, b) => a[identifier] > b[identifier]);
            setFilter({
                identifier,
                style: 'ascending',
            });
        } else if (filter.identifier === identifier && filter.style === 'ascending') {
            sorted = tBody.sort((a, b) => a[identifier] < b[identifier]);
            setFilter({
                identifier,
                style: 'descending',
            });
        } else {
            sorted = tBody.sort((a, b) => a[identifier] > b[identifier]);
            setFilter({
                identifier,
                style: 'ascending',
            });
        }
        setTBody([...sorted]);
    };

    const tableBody = (headers) => {
        let tb = [];
        for (let i = 0; i < tBody.length; i++) {
            let row = headers.map(item => <td> {tBody[i][item.identifier]} </td>);
            tb.push(<tr> {row} </tr>);
        }
        return (tb);
    }

    const searchTable = (value) => {
        let fields = props.searchFields
        let returnMap = new Map();
        const regexp = new RegExp(value, 'gi');
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            for (let j = 0; j < cachedBody.length; j++) {
                if (cachedBody[j][field].toString().match(regexp)) {
                    returnMap.set(j, cachedBody[j]);
                }
            }
        }
        let newState = []
        for (let value of returnMap.values()) {
            newState.push(value);
        }
        setTBody(newState);
    }

    const searchable = () => {
        if (props.searchBar === true) {
            return (<input type="text" className="form-control" placeholder="Type to search"
                           onChange={e => searchTable(e.target.value)}/>)
        }
    }

    return (
        <>
            {searchable()}
            <table
                className={`table ${(props.bordered) ? 'table-bordered' : ''} ${(props.hoverable) ? 'table-hover' : ''}`}>

                <thead>
                {tableHead(tHead)}
                </thead>

                <tbody>
                {tableBody(tHead)}
                </tbody>

            </table>
            <div className="row">
                <div className="col-4 success">
                    {(props.countItems) ? `${tBody.length} ${(tBody.length === 1) ? 'item' : 'items'}` : ''}
                </div>
                <div className="col-4">
                    {/*Pagination*/}
                </div>
                <div className="col-4 success">
                    {/*Pagination controls*/}
                </div>
            </div>
        </>
    );
}