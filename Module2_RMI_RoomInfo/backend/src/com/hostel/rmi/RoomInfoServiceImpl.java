package com.hostel.rmi;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Implementation of RoomInfoService
 * Manages in-memory storage of room information
 */
public class RoomInfoServiceImpl extends UnicastRemoteObject implements RoomInfoService {
    
    // In-memory storage using HashMap
    private Map<String, RoomInfo> roomDatabase;
    
    /**
     * Constructor - initializes the service and loads sample data
     */
    public RoomInfoServiceImpl() throws RemoteException {
        super();
        roomDatabase = new HashMap<>();
        initializeSampleData();
    }
    
    /**
     * Initialize sample room data
     */
    private void initializeSampleData() {
        System.out.println("Initializing sample room data...");
        
        // Block A - Ground Floor
        roomDatabase.put("A101", new RoomInfo(
            "A101",
            Arrays.asList("Rahul Sharma", "Amit Kumar"),
            "Dr. Rajesh Verma",
            "+91-9876543210",
            "rajesh.verma@hostel.edu",
            "Ground Floor",
            "A"
        ));
        
        roomDatabase.put("A102", new RoomInfo(
            "A102",
            Arrays.asList("Priya Singh", "Sneha Patel", "Anjali Reddy"),
            "Dr. Rajesh Verma",
            "+91-9876543210",
            "rajesh.verma@hostel.edu",
            "Ground Floor",
            "A"
        ));
        
        roomDatabase.put("A103", new RoomInfo(
            "A103",
            Arrays.asList("Vikram Joshi", "Karthik Rao"),
            "Dr. Rajesh Verma",
            "+91-9876543210",
            "rajesh.verma@hostel.edu",
            "Ground Floor",
            "A"
        ));
        
        // Block B - First Floor
        roomDatabase.put("B201", new RoomInfo(
            "B201",
            Arrays.asList("Neha Gupta", "Pooja Iyer"),
            "Prof. Sunita Mehta",
            "+91-9876543211",
            "sunita.mehta@hostel.edu",
            "First Floor",
            "B"
        ));
        
        roomDatabase.put("B202", new RoomInfo(
            "B202",
            Arrays.asList("Arjun Nair", "Rohan Das", "Suresh Pillai"),
            "Prof. Sunita Mehta",
            "+91-9876543211",
            "sunita.mehta@hostel.edu",
            "First Floor",
            "B"
        ));
        
        roomDatabase.put("B203", new RoomInfo(
            "B203",
            Arrays.asList("Divya Krishnan", "Meera Nambiar"),
            "Prof. Sunita Mehta",
            "+91-9876543211",
            "sunita.mehta@hostel.edu",
            "First Floor",
            "B"
        ));
        
        // Block C - Second Floor
        roomDatabase.put("C301", new RoomInfo(
            "C301",
            Arrays.asList("Aditya Malhotra", "Siddharth Chopra"),
            "Dr. Anil Kumar",
            "+91-9876543212",
            "anil.kumar@hostel.edu",
            "Second Floor",
            "C"
        ));
        
        roomDatabase.put("C302", new RoomInfo(
            "C302",
            Arrays.asList("Kavya Menon", "Riya Shah", "Tanvi Desai"),
            "Dr. Anil Kumar",
            "+91-9876543212",
            "anil.kumar@hostel.edu",
            "Second Floor",
            "C"
        ));
        
        System.out.println("Sample data initialized: " + roomDatabase.size() + " rooms loaded.");
    }
    
    @Override
    public RoomInfo getRoomInfo(String roomNumber) throws RemoteException {
        System.out.println("Request received for room: " + roomNumber);
        RoomInfo info = roomDatabase.get(roomNumber.toUpperCase());
        
        if (info != null) {
            System.out.println("Room found: " + info);
        } else {
            System.out.println("Room not found: " + roomNumber);
        }
        
        return info;
    }
    
    @Override
    public List<String> getAllRooms() throws RemoteException {
        System.out.println("Request received for all rooms");
        List<String> rooms = new ArrayList<>(roomDatabase.keySet());
        Collections.sort(rooms);
        return rooms;
    }
    
    @Override
    public int getTotalRoomCount() throws RemoteException {
        System.out.println("Request received for total room count");
        return roomDatabase.size();
    }
    
    @Override
    public List<String> getRoomsByBlock(String block) throws RemoteException {
        System.out.println("Request received for rooms in block: " + block);
        return roomDatabase.values().stream()
            .filter(room -> room.getBlock().equalsIgnoreCase(block))
            .map(RoomInfo::getRoomNumber)
            .sorted()
            .collect(Collectors.toList());
    }
}
