// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from 'helpers/weviate.helper'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const schemaConfig = {
        "class":'Cover',
        'vectorizer':'img2vec-neural',
        'vectorIndexType':'hnsw',
        'moduleConfig':{
            'img2vec-neural':{
                'imageFields':[
                    'image'
                ]
            }
        },
        'properties':[
            {
                'name':'image',
                'dataType':['blob']
            },
            {
                'name':'text',
                'dataType':['string']
            }
        ]
    }

    await client.schema.classCreator().withClass(schemaConfig).do()
    const schemaRes = await client.schema.getter().do()
    res.status(200).json(schemaRes)
}
