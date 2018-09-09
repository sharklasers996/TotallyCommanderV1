import { FileType } from '../enums/file-type';

export class File {
    public id: string;
    public selected: boolean;

    constructor(
        public name: string,
        public nameWithoutExtesion: string,
        public extension: string,
        public fullName: string,
        public type: FileType,
        public modifiedAt: Date,
        public modifiedAtString: string,
        public sizeInBytes: Number
    ) { }

    public clone(): File {
        return new File(
            this.name,
            this.nameWithoutExtesion,
            this.extension,
            this.fullName,
            this.type,
            this.modifiedAt,
            this.modifiedAtString,
            this.sizeInBytes);
    }
}
