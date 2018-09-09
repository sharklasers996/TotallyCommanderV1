import { File } from '../../../../models/file';
import { FileType } from '../../../../enums/file-type';

export class FileBrowserTab {
    public active: boolean = false;
    public files: File[];
    public currentDirectory: File;
    public totalFiles: number;
    public totalDirectories: number;

    private selectedFileIndex = 0;

    private lastScrollPosition: number = 0;

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

    public activeTab(): void {
        this.active = true;
        this.scrollToLastPosition();
    }

    public goToBeginningOfList(): void {
        this.incrementSelectionIndex(this.files.length);
    }

    public goToEndOfList(): void {
        this.decrementSelectionIndex(this.files.length);
    }

    public incrementSelectionIndex(itemCount: number = null): void {
        if (itemCount === null) {
            itemCount = 1;
        }

        this.deselectFile();

        if (this.files
            && this.files.length > 0) {
            this.selectedFileIndex -= itemCount;
            if (this.selectedFileIndex < 0) {
                this.selectedFileIndex = 0;
            }
        }

        this.selectFile();
        this.scrollToItem(true);
    }

    public decrementSelectionIndex(itemCount: number = null): void {
        if (itemCount === null) {
            itemCount = 1;
        }

        this.deselectFile();

        if (this.files
            && this.files.length > 0) {
            this.selectedFileIndex += itemCount;
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

    public scrollToLastPosition(): void {
        if (this.files
            && this.files.length > 0) {
            let el = document.getElementById('file-' + this.files[this.selectedFileIndex].id);
            if (el) {
                let parent = this.findScrollableParent(el);
                parent.scrollTop = this.lastScrollPosition;
            } else {
                setTimeout(() => {
                    this.scrollToLastPosition();
                }, 1);
            }
        }
    }

    private scrollToItem(up: boolean): void {
        let el = document.getElementById('file-' + this.files[this.selectedFileIndex].id);
        let parent = this.findScrollableParent(el);

        if (up && this.shouldScrollUp(el)) {
            parent.scrollTop = el.offsetTop;
        } else if (this.shouldScrollDown(el)) {
            let scrollHeight = el.offsetTop - parent.clientHeight + el.clientHeight;
            parent.scrollTop = scrollHeight;
        }

        this.lastScrollPosition = parent.scrollTop;
    }

    private shouldScrollDown(el): boolean {
        let rect = el.getBoundingClientRect();
        let parent = this.findScrollableParent(el);
        let parentRect = parent.getBoundingClientRect();

        return rect.bottom - parentRect.top >= parent.clientHeight;
    }

    private shouldScrollUp(el): boolean {
        let rect = el.getBoundingClientRect();
        let parent = this.findScrollableParent(el);
        let parentRect = parent.getBoundingClientRect();

        return rect.top < parentRect.top;
    }

    private findScrollableParent(element: HTMLElement): HTMLElement {
        let isBody: boolean;
        let hasScrollableSpace: boolean;
        let hasVisibleOverflow: boolean;

        do {
            element = element.parentElement;
            isBody = element === document.body;
            hasScrollableSpace = element.clientHeight < element.scrollHeight;
            hasVisibleOverflow = getComputedStyle(element, null).overflow === 'visible';
        } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));
        return element;
    }
}
