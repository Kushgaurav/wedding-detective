# Wedding Detective

Wedding Detective is a comprehensive pre-marital investigation service designed to provide peace of mind before making life-changing decisions. This project includes a full-stack application with a React-based frontend and an Express.js backend, integrated with MongoDB for data storage.

## Features
- **Service Listings**: View detailed investigation packages with pricing in INR (₹).
- **Confidential Consultations**: Securely schedule consultations with investigators.
- **Document Management**: Upload and manage confidential documents securely.
- **Authentication**: User registration and login with JWT-based authentication.
- **Admin Dashboard**: Manage services, consultations, and user data.
- **Client Portal**: Private area for clients to access their case information.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure
```
- wedding-detective/  (Frontend)
  - src/: React components, pages, and services
  - public/: Static assets
  
- server/  (Backend)
  - models/: MongoDB schemas
  - routes/: API endpoints
  - middleware/: Authentication and authorization
  - utils/: Helper functions and seed data
```

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local storage with encryption

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/Kushgaurav/wedding-detective.git
   cd wedding-detective
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Backend dependencies
   cd server
   npm install
   
   # Frontend dependencies
   cd ../wedding-detective
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev
   
   # In a new terminal, start frontend
   cd ../wedding-detective
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## API Endpoints
- Authentication: `/api/auth` (login, register)
- Services: `/api/services` (get, create, update)
- Consultations: `/api/consultations` (schedule, list, update)
- Documents: `/api/documents` (upload, retrieve)
- Cases: `/api/cases` (create, manage)

## Deployment
The application can be deployed using platforms like Heroku, Netlify, or Vercel with appropriate build configurations.

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please contact the development team at contact@weddingdetective.com