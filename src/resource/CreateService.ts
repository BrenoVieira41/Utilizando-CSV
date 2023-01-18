import { convertArrayToCSV } from 'convert-array-to-csv';
import * as fs from 'fs';

class CreateService {
  public async createCsv(values: Array<Object>): Promise<string> {
    if (values.length <= 1 || typeof (values[0]) !== 'object') {
      throw new Error('Estrutura do CSV naõ aceito');
    }

    const keys = values.map(it => Object.keys(it));

    const validateValues = (currentValue: string[]) => {
      const valdiate = currentValue.filter(it => keys[0].includes(it));
      return valdiate.length === keys[0].length;
    };

    const validateKeys = keys.every(validateValues);

    if (!validateKeys) {
      throw new Error('E esperado chaves exatamente iguais');
    }

    this.createCSV(values);

    return 'Csv criado com sucesso';
  }

  private async createCSV(value: Object[]) {
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

