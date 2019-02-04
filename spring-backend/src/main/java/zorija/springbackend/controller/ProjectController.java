package zorija.springbackend.controller;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import zorija.springbackend.model.Project;
import zorija.springbackend.repository.ProjectRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController("/")
@CrossOrigin
public class ProjectController {

    private ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public ResponseEntity<List<Project>> findAll() {
        return new ResponseEntity<>(projectRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> findById(@PathVariable int id) {
        Optional<Project> project = projectRepository.findById(id);
        if (!(project).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(project.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> create(@Valid @RequestBody Project project, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        int nextId = projectRepository.findAll(sort).stream().findFirst().map(ot -> ot.getId() + 1).orElse(1);
        project.setId(nextId);
        projectRepository.save(project);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable int id, @Valid @RequestBody Project project, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        if (!(projectRepository.findById(id)).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        project.setId(id);
        projectRepository.save(project);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> delete(@PathVariable int id) {
        if (!projectRepository.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        projectRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
