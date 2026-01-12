package com.hostel.rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

/**
 * Remote interface for Room Information Service
 * Defines methods that can be invoked remotely via RMI
 */
public interface RoomInfoService extends Remote {
    
    /**
     * Get room information by room number
     * @param roomNumber The room number to search for
     * @return RoomInfo object containing room details, or null if not found
     * @throws RemoteException if RMI communication fails
     */
    RoomInfo getRoomInfo(String roomNumber) throws RemoteException;
    
    /**
     * Get list of all available room numbers
     * @return List of all room numbers in the system
     * @throws RemoteException if RMI communication fails
     */
    List<String> getAllRooms() throws RemoteException;
    
    /**
     * Get total count of rooms
     * @return Total number of rooms
     * @throws RemoteException if RMI communication fails
     */
    int getTotalRoomCount() throws RemoteException;
    
    /**
     * Search rooms by block
     * @param block The block name (e.g., "A", "B")
     * @return List of room numbers in the specified block
     * @throws RemoteException if RMI communication fails
     */
    List<String> getRoomsByBlock(String block) throws RemoteException;
}
