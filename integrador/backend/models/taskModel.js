import db from '../config/supabaseClient.js';

class TaskModel {
    static async createTask(taskData) {
        const { data, error } = await db.from('creartareas').insert([{
            tipo_tarea: taskData.tipo_tarea,
            materia: taskData.materia,
            descripcion: taskData.descripcion,
            relevancia_id: taskData.relevancia,
            fecha_entrega: taskData.entrega,
            estimacion_intervalo: `PT${taskData.estimacion}M`,
            usuario_id: taskData.usuario_id // Verifica que el usuario_id se pase correctamente
        }]);
        if (error) throw error;
        return data;
    }

    static async getAllTasks() {
        const { data, error } = await db
            .from('listatareas')
            .select('*, creartareas!inner(tipo_tarea, materia, descripcion, relevancia_id, fecha_entrega)')
            .order('fecha_creacion', { ascending: false });
    
        if (error) throw error;
        return data;
    }
}

export default TaskModel;