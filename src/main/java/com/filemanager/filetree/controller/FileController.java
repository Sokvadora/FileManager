package com.filemanager.filetree.controller;

import com.filemanager.filetree.dto.FileDTO;
import com.filemanager.filetree.dto.UpdateFileDTO;
import com.filemanager.filetree.entity.File;
import com.filemanager.filetree.mappers.FileMapper;
import com.filemanager.filetree.service.FileService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/file")
public class FileController {

    @NotNull private final FileService fileService;

    private FileMapper fileMapper;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }


    @GetMapping()
    public List<FileDTO> getAllFiles() {
        return fileMapper.INSTANCE.toFileDTOs(fileService.getAllFiles());
    }

    @GetMapping("/{id}")
    public FileDTO getFileById(
            @PathVariable("id") final Long id) {
        Optional<File> file = Optional.ofNullable(fileService.getFileById(id));
        return fileMapper.INSTANCE.toDTO(file.orElseThrow(RuntimeException::new));
    }


    @PostMapping()
    public FileDTO saveFile(
            @RequestBody FileDTO fileDTO) {
        fileService.saveFile(fileMapper.INSTANCE.toFile(fileDTO));
        return fileDTO;
    }


    @RequestMapping(value = "updateNode")
    public UpdateFileDTO updateFileById(
            @RequestParam final Long id,
            @RequestBody UpdateFileDTO updateFileDTO) {
        File file = fileMapper.INSTANCE.toUpdateFile(updateFileDTO);
        fileService.updateFileById(id, file);
        return updateFileDTO;
    }


    @PostMapping(path = "deleteNode")
    @ResponseBody
    public void deleteFileById(
            @RequestParam final Long id) {
        fileService.deleteFileById(id);
    }


    @RequestMapping(value = "droppedNode")
    public void updateFileByParentId(
            @RequestParam final Long id,
            @RequestParam(required = false) String parentFile) {
        fileService.updateFileByParentId(id, parentFile);
    }

}
