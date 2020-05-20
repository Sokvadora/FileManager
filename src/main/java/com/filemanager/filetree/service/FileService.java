package com.filemanager.filetree.service;


import com.filemanager.filetree.entity.File;

import java.util.List;

public interface FileService {

    List<File> getAllFiles();


    File getFileById(Long id);

    File saveFile(File file);


    File updateFileById(Long id, File fileToUpdate);

    void deleteFileById(Long id);


  File updateFileByParentId(Long id, File fileToUpdate);


}