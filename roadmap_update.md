# Project Roadmap: Wedding Detective

## Current Features
- **Homepage**: Displays service offerings and CTAs.
- **Client Portal**: Secure dashboard for clients to track case progress.
- **Investigator Network**: Showcases investigator credentials and coverage.
- **Consultation Requests**: Allows users to submit confidential consultation requests.

---

## Planned Features

### 1. **Authentication System**
   - **Login and Register**:
     - Implement a user authentication system with the following:
       - **Login Page**: Users can log in using their email and password.
       - **Register Page**: New users can create an account.
     - Use **JWT-based authentication** for secure session management.
   - **Forgot Password**:
     - Add a "Forgot Password" feature to allow users to reset their password via email.

### 2. **Admin Dashboard**
   - **User Management**:
     - Admins can view, edit, or delete user accounts.
   - **Request Tracking**:
     - Admins can view and update the status of consultation requests.
   - **Service Management**:
     - Admins can add, edit, or delete investigation services.

### 3. **User Dashboard**
   - **Request History**:
     - Users can view the status and history of their consultation requests.
   - **Profile Management**:
     - Users can update their personal information and change their password.

### 4. **Notifications**
   - **Email Notifications**:
     - Notify users when their consultation request status changes.
   - **In-App Notifications**:
     - Display updates directly in the user dashboard.

### 5. **Payment Integration**
   - Integrate a payment gateway (e.g., Stripe or PayPal or upi or razorpay or cash pay where admin acppt to conferm pyment ) to allow users to pay for services directly through the platform.

### 6. **Enhanced Security**
   - Implement **2FA (Two-Factor Authentication)** for user accounts.
   - Use **rate limiting** and **CAPTCHA** to prevent brute-force attacks.

### 7. **Analytics and Reporting**
   - Provide admins with insights into user activity, service usage, and request trends.

---

## Development Milestones

### Phase 1: Core Features
- [x] Homepage
- [x] Consultation Requests
- [x] Investigator Network

### Phase 2: Authentication System
- [ ] Login and Register Pages
- [ ] JWT-based Authentication
- [ ] Forgot Password Feature

### Phase 3: Dashboards
- [ ] Admin Dashboard
- [ ] User Dashboard

### Phase 4: Advanced Features
- [ ] Notifications
- [ ] Payment Integration
- [ ] Analytics and Reporting

---

## Notes
- **Priority**: Authentication system is the next critical feature to implement.
- **Dependencies**: Ensure backend API endpoints for login, register, and user management are functional before integrating with the frontend.

---

Let me know if you'd like help implementing any of these features!