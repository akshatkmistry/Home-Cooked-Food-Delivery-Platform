import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Home.css';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="home-container d-flex flex-column min-vh-100">
      <Navbar />

      {/* Carousel Section with Overlay Search */}
      <div className="carousel-section position-relative">
        <div className="carousel-overlay"></div>
        <div id="foodCarousel" className="carousel slide h-100" data-bs-ride="carousel">
          <div className="carousel-inner h-100">
            {[
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1350&q=80"
            ].map((src, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""} h-100`}>
                <img
                  src={src}
                  className="d-block w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt={`Slide ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay Search */}
        <div className="search-overlay">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <input
                  className="form-control search-input w-100"
                  type="search"
                  placeholder="🔍 Search for delicious food items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="container home-content flex-grow-1">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading delicious food for you...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger mt-3">
            <strong>Oops!</strong> {error}
          </div>
        ) : (
          <>
            {foodCat.length > 0 ? (
              foodCat.map((category) => {
                const filteredItems = foodItems.filter(
                  (item) =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                );

                return (
                  filteredItems.length > 0 && (
                    <div key={category._id} className="category-section">
                      <h3 className="category-title">{category.CategoryName}</h3>
                      <hr className="category-divider" />
                      <div className="food-grid">
                        {filteredItems.map((item, index) => (
                          <div key={item._id} className="food-item">
                            <Card item={item} options={item.options?.[0] || {}} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <div className="alert alert-info mt-3">
                <strong>No Content!</strong> No food categories found. Please check back later.
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
