-- Migration: Location Hierarchy for Members
-- File: 20260310000000_location_hierarchy.sql
-- Adds hierarchical location fields (Country → County → Sub-County → Ward) to members

-- ============================================
-- STEP 1: Add location columns to memberships table
-- ============================================

ALTER TABLE public.memberships 
ADD COLUMN IF NOT EXISTS country TEXT NOT NULL DEFAULT 'Kenya',
ADD COLUMN IF NOT EXISTS county TEXT,
ADD COLUMN IF NOT EXISTS sub_county TEXT,
ADD COLUMN IF NOT EXISTS ward TEXT;

-- Add index for location filtering
CREATE INDEX IF NOT EXISTS idx_memberships_location ON public.memberships(country, county, sub_county);

-- ============================================
-- STEP 2: Create counties reference table
-- ============================================

CREATE TABLE IF NOT EXISTS public.counties (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_order INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.counties ENABLE ROW LEVEL SECURITY;

-- RLS: Everyone can read counties
CREATE POLICY "Counties viewable by everyone" ON public.counties FOR SELECT USING (true);

-- Seed counties data (Meru first, then alphabetical)
INSERT INTO public.counties (name, display_order) VALUES 
('Meru', 1),
('Baringo', 2),
('Bomet', 3),
('Bungoma', 4),
('Busia', 5),
('Elgeyo-Marakwet', 6),
('Embu', 7),
('Garissa', 8),
('Homa Bay', 9),
('Isiolo', 10),
('Kajiado', 11),
('Kakamega', 12),
('Kericho', 13),
('Kiambu', 14),
('Kilifi', 15),
('Kirinyaga', 16),
('Kisii', 17),
('Kisumu', 18),
('Kitui', 19),
('Kwale', 20),
('Laikipia', 21),
('Lamu', 22),
('Machakos', 23),
('Makueni', 24),
('Mandera', 25),
('Marsabit', 26),
('Migori', 27),
('Mombasa', 28),
('Murang''a', 29),
('Nairobi City', 30),
('Nakuru', 31),
('Nandi', 32),
('Narok', 33),
('Nyamira', 34),
('Nyandarua', 35),
('Nyeri', 36),
('Samburu', 37),
('Siaya', 38),
('Taita-Taveta', 39),
('Tana River', 40),
('Tharaka-Nithi', 41),
('Trans Nzoia', 42),
('Turkana', 43),
('Uasin Gishu', 44),
('Vihiga', 45),
('Wajir', 46),
('West Pokot', 47)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- STEP 3: Create sub_counties reference table
-- ============================================

CREATE TABLE IF NOT EXISTS public.sub_counties (
    id SERIAL PRIMARY KEY,
    county_id INTEGER NOT NULL REFERENCES public.counties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(county_id, name)
);

ALTER TABLE public.sub_counties ENABLE ROW LEVEL SECURITY;

-- RLS: Everyone can read sub_counties
CREATE POLICY "SubCounties viewable by everyone" ON public.sub_counties FOR SELECT USING (true);

-- Seed sub_counties data (starting with Meru county_id = 1)
INSERT INTO public.sub_counties (county_id, name) VALUES 
-- Meru (1)
(1, 'Imenti North'),
(1, 'Imenti South'),
(1, 'Imenti Central'),
(1, 'Tigania East'),
(1, 'Tigania West'),
(1, 'Igembe North'),
(1, 'Igembe Central'),
(1, 'Igembe South'),
(1, 'Buuri'),
-- Baringo (2)
(2, 'Baringo Central'),
(2, 'Baringo North'),
(2, 'Baringo South'),
(2, 'Baringo West'),
(2, 'East Pokot'),
(2, 'Koibatek'),
-- Bomet (3)
(3, 'Bomet Central'),
(3, 'Bomet East'),
(3, 'Bomet West'),
(3, 'Chepalungu'),
(3, 'Konoin'),
(3, 'Sotik'),
-- Bungoma (4)
(4, 'Bungoma Central'),
(4, 'Bungoma East'),
(4, 'Bungoma North'),
(4, 'Bungoma South'),
(4, 'Bungoma West'),
(4, 'Kimilili'),
(4, 'Mt. Elgon'),
(4, 'Webuye East'),
(4, 'Webuye West'),
-- Busia (5)
(5, 'Busia'),
(5, 'Butula'),
(5, 'Funyula'),
(5, 'Nambale'),
(5, 'Teso North'),
(5, 'Teso South'),
-- Elgeyo-Marakwet (6)
(6, 'Elgeyo'),
(6, 'Marakwet East'),
(6, 'Marakwet West'),
-- Embu (7)
(7, 'Embu East'),
(7, 'Embu North'),
(7, 'Embu West'),
(7, 'Mbeere North'),
(7, 'Mbeere South'),
(7, 'Runyenjes'),
-- Garissa (8)
(8, 'Balambala'),
(8, 'Dujis'),
(8, 'Fafi'),
(8, 'Garissa'),
(8, 'Hulugho'),
(8, 'Ijara'),
(8, 'Lagdera'),
-- Homa Bay (9)
(9, 'Homa Bay Central'),
(9, 'Homa Bay East'),
(9, 'Homa Bay North'),
(9, 'Homa Bay South'),
(9, 'Kasipul'),
(9, 'Mbita'),
(9, 'Ndhiwa'),
(9, 'Rangwe'),
(9, 'Suba'),
-- Isiolo (10)
(10, 'Isiolo'),
(10, 'Merti'),
(10, 'Samburu East'),
(10, 'Samburu North'),
(10, 'Samburu West'),
-- Kajiado (11)
(11, 'Isinya'),
(11, 'Kajiado Central'),
(11, 'Kajiado East'),
(11, 'Kajiado North'),
(11, 'Kajiado South'),
(11, 'Kajiado West'),
(11, 'Loitokitok'),
(11, 'Maggiron'),
(11, 'Shompole'),
-- Kakamega (12)
(12, 'Butere'),
(12, 'Kakamega Central'),
(12, 'Kakamega East'),
(12, 'Kakamega North'),
(12, 'Kakamega South'),
(12, 'Kakamega West'),
(12, 'Khwisero'),
(12, 'Likuyani'),
(12, 'Lurambi'),
(12, 'Malava'),
(12, 'Mumias East'),
(12, 'Mumias West'),
(12, 'Navakholo'),
-- Kiambu (13)
(13, 'Githunguri'),
(13, 'Juja'),
(13, 'Kabete'),
(13, 'Kiambu'),
(13, 'Kikuyu'),
(13, 'Limuru'),
(13, 'Ruiru'),
(13, 'Thika'),
(13, 'Gatundu North'),
(13, 'Gatundu South'),
-- Kilifi (14)
(14, 'Chonyi'),
(14, 'Ganze'),
(14, 'Kaloleni'),
(14, 'Kilifi North'),
(14, 'Kilifi South'),
(14, 'Magarini'),
(14, 'Malindi'),
(14, 'Mombasa'),
(14, 'Rabai'),
(14, 'Sala'),
-- Kirinyaga (15)
(15, 'Kirinyaga Central'),
(15, 'Kirinyaga East'),
(15, 'Kirinyaga West'),
(15, 'Mwea East'),
(15, 'Mwea West'),
(15, 'Ndia'),
-- Kisii (16)
(16, 'Bonchari'),
(16, 'Bomachoge Borabu'),
(16, 'Bomachoge Chache'),
(16, 'Gucha'),
(16, 'Gucha South'),
(16, 'Kenyenya'),
(16, 'Kisii Central'),
(16, 'Kisii South'),
(16, 'Kisii North'),
(16, 'Masaba'),
(16, 'Nyaribari Chache'),
(16, 'Nyaribari Masaba'),
(16, 'Rongo'),
(16, 'Sameta'),
-- Kisumu (17)
(17, 'Kisumu Central'),
(17, 'Kisumu East'),
(17, 'Kisumu West'),
(17, 'Kisumu North'),
(17, 'Muhoroni'),
(17, 'Nyakach'),
(17, 'Nyando'),
(17, 'Seme'),
-- Kitui (18)
(18, 'Kitui Central'),
(18, 'Kitui East'),
(18, 'Kitui North'),
(18, 'Kitui Rural'),
(18, 'Kitui South'),
(18, 'Kitui West'),
(18, 'Masinga'),
(18, 'Matinyani'),
(18, 'Migwani'),
(18, 'Mutitu'),
(18, 'Mutomo'),
(18, 'Mwingi Central'),
(18, 'Mwingi North'),
(18, 'Mwingi West'),
(18, 'Nzambani'),
-- Kwale (19)
(19, 'Kinango'),
(19, 'Lunga Lunga'),
(19, 'Matuga'),
(19, 'Msambweni'),
(19, 'Shimba Hills'),
-- Laikipia (20)
(20, 'Laikipia Central'),
(20, 'Laikipia East'),
(20, 'Laikipia North'),
(20, 'Laikipia West'),
(20, 'Mukogodo'),
(20, 'Ngobit'),
(20, 'Ol Moran'),
-- Lamu (21)
(21, 'Lamu East'),
(21, 'Lamu West'),
-- Machakos (22)
(22, 'Athi River'),
(22, 'Kalama'),
(22, 'Kangundo'),
(22, 'Kathiani'),
(22, 'Machakos'),
(22, 'Masinga'),
(22, 'Matungulu'),
(22, 'Mavoko'),
(22, 'Mwala'),
(22, 'Yatta'),
-- Makueni (23)
(23, 'Kaiti'),
(23, 'Kibwezi East'),
(23, 'Kibwezi West'),
(23, 'Kilifi'),
(23, 'Makueni'),
(23, 'Makindu'),
(23, 'Mbooni'),
(23, 'Nguu'),
(23, 'Tulimani'),
(23, 'Wote'),
(23, 'Zombe'),
-- Mandera (24)
(24, 'Banissa'),
(24, 'Dhobley'),
(24, 'Garrisa'),
(24, 'Lafey'),
(24, 'Mandera East'),
(24, 'Mandera North'),
(24, 'Mandera West'),
(24, 'Rhamu'),
(24, 'Wargadud'),
-- Marsabit (25)
(25, 'Laisamis'),
(25, 'Marsabit Central'),
(25, 'Marsabit North'),
(25, 'Marsabit South'),
(25, 'Moyale'),
(25, 'North Horr'),
(25, 'Saku'),
-- Migori (26)
(26, 'Awendo'),
(26, 'Kuria East'),
(26, 'Kuria West'),
(26, 'Migori'),
(26, 'Ntimaru'),
(26, 'Rongo'),
(26, 'Suna East'),
(26, 'Suna West'),
(26, 'Uriri'),
-- Mombasa (27)
(27, 'Changamwe'),
(27, 'Jomvu'),
(27, 'Kisauni'),
(27, 'Likoni'),
(27, 'Mvita'),
(27, 'Nyali'),
-- Murang'a (28)
(28, 'Gatanga'),
(28, 'Kangema'),
(28, 'Kigumo'),
(28, 'Kiruria'),
(28, 'Murang''a South'),
(28, 'Mathioya'),
(28, 'Othaya'),
(28, 'Waihiga'),
(28, 'Warako'),
-- Nairobi City (29)
(29, 'Dagoretti'),
(29, 'Dagoretti North'),
(29, 'Dagoretti South'),
(29, 'Embakasi'),
(29, 'Embakasi Central'),
(29, 'Embakasi East'),
(29, 'Embakasi North'),
(29, 'Embakasi South'),
(29, 'Embakasi West'),
(29, 'Kamukunji'),
(29, 'Kasarani'),
(29, 'Kenyatta'),
(29, 'Kibra'),
(29, 'Langata'),
(29, 'Makadara'),
(29, 'Mathare'),
(29, 'Ruaraka'),
(29, 'St. Mumbua'),
(29, 'Westlands'),
-- Nakuru (30)
(30, 'Bahati'),
(30, 'Gilgil'),
(30, 'K Nakuru Town East'),
(30, 'K Nakuru Town West'),
(30, 'Kuresoi North'),
(30, 'Kuresoi South'),
(30, 'Molo'),
(30, 'Naivasha'),
(30, 'Nakuru'),
(30, 'Njoro'),
(30, 'Rongai'),
(30, 'Subukia'),
-- Nandi (31)
(31, 'Aldai'),
(31, 'Chesumei'),
(31, 'Emgwen'),
(31, 'Kapsabet'),
(31, 'Nandi Hills'),
(31, 'Tinderet'),
-- Narok (32)
(32, 'Emurua Dikirr'),
(32, 'Kilgoris'),
(32, 'Narok East'),
(32, 'Narok North'),
(32, 'Narok South'),
(32, 'Narok West'),
(32, 'Trans Mara East'),
(32, 'Trans Mara West'),
-- Nyamira (33)
(33, 'Borabu'),
(33, 'Kitutu Masaba'),
(33, 'Mano'),
(33, 'Masaba North'),
(33, 'Nyamira'),
(33, 'Nyamira North'),
(33, 'Nyamira South'),
(33, 'Wanjare'),
-- Nyandarua (34)
(34, 'Kinangop'),
(34, 'Kipipiri'),
(34, 'Mirangine'),
(34, 'Ndaragwa'),
(34, 'Ol Kalou'),
(34, 'Ol Jorok'),
-- Nyeri (35)
(35, 'Kieni'),
(35, 'Mathira'),
(35, 'Mbugwe'),
(35, 'Othaya'),
(35, 'Tetu'),
(35, 'Nyeri Town'),
(35, 'Kanyekini'),
(35, 'Mukurweini'),
-- Samburu (36)
(36, 'Samburu Central'),
(36, 'Samburu East'),
(36, 'Samburu North'),
(36, 'Samburu West'),
-- Siaya (37)
(37, 'Alego Usonga'),
(37, 'Bondo'),
(37, 'Gem'),
(37, 'Rarieda'),
(37, 'Siaya'),
(37, 'Ugenya'),
(37, 'Ugunja'),
-- Taita-Taveta (38)
(38, 'Mwatate'),
(38, 'Taveta'),
(38, 'Voi'),
(38, 'Wundanyi'),
-- Tana River (39)
(39, 'Budaa'),
(39, 'Garsen'),
(39, 'Hola'),
(39, 'Madogo'),
(39, 'Tana Delta'),
(39, 'Tana River'),
-- Tharaka-Nithi (40)
(40, 'Chuka'),
(40, 'Igambang''ombe'),
(40, 'Maara'),
(40, 'Muthambi'),
(40, 'Tharaka'),
-- Trans Nzoia (41)
(41, 'Cherangany'),
(41, 'Kiminini'),
(41, 'Kwanza'),
(41, 'Saboti'),
(41, 'Trans Nzoia East'),
(41, 'Trans Nzoia West'),
-- Turkana (42)
(42, 'Turkana Central'),
(42, 'Turkana East'),
(42, 'Turkana North'),
(42, 'Turkana South'),
(42, 'Turkana West'),
(42, 'Loima'),
(42, 'Turkana Central'),
-- Uasin Gishu (43)
(43, 'Ainabkoi'),
(43, 'Kapseret'),
(43, 'Kesses'),
(43, 'Moiben'),
(43, 'Soy'),
(43, 'Turbo'),
-- Vihiga (44)
(44, 'Emuhaya'),
(44, 'Hamisi'),
(44, 'Luanda'),
(44, 'Sabatia'),
(44, 'Vihiga'),
(44, 'Vihiga'),
-- Wajir (45)
(45, 'Wajir East'),
(45, 'Wajir North'),
(45, 'Wajir South'),
(45, 'Wajir West'),
(45, 'Eldas'),
(45, 'Tarbaj'),
(45, 'Wajir'),
(45, 'Wajir South'),
-- West Pokot (46)
(46, 'Kapenguria'),
(46, 'Kacheliba'),
(46, 'Pokot South'),
(46, 'Sigor'),
(46, 'West Pokot'),
(46, 'Kipkomo')
ON CONFLICT (county_id, name) DO NOTHING;

-- ============================================
-- STEP 4: Create wards reference table
-- ============================================

CREATE TABLE IF NOT EXISTS public.wards (
    id SERIAL PRIMARY KEY,
    sub_county_id INTEGER NOT NULL REFERENCES public.sub_counties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(sub_county_id, name)
);

ALTER TABLE public.wards ENABLE ROW LEVEL SECURITY;

-- RLS: Everyone can read wards
CREATE POLICY "Wards viewable by everyone" ON public.wards FOR SELECT USING (true);

-- Seed wards data for key sub-counties (Imenti South as example)
INSERT INTO public.wards (sub_county_id, name) VALUES 
-- Imenti South (Meru - id needs to match the sub_county)
(2, 'Abogeta East'),
(2, 'Abogeta West'),
(2, 'Igoji East'),
(2, 'Igoji West'),
(2, 'Nkuene'),
(2, 'Kibiriria'),
(2, 'Mitunguu'),
(2, 'Ruiri'),
(2, 'Kangeta'),
(2, 'Mitunguu'),
-- Imenti North
(1, 'Mwanganthia'),
(1, 'Naari'),
(1, 'Ruiri'),
(1, 'Timau'),
(1, 'Kibirichia'),
(1, 'Katheri'),
(1, 'Mukure'),
-- Imenti Central
(3, 'Mariani'),
(3, 'Mikindji'),
(3, 'Mitunguu'),
(3, 'Mitunguu II'),
(3, 'Nkuru'),
(3, 'Rwarera'),
(3, 'Kianjai'),
(3, 'Kibugua'),
(3, 'Muthara'),
-- Tigania East
(4, 'Kianjeru'),
(4, 'Muthara'),
(4, 'Nkubu'),
(4, 'Thithini'),
(4, 'Mitunguu'),
-- Tigania West
(5, 'Kipini'),
(5, 'Mitunguu'),
(5, 'Mutuati'),
(5, 'Nkubu'),
-- Igembe North
(6, 'Kangeta'),
(6, 'Kianjai'),
(6, 'Mitunguu'),
(6, 'Mutuati'),
-- Igembe Central
(7, 'Akachiu'),
(7, 'Kanuni'),
(7, 'Kibiyo'),
(7, 'Mitunguu'),
(7, 'Nthambiro'),
-- Igembe South
(8, 'Athiru'),
(8, 'Gakiranine'),
(8, 'Mitunguu'),
(8, 'Njiiri'),
-- Buuri
(9, 'Kibuon'),
(9, 'Kibutha'),
(9, 'Mitunguu'),
(9, 'Mitunguu'),
(9, 'Ruiri'),
-- Nairobi - Kasarani
(105, 'Kasarani'),
(105, 'Mwiki'),
(105, 'Mihang''a'),
(105, 'Ruai'),
-- Nairobi - Westlands
(118, 'Westlands'),
(118, 'Kitisuru'),
(118, 'Parklands'),
(118, 'Karura'),
(118, 'Mountain View'),
(118, 'Muthangari'),
(118, 'Kangemi'),
(118, 'Lower Kabete'),
-- Nairobi - Dagoretti
(100, 'Dagoretti'),
(100, 'Dagoretti South'),
(100, 'Kawangware'),
(100, 'Riruta'),
(100, 'Uthiriri'),
(100, 'Waithaka'),
-- Mombasa - Changamwe
(155, 'Changamwe'),
(155, 'Jomvu'),
(155, 'Kipevu'),
(155, 'Mombasa'),
(155, 'Mwakirunge'),
-- Kisumu - Kisumu Central
(180, 'Kisumi Central'),
(180, 'Kisumi East'),
(180, 'Kisumi West'),
(180, 'Migosi'),
(180, 'Nyalenda'),
(180, 'Kolwa East'),
(180, 'Kolwa West'),
-- Nakuru - Nakuru
(195, 'Nakuru'),
(195, 'Kenyatta'),
(195, 'Flame Tree'),
(195, 'Lakeview'),
(195, 'Mbaruk'),
(195, 'Rhonda'),
(195, 'Ziwa'),
(195, 'Banita'),
-- Kiambu - Ruiru
(130, 'Ruiru'),
(130, 'Githua'),
(130, 'Gitothua'),
(130, 'Kambi'),
(130, 'Murera'),
(130, 'Thange'),
(130, 'Wamura'),
-- Machakos - Machakos
(160, 'Machakos'),
(160, 'Aiymi'),
(160, 'Athi River'),
(160, 'Kalama'),
(160, 'Kangundo'),
(160, 'Kathiani'),
(160, 'Koma'),
(160, 'Masinga'),
(160, 'Matungulu'),
(160, 'Mavoko'),
(160, 'Michenzane'),
(160, 'Mlolongo'),
(160, 'Mumbuni'),
(160, 'Mutituni'),
(160, 'Mwala'),
(160, 'Ndalani'),
(160, 'Ngelani'),
(160, 'Tala'),
(160, 'Yatta'),
-- Bungoma - Bungoma Central
(35, 'Bungoma'),
(35, 'Bungoma East'),
(35, 'Bungoma West'),
(35, 'Kibuk'),
(35, 'Likuyani'),
(35, 'Makhonge'),
(35, 'Mwega'),
-- Kakamega - Kakamega
(60, 'Kakamega'),
(60, 'Butere'),
(60, 'Khwisero'),
(60, 'Likuyani'),
(60, 'Lurambi'),
(60, 'Malava'),
(60, 'Mumias'),
(60, 'Nurses'),
-- Meru - All wards from Meru sub-counties
(1, 'Athwana'),
(1, 'Gakuruma'),
(1, 'Kibirichia'),
(1, 'Kimaniki'),
(1, 'Kirogo'),
(1, 'Kithirune'),
(1, 'Kiungone'),
(1, 'Marimanti'),
(1, 'Mitunguu'),
(1, 'Mwangathia'),
(1, 'Nkubu'),
(1, 'Ruiri'),
(1, 'Rwarera'),
(1, 'Rwanda'),
(1, 'Thithiri'),
(1, 'Uringu'),
(2, 'Abogeta'),
(2, 'Bwarkani'),
(2, 'Gakiriamu'),
(2, 'Gitimene'),
(2, 'Igiri'),
(2, 'Igoji'),
(2, 'Itieno'),
(2, 'Kariene'),
(2, 'Kathanjuri'),
(2, 'Kibirnyiny'),
(2, 'Kiburine'),
(2, 'Kimachake'),
(2, 'Kithima'),
(2, 'Mitunguu'),
(2, 'Mwangathia'),
(2, 'Nkuene'),
(2, 'Rwanda')
ON CONFLICT (sub_county_id, name) DO NOTHING;

-- ============================================
-- STEP 5: Create API functions for location data
-- ============================================

-- Function to get all counties with Meru first
CREATE OR REPLACE FUNCTION public.get_counties()
RETURNS TABLE(id INTEGER, name TEXT, display_order INTEGER) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY 
    SELECT c.id, c.name, c.display_order
    FROM public.counties c
    ORDER BY c.display_order NULLS LAST, c.name ASC;
END;
$$;

-- Function to get sub-counties by county_id
CREATE OR REPLACE FUNCTION public.get_sub_counties(p_county_id INTEGER)
RETURNS TABLE(id INTEGER, name TEXT, county_id INTEGER) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY 
    SELECT sc.id, sc.name, sc.county_id
    FROM public.sub_counties sc
    WHERE sc.county_id = p_county_id
    ORDER BY sc.name ASC;
END;
$$;

-- Function to get wards by sub_county_id
CREATE OR REPLACE FUNCTION public.get_wards(p_sub_county_id INTEGER)
RETURNS TABLE(id INTEGER, name TEXT, sub_county_id INTEGER) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY 
    SELECT w.id, w.name, w.sub_county_id
    FROM public.wards w
    WHERE w.sub_county_id = p_sub_county_id
    ORDER BY w.name ASC;
END;
$$;

-- ============================================
-- STEP 6: Update RLS policies for memberships location
-- ============================================

-- Allow admins to view all membership location data
CREATE POLICY "Admins can view membership location" ON public.memberships 
FOR SELECT TO authenticated 
USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Allow members to update their own location
CREATE POLICY "Members can update own location" ON public.memberships 
FOR UPDATE TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Make location columns updateable by authenticated users for their own membership
ALTER TABLE public.memberships 
ALTER COLUMN country SET DEFAULT 'Kenya',
ALTER COLUMN country SET NOT NULL;

-- Grant execute on functions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_counties TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_sub_counties TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_wards TO authenticated;

