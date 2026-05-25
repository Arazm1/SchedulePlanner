package app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import app.entity.Company;
import app.entity.User;
import app.entity.Works;
import app.entity.WorksId;
import app.repository.CompanyRepository;
import app.repository.UserRepository;
import app.repository.WorksRepository;

/**
 * Service class for managing Company entities.
 * 
 * Handles business logic for creating companies and retrieving companies associated with
 * a specific user via the Works join table.
 */
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final WorksRepository worksRepository;
    private final UserRepository userRepository;

    public CompanyService(CompanyRepository companyRepository, WorksRepository worksRepository, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.worksRepository = worksRepository;
        this.userRepository = userRepository;
    }

    /**
     * Creates a new Company and links it to the specified user.
     * 
     * @param name the name of the Company.
     * @param colorHex the hex color code for the Company displayed on the website.
     * @param userID the ID of the User creating the Company. It must refer to an existing User.
     * 
     * @return newly created and persisted Company.
     */
    public Company createCompany(String name, String colorHex, Integer userID){
        try{
            User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userID));

            Company company = new Company();
            company.setName(name);
            company.setColorHex(colorHex != null ? colorHex : "#404349");
            companyRepository.save(company);

            WorksId worksId = new WorksId();
            worksId.setCompanyId(company.getId());
            worksId.setUserId(userID);


            Works works = new Works();
            works.setId(worksId);
            works.setCompany(company);
            works.setUser(user);
            worksRepository.save(works);

            return company;
    
        }
        catch(Error e){
            e.printStackTrace();
            return null;
        }
    }


    /**
     * Retrieves all Companies associated with the given User.
     * Looks up all Works entries for the User and maps them to their corresponding
     * Company entities.
     * 
     * @param userID the ID of the User whose Companies are to be retrieved.
     * 
     * @return a List of Company objects the User belongs to.
     */
    public List<Company> getCompaniesForUser(Integer userID){
        return worksRepository.findByUser_Id(userID).stream().map(Works::getCompany).toList();
    }

}
