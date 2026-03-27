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

// Counties: Meru first, then Tharaka-Nithi, Laikipia, Isiolo, Embu, then rest alphabetical
export const HARDCODED_COUNTIES: County[] = [
  { id: 1, name: 'Meru', display_order: 1 },
  { id: 2, name: 'Tharaka-Nithi', display_order: 2 },
  { id: 3, name: 'Laikipia', display_order: 3 },
  { id: 4, name: 'Isiolo', display_order: 4 },
  { id: 5, name: 'Embu', display_order: 5 },
  { id: 6, name: 'Baringo', display_order: 6 },
  { id: 7, name: 'Bomet', display_order: 7 },
  { id: 8, name: 'Bungoma', display_order: 8 },
  { id: 9, name: 'Busia', display_order: 9 },
  { id: 10, name: 'Elgeyo Marakwet', display_order: 10 },
  { id: 11, name: 'Garissa', display_order: 11 },
  { id: 12, name: 'Homa Bay', display_order: 12 },
  { id: 13, name: 'Kajiado', display_order: 13 },
  { id: 14, name: 'Kakamega', display_order: 14 },
  { id: 15, name: 'Kericho', display_order: 15 },
  { id: 16, name: 'Kiambu', display_order: 16 },
  { id: 17, name: 'Kilifi', display_order: 17 },
  { id: 18, name: 'Kirinyaga', display_order: 18 },
  { id: 19, name: 'Kisii', display_order: 19 },
  { id: 20, name: 'Kisumu', display_order: 20 },
  { id: 21, name: 'Kitui', display_order: 21 },
  { id: 22, name: 'Kwale', display_order: 22 },
  { id: 23, name: 'Lamu', display_order: 23 },
  { id: 24, name: 'Machakos', display_order: 24 },
  { id: 25, name: 'Makueni', display_order: 25 },
  { id: 26, name: 'Mandera', display_order: 26 },
  { id: 27, name: 'Marsabit', display_order: 27 },
  { id: 28, name: 'Migori', display_order: 28 },
  { id: 29, name: 'Mombasa', display_order: 29 },
  { id: 30, name: "Murang'a", display_order: 30 },
  { id: 31, name: 'Nairobi City', display_order: 31 },
  { id: 32, name: 'Nakuru', display_order: 32 },
  { id: 33, name: 'Nandi', display_order: 33 },
  { id: 34, name: 'Narok', display_order: 34 },
  { id: 35, name: 'Nyamira', display_order: 35 },
  { id: 36, name: 'Nyandarua', display_order: 36 },
  { id: 37, name: 'Nyeri', display_order: 37 },
  { id: 38, name: 'Samburu', display_order: 38 },
  { id: 39, name: 'Siaya', display_order: 39 },
  { id: 40, name: 'Taita Taveta', display_order: 40 },
  { id: 41, name: 'Tana River', display_order: 41 },
  { id: 42, name: 'Trans Nzoia', display_order: 42 },
  { id: 43, name: 'Turkana', display_order: 43 },
  { id: 44, name: 'Uasin Gishu', display_order: 44 },
  { id: 45, name: 'Vihiga', display_order: 45 },
  { id: 46, name: 'Wajir', display_order: 46 },
  { id: 47, name: 'West Pokot', display_order: 47 },
];

// County IDs that have hardcoded ward data (dropdown). Others use text input.
export const COUNTIES_WITH_WARDS = [1, 2, 3, 4, 5]; // Meru, Tharaka-Nithi, Laikipia, Isiolo, Embu

export const HARDCODED_SUB_COUNTIES: SubCounty[] = [
  // Meru (1)
  { id: 1, name: 'Imenti North', county_id: 1 },
  { id: 2, name: 'Imenti Central', county_id: 1 },
  { id: 3, name: 'Imenti South', county_id: 1 },
  { id: 4, name: 'Buuri', county_id: 1 },
  { id: 5, name: 'Tigania East', county_id: 1 },
  { id: 6, name: 'Tigania West', county_id: 1 },
  { id: 7, name: 'Igembe North', county_id: 1 },
  { id: 8, name: 'Igembe Central', county_id: 1 },
  { id: 9, name: 'Igembe South', county_id: 1 },
  // Tharaka-Nithi (2)
  { id: 10, name: 'Maara', county_id: 2 },
  { id: 11, name: 'Chuka/Igambang\'ombe', county_id: 2 },
  { id: 12, name: 'Tharaka', county_id: 2 },
  // Laikipia (3)
  { id: 13, name: 'Laikipia West', county_id: 3 },
  { id: 14, name: 'Laikipia East', county_id: 3 },
  { id: 15, name: 'Laikipia North', county_id: 3 },
  // Isiolo (4)
  { id: 16, name: 'Isiolo North', county_id: 4 },
  { id: 17, name: 'Isiolo South', county_id: 4 },
  // Embu (5)
  { id: 18, name: 'Manyatta', county_id: 5 },
  { id: 19, name: 'Runyenjes', county_id: 5 },
  { id: 20, name: 'Mbeere North', county_id: 5 },
  { id: 21, name: 'Mbeere South', county_id: 5 },
  // Baringo (6)
  { id: 22, name: 'Tiaty', county_id: 6 },
  { id: 23, name: 'Baringo North', county_id: 6 },
  { id: 24, name: 'Baringo Central', county_id: 6 },
  { id: 25, name: 'Baringo South', county_id: 6 },
  { id: 26, name: 'Mogotio', county_id: 6 },
  { id: 27, name: 'Eldama Ravine', county_id: 6 },
  // Bomet (7)
  { id: 28, name: 'Sotik', county_id: 7 },
  { id: 29, name: 'Chepalungu', county_id: 7 },
  { id: 30, name: 'Bomet East', county_id: 7 },
  { id: 31, name: 'Bomet Central', county_id: 7 },
  { id: 32, name: 'Konoin', county_id: 7 },
  // Bungoma (8)
  { id: 33, name: 'Mt. Elgon', county_id: 8 },
  { id: 34, name: 'Sirisia', county_id: 8 },
  { id: 35, name: 'Kabuchai', county_id: 8 },
  { id: 36, name: 'Bumula', county_id: 8 },
  { id: 37, name: 'Kanduyi', county_id: 8 },
  { id: 38, name: 'Webuye West', county_id: 8 },
  { id: 39, name: 'Webuye East', county_id: 8 },
  { id: 40, name: 'Kimilili', county_id: 8 },
  { id: 41, name: 'Tongaren', county_id: 8 },
  // Busia (9)
  { id: 42, name: 'Teso North', county_id: 9 },
  { id: 43, name: 'Teso South', county_id: 9 },
  { id: 44, name: 'Nambale', county_id: 9 },
  { id: 45, name: 'Matayos', county_id: 9 },
  { id: 46, name: 'Butula', county_id: 9 },
  { id: 47, name: 'Funyula', county_id: 9 },
  { id: 48, name: 'Budalangi', county_id: 9 },
  // Elgeyo Marakwet (10)
  { id: 49, name: 'Marakwet East', county_id: 10 },
  { id: 50, name: 'Marakwet West', county_id: 10 },
  { id: 51, name: 'Keiyo North', county_id: 10 },
  { id: 52, name: 'Keiyo South', county_id: 10 },
  // Garissa (11)
  { id: 53, name: 'Garissa Township', county_id: 11 },
  { id: 54, name: 'Balambala', county_id: 11 },
  { id: 55, name: 'Lagdera', county_id: 11 },
  { id: 56, name: 'Dadaab', county_id: 11 },
  { id: 57, name: 'Fafi', county_id: 11 },
  { id: 58, name: 'Ijara', county_id: 11 },
  // Homa Bay (12)
  { id: 59, name: 'Kasipul', county_id: 12 },
  { id: 60, name: 'Kabondo Kasipul', county_id: 12 },
  { id: 61, name: 'Karachuonyo', county_id: 12 },
  { id: 62, name: 'Rangwe', county_id: 12 },
  { id: 63, name: 'Homa Bay Town', county_id: 12 },
  { id: 64, name: 'Ndhiwa', county_id: 12 },
  { id: 65, name: 'Mbita', county_id: 12 },
  { id: 66, name: 'Suba', county_id: 12 },
  // Kajiado (13)
  { id: 67, name: 'Kajiado Central', county_id: 13 },
  { id: 68, name: 'Kajiado North', county_id: 13 },
  { id: 69, name: 'Kajiado South', county_id: 13 },
  { id: 70, name: 'Kajiado West', county_id: 13 },
  { id: 71, name: 'Kajiado East', county_id: 13 },
  // Kakamega (14)
  { id: 72, name: 'Lugari', county_id: 14 },
  { id: 73, name: 'Likuyani', county_id: 14 },
  { id: 74, name: 'Malava', county_id: 14 },
  { id: 75, name: 'Lurambi', county_id: 14 },
  { id: 76, name: 'Navakholo', county_id: 14 },
  { id: 77, name: 'Mumias West', county_id: 14 },
  { id: 78, name: 'Mumias East', county_id: 14 },
  { id: 79, name: 'Matungu', county_id: 14 },
  { id: 80, name: 'Butere', county_id: 14 },
  { id: 81, name: 'Khwisero', county_id: 14 },
  { id: 82, name: 'Shinyalu', county_id: 14 },
  { id: 83, name: 'Ikolomani', county_id: 14 },
  // Kericho (15)
  { id: 84, name: 'Kipkelion East', county_id: 15 },
  { id: 85, name: 'Kipkelion West', county_id: 15 },
  { id: 86, name: 'Ainamoi', county_id: 15 },
  { id: 87, name: 'Belgut', county_id: 15 },
  { id: 88, name: 'Sigowet-Soin', county_id: 15 },
  { id: 89, name: 'Bureti', county_id: 15 },
  // Kiambu (16)
  { id: 90, name: 'Gatundu South', county_id: 16 },
  { id: 91, name: 'Gatundu North', county_id: 16 },
  { id: 92, name: 'Juja', county_id: 16 },
  { id: 93, name: 'Thika Town', county_id: 16 },
  { id: 94, name: 'Ruiru', county_id: 16 },
  { id: 95, name: 'Githunguri', county_id: 16 },
  { id: 96, name: 'Kiambu', county_id: 16 },
  { id: 97, name: 'Kiambaa', county_id: 16 },
  { id: 98, name: 'Kabete', county_id: 16 },
  { id: 99, name: 'Kikuyu', county_id: 16 },
  { id: 100, name: 'Limuru', county_id: 16 },
  { id: 101, name: 'Lari', county_id: 16 },
  // Kilifi (17)
  { id: 102, name: 'Kilifi North', county_id: 17 },
  { id: 103, name: 'Kilifi South', county_id: 17 },
  { id: 104, name: 'Kaloleni', county_id: 17 },
  { id: 105, name: 'Rabai', county_id: 17 },
  { id: 106, name: 'Ganze', county_id: 17 },
  { id: 107, name: 'Malindi', county_id: 17 },
  { id: 108, name: 'Magarini', county_id: 17 },
  // Kirinyaga (18)
  { id: 109, name: 'Mwea', county_id: 18 },
  { id: 110, name: 'Gichugu', county_id: 18 },
  { id: 111, name: 'Ndia', county_id: 18 },
  { id: 112, name: 'Kirinyaga Central', county_id: 18 },
  // Kisii (19)
  { id: 113, name: 'Bonchari', county_id: 19 },
  { id: 114, name: 'South Mugirango', county_id: 19 },
  { id: 115, name: 'Bomachoge Borabu', county_id: 19 },
  { id: 116, name: 'Bomachoge Chache', county_id: 19 },
  { id: 117, name: 'Bobasi', county_id: 19 },
  { id: 118, name: 'Nyaribari Masaba', county_id: 19 },
  { id: 119, name: 'Nyaribari Chache', county_id: 19 },
  { id: 120, name: 'Kitutu Chache North', county_id: 19 },
  { id: 121, name: 'Kitutu Chache South', county_id: 19 },
  // Kisumu (20)
  { id: 122, name: 'Kisumu East', county_id: 20 },
  { id: 123, name: 'Kisumu West', county_id: 20 },
  { id: 124, name: 'Kisumu Central', county_id: 20 },
  { id: 125, name: 'Seme', county_id: 20 },
  { id: 126, name: 'Nyando', county_id: 20 },
  { id: 127, name: 'Muhoroni', county_id: 20 },
  { id: 128, name: 'Nyakach', county_id: 20 },
  // Kitui (21)
  { id: 129, name: 'Mwingi North', county_id: 21 },
  { id: 130, name: 'Mwingi Central', county_id: 21 },
  { id: 131, name: 'Mwingi South', county_id: 21 },
  { id: 132, name: 'Kitui West', county_id: 21 },
  { id: 133, name: 'Kitui Rural', county_id: 21 },
  { id: 134, name: 'Kitui Central', county_id: 21 },
  { id: 135, name: 'Kitui East', county_id: 21 },
  { id: 136, name: 'Kitui South', county_id: 21 },
  // Kwale (22)
  { id: 137, name: 'Msambweni', county_id: 22 },
  { id: 138, name: 'Lunga Lunga', county_id: 22 },
  { id: 139, name: 'Matuga', county_id: 22 },
  { id: 140, name: 'Kinango', county_id: 22 },
  // Lamu (23)
  { id: 141, name: 'Lamu East', county_id: 23 },
  { id: 142, name: 'Lamu West', county_id: 23 },
  // Machakos (24)
  { id: 143, name: 'Masinga', county_id: 24 },
  { id: 144, name: 'Yatta', county_id: 24 },
  { id: 145, name: 'Kangundo', county_id: 24 },
  { id: 146, name: 'Matungulu', county_id: 24 },
  { id: 147, name: 'Kathiani', county_id: 24 },
  { id: 148, name: 'Mavoko', county_id: 24 },
  { id: 149, name: 'Machakos Town', county_id: 24 },
  { id: 150, name: 'Mwala', county_id: 24 },
  // Makueni (25)
  { id: 151, name: 'Mbooni', county_id: 25 },
  { id: 152, name: 'Kilome', county_id: 25 },
  { id: 153, name: 'Kaiti', county_id: 25 },
  { id: 154, name: 'Makueni', county_id: 25 },
  { id: 155, name: 'Kibwezi West', county_id: 25 },
  { id: 156, name: 'Kibwezi East', county_id: 25 },
  // Mandera (26)
  { id: 157, name: 'Mandera West', county_id: 26 },
  { id: 158, name: 'Banisa', county_id: 26 },
  { id: 159, name: 'Mandera North', county_id: 26 },
  { id: 160, name: 'Mandera East', county_id: 26 },
  { id: 161, name: 'Lafey', county_id: 26 },
  { id: 162, name: 'Mandera South', county_id: 26 },
  // Marsabit (27)
  { id: 163, name: 'Moyale', county_id: 27 },
  { id: 164, name: 'North Horr', county_id: 27 },
  { id: 165, name: 'Saku', county_id: 27 },
  { id: 166, name: 'Laisamis', county_id: 27 },
  // Migori (28)
  { id: 167, name: 'Rongo', county_id: 28 },
  { id: 168, name: 'Awendo', county_id: 28 },
  { id: 169, name: 'Suna East', county_id: 28 },
  { id: 170, name: 'Suna West', county_id: 28 },
  { id: 171, name: 'Uriri', county_id: 28 },
  { id: 172, name: 'Nyatike', county_id: 28 },
  { id: 173, name: 'Kuria West', county_id: 28 },
  { id: 174, name: 'Kuria East', county_id: 28 },
  // Mombasa (29)
  { id: 175, name: 'Changamwe', county_id: 29 },
  { id: 176, name: 'Jomvu', county_id: 29 },
  { id: 177, name: 'Kisauni', county_id: 29 },
  { id: 178, name: 'Nyali', county_id: 29 },
  { id: 179, name: 'Likoni', county_id: 29 },
  { id: 180, name: 'Mvita', county_id: 29 },
  // Murang'a (30)
  { id: 181, name: 'Kangema', county_id: 30 },
  { id: 182, name: 'Mathioya', county_id: 30 },
  { id: 183, name: 'Kiharu', county_id: 30 },
  { id: 184, name: 'Kigumo', county_id: 30 },
  { id: 185, name: 'Maragua', county_id: 30 },
  { id: 186, name: 'Kandara', county_id: 30 },
  { id: 187, name: 'Gatanga', county_id: 30 },
  // Nairobi City (31)
  { id: 188, name: 'Westlands', county_id: 31 },
  { id: 189, name: 'Dagoretti North', county_id: 31 },
  { id: 190, name: 'Dagoretti South', county_id: 31 },
  { id: 191, name: "Lang'ata", county_id: 31 },
  { id: 192, name: 'Kibra', county_id: 31 },
  { id: 193, name: 'Roysambu', county_id: 31 },
  { id: 194, name: 'Kasarani', county_id: 31 },
  { id: 195, name: 'Ruaraka', county_id: 31 },
  { id: 196, name: 'Embakasi South', county_id: 31 },
  { id: 197, name: 'Embakasi North', county_id: 31 },
  { id: 198, name: 'Embakasi Central', county_id: 31 },
  { id: 199, name: 'Embakasi East', county_id: 31 },
  { id: 200, name: 'Embakasi West', county_id: 31 },
  { id: 201, name: 'Makadara', county_id: 31 },
  { id: 202, name: 'Kamukunji', county_id: 31 },
  { id: 203, name: 'Starehe', county_id: 31 },
  { id: 204, name: 'Mathare', county_id: 31 },
  // Nakuru (32)
  { id: 205, name: 'Molo', county_id: 32 },
  { id: 206, name: 'Njoro', county_id: 32 },
  { id: 207, name: 'Naivasha', county_id: 32 },
  { id: 208, name: 'Gilgil', county_id: 32 },
  { id: 209, name: 'Kuresoi South', county_id: 32 },
  { id: 210, name: 'Kuresoi North', county_id: 32 },
  { id: 211, name: 'Subukia', county_id: 32 },
  { id: 212, name: 'Rongai', county_id: 32 },
  { id: 213, name: 'Bahati', county_id: 32 },
  { id: 214, name: 'Nakuru Town West', county_id: 32 },
  { id: 215, name: 'Nakuru Town East', county_id: 32 },
  // Nandi (33)
  { id: 216, name: 'Tinderet', county_id: 33 },
  { id: 217, name: 'Aldai', county_id: 33 },
  { id: 218, name: 'Nandi Hills', county_id: 33 },
  { id: 219, name: 'Chesumei', county_id: 33 },
  { id: 220, name: 'Emgwen', county_id: 33 },
  { id: 221, name: 'Mosop', county_id: 33 },
  // Narok (34)
  { id: 222, name: 'Narok North', county_id: 34 },
  { id: 223, name: 'Narok South', county_id: 34 },
  { id: 224, name: 'Narok West', county_id: 34 },
  { id: 225, name: 'Narok East', county_id: 34 },
  { id: 226, name: 'Kilgoris', county_id: 34 },
  { id: 227, name: 'Emurua Dikirr', county_id: 34 },
  // Nyamira (35)
  { id: 228, name: 'Kitutu Masaba', county_id: 35 },
  { id: 229, name: 'West Mugirango', county_id: 35 },
  { id: 230, name: 'North Mugirango', county_id: 35 },
  // Nyandarua (36)
  { id: 231, name: 'Kinangop', county_id: 36 },
  { id: 232, name: 'Kipipiri', county_id: 36 },
  { id: 233, name: 'Ol Kalou', county_id: 36 },
  { id: 234, name: 'Ol Joro Orok', county_id: 36 },
  { id: 235, name: 'Ndaragwa', county_id: 36 },
  // Nyeri (37)
  { id: 236, name: 'Tetu', county_id: 37 },
  { id: 237, name: 'Kieni', county_id: 37 },
  { id: 238, name: 'Mathira', county_id: 37 },
  { id: 239, name: 'Othaya', county_id: 37 },
  { id: 240, name: 'Mukurwe-ini', county_id: 37 },
  { id: 241, name: 'Nyeri Town', county_id: 37 },
  // Samburu (38)
  { id: 242, name: 'Samburu North', county_id: 38 },
  { id: 243, name: 'Samburu East', county_id: 38 },
  { id: 244, name: 'Samburu West', county_id: 38 },
  // Siaya (39)
  { id: 245, name: 'Ugenya', county_id: 39 },
  { id: 246, name: 'Ugunja', county_id: 39 },
  { id: 247, name: 'Alego Usonga', county_id: 39 },
  { id: 248, name: 'Gem', county_id: 39 },
  { id: 249, name: 'Bondo', county_id: 39 },
  { id: 250, name: 'Rarieda', county_id: 39 },
  // Taita Taveta (40)
  { id: 251, name: 'Taveta', county_id: 40 },
  { id: 252, name: 'Wundanyi', county_id: 40 },
  { id: 253, name: 'Mwatate', county_id: 40 },
  { id: 254, name: 'Voi', county_id: 40 },
  // Tana River (41)
  { id: 255, name: 'Garsen', county_id: 41 },
  { id: 256, name: 'Galole', county_id: 41 },
  { id: 257, name: 'Bura', county_id: 41 },
  // Trans Nzoia (42)
  { id: 258, name: 'Kwanza', county_id: 42 },
  { id: 259, name: 'Endebess', county_id: 42 },
  { id: 260, name: 'Saboti', county_id: 42 },
  { id: 261, name: 'Kiminini', county_id: 42 },
  { id: 262, name: 'Cherangany', county_id: 42 },
  // Turkana (43)
  { id: 263, name: 'Turkana North', county_id: 43 },
  { id: 264, name: 'Turkana West', county_id: 43 },
  { id: 265, name: 'Turkana Central', county_id: 43 },
  { id: 266, name: 'Loima', county_id: 43 },
  { id: 267, name: 'Turkana South', county_id: 43 },
  { id: 268, name: 'Turkana East', county_id: 43 },
  // Uasin Gishu (44)
  { id: 269, name: 'Soy', county_id: 44 },
  { id: 270, name: 'Turbo', county_id: 44 },
  { id: 271, name: 'Moiben', county_id: 44 },
  { id: 272, name: 'Ainabkoi', county_id: 44 },
  { id: 273, name: 'Kapseret', county_id: 44 },
  { id: 274, name: 'Kesses', county_id: 44 },
  // Vihiga (45)
  { id: 275, name: 'Vihiga', county_id: 45 },
  { id: 276, name: 'Sabatia', county_id: 45 },
  { id: 277, name: 'Hamisi', county_id: 45 },
  { id: 278, name: 'Emuhaya', county_id: 45 },
  { id: 279, name: 'Luanda', county_id: 45 },
  // Wajir (46)
  { id: 280, name: 'Wajir North', county_id: 46 },
  { id: 281, name: 'Wajir East', county_id: 46 },
  { id: 282, name: 'Tarbaj', county_id: 46 },
  { id: 283, name: 'Wajir West', county_id: 46 },
  { id: 284, name: 'Eldas', county_id: 46 },
  { id: 285, name: 'Wajir South', county_id: 46 },
  // West Pokot (47)
  { id: 286, name: 'Kapenguria', county_id: 47 },
  { id: 287, name: 'Sigor', county_id: 47 },
  { id: 288, name: 'Kacheliba', county_id: 47 },
  { id: 289, name: 'Pokot South', county_id: 47 },
];

// Wards for counties with hardcoded data: Meru, Tharaka-Nithi, Laikipia, Isiolo, Embu
export const HARDCODED_WARDS: Ward[] = [
  // === MERU ===
  // Imenti North (1)
  { id: 1, name: 'Municipality', sub_county_id: 1 },
  { id: 2, name: 'Ntima East', sub_county_id: 1 },
  { id: 3, name: 'Ntima West', sub_county_id: 1 },
  { id: 4, name: 'Nyaki East', sub_county_id: 1 },
  { id: 5, name: 'Nyaki West', sub_county_id: 1 },
  // Imenti Central (2)
  { id: 6, name: 'Abothuguchi Central', sub_county_id: 2 },
  { id: 7, name: 'Abothuguchi West', sub_county_id: 2 },
  { id: 8, name: 'Kiagu', sub_county_id: 2 },
  { id: 9, name: 'Kibirichia', sub_county_id: 2 },
  { id: 10, name: 'Mwanganthia', sub_county_id: 2 },
  // Imenti South (3)
  { id: 11, name: 'Abogeta East', sub_county_id: 3 },
  { id: 12, name: 'Abogeta West', sub_county_id: 3 },
  { id: 13, name: 'Igoji East', sub_county_id: 3 },
  { id: 14, name: 'Igoji West', sub_county_id: 3 },
  { id: 15, name: 'Mitunguu', sub_county_id: 3 },
  { id: 16, name: 'Nkuene', sub_county_id: 3 },
  // Buuri (4)
  { id: 17, name: 'Kiirua/Naari', sub_county_id: 4 },
  { id: 18, name: 'Kisima', sub_county_id: 4 },
  { id: 19, name: 'Ruiri/Rwarera', sub_county_id: 4 },
  { id: 20, name: 'Timau', sub_county_id: 4 },
  // Tigania East (5)
  { id: 21, name: 'Karama', sub_county_id: 5 },
  { id: 22, name: 'Kiguchwa', sub_county_id: 5 },
  { id: 23, name: 'Mikinduri', sub_county_id: 5 },
  { id: 24, name: 'Muthara', sub_county_id: 5 },
  { id: 25, name: 'Thangatha', sub_county_id: 5 },
  // Tigania West (6)
  { id: 26, name: 'Akithi', sub_county_id: 6 },
  { id: 27, name: 'Athwana', sub_county_id: 6 },
  { id: 28, name: 'Kianjai', sub_county_id: 6 },
  { id: 29, name: 'Mbeu', sub_county_id: 6 },
  { id: 30, name: 'Nkomo', sub_county_id: 6 },
  // Igembe North (7)
  { id: 31, name: 'Amwathi', sub_county_id: 7 },
  { id: 32, name: 'Antuambui', sub_county_id: 7 },
  { id: 33, name: 'Antubetwe Kiongo', sub_county_id: 7 },
  { id: 34, name: 'Naathu', sub_county_id: 7 },
  { id: 35, name: 'Ntunene', sub_county_id: 7 },
  // Igembe Central (8)
  { id: 36, name: 'Akirang\'ondu', sub_county_id: 8 },
  { id: 37, name: 'Athiru Ruujine', sub_county_id: 8 },
  { id: 38, name: 'Igembe East', sub_county_id: 8 },
  { id: 39, name: 'Kangeta', sub_county_id: 8 },
  { id: 40, name: 'Njia', sub_county_id: 8 },
  // Igembe South (9)
  { id: 41, name: 'Akachiu', sub_county_id: 9 },
  { id: 42, name: 'Athiru Gaiti', sub_county_id: 9 },
  { id: 43, name: 'Kanuni', sub_county_id: 9 },
  { id: 44, name: 'Kiegoi/Antubochiu', sub_county_id: 9 },
  { id: 45, name: 'Maua', sub_county_id: 9 },

  // === THARAKA-NITHI ===
  // Maara (10)
  { id: 46, name: 'Mitheru', sub_county_id: 10 },
  { id: 47, name: 'Muthambi', sub_county_id: 10 },
  { id: 48, name: 'Mwimbi', sub_county_id: 10 },
  { id: 49, name: 'Ganga', sub_county_id: 10 },
  { id: 50, name: 'Chogoria', sub_county_id: 10 },
  // Chuka/Igambang'ombe (11)
  { id: 51, name: 'Mariani', sub_county_id: 11 },
  { id: 52, name: 'Karingani', sub_county_id: 11 },
  { id: 53, name: 'Magumoni', sub_county_id: 11 },
  { id: 54, name: 'Mugwe', sub_county_id: 11 },
  { id: 55, name: 'Igambang\'ombe', sub_county_id: 11 },
  // Tharaka (12)
  { id: 56, name: 'Gatunga', sub_county_id: 12 },
  { id: 57, name: 'Mukothima', sub_county_id: 12 },
  { id: 58, name: 'Nkondi', sub_county_id: 12 },
  { id: 59, name: 'Chiakariga', sub_county_id: 12 },
  { id: 60, name: 'Marimanti', sub_county_id: 12 },

  // === LAIKIPIA ===
  // Laikipia West (13)
  { id: 61, name: 'Ol-Moran', sub_county_id: 13 },
  { id: 62, name: 'Rumuruti Township', sub_county_id: 13 },
  { id: 63, name: 'Githiga', sub_county_id: 13 },
  { id: 64, name: 'Marmanet', sub_county_id: 13 },
  { id: 65, name: 'Igwamiti', sub_county_id: 13 },
  { id: 66, name: 'Salama', sub_county_id: 13 },
  // Laikipia East (14)
  { id: 67, name: 'Ngobit', sub_county_id: 14 },
  { id: 68, name: 'Tigithi', sub_county_id: 14 },
  { id: 69, name: 'Thingithu', sub_county_id: 14 },
  { id: 70, name: 'Nanyuki', sub_county_id: 14 },
  { id: 71, name: 'Umande', sub_county_id: 14 },
  // Laikipia North (15)
  { id: 72, name: 'Sosian', sub_county_id: 15 },
  { id: 73, name: 'Segera', sub_county_id: 15 },
  { id: 74, name: 'Mukogodo West', sub_county_id: 15 },
  { id: 75, name: 'Mukogodo East', sub_county_id: 15 },

  // === ISIOLO ===
  // Isiolo North (16)
  { id: 76, name: 'Wabera', sub_county_id: 16 },
  { id: 77, name: 'Bulla Pesa', sub_county_id: 16 },
  { id: 78, name: 'Burat', sub_county_id: 16 },
  { id: 79, name: 'Ngaremara', sub_county_id: 16 },
  { id: 80, name: 'Oldonyiro', sub_county_id: 16 },
  { id: 81, name: 'Chari', sub_county_id: 16 },
  { id: 82, name: 'Cherab', sub_county_id: 16 },
  // Isiolo South (17)
  { id: 83, name: 'Garbatulla', sub_county_id: 17 },
  { id: 84, name: 'Kinna', sub_county_id: 17 },
  { id: 85, name: 'Sericho', sub_county_id: 17 },

  // === EMBU ===
  // Manyatta (18)
  { id: 86, name: 'Ruguru/Ngandori', sub_county_id: 18 },
  { id: 87, name: 'Kithimu', sub_county_id: 18 },
  { id: 88, name: 'Mbeti North', sub_county_id: 18 },
  { id: 89, name: 'Kirimari', sub_county_id: 18 },
  { id: 90, name: 'Gaturi South', sub_county_id: 18 },
  { id: 91, name: 'Nginda', sub_county_id: 18 },
  // Runyenjes (19)
  { id: 92, name: 'Gaturi North', sub_county_id: 19 },
  { id: 93, name: 'Kagaari South', sub_county_id: 19 },
  { id: 94, name: 'Kagaari North', sub_county_id: 19 },
  { id: 95, name: 'Central Ward', sub_county_id: 19 },
  { id: 96, name: 'Kyeni North', sub_county_id: 19 },
  { id: 97, name: 'Kyeni South', sub_county_id: 19 },
  // Mbeere North (20)
  { id: 98, name: 'Nthawa', sub_county_id: 20 },
  { id: 99, name: 'Muminji', sub_county_id: 20 },
  { id: 100, name: 'Evurore', sub_county_id: 20 },
  // Mbeere South (21)
  { id: 101, name: 'Mwea', sub_county_id: 21 },
  { id: 102, name: 'Makima', sub_county_id: 21 },
  { id: 103, name: 'Mbeti South', sub_county_id: 21 },
  { id: 104, name: 'Mavuria', sub_county_id: 21 },
  { id: 105, name: 'Kiambere', sub_county_id: 21 },
];

// Backward compatibility exports
export const MERU_SUB_COUNTIES = HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === 1);
export const IMENTI_SOUTH_WARDS = HARDCODED_WARDS.filter(w => w.sub_county_id === 3);

export const useLocation = () => {
  const [counties, setCounties] = useState<County[]>(HARDCODED_COUNTIES);
  const [subCounties, setSubCounties] = useState<SubCounty[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingCounties, setLoadingCounties] = useState(false);
  const [loadingSubCounties, setLoadingSubCounties] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCounties = useCallback(async () => {
    setLoadingCounties(true);
    setError(null);
    try {
      const { data, error: fetchError } = await (supabase.rpc as any)('get_counties');
      if (!fetchError && data && data.length > 0) {
        setCounties(data);
      } else {
        const { data: countiesData, error: countiesError } = await (supabase.from as any)('counties')
          .select('*')
          .order('display_order', { ascending: true })
          .order('name', { ascending: true });
        if (!countiesError && countiesData && countiesData.length > 0) {
          setCounties(countiesData);
        }
      }
    } catch {
      console.log('Using hardcoded counties');
    } finally {
      setLoadingCounties(false);
    }
  }, []);

  const fetchSubCounties = useCallback(async (countyId: number) => {
    if (!countyId) { setSubCounties([]); return; }
    setLoadingSubCounties(true);
    setError(null);
    try {
      const { data, error: fetchError } = await (supabase.rpc as any)('get_sub_counties', { p_county_id: countyId });
      if (!fetchError && data && data.length > 0) {
        setSubCounties(data);
      } else {
        const { data: subData } = await (supabase.from as any)('sub_counties')
          .select('*').eq('county_id', countyId).order('name', { ascending: true });
        if (subData && subData.length > 0) {
          setSubCounties(subData);
        } else {
          setSubCounties(HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === countyId));
        }
      }
    } catch {
      setSubCounties(HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === countyId));
    } finally {
      setLoadingSubCounties(false);
    }
  }, []);

  const fetchWards = useCallback(async (subCountyId: number) => {
    if (!subCountyId) { setWards([]); return; }
    setLoadingWards(true);
    setError(null);
    try {
      const { data, error: fetchError } = await (supabase.rpc as any)('get_wards', { p_sub_county_id: subCountyId });
      if (!fetchError && data && data.length > 0) {
        setWards(data);
      } else {
        const { data: wardsData } = await (supabase.from as any)('wards')
          .select('*').eq('sub_county_id', subCountyId).order('name', { ascending: true });
        if (wardsData && wardsData.length > 0) {
          setWards(wardsData);
        } else {
          setWards(HARDCODED_WARDS.filter(w => w.sub_county_id === subCountyId));
        }
      }
    } catch {
      setWards(HARDCODED_WARDS.filter(w => w.sub_county_id === subCountyId));
    } finally {
      setLoadingWards(false);
    }
  }, []);

  const clearSubCounties = useCallback(() => { setSubCounties([]); setWards([]); }, []);
  const clearWards = useCallback(() => { setWards([]); }, []);

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
