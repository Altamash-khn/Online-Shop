# Online Shop – E-Commerce Website

A fully featured and secure e-commerce web application built with Node.js, Express, MongoDB, EJS, Cloudinary, and Stripe.
This project provides a complete shopping experience — product browsing, cart handling, authentication, image uploads, and Stripe-powered payments.

## Live Demo

https://online-shop-vp83.onrender.com/products

## Features

- **Product Browsing** — View products, detailed pages, and dynamic price rendering
- **Add to Cart System** — Add, remove, update items with session-based cart storage
- **User Authentication** - Signup, login, and secure password hashing (bcryptjs)
- **Session Management** - Persistent sessions stored in MongoDB
- **CSRF Protection** - Secure forms using @dr.pogodin/csurf
- **Order Management** - Create and view orders stored in the database
- **Stripe Checkout Integration** - Secure online payments with redirect flow
- **Cloudinary Image Uploads** - Multer + Cloudinary for product images
- **Responsive EJS Views** - pages with custom CSS styling

## Tech Stack

- **Node.js + Express** - Backend routing and server logic
- **MongoDB (native driver)** - Database for user, product, and order storage
- **EJS** - Server-side templates for rendering UI
- **Express-Session** - Cookie + session-based auth system
- **bcryptjs** - Password hashing
- **Cloudinary** - Image hosting for product images
- **Multer & Multer-Storage-Cloudinary** - File handling
- **Stripe** - Payment processing
- **dotenv** - Environment variable management
