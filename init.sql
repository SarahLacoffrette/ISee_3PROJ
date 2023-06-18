-- --------------------------------------------------------

--
-- Table structure for table `brouillon`
--

DROP TABLE IF EXISTS `brouillon`;
CREATE TABLE `brouillon` (
                             `id` int(11) NOT NULL,
                             `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brouillon`
--

INSERT INTO `brouillon` (`id`, `email`) VALUES
    (1, 'test@mail.com');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
                           `id` int(11) NOT NULL,
                           `user` text NOT NULL,
                           `id_video` int(11) NOT NULL,
                           `text` text NOT NULL,
                           `state` tinyint(1) NOT NULL,
                           `date` date NOT NULL,
                           `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--
ALTER TABLE comment MODIFY id INT AUTO_INCREMENT PRIMARY KEY;
INSERT INTO `comment` (`id`, `user`, `id_video`, `text`, `state`, `date`, `id_user`) VALUES
                                                                                         (2, 'SarahLcf', 1, 'Je mets un commentaire', 1, '2023-06-12', 21),
                                                                                         (3, 'SarahLcf', 1, 'Super !!', 1, '2023-06-12', 21),
                                                                                         (4, 'SarahLcf', 1, 'azsaz', 2, '2023-06-12', 21);

-- --------------------------------------------------------

--
-- Table structure for table `LikeTable`
--

DROP TABLE IF EXISTS `LikeTable`;
CREATE TABLE `LikeTable` (
                             `id` int(11) NOT NULL,
                             `id_video` int(11) NOT NULL,
                             `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `LikeTable`
--
ALTER TABLE LikeTable MODIFY id INT AUTO_INCREMENT PRIMARY KEY;
INSERT INTO `LikeTable` (`id`, `id_video`, `id_user`) VALUES
                                                          (1782, 2, 21),
                                                          (1783, 1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `RequestEmail`
--

DROP TABLE IF EXISTS `RequestEmail`;
CREATE TABLE `RequestEmail` (
                                `id` int(11) NOT NULL,
                                `id_user` int(11) DEFAULT NULL,
                                `token` text,
                                `verification` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `RequestEmail`
--
ALTER TABLE RequestEmail MODIFY id INT AUTO_INCREMENT PRIMARY KEY;
INSERT INTO `RequestEmail` (`id`, `id_user`, `token`, `verification`) VALUES
                                                                          (15, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTY4MTA1OTc4M30.CbxJujpUi8gqFkHdWG7bWq0hLNvvpkDp9PgZmT-yFwI', 1),
                                                                          (16, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTY4MTA3MTYwNn0.joDkP51ATsjpdz3zoLtWoe1JQEEA0knek84-w5eYCQY', 1),
                                                                          (17, 23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTY4MTEwNjMwMn0.TI8_gxVX6tRIgJD9mbaenzAf3kCjiRMBYQLI0Ot2IL0', 1),
                                                                          (18, 24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImlhdCI6MTY4MTEzODIxNn0.iS12iSu4cJeAuW4EuLWFGCmwkW3Ay0SqRPCsyslO2ZI', 0),
                                                                          (20, 26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTY4NjkyODY2MH0.bsTBGSy8KV-ky3CoN3hl9qAduPPvXwa3Pk3ZyTIee24', 0),
                                                                          (21, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTY4NjkyODkzN30.TRP1s5hs-pZr2rGaeGyVh80WBMJI1DNV33YRcwk_UFQ', 0),
                                                                          (22, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY4NjkyOTEwNX0.Ha0MkXpXOAGYTW89e_oXkEbBRwBizm9G-XiCXN2G75M', 0),
                                                                          (23, 29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImlhdCI6MTY4NjkyOTIwNH0.Q7W888L2lmgHYGDb8LRTzncumdXYN2JM9unKSdB0sog', 0),
                                                                          (24, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY4NjkyOTQ1OH0.RO_1_FCr4Dm-qOW7JFLiR-PrDzK-DNEZlT9zhh3lC-4', 0),
                                                                          (25, 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY4NjkyOTY4MX0.ncXS-hf4FP99llALM9TB0g5K0supHGh7LKZJ2rKtchc', 0);

-- --------------------------------------------------------

--
-- Table structure for table `SubscribeTable`
--

DROP TABLE IF EXISTS `SubscribeTable`;
CREATE TABLE `SubscribeTable` (
                                  `id` int(11) NOT NULL,
                                  `id_channel` int(11) NOT NULL,
                                  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `SubscribeTable`
--
ALTER TABLE SubscribeTable MODIFY id INT AUTO_INCREMENT PRIMARY KEY;
INSERT INTO `SubscribeTable` (`id`, `id_channel`, `id_user`) VALUES
                                                                 (1, 23, 21),
                                                                 (3, 21, 21),
                                                                 (4, 24, 21);

-- --------------------------------------------------------

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
CREATE TABLE `Tickets` (
                           `id` int(11) NOT NULL,
                           `id_user` int(11) NOT NULL,
                           `username` text NOT NULL,
                           `email` text NOT NULL,
                           `text` text NOT NULL,
                           `state` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Tickets`
--
ALTER TABLE Tickets MODIFY id INT AUTO_INCREMENT PRIMARY KEY;
INSERT INTO `Tickets` (`id`, `id_user`, `username`, `email`, `text`, `state`) VALUES
                                                                                  (1, 21, 'SarahLcf', 'sarah.lacoffrette@supinfo.com', 'trfsed', 1),
                                                                                  (2, 21, 'SarahLcf', 'sarah.lacoffrette@supinfo.com', 'mon message à problème', 0),
                                                                                  (3, 21, 'SarahLcf', 'sarah.lacoffrette@supinfo.com', 'J\'ai Une page qui s\'affiche pas', 1);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
                        `id` int(11) NOT NULL,
                        `firstname` text NOT NULL,
                        `lastname` text NOT NULL,
                        `email` text NOT NULL,
                        `password` text NOT NULL,
                        `username` text NOT NULL,
                        `picture` text NOT NULL,
                        `age` int(11) NOT NULL,
                        `gender` text NOT NULL,
                        `role` int(11) NOT NULL,
                        `token` text NOT NULL,
                        `followers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User`
--
ALTER TABLE User MODIFY id INT AUTO_INCREMENT PRIMARY KEY;
INSERT INTO `User` (`id`, `firstname`, `lastname`, `email`, `password`, `username`, `picture`, `age`, `gender`, `role`, `token`, `followers`) VALUES
                                                                                                                                                  (21, 'Sarah', 'Lcf', 'sarah.lacoffrette@supinfo.com', '1234', 'SarahLcf', '...', 14, 'men', 1, '...', 1),
                                                                                                                                                  (23, 'Sarah', 'Lcf', 'sarah.lacoffrette@gmail.com', '1234', 'SarahLcf', '...', 23, 'women', 2, '...', 0),
                                                                                                                                                  (24, 'Valentin', 'Djr', 'valentin2309dujardin@gmail.com', '1234', 'Valou', '...', 23, 'men', 0, '...', 1),
                                                                                                                                                  (31, 'Sarah', 'Naki', 'nakiteas@gmail.com', '1234', 'Nakiteas', '...', 22, 'women', 0, '...', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Video`
--

DROP TABLE IF EXISTS `Video`;
CREATE TABLE `Video` (
                         `id` int(11) NOT NULL,
                         `title` text NOT NULL,
                         `description` text NOT NULL,
                         `id_user` int(11) NOT NULL,
                         `view` int(11) NOT NULL,
                         `likes` int(11) NOT NULL,
                         `source` text NOT NULL,
                         `state` int(11) NOT NULL,
                         `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Video`
--
ALTER TABLE Video MODIFY id INT AUTO_INCREMENT PRIMARY KEY;

INSERT INTO `Video` (`id`, `title`, `description`, `id_user`, `view`, `likes`, `source`, `state`, `image`) VALUES
                                                                                                               (1, 'QUI EST L\'IMPOSTEUR ? (ft Pierre Niney & François Civil)', 'Merci à Fruitz d\'avoir sponsorisé cette vidéo ! Vous pouvez télécharger l\'application ici : https://fruitz.me/SqueezieYTB', 21, 373, 1, 'dWbPdqns5Xk', 2, ''),
                                                                                                               (2, 'Mastu est dans une maison de fou au Japon', 'Je parle de moi à la troisième personne dans le titre de la vidéo parce que mon pseudo référence mieux la vidéo, est-ce que ça fait de moi quelqu\'un de rusé ou un débile ?', 21, 34, 1, '5VPOzUuq-wA', 2, ''),
                                                                                                               (4, 'CACHE-CACHE GÉANT DANS UN CHÂTEAU (Feat JOYCA, Théodort, Hctuan et Linca)', 'Découvrez The Promised Neverland chez Kazé : ', 24, 11, 0, 'EXt6REz2RvY', 2, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brouillon`
--
ALTER TABLE `brouillon`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `LikeTable`
--
ALTER TABLE `LikeTable`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `RequestEmail`
--
ALTER TABLE `RequestEmail`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SubscribeTable`
--
ALTER TABLE `SubscribeTable`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tickets`
--
ALTER TABLE `Tickets`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Video`
--
ALTER TABLE `Video`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brouillon`
--
ALTER TABLE `brouillon`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `LikeTable`
--
ALTER TABLE `LikeTable`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1784;

--
-- AUTO_INCREMENT for table `RequestEmail`
--
ALTER TABLE `RequestEmail`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `SubscribeTable`
--
ALTER TABLE `SubscribeTable`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Tickets`
--
ALTER TABLE `Tickets`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `Video`
--
ALTER TABLE `Video`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;