// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from 'helpers/weviate.helper';
import { readFileSync, readdirSync } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const dirRelativeToPublicFolder = 'img'
    const dir = path.resolve('./public', dirRelativeToPublicFolder);
    const filenames = readdirSync(dir);

    
    const promises = filenames.map(async(imgFile)=>{

        const test = readFileSync(`${dir}/${imgFile}`)
        const b64 = Buffer.from(test).toString('base64')
       
        await client.data.creator()
        .withClassName('Cover')
        .withProperties({image:b64,text:imgFile})
        .do()
    })

    await Promise.all(promises)

    res.status(200).json('ok')   
}
