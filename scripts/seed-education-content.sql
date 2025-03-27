-- Books table seed data
INSERT INTO books (title, synopsis, main_ideas, status) 
VALUES
  ('The Communist Manifesto', 'A foundational text that outlines the basic principles of communism and critiques capitalism.', 'Class struggle, Historical materialism, Critique of capitalism, Workers revolution', 'available'),
  ('Capital: Volume I', 'A comprehensive critique of political economy and detailed analysis of capitalism.', 'Labor theory of value, Commodity fetishism, Surplus value, Capital accumulation', 'available'),
  ('State and Revolution', 'Analysis of the state, democracy, and the role of the proletariat in revolution.', 'State theory, Revolutionary strategy, Democracy and dictatorship, Transition period', 'available'),
  ('Reform or Revolution', 'Critique of reformist tendencies and defense of revolutionary socialism.', 'Revolutionary strategy, Critique of reformism, Class consciousness, Socialist organization', 'available')
ON CONFLICT (title) 
DO UPDATE SET 
  synopsis = EXCLUDED.synopsis,
  main_ideas = EXCLUDED.main_ideas,
  status = EXCLUDED.status;

-- Movies table seed data
INSERT INTO movies (title, synopsis, genre, release_date) 
VALUES
  ('Pride', 'Based on true events about LGBT activists supporting Welsh miners during their 1984 strike.', 'Historical Drama', '2014-09-12'),
  ('Salt of the Earth', 'Story of Mexican-American workers struggle for equality and decent working conditions.', 'Drama', '1954-03-14'),
  ('Matewan', 'Dramatization of the 1920 coal miners strike in West Virginia.', 'Historical Drama', '1987-08-28'),
  ('Land and Freedom', 'Story about the Spanish Civil War and the complexities of revolutionary politics.', 'War Drama', '1995-05-07')
ON CONFLICT (title) 
DO UPDATE SET 
  synopsis = EXCLUDED.synopsis,
  genre = EXCLUDED.genre,
  release_date = EXCLUDED.release_date;

-- Insert sample books if they don't exist
INSERT INTO books (title, synopsis, main_ideas, status)
VALUES 
  ('The Republic', 'Plato''s exploration of justice and the ideal state', 'Justice, Education, Leadership', 'available'),
  ('The Prince', 'Machiavelli''s guide to political power', 'Power, Leadership, Strategy', 'available'),
  ('The Art of War', 'Sun Tzu''s military strategy treatise', 'Strategy, Leadership, Warfare', 'available'),
  ('Democracy in America', 'Tocqueville''s analysis of American democracy', 'Democracy, Society, Liberty', 'available')
ON CONFLICT (title) DO NOTHING;

-- Insert sample movies if they don't exist
INSERT INTO movies (title, synopsis, genre, release_date)
VALUES 
  ('1776', 'Musical about the founding of America', 'Historical Drama', '1972-11-17'),
  ('Lincoln', 'Biography of Abraham Lincoln', 'Historical Drama', '2012-11-09'),
  ('Gandhi', 'Biography of Mahatma Gandhi', 'Historical Drama', '1982-12-08'),
  ('All the President''s Men', 'Investigation of the Watergate scandal', 'Political Drama', '1976-04-09')
ON CONFLICT (title) DO NOTHING; 