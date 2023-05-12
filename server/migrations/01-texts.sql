-- DROP TABLE texts;

CREATE TABLE texts
(
  id UUID NOT NULL UNIQUE,
  content TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Exemple of insertion
-- 
-- INSERT INTO texts(id, content)
-- VALUES('c1c7fae0-998b-4962-bf1f-57fc2a28dbcf', 'Deserunt culpa incididunt cupidatat fugiat adipisicing.');
