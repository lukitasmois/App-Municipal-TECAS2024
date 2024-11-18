import { Actions } from "../Actions";

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || "S/D";
  };

export function TableBodyRow(props){
    const { dato, keys, actions } = props;
    const dinamicActions = typeof actions === 'function' ? actions(dato) : actions;
    return(
        <tr key={dato._id}>
            {keys.map((key) => (
                <td key={key}>
                    {getNestedValue (dato, key)}
                </td>
            ))}
            {actions &&  (
                <td>
                    <Actions actions={dinamicActions} dato={dato}/>
                </td>
            )}
        </tr>
    )
}