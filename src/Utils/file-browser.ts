import { FSJetpack, InspectResult } from 'fs-jetpack/types';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { File } from '../models/file';
import { FileType } from '../enums/file-type';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class FileBrowser {
    private jetpack: FSJetpack;

    constructor() {
        this.jetpack = window.require('fs-jetpack');
    }

    public browse(pathOrFile: string | File): File[] {
        let path = '';

        if (typeof pathOrFile === 'string') {
            path = pathOrFile;
        } else {
            path = pathOrFile.fullName;
        }

        let lastPathChar = path.charAt(path.length - 1);
        if (lastPathChar !== '/') {
            path = path + '/';
        }

        let list = this.jetpack.list(path);

        let fileInfoList = list.map(file => {
            return this.getFileInfo(path + file);
        });

        let files = fileInfoList.filter(fileInfo => (fileInfo.type === FileType.File || fileInfo.type === FileType.Symlink));
        let directories = fileInfoList.filter(fileInfo => fileInfo.type === FileType.Directory);

        files = files
            .sort((a: File, b: File) => {
                let aChars = this.getFirstTwoCharsLowerCase(a.name);
                let bChars = this.getFirstTwoCharsLowerCase(b.name);

                if (aChars < bChars) {
                    return -1;
                }

                if (aChars > bChars) {
                    return 1;
                }

                return 0;
            });

        directories = directories
            .sort((a: File, b: File) => {
                let aChars = this.getFirstTwoCharsLowerCase(a.name);
                let bChars = this.getFirstTwoCharsLowerCase(b.name);

                if (aChars < bChars) {
                    return -1;
                }

                if (aChars > bChars) {
                    return 1;
                }

                return 0;
            });

        return directories.concat(files);
    }

    private getFirstTwoCharsLowerCase(input: string): string {
        if (input.length < 2) {
            return input.toLowerCase();
        }

        return input
            .substring(0, 2)
            .toLowerCase();
    }

    public getFileInfo(path: string): File {
        let inspectFileResult = this.jetpack.inspect(path, { times: true, absolutePath: true });

        return new File(
            inspectFileResult.name,
            this.getFilenameWithoutExtension(inspectFileResult),
            this.getFilenameExtension(inspectFileResult),
            inspectFileResult.absolutePath,
            this.getFileType(inspectFileResult),
            inspectFileResult.modifyTime,
            this.getDateTimeString(inspectFileResult.modifyTime),
            inspectFileResult.size
        );
    }

    private getFilenameExtension(inspectFileresult: InspectResult): string {
        if (this.getFileType(inspectFileresult) !== FileType.File) {
            return '<dir>';
        }

        let lastIndexOfDot = inspectFileresult.name.lastIndexOf('.');
        if (lastIndexOfDot > 0) {
            let extension = inspectFileresult.name.substring(lastIndexOfDot + 1);
            if (extension.length === inspectFileresult.name.length) {
                return '';
            }

            return inspectFileresult.name.substring(lastIndexOfDot + 1);
        }

        return '';
    }

    private getFilenameWithoutExtension(inspectFileResult: InspectResult): string {
        if (this.getFileType(inspectFileResult) !== FileType.File) {
            return inspectFileResult.name;
        }

        let lastIndexOfDot = inspectFileResult.name.lastIndexOf('.');
        if (lastIndexOfDot > 0) {
            return inspectFileResult.name.substring(0, lastIndexOfDot);
        }

        return inspectFileResult.name;
    }

    private getDateTimeString(date: Date): string {
        let modifiedAt = moment(date.toString());
        return modifiedAt.format('YYYY.MM.DD HH:mm:ss');
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
