-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 27 Maj 2023, 20:42
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `smakosz`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dania`
--

CREATE TABLE `dania` (
  `Id` int(3) NOT NULL,
  `IdKategorii` int(2) NOT NULL,
  `NazwaDania` varchar(50) NOT NULL,
  `Opis` varchar(1000) NOT NULL,
  `OpisKrotki` varchar(250) NOT NULL,
  `Cena` decimal(6,2) NOT NULL,
  `SciezkaDoZdjecia` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dania`
--

INSERT INTO `dania` (`Id`, `IdKategorii`, `NazwaDania`, `Opis`, `OpisKrotki`, `Cena`, `SciezkaDoZdjecia`) VALUES
(1, 1, 'Paszteciki', 'Proste i pyszne paszteciki, które na pewno zasmakują każdemu.', 'Pyszne paszteciki dla każdego.', '8.99', 'paszteciki.jpg'),
(2, 3, 'Sernik', 'Lekki i puszysty sernik, idealny na prosty deser po obiedzie.', 'Lekki i puszysty sernik.', '9.99', 'sernik.webp'),
(3, 2, 'Kotlet schabowy', 'Polska potrawa narodowa, czyli klasyczny, wyśmienity kotlet schabowy.', 'Nasz narodowy kotlet schabowy.', '17.99', 'schabowy.webp'),
(4, 2, 'Rosół z kury', 'Obok kotleta schabowego drugie narodowe danie Polski, czyli tradycyjny rosół.', 'Tradycyjny polski rosół', '13.99', 'rosol.webp');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawcy`
--

CREATE TABLE `dostawcy` (
  `Id` int(2) NOT NULL,
  `Imie` varchar(20) NOT NULL,
  `Nazwisko` varchar(40) NOT NULL,
  `CzyDostepny` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dostawcy`
--

INSERT INTO `dostawcy` (`Id`, `Imie`, `Nazwisko`, `CzyDostepny`) VALUES
(1, 'Samuel', 'Portowiec-Mostowiak', 1),
(2, 'Dariusz', 'Ostawczak', 0),
(3, 'Adam', 'Abacki', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kategoriedan`
--

CREATE TABLE `kategoriedan` (
  `Id` int(2) NOT NULL,
  `NazwaKategorii` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `kategoriedan`
--

INSERT INTO `kategoriedan` (`Id`, `NazwaKategorii`) VALUES
(1, 'Przystawki'),
(2, 'Dania główne'),
(3, 'Desery');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pracownicy`
--

CREATE TABLE `pracownicy` (
  `Id` int(2) NOT NULL,
  `Login` varchar(30) NOT NULL,
  `Haslo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `pracownicy`
--

INSERT INTO `pracownicy` (`Id`, `Login`, `Haslo`) VALUES
(1, 'admin', '*4ACFE3202A5FF5CF467898FC58AAB1D615029441');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skladniki`
--

CREATE TABLE `skladniki` (
  `Id` int(3) NOT NULL,
  `IdDania` int(3) NOT NULL,
  `Skladnik` varchar(30) NOT NULL,
  `WagaSkladnikaGramy` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `skladniki`
--

INSERT INTO `skladniki` (`Id`, `IdDania`, `Skladnik`, `WagaSkladnikaGramy`) VALUES
(1, 1, 'Przykładowy składnik', 100),
(2, 3, 'Przykładowy składnik 2', 200),
(3, 3, 'Przykładowy składnik 3', 150),
(4, 2, 'Przykładowy składnik 4', 466),
(5, 4, 'Przykładowy składnik 5', 674),
(6, 4, 'Przykładowy składnik 6', 453);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `statusyzamowien`
--

CREATE TABLE `statusyzamowien` (
  `Id` int(1) NOT NULL,
  `NazwaStatusu` varchar(30) NOT NULL,
  `Zrealizowane` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `statusyzamowien`
--

INSERT INTO `statusyzamowien` (`Id`, `NazwaStatusu`, `Zrealizowane`) VALUES
(1, 'W trakcie przygotowywania', b'0'),
(2, 'Przygotowywanie do dostawy', b'0'),
(3, 'W trakcie dostawy', b'0'),
(4, 'Dostarczono', b'1'),
(5, 'Anulowano', b'1');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `Id` int(8) NOT NULL,
  `Imie` varchar(20) NOT NULL,
  `Nazwisko` varchar(40) NOT NULL,
  `Ulica` varchar(50) NOT NULL,
  `NrDomu` int(4) NOT NULL,
  `NrMieszkania` int(4) DEFAULT NULL,
  `Miasto` varchar(40) NOT NULL,
  `NrTelefonu` varchar(9) NOT NULL,
  `CzasZlozeniaZamowienia` datetime NOT NULL,
  `CzasDostarczeniaZamowienia` datetime NOT NULL,
  `Cena` decimal(6,2) NOT NULL,
  `StatusZamowienia` int(1) NOT NULL,
  `IdDostawcy` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `zamowienia`
--

INSERT INTO `zamowienia` (`Id`, `Imie`, `Nazwisko`, `Ulica`, `NrDomu`, `NrMieszkania`, `Miasto`, `NrTelefonu`, `CzasZlozeniaZamowienia`, `CzasDostarczeniaZamowienia`, `Cena`, `StatusZamowienia`, `IdDostawcy`) VALUES
(2, 'test', 'test', 'test', 1, 1, 'test', '1', '2023-05-27 15:50:03', '2023-05-27 15:50:03', '17.99', 3, 3),
(3, 'test', 'test', 'test', 1, 1, 'test', '1', '2023-05-27 15:50:03', '2023-05-27 15:50:03', '17.99', 4, 1),
(8, 'Kacper', 'Bartosiak', 'Testowa', 1, 0, 'Warszawa', '123456789', '2023-05-27 00:00:00', '2023-05-27 23:00:00', '85.94', 4, 2),
(9, 'Bartosz', 'Babacki', 'Bracka', 8, 8, 'Białystok', '987654321', '2023-05-27 00:00:00', '2023-05-29 10:40:00', '41.96', 2, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowieniadania`
--

CREATE TABLE `zamowieniadania` (
  `Id` int(9) NOT NULL,
  `IdZamowienia` int(8) NOT NULL,
  `IdDania` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `zamowieniadania`
--

INSERT INTO `zamowieniadania` (`Id`, `IdZamowienia`, `IdDania`) VALUES
(2, 3, 1),
(3, 3, 1),
(4, 3, 1),
(5, 3, 1),
(6, 3, 1),
(7, 3, 2),
(8, 3, 2),
(9, 3, 2),
(10, 3, 2),
(11, 3, 2),
(12, 3, 2),
(13, 3, 4),
(14, 3, 4),
(15, 2, 3),
(16, 8, 1),
(17, 8, 1),
(18, 8, 3),
(19, 8, 3),
(20, 8, 3),
(21, 8, 4),
(22, 9, 1),
(23, 9, 1),
(24, 9, 2),
(25, 9, 4);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dania`
--
ALTER TABLE `dania`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Kategoria` (`IdKategorii`);

--
-- Indeksy dla tabeli `dostawcy`
--
ALTER TABLE `dostawcy`
  ADD PRIMARY KEY (`Id`);

--
-- Indeksy dla tabeli `kategoriedan`
--
ALTER TABLE `kategoriedan`
  ADD PRIMARY KEY (`Id`);

--
-- Indeksy dla tabeli `pracownicy`
--
ALTER TABLE `pracownicy`
  ADD PRIMARY KEY (`Id`);

--
-- Indeksy dla tabeli `skladniki`
--
ALTER TABLE `skladniki`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Danie` (`IdDania`);

--
-- Indeksy dla tabeli `statusyzamowien`
--
ALTER TABLE `statusyzamowien`
  ADD PRIMARY KEY (`Id`);

--
-- Indeksy dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `status` (`StatusZamowienia`),
  ADD KEY `iddost` (`IdDostawcy`);

--
-- Indeksy dla tabeli `zamowieniadania`
--
ALTER TABLE `zamowieniadania`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `idzam` (`IdZamowienia`),
  ADD KEY `iddan` (`IdDania`) USING BTREE;

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `dania`
--
ALTER TABLE `dania`
  MODIFY `Id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `dostawcy`
--
ALTER TABLE `dostawcy`
  MODIFY `Id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `kategoriedan`
--
ALTER TABLE `kategoriedan`
  MODIFY `Id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `pracownicy`
--
ALTER TABLE `pracownicy`
  MODIFY `Id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `skladniki`
--
ALTER TABLE `skladniki`
  MODIFY `Id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `statusyzamowien`
--
ALTER TABLE `statusyzamowien`
  MODIFY `Id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `zamowieniadania`
--
ALTER TABLE `zamowieniadania`
  MODIFY `Id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `dania`
--
ALTER TABLE `dania`
  ADD CONSTRAINT `dania_ibfk_1` FOREIGN KEY (`IdKategorii`) REFERENCES `kategoriedan` (`Id`);

--
-- Ograniczenia dla tabeli `skladniki`
--
ALTER TABLE `skladniki`
  ADD CONSTRAINT `skladniki_ibfk_1` FOREIGN KEY (`IdDania`) REFERENCES `dania` (`Id`);

--
-- Ograniczenia dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD CONSTRAINT `zamowienia_ibfk_1` FOREIGN KEY (`StatusZamowienia`) REFERENCES `statusyzamowien` (`Id`),
  ADD CONSTRAINT `zamowienia_ibfk_2` FOREIGN KEY (`IdDostawcy`) REFERENCES `dostawcy` (`Id`);

--
-- Ograniczenia dla tabeli `zamowieniadania`
--
ALTER TABLE `zamowieniadania`
  ADD CONSTRAINT `zamowieniadania_ibfk_1` FOREIGN KEY (`IdZamowienia`) REFERENCES `zamowienia` (`Id`),
  ADD CONSTRAINT `zamowieniadania_ibfk_2` FOREIGN KEY (`IdDania`) REFERENCES `dania` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
