import { Component, ElementRef, ViewChild } from '@angular/core';
import { Advisory, AuditAdvisory, AuditSummary, Severity } from './models';

const getSeverityValue = (severity: Severity): number => ({ info: 1, low: 2, moderate: 4, high: 8, critical: 16 }[severity]);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('auditFile') auditFile: ElementRef<HTMLTextAreaElement> | undefined;

    public auditSummary: AuditSummary | undefined = undefined;
    public advisories: Advisory[] = [];
    public dataSource: Partial<Advisory>[] = [];
    public columnsToDisplay = ['id', 'severity', 'title', 'created', 'url'];
    public auditDate: Date = new Date();
    public today: Date = new Date();

    parseAuditFile(): void {
        const auditFileContent = this.auditFile?.nativeElement.value;

        if (!auditFileContent) {
            throw new Error('missing audit file content');
        }

        const auditFileContentParsed = auditFileContent
            .split('\n')
            .filter(Boolean)
            .map(row => JSON.parse(row));

        this.advisories = auditFileContentParsed
            .filter(e => e.type === 'auditAdvisory')
            .map((e: { data: AuditAdvisory }) => e.data.advisory);
        this.auditSummary = auditFileContentParsed.find(e => e.type === 'auditSummary')?.data;

        this.dataSource = Array.from(
            new Map(
                this.advisories
                    .filter(advisory => new Date(advisory.created) < this.auditDate)
                    .map(advisory => [
                        advisory.id,
                        {
                            id: advisory.id,
                            created: advisory.created,
                            title: advisory.title,
                            severity: advisory.severity,
                            url: advisory.url,
                        },
                    ]),
            ).values(),
        ).sort((e1, e2) => getSeverityValue(e2.severity) - getSeverityValue(e1.severity));
    }

    public toDate(dateStr: any): Date {
        return new Date(dateStr);
    }
}
