"use client";
import { useState } from "react";
import Input from "../inputs/input";
import Button from "../buttons/button";
import FileUpload from "../inputs/file-upload";
import styles from "./earn.module.css";

export default function EarnForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    experience: "",
    workLink: "",
    interests: [],
  });

  const [file, setFile] = useState(null);

  const experienceOptions = ["1-3 years", "3-5 years", "5+ years"];
  const interestOptions = ["Political", "Health", "Social", "Women", "Crime"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, file });
  };

  return (
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.Modal} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className={styles.CloseButton}
          aria-label="Close sign in form"
        >
          <svg
            className={styles.CloseIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className={styles.Form}>
          <h2 className={styles.Title}>Join us</h2>

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

            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              label="Date of Birth"
              required
            />

            <div className={styles.SelectContainer}>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={styles.Select}
                required
              >
                <option value="">Experience in Writing</option>
                {experienceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <FileUpload
              onFileSelect={setFile}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />

            <Input
              type="url"
              name="workLink"
              value={formData.workLink}
              onChange={handleChange}
              placeholder="Share Work Link (Optional)"
            />

            <div className={styles.CheckboxGroup}>
              <p className={styles.CheckboxTitle}>Interested Fields</p>
              <div className={styles.CheckboxOptions}>
                {interestOptions.map((opt) => (
                  <label key={opt} className={styles.CheckboxLabel}>
                    <input
                      type="checkbox"
                      name="interests"
                      value={opt}
                      checked={formData.interests.includes(opt)}
                      onChange={handleChange}
                      className={styles.CheckboxInput}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.ButtonWrapper}>
            <Button
              type="submit"
              text="Submit Application"
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
