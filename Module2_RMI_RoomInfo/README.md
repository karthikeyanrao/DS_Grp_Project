# Module 2: Hostel Room Information Service (Java RMI)

## **Overview**
This module implements a **Hostel Room Information Service** using **Java RMI (Remote Method Invocation)**. Students can search for hostel room details including room number, occupant names, and warden contact details.

## **Communication Model**
- **Java RMI**: Remote Method Invocation for distributed object communication
- **Client-Server Architecture**: Web UI acts as client, Java RMI server provides room information

## **In-Memory Data Design**
- **Data Structure**: HashMap<String, RoomInfo>
- **Why In-Memory?**: 
  - Room information is relatively static and doesn't change frequently
  - Fast lookup performance for search queries
  - Suitable for demonstration and small-scale hostel management
  - Easy to reset and reload sample data for testing
- **Impact of Server Restart**: All room data will be lost and needs to be reinitialized with sample data

## **Architecture**

```
┌─────────────────┐         HTTP/JSON          ┌──────────────────┐
│   Web Browser   │ ◄──────────────────────► │  Bridge Server   │
│  (HTML/CSS/JS)  │                            │   (Node.js)      │
└─────────────────┘                            └──────────────────┘
                                                        │
                                                        │ RMI
                                                        ▼
                                               ┌──────────────────┐
                                               │   RMI Server     │
                                               │   (Java)         │
                                               │  In-Memory Map   │
                                               └──────────────────┘
```

## **Technical Requirements**
✅ RMI registry setup
✅ At least two remote methods:
   - `getRoomInfo(String roomNumber)`: Get room details
   - `getAllRooms()`: Get list of all rooms
✅ In-memory storage using HashMap
✅ Web-based UI for room search

## **Setup Instructions**

### **Prerequisites**
- Java JDK 8 or higher
- Node.js (for bridge server)

### **Step 1: Compile Java RMI Server**
```bash
cd backend
javac -d bin src/com/hostel/rmi/*.java
```

### **Step 2: Start RMI Registry**
```bash
cd backend/bin
start rmiregistry 1099
```

### **Step 3: Start RMI Server**
```bash
cd backend
java -cp bin com.hostel.rmi.RoomInfoServer
```

### **Step 4: Start Bridge Server (Optional - for Web UI)**
```bash
cd backend
node bridge-server.js
```

### **Step 5: Open Web UI**
```bash
# Open frontend/index.html in your browser
# Or use a local server:
cd frontend
python -m http.server 8080
# Then visit: http://localhost:8080
```

## **Features**
- 🔍 Search room by room number
- 👥 View occupant names
- 📞 View warden contact details
- 🏢 View all available rooms
- 🎨 Modern, responsive UI with glassmorphism design

## **Sample Data**
The system comes pre-loaded with sample room data:
- Rooms: A101, A102, A103, B201, B202, B203
- Each room has 2-3 occupants
- Warden contact information included

## **Learning Outcomes**
- Understanding Java RMI architecture
- Remote method invocation concepts
- Stub-skeleton interaction
- Distributed object management
- Client-server communication patterns
