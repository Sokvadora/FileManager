package com.filemanager.filetree.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.filemanager.filetree.entity.File;

import lombok.*;
import java.time.*;
import java.util.Set;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class FileDTO<formatter> {
    private Long id;
    private String mtype;
    private String name;
    private Boolean leaf;
    private String groupId;
    private String info;
    private String fdate;
    private String fileType;
    private String href;
    private String glyph;
    private String size;
    private String parentId;
    private String author;
    private String shortName;
    private Set<File> children;

    @JsonIgnore
    private LocalDateTime createdAt = LocalDateTime.now();

    @JsonIgnore
    private LocalDateTime editedAt  = LocalDateTime.now();

}
