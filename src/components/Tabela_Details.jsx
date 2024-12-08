import React from 'react';
import "../css/tabela_hosts.css";

const Tabela_Details = ({ data, title }) => {
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <div key={index}>
          {Object.entries(item).map(([key, val]) => (
            <div key={key}>
              {key}: {val}
            </div>
          ))}
        </div>
      ));
    } else if (typeof value === 'object') {
      return Object.entries(value).map(([key, val]) => (
        <div key={key}>
          {key}: {val}
        </div>
      ));
    } else {
      return value;
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <table className='table-detail'>
        <tbody>
          {Object.entries(data).map(([key, value], index) => (
            <tr key={index}>
              <td className="key chave-detail">{key}</td>
              <td className="value chave-detail">{renderValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabela_Details;