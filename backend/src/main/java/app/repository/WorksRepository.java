package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.entity.Works;
import app.entity.WorksId;

@Repository
public interface WorksRepository extends JpaRepository<Works, WorksId>{
    List<Works> findByUser_Id(Integer userId);
}
