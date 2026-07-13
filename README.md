# AL Jet

AL Jet is a responsive, multi-page private aviation demo with a Node.js API. Visitors can explore two aircraft, create a demo account, sign in, and submit a flight quote request.

> **Portfolio project:** AL Jet does not operate or arrange real flights. Never enter real passport, payment, or other sensitive information.



## Features

- Responsive landing page and mobile navigation
- Dynamic fleet cards built with vanilla JavaScript
- Aircraft detail pages for the Cessna Citation XLS and Gulfstream G650
- Accessible sign-up, sign-in, and booking forms
- Express REST API with MongoDB persistence
- Password hashing with `bcryptjs`
- JWT-based route protection
- Server- and client-side booking validation
- Static entry page compatible with GitHub Pages

## Tech stack

- **Frontend:** HTML5, CSS3, vanilla JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens and bcrypt

## Project structure

```text
al-jet/
├── index.html                 # GitHub Pages entry point
├── main.html                  # Landing page
├── booking.html              # Flight request form
├── signup.html               # Member registration
├── signin.html               # Member login
├── cessna-details.html       # Cessna aircraft page
├── gulfstream-details.html   # Gulfstream aircraft page
├── Terms.html                # Demo terms
├── style.css                 # Shared styles
├── app.js                    # Shared browser logic and API calls
├── images/                   # Project images
└── backend/
    ├── config/               # Database configuration
    ├── controllers/          # Request handlers
    ├── middleware/           # Authentication and validation
    ├── models/               # Mongoose models
    ├── routes/               # API routes
    ├── .env.example          # Environment variable template
    ├── package.json
    └── server.js
```

## Run the frontend only

The public pages can be viewed without the API. Open `index.html` directly, or serve the project folder with any static server. Account and booking submission require the backend.

## Run the full project locally

Requirements:

- Node.js 18 or newer
- A local or hosted MongoDB database

1. Install the backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Replace `JWT_SECRET` in `.env` with a random value containing at least 32 characters. Update `MONGODB_URI` if MongoDB is not running locally.

4. Start the application:

   ```bash
   npm run dev
   ```

## Known limitations

- There is no payment workflow or real aviation inventory.
- The browser stores the demo JWT in `localStorage`; a production system should prefer secure, HTTP-only cookies and add CSRF protection.
- The terms are placeholder content for a portfolio demo and are not legal advice.

## Contributing

Issues and pull requests are welcome. Keep changes focused, test desktop and mobile layouts, and do not commit secrets or real personal data.
