package com.filemanager.filetree.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateFileDTO {
    private String name;
    private String info;
    private String author;

    @JsonIgnore
    private String editedAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
}
