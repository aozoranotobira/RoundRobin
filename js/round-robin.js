// リーグ戦（総当たり戦）試合順
function calcRoundRobin(teams, courts) {

    // 試合順作成
    var timeTable = makeTimeTable(teams, courts);

    // 表示クリア
    var div = document.getElementById("roundrobin");
    div.innerHTML = "";

    // 試合順表示
    div.appendChild(document.createElement("br"));
    displayTimeTable(courts, timeTable, div);

    // リーグ表表示
    div.appendChild(document.createElement("br"));
    displayLeagueTable(teams, timeTable, div);

    // 試合順作成
    function makeTimeTable(teams, courts) {

        // 総当たり組み合わせ
        var combis = roundRobin(teams);

        var timeTable = [];
        var games = [];
        for (var i = 0; i < combis.length; i++) {
            for (var j = 0; j < combis[i].length; j++) {
                games.push(combis[i][j]);
                if (games.length >= courts) {
                    timeTable.push(games);
                    games = [];
                }
            }
        }
        if (games.length > 0) {
            timeTable.push(games);
        }
        return timeTable;
    }

    // 試合順表示
    function displayTimeTable(courts, timeTable, div) {
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
        table.id = "timetable";

        for (var i = 0; i <= timeTable.length; i++) {
            var tr = document.createElement("tr");

            if (i == 0) {
                for (var j = 0; j <= timeTable[0].length; j++) {
                    var th = document.createElement("th");
                    if (j != 0) {
                        th.textContent = `第${j}コート`;
                    }
                    tr.appendChild(th);
                }
            } else {
                var games = timeTable[i - 1];

                var radio = document.createElement("input");
                radio.type = "radio";
                radio.id = `timetable_${i}_${j}`;
                radio.name = "timetable";
                if (i == 1) radio.checked = "checked";
                radio.style.display = "none";

                var label = document.createElement("label");
                label.htmlFor = radio.id;
                label.innerHTML = `第${i}試合`;

                var th = document.createElement("th");
                th.appendChild(radio);
                th.appendChild(label);
                tr.appendChild(th);

                for (var j = 0; j < games.length; j++) {
                    var td = document.createElement("td");
                    td.textContent = `${games[j].member1} vs ${games[j].member2}`;
                    tr.appendChild(td);
                }

                for (var k = 0; k < courts - games.length; k++) {
                    var td = document.createElement("td");
                    tr.appendChild(td);
                }
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        div.appendChild(table);
    }

    // リーグ表表示
    function displayLeagueTable(teams, timeTable, div) {
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
        table.id = "leaguetable";

        var time = {};
        for (var i = 0; i < timeTable.length; i++) {
            var games = timeTable[i];
            for (var j = 0; j < games.length; j++) {
                time[`${games[j].member1} vs ${games[j].member2}`] = i + 1;
            }
        }

        for (var i = 0; i <= teams; i++) {
            var tr = document.createElement("tr");

            if (i == 0) {
                for (var j = 0; j <= teams; j++) {
                    var th = document.createElement("th");
                    if (j != 0) {
                        th.textContent = j;
                    }
                    tr.appendChild(th);
                }
            } else {
                var th = document.createElement("th");
                th.textContent = i;
                tr.appendChild(th);

                for (var j = 1; j <= teams; j++) {
                    var td = document.createElement("td");
                    if (i == j) {
                        td.id = "gray";
                    } else {
                        td.textContent = time[`${i} vs ${j}`] ?? time[`${j} vs ${i}`];
                    }
                    tr.appendChild(td);
                }
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        div.appendChild(table);
    }
}
