--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-20 13:13:45 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- CREATE SCHEMA public;


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

-- COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16386)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 16385)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 218 (class 1259 OID 16395)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_active boolean DEFAULT true NOT NULL,
    role_id bigint DEFAULT 6 NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 16394)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3251 (class 2604 OID 16389)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3252 (class 2604 OID 16398)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3406 (class 0 OID 16386)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, name) FROM stdin;
1	Admin
2	Editor
3	Viewer
4	Contributor
5	Guest
6	Anonymous
\.


--
-- TOC entry 3408 (class 0 OID 16395)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, firstname, lastname, email, password, created_at, updated_at, is_active, role_id) FROM stdin;
1	John	Doe	johndoe@domain.com	$2b$05$PBMWbrtYF4w1xVpEZhD.QeWrTtQBQ2shs6SCP.IGnn7a166eLUg42	2024-09-20 18:21:00.082648+00	2024-09-20 18:21:00.082648+00	t	1
2	Joe	Smith	joesmith@domain.com	$2b$05$OcDSW27xmTVq9L6pdYehLulH6NMlmbgkNb2Cte9QnXpARuOqogRAO	2024-07-20 18:27:59.622356+00	2024-07-20 18:27:59.622356+00	t	1
3	Alice	white	alicewhite@domain.com	$2b$05$nKKj4ztGe2p/YKzni8y1neTEZ.wVDaYpEZvAGsI4T77C/YSLlYuvi	2024-07-18 18:28:22.978314+00	2024-07-19 15:10:01.978314+00	t	1
4	Bob	Smith	bobsmith@domain.com	$2b$05$T8aKoQuFg6vgCPwoHlGNne1LG3jN05WL6t.P56Mxd8VExqvlLlP2G	2024-11-15 18:28:47.569343+00	2024-11-15 18:28:47.569343+00	t	2
5	Carol	Dominguez	caroldominguez@domain.com	$2b$05$rMq44AEywtzC9zBkibQusunU.nITWRzS/klJROkalguwGAKk1vYYW	2024-10-10 18:29:25.740259+00	2024-10-10 18:29:25.740259+00	t	3
6	David	Cameron	davidcameron@domain.com	$2b$05$TwhSgjTwU.kFpbCf91i1/.hIj7fMCiXvqbZvt1AuBn9JqTvsrGQFO	2024-11-10 18:29:25.740259+00	2024-11-10 18:29:25.740259+00	t	4
7	Evelin	Verne	evelinverne@domain.com	$2b$05$xFng.wqPmeUeoKiE5RHROOSWTQMqjkkj2dnk0q56MiFmCYDJnKcwa	2024-11-10 18:29:25.740259+00	2024-11-10 18:29:25.740259+00	t	5
\.


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3258 (class 2606 OID 16393)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3260 (class 2606 OID 16406)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 16407)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


-- Completed on 2024-11-20 13:13:46 CST

--
-- PostgreSQL database dump complete
--

