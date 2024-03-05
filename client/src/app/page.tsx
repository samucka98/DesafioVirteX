'use client'

import React, { useState } from "react";
import Link from "next/link";

interface Ammount {
 ammount: number;
 message: string;
}

export default function Home() {
 const [ammount, setAmmount] = useState<number>(0);
 const [isImported, setIsImported] = useState<boolean>(false);

 const handleImportData = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  try {
    const url = 'http://localhost:5000/load-data';
    const res = await fetch(url);
    const data: Ammount = await res.json();
    setAmmount(data.ammount);
    setIsImported(true);
  } catch (error) {
    console.error('Algo deu errado ao disparar uma requisicao para a API:', error);
  }
 };

 return (
    <main className="w-full h-screen flex justify-center items-center">

      <div>
      <form onSubmit={handleImportData} className="flex flex-col items-center">
        <h1 className="font-semibold text-4xl mb-4 text-gray-300">Desafio VirteX</h1>
        <button type="submit" className="bg-red-600 w-[320px] h-[50px]">
          Importar Dados
        </button>
      </form>

      {isImported && (
        <div className="flex flex-col items-center justify-start w-[320px] mt-6 border border-gray-600">
          <h1 className="w-full h-[40px] bg-gray-600 mb-4 flex justify-center items-center">SUCESSO!</h1>
          <h2 className="text-center font-mono px-3 mb-4 text-gray-300">No momento existem <strong>{ammount}</strong> registros que foram processados e adicionados ao banco de dados.</h2>
          <Link href='ListData' className="mb-6 underline text-yellow-200">Clique aqui para gerar a lista</Link>
        </div>
      )}
      </div>
    </main>
 );
}
