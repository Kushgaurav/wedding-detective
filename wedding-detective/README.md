# Wedding Detective

Wedding Detective is a comprehensive pre-marital investigation service designed to provide peace of mind before making life-changing decisions. This project includes a full-stack application with a React-based frontend and an Express.js backend, integrated with MongoDB for data storage.

## Features
- **Service Listings**: View detailed investigation packages with pricing in INR (₹).
- **Confidential Consultations**: Securely schedule consultations with investigators.
- **Authentication**: User registration and login with JWT-based authentication.
- **Admin Features**: Manage services and consultations.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## How It Works
1. **Frontend**: Built with React and styled using Tailwind CSS. The frontend communicates with the backend via RESTful APIs.
2. **Backend**: Developed with Express.js, the backend handles API requests, authentication, and database operations.
3. **Database**: MongoDB is used to store user data, services, and consultation requests.

## Project Structure
```
- wedding-detective/
  - src/: Frontend source code (React components, pages, and services).
  - server/: Backend source code (Express.js routes, models, and middleware).
  - public/: Static assets for the frontend.
  - README.md: Project documentation.
```

## Prerequisites
- Node.js (v16 or later)
- MongoDB (running locally or a cloud instance)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/wedding-detective.git
   cd wedding-detective
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd server
   npm install
   ```

## Running the Application
1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd ..
   npm run dev
   ```

3. Access the application at `http://localhost:5173`.

## Seeding the Database
To populate the database with initial data (services):
```bash
cd server
npm run seed
```

## Deployment
### Backend
1. Set up a MongoDB instance (local or cloud).
2. Configure environment variables in `server/.env`:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   PORT=5000
   ```
3. Build and start the backend server:
   ```bash
   cd server
   npm install
   npm start
   ```

### Frontend
1. Build the frontend for production:
   ```bash
   npm run build
   ```
2. Serve the `dist/` directory using a static file server or integrate it with the backend.

## API Endpoints
### Public Endpoints
- `GET /api/services`: Fetch all services.
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT.

### Protected Endpoints
- `POST /api/consultations`: Submit a consultation request.
- `POST /api/services`: Add a new service (Admin only).

## Technologies Used
- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Express.js, MongoDB, JWT
- **Tools**: ESLint, Nodemon, PostCSS

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For questions or support, please contact the development team at support@weddingdetective.com.
