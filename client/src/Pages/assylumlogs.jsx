import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import riddlerBg from "../imgs/riddlercode.jpg";

function AssylumLogs() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch categories from the database
    // Ensure your backend has a route set up for GET /categories
    axios
      .get("http://localhost:4000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Assuming the category object has an id property (e.g., category_id or id)
    const categoryID = category.categoryID || category.id;
    axios
      .get(`http://localhost:4000/categories/${categoryID}/questions`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions:", err));
  };

  return (
    <div className="riddler-theme">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

          .riddler-theme {
            min-height: 100vh;
            background-color: #000;
            background-image: url(${riddlerBg});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: #39ff14;
            font-family: 'VT323', monospace;
            padding-top: 50px;
          }

          .neon-text {
            text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14;
          }

          .riddler-table {
            border: 2px solid #39ff14;
            box-shadow: 0 0 15px #39ff14;
            background-color: rgba(0, 0, 0, 0.9);
            margin-top: 20px;
          }

          .riddler-table th {
            color: #39ff14;
            border-bottom: 2px solid #39ff14;
            font-size: 1.5rem;
            background-color: transparent !important;
          }

          .riddler-table td {
            color: #39ff14;
            border-bottom: 1px solid #39ff14;
            font-size: 1.2rem;
            background-color: transparent !important;
          }
          
          .table-hover tbody tr:hover td {
            color: #000;
            background-color: #39ff14 !important;
            box-shadow: 0 0 10px #39ff14;
            cursor: pointer;
          }
        `}
      </style>
      <Container>
        <h2 className="text-center neon-text mb-4">ASYLUM LOGS</h2>
        <Table responsive hover className="riddler-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Adjust these property names (category_id, category_name) based on your actual DB columns */}
                  <td>{category.name || category.name}</td>
                  <td>{category.description || category.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  NO DATA FOUND / DECRYPTING...
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {selectedCategory && (
          <div className="mt-5">
            <h3 className="text-center neon-text mb-3">
              LOGS FOR:{" "}
              {selectedCategory.name || selectedCategory.category_name}
            </h3>
            <Table responsive hover className="riddler-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>QUESTION</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, i) => (
                  <tr key={i}>
                    <td>{q.title || q.title}</td>
                    <td>{q.content || q.question}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AssylumLogs;
