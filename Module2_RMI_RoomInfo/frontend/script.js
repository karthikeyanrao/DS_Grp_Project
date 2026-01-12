// In-memory storage for rooms
let roomsDatabase = {};

// DOM Elements
const addRoomForm = document.getElementById('addRoomForm');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const viewAllBtn = document.getElementById('viewAllBtn');
const statsBtn = document.getElementById('statsBtn');
const resultsSection = document.getElementById('resultsSection');
const notification = document.getElementById('notification');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hostel Room Information Service - Ready');

    // Event Listeners
    addRoomForm.addEventListener('submit', handleAddRoom);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    viewAllBtn.addEventListener('click', handleViewAll);
    statsBtn.addEventListener('click', handleStats);
});

// Add Room Handler
function handleAddRoom(e) {
    e.preventDefault();

    const roomData = {
        roomNumber: document.getElementById('roomNumber').value.trim().toUpperCase(),
        block: document.getElementById('block').value.trim().toUpperCase(),
        floor: document.getElementById('floor').value.trim(),
        occupants: document.getElementById('occupants').value.split(',').map(name => name.trim()),
        wardenName: document.getElementById('wardenName').value.trim(),
        wardenContact: document.getElementById('wardenContact').value.trim(),
        wardenEmail: document.getElementById('wardenEmail').value.trim()
    };

    // Check if room already exists
    if (roomsDatabase[roomData.roomNumber]) {
        showNotification('Room ' + roomData.roomNumber + ' already exists!', 'error');
        return;
    }

    // Add to database
    roomsDatabase[roomData.roomNumber] = roomData;

    // Show success notification
    showNotification('Room ' + roomData.roomNumber + ' added successfully!');

    // Reset form
    addRoomForm.reset();

    console.log('Room added:', roomData);
}

// Search Room Handler
function handleSearch() {
    const searchValue = searchInput.value.trim().toUpperCase();

    if (!searchValue) {
        showNotification('Please enter a room number', 'error');
        return;
    }

    const room = roomsDatabase[searchValue];

    if (!room) {
        showError('Room ' + searchValue + ' not found in the system');
        return;
    }

    displayRoomDetails(room);
}

// View All Rooms Handler
function handleViewAll() {
    const roomNumbers = Object.keys(roomsDatabase).sort();

    if (roomNumbers.length === 0) {
        showError('No rooms available. Please add rooms first.');
        return;
    }

    displayAllRooms(roomNumbers);
}

// Statistics Handler
function handleStats() {
    const totalRooms = Object.keys(roomsDatabase).length;
    displayStats(totalRooms);
}

// Display Room Details
function displayRoomDetails(room) {
    hideAllDisplays();

    document.getElementById('resultTitle').textContent = 'Room Details';
    document.getElementById('displayRoomNumber').textContent = room.roomNumber;
    document.getElementById('displayBlock').textContent = room.block;
    document.getElementById('displayFloor').textContent = room.floor;

    // Display occupants
    const occupantsList = document.getElementById('occupantsList');
    occupantsList.innerHTML = '';
    room.occupants.forEach(occupant => {
        const li = document.createElement('li');
        li.textContent = occupant;
        occupantsList.appendChild(li);
    });

    // Display warden info
    document.getElementById('displayWardenName').textContent = room.wardenName;
    document.getElementById('displayWardenContact').textContent = room.wardenContact;
    document.getElementById('displayWardenEmail').textContent = room.wardenEmail;

    document.getElementById('roomDetails').style.display = 'block';
    resultsSection.style.display = 'block';

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Display All Rooms
function displayAllRooms(roomNumbers) {
    hideAllDisplays();

    document.getElementById('resultTitle').textContent = 'All Rooms (' + roomNumbers.length + ')';

    const roomsGrid = document.getElementById('roomsGrid');
    roomsGrid.innerHTML = '';

    roomNumbers.forEach(roomNumber => {
        const roomItem = document.createElement('div');
        roomItem.className = 'room-item';
        roomItem.textContent = roomNumber;
        roomItem.onclick = () => {
            searchInput.value = roomNumber;
            handleSearch();
        };
        roomsGrid.appendChild(roomItem);
    });

    document.getElementById('allRoomsList').style.display = 'block';
    resultsSection.style.display = 'block';

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Display Statistics
function displayStats(totalRooms) {
    hideAllDisplays();

    document.getElementById('resultTitle').textContent = 'Statistics';
    document.getElementById('totalRooms').textContent = totalRooms;

    document.getElementById('statsDisplay').style.display = 'block';
    resultsSection.style.display = 'block';

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Show Error
function showError(message) {
    hideAllDisplays();

    document.getElementById('resultTitle').textContent = 'Error';
    document.getElementById('errorText').textContent = message;

    document.getElementById('errorDisplay').style.display = 'block';
    resultsSection.style.display = 'block';

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Hide All Displays
function hideAllDisplays() {
    document.getElementById('roomDetails').style.display = 'none';
    document.getElementById('allRoomsList').style.display = 'none';
    document.getElementById('statsDisplay').style.display = 'none';
    document.getElementById('errorDisplay').style.display = 'none';
}

// Close Results
function closeResults() {
    resultsSection.style.display = 'none';
    hideAllDisplays();
}

// Show Notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = 'notification show';

    if (type === 'error') {
        notification.classList.add('error');
    }

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResults();
    }
});
