package com.filemanager.filetree.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;


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
    private String shortName;

    @JsonIgnore
    private LocalDateTime editedAt  = LocalDateTime.now();
}
