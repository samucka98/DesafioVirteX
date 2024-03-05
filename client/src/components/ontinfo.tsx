interface OntinfoProps {
  id: number,
  ont_origin: string, 
  slot: number, 
  port: number,
  ont_id: number,
  sn: string,
  state: string
}

export default function Ontinfo(props: OntinfoProps) {
  return(
    <tr className="flex justify-start">
      <td className="flex justify-start items-center pl-2 border border-gray-500 w-[150px]">{ props.ont_origin }</td>
      <td className="flex justify-start items-center pl-2 border border-gray-500 w-[100px]">{ props.slot }</td>
      <td className="flex justify-start items-center pl-2 border border-gray-500 w-[100px]">{ props.port }</td>
      <td className="flex justify-start items-center pl-2 border border-gray-500 w-[100px]">{ props.ont_id }</td>
      <td className="flex justify-start items-center pl-2 border border-gray-500 w-[300px]">{ props.sn }</td>
      <td className="flex justify-start items-center pl-2 border border-gray-500 w-[150px]">
        <span className={`w-[8px] h-[8px] rounded-full mr-2 ${props.state === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
        { props.state }</td>
    </tr>
  );
}