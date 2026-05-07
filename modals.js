// CRA Maturity Assessment Tool - Modal Functions

// Open Requirement Modal
function openRequirementModal(requirementId) {
    const requirement = findRequirementById(requirementId);
    if (!requirement) return;
    
    const reqData = AppState.currentAssessment.requirements[requirementId] || {
        currentLevel: null,
        targetLevel: null,
        evidence: [],
        gaps: [],
        improvementNotes: ''
    };
    
    const modal = document.getElementById('requirementModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `${requirement.id}: ${requirement.title}`;
    
    // Build modal content
    let html = `
        <div class="requirement-detail">
            <p><strong>Description:</strong> ${requirement.description}</p>
            
            <div class="form-group">
                <label>Current Maturity Level</label>
                <select id="modalCurrentLevel" class="form-control">
                    <option value="">Select Level</option>
                    <option value="0" ${reqData.currentLevel === 0 ? 'selected' : ''}>0 - Non-existent</option>
                    <option value="1" ${reqData.currentLevel === 1 ? 'selected' : ''}>1 - Initial</option>
                    <option value="2" ${reqData.currentLevel === 2 ? 'selected' : ''}>2 - Managed</option>
                    <option value="3" ${reqData.currentLevel === 3 ? 'selected' : ''}>3 - Defined</option>
                    <option value="4" ${reqData.currentLevel === 4 ? 'selected' : ''}>4 - Optimized</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Target Maturity Level</label>
                <select id="modalTargetLevel" class="form-control">
                    <option value="">Select Level</option>
                    <option value="0" ${reqData.targetLevel === 0 ? 'selected' : ''}>0 - Non-existent</option>
                    <option value="1" ${reqData.targetLevel === 1 ? 'selected' : ''}>1 - Initial</option>
                    <option value="2" ${reqData.targetLevel === 2 ? 'selected' : ''}>2 - Managed</option>
                    <option value="3" ${reqData.targetLevel === 3 ? 'selected' : ''}>3 - Defined</option>
                    <option value="4" ${reqData.targetLevel === 4 ? 'selected' : ''}>4 - Optimized</option>
                </select>
            </div>
            
            <div class="assessment-criteria">
                <h4>Assessment Criteria</h4>
                <table class="criteria-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Level 0</th>
                            <th>Level 1</th>
                            <th>Level 2</th>
                            <th>Level 3</th>
                            <th>Level 4</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    requirement.criteria.forEach(criteria => {
        html += `
                        <tr>
                            <td><strong>${criteria.name}</strong></td>
                            <td>${criteria.levels[0]}</td>
                            <td>${criteria.levels[1]}</td>
                            <td>${criteria.levels[2]}</td>
                            <td>${criteria.levels[3]}</td>
                            <td>${criteria.levels[4]}</td>
                        </tr>
        `;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
            
            <div class="evidence-section">
                <h4>Evidence</h4>
                <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 0.5rem;">
                    Suggested evidence for this requirement:
                </p>
                <ul style="font-size: 0.85rem; color: var(--text-light); padding-left: 1.5rem;">
    `;
    
    requirement.evidence.forEach(evidence => {
        html += `<li>${evidence}</li>`;
    });
    
    html += `
                </ul>
                <p style="margin-top: 1rem;"><strong>Your Evidence:</strong></p>
                <div id="evidenceList">
    `;
    
    reqData.evidence.forEach((evidence, index) => {
        html += `
                    <div class="form-group" style="display: flex; gap: 0.5rem; align-items: center;">
                        <input type="text" class="evidence-input" value="${evidence}" 
                               onchange="updateEvidence('${requirementId}', ${index}, this.value)">
                        <button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"
                                onclick="removeEvidence('${requirementId}', ${index})">Remove</button>
                    </div>
        `;
    });
    
    html += `
                </div>
                <button type="button" class="btn btn-secondary" style="margin-top: 0.5rem;"
                        onclick="addEvidence('${requirementId}')">Add Evidence</button>
            </div>
            
            <div class="gaps-section">
                <h4>Gaps Identified</h4>
                <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 0.5rem;">
                    Common gaps for this requirement:
                </p>
                <ul style="font-size: 0.85rem; color: var(--text-light); padding-left: 1.5rem;">
    `;
    
    requirement.gaps.forEach(gap => {
        html += `<li>${gap}</li>`;
    });
    
    html += `
                </ul>
                <p style="margin-top: 1rem;"><strong>Your Gaps:</strong></p>
                <div id="gapsList">
    `;
    
    reqData.gaps.forEach((gap, index) => {
        html += `
                    <div class="form-group" style="display: flex; gap: 0.5rem; align-items: center;">
                        <input type="text" class="gaps-input" value="${gap}" 
                               onchange="updateGap('${requirementId}', ${index}, this.value)">
                        <button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"
                                onclick="removeGap('${requirementId}', ${index})">Remove</button>
                    </div>
        `;
    });
    
    html += `
                </div>
                <button type="button" class="btn btn-warning" style="margin-top: 0.5rem;"
                        onclick="addGap('${requirementId}')">Add Gap</button>
            </div>
            
            <div class="notes-section">
                <h4>Improvement Notes</h4>
                <textarea id="modalImprovementNotes" class="notes-textarea" 
                          placeholder="Enter improvement notes...">${reqData.improvementNotes || ''}</textarea>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = html;
    modal.classList.add('active');
    
    // Set up modal save button
    document.getElementById('saveModalBtn').onclick = () => saveRequirementModal(requirementId);
}

// Save Requirement Modal
function saveRequirementModal(requirementId) {
    if (!AppState.currentAssessment) return;
    
    const currentLevel = document.getElementById('modalCurrentLevel').value;
    const targetLevel = document.getElementById('modalTargetLevel').value;
    const improvementNotes = document.getElementById('modalImprovementNotes').value;
    
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
    
    const reqData = AppState.currentAssessment.requirements[requirementId];
    reqData.currentLevel = currentLevel ? parseInt(currentLevel) : null;
    reqData.targetLevel = targetLevel ? parseInt(targetLevel) : null;
    reqData.improvementNotes = improvementNotes;
    reqData.lastUpdated = new Date().toISOString();
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    
    saveAssessment();
    closeAllModals();
    renderRequirements();
    updateQuickStats();
    renderSummary();
    renderCharts();
    renderRoadmap();
}

// Add Evidence
function addEvidence(requirementId) {
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
    
    AppState.currentAssessment.requirements[requirementId].evidence.push('');
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    saveAssessment();
    openRequirementModal(requirementId);
}

// Update Evidence
function updateEvidence(requirementId, index, value) {
    if (!AppState.currentAssessment.requirements[requirementId]) return;
    AppState.currentAssessment.requirements[requirementId].evidence[index] = value;
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    saveAssessment();
}

// Remove Evidence
function removeEvidence(requirementId, index) {
    if (!AppState.currentAssessment.requirements[requirementId]) return;
    AppState.currentAssessment.requirements[requirementId].evidence.splice(index, 1);
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    saveAssessment();
    openRequirementModal(requirementId);
}

// Add Gap
function addGap(requirementId) {
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
    
    AppState.currentAssessment.requirements[requirementId].gaps.push('');
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    saveAssessment();
    openRequirementModal(requirementId);
}

// Update Gap
function updateGap(requirementId, index, value) {
    if (!AppState.currentAssessment.requirements[requirementId]) return;
    AppState.currentAssessment.requirements[requirementId].gaps[index] = value;
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    saveAssessment();
}

// Remove Gap
function removeGap(requirementId, index) {
    if (!AppState.currentAssessment.requirements[requirementId]) return;
    AppState.currentAssessment.requirements[requirementId].gaps.splice(index, 1);
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    saveAssessment();
    openRequirementModal(requirementId);
}

// Show Load Modal
function showLoadModal() {
    document.getElementById('loadModal').classList.add('active');
}

// Load Selected Assessment
function loadSelectedAssessment() {
    const select = document.getElementById('loadAssessmentSelect');
    const assessmentId = select.value;
    if (assessmentId) {
        loadAssessment(assessmentId);
    }
    closeAllModals();
}

// Load Assessment
function loadAssessment(assessmentId) {
    const assessment = AppState.assessments.find(a => a.id === assessmentId);
    if (!assessment) return;
    
    AppState.currentAssessment = assessment;
    populateAssessmentInfo();
    renderRequirements();
    updateQuickStats();
    renderSummary();
    renderCharts();
    renderRoadmap();
    renderHistory();
    
    closeAllModals();
    switchSection('overview');
}

// Confirm New Assessment
function confirmNewAssessment() {
    if (confirm('Are you sure you want to create a new assessment? Any unsaved changes will be lost.')) {
        createNewAssessment();
        populateAssessmentInfo();
        renderRequirements();
        updateQuickStats();
        renderSummary();
        renderCharts();
        renderRoadmap();
        renderHistory();
        switchSection('overview');
    }
}

// Confirm Delete Assessment
function confirmDeleteAssessment(assessmentId) {
    if (confirm('Are you sure you want to delete this assessment? This action cannot be undone.')) {
        deleteAssessment(assessmentId);
    }
}

// Delete Assessment
function deleteAssessment(assessmentId) {
    AppState.assessments = AppState.assessments.filter(a => a.id !== assessmentId);
    
    // If we're deleting the current assessment, create a new one
    if (AppState.currentAssessment && AppState.currentAssessment.id === assessmentId) {
        createNewAssessment();
    }
    
    localStorage.setItem('craAssessments', JSON.stringify(AppState.assessments));
    renderHistory();
}

// Close All Modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}



// Populate Modal Action Requirement Select
function populateModalActionRequirementSelect() {
    const select = document.getElementById('modalActionRequirement');
    select.innerHTML = '<option value="">Select Requirement</option>';
    
    const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
    allRequirements.forEach(req => {
        const option = document.createElement('option');
        option.value = req.id;
        option.textContent = `${req.id} - ${req.title}`;
        select.appendChild(option);
    });
}

// Update Current/Target Levels from Assessment
function updateLevelsFromAssessment() {
    const requirementId = document.getElementById('modalActionRequirement').value;
    if (!requirementId || !AppState.currentAssessment) return;
    
    const reqData = AppState.currentAssessment.requirements[requirementId];
    if (reqData) {
        const currentLevel = reqData.currentLevel;
        const targetLevel = reqData.targetLevel;
        
        if (currentLevel !== null) {
            document.getElementById('modalActionCurrentLevel').value = currentLevel;
        }
        if (targetLevel !== null) {
            document.getElementById('modalActionTargetLevel').value = targetLevel;
        }
    }
}

const ACTION_FIELD_LIMITS = {
    description: 1000,
    owner: 200,
    timeline: 200,
    resources: 500
};

const ACTION_PRIORITIES = ['urgent', 'high', 'medium', 'low'];

function sanitizeActionText(value) {
    return String(value || '')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        .trim();
}

function sanitizeActionTextForModal(value, maxLength) {
    return sanitizeActionText(value).slice(0, maxLength);
}

function getValidatedActionTextField(elementId, label, maxLength) {
    const value = sanitizeActionText(document.getElementById(elementId).value);
    if (value.length > maxLength) {
        alert(`${label} must be ${maxLength} characters or fewer.`);
        return null;
    }
    return value;
}

function getValidatedActionLevel(elementId, label) {
    const value = parseInt(document.getElementById(elementId).value, 10);
    if (!Number.isInteger(value) || value < 0 || value > 4) {
        alert(`Please select a valid ${label}.`);
        return null;
    }
    return value;
}

function isValidActionRequirementId(requirementId) {
    const allRequirements = [...RequirementsData.part1, ...RequirementsData.part2];
    return allRequirements.some(req => req.id === requirementId);
}

// Show Action Modal
function showActionModal(actionId) {
    const modal = document.getElementById('actionModal');
    modal.classList.add('active');
    
    // Populate requirement select
    populateModalActionRequirementSelect();
    
    // Add event listener for requirement change (remove old one first to avoid duplicates)
    const requirementSelect = document.getElementById('modalActionRequirement');
    requirementSelect.removeEventListener('change', updateLevelsFromAssessment);
    requirementSelect.addEventListener('change', updateLevelsFromAssessment);
    
    if (actionId) {
        // Editing existing action
        const action = AppState.currentAssessment.actions.find(a => a.id === actionId);
        if (action) {
            AppState.editingAction = action;
            document.getElementById('actionModalTitle').textContent = 'Edit Action';
            document.getElementById('modalActionPriority').value = action.priority;
            document.getElementById('modalActionRequirement').value = action.requirementId;
            
            // Get requirement data from assessment
            const reqData = AppState.currentAssessment.requirements[action.requirementId];
            const inheritedCurrentLevel = reqData ? reqData.currentLevel : null;
            const inheritedTargetLevel = reqData ? reqData.targetLevel : null;
            
            // Use action levels if set, otherwise use inherited from assessment
            document.getElementById('modalActionCurrentLevel').value = 
                action.currentLevel !== null && action.currentLevel !== undefined 
                    ? action.currentLevel 
                    : (inheritedCurrentLevel !== null ? inheritedCurrentLevel : 0);
            document.getElementById('modalActionTargetLevel').value = 
                action.targetLevel !== null && action.targetLevel !== undefined 
                    ? action.targetLevel 
                    : (inheritedTargetLevel !== null ? inheritedTargetLevel : 4);
            
            document.getElementById('modalActionDescription').value = sanitizeActionTextForModal(action.description, ACTION_FIELD_LIMITS.description);
            document.getElementById('modalActionOwner').value = sanitizeActionTextForModal(action.owner, ACTION_FIELD_LIMITS.owner);
            document.getElementById('modalActionTimeline').value = sanitizeActionTextForModal(action.timeline, ACTION_FIELD_LIMITS.timeline);
            document.getElementById('modalActionResources').value = sanitizeActionTextForModal(action.resources, ACTION_FIELD_LIMITS.resources);
            
            // Show delete button
            document.getElementById('deleteActionModalBtn').style.display = 'inline-block';
        }
    } else {
        // Adding new action
        AppState.editingAction = null;
        document.getElementById('actionModalTitle').textContent = 'Add Action';
        document.getElementById('modalActionPriority').value = 'urgent';
        document.getElementById('modalActionRequirement').value = '';
        document.getElementById('modalActionCurrentLevel').value = '0';
        document.getElementById('modalActionTargetLevel').value = '4';
        document.getElementById('modalActionDescription').value = '';
        document.getElementById('modalActionOwner').value = '';
        document.getElementById('modalActionTimeline').value = '';
        document.getElementById('modalActionResources').value = '';
        
        // Hide delete button
        document.getElementById('deleteActionModalBtn').style.display = 'none';
    }
}

// Hide Action Modal
function hideActionModal() {
    const modal = document.getElementById('actionModal');
    modal.classList.remove('active');
    AppState.editingAction = null;
}

// Save Action from Modal
function saveActionFromModal() {
    if (!AppState.currentAssessment) return;
    
    const priority = document.getElementById('modalActionPriority').value;
    const requirementId = sanitizeActionText(document.getElementById('modalActionRequirement').value);
    const currentLevel = getValidatedActionLevel('modalActionCurrentLevel', 'current level');
    const targetLevel = getValidatedActionLevel('modalActionTargetLevel', 'target level');
    const description = getValidatedActionTextField('modalActionDescription', 'Action description', ACTION_FIELD_LIMITS.description);
    const owner = getValidatedActionTextField('modalActionOwner', 'Owner', ACTION_FIELD_LIMITS.owner);
    const timeline = getValidatedActionTextField('modalActionTimeline', 'Timeline', ACTION_FIELD_LIMITS.timeline);
    const resources = getValidatedActionTextField('modalActionResources', 'Resources', ACTION_FIELD_LIMITS.resources);
    
    if (!requirementId) {
        alert('Please select a requirement');
        return;
    }

    if (!ACTION_PRIORITIES.includes(priority)) {
        alert('Please select a valid priority.');
        return;
    }

    if (!isValidActionRequirementId(requirementId)) {
        alert('Please select a valid requirement.');
        return;
    }

    if ([currentLevel, targetLevel, description, owner, timeline, resources].includes(null)) {
        return;
    }
    
    const action = {
        id: AppState.editingAction ? AppState.editingAction.id : generateId(),
        priority,
        requirementId,
        currentLevel,
        targetLevel,
        description,
        owner,
        timeline,
        resources,
        createdAt: AppState.editingAction ? AppState.editingAction.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (!AppState.currentAssessment.actions) {
        AppState.currentAssessment.actions = [];
    }
    
    if (AppState.editingAction) {
        // Update existing action
        const index = AppState.currentAssessment.actions.findIndex(a => a.id === AppState.editingAction.id);
        if (index >= 0) {
            AppState.currentAssessment.actions[index] = action;
        }
    } else {
        // Add new action
        AppState.currentAssessment.actions.push(action);
    }
    
    // Update the assessment requirement with the current/target levels from the action
    // This ensures two-way sync: editing in roadmap updates the assessment
    if (AppState.currentAssessment.requirements[requirementId]) {
        AppState.currentAssessment.requirements[requirementId].currentLevel = currentLevel;
        AppState.currentAssessment.requirements[requirementId].targetLevel = targetLevel;
        AppState.currentAssessment.requirements[requirementId].lastUpdated = new Date().toISOString();
    }
    
    AppState.currentAssessment.updatedAt = new Date().toISOString();
    saveAssessment();
    
    hideActionModal();
    renderRoadmap();
}

// Delete Action
function deleteAction(actionId) {
    if (!AppState.currentAssessment || !actionId) return;
    
    const index = AppState.currentAssessment.actions.findIndex(a => a.id === actionId);
    if (index >= 0) {
        AppState.currentAssessment.actions.splice(index, 1);
        AppState.currentAssessment.updatedAt = new Date().toISOString();
        saveAssessment();
        renderRoadmap();
    }
}

// Confirm Delete Action
function confirmDeleteAction(actionId) {
    if (confirm('Are you sure you want to delete this action?')) {
        deleteAction(actionId);
    }
}

// Edit Action
function editAction(actionId) {
    showActionModal(actionId);
}
