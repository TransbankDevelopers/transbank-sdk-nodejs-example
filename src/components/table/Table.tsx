import "./Table.css";

export type ColumnDefinition = {
  header: string;
  accessor: string;
};

export type ColumnValues = {
  field: string;
  value: string | number | string[];
};

export type TableProps = {
  columns: ColumnDefinition[];
  rows: ColumnValues[];
};

export const Table = (props: TableProps) => {
  return (
    <div className="table-container">
      <div className="header">
        {props.columns.map((column) => (
          <div key={column.header} className="column">
            <span>{column.header}</span>
          </div>
        ))}
      </div>
      <div>
        {props.rows.map((row) => (
          <div key={row.field} className="row">
            <div className="cell">
              <span>{row.field}</span>
            </div>

            <div className="cell">
              {Array.isArray(row.value) ? (
                row.value.map((value) => (
                  <span className="tbk-column" key={value}>
                    {value}
                  </span>
                ))
              ) : (
                <span className="tbk-column">{row.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
