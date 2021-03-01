# Утечки памяти

Для выявления утечек памяти, мы использовали инструменты dev tools браузера google chrome.
Основными двумя из них оказались графики "Allocation instrumentation on timeline" и 
"Performance record". На обоих графиках хорошо видно выделение и освобождение памяти с
течением времени. Процесс, соответствующий созданию графика, описан под каждым из них.

В общем, утечек мы не нашли. Подробнее - ниже.

![Memory timeline](/doc/memory-timeline.png?raw=true "memory timeline")

Из первого скриншота уже можно заключить, что вся память, выделенная под нужды приложения, со временем
освобождается. Пики на 20-й, 30-й и 40-й секунде - это моменты приостановки игры с форсированием
сборки мусора. Как видно, сборка мусора отрабатывала корректно и удаляла практически все данные
(помечено серым цветом).
Из того, что использовалось до 20-й секунды удалено не всё, т.к. в то время были переходы по
страницам приложения (которые, очевидно, отчасти остались в памяти реакта, стор редакса - туда же,
и отладочная информация как от вебпака, так и от реакта; на скриншоте не показано, но
приблизительно 50% памяти (strings, которые, таки, видны на скриншоте) содержит именно её
(отладочную информацию)).

![Browse and game](/doc/browse+game.png?raw=true "browse and game")

То же самое видно и по второму скриншоту. График с синей линией посередине - использование памяти.
Можно заметить, что сначала, в первой половине теста - память активно использовалась
(в то время происходили последовательные переходы по страницам).
Вторая половина теста началась переходом на страницу с игрой, в связи с чем на графике виден
небольшой "горб" в использовании памяти, сразу после освобождения большей её части. Затем
началась игра, память стала активно использоваться и под конец, опять же - была освобождена.

Таким образом, мест, в которых память бы утекала (выделялась бы, но в последующем совсем не
освобождалась), в целом, не выявили.