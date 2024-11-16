import { TableHeader } from "./TablaHeader"
import { TableBody } from "./TableBody"

export function Table(props) {
    const {headers, data, keys, actions} = props

    return(
        <table>
            <TableHeader headers={headers}/>
            <TableBody data={data} keys={keys} actions={actions}/>
        </table>
    )
    
}