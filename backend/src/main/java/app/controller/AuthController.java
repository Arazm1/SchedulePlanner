package app.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.dto.LoginRequest;
import app.dto.RegisterRequest;
import app.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }
    
    //@CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        try{
            String token = authService.login(loginRequest);
            return ResponseEntity.ok(Map.of("token", token));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
        try{
            String message = authService.register(registerRequest);
            return ResponseEntity.ok(Map.of("message", message));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
    
}