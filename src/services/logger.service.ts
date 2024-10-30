import pino from "pino";
import path from "path";
import fs from "fs";

// Archivo de logs en JSON

export const initLoggerService = async function() {
  // Configuración del archivo de logs en modo síncrono
  const logFile = await pino.destination({
    dest: path.resolve(__dirname, "../logs/logs.json"),
  });

  // Esperar a que el destino esté listo antes de crear el logger
  logFile.on("ready", () => {
    // Solo crea el logger cuando el archivo está listo
    LoggerService.logger = pino(
      {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss.l",
            singleLine: true,
          },
        },
      },
      logFile // Guardar en archivo JSON además de mostrar en consola
    );
  });
};

export class LoggerService {
  static logger: pino.Logger;

  // Método para registrar información con nivel INFO
  static infoLogger(
    filename: string,
    event: string,
    data?: Record<string, any>
  ) {
    const filePath = path.resolve(filename);
    LoggerService.logger.info({ filePath, ...data }, event);
  }

  // Método para registrar información con nivel ERROR
  static errorLogger(
    filename: string,
    event: string,
    data?: Record<string, any>
  ) {
    const filePath = path.resolve(filename);
    LoggerService.logger.error({ filePath, ...data }, event);
  }

  // Método para registrar información con nivel DEBUG
  static debugLogger(
    filename: string,
    event: string,
    data?: Record<string, any>
  ) {
    const filePath = path.resolve(filename);
    LoggerService.logger.debug({ filePath, ...data }, event);
  }
}
