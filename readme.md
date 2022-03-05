# Zadanie Rekrutacyjne React - 2.2

## Wprowadzenie

Tematem zadania będzie wykonanie niestandardowego komponentu formularza.
Zaprojektuj komponent AutosuggestionSelect - rozwijana lista z wyszukiwarką opcji (select
na sterydach) bazująca na dynamicznych danych pobieranych z api.

## Wymagania

1. Po kliknięciu w komponent pojawia się wyszukiwarka oraz lista z dostępnymi
opcjami. W przypadku braku wpisanego tekstu wyświetlamy TYLKO poprzednio
zaznaczone opcje, lub w przypadku braku zaznaczonych opcji - pustą listę.
2. Lista z dostępnymi opcjami powinna 'utrzymywać się widoczna'. Zamknięcie listy
powinno nastąpić dopiero po kliknięciu poza komponent, po wciśnięciu klawisza
Escape lub w przypadku “toggle”
3. Po wpisaniu tekstu w wyszukiwarkę pojawiają się dostępne opcje do wyboru.
Zmieniając stan wyszukiwarki wysyłamy żądania do api wraz z wpisanym
tekstem i na bierząco aktualizujemy listę dostępnych opcji.
4. Wyszukiwarka powinna działać 'real-time' - dopuszczalne opóźnienie reakcji to
400ms
5. Klikając w dostępną opcję:
    - wiersz powinien się wyszczególnić (pogrubienie i wyświetlenie ikonki 'check')
    - wywołujemy callback przekazany jako props z wartością zaznaczonych selectów (np jakiś update do store - na potrzeby zadania może to być console.log).

1. Zapisana opcja powinna wyświetlać się użytkownikowi jako wyszczególniona (np.
przy ponownym wyszukiwaniu tej samej frazy, zamknięciu i ponownym otwarciu
komponentu).
2. Obok nazwy selecta znajduje się licznik, który zlicza wszystkie zaznaczone opcje
3. Pod listą z dostępnymi opcjami znajduje się przycisk Reset.
4. Przycisk Reset resetuje zaznaczone i zapisane opcje.

## Uwagi
1. Zadanie powinno być wykonane bez użycia jakichkolwiek bibliotek do zarządzania elementami formularza.
2. Zadanie jest oceniane również pod kątem estetycznym

## Moje uwagi

- strona [nie bedzie dzialac na firefox](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed), poniewaz ta przegladarka blokuje cors z localhost z jakiegos powodu
- strona nie bedzie dzialac w produkcji, w takim stanie jaki jest poniewaz API z ktorego korzystam ma inny protokol niz strona - http vs https, wiec jest blokowany request przez przegladarke