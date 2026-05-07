// CRA Maturity Assessment Tool - Rendering Functions

// Render Requirements
function renderRequirements() {
    renderPart1Requirements();
    renderPart2Requirements();
}

// Render Part I Requirements
function renderPart1Requirements() {
    const container = document.getElementById('part1Requirements');
    container.innerHTML = '';
    
    RequirementsData.part1.forEach(requirement => {
        const reqData = AppState.currentAssessment.requirements[requirement.id];
        const currentLevel = reqData ? reqData.currentLevel : null;
        
        const card = document.createElement('div');
        card.className = 'requirement-card';
        card.dataset.requirementId = requirement.id;
        card.addEventListener('click', () => openRequirementModal(requirement.id));
        
        const progress = currentLevel !== null ? (currentLevel / 4) * 100 : 0;
        const status = currentLevel === null ? 'not-started' : 
                      currentLevel >= 3 ? 'complete' : 'in-progress';
        
        card.innerHTML = `
            <div class="requirement-header">
                <div class="requirement-title">${requirement.title}</div>
                <div class="requirement-id">${requirement.id}</div>
            </div>
            <div class="requirement-description">${requirement.description}</div>
            <div class="requirement-maturity">
                <span class="maturity-label">Current Maturity Level:</span>
                <select class="maturity-select" data-req-id="${requirement.id}" onchange="updateRequirementLevel('${requirement.id}', this.value)">
                    <option value="">Select Level</option>
                    <option value="0" ${currentLevel === 0 ? 'selected' : ''}>0 - Non-existent</option>
                    <option value="1" ${currentLevel === 1 ? 'selected' : ''}>1 - Initial</option>
                    <option value="2" ${currentLevel === 2 ? 'selected' : ''}>2 - Managed</option>
                    <option value="3" ${currentLevel === 3 ? 'selected' : ''}>3 - Defined</option>
                    <option value="4" ${currentLevel === 4 ? 'selected' : ''}>4 - Optimized</option>
                </select>
            </div>
            <div class="requirement-progress">
                <div class="progress-bar">
                    <div class="progress-fill level-${currentLevel || 0}" style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="requirement-meta">
                <div class="requirement-status">
                    <span class="status-badge status-${status}">
                        ${status === 'not-started' ? 'Not Started' : 
                          status === 'in-progress' ? 'In Progress' : 'Complete'}
                    </span>
                </div>
                <span>${currentLevel !== null ? `Level ${currentLevel}` : 'Not assessed'}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Render Part II Requirements
function renderPart2Requirements() {
    const container = document.getElementById('part2Requirements');
    container.innerHTML = '';
    
    RequirementsData.part2.forEach(requirement => {
        const reqData = AppState.currentAssessment.requirements[requirement.id];
        const currentLevel = reqData ? reqData.currentLevel : null;
        
        const card = document.createElement('div');
        card.className = 'requirement-card';
        card.dataset.requirementId = requirement.id;
        card.addEventListener('click', () => openRequirementModal(requirement.id));
        
        const progress = currentLevel !== null ? (currentLevel / 4) * 100 : 0;
        const status = currentLevel === null ? 'not-started' : 
                      currentLevel >= 3 ? 'complete' : 'in-progress';
        
        card.innerHTML = `
            <div class="requirement-header">
                <div class="requirement-title">${requirement.title}</div>
                <div class="requirement-id">${requirement.id}</div>
            </div>
            <div class="requirement-description">${requirement.description}</div>
            <div class="requirement-maturity">
                <span class="maturity-label">Current Maturity Level:</span>
                <select class="maturity-select" data-req-id="${requirement.id}" onchange="updateRequirementLevel('${requirement.id}', this.value)">
                    <option value="">Select Level</option>
                    <option value="0" ${currentLevel === 0 ? 'selected' : ''}>0 - Non-existent</option>
                    <option value="1" ${currentLevel === 1 ? 'selected' : ''}>1 - Initial</option>
                    <option value="2" ${currentLevel === 2 ? 'selected' : ''}>2 - Managed</option>
                    <option value="3" ${currentLevel === 3 ? 'selected' : ''}>3 - Defined</option>
                    <option value="4" ${currentLevel === 4 ? 'selected' : ''}>4 - Optimized</option>
                </select>
            </div>
            <div class="requirement-progress">
                <div class="progress-bar">
                    <div class="progress-fill level-${currentLevel || 0}" style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="requirement-meta">
                <div class="requirement-status">
                    <span class="status-badge status-${status}">
                        ${status === 'not-started' ? 'Not Started' : 
                          status === 'in-progress' ? 'In Progress' : 'Complete'}
                    </span>
                </div>
                <span>${currentLevel !== null ? `Level ${currentLevel}` : 'Not assessed'}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Update Requirement Level
function updateRequirementLevel(requirementId, level) {
    if (!AppState.currentAssessment) return;
    
    const levelNum = parseInt(level);
    if (isNaN(levelNum)) return;
    
    // Update the requirement
    if (!AppState.currentAssessment.requirements[requirementId]) {
        AppState.currentAssessment.requirements[requirementId] = {
            currentLevel: null,
            targetLevel: null,
            evidence: [],
            gaps: [],
            improvementNotes: '',
            lastUpdated: null
        };
    }
    
    AppState.currentAssessment.requirements[requirementId].currentLevel = levelNum;
    AppState.currentAssessment.requirements[requirementId].lastUpdated = new Date().toISOString();
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    
    saveAssessment();
    updateQuickStats();
    renderRequirements();
    renderSummary();
    renderCharts();
    renderRoadmap();
}

// Update Quick Stats
function updateQuickStats() {
    if (!AppState.currentAssessment) return;
    
    const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
    let assessedCount = 0;
    let totalScore = 0;
    let part1Score = 0;
    let part1Count = 0;
    let part2Score = 0;
    let part2Count = 0;
    
    allRequirements.forEach(req => {
        const reqData = AppState.currentAssessment.requirements[req.id];
        if (reqData && reqData.currentLevel !== null) {
            assessedCount++;
            totalScore += reqData.currentLevel;
            
            if (RequirementsData.part1.some(r => r.id === req.id)) {
                part1Score += reqData.currentLevel;
                part1Count++;
            } else {
                part2Score += reqData.currentLevel;
                part2Count++;
            }
        }
    });
    
    const overallAvg = assessedCount > 0 ? (totalScore / assessedCount).toFixed(2) : 0;
    const part1Avg = part1Count > 0 ? (part1Score / part1Count).toFixed(2) : 0;
    const part2Avg = part2Count > 0 ? (part2Score / part2Count).toFixed(2) : 0;
    
    document.getElementById('overallScore').textContent = assessedCount > 0 ? overallAvg : '-';
    document.getElementById('part1Avg').textContent = part1Count > 0 ? part1Avg : '-';
    document.getElementById('part2Avg').textContent = part2Count > 0 ? part2Avg : '-';
    document.getElementById('assessedCount').textContent = `${assessedCount}/${allRequirements.length}`;
}

// Render Summary
function renderSummary() {
    if (!AppState.currentAssessment) return;
    
    const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
    const tbody = document.getElementById('summaryTableBody');
    tbody.innerHTML = '';
    
    let part1Score = 0;
    let part1Count = 0;
    let part2Score = 0;
    let part2Count = 0;
    let totalScore = 0;
    let totalCount = 0;
    
    allRequirements.forEach(req => {
        const reqData = AppState.currentAssessment.requirements[req.id];
        const currentLevel = reqData ? reqData.currentLevel : null;
        const targetLevel = reqData ? reqData.targetLevel : null;
        
        if (currentLevel !== null) {
            totalScore += currentLevel;
            totalCount++;
            
            if (RequirementsData.part1.some(r => r.id === req.id)) {
                part1Score += currentLevel;
                part1Count++;
            } else {
                part2Score += currentLevel;
                part2Count++;
            }
        }
        
        const gap = currentLevel !== null && targetLevel !== null ? targetLevel - currentLevel : 0;
        const priority = getPriorityForRequirement(req.id);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${req.id} - ${req.title}</td>
            <td>${currentLevel !== null ? currentLevel : '-'}</td>
            <td>${targetLevel !== null ? targetLevel : '-'}</td>
            <td>${gap > 0 ? `+${gap}` : gap < 0 ? gap : '0'}</td>
            <td><span class="level-indicator level-${priority}">${getPriorityText(priority)}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    // Update footer
    const part1Avg = part1Count > 0 ? (part1Score / part1Count).toFixed(2) : 0;
    const part2Avg = part2Count > 0 ? (part2Score / part2Count).toFixed(2) : 0;
    const overallAvg = totalCount > 0 ? (totalScore / totalCount).toFixed(2) : 0;
    
    document.getElementById('summaryPart1Avg').textContent = part1Avg;
    document.getElementById('summaryPart2Avg').textContent = part2Avg;
    document.getElementById('summaryOverallAvg').textContent = overallAvg;
}

// Get Priority for Requirement
function getPriorityForRequirement(requirementId) {
    if (!AppState.currentAssessment) return 0;
    
    const reqData = AppState.currentAssessment.requirements[requirementId];
    if (!reqData || reqData.currentLevel === null) return 0;
    
    const currentLevel = reqData.currentLevel;
    const targetLevel = reqData.targetLevel || 4; // Default target to 4 (Optimized)
    const gap = targetLevel - currentLevel;
    
    if (currentLevel <= 1 && gap >= 2) return 0; // Urgent
    if (currentLevel <= 2 && gap >= 1) return 1; // High
    if (currentLevel <= 3) return 2; // Medium
    return 4; // Low
}

// Get Priority Text
function getPriorityText(priority) {
    const priorities = ['Urgent', 'High', 'Medium', 'Low'];
    return priorities[priority] || 'Unknown';
}

// Render Charts
function renderCharts() {
    if (!AppState.currentAssessment) return;
    
    const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
    
    // Maturity Profile Chart
    const part1Levels = [0, 0, 0, 0, 0];
    const part2Levels = [0, 0, 0, 0, 0];
    
    allRequirements.forEach(req => {
        const reqData = AppState.currentAssessment.requirements[req.id];
        const currentLevel = reqData ? reqData.currentLevel : null;
        
        if (currentLevel !== null) {
            if (RequirementsData.part1.some(r => r.id === req.id)) {
                part1Levels[currentLevel]++;
            } else {
                part2Levels[currentLevel]++;
            }
        }
    });
    
    const part1Avg = calculateAverage(part1Levels);
    const part2Avg = calculateAverage(part2Levels);
    const overallAvg = (part1Avg + part2Avg) / 2;
    
    // Destroy existing charts
    if (AppState.charts.maturityChart) {
        AppState.charts.maturityChart.destroy();
    }
    if (AppState.charts.distributionChart) {
        AppState.charts.distributionChart.destroy();
    }
    
    // Create Maturity Profile Chart
    const maturityCtx = document.getElementById('maturityChart').getContext('2d');
    AppState.charts.maturityChart = new Chart(maturityCtx, {
        type: 'radar',
        data: {
            labels: ['Part I Requirements', 'Part II Requirements', 'Overall Maturity'],
            datasets: [{
                label: 'Current Maturity Score',
                data: [part1Avg, part2Avg, overallAvg],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 4,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return value === 4 ? 'Optimized' : value === 3 ? 'Defined' : 
                                   value === 2 ? 'Managed' : value === 1 ? 'Initial' : 'Non-existent';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Maturity Profile (0-4 Scale)'
                }
            }
        }
    });
    
    // Create Distribution Chart
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    
    // Count levels across all requirements
    const levelCounts = [0, 0, 0, 0, 0];
    allRequirements.forEach(req => {
        const reqData = AppState.currentAssessment.requirements[req.id];
        const currentLevel = reqData ? reqData.currentLevel : null;
        if (currentLevel !== null) {
            levelCounts[currentLevel]++;
        }
    });
    
    AppState.charts.distributionChart = new Chart(distributionCtx, {
        type: 'bar',
        data: {
            labels: ['Level 0 - Non-existent', 'Level 1 - Initial', 'Level 2 - Managed', 'Level 3 - Defined', 'Level 4 - Optimized'],
            datasets: [{
                label: 'Number of Requirements',
                data: levelCounts,
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(39, 174, 96, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(39, 174, 96, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Maturity Level Distribution'
                }
            }
        }
    });
}

// Calculate Average
function calculateAverage(levels) {
    const total = levels.reduce((sum, count, index) => sum + (count * index), 0);
    const count = levels.reduce((sum, count) => sum + count, 0);
    return count > 0 ? total / count : 0;
}

// Render Roadmap
function renderRoadmap() {
    if (!AppState.currentAssessment) return;
    
    // Render Priority Matrix
    renderPriorityMatrix();
    
    // Render Actions Table
    renderActionsTable();
}

// Render Priority Matrix
function renderPriorityMatrix() {
    if (!AppState.currentAssessment) return;
    
    const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
    
    // Clear existing actions
    document.getElementById('urgentActions').innerHTML = '<li class="empty-message">No urgent actions identified</li>';
    document.getElementById('highActions').innerHTML = '<li class="empty-message">No high priority actions identified</li>';
    document.getElementById('mediumActions').innerHTML = '<li class="empty-message">No medium priority actions identified</li>';
    document.getElementById('lowActions').innerHTML = '<li class="empty-message">No low priority actions identified</li>';
    
    // Check if we have actions defined
    if (AppState.currentAssessment.actions && AppState.currentAssessment.actions.length > 0) {
        AppState.currentAssessment.actions.forEach(action => {
            const req = allRequirements.find(r => r.id === action.requirementId);
            if (!req) return;
            
            const listId = `${action.priority}Actions`;
            const list = document.getElementById(listId);
            
            if (list) {
                // Check if we need to remove empty message
                if (list.innerHTML.includes('empty-message')) {
                    list.innerHTML = '';
                }
                
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${req.id}: ${req.title}</strong><br>
                    <small>Current: ${action.currentLevel} → Target: ${action.targetLevel}</small><br>
                    <small>${action.description}</small>
                `;
                list.appendChild(li);
            }
        });
    } else {
        // Auto-generate actions based on requirements
        allRequirements.forEach(req => {
            const reqData = AppState.currentAssessment.requirements[req.id];
            if (!reqData || reqData.currentLevel === null) return;
            
            const priority = getPriorityForRequirement(req.id);
            const listId = getPriorityListId(priority);
            const list = document.getElementById(listId);
            
            if (list) {
                // Check if we need to remove empty message
                if (list.innerHTML.includes('empty-message')) {
                    list.innerHTML = '';
                }
                
                const li = document.createElement('li');
                const gap = (reqData.targetLevel || 4) - reqData.currentLevel;
                li.innerHTML = `
                    <strong>${req.id}: ${req.title}</strong><br>
                    <small>Current: ${reqData.currentLevel} → Target: ${reqData.targetLevel || 4}</small><br>
                    <small>Improve maturity by ${gap} levels</small>
                `;
                list.appendChild(li);
            }
        });
    }
}

// Get Priority List ID
function getPriorityListId(priority) {
    const priorityMap = {
        0: 'urgentActions',
        1: 'highActions',
        2: 'mediumActions',
        3: 'mediumActions',
        4: 'lowActions'
    };
    return priorityMap[priority] || 'mediumActions';
}

// Render Actions Table
function renderActionsTable() {
    if (!AppState.currentAssessment) return;
    
    const tbody = document.getElementById('actionsTableBody');
    tbody.innerHTML = '';
    
    if (!AppState.currentAssessment.actions || AppState.currentAssessment.actions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-message">No actions defined yet</td></tr>';
        return;
    }
    
    AppState.currentAssessment.actions.forEach((action, index) => {
        const req = findRequirementById(action.requirementId);
        if (!req) return;
        
        // Get the requirement data from assessment to show inherited levels
        const reqData = AppState.currentAssessment.requirements[action.requirementId];
        const inheritedCurrentLevel = reqData ? reqData.currentLevel : null;
        const inheritedTargetLevel = reqData ? reqData.targetLevel : null;
        
        // Use action levels if set, otherwise show inherited from assessment
        const displayCurrentLevel = action.currentLevel !== null && action.currentLevel !== undefined 
            ? action.currentLevel 
            : (inheritedCurrentLevel !== null ? inheritedCurrentLevel : 'N/A');
        const displayTargetLevel = action.targetLevel !== null && action.targetLevel !== undefined 
            ? action.targetLevel 
            : (inheritedTargetLevel !== null ? inheritedTargetLevel : 'N/A');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="level-indicator level-${getPriorityValue(action.priority)}">${action.priority}</span></td>
            <td>${req.id} - ${req.title}</td>
            <td>${displayCurrentLevel}</td>
            <td>${displayTargetLevel}</td>
            <td>${action.description}</td>
            <td>${action.timeline || '-'}</td>
            <td>
                <button class="btn btn-small btn-primary" onclick="editAction('${action.id}')">Edit</button>
                <button class="btn btn-small btn-danger" onclick="confirmDeleteAction('${action.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get Priority Value
function getPriorityValue(priority) {
    const priorityMap = {
        'urgent': 0,
        'high': 1,
        'medium': 2,
        'low': 3
    };
    return priorityMap[priority] || 2;
}


// Render History
function renderHistory() {
    if (!AppState.assessments || AppState.assessments.length === 0) {
        document.getElementById('historyTableBody').innerHTML = 
            '<tr><td colspan="6" class="empty-message">No previous assessments found</td></tr>';
        return;
    }
    
    const tbody = document.getElementById('historyTableBody');
    tbody.innerHTML = '';
    
    // Sort by date (newest first)
    const sortedAssessments = [...AppState.assessments].sort((a, b) => 
        new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );
    
    sortedAssessments.forEach((assessment, index) => {
        const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
        let totalScore = 0;
        let totalCount = 0;
        
        allRequirements.forEach(req => {
            const reqData = assessment.requirements[req.id];
            if (reqData && reqData.currentLevel !== null) {
                totalScore += reqData.currentLevel;
                totalCount++;
            }
        });
        
        const avgScore = totalCount > 0 ? (totalScore / totalCount).toFixed(2) : 0;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${assessment.assessmentDate || new Date(assessment.createdAt).toLocaleDateString()}</td>
            <td>${assessment.productName || 'Untitled'}</td>
            <td>${assessment.assessorName || '-'}</td>
            <td>${avgScore}</td>
            <td>${assessment.assessmentNotes ? assessment.assessmentNotes.substring(0, 50) + '...' : '-'}</td>
            <td>
                <button class="btn btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-right: 0.25rem;"
                        onclick="loadAssessment('${assessment.id}')">Load</button>
                <button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"
                        onclick="confirmDeleteAssessment('${assessment.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Update load modal select
    const select = document.getElementById('loadAssessmentSelect');
    select.innerHTML = '<option value="">Select an assessment</option>';
    sortedAssessments.forEach(assessment => {
        const option = document.createElement('option');
        option.value = assessment.id;
        option.textContent = `${assessment.assessmentDate || new Date(assessment.createdAt).toLocaleDateString()} - ${assessment.productName || 'Untitled'}`;
        select.appendChild(option);
    });
}
