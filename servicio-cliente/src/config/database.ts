import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carga el .env de servicio-cliente sin importar desde qué carpeta se ejecute
dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });

export const sequelize = new Sequelize({
    database: process.env.DB_NAME as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: 5432,
    dialect: "postgres",
});

export default sequelize;