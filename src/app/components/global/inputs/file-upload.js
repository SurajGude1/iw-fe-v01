"use client";
import { useCallback } from "react";
import styles from "./file-upload.module.css";

export default function FileUpload({ onFileSelect, accept, label }) {
  const handleFileChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        onFileSelect(e.target.files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div className={styles.FileUpload}>
      <label className={styles.FileUploadLabel}>{label}</label>
      <div className={styles.FileUploadContainer}>
        <input
          type="file"
          onChange={handleFileChange}
          accept={accept}
          className={styles.FileInput}
          id="file-upload"
        />
        <label htmlFor="file-upload" className={styles.FileUploadButton}>
          Choose File
        </label>
        <span className={styles.FileName} id="file-name">
          No file chosen
        </span>
      </div>
    </div>
  );
}
