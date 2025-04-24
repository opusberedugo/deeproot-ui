import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Card from '../components/ui/Card';
import InventoryForm from '../components/inventory/InventoryForm';

/**
 * EditItem page component
 * @param {object} props - Component props
 * @param {string} props.itemId - ID of the item to edit
 */
const EditItem = ({ itemId = '1001' }) => { // In a real app, itemId would come from route params
  
  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const fetchedItem = getItemById(itemId);
        
        if (fetchedItem) {
          setItem(fetchedItem);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        setError('Error fetching item data');
        console.error('Error fetching item:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItem();
  }, [itemId, getItemById]);
  
  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update item in inventory
      updateItem(itemId, formData);
      setShowSuccess(true);
      
      // Auto hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error updating item:', err);
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
  
  // Handle view item
  const handleViewItem = () => {
    // Navigate to view item page
    console.log('Navigate to view item page for item:', itemId);
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading item data...</p>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <Card>
        <div className="text-center py-6">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{error}</h2>
          <p className="text-gray-600 mb-4">Unable to load the requested item.</p>
          <Button variant="primary" onClick={handleCancel}>
            Back to Inventory
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Item</h1>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleViewItem}
          >
            View Item
          </Button>
        </div>
      </div>
      
      {/* Success message */}
      {showSuccess && (
        <div className="mb-6">
          <Alert 
            variant="success" 
            isDismissible
            onDismiss={() => setShowSuccess(false)}
          >
            Item successfully updated.
          </Alert>
        </div>
      )}
      
      {/* Form */}
      {item && (
        <InventoryForm
          initialValues={item}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
          submitLabel="Update Item"
        />
      )}
    </div>
  );
};

export default EditItem;const { getItemById, updateItem } = useInventory();
  
  // State for item data
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);