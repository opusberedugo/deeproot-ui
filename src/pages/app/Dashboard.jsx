import React from 'react';
// import { useInventory } from '../../context/InventoryContext';
import { useInventory } from '../../context/InventoryContext'; // Adjust the import path as necessary
// import Card from '../components/ui/Card';
import Card from '../../components/ui/Card'; // Adjust the import path as necessary
import Button from '../../components/ui/Button';
import StockStatus from '../../components/inventory/StockStatus';
import InventoryList from '../../components/inventory/InventoryList';
import Sidebar2 from '../../components/layout/Sidebar2';
import { NavLink } from 'react-router-dom';

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
    <section className="p-5 bg-gray-50 min-h-screen flex gap-5">
      {/* Sidebar component */}
      <Sidebar2 className='flex justify-between content-between flex-row space-5'>
        <div className="">
          <img alt={""} src={"https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"} className="mx-auto h-10 w-auto" />

        </div>

        <nav className="my-auto space-y-2">
         <NavLink to="/app/" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
            <span className="ml-3">Dashboard</span>
          </NavLink>

          <NavLink to="/app/chat" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
            <span className="ml-3">Chat</span>
          </NavLink>

          <NavLink to="/app/inventory" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
            <span className="ml-3">Inventory</span>
          </NavLink>

          <NavLink to="/app/stats" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
          </svg>

            <span className="ml-3">Statistics</span>
          </NavLink>

        </nav>

        <div>

        </div>
      </Sidebar2> 
      
      {/* Dashboard Header */}
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
    </section>
  );
};

export default Dashboard;