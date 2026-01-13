package com.hostel.rmi;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.List;
import java.util.Scanner;

/**
 * RMI Client - For testing the Room Information Service
 */
public class RoomInfoClient {
    
    public static void main(String[] args) {
        try {
            System.out.println("=================================================");
            System.out.println("  Hostel Room Information Service - RMI Client  ");
            System.out.println("=================================================");
            System.out.println();
            
            // Get the registry
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);
            System.out.println("✓ Connected to RMI Registry");
            
            // Look up the remote service
            RoomInfoService service = (RoomInfoService) registry.lookup("RoomInfoService");
            System.out.println("✓ Room Information Service located");
            System.out.println();
            
            Scanner scanner = new Scanner(System.in);
            
            while (true) {
                System.out.println("\n--- Menu ---");
                System.out.println("1. Search Room by Number");
                System.out.println("2. View All Rooms");
                System.out.println("3. Get Total Room Count");
                System.out.println("4. Search Rooms by Block");
                System.out.println("5. Exit");
                System.out.print("Enter your choice: ");
                
                int choice = scanner.nextInt();
                scanner.nextLine(); // Consume newline
                
                switch (choice) {
                    case 1:
                        System.out.print("Enter room number: ");
                        String roomNumber = scanner.nextLine();
                        RoomInfo info = service.getRoomInfo(roomNumber);
                        
                        if (info != null) {
                            System.out.println("\n--- Room Information ---");
                            System.out.println("Room Number: " + info.getRoomNumber());
                            System.out.println("Block: " + info.getBlock());
                            System.out.println("Floor: " + info.getFloor());
                            System.out.println("Occupants: " + String.join(", ", info.getOccupants()));
                            System.out.println("\n--- Warden Details ---");
                            System.out.println("Name: " + info.getWardenName());
                            System.out.println("Contact: " + info.getWardenContact());
                            System.out.println("Email: " + info.getWardenEmail());
                        } else {
                            System.out.println("❌ Room not found!");
                        }
                        break;
                        
                    case 2:
                        List<String> allRooms = service.getAllRooms();
                        System.out.println("\n--- All Rooms ---");
                        System.out.println("Total Rooms: " + allRooms.size());
                        for (String room : allRooms) {
                            System.out.println("  • " + room);
                        }
                        break;
                        
                    case 3:
                        int count = service.getTotalRoomCount();
                        System.out.println("\nTotal Rooms in System: " + count);
                        break;
                        
                    case 4:
                        System.out.print("Enter block (A, B, C): ");
                        String block = scanner.nextLine();
                        List<String> blockRooms = service.getRoomsByBlock(block);
                        System.out.println("\n--- Rooms in Block " + block + " ---");
                        if (blockRooms.isEmpty()) {
                            System.out.println("No rooms found in this block.");
                        } else {
                            for (String room : blockRooms) {
                                System.out.println("  • " + room);
                            }
                        }
                        break;
                        
                    case 5:
                        System.out.println("Exiting... Goodbye!");
                        scanner.close();
                        System.exit(0);
                        break;
                        
                    default:
                        System.out.println("Invalid choice! Please try again.");
                }
            }
            
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }
}
