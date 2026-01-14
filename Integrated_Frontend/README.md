# Hostel Assist - Integrated Frontend

## 🎯 Overview

This is the **unified frontend** that integrates all 5 distributed systems modules into a single, cohesive web application. Instead of having separate frontends for each module, this provides a seamless user experience across all communication models.

---

## 📁 Project Structure

```
Integrated_Frontend/
├── index.html          # Main HTML file with all 5 modules
├── styles.css          # Comprehensive CSS with modern design
├── script.js           # JavaScript handling all module interactions
└── README.md           # This file
```

---

## 🚀 Features

### **Unified Navigation**
- Single navigation bar to switch between all 5 modules
- Smooth transitions and animations
- Responsive design for all screen sizes

### **Module Integration**
1. **Module 1: Socket Programming** - Complaint Management System
2. **Module 2: Java RMI** - Room Information Service
3. **Module 3: RPC/REST** - Notice Board System
4. **Module 4: Peer-to-Peer** - Resource Sharing
5. **Module 5: Shared Memory** - Mess Feedback Counter

### **Modern UI/UX**
- Dark theme with glassmorphism effects
- Gradient accents and smooth animations
- Responsive grid layouts
- Interactive feedback elements

---

## 🔧 How to Run

### **Option 1: Direct File Access (Recommended for Demo)**

1. Simply open `index.html` in your web browser:
   ```bash
   # Windows
   start index.html
   
   # Or just double-click the file
   ```

2. The frontend will work in **mock mode** by default (no backend required for demo)

### **Option 2: With Local Server**

For better CORS handling and API integration:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Then visit: http://localhost:8000
```

---

## 🔌 Backend Integration

### **Configuration**

Edit `script.js` to configure backend endpoints:

```javascript
const CONFIG = {
    SOCKET_SERVER: 'http://localhost:3000',      // Module 1
    RMI_BRIDGE: 'http://localhost:8080',         // Module 2
    REST_API: 'http://localhost:5000/api',       // Module 3
    P2P_PORT: 9000,                              // Module 4
    SHARED_MEMORY_API: 'http://localhost:6000/api' // Module 5
};
```

### **Mock Mode vs Live Mode**

**Mock Mode (Default):**
- Works without any backend servers
- Uses in-memory JavaScript data
- Perfect for frontend demonstrations
- Set `USE_MOCK_RMI: true` in CONFIG

**Live Mode:**
- Connects to actual backend servers
- Real distributed systems communication
- Requires all backend modules to be running
- Set `USE_MOCK_RMI: false` in CONFIG

---

## 📋 Module Details

### **Module 1: Complaint Management (Socket Programming)**

**Features:**
- Student role: Submit complaints
- Warden role: View all complaints
- Real-time complaint tracking

**Backend Required:**
- Socket server running on port 3000
- Location: `../M1_Socket/backend/`

**How to Start Backend:**
```bash
cd ../M1_Socket/backend
node server.js
```

---

### **Module 2: Room Information (Java RMI)**

**Features:**
- Search rooms by number
- View all rooms
- Display statistics
- Show warden details

**Backend Required:**
- Java RMI server running on port 1099
- Location: `../Module2_RMI_RoomInfo/backend/`

**How to Start Backend:**
```bash
cd ../Module2_RMI_RoomInfo/backend
compile.bat
start-server.bat
```

---

### **Module 3: Notice Board (REST API)**

**Features:**
- Admin role: Post notices
- Student role: View notices
- RESTful API communication

**Backend Required:**
- REST API server on port 5000
- Location: `../Module3_RPC/`

**How to Start Backend:**
```bash
cd ../Module3_RPC
node server.js
```

---

### **Module 4: Resource Sharing (P2P)**

**Features:**
- Start peer server
- Upload resources
- Discover peers
- Download files

**Backend Required:**
- P2P peer network
- Location: `../Module_4_P2P/`

**How to Start Backend:**
```bash
cd ../Module_4_P2P
java PeerServer
```

---

### **Module 5: Mess Feedback (Shared Memory)**

**Features:**
- Submit feedback (Good/Average/Poor)
- Live counter updates
- Visual statistics with progress bars
- Real-time synchronization

**Backend Required:**
- Shared memory API on port 6000
- Location: `../Module5_Shared_Memory/`

**How to Start Backend:**
```bash
cd ../Module5_Shared_Memory
# Follow module-specific instructions
```

---

## 🎨 Design System

### **Color Palette**
- **Primary:** `#6366f1` (Indigo)
- **Secondary:** `#8b5cf6` (Purple)
- **Accent:** `#ec4899` (Pink)
- **Success:** `#10b981` (Green)
- **Warning:** `#f59e0b` (Amber)
- **Error:** `#ef4444` (Red)

### **Typography**
- Font Family: Inter (Google Fonts)
- Weights: 400, 500, 600, 700, 800

### **Components**
- Cards with glassmorphism effect
- Gradient buttons with hover animations
- Responsive grid layouts
- Toast notifications
- Modal dialogs

---

## 📱 Responsive Design

The frontend is fully responsive and works on:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

---

## 🔄 API Integration

### **Module 1: Socket API**

```javascript
// Submit Complaint
POST /complaint
{
    "roomNumber": "A101",
    "category": "Water",
    "description": "Tap not working"
}

// Get All Complaints
GET /complaints
```

### **Module 2: RMI Bridge API**

```javascript
// Get Room Info
GET /room/:roomNumber

// Get All Rooms
GET /rooms

// Get Room Count
GET /rooms/count
```

### **Module 3: REST API**

```javascript
// Post Notice
POST /api/notices
{
    "title": "Hostel Meeting",
    "message": "Meeting at 5 PM"
}

// Get All Notices
GET /api/notices
```

### **Module 5: Shared Memory API**

```javascript
// Submit Feedback
POST /api/feedback
{
    "type": "good" | "average" | "poor"
}

// Get Feedback Stats
GET /api/feedback
```

---

## 🧪 Testing

### **Manual Testing Checklist**

**Module 1:**
- [ ] Submit complaint as student
- [ ] View complaints as warden
- [ ] Verify complaint details

**Module 2:**
- [ ] Search for existing room (A101, B201, C301)
- [ ] Search for non-existent room
- [ ] View all rooms
- [ ] Check statistics

**Module 3:**
- [ ] Post notice as admin
- [ ] View notices as student
- [ ] Verify notice timestamp

**Module 4:**
- [ ] Start peer server
- [ ] Upload resource
- [ ] Discover peers
- [ ] Download resource

**Module 5:**
- [ ] Submit Good feedback
- [ ] Submit Average feedback
- [ ] Submit Poor feedback
- [ ] Verify live counter updates

---

## 🚨 Troubleshooting

### **Issue: Modules not loading**
**Solution:** Check browser console for errors. Ensure all file paths are correct.

### **Issue: Backend connection failed**
**Solution:** 
1. Verify backend servers are running
2. Check port numbers in CONFIG
3. Enable CORS on backend servers
4. Use mock mode for testing

### **Issue: Styles not applying**
**Solution:** 
1. Clear browser cache
2. Check styles.css is loaded
3. Verify CSS file path in index.html

### **Issue: JavaScript errors**
**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Verify script.js is loaded

---

## 📊 Performance

- **Page Load:** < 1 second
- **Navigation:** Instant (client-side routing)
- **API Calls:** < 500ms (with backend)
- **Mock Mode:** Instant response

---

## 🔐 Security Notes

⚠️ **This is a lab project for educational purposes**

For production deployment, implement:
- Input validation and sanitization
- CSRF protection
- XSS prevention
- Authentication & authorization
- HTTPS encryption
- Rate limiting

---

## 📝 Development Notes

### **Adding New Features**

1. **Add HTML structure** in index.html
2. **Add styles** in styles.css
3. **Add JavaScript logic** in script.js
4. **Test in mock mode** first
5. **Integrate with backend**

### **Code Organization**

```javascript
// script.js structure:
// 1. Configuration & Mock Data
// 2. Navigation Functions
// 3. Notification System
// 4. Module 1 Functions
// 5. Module 2 Functions
// 6. Module 3 Functions
// 7. Module 4 Functions
// 8. Module 5 Functions
// 9. Event Listeners
```

---

## 🎓 Learning Outcomes

By using this integrated frontend, you'll understand:

1. **Single Page Application (SPA)** architecture
2. **Client-side routing** without page reloads
3. **API integration** with multiple backends
4. **Fallback mechanisms** (mock vs live data)
5. **Responsive design** principles
6. **Modern CSS** techniques (Grid, Flexbox, Animations)
7. **JavaScript async/await** patterns
8. **Error handling** in distributed systems

---

## 🤝 Contributing

This is a lab project. To modify:

1. Fork/copy the project
2. Make your changes
3. Test thoroughly
4. Document your changes

---

## 📄 License

Educational project for Distributed Systems Lab.

---

## 👥 Credits

**Distributed Systems Lab Project**
- All 5 modules integrated
- Modern UI/UX design
- Comprehensive functionality

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review module-specific documentation
3. Check browser console for errors
4. Verify backend servers are running

---

## 🎯 Quick Start Guide

### **For Demo/Presentation:**

1. **Open index.html** in browser
2. **Navigate through modules** using top navigation
3. **Test features** in mock mode (no backend needed)
4. **Show different roles** (Student/Admin/Warden)

### **For Full Integration:**

1. **Start all backend servers:**
   ```bash
   # Terminal 1: Module 1
   cd M1_Socket/backend && node server.js
   
   # Terminal 2: Module 2
   cd Module2_RMI_RoomInfo/backend && start-server.bat
   
   # Terminal 3: Module 3
   cd Module3_RPC && node server.js
   
   # Terminal 4: Module 5
   cd Module5_Shared_Memory && [start command]
   ```

2. **Configure endpoints** in script.js

3. **Open frontend** in browser

4. **Test all modules** with live backends

---

## ✨ Features Highlights

- 🎨 **Modern Dark Theme** with gradients
- 🚀 **Fast Navigation** between modules
- 📱 **Fully Responsive** design
- 🔄 **Real-time Updates** (Module 5)
- 💾 **Mock Data Support** for demos
- 🎯 **Role-based Views** (Student/Admin/Warden)
- 🔔 **Toast Notifications** for user feedback
- 📊 **Visual Statistics** and charts

---

**Ready to use! Open `index.html` and explore all 5 modules in one place! 🚀**
