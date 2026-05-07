// CRA Maturity Assessment Tool - Main Application

// Application State
const AppState = {
    currentAssessment: null,
    assessments: [],
    currentSection: 'overview',
    charts: {},
    editingAction: null
};

// Initialize Application
function initApp() {
    loadAssessments();
    setupEventListeners();
    renderRequirements();
    populateActionRequirementSelect();
    updateQuickStats();
    renderSummary();
    renderCharts();
    renderHistory();
    
    // Set default assessment date if not set
    if (!document.getElementById('assessmentDate').value) {
        document.getElementById('assessmentDate').value = new Date().toISOString().split('T')[0];
    }
}

// Load Assessments from localStorage
function loadAssessments() {
    const savedAssessments = localStorage.getItem('craAssessments');
    if (savedAssessments) {
        try {
            AppState.assessments = JSON.parse(savedAssessments);
            // Load the most recent assessment or create a new one
            if (AppState.assessments.length > 0) {
                AppState.currentAssessment = AppState.assessments[0];
                populateAssessmentInfo();
            } else {
                createNewAssessment();
            }
        } catch (e) {
            console.error('Error loading assessments:', e);
            createNewAssessment();
        }
    } else {
        createNewAssessment();
    }
}

// Create New Assessment
function createNewAssessment() {
    AppState.currentAssessment = {
        id: generateId(),
        productName: '',
        assessmentDate: new Date().toISOString().split('T')[0],
        assessorName: '',
        assessmentNotes: '',
        requirements: {},
        actions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Initialize all requirements with default values
    RequirementsData.part1.forEach(req => {
        AppState.currentAssessment.requirements[req.id] = {
            currentLevel: null,
            targetLevel: null,
            evidence: [],
            gaps: [],
            improvementNotes: '',
            lastUpdated: null
        };
    });
    
    RequirementsData.part2.forEach(req => {
        AppState.currentAssessment.requirements[req.id] = {
            currentLevel: null,
            targetLevel: null,
            evidence: [],
            gaps: [],
            improvementNotes: '',
            lastUpdated: null
        };
    });
    
    saveAssessment();
    populateAssessmentInfo();
}

// Generate Unique ID
function generateId() {
    return 'assessment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Populate Assessment Info Form
function populateAssessmentInfo() {
    if (!AppState.currentAssessment) return;
    
    document.getElementById('productName').value = AppState.currentAssessment.productName || '';
    document.getElementById('assessmentDate').value = AppState.currentAssessment.assessmentDate || '';
    document.getElementById('assessorName').value = AppState.currentAssessment.assessorName || '';
    document.getElementById('assessmentNotes').value = AppState.currentAssessment.assessmentNotes || '';
}

// Save Assessment Info
function saveAssessmentInfo() {
    if (!AppState.currentAssessment) return;
    
    AppState.currentAssessment.productName = document.getElementById('productName').value;
    AppState.currentAssessment.assessmentDate = document.getElementById('assessmentDate').value;
    AppState.currentAssessment.assessorName = document.getElementById('assessorName').value;
    AppState.currentAssessment.assessmentNotes = document.getElementById('assessmentNotes').value;
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    
    saveAssessment();
    updateQuickStats();
    renderSummary();
    renderCharts();
}

// Save Assessment to localStorage
function saveAssessment() {
    if (!AppState.currentAssessment) return;
    
    // Update or add to assessments list
    const index = AppState.assessments.findIndex(a => a.id === AppState.currentAssessment.id);
    if (index >= 0) {
        AppState.assessments[index] = AppState.currentAssessment;
    } else {
        AppState.assessments.unshift(AppState.currentAssessment);
    }
    
    // Save to localStorage
    localStorage.setItem('craAssessments', JSON.stringify(AppState.assessments));
    
    // Update history
    renderHistory();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchSection(tab.dataset.section));
    });
    
    // Assessment Info Form
    document.getElementById('assessmentInfoForm').addEventListener('input', debounce(saveAssessmentInfo, 500));
    
    // Header Buttons
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveAssessmentInfo();
        alert('Assessment saved successfully!');
    });
    
    document.getElementById('exportJsonBtn').addEventListener('click', exportToJson);
    document.getElementById('exportYamlBtn').addEventListener('click', exportToYaml);
    document.getElementById('loadBtn').addEventListener('click', showLoadModal);
    document.getElementById('newBtn').addEventListener('click', confirmNewAssessment);
    
    // Modal Close Buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Load Modal
    document.getElementById('loadSelectedBtn').addEventListener('click', loadSelectedAssessment);
    
    // Action Form
    document.getElementById('addActionBtn').addEventListener('click', showActionForm);
    document.getElementById('actionForm').addEventListener('submit', saveAction);
    document.getElementById('cancelActionBtn').addEventListener('click', hideActionForm);
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAllModals();
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });
}

// Switch Section
function switchSection(sectionId) {
    AppState.currentSection = sectionId;
    
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.section === sectionId);
    });
    
    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
    
    // Refresh content if needed
    if (sectionId === 'summary') {
        renderSummary();
        renderCharts();
    } else if (sectionId === 'roadmap') {
        renderRoadmap();
    } else if (sectionId === 'history') {
        renderHistory();
    }
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
