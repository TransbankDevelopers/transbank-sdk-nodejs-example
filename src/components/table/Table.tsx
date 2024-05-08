import "./Table.css";

export type ColumnDefinition = {
  header: string;
  accessor: string;
};

export type ColumnValues = {
  field: string;
  value: string | number;
};

export type TableProps = {
  columns: ColumnDefinition[];
  rows: ColumnValues[];
};

export const Table = (props: TableProps) => {
  return (
    <div className="table-container">
      <div className="header">
        {props.columns.map((column, index) => (
          <div key={index} className="column">
            <span>{column.header}</span>
          </div>
        ))}
      </div>
      <div>
        {props.rows.map((row, index) => (
          <div key={index} className="row">
            <div className="cell">
              <span>{row.field}</span>
            </div>
            <div className="cell">
              <span>{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
