hiremate/
│── server/
│   ├── src/
│   │   ├── config/               # Configurations (DB, cloud, env)
│   │   │   ├── db.js
│   │   │   ├── logger.js
│   │   │   └── index.js
│   │   │
│   │   ├── controllers/          # Route handlers (business logic)
│   │   │   ├── auth.controller.js
│   │   │   ├── job.controller.js
│   │   │   ├── resume.controller.js
│   │   │   └── test.controller.js
│   │   │
│   │   ├── middlewares/          # Express middlewares
│   │   │   ├── asyncHandler.js
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── models/               # Database models (MongoDB / SQL)
│   │   │   ├── user.model.js
│   │   │   ├── job.model.js
│   │   │   └── resume.model.js
│   │   │
│   │   ├── routes/               # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── job.routes.js
│   │   │   ├── resume.routes.js
│   │   │   └── test.routes.js
│   │   │
│   │   ├── services/             # Core business logic (AI, mail, etc.)
│   │   │   ├── ai.service.js
│   │   │   ├── mail.service.js
│   │   │   └── resumeParser.service.js
│   │   │
│   │   ├── utils/                # Helpers, error/response handlers
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   ├── constants.js
│   │   │   └── index.js
│   │   │
│   │   ├── app.js                # Express app setup (middlewares, routes)
│   │   └── index.js              # Server entry (connect DB, start server)
│   │
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── nodemon.json
│
│── client/                       # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/             # API calls (Axios/fetch)
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
