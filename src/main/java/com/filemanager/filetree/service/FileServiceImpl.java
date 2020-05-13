package com.filemanager.filetree.service;

import com.filemanager.filetree.entity.File;
import com.filemanager.filetree.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileServiceImpl implements FileService {
    @Autowired
    private FileRepository fileRepository;

    @Override
    public List<File> getAllFiles() {
        return (List<File>) fileRepository.findAll();
    }

    @Override
    public File getFileById(final Long id) {
        return fileRepository.findById(id).get();
    }

    @Override
    public File saveFile(final File file) {
        return fileRepository.save(file);
    }

    @Override
    public File updateFileById(
            final Long id, final File fileToUpdate) {
        // Fetch the File from db
        File fileFromDb = fileRepository.findById(id).get();
        fileFromDb.setName(fileToUpdate.getName());
        fileFromDb.setInfo(fileToUpdate.getInfo());
        fileFromDb.setAuthor(fileToUpdate.getAuthor());
        return fileRepository.save(fileFromDb);
    }

    @Override
    public void deleteFileById(final Long id) {
        fileRepository.deleteById(id);
    }

}