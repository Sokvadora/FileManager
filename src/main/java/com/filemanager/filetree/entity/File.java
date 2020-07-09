package com.filemanager.filetree.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.time.*;
import javax.persistence.*;
import java.io.Serializable;

import java.util.*;


/**
 * File Entity Class.
 */

@Getter
@Setter
//@AllArgsConstructor
@Entity
@Table(name = "FileTable")
public class File implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "mtype")
    private String mtype;

    @Column(name = "name")
    private String name;

    @Column(name = "leaf")
    private Boolean leaf;

    @Column(name = "info", length = 500)
    private String info;

    @Column(name = "fileType")
    private String fileType;

    @Column(name = "href")
    private String href;

    @Column(name = "glyph")
    private String glyph;

    @Column(name = "size")
    private String size;


    @Column(name = "parentId")
    @Nullable
    private String parentId;

    @OneToMany(mappedBy = "parentId", cascade = CascadeType.REMOVE)
    private Set<File> children = new LinkedHashSet<>();

    @Column(name = "author")
    private String author;

    @Column(name = "shortName")
    private String shortName;

    @NotNull
    private LocalDateTime createdAt;

    @NotNull
    private LocalDateTime editedAt;
}




