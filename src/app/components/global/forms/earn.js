"use client";
import { useState } from "react";
import {
  TextField,
  Button as MuiButton,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
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
              id="dob"
              name="dob"
              label="Date of Birth"
              variant="outlined"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiInputBase-root": { height: 48 },
              }}
            />

            <TextField
              id="experience"
              name="experience"
              label="Experience in Writing"
              variant="outlined"
              value={formData.experience}
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
                <em>Select experience</em>
              </MenuItem>
              {experienceOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>

            <FileUpload
              onFileSelect={setFile}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />

            <TextField
              id="workLink"
              name="workLink"
              label="Share Work Link (Optional)"
              variant="outlined"
              type="url"
              value={formData.workLink}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputBase-root": { height: 48 },
              }}
            />

            <div className={styles.CheckboxGroup}>
              <p className={styles.CheckboxTitle}>Interested Fields</p>
              <div className={styles.CheckboxOptions}>
                {interestOptions.map((opt) => (
                  <FormControlLabel
                    key={opt}
                    control={
                      <Checkbox
                        checked={formData.interests.includes(opt)}
                        onChange={handleChange}
                        value={opt}
                        name="interests"
                      />
                    }
                    label={opt}
                  />
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
