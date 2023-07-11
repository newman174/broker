--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Homebrew)
-- Dumped by pg_dump version 14.8 (Homebrew)

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
-- Name: broker; Type: DATABASE; Schema: -; Owner: newms
--

-- CREATE DATABASE broker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


-- ALTER DATABASE broker OWNER TO postgres;

-- \connect broker

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comparisons; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.comparisons (
    comparison_id integer NOT NULL,
    integration_id integer NOT NULL,
    consumer_contract_id integer NOT NULL,
    provider_spec_id integer NOT NULL,
    comparison_status character varying(20) NOT NULL,
    result jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.comparisons OWNER TO newms;

--
-- Name: comparisons_comparison_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.comparisons_comparison_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.comparisons_comparison_id_seq OWNER TO newms;

--
-- Name: comparisons_comparison_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.comparisons_comparison_id_seq OWNED BY public.comparisons.comparison_id;


--
-- Name: consumer_contracts; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.consumer_contracts (
    consumer_contract_id integer NOT NULL,
    consumer_id integer NOT NULL,
    integration_id integer NOT NULL,
    contract jsonb NOT NULL,
    contract_format character varying(20) NOT NULL,
    contract_hash character varying(40) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.consumer_contracts OWNER TO newms;

--
-- Name: consumer_contracts_consumer_contract_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.consumer_contracts_consumer_contract_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.consumer_contracts_consumer_contract_id_seq OWNER TO newms;

--
-- Name: consumer_contracts_consumer_contract_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.consumer_contracts_consumer_contract_id_seq OWNED BY public.consumer_contracts.consumer_contract_id;


--
-- Name: environments; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.environments (
    environment_id integer NOT NULL,
    environment_name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.environments OWNER TO newms;

--
-- Name: environments_environment_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.environments_environment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.environments_environment_id_seq OWNER TO newms;

--
-- Name: environments_environment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.environments_environment_id_seq OWNED BY public.environments.environment_id;


--
-- Name: integrations; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.integrations (
    integration_id integer NOT NULL,
    consumer_id integer NOT NULL,
    provider_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.integrations OWNER TO newms;

--
-- Name: integrations_integration_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.integrations_integration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.integrations_integration_id_seq OWNER TO newms;

--
-- Name: integrations_integration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.integrations_integration_id_seq OWNED BY public.integrations.integration_id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


-- ALTER TABLE public.knex_migrations OWNER TO newms;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.knex_migrations_id_seq OWNER TO newms;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


-- ALTER TABLE public.knex_migrations_lock OWNER TO newms;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO newms;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: participant_versions; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.participant_versions (
    participant_version_id integer NOT NULL,
    participant_id integer NOT NULL,
    participant_branch character varying(255),
    participant_version character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.participant_versions OWNER TO newms;

--
-- Name: participant_versions_participant_version_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.participant_versions_participant_version_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.participant_versions_participant_version_id_seq OWNER TO newms;

--
-- Name: participant_versions_participant_version_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.participant_versions_participant_version_id_seq OWNED BY public.participant_versions.participant_version_id;


--
-- Name: participants; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.participants (
    participant_id integer NOT NULL,
    participant_name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.participants OWNER TO newms;

--
-- Name: participants_participant_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.participants_participant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.participants_participant_id_seq OWNER TO newms;

--
-- Name: participants_participant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.participants_participant_id_seq OWNED BY public.participants.participant_id;


--
-- Name: provider_specs; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.provider_specs (
    provider_spec_id integer NOT NULL,
    provider_id integer NOT NULL,
    spec jsonb NOT NULL,
    spec_format character varying(20) NOT NULL,
    spec_hash character varying(40) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.provider_specs OWNER TO newms;

--
-- Name: provider_specs_provider_spec_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.provider_specs_provider_spec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.provider_specs_provider_spec_id_seq OWNER TO newms;

--
-- Name: provider_specs_provider_spec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.provider_specs_provider_spec_id_seq OWNED BY public.provider_specs.provider_spec_id;


--
-- Name: versions_contracts; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.versions_contracts (
    version_contract_id integer NOT NULL,
    consumer_version_id integer NOT NULL,
    consumer_contract_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.versions_contracts OWNER TO newms;

--
-- Name: versions_contracts_version_contract_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.versions_contracts_version_contract_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.versions_contracts_version_contract_id_seq OWNER TO newms;

--
-- Name: versions_contracts_version_contract_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.versions_contracts_version_contract_id_seq OWNED BY public.versions_contracts.version_contract_id;


--
-- Name: versions_environments; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.versions_environments (
    version_environment_id integer NOT NULL,
    participant_version_id integer NOT NULL,
    environment_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.versions_environments OWNER TO newms;

--
-- Name: versions_environments_version_environment_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.versions_environments_version_environment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.versions_environments_version_environment_id_seq OWNER TO newms;

--
-- Name: versions_environments_version_environment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.versions_environments_version_environment_id_seq OWNED BY public.versions_environments.version_environment_id;


--
-- Name: versions_specs; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.versions_specs (
    version_spec_id integer NOT NULL,
    provider_version_id integer NOT NULL,
    provider_spec_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.versions_specs OWNER TO newms;

--
-- Name: versions_specs_version_spec_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.versions_specs_version_spec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.versions_specs_version_spec_id_seq OWNER TO newms;

--
-- Name: versions_specs_version_spec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.versions_specs_version_spec_id_seq OWNED BY public.versions_specs.version_spec_id;


--
-- Name: webhook_subscriptions; Type: TABLE; Schema: public; Owner: newms
--

CREATE TABLE public.webhook_subscriptions (
    webhook_subscription_id integer NOT NULL,
    integration_id integer NOT NULL,
    spec_publish_events boolean DEFAULT false NOT NULL,
    provider_verification_events boolean DEFAULT false NOT NULL,
    comparison_events boolean DEFAULT false NOT NULL,
    url character varying(255) NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    description character varying(255),
    headers text,
    payload text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ALTER TABLE public.webhook_subscriptions OWNER TO newms;

--
-- Name: webhook_subscriptions_webhook_subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: newms
--

CREATE SEQUENCE public.webhook_subscriptions_webhook_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.webhook_subscriptions_webhook_subscription_id_seq OWNER TO newms;

--
-- Name: webhook_subscriptions_webhook_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newms
--

ALTER SEQUENCE public.webhook_subscriptions_webhook_subscription_id_seq OWNED BY public.webhook_subscriptions.webhook_subscription_id;


--
-- Name: comparisons comparison_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.comparisons ALTER COLUMN comparison_id SET DEFAULT nextval('public.comparisons_comparison_id_seq'::regclass);


--
-- Name: consumer_contracts consumer_contract_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.consumer_contracts ALTER COLUMN consumer_contract_id SET DEFAULT nextval('public.consumer_contracts_consumer_contract_id_seq'::regclass);


--
-- Name: environments environment_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.environments ALTER COLUMN environment_id SET DEFAULT nextval('public.environments_environment_id_seq'::regclass);


--
-- Name: integrations integration_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.integrations ALTER COLUMN integration_id SET DEFAULT nextval('public.integrations_integration_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: participant_versions participant_version_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.participant_versions ALTER COLUMN participant_version_id SET DEFAULT nextval('public.participant_versions_participant_version_id_seq'::regclass);


--
-- Name: participants participant_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.participants ALTER COLUMN participant_id SET DEFAULT nextval('public.participants_participant_id_seq'::regclass);


--
-- Name: provider_specs provider_spec_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.provider_specs ALTER COLUMN provider_spec_id SET DEFAULT nextval('public.provider_specs_provider_spec_id_seq'::regclass);


--
-- Name: versions_contracts version_contract_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_contracts ALTER COLUMN version_contract_id SET DEFAULT nextval('public.versions_contracts_version_contract_id_seq'::regclass);


--
-- Name: versions_environments version_environment_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_environments ALTER COLUMN version_environment_id SET DEFAULT nextval('public.versions_environments_version_environment_id_seq'::regclass);


--
-- Name: versions_specs version_spec_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_specs ALTER COLUMN version_spec_id SET DEFAULT nextval('public.versions_specs_version_spec_id_seq'::regclass);


--
-- Name: webhook_subscriptions webhook_subscription_id; Type: DEFAULT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.webhook_subscriptions ALTER COLUMN webhook_subscription_id SET DEFAULT nextval('public.webhook_subscriptions_webhook_subscription_id_seq'::regclass);


--
-- Name: comparisons comparisons_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.comparisons
    ADD CONSTRAINT comparisons_pkey PRIMARY KEY (comparison_id);


--
-- Name: consumer_contracts consumer_contracts_consumer_id_contract_hash_unique; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.consumer_contracts
    ADD CONSTRAINT consumer_contracts_consumer_id_contract_hash_unique UNIQUE (consumer_id, contract_hash);


--
-- Name: consumer_contracts consumer_contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.consumer_contracts
    ADD CONSTRAINT consumer_contracts_pkey PRIMARY KEY (consumer_contract_id);


--
-- Name: environments environments_environment_name_unique; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.environments
    ADD CONSTRAINT environments_environment_name_unique UNIQUE (environment_name);


--
-- Name: environments environments_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.environments
    ADD CONSTRAINT environments_pkey PRIMARY KEY (environment_id);


--
-- Name: integrations integrations_consumer_id_provider_id_unique; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT integrations_consumer_id_provider_id_unique UNIQUE (consumer_id, provider_id);


--
-- Name: integrations integrations_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT integrations_pkey PRIMARY KEY (integration_id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: participant_versions participant_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.participant_versions
    ADD CONSTRAINT participant_versions_pkey PRIMARY KEY (participant_version_id);


--
-- Name: participants participants_participant_name_unique; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_participant_name_unique UNIQUE (participant_name);


--
-- Name: participants participants_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY (participant_id);


--
-- Name: provider_specs provider_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.provider_specs
    ADD CONSTRAINT provider_specs_pkey PRIMARY KEY (provider_spec_id);


--
-- Name: provider_specs provider_specs_provider_id_spec_hash_unique; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.provider_specs
    ADD CONSTRAINT provider_specs_provider_id_spec_hash_unique UNIQUE (provider_id, spec_hash);


--
-- Name: versions_contracts versions_contracts_consumer_version_id_consumer_contract_id_uni; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_contracts
    ADD CONSTRAINT versions_contracts_consumer_version_id_consumer_contract_id_uni UNIQUE (consumer_version_id, consumer_contract_id);


--
-- Name: versions_contracts versions_contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_contracts
    ADD CONSTRAINT versions_contracts_pkey PRIMARY KEY (version_contract_id);


--
-- Name: versions_environments versions_environments_participant_version_id_environment_id_uni; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_environments
    ADD CONSTRAINT versions_environments_participant_version_id_environment_id_uni UNIQUE (participant_version_id, environment_id);


--
-- Name: versions_environments versions_environments_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_environments
    ADD CONSTRAINT versions_environments_pkey PRIMARY KEY (version_environment_id);


--
-- Name: versions_specs versions_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_specs
    ADD CONSTRAINT versions_specs_pkey PRIMARY KEY (version_spec_id);


--
-- Name: versions_specs versions_specs_provider_version_id_provider_spec_id_unique; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_specs
    ADD CONSTRAINT versions_specs_provider_version_id_provider_spec_id_unique UNIQUE (provider_version_id, provider_spec_id);


--
-- Name: webhook_subscriptions webhook_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.webhook_subscriptions
    ADD CONSTRAINT webhook_subscriptions_pkey PRIMARY KEY (webhook_subscription_id);


--
-- Name: comparisons_consumer_contract_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX comparisons_consumer_contract_id_index ON public.comparisons USING btree (consumer_contract_id);


--
-- Name: comparisons_integration_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX comparisons_integration_id_index ON public.comparisons USING btree (integration_id);


--
-- Name: comparisons_provider_spec_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX comparisons_provider_spec_id_index ON public.comparisons USING btree (provider_spec_id);


--
-- Name: consumer_contracts_consumer_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX consumer_contracts_consumer_id_index ON public.consumer_contracts USING btree (consumer_id);


--
-- Name: consumer_contracts_integration_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX consumer_contracts_integration_id_index ON public.consumer_contracts USING btree (integration_id);


--
-- Name: integrations_consumer_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX integrations_consumer_id_index ON public.integrations USING btree (consumer_id);


--
-- Name: integrations_provider_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX integrations_provider_id_index ON public.integrations USING btree (provider_id);


--
-- Name: participant_versions_participant_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX participant_versions_participant_id_index ON public.participant_versions USING btree (participant_id);


--
-- Name: provider_specs_provider_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX provider_specs_provider_id_index ON public.provider_specs USING btree (provider_id);


--
-- Name: versions_contracts_consumer_contract_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX versions_contracts_consumer_contract_id_index ON public.versions_contracts USING btree (consumer_contract_id);


--
-- Name: versions_contracts_consumer_version_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX versions_contracts_consumer_version_id_index ON public.versions_contracts USING btree (consumer_version_id);


--
-- Name: versions_environments_environment_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX versions_environments_environment_id_index ON public.versions_environments USING btree (environment_id);


--
-- Name: versions_environments_participant_version_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX versions_environments_participant_version_id_index ON public.versions_environments USING btree (participant_version_id);


--
-- Name: versions_specs_provider_spec_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX versions_specs_provider_spec_id_index ON public.versions_specs USING btree (provider_spec_id);


--
-- Name: versions_specs_provider_version_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX versions_specs_provider_version_id_index ON public.versions_specs USING btree (provider_version_id);


--
-- Name: webhook_subscriptions_integration_id_index; Type: INDEX; Schema: public; Owner: newms
--

CREATE INDEX webhook_subscriptions_integration_id_index ON public.webhook_subscriptions USING btree (integration_id);


--
-- Name: comparisons comparisons_consumer_contract_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.comparisons
    ADD CONSTRAINT comparisons_consumer_contract_id_foreign FOREIGN KEY (consumer_contract_id) REFERENCES public.consumer_contracts(consumer_contract_id) ON DELETE CASCADE;


--
-- Name: comparisons comparisons_integration_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.comparisons
    ADD CONSTRAINT comparisons_integration_id_foreign FOREIGN KEY (integration_id) REFERENCES public.integrations(integration_id) ON DELETE CASCADE;


--
-- Name: comparisons comparisons_provider_spec_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.comparisons
    ADD CONSTRAINT comparisons_provider_spec_id_foreign FOREIGN KEY (provider_spec_id) REFERENCES public.provider_specs(provider_spec_id) ON DELETE CASCADE;


--
-- Name: consumer_contracts consumer_contracts_consumer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.consumer_contracts
    ADD CONSTRAINT consumer_contracts_consumer_id_foreign FOREIGN KEY (consumer_id) REFERENCES public.participants(participant_id) ON DELETE CASCADE;


--
-- Name: consumer_contracts consumer_contracts_integration_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.consumer_contracts
    ADD CONSTRAINT consumer_contracts_integration_id_foreign FOREIGN KEY (integration_id) REFERENCES public.integrations(integration_id) ON DELETE CASCADE;


--
-- Name: integrations integrations_consumer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT integrations_consumer_id_foreign FOREIGN KEY (consumer_id) REFERENCES public.participants(participant_id) ON DELETE CASCADE;


--
-- Name: integrations integrations_provider_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT integrations_provider_id_foreign FOREIGN KEY (provider_id) REFERENCES public.participants(participant_id) ON DELETE CASCADE;


--
-- Name: participant_versions participant_versions_participant_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.participant_versions
    ADD CONSTRAINT participant_versions_participant_id_foreign FOREIGN KEY (participant_id) REFERENCES public.participants(participant_id) ON DELETE CASCADE;


--
-- Name: provider_specs provider_specs_provider_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.provider_specs
    ADD CONSTRAINT provider_specs_provider_id_foreign FOREIGN KEY (provider_id) REFERENCES public.participants(participant_id) ON DELETE CASCADE;


--
-- Name: versions_contracts versions_contracts_consumer_contract_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_contracts
    ADD CONSTRAINT versions_contracts_consumer_contract_id_foreign FOREIGN KEY (consumer_contract_id) REFERENCES public.consumer_contracts(consumer_contract_id) ON DELETE CASCADE;


--
-- Name: versions_contracts versions_contracts_consumer_version_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_contracts
    ADD CONSTRAINT versions_contracts_consumer_version_id_foreign FOREIGN KEY (consumer_version_id) REFERENCES public.participant_versions(participant_version_id) ON DELETE CASCADE;


--
-- Name: versions_environments versions_environments_environment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_environments
    ADD CONSTRAINT versions_environments_environment_id_foreign FOREIGN KEY (environment_id) REFERENCES public.environments(environment_id) ON DELETE CASCADE;


--
-- Name: versions_environments versions_environments_participant_version_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_environments
    ADD CONSTRAINT versions_environments_participant_version_id_foreign FOREIGN KEY (participant_version_id) REFERENCES public.participant_versions(participant_version_id) ON DELETE CASCADE;


--
-- Name: versions_specs versions_specs_provider_spec_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_specs
    ADD CONSTRAINT versions_specs_provider_spec_id_foreign FOREIGN KEY (provider_spec_id) REFERENCES public.provider_specs(provider_spec_id) ON DELETE CASCADE;


--
-- Name: versions_specs versions_specs_provider_version_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.versions_specs
    ADD CONSTRAINT versions_specs_provider_version_id_foreign FOREIGN KEY (provider_version_id) REFERENCES public.participant_versions(participant_version_id) ON DELETE CASCADE;


--
-- Name: webhook_subscriptions webhook_subscriptions_integration_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: newms
--

ALTER TABLE ONLY public.webhook_subscriptions
    ADD CONSTRAINT webhook_subscriptions_integration_id_foreign FOREIGN KEY (integration_id) REFERENCES public.integrations(integration_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
