CREATE TABLE users(
  id serial PRIMARY KEY name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL
);
CREATE TABLE watchlists(
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text not null,
  user_id integer references users(id)
);
CREATE TABLE watchlist_movies(
  id serial primary key,
  watchlist_id integer references watchlists(id),
  movie_id text not null unique
);