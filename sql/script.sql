-- create extension "uuid-ossp"
-- CREATE EXTENSION 
-- SELECT uuid_generate_v4(); 
CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	avatar varchar NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id)
);

CREATE TABLE public.appointments (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	provider_id uuid NOT NULL,
	"date" timestamptz NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY (id)
);

ALTER TABLE public.appointments ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY (provider_id) REFERENCES users(id);

INSERT INTO public.users (id,"name",email,"password",avatar,created_at,updated_at) VALUES 
('f502949e-7eea-46a3-8041-bd92405097ce','Emerson Silva','emerson@gmail.com','$2a$08$mk1iThhkuw6s4NB0Q2AkEeNBiX4pUtW7Um5X81.dcr93.s7yLu4QS',NULL,'2020-07-17 21:02:39.059','2020-07-17 21:02:39.059')
;