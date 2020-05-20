package com.filemanager.filetree.mappers;


import com.filemanager.filetree.dto.DroppedFileDTO;

import com.filemanager.filetree.entity.File;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DroppedFileMapper {
    DroppedFileMapper INSTANCE = Mappers.getMapper(DroppedFileMapper.class);

    File toDroppedFile(DroppedFileDTO droppedFileDTO);


}
