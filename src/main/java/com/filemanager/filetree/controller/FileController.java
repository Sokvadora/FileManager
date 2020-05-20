package com.filemanager.filetree.controller;

import com.filemanager.filetree.dto.DroppedFileDTO;
import com.filemanager.filetree.dto.FileDTO;
import com.filemanager.filetree.dto.UpdateFileDTO;
import com.filemanager.filetree.entity.File;
import com.filemanager.filetree.mappers.DroppedFileMapper;
import com.filemanager.filetree.mappers.FileMapper;
import com.filemanager.filetree.mappers.UpdateFileMapper;
import com.filemanager.filetree.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FileService fileService;


    private FileMapper fileMapper;
    private UpdateFileMapper updateFileMapper;
    private DroppedFileMapper droppedFileMapper;

    @GetMapping()
    public List<FileDTO> getAllFiles() {
        return fileMapper.INSTANCE.toFileDTOs(fileService.getAllFiles());
    }


    @GetMapping("/{id}")
    public FileDTO getFileById(
            @PathVariable("id") final Long id) {
        Optional<File> file = Optional.ofNullable(fileService.getFileById(id));
        return fileMapper.INSTANCE.toDTO(file.get());
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
        File file = updateFileMapper.INSTANCE.toUpdateFile(updateFileDTO);
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
    public DroppedFileDTO updateFileByParentId(
            @RequestParam final Long id,
            @RequestBody DroppedFileDTO droppedFileDTO) {
        File file = droppedFileMapper.INSTANCE.toDroppedFile(droppedFileDTO);
        fileService.updateFileByParentId(id, file);
        return droppedFileDTO;
    }


}
