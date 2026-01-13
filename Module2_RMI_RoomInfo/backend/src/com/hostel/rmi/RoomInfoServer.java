package com.hostel.rmi;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 * RMI Server - Hosts the Room Information Service
 */
public class RoomInfoServer {
    
    public static void main(String[] args) {
        try {
            System.out.println("=================================================");
            System.out.println("  Hostel Room Information Service - RMI Server  ");
            System.out.println("=================================================");
            System.out.println();
            
            // Create and export the remote object
            RoomInfoServiceImpl service = new RoomInfoServiceImpl();
            System.out.println("✓ Room Information Service created successfully");
            
            // Create RMI registry on port 1099
            Registry registry = LocateRegistry.createRegistry(1099);
            System.out.println("✓ RMI Registry created on port 1099");
            
            // Bind the remote object in the registry
            registry.rebind("RoomInfoService", service);
            System.out.println("✓ Service bound to registry as 'RoomInfoService'");
            
            System.out.println();
            System.out.println("=================================================");
            System.out.println("  Server is ready and waiting for requests...   ");
            System.out.println("=================================================");
            System.out.println();
            
            // Keep the server running
            Thread.currentThread().join();
            
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }
}
