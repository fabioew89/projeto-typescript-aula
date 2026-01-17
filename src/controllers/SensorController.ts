import type { Request, Response } from "express";
import type SensorService from "../services/SensorService.js";
import { AppError } from "../errors/AppError.js";

export default class SensorController {

    private sensorService: SensorService;

    constructor(sensorService:  SensorService) {
        this.sensorService = sensorService;
    }

    public async getAllSensors(req: Request, res: Response) {

        try {
            
            const sensors = await this.sensorService.getAllSensors();
            res.status(200).json(sensors);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro interno do servidor!" })
        }

    }

    public async addSensor(req: Request, res: Response) {

        try {
            const body = req.body;
            const sensor = await this.sensorService.addSensor(body);
            res.status(201).json(sensor);

        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }

    }

    public async updateSensor(req: Request, res: Response) {
        try {
            
            const { id } = req.params;
            const body = req.body;

            const sensor = await this.sensorService.updateSensor(id as string, body);
            res.status(200).json(sensor);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Erro interno do servidor!" })
            }
        }
    }

    public async deleteSensor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.sensorService.deleteSensor(id as string);
            res.status(204).json({ status: "Sensor deletado" })
        } catch (error) {
            if(error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
            res.status(500).json({ message: "Erro interno do servidor!" });
            }
        }
    }

}
