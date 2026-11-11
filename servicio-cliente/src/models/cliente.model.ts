import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Cliente = sequelize.define("Medico", {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "Medico",
    timestamps: false
}
)
