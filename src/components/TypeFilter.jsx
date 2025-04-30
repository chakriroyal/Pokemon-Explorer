import React from 'react';
const types = ['fire','water','grass','bug','normal','electric','poison','ground','fairy','fighting','psychic','rock','ghost','ice','dragon','dark','steel','flying'];

const TypeFilter = ({ selectedType, setSelectedType }) => (
  <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
    <option value="">All Types</option>
    {types.map(type => (
      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
    ))}
  </select>
);

export default TypeFilter;