package com.filemanager.filetree.mappers;


import com.filemanager.filetree.dto.UpdateFileDTO;
import com.filemanager.filetree.entity.File;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UpdateFileMapper {
    UpdateFileMapper INSTANCE = Mappers.getMapper(UpdateFileMapper.class);

    UpdateFileDTO toDTO(File file);

    File toUpdateFile(UpdateFileDTO updateFileDTO);
}
