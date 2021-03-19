export interface BaseFile {
    url: string
    name: string
    originalName: string
    extension: string
    size: string
}

export interface ImageFile extends BaseFile {}
