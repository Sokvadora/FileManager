package com.filemanager.filetree.service;


import com.filemanager.filetree.entity.File;
import com.filemanager.filetree.repository.FileRepository;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    @NotNull
    private final FileRepository fileRepository;


    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public List<File> getAllFiles() {
        return (List<File>) fileRepository.findAll();
    }


    @Override
    public File getFileById(final Long id) {
        return fileRepository.findById(id).orElseThrow(() -> new IllegalStateException("Something wrong with file Id"));
    }

    @Override
    public File saveFile(final File file) {
        return fileRepository.save(file);
    }

    @Override
    public File updateFileById(final Long id, final File fileToUpdate) {
        final File file = fileRepository.findById(id).orElseThrow(RuntimeException::new);
        file.setName(fileToUpdate.getName());
        file.setInfo(fileToUpdate.getInfo());
        file.setAuthor(fileToUpdate.getAuthor());
        file.setHref(fileToUpdate.getHref());
        file.setShortName(fileToUpdate.getShortName());
        file.setEditedAt(fileToUpdate.getEditedAt());
        fileRepository.save(file);
        return file;
    }

    @Override
    public void deleteFileById(final Long id) {
        fileRepository.deleteById(id);
    }


    @Override
    public File updateFileByParentId(final Long id, final String fileToUpdate) {
        final File file = fileRepository.findById(id).orElseThrow(() -> new IllegalStateException("Something wrong with file Id"));
        file.setParentId(fileToUpdate);
        fileRepository.save(file);
        return file;
    }
}




