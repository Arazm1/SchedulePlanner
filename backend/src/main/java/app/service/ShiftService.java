package app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import app.entity.Company;
import app.entity.Shift;
import app.entity.User;
import app.repository.CompanyRepository;
import app.repository.ShiftRepository;
import app.repository.UserRepository;

@Service
public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    
    public ShiftService(ShiftRepository shiftRepository, CompanyRepository companyRepository, UserRepository userRepository){
        this.shiftRepository = shiftRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }


    public Shift createShift(String shiftName, String shiftInfo, String shiftNotes, LocalDateTime startTime, LocalDateTime endTime, Integer userID, Integer companyID){
        try{
            User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userID));

            Company company = companyRepository.findById(companyID)
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + companyID));

            List<Shift> conflicts = shiftRepository.findOverlappingShifts(userID, startTime, endTime);
            if(!conflicts.isEmpty()){
                throw new RuntimeException("Shift conflicts with an existing shift at: " + conflicts.get(0).getCompany().getName());
            }


            Shift shift = new Shift();
            shift.setShiftName(shiftName);
            shift.setShiftInfo(shiftInfo);
            shift.setShiftNotes(shiftNotes);
            shift.setStartTime(startTime);
            shift.setEndTime(endTime);
            shift.setUser(user);
            shift.setCompany(company);

            shiftRepository.save(shift);
            return shift;

        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Shift> getShiftsForUser(Integer userID){
        return shiftRepository.findAllShiftsByUserId(userID);
    }


    public Shift deleteShift(Integer shiftID){
        try{
            Shift shift = shiftRepository.findById(shiftID).orElseThrow(() -> new RuntimeException("Shift not found with ID: " + shiftID));
            
            shiftRepository.delete(shift);
            return shift;
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public Shift updateShift(Integer shiftID, String shiftName, String shiftInfo, String shiftNotes, LocalDateTime startTime, LocalDateTime endTime, Integer companyID){
        
        Shift shift = shiftRepository.findById(shiftID)
                                        .orElseThrow(() -> new RuntimeException("Shift not found with ID: " + shiftID));

        Company company = companyRepository.findById(companyID)
                                            .orElseThrow(() -> new RuntimeException("Company not found with ID: " + companyID));
        
        shift.setShiftName(shiftName);
        shift.setShiftInfo(shiftInfo);
        shift.setShiftNotes(shiftNotes);
        shift.setStartTime(startTime);
        shift.setEndTime(endTime);
        shift.setCompany(company);

        shiftRepository.save(shift);
        return shift;
    }
}
