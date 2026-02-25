import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import riddlerBg from "../imgs/riddlercode.jpg";

function AssylumLogs() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [answerInput, setAnswerInput] = useState("");

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

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    console.log("submit")
    console.log(localStorage.getItem("userID"))
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }
    const categoryID = selectedCategory.categoryID || selectedCategory.id;
    const userID = localStorage.getItem("userID");

    if (!userID || userID === "undefined") {
      alert("User ID not found. Please log out and log in again.");
      return;
    }

    axios
      .post(`http://localhost:4000/categories/${categoryID}/questions`, {
        ...newQuestion,
        userID,
      })
      .then(() => {
        alert("Log added successfully!");
        handleCategoryClick(selectedCategory); // Re-triggers fetch for questions
        setNewQuestion({ title: "", content: "" }); // Reset form
      })
      .catch((err) => {
        console.error("Error adding question:", err);
        alert(
          `Failed to add log: ${err.response?.data?.message || err.message}`,
        );
      });
  };

  const handleQuestionClick = (question) => {
    console.log ("Question Clicked")
    console.log (question)

    setActiveQuestion(question);
    const qID = question.questionID || question.id;

    // Fetch answers for this question
    axios
      .get(`http://localhost:4000/answers/${qID}`)
      .then((res) => setCurrentAnswers(res.data))
      .catch((err) => console.error("Error fetching answers:", err));

    setShowAnswerModal(true);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");
    if (!userID) return alert("Please log in to answer.");

    console.log ("submit answer")
    console.log (activeQuestion)
    const qID = activeQuestion.questionID || activeQuestion.id;
    console.log("qid:", activeQuestion.questionID);
    console.log("userID", userID)
    console.log("answer input: ", answerInput)

    axios
      .post("http://localhost:4000/answers", {
        questionID: activeQuestion.questionID,
        userID,
        answer: answerInput,
      })
      .then(() => {
        setAnswerInput("");
        return axios.get(`http://localhost:4000/answers/${qID}`);
      })
      .then((res) => {
        console.log (res.data)
        setCurrentAnswers(res.data)})
      .catch((err) => alert("Failed to add answer"));
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

          .riddler-card {
            border: 2px solid #39ff14;
            box-shadow: 0 0 15px #39ff14, inset 0 0 15px #39ff14;
            background-color: rgba(0, 0, 0, 0.9);
          }

          .riddler-input {
            background-color: #111 !important;
            border: 1px solid #39ff14 !important;
            color: #39ff14 !important;
            font-family: 'VT323', monospace !important;
          }

          .riddler-input:focus {
            background-color: #000 !important;
            border-color: #39ff14 !important;
            box-shadow: 0 0 10px #39ff14 !important;
            color: #39ff14 !important;
          }

          .btn-neon {
            background-color: transparent;
            border: 1px solid #39ff14;
            color: #39ff14;
            font-family: 'VT323', monospace;
            font-size: 1.5rem;
            text-transform: uppercase;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 0 5px #39ff14;
          }

          .btn-neon:hover {
            background-color: #39ff14;
            color: #000;
            box-shadow: 0 0 20px #39ff14, 0 0 40px #39ff14;
            border-color: #39ff14;
          }

          .riddler-modal {
            background-color: #000 !important;
            border: 2px solid #39ff14 !important;
            box-shadow: 0 0 20px #39ff14 !important;
            color: #39ff14 !important;
            font-family: 'VT323', monospace !important;
          }

          .modal-header {
            border-bottom: 1px solid #39ff14 !important;
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
          <>
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
                    <tr
                      key={i}
                      onClick={() => handleQuestionClick(q)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{q.title || q.title}</td>
                      <td>{q.content || q.content}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="mt-5">
              <h3 className="text-center neon-text mb-3">
                ADD NEW LOG TO:{" "}
                {selectedCategory.name || selectedCategory.category_name}
              </h3>
              <Form
                onSubmit={handleAddQuestionSubmit}
                className="riddler-card p-4"
              >
                <Form.Group className="mb-3">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newQuestion.title}
                    onChange={handleNewQuestionChange}
                    className="riddler-input"
                    placeholder="Enter log title"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>QUESTION / LOG</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="content"
                    value={newQuestion.content}
                    onChange={handleNewQuestionChange}
                    className="riddler-input"
                    placeholder="Riddle me this..."
                    required
                  />
                </Form.Group>
                <Button
                  variant="outline-success"
                  type="submit"
                  className="btn-neon"
                >
                  ADD LOG
                </Button>
              </Form>
            </div>
          </>
        )}
      </Container>

      <Modal
        show={showAnswerModal}
        onHide={() => setShowAnswerModal(false)}
        centered
        contentClassName="riddler-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>LOG DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeQuestion && (
            <>
              <h4>{activeQuestion.title}</h4>
              <p>{activeQuestion.content || activeQuestion.question}</p>
              <hr style={{ borderColor: "#39ff14" }} />
              <h5>ANSWERS:</h5>
              {currentAnswers.length > 0 ? (
                <ul className="list-unstyled">
                  {currentAnswers.map((ans, idx) => (
                    <li key={idx} className="mb-2">
                      <strong className="text-success">&gt;</strong>{" "}
                      {ans.answer}{" "}
                      <small className="">{ans.content}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No answers yet.</p>
              )}
              <hr style={{ borderColor: "#39ff14" }} />
              <Form onSubmit={handleAnswerSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>ADD ANSWER</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    className="riddler-input"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-success"
                  className="btn-neon"
                >
                  SUBMIT
                </Button>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AssylumLogs;
