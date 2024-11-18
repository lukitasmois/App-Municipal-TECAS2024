import { TableBodyRow } from "./TableBodyRow";

export function TableBody(props){
    const { keys, data, actions } = props;

    return(
        <tbody>
            {data.map((dato, index) =>{
                return(
                    <TableBodyRow key={index} keys={keys} dato={dato} actions={actions} />
                )
            })}
        </tbody>
    )
}