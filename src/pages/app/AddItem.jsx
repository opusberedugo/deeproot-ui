import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import InventoryForm from '../components/inventory/InventoryForm';

/**
 * AddItem page component
 */
const AddItem = () => {
  const { addItem } = useInventory();
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newItemId, setNewItemId] = useState(null);
  
  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add item to inventory
      const newItem = addItem(formData);
      setNewItemId(newItem.id);
      setShowSuccess(true);
      
      // Auto hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error adding item:', error);
      // Would show error message here
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    // Navigate back to inventory page
    console.log('Navigate back to inventory page');
  };
  
  // Handle add another
  const handleAddAnother = () => {
    setShowSuccess(false);
    setNewItemId(null);
    
    // Scroll to top of page
    window.scrollTo(0, 0);
  };
  
  // Handle view item
  const handleViewItem = () => {
    if (newItemId) {
      // Navigate to view item page
      console.log('Navigate to view item page for item:', newItemId);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Item</h1>
        <Button 
          variant="outline" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
      
      {/* Success message */}
      {showSuccess && (
        <div className="mb-6">
          <Alert 
            variant="success" 
            isDismissible
            onDismiss={() => setShowSuccess(false)}
          >
            <div>
              <p className="font-medium">Item successfully added to inventory!</p>
              <div className="mt-2 flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddAnother}
                >
                  Add Another Item
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleViewItem}
                >
                  View Item
                </Button>
              </div>
            </div>
          </Alert>
        </div>
      )}
      
      {/* Form */}
      <InventoryForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
        submitLabel="Add Item"
      />
    </div>
  );
};

export default AddItem;