import fs from 'fs/promises';
import path from 'path';

interface SNItem {
  slot: string;
  port: string;
  ont_id: string;
  sn?: string; 
}
 
 interface StateItem {
  slot: string;
  port: string;
  ont_id: string;
  status: string;
 }
 
interface CombinedItem extends SNItem {
  state?: string; 
}
 
export default async function ZteParser(filename_SN: string, filename_State: string) {
   
  const filePath_SN = path.join(__dirname, '..', 'Inputs', `${filename_SN}.txt`);
  const dataSN = await fs.readFile(filePath_SN, 'utf8');
  
  const filePath_State = path.join(__dirname, '..', 'Inputs', `${filename_State}.txt`);
  const dataState = await fs.readFile(filePath_State, 'utf8');

  const arrSN = dataSN.split('\n');
  let filterArrSN = arrSN.filter(item => 
      !item.includes("---") &&
      !item.includes("OnuIndex")
  );
  
  const arrItemsSN: SNItem[] = filterArrSN.map(item => {    
    const campos = item.split(/\s+/g);

      return {
        slot: campos[0][11],
        port: campos[0][13],
        ont_id: campos[0][15],
        sn: campos[3]
      }
  });
  
  const arrState = dataState.split('\n');
  let filterArrState = arrState.filter(item => 
      !item.includes("#show") &&
      !item.includes("---") &&
      !item.includes("OnuIndex")
  );
  
  const arrItemsState: StateItem[] = filterArrState.map(item => {
      const campos = item.split(/\s+/g);
  
      return {
        slot: campos[0][2],
        port: campos[0][4],
        ont_id: campos[0][6],
        status: campos[3]
      }
  });
  
  function findMatchingItem(snItem: SNItem, stateItems: StateItem[]): StateItem | undefined {
      return stateItems.find(stateItem => 
        snItem.slot === stateItem.slot &&
        snItem.port === stateItem.port &&
        snItem.ont_id === stateItem.ont_id
      );
  }
  
  const combinedItems: CombinedItem[] = arrItemsSN.map(snItem => {
      const matchingStateItem = findMatchingItem(snItem, arrItemsState);
      
      if (matchingStateItem) {
        if (matchingStateItem.status === "working")
          matchingStateItem.status = "online";
        
        return {
          slot: snItem.slot,
          port: snItem.port,
          ont_id: snItem.ont_id,
          sn: snItem.sn?.replace("SN:", ""),
          state: matchingStateItem.status
        };
      }
      
      else {
        return {
          ...snItem,
          state: undefined
        };
      }
  });
  
  return combinedItems;
}
 