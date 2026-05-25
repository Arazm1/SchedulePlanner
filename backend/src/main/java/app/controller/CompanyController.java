package app.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Company;
import app.repository.UserRepository;
import app.service.CompanyService;

@RestController
@RequestMapping("api/v1/companies")
public class CompanyController {

    private final CompanyService companyService;
    private final UserRepository userRepository;


    public CompanyController(CompanyService companyService, UserRepository userRepository){
        this.companyService = companyService;
        this.userRepository = userRepository;
    }


    @PostMapping
    public ResponseEntity<?> createCompany(@RequestBody Map<String, String> body, Principal principal){
        try{
            Integer userID = userRepository.findByUsername(principal.getName())
                    .orElseThrow(() -> new RuntimeException("User not found")).getId();

            Company company = companyService.createCompany(body.get("name"), body.get("colorHex"), userID);
            return ResponseEntity.ok(company);

        }
        catch(RuntimeException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(Map.of("Error", e.getMessage()));
        }
    }


    @GetMapping
    public ResponseEntity<List<Company>> getCompanies(Principal principal){
        Integer userID = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found")).getId();

        return ResponseEntity.ok(companyService.getCompaniesForUser(userID));
    }
    
}
