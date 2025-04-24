import React from 'react';
// import { useInventory } from '../../context/InventoryContext';
import { useInventory } from '../../context/InventoryContext'; // Adjust the import path as necessary
// import Card from '../components/ui/Card';
import Card from '../../components/ui/Card'; // Adjust the import path as necessary
import Button from '../../components/ui/Button';
import StockStatus from '../../components/inventory/StockStatus';
import InventoryList from '../../components/inventory/InventoryList';

/**
 * Dashboard page component
 */
const Dashboard = () => {
  const { filteredInventory, stats } = useInventory();
  
  // Get low stock and out of stock items for alerts
  const lowStockItems = filteredInventory.filter(item => item.status === 'Low Stock');
  const outOfStockItems = filteredInventory.filter(item => item.status === 'Out of Stock');
  
  // Calculate total inventory value
  const inventoryValue = filteredInventory.reduce((sum, item) => sum + (item.price * item.stock), 0);
  
  // Recent activity (mock data - in a real app, this would come from an API or context)
  const recentActivity = [
    { id: 1, action: 'Added new item', item: 'Mechanical Keyboard', user: 'John Doe', timestamp: '2 hours ago' },
    { id: 2, action: 'Updated inventory', item: 'Dell XPS 15', user: 'Jane Smith', timestamp: '3 hours ago' },
    { id: 3, action: 'Removed item', item: 'Office Chair', user: 'John Doe', timestamp: '1 day ago' },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Button variant="primary">Add New Item</Button>
      </div>
      
      {/* Inventory Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <h3 className="text-gray-500">Total Items</h3>
            <p className="text-3xl font-bold text-gray-800">{filteredInventory.length}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <h3 className="text-gray-500">Items in Stock</h3>
            <p className="text-3xl font-bold text-green-600">{stats.inStock}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <h3 className="text-gray-500">Low Stock Items</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats.lowStock}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <h3 className="text-gray-500">Inventory Value</h3>
            <p className="text-3xl font-bold text-blue-600">${inventoryValue.toFixed(2)}</p>
          </div>
        </Card>
      </div>
      
      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Inventory Alerts</h2>
            
            {lowStockItems.length === 0 && outOfStockItems.length === 0 ? (
              <p className="text-green-600">No inventory alerts at this time.</p>
            ) : (
              <div className="space-y-4">
                {lowStockItems.length > 0 && (
                  <div>
                    <h3 className="font-medium text-yellow-600">Low Stock Items ({lowStockItems.length})</h3>
                    <ul className="mt-2 space-y-1">
                      {lowStockItems.slice(0, 3).map(item => (
                        <li key={item.id} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="text-yellow-600 font-medium">{item.stock} remaining</span>
                        </li>
                      ))}
                      {lowStockItems.length > 3 && (
                        <li className="text-sm text-gray-500">
                          + {lowStockItems.length - 3} more items...
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                
                {outOfStockItems.length > 0 && (
                  <div>
                    <h3 className="font-medium text-red-600">Out of Stock Items ({outOfStockItems.length})</h3>
                    <ul className="mt-2 space-y-1">
                      {outOfStockItems.slice(0, 3).map(item => (
                        <li key={item.id} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="text-red-600 font-medium">Out of stock</span>
                        </li>
                      ))}
                      {outOfStockItems.length > 3 && (
                        <li className="text-sm text-gray-500">
                          + {outOfStockItems.length - 3} more items...
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div className="mt-4">
                  <Button variant="outline" size="sm">View All Alerts</Button>
                </div>
              </div>
            )}
          </Card>
          
          <div className="mt-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start p-3 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        <span>{activity.item}</span> by <span className="font-medium">{activity.user}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
        
        <div>
          <StockStatus
            inStock={stats.inStock}
            lowStock={stats.lowStock}
            outOfStock={stats.outOfStock}
          />
          
          <div className="mt-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
              {/* In a real app, you would add a pie chart here */}
              <div className="bg-gray-100 rounded p-4 text-center">
                <p className="text-gray-600">Category chart would be displayed here</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Recent Items */}
      <div className="mt-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Recent Inventory</h2>
          <InventoryList
            items={filteredInventory.slice(0, 5)}
            onView={(item) => console.log('View item', item.id)}
            onEdit={(item) => console.log('Edit item', item.id)}
          />
          <div className="mt-4 flex justify-center">
            <Button variant="outline">View All Inventory</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;