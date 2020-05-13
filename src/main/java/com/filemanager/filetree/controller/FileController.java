package com.filemanager.filetree.controller;

import com.filemanager.filetree.entity.File;
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
    public ResponseEntity<List<File>> getAllFiles() {
        List<File> fileList = fileService.getAllFiles();
        return new ResponseEntity<>(fileList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<File> getFileById(
            @PathVariable("id") final Long id) {
        File file = fileService.getFileById(id);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }


    @PostMapping()
    public File saveFile(
            @RequestBody final File file) {
        return fileService.saveFile(file);
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
