import { read, write } from '../utils/sensorFile.js';
import type { Sensor } from '../types/Sensor.js';
import { AppError } from '../errors/AppError.js';

class SensorService {
    private fileName = 'sensor.json';
    private sensorsMemoria: Sensor[] = []


    public async getAllSensors(): Promise<Sensor[]> {

        if(this.sensorsMemoria.length > 0) {
            return this.sensorsMemoria;
        }

        const sensors = await read(this.fileName);
        return sensors;
    }

    public async addSensor(body: unknown): Promise<Sensor> {

        const {  type, serialNumber, location, status } = body as Sensor;

        // validations 
        if(!type || !serialNumber || !location || !status) {
            throw new Error("Missing required sensor fields");
        }

        const sensors = await this.getAllSensors();
        const newSensor: Sensor = {
            id: sensors.length + 1,
            type,
            serialNumber,
            location,
            status
        }

        if (sensors.includes(newSensor)) {
            throw new Error("Sensor already exists");
        }

        sensors.push(newSensor);
        this.sensorsMemoria = sensors;
        await write(this.fileName, sensors);

        return newSensor;

    }

    public async updateSensor(id: string, body: Sensor) {

        const sensores = await this.getAllSensors();
        const sensorIndex = sensores.findIndex( s => s.id === Number(id));

        if (sensorIndex === -1) {
            throw new AppError(404, "Sensor não encontrado");
        }

        const updateSensor = {...sensores[sensorIndex], ...body};
        sensores[sensorIndex] = updateSensor;

        this.sensorsMemoria = sensores;
        await write(this.fileName, sensores);

        return updateSensor;

    }

    public async deleteSensor(id: string) {

        const sensores = await this.getAllSensors();
        const sensorIndex = sensores.findIndex(s => s.id === Number(id));

        if (sensorIndex === -1) {
            throw new AppError(404, "Sensor não encontrado");
        }

        sensores.splice(sensorIndex, 1);
        this.sensorsMemoria = sensores;
        await write(this.fileName, sensores);

        return ;

    }
}

export default SensorService;