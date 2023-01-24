import { Readable } from 'stream';
import { ISelection } from './interface';
import readline from 'readline';

class ReadService {

  public async readCsv(file: Buffer) {
    const readableFile = new Readable();
    readableFile.push(file);
    readableFile.push(null);

    const createCupSelection = readline.createInterface({
      input: readableFile
    });

    const CupSelection: ISelection[] = [];


    for await (const line of createCupSelection) {
      const selectionSplit = line.split(',');

      if(line.indexOf('"') !== 0) {
        CupSelection.push({
          numero: Number(selectionSplit[0]),
          nome: selectionSplit[1],
          posicao: selectionSplit[2]
        });
      }
    }

    return CupSelection;
  }

}

export default ReadService;
