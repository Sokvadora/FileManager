
-- insert into File_Table values(1,'Ellen','20.04.20','folder','', null,'','This is folder',false,'Folder', 'meFolder',null,20);

--insert into File_Table values(2,'Ellen','21.04.20','file','', 1,'','info',true,'File', 'meFile',1,20);

-- alter table File_Table
--     add column published boolean not null default false;

--insert into File_Table values(1,'Ellen', systimestamp,systimestamp,'10.05.1997', 'folder','',1,'','info', false,'Folder','MyFolder',null,20);

-- alter table File_Table
--    add column created_at  timestamp without time zone   default now();
--   alter table File_Table
--   add column edited_at timestamp without time zone   default now();

  --D  	AUTHOR  	FDATE  	FILE_TYPE  	GLYPH  	GROUP_ID  	HREF  	INFO  	LEAF  	MTYPE  	NAME  	PARENT_ID  	SIZE  	CREATED_AT

insert into File_Table values(1,'Ellen', '2020-05-14 15:56:19','2020-05-14 15:56:19','10.05.1997', 'folder','',1,'','info', false,'Folder','MyFolder',null,20);

-- alter table File_Table
--   add column created_at timestamp without time zone not null default now();
--   alter table File_Table
--   add column edited_at timestamp without time zone not null default now();


