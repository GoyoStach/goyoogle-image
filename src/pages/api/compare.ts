// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from 'helpers/weviate.helper';
import fs from 'fs/promises'
import type { NextApiRequest } from 'next'
import path  from 'path';
import formidable from "formidable";
import { readFileSync } from 'fs';

export const config = {
    api: {
      bodyParser: false,
    },
}

const should_save = true


const readFile = (req:NextApiRequest,saveLocally?:boolean):Promise<{fields:formidable.Fields;files:formidable.Files}>=>{
    const options:formidable.Options={}
    if (saveLocally) {
        options.uploadDir= path.join(process.cwd(),"public/img")
        options.filename = (name,ext,path,form)=> {
            return Date.now().toString() + "_"+ path.originalFilename
        }
    }

    const form = formidable(options)
    return new Promise((resolve,reject)=>{
        form.parse(req,(err,fields,files)=>{
            if(err) reject(err)
            resolve({fields,files})
        })
    })
}

export default async function handler(
    req: NextApiRequest,
    res: any
  ) {
      try {
          await fs.readdir(path.join(process.cwd()+'/public','/img'))
      } catch (error) {
          await fs.mkdir(path.join(process.cwd()+'/public','/img'))
      }   
      
      const testos = await readFile(req , should_save)
      const test = Buffer.from(readFileSync(testos.files.myImage?.filepath)).toString('base64')
      
      const resImage = await client.graphql.get().withClassName('Cover').withFields(['image','text']).withNearImage({image:test}).withLimit(4).do()
      
      if(should_save){
        await client.data.creator()
        .withClassName('Cover')
        .withProperties({image:test,text:testos.files.myImage?.newFilename})
        .do()
      }
      const mapped = resImage.data.Get.Cover.map((e,index)=>{
          const result = resImage.data.Get.Cover[index].text
          return result
      })
      res.status(200).json({baseImg:testos.files.myImage?.newFilename, data:mapped}) 
  }