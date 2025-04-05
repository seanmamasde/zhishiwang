# Interactive Web3 Quiz Game

An engaging full-stack quiz game that combines modern web development with decentralized blockchain functionality. Users can log in using WorldCoin’s OAuth, participate in a fast-paced quiz game, and even interact with blockchain-based payment and verification features—all wrapped in a responsive, dynamic interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Integration Details](#integration-details)
  - [Authentication](#authentication)
  - [Payment Flow](#payment-flow)
  - [Verification Process](#verification-process)
- [Customization](#customization)
- [Debugging and Development](#debugging-and-development)
- [License](#license)

---

## Overview

This project is a full-stack Next.js application that merges interactive gameplay with Web3 functionalities. It offers:

- A dynamic multiple-choice quiz game where players answer questions under time pressure.
- Real-time scoring with engaging animations and visual cues (e.g., a progress bar that shakes like a ticking bomb when time is nearly up).
- Blockchain integrations via WorldCoin MiniKit for authentication, payment, and verification, showcasing how decentralized features can be incorporated into consumer-facing applications.

---

## Features

- **Interactive Quiz Game:**  
  Randomly selected questions, dynamic scoring based on response time, and real-time feedback on player performance.
  
- **Responsive Design:**  
  Built using React, Next.js, and Tailwind CSS to ensure a consistent experience on various devices.
  
- **WorldCoin Integration:**  
  - **Authentication:** Users sign in with WorldCoin OAuth.
  - **Payment:** Initiate and confirm blockchain-based transactions.
  - **Verification:** Validate cryptographic proofs via WorldCoin’s verification API.
  
- **Enhanced Timer UI:**  
  A visually engaging timer component with a progress bar that decreases over time and shakes with a bomb effect as the deadline approaches.

- **Debugging Tools:**  
  The application integrates Eruda, a client-side debugging console (enabled in non-production environments).

---

## Technologies Used

- **Next.js & React:** For building the front end with server-side rendering and dynamic routing.
- **TypeScript:** Ensures type safety and better developer experience.
- **Tailwind CSS:** Provides a modern, responsive design framework with utility-first styling.
- **WorldCoin MiniKit:** Integrates blockchain features such as decentralized authentication, secure payments, and cryptographic verification.
- **NextAuth:** Handles authentication flows and session management.
- **Serverless API Routes:** Next.js API routes manage payment initiation, payment confirmation, and verification.

---

## Project Structure

```
/project-root
├── /api
│   ├── /auth
│   │   └── [...nextauth]/route.ts      # Authentication via NextAuth & WorldCoin OAuth
│   ├── /initiate-payment/route.ts      # Initiates payment and sets a unique nonce cookie
│   ├── /confirm-payment/route.ts       # Confirms payment by verifying nonce and transaction status
│   └── /verify/route.ts                # Verifies cryptographic proof from WorldCoin MiniKit
├── /components
│   ├── Eruda/                         # Client-side debugging integration
│   ├── Game/                          # Quiz game UI components & modules
│   │   ├── modules/
│   │   │   ├── Game.tsx               # Main game logic and state management
│   │   │   ├── Question.tsx           # Displays question text
│   │   │   ├── AnswerOptions.tsx      # Renders answer options with visual feedback
│   │   │   └── Timer.tsx              # Enhanced timer with progress bar and bomb animation
│   │   └── data/questions.json        # Question bank
│   ├── MiniKitProvider.tsx            # Installs WorldCoin MiniKit on the client
│   ├── NextAuthProvider.tsx           # Wraps the app with NextAuth session provider
│   ├── Pay/index.tsx                  # Contains payment logic and UI (PayBlock component)
│   └── SignIn/index.tsx               # Provides sign in/out UI using NextAuth
├── /pages
│   ├── page.tsx                       # Home page that ties together the game and authentication
│   └── /Game
│       ├── pages/index.tsx            # Game landing page for the quiz
│       └── style.css                  # Game-specific styles
├── globals.css                        # Global styling and Tailwind CSS directives
└── layout.tsx                         # Global layout wrapping the app with providers
```

---

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/interactive-web3-quiz-game.git
   cd interactive-web3-quiz-game
   ```

2. **Install Dependencies:**

   Ensure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Environment Variables:**

   Create a `.env.local` file at the root and add the necessary environment variables:

   ```env
   NEXTAUTH_SECRET=your-next-auth-secret
   WLD_CLIENT_ID=your-worldcoin-client-id
   WLD_CLIENT_SECRET=your-worldcoin-client-secret
   APP_ID=your-app-id-from-worldcoin
   DEV_PORTAL_API_KEY=your-dev-portal-api-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Tailwind CSS Configuration:**

   Ensure Tailwind is properly configured by reviewing the `tailwind.config.js` (if applicable).

---

## Running the Application

To run the development server:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser. The application should be fully functional with the quiz game, authentication flows, and blockchain integrations.

For production builds, use:

```bash
npm run build
npm start
```

---

## API Endpoints

### Authentication

- **Endpoint:** `/api/auth/[...nextauth]/route.ts`  
  Uses NextAuth with WorldCoin as an OAuth provider. Handles sign in, session management, and callbacks.

### Payment Flow

- **Initiate Payment:** `/api/initiate-payment/route.ts`  
  Generates a unique payment nonce (UUID) stored in cookies for tracking the transaction.

- **Confirm Payment:** `/api/confirm-payment/route.ts`  
  Verifies the payment by comparing the nonce with the payload received from the MiniKit, then queries the WorldCoin API for transaction status.

### Verification

- **Endpoint:** `/api/verify/route.ts`  
  Receives a cryptographic proof from the client, verifies it using WorldCoin’s `verifyCloudProof` function, and returns the verification status.

---

## Integration Details

### Authentication

- **NextAuth:**  
  Configured in the `/api/auth/[...nextauth]/route.ts` file, enabling WorldCoin OAuth. Users can sign in via the `SignIn` component, which updates session state throughout the app.

### Payment Flow

- **Payment Initiation:**  
  A unique nonce is generated and stored as a cookie. The `PayBlock` component in the `/Pay/index.tsx` file calls the MiniKit payment command with this nonce as a reference.

- **Payment Confirmation:**  
  Once the MiniKit returns a payment payload, the app sends it to the `/api/confirm-payment/route.ts` endpoint. The backend verifies the transaction using WorldCoin’s API.

### Verification Process

- **Cryptographic Proof:**  
  The `VerifyBlock` component calls MiniKit’s verification command. The payload is then sent to the `/api/verify/route.ts` endpoint, which uses WorldCoin’s `verifyCloudProof` to validate the data.
- **Result Handling:**  
  The verification status is then displayed in the UI, allowing you to perform further actions (e.g., marking a user as verified in your database).

---

## Customization

- **Timer Component:**  
  The Timer component has been enhanced with a progress bar and shaking animation when time is nearly up. Adjust the threshold or animation parameters in `Game/modules/Timer.tsx` and accompanying CSS in `Game/style.css`.

- **Logo and Cover Image:**  
  Example SVG assets are provided for the logo and cover image. Modify colors, dimensions, and elements to align with your branding.

- **Styling:**  
  Global styles are defined in `globals.css` and component-specific styles in individual CSS files. Tailwind’s utility classes are extensively used for responsive design.

---

## Debugging and Development

- **Eruda Integration:**  
  The project integrates Eruda for client-side debugging during development. It is conditionally loaded via `ErudaProvider` (see `Eruda/index.tsx`) and will not be present in production builds.

- **Console Logging:**  
  Throughout the API routes and client components, console logs are used for debugging. These can be removed or adjusted as needed for production.
