# Quick Start Guide - Module 2: RMI Room Information Service

## 🚀 Getting Started in 3 Steps

### **Step 1: Compile the Java Code**
```bash
cd backend
compile.bat
```

### **Step 2: Start the RMI Server**
```bash
start-server.bat
```
Keep this terminal window open - the server needs to keep running!

### **Step 3: Open the Web UI**
Simply open `frontend/index.html` in your web browser.

---

## 📋 What You Can Do

### **Web Interface (Recommended)**
1. **Search for a Room**: Enter a room number like "A101" or "B201"
2. **View All Rooms**: Click the "View All Rooms" button
3. **Check Statistics**: Click the "Statistics" button

### **Command-Line Client (For Testing)**
```bash
cd backend
start-client.bat
```

---

## 🏠 Sample Room Numbers to Try

- **Block A**: A101, A102, A103
- **Block B**: B201, B202, B203
- **Block C**: C301, C302

---

## 🔧 Troubleshooting

### **"javac is not recognized"**
- Install Java JDK 8 or higher
- Add Java to your PATH environment variable

### **"Server exception: Port already in use"**
- Another RMI server is running on port 1099
- Close it or change the port in the code

### **Web UI shows "Room Not Found" for all rooms**
- The UI uses mock data by default (no server needed!)
- To connect to real RMI server, modify `script.js`:
  ```javascript
  USE_MOCK_DATA: false
  ```

---

## 📚 Understanding the Code

### **Java RMI Components**
1. **RoomInfo.java** - Data model (Serializable)
2. **RoomInfoService.java** - Remote interface
3. **RoomInfoServiceImpl.java** - Implementation with in-memory HashMap
4. **RoomInfoServer.java** - Server that creates registry and binds service
5. **RoomInfoClient.java** - Test client

### **Web UI Components**
1. **index.html** - Structure
2. **styles.css** - Modern glassmorphism design
3. **script.js** - Interactive functionality with mock RMI data

---

## 🎯 Key Learning Points

✅ **RMI Registry** - Service discovery mechanism
✅ **Remote Interface** - Contract for remote methods
✅ **Stub-Skeleton** - Automatic proxy generation
✅ **Serialization** - Object transfer over network
✅ **In-Memory Storage** - HashMap for fast lookups

---

## 📊 Demo Flow

1. **Start Server** → Creates RMI registry on port 1099
2. **Bind Service** → Registers RoomInfoService
3. **Client Request** → Looks up service in registry
4. **Remote Call** → Invokes getRoomInfo() method
5. **Data Transfer** → RoomInfo object serialized and sent back
6. **Display** → Client shows room details

---

## 🌟 Features Implemented

- ✅ Multiple remote methods (getRoomInfo, getAllRooms, getTotalRoomCount, getRoomsByBlock)
- ✅ In-memory HashMap storage
- ✅ Beautiful, responsive web UI
- ✅ Mock data for standalone testing
- ✅ Error handling
- ✅ Command-line test client

---

## 📝 Notes for Evaluation

- **Communication Model**: Java RMI (Remote Method Invocation)
- **Data Storage**: In-memory HashMap
- **UI**: Modern HTML/CSS/JavaScript
- **Remote Methods**: 4 methods implemented (requirement: minimum 2)
- **Demo Ready**: Yes, fully functional

---

**Need Help?** Check the main README.md for detailed documentation!
