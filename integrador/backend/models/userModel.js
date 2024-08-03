// models/userModel.js

import supabase from "../config/supabaseClient.js";

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("Users").select("*");

  if (error) {
    throw error;
  }

  return data;
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Función para crear un nuevo usuario
export const createUser = async (user) => {
  const { data, error } = await supabase.from("Users").insert([user]);

  if (error) {
    throw error;
  }

  return data;
};

// Función para actualizar un usuario existente
export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("Users")
    .update(updates)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
  const { data, error } = await supabase.from("Users").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};
