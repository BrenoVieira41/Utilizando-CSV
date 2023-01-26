import { convertArrayToCSV } from 'convert-array-to-csv';
import * as fs from 'fs';
import { ISelection } from './interface';

class CreateService {
  public async createCsv(values: ISelection[]): Promise<string> {
    if (values.length <= 2) {
      throw new Error('E esperado no mínimo 3 dados para a criação do CSV');
    }

    const validateInput = values.every(this.validateValues);

    if (!validateInput) {
      throw new Error('Por enquanto o csv só e criado quando e passado esses dados \n (nome, numero, posicao)');
    }

    this.createCSV(values);

    return 'Csv criado com sucesso';
  }

  private validateValues(input: ISelection) {
    const findinput = [input.nome, input.numero, input.posicao];
    return !findinput.includes(undefined);
  };

  private async createCSV(value: ISelection[]) {
    const currentDate = new Date().toLocaleDateString();
    const regext = /[\/]/g;
    const fomattedDate = currentDate.replace(regext, '-');

    const newCsv = convertArrayToCSV(value, { separator: ';' });
    fs.writeFile(`./exports/${fomattedDate}.csv`, newCsv, ((error) => {
      if (error) throw error;
      console.log('CSV criado com sucesso');
    }));
  }
}


export default CreateService;

