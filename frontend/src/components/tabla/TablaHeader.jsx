import { TableHeaderItem } from "./TablaHeaderItem";

export function TableHeader(props){ 
    return (
        <thead>
          <tr>
            {props.headers.map((header, index) => {
              return (
                <TableHeaderItem
                  key={index}
                  columnName={header}
                />
              );
            })}
          </tr>
        </thead>
      );
}