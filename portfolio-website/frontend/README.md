# Frontend README

## React + Vite Portfolio Frontend

Modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── components/      # Reusable components
├── pages/          # Page components
├── context/        # React context providers
├── utils/          # Utility functions
├── App.jsx         # Main app component
└── index.css       # Global styles
```

## Key Features

- **Routing:** React Router DOM for navigation
- **State Management:** React Context API
- **Styling:** Tailwind CSS utility classes
- **Animations:** Framer Motion
- **API Calls:** Axios with interceptors
- **Notifications:** React Toastify
- **Icons:** React Icons

## Pages

- **Home** - Hero section with CTA
- **About** - About me and skills
- **Portfolio** - Projects showcase with filtering
- **Services** - Services offered
- **Contact** - Contact form
- **Login** - Admin login
- **Dashboard** - Admin panel (protected)

## Admin Features

Protected routes requiring authentication:
- Manage Projects
- Manage Services
- View Messages
- Edit About Information

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme.

### Content
Login to admin dashboard to update:
- Projects
- Services
- About information
- View contact messages

### Social Links
Update in:
- `src/components/layout/Footer.jsx`
- `src/pages/Home.jsx`

## Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## Deployment

### Vercel
1. Connect repository
2. Set environment variable: `VITE_API_URL`
3. Deploy

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variable: `VITE_API_URL`
