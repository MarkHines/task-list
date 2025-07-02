import express from 'express';
const tasksRouter = express.Router()
export default tasksRouter;

import requireUser from "#middleware/requireUser";
import { getTasksByUserId } from '#db/queries/tasks';
tasksRouter.use(requireUser);

tasksRouter.get(`/`, async (request, response) => {
  const tasks = await getTasksByUserId(request.user.id)
  response.send(tasks)
})