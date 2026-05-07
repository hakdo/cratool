// CRA Maturity Assessment Tool - Data Definitions

const RequirementsData = {
    part1: [
        {
            id: 'I.1',
            title: 'Risk-Based Design and Development',
            description: 'Products with digital elements shall be designed, developed and produced in such a way that they ensure an appropriate level of cybersecurity based on the risks.',
            criteria: [
                { name: 'Risk Assessment Process', levels: ['No process', 'Ad-hoc assessments', 'Basic process for some products', 'Formal process for all products', 'Continuous, comprehensive assessments'] },
                { name: 'Risk Incorporation', levels: ['Not considered', 'Sometimes considered', 'Usually considered', 'Always considered', 'Optimized based on risk data'] },
                { name: 'Risk Criteria', levels: ['None defined', 'Informal criteria', 'Basic criteria defined', 'Comprehensive criteria', 'Industry-benchmarked criteria'] },
                { name: 'Risk Documentation', levels: ['No documentation', 'Minimal documentation', 'Some documentation', 'Complete documentation', 'Automated, linked documentation'] },
                { name: 'Risk Reassessment', levels: ['Never done', 'Reactive', 'Periodic', 'Trigger-based', 'Continuous monitoring'] }
            ],
            evidence: ['Risk assessment methodology', 'Risk assessment reports', 'Design documents showing risk incorporation', 'Risk acceptance criteria', 'Reassessment records'],
            gaps: ['No formal risk assessment process', 'Risks not consistently incorporated into design', 'Risk criteria not defined', 'Risk documentation incomplete', 'No risk reassessment process']
        },
        {
            id: 'I.2(a)',
            title: 'No Known Exploitable Vulnerabilities',
            description: 'Products shall be made available on the market without known exploitable vulnerabilities.',
            criteria: [
                { name: 'Vulnerability Scanning', levels: ['No scanning', 'Ad-hoc scanning', 'Basic scanning', 'Comprehensive scanning', 'Automated, continuous scanning'] },
                { name: 'CVE Monitoring', levels: ['No monitoring', 'Reactive monitoring', 'Basic monitoring', 'Comprehensive monitoring', 'Proactive, automated monitoring'] },
                { name: 'Vulnerability Remediation', levels: ['No process', 'Ad-hoc remediation', 'Basic remediation process', 'Formal remediation process', 'Automated remediation where possible'] },
                { name: 'Pre-Release Testing', levels: ['No testing', 'Minimal testing', 'Basic testing', 'Comprehensive testing', 'Automated, continuous testing'] },
                { name: 'Component Tracking', levels: ['No tracking', 'Informal tracking', 'Basic tracking', 'Comprehensive tracking', 'Automated SBOM-based tracking'] }
            ],
            evidence: ['Vulnerability scan reports', 'CVE monitoring process', 'Remediation tracking', 'Pre-release test reports', 'Component inventory'],
            gaps: ['No vulnerability scanning process', 'No CVE monitoring', 'No vulnerability remediation process', 'No pre-release security testing', 'No component tracking']
        },
        {
            id: 'I.2(b)',
            title: 'Secure by Default Configuration',
            description: 'Products shall be made available on the market with a secure by default configuration, unless otherwise agreed with business users for tailor-made products, including the possibility to reset the product to its original state.',
            criteria: [
                { name: 'Default Settings', levels: ['Insecure defaults', 'Some secure defaults', 'Mostly secure defaults', 'All secure defaults', 'Optimized secure defaults'] },
                { name: 'Default Credentials', levels: ['Hardcoded/weak', 'Some default credentials', 'Unique default credentials', 'No default credentials', 'Multi-factor by default'] },
                { name: 'Unnecessary Services', levels: ['All services enabled', 'Some disabled', 'Most disabled', 'All unnecessary disabled', 'Minimal attack surface'] },
                { name: 'Reset Capability', levels: ['No reset', 'Manual reset', 'Basic reset', 'Secure reset', 'Factory reset with security'] },
                { name: 'Configuration Documentation', levels: ['No documentation', 'Minimal documentation', 'Basic documentation', 'Complete documentation', 'Automated configuration guides'] }
            ],
            evidence: ['Default configuration documentation', 'Security hardening guides', 'Reset procedure documentation', 'Configuration management records'],
            gaps: ['Products shipped with insecure defaults', 'Default credentials used', 'Unnecessary services enabled', 'No secure reset capability', 'No configuration documentation']
        },
        {
            id: 'I.2(c)',
            title: 'Vulnerability Remediation Through Updates',
            description: 'Ensure that vulnerabilities can be addressed through security updates, including, where applicable, through automatic security updates that are installed within an appropriate timeframe enabled as a default setting, with a clear and easy-to-use opt-out mechanism.',
            criteria: [
                { name: 'Update Mechanism', levels: ['No mechanism', 'Manual updates', 'Basic update mechanism', 'Robust update mechanism', 'Automated, reliable mechanism'] },
                { name: 'Automatic Updates', levels: ['Not available', 'Available but disabled', 'Available, opt-in', 'Enabled by default', 'Enabled with smart scheduling'] },
                { name: 'Opt-Out Mechanism', levels: ['No opt-out', 'Difficult opt-out', 'Basic opt-out', 'Clear, easy opt-out', 'User-friendly opt-out'] },
                { name: 'Update Notifications', levels: ['No notifications', 'Ad-hoc notifications', 'Basic notifications', 'Clear notifications', 'Multi-channel notifications'] },
                { name: 'Postpone Option', levels: ['No option', 'Limited option', 'Basic postpone', 'Configurable postpone', 'Intelligent postpone'] },
                { name: 'Update Timeframe', levels: ['No SLA', 'Unpredictable', 'Basic SLA', 'Defined SLA', 'Optimized SLA'] }
            ],
            evidence: ['Update mechanism documentation', 'Update policy', 'Automatic update configuration', 'User notification samples', 'Update delivery logs'],
            gaps: ['No security update mechanism', 'No automatic updates', 'No opt-out mechanism', 'No update notifications', 'No postpone option', 'No defined update timeframes']
        },
        {
            id: 'I.2(d)',
            title: 'Protection from Unauthorised Access',
            description: 'Ensure protection from unauthorised access by appropriate control mechanisms, including but not limited to authentication, identity or access management systems, and report on possible unauthorised access.',
            criteria: [
                { name: 'Authentication', levels: ['No authentication', 'Basic authentication', 'Standard authentication', 'Strong authentication', 'Multi-factor authentication'] },
                { name: 'Access Control', levels: ['No controls', 'Informal controls', 'Basic controls', 'Role-based controls', 'Attribute-based controls'] },
                { name: 'Identity Management', levels: ['No management', 'Ad-hoc management', 'Basic management', 'Centralized management', 'Federated identity management'] },
                { name: 'Access Monitoring', levels: ['No monitoring', 'Reactive monitoring', 'Basic monitoring', 'Comprehensive monitoring', 'Automated, real-time monitoring'] },
                { name: 'Incident Reporting', levels: ['No reporting', 'Ad-hoc reporting', 'Basic reporting', 'Formal reporting', 'Automated reporting'] }
            ],
            evidence: ['Authentication architecture', 'Access control policies', 'Identity management documentation', 'Security logs', 'Incident reports'],
            gaps: ['No authentication mechanisms', 'No access control policies', 'No identity management', 'No access monitoring', 'No incident reporting']
        },
        {
            id: 'I.2(e)',
            title: 'Confidentiality Protection',
            description: 'Protect the confidentiality of stored, transmitted or otherwise processed data, personal or other, such as by encrypting relevant data at rest or in transit by state of the art mechanisms, and by using other technical means.',
            criteria: [
                { name: 'Encryption at Rest', levels: ['No encryption', 'Partial encryption', 'Basic encryption', 'Comprehensive encryption', 'State-of-the-art encryption'] },
                { name: 'Encryption in Transit', levels: ['No encryption', 'Partial encryption', 'Basic encryption', 'Comprehensive encryption', 'State-of-the-art encryption'] },
                { name: 'Key Management', levels: ['No key management', 'Ad-hoc management', 'Basic management', 'Formal management', 'Automated, HSM-based management'] },
                { name: 'Data Classification', levels: ['No classification', 'Informal classification', 'Basic classification', 'Formal classification', 'Automated classification'] },
                { name: 'Access to Encrypted Data', levels: ['No controls', 'Basic controls', 'Standard controls', 'Strict controls', 'Zero-trust controls'] }
            ],
            evidence: ['Encryption standards documentation', 'Key management policy', 'Data classification scheme', 'Access control policies for encrypted data'],
            gaps: ['No data encryption at rest', 'No data encryption in transit', 'No key management process', 'No data classification', 'Weak access controls for encrypted data']
        },
        {
            id: 'I.2(f)',
            title: 'Integrity Protection',
            description: 'Protect the integrity of stored, transmitted or otherwise processed data, personal or other, commands, programs and configuration against any manipulation or modification not authorised by the user, and report on corruptions.',
            criteria: [
                { name: 'Data Integrity', levels: ['No protection', 'Basic checks', 'Standard checks', 'Comprehensive checks', 'Cryptographic verification'] },
                { name: 'Command Integrity', levels: ['No protection', 'Basic validation', 'Standard validation', 'Comprehensive validation', 'Digital signatures'] },
                { name: 'Program Integrity', levels: ['No protection', 'Basic checks', 'Code signing', 'Comprehensive verification', 'Hardware-based verification'] },
                { name: 'Configuration Integrity', levels: ['No protection', 'Basic controls', 'Change management', 'Comprehensive controls', 'Immutable infrastructure'] },
                { name: 'Corruption Detection', levels: ['No detection', 'Reactive detection', 'Basic detection', 'Comprehensive detection', 'Real-time detection'] },
                { name: 'Corruption Reporting', levels: ['No reporting', 'Ad-hoc reporting', 'Basic reporting', 'Formal reporting', 'Automated reporting'] }
            ],
            evidence: ['Integrity protection mechanisms', 'Code signing process', 'Configuration management', 'Corruption detection logs', 'Corruption reports'],
            gaps: ['No data integrity protection', 'No command integrity validation', 'No program integrity protection', 'No configuration integrity controls', 'No corruption detection', 'No corruption reporting']
        }
    ],
    
    part2: [
        {
            id: 'II.1',
            title: 'Software Bill of Materials (SBOM)',
            description: 'Provide information on all components of the product with digital elements, including open-source components, to enable the identification of vulnerabilities and the effective addressing of those vulnerabilities.',
            criteria: [
                { name: 'SBOM Generation', levels: ['No SBOM', 'Ad-hoc SBOM', 'Basic SBOM', 'Comprehensive SBOM', 'Automated SBOM'] },
                { name: 'Component Coverage', levels: ['No coverage', 'Partial coverage', 'Most components', 'All components', 'All components + dependencies'] },
                { name: 'Update Frequency', levels: ['Never updated', 'Ad-hoc updates', 'Periodic updates', 'Trigger-based updates', 'Continuous updates'] },
                { name: 'Machine-Readable', levels: ['No', 'No', 'Basic format', 'Standard format (SPDX, CycloneDX)', 'Multiple standard formats'] },
                { name: 'Accessibility', levels: ['Not available', 'Available on request', 'Internally available', 'Publicly available', 'Automated access'] }
            ],
            evidence: ['SBOM samples', 'SBOM generation process', 'Component inventory', 'Update records'],
            gaps: ['No SBOM generation process', 'Incomplete component coverage', 'Infrequent updates', 'Not machine-readable', 'Not accessible']
        },
        {
            id: 'II.2',
            title: 'Vulnerability Handling Processes',
            description: 'Have appropriate policies and procedures, including coordinated vulnerability disclosure policies, to process and remediate potential vulnerabilities in the product with digital elements reported from internal or external sources.',
            criteria: [
                { name: 'Vulnerability Policy', levels: ['No policy', 'Informal policy', 'Basic policy', 'Comprehensive policy', 'Industry-leading policy'] },
                { name: 'CVD Policy', levels: ['No CVD', 'Informal CVD', 'Basic CVD', 'Formal CVD', 'ISO 29147 compliant CVD'] },
                { name: 'Vulnerability Intake', levels: ['No process', 'Ad-hoc intake', 'Basic intake', 'Formal intake', 'Automated intake'] },
                { name: 'Triage Process', levels: ['No triage', 'Informal triage', 'Basic triage', 'Formal triage', 'Risk-based triage'] },
                { name: 'Remediation Process', levels: ['No process', 'Ad-hoc', 'Basic process', 'Formal process', 'Automated where possible'] },
                { name: 'Disclosure Process', levels: ['No disclosure', 'Ad-hoc disclosure', 'Basic disclosure', 'Coordinated disclosure', 'Responsible disclosure'] }
            ],
            evidence: ['Vulnerability handling policy', 'CVD policy', 'Vulnerability intake records', 'Triage documentation', 'Remediation tracking', 'Disclosure records'],
            gaps: ['No vulnerability handling policy', 'No CVD policy', 'No vulnerability intake process', 'No triage process', 'No remediation process', 'No disclosure process']
        },
        {
            id: 'II.3',
            title: 'Cybersecurity Risk Documentation',
            description: 'Systematically document, in a manner that is proportionate to the nature and the cybersecurity risks, relevant cybersecurity aspects concerning the products with digital elements.',
            criteria: [
                { name: 'Documentation Process', levels: ['No process', 'Ad-hoc documentation', 'Basic process', 'Formal process', 'Automated documentation'] },
                { name: 'Cybersecurity Aspects', levels: ['Not documented', 'Some aspects', 'Most aspects', 'All aspects', 'Comprehensive, detailed'] },
                { name: 'Vulnerability Tracking', levels: ['No tracking', 'Informal tracking', 'Basic tracking', 'Comprehensive tracking', 'Automated tracking'] },
                { name: 'Third-Party Information', levels: ['Not incorporated', 'Ad-hoc incorporation', 'Basic incorporation', 'Formal incorporation', 'Systematic incorporation'] },
                { name: 'Risk Assessment Updates', levels: ['Never updated', 'Ad-hoc updates', 'Periodic updates', 'Trigger-based updates', 'Continuous updates'] }
            ],
            evidence: ['Documentation process', 'Cybersecurity aspect documentation', 'Vulnerability tracking system', 'Third-party information incorporation', 'Risk assessment update records'],
            gaps: ['No documentation process', 'Cybersecurity aspects not documented', 'No vulnerability tracking', 'Third-party information not incorporated', 'Risk assessments not updated']
        },
        {
            id: 'II.4',
            title: 'Security Update Management',
            description: 'Manufacturers shall ensure, when placing a product with digital elements on the market, and for the support period, that vulnerabilities of that product, including its components, are handled effectively.',
            criteria: [
                { name: 'Support Period Definition', levels: ['No definition', 'Informal definition', 'Basic definition', 'Formal definition', 'Optimized definition'] },
                { name: 'Update Delivery', levels: ['No updates', 'Ad-hoc updates', 'Basic updates', 'Regular updates', 'Automated updates'] },
                { name: 'Update Testing', levels: ['No testing', 'Minimal testing', 'Basic testing', 'Comprehensive testing', 'Automated testing'] },
                { name: 'User Notification', levels: ['No notification', 'Ad-hoc notification', 'Basic notification', 'Clear notification', 'Multi-channel notification'] },
                { name: 'Update Archive', levels: ['No archive', 'Partial archive', 'Basic archive', 'Complete archive', 'Automated archive'] }
            ],
            evidence: ['Support period policy', 'Update delivery process', 'Update testing records', 'User notification samples', 'Update archive'],
            gaps: ['No support period defined', 'No update delivery process', 'No update testing', 'No user notification', 'No update archive']
        },
        {
            id: 'II.5',
            title: 'Incident and Vulnerability Reporting',
            description: 'Manufacturers shall report without undue delay any actively exploited vulnerability contained in the product with digital elements to ENISA.',
            criteria: [
                { name: 'Monitoring', levels: ['No monitoring', 'Ad-hoc monitoring', 'Basic monitoring', 'Comprehensive monitoring', 'Automated monitoring'] },
                { name: 'Detection', levels: ['No detection', 'Reactive detection', 'Basic detection', 'Proactive detection', 'Real-time detection'] },
                { name: 'Reporting Process', levels: ['No process', 'Ad-hoc process', 'Basic process', 'Formal process', 'Automated process'] },
                { name: 'ENISA Reporting', levels: ['No reporting', 'Reactive reporting', 'Basic reporting', 'Timely reporting', 'Proactive reporting'] },
                { name: 'CSIRT Cooperation', levels: ['No cooperation', 'Ad-hoc cooperation', 'Basic cooperation', 'Formal cooperation', 'Strategic partnership'] }
            ],
            evidence: ['Monitoring process', 'Detection capabilities', 'Reporting process documentation', 'ENISA reporting records', 'CSIRT cooperation agreements'],
            gaps: ['No monitoring for exploited vulnerabilities', 'No detection capabilities', 'No reporting process', 'No ENISA reporting', 'No CSIRT cooperation']
        },
        {
            id: 'II.6',
            title: 'Security Update Availability',
            description: 'Manufacturers shall ensure that each security update, which has been made available to users during the support period, remains available after it has been issued for a minimum of 10 years.',
            criteria: [
                { name: 'Update Retention', levels: ['No retention', 'Ad-hoc retention', 'Basic retention', '10-year retention', 'Lifetime retention'] },
                { name: 'Archive Accessibility', levels: ['Not accessible', 'Difficult access', 'Basic access', 'Easy access', 'Automated access'] },
                { name: 'User Information', levels: ['No information', 'Minimal information', 'Basic information', 'Clear information', 'Comprehensive information'] },
                { name: 'Unsupported Software', levels: ['No warnings', 'Informal warnings', 'Basic warnings', 'Clear warnings', 'Automated warnings'] }
            ],
            evidence: ['Update retention policy', 'Update archive', 'User information materials', 'Unsupported software warnings'],
            gaps: ['No update retention policy', 'Update archive not accessible', 'No user information on update availability', 'No warnings for unsupported software']
        },
        {
            id: 'II.7',
            title: 'Technical Documentation',
            description: 'Before placing a product with digital elements on the market, manufacturers shall draw up the technical documentation referred to in Article 31.',
            criteria: [
                { name: 'Documentation Process', levels: ['No process', 'Ad-hoc process', 'Basic process', 'Formal process', 'Automated process'] },
                { name: 'Annex VII Coverage', levels: ['No coverage', 'Partial coverage', 'Most requirements', 'All requirements', 'Comprehensive coverage'] },
                { name: 'Documentation Quality', levels: ['Poor quality', 'Basic quality', 'Good quality', 'High quality', 'Excellent quality'] },
                { name: 'Update Process', levels: ['Never updated', 'Ad-hoc updates', 'Periodic updates', 'Trigger-based updates', 'Continuous updates'] },
                { name: 'Retention', levels: ['No retention', 'Short retention', 'Basic retention', '10-year retention', 'Lifetime retention'] }
            ],
            evidence: ['Documentation process', 'Technical documentation samples', 'Documentation quality reviews', 'Update records', 'Retention policy'],
            gaps: ['No technical documentation process', 'Annex VII requirements not covered', 'Poor documentation quality', 'Documentation not updated', 'No retention policy']
        },
        {
            id: 'II.8',
            title: 'Conformity Assessment',
            description: 'The manufacturer shall perform a conformity assessment of the product with digital elements and the processes put in place by the manufacturer to determine whether the essential cybersecurity requirements set out in Annex I are met.',
            criteria: [
                { name: 'Assessment Process', levels: ['No process', 'Ad-hoc assessment', 'Basic process', 'Formal process', 'Optimized process'] },
                { name: 'Assessment Coverage', levels: ['No coverage', 'Partial coverage', 'Most requirements', 'All requirements', 'Comprehensive coverage'] },
                { name: 'Assessment Methodology', levels: ['No methodology', 'Informal methodology', 'Basic methodology', 'Formal methodology', 'Industry-best methodology'] },
                { name: 'Documentation', levels: ['No documentation', 'Minimal documentation', 'Basic documentation', 'Complete documentation', 'Automated documentation'] },
                { name: 'Record Retention', levels: ['No retention', 'Short retention', 'Basic retention', '10-year retention', 'Lifetime retention'] }
            ],
            evidence: ['Conformity assessment process', 'Assessment reports', 'Methodology documentation', 'Assessment records', 'Retention policy'],
            gaps: ['No conformity assessment process', 'Incomplete assessment coverage', 'No assessment methodology', 'No assessment documentation', 'No record retention']
        }
    ]
};

// Helper function to find requirement by ID
function findRequirementById(id) {
    const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
    return allRequirements.find(req => req.id === id);
}
