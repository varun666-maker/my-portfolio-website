# Backend README

## API Documentation

Complete backend API for the portfolio website.

## Available Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with auto-reload
npm run seed    # Seed database with sample data
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-jwt-secret
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123
CORS_ORIGIN=http://localhost:5173
```

## Database Models

### Admin
- email (unique, required)
- password (hashed, required)
- role (default: 'admin')

### Project
- title, category, description
- imageUrl, liveLink, githubLink
- technologies (array)
- featured (boolean)

### Service
- title, description, icon
- order, active

### Message
- name, email, message
- read (boolean)

### About
- title, subtitle, description
- imageUrl, skills (array)
- experience, education, resumeUrl

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation

## API Response Format

Success:
```json
{
  "status": "success",
  "data": { ... }
}
```

Error:
```json
{
  "status": "error",
  "message": "Error message"
}
```
