import { NextApiRequest } from 'next';
import { File, Files, IncomingForm } from 'formidable';
import FormData from 'form-data';
import fs from 'fs';

interface ParsedFormType<T = { [key: string]: any }> {
  fields: Partial<T>;
  files: Files;
}

export const getParsedForm = async (req: NextApiRequest): Promise<FormData> => {
  const parsed: ParsedFormType = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const form = new FormData();

  Object.entries(parsed.fields).map(([key, value]) => {
    form.append(key, value);
  });

  Object.entries(parsed.files).map(([key, value]) => {
    if (!Array.isArray(value)) {
      form.append(key, fs.createReadStream((value as File)?.filepath), {
        filename: (value as File)?.originalFilename ?? '',
      });
    } else {
      (value as File[]).forEach((file) => {
        form.append(key, fs.createReadStream((file as File)?.filepath), {
          filename: (file as File)?.originalFilename ?? '',
        });
      });
    }
  });

  return form;
};
