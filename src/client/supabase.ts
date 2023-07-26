import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://luljfrheetwycovgnfgs.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getTasks() {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function getTask(id: number) {
  const { data, error } = await supabase.from("tasks").select().eq("id", id);

  if (error) {
    throw error;
  }
  return data ? data[0] : null;
}

export async function createTask(task: string) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ task })
    .select();
  if (error) {
    throw error;
  }
  return data;
}

export async function updateTask(
  id: number,
  body: { task?: string; done?: string } = {}
) {
  const { data, error } = await supabase
    .from("tasks")
    .update(body)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function removeTask(id: number) {
  const { data, error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}
