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
    private String href;

    @JsonIgnore
    private String editedAt = new SimpleDateFormat("dd.MM.yyyy HH:mm")
            .format(Calendar.getInstance().getTime());
}
