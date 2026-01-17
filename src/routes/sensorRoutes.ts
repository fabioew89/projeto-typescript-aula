import { Router } from "express";
import SensorController from "../controllers/SensorController.js";
import SensorService from "../services/SensorService.js";

const sensorRouter =  Router();
const sensorService = new SensorService();
const sensorController = new SensorController(sensorService)

sensorRouter.get('/sensors', (req, res) => sensorController.getAllSensors(req, res));
sensorRouter.post('/sensors', (req, res) => sensorController.addSensor(req, res));
sensorRouter.put('/sensors/:id', (req, res) => sensorController.updateSensor(req, res));
sensorRouter.delete('/sensors/:id', (req, res) => sensorController.deleteSensor(req, res));

export default sensorRouter;