A simple and modern donation platform built with Next.js (frontend) and Express.js (backend) integrated with Razorpay for secure payments.

Live Demo (frontend on Vercel)
https://razorpay-frontend-fdo4.vercel.app/

Tech Stack
Frontend -> Next.js (App Router), Tailwind CSS Backend -> Express.js, Node.js Payment -> Razorpay(testmode) Deployment -> Vercel (frontend), Render (backend)

Features
Select or enter a custom donation amount
Add an optional tip percentage
Choose to donate as anonymous (optional)
Razorpay integration with real-time payment popup (testmode)
Post-payment redirect to Thank You page
Setup Backend
cd backend

npm install

Create a .env file in /backend: RAZORPAY_KEY_ID=your_key_id

RAZORPAY_KEY_SECRET=your_secret_key

Start server:npm start

Setup Frontend
cd frontend

npm install

Create .env.local in /frontend:NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

Start frontend: npm run dev

Test Payment Details (Razorpay)
You can test using Razorpay’s test cards:

Card Number: 4786790020681662

Expiry: Any future date (05/27)

CVV: Any 3 digits

Name: Any
