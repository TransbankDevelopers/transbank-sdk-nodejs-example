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
    <div className="flex flex-col text-tbk-black-2">
      <div className="h-[56px] flex justify-between bg-tbk-table-header">
        {props.columns.map((column, index) => (
          <div
            key={index}
            className="w-[50%] flex justify-center items-center border-r border-b border-tbk-border-blue"
          >
            <span className="font-bold text-tbk-red">{column.header}</span>
          </div>
        ))}
      </div>
      <div>
        {props.rows.map((row, index) => (
          <div
            key={index}
            className="h-[56px] flex justify-between items-center border-b border-tbk-border-blue text-sm"
          >
            <div className="w-[50%] h-full flex pl-4 items-center border-r border-tbk-border-blue">
              <span>{row.field}</span>
            </div>
            <div className="w-[50%] h-full flex pl-4 items-center border-r border-tbk-border-blue">
              <span>{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
