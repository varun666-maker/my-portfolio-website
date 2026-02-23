# Full-Stack Portfolio Website

A modern, responsive, and feature-rich portfolio website built with a React frontend and a Node.js/Express backend. This project includes a public-facing portfolio and a secure admin dashboard for managing content.

## 🚀 Features

- **Dynamic Content:** Manage projects, services, and about information through the admin panel.
- **Admin Dashboard:** Secure login for content management.
- **Project Showcase:** Filterable portfolio section with project details.
- **Contact System:** Functional contact form with message history in the dashboard.
- **Responsive Design:** Optimized for all screen sizes using Tailwind CSS.
- **Smooth Animations:** Powered by Framer Motion.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React with Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons / Bootstrap Icons
- **State Management:** React Context API
- **API Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Bcrypt (hashing), Helmet, Rate Limiting, CORS

## 📁 Project Structure

```text
.
├── backend/            # Express.js API
├── frontend/           # React + Vite application
├── DEPLOYMENT-GUIDE.md # Detailed deployment instructions
├── netlify.toml        # Netlify frontend configuration
├── render.yaml         # Render backend configuration
└── package.json        # Root package.json for monorepo scripts
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account or local installation

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/varun666-maker/my-portfolio-website.git
   cd my-portfolio-website
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Configure Environment Variables:**
   - Create `.env` files in both `backend/` and `frontend/` directories following their respective `.env.example` files.

4. **Seed the Database:**
   ```bash
   npm run seed
   ```

5. **Start Development Servers:**
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173 and the backend on http://localhost:5000.*

## 🚢 Deployment

For detailed deployment instructions on **Render (Backend)** and **Netlify (Frontend)**, please refer to the [DEPLOYMENT-GUIDE.md](file:///c:/Users/91903/Downloads/SQL/portfolio-website/DEPLOYMENT-GUIDE.md).
You can also view
https://myyyyyyportfolioooooo.netlify.app/

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///c:/Users/91903/Downloads/SQL/portfolio-website/LICENSE) file for details.
