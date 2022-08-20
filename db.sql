USE `food_guru`;

CREATE TABLE `restaurant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurantName` varchar(255) NOT NULL,
  `category` varchar(45) NOT NULL,
  `address` text NOT NULL,
  `description` text,
  `img` varchar(255),
  PRIMARY KEY (`id`)
);

INSERT INTO `restaurant` (`id`, `restaurantName`, `category`, `address`, `description`, `img`) VALUES
(1, 'Blu Kouzina', 'Greek', 'Dempsey, East Coast', "Authentic Greek food is a rare find even in a food paradise like Singapore, but aren't we glad for Blu Kouzina! Their Greek plates are so authentic, it'll feel almost as if you're in Greece.", 'blu.jpg'),
(2, 'iO Italian Osteria', 'Italian', 'Bukit Timah', "A true hidden gem in the sleepy neighbourhood of Hillview. Here you can immerse in an authentic Italian experience as you watch the Italian chefs in action through the open kitchen concept.", 'osteria.jpg'),
(3, 'Candlenut', 'Peranakan', 'Dempsey, East Coast', "The first Peranakan restaurant in the world to be awarded a Michelin star! Be prepared to fall head over heels for standouts such as the Blue Swimmer Crab Curry.", 'candlenut.jpg'),
(4, 'PS.Cafe', 'Western', 'Dempsey, West Coast', "PS. Cafe nails it every time. No matter the location, their outlets constantly impress with their food, service and ambience.", 'pscafe.jpg'),
(5, 'KOMA', 'Japanese', 'Marina Bay', "The moment I walked into KOMA I was completely WOWed. The overall aesthetics of the restaurant was not just limited to its interior — from its food and cocktails to even the tableware, everything was 100% Instagram-worthy.", 'koma.jpg'),
(6, "Marcy's", 'Italian', 'Tanjong Pagar', "Charming place, hearty food, good music, lovely folks! Marcy’s is truly one of a kind, the moment you enter you feel like you’re whisked away to somewhere else. All the food and cocktails were outstanding.", 'marcys.jpg'),
(7, "Fat Cow", 'Japanese', 'Orchard', "There are few things in life that can make me as happy as when I'm indulging in Fat Cow's highly raved Donburi. Its tender & juicy premium Wagyu topped with truffle oil and a perfect onsen egg is just absolute bliss.", 'fatcow.jpg'),
(8, "The Boiler", 'Seafood', 'City Hall, Paya Lebar', "If you are a seafood lover, The Boiler's Bomb Diggity bag is to die for. Dungeness crab, prawns, mussels, clams... you name it, you have it!", 'theboiler.jpg'),
(9, "FOOL", 'Western', 'Telok Ayer', "Chic wine bar with a good list of selections. Service is done with a fresh touch. The sommelier sits beside you and has a conversation with you about the wine for a very personalized and intimate experience.", 'fool.jpg'),
(10, "The Marmalade Pantry", 'Western', 'Raffles Place, Orchard, Novena', "Situated in town, The Marmalade Pantry is the perfect place to go for a quick executive lunch or a romantic dinner date. But most importantly, it is the perfect spot for a high-tea session due to its wide selection of artisal teas and desserts!", 'marmalade.jpg');


CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(45) NOT NULL,
  `gender` char(1) NOT NULL,
  `address` text,
  `mobile` varchar(45),
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `account` (`id`, `username`, `email`, `password`, `gender`, `address`, `mobile`, `first_name`, `last_name`) VALUES
(1, 'linghui', 'linghui@mail.com', '123456', 'F', '32 Jurong East St 32 #10-21', '97474747', 'Ling', 'Hui'),
(2, 'james', 'james@gmail.com', '123456', 'M', '1 Tampines West #03-11', '93838373', 'James', 'Tan'),
(3, 'minnie', 'minnie@mail.com', '123456', 'F', 'Telok Blangah Rise 14 #05-13', '96637882', 'Minnie', 'Madison'),
(4, 'Kelvin67', 'kelvin@mail.com', '123456', 'M', 'Yishun Ring Road #07-21', '83776746', 'Kelvin', 'Lee'),
(5, 'ursula98', 'ursula@gmail.com', '123456', 'F', 'Buona Vista Condo 55 #04-11', '84747829', 'Ursula', 'Chan');

CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `review_RestaurantId` int NOT NULL,
  `comments` text,
  `review_UserId` int NOT NULL,
  `restaurantRating` int DEFAULT NULL,
  `priceRating` int DEFAULT NULL,
  `serviceRating` int DEFAULT NULL,
  `datePosted` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`review_RestaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`review_UserId`) REFERENCES `account` (`id`)
);

INSERT INTO `review` (`id`, `review_RestaurantId`, `comments`, `review_UserId`, `restaurantRating`, `priceRating`, `serviceRating`, `datePosted`) VALUES
(1, 1, 'Great food!', 1, 5, 5, 4, '2022-01-03 00:00:00'),
(2, 1, 'Food was ok but service was rude', 2, 4, 5, 2, '2022-05-03 00:00:00'),
(3, 2, 'Love the food, great taste!', 2, 5, 5, 5, '2021-11-03 00:00:00'),
(4, 3, 'Not bad ambience and food', 3, 4, 3, 4, '2022-05-23 00:00:00');
