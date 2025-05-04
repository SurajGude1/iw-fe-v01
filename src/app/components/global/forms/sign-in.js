"use client";
import { useState, useEffect } from "react";
import Input from "../inputs/input";
import Button from "../buttons/button";
import styles from "./sign-in.module.css";
import {
  TextField,
  Button as MuiButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

export default function SignIn({ onClose }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting state for SSR compatibility
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(isSignIn ? "Signing in..." : "Creating account...");
  };

  return (
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.Modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
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

        {/* Form Container */}
        <div className={styles.FormContainer}>
          <h1 className={styles.FormTitle}>
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h1>

          <form onSubmit={handleSubmit} className={styles.Form}>
            {isSignIn ? (
              <>
                <TextField
                  id="username"
                  label="Username/Email"
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 48, // Slightly taller than default
                    },
                  }}
                />

                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 48, // Matching height
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className={styles.InputField}
                  label="Full Name"
                  required
                  autoComplete="name"
                />
                <Input
                  type="email"
                  id="new-email"
                  name="email"
                  placeholder="your@email.com"
                  className={styles.InputField}
                  label="Email Address"
                  required
                  autoComplete="email"
                />
                <Input
                  type="password"
                  id="new-password"
                  name="password"
                  placeholder="••••••••"
                  className={styles.InputField}
                  label="Password"
                  required
                  autoComplete="new-password"
                />
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className={styles.InputField}
                  label="Confirm Password"
                  required
                  autoComplete="new-password"
                />
              </>
            )}

            <div className={styles.ButtonContainer}>
              <Button
                type="submit"
                text={isSignIn ? "Sign In" : "Create Account"}
                backgroundColor="#333333"
                textColor="#ffffff"
                className={styles.SubmitButton}
              />
            </div>
          </form>

          {/* Form Footer Links */}
          <div className={styles.LinkContainer}>
            {isSignIn ? (
              <>
                <button
                  type="button"
                  className={styles.LinkButton}
                  onClick={() => setIsSignIn(false)}
                >
                  Create new account
                </button>
                <span className={styles.LinkDivider}>•</span>
                <button type="button" className={styles.LinkButton}>
                  Forgot password?
                </button>
              </>
            ) : (
              <button
                type="button"
                className={styles.LinkButton}
                onClick={() => setIsSignIn(true)}
              >
                Already have an account? Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
