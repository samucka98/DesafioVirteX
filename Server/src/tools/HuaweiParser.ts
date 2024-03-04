import fs from 'fs/promises';
import path from 'path';

export default async function HuaweiParser(filename: string ) {

  const filePath = path.join(__dirname, '..', 'Inputs', `${filename}.txt`);
  const data = await fs.readFile(filePath, 'utf8');

  const arrStr = data.split('\n');

  for (let i = 0; i < 8; i++)
    arrStr.splice(0, 1);

  let filterArr = arrStr.filter(item => 
    !item.includes("---") && 
    !item.includes("@") && 
    !item.includes("F/S/P") && 
    !item.includes("'") &&
    !item.includes("In port")
  );

  filterArr.splice(filterArr.length - 2, 2);

  const arrItems = filterArr.map(item => {
    const campos = item.split(/\s+/g);

    return {
        slot: campos[2][0],
        port: campos[2][2],
        ont_id: campos[3],
        sn: campos[4],
        state: campos[6]
    }
  });


  return arrItems;
}