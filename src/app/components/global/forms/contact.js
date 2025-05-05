"use client";
import { useState } from "react";
import { TextField, Button as MuiButton, MenuItem } from "@mui/material";
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
            <TextField
              id="name"
              name="name"
              label="Full Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputBase-root": { height: 48 },
              }}
            />

            <TextField
              id="email"
              name="email"
              label="Email Address"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputBase-root": { height: 48 },
              }}
            />

            <TextField
              id="purpose"
              name="purpose"
              label="Purpose of Contact"
              variant="outlined"
              value={formData.purpose}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              select
              sx={{
                "& .MuiInputBase-root": { height: 48 },
              }}
            >
              <MenuItem value="">
                <em>Select purpose</em>
              </MenuItem>
              {purposeOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="message"
              name="message"
              label="Your Message"
              variant="outlined"
              value={formData.message}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              multiline
              rows={5}
              sx={{
                "& .MuiInputBase-root": {
                  height: "auto",
                  minHeight: "120px",
                },
              }}
            />
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
