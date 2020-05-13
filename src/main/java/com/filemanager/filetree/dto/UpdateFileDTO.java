package com.filemanager.filetree.dto;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateFileDTO {
    private String name;
    private String info;
    private String author;
}
