import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';
import InventoryList from '../components/inventory/InventoryList';
import SearchFilter from '../components/inventory/SearchFilter';
import InventoryItem from '../components/inventory/InventoryItem';

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
  );
};

export default Inventory;