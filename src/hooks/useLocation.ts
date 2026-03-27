import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface County {
  id: number;
  name: string;
  display_order: number | null;
}

export interface SubCounty {
  id: number;
  name: string;
  county_id: number;
}

export interface Ward {
  id: number;
  name: string;
  sub_county_id: number;
}

export const COUNTRIES = [
  { code: 'KE', name: 'Kenya' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'UG', name: 'Uganda' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'BI', name: 'Burundi' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'OTHER', name: 'Other' },
];

// Hardcoded fallback data for counties (Meru first, then alphabetical)
export const HARDCODED_COUNTIES: County[] = [
  { id: 1, name: 'Meru', display_order: 1 },
  { id: 2, name: 'Baringo', display_order: 2 },
  { id: 3, name: 'Bomet', display_order: 3 },
  { id: 4, name: 'Bungoma', display_order: 4 },
  { id: 5, name: 'Busia', display_order: 5 },
  { id: 6, name: 'Elgeyo-Marakwet', display_order: 6 },
  { id: 7, name: 'Embu', display_order: 7 },
  { id: 8, name: 'Garissa', display_order: 8 },
  { id: 9, name: 'Homa Bay', display_order: 9 },
  { id: 10, name: 'Isiolo', display_order: 10 },
  { id: 11, name: 'Kajiado', display_order: 11 },
  { id: 12, name: 'Kakamega', display_order: 12 },
  { id: 13, name: 'Kericho', display_order: 13 },
  { id: 14, name: 'Kiambu', display_order: 14 },
  { id: 15, name: 'Kilifi', display_order: 15 },
  { id: 16, name: 'Kirinyaga', display_order: 16 },
  { id: 17, name: 'Kisii', display_order: 17 },
  { id: 18, name: 'Kisumu', display_order: 18 },
  { id: 19, name: 'Kitui', display_order: 19 },
  { id: 20, name: 'Kwale', display_order: 20 },
  { id: 21, name: 'Laikipia', display_order: 21 },
  { id: 22, name: 'Lamu', display_order: 22 },
  { id: 23, name: 'Machakos', display_order: 23 },
  { id: 24, name: 'Makueni', display_order: 24 },
  { id: 25, name: 'Mandera', display_order: 25 },
  { id: 26, name: 'Marsabit', display_order: 26 },
  { id: 27, name: 'Migori', display_order: 27 },
  { id: 28, name: 'Mombasa', display_order: 28 },
  { id: 29, name: "Murang'a", display_order: 29 },
  { id: 30, name: 'Nairobi City', display_order: 30 },
  { id: 31, name: 'Nakuru', display_order: 31 },
  { id: 32, name: 'Nandi', display_order: 32 },
  { id: 33, name: 'Narok', display_order: 33 },
  { id: 34, name: 'Nyamira', display_order: 34 },
  { id: 35, name: 'Nyandarua', display_order: 35 },
  { id: 36, name: 'Nyeri', display_order: 36 },
  { id: 37, name: 'Samburu', display_order: 37 },
  { id: 38, name: 'Siaya', display_order: 38 },
  { id: 39, name: 'Taita-Taveta', display_order: 39 },
  { id: 40, name: 'Tana River', display_order: 40 },
  { id: 41, name: 'Tharaka-Nithi', display_order: 41 },
  { id: 42, name: 'Trans Nzoia', display_order: 42 },
  { id: 43, name: 'Turkana', display_order: 43 },
  { id: 44, name: 'Uasin Gishu', display_order: 44 },
  { id: 45, name: 'Vihiga', display_order: 45 },
  { id: 46, name: 'Wajir', display_order: 46 },
  { id: 47, name: 'West Pokot', display_order: 47 },
];

// Hardcoded fallback for all counties' sub-counties
export const HARDCODED_SUB_COUNTIES: SubCounty[] = [
  // Meru (1)
  { id: 1, name: 'Imenti North', county_id: 1 },
  { id: 2, name: 'Imenti South', county_id: 1 },
  { id: 3, name: 'Imenti Central', county_id: 1 },
  { id: 4, name: 'Tigania East', county_id: 1 },
  { id: 5, name: 'Tigania West', county_id: 1 },
  { id: 6, name: 'Igembe North', county_id: 1 },
  { id: 7, name: 'Igembe Central', county_id: 1 },
  { id: 8, name: 'Igembe South', county_id: 1 },
  { id: 9, name: 'Buuri', county_id: 1 },
  // Baringo (2)
  { id: 10, name: 'Baringo Central', county_id: 2 },
  { id: 11, name: 'Baringo North', county_id: 2 },
  { id: 12, name: 'Baringo South', county_id: 2 },
  { id: 13, name: 'Baringo West', county_id: 2 },
  { id: 14, name: 'East Pokot', county_id: 2 },
  { id: 15, name: 'Koibatek', county_id: 2 },
  // Bomet (3)
  { id: 16, name: 'Bomet Central', county_id: 3 },
  { id: 17, name: 'Bomet East', county_id: 3 },
  { id: 18, name: 'Bomet West', county_id: 3 },
  { id: 19, name: 'Chepalungu', county_id: 3 },
  { id: 20, name: 'Konoin', county_id: 3 },
  { id: 21, name: 'Sotik', county_id: 3 },
  // Bungoma (4)
  { id: 22, name: 'Bungoma Central', county_id: 4 },
  { id: 23, name: 'Bungoma East', county_id: 4 },
  { id: 24, name: 'Bungoma North', county_id: 4 },
  { id: 25, name: 'Bungoma South', county_id: 4 },
  { id: 26, name: 'Bungoma West', county_id: 4 },
  { id: 27, name: 'Kimilili', county_id: 4 },
  { id: 28, name: 'Mt. Elgon', county_id: 4 },
  { id: 29, name: 'Webuye East', county_id: 4 },
  { id: 30, name: 'Webuye West', county_id: 4 },
  // Busia (5)
  { id: 31, name: 'Busia', county_id: 5 },
  { id: 32, name: 'Butula', county_id: 5 },
  { id: 33, name: 'Funyula', county_id: 5 },
  { id: 34, name: 'Nambale', county_id: 5 },
  { id: 35, name: 'Teso North', county_id: 5 },
  { id: 36, name: 'Teso South', county_id: 5 },
  // Elgeyo-Marakwet (6)
  { id: 37, name: 'Elgeyo', county_id: 6 },
  { id: 38, name: 'Marakwet East', county_id: 6 },
  { id: 39, name: 'Marakwet West', county_id: 6 },
  // Embu (7)
  { id: 40, name: 'Embu East', county_id: 7 },
  { id: 41, name: 'Embu North', county_id: 7 },
  { id: 42, name: 'Embu West', county_id: 7 },
  { id: 43, name: 'Mbeere North', county_id: 7 },
  { id: 44, name: 'Mbeere South', county_id: 7 },
  { id: 45, name: 'Runyenjes', county_id: 7 },
  // Garissa (8)
  { id: 46, name: 'Balambala', county_id: 8 },
  { id: 47, name: 'Dujis', county_id: 8 },
  { id: 48, name: 'Fafi', county_id: 8 },
  { id: 49, name: 'Garissa', county_id: 8 },
  { id: 50, name: 'Hulugho', county_id: 8 },
  { id: 51, name: 'Ijara', county_id: 8 },
  { id: 52, name: 'Lagdera', county_id: 8 },
  // Homa Bay (9)
  { id: 53, name: 'Homa Bay Central', county_id: 9 },
  { id: 54, name: 'Homa Bay East', county_id: 9 },
  { id: 55, name: 'Homa Bay North', county_id: 9 },
  { id: 56, name: 'Homa Bay South', county_id: 9 },
  { id: 57, name: 'Kasipul', county_id: 9 },
  { id: 58, name: 'Mbita', county_id: 9 },
  { id: 59, name: 'Ndhiwa', county_id: 9 },
  { id: 60, name: 'Rangwe', county_id: 9 },
  { id: 61, name: 'Suba', county_id: 9 },
  // Isiolo (10)
  { id: 62, name: 'Isiolo', county_id: 10 },
  { id: 63, name: 'Merti', county_id: 10 },
  { id: 64, name: 'Samburu East', county_id: 10 },
  { id: 65, name: 'Samburu North', county_id: 10 },
  { id: 66, name: 'Samburu West', county_id: 10 },
  // Kajiado (11)
  { id: 67, name: 'Isinya', county_id: 11 },
  { id: 68, name: 'Kajiado Central', county_id: 11 },
  { id: 69, name: 'Kajiado East', county_id: 11 },
  { id: 70, name: 'Kajiado North', county_id: 11 },
  { id: 71, name: 'Kajiado South', county_id: 11 },
  { id: 72, name: 'Kajiado West', county_id: 11 },
  { id: 73, name: 'Loitokitok', county_id: 11 },
  { id: 74, name: 'Maggiron', county_id: 11 },
  { id: 75, name: 'Shompole', county_id: 11 },
  // Kakamega (12)
  { id: 76, name: 'Butere', county_id: 12 },
  { id: 77, name: 'Kakamega Central', county_id: 12 },
  { id: 78, name: 'Kakamega East', county_id: 12 },
  { id: 79, name: 'Kakamega North', county_id: 12 },
  { id: 80, name: 'Kakamega South', county_id: 12 },
  { id: 81, name: 'Kakamega West', county_id: 12 },
  { id: 82, name: 'Khwisero', county_id: 12 },
  { id: 83, name: 'Likuyani', county_id: 12 },
  { id: 84, name: 'Lurambi', county_id: 12 },
  { id: 85, name: 'Malava', county_id: 12 },
  { id: 86, name: 'Mumias East', county_id: 12 },
  { id: 87, name: 'Mumias West', county_id: 12 },
  { id: 88, name: 'Navakholo', county_id: 12 },
  // Kiambu (13)
  { id: 89, name: 'Githunguri', county_id: 13 },
  { id: 90, name: 'Juja', county_id: 13 },
  { id: 91, name: 'Kabete', county_id: 13 },
  { id: 92, name: 'Kiambu', county_id: 13 },
  { id: 93, name: 'Kikuyu', county_id: 13 },
  { id: 94, name: 'Limuru', county_id: 13 },
  { id: 95, name: 'Ruiru', county_id: 13 },
  { id: 96, name: 'Thika', county_id: 13 },
  { id: 97, name: 'Gatundu North', county_id: 13 },
  { id: 98, name: 'Gatundu South', county_id: 13 },
  // Kilifi (14)
  { id: 99, name: 'Chonyi', county_id: 14 },
  { id: 100, name: 'Ganze', county_id: 14 },
  { id: 101, name: 'Kaloleni', county_id: 14 },
  { id: 102, name: 'Kilifi North', county_id: 14 },
  { id: 103, name: 'Kilifi South', county_id: 14 },
  { id: 104, name: 'Magarini', county_id: 14 },
  { id: 105, name: 'Malindi', county_id: 14 },
  { id: 106, name: 'Mombasa', county_id: 14 },
  { id: 107, name: 'Rabai', county_id: 14 },
  { id: 108, name: 'Sala', county_id: 14 },
  // Kirinyaga (15)
  { id: 109, name: 'Kirinyaga Central', county_id: 15 },
  { id: 110, name: 'Kirinyaga East', county_id: 15 },
  { id: 111, name: 'Kirinyaga West', county_id: 15 },
  { id: 112, name: 'Mwea East', county_id: 15 },
  { id: 113, name: 'Mwea West', county_id: 15 },
  { id: 114, name: 'Ndia', county_id: 15 },
  // Kisii (16)
  { id: 115, name: 'Bonchari', county_id: 16 },
  { id: 116, name: 'Bomachoge Borabu', county_id: 16 },
  { id: 117, name: 'Bomachoge Chache', county_id: 16 },
  { id: 118, name: 'Gucha', county_id: 16 },
  { id: 119, name: 'Gucha South', county_id: 16 },
  { id: 120, name: 'Kenyenya', county_id: 16 },
  { id: 121, name: 'Kisii Central', county_id: 16 },
  { id: 122, name: 'Kisii South', county_id: 16 },
  { id: 123, name: 'Kisii North', county_id: 16 },
  { id: 124, name: 'Masaba', county_id: 16 },
  { id: 125, name: 'Nyaribari Chache', county_id: 16 },
  { id: 126, name: 'Nyaribari Masaba', county_id: 16 },
  { id: 127, name: 'Rongo', county_id: 16 },
  { id: 128, name: 'Sameta', county_id: 16 },
  // Kisumu (17)
  { id: 129, name: 'Kisumu Central', county_id: 17 },
  { id: 130, name: 'Kisumu East', county_id: 17 },
  { id: 131, name: 'Kisumu West', county_id: 17 },
  { id: 132, name: 'Kisumu North', county_id: 17 },
  { id: 133, name: 'Muhoroni', county_id: 17 },
  { id: 134, name: 'Nyakach', county_id: 17 },
  { id: 135, name: 'Nyando', county_id: 17 },
  { id: 136, name: 'Seme', county_id: 17 },
  // Kitui (18)
  { id: 137, name: 'Kitui Central', county_id: 18 },
  { id: 138, name: 'Kitui East', county_id: 18 },
  { id: 139, name: 'Kitui North', county_id: 18 },
  { id: 140, name: 'Kitui Rural', county_id: 18 },
  { id: 141, name: 'Kitui South', county_id: 18 },
  { id: 142, name: 'Kitui West', county_id: 18 },
  { id: 143, name: 'Masinga', county_id: 18 },
  { id: 144, name: 'Matinyani', county_id: 18 },
  { id: 145, name: 'Migwani', county_id: 18 },
  { id: 146, name: 'Mutitu', county_id: 18 },
  { id: 147, name: 'Mutomo', county_id: 18 },
  { id: 148, name: 'Mwingi Central', county_id: 18 },
  { id: 149, name: 'Mwingi North', county_id: 18 },
  { id: 150, name: 'Mwingi West', county_id: 18 },
  { id: 151, name: 'Nzambani', county_id: 18 },
  // Kwale (19)
  { id: 152, name: 'Kinango', county_id: 19 },
  { id: 153, name: 'Lunga Lunga', county_id: 19 },
  { id: 154, name: 'Matuga', county_id: 19 },
  { id: 155, name: 'Msambweni', county_id: 19 },
  { id: 156, name: 'Shimba Hills', county_id: 19 },
  // Laikipia (20)
  { id: 157, name: 'Laikipia Central', county_id: 20 },
  { id: 158, name: 'Laikipia East', county_id: 20 },
  { id: 159, name: 'Laikipia North', county_id: 20 },
  { id: 160, name: 'Laikipia West', county_id: 20 },
  { id: 161, name: 'Mukogodo', county_id: 20 },
  { id: 162, name: 'Ngobit', county_id: 20 },
  { id: 163, name: 'Ol Moran', county_id: 20 },
  // Lamu (21)
  { id: 164, name: 'Lamu East', county_id: 21 },
  { id: 165, name: 'Lamu West', county_id: 21 },
  // Machakos (22)
  { id: 166, name: 'Athi River', county_id: 22 },
  { id: 167, name: 'Kalama', county_id: 22 },
  { id: 168, name: 'Kangundo', county_id: 22 },
  { id: 169, name: 'Kathiani', county_id: 22 },
  { id: 170, name: 'Machakos', county_id: 22 },
  { id: 171, name: 'Masinga', county_id: 22 },
  { id: 172, name: 'Matungulu', county_id: 22 },
  { id: 173, name: 'Mavoko', county_id: 22 },
  { id: 174, name: 'Mwala', county_id: 22 },
  { id: 175, name: 'Yatta', county_id: 22 },
  // Makueni (23)
  { id: 176, name: 'Kaiti', county_id: 23 },
  { id: 177, name: 'Kibwezi East', county_id: 23 },
  { id: 178, name: 'Kibwezi West', county_id: 23 },
  { id: 179, name: 'Kilifi', county_id: 23 },
  { id: 180, name: 'Makueni', county_id: 23 },
  { id: 181, name: 'Makindu', county_id: 23 },
  { id: 182, name: 'Mbooni', county_id: 23 },
  { id: 183, name: 'Nguu', county_id: 23 },
  { id: 184, name: 'Tulimani', county_id: 23 },
  { id: 185, name: 'Wote', county_id: 23 },
  { id: 186, name: 'Zombe', county_id: 23 },
  // Mandera (24)
  { id: 187, name: 'Banissa', county_id: 24 },
  { id: 188, name: 'Dhobley', county_id: 24 },
  { id: 189, name: 'Garrisa', county_id: 24 },
  { id: 190, name: 'Lafey', county_id: 24 },
  { id: 191, name: 'Mandera East', county_id: 24 },
  { id: 192, name: 'Mandera North', county_id: 24 },
  { id: 193, name: 'Mandera West', county_id: 24 },
  { id: 194, name: 'Rhamu', county_id: 24 },
  { id: 195, name: 'Wargadud', county_id: 24 },
  // Marsabit (25)
  { id: 196, name: 'Laisamis', county_id: 25 },
  { id: 197, name: 'Marsabit Central', county_id: 25 },
  { id: 198, name: 'Marsabit North', county_id: 25 },
  { id: 199, name: 'Marsabit South', county_id: 25 },
  { id: 200, name: 'Moyale', county_id: 25 },
  { id: 201, name: 'North Horr', county_id: 25 },
  { id: 202, name: 'Saku', county_id: 25 },
  // Migori (26)
  { id: 203, name: 'Awendo', county_id: 26 },
  { id: 204, name: 'Kuria East', county_id: 26 },
  { id: 205, name: 'Kuria West', county_id: 26 },
  { id: 206, name: 'Migori', county_id: 26 },
  { id: 207, name: 'Ntimaru', county_id: 26 },
  { id: 208, name: 'Rongo', county_id: 26 },
  { id: 209, name: 'Suna East', county_id: 26 },
  { id: 210, name: 'Suna West', county_id: 26 },
  { id: 211, name: 'Uriri', county_id: 26 },
  // Mombasa (27)
  { id: 212, name: 'Changamwe', county_id: 27 },
  { id: 213, name: 'Jomvu', county_id: 27 },
  { id: 214, name: 'Kisauni', county_id: 27 },
  { id: 215, name: 'Likoni', county_id: 27 },
  { id: 216, name: 'Mvita', county_id: 27 },
  { id: 217, name: 'Nyali', county_id: 27 },
  // Murang'a (28)
  { id: 218, name: 'Gatanga', county_id: 28 },
  { id: 219, name: 'Kangema', county_id: 28 },
  { id: 220, name: 'Kigumo', county_id: 28 },
  { id: 221, name: 'Kiruria', county_id: 28 },
  { id: 222, name: "Murang'a South", county_id: 28 },
  { id: 223, name: 'Mathioya', county_id: 28 },
  { id: 224, name: 'Othaya', county_id: 28 },
  { id: 225, name: 'Waihiga', county_id: 28 },
  { id: 226, name: 'Warako', county_id: 28 },
  // Nairobi City (29)
  { id: 227, name: 'Dagoretti', county_id: 29 },
  { id: 228, name: 'Dagoretti North', county_id: 29 },
  { id: 229, name: 'Dagoretti South', county_id: 29 },
  { id: 230, name: 'Embakasi', county_id: 29 },
  { id: 231, name: 'Embakasi Central', county_id: 29 },
  { id: 232, name: 'Embakasi East', county_id: 29 },
  { id: 233, name: 'Embakasi North', county_id: 29 },
  { id: 234, name: 'Embakasi South', county_id: 29 },
  { id: 235, name: 'Embakasi West', county_id: 29 },
  { id: 236, name: 'Kamukunji', county_id: 29 },
  { id: 237, name: 'Kasarani', county_id: 29 },
  { id: 238, name: 'Kenyatta', county_id: 29 },
  { id: 239, name: 'Kibra', county_id: 29 },
  { id: 240, name: 'Langata', county_id: 29 },
  { id: 241, name: 'Makadara', county_id: 29 },
  { id: 242, name: 'Mathare', county_id: 29 },
  { id: 243, name: 'Ruaraka', county_id: 29 },
  { id: 244, name: 'St. Mumbua', county_id: 29 },
  { id: 245, name: 'Westlands', county_id: 29 },
  // Nakuru (30)
  { id: 246, name: 'Bahati', county_id: 30 },
  { id: 247, name: 'Gilgil', county_id: 30 },
  { id: 248, name: 'Nakuru Town East', county_id: 30 },
  { id: 249, name: 'Nakuru Town West', county_id: 30 },
  { id: 250, name: 'Kuresoi North', county_id: 30 },
  { id: 251, name: 'Kuresoi South', county_id: 30 },
  { id: 252, name: 'Molo', county_id: 30 },
  { id: 253, name: 'Naivasha', county_id: 30 },
  { id: 254, name: 'Nakuru', county_id: 30 },
  { id: 255, name: 'Njoro', county_id: 30 },
  { id: 256, name: 'Rongai', county_id: 30 },
  { id: 257, name: 'Subukia', county_id: 30 },
  // Nandi (31)
  { id: 258, name: 'Aldai', county_id: 31 },
  { id: 259, name: 'Chesumei', county_id: 31 },
  { id: 260, name: 'Emgwen', county_id: 31 },
  { id: 261, name: 'Kapsabet', county_id: 31 },
  { id: 262, name: 'Nandi Hills', county_id: 31 },
  { id: 263, name: 'Tinderet', county_id: 31 },
  // Narok (32)
  { id: 264, name: 'Emurua Dikirr', county_id: 32 },
  { id: 265, name: 'Kilgoris', county_id: 32 },
  { id: 266, name: 'Narok East', county_id: 32 },
  { id: 267, name: 'Narok North', county_id: 32 },
  { id: 268, name: 'Narok South', county_id: 32 },
  { id: 269, name: 'Narok West', county_id: 32 },
  { id: 270, name: 'Trans Mara East', county_id: 32 },
  { id: 271, name: 'Trans Mara West', county_id: 32 },
  // Nyamira (33)
  { id: 272, name: 'Borabu', county_id: 33 },
  { id: 273, name: 'Kitutu Masaba', county_id: 33 },
  { id: 274, name: 'Mano', county_id: 33 },
  { id: 275, name: 'Masaba North', county_id: 33 },
  { id: 276, name: 'Nyamira', county_id: 33 },
  { id: 277, name: 'Nyamira North', county_id: 33 },
  { id: 278, name: 'Nyamira South', county_id: 33 },
  { id: 279, name: 'Wanjare', county_id: 33 },
  // Nyandarua (34)
  { id: 280, name: 'Kinangop', county_id: 34 },
  { id: 281, name: 'Kipipiri', county_id: 34 },
  { id: 282, name: 'Mirangine', county_id: 34 },
  { id: 283, name: 'Ndaragwa', county_id: 34 },
  { id: 284, name: 'Ol Kalou', county_id: 34 },
  { id: 285, name: 'Ol Jorok', county_id: 34 },
  // Nyeri (35)
  { id: 286, name: 'Kieni', county_id: 35 },
  { id: 287, name: 'Mathira', county_id: 35 },
  { id: 288, name: 'Mbugwe', county_id: 35 },
  { id: 289, name: 'Othaya', county_id: 35 },
  { id: 290, name: 'Tetu', county_id: 35 },
  { id: 291, name: 'Nyeri Town', county_id: 35 },
  { id: 292, name: 'Kanyekini', county_id: 35 },
  { id: 293, name: 'Mukurweini', county_id: 35 },
  // Samburu (36)
  { id: 294, name: 'Samburu Central', county_id: 36 },
  { id: 295, name: 'Samburu East', county_id: 36 },
  { id: 296, name: 'Samburu North', county_id: 36 },
  { id: 297, name: 'Samburu West', county_id: 36 },
  // Siaya (37)
  { id: 298, name: 'Alego Usonga', county_id: 37 },
  { id: 299, name: 'Bondo', county_id: 37 },
  { id: 300, name: 'Gem', county_id: 37 },
  { id: 301, name: 'Rarieda', county_id: 37 },
  { id: 302, name: 'Siaya', county_id: 37 },
  { id: 303, name: 'Ugenya', county_id: 37 },
  { id: 304, name: 'Ugunja', county_id: 37 },
  // Taita-Taveta (38)
  { id: 305, name: 'Mwatate', county_id: 38 },
  { id: 306, name: 'Taveta', county_id: 38 },
  { id: 307, name: 'Voi', county_id: 38 },
  { id: 308, name: 'Wundanyi', county_id: 38 },
  // Tana River (39)
  { id: 309, name: 'Budaa', county_id: 39 },
  { id: 310, name: 'Garsen', county_id: 39 },
  { id: 311, name: 'Hola', county_id: 39 },
  { id: 312, name: 'Madogo', county_id: 39 },
  { id: 313, name: 'Tana Delta', county_id: 39 },
  { id: 314, name: 'Tana River', county_id: 39 },
  // Tharaka-Nithi (40)
  { id: 315, name: 'Chuka', county_id: 40 },
  { id: 316, name: 'Igambaram', county_id: 40 },
  { id: 317, name: 'Maara', county_id: 40 },
  { id: 318, name: 'Muthambi', county_id: 40 },
  { id: 319, name: 'Tharaka', county_id: 40 },
  // Trans Nzoia (41)
  { id: 320, name: 'Cherangany', county_id: 41 },
  { id: 321, name: 'Kiminini', county_id: 41 },
  { id: 322, name: 'Kwanza', county_id: 41 },
  { id: 323, name: 'Saboti', county_id: 41 },
  { id: 324, name: 'Trans Nzoia East', county_id: 41 },
  { id: 325, name: 'Trans Nzoia West', county_id: 41 },
  // Turkana (42)
  { id: 326, name: 'Turkana Central', county_id: 42 },
  { id: 327, name: 'Turkana East', county_id: 42 },
  { id: 328, name: 'Turkana North', county_id: 42 },
  { id: 329, name: 'Turkana South', county_id: 42 },
  { id: 330, name: 'Turkana West', county_id: 42 },
  { id: 331, name: 'Loima', county_id: 42 },
  // Uasin Gishu (43)
  { id: 332, name: 'Ainabkoi', county_id: 43 },
  { id: 333, name: 'Kapseret', county_id: 43 },
  { id: 334, name: 'Kesses', county_id: 43 },
  { id: 335, name: 'Moiben', county_id: 43 },
  { id: 336, name: 'Soy', county_id: 43 },
  { id: 337, name: 'Turbo', county_id: 43 },
  // Vihiga (44)
  { id: 338, name: 'Emuhaya', county_id: 44 },
  { id: 339, name: 'Hamisi', county_id: 44 },
  { id: 340, name: 'Luanda', county_id: 44 },
  { id: 341, name: 'Sabatia', county_id: 44 },
  { id: 342, name: 'Vihiga', county_id: 44 },
  // Wajir (45)
  { id: 343, name: 'Wajir East', county_id: 45 },
  { id: 344, name: 'Wajir North', county_id: 45 },
  { id: 345, name: 'Wajir South', county_id: 45 },
  { id: 346, name: 'Wajir West', county_id: 45 },
  { id: 347, name: 'Eldas', county_id: 45 },
  { id: 348, name: 'Tarbaj', county_id: 45 },
  // West Pokot (46)
  { id: 349, name: 'Kapenguria', county_id: 46 },
  { id: 350, name: 'Kacheliba', county_id: 46 },
  { id: 351, name: 'Pokot South', county_id: 46 },
  { id: 352, name: 'Sigor', county_id: 46 },
  { id: 353, name: 'West Pokot', county_id: 46 },
  { id: 354, name: 'Kipkomo', county_id: 46 },
];

// Hardcoded fallback for wards - organized by sub_county_id
export const HARDCODED_WARDS: Ward[] = [
  // Imenti North (1)
  { id: 1, name: 'Municipality', sub_county_id: 1 },
  { id: 2, name: 'Ntima East', sub_county_id: 1 },
  { id: 3, name: 'Ntima West', sub_county_id: 1 },
  { id: 4, name: 'Nyaki East', sub_county_id: 1 },
  { id: 5, name: 'Nyaki West', sub_county_id: 1 },
  // Imenti South (2)
  { id: 6, name: 'Abogeta East', sub_county_id: 2 },
  { id: 7, name: 'Abogeta West', sub_county_id: 2 },
  { id: 8, name: 'Igoji East', sub_county_id: 2 },
  { id: 9, name: 'Igoji West', sub_county_id: 2 },
  { id: 10, name: 'Mitunguu', sub_county_id: 2 },
  { id: 11, name: 'Nkuene', sub_county_id: 2 },
  // Imenti Central (3)
  { id: 12, name: 'Abothuguchi Central', sub_county_id: 3 },
  { id: 13, name: 'Abothuguchi West', sub_county_id: 3 },
  { id: 14, name: 'Kiagu', sub_county_id: 3 },
  { id: 15, name: 'Kibirichia', sub_county_id: 3 },
  { id: 16, name: 'Mwanganthia', sub_county_id: 3 },
  // Buuri (9)
  { id: 17, name: 'Kiirua/Naari', sub_county_id: 9 },
  { id: 18, name: 'Kisima', sub_county_id: 9 },
  { id: 19, name: 'Ruiri/Rwarera', sub_county_id: 9 },
  { id: 20, name: 'Timau', sub_county_id: 9 },
  // Tigania East (4)
  { id: 21, name: 'Karama', sub_county_id: 4 },
  { id: 22, name: 'Kiguchwa', sub_county_id: 4 },
  { id: 23, name: 'Mikinduri', sub_county_id: 4 },
  { id: 24, name: 'Muthara', sub_county_id: 4 },
  { id: 25, name: 'Thangatha', sub_county_id: 4 },
  // Tigania West (5)
  { id: 26, name: 'Akithi', sub_county_id: 5 },
  { id: 27, name: 'Athwana', sub_county_id: 5 },
  { id: 28, name: 'Kianjai', sub_county_id: 5 },
  { id: 29, name: 'Mbeu', sub_county_id: 5 },
  { id: 30, name: 'Nkomo', sub_county_id: 5 },
  // Igembe North (6)
  { id: 31, name: 'Amwathi', sub_county_id: 6 },
  { id: 32, name: 'Antuambui', sub_county_id: 6 },
  { id: 33, name: 'Antubetwe Kiongo', sub_county_id: 6 },
  { id: 34, name: 'Naathu', sub_county_id: 6 },
  { id: 35, name: 'Ntunene', sub_county_id: 6 },
  // Igembe Central (7)
  { id: 36, name: 'Akirang\'ondu', sub_county_id: 7 },
  { id: 37, name: 'Athiru Ruujine', sub_county_id: 7 },
  { id: 38, name: 'Igembe East', sub_county_id: 7 },
  { id: 39, name: 'Kangeta', sub_county_id: 7 },
  { id: 40, name: 'Njia', sub_county_id: 7 },
  // Igembe South (8)
  { id: 41, name: 'Akachiu', sub_county_id: 8 },
  { id: 42, name: 'Athiru Gaiti', sub_county_id: 8 },
  { id: 43, name: 'Kanuni', sub_county_id: 8 },
  { id: 44, name: 'Kiegoi/Antubochiu', sub_county_id: 8 },
  { id: 45, name: 'Maua', sub_county_id: 8 },
  // Nairobi - Kasarani (237)
  { id: 52, name: 'Kasarani', sub_county_id: 237 },
  { id: 53, name: 'Mwiki', sub_county_id: 237 },
  { id: 54, name: 'Mihanga', sub_county_id: 237 },
  { id: 55, name: 'Ruai', sub_county_id: 237 },
  // Nairobi - Westlands (245)
  { id: 56, name: 'Westlands', sub_county_id: 245 },
  { id: 57, name: 'Kitisuru', sub_county_id: 245 },
  { id: 58, name: 'Parklands', sub_county_id: 245 },
  { id: 59, name: 'Karura', sub_county_id: 245 },
  { id: 60, name: 'Mountain View', sub_county_id: 245 },
  { id: 61, name: 'Muthangari', sub_county_id: 245 },
  { id: 62, name: 'Kangemi', sub_county_id: 245 },
  { id: 63, name: 'Lower Kabete', sub_county_id: 245 },
  // Nairobi - Dagoretti (227)
  { id: 64, name: 'Dagoretti', sub_county_id: 227 },
  { id: 65, name: 'Dagoretti South', sub_county_id: 227 },
  { id: 66, name: 'Kawangware', sub_county_id: 227 },
  { id: 67, name: 'Riruta', sub_county_id: 227 },
  { id: 68, name: 'Uthiriri', sub_county_id: 227 },
  { id: 69, name: 'Waithaka', sub_county_id: 227 },
  // Mombasa - Changamwe (212)
  { id: 70, name: 'Changamwe', sub_county_id: 212 },
  { id: 71, name: 'Jomvu', sub_county_id: 212 },
  { id: 72, name: 'Kipevu', sub_county_id: 212 },
  { id: 73, name: 'Mombasa', sub_county_id: 212 },
  { id: 74, name: 'Mwakirunge', sub_county_id: 212 },
  // Kisumu - Kisumu Central (129)
  { id: 75, name: 'Kisumu Central', sub_county_id: 129 },
  { id: 76, name: 'Kisumu East', sub_county_id: 129 },
  { id: 77, name: 'Kisumu West', sub_county_id: 129 },
  { id: 78, name: 'Migosi', sub_county_id: 129 },
  { id: 79, name: 'Nyalenda', sub_county_id: 129 },
  { id: 80, name: 'Kolwa East', sub_county_id: 129 },
  { id: 81, name: 'Kolwa West', sub_county_id: 129 },
  // Nakuru - Nakuru (254)
  { id: 82, name: 'Nakuru', sub_county_id: 254 },
  { id: 83, name: 'Kenyatta', sub_county_id: 254 },
  { id: 84, name: 'Flame Tree', sub_county_id: 254 },
  { id: 85, name: 'Lakeview', sub_county_id: 254 },
  { id: 86, name: 'Mbaruk', sub_county_id: 254 },
  { id: 87, name: 'Rhonda', sub_county_id: 254 },
  { id: 88, name: 'Ziwa', sub_county_id: 254 },
  { id: 89, name: 'Banita', sub_county_id: 254 },
  // Kiambu - Ruiru (95)
  { id: 90, name: 'Ruiru', sub_county_id: 95 },
  { id: 91, name: 'Githua', sub_county_id: 95 },
  { id: 92, name: 'Gitothua', sub_county_id: 95 },
  { id: 93, name: 'Kambi', sub_county_id: 95 },
  { id: 94, name: 'Murera', sub_county_id: 95 },
  { id: 95, name: 'Thange', sub_county_id: 95 },
  { id: 96, name: 'Wamura', sub_county_id: 95 },
  // Machakos - Machakos (170)
  { id: 97, name: 'Machakos', sub_county_id: 170 },
  { id: 98, name: 'Aiymi', sub_county_id: 170 },
  { id: 99, name: 'Athi River', sub_county_id: 170 },
  { id: 100, name: 'Kalama', sub_county_id: 170 },
  { id: 101, name: 'Kangundo', sub_county_id: 170 },
  { id: 102, name: 'Kathiani', sub_county_id: 170 },
  { id: 103, name: 'Koma', sub_county_id: 170 },
  { id: 104, name: 'Masinga', sub_county_id: 170 },
  { id: 105, name: 'Matungulu', sub_county_id: 170 },
  { id: 106, name: 'Mavoko', sub_county_id: 170 },
  { id: 107, name: 'Michenzane', sub_county_id: 170 },
  { id: 108, name: 'Mlolongo', sub_county_id: 170 },
  { id: 109, name: 'Mumbuni', sub_county_id: 170 },
  { id: 110, name: 'Mutituni', sub_county_id: 170 },
  { id: 111, name: 'Mwala', sub_county_id: 170 },
  { id: 112, name: 'Ndalani', sub_county_id: 170 },
  { id: 113, name: 'Ngelani', sub_county_id: 170 },
  { id: 114, name: 'Tala', sub_county_id: 170 },
  { id: 115, name: 'Yatta', sub_county_id: 170 },
  // Bungoma - Bungoma Central (22)
  { id: 116, name: 'Bungoma', sub_county_id: 22 },
  { id: 117, name: 'Bungoma East', sub_county_id: 22 },
  { id: 118, name: 'Bungoma West', sub_county_id: 22 },
  { id: 119, name: 'Kibuk', sub_county_id: 22 },
  { id: 120, name: 'Likuyani', sub_county_id: 22 },
  { id: 121, name: 'Makhonge', sub_county_id: 22 },
  { id: 122, name: 'Mwega', sub_county_id: 22 },
  // Kakamega - Kakamega (77)
  { id: 123, name: 'Kakamega', sub_county_id: 77 },
  { id: 124, name: 'Butere', sub_county_id: 77 },
  { id: 125, name: 'Khwisero', sub_county_id: 77 },
  { id: 126, name: 'Likuyani', sub_county_id: 77 },
  { id: 127, name: 'Lurambi', sub_county_id: 77 },
  { id: 128, name: 'Malava', sub_county_id: 77 },
  { id: 129, name: 'Mumias', sub_county_id: 77 },
];

// Backward compatibility exports
export const MERU_SUB_COUNTIES = HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === 1);
export const IMENTI_SOUTH_WARDS = HARDCODED_WARDS.filter(w => w.sub_county_id === 2);

export const useLocation = () => {
  const [counties, setCounties] = useState<County[]>(HARDCODED_COUNTIES);
  const [subCounties, setSubCounties] = useState<SubCounty[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingCounties, setLoadingCounties] = useState(false);
  const [loadingSubCounties, setLoadingSubCounties] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch counties from database (with fallback to hardcoded)
  const fetchCounties = useCallback(async () => {
    setLoadingCounties(true);
    setError(null);
    try {
      // Try RPC first
      const { data, error: fetchError } = await (supabase.rpc as any)('get_counties');
      if (!fetchError && data && data.length > 0) {
        setCounties(data);
      } else {
        // Fallback: query counties table directly
        const { data: countiesData, error: countiesError } = await (supabase.from as any)('counties')
          .select('*')
          .order('display_order', { ascending: true })
          .order('name', { ascending: true });
        if (!countiesError && countiesData && countiesData.length > 0) {
          setCounties(countiesData);
        }
        // Otherwise keep using HARDCODED_COUNTIES
      }
    } catch (err: any) {
      console.log('Using hardcoded counties (DB not available yet)');
      // Keep using HARDCODED_COUNTIES
    } finally {
      setLoadingCounties(false);
    }
  }, []);

  // Fetch sub-counties by county_id
  const fetchSubCounties = useCallback(async (countyId: number) => {
    if (!countyId) {
      setSubCounties([]);
      return;
    }
    setLoadingSubCounties(true);
    setError(null);
    try {
      const { data, error: fetchError } = await (supabase.rpc as any)('get_sub_counties', { p_county_id: countyId });
      if (!fetchError && data && data.length > 0) {
        setSubCounties(data);
      } else {
        // Fallback: query sub_counties table directly
        const { data: subData } = await (supabase.from as any)('sub_counties')
          .select('*')
          .eq('county_id', countyId)
          .order('name', { ascending: true });
        if (subData && subData.length > 0) {
          setSubCounties(subData);
        } else {
          // Use comprehensive fallback data - filter by county_id
          const fallbackSubCounties = HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === countyId);
          setSubCounties(fallbackSubCounties);
        }
      }
    } catch (err: any) {
      console.log('Using hardcoded sub-counties from fallback data');
      // Use comprehensive fallback data - filter by county_id
      const fallbackSubCounties = HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === countyId);
      setSubCounties(fallbackSubCounties);
    } finally {
      setLoadingSubCounties(false);
    }
  }, []);

  // Fetch wards by sub_county_id
  const fetchWards = useCallback(async (subCountyId: number) => {
    if (!subCountyId) {
      setWards([]);
      return;
    }
    setLoadingWards(true);
    setError(null);
    try {
      const { data, error: fetchError } = await (supabase.rpc as any)('get_wards', { p_sub_county_id: subCountyId });
      if (!fetchError && data && data.length > 0) {
        setWards(data);
      } else {
        // Fallback: query wards table directly
        const { data: wardsData } = await (supabase.from as any)('wards')
          .select('*')
          .eq('sub_county_id', subCountyId)
          .order('name', { ascending: true });
        if (wardsData && wardsData.length > 0) {
          setWards(wardsData);
        } else {
          // Use comprehensive fallback data - filter by sub_county_id
          const fallbackWards = HARDCODED_WARDS.filter(w => w.sub_county_id === subCountyId);
          setWards(fallbackWards);
        }
      }
    } catch (err: any) {
      console.log('Using hardcoded wards from fallback data');
      // Use comprehensive fallback data - filter by sub_county_id
      const fallbackWards = HARDCODED_WARDS.filter(w => w.sub_county_id === subCountyId);
      setWards(fallbackWards);
    } finally {
      setLoadingWards(false);
    }
  }, []);

  // Clear dependent selections
  const clearSubCounties = useCallback(() => {
    setSubCounties([]);
    setWards([]);
  }, []);

  const clearWards = useCallback(() => {
    setWards([]);
  }, []);

  return {
    COUNTRIES,
    counties,
    subCounties,
    wards,
    loadingCounties,
    loadingSubCounties,
    loadingWards,
    error,
    fetchCounties,
    fetchSubCounties,
    fetchWards,
    clearSubCounties,
    clearWards,
  };
};

// Export hardcoded data for direct use (already exported above)

