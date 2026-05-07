// CRA Maturity Assessment Tool - Export/Import Functions

// Export to JSON
function exportToJson() {
    if (!AppState.currentAssessment) {
        alert('No assessment to export. Please create or load an assessment first.');
        return;
    }
    
    const dataStr = JSON.stringify(AppState.currentAssessment, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `cra_assessment_${AppState.currentAssessment.productName || 'untitled'}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Import from JSON File
function importFromFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            let assessmentData;
            
            // Parse as JSON
            try {
                assessmentData = JSON.parse(content);
            } catch (e) {
                alert('Invalid file format. Please upload a valid JSON file.');
                return;
            }
            
            // Validate that it's an assessment object
            if (!assessmentData || typeof assessmentData !== 'object') {
                alert('Invalid assessment data. Please upload a valid assessment JSON file.');
                return;
            }
            
            // Create new assessment from imported data
            const newAssessment = {
                id: generateId(),
                productName: assessmentData.productName || '',
                assessmentDate: assessmentData.assessmentDate || new Date().toISOString().split('T')[0],
                assessorName: assessmentData.assessorName || '',
                assessmentNotes: assessmentData.assessmentNotes || '',
                requirements: {},
                actions: assessmentData.actions || [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            // Import requirements
            for (const [reqId, reqData] of Object.entries(assessmentData.requirements || {})) {
                newAssessment.requirements[reqId] = {
                    currentLevel: reqData.currentLevel || null,
                    targetLevel: reqData.targetLevel || null,
                    evidence: reqData.evidence || [],
                    gaps: reqData.gaps || [],
                    improvementNotes: reqData.improvementNotes || '',
                    lastUpdated: reqData.lastUpdated || null
                };
            }
            
            // Ensure all requirements exist
            const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
            allRequirements.forEach(req => {
                if (!newAssessment.requirements[req.id]) {
                    newAssessment.requirements[req.id] = {
                        currentLevel: null,
                        targetLevel: null,
                        evidence: [],
                        gaps: [],
                        improvementNotes: '',
                        lastUpdated: null
                    };
                }
            });
            
            // Set as current assessment
            AppState.currentAssessment = newAssessment;
            AppState.assessments.unshift(newAssessment);
            localStorage.setItem('craAssessments', JSON.stringify(AppState.assessments));
            
            // Refresh UI
            populateAssessmentInfo();
            renderRequirements();
            updateQuickStats();
            renderSummary();
            renderCharts();
            renderRoadmap();
            renderHistory();
            
            alert('Assessment imported successfully!');
            
        } catch (e) {
            console.error('Error importing file:', e);
            alert('Error importing file. Please check the format and try again.');
        }
    };
    
    reader.readAsText(file);
}

// Set up file input for import
function setupFileImport() {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            importFromFile(e.target.files[0]);
        }
        // Reset the input so the same file can be selected again
        e.target.value = '';
    });
}

// Call setupFileImport when DOM is loaded
document.addEventListener('DOMContentLoaded', setupFileImport);
