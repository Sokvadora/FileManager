package com.filemanager.filetree.dto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
 @AllArgsConstructor

public class FileDTO {
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

    @JsonIgnore
    private String createdAt ;

    @JsonIgnore
    private String editedAt;




}
