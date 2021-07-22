import React from 'react';
import '../style/table.css';
import numeral from 'numeral';
function Table({ data }) {
  return (
    <div className="table">
      {data.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format('0,0')}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
