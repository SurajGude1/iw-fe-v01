"use client";
import { useState } from "react";
import Input from "../inputs/input";
import Button from "../buttons/button";
import styles from "./contact.module.css";

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    message: "",
  });

  const purposeOptions = [
    "Advertisements",
    "Promotions",
    "Content",
    "General Inquiry",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.Modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.CloseButton}>
          <svg className={styles.CloseIcon} viewBox="0 0 24 24">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className={styles.Form}>
          <h2 className={styles.Title}>Contact Us</h2>

          <div className={styles.ScrollContainer}>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />

            <div className={styles.SelectContainer}>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={styles.Select}
                required
              >
                <option value="">Purpose of Contact</option>
                {purposeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.TextAreaContainer}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={styles.TextArea}
                required
                rows={5}
              />
            </div>
          </div>

          <div className={styles.ButtonWrapper}>
            <Button
              type="submit"
              text="Send Message"
              backgroundColor="var(--rich-black)"
              textColor="#ffffff"
              className={styles.SubmitButton}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
