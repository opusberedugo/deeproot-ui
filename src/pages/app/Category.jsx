import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';

/**
 * Categories page component
 */
const Categories = () => {
  const { categories, inventory } = useInventory();
  
  // State for category management
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Get items count by category
  const getItemsCount = (category) => {
    return inventory.filter(item => item.category === category).length;
  };
  
  // Show success message
  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };
  
  // Handle add category
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    
    if (categories.includes(newCategory.trim())) {
      setError('Category already exists');
      return;
    }
    
    // In a real app, this would update the categories via API or context
    console.log('Adding new category:', newCategory);
    
    // Show success message
    showSuccessMessage(`Category "${newCategory}" added successfully`);
    
    // Close modal and reset form
    setShowAddModal(false);
    setNewCategory('');
    setError('');
  };
  
  // Handle edit category
  const handleEditCategory = () => {
    if (!editedCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    
    if (categories.includes(editedCategory.trim()) && editedCategory.trim() !== currentCategory) {
      setError('Category already exists');
      return;
    }
    
    // In a real app, this would update the categories via API or context
    console.log('Editing category from', currentCategory, 'to', editedCategory);
    
    // Show success message
    showSuccessMessage(`Category renamed to "${editedCategory}" successfully`);
    
    // Close modal and reset form
    setShowEditModal(false);
    setCurrentCategory('');
    setEditedCategory('');
    setError('');
  };
  
  // Handle delete category
  const handleDeleteCategory = () => {
    // Check if category has items
    const itemsCount = getItemsCount(currentCategory);
    if (itemsCount > 0) {
      setError(`Cannot delete category with ${itemsCount} items. Please move or delete these items first.`);
      return;
    }
    
    // In a real app, this would update the categories via API or context
    console.log('Deleting category:', currentCategory);
    
    // Show success message
    showSuccessMessage(`Category "${currentCategory}" deleted successfully`);
    
    // Close modal and reset form
    setShowDeleteModal(false);
    setCurrentCategory('');
    setError('');
  };
  
  // Open edit modal for a category
  const openEditModal = (category) => {
    setCurrentCategory(category);
    setEditedCategory(category);
    setError('');
    setShowEditModal(true);
  };
  
  // Open delete modal for a category
  const openDeleteModal = (category) => {
    setCurrentCategory(category);
    setError('');
    setShowDeleteModal(true);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
        <Button 
          variant="primary" 
          onClick={() => {
            setNewCategory('');
            setError('');
            setShowAddModal(true);
          }}
        >
          Add New Category
        </Button>
      </div>
      
      {/* Success message */}
      {success && (
        <div className="mb-6">
          <Alert 
            variant="success" 
            isDismissible
            onDismiss={() => setSuccess('')}
          >
            {success}
          </Alert>
        </div>
      )}
      
      {/* Categories list */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Count
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{getItemsCount(category)} items</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => openEditModal(category)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(category)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Category"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </div>
        }
      >
        <Input
          label="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          error={error}
          required
        />
      </Modal>
      
      {/* Edit Category Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Category"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditCategory}>
              Save Changes
            </Button>
          </div>
        }
      >
        <Input
          label="Category Name"
          value={editedCategory}
          onChange={(e) => setEditedCategory(e.target.value)}
          error={error}
          required
        />
      </Modal>
      
      {/* Delete Category Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Category"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteCategory}>
              Delete Category
            </Button>
          </div>
        }
      >
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete the category <span className="font-medium">{currentCategory}</span>?
        </p>
        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}
      </Modal>
    </div>
  );
};

export default Categories;