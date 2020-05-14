package com.filemanager.filetree.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @Column(name = "groupId")
    private String groupId;

    @Column(name = "info")
    private String info;

    @Column(name = "fdate")
    private String fdate;

    @Column(name = "fileType")
    private String fileType;

    @Column(name = "href")
    private String href;

    @Column(name = "glyph")
    private String glyph;

    @Column(name = "size")
    private String size;

    @Column(name = "parentId")
    private String parentId;

    @OneToMany(mappedBy = "parentId", cascade = CascadeType.REMOVE)
    private Set<File> children = new LinkedHashSet<>();

    @Column(name = "author")
    private String author;



    @NotNull
    private String createdAt;
            //= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

    @NotNull
    private String editedAt;
    //= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());




//    public Long getId() {
//        return id;
//    }
//
//    public void setId(final Long idA) {
//        this.id = idA;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(final String nameA) {
//        this.name = nameA;
//    }
//
//    public String getMtype() {
//        return mtype;
//    }
//
//    public void setMtype(final String mtypeA) {
//        this.mtype = mtypeA;
//    }
//
//    public Boolean getLeaf() {
//        return leaf;
//    }
//
//    public void setLeaf(final Boolean leafA) {
//        this.leaf = leafA;
//    }
//
//    public String getGroupId() {
//        return groupId;
//    }
//
//    public void setGroupId(final String groupIdA) {
//        this.groupId = groupIdA;
//    }
//
//    public String getInfo() {
//        return info;
//    }
//
//    public void setInfo(final String infoA) {
//        this.info = infoA;
//    }
//
//    public String getFdate() {
//        return fdate;
//    }
//
//    public void setFdate(final String fdateA) {
//        this.fdate = fdateA;
//    }
//
//    public String getFileType() {
//        return fileType;
//    }
//
//    public void setFileType(final String fileTypeA) {
//        this.fileType = fileTypeA;
//    }
//
//    public String getHref() {
//        return href;
//    }
//
//    public void setHref(final String hrefA) {
//        this.href = hrefA;
//    }
//
//    public String getGlyph() {
//        return glyph;
//    }
//
//    public void setGlyph(final String glyphA) {
//        this.glyph = glyphA;
//    }
//
//    public String getSize() {
//        return size;
//    }
//
//    public void setSize(final String sizeA) {
//        this.size = sizeA;
//    }
//
//    public String getParentId() {
//        return parentId;
//    }
//
//    public void setParentId(final String parentIdA) {
//        this.parentId = parentIdA;
//    }
//
//
//    public String getAuthor() {
//        return author;
//    }
//
//    public void setAuthor(final String authorA) {
//        this.author = authorA;
//    }
//

//    public Set<File> getChildren() {
//        return children;
//    }
//
//    public void setChildren(final Set<File> childrenA) {
//        this.children = childrenA;
//    }
}




