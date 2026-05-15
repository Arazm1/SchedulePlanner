package app.service;

import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import app.dto.LoginRequest;
import app.entity.User;
import app.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String SECRET = "your_secret_key";

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        /*
        if(!user.getPassword().equals(loginRequest.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        */
       if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
        throw new RuntimeException("Invalid password");
       }

        return JWT.create()
            .withSubject(user.getUsername())
            .withClaim("role", user.getRole())
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
            .sign(Algorithm.HMAC256(SECRET));
    }
}
