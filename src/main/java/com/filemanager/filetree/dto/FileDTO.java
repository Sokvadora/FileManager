package com.filemanager.filetree.dto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.filemanager.filetree.entity.File;

import lombok.*;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;


import java.text.SimpleDateFormat;
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



   // @JsonIgnore
    private String createdAt = new SimpleDateFormat("dd.MM.yyyy HH:mm")
            .format(Calendar.getInstance().getTime());


   // @JsonIgnore
    private String editedAt = new SimpleDateFormat("dd.MM.yyyy HH:mm")
           .format(Calendar.getInstance().getTime());


}
