import React from 'react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * InventoryList component for displaying inventory items
 * @param {object} props - Component props
 * @param {array} props.items - Inventory items to display
 * @param {function} props.onEdit - Edit handler
 * @param {function} props.onDelete - Delete handler
 * @param {function} props.onView - View handler
 * @param {boolean} props.isLoading - Whether list is loading
 */
const InventoryList = ({
  items = [],
  onEdit,
  onDelete,
  onView,
  isLoading = false
}) => {
  // Define table columns
  const columns = [
    {
      header: 'Item ID',
      accessor: 'id',
      width: '100px'
    },
    {
      header: 'Name',
      accessor: 'name'
    },
    {
      header: 'Category',
      accessor: 'category'
    },
    {
      header: 'Stock',
      accessor: 'stock',
      render: (item) => (
        <span className="font-medium">{item.stock}</span>
      )
    },
    {
      header: 'Price',
      accessor: 'price',
      render: (item) => (
        <span className="font-medium">${Number(item.price).toFixed(2)}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => {
        const getVariant = (status) => {
          switch (status.toLowerCase()) {
            case 'in stock':
              return 'success';
            case 'low stock':
              return 'warning';
            case 'out of stock':
              return 'danger';
            default:
              return 'secondary';
          }
        };
        
        return (
          <Badge variant={getVariant(item.status)}>
            {item.status}
          </Badge>
        );
      }
    },
    {
      header: 'Actions',
      render: (item) => (
        <div className="flex space-x-2">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView(item)}
            >
              View
            </Button>
          )}
          {onEdit && (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onEdit(item)}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => onDelete(item)}
            >
              Delete
            </Button>
          )}
        </div>
      )
    }
  ];
  
  return (
    <Table
      columns={columns}
      data={items}
      isLoading={isLoading}
      isStriped
      isHoverable
      loadingText="Loading inventory items..."
      emptyText="No inventory items found."
    />
  );
};

export default InventoryList;