import { Request, Response } from 'express';
import CreateService from './CreateService';
import ReadService from './ReadService';

class Controller {
  async CreateCsv(req: Request, res: Response): Promise<any> {
    try {
      new CreateService().createCsv(req.body);
      return res.status(200).send('Csv criado com sucesso');
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  async ReadCsv(req: Request, res: Response): Promise<any> {
    try {
      const { buffer } = req.file;
      const readService = new ReadService();

      const readCsv = await readService.readCsv(buffer);
      return res.status(200).send(readCsv);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export default new Controller();
