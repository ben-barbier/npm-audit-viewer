export interface AuditSummary {
    vulnerabilities: {
        info: number;
        low: number;
        moderate: number;
        high: number;
        critical: number;
    };
    dependencies: number;
    devDependencies: number;
    optionalDependencies: number;
    totalDependencies: number;
}

export interface AuditAdvisory {
    resolution: Resolution;
    advisory: Advisory;
}

export interface Resolution {
    id: number;
    path: string;
    dev: boolean;
    bundled: boolean;
    optional: boolean;
}

export type Severity = 'info' | 'low' | 'moderate' | 'high' | 'critical';

export interface Advisory {
    findings: [
        {
            version: string;
            paths: string[];
        },
    ];
    id: number;
    created: string;
    updated: string;
    deleted: null;
    title: string;
    found_by: {
        link: string;
        name: string;
    };
    reported_by: {
        link: string;
        name: string;
    };
    module_name: string;
    cves: string[];
    vulnerable_versions: string;
    patched_versions: string;
    overview: string;
    recommendation: string;
    references: string;
    access: string;
    severity: Severity;
    cwe: string;
    metadata: {
        module_type: string;
        exploitability: number;
        affected_components: string;
    };
    url: string;
}
