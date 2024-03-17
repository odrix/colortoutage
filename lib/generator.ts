import OpenAI from "openai";
// import { put } from '@vercel/blob';
import fs from 'fs'
import fetch from 'node-fetch';
const { v4: uuidv4 } = require('uuid');

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

const generateColoring = async function(subject:string, to:string) {
    const promptImg = `Créer un dessin à colorier pour ${to} ans dont le sujet est ${subject}.
    le fond doit être entierement blanc.`;

    const response = await openai.images.generate({
        model:"dall-e-3",
        prompt:promptImg,
        size: "1024x1024",
        quality:"standard",
        response_format: "b64_json",
        n:1
    });

    return response.data[0].b64_json;
};
 

const save = async function(url:string) {
    const fileName = uuidv4();
    const dest=`public/images/colorings/${fileName}.png`
    let file = fs.createWriteStream(dest);

    const response = await fetch(url)
    
    response.body.pipe(file);

    function write() {
        return new Promise((resolve, reject) => {
            file.on('finish', function() {
                file.close();
                resolve('complete');
            });
            file.on('error', reject);
        });
    }

    return write();
};


const saveData = async function(data:string) {
    const fileName = uuidv4();
    const dest=`public/images/colorings/${fileName}.png`

    let buff = Buffer.from(data, 'base64');
    fs.writeFileSync(dest, buff);
    
    return fileName;
};

//   async function uploadImage(formData: FormData) {
//     const imageFile = formData.get('image') as File;
//     const blob = await put(imageFile.name, imageFile, {
//       access: 'public',
//     });
//     revalidatePath('/');
//     return blob;
//   }

  export default {
    generateColoring,
    save,
    saveData
  }