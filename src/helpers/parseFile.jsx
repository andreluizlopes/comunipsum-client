import Papa from 'papaparse';

export function parseFile(file) {
  const data = [];

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: () => {
        resolve(data);
      },
      error: (error) => {
        reject(error.message)
      },
      step: (row) => {
        data.push(row.data[0]);
        // let progress = row.meta.cursor / file.size * 100;
      }
    });
  });
}
