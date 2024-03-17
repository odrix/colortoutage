import Image from "next/image";
import { Coloring } from "@/lib/database";


const coloringItem = (props:{coloring:Coloring}) => {
  const coloring = props.coloring;
  const filePath =`/images/colorings/${coloring.file}`;

  return <>
          <span>{coloring.name}</span>
          <Image src={filePath} height={200} width={300} alt={coloring.name} />
        </>;
};

export default coloringItem;