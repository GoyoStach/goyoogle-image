export interface ProductSimple {
id:number;
attributes: 
    {
        name:string;
        description:string;
        createdAt:Date;
        updatedAt:Date;
        publishedAt:Date;
        brand:string
        price?: string;
        currency?:string,
        previousPrice?:string;
        details?:Details[];
        categories: 
            {
                data:Categorie[]
            }
        images :
            {
                data: Image[]
            }
    }
}

interface Details {
    id:number;
    value:string;
    icon:string;
}
interface Image {
    id:number
    attributes:
    {
    name: string;
    alternativeText: null;
    caption: null,
    width: 1920,
    height: 1920,
    formats: 
        {
        large: Format,
        small: Format,
        medium: Format,
        thumbnail: Format
        },
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: null,
        provider: string,
        provider_metadata: null,
        createdAt:Date;
        updatedAt:Date;
    }                   
}

interface Format {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
}


interface Categorie {
    id:number
    attributes :
        {
            name: string
            createdAt:Date;
            updatedAt:Date;
            publishedAt:Date;
        }
}