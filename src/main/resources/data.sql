
-- alter table File_Table
--    add column created_at  timestamp without time zone   default now();
--   alter table File_Table
--   add column edited_at timestamp without time zone   default now();



insert into File_Table values(1,'Ellen', '2020-05-14 15:56:19','2020-05-14 15:56:19','10.05.1997', 'folder','',1,'','info', false,'Folder','MyFolder',null,20);

insert into File_Table values(2,'Ellen', '2020-05-14 15:56:19','2020-05-14 15:56:19','10.05.1997', 'file','',1,'','info', true,'File','MyFile',1,20);

