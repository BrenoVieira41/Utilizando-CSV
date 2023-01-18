import { Request, Response } from 'express';
import CreateService from './CreateService';

class Controller {
  async CreateCsv(req: Request, res: Response): Promise<any> {
    try {
      const createService = new CreateService();
      const values = req.body;
      createService.createCsv(values);
      return res.status(200).send();
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export default new Controller();
