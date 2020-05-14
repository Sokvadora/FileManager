package com.filemanager.filetree.mappers;

import com.filemanager.filetree.dto.FileDTO;
import com.filemanager.filetree.entity.File;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface FileMapper {

    FileMapper INSTANCE = Mappers.getMapper( FileMapper.class );
    FileDTO toDTO(File file);

    List<FileDTO> toFileDTOs(List<File> files);

    File toFile(FileDTO fileDTO);


}
