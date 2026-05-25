package app.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.dto.ShiftRequest;
import app.entity.Shift;
import app.repository.UserRepository;
import app.service.ShiftService;

@RestController
@RequestMapping("api/v1/shifts")
public class ShiftController {

    private final ShiftService shiftService;
    private final UserRepository userRepository;

    public ShiftController(ShiftService shiftService, UserRepository userRepository){
        this.shiftService = shiftService;
        this.userRepository = userRepository;
    }

    
    @GetMapping
    public ResponseEntity<List<Shift>> getShifts(Principal principal){
        Integer userID = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found")).getId();

        return ResponseEntity.ok(shiftService.getShiftsForUser(userID));
    }

    @PostMapping
    public ResponseEntity<?> createShift(@RequestBody ShiftRequest shiftRequest, Principal principal){
        try{
            Integer userID = userRepository.findByUsername(principal.getName())
                                            .orElseThrow(() -> new RuntimeException("User not found")).getId();
            
            Shift shift = shiftService.createShift(
                                shiftRequest.getShiftName(), 
                                shiftRequest.getShiftInfo(), 
                                shiftRequest.getShiftNotes(), 
                                shiftRequest.getStartTime(), 
                                shiftRequest.getEndTime(), 
                                userID, 
                                shiftRequest.getCompanyID()
                            );
            
            return ResponseEntity.ok(shift);

        }
        catch(RuntimeException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(Map.of("Error ", e.getMessage()));
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }


    @PutMapping("/{shiftID}")
    public ResponseEntity<?> updateShift(@PathVariable Integer shiftID, @RequestBody ShiftRequest shiftRequest, Principal principal){
        try{
            Shift shift = shiftService.updateShift(
                                shiftID,
                                shiftRequest.getShiftName(),
                                shiftRequest.getShiftInfo(), 
                                shiftRequest.getShiftNotes(), 
                                shiftRequest.getStartTime(), 
                                shiftRequest.getEndTime(), 
                                shiftRequest.getCompanyID()
                            );
            return ResponseEntity.ok(shift);

        }
        catch(RuntimeException e){
            return ResponseEntity.status(400).body(Map.of("Error ", e.getMessage()));
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }


    @DeleteMapping("/{shiftID}")
    public ResponseEntity<?> deleteShift(@PathVariable Integer shiftID, Principal principal){
        try{
            Shift shift = shiftService.deleteShift(shiftID);
            return ResponseEntity.ok(Map.of("message", "Shift deleted successfully"));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(400).body(Map.of("Error", e.getMessage()));
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    
}
