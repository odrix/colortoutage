import Image from "next/image";
import { Coloring } from "@/lib/database";
import React, { Component } from 'react';


const coloringItem = (props:{coloring:Coloring}) => {
  const coloring = props.coloring;
  const filePath =`/images/colorings/${coloring.file}`;

  return <div>
          <span>{coloring.name}</span>
          <Image src={filePath} height={200} width={300} alt={coloring.name} />
        </div>;
};

export default coloringItem;

// class coloringItem extends Component<{coloring:Coloring}> {
//   render() {
//     const { name, file, tags } = this.props.coloring;
//     return (
//       <div>
//       <span>{name}</span>
//       <Image src={file} height={200} width={300} alt={name} />
//     </div>
//     );
//   }
// }

//  export default coloringItem;