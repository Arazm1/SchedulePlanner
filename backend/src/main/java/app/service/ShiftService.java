package app.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import app.entity.Company;
import app.entity.Shift;
import app.entity.User;
import app.repository.CompanyRepository;
import app.repository.ShiftRepository;
import app.repository.UserRepository;
import app.repository.WorksRepository;

@Service
public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final CompanyRepository companyRepository;
    private final WorksRepository worksRepository;
    private final UserRepository userRepository;

    
    public ShiftService(ShiftRepository shiftRepository, CompanyRepository companyRepository, WorksRepository worksRepository, UserRepository userRepository){
        this.shiftRepository = shiftRepository;
        this.companyRepository = companyRepository;
        this.worksRepository = worksRepository;
        this.userRepository = userRepository;
    }


    public Shift createShift(String shiftName, String shiftInfo, String shiftNotes, LocalDateTime startTime, LocalDateTime endTime, Integer userID, Integer companyID){
        try{
            User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userID));

            Company company = companyRepository.findById(companyID)
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + companyID));


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
        catch(Error e){
            e.printStackTrace();
            return null;
        }
    }

    
}
