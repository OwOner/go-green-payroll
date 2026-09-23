SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict h01tzrlRYoBUg5leceHUSwYW0cZdbeLAtf9X3V5aQebUyQAETJjuTm2neG0yWMt

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '4e5e3b23-1b40-481b-8902-974234784363', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"admin@nexus.com","user_id":"c69d867e-151b-4f47-b979-7e23f066879a","user_phone":""}}', '2026-09-16 02:49:29.612582+00', ''),
	('00000000-0000-0000-0000-000000000000', '25f709ae-a5b5-42bf-a6e4-d9e0488b0679', '{"action":"login","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-09-16 02:49:43.246459+00', ''),
	('00000000-0000-0000-0000-000000000000', '79789e87-2cc7-4d72-bd37-2babcbdf3a64', '{"action":"login","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-09-16 02:49:44.504627+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e023b56-ec7e-4189-ada9-6f0c6b81ff51', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-16 04:51:22.093725+00', ''),
	('00000000-0000-0000-0000-000000000000', '73c36576-e2e0-42f7-826e-9288fdf87b14', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-16 04:51:22.096932+00', ''),
	('00000000-0000-0000-0000-000000000000', '24baad68-457b-474f-9d42-d9dce80b7299', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-16 06:15:03.173436+00', ''),
	('00000000-0000-0000-0000-000000000000', '26fbb059-3e69-4ac8-82b2-d533ccb845f1', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-16 06:15:03.175041+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e142eb0b-2382-4ef4-ade5-8d55aaa65755', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-16 06:15:03.257153+00', ''),
	('00000000-0000-0000-0000-000000000000', '35d21445-2e33-45c4-922b-19babebea1d2', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-21 06:00:45.475599+00', ''),
	('00000000-0000-0000-0000-000000000000', '526ef42c-41ae-4cd1-b63a-ddb9fd32a69a', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-21 06:00:45.529316+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0b3f5c9-4064-4548-bbae-4d3cac74312d', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-21 06:00:47.298238+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9930790-0ec6-496a-8ede-60666721079a', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-21 07:05:09.332819+00', ''),
	('00000000-0000-0000-0000-000000000000', '44ae9619-8a9e-4155-be2e-25f342e7084b', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-21 07:05:09.338146+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c740aa7f-f084-42f6-93d2-18661a276ec0', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-21 08:04:41.038475+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e789484-34bd-47c1-b4f1-370d816af3c2', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-21 08:04:41.043925+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d69ba3f-4a39-4eda-bc6b-ddc178bd02b9', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 00:23:03.269507+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f48385ff-1b8b-4353-bb40-98e7eca610ed', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 00:23:03.272494+00', ''),
	('00000000-0000-0000-0000-000000000000', '166461b6-46ed-41ae-9b95-5e03041db80c', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 00:23:03.377687+00', ''),
	('00000000-0000-0000-0000-000000000000', '93230662-1cbe-4572-b89f-62280245f4b5', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 01:21:04.917594+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ce51d60-bff8-4332-a814-05a98c2ca13b', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 01:21:04.920171+00', ''),
	('00000000-0000-0000-0000-000000000000', '7deadaa8-171e-4628-8557-4428d17a0c3c', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 02:19:12.517602+00', ''),
	('00000000-0000-0000-0000-000000000000', '940007c2-8797-4757-94be-e1f8b64466e7', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 02:19:12.518945+00', ''),
	('00000000-0000-0000-0000-000000000000', '968ed6d1-e747-4ee8-85dd-33c5ca60abd0', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 03:20:13.574415+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bafdd4c7-95cf-437f-b2fc-51a45953a61a', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 03:20:13.577108+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd13b438-98b8-45bb-a669-031b436f5ed6', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 05:19:19.272607+00', ''),
	('00000000-0000-0000-0000-000000000000', '351aeb8b-e24e-4cbd-bc6d-d8d27fa4b7c1', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 05:19:19.276185+00', ''),
	('00000000-0000-0000-0000-000000000000', '00699f99-048f-414a-956d-6eb2ac50ebd7', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 06:17:34.92664+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c401661c-dbad-4dc7-8a2b-05b578ec81e3', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 06:17:34.937236+00', ''),
	('00000000-0000-0000-0000-000000000000', '2e97e82c-ec86-468f-8c42-8f37f5ea2cb9', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 07:40:47.083557+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1964404-a9ec-4704-9a71-5eadaa328ad1', '{"action":"token_revoked","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 07:40:47.089108+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ef17d72-6675-467a-8592-c6afaaf7b709', '{"action":"token_refreshed","actor_id":"c69d867e-151b-4f47-b979-7e23f066879a","actor_username":"admin@nexus.com","actor_via_sso":false,"log_type":"token"}', '2026-09-22 07:40:47.691141+00', '');


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'c69d867e-151b-4f47-b979-7e23f066879a', 'authenticated', 'authenticated', 'admin@nexus.com', '$2a$10$WqA8IOugTtlsZ4hhFItnEeiaaUUS6RfZGAHdKWUKQX/wr7WItEIMe', '2026-09-16 02:49:29.614105+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-09-16 02:49:44.505524+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-09-16 02:49:29.606392+00', '2026-09-22 07:40:47.103916+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('c69d867e-151b-4f47-b979-7e23f066879a', 'c69d867e-151b-4f47-b979-7e23f066879a', '{"sub": "c69d867e-151b-4f47-b979-7e23f066879a", "email": "admin@nexus.com", "email_verified": false, "phone_verified": false}', 'email', '2026-09-16 02:49:29.610894+00', '2026-09-16 02:49:29.610933+00', '2026-09-16 02:49:29.610933+00', '164348d3-c71e-4ca7-ace4-b34b57beace8');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('ab4bdbe1-44d4-41bd-95de-78daac63abbf', 'c69d867e-151b-4f47-b979-7e23f066879a', '2026-09-16 02:49:43.247464+00', '2026-09-16 02:49:43.247464+00', NULL, 'aal1', NULL, NULL, 'node', '172.19.0.1', NULL, NULL, NULL, NULL, NULL),
	('c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309', 'c69d867e-151b-4f47-b979-7e23f066879a', '2026-09-16 02:49:44.505846+00', '2026-09-22 07:40:47.694954+00', NULL, 'aal1', NULL, '2026-09-22 07:40:47.694871', 'Next.js Middleware', '172.19.0.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('ab4bdbe1-44d4-41bd-95de-78daac63abbf', '2026-09-16 02:49:43.251739+00', '2026-09-16 02:49:43.251739+00', 'password', '6d3fdf00-a509-4536-a016-86c2d1c1a49d'),
	('c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309', '2026-09-16 02:49:44.510112+00', '2026-09-16 02:49:44.510112+00', 'password', 'f2f489ba-e036-4074-9c86-f623108007d2');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_recovery_code_sets; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_recovery_codes; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'owldclpvnkux', 'c69d867e-151b-4f47-b979-7e23f066879a', false, '2026-09-16 02:49:43.249321+00', '2026-09-16 02:49:43.249321+00', NULL, 'ab4bdbe1-44d4-41bd-95de-78daac63abbf'),
	('00000000-0000-0000-0000-000000000000', 2, 'cwcpd3b3seso', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-16 02:49:44.508073+00', '2026-09-16 04:51:22.098096+00', NULL, 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 3, 'u4bi4kdnwy6q', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-16 04:51:22.102042+00', '2026-09-16 06:15:03.175644+00', 'cwcpd3b3seso', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 4, 'qwtkwgari3gz', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-16 06:15:03.17748+00', '2026-09-21 06:00:45.532277+00', 'u4bi4kdnwy6q', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 5, 'r7giwl3vudin', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-21 06:00:45.578047+00', '2026-09-21 07:05:09.339248+00', 'qwtkwgari3gz', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 6, 'bgt3nbhflcup', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-21 07:05:09.342798+00', '2026-09-21 08:04:41.045381+00', 'r7giwl3vudin', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 7, 'aniksampiae5', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-21 08:04:41.047739+00', '2026-09-22 00:23:03.273482+00', 'bgt3nbhflcup', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 8, 't3e4mynlhfvb', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-22 00:23:03.275345+00', '2026-09-22 01:21:04.920607+00', 'aniksampiae5', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 9, '34qlfsz4dynk', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-22 01:21:04.923597+00', '2026-09-22 02:19:12.519419+00', 't3e4mynlhfvb', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 10, 'adm4rxmvibbo', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-22 02:19:12.520463+00', '2026-09-22 03:20:13.577798+00', '34qlfsz4dynk', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 11, 'jnu3vsts3ttm', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-22 03:20:13.578929+00', '2026-09-22 05:19:19.277058+00', 'adm4rxmvibbo', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 12, 'rvoefcbz73y5', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-22 05:19:19.278734+00', '2026-09-22 06:17:34.938976+00', 'jnu3vsts3ttm', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 13, 'eklcw4uharza', 'c69d867e-151b-4f47-b979-7e23f066879a', true, '2026-09-22 06:17:34.943394+00', '2026-09-22 07:40:47.091825+00', 'rvoefcbz73y5', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309'),
	('00000000-0000-0000-0000-000000000000', 14, 'f6k3mmfvhtfx', 'c69d867e-151b-4f47-b979-7e23f066879a', false, '2026-09-22 07:40:47.095981+00', '2026-09-22 07:40:47.095981+00', 'eklcw4uharza', 'c5c8bc9c-1888-4f7c-b14a-a98b2a3ac309');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: scim_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: scim_users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."employees" ("id", "employee_code", "first_name", "middle_name", "last_name", "email", "phone", "address", "birth_date", "department_id", "position_id", "employment_status", "employment_type", "date_hired", "termination_date", "avatar_url", "sss_number", "philhealth_number", "pagibig_number", "tin_number", "bank_name", "bank_account", "created_at", "updated_at", "gender", "location", "work_schedule", "is_payroll_exempt") VALUES
	('920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', 'EMP-001', 'Anjelo', NULL, 'Cochico', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:58.9126+00', '2026-09-21 07:01:58.9126+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('db5d3e93-cfbe-4564-87cc-49e1019a9537', 'EMP-002', 'Christian Genesis', NULL, 'Valladolid', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:58.935986+00', '2026-09-21 07:01:58.935986+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', 'EMP-003', 'Daniel', NULL, 'Labayo', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:58.950062+00', '2026-09-21 07:01:58.950062+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('e1f8d3d6-5191-41b9-8fce-dec6713afaa8', 'EMP-004', 'Danillo', NULL, 'Labayo', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:58.962607+00', '2026-09-21 07:01:58.962607+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('9ee95966-cbec-45f3-b7a2-202506606c18', 'EMP-005', 'Erezon', NULL, 'Banares', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:58.980011+00', '2026-09-21 07:01:58.980011+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('d95dedab-2a6d-4aef-938a-17f8d0d4535f', 'EMP-006', 'Japhet', NULL, 'Palmares', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:58.993662+00', '2026-09-21 07:01:58.993662+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('3d361963-c896-4261-8f69-16956028ecee', 'EMP-007', 'Jay-ar', NULL, 'Lacay', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:59.009732+00', '2026-09-21 07:01:59.009732+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('a018f8dd-3fad-4638-9ca4-870f8ad6864a', 'EMP-008', 'Jerome', NULL, 'Bajaro', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:59.018442+00', '2026-09-21 07:01:59.018442+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('eaab1101-0861-4eb5-820b-3a093cd4420f', 'EMP-009', 'John Lloyd', NULL, 'Navarro', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:59.028966+00', '2026-09-21 07:01:59.028966+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('7be6f1ef-751d-408a-8412-ad8f10f2720d', 'EMP-010', 'John Paul', NULL, 'Espano', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:59.039207+00', '2026-09-21 07:01:59.039207+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('c61434aa-da2b-499b-b524-9400a7e46b03', 'EMP-011', 'John Rey', NULL, 'Balderama', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:59.050497+00', '2026-09-21 07:01:59.050497+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', 'EMP-012', 'Julius Lawrence', NULL, 'Fortajada', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:59.060758+00', '2026-09-21 07:01:59.060758+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false),
	('dc5744ae-965a-4e20-a921-e81c55338003', 'EMP-013', 'Ramon', NULL, 'Adion', NULL, NULL, NULL, NULL, NULL, NULL, 'Active', 'Daily', '2026-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-21 07:01:59.078347+00', '2026-09-21 07:01:59.078347+00', NULL, NULL, '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}', false);


--
-- Data for Name: _deprecated_employee_deductions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: _deprecated_projects; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: attendance_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."attendance_records" ("id", "employee_id", "work_date", "status", "remarks", "created_at", "updated_at", "source", "import_batch_id", "internal_notes", "last_modified_source", "last_modified_by", "last_modified_at") VALUES
	('ae8dd2e1-a692-40f7-9497-8b1b78515f28', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('03b98d52-cd8e-45e8-9ff4-2bbb37449820', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('2323180b-3b08-46d0-8190-b8ca34bd2d0c', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('301b2671-50de-470b-a950-0533995fcab4', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-04', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('fd910a56-b13a-4ede-a4ae-dbcf7f26860f', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('4af48085-c5cf-4699-bf61-ecd01c9030eb', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('287a8f1e-38a2-4e5a-97be-82a86124d4df', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('9f0b6c0b-7c20-48ee-87fc-734dbac31db7', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('efaa17e2-813d-4fb8-acb5-df41e55d62a5', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('37fd01e9-f04e-4794-b87e-57933de53bc2', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6f56f0f4-72a8-4d6d-8551-ea4d496f3aa4', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('ab9c5e73-c8ad-4047-a7dc-4bbfd1043f4a', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('4b2c30bc-0273-4d2e-8354-01a594e8f10f', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('b75ea860-df86-4496-83dc-199107e28f1e', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('b708fd3c-46b3-4231-aefb-554a982ba7ef', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-04', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('06054721-ef27-499c-84d3-042ee48a1f2a', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('f235aa9b-ee16-474f-b5c6-10642afd3c0a', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('a83031c5-871c-46dd-81ac-9849f05f8688', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('769c6efa-f181-4877-a584-33d972cc651d', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('a60238ad-80b7-4d6b-8421-7b0bdb5469d9', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-11', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('47e4a183-8c6d-40f7-aa53-7359b7b023cd', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('2926a3a0-c1ce-4d17-bae9-1dc46428167f', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('3ffd7475-c2ad-46b5-acb1-c353b9b45590', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5a1bb206-e737-4faa-857d-322edc3bf17a', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('30df4647-aefc-495e-9d11-0f68512cc4b6', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('e3ddfab8-1483-408a-b2dd-9eb6f4fcaa85', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('27321761-6ef2-4657-bb55-b223687d66a3', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('77c27dfb-f237-45b7-b45e-29c41bd52965', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('018a0de1-c0bb-495d-b0b4-6b2f6aca4414', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('59c7dcf6-85ed-4269-b0a5-37a7a0b4f6d1', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5022f12f-dd06-4f12-b1c4-8dded8f8269d', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('8c655848-66c7-4be0-8ace-2da53c998de9', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5ba9e61f-2e2e-4628-879b-df27bc496454', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('a64784d0-5b49-4405-ba64-db22aa90136b', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-01', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('37df4d0c-67c0-4e03-b899-c0aee3993cfc', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6e2e80c3-7dc4-4284-8fed-c47f8990259b', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('66585722-5ae5-4471-8dc2-a2065716f580', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6e2fe01f-7187-417d-a41d-301bd1e3c712', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('4992a4fa-1caa-4b17-b631-8b385f48a8b3', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('71b1032b-75e0-4669-b937-4387552e31d7', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('0d5462d2-a42a-465a-84d0-f26030dac358', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-10', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('229c6f51-9f12-406f-b62c-a58e676075a4', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('9c480992-298d-44f2-b3e8-17e270eaa7f2', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-14', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('47a6b672-82bf-451b-ac02-d2fcfc157bbc', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('2ef5542e-1c0e-42de-94f3-6d141065f65f', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('ab73129f-3523-42ca-96d6-a5683d7a5451', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('c273dbad-89fe-4477-a44f-9ae2672a1a67', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6151f3a7-9b2b-4db7-a150-9200e6ef6236', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('d5957022-88d5-4d88-8c86-e12e91fc79f9', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('e2b706e0-e36b-41f7-b397-c840f52e36c4', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('4e2075dd-9ead-4c73-82d4-6631dc3f54ca', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6548d329-fd4f-488c-b8a9-8fbc0e0eb7ad', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('c80401d7-5e3e-4365-934e-8b1f1f8d6d26', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('61e99915-662f-4f3f-b284-43b9967ab445', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-14', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('cdcdad84-4cfa-4e19-b856-b41b84f30b10', '9ee95966-cbec-45f3-b7a2-202506606c18', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6b661a47-5a90-4768-b6de-6fa9f9ea5256', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-01', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('f728af8d-03c0-48ad-afbc-a1eb27e263aa', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('e70e70dd-bfa7-4956-9057-907f30a98247', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('0e5e245e-a2c1-4736-a690-651d07cc7e94', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('a212b920-dfc6-459d-b118-212d450424fd', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('ae0428ef-dd09-44b5-ad22-bdd40da333b2', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('e44a8392-25ae-4b13-a5e7-49bfaccb1a53', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('f856684c-42b3-42e2-be4a-b2d570b1ad85', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('3a8e8071-3be4-4243-866f-4b4991dcd625', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('242ed5dc-a205-4e87-b674-84b313e707bf', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('e5cccbdc-468a-4f74-99a9-452d759ffb75', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('e03b142c-0ef4-4b84-b4dc-66e429eddfdf', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('713524cc-442d-4a34-a28d-f42454bb0aeb', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('32eb1988-c8a9-4f9c-84c8-95d07853a42a', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('1d4cd707-35ad-49f7-af1a-63d7ed408eff', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-04', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('dbd0d425-762b-4bff-b376-f21de693278a', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-07', 'Absent', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('caed0b83-befa-4dd4-8e07-535341432fee', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('a6c71dc6-ca51-4868-85ee-c8bcdb468516', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('1fa99f33-9563-4a79-b931-d384be2ebde0', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('193ea5a7-358e-4ea1-b615-ed2614db7236', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('753b8719-381d-4934-b6df-4e715da524f6', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('cabefbd4-4aab-4aa3-aca2-a08c1b59594b', '3d361963-c896-4261-8f69-16956028ecee', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('599f9085-5f6b-41dc-9ecb-a0e81b0381ab', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('885854f1-b513-4fcc-92ba-61102176eafe', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('18339b40-6e37-4dee-8df3-4d467ff4ef5e', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('f323f6b0-5051-4e9c-ba12-1369e4640595', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('7decf9cc-86f9-4225-a304-a05554ca6873', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('b47968f3-dec9-4456-ac18-183b6a8e2b9b', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('44f42d01-28d2-4d84-a5b8-fe115c38c008', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('ff6d5128-388b-4c4e-8971-7076bb847657', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('aa98b4ee-af13-45b6-9097-ca7526b514b8', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5740ecff-870d-49e7-a6f1-9e2189962039', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('cd4aff94-8df5-4a8b-b9a0-d2cce14c1d07', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('4d242545-630a-45d5-ba8b-59a7688e52b0', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('3738a80d-5d70-4db1-b6be-2dd2a7d2cf59', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('d8994519-2a8b-4e24-a3e6-20ec6b435029', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('a655dba7-75c4-4577-912a-5d67a9c5e57d', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('34614012-8ff1-479a-aa23-0993346a83f0', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('50d5519e-4e41-46d6-9d0d-0bf626ce6c7e', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('34c8963c-2222-472f-ae41-42648c30dc15', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('35b38fd1-616b-40e0-b893-bc000ea701a6', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('fa4c570e-c563-40d5-af41-6551d7006ebc', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('c909033a-fda6-4164-87aa-8b0f9ff386a9', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('debb7cfe-db39-468f-98d0-2d023efc5059', 'eaab1101-0861-4eb5-820b-3a093cd4420f', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('b5acb733-b694-48e3-b538-fee827f4d71f', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.09386+00', '2026-09-21 07:01:59.09386+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('8019fbbd-9378-4184-bd20-0f011c99a0ca', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('2f887eec-9096-44c3-ba32-b7a8782e5d31', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-03', 'Absent', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('19f27e51-fa53-4f53-bcc6-9fdcc9f7bafd', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('fabb9801-4ff1-4cea-992b-e2f53b774c8d', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('1d683b0f-4bcb-4e2c-a859-692c0f95cc18', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('b16845d3-05e0-4c0e-a697-4e804db81ccb', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('2a221d48-3a6b-4c94-b104-4aff56fa83cd', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('4104ab51-cfc0-45b9-90ab-75c136cdc73c', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('0d7114f6-6803-4670-b687-6006ebb0495e', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('4d99a03a-3209-46c4-a013-1c07b932b854', '7be6f1ef-751d-408a-8412-ad8f10f2720d', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('9817b701-9c8c-4f8c-82a6-4b68c5b425bc', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-01', 'Absent', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('9392c529-b427-4d57-87dc-7806c8c95630', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-02', 'Absent', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('cfab37a4-411f-403b-8131-ff66cd2f66a6', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5e27bb3d-54b4-45bb-a63e-fd62b44e1089', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('23be0ad7-5c47-4cd4-b5b5-5c11c05666a6', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('0ed7d913-5763-4d2f-9d1d-e7851952ab61', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('bef7932f-374f-4b42-b42c-2b859ce1bce9', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('b9af2f71-bd05-407e-a41a-1b817e01b6c6', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('a665bfdd-e8ad-4fd5-8a74-070b54c2aa61', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('d00774f2-ea0c-406c-b4e2-a0be2f0225b0', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-14', 'Absent', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('c25ff274-e812-40e9-a2b6-c868b87c7212', 'c61434aa-da2b-499b-b524-9400a7e46b03', '2026-09-15', 'Absent', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('7c2b2108-e22b-46ac-b944-427f9c5c0cdb', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('c54a3775-c915-4527-b009-d61e77cdfab6', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('b7c57d2d-a3b3-4078-a081-ed040d5ff5cf', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('e47f3fcc-de1a-4147-a8ab-1bf95d1af021', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5f089d3c-f989-405c-ad93-9034e8ada0d1', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6183be5c-dee9-42e2-88f3-4d4c17fcbfdd', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('7e354216-7fa8-4938-a5ee-348cb3a308ef', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5460308f-0ba8-40d9-92fd-c21ccfcdff59', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('1cdd9cc0-05a0-485e-876e-c6e081071f12', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('19b8a1ee-b45a-41f3-83be-697387738a71', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('dbca7ec5-13b9-47ae-ac64-18a182e1b33b', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('1be684e3-6642-4903-be62-9a2a21aba86e', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-01', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('bdb59c92-6654-4c57-9cd3-87789e9bff1f', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-02', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('f18eb4c0-eb29-4d86-a8e8-b0e68e00b660', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-03', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('74123e84-43ea-48ba-a4ab-94fb76d5ceb8', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-04', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('9ec85929-9f2c-4ce9-ba71-1bb37fb92849', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-07', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('014de971-c708-4a8d-a1eb-6f83a3599802', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-08', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('6c62c3fc-cafc-48f6-ad29-d349e4f4d91d', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-09', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('cd41f35a-b927-4259-b3d7-5041de041f31', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-10', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('5bcbb419-032e-4f1b-952f-59211428a664', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-11', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('9d54dd30-b72d-4bf5-bef9-27dacff593c4', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-14', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL),
	('156fec1c-379c-4ca6-aa9e-1e8cc2a9bafe', 'dc5744ae-965a-4e20-a921-e81c55338003', '2026-09-15', 'Present', NULL, '2026-09-21 07:01:59.111417+00', '2026-09-21 07:01:59.111417+00', 'manual_entry', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: attendance_revisions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."audit_logs" ("id", "user_id", "action", "entity_type", "entity_id", "old_data", "new_data", "reason", "ip_address", "user_agent", "created_at") VALUES
	('a40c9296-d48d-4f44-b774-c3828b6ebd49', 'c69d867e-151b-4f47-b979-7e23f066879a', 'PAYROLL_SUBMITTED', 'payroll_runs', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', NULL, NULL, 'Payroll Pending Approval generated', NULL, NULL, '2026-09-21 07:30:58.780398+00'),
	('673e006e-d061-49ab-afcf-03407aee5231', 'c69d867e-151b-4f47-b979-7e23f066879a', 'PAYROLL_REJECTED', 'payroll_runs', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', NULL, NULL, 'te', NULL, NULL, '2026-09-21 07:37:16.185181+00'),
	('43b5b744-9369-4013-a3e2-809b99a46da3', 'c69d867e-151b-4f47-b979-7e23f066879a', 'PAYROLL_DRAFTED', 'payroll_runs', '53b13173-ccd0-4db6-a51d-410d2f668413', NULL, NULL, 'Payroll Draft generated', NULL, NULL, '2026-09-21 07:37:40.567578+00'),
	('8e6c4df8-d4b8-46f3-852f-c8a5a8641ba6', 'c69d867e-151b-4f47-b979-7e23f066879a', 'PAYROLL_SUBMITTED', 'payroll_runs', '4c403520-7c9a-43ca-afd7-4ed9481527be', NULL, NULL, 'Payroll Pending Approval generated', NULL, NULL, '2026-09-22 05:19:56.881328+00'),
	('8d08947f-8c23-48b1-940a-374bb76dc196', 'c69d867e-151b-4f47-b979-7e23f066879a', 'PAYROLL_SUBMITTED', 'payroll_runs', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', NULL, NULL, 'Payroll Pending Approval generated', NULL, NULL, '2026-09-22 06:26:48.217589+00'),
	('9f47eabb-722f-4af7-bda8-e674f2a130df', 'c69d867e-151b-4f47-b979-7e23f066879a', 'PAYROLL_APPROVED', 'payroll_runs', '4c403520-7c9a-43ca-afd7-4ed9481527be', NULL, NULL, 'Approved by authorized user', NULL, NULL, '2026-09-22 06:26:59.059636+00'),
	('7b8e2bb8-55f1-43f8-9488-c9e89cb0a9f2', 'c69d867e-151b-4f47-b979-7e23f066879a', 'PAYROLL_PAID', 'payroll_runs', '4c403520-7c9a-43ca-afd7-4ed9481527be', NULL, NULL, 'Payroll disbursement completed.', NULL, NULL, '2026-09-22 06:39:08.984734+00');


--
-- Data for Name: cash_advances; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payroll_periods; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payroll_periods" ("id", "period_start", "period_end", "pay_date", "pay_frequency", "created_at", "updated_at", "statutory_schedule_id", "period_sequence", "contribution_month", "statutory_configuration_status") VALUES
	('6ea44707-8a2a-4c01-862e-f0ba3791a469', '2026-08-31', '2026-09-06', '2026-09-06', 'Weekly', '2026-09-21 07:17:15.000866+00', '2026-09-21 07:17:15.000866+00', NULL, NULL, NULL, 'Pending'),
	('d7adb0be-90f5-490d-8261-8287a6733b83', '2026-09-07', '2026-09-13', '2026-09-13', 'Weekly', '2026-09-21 07:19:33.438397+00', '2026-09-21 07:19:33.438397+00', NULL, NULL, NULL, 'Pending'),
	('040cff48-1249-4f5a-8600-2892ff6e7d44', '2026-09-14', '2026-09-20', '2026-09-20', 'Weekly', '2026-09-22 02:07:29.274223+00', '2026-09-22 02:07:29.274223+00', NULL, NULL, NULL, 'Pending'),
	('fb7d2357-9484-4e88-9d37-fffdb4db69e7', '2026-09-01', '2026-09-15', '2026-09-15', 'Weekly', '2026-09-22 06:26:37.116932+00', '2026-09-22 06:26:37.116932+00', NULL, NULL, NULL, 'Pending');


--
-- Data for Name: payroll_runs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payroll_runs" ("id", "payroll_period_id", "status", "created_by", "approved_by", "approved_at", "version", "created_at", "updated_at") VALUES
	('dd9ee335-1884-46e4-8bd6-35e90b87b481', '6ea44707-8a2a-4c01-862e-f0ba3791a469', 'Rejected', 'c69d867e-151b-4f47-b979-7e23f066879a', NULL, NULL, 1, '2026-09-21 07:30:58.753664+00', '2026-09-21 07:37:16.131298+00'),
	('45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'fb7d2357-9484-4e88-9d37-fffdb4db69e7', 'Pending Approval', 'c69d867e-151b-4f47-b979-7e23f066879a', NULL, NULL, 1, '2026-09-22 06:26:48.156772+00', '2026-09-22 06:26:48.156772+00'),
	('4c403520-7c9a-43ca-afd7-4ed9481527be', 'd7adb0be-90f5-490d-8261-8287a6733b83', 'Paid', 'c69d867e-151b-4f47-b979-7e23f066879a', 'c69d867e-151b-4f47-b979-7e23f066879a', '2026-09-22 06:26:58.971+00', 1, '2026-09-22 05:19:56.852091+00', '2026-09-22 06:39:08.935412+00');


--
-- Data for Name: cash_advance_repayments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: company_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."company_settings" ("id", "company_name", "address", "tin", "email", "phone", "logo_url", "created_at", "updated_at", "sss_number", "philhealth_number", "pagibig_number", "standard_working_days_per_period") VALUES
	('d6ca19f6-38cf-4f71-b239-0d3c5785458b', 'Gogreen Payroll', 'Metro Manila, Philippines', '', '', '', NULL, '2026-09-16 02:43:35.572095+00', '2026-09-22 01:57:44.073496+00', '', '', '', 26.00);


--
-- Data for Name: employee_compensation_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."employee_compensation_history" ("id", "employee_id", "pay_frequency", "working_hours_per_day", "working_days_per_week", "effective_from", "effective_to", "created_at", "updated_at", "rate_type", "amount") VALUES
	('ac59e685-459d-4459-a6da-ad1a53b01a71', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.188317+00', 'daily', 500.00),
	('44902d03-ba8a-4ef4-97ea-af21ff4a02a8', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.212514+00', 'daily', 510.00),
	('2cf3d174-f966-4b09-a4bb-1e3187be5440', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.231529+00', 'daily', 520.00),
	('eddd4557-7920-4bd9-a055-c11c94528b43', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.25118+00', 'daily', 530.00),
	('0008a5b1-e745-47bb-8861-d399dc9f2b40', '9ee95966-cbec-45f3-b7a2-202506606c18', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.262733+00', 'daily', 540.00),
	('b938f155-1a1a-4bdc-a753-9202e12498d5', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.272648+00', 'daily', 550.00),
	('d8812b73-4930-4268-87a9-6e67a75ca2ea', '3d361963-c896-4261-8f69-16956028ecee', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.284473+00', 'daily', 560.00),
	('649f06a6-50bc-42f6-8a14-cf248db605e6', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.294276+00', 'daily', 570.00),
	('636dd222-ea5c-4acd-8b41-7a3ffb5f88f4', 'eaab1101-0861-4eb5-820b-3a093cd4420f', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.305195+00', 'daily', 580.00),
	('b2545dd7-245c-49dc-a339-8ec14d56961d', '7be6f1ef-751d-408a-8412-ad8f10f2720d', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.314449+00', 'daily', 590.00),
	('e9b0d300-1d82-41fc-94ad-4de945eb6de7', 'c61434aa-da2b-499b-b524-9400a7e46b03', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.325372+00', 'daily', 600.00),
	('657a7833-8e20-4ef6-b5df-365fb1f056e5', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.338778+00', 'daily', 610.00),
	('f923f494-06f2-4aff-8022-b286943113fe', 'dc5744ae-965a-4e20-a921-e81c55338003', 'Weekly', 8.00, 5.00, '2026-01-01', NULL, '2026-09-21 07:29:45.613459+00', '2026-09-22 02:56:59.350466+00', 'daily', 620.00);


--
-- Data for Name: holidays; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: holiday_exemptions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payroll_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payroll_items" ("id", "payroll_run_id", "employee_id", "sss_table_id", "philhealth_table_id", "pagibig_table_id", "calculation_engine_version", "basic_pay", "total_deductions", "net_pay", "version", "created_at", "updated_at", "is_excluded", "exclusion_reason", "excluded_by", "excluded_at", "present_days", "absent_days", "holiday_days", "paid_days") VALUES
	('43af8e06-56b6-4b01-8360-6db44b2e79b8', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', NULL, NULL, NULL, '3.0.0-simple', 1500.00, 0.00, 1500.00, 1, '2026-09-21 07:30:58.879969+00', '2026-09-21 07:30:58.879969+00', false, NULL, NULL, NULL, 3.00, 1.00, 0.00, 3.00),
	('05cdb5e2-22a1-46af-affc-b6699d49df7f', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', NULL, NULL, NULL, '3.0.0-simple', 1530.00, 0.00, 1530.00, 1, '2026-09-21 07:30:58.948049+00', '2026-09-21 07:30:58.948049+00', false, NULL, NULL, NULL, 3.00, 1.00, 0.00, 3.00),
	('4bbc4ceb-b154-4c78-9c61-9e314c4c3b65', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', NULL, NULL, NULL, '3.0.0-simple', 2080.00, 0.00, 2080.00, 1, '2026-09-21 07:30:59.023012+00', '2026-09-21 07:30:59.023012+00', false, NULL, NULL, NULL, 4.00, 0.00, 0.00, 4.00),
	('4652086c-34b7-4c03-b759-e8cd9c771d0a', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', NULL, NULL, NULL, '3.0.0-simple', 1590.00, 0.00, 1590.00, 1, '2026-09-21 07:30:59.081035+00', '2026-09-21 07:30:59.081035+00', false, NULL, NULL, NULL, 3.00, 1.00, 0.00, 3.00),
	('54effc97-be16-4d4c-b57b-ec16e20dd991', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', '9ee95966-cbec-45f3-b7a2-202506606c18', NULL, NULL, NULL, '3.0.0-simple', 2160.00, 0.00, 2160.00, 1, '2026-09-21 07:30:59.161851+00', '2026-09-21 07:30:59.161851+00', false, NULL, NULL, NULL, 4.00, 0.00, 0.00, 4.00),
	('db7ed8a9-62a4-4b91-861f-c5111b17f493', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', NULL, NULL, NULL, '3.0.0-simple', 1650.00, 0.00, 1650.00, 1, '2026-09-21 07:30:59.224463+00', '2026-09-21 07:30:59.224463+00', false, NULL, NULL, NULL, 3.00, 1.00, 0.00, 3.00),
	('6119c7b1-e5b0-470f-9abf-96476fd2cc64', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', '3d361963-c896-4261-8f69-16956028ecee', NULL, NULL, NULL, '3.0.0-simple', 1680.00, 0.00, 1680.00, 1, '2026-09-21 07:30:59.307914+00', '2026-09-21 07:30:59.307914+00', false, NULL, NULL, NULL, 3.00, 1.00, 0.00, 3.00),
	('d7931285-5f55-4ea9-968f-acf1ab923bec', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', NULL, NULL, NULL, '3.0.0-simple', 2280.00, 0.00, 2280.00, 1, '2026-09-21 07:30:59.37629+00', '2026-09-21 07:30:59.37629+00', false, NULL, NULL, NULL, 4.00, 0.00, 0.00, 4.00),
	('f1036abd-5362-47c2-bd1c-8961861e5a7c', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'eaab1101-0861-4eb5-820b-3a093cd4420f', NULL, NULL, NULL, '3.0.0-simple', 2320.00, 0.00, 2320.00, 1, '2026-09-21 07:30:59.456676+00', '2026-09-21 07:30:59.456676+00', false, NULL, NULL, NULL, 4.00, 0.00, 0.00, 4.00),
	('3f001826-7392-412f-904d-398690d0febf', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', '7be6f1ef-751d-408a-8412-ad8f10f2720d', NULL, NULL, NULL, '3.0.0-simple', 1770.00, 0.00, 1770.00, 1, '2026-09-21 07:30:59.594355+00', '2026-09-21 07:30:59.594355+00', false, NULL, NULL, NULL, 3.00, 1.00, 0.00, 3.00),
	('2b2f00b6-b1e8-41b9-965a-5a4df0a92600', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'c61434aa-da2b-499b-b524-9400a7e46b03', NULL, NULL, NULL, '3.0.0-simple', 1200.00, 0.00, 1200.00, 1, '2026-09-21 07:30:59.745699+00', '2026-09-21 07:30:59.745699+00', false, NULL, NULL, NULL, 2.00, 2.00, 0.00, 2.00),
	('8af9a14f-0104-45d8-92ca-b7bfbb9681d8', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', NULL, NULL, NULL, '3.0.0-simple', 2440.00, 0.00, 2440.00, 1, '2026-09-21 07:30:59.811123+00', '2026-09-21 07:30:59.811123+00', false, NULL, NULL, NULL, 4.00, 0.00, 0.00, 4.00),
	('e1ea6e8e-13d9-4946-81c5-d32826d88f2c', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'dc5744ae-965a-4e20-a921-e81c55338003', NULL, NULL, NULL, '3.0.0-simple', 2480.00, 0.00, 2480.00, 1, '2026-09-21 07:30:59.893345+00', '2026-09-21 07:30:59.893345+00', false, NULL, NULL, NULL, 4.00, 0.00, 0.00, 4.00),
	('f9eb6155-8151-4e57-9a41-cb69895796c9', '4c403520-7c9a-43ca-afd7-4ed9481527be', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', NULL, NULL, NULL, '3.0.0-simple', 2500.00, 0.00, 2500.00, 1, '2026-09-22 05:19:56.987838+00', '2026-09-22 05:19:56.987838+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('0f295d6c-d8d7-46e2-adf8-d335021d1200', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', NULL, NULL, NULL, '3.0.0-simple', 2040.00, 0.00, 2040.00, 1, '2026-09-22 05:19:57.091256+00', '2026-09-22 05:19:57.091256+00', false, NULL, NULL, NULL, 4.00, 1.00, 0.00, 4.00),
	('e90eee28-f25a-4bce-95fe-7503c8a54ec2', '4c403520-7c9a-43ca-afd7-4ed9481527be', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', NULL, NULL, NULL, '3.0.0-simple', 2600.00, 0.00, 2600.00, 1, '2026-09-22 05:19:57.202165+00', '2026-09-22 05:19:57.202165+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('45295919-521d-4508-b191-fddbbc64bfd0', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', NULL, NULL, NULL, '3.0.0-simple', 2120.00, 0.00, 2120.00, 1, '2026-09-22 05:19:57.322628+00', '2026-09-22 05:19:57.322628+00', false, NULL, NULL, NULL, 4.00, 1.00, 0.00, 4.00),
	('d8b16218-1480-41ef-886a-f6f273410d9e', '4c403520-7c9a-43ca-afd7-4ed9481527be', '9ee95966-cbec-45f3-b7a2-202506606c18', NULL, NULL, NULL, '3.0.0-simple', 2700.00, 0.00, 2700.00, 1, '2026-09-22 05:19:57.42057+00', '2026-09-22 05:19:57.42057+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('1d269385-7ff4-4bb0-b3af-2448f82e6477', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', NULL, NULL, NULL, '3.0.0-simple', 2750.00, 0.00, 2750.00, 1, '2026-09-22 05:19:57.512159+00', '2026-09-22 05:19:57.512159+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('628e49ff-7558-4706-90c7-e40a39aba726', '4c403520-7c9a-43ca-afd7-4ed9481527be', '3d361963-c896-4261-8f69-16956028ecee', NULL, NULL, NULL, '3.0.0-simple', 2240.00, 0.00, 2240.00, 1, '2026-09-22 05:19:57.601762+00', '2026-09-22 05:19:57.601762+00', false, NULL, NULL, NULL, 4.00, 1.00, 0.00, 4.00),
	('572ea101-c6f9-48cd-a461-abc8f72880e6', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', NULL, NULL, NULL, '3.0.0-simple', 2850.00, 0.00, 2850.00, 1, '2026-09-22 05:19:57.68415+00', '2026-09-22 05:19:57.68415+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('38382b53-9f22-48af-9e17-f434e2f243fe', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'eaab1101-0861-4eb5-820b-3a093cd4420f', NULL, NULL, NULL, '3.0.0-simple', 2900.00, 0.00, 2900.00, 1, '2026-09-22 05:19:57.777111+00', '2026-09-22 05:19:57.777111+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('12c403a0-7ae3-473e-bbbb-d1a1a3f52468', '4c403520-7c9a-43ca-afd7-4ed9481527be', '7be6f1ef-751d-408a-8412-ad8f10f2720d', NULL, NULL, NULL, '3.0.0-simple', 2950.00, 100.00, 2850.00, 1, '2026-09-22 05:19:57.878415+00', '2026-09-22 05:19:57.878415+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('f7f2cb28-aa9e-4663-a803-567362296883', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'c61434aa-da2b-499b-b524-9400a7e46b03', NULL, NULL, NULL, '3.0.0-simple', 3000.00, 0.00, 3000.00, 1, '2026-09-22 05:19:57.959169+00', '2026-09-22 05:19:57.959169+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('47cf1b85-8687-403a-870b-4984ae4bf179', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', NULL, NULL, NULL, '3.0.0-simple', 3050.00, 0.00, 3050.00, 1, '2026-09-22 05:19:58.021891+00', '2026-09-22 05:19:58.021891+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('9d72b917-8ecf-40e3-a339-c03824683496', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'dc5744ae-965a-4e20-a921-e81c55338003', NULL, NULL, NULL, '3.0.0-simple', 3100.00, 0.00, 3100.00, 1, '2026-09-22 05:19:58.091988+00', '2026-09-22 05:19:58.091988+00', false, NULL, NULL, NULL, 5.00, 0.00, 0.00, 5.00),
	('16aa55c5-4abc-44c4-98f6-8cf5cce6e1a5', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', '920e0fae-bda6-4a85-b2c0-b2a0a6532a7c', NULL, NULL, NULL, '3.0.0-simple', 5000.00, 0.00, 5000.00, 1, '2026-09-22 06:26:48.389993+00', '2026-09-22 06:26:48.389993+00', false, NULL, NULL, NULL, 10.00, 1.00, 0.00, 10.00),
	('ea5d5a35-beaf-402c-968f-8e64ab23a322', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'db5d3e93-cfbe-4564-87cc-49e1019a9537', NULL, NULL, NULL, '3.0.0-simple', 4590.00, 0.00, 4590.00, 1, '2026-09-22 06:26:48.552164+00', '2026-09-22 06:26:48.552164+00', false, NULL, NULL, NULL, 9.00, 2.00, 0.00, 9.00),
	('00fdd15b-b3d0-4d7e-9a22-de5deff3ce64', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', '1e436ab4-ebe8-4d8c-9b6f-7b4ec47c88b4', NULL, NULL, NULL, '3.0.0-simple', 5720.00, 0.00, 5720.00, 1, '2026-09-22 06:26:48.728258+00', '2026-09-22 06:26:48.728258+00', false, NULL, NULL, NULL, 11.00, 0.00, 0.00, 11.00),
	('bd8479d5-9f82-4396-9fee-ae6143d771a5', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'e1f8d3d6-5191-41b9-8fce-dec6713afaa8', NULL, NULL, NULL, '3.0.0-simple', 4240.00, 0.00, 4240.00, 1, '2026-09-22 06:26:48.880247+00', '2026-09-22 06:26:48.880247+00', false, NULL, NULL, NULL, 8.00, 3.00, 0.00, 8.00),
	('42a99b31-c2d1-4159-8b2b-1cdbd9d0d6d3', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', '9ee95966-cbec-45f3-b7a2-202506606c18', NULL, NULL, NULL, '3.0.0-simple', 5400.00, 0.00, 5400.00, 1, '2026-09-22 06:26:49.077045+00', '2026-09-22 06:26:49.077045+00', false, NULL, NULL, NULL, 10.00, 1.00, 0.00, 10.00),
	('1b0a4b18-7bbc-44cf-aad2-59ffe083b953', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'd95dedab-2a6d-4aef-938a-17f8d0d4535f', NULL, NULL, NULL, '3.0.0-simple', 5500.00, 0.00, 5500.00, 1, '2026-09-22 06:26:49.267359+00', '2026-09-22 06:26:49.267359+00', false, NULL, NULL, NULL, 10.00, 1.00, 0.00, 10.00),
	('2ac7c27e-365a-4da2-8854-3ad0236ab26b', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', '3d361963-c896-4261-8f69-16956028ecee', NULL, NULL, NULL, '3.0.0-simple', 5040.00, 0.00, 5040.00, 1, '2026-09-22 06:26:49.454537+00', '2026-09-22 06:26:49.454537+00', false, NULL, NULL, NULL, 9.00, 2.00, 0.00, 9.00),
	('549b1dfa-70db-42eb-9fdc-4cac47512f56', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'a018f8dd-3fad-4638-9ca4-870f8ad6864a', NULL, NULL, NULL, '3.0.0-simple', 6270.00, 0.00, 6270.00, 1, '2026-09-22 06:26:49.619277+00', '2026-09-22 06:26:49.619277+00', false, NULL, NULL, NULL, 11.00, 0.00, 0.00, 11.00),
	('bc3b6d30-1b0e-4403-adaf-be055589c269', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'eaab1101-0861-4eb5-820b-3a093cd4420f', NULL, NULL, NULL, '3.0.0-simple', 6380.00, 0.00, 6380.00, 1, '2026-09-22 06:26:49.786205+00', '2026-09-22 06:26:49.786205+00', false, NULL, NULL, NULL, 11.00, 0.00, 0.00, 11.00),
	('682de975-8cca-46f3-a76c-8116c9493efc', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', '7be6f1ef-751d-408a-8412-ad8f10f2720d', NULL, NULL, NULL, '3.0.0-simple', 5900.00, 0.00, 5900.00, 1, '2026-09-22 06:26:49.970671+00', '2026-09-22 06:26:49.970671+00', false, NULL, NULL, NULL, 10.00, 1.00, 0.00, 10.00),
	('921094c5-fbaa-4f3c-9866-cc52c950a606', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'dc5744ae-965a-4e20-a921-e81c55338003', NULL, NULL, NULL, '3.0.0-simple', 6820.00, 0.00, 6820.00, 1, '2026-09-22 06:26:50.472184+00', '2026-09-22 06:26:50.472184+00', false, NULL, NULL, NULL, 11.00, 0.00, 0.00, 11.00),
	('1db0d921-71e1-4106-895f-a43dd36d05ee', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'c61434aa-da2b-499b-b524-9400a7e46b03', NULL, NULL, NULL, '3.0.0-simple', 4200.00, 0.00, 4200.00, 1, '2026-09-22 06:26:50.155636+00', '2026-09-22 06:26:50.155636+00', false, NULL, NULL, NULL, 7.00, 4.00, 0.00, 7.00),
	('b3d97cad-81b6-4113-84bf-c9f73ee0ce95', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'e44f3fe4-51ff-413e-862c-b5a8cbbd3a2f', NULL, NULL, NULL, '3.0.0-simple', 6710.00, 0.00, 6710.00, 1, '2026-09-22 06:26:50.33297+00', '2026-09-22 06:26:50.33297+00', false, NULL, NULL, NULL, 11.00, 0.00, 0.00, 11.00);


--
-- Data for Name: payroll_adjustments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payroll_deductions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payroll_deductions" ("id", "payroll_item_id", "description", "amount", "source", "source_id", "calculated_amount", "override_reason", "override_by", "override_at", "created_at", "updated_at") VALUES
	('7813cefc-87d0-40c8-b6f6-b4a17f75d3cd', '12c403a0-7ae3-473e-bbbb-d1a1a3f52468', 'Cash Advance Repayment - trip ko lang', 100.00, 'Cash Advance', 'de09eb9a-f499-41cc-b464-9530f94105ce', NULL, NULL, NULL, NULL, '2026-09-22 05:19:57.896849+00', '2026-09-22 05:19:57.896849+00');


--
-- Data for Name: payroll_earnings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payroll_status_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payroll_status_history" ("id", "payroll_run_id", "status", "changed_by", "reason", "created_at", "payment_reference") VALUES
	('3fd4c7b6-48a8-49a2-84b4-a0d07f3176cf', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'Pending Approval', 'c69d867e-151b-4f47-b979-7e23f066879a', 'Submitted for Approval', '2026-09-21 07:30:58.76697+00', NULL),
	('fad514e9-00b9-4e62-bc18-7c0158363e96', 'dd9ee335-1884-46e4-8bd6-35e90b87b481', 'Rejected', 'c69d867e-151b-4f47-b979-7e23f066879a', 'te', '2026-09-21 07:37:16.172962+00', NULL),
	('74c79535-940b-4968-9663-bdceec5b60a1', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'Pending Approval', 'c69d867e-151b-4f47-b979-7e23f066879a', 'Submitted for Approval', '2026-09-22 05:19:56.86701+00', NULL),
	('d33990df-deb0-4668-bc12-6f902d9771f9', '45f9f779-4428-4c9b-a5d6-2846c14bddd1', 'Pending Approval', 'c69d867e-151b-4f47-b979-7e23f066879a', 'Submitted for Approval', '2026-09-22 06:26:48.189528+00', NULL),
	('3bd7c5cd-04ba-48ca-94e6-fb41ae5d8d34', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'Approved', 'c69d867e-151b-4f47-b979-7e23f066879a', 'Approved by authorized user', '2026-09-22 06:26:59.027764+00', NULL),
	('bd61e828-43b1-4d71-b034-7721df5a477f', '4c403520-7c9a-43ca-afd7-4ed9481527be', 'Paid', 'c69d867e-151b-4f47-b979-7e23f066879a', 'Marked as disbursed to employees', '2026-09-22 06:39:08.959035+00', NULL);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."roles" ("id", "name", "description", "created_at", "updated_at") VALUES
	('fc6c159f-b658-4ef4-9226-f5987faf867a', 'Super Admin', 'Full system access including configuration and user management.', '2026-09-16 02:43:34.721024+00', '2026-09-16 02:43:34.721024+00'),
	('ed6fc56b-fc2f-4b5f-ab14-c405bb3f6d0f', 'Payroll Admin', 'Can process payroll and manage employees, but cannot change core system settings.', '2026-09-16 02:43:34.721024+00', '2026-09-16 02:43:34.721024+00'),
	('b9a0a08d-15e6-46a0-9e2c-b55ca41969b3', 'Viewer', 'Read-only access to dashboard and reports.', '2026-09-16 02:43:34.721024+00', '2026-09-16 02:43:34.721024+00');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "role_id", "full_name", "email", "created_at", "updated_at", "employee_id", "permissions") VALUES
	('c69d867e-151b-4f47-b979-7e23f066879a', 'fc6c159f-b658-4ef4-9226-f5987faf867a', 'Nexus Admin', 'admin@nexus.com', '2026-09-16 02:49:29.606046+00', '2026-09-16 02:49:29.64398+00', NULL, '{}');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type", "versioning_status") VALUES
	('avatars', 'avatars', NULL, '2026-09-16 02:43:35.29694+00', '2026-09-16 02:43:35.29694+00', true, false, NULL, NULL, NULL, 'STANDARD', 'DISABLED');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 14, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict h01tzrlRYoBUg5leceHUSwYW0cZdbeLAtf9X3V5aQebUyQAETJjuTm2neG0yWMt

RESET ALL;
