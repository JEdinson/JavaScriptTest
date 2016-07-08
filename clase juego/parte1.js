$(document).ready(function () {
    var _box = $('#box').addClass("box");
    _box.find(">table").css("width","100%")
    _box.find(">table td").addClass("info");
    var _score = _box.find(">table td:nth-child(1)")
        .css("text-align", "left");
    var _lives = _box.find(">table td:nth-child(2)")
        .css("text-align", "right");

    var _paddle = _box.find(">div:nth-of-type(1)")
        .addClass("paddle");
    var _ball = _box.find(">div:nth-of-type(2)")
        .addClass("ball");
    var _message = _box.find(">div:nth-of-type(3)")
        .addClass("message")
        .text("Nivel 1");

    var bricks = new Array(20);
    for (var j = 0; j < bricks.length; j++) {
        var temp = $("<div>")
            .attr("id", ("b" + j))
            .addClass("brick")
            .appendTo(_box);
    }
    var score = 0;
    var lives = 3;
    var level = 1;
    var speed = 1;
    var broken = 0;
    var posX = 0;
    var bx = 190;
    var by = 150;
    var bxv = 0;
    var byv = 5;
    var pause = 1;
    var gameover = 0;

    funciones = {
        reloadbricks: function () {
            var x = 0;
            var y = 0;
            for (var j = 0; j < bricks.length; j++) {
                var a = new Array(3);
                a[0] = 30 + (x * 68); // X
                a[1] = 30 + (y * 28); // Y
                a[2] = "rgb(" + (Math.round(Math.random() * 255) + 0) + "," + (Math.round(Math.random() * 255) + 0) + "," + (Math.round(Math.random() * 255) + 0) + ")"; // C
                x++;
                if (x > 4) { x = 0; y++; }
                bricks[j] = a;
            }
            for (var j = 0; j < bricks.length; j++) {
                brickid = "b" + (j);
                $("#" + brickid).css({ "left": bricks[j][0], "top": bricks[j][1], "background-color": bricks[j][2] });
            }
        },
        movemouse: function (evt) {
            posX = evt.layerX;
            if (posX < 0) { posX = 0 }
            if (posX > 336) { posX = 336 }
            _paddle.css("left", (posX + "px"));


        },
        mouseclick: function () {
            if (gameover != 1) {
                pause = 1 - pause;
                _message.text("PAUSED");
                if (pause) {
                    _message.show();
                }
                else {
                    _message.hide();
                }
            }
            else {
                score = 0;
                lives = 3;
                level = 1;
                speed = 1;
                broken = 0;
                posX = 0;
                bx = 190;
                by = 150;
                bxv = 0;
                byv = 5;
                pause = 1;
                gameover = 0;
                _message.innerHTML = "Level: " + level;
                funciones.updateinfo();
                funciones.reloadbricks();
            }
        },
        draw: function () {
            if (pause != 1) {
                bx = bx + (bxv * speed);
                by = by + (byv * speed);
                if ((bx < 0) & (bxv < 0)) { bxv = -bxv }
                if ((bx > 378) & (bxv > 0)) { bxv = -bxv }
                if ((by > 247) & (by < 270)) {
                    if ((bx > posX - 22) & (bx < posX + 60) & (byv > 0)) {
                        byv = -byv;
                        bxv = ((bx - posX) - 22) / 5;
                    }
                }
                if (by > 300) {
                    if (lives == 0) {
                        _message.text("Game Over");
                        _message.show();
                        gameover = 1;
                    }
                    else {
                        lives = lives - 1;
                        by = 150;
                        bx = 190;
                        bxv = 0;
                        pause = 1;
                        _message.text("Level: " + level);
                        _message.show();
                    }
                }
                if (by < 0) { byv = -byv }
                for (var j = 0; j < bricks.length; j++) {
                    brickid = "#b" + j;
                    if ((bx > bricks[j][0] - 21) & (bx < bricks[j][0] + 65) & (by > bricks[j][1] - 22) & (by < bricks[j][1] + 25)) {
                        if ((byv < 0) & (by > bricks[j][1])) { byv = -byv; }
                        else {
                            if ((bxv > 0) & (bx < bricks[j][0])) { bxv = -bxv; }
                            else {
                                if ((bxv < 0) & (bx > bricks[j][0])) { bxv = -bxv; }
                                else {
                                    if ((byv > 0) & (by < bricks[j][1])) { byv = -byv; }
                                }
                            }
                        }
                        score = score + 1;
                        $(brickid).css("left", 10000);
                        bricks[j][0] = -1000;
                        bricks[j][1] = -1000;
                        bricks[j][2] = 0;
                        broken = broken + 1;
                        if (broken == 20) {
                            level = level + 1;
                            if (level < 20) { speed = 1 + (level / 10) }
                            else { speed = 1 + (19 / 10) }
                            broken = 0;
                            bxv = 0;
                            byv = 5;
                            by = 150;
                            bx = 190;
                            pause = 1;
                            _message.text("Level: " + level);
                            _message.show();
                            funciones.reloadbricks();
                        }
                    }
                }
                _ball.css("left",bx + "px");
                _ball.css("top", by + "px");
                funciones.updateinfo();
            }

        },
        updateinfo: function () {
            _score.text("Score: " + score);
            var Nolives = "";
            for (i = 0; i < lives; i++) { Nolives = Nolives + " O" }
            Nolives = "Lives:" + Nolives
            _lives.text(Nolives);
        }

    }


    funciones.reloadbricks();
    _box.attr({ "onmousemove": "funciones.movemouse(event)", "onclick": "funciones.mouseclick()" });
    funciones.updateinfo();
    setInterval('funciones.draw()', 1000 / 30)
});

