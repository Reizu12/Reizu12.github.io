$(document).ready(function() {

    let level = 2;
    let count = 0;
    let score = 0;
    let timerInterval;
    let timeLeft = 60;

    const urlParams = new URLSearchParams(window.location.search);
    const scoreParam = urlParams.get('score');
    if (scoreParam) {
        score = parseInt(scoreParam);
        $("#score").text("Score: " + score);
    }

    $(".controls-container").hide();
    $(".menu-container").hide();
    $(".choice")
        .draggable({
        containment:".container",
        zIndex: 100,
        revert: "invalid",
        
    });

    if (!timerInterval) {
        timerInterval = setInterval(function() {
            timeLeft--;
            $("#timer").text("Time Left: " + timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                window.location.href = "../level3/questions3.php";
            }
        }, 1000);
    }

    $("#emptyBox1").droppable({
        tolerance: "intersect",
        drop: function(event, ui){
            if ($(this).children().length === 1) {
                $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
                $(ui.draggable).data("dropped", true);
                
                if(ui.draggable.attr("id") === "choice5Q2"){
                    $(event.target).addClass("dropped");
                    if (!$(ui.draggable).hasClass("dropped")) {
                    count+=1;
                    score += 10;
                    $("#score").text("Score: " + score);
                    }
                }
    
                if (count === 3){
                    $("#result").text("You Won!");
                    $(".controls-container").show();
                }
            } else {
                $(ui.draggable).css({top: 0, left: 0});
            }
        },
        out: function(event, ui){
            var $this = $(this);
            if ($(ui.draggable).data("dropped") && $(ui.draggable).attr("id") === "choice5Q2") {
                $(ui.draggable).detach().appendTo($("#choicesContainer")).data("dropped", false);
                count--;
                score -= 10;
            }else{
                $(ui.draggable).detach().appendTo($("#choicesContainer")).data("dropped", false);
            }
        }
    });

    $("#emptyBox2").droppable({
        tolerance: "intersect",
        drop: function(event, ui){
            if ($(this).children().length === 1) {
                $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
                $(ui.draggable).data("dropped", true);
    
                if(ui.draggable.attr("id") === "choice6Q2"){
                    $(event.target).addClass("dropped");
                    if (!$(ui.draggable).hasClass("dropped")) {
                    count+=1;
                    score += 10;
                    $("#score").text("Score: " + score);
                    }
                }
    
                if (count === 3){
                    $("#result").text("You Won!");
                    $(".controls-container").show();
                }
            } else {
                $(ui.draggable).css({top: 0, left: 0});
            }
        },
        out: function(event, ui){
            var $this = $(this);

            if ($(ui.draggable).data("dropped") && $(ui.draggable).attr("id") === "choice6Q2") {
                $(ui.draggable).detach().appendTo($("#choicesContainer")).data("dropped", false);
                count--;
                score -= 10;
            }else{
                $(ui.draggable).detach().appendTo($("#choicesContainer")).data("dropped", false);
            }
        }
    });

    $("#emptyBox3").droppable({
        tolerance: "intersect",
        drop: function(event, ui){
            if ($(this).children().length === 1) {
                $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
                $(ui.draggable).data("dropped", true);
    
                if(ui.draggable.attr("id") === "choice2Q2"){
                    $(event.target).addClass("dropped");
                    if (!$(ui.draggable).hasClass("dropped")) {
                    count+=1;
                    score += 10;
                    $("#score").text("Score: " + score);
                    }
                }
    
                if (count === 3){
                    $("#result").text("You Won!");
                    $(".controls-container").show();
                }
            } else {
                $(ui.draggable).css({top: 0, left: 0});
            }
            
        },
        out: function(event, ui){
            var $this = $(this);
            $this.removeClass("dropped").css("background-color", "");

            if ($(ui.draggable).data("dropped") && $(ui.draggable).attr("id") === "choice2Q2") {
                $(ui.draggable).detach().appendTo($("#choicesContainer")).data("dropped", false);
                count--;
                score -= 10;
            }else{
                $(ui.draggable).detach().appendTo($("#choicesContainer")).data("dropped", false);
            }
        }
    });

    $("#next-button").click(function() {
        clearInterval(timerInterval);
        window.location.href = "../level3/questions3.php?score=" + score + "&timeLeft=" + timeLeft;
        saveScore();
        saveLevel();
    });

    function saveScore() {
        $.ajax({
            url: '../getUsername.php',
            method: 'GET',
            success: function(response) {
                let username = response;
                
                $.ajax({
                    url: '../saveScore2.php',
                    method: 'POST',
                    data: { username: username, score2: score },
                    success: function(response) {
                        console.log('Score saved successfully');
                    },
                    error: function(xhr, status, error) {
                        console.error('Error saving score:', error);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error retrieving username:', error);
            }
        });
    }
    
    function saveLevel(){
        $.ajax({
            url: '../getUsername.php',
            method: 'GET',
            success: function(response) {
                let username = response;
                $.ajax({
                    url: '../saveLevel.php',
                    method: 'POST',
                    data: { username: username, level: level },
                    success: function(response) {
                        console.log('Level saved successfully');
                    },
                    error: function(xhr, status, error) {
                        console.error('Error saving level:', error);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error retrieving username:', error);
            }
        });
    }

    $("#pause").click(function() {
        clearInterval(timerInterval);
        $(".menu-container").show();
    });

    $("#resume").click(function() {
        $(".menu-container").hide();
        timerInterval = setInterval(function() {
            timeLeft--;
            $("#timer").text("Time Left: " + timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                window.location.href = "../level2/questions2.php";
            }
        }, 1000);
    });

    $("#restart").click(function() {
        window.location.href = "";
    });

    $("#home").click(function() {
        window.location.href = "../../home.php";
        saveLevel();
    });

});