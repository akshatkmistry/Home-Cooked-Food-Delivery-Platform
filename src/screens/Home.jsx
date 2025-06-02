import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Carousel Section with Overlay Search */}
      <div className="position-relative" style={{ height: "500px", overflow: "hidden" }}>
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
                  style={{ objectFit: "cover", filter: "brightness(0.6)" }}
                  alt={`Slide ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay Search */}
        <div
          className="position-absolute top-50 start-50 translate-middle w-100 px-3"
          style={{ zIndex: 10 }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <input
                  className="form-control form-control-lg shadow border-0"
                  type="search"
                  placeholder="Search for food items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    borderRadius: "50px",
                    padding: "1rem 1.5rem",
                    fontSize: "1.2rem"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="container mt-5 flex-grow-1">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status" />
            <p className="mt-3">Loading delicious food for you...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger mt-3">{error}</div>
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
                    <div key={category._id} className="mb-5">
                      <h3 className="text-success fw-semibold mb-3">{category.CategoryName}</h3>
                      <hr className="mb-4" />
                      <div className="row g-4">
                        {filteredItems.map((item) => (
                          <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <Card item={item} options={item.options?.[0] || {}} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <div className="alert alert-info mt-3">No food categories found</div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
