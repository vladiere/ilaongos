-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2023 at 07:31 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carwashboy`
--
CREATE DATABASE IF NOT EXISTS `carwashboy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `carwashboy`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_branch`
--

CREATE TABLE `tbl_branch` (
  `branch_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `branch_name` varchar(45) NOT NULL,
  `branch_location` varchar(255) NOT NULL,
  `date_publish` varchar(45) NOT NULL,
  `branch_status` varchar(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_branch`
--

INSERT INTO `tbl_branch` (`branch_id`, `owner_id`, `branch_name`, `branch_location`, `date_publish`, `branch_status`) VALUES
(1, 8, 'siyatagiya', 'likod sa amoang baboyan', '2023-02-21 15:36:10', '0'),
(2, 2, 'this is a not a branch', 'luyo sa among skwelahan', '2023-02-21 16:40:24', '0'),
(3, 2, 'branch 2', 'gabi cordova', '2023-02-23 08:39:09', '0'),
(4, 10, 'jabaroa sa cordova', 'alegria cordova', '2023-02-28 15:19:14', '0'),
(5, 2, 'branchio', 'bangbang cordova', '2023-03-10 15:19:48', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_carwashshop`
--

CREATE TABLE `tbl_carwashshop` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `shop_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date_publish` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `number_rate` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_carwashshop`
--

INSERT INTO `tbl_carwashshop` (`id`, `owner_id`, `shop_name`, `location`, `date_publish`, `date_updated`, `status`, `rating`, `number_rate`) VALUES
(4, 4, 'Carwash mafia', 'bangbang', '2023-02-12 09:09:30', '2023-02-12 09:09:30', 0, '0.00', 0),
(6, 2, 'Carwash for all', 'babag 2', '2023-02-12 23:06:20', '2023-02-23 13:21:55', 0, '2.50', 3),
(7, 8, 'Tagiyo carwash', 'tulay', '2023-02-21 15:24:41', '2023-03-10 15:15:21', 1, '0.00', 0),
(8, 7, 'Tag iya ko ani', 'gabi', '2023-02-21 15:36:49', '2023-02-21 15:36:49', 0, '0.00', 0),
(11, 10, 'jabaroa', 'upon merkado', '2023-02-28 15:52:42', '2023-03-10 15:15:17', 1, '0.00', 0),
(12, 11, 'pogoy carwash', 'bang bang, cordova', '2023-03-12 07:14:45', '2023-03-12 07:14:45', 0, '0.00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_documents`
--

CREATE TABLE `tbl_documents` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `date_publish` date NOT NULL,
  `date_updated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_documents`
--

INSERT INTO `tbl_documents` (`id`, `owner_id`, `img_path`, `date_publish`, `date_updated`) VALUES
(38, 4, 'user_data/0permit-sample-1.jpg', '2023-02-12', '2023-02-12'),
(39, 4, 'user_data/1permit-sample-2.jpg', '2023-02-12', '2023-02-12'),
(40, 4, 'user_data/2permit-sample-3.jpg', '2023-02-12', '2023-02-12'),
(41, 2, 'user_data/0permit-sample-1.jpg', '2023-02-12', '2023-02-12'),
(42, 2, 'user_data/1permit-sample-2.jpg', '2023-02-12', '2023-02-12'),
(43, 2, 'user_data/2permit-sample-3.jpg', '2023-02-12', '2023-02-12'),
(44, 7, 'user_data/0permit-sample-1.jpg', '2023-02-21', '2023-02-21'),
(45, 7, 'user_data/1permit-sample-2.jpg', '2023-02-21', '2023-02-21'),
(46, 7, 'user_data/2permit-sample-3.jpg', '2023-02-21', '2023-02-21'),
(47, 8, 'user_data/0permit-sample-1.jpg', '2023-02-21', '2023-02-21'),
(48, 8, 'user_data/1permit-sample-2.jpg', '2023-02-21', '2023-02-21'),
(49, 8, 'user_data/2permit-sample-3.jpg', '2023-02-21', '2023-02-21'),
(53, 10, 'user_data/0permit-sample-1.jpg', '2023-02-28', '2023-02-28'),
(54, 10, 'user_data/1permit-sample-2.jpg', '2023-02-28', '2023-02-28'),
(55, 10, 'user_data/2permit-sample-3.jpg', '2023-02-28', '2023-02-28'),
(56, 11, 'user_data/0permit-sample-1.jpg', '2023-03-12', '2023-03-12'),
(57, 11, 'user_data/1permit-sample-2.jpg', '2023-03-12', '2023-03-12'),
(58, 11, 'user_data/2permit-sample-3.jpg', '2023-03-12', '2023-03-12'),
(59, 12, 'user_data/0permit-sample-1.jpg', '2023-03-12', '2023-03-12'),
(60, 12, 'user_data/1permit-sample-2.jpg', '2023-03-12', '2023-03-12'),
(61, 12, 'user_data/2permit-sample-3.jpg', '2023-03-12', '2023-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pending`
--

CREATE TABLE `tbl_pending` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `shop_name` varchar(45) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pending`
--

INSERT INTO `tbl_pending` (`id`, `owner_id`, `shop_name`, `location`, `date_added`, `date_updated`, `status`) VALUES
(6, 4, 'carwash mafia', 'bangbang', '2023-02-12 09:07:38', '2023-02-12 09:09:30', 1),
(9, 2, 'carwash for all', 'babag 2', '2023-02-12 10:29:45', '2023-02-12 23:06:20', 1),
(10, 7, 'tag iya ko ani', 'tulay', '2023-02-21 02:22:59', '2023-02-21 15:36:49', 1),
(11, 8, 'tagiyo carwash', 'gabi', '2023-02-21 15:20:18', '2023-02-21 15:24:41', 1),
(21, 10, 'jabaroa', 'upon merkado', '2023-02-28 15:18:27', '2023-02-28 15:52:42', 1),
(22, 11, 'pogoy carwash', 'bang bang, cordova', '2023-03-12 07:14:08', '2023-03-12 07:14:45', 1),
(23, 12, 'pamp carwash', 'cebu', '2023-03-12 07:16:57', '2023-03-12 07:16:57', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pricelist`
--

CREATE TABLE `tbl_pricelist` (
  `id` int(11) NOT NULL,
  `user_id` int(35) NOT NULL,
  `price` bigint(255) NOT NULL,
  `wash_type` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `date_created` date NOT NULL,
  `date_updated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pricelist`
--

INSERT INTO `tbl_pricelist` (`id`, `user_id`, `price`, `wash_type`, `vehicle_type`, `date_created`, `date_updated`) VALUES
(3, 2, 1900, 'complete wash', 'sedan', '2023-02-18', '2023-03-10'),
(4, 2, 900, 'vacuum', 'pick-up', '2023-02-18', '2023-02-18'),
(5, 2, 1000, 'value wash', 'van', '2023-02-18', '2023-02-18'),
(7, 2, 1055, 'body wash', 'auv', '2023-02-18', '2023-03-12'),
(8, 4, 500, 'body wash', 'auv', '2023-02-18', '2023-02-18'),
(9, 4, 800, 'complete wash', 'suv', '2023-02-18', '2023-02-18'),
(10, 4, 900, 'wax', 'urban', '2023-02-19', '2023-02-19'),
(12, 2, 1500, 'value wash', 'sedan', '2023-03-12', '2023-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profile`
--

CREATE TABLE `tbl_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_path` varchar(45) NOT NULL,
  `date_added` varchar(45) NOT NULL,
  `date_updated` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_profile`
--

INSERT INTO `tbl_profile` (`id`, `user_id`, `profile_path`, `date_added`, `date_updated`) VALUES
(1, 4, 'user_data/cwmafia.jpg', '2023-02-12 09:07:38', '2023-02-12 09:07:38'),
(2, 2, 'user_data/books-goal.jpg', '2023-02-12 10:29:45', '2023-02-28 14:37:11'),
(3, 7, 'user_data/functions.jpg', '2023-02-21 02:22:59', '2023-02-21 02:22:59'),
(4, 8, 'user_data/RBL Bank System.png', '2023-02-21 15:20:18', '2023-02-21 15:20:18'),
(7, 10, 'user_data/reposrt-resources.jpg', '2023-02-28 14:48:40', '2023-02-28 15:25:35'),
(14, 11, 'user_data/bdo.jpg', '2023-03-12 07:14:08', '2023-03-12 07:14:08'),
(15, 12, 'user_data/bank-bg.jpg', '2023-03-12 07:17:18', '2023-03-12 07:17:18');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_staff`
--

CREATE TABLE `tbl_staff` (
  `staff_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `shop_assign` varchar(45) NOT NULL,
  `firstname` varchar(35) NOT NULL,
  `middlename` varchar(35) NOT NULL,
  `lastname` varchar(35) NOT NULL,
  `date_of_birth` varchar(11) NOT NULL,
  `email_address` varchar(45) NOT NULL,
  `contact_number` varchar(35) NOT NULL,
  `position` varchar(11) NOT NULL,
  `staff_status` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_staff`
--

INSERT INTO `tbl_staff` (`staff_id`, `owner_id`, `shop_assign`, `firstname`, `middlename`, `lastname`, `date_of_birth`, `email_address`, `contact_number`, `position`, `staff_status`) VALUES
(1, 2, 'carwash for all', 'employee1', 'employ', 'empoy', '2000-03-05', 'empoy@emp.com', '0963852741', 'dish washer', '1'),
(2, 2, 'carwash for all', 'employee2', 'emp', 'epoy', '1998-03-15', 'epy@epoy.com', '0987456321', 'cleaner', '0'),
(3, 2, 'carwash for all', 'employee1', 'employ', 'empoy', '2000-03-05', 'empoy@emp.com', '0963852741', 'dish washer', '0'),
(4, 2, 'carwash for all', 'employee3', 'emem', 'eminem', '1998-11-05', 'eminem@gmail.com', '0987123654', 'sweeper', '0'),
(5, 2, 'branch 2', 'amal', '-', 'fuentes', '1999-03-08', 'amal@gmail.com', '09123456789', 'dish washer', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions`
--

CREATE TABLE `tbl_transactions` (
  `trans_id` int(11) NOT NULL,
  `user_id` int(25) NOT NULL,
  `shopowner_id` int(11) NOT NULL,
  `carwash_name` varchar(45) NOT NULL,
  `vehicle_type` varchar(45) NOT NULL,
  `wash_type` varchar(45) NOT NULL,
  `price` bigint(45) NOT NULL,
  `date_added` varchar(45) NOT NULL,
  `date_sched` varchar(45) NOT NULL,
  `date_updated` varchar(45) NOT NULL,
  `trans_status` varchar(11) NOT NULL DEFAULT '0',
  `stars` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transactions`
--

INSERT INTO `tbl_transactions` (`trans_id`, `user_id`, `shopowner_id`, `carwash_name`, `vehicle_type`, `wash_type`, `price`, `date_added`, `date_sched`, `date_updated`, `trans_status`, `stars`) VALUES
(32, 3, 2, 'this is a not a branch', 'Pick-up', 'Vacuum', 900, '2023-02-26 09:06:46', '2023-02-28 1:00 PM', '2023-02-26 16:43:11', 'completed', 6),
(33, 3, 2, 'branch 2', 'Auv', 'Body Wash ', 550, '2023-02-26 09:11:34', '2023-03-01 3:00 PM', '2023-02-26 16:43:02', 'completed', 4),
(34, 3, 2, 'carwash for all', 'Sedan', 'Complete Wash ', 900, '2023-02-11 16:41:56', '2023-03-01 12:00 PM', '2023-02-28 17:18:44', 'completed', 5),
(35, 3, 4, 'carwash mafia', 'suv', 'complete wash ', 800, '2023-03-10 15:29:46', '2023-03-13 11:30 AM', '2023-03-10 15:29:46', '0', 0),
(36, 3, 2, 'carwash for all', 'pick-up', 'vacuum', 900, '2023-03-12 07:02:04', '2023-03-20 1:00 PM', '2023-03-12 07:24:30', 'declined', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `email_add` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `midname` varchar(45) NOT NULL,
  `role` varchar(11) NOT NULL,
  `contact_no` varchar(15) NOT NULL DEFAULT '0000-000-0000',
  `address` varchar(255) NOT NULL DEFAULT 'to be edited',
  `userprofile` varchar(255) NOT NULL DEFAULT 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png',
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `email_add`, `password`, `firstname`, `lastname`, `midname`, `role`, `contact_no`, `address`, `userprofile`, `date_created`, `date_updated`, `status`) VALUES
(1, 'ongos@aim.com', '1b52b140b334c130fc83b623c4d858bf', 'john carlo', 'ongos', 'bonjoir', 'admin', '0987654321', 'bangbang, cordova, cebu', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-07 00:00:00', '2023-02-08 11:04:30', 0),
(2, 'ricaron767@proexbol.com', '57ba172a6be125cca2f449826f9980ca', 'sample', 'asd', 'owner', 'owner', '0963258741', 'Dagom, dagoman, ezreal', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-02 10:22:00', '2023-03-10 22:19:02', 0),
(3, 'example@ex.com', '3f41bace4df8873c73d52dd9b7bdc094', 'example', 'qwe', 'customer', 'customer', '09123456789', 'cebu, lapu-lapu city, bohol  2145', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-02 11:32:50', '2023-02-15 09:22:57', 0),
(4, 'rohapi7386@terkoer.com', '25f9e794323b453885f5181f1b624d0b', 'qwerty', 'owner', 'qweqq', 'owner', '0987456321', 'gabi, babag 2, manila,', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-03 07:45:05', '2023-03-10 22:25:35', 0),
(5, 'ado@adob.adobo', '57ba172a6be125cca2f449826f9980ca', 'ado', 'adobo', 'adob', 'customer', '09456123987', 'bagbag str. lion, de corazon, cebu', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-08 03:48:27', '2023-03-10 22:28:41', 0),
(6, 'sample@samp.com', '3f41bace4df8873c73d52dd9b7bdc094', 'sample 1', 'sampliton', 'samples', 'customer', '0000-000-0000', 'to be edited', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-20 03:57:51', '2023-02-20 03:57:52', 0),
(7, 'diko@dk.com', 'ae1e57bbe520f9e357de370eba5e09bc', 'dimo', 'bahala', 'diko', 'owner', '0000-000-0000', 'to be edited', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-21 01:46:26', '2023-02-21 02:22:59', 0),
(8, 'tag@iya.com', 'e0f918013df9b85412ee7c81f7aeaf67', 'tagiya', 'tagtag', 'tagiyako', 'owner', '0000-000-0000', 'to be edited', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-21 02:08:29', '2023-03-10 15:15:21', 1),
(10, 'jabar@gmail.com', '4fa09587527dcd403cddef3e71b88a41', 'abdol', 'jabar', 'abol', 'owner', '0000-000-0000', 'to be edited', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-02-28 14:23:54', '2023-03-10 15:15:17', 1),
(11, 'pogoy@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'junmar', 'sumagang', 'pogoy', 'owner', '0987456312', 'bang bang, cordova', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-03-12 07:11:50', '2023-03-12 07:14:08', 0),
(12, 'pamp@gmail.com', '57ba172a6be125cca2f449826f9980ca', 'sample', 'pamp', 'amp', 'owner', '0000-000-0000', 'to be edited', 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png', '2023-03-12 07:15:50', '2023-03-12 07:17:18', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_branch`
--
ALTER TABLE `tbl_branch`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `tbl_carwashshop`
--
ALTER TABLE `tbl_carwashshop`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_documents`
--
ALTER TABLE `tbl_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_pending`
--
ALTER TABLE `tbl_pending`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_pricelist`
--
ALTER TABLE `tbl_pricelist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_staff`
--
ALTER TABLE `tbl_staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD PRIMARY KEY (`trans_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_add` (`email_add`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_branch`
--
ALTER TABLE `tbl_branch`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_carwashshop`
--
ALTER TABLE `tbl_carwashshop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_documents`
--
ALTER TABLE `tbl_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `tbl_pending`
--
ALTER TABLE `tbl_pending`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_pricelist`
--
ALTER TABLE `tbl_pricelist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_profile`
--
ALTER TABLE `tbl_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_staff`
--
ALTER TABLE `tbl_staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
