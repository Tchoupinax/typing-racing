-- DROP TABLE scores;

CREATE TABLE scores
(
  id UUID NOT NULL UNIQUE,
  nickname VARCHAR,
  score_wpm INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Exemple of insertion
-- 
-- INSERT INTO scores(id, nickname, score_wpm)
-- VALUES('745bfc8c-3c05-48d3-8e67-85d69b8f2476', 'Tchoupinax', 1);
