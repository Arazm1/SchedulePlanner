package app.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.entity.Shift;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Integer>{
    List<Shift> findAllShiftsByUserId(Integer userID);

    @Query("SELECT s FROM Shift s WHERE s.user.id = :userId AND s.startTime < :endTime AND s.endTime > :startTime")
    List<Shift> findOverlappingShifts(@Param("userId") Integer userId,
                                   @Param("startTime") LocalDateTime startTime,
                                   @Param("endTime") LocalDateTime endTime);
    
}
