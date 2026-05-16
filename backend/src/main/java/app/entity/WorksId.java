package app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class WorksId implements Serializable {

    @Column(name = "company_id")
    private int companyId;

    @Column(name = "user_id")
    private int userId;

    public int getCompanyId() {
        return this.companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public int getUserId() {
        return this.userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WorksId)) return false;
        WorksId worksId = (WorksId) o;
        return companyId == worksId.companyId && userId == worksId.userId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(companyId, userId);
    }
}