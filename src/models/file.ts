import { FileType } from "../enums/file-type";

export class File {
    public id: number;
    public selected: boolean;

    constructor(
        public name: string,
        public fullName: string,
        public type: FileType,
        public modifiedAt: Date,
        public sizeInBytes: Number
    ) { }
}