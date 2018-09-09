import { File } from '../../../../models/file';
import { FileType } from '../../../../enums/file-type';

export class FileBrowserTab {
    public selected: boolean = false;
    public files: File[];
    public currentDirectory: File;
    public totalFiles: number;
    public totalDirectories: number;

    private selectedFileIndex = 0;

    constructor() { }

    public setFiles(files: File[]): void {
        this.files = files;
        this.resetFileSelection();
        this.selectFile();

        this.totalDirectories = this.files.filter(f => f.type === FileType.Directory).length;
        this.totalFiles = this.files.filter(f => f.type === FileType.File).length;
    }

    public setCurrentDirectory(directory: File): void {
        this.currentDirectory = directory;
    }

    public getSelectedFile(): File {
        if (!this.files
            || this.files.length === 0) {
            return null;
        }

        return this.files[this.selectedFileIndex];
    }

    public incrementSelectionIndex(): void {
        this.deselectFile();

        if (this.files
            && this.files.length > 0) {
            this.selectedFileIndex--;
            if (this.selectedFileIndex < 0) {
                this.selectedFileIndex = 0;
            }
        }

        this.selectFile();
        this.scrollToItem(true);
    }

    public decrementSelectionIndex(): void {
        this.deselectFile();

        if (this.files
            && this.files.length > 0) {
            this.selectedFileIndex++;
            if (this.selectedFileIndex >= this.files.length) {
                this.selectedFileIndex = this.files.length - 1;
            }
        }

        this.selectFile();
        this.scrollToItem(false);
    }

    public selectFile(): void {
        if (!this.files
            || this.files.length === 0) {
            return;
        }

        this.files[this.selectedFileIndex].selected = true;
    }

    public deselectFile(): void {
        if (!this.files
            || this.files.length === 0) {
            return;
        }

        this.files[this.selectedFileIndex].selected = false;
    }

    private resetFileSelection(): void {
        this.selectedFileIndex = 0;
    }

    public scrollIntoView(): void {
        if (this.files
            && this.files.length > 0) {
            let el = document.getElementById('file-' + this.files[this.selectedFileIndex].id);
            if (el) {
                el.scrollIntoView();
            } else {
                setTimeout(() => {
                    this.scrollIntoView();
                }, 10);
            }
        }
    }

    private scrollToItem(up: boolean): void {
        let el = document.getElementById('file-' + this.files[this.selectedFileIndex].id);

        if (!this.isElementInViewport(el)) {
            if (up) {
                el.scrollIntoView();
            } else {
                let parent = this.findScrollableParent(el);
                let scrollHeight = el.offsetTop - parent.clientHeight + el.clientHeight;
                parent.scrollTop = scrollHeight;
            }
        }
    }

    private isElementInViewport(el): boolean {
        let rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    private findScrollableParent(element: HTMLElement): HTMLElement {
        let isBody: boolean,
            hasScrollableSpace: boolean,
            hasVisibleOverflow: boolean;
        do {
            element = element.parentElement;
            isBody = element === document.body;
            hasScrollableSpace = element.clientHeight < element.scrollHeight;
            hasVisibleOverflow = getComputedStyle(element, null).overflow === 'visible';
        } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));
        return element;
    }
}
