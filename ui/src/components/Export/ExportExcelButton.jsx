import React from "react";
import { Button } from "antd";
import * as XLSX from "xlsx";
const ExportExcelButton = (props) => {
  const { dataSource, columns, filename, columnTitles } = props;
  const exportToExcel = () => {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table headers
    const headerRow = document.createElement("tr");
    columnTitles.forEach((title) => {
      const th = document.createElement("th");
      th.innerText = title;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table rows
    dataSource.forEach((item) => {
      const row = document.createElement("tr");
      columns.forEach((column) => {
        const td = document.createElement("td");
        td.innerText = item[column.dataIndex];
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    const wb = XLSX.utils.table_to_book(table, { sheet: "SheetJS" });
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };
  return (
    <>
      {" "}
      <Button onClick={exportToExcel}>Xuất file</Button>
    </>
  );
};

export default ExportExcelButton;
