-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-10-04 09:47:37
-- 伺服器版本: 10.1.13-MariaDB
-- PHP 版本： 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `bee`
--

-- --------------------------------------------------------

--
-- 資料表結構 `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `day` date NOT NULL,
  `content` text,
  `firstid` tinyint(1) NOT NULL,
  `next` int(11) NOT NULL,
  `1` int(11) NOT NULL,
  `2` int(11) DEFAULT NULL,
  `3` int(11) DEFAULT NULL,
  `4` int(11) DEFAULT NULL,
  `5` int(11) DEFAULT NULL,
  `6` int(11) DEFAULT NULL,
  `7` int(11) DEFAULT NULL,
  `8` int(11) DEFAULT NULL,
  `9` int(11) DEFAULT NULL,
  `10` int(11) DEFAULT NULL,
  `11` int(11) DEFAULT NULL,
  `12` int(11) DEFAULT NULL,
  `13` int(11) DEFAULT NULL,
  `14` int(11) DEFAULT NULL,
  `15` int(11) DEFAULT NULL,
  `16` int(11) DEFAULT NULL,
  `17` int(11) DEFAULT NULL,
  `18` int(11) DEFAULT NULL,
  `19` int(11) DEFAULT NULL,
  `20` int(11) DEFAULT NULL,
  `21` int(11) DEFAULT NULL,
  `22` int(11) DEFAULT NULL,
  `23` int(11) DEFAULT NULL,
  `24` int(11) DEFAULT NULL,
  `25` int(11) DEFAULT NULL,
  `26` int(11) DEFAULT NULL,
  `27` int(11) DEFAULT NULL,
  `28` int(11) DEFAULT NULL,
  `29` int(11) DEFAULT NULL,
  `30` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `albums`
--

INSERT INTO `albums` (`id`, `name`, `user_id`, `date`, `day`, `content`, `firstid`, `next`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`) VALUES
(1, 'new album', 2, '2016-09-01 00:01:33', '0000-00-00', '', 1, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30),
(2, 'new album', 2, '2016-09-01 00:01:33', '0000-00-00', NULL, 0, 0, 31, 32, 33, 34, 35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '2016-09-24', 2, '0000-00-00 00:00:00', '2016-09-24', NULL, 1, 5, 71, 71, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 23),
(5, '2016-09-24', 2, '0000-00-00 00:00:00', '2016-09-24', NULL, 0, 0, 71, 71, 71, 72, 73, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `attraction`
--

CREATE TABLE `attraction` (
  `attraction_id` int(11) NOT NULL,
  `likenumber` int(11) DEFAULT NULL,
  `attraction_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `telephone` varchar(10) NOT NULL,
  `businesshour` varchar(10) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `picture_id` int(11) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `city` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `attraction`
--

INSERT INTO `attraction` (`attraction_id`, `likenumber`, `attraction_name`, `address`, `telephone`, `businesshour`, `description`, `picture_id`, `latitude`, `longitude`, `city`) VALUES
(1, 1234566, 'NCYU', 'chiayi  123street', '05-245677', '522-345', 'good eating', 23, 120.441, 23.4646, ''),
(2, 564318, 'NCCU', 'chiayi  563street', '05-245634', '234-463', 'bigbigbig', 4, 120.473, 23.5634, ''),
(3, NULL, '佳鄉．泰式料理 風味鍋物 / 尹居．小琉', '琉球鄉民生路3-5號', '', '', '', 0, 22.3509, 120.38, 'Pingtunghs'),
(4, 123, 'NCKU', 'tainan', '08-67899', '677-333', 'had been there before', 45, 120.147, 23.0511, ''),
(5, 3456245, 'taipei 101', 'taipei ', '02-345645', '1300-2100', 'shopping there', 23, 121.564, 25.0335, ''),
(6, 12, 'NTPU', 'taipei da ann', '02-4578', '0400-1200', 'it''s a school', 2, 121.526, 25.0301, ''),
(7, 100, 'CMP Museum of Arts', 'taichung 234block', '0800-356', '1300-1800', 'u can picnic here', 34, 120.664, 24.151, ''),
(8, 13000, 'taichung SOGO', 'taichung 673 street', '04-24678', '0900-1800', 'it''s a department store', 234, 120.662, 24.1555, ''),
(9, 2998765, 'Da-dong ', 'kaohsiung fonshang', '07-356468', '0900-2200', 'library there', 3, 120.363, 22.625, ''),
(10, 96789432, 'kaohsiung SOGO', 'kaohsiung chenggang', '07-3456257', '0900-1800', 'SOgo ', 455, 120.317, 22.5871, ''),
(11, 2456, 'NQU', 'kingman', '04-23678', '0600-1800', 'outland of taiwan', 2, 118.322, 24.4488, ''),
(12, 10, 'little 6ball', 'pindon 356street', '08-347844', '0800-2200', 'another outland BTW Han''s home is nearby', 233, 120.361, 22.3228, ''),
(13, NULL, '美麗的小琉球', '屏東縣琉球鄉中福村行政路12號', '', '', '', 0, 22.3509, 120.384, 'Pingtunghs'),
(14, NULL, '同仁國小', '', '', '', '', 0, 23.4039, 120.512, ''),
(15, NULL, '大碗公ㄘㄨㄚˋ冰嘉義興業店', '興業西路461號', '', '', '', 0, 23.4681, 120.435, 'Chiayi'),
(16, NULL, '大元炒飯魚湯', '嘉義市民生南路676號', '', '', '', 0, 23.4563, 120.444, 'Chiayi'),
(17, NULL, '往小琉球的臺灣海峽上', '', '', '', '', 0, 22.4688, 120.445, 'Kaohsiung'),
(18, NULL, '嘉義大學新民校區', '嘉義市新民路580號', '', '', '', 0, 23.4646, 120.444, ''),
(19, NULL, '石岡0蛋月台', '', '', '', '', 0, 24.2765, 120.778, 'Taichung'),
(20, NULL, '高雄六龜荖濃家', '', '', '', '', 0, 23.0802, 120.68, ''),
(21, NULL, '吉祥鐵板燒', '嘉義市康樂街90-12號', '', '', '', 0, 23.4751, 120.45, 'Chiayi'),
(22, NULL, '焱鬼鍋燒專門店-仁愛二番店', 'No.470, Ren’ai Rd., West Dist.', '', '', '', 0, 23.4758, 120.442, 'Chiayi'),
(23, NULL, '經國新城H棟', '嘉義市新榮路35巷', '', '', '', 0, 23.4806, 120.444, 'Chiayi'),
(24, NULL, '饗烤肉', '嘉義市民生南路476號(舊志航國小斜對面)', '', '', '', 0, 23.4604, 120.443, 'Chiayi'),
(25, NULL, '韓集', '嘉義市西區民族路794號(皇品城眼鏡旁巷內)', '', '', '', 0, 23.4754, 120.441, 'Chiayi'),
(26, NULL, '淺田日式燒肉屋', '嘉義市大雅路二段368號', '', '', '', 0, 23.4775, 120.474, 'Chiayi'),
(27, NULL, '麥當勞-嘉義垂陽店', '嘉義市垂楊路468號', '', '', '', 0, 23.4738, 120.448, 'Chiayi'),
(28, NULL, '雲林科技大學', '雲林縣斗六市鎮南里16鄰大學路3段123號', '', '', '', 0, 23.6941, 120.535, 'Yünlinhsie'),
(29, NULL, '嘉年華KTV', '嘉義市大雅路二段383號', '', '', '', 0, 23.4774, 120.474, 'Chiayi'),
(30, NULL, '斗南炸饅頭', '雲林縣斗南鎮中正路117號', '', '', '', 0, 23.6769, 120.479, 'Tounan'),
(32, NULL, '北高雄保齡球館', '高雄市鼓山區裕誠路1039號二樓', '', '', '', 0, 22.6659, 120.301, 'Kaohsiung'),
(33, NULL, '嘉義郭家雞肉飯', '嘉義市東區文化路148號', '', '', '', 0, 23.4784, 120.45, 'Chiayi'),
(34, NULL, '普羅旺斯', '高雄市鳳山區體育路37號', '', '', '', 0, 22.6245, 120.357, 'Kaohsiung'),
(35, NULL, '我在小琉球天氣太晴啦！！', '', '', '', '', 0, 22.3525, 120.384, ''),
(54, NULL, '品田牧場嘉義國華店', '嘉義市國華街212號', '', '', '', 0, 23.4806, 120.448, 'Chiayi'),
(55, NULL, '上禾家日本料理', '嘉義市垂楊路233號(與吳鳯南路交叉口)', '', '', '', 0, 23.4739, 120.454, 'Chiayi'),
(56, NULL, '特製意麵.四神湯.黑香腸.黑大腸(原舊市', '', '', '', '', 0, 23.4735, 120.446, 'Chiayi'),
(57, NULL, '嘉義大學民雄校區樂育堂', '', '', '', '', 0, 23.8564, 120.594, 'Chiayi'),
(58, NULL, '溪頭彩虹橋', '', '', '', '', 0, 23.6608, 120.798, ''),
(59, NULL, '忘憂森林', '南投縣竹山鎮大鞍里溪山路１―８號', '', '', '', 0, 23.6502, 120.79, 'Nantouhsie'),
(60, NULL, 'Tainan Station', '東區北門路二段4號', '', '', '', 0, 22.9969, 120.213, 'Tainan'),
(61, NULL, '美奇來電影院', '', '', '', '', 0, 22.6454, 120.309, 'Kaohsiung'),
(62, NULL, '十八醬麻辣燙-左營店', '高雄市左營區左營大路178號', '', '', '', 0, 22.6841, 120.289, 'Kaohsiung'),
(63, NULL, '回嘉的路上', '', '', '', '', 0, 23.0163, 120.229, 'Tainan'),
(64, NULL, '南臺科技大學', '南台街1號', '', '', '', 0, 23.0243, 120.224, 'Tainan'),
(65, NULL, '海頓英式紅茶館', '嘉義市中正路432號', '', '', '', 0, 23.4788, 120.449, 'Chiayi'),
(66, NULL, '雅聞峇里海岸觀光工廠', '雲林縣斗六市榴北里中興路333號', '', '', '', 0, 23.7319, 120.573, 'Touliu'),
(67, NULL, '抗日烈士余清芳紀念碑', '', '', '', '', 0, 23.1301, 120.482, ''),
(68, NULL, '丹丹漢堡', '臺南市新化區忠孝路116號', '', '', '', 0, 23.0383, 120.304, 'Tainan'),
(69, NULL, '瑞豐夜市', '高雄市左營區裕誠路和南屏路', '', '', '', 0, 22.6658, 120.3, 'Kaohsiung'),
(70, NULL, '茂林國家風景區', '', '', '', '', 0, 22.9103, 120.684, ''),
(71, NULL, '神采飛揚ktv', '鼓山區博愛二路357號', '', '', '', 0, 0, 22.6637, 'Kaohsiung'),
(72, NULL, '黑澤屋壽喜燒', '高雄市前金區新田路230號', '', '', '', 0, 22.6208, 120.299, 'Kaohsiung'),
(73, NULL, '薄多義裕誠店', '高雄市左營區裕誠路301號', '', '', '', 0, 22.6652, 120.307, 'Kaohsiung'),
(74, NULL, '高雄市壽山忠烈祠-Love景點', '', '', '', '', 0, 22.6254, 120.274, 'Kaohsiung'),
(75, NULL, '童話花園', '林森二路135巷32號', '', '', '', 0, 22.6222, 120.304, 'Kaohsiung'),
(76, NULL, '嘉大學餐', '', '', '', '', 0, 23.5453, 120.424, 'Chiayi'),
(77, NULL, '川井屋', '嘉義市新民路622號', '', '', '', 0, 23.466, 120.44, ''),
(78, NULL, '嘉年華影城4樓B廳', '', '', '', '', 0, 23.4757, 120.445, ''),
(79, NULL, '蘭潭風景區', '', '', '', '', 0, 23.4662, 120.48, ''),
(80, NULL, '嘉義巿錢櫃', '', '', '', '', 0, 23.477, 120.442, 'Chiayi'),
(81, NULL, '嘉義大學運動場', '', '', '', '', 0, 23.4649, 120.445, 'Chiayi'),
(82, NULL, '漢神巨蛋享溫馨', '高雄市左營區立文路77號', '', '', '', 0, 22.6645, 120.303, 'Kaohsiung'),
(83, NULL, '巨蛋享溫馨', '', '', '', '', 0, 22.6639, 120.303, 'Tsoying'),
(84, NULL, '享溫馨庭園式ktv', '高雄市苓雅區福德二路209號', '', '', '', 0, 22.6332, 120.328, 'Kaohsiung'),
(85, NULL, '綠島', '', '', '', '', 0, 22.6505, 120.306, 'Kaohsiung'),
(86, NULL, '綠島美而美', '', '', '', '', 0, 22.6661, 121.47, ''),
(87, NULL, '朝日溫泉', '溫泉路167號', '', '', '', 0, 22.6369, 121.504, '???, ???'),
(88, NULL, '綠島夢幻島', '', '', '', '', 0, 22.6724, 121.469, 'Lütao'),
(89, NULL, '高雄市忠烈祠', '高雄巿鼓山區忠義路30號', '', '', '', 0, 22.6255, 120.274, 'Kaohsiung'),
(90, NULL, '海中鮮婚宴會館', '岡山區岡山路537號', '', '', '', 0, 22.804, 120.289, 'Kaohsiung,'),
(91, NULL, '漢來大飯店巨蛋會館-漢神巨蛋9樓', '高雄市左營區博愛二路767號9樓', '', '', '', 0, 22.6691, 120.302, 'Kaohsiung'),
(92, NULL, '石頭日式燒烤', '', '', '', '', 0, 22.6913, 120.332, 'Kaohsiung'),
(93, NULL, '7-11 勝利門市', '高雄市左營區勝利路123號', '', '', '', 0, 22.6807, 120.29, ''),
(94, NULL, '國立鳳山高級中學', '高雄市鳳山區光復路二段130號', '', '', '', 0, 22.63, 120.346, 'Fengshan'),
(95, NULL, '逐鹿炭火燒肉', '苓雅區中正二路56巷5號', '', '', '', 0, 22.6301, 120.32, '???, ???'),
(96, NULL, 'No_80 Bardon', '嘉義市東區中山路80號', '', '', '', 0, 23.4823, 120.46, 'Chiayi'),
(98, NULL, '佳鄉．泰式料理 風味鍋物 / 尹居．小琉', '琉球鄉民生路3-5號', '', '', '', 0, 22.3509, 120.38, 'Pingtunghs'),
(99, NULL, '特製意麵.四神湯.黑香腸.黑大腸(原舊市', '', '', '', '', 0, 23.4735, 120.446, 'Chiayi'),
(220, NULL, '旗津 高雄 Cijin Kaohsiun', '旗津區廟前路50號', '', '', '', 0, 22.6118, 120.268, ''),
(236, NULL, '佳鄉．泰式料理 風味鍋物 / 尹居．小琉', '琉球鄉民生路3-5號', '', '', '', 0, 22.3509, 120.38, 'Pingtunghs'),
(248, NULL, '旗津 高雄 Cijin Kaohsiun', '旗津區廟前路50號', '', '', '', 0, 22.6118, 120.268, '');

-- --------------------------------------------------------

--
-- 資料表結構 `friends`
--

CREATE TABLE `friends` (
  `firstid` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `next` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `1` int(11) NOT NULL,
  `2` int(11) DEFAULT NULL,
  `3` int(11) DEFAULT NULL,
  `4` int(11) DEFAULT NULL,
  `5` int(11) DEFAULT NULL,
  `6` int(11) DEFAULT NULL,
  `7` int(11) DEFAULT NULL,
  `8` int(11) DEFAULT NULL,
  `9` int(11) DEFAULT NULL,
  `10` int(11) DEFAULT NULL,
  `11` int(11) DEFAULT NULL,
  `12` int(11) DEFAULT NULL,
  `13` int(11) DEFAULT NULL,
  `14` int(11) DEFAULT NULL,
  `15` int(11) DEFAULT NULL,
  `16` int(11) DEFAULT NULL,
  `17` int(11) DEFAULT NULL,
  `18` int(11) DEFAULT NULL,
  `19` int(11) DEFAULT NULL,
  `20` int(11) DEFAULT NULL,
  `21` int(11) DEFAULT NULL,
  `22` int(11) DEFAULT NULL,
  `23` int(11) DEFAULT NULL,
  `24` int(11) DEFAULT NULL,
  `25` int(11) DEFAULT NULL,
  `26` int(11) DEFAULT NULL,
  `27` int(11) DEFAULT NULL,
  `28` int(11) DEFAULT NULL,
  `29` int(11) DEFAULT NULL,
  `30` int(11) DEFAULT NULL,
  `31` int(11) DEFAULT NULL,
  `32` int(11) DEFAULT NULL,
  `33` int(11) DEFAULT NULL,
  `34` int(11) DEFAULT NULL,
  `35` int(11) DEFAULT NULL,
  `36` int(11) DEFAULT NULL,
  `37` int(11) DEFAULT NULL,
  `38` int(11) DEFAULT NULL,
  `39` int(11) DEFAULT NULL,
  `40` int(11) DEFAULT NULL,
  `41` int(11) DEFAULT NULL,
  `42` int(11) DEFAULT NULL,
  `43` int(11) DEFAULT NULL,
  `44` int(11) DEFAULT NULL,
  `45` int(11) DEFAULT NULL,
  `46` int(11) DEFAULT NULL,
  `47` int(11) DEFAULT NULL,
  `48` int(11) DEFAULT NULL,
  `49` int(11) DEFAULT NULL,
  `50` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `friends`
--

INSERT INTO `friends` (`firstid`, `user_id`, `next`, `id`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`, `32`, `33`, `34`, `35`, `36`, `37`, `38`, `39`, `40`, `41`, `42`, `43`, `44`, `45`, `46`, `47`, `48`, `49`, `50`) VALUES
(1, 1, 0, 1, 2, 23, 21, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `login`
--

CREATE TABLE `login` (
  `account` varchar(25) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_picture` int(11) NOT NULL,
  `picture_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `notice`
--

CREATE TABLE `notice` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `class` varchar(20) NOT NULL,
  `picture_id` int(11) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `context` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `notice`
--

INSERT INTO `notice` (`id`, `user_id`, `date`, `class`, `picture_id`, `album_id`, `context`) VALUES
(1, 21, '2016-09-18 03:17:29', 'post', 2, NULL, 'SADFOKISDAHJFOI'),
(2, 21, '2016-09-18 03:33:25', 'post', 3, NULL, 'ASFCVDFHH'),
(3, 13, '2016-09-18 03:33:25', 'post', 3, NULL, 'ASFCVDFHH'),
(4, 2, '2016-09-24 13:57:58', 'post', 71, NULL, ''),
(5, 2, '2016-09-24 14:00:35', 'post', 72, NULL, '11111111'),
(6, 2, '2016-09-24 14:01:16', 'post', 73, NULL, '11111111');

-- --------------------------------------------------------

--
-- 資料表結構 `picture`
--

CREATE TABLE `picture` (
  `id` int(11) NOT NULL,
  `attraction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `type` varchar(20) NOT NULL,
  `file` longblob,
  `size` int(11) NOT NULL,
  `content` text NOT NULL,
  `purl` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `picture`
--

INSERT INTO `picture` (`id`, `attraction_id`, `user_id`, `date`, `type`, `file`, `size`, `content`, `purl`) VALUES
(1, 1, 2, '2016-09-01 00:00:00', 'album', NULL, 0, '123', ''),
(2, 2, 2, '2016-09-01 00:00:08', 'album', NULL, 0, '123', ''),
(3, 3, 2, '2016-09-01 00:00:09', 'album', NULL, 0, '123', ''),
(4, 4, 2, '2016-09-01 00:00:12', 'album', NULL, 0, '123', ''),
(5, 5, 2, '2016-09-01 00:00:13', 'album', NULL, 0, '123', ''),
(6, 6, 2, '2016-09-01 00:00:15', 'album', NULL, 0, '123', ''),
(7, 7, 2, '2016-09-01 00:00:20', 'album', NULL, 0, '123', ''),
(8, 8, 2, '2016-09-01 00:00:26', 'album', NULL, 0, '123', ''),
(9, 9, 2, '2016-09-01 00:00:29', 'album', NULL, 0, '123', ''),
(10, 10, 2, '2016-09-01 00:00:38', 'album', NULL, 0, '123', ''),
(11, 11, 2, '2016-09-01 00:00:42', 'album', NULL, 0, '123', ''),
(12, 12, 2, '2016-09-01 00:00:46', 'album', NULL, 0, '123', ''),
(13, 13, 2, '2016-09-01 00:00:49', 'album', NULL, 0, '123', ''),
(14, 14, 2, '2016-09-01 00:00:52', 'album', NULL, 0, '123', ''),
(15, 15, 2, '2016-09-01 00:00:53', 'album', NULL, 0, '123', ''),
(16, 16, 2, '2016-09-01 00:00:56', 'album', NULL, 0, '123', ''),
(17, 17, 2, '2016-09-01 00:00:58', 'album', NULL, 0, '123', ''),
(18, 18, 2, '2016-09-01 00:01:01', 'album', NULL, 0, '123', ''),
(19, 28, 2, '2016-09-01 00:01:06', 'album', NULL, 0, '123', ''),
(20, 20, 2, '2016-09-01 00:01:09', 'album', NULL, 0, '123', ''),
(21, 21, 2, '2016-09-01 00:01:11', 'album', NULL, 0, '123', ''),
(22, 22, 2, '2016-09-01 00:01:12', 'album', NULL, 0, '123', ''),
(23, 23, 2, '2016-09-01 00:01:14', 'album', NULL, 0, '123', ''),
(24, 24, 2, '2016-09-01 00:01:15', 'album', NULL, 0, '123', ''),
(25, 25, 2, '2016-09-01 00:01:16', 'album', NULL, 0, '123', ''),
(26, 26, 2, '2016-09-01 00:01:17', 'album', NULL, 0, '123', ''),
(27, 27, 2, '2016-09-01 00:01:19', 'album', NULL, 0, '123', ''),
(28, 28, 2, '2016-09-01 00:01:20', 'album', NULL, 0, '123', ''),
(29, 29, 2, '2016-09-01 00:01:22', 'album', NULL, 0, '123', ''),
(30, 30, 2, '2016-09-01 00:01:23', 'album', NULL, 0, '123', ''),
(31, 31, 2, '2016-09-01 00:01:25', 'album', NULL, 0, '123', ''),
(32, 32, 2, '2016-09-01 00:01:26', 'album', NULL, 0, '123', ''),
(33, 33, 2, '2016-09-01 00:01:28', 'album', NULL, 0, '123', ''),
(34, 34, 2, '2016-09-01 00:01:30', 'album', NULL, 0, '123', ''),
(35, 35, 2, '2016-09-01 00:01:33', 'album', NULL, 0, '123', ''),
(57, 8, 3, '2016-09-10 08:51:30', '', NULL, 0, 'Hool', '0'),
(58, 8, 3, '2016-09-10 08:54:35', '', NULL, 0, 'Aaaaaaaaa', '0'),
(59, 8, 3, '2016-09-10 08:54:56', '', NULL, 0, 'Aaaaaaaaa', '0'),
(60, 7, 3, '2016-09-10 08:58:20', '', NULL, 0, 'Aaaaa', '0'),
(61, 0, 3, '2016-09-10 08:59:19', '', NULL, 0, '???????...', '0'),
(62, 0, 3, '2016-09-10 09:00:47', '', NULL, 0, '???????...', '0'),
(63, 0, 3, '2016-09-10 09:04:28', '', NULL, 0, '???????...', '0'),
(64, 0, 3, '2016-09-10 09:05:12', '', NULL, 0, '???????...', '14734911111903.jpg'),
(65, 0, 3, '2016-09-10 09:07:01', '', NULL, 0, '???????...', '0'),
(66, 0, 3, '2016-09-10 09:07:26', '', NULL, 0, '???????...', '0'),
(67, 0, 3, '2016-09-10 09:12:26', '', NULL, 0, '???????...', 'false'),
(68, 0, 3, '2016-09-10 09:14:21', '', NULL, 0, '???????...', 'false'),
(69, 0, 3, '2016-09-10 09:36:19', '', NULL, 0, '???????...', '14734929788513.jpg'),
(70, 0, 3, '2016-09-10 09:38:39', '', NULL, 0, '???????...', '14734931186183.jpg'),
(71, 0, 0, '2016-09-24 13:57:58', '', NULL, 0, '', ''),
(72, 1, 2, '2016-09-24 14:00:35', '', NULL, 0, '11111111', ''),
(73, 1, 2, '2016-09-24 14:01:16', '', NULL, 0, '11111111', '1244.jpg');

-- --------------------------------------------------------

--
-- 資料表結構 `route`
--

CREATE TABLE `route` (
  `user_id` int(11) NOT NULL,
  `route_id` int(11) NOT NULL,
  `firstid` tinyint(1) NOT NULL,
  `route_name` varchar(20) NOT NULL,
  `next` int(11) NOT NULL,
  `likenumber` int(11) NOT NULL,
  `date` date NOT NULL,
  `1` int(11) NOT NULL,
  `2` int(11) DEFAULT NULL,
  `3` int(11) DEFAULT NULL,
  `4` int(11) DEFAULT NULL,
  `5` int(11) DEFAULT NULL,
  `6` int(11) DEFAULT NULL,
  `7` int(11) DEFAULT NULL,
  `8` int(11) DEFAULT NULL,
  `9` int(11) DEFAULT NULL,
  `10` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `route`
--

INSERT INTO `route` (`user_id`, `route_id`, `firstid`, `route_name`, `next`, `likenumber`, `date`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`) VALUES
(123, 1, 1, 'haha', 2, 456, '0000-00-00', 123, 234, 456, 456345, 243346, 23, 13, 4563, 12234, 13452553),
(223, 2, 0, 'haha', 0, 233, '0000-00-00', 262, 3422, 3, 0, 0, 0, 0, 0, 0, 0),
(2322, 3, 1, 'uyi', 0, 12412, '0000-00-00', 1323, 3421, 1321, 0, 0, 0, 0, 0, 0, 0),
(3123, 4, 1, 'rfvd', 0, 343, '0000-00-00', 4565, 262, 2432, 23434, 0, 0, 0, 0, 0, 0),
(4343, 5, 1, 'sfsa', 6, 132, '0000-00-00', 2324, 23434, 54, 343, 262, 234234, 4, 3321, 13, 54),
(4342, 6, 0, 'wef', 0, 232, '0000-00-00', 234, 42, 0, 0, 0, 0, 0, 0, 0, 0),
(722, 7, 1, 'fsd', 0, 13, '0000-00-00', 2488, 232, 343, 262, 466, 567, 0, 0, 0, 0),
(343, 8, 1, 'fdd', 0, 211, '0000-00-00', 262, 564, 2433, 242, 0, 0, 0, 0, 0, 0),
(21, 9, 1, 'ds', 0, 321, '0000-00-00', 242, 255, 24, 262, 0, 0, 0, 0, 0, 0),
(2, 10, 1, '2016-09-24', 0, 0, '2016-09-24', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `fb_id` varchar(20) NOT NULL,
  `picture_id` int(10) NOT NULL,
  `attraction_id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `noticeid` int(11) NOT NULL,
  `purl` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `user`
--

INSERT INTO `user` (`name`, `fb_id`, `picture_id`, `attraction_id`, `user_id`, `noticeid`, `purl`) VALUES
('Ahan', '001', 1, 0, 1, 0, ''),
('Ben', '002', 2, 0, 2, 0, ''),
('彭冠程', '1095867037147527', 3, 0, 3, 0, ''),
('Depp', '004', 4, 0, 4, 0, ''),
('Elephant', '005', 5, 0, 5, 0, ''),
('Febb', '006', 6, 0, 6, 0, ''),
('Gina', '007', 7, 0, 7, 0, ''),
('Hennah', '008', 8, 0, 8, 0, ''),
('Ice', '009', 9, 0, 9, 0, ''),
('Janet', '010', 10, 0, 10, 0, ''),
('Kelly', '011', 11, 0, 11, 0, ''),
('Linda', '012', 12, 0, 12, 0, ''),
('Mike', '013', 13, 0, 13, 0, ''),
('Nike', '014', 14, 0, 14, 0, ''),
('Oldschool', '015', 15, 0, 15, 0, ''),
('Peter', '016', 16, 0, 16, 0, ''),
('Queen', '017', 17, 0, 17, 0, ''),
('Rihanna', '018', 18, 0, 18, 0, ''),
('Steven', '019', 19, 0, 19, 0, ''),
('Teller', '020', 20, 0, 20, 0, ''),
('University', '021', 21, 0, 21, 0, ''),
('Vella', '022', 22, 0, 22, 0, ''),
('Woman', '023', 23, 0, 23, 0, ''),
('Xman', '024', 24, 0, 24, 0, ''),
('Yoyo', '025', 25, 0, 25, 0, ''),
('Zebra', '026', 26, 0, 26, 0, ''),
('Allen', '027', 27, 0, 27, 0, ''),
('Betty', '028', 28, 0, 28, 0, ''),
('Cliver', '029', 29, 0, 29, 0, ''),
('Devid', '030', 30, 0, 30, 0, ''),
('Emily', '031', 31, 0, 31, 0, ''),
('Filezella', '032', 32, 0, 32, 0, ''),
('Gary', '033', 33, 0, 33, 0, ''),
('Hebe', '034', 34, 0, 34, 0, ''),
('Ian', '035', 35, 0, 35, 0, ''),
('Jason', '036', 36, 0, 36, 0, ''),
('Kevin', '037', 37, 0, 37, 0, ''),
('Lily', '038', 38, 0, 38, 0, ''),
('Michele', '039', 39, 0, 39, 0, ''),
('Next', '040', 40, 0, 40, 0, ''),
('October', '041', 41, 0, 41, 0, ''),
('Pixer', '042', 42, 0, 42, 0, ''),
('Quit', '043', 43, 0, 43, 0, ''),
('Rickey', '044', 44, 0, 44, 0, ''),
('Sharen', '045', 45, 0, 45, 0, ''),
('Tipe', '046', 46, 0, 46, 0, ''),
('Umbrella', '047', 47, 0, 47, 0, ''),
('Vickey', '048', 48, 0, 48, 0, ''),
('Wendy', '049', 49, 0, 49, 0, ''),
('Xray', '050', 50, 0, 50, 0, ''),
('Yes', '051', 51, 0, 51, 0, ''),
('Zoo', '052', 52, 0, 52, 0, '');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `attraction`
--
ALTER TABLE `attraction`
  ADD PRIMARY KEY (`attraction_id`);

--
-- 資料表索引 `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`route_id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用資料表 AUTO_INCREMENT `attraction`
--
ALTER TABLE `attraction`
  MODIFY `attraction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;
--
-- 使用資料表 AUTO_INCREMENT `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用資料表 AUTO_INCREMENT `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用資料表 AUTO_INCREMENT `picture`
--
ALTER TABLE `picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- 使用資料表 AUTO_INCREMENT `route`
--
ALTER TABLE `route`
  MODIFY `route_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- 使用資料表 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
