package com.filemanager.filetree.repository;

import com.filemanager.filetree.entity.File;
import org.springframework.data.repository.CrudRepository;


public interface FileRepository extends CrudRepository<File, Long> {

}

