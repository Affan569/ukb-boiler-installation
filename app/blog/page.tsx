"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import QuoteModal from "../components/QuoteModal"; // path adjust karo agar alag ho
import {
  blogs,
  blogCategories,
  heroImages,
  formatDate,
  type BlogPost,
  type BlogCategory,
} from "../Data/blog";

/* ------------------------------------------------------------------ */
/*  Built-in styles (no separate CSS file needed)                      */
/* ------------------------------------------------------------------ */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boiler Installation Blog | Heating Tips & Advice | UKB Boiler Installs Southampton",
  description: "Expert advice on boiler installation, maintenance, and energy efficiency. Learn about combi boilers, system boilers, and heating systems from Southampton's Gas Safe registered engineers.",
  keywords: "boiler installation blog, heating tips, boiler maintenance, energy efficiency, combi boiler advice, boiler repair tips, central heating advice, Southampton heating guide",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://ukbboilerinstalls.co.uk/blog',
    title: 'Boiler Installation Blog | Heating Tips & Advice | UKB Boiler Installs Southampton',
    description: 'Expert advice on boiler installation, maintenance, and energy efficiency. Learn about combi boilers, system boilers, and heating systems from Southampton\'s Gas Safe registered engineers.',
  },
};

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
  ul.bp-hero-features {
    padding-top: 20px;
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
  transform: rotate(90deg);
  background: #fff1e4;
}
.bp-modal-cover {
  position: relative;
  height: 280px;
  background: #dbe6ff;
}
.bp-modal-cover img,
.bp-modal-cover .bp-img-fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bp-modal-tag {
  position: absolute;
  left: 20px;
  bottom: 16px;
  background: linear-gradient(135deg, var(--orange), var(--orange-2));
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 7px 12px;
  border-radius: 8px;
}
.bp-modal-body {
  padding: 28px 34px 32px;
}
.bp-modal-meta {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 16px;
}
.bp-modal-meta strong {
  display: block;
  font-size: 13.5px;
}
.bp-modal-meta span {
  font-size: 12px;
  color: var(--muted);
}
.bp-modal-body h2 {
  font-size: clamp(22px, 3vw, 30px);
  line-height: 1.22;
  font-weight: 800;
  color: var(--navy);
  letter-spacing: -0.01em;
}
.bp-modal-lead {
  margin: 12px 0 18px;
  padding-left: 14px;
  border-left: 3px solid var(--orange);
  font-size: 15px;
  line-height: 1.6;
  color: #3b4a6b;
  font-weight: 500;
}
.bp-modal-body > p:not(.bp-modal-lead) {
  font-size: 14.5px;
  line-height: 1.8;
  color: #46557a;
  margin-bottom: 14px;
}
.bp-modal-cta {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 18px 20px;
  border-radius: 14px;
  background: linear-gradient(110deg, #eaf1ff, #fff1e4);
}
.bp-modal-cta h4 {
  font-size: 16px;
  color: var(--navy);
}
.bp-modal-cta p {
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 2px;
}

@keyframes bp-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes bp-pop {
  from { opacity: 0; transform: translateY(18px) scale(0.97); }
  to { opacity: 1; transform: none; }
}

/* ========================== RESPONSIVE ========================== */
@media (max-width: 1100px) {
  .bp-main {
    grid-template-columns: 1fr;
  }
  .bp-sidebar {
    position: static;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 900px) {
  .bp-hero-inner {
    grid-template-columns: 1fr;
    padding-top: 48px;
  }
  .bp-hero-visual {
    min-height: 220px;
  }
  .bp-featured {
    grid-template-columns: 1fr;
  }
  .bp-featured-media {
    min-height: 240px;
  }
  .bp-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .bp-cats {
    grid-template-columns: repeat(3, 1fr);
  }
  .bp-script-news {
    display: none;
  }
}
@media (max-width: 640px) {
  .bp-container {
    padding: 0 16px;
  }
  .bp-grid {
    grid-template-columns: 1fr;
  }
  .bp-sidebar {
    grid-template-columns: 1fr;
  }
  .bp-featured-body {
    padding: 24px 20px;
  }
  .bp-hero-features {
    gap: 16px;
  }
  .bp-news {
    padding: 20px;
  }
  .bp-news-form {
    max-width: none;
    width: 100%;
  }
  .bp-modal-cover {
    height: 190px;
  }
  .bp-modal-body {
    padding: 22px 20px 26px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .bp-page * {
    animation: none !important;
    transition: none !important;
  }
}
`;

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

/** <img> that falls back to a soft gradient if the file isn't there yet */
const SmartImage: React.FC<{ src: string; alt: string; className?: string }> = ({
  src,
  alt,
  className,
}) => {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <div className={`bp-img-fallback ${className ?? ""}`} aria-label={alt} role="img" />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const Avatar: React.FC<{ src: string; name: string; size?: number }> = ({
  src,
  name,
  size = 26,
}) => {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  if (failed || !src) {
    return (
      <span className="bp-avatar-fallback" style={{ width: size, height: size }}>
        {initials}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      className="bp-avatar"
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG, no external library)                            */
/* ------------------------------------------------------------------ */

type IconProps = { size?: number };
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

const IconSearch: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
const IconArrow: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const IconClock: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const IconPlay: React.FC<IconProps> = ({ size }) => (
  <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
  </svg>
);
const IconClose: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
const IconShield: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 3 4.5 6v5.5c0 4.4 3 8.2 7.5 9.5 4.5-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconBulb: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
  </svg>
);
const IconLeaf: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M5 19c0-8 5-13 15-14 0 10-5 15-13 15" />
    <path d="M5 19c2-4 5-7 9-9" />
  </svg>
);
const IconGrid: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </svg>
);
const IconBoiler: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <rect x="6" y="3" width="12" height="18" rx="2.5" />
    <circle cx="12" cy="9" r="2.5" />
    <path d="M9 16h6" />
  </svg>
);
const IconWrench: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a1.8 1.8 0 0 0 2.6 2.6l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
  </svg>
);
const IconFlame: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4 .3 1.2 1 2 2 2 0-3 .5-5 1-8Z" />
  </svg>
);
const IconTools: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="m14 7 3-3 3 3-3 3M17 10 7 20l-3-3L14 7" />
    <path d="M4 7l3-3 3 3-3 3z" />
  </svg>
);
const IconMail: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
const IconPhone: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
const IconCheck: React.FC<IconProps> = ({ size }) => (
  <svg {...base(size)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
const IconFlameSolid: React.FC<IconProps> = ({ size }) => (
  <svg width={size ?? 16} height={size ?? 16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2c.8 3.6 5 5.7 5 10.5a5 5 0 0 1-10 0c0-2.2 1-3.4 2.2-4.3.2 1.3.9 2.1 1.9 2.3C11 8.4 11.3 5 12 2Z" />
  </svg>
);

const categoryIcon = (name: string): React.ReactNode => {
  switch (name) {
    case "grid":
      return <IconGrid size={22} />;
    case "boiler":
      return <IconBoiler size={22} />;
    case "wrench":
      return <IconWrench size={22} />;
    case "leaf":
      return <IconLeaf size={22} />;
    case "flame":
      return <IconFlame size={22} />;
    default:
      return <IconTools size={22} />;
  }
};

/* ------------------------------------------------------------------ */
/*  Popup (modal)                                                      */
/* ------------------------------------------------------------------ */

const BlogModal: React.FC<{ post: BlogPost; onClose: () => void; onQuote: () => void }> = ({
  post,
  onClose,
  onQuote,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="bp-modal-overlay" onClick={onClose} role="presentation">
      <article
        className="bp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bp-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="bp-modal-close" onClick={onClose} aria-label="Close article">
          <IconClose size={20} />
        </button>

        <div className="bp-modal-cover">
          <SmartImage src={post.image} alt={post.title} />
          <span className="bp-modal-tag">{post.tag}</span>
        </div>

        <div className="bp-modal-body">
          <div className="bp-modal-meta">
            <Avatar src={post.author.avatar} name={post.author.name} size={34} />
            <div>
              <strong>{post.author.name}</strong>
              <span>
                {formatDate(post.date)} · {post.readTime} min read
              </span>
            </div>
          </div>

          <h2 id="bp-modal-title">{post.title}</h2>
          <p className="bp-modal-lead">{post.excerpt}</p>

          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="bp-modal-cta">
            <div>
              <h4>Need help with your heating?</h4>
              <p>Get a free, no-obligation quote from our local specialists.</p>
            </div>
            <button type="button" className="bp-btn bp-btn-primary" onClick={onQuote}>
              Get a Free Quote <IconArrow size={16} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type SortKey = "latest" | "oldest" | "shortest";

const BlogPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All Posts" | BlogCategory>("All Posts");
  const [sort, setSort] = useState<SortKey>("latest");
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [quote, setQuote] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const featured = useMemo(() => blogs.find((b) => b.featured) ?? blogs[0], []);
  const popular = useMemo(() => blogs.filter((b) => b.popular).slice(0, 5), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    // search ke waqt featured bhi include, warna usay bahar rakho
    let list = q ? [...blogs] : blogs.filter((b) => !b.featured);
    if (activeCategory !== "All Posts") list = list.filter((b) => b.category === activeCategory);
    if (q) {
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "latest") sorted.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "oldest") sorted.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "shortest") sorted.sort((a, b) => a.readTime - b.readTime);
    return sorted;
  }, [query, activeCategory, sort]);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    // TODO: connect to your newsletter service here
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="bp-page">
      <style>{css}</style>
      {/* ============================ HERO ============================ */}
      <section className="bp-hero">
        <div
          className="bp-hero-bg"
          style={{ backgroundImage: `url(${heroImages.background})` }}
          aria-hidden
        />
        <div className="bp-hero-overlay" aria-hidden />

        <div className="bp-container bp-hero-inner">
          <div className="bp-hero-copy">
            <span className="bp-eyebrow">Blogs &amp; Articles</span>
            <h1>
              Expert Advice for a <br />
              <span className="bp-accent">Warmer, Greener Home</span>
            </h1>
            <p>
              Get the latest tips, guides and insights on boiler installation, heating systems,
              energy efficiency and more. Stay informed and make the best decisions for your home.
            </p>

            <form
              className="bp-search"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                scrollToResults();
              }}
            >
              <IconSearch size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search articles"
              />
              <button type="submit" aria-label="Search" className="bp-search-btn">
                <IconArrow size={16} />
              </button>
            </form>

            <ul className="bp-hero-features">
              <li>
                <span className="bp-feat-icon"><IconShield size={22} /></span>
                <div>
                  <strong>Expert Guidance</strong>
                  <small>From industry professionals</small>
                </div>
              </li>
              <li>
                <span className="bp-feat-icon"><IconBulb size={22} /></span>
                <div>
                  <strong>Practical Tips</strong>
                  <small>For you and your needs</small>
                </div>
              </li>
              <li>
                <span className="bp-feat-icon"><IconLeaf size={22} /></span>
                <div>
                  <strong>Better Efficiency</strong>
                  <small>Save energy, save money</small>
                </div>
              </li>
            </ul>
          </div>

         </div>
      </section>

      {/* ========================= FEATURED ========================== */}
      <section className="bp-container bp-featured-wrap">
        <article className="bp-featured">
          <div className="bp-featured-media">
            <SmartImage src={featured.image} alt={featured.title} />
            <span className="bp-badge">FEATURED ARTICLE</span>
            
            <div className="bp-featured-caption">
              <span>{featured.tag.charAt(0) + featured.tag.slice(1).toLowerCase()}</span>
              <span>
                <IconClock size={14} /> {featured.readTime} min read
              </span>
            </div>
          </div>

          <div className="bp-featured-body">
            <span className="bp-featured-label">
              <span className="bp-dot" /> Featured Article
            </span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="bp-byline">
              <Avatar src={featured.author.avatar} name={featured.author.name} size={30} />
              <span>By {featured.author.name}</span>
              <span className="bp-sep">•</span>
              <span>{formatDate(featured.date)}</span>
              <span className="bp-sep">•</span>
              <span>{featured.readTime} min read</span>
            </div>
            <button className="bp-btn bp-btn-primary" onClick={() => setOpenPost(featured)}>
              Read Full Article <IconArrow size={16} />
            </button>
          </div>
        </article>
      </section>

      {/* ====================== CATEGORIES + GRID ===================== */}
      <section className="bp-container bp-main">
        <div className="bp-main-left" ref={resultsRef} style={{ scrollMarginTop: 90 }}>
          <div className="bp-cats" role="tablist" aria-label="Blog categories">
            {blogCategories.map((c) => (
              <button
                key={c.label}
                role="tab"
                aria-selected={activeCategory === c.label}
                className={`bp-cat ${activeCategory === c.label ? "is-active" : ""}`}
                onClick={() => setActiveCategory(c.label)}
              >
                <span className="bp-cat-icon">{categoryIcon(c.icon)}</span>
                <span className="bp-cat-label">{c.label}</span>
              </button>
            ))}
          </div>

          <div className="bp-latest-head">
            <div>
              <span className="bp-latest-eyebrow">Latest Articles</span>
              <h3>
                Latest from the <span className="bp-blue">Blog</span>
              </h3>
              <p>Practical advice, expert insights and the latest updates from our heating specialists.</p>
            </div>
            <label className="bp-sort">
              <span>Sort by:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="shortest">Shortest read</option>
              </select>
            </label>
          </div>

          {visible.length === 0 ? (
            <div className="bp-empty">
              <h4>No articles found</h4>
              <p>Try a different search or category.</p>
              <button
                className="bp-btn bp-btn-ghost"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All Posts");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="bp-grid">
              {visible.map((post) => (
                <article
                  key={post.id}
                  className="bp-card"
                  tabIndex={0}
                  role="button"
                  aria-label={`Open article: ${post.title}`}
                  onClick={() => setOpenPost(post)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenPost(post);
                    }
                  }}
                >
                  <div className="bp-card-media">
                    <SmartImage src={post.image} alt={post.title} />
                    <span className="bp-card-tag">{post.tag}</span>
                  </div>
                  <div className="bp-card-body">
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                    <div className="bp-card-foot">
                      <div className="bp-card-author">
                        <Avatar src={post.author.avatar} name={post.author.name} size={26} />
                        <div>
                          <strong>{post.author.name}</strong>
                          <small>
                            {formatDate(post.date)} · {post.readTime} min read
                          </small>
                        </div>
                      </div>
                      <span className="bp-card-arrow" aria-hidden>
                        <IconArrow size={15} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ============================ SIDEBAR ========================= */}
        <aside className="bp-sidebar">
          <div className="bp-panel">
            <h5 className="bp-panel-title">
              <span className="bp-flame"><IconFlameSolid size={15} /></span> Popular Posts
            </h5>
            <ul className="bp-popular">
              {popular.map((post) => (
                <li key={post.id}>
                  <button onClick={() => setOpenPost(post)}>
                    <SmartImage src={post.image} alt={post.title} className="bp-pop-thumb" />
                    <span>
                      <strong>{post.title}</strong>
                      <small>{formatDate(post.date)}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bp-quote">
            <h5>Get a Free Quote</h5>
            <p className="bp-quote-sub">Need help with your heating?</p>
            <p className="bp-quote-text">
              Our team is here to provide expert advice and a free, no-obligation quote.
            </p>
            <button
              type="button"
              className="bp-btn bp-btn-primary bp-btn-block"
              onClick={() => setQuote(true)}
            >
              Request a Free Quote <IconArrow size={16} />
            </button>
            <ul className="bp-quote-badges">
              <li>
                <span><IconPhone size={18} /></span>
                <strong>Fast Response</strong>
                <small>Within 24 hours</small>
              </li>
              <li>
                <span><IconCheck size={18} /></span>
                <strong>No Obligation</strong>
                <small>Free quotes</small>
              </li>
              <li>
                <span><IconShield size={18} /></span>
                <strong>Trusted</strong>
                <small>Local Experts</small>
              </li>
            </ul>
          </div>
        </aside>
      </section>

      {/* =========================== NEWSLETTER ======================= */}
      <section className="bp-container bp-news-wrap">
        <div className="bp-news">
          <div className="bp-news-icon"><IconMail size={26} /></div>
          <div className="bp-news-copy">
            <small>Stay in the Loop</small>
            <h4>Get the Latest Updates &amp; Tips</h4>
            <p>
              Join our newsletter and receive the latest blogs, heating tips and exclusive offers
              straight to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="bp-news-done">
              <IconCheck size={18} /> Thanks for subscribing!
            </div>
          ) : (
            <form className="bp-news-form" onSubmit={onSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                required
              />
              <button type="submit" className="bp-btn bp-btn-primary">
                Subscribe <IconArrow size={15} />
              </button>
            </form>
          )}

          <div className="bp-script bp-script-news" aria-hidden>
            Knowledge today,
            <br />
            Warmth tomorrow.
          </div>
        </div>
      </section>

      {openPost && (
        <BlogModal
          post={openPost}
          onClose={() => setOpenPost(null)}
          onQuote={() => {
            setOpenPost(null); // pehle article popup band
            setQuote(true); // phir quote modal khule
          }}
        />
      )}

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </div>
  );
};

export default BlogPage;