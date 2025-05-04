"use client";
import { useState, useEffect } from "react";
import Input from "../inputs/input";
import Button from "../buttons/button";
import styles from "./sign-in.module.css";
import { TextField, Button as MuiButton, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SignIn({ onClose }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignIn ? "Signing in..." : "Creating account...");
  };

  const handleSocialLogin = (provider) => {
    console.log(`Signing in with ${provider}`);
    // Add your OAuth logic here
  };

  if (!isMounted) return null;

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

          {/* Social Login Buttons */}
          {isSignIn && (
            <div className={styles.SocialLoginContainer}>
              <MuiButton
                fullWidth
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
                onClick={() => handleSocialLogin("google")}
                sx={{
                  mb: 2,
                  height: 48,
                  color: "#000000",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Continue with Google
              </MuiButton>

              <MuiButton
                fullWidth
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faGithub} />}
                onClick={() => handleSocialLogin("github")}
                sx={{
                  height: 48,
                  color: "#000000",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Continue with GitHub
              </MuiButton>

              <Divider sx={{ my: 3 }}>OR</Divider>
            </div>
          )}

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
                    "& .MuiInputBase-root": { height: 48 },
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
                    "& .MuiInputBase-root": { height: 48 },
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  id="fullName"
                  label="Full name"
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputBase-root": { height: 48 },
                  }}
                />

                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputBase-root": { height: 48 },
                  }}
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
