package app.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
}
