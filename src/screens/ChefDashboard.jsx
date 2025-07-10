import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChefDashboard.css';

export default function ChefDashboard() {
  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    name: '',
    img: '',
    options: [{ half: '', full: '' }],
    CategoryName: '',
    description: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is chef
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'chef') {
      navigate('/');
      return;
    }
    
    loadFoodData();
  }, [navigate]);

  const loadFoodData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data && data.length > 0) {
        setFoodItems(data[0]);
        setCategories(data[1]);
      }
    } catch (error) {
      console.error('Error loading food data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/addFoodItem", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        },
        body: JSON.stringify(newItem)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Food item added successfully!');
        setNewItem({
          name: '',
          img: '',
          options: [{ half: '', full: '' }],
          CategoryName: '',
          description: ''
        });
        setShowAddForm(false);
        loadFoodData(); // Reload data
      } else {
        alert('Error adding food item: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      alert('Error adding food item');
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/deleteFoodItem/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
          }
        });
        
        const result = await response.json();
        
        if (result.success) {
          alert('Food item deleted successfully!');
          loadFoodData(); // Reload data
        } else {
          alert('Error deleting food item: ' + result.error);
        }
      } catch (error) {
        console.error('Error deleting food item:', error);
        alert('Error deleting food item');
      }
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/updateFoodItem/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        },
        body: JSON.stringify(editingItem)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Food item updated successfully!');
        setEditingItem(null);
        loadFoodData(); // Reload data
      } else {
        alert('Error updating food item: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating food item:', error);
      alert('Error updating food item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authtoken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    
    if (isEditing) {
      setEditingItem({ ...editingItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handlePriceChange = (index, field, value, isEditing = false) => {
    const item = isEditing ? editingItem : newItem;
    const updatedOptions = [...item.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    
    if (isEditing) {
      setEditingItem({ ...editingItem, options: updatedOptions });
    } else {
      setNewItem({ ...newItem, options: updatedOptions });
    }
  };

  if (loading) {
    return <div className="loading">Loading chef dashboard...</div>;
  }

  return (
    <div className="chef-dashboard">
      <header className="chef-header">
        <div className="header-content">
          <h1>Chef Dashboard</h1>
          <div className="header-actions">
            <button 
              className="btn-add-item"
              onClick={() => setShowAddForm(true)}
            >
              Add New Item
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="chef-main">
        {/* Add Item Form */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add New Food Item</h2>
              <form onSubmit={handleAddItem}>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Food Item Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    name="CategoryName"
                    value={newItem.CategoryName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat.CategoryName}>
                        {cat.CategoryName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <input
                  type="url"
                  name="img"
                  placeholder="Image URL"
                  value={newItem.img}
                  onChange={handleInputChange}
                  required
                />
                
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
                
                <div className="price-section">
                  <h4>Pricing Options</h4>
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Half Price"
                      value={newItem.options[0]?.half || ''}
                      onChange={(e) => handlePriceChange(0, 'half', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Full Price"
                      value={newItem.options[0]?.full || ''}
                      onChange={(e) => handlePriceChange(0, 'full', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-submit">Add Item</button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Item Form */}
        {editingItem && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Food Item</h2>
              <form onSubmit={handleUpdateItem}>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Food Item Name"
                    value={editingItem.name}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                  />
                  <select
                    name="CategoryName"
                    value={editingItem.CategoryName}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat.CategoryName}>
                        {cat.CategoryName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <input
                  type="url"
                  name="img"
                  placeholder="Image URL"
                  value={editingItem.img}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
                
                <textarea
                  name="description"
                  placeholder="Description"
                  value={editingItem.description}
                  onChange={(e) => handleInputChange(e, true)}
                  rows="3"
                  required
                />
                
                <div className="price-section">
                  <h4>Pricing Options</h4>
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Half Price"
                      value={editingItem.options[0]?.half || ''}
                      onChange={(e) => handlePriceChange(0, 'half', e.target.value, true)}
                    />
                    <input
                      type="number"
                      placeholder="Full Price"
                      value={editingItem.options[0]?.full || ''}
                      onChange={(e) => handlePriceChange(0, 'full', e.target.value, true)}
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-submit">Update Item</button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}        {/* Food Items by Category - Matching Home.css structure */}
        {categories.map(category => {
          const categoryItems = foodItems.filter(item => item.CategoryName === category.CategoryName);
          
          return (
            categoryItems.length > 0 && (
              <div key={category._id} className="category-section">
                <h3 className="category-title">{category.CategoryName}</h3>
                <hr className="category-divider" />
                <div className="food-grid">
                  {categoryItems.map(item => (
                    <div key={item._id} className="food-item-card">
                      <div className="item-image">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="item-content">
                        <h3>{item.name}</h3>
                        <p className="item-category">{item.CategoryName}</p>
                        <p className="item-description">{item.description}</p>
                        <div className="item-prices">
                          {item.options.map((option, index) => (
                            <div key={index} className="price-option">
                              {Object.entries(option).map(([size, price]) => (
                                <span key={size} className="price">
                                  {size}: ₹{price}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="item-actions">
                          <button 
                            className="btn-edit"
                            onClick={() => setEditingItem(item)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteItem(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          );
        })}
      </main>
    </div>
  );
}
