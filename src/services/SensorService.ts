import { read, write } from '../utils/sensorFile.js';
import { AppError } from '../errors/AppError.js';
import { appDataSource } from '../database/dataSource.js';
import Sensor from '../entities/Sensor.js';

class SensorService {
    private fileName = 'sensor.json';
    private sensorsMemoria: Sensor[] = []
    private sensorRepository = appDataSource.getRepository(Sensor)


    public async getAllSensors(): Promise<Sensor[]> {
        return await this.sensorRepository.find();
    }

    public async addSensor(body: unknown): Promise<Sensor> {

        const {  nome, serialNumber } = body as Sensor;

        // validations 
        if(!nome || !serialNumber) {
            throw new Error("Missing required sensor fields");
        }
        const sensorExiste = await this.sensorRepository.findOne({ where: { serialNumber } })
        if(sensorExiste) {
            throw new AppError(400, "Sensor já cadastrado!");
        }
        const novoSensor = await this.sensorRepository.create({
            nome,
            serialNumber
        })
        await this.sensorRepository.save(novoSensor);
        return novoSensor;
    }

    public async updateSensor(id: string, body: Sensor) {


    }

    public async deleteSensor(id: string) {


    }
}

export default SensorService;