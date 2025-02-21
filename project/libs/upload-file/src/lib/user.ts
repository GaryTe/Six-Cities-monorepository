import {Injectable} from '@nestjs/common';
import dayjs from 'dayjs';
import * as crypto from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import 'multer';

import {ROUTE_UPLOAD} from '@project/const';

@Injectable()
export class UploadFile {
  public async execute(file: Express.Multer.File, uploadDirectory: string): Promise<string> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const subDirectory = `${year}/${month}`;

    const filename = crypto.randomUUID();
    const fileExtension = file.originalname.split('.');

    const directoryPath = `${uploadDirectory}/${subDirectory}`;
    const filePath = `${directoryPath}/${filename}.${fileExtension[fileExtension.length - 1]}`

    await ensureDir(directoryPath)
    await writeFile(filePath, file.buffer);

    return `${ROUTE_UPLOAD}/${subDirectory}/${filename}.${fileExtension[fileExtension.length - 1]}`
  };
}
