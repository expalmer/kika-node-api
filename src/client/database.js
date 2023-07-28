const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://luljfrheetwycovgnfgs.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getTasks() {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    throw error;
  }
  return data;
}

async function getTask(id) {
  const { data, error } = await supabase.from("tasks").select().eq("id", id);
  if (error) {
    throw error;
  }
  return data ? data[0] : null;
}

async function createTask(task) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ task })
    .select();
  if (error) {
    throw error;
  }
  return data;
}

async function updateTask(id, body = {}) {
  const { data, error } = await supabase
    .from("tasks")
    .update(body)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

async function removeTask(id) {
  const { data, error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
};
