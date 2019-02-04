package zorija.springbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import zorija.springbackend.model.Project;

public interface ProjectRepository extends MongoRepository<Project, Integer> {

}
