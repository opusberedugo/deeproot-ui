import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import InventoryList from '../../components/inventory/InventoryList';
import SearchFilter from '../../components/inventory/SearchFilter';
import InventoryItem from '../../components/inventory/InventoryItem';
import Sidebar2 from '../../components/layout/Sidebar2';
import { NavLink } from 'react-router-dom';

/**
 * Inventory page component
 */
const Inventory = () => {
  const { 
    filteredInventory, 
    categories, 
    deleteItem, 
    filterInventory 
  } = useInventory();
  
  // State for modals
  const [viewItem, setViewItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  
  // Handle view item
  const handleViewItem = (item) => {
    setViewItem(item);
  };
  
  // Handle edit item
  const handleEditItem = (item) => {
    // Navigate to edit item page
    console.log('Navigate to edit item page for item:', item.id);
  };
  
  // Handle delete item
  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };
  
  // Confirm delete item
  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id);
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
      setItemToDelete(null);
      
      // Auto hide success message after 3 seconds
      setTimeout(() => {
        setShowDeleteSuccess(false);
      }, 3000);
    }
  };
  
  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };
  
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

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <Button variant="primary">Add New Item</Button>
        </div>
        
        {/* Success message */}
        {showDeleteSuccess && (
          <div className="mb-6">
            <Alert 
              variant="success" 
              isDismissible
              onDismiss={() => setShowDeleteSuccess(false)}
            >
              Item successfully deleted from inventory.
            </Alert>
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="mb-6">
          <SearchFilter 
            categories={categories}
            onFilter={filterInventory}
          />
        </div>
        
        {/* Inventory List */}
        <div>
          <InventoryList
            items={filteredInventory}
            onView={handleViewItem}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        </div>
        
        {/* View Item Modal */}
        <Modal
          isOpen={viewItem !== null}
          onClose={() => setViewItem(null)}
          title="View Inventory Item"
          size="lg"
        >
          {viewItem && <InventoryItem item={viewItem} />}
        </Modal>
        
        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteConfirm}
          onClose={cancelDelete}
          title="Confirm Delete"
          size="sm"
          footer={
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete Item
              </Button>
            </div>
          }
        >
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-medium">{itemToDelete?.name}</span>?
            This action cannot be undone.
          </p>
        </Modal>
      </div>
    </section>
  );
};

export default Inventory;