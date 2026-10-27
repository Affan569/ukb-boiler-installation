"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import QuoteModal from "../components/QuoteModal";
import {
  blogs,
  blogCategories,
  heroImages,
  formatDate,
  type BlogPost,
  type BlogCategory,
} from "../Data/blog";

const css = `
/* =====================================================================
   Blog page styles  (prefix: bp-)
   ===================================================================== */
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap");

.bp-page {
  --navy: #0b1f4d;
  --navy-2: #12306b;
  --blue: #2B75FF;
  --blue-2: #3b82f6;
  --orange: #ff7a1a;
  --orange-2: #ff9a3d;
  --text: #17233f;
  --muted: #6a7691;
  --line: #e6ebf5;
  --bg: #f6f8fd;
  --card: #ffffff;
  --radius: 16px;
  --shadow: 0 8px 28px rgba(18, 48, 107, 0.08);
  --shadow-hover: 0 16px 40px rgba(18, 48, 107, 0.16);

  font-family: var(--font-geist-sans), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
  padding-bottom: 48px;
  -webkit-font-smoothing: antialiased;
}
.bp-page *,
.bp-page *::before,
.bp-page *::after {
  box-sizing: border-box;
}
.bp-page h1,
.bp-page h2,
.bp-page h3,
.bp-page h4,
.bp-page h5,
.bp-page p,
.bp-page ul {
  margin: 0;
  padding: 0;
}
.bp-page ul {
  list-style: none;
}
.bp-page button {
  font-family: inherit;
  cursor: pointer;
}
.bp-container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------- shared bits ---------- */
.bp-img-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #dbe6ff 0%, #eef3ff 50%, #ffe9d6 100%);
}
.bp-avatar {
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.bp-avatar-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--blue), var(--blue-2));
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}
.bp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 10px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.bp-btn-primary {
  background: linear-gradient(135deg, #1e5eff, #2f7bff);
  color: #fff;
  box-shadow: 0 8px 20px rgba(30, 94, 255, 0.32);
}
.bp-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(30, 94, 255, 0.42);
}
.bp-btn-ghost {
  background: #fff;
  color: var(--blue);
  border: 1px solid var(--line);
}
.bp-btn-block {
  width: 100%;
}

/* =========================== HERO =========================== */
.bp-hero {
  position: relative;
  color: #fff;
  overflow: hidden;
  background: linear-gradient(120deg, #1a3f8f 0%, #2a5cc4 60%, #3b78e0 100%);
  border-radius: 0 0 28px 28px;
}
.bp-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center right;
  opacity: 0.9;
}
.bp-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(22, 56, 130, 0.49) 0%, rgba(30, 71, 160, 0.47) 35%, rgba(40, 90, 190, 0) 90%);
}
.bp-hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 56px;
  min-height: 630px;
}
.bp-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9fc0ff;
  margin-bottom: 14px;
}
.bp-hero h1 {
  font-size: clamp(32px, 4.2vw, 50px);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.bp-accent {
  background: linear-gradient(90deg, var(--orange), var(--orange-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.bp-hero-copy > p {
  margin-top: 16px;
  max-width: 520px;
  font-size: 15px;
  line-height: 1.65;
  color: #cfdcf7;
}
.bp-search {
  margin-top: 26px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 470px;
  background: #fff;
  color: #6a7691;
  border-radius: 14px;
  padding: 7px 7px 7px 18px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.25);
}
.bp-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  font-size: 14px;
  font-family: inherit;
  color: var(--text);
  background: transparent;
}
.bp-search-btn {
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e5eff, #2f7bff);
  color: #fff;
  display: grid;
  place-items: center;
  transition: transform 0.2s;
}
.bp-search-btn:hover {
  transform: scale(1.06);
}
.bp-hero-features {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
}
.bp-hero-features li {
  display: flex;
  align-items: center;
  gap: 11px;
}
.bp-feat-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #8fb6ff;
}
.bp-hero-features strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
}
.bp-hero-features small {
  font-size: 11.5px;
  color: #aebfe4;
}
.bp-hero-visual {
  position: relative;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bp-hero-thermo {
  max-height: 300px;
  width: auto;
  max-width: 70%;
  object-fit: contain;
  filter: drop-shadow(0 20px 36px rgba(0, 0, 0, 0.4));
}
.bp-hero-visual .bp-img-fallback {
  display: none;
}
.bp-script {
  font-family: "Caveat", cursive;
  font-weight: 700;
  line-height: 1.05;
  color: #fff;
}
.bp-hero-visual .bp-script {
  position: absolute;
  right: 4%;
  bottom: 6%;
  font-size: 30px;
  text-align: left;
  transform: rotate(-6deg);
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

/* ========================= FEATURED ========================= */
.bp-featured-wrap {
  margin-top: -34px;
  position: relative;
  z-index: 2;
}
.bp-featured {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  background: linear-gradient(110deg, #ffffff 0%, #f1f6ff 55%, #fff1e4 100%);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 18px 50px rgba(18, 48, 107, 0.16);
  border: 1px solid #fff;
}
.bp-featured-media {
  position: relative;
  min-height: 300px;
  background: #0e2a63;
}
.bp-featured-media img,
.bp-featured-media .bp-img-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bp-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, var(--orange), var(--orange-2));
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 7px 12px;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(255, 122, 26, 0.4);
}
.bp-featured-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 36px 20px 14px;
  background: linear-gradient(to top, rgba(6, 20, 56, 0.78), transparent);
  color: #fff;
  font-size: 12.5px;
}
.bp-featured-caption span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.bp-featured-body {
  padding: 34px 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 14px;
}
.bp-featured-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--orange);
}
.bp-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--orange);
}
.bp-featured-body h2 {
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.22;
  font-weight: 800;
  color: var(--navy);
  letter-spacing: -0.01em;
}
.bp-featured-body > p {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--muted);
  max-width: 480px;
}
.bp-byline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--muted);
}
.bp-sep {
  opacity: 0.5;
}

/* ====================== MAIN LAYOUT ====================== */
.bp-main {
  margin-top: 34px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 310px;
  gap: 28px;
  align-items: start;
}
.bp-cats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}
.bp-cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding: 16px 8px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  color: var(--text);
  box-shadow: 0 3px 12px rgba(18, 48, 107, 0.05);
  transition: all 0.2s;
}
.bp-cat-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: var(--blue);
  background: #eef3ff;
  transition: all 0.2s;
}
.bp-cat-label {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  line-height: 1.25;
}
.bp-cat:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.bp-cat.is-active {
  background: linear-gradient(135deg, #1e5eff, #3b82f6);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 12px 26px rgba(30, 94, 255, 0.34);
}
.bp-cat.is-active .bp-cat-icon {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.bp-latest-head {
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}
.bp-latest-eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 4px;
}
.bp-latest-head h3 {
  font-size: 28px;
  font-weight: 800;
  color: var(--navy);
  letter-spacing: -0.01em;
}
.bp-blue {
  color: var(--blue);
}
.bp-latest-head p {
  margin-top: 6px;
  font-size: 13.5px;
  color: var(--muted);
}
.bp-sort {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
}
.bp-sort select {
  appearance: none;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236a7691' stroke-width='3'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 9px 32px 9px 14px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
}

/* ---------- cards ---------- */
.bp-grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.bp-card {
  background: var(--card);
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s, box-shadow 0.25s;
}
.bp-card:hover,
.bp-card:focus-visible {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  outline: none;
}
.bp-card:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}
.bp-card-media {
  position: relative;
  height: 168px;
  overflow: hidden;
  background: #dbe6ff;
}
.bp-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s;
}
.bp-card:hover .bp-card-media img {
  transform: scale(1.06);
}
.bp-card-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fff;
  color: var(--blue);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  padding: 5px 10px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.bp-card-body {
  padding: 16px 16px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.bp-card-body h4 {
  font-size: 15.5px;
  line-height: 1.32;
  font-weight: 700;
  color: var(--navy);
}
.bp-card-body p {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.bp-card-foot {
  margin-top: auto;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.bp-card-author {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.bp-card-author strong {
  display: block;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text);
}
.bp-card-author small {
  display: block;
  font-size: 10.5px;
  color: var(--muted);
  white-space: nowrap;
}
.bp-card-arrow {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eef3ff;
  color: var(--blue);
  flex-shrink: 0;
  transition: all 0.2s;
}
.bp-card:hover .bp-card-arrow {
  background: var(--blue);
  color: #fff;
}
.bp-empty {
  margin-top: 22px;
  background: #fff;
  border: 1px dashed #c9d5f0;
  border-radius: var(--radius);
  padding: 48px 20px;
  text-align: center;
}
.bp-empty h4 {
  font-size: 18px;
  color: var(--navy);
}
.bp-empty p {
  margin: 6px 0 16px;
  color: var(--muted);
  font-size: 14px;
}

/* =========================== SIDEBAR =========================== */
.bp-sidebar {
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: sticky;
  top: 20px;
}
.bp-panel {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px 18px;
  box-shadow: var(--shadow);
}
.bp-panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 14px;
}
.bp-flame {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff1e4;
  color: var(--orange);
}
.bp-popular li + li {
  border-top: 1px solid var(--line);
}
.bp-popular button {
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  text-align: left;
  background: transparent;
  border: 0;
  padding: 11px 0;
  color: inherit;
}
.bp-pop-thumb {
  width: 54px;
  height: 54px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}
.bp-popular .bp-img-fallback.bp-pop-thumb {
  width: 54px;
  height: 54px;
}
.bp-popular strong {
  display: block;
  font-size: 12.5px;
  line-height: 1.35;
  font-weight: 700;
  color: var(--navy);
  transition: color 0.2s;
}
.bp-popular button:hover strong {
  color: var(--blue);
}
.bp-popular small {
  display: block;
  margin-top: 3px;
  font-size: 11px;
  color: var(--muted);
}

.bp-quote {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  padding: 24px 20px 20px;
  color: #fff;
  background: linear-gradient(150deg, #0b1f4d 0%, #14388a 70%, #1e5eff 130%);
  box-shadow: 0 16px 36px rgba(11, 31, 77, 0.35);
}
.bp-quote::after {
  content: "";
  position: absolute;
  right: -60px;
  top: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 122, 26, 0.35), transparent 70%);
}
.bp-quote h5 {
  font-size: 20px;
  font-weight: 800;
  position: relative;
}
.bp-quote-sub {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #ffb877;
  position: relative;
}
.bp-quote-text {
  margin: 6px 0 16px;
  font-size: 12.5px;
  line-height: 1.55;
  color: #cbd9f7;
  position: relative;
}
.bp-quote .bp-btn {
  position: relative;
  background: linear-gradient(135deg, #1e5eff, #3b82f6);
}
.bp-quote-badges {
  position: relative;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  text-align: center;
}
.bp-quote-badges li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.bp-quote-badges span {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #ffb877;
  margin-bottom: 5px;
}
.bp-quote-badges strong {
  font-size: 11px;
  font-weight: 700;
}
.bp-quote-badges small {
  font-size: 10px;
  color: #aebfe4;
}

/* =========================== NEWSLETTER =========================== */
.bp-news-wrap {
  margin-top: 34px;
}
.bp-news {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
  padding: 22px 28px;
  border-radius: 20px;
  background: linear-gradient(100deg, #eaf1ff 0%, #f6f9ff 55%, #ffe9d6 100%);
  border: 1px solid #fff;
  box-shadow: var(--shadow);
}
.bp-news-icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: #fff;
  color: var(--blue);
  box-shadow: 0 8px 20px rgba(30, 94, 255, 0.18);
  flex-shrink: 0;
}
.bp-news-copy {
  flex: 1 1 260px;
  min-width: 220px;
}
.bp-news-copy small {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--orange);
}
.bp-news-copy h4 {
  font-size: 20px;
  font-weight: 800;
  color: var(--navy);
  margin: 2px 0 4px;
}
.bp-news-copy p {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--muted);
  max-width: 420px;
}
.bp-news-form {
  display: flex;
  gap: 8px;
  flex: 1 1 340px;
  max-width: 440px;
  background: #fff;
  padding: 6px;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(18, 48, 107, 0.1);
}
.bp-news-form input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  padding: 0 12px;
  font-size: 13.5px;
  font-family: inherit;
  background: transparent;
}
.bp-news-form .bp-btn {
  padding: 11px 18px;
}
.bp-news-done {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #e7f8ee;
  color: #167a45;
  font-weight: 600;
  font-size: 14px;
  padding: 14px 20px;
  border-radius: 12px;
}
.bp-script-news {
  font-size: 22px;
  color: var(--blue);
  transform: rotate(-5deg);
  margin-left: auto;
  opacity: 0.85;
}

/* ============================ MODAL ============================ */
.bp-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(7, 18, 48, 0.62);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: bp-fade 0.2s ease;
}
.bp-modal {
  position: relative;
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: bp-pop 0.28s cubic-bezier(0.2, 0.9, 0.3, 1.1);
}
.bp-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: var(--navy);
  display: grid;
  place-items: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background 0.2s;
}
.bp-modal-close:hover {
  transform: scale(1.1);
  background: #fff;
}
.bp-modal-content {
  padding: 36px 40px;
}
.bp-modal-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  background: #eef3ff;
  padding: 6px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.bp-modal h2 {
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.2;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 16px;
}
.bp-modal-excerpt {
  font-size: 15px;
  line-height: 1.65;
  color: var(--muted);
  margin-bottom: 24px;
}
.bp-modal-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 24px;
}
.bp-modal-content p {
  font-size: 15px;
  line-height: 1.75;
  color: var(--text);
  margin-bottom: 16px;
}
.bp-modal-content p:last-child {
  margin-bottom: 0;
}
@keyframes bp-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes bp-pop {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* =========================== RESPONSIVE =========================== */
@media (max-width: 1024px) {
  .bp-main {
    grid-template-columns: 1fr;
  }
  .bp-sidebar {
    position: static;
  }
  .bp-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .bp-cats {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .bp-hero-inner {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 32px 0;
  }
  .bp-hero-visual {
    display: none;
  }
  .bp-featured {
    grid-template-columns: 1fr;
  }
  .bp-featured-media {
    min-height: 220px;
  }
  .bp-grid {
    grid-template-columns: 1fr;
  }
  .bp-cats {
    grid-template-columns: repeat(2, 1fr);
  }
  .bp-search {
    max-width: 100%;
  }
}
@media (max-width: 480px) {
  .bp-container {
    padding: 0 16px;
  }
  .bp-cat-label {
    font-size: 11px;
  }
  .bp-news {
    padding: 18px 20px;
  }
  .bp-news-form {
    flex-direction: column;
  }
  .bp-modal-content {
    padding: 24px 20px;
  }
}
`;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<"All Posts" | BlogCategory>("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (activeCategory !== "All Posts") {
      filtered = filtered.filter((blog) => blog.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.category.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return sorted;
  }, [activeCategory, searchQuery, sortBy]);

  const featuredPost = blogs.find((blog) => blog.featured);
  const popularPosts = blogs.filter((blog) => blog.popular);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const icons: Record<string, JSX.Element> = {
    grid: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    boiler: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/><path d="M12 2v2"/><path d="M4 6h2"/><path d="M18 6h2"/></svg>,
    wrench: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    leaf: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    flame: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    tools: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  };

  return (
    <div className="bp-page">
      <style>{css}</style>

      {/* HERO */}
      <section className="bp-hero">
        <div className="bp-hero-bg" style={{ backgroundImage: `url(${heroImages.background})` }} />
        <div className="bp-hero-overlay" />
        <div className="bp-container bp-hero-inner">
          <div>
            <span className="bp-eyebrow">Expert Heating Advice</span>
            <h1>
              Your Trusted Guide to <span className="bp-accent">Boiler Installation</span> & Maintenance
            </h1>
            <div className="bp-hero-copy">
              <p>
                Get expert insights on choosing the right boiler, maintaining your heating system, and saving energy. Written by Gas Safe registered engineers.
              </p>
            </div>
            <div className="bp-search">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bp-search-btn" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
            <ul className="bp-hero-features">
              <li>
                <div className="bp-feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <strong>Gas Safe</strong>
                  <small>Registered Engineers</small>
                </div>
              </li>
              <li>
                <div className="bp-feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <div>
                  <strong>10+ Years</strong>
                  <small>Industry Experience</small>
                </div>
              </li>
              <li>
                <div className="bp-feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <strong>5-Star</strong>
                  <small>Customer Reviews</small>
                </div>
              </li>
            </ul>
          </div>
          <div className="bp-hero-visual">
            <img src="/images/boiler-hero.png" alt="Boiler installation" className="bp-hero-thermo" />
            <div className="bp-img-fallback" />
            <div className="bp-script">Warm homes, happy customers</div>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && (
        <div className="bp-container bp-featured-wrap">
          <article className="bp-featured">
            <div className="bp-featured-media">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <div className="bp-img-fallback" />
              <span className="bp-badge">FEATURED</span>
              <div className="bp-featured-caption">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {featuredPost.readTime} min read
                </span>
                <span className="bp-sep">•</span>
                <span>{formatDate(featuredPost.date)}</span>
              </div>
            </div>
            <div className="bp-featured-body">
              <div className="bp-featured-label">
                <span className="bp-dot" />
                {featuredPost.category}
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="bp-byline">
                <span>By {featuredPost.author.name}</span>
                <span className="bp-sep">•</span>
                <span>{formatDate(featuredPost.date)}</span>
              </div>
              <button
                className="bp-btn bp-btn-primary"
                onClick={() => setSelectedPost(featuredPost)}
              >
                Read Article
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </article>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="bp-container bp-main">
        <div>
          {/* CATEGORIES */}
          <div className="bp-cats">
            {blogCategories.map((cat) => (
              <button
                key={cat.label}
                className={`bp-cat ${activeCategory === cat.label ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat.label)}
              >
                <div className="bp-cat-icon">{icons[cat.icon] || icons.grid}</div>
                <span className="bp-cat-label">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* LATEST POSTS HEADER */}
          <div className="bp-latest-head">
            <div>
              <span className="bp-latest-eyebrow">Latest Articles</span>
              <h3>
                {activeCategory === "All Posts" ? "All Posts" : activeCategory}{" "}
                <span className="bp-blue">({filteredBlogs.length})</span>
              </h3>
              <p>Expert advice to keep your home warm and efficient</p>
            </div>
            <div className="bp-sort">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* BLOG GRID */}
          {filteredBlogs.length > 0 ? (
            <div className="bp-grid">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bp-card"
                  onClick={() => setSelectedPost(blog)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPost(blog)}
                >
                  <div className="bp-card-media">
                    <img src={blog.image} alt={blog.title} />
                    <div className="bp-img-fallback" />
                    <span className="bp-card-tag">{blog.tag}</span>
                  </div>
                  <div className="bp-card-body">
                    <h4>{blog.title}</h4>
                    <p>{blog.excerpt}</p>
                  </div>
                  <div className="bp-card-foot">
                    <div className="bp-card-author">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="bp-avatar"
                        width="32"
                        height="32"
                      />
                      <div>
                        <strong>{blog.author.name}</strong>
                        <small>{formatDate(blog.date)}</small>
                      </div>
                    </div>
                    <div className="bp-card-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bp-empty">
              <h4>No articles found</h4>
              <p>Try adjusting your search or category filter</p>
              <button
                className="bp-btn bp-btn-ghost"
                onClick={() => {
                  setActiveCategory("All Posts");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* NEWSLETTER */}
          <div className="bp-news-wrap">
            <div className="bp-news">
              <div className="bp-news-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="bp-news-copy">
                <small>Stay Updated</small>
                <h4>Get Heating Tips Delivered</h4>
                <p>Weekly advice on boiler maintenance, energy saving, and special offers.</p>
              </div>
              {newsletterSubscribed ? (
                <div className="bp-news-done">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Subscribed!
                </div>
              ) : (
                <form className="bp-news-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="bp-btn bp-btn-primary">
                    Subscribe
                  </button>
                </form>
              )}
              <div className="bp-script-news">Stay warm! 🔥</div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="bp-sidebar">
          {/* QUOTE CTA */}
          <div className="bp-panel bp-quote">
            <h5>Get a Free Quote</h5>
            <div className="bp-quote-sub">Professional Boiler Installation</div>
            <p className="bp-quote-text">
              Tell us about your heating needs and our Gas Safe engineers will provide a competitive quote within 24 hours.
            </p>
            <button className="bp-btn" onClick={() => setQuoteOpen(true)}>
              Request Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <ul className="bp-quote-badges">
              <li>
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <strong>Gas Safe</strong>
                <small>Registered</small>
              </li>
              <li>
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </span>
                <strong>24/7</strong>
                <small>Support</small>
              </li>
              <li>
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </span>
                <strong>5-Star</strong>
                <small>Rated</small>
              </li>
            </ul>
          </div>

          {/* POPULAR POSTS */}
          <div className="bp-panel">
            <div className="bp-panel-title">
              <div className="bp-flame">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
              </div>
              Popular Posts
            </div>
            <ul className="bp-popular">
              {popularPosts.map((post) => (
                <li key={post.id}>
                  <button onClick={() => setSelectedPost(post)}>
                    <img src={post.image} alt={post.title} className="bp-pop-thumb" />
                    <div>
                      <strong>{post.title}</strong>
                      <small>{formatDate(post.date)} • {post.readTime} min</small>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* POST MODAL */}
      {selectedPost && (
        <div className="bp-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="bp-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="bp-modal-close"
              onClick={() => setSelectedPost(null)}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="bp-modal-content">
              <span className="bp-modal-tag">{selectedPost.tag}</span>
              <h2>{selectedPost.title}</h2>
              <p className="bp-modal-excerpt">{selectedPost.excerpt}</p>
              <div className="bp-modal-meta">
                <div className="bp-card-author">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="bp-avatar"
                    width="40"
                    height="40"
                  />
                  <div>
                    <strong>{selectedPost.author.name}</strong>
                    <small>{formatDate(selectedPost.date)}</small>
                  </div>
                </div>
                <span className="bp-sep">•</span>
                <span>{selectedPost.readTime} min read</span>
                <span className="bp-sep">•</span>
                <span>{selectedPost.category}</span>
              </div>
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <div style={{ marginTop: "24px" }}>
                <button className="bp-btn bp-btn-primary" onClick={() => setQuoteOpen(true)}>
                  Get a Quote for Your Boiler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUOTE MODAL */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
