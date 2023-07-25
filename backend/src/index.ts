/* eslint-disable no-console */
import { uploadData } from '@config/env';
import loadData from '@utils/loadData';
import { loadHotels } from '@utils/readingFiles';
import app from 'app';
import { schedule } from 'node-cron';

async function main() {
  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
  });
  if (uploadData) await loadData();
  
  console.log('asdasd')
  schedule('00 4 * * 1', () => {
    console.log("Ingreso cron descargar hoteles");
    loadHotels();
  });
}
main();
