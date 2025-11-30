Server folder

This folder implements a small Express backend with a simple services layer.

Modes:

- File DB (default): uses `server/db.json` for storage. No external dependencies required.
- MongoDB: if you set `MONGODB_URI` in a `.env` file, we can extend services to use Mongoose.

Run locally:

cd server
npm install
npm start

API endpoints:

- GET /api/posts
- GET /api/posts/:id
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id
- POST /api/posts/:id/like
- POST /api/posts/:id/comments

If you want me to switch the service layer to use MongoDB when `MONGODB_URI` is present, I can implement that next.
