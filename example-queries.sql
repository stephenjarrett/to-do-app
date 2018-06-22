-- select all todos
select *
from todos;

-- get one todo by id
select *
from todos
where id = 2;

-- get all pending todos
select * 
from todos
where isDone=false;

-- get all finished todos
select * 
from todos
where isDone=true;

-- search todos by title (case insensitive) - should have 0 results
select *
from todos
where title ilike '%zzzzzz%';

-- search todos by title (case insensitive) - should have 1 result
select *
from todos
where title ilike '%dishes%';

-- "uncheck" a todo
update todos
set isDone=false
where id=1;

-- "check" a todo
update todos
set isDone=true
where id=3;

-- change a todo title
update todos
set title='feed the amazing pets'
where id=3;
