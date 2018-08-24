import { FSJetpack, InspectResult } from "fs-jetpack/types";
import { Injectable } from "@angular/core";
import { File } from "../models/file";
import { FileType } from "../enums/file-type";

@Injectable({
    providedIn: 'root'
})
export class FileBrowser {
    private jetpack: FSJetpack;

    constructor() {
        this.jetpack = window.require("fs-jetpack");
    }

    public browse(pathOrFile: string | File): File[] {
        let path = '';

        if (typeof pathOrFile === 'string') {
            path = pathOrFile
        } else {
            path = pathOrFile.fullName;
        }

        let lastPathChar = path.charAt(path.length - 1);
        if (lastPathChar !== '/') {
            path = path + '/';
        }

        var list = this.jetpack.list(path);

        let files = list.map(file => {

            var inspectFileResult = this.jetpack.inspect(path + file, { times: true, absolutePath: true });

            return new File(
                inspectFileResult.name,
                inspectFileResult.absolutePath,
                this.getFileType(inspectFileResult),
                inspectFileResult.modifyTime,
                inspectFileResult.size
            );
        });

        files = files
            .sort((a: File, b: File) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }

                return 0;
            });


        return files.sort((a: File, b: File) => {
            if (a.type === FileType.File
                && b.type === FileType.Directory) {
                return 1;
            }

            if (a.type === FileType.Directory
                && b.type === FileType.File) {
                return -1;
            }

            return 0;
        });
    }

    private getFileType(file: InspectResult): FileType {
        switch (file.type) {
            case 'file':
                return FileType.File;
            case 'dir':
                return FileType.Directory;
            case 'symlink':
                return FileType.Symlink;
        }
    }
}