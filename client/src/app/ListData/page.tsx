'use client'

import { useEffect, useState } from "react";
import Ontinfo from "../../components/ontinfo";

interface OntinfoProps {
  id: number,
  ont_origin: string, 
  slot: number, 
  port: number,
  ont_id: number,
  sn: string,
  state: string
}

export default function ListData() {
  const [items, setItems] = useState<OntinfoProps[]>([]);

  async function GetData() {
    const result = await fetch('http://localhost:5000/get-data');
    if (!result.ok)
      throw new Error('Falha ao obter dados do servidor!');
    
    return result.json();
  }

  useEffect(() => {
    GetData().then(data => setItems(data));
  }, []);

  return(
    <main className="flex flex-col w-full items-center">

      <div className="w-full h-[70px] bg-red-600 flex justify-center items-center mb-5">
        <div className="w-[900px] flex justify-between items-center">
          <h1 className="font-semibold text-2xl text-gray-300">Desafio VirteX</h1>
          <a href="https://github.com/samucka98/DesafioVirteX" target="_blank" rel="noopener noreferrer" className="underline">Acessar Repositório</a>
        </div>
      </div>

      <table className="flex flex-col table-fixed bg-gray-100 text-gray-800 w-[900px] border border-gray-400">
        <thead className="bg-gray-300">
          <tr className="flex justify-start">
            <th className="flex justify-start items-center pl-2 border border-gray-500 w-[150px]">ont_origin</th>
            <th className="flex justify-start items-center pl-2 border border-gray-500 w-[100px]">slot</th>
            <th className="flex justify-start items-center pl-2 border border-gray-500 w-[100px]">port</th>
            <th className="flex justify-start items-center pl-2 border border-gray-500 w-[100px]">ont_id</th>
            <th className="flex justify-start items-center pl-2 border border-gray-500 w-[300px]">sn</th>
            <th className="flex justify-start items-center pl-2 border border-gray-500 w-[150px]">state</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
              <Ontinfo 
                key={item.id}
                id={item.id}
                ont_origin={item.ont_origin}
                slot={item.slot}
                port={item.port}
                ont_id={item.ont_id}
                sn={item.sn}
                state={item.state} 
              />
            ))}
        </tbody>
      </table>    
    </main>
  );
}