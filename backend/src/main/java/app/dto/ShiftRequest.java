package app.dto;

import java.time.LocalDateTime;

/**
 * DTO for incoming Shift creation requests.
 * 
 * Captures the client-provided fields from the request body.
 */
public class ShiftRequest {
    private String shiftName;
    private String shiftInfo;
    private String shiftNotes;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer companyID;

    public String getShiftName() {
        return this.shiftName;
    }

    public void setShiftName(String shiftName) {
        this.shiftName = shiftName;
    }

    public String getShiftInfo() {
        return this.shiftInfo;
    }

    public void setShiftInfo(String shiftInfo) {
        this.shiftInfo = shiftInfo;
    }

    public String getShiftNotes() {
        return this.shiftNotes;
    }

    public void setShiftNotes(String shiftNotes) {
        this.shiftNotes = shiftNotes;
    }

    public LocalDateTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return this.endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Integer getCompanyID() {
        return this.companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }
}