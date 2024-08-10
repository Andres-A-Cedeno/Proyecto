import supabase from "../config/supabaseClient";

export const createUser = async (req, res) => {
  try {
    const { nombre, apellido, alias, genero, email, contraseña } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !alias || !genero || !email || !contraseña) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Crear el usuario en Supabase
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password: contraseña,
    });

    if (signUpError) {
      throw new Error(signUpError.message);
    }

    // Almacenar información adicional del usuario en tu base de datos
    const { data, error: insertError } = await supabase
      .from("usuarios")
      .insert([{ nombre, apellido, alias, genero, email, perfil_id: 2 }]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    res.status(201).json(data);
    console.log("Usuario creado correctamente");
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    res.status(500).json({ error: error.message });
  }
};
