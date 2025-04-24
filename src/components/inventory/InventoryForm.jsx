import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CategorySelector from './CategorySelector';

/**
 * InventoryForm component for adding/editing inventory items
 * @param {object} props - Component props
 * @param {object} props.initialValues - Initial form values
 * @param {function} props.onSubmit - Submit handler
 * @param {function} props.onCancel - Cancel handler
 * @param {boolean} props.isLoading - Whether form is submitting
 * @param {string} props.submitLabel - Submit button label
 */
const InventoryForm = ({
  initialValues = {},
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Save Item',
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    sku: '',
    description: '',
    status: 'In Stock',
    location: '',
    supplier: '',
    ...initialValues,
  });
  
  // Status options
  const statusOptions = [
    { label: 'In Stock', value: 'In Stock' },
    { label: 'Low Stock', value: 'Low Stock' },
    { label: 'Out of Stock', value: 'Out of Stock' },
  ];
  
  // Update form data when initialValues change
  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        ...initialValues,
      }));
    }
  }, [initialValues]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      category,
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
            
            <Input
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <CategorySelector
              label="Category"
              selectedCategory={formData.category}
              onChange={handleCategoryChange}
              required
            />
            
            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              helperText="Unique stock keeping unit identifier"
            />
            
            <Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              as="textarea"
              rows={4}
            />
          </div>
          
          {/* Inventory Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700 mb-2">Inventory Details</h3>
            
            <Input
              label="Current Stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              helperText="Enter price in USD"
            />
            
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
              required
            />
            
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              helperText="Storage location (optional)"
            />
            
            <Input
              label="Supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              helperText="Item supplier (optional)"
            />
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default InventoryForm;