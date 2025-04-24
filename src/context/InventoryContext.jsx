import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const InventoryContext = createContext();

// Sample initial inventory data
const initialInventoryData = [
  {
    id: '1001',
    name: 'MacBook Pro 16"',
    category: 'Electronics',
    stock: 15,
    price: 2399.99,
    status: 'In Stock',
    sku: 'MBP16-2022',
    description: 'Apple MacBook Pro 16-inch with M1 Pro chip',
    location: 'Warehouse A',
    supplier: 'Apple Inc.',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '1002',
    name: 'Dell XPS 15',
    category: 'Electronics',
    stock: 8,
    price: 1799.99,
    status: 'In Stock',
    sku: 'XPS15-2022',
    description: 'Dell XPS 15 laptop with InfinityEdge display',
    location: 'Warehouse A',
    supplier: 'Dell Technologies',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '1003',
    name: 'Office Desk Chair',
    category: 'Furniture',
    stock: 3,
    price: 299.99,
    status: 'Low Stock',
    sku: 'ODC-4512',
    description: 'Ergonomic office chair with lumbar support',
    location: 'Warehouse B',
    supplier: 'Office Depot',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '1004',
    name: 'HP LaserJet Printer',
    category: 'Office Supplies',
    stock: 0,
    price: 349.99,
    status: 'Out of Stock',
    sku: 'HPLJ-2022',
    description: 'HP LaserJet Pro wireless printer',
    location: 'Warehouse A',
    supplier: 'HP Inc.',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '1005',
    name: 'Wireless Mouse',
    category: 'Electronics',
    stock: 42,
    price: 49.99,
    status: 'In Stock',
    sku: 'WM-1010',
    description: 'Bluetooth wireless mouse with ergonomic design',
    location: 'Warehouse A',
    supplier: 'Logitech',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '1006',
    name: 'Standing Desk',
    category: 'Furniture',
    stock: 5,
    price: 499.99,
    status: 'In Stock',
    sku: 'SD-8800',
    description: 'Adjustable height standing desk',
    location: 'Warehouse B',
    supplier: 'Autonomous',
    lastUpdated: new Date().toISOString(),
  },
];

/**
 * InventoryProvider component for providing inventory data and functions
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const InventoryProvider = ({ children }) => {
  // State for inventory items
  const [inventory, setInventory] = useState(initialInventoryData);
  
  // State for filtered items
  const [filteredInventory, setFilteredInventory] = useState(initialInventoryData);
  
  // State for categories
  const [categories, setCategories] = useState([]);
  
  // State for inventory statistics
  const [stats, setStats] = useState({
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
  });
  
  // Extract unique categories from inventory
  useEffect(() => {
    const uniqueCategories = [...new Set(inventory.map(item => item.category))];
    setCategories(uniqueCategories);
  }, [inventory]);
  
  // Calculate inventory statistics
  useEffect(() => {
    const inStock = inventory.filter(item => item.status === 'In Stock').length;
    const lowStock = inventory.filter(item => item.status === 'Low Stock').length;
    const outOfStock = inventory.filter(item => item.status === 'Out of Stock').length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.stock), 0);
    
    setStats({
      inStock,
      lowStock,
      outOfStock,
      totalValue,
    });
  }, [inventory]);
  
  // Add new item to inventory
  const addItem = (item) => {
    // Generate new ID
    const newId = (Math.max(...inventory.map(i => parseInt(i.id)), 0) + 1).toString().padStart(4, '0');
    
    const newItem = {
      ...item,
      id: newId,
      lastUpdated: new Date().toISOString(),
    };
    
    setInventory(prev => [...prev, newItem]);
    return newItem;
  };
  
  // Update existing item
  const updateItem = (id, updates) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === id
          ? { ...item, ...updates, lastUpdated: new Date().toISOString() }
          : item
      )
    );
  };
  
  // Delete item
  const deleteItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };
  
  // Get item by ID
  const getItemById = (id) => {
    return inventory.find(item => item.id === id) || null;
  };
  
  // Filter inventory
  const filterInventory = (filters) => {
    let filtered = [...inventory];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.sku?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    
    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(item => item.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(item => item.price <= parseFloat(filters.maxPrice));
    }
    
    setFilteredInventory(filtered);
  };
  
  // Context value
  const value = {
    inventory,
    filteredInventory,
    categories,
    stats,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    filterInventory,
  };
  
  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook for using the inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  
  return context;
};

export default InventoryContext;