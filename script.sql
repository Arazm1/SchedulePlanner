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





--Mock DATA
-- Users
INSERT INTO users (username, email, password) VALUES
('john_doe',    'john@example.com',  '$2a$10$xJwL5v5Jz5U5Z5Z5Z5Z5Zu'),
('jane_smith',  'jane@example.com',  '$2a$10$xJwL5v5Jz5U5Z5Z5Z5Z5Zu'),
('bob_johnson', 'bob@example.com',   '$2a$10$xJwL5v5Jz5U5Z5Z5Z5Z5Zu'),
('alice_brown', 'alice@example.com', '$2a$10$xJwL5v5Jz5U5Z5Z5Z5Z5Zu');

-- Companies
INSERT INTO companies (name, color_hex) VALUES
('Acme Corp',      '#FF5733'),
('Globex',         '#33FF57'),
('Initech',        '#3357FF'),
('Umbrella Co',    '#404349');

-- Works (user-company memberships)
INSERT INTO works (company_id, user_id) VALUES
(1, 1), -- john      @ Acme Corp
(1, 2), -- jane      @ Acme Corp
(2, 2), -- jane      @ Globex
(2, 3), -- bob       @ Globex
(3, 3), -- bob       @ Initech
(3, 4), -- alice     @ Initech
(4, 1), -- john      @ Umbrella Co
(4, 4); -- alice     @ Umbrella Co

-- Shifts
INSERT INTO shifts (shift_name, info, notes, start_time, end_time, user_id, company_id) VALUES
('Morning Shift',   'Opening duties',         'Bring keys',        '2025-06-01 08:00:00', '2025-06-01 16:00:00', 1, 1),
('Evening Shift',   'Closing duties',         NULL,                '2025-06-01 16:00:00', '2025-06-01 23:00:00', 2, 1),
('Day Shift',       'Floor management',       'Team meeting at 10','2025-06-02 09:00:00', '2025-06-02 17:00:00', 2, 2),
('Night Shift',     'Security patrol',        NULL,                '2025-06-02 22:00:00', '2025-06-03 06:00:00', 3, 2),
('Morning Shift',   'Client onboarding',      'Prepare docs',      '2025-06-03 08:00:00', '2025-06-03 12:00:00', 3, 3),
('Afternoon Shift', 'Support desk coverage',  NULL,                '2025-06-03 12:00:00', '2025-06-03 18:00:00', 4, 3),
('Morning Shift',   'Lab preparation',        'Check inventory',   '2025-06-04 07:00:00', '2025-06-04 15:00:00', 1, 4),
('Evening Shift',   'Research documentation', NULL,                '2025-06-04 15:00:00', '2025-06-04 22:00:00', 4, 4);