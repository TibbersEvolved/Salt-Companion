-- INSERT INTO public.teacher(id, email, name) VALUES (1,'hej@salt.se','Alek');
--
-- INSERT INTO public.boot_camp(id, teacher_id, name) VALUES (10,1,'JFS');
--
-- INSERT INTO public.student(id, email, name) VALUES (1, 'student1@salt.com', 'Erik');
-- INSERT INTO public.student(id, email, name) VALUES (2, 'student2@salt.com', 'Sabine');
-- INSERT INTO public.student(id, email, name) VALUES (3, 'student3@salt.com', 'John');
-- INSERT INTO public.student(id, email, name) VALUES (4, 'student4@salt.com', 'Andreas');
-- INSERT INTO public.student(id, email, name) VALUES (5, 'student5@salt.com', 'Lawe');
--
-- INSERT INTO public.deck(id) VALUES (1);
-- INSERT INTO public.topic(bootcamp_id, deck_id, id,name) VALUES (10,1,1, 'Java');
--
-- INSERT INTO public.card(deck_id, id, answer, text) VALUES (1, 1, 'Java', 'What is Code really?');
-- INSERT INTO public.card(deck_id, id, answer, text) VALUES (1, 2, 'Frontend', 'What is JPA reaaally?');
-- INSERT INTO public.card(deck_id, id, answer, text) VALUES (1, 3, 'Chilis', 'What is the ultimate team');
--
INSERT INTO public.teacher(email, name) VALUES ('hej@salt.se','Alek');

INSERT INTO public.boot_camp(teacher_id, name) VALUES (1,'JFS');

INSERT INTO public.student(email, name) VALUES ('student1@salt.com', 'Erik');
INSERT INTO public.student(email, name) VALUES ('student2@salt.com', 'Sabine');
INSERT INTO public.student(email, name) VALUES ('student3@salt.com', 'John');
INSERT INTO public.student(email, name) VALUES ('student4@salt.com', 'Andreas');
INSERT INTO public.student(email, name) VALUES ('student5@salt.com', 'Lawe');

-- INSERT INTO public.deck() VALUES ();
INSERT INTO public.topic(name) VALUES ('Java');

INSERT INTO public.card(answer, text) VALUES ('Java', 'What is Code really?');
INSERT INTO public.card(answer, text) VALUES ('Frontend', 'What is JPA reaaally?');
INSERT INTO public.card(answer, text) VALUES ( 'Chilis', 'What is the ultimate team');

