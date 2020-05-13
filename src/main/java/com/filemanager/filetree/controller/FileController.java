package com.filemanager.filetree.controller;

import com.filemanager.filetree.dto.FileDTO;
import com.filemanager.filetree.entity.File;
import com.filemanager.filetree.mappers.FileMapper;
import com.filemanager.filetree.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FileService fileService;


    @GetMapping()
    public List<File> getAllFiles() {
        List<File> fileList = fileService.getAllFiles();
        return fileList;
    }


    @GetMapping("/{id}")
    public FileDTO getFileById(
            @PathVariable("id") final Long id) {
        File file = fileService.getFileById(id);
        return FileMapper.INSTANCE.toDTO(file);
    }

    @PostMapping()
    public FileDTO saveFile(
            @RequestBody final File file) {
        File savedFile = fileService.saveFile(file);
        return FileMapper.INSTANCE.toDTO(savedFile);
    }

    @RequestMapping(value = "updateNode")
    public File updateFileById(
            @RequestParam final Long id,
            @RequestBody final File fileToUpdate) {
        return fileService.updateFileById(id, fileToUpdate);
    }


    @PostMapping(path = "deleteNode")
    @ResponseBody
    public void deleteFileById(
            @RequestParam final Long id) {
        fileService.deleteFileById(id);
    }



}
