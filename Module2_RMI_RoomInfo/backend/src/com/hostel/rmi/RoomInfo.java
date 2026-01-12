package com.hostel.rmi;

import java.io.Serializable;
import java.util.List;

/**
 * RoomInfo class represents hostel room information
 * Implements Serializable for RMI data transfer
 */
public class RoomInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String roomNumber;
    private List<String> occupants;
    private String wardenName;
    private String wardenContact;
    private String wardenEmail;
    private String floor;
    private String block;
    
    public RoomInfo(String roomNumber, List<String> occupants, String wardenName, 
                    String wardenContact, String wardenEmail, String floor, String block) {
        this.roomNumber = roomNumber;
        this.occupants = occupants;
        this.wardenName = wardenName;
        this.wardenContact = wardenContact;
        this.wardenEmail = wardenEmail;
        this.floor = floor;
        this.block = block;
    }
    
    // Getters
    public String getRoomNumber() { return roomNumber; }
    public List<String> getOccupants() { return occupants; }
    public String getWardenName() { return wardenName; }
    public String getWardenContact() { return wardenContact; }
    public String getWardenEmail() { return wardenEmail; }
    public String getFloor() { return floor; }
    public String getBlock() { return block; }
    
    // Setters
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public void setOccupants(List<String> occupants) { this.occupants = occupants; }
    public void setWardenName(String wardenName) { this.wardenName = wardenName; }
    public void setWardenContact(String wardenContact) { this.wardenContact = wardenContact; }
    public void setWardenEmail(String wardenEmail) { this.wardenEmail = wardenEmail; }
    public void setFloor(String floor) { this.floor = floor; }
    public void setBlock(String block) { this.block = block; }
    
    @Override
    public String toString() {
        return "RoomInfo{" +
                "roomNumber='" + roomNumber + '\'' +
                ", occupants=" + occupants +
                ", wardenName='" + wardenName + '\'' +
                ", wardenContact='" + wardenContact + '\'' +
                ", wardenEmail='" + wardenEmail + '\'' +
                ", floor='" + floor + '\'' +
                ", block='" + block + '\'' +
                '}';
    }
}
