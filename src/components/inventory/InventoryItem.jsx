import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * InventoryItem component for displaying a single inventory item
 * @param {object} props - Component props
 * @param {object} props.item - Inventory item to display
 * @param {function} props.onEdit - Edit handler
 * @param {function} props.onDelete - Delete handler
 * @param {boolean} props.isCompact - Whether to show compact version
 */
const InventoryItem = ({
  item,
  onEdit,
  onDelete,
  isCompact = false,
}) => {
  // Get status variant for badge
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
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
  
  // Render compact version
  if (isCompact) {
    return (
      <Card className="h-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
          <Badge variant={getStatusVariant(item.status)}>
            {item.status}
          </Badge>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="font-bold text-lg">${Number(item.price).toFixed(2)}</p>
          <p className="text-sm">Stock: {item.stock}</p>
        </div>
        {(onEdit || onDelete) && (
          <div className="mt-4 flex justify-end space-x-2">
            {onEdit && (
              <Button
                variant="outline"
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
        )}
      </Card>
    );
  }
}

export default InventoryItem;