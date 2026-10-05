-- Run this SECOND, while connected to the "qrius_leads" database.
-- It creates the tables and inserts the starting data.
-- Running it again is safe: it drops and recreates everything.

DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,          -- stored as a bcrypt hash
  role       TEXT NOT NULL           -- ADMIN or AGENT
);

CREATE TABLE leads (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  company    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'New',   -- New, Contacted, Qualified, Lost
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Users. The password hashes below are bcrypt hashes of the plain passwords
-- shown in the assignment brief (Admin@123 and Agent@123).
INSERT INTO users (username, password, role) VALUES
  ('admin.qrius', '$2b$10$prMPPhdZmhM8.3cIi412kege9VC0VMFViWyboHXCEqNn2DzhElfJS', 'ADMIN'),
  ('agent.qrius', '$2b$10$u/iqE2jU6US48wAjI60yIu9swTPqtRu0nRntxXomO/XXqjkybT02q', 'AGENT');

-- Twelve seed leads. The count matters for one of your tests.
INSERT INTO leads (name, email, company, status) VALUES
  ('Sita Sharma',    'sita@himalkart.com.np',   'HimalKart',        'New'),
  ('Ram Thapa',      'ram@sajha.coop',          'Sajha Yatayat',    'Contacted'),
  ('Gita Rai',       'gita@everesto.com.np',    'Everest Organics', 'Qualified'),
  ('Hari Koirala',   'hari@khanepani.gov.np',   'Khanepani',        'New'),
  ('Mina Gurung',    'mina@yetiair.com.np',     'Yeti Airlines',    'Contacted'),
  ('Bikash Shrestha','bikash@daraz.com.np',     'Daraz Nepal',      'New'),
  ('Anita Lama',     'anita@ncell.com.np',      'Ncell',           'Lost'),
  ('Suman Adhikari', 'suman@fonepay.com',       'Fonepay',          'Qualified'),
  ('Pooja Bhattarai','pooja@khalti.com',        'Khalti',           'New'),
  ('Dipak Karki',    'dipak@esewa.com.np',      'eSewa',            'Contacted'),
  ('Rekha Magar',    'rekha@worldlink.com.np',  'WorldLink',        'New'),
  ('Nabin Joshi',    'nabin@f1soft.com',        'F1Soft',           'Qualified');
