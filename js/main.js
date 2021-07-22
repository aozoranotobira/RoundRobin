window.onload = () => {
    var teams_number = document.getElementById("teams_number");
    var courts_number = document.getElementById("courts_number");
    var teams_label = document.getElementById("teams_label");
    var roundrobin_radio = document.getElementById("roundrobin_radio");
    var combination_radio = document.getElementById("combination_radio");

    // チーム数[セレクトボックス]／オプション追加（デフォルト：4）
    for (var i = 4; i <= 32; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        if (i == 4) option.selected = true;
        teams_number.appendChild(option);
    }

    // コート数[セレクトボックス]／オプション追加（デフォルト：1）
    for (var i = 1; i <= 16; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        if (i == 1) option.selected = true;
        courts_number.appendChild(option);
    }

    // リーグ戦試合順[ラジオボタン]／押下イベントハンドラ登録
    roundrobin_radio.addEventListener("click", () => {
        teams_label.innerText = "チーム数　";
    }, false);

    // ダブルス組み合わせ[ラジオボタン]／押下イベントハンドラ登録
    combination_radio.addEventListener("click", () => {
        teams_label.innerText = "　　人数　";
    }, false);

    // 計算[ボタン]／押下イベントハンドラ登録
    document.getElementById("calc_button").addEventListener("click", () => {

        // チーム数
        var teams = parseInt(teams_number.value);
        // コート数
        var courts = parseInt(courts_number.value);
        var maxCourts = Math.floor(teams / 2);

        // リーグ戦試合順
        if (roundrobin_radio.checked) {

            // コート数最大：チーム数 / 2 （切り捨て）
            var maxCourts = Math.floor(teams / 2);
            courts = (courts > maxCourts) ? maxCourts : courts;

            calcRoundRobin(teams, courts);
        }

        // ダブルス組み合わせ
        if (combination_radio.checked) {

            // コート数最大：チーム数 / 4 （切り捨て）
            var maxCourts = Math.floor(teams / 4);
            courts = (courts > maxCourts) ? maxCourts : courts;

            calcCombination(teams, courts);
        }

    }, false);
}

// 総当たり組み合わせ
function roundRobin(teams) {
    var half = Math.ceil(teams / 2);
    var even = (teams % 2 == 0) ? true : false;
    var x = [...Array(half).keys()].map(i => i + 1);
    var y = [...Array(half).keys()].map(i => i + half + 1).reverse();

    var roundRobin = [];
    for (var i = 1; i <= 2 * half - 1; i++) {
        var pairs = [];
        for (var j = 0; j < half; j++) {
            if (even || (x[j] != teams + 1 && y[j] != teams + 1)) {
                pairs.push({ member1: x[j], member2: y[j] });
            }
        }
        roundRobin.push(pairs);

        x.splice(1, 0, y[0]); // 2番目に追加
        y.push(x[x.length - 1]); // 末尾に追加
        x.pop(); // 末尾を削除
        y.shift(); // 先頭を削除
    }
    return roundRobin;
}
