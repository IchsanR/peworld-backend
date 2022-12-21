CREATE DATABASE hirejob;

CREATE TABLE users(
  id_user UUID PRIMARY KEY,
  names varchar(100),
  email varchar(100),
  phone varchar(50),
  password text,
  jobdesk text,
  domisili text,
  tempatkerja text,
  bio text,
  profile_pic text,
  skill text,
  levels integer
);

CREATE TABLE experience(
  id_experience serial PRIMARY KEY,
  iduser UUID references users(id_user) on delete cascade,
  posisi text,
  perusahaan text,
  datefrom text,
  descriptions text
);

CREATE TABLE portfolio(
  id_portfolio serial PRIMARY KEY,
  iduser UUID references users(id_user) on delete cascade,
  title text,
  repository text,
  portfolio_type integer, -- 1 untuk mobile, 2 untuk web
  images text
);

CREATE TABLE recruiter(
  id_recruiter UUID PRIMARY KEY,
  names varchar(100),
  email varchar(100),
  perusahaan varchar(100),
  jabatan varchar(100),
  phone varchar(50),
  password text,
  bidang text,
  kota text,
  bio text,
  instagram text,
  linkedin text,
  profile_pic text,
  levels integer
);

CREATE TABLE hire(
  id_hire serial PRIMARY KEY,
  idrecriuter UUID references recruiter(id_recruiter) on delete cascade,
  iduser UUID references users(id_user) on delete cascade,
  tujuan text,
  names varchar(100),
  email varchar(100),
  phone varchar(50),
  descriptions text
);
