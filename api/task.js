import express, { request } from 'express';
const tasksRouter = express.Router()
export default tasksRouter;

import requireUser from "#middleware/requireUser";
import { 
  createTask, 
  deleteTaskById, 
  getTaskById, 
  getTasksByUserId, 
  updateTaskById } from '#db/queries/tasks';
import requireBody from '#middleware/requireBody';
tasksRouter.use(requireUser);

tasksRouter.get(`/`, async (request, response) => {
  const tasks = await getTasksByUserId(request.user.id)
  response.send(tasks)
});

tasksRouter.post(`/`, 
  requireBody(["title", "done"]),
  async(request, response) => {
    const { title, done } = request.body;
    const task = await createTask(title, done, request.user.id)
    response.send(task).status(201)
});

tasksRouter.param("id", async (request, response, next, id) => {
  const task = await getTaskById(id);
  if(!task) return response.status(404).send(`TASK NOT FOUND`);

  if(task.user_id !== request.user.id) return response.status(403).send(`NOT YOURS TO DELETE`);
  // ATTACH THE TASK TO THE REQUEST
  request.task = task;

  next();
});

tasksRouter.put(`/:id`,
  requireBody(["title", "done"]),
  async(request, response) => {
    const { title, done } = request.body;
    const task = await updateTaskById(title, done, request.task.id)
    response.send(task);
});

tasksRouter.delete(`/:id`, async (request, response) => {
  const { id } = request.params;
  const deleted = await deleteTaskById(id)
  response.send(`Your task has been deleted`)
  
})
