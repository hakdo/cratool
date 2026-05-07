# CRA Maturity Assessment Tool

A comprehensive web-based tool for assessing Cyber Resilience Act (CRA) compliance against Annex I requirements. This pure frontend application uses localStorage for data persistence and supports JSON export.

## Features

### Assessment Capabilities
- **15 CRA Requirements**: Covers all Part I (Product Properties) and Part II (Process Requirements) from Annex I
- **5-Level Maturity Model**: Assess from Level 0 (Non-existent) to Level 4 (Optimized)
- **Detailed Criteria**: Each requirement includes specific assessment criteria for each maturity level
- **Evidence Tracking**: Document evidence supporting your maturity ratings
- **Gap Analysis**: Identify and track gaps for each requirement
- **Improvement Notes**: Add detailed notes for each requirement

### Analysis & Reporting
- **Maturity Score Calculation**: Automatic calculation of overall, Part I, and Part II averages
- **Visualizations**: Radar chart for maturity profile and bar chart for level distribution
- **Priority Matrix**: Auto-generated improvement roadmap based on current vs. target levels
- **Action Planning**: Create and track improvement actions with priorities, owners, and timelines
- **Assessment History**: Track and manage multiple assessments over time

### Data Management
- **Local Storage**: All data is automatically saved to browser localStorage
- **JSON Export**: Export assessments as formatted JSON files
- **Import/Export**: Load previous assessments or import from external files
- **Multiple Assessments**: Manage and switch between different product assessments

## Quick Start

1. **Open the Application**: Simply open `index.html` in any modern web browser
2. **Create Assessment**: Click "New Assessment" to start a fresh assessment
3. **Enter Product Info**: Fill in product name, assessment date, and assessor details
4. **Assess Requirements**: Navigate to Part I and Part II sections to assess each requirement
5. **Save Progress**: Data auto-saves to localStorage, or click "Save Assessment"
6. **Export Results**: Use the JSON export button to save your assessment

## Assessment Workflow

### 1. Prepare
- Gather relevant documentation for each product
- Identify subject matter experts for each requirement area
- Allocate 2-4 hours for initial assessment
- Use the built-in scoring guide for consistency

### 2. Assess
- Review each requirement and its assessment criteria
- Select the maturity level that best describes your current state
- Document evidence that supports your rating
- Identify gaps and improvement opportunities

### 3. Analyze
- Review maturity scores across all requirements in the Summary section
- Identify patterns and priority areas using the visualizations
- Calculate overall maturity score
- Generate improvement roadmap automatically

### 4. Validate
- Conduct peer review of assessments
- Validate with evidence review
- Obtain stakeholder sign-off
- Finalize assessment results

## Maturity Levels

| Level | Name | Description | Characteristics |
|-------|------|-------------|----------------|
| 0 | **Non-existent** | No awareness or implementation | No processes, no documentation, no controls |
| 1 | **Initial** | Ad-hoc implementation | Informal processes, limited documentation, reactive |
| 2 | **Managed** | Basic processes in place | Some documentation, repeatable but not standardized |
| 3 | **Defined** | Formal, standardized processes | Documented procedures, proactive, measured |
| 4 | **Optimized** | Continuous improvement | Automated, best practices, continuously improving |

## Requirements Covered

### Part I: Product Properties Assessment
- **I.1**: Risk-Based Design and Development
- **I.2(a)**: No Known Exploitable Vulnerabilities
- **I.2(b)**: Secure by Default Configuration
- **I.2(c)**: Vulnerability Remediation Through Updates
- **I.2(d)**: Protection from Unauthorised Access
- **I.2(e)**: Confidentiality Protection
- **I.2(f)**: Integrity Protection

### Part II: Process Requirements Assessment
- **II.1**: Software Bill of Materials (SBOM)
- **II.2**: Vulnerability Handling Processes
- **II.3**: Cybersecurity Risk Documentation
- **II.4**: Security Update Management
- **II.5**: Incident and Vulnerability Reporting
- **II.6**: Security Update Availability
- **II.7**: Technical Documentation
- **II.8**: Conformity Assessment

## Scoring Guide

### General Principles
1. **Evidence-Based**: Ratings must be supported by documented evidence
2. **Consistent**: Use same criteria across all assessments
3. **Honest**: Rate actual state, not aspirational state
4. **Defensible**: Be prepared to justify ratings to auditors

### Level-Specific Criteria
Each requirement includes detailed criteria for each maturity level to ensure consistent and objective assessment.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with localStorage support

## Data Storage

- All assessment data is stored in your browser's localStorage
- Data persists between sessions
- Export regularly for backup and sharing
- Clear browser data will delete all assessments

## File Formats

### JSON Export
```json
{
  "productName": "Your Product",
  "assessmentDate": "2026-05-07",
  "assessorName": "Your Name",
  "requirements": {
    "I.1": {
      "currentLevel": 2,
      "targetLevel": 4,
      "evidence": ["Risk assessment report"],
      "gaps": ["No formal process"],
      "improvementNotes": "Implement formal risk assessment process"
    }
  }
}
```

## Security Notes

- All data is stored locally in your browser
- No data is transmitted to external servers
- Export files contain sensitive assessment data - handle with care
- Consider encrypting export files for additional security

## Version History

- **v1.0** (May 7, 2026): Initial release with complete CRA Annex I assessment capabilities

## License

This tool is provided as-is for Cyber Resilience Act compliance assessment purposes.

## Support

For issues or questions, refer to the CRA documentation or consult with cybersecurity compliance experts.

---

*This assessment tool should be reviewed and updated quarterly or whenever significant changes occur to products or processes.*