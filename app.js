import express from "express";
const app = express();
export default app;
import getUserByToken from '#middleware/getUserFromToken'
import tasksRouter from "#api/task";

// Parse the request payload and create request.body
app.use(express.json())
app.use(getUserByToken);


import usersRouter from "#api/users";
app.use(`/users`, usersRouter)

app.use(`/tasks`, tasksRouter)

//PostgreSQL Error Handling
app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});


// Generic Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
