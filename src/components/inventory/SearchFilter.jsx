import React from 'react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

/**
 * StockStatus component for displaying inventory stock status
 * @param {object} props - Component props
 * @param {number} props.inStock - Number of items in stock
 * @param {number} props.lowStock - Number of items in low stock
 * @param {number} props.outOfStock - Number of items out of stock
 * @param {string} props.className - Additional CSS classes
 */
const StockStatus = ({
  inStock = 0,
  lowStock = 0,
  outOfStock = 0,
  className = '',
}) => {
  // Calculate total items
  const totalItems = inStock + lowStock + outOfStock;
  
  // Calculate percentages
  const inStockPercent = totalItems ? Math.round((inStock / totalItems) * 100) : 0;
  const lowStockPercent = totalItems ? Math.round((lowStock / totalItems) * 100) : 0;
  const outOfStockPercent = totalItems ? Math.round((outOfStock / totalItems) * 100) : 0;
  
  return (
    <Card className={className}>
      <h3 className="font-medium text-lg mb-4">Inventory Status</h3>
      
      <div className="space-y-4">
        {/* Status summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{inStock}</div>
            <Badge variant="success" className="mt-1">In Stock</Badge>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{lowStock}</div>
            <Badge variant="warning" className="mt-1">Low Stock</Badge>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{outOfStock}</div>
            <Badge variant="danger" className="mt-1">Out of Stock</Badge>
          </div>
        </div>
        
        {/* Progress bars */}
        <div className="pt-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Total Items: {totalItems}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${inStockPercent}%`, float: 'left' }}
            />
            <div 
              className="h-full bg-yellow-500" 
              style={{ width: `${lowStockPercent}%`, float: 'left' }}
            />
            <div 
              className="h-full bg-red-500" 
              style={{ width: `${outOfStockPercent}%`, float: 'left' }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{inStockPercent}% In Stock</span>
            <span>{lowStockPercent}% Low Stock</span>
            <span>{outOfStockPercent}% Out of Stock</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StockStatus;