CREATE DATABASE shiftsplanner_v1;

USE shiftsplanner_v1;


CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  email      VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE companies
(
  company_id INT NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100) NOT NULL,
  color_hex   VARCHAR(7)   NOT NULL DEFAULT '#404349',
  PRIMARY KEY (company_id)
);

CREATE TABLE shifts
(
  shift_id    INT       NOT NULL AUTO_INCREMENT,
  shift_name  VARCHAR(100)  NOT NULL,
  info        VARCHAR(255)  NOT NULL,
  notes       VARCHAR(255),
  start_time  DATETIME     NOT NULL,
  end_time    DATETIME     NOT NULL,
  user_id     INT       NOT NULL,
  company_id  INT       NOT NULL,
  PRIMARY KEY (shift_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

CREATE TABLE works
(
  company_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (company_id, user_id),
  FOREIGN KEY (company_id) REFERENCES companies(company_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);