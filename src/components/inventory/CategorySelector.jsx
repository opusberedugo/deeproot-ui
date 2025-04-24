import React, { useState,  } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';

/**
 * CategorySelector component for selecting/creating inventory categories
 * @param {object} props - Component props
 * @param {string} props.label - Field label
 * @param {string} props.selectedCategory - Currently selected category
 * @param {function} props.onChange - Change handler
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.error - Error message
 */
const CategorySelector = ({
  label = 'Category',
  selectedCategory = '',
  onChange,
  required = false,
  error = '',
}) => {
  // State for handling new category creation
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  // Mock list of categories (in a real app, this would come from an API or context)
  const [categories, setCategories] = useState([
    'Electronics',
    'Office Supplies',
    'Furniture',
    'Kitchen',
    'Clothing',
    'Tools',
    'Books',
  ]);
  
  // Prepare options for the select input
  const categoryOptions = categories.map(cat => ({
    label: cat,
    value: cat,
  }));
  
  // Add "Add new category" option
  const allOptions = [
    ...categoryOptions,
    { label: '+ Add new category', value: 'add_new' },
  ];
  
  // Handle select change
  const handleSelectChange = (e) => {
    const value = e.target.value;
    
    if (value === 'add_new') {
      setIsAddingNew(true);
    } else {
      onChange(value);
    }
  };
  
  // Handle new category input change
  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };
  
  // Handle save new category
  const handleSaveCategory = () => {
    if (newCategory.trim()) {
      // Add new category to the list
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      
      // Select the new category
      onChange(newCategory.trim());
      
      // Reset state
      setNewCategory('');
      setIsAddingNew(false);
    }
  };
  
  // Handle cancel adding new category
  const handleCancelAddNew = () => {
    setNewCategory('');
    setIsAddingNew(false);
  };
  
  // If adding new category
  if (isAddingNew) {
    return (
      <div className="mb-4">
        <Input
          label={label}
          value={newCategory}
          onChange={handleNewCategoryChange}
          placeholder="Enter new category name"
          required={required}
          error={error}
        />
        <div className="mt-2 flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveCategory}
            disabled={!newCategory.trim()}
          >
            Save Category
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelAddNew}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  
  // Default select view
  return (
    <Select
      label={label}
      value={selectedCategory}
      onChange={handleSelectChange}
      options={allOptions}
      required={required}
      error={error}
    />
  );
};

export default CategorySelector;