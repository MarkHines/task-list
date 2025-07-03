import db from "#db/client";

export const createTask = async(title, done, userId) => {
  console.log(`CREATING TASKS`)
  const sql = `
    INSERT INTO tasks (title, done, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows: [task] } = await db.query(sql, [title, done, userId])
  return task;
}

export const getTasksByUserId = async(userId) => {
  const sql = `
    SELECT * FROM tasks
    WHERE user_id = $1
  `;
  const {rows: tasks } = await db.query(sql, [userId])
  return tasks
}
export const getTaskById = async(id) => {
  const sql = `
    SELECT * FROM tasks 
    WHERE id = $1;
  `;
  const { rows: [task] } = await db.query(sql, [id]);
  return task;
}

export const updateTaskById = async (title, done, id) => {
  const sql = `
    UPDATE tasks
    SET title = $1, done = $2
    WHERE id = $3
    RETURNING*
  `;
  const { rows: [task] } = await db.query(sql,[title, done, id])
  return task
}

export const deleteTaskById = async(id) => {
  const sql = `
    DELETE FROM tasks
    WHERE id = $1
  `;
  const { rows } = await db.query(sql,[id])
}