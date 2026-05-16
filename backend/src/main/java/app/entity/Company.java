package app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private int companyId;

    @Column(name= "name", nullable = false)
    private String name;

    @Column(name= "color_hex", nullable = false)
    private String colorHex;

    public int getId(){
        return this.companyId;
    }

    public String getName(){
        return this.name;
    }

    public String getColorHex(){
        return this.colorHex;
    }

    public void setId(int id){
        this.companyId = id;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setColorHex(String colorHex){
        this.colorHex = colorHex;
    }
    
}
