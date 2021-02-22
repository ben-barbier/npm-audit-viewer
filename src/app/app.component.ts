import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('auditFile') auditFile: ElementRef<HTMLTextAreaElement> | undefined;

    parseAuditFile(): void {
        const auditFileContent = this.auditFile?.nativeElement.value;

        if (!auditFileContent) {
            throw new Error('missing audit file content');
        }

        const auditFileObject = JSON.parse(auditFileContent);
        debugger;
    }
}
