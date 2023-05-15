-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 28 Kwi 2023, 14:57
-- Wersja serwera: 10.4.20-MariaDB
-- Wersja PHP: 7.4.21

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
  `NazwaDania` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `Cena` decimal(6,2) NOT NULL,
  `SciezkaDoZdjecia` varchar(200) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawcy`
--

CREATE TABLE `dostawcy` (
  `Id` int(2) NOT NULL,
  `Imie` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `Nazwisko` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `CzyDostepny` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kategoriedan`
--

CREATE TABLE `kategoriedan` (
  `Id` int(2) NOT NULL,
  `NazwaKategorii` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pracownicy`
--

CREATE TABLE `pracownicy` (
  `Id` int(2) NOT NULL,
  `Login` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `Haslo` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skladniki`
--

CREATE TABLE `skladniki` (
  `Id` int(3) NOT NULL,
  `IdDania` int(3) NOT NULL,
  `Skladnik` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `WagaSkladnikaGramy` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `statusyzamowien`
--

CREATE TABLE `statusyzamowien` (
  `Id` int(1) NOT NULL,
  `NazwaStatusu` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `Id` int(8) NOT NULL,
  `Imie` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `Nazwisko` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `Ulica` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `NrDomu` int(4) NOT NULL,
  `NrMieszkania` int(4) DEFAULT NULL,
  `NrTelefonu` int(9) NOT NULL,
  `CzasZlozeniaZamowienia` datetime NOT NULL,
  `CzasDostarczeniaZamowienia` datetime NOT NULL,
  `Cena` decimal(6,2) NOT NULL,
  `StatusZamowienia` int(1) NOT NULL,
  `IdDostawcy` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

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
  MODIFY `Id` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `dostawcy`
--
ALTER TABLE `dostawcy`
  MODIFY `Id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `kategoriedan`
--
ALTER TABLE `kategoriedan`
  MODIFY `Id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `skladniki`
--
ALTER TABLE `skladniki`
  MODIFY `Id` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `statusyzamowien`
--
ALTER TABLE `statusyzamowien`
  MODIFY `Id` int(1) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `zamowieniadania`
--
ALTER TABLE `zamowieniadania`
  MODIFY `Id` int(9) NOT NULL AUTO_INCREMENT;

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
