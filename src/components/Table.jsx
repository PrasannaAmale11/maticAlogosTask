import React from "react";
import highlightRanges from "../highlightRange";

const Table = () => {
  return (
    <>
      <table className="table">
        <tr>
          <th>Period</th>
          <th>Max DD</th>
          <th>Days</th>
        </tr>
        {highlightRanges.map((range, index) => (
          <tr key={index}>
            <td>{`${range.startTime} - ${range.endTime}`}</td>
            <td>{range.Max_Drawdown}</td>
            <td>{range.Drawdown_days}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Table;
