import React from 'react';

/**
 * Table component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {array} props.columns - Column configuration [{header: string, accessor: string, render: function}]
 * @param {array} props.data - Table data array
 * @param {boolean} props.isStriped - Whether table has striped rows
 * @param {boolean} props.hasBorder - Whether table has border
 * @param {boolean} props.isHoverable - Whether table rows have hover effect
 * @param {function} props.onRowClick - Row click handler
 * @param {boolean} props.isLoading - Whether table is in loading state
 * @param {string} props.loadingText - Loading text
 * @param {string} props.emptyText - Empty state text
 * @param {string} props.className - Additional CSS classes
 */
const Table = ({
  columns = [],
  data = [],
  isStriped = true,
  hasBorder = true,
  isHoverable = true,
  onRowClick,
  isLoading = false,
  loadingText = 'Loading data...',
  emptyText = 'No data available',
  className = '',
  ...props
}) => {
  // Base classes
  const tableClasses = `min-w-full ${hasBorder ? 'border border-gray-200' : ''} ${className}`;
  
  // Header row classes
  const headerRowClasses = 'bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
  
  // Body row classes
  const getRowClasses = (index) => {
    const baseRowClasses = [];
    
    if (isStriped && index % 2 === 1) {
      baseRowClasses.push('bg-gray-50');
    }
    
    if (isHoverable) {
      baseRowClasses.push('hover:bg-blue-50');
    }
    
    if (onRowClick) {
      baseRowClasses.push('cursor-pointer');
    }
    
    return baseRowClasses.join(' ');
  };
  
  // Cell classes
  const cellClasses = 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';
  const headerCellClasses = 'px-6 py-3';
  
  // Loading and empty state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 bg-white border border-gray-200 rounded-lg">
        <p className="text-gray-500">{loadingText}</p>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 bg-white border border-gray-200 rounded-lg">
        <p className="text-gray-500">{emptyText}</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className={tableClasses} {...props}>
        <thead>
          <tr className={headerRowClasses}>
            {columns.map((column, columnIndex) => (
              <th 
                key={columnIndex}
                className={headerCellClasses}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={getRowClasses(rowIndex)}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className={cellClasses}>
                  {column.render 
                    ? column.render(row) 
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;