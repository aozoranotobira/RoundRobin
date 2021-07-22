// ダブルス組み合わせ
function calcCombination(teams, courts) {

    // 試合順作成
    var timeTable = makeTimeTable(teams, courts);

    // 表示クリア
    var div = document.getElementById("roundrobin");
    div.innerHTML = "";
    div.appendChild(document.createElement("br"));

    // 試合順表示
    displayTimeTable(courts, timeTable, div);

    // 試合順作成
    function makeTimeTable(teams, courts) {

        // 総当たり組み合わせ
        var combis = roundRobin(teams);

        var timeTable = [];
        var games = [];
        var remain = null;
        for (var i = 0; i < combis.length; i++) {
            var pairs = combis[i].concat();

            // 余りペアを先に組み合わせ
            if (remain != null) {
                games.push({ team1: remain, team2: pairs[0], level: 0 });
                pairs.shift();
                remain = null;
                if (games.length == courts) {
                    timeTable.push(games);
                    games = [];
                }
            }

            for (var j = 0; j < Math.floor(pairs.length / 2); j++) {
                const pair1 = pairs[j * 2 + 0];
                const pair2 = pairs[j * 2 + 1];
                games.push({ team1: pair1, team2: pair2, level: 0 })
                if (games.length == courts) {
                    timeTable.push(games);
                    games = [];
                }
            }

            if (pairs.length % 2 == 1) {
                remain = pairs[pairs.length - 1];
            }
        }

        // 全組み合わせを実現する為、ペアが重複する試合で組み合わせ
        if (remain != null) {
            games.push({ team1: remain, team2: combis[0][0], level: 1 });
        }

        if (games.length > 0) {
            timeTable.push(games);
            games = [];
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
                for (var j = 0; j <= courts + 1; j++) {
                    var th = document.createElement("th");
                    if (j >= 1 && j <= courts) {
                        th.textContent = `第${j}コート`;
                    } else if (j == courts + 1) {
                        th.textContent = `休憩`;
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

                var playing = [];
                for (var j = 0; j < games.length; j++) {
                    var pair1 = games[j].team1;
                    var pair2 = games[j].team2;
                    var td = document.createElement("td");
                    td.textContent = `${pair1.member1} ${pair1.member2} vs ${pair2.member1} ${pair2.member2}`;
                    tr.appendChild(td);

                    playing.push(pair1.member1);
                    playing.push(pair1.member2);
                    playing.push(pair2.member1);
                    playing.push(pair2.member2);
                }

                for (var k = 0; k < courts - games.length; k++) {
                    var td = document.createElement("td");
                    tr.appendChild(td);
                }

                var breaks = "";
                if (playing.length < teams) {
                    for (var k = 1; k <= teams; k++) {
                        if (playing.findIndex(t => t == k) == -1) {
                            breaks += (breaks.length == 0 ? "" : " , ") + k;
                        }
                    }
                }
                var td = document.createElement("td");
                td.textContent = breaks;
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        div.appendChild(table);
    }
}
