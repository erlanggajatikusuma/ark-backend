-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2020 at 02:35 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arkcafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'Drink'),
(2, 'Food');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `cashier` varchar(128) NOT NULL,
  `invoice` varchar(32) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `orders` varchar(256) NOT NULL,
  `amount` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `cashier`, `invoice`, `date`, `orders`, `amount`) VALUES
(1, 'Boy', '#10928', '2020-09-04 01:57:10', 'Ice Tea, Salad With peanut sauce', 120000),
(2, 'Andi', '#10928', '2020-09-05 07:04:45', 'Coffe Latte, Chicken Katsu', 70000),
(3, 'Andi', '#10930', '2020-09-05 07:08:35', 'Cappucino, Black Forest', 35000),
(4, 'Andi', '#10931', '2020-09-05 07:59:08', 'Red Velvet Latte, Chicken Katsu', 90000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `price` int(64) NOT NULL,
  `idCategory` int(11) NOT NULL,
  `idStatus` int(11) NOT NULL,
  `image` varchar(512) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `idCategory`, `idStatus`, `image`, `createdAt`, `updateAt`) VALUES
(1, 'Espresso', 10000, 1, 1, 'http://localhost:3000/uploads/2020-08-28T05-37-46.303Z - espresso.jpg', '0000-00-00 00:00:00', '2020-08-28 05:37:46'),
(2, 'Coffe Latte', 15000, 1, 1, 'http://localhost:3000/uploads/2020-08-28T05-39-21.021Z - coffelatte.jpg', '2020-08-09 21:39:18', '2020-08-28 05:39:21'),
(3, 'Cappucino', 5000, 1, 1, 'http://localhost:3000/uploads/2020-08-28T05-51-20.098Z - cappuccino.jpg', '2020-08-09 21:41:42', '2020-08-28 05:51:20'),
(4, 'Red Velvet Latte', 33000, 1, 1, 'http://localhost:3000/uploads/2020-09-05T07-25-33.087Z - redvelvet.jpg', '2020-09-05 14:25:33', '2020-09-05 07:25:55'),
(5, 'Choco Rhum', 28000, 2, 1, 'http://localhost:3000/uploads/2020-09-05T07-27-03.304Z - chocorum.jpg', '2020-09-05 14:27:03', '2020-09-05 07:29:04'),
(6, 'Black Forest', 30000, 2, 1, 'http://localhost:3000/uploads/2020-09-05T07-27-42.939Z - blackforest.jpg', '2020-09-05 14:27:42', '2020-09-05 07:28:52'),
(7, 'Chicken Katsu Dabu-dabu', 60000, 2, 1, 'http://localhost:3000/uploads/2020-08-28T05-44-14.696Z - chickenkatsu.jpg', '0000-00-00 00:00:00', '2020-08-28 05:44:14'),
(8, 'Salmon Truffle Teriyaki', 60000, 2, 1, 'http://localhost:3000/uploads/2020-08-28T05-45-25.330Z - salmontruffle.jpg', '0000-00-00 00:00:00', '2020-08-28 05:45:25'),
(9, 'Wiener Schnitzel', 69000, 2, 1, 'http://localhost:3000/uploads/2020-08-28T05-46-17.077Z - wiener.jpg', '0000-00-00 00:00:00', '2020-08-28 05:46:17'),
(70, 'Onigiri', 40000, 2, 1, 'http://localhost:3000/uploads/2020-09-02T03-07-14.144Z - Screenshot (84).png', '2020-09-02 10:07:14', '2020-09-02 03:07:14'),
(73, 'Sushi', 60000, 2, 1, 'http://localhost:3000/uploads/2020-09-06T07-57-06.902Z - Screenshot (179).png', '2020-09-02 16:02:05', '2020-09-06 07:57:06'),
(74, 'Limun', 9000, 1, 1, 'http://localhost:3000/uploads/2020-09-02T09-31-16.006Z - Screenshot (190).png', '2020-09-02 16:31:16', '2020-09-02 09:31:16'),
(75, 'Milk Tea', 7000, 1, 1, 'http://localhost:3000/uploads/2020-09-02T09-41-00.808Z - Screenshot (136).png', '2020-09-02 16:41:00', '2020-09-02 09:41:00'),
(79, 'Chacha Milk Tea', 10000, 1, 1, 'http://localhost:3000/uploads/2020-09-06T07-57-25.716Z - Screenshot (44).png', '2020-09-05 23:08:45', '2020-09-06 07:57:25'),
(80, 'Fried Rice', 13000, 2, 1, 'http://localhost:3000/uploads/2020-09-06T07-58-25.173Z - Screenshot (90).png', '2020-09-05 23:12:56', '2020-09-06 07:58:25'),
(81, 'Sauce Salad', 15000, 2, 1, 'http://localhost:3000/uploads/2020-09-06T07-58-43.628Z - Screenshot (201).png', '2020-09-05 23:14:38', '2020-09-06 07:58:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 'muhammad', 'akbar', 'akbar@gmail.com', '$2a$10$IJ1KgpHrrphBzPcRnSHpHusEtJ42ZYgI4hcm.RLCLKTQvcFPHTSDG', 1, '2020-08-19 13:44:28', '2020-08-19 13:44:28'),
(2, 'Ali', 'Akbar', 'ali@gmail.com', '$2a$10$CqYmsKAB1swDUM52B1CJG.n6IekbkG1IFXU3IRc8ZyWGbbxhq3XUi', 1, '2020-08-19 15:45:11', '2020-08-19 15:45:11'),
(4, 'ryuuzaki', 'ryu', 'ryu@gmail.com', '$2a$10$xbuzlMVdJ7g9kZOIiDhSJevEmsL261gJAsVNtreeTAnWbW7GvedVW', 2, '2020-08-20 06:52:01', '2020-08-20 06:52:01'),
(5, 'admin', 'satu', 'admin1@gmail.com', '$2a$10$WUc0mu83mPp3QE6W1Xzl4e4sWcY.FZQ6rTnOj2l.Foo9RuEYHXFny', 2, '2020-08-24 02:49:06', '2020-08-24 02:49:06'),
(6, 'admin', 'satu', 'admin1@gmail.com', '$2a$10$fhp177CdM5Y0yWjspo/66OEiMXvIDL6vKyzm3yahwKHHv8HQXOIue', 2, '2020-08-24 02:50:07', '2020-08-24 02:50:07'),
(7, 'testing', 'satu', 'testing@gmail.com', '$2a$10$PcH8jYL4VwFqSmQ.1ab8iO.AACoSG9Ynp8sAKDK54cNDwVUrOVlF.', 2, '2020-08-28 13:51:01', '2020-08-28 13:51:01'),
(8, 'testing', 'satu', 'testing@gmail.com', '$2a$10$pJAuRpd18N.3CzOC6Kea4O0fT3pBmzPJLFpghcWGn7GDFUGp7QAKq', 2, '2020-08-28 13:51:24', '2020-08-28 13:51:24'),
(9, 'testing', 'satu', 'testing@gmail.com', '$2a$10$dLgt7tNFhMEgKKuFpjfqOOcqclAo2bjS3TapykiIJ/Cj6ONYYFf6S', 2, '2020-08-28 13:52:05', '2020-08-28 13:52:05'),
(10, 'testing', 'satu', 'testing@gmail.com', '$2a$10$.yozkB51zKISXeWjwcxHR.5VvM5W8s4iE34bI4VMH3AiwN3Sewa1G', 2, '2020-08-28 13:52:43', '2020-08-28 13:52:43'),
(11, 'example', 'dua', 'xample2@gmail.com', '$2a$10$zQtI5DsfQqtwGA854drYFuyGUFkw0PEMiR5I9d58dLqVV1uw8biUy', 2, '2020-08-28 13:55:07', '2020-08-28 13:55:07'),
(12, 'Jhon', 'Doe', 'jhondoe@gmail.com', '$2a$10$1fU/mWU.0KoifgSogVMDh./1ft5DtBl/5JO0qtTdsZ5/E6d3pEbiK', 2, '2020-08-28 16:12:52', '2020-08-28 16:12:52'),
(13, 'ahmad', 'noor', 'ahmad@gmail.com', '$2a$10$CHprYoWHp8MmYhbEYHLX3u4CRuYXYeIdhhESa7WmG7m6p.wSdsOne', 2, '2020-08-30 04:29:52', '2020-08-30 04:29:52'),
(15, 'angga', 'kusuma', 'anggga@gmail.com', '$2a$10$tdrs0tXgYcny/DwTmtjwg.OpJ4YbcFzM3yehIoXQl5sMJB/m26aiq', 2, '2020-09-07 03:45:51', '2020-09-07 03:45:51'),
(16, 'Surya', 'Ramadhan', 'suryarama@gmail.com', '$2a$10$imV2wb.Z3UhGSd/t/NKHku4i7qG9JLewCaWQgsyuEAEk4pstoofd6', 2, '2020-09-12 07:24:24', '2020-09-12 07:24:24'),
(17, 'surya', 'ramadhan', 'surya@gmail.com', '$2a$10$.vVLvwl4laA9wYly3Q409e7PEhnEgZCc9BUMHd6dfRw5ZhUu7Q9cC', 2, '2020-10-02 11:39:10', '2020-10-02 11:39:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
