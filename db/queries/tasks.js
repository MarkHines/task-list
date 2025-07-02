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