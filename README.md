# Instagram Analytics Dashboard using AI

## Project Name

Instagram Analytics Dashboard using AI

## Project Files

- `src/` – Frontend React application
- `src/components/` – Dashboard components
- `src/pages/` – Landing page and Dashboard pages
- `src/services/` – API connection files
- `src/styles/` – CSS files
- `server/` – Backend Node.js and Express application
- `server/config/` – MongoDB configuration
- `server/controllers/` – Backend controllers
- `server/models/` – MongoDB models
- `server/routes/` – API routes
- `server/utils/` – CSV importer and PDF generator
- `server/data/` – Instagram analytics CSV dataset
- `server/.env` – MongoDB connection and environment variables
- `README.md` – Project documentation

## Dependencies

### Frontend Dependencies

```bash
npm install
npm install recharts
```

### Backend Dependencies

```bash
cd server
npm install
```

## MongoDB Setup

Create a `.env` file inside the `server` folder.

Add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://karisnivc_db_user:YOUR_DATABASE_PASSWORD@cluster0.jvzryci.mongodb.net/instagramAnalytics?retryWrites=true&w=majority&appName=Cluster0
```

Replace `YOUR_DATABASE_PASSWORD` with the password of the MongoDB database user `karisnivc_db_user`.

If the MongoDB password is changed, make sure to update the new password in `server/.env`.

Make sure your current IP address is added in MongoDB Atlas under **Network Access**.

Do not upload the `.env` file to GitHub.

## Run the Project

### Import Dataset

```bash
cd server
node importData.js
```

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

Open another terminal in the project root:

```bash
npm run dev
```

## GitHub Repository

Paste your GitHub repository link here:


## Render Deployment

Paste your Render deployment link here:


## Technologies Used

React.js, JavaScript, HTML, CSS, Node.js, Express.js, MongoDB Atlas, Mongoose, Recharts, PDFKit, and Vite.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

