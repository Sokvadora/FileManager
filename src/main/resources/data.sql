
-- alter table File_Table
--    add column created_at  timestamp without time zone   default now();
--   alter table File_Table
--   add column edited_at timestamp without time zone   default now();


insert into File_Table values(1,'Ellen', '20.04.2020 12:13','20.04.2020 15:00', 'folder','','','info', false,'Folder','MyFolder',null,null);

insert into File_Table values(2,'Ellen', '27.04.2020 10:25','27.04.2020 10:25', 'file','','','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non dapibus eros. ' ||
 'Duis eget orci a sem efficitur convallis a eget augue. Nulla ut sollicitudin nisi. In ac ullamcorper dui. Sed feugiat ullamcorper velit', true,'File','MyFile',1,'20MB');

insert into File_Table values(3,'Ellen', '27.04.2020 10:25','27.04.2020 10:25', 'link', 'glyph','https://github.com','info', true,'Href','https://github.com/',null,'5MB');
