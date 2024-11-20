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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active boolean NOT NULL DEFAULT true,
  role_id bigint NOT NULL DEFAULT 6,
  FOREIGN KEY (role_id) REFERENCES roles(id)
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
  users (id,firstname,lastname, email, password, created_at, updated_at, is_active, role_id)
values
  (1,'John','Doe','johndoe@domain.com','password_secret','2024-09-20 18:21:00.082648+00','2024-09-20 18:21:00.082648+00',true,1),
  (2,'Joe','Smith','joesmith@domain.com','secret','2024-07-20 18:27:59.622356+00','2024-07-20 18:27:59.622356+00',true,1),
  (3,'Alice','white','alicewhite@domain.com','secret','2024-07-18 18:28:22.978314+00','2024-07-19 15:10:01.978314+00',true,1),
  (4,'Bob','Smith','bobsmith@domain.com','secret','2024-11-15 18:28:47.569343+00','2024-11-15 18:28:47.569343+00',true ,2),
  (5,'Carol', 'Dominguez','caroldominguez@domain.com','secret','2024-10-10 18:29:25.740259+00','2024-10-10 18:29:25.740259+00',true,3),
  (6,'David', 'Cameron', 'davidcameron@domain.com','secret','2024-11-10 18:29:25.740259+00','2024-11-10 18:29:25.740259+00',true ,4),
  (7,'Evelin', 'Verne', 'evelinverne@domain.com','secret','2024-11-10 18:29:25.740259+00','2024-11-10 18:29:25.740259+00',true,5);