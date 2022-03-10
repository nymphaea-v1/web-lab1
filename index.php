<?php

    $x = isset($_POST['x']) ? $_POST['x'] : '';
    $y = isset($_POST['y']) ? $_POST['y'] : '';
    $r = isset($_POST['r']) ? $_POST['r'] : '';

    if (!is_numeric($x) || !is_numeric($y) || !is_numeric($r)) {
        echoAnswer($x, $y, $r, "-1");
        exit;
    }

    if (!validate($x, $y, $r)) {
        echoAnswer($x, $y, $r, "-1");
        exit;
    }

    if (!checkHit($x, $y, $r)) {
        echoAnswer($x, $y, $r, "0");
        exit;
    }

    echoAnswer($x, $y, $r, "1");

    function validate($x, $y, $r) {
        return inRange($x, -2, 2) && inRange($y, -5, 5) && inRange($r, 1, 5);
    }

    function checkHit($x, $y, $r) {
        if (inRange($x, 0, $r) && inRange($y, -$r, 0)) return true;

        if ($y <= 0 && $x <= 0 && $y >= -0.5 * $x - 0.5 * $r) return true;

        if ($y >= 0 && $x >= 0 && $y <= sqrt($r ** 2 - $x ** 2)) return true;

        return false;
    }

    function echoAnswer($x, $y, $r, $result) {
        $format = '{"result":%s, "x":"%s", "y":"%s", "r":%d, "time":%d, "execution":%s}';
        $time = time();
        $execution = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
        $execution_millis = number_format($execution * 1000000, 0);

        echo sprintf($format, $result, $x, $y, $r, $time, $execution_millis);
    }

    function inRange($a, $l, $r) {
        return ($a >= $l && $a <= $r);
    }
