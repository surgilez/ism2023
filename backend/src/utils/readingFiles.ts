import { apiRatehack } from '@config/env';
import { decompressStream, TransformStreamDecompressor } from '@xingrz/cppzst';
import prisma from 'database';
import { get } from 'https';
import { convertDataHotel } from './convertData';

const generateChunk = async (decompressed: TransformStreamDecompressor, size: number) => {
  let i = 0;
  let bytesRead = 0;
  let chunks: Buffer[] = [];
  let lastLine: string | undefined = '';
  let firstLine: string | undefined = '';
  console.log("Descargando Hoteles", new Date());
  for await (const chunk of decompressed) {
    bytesRead += chunk.length;
    chunks.push(chunk);
    if (bytesRead >= size) {
      const data = Buffer.concat(chunks);
      const dataLines = data.toString().split('\n');
      if (i > 0) {
        firstLine = dataLines.shift();
        const newData = `${lastLine}${firstLine}`;
        lastLine = dataLines.pop();
        dataLines.push(newData);
        await prisma.hotel.createMany({ data: dataLines.map((item) => convertDataHotel(JSON.parse(item))) as never });
      }
      if (i === 0) {
        lastLine = dataLines.pop();
        await prisma.hotel.createMany({ data: dataLines.map((item) => convertDataHotel(JSON.parse(item))) as never });
      }
      bytesRead = 0;
      chunks = [];
      i++;
    }
  }
  console.log("termino de descargar", new Date());
  if (chunks.length > 0) {
    const data = Buffer.concat(chunks);
    const dataLines = data.toString().split('\n');
    const { length } = dataLines;
    if (dataLines[length] === undefined) dataLines.pop();
    if (lastLine !== undefined) {
      firstLine = dataLines.shift();
      dataLines.push(`${lastLine}${firstLine}`);
    }
    await prisma.hotel.createMany({ data: dataLines.map((item) => convertDataHotel(JSON.parse(item))) as never });
    chunks = [];
    i++;
  }
};

export const loadHotels = async () => {
  const encoded = Buffer.from(`${apiRatehack.user}:${apiRatehack.password}`).toString('base64');
  console.log(apiRatehack.user, apiRatehack.password);
  const data = await fetch(`${apiRatehack.url}/hotel/info/dump/`, {
    method: 'POST',
    body: JSON.stringify({ inventory: 'all', language: 'es' }),
    headers: { Authorization: `Basic ${encoded}` },
  });
  const newData = await data.json();
  const urlHotels = newData.data?.url;
  console.log(urlHotels)
  if (!urlHotels) throw new Error('No se pudo cargar los hoteles');
  const response = await fetch(urlHotels);
  if (!response.body) throw new Error('No se pudo cargar los hoteles');
  await prisma.$executeRaw`Truncate table hotel`;
  get(urlHotels, async (stream) => {
    const decompressed = stream.pipe(decompressStream());
    await generateChunk(decompressed, 4000000);
  });
};
