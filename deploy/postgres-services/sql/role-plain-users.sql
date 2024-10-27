-- Migrations will appear here as you chat with AI
create table roles (
   id SERIAL PRIMARY KEY,
   name varchar not null
);

create table users (
  id SERIAL PRIMARY KEY,
  firstname varchar not null,
  lastname varchar not null,
  email varchar not null,
  password varchar not null,
  is_active boolean NOT NULL DEFAULT true,
  roleid bigint NOT NULL DEFAULT 6,
  FOREIGN KEY (roleid) REFERENCES roles(id)
);

insert into
  roles (id,name)
values
  (1,'Admin'),
  (2,'Editor'),
  (3,'Viewer'),
  (4,'Contributor'),
  (5,'Guest'),
  (6,'Anonymous');

-- Insert sample data into users
insert into
  users (id,firstname,lastname, email, password , is_active, roleid)
values
  (1,'John','Doe','johndoe@domain.com','password_secret',true,1),
  (2,'Joe','Smith','joesmith@domain.com','secret',true,1),
  (3,'Alice','white','alicewhite@domain.com','secret',true,1),
  (4,'Bob','Smith','bobsmith@domain.com','secret',true ,2),
  (5,'Carol', 'Dominguez','caroldominguez@domain.com','secret', true,3),
  (6,'David', 'Cameron', 'davidcameron@domain.com','secret',true ,4),
  (7,'Evelin', 'Verne', 'evelinverne@domain.com','secret',true,5);