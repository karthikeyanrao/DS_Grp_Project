// ===========================
// GLOBAL STATE & CONFIGURATION
// ===========================

const CONFIG = {
    // Module 1: Socket Programming
    SOCKET_SERVER: 'http://localhost:3000',

    // Module 2: Java RMI (using mock data by default)
    USE_MOCK_RMI: true,
    RMI_BRIDGE: 'http://localhost:8080',

    // Module 3: REST API
    REST_API: 'http://localhost:5000/api',

    // Module 4: P2P
    P2P_PORT: 9000,

    // Module 5: Shared Memory
    SHARED_MEMORY_API: 'http://localhost:6000/api'
};

// Mock data for demonstration
const MOCK_DATA = {
    rooms: {
        'A101': {
            roomNumber: 'A101',
            block: 'A',
            floor: 'Ground Floor',
            occupants: ['Rahul Sharma', 'Amit Kumar'],
            wardenName: 'Dr. Rajesh Verma',
            wardenContact: '+91-9876543210',
            wardenEmail: 'rajesh.verma@hostel.edu'
        },
        'A102': {
            roomNumber: 'A102',
            block: 'A',
            floor: 'Ground Floor',
            occupants: ['Priya Singh', 'Sneha Patel', 'Anjali Reddy'],
            wardenName: 'Dr. Rajesh Verma',
            wardenContact: '+91-9876543210',
            wardenEmail: 'rajesh.verma@hostel.edu'
        },
        'B201': {
            roomNumber: 'B201',
            block: 'B',
            floor: 'First Floor',
            occupants: ['Neha Gupta', 'Pooja Iyer'],
            wardenName: 'Prof. Sunita Mehta',
            wardenContact: '+91-9876543211',
            wardenEmail: 'sunita.mehta@hostel.edu'
        },
        'C301': {
            roomNumber: 'C301',
            block: 'C',
            floor: 'Second Floor',
            occupants: ['Aditya Malhotra', 'Siddharth Chopra'],
            wardenName: 'Dr. Anil Kumar',
            wardenContact: '+91-9876543212',
            wardenEmail: 'anil.kumar@hostel.edu'
        }
    },
    complaints: [],
    notices: [],
    feedback: { good: 0, average: 0, poor: 0 }
};

// ===========================
// TAB SWITCHING
// ===========================

function switchTab(module, role) {
    // Update tab buttons
    const moduleSection = document.getElementById(module);
    if (!moduleSection) return;

    moduleSection.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');

    // Update tab content
    moduleSection.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const targetContent = document.getElementById(`${module}-${role}`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===========================
// MODULE 1: SOCKET PROGRAMMING - COMPLAINT MANAGEMENT
// ===========================

async function submitComplaint(event) {
    event.preventDefault();

    const complaint = {
        roomNumber: document.getElementById('m1-roomNumber').value,
        category: document.getElementById('m1-category').value,
        description: document.getElementById('m1-description').value,
        timestamp: new Date().toISOString()
    };

    try {
        // Try to connect to actual socket server
        const response = await fetch(`${CONFIG.SOCKET_SERVER}/complaint`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaint)
        });

        if (response.ok) {
            const result = await response.json();
            showComplaintStatus(result.message || 'Complaint submitted successfully!');
            document.getElementById('complaintForm').reset();
            showNotification('Complaint submitted successfully!', 'success');
        }
    } catch (error) {
        // Fallback to mock data
        MOCK_DATA.complaints.push(complaint);
        showComplaintStatus(`Complaint #${MOCK_DATA.complaints.length} submitted successfully! (Mock Mode)`);
        document.getElementById('complaintForm').reset();
        showNotification('Complaint submitted (Mock Mode)', 'info');
    }
}

function showComplaintStatus(message) {
    const statusDiv = document.getElementById('m1-studentStatus');
    const statusMessage = document.getElementById('m1-statusMessage');
    statusMessage.textContent = message;
    statusDiv.style.display = 'block';
}

async function loadComplaints() {
    try {
        const response = await fetch(`${CONFIG.SOCKET_SERVER}/complaints`);
        const complaints = await response.json();
        displayComplaints(complaints);
    } catch (error) {
        // Use mock data
        displayComplaints(MOCK_DATA.complaints);
    }
}

function displayComplaints(complaints) {
    const listDiv = document.getElementById('m1-complaintsList');

    if (complaints.length === 0) {
        listDiv.innerHTML = '<p class="empty-state">No complaints yet</p>';
        return;
    }

    listDiv.innerHTML = complaints.map((c, index) => `
        <div class="complaint-item">
            <h4>Complaint #${index + 1}</h4>
            <p><strong>Room:</strong> ${c.roomNumber}</p>
            <p><strong>Category:</strong> ${c.category}</p>
            <p><strong>Description:</strong> ${c.description}</p>
            <p><strong>Time:</strong> ${new Date(c.timestamp).toLocaleString()}</p>
        </div>
    `).join('');
}

// ===========================
// MODULE 2: JAVA RMI - ROOM INFORMATION
// ===========================

async function searchRoom() {
    const roomNumber = document.getElementById('m2-searchInput').value.trim().toUpperCase();

    if (!roomNumber) {
        showNotification('Please enter a room number', 'error');
        return;
    }

    try {
        let roomInfo;

        if (CONFIG.USE_MOCK_RMI) {
            // Use mock data
            roomInfo = MOCK_DATA.rooms[roomNumber];
        } else {
            // Try to connect to RMI bridge
            const response = await fetch(`${CONFIG.RMI_BRIDGE}/room/${roomNumber}`);
            roomInfo = await response.json();
        }

        if (roomInfo) {
            displayRoomDetails(roomInfo);
            showNotification('Room found!', 'success');
        } else {
            showRoomError('Room not found');
        }
    } catch (error) {
        showRoomError('Error fetching room information');
    }
}

function displayRoomDetails(room) {
    const resultsDiv = document.getElementById('m2-results');
    const detailsDiv = document.getElementById('m2-roomDetails');

    detailsDiv.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <span class="label">Room Number:</span>
                <span class="value">${room.roomNumber}</span>
            </div>
            <div class="detail-item">
                <span class="label">Block:</span>
                <span class="value">${room.block}</span>
            </div>
            <div class="detail-item">
                <span class="label">Floor:</span>
                <span class="value">${room.floor}</span>
            </div>
        </div>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">Occupants</h4>
        <ul style="list-style: none; padding: 0;">
            ${room.occupants.map(o => `<li style="padding: 0.5rem; background: rgba(255,255,255,0.05); margin-bottom: 0.5rem; border-radius: 0.5rem;">👤 ${o}</li>`).join('')}
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">Warden Information</h4>
        <div class="detail-grid">
            <div class="detail-item">
                <span class="label">Name:</span>
                <span class="value">${room.wardenName}</span>
            </div>
            <div class="detail-item">
                <span class="label">Contact:</span>
                <span class="value">${room.wardenContact}</span>
            </div>
            <div class="detail-item">
                <span class="label">Email:</span>
                <span class="value">${room.wardenEmail}</span>
            </div>
        </div>
    `;

    document.getElementById('m2-resultTitle').textContent = 'Room Details';
    resultsDiv.style.display = 'block';
}

function viewAllRooms() {
    const rooms = Object.keys(MOCK_DATA.rooms);
    const resultsDiv = document.getElementById('m2-results');
    const detailsDiv = document.getElementById('m2-roomDetails');

    detailsDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;">
            ${rooms.map(r => `
                <div style="padding: 1rem; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 0.5rem; text-align: center; cursor: pointer;" onclick="quickSearchRoom('${r}')">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏠</div>
                    <div style="font-weight: 600; color: var(--primary-light);">${r}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">Block ${MOCK_DATA.rooms[r].block}</div>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('m2-resultTitle').textContent = `All Rooms (${rooms.length})`;
    resultsDiv.style.display = 'block';
    showNotification(`Found ${rooms.length} rooms`, 'success');
}

function quickSearchRoom(roomNumber) {
    document.getElementById('m2-searchInput').value = roomNumber;
    searchRoom();
}

function showRoomStats() {
    const totalRooms = Object.keys(MOCK_DATA.rooms).length;
    const resultsDiv = document.getElementById('m2-results');
    const detailsDiv = document.getElementById('m2-roomDetails');

    detailsDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <div style="text-align: center; padding: 2rem; background: rgba(99, 102, 241, 0.1); border-radius: 1rem;">
                <div style="font-size: 3rem; font-weight: 800; color: var(--primary-light);">${totalRooms}</div>
                <div style="color: var(--text-secondary); margin-top: 0.5rem;">Total Rooms</div>
            </div>
            <div style="text-align: center; padding: 2rem; background: rgba(16, 185, 129, 0.1); border-radius: 1rem;">
                <div style="font-size: 3rem; font-weight: 800; color: var(--success);">✓</div>
                <div style="color: var(--text-secondary); margin-top: 0.5rem;">RMI Active</div>
            </div>
        </div>
    `;

    document.getElementById('m2-resultTitle').textContent = 'Statistics';
    resultsDiv.style.display = 'block';
}

function showRoomError(message) {
    const resultsDiv = document.getElementById('m2-results');
    const detailsDiv = document.getElementById('m2-roomDetails');

    detailsDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">❌</div>
            <h3 style="color: var(--error);">${message}</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">Please try a different room number</p>
        </div>
    `;

    document.getElementById('m2-resultTitle').textContent = 'Error';
    resultsDiv.style.display = 'block';
    showNotification(message, 'error');
}

function closeRoomResults() {
    document.getElementById('m2-results').style.display = 'none';
}

// ===========================
// MODULE 3: RPC/REST - NOTICE BOARD
// ===========================

async function submitNotice(event) {
    event.preventDefault();

    const notice = {
        title: document.getElementById('m3-title').value,
        message: document.getElementById('m3-message').value,
        date: new Date().toISOString()
    };

    try {
        const response = await fetch(`${CONFIG.REST_API}/notices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notice)
        });

        if (response.ok) {
            showNotification('Notice posted successfully!', 'success');
            document.getElementById('noticeForm').reset();
            loadNotices();
        }
    } catch (error) {
        // Fallback to mock
        MOCK_DATA.notices.push(notice);
        showNotification('Notice posted (Mock Mode)', 'info');
        document.getElementById('noticeForm').reset();
        loadNotices();
    }
}

async function loadNotices() {
    try {
        const response = await fetch(`${CONFIG.REST_API}/notices`);
        const notices = await response.json();
        displayNotices(notices);
    } catch (error) {
        displayNotices(MOCK_DATA.notices);
    }
}

function displayNotices(notices) {
    const studentList = document.getElementById('m3-noticesList');
    const adminList = document.getElementById('m3-adminNoticesList');

    const html = notices.length === 0
        ? '<p class="empty-state">No notices available</p>'
        : notices.map((n, index) => `
            <div class="notice-item">
                <h4>${n.title}</h4>
                <p>${n.message}</p>
                <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">
                    📅 ${new Date(n.date).toLocaleString()}
                </p>
            </div>
        `).join('');

    if (studentList) studentList.innerHTML = html;
    if (adminList) adminList.innerHTML = html;
}

// ===========================
// MODULE 4: P2P - RESOURCE SHARING
// ===========================

let peerActive = false;

function startPeer() {
    peerActive = true;
    document.getElementById('m4-peerId').textContent = `PEER-${Math.floor(Math.random() * 10000)}`;
    document.getElementById('m4-status').textContent = 'Online';
    document.getElementById('m4-status').style.color = 'var(--success)';
    showNotification('Peer server started!', 'success');
}

async function uploadResource(event) {
    event.preventDefault();

    if (!peerActive) {
        showNotification('Please start peer server first', 'error');
        return;
    }

    const fileName = document.getElementById('m4-fileName').value;
    const description = document.getElementById('m4-fileDescription').value;

    showNotification(`Resource "${fileName}" uploaded to P2P network`, 'success');
    document.getElementById('uploadForm').reset();
}

function discoverPeers() {
    if (!peerActive) {
        showNotification('Please start peer server first', 'error');
        return;
    }

    const mockResources = [
        { name: 'DataStructures_Notes.pdf', peer: 'PEER-1234', size: '2.5 MB' },
        { name: 'OS_Assignment.docx', peer: 'PEER-5678', size: '1.2 MB' },
        { name: 'Networks_PPT.pptx', peer: 'PEER-9012', size: '5.8 MB' }
    ];

    const listDiv = document.getElementById('m4-resourcesList');
    listDiv.innerHTML = mockResources.map(r => `
        <div class="resource-item">
            <h4>📄 ${r.name}</h4>
            <p><strong>Peer:</strong> ${r.peer}</p>
            <p><strong>Size:</strong> ${r.size}</p>
            <button class="btn btn-primary" onclick="downloadResource('${r.name}')">Download</button>
        </div>
    `).join('');

    showNotification(`Found ${mockResources.length} resources`, 'success');
}

function downloadResource(fileName) {
    showNotification(`Downloading ${fileName} from peer...`, 'info');
}

// ===========================
// MODULE 5: SHARED MEMORY - MESS FEEDBACK
// ===========================

async function submitFeedback(type) {
    try {
        const response = await fetch(`${CONFIG.SHARED_MEMORY_API}/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type })
        });

        if (response.ok) {
            refreshFeedback();
            showNotification('Feedback submitted!', 'success');
        }
    } catch (error) {
        // Fallback to mock
        MOCK_DATA.feedback[type]++;
        updateFeedbackDisplay();
        showNotification('Feedback submitted (Mock Mode)', 'info');
    }
}

async function refreshFeedback() {
    try {
        const response = await fetch(`${CONFIG.SHARED_MEMORY_API}/feedback`);
        const data = await response.json();
        updateFeedbackDisplay(data);
    } catch (error) {
        updateFeedbackDisplay(MOCK_DATA.feedback);
    }
}

function updateFeedbackDisplay(data = MOCK_DATA.feedback) {
    const total = data.good + data.average + data.poor;

    // Update counts
    document.getElementById('m5-good').textContent = data.good;
    document.getElementById('m5-average').textContent = data.average;
    document.getElementById('m5-poor').textContent = data.poor;
    document.getElementById('m5-total').textContent = total;

    // Update bars
    if (total > 0) {
        document.getElementById('m5-good-bar').style.width = `${(data.good / total) * 100}%`;
        document.getElementById('m5-average-bar').style.width = `${(data.average / total) * 100}%`;
        document.getElementById('m5-poor-bar').style.width = `${(data.poor / total) * 100}%`;
    }
}

// ===========================
// EVENT LISTENERS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links (handled by CSS scroll-behavior: smooth)

    // Module 1: Complaint Form
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
        complaintForm.addEventListener('submit', submitComplaint);
    }

    // Module 3: Notice Form
    const noticeForm = document.getElementById('noticeForm');
    if (noticeForm) {
        noticeForm.addEventListener('submit', submitNotice);
    }

    // Module 4: Upload Form
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', uploadResource);
    }

    // Module 2: Search on Enter
    const m2Search = document.getElementById('m2-searchInput');
    if (m2Search) {
        m2Search.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchRoom();
            }
        });
    }

    // Initialize feedback display
    updateFeedbackDisplay();

    console.log('Hostel Assist - Integrated Frontend Loaded');
    console.log('All 5 modules ready in single-page layout!');
});
