package com.filemanager.filetree.dto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.filemanager.filetree.entity.File;
import com.sun.istack.NotNull;
import lombok.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Set;

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
    private Set<File> children;
    
    @JsonIgnore
    private String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

    @JsonIgnore
    private String editedAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());




}
