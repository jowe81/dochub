import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Documents from './components/pages/Documents';
import Document from './components/pages/Document';
import EditDocument from './components/pages/EditDocument';
import Upload from './components/pages/Upload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/:documentId/edit" element={<EditDocument />} />
          <Route path="documents/:documentId" element={<Document />} />
          <Route path="upload" element={<Upload />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
