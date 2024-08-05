const boxes = document.querySelectorAll(".box.flex");
const startBtn = document.getElementById("start_btn");
const resetBtn = document.getElementById("reset_btn");
const closeFormBtn = document.getElementById("close_form_btn");
const continueBtn = document.getElementById("continue_btn");

const ClickSound = document.getElementById("click-sound");

const input_P1_Name = document.getElementById("input_P1_Name");
const input_P2_Name = document.getElementById("input_P2_Name");
const player_1_Char = document.getElementById("char");
const roundCount = document.getElementById("round_count");

const from_layout = document.getElementById("from_layout");
const from = document.getElementById("from");

const ElP1_Name = document.getElementById("p1_name");
const ElP2_Name = document.getElementById("p2_name");
const ElP1_Char = document.getElementById("p1_char");
const ElP2_Char = document.getElementById("p2_char");
const ElP1_Points = document.getElementById("p1_points");
const ElP2_Points = document.getElementById("p2_points");
const ElRounds_Conut = document.getElementById("all_rounds_conut");
const ElRound_Number = document.getElementById("round_number");
/*--------------------------*/
/*--------------------------*/
class Player {
    constructor(name, char) {
        this.name = name;
        this.char = char;
    }
}
/*--------------------------*/
/*--------------------------*/
class Round {
    constructor(p1) {
        this.winner = null;
        this.currentPlayer = p1;
    }

    ClearRound() {
        this.winner = null;
        this.currentPlayer = p1;
    }
    RoundWinner() {
        if (
            (boxes[0].textContent == boxes[4].textContent &&
                boxes[4].textContent == boxes[8].textContent &&
                boxes[8].textContent.trim() != "") ||
            (boxes[2].textContent == boxes[4].textContent &&
                boxes[4].textContent == boxes[6].textContent &&
                boxes[4].textContent.trim() != "") ||
            (boxes[0].textContent == boxes[1].textContent &&
                boxes[1].textContent == boxes[2].textContent &&
                boxes[2].textContent.trim() != "") ||
            (boxes[3].textContent == boxes[4].textContent &&
                boxes[4].textContent == boxes[5].textContent &&
                boxes[5].textContent.trim() != "") ||
            (boxes[6].textContent == boxes[7].textContent &&
                boxes[7].textContent == boxes[8].textContent &&
                boxes[8].textContent.trim() != "") ||
            (boxes[0].textContent == boxes[3].textContent &&
                boxes[3].textContent == boxes[6].textContent &&
                boxes[6].textContent.trim() != "") ||
            (boxes[1].textContent == boxes[4].textContent &&
                boxes[4].textContent == boxes[7].textContent &&
                boxes[7].textContent.trim() != "") ||
            (boxes[2].textContent == boxes[5].textContent &&
                boxes[5].textContent == boxes[8].textContent &&
                boxes[8].textContent.trim() != "")
        ) {
            return {
                isDraw: false,
                Roundwinner: round.currentPlayer,
            };
        } else if (UI.IsBoxsFilld()) {
            // boxes is filled and no winer
            return {
                isDraw: true,
                Roundwinner: null,
            };
        } else {
            return {
                isDraw: false,
                Roundwinner: null,
            };
        }
    }
}
/*--------------------------*/
/*--------------------------*/

class Game {
    constructor(player1, palyer2) {
        this.player_1 = player1;
        this.player_2 = palyer2;
        this.player_1_Points = 0;
        this.player_2_Points = 0;
        this.countOfRound = 0;
        this.currentRound = 0;
        this.winner = null;
    }

    IsGameEnd() {
        console.log("IsGameEnd => " + this.countOfRound);
        console.log(" IsGameEnd => " + this.currentRound);
        console.log(" IsGameEnd => " + this.countOfRound == this.currentRound);
        return this.countOfRound == this.currentRound;
    }

    GameWinner() {
        // return null or p1 p2
        if (!this.IsGameEnd) {
            console.log("this is the end of game from GameWinner");
            return null;
        }

        if (this.player_1_Points == this.player_2_Points) {
            console.log("GameWinner no win");
            return {
                isDraw: true,
                Roundwinner: null,
            };
        } else if (this.player_1_Points > this.player_2_Points) {
            console.log("GameWinner p1 win");
            return {
                isDraw: false,
                Roundwinner: this.player_1,
            };
        } else {
            console.log("GameWinner p2 win");
            return {
                isDraw: false,
                Roundwinner: this.player_2,
            };
        }
    }

    ClearGame() {
        this.player_1 = null;
        this.player_2 = null;
        this.player_1_Points = 0;
        this.player_2_Points = 0;
        this.countOfRound = 0;
        this.currentRound = 0;
        this.winner = null;
    }
}

/*--------------------------*/
/*--------------------------*/
class UI {
    static UpdateUI = () => {
        ElP1_Name.innerHTML = p1.name;
        ElP2_Name.innerHTML = p2.name;

        ElP1_Char.innerHTML = p1.char;
        ElP2_Char.innerHTML = p2.char;

        ElP1_Points.innerHTML = game.player_1_Points;
        ElP2_Points.innerHTML = game.player_2_Points;

        ElRounds_Conut.innerHTML = game.countOfRound;
        ElRound_Number.innerHTML = game.currentRound;
    };

    static ValidateForm = () => {
        let isValidName_1 = input_P1_Name.value.trim() != "";
        let isValidName_2 = input_P2_Name.value.trim() != "";
        return isValidName_1 && isValidName_2;
    };

    static CloseForm = () => {
        from_layout.classList.add("closed");
        from.classList.add("closed");
    };

    static OpenForm = () => {
        from_layout.classList.remove("closed");
        from.classList.remove("closed");
    };

    static SetActivePlayer = () => {
        ElP1_Name.parentElement.classList.add("active");
        ElP2_Name.parentElement.classList.remove("active");
    };

    static UpdateActivePlayer = () => {
        if (ElP1_Name.parentElement.classList.contains("active")) {
            ElP1_Name.parentElement.classList.remove("active");
            ElP2_Name.parentElement.classList.add("active");
            return;
        }

        ElP2_Name.parentElement.classList.remove("active");
        ElP1_Name.parentElement.classList.add("active");
    };

    static ClearRound = () => {
        boxes.forEach((Element) => {
            Element.classList.remove("closed");
            Element.classList.remove("fill_box");
            Element.innerHTML = "";
        });
    };
    static IsBoxsFilld() {
        for (let i = 0; i < boxes.length; i++) {
            const element = boxes[i];
            if (!element.classList.contains("fill_box")) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }

    static freezRound() {
        boxes.forEach((Element) => {
            Element.classList.add("disabled");
        });
    }

    static unfreezRound() {
        boxes.forEach(function (Element) {
            Element.classList.remove("disabled");
        });
    }
    static ResetGame = () => {
        game.ClearGame();
        UI.ClearRound();
        round.ClearRound();
        // will UpdateUI after start btn clicking
        // if you will not open form unCommet
        //UI.UpdateUI();
    };

    static showAlert = (isSuccess, message, title = " ") => {
        // Define the HTML structure using a template literal
        const alertHTML = `
          <div class="bg_layer bg_alert">
              <div class="alert_box">
                  <h5 class="alert_header">${title}</h5>
                  <button class="btn alert_btn">&#x2716;</button>
                  <p class="message">${message}</p>
              </div>
          </div>
      `;

        // Insert the HTML into the body
        document.body.insertAdjacentHTML("beforeend", alertHTML);

        // Add event listener to the close button to remove the alert
        document
            .querySelector(".btn.alert_btn")
            .addEventListener("click", function () {
                document.querySelector(".bg_alert").remove();
            });

        const successSound = document.getElementById("success-sound");
        const errorSound = document.getElementById("error-sound");

        if (isSuccess) {
            successSound.play();
        } else {
            errorSound.play();
        }
    };

    static AlertWinInRound = () => {
        UI.showAlert(
            false,
            `${round.currentPlayer.name} win this round`,
            "Congratulations ! &#x1F389;"
        );
    };

    static AlertWinInGame = () => {
        const winnerobj = game.GameWinner();
        if (winnerobj.Roundwinner == null) return;

        UI.showAlert(
            true,
            `${winnerobj.Roundwinner.name} win the game`,
            "Congratulations ! &#x1F389;"
        );
        console.log(game.currentRound);
    };

    static AlertDrawInRound = () => {
        UI.showAlert(false, "no one win this round", "No winner: &#x1F610;");
    };

    static AlertDrawInGame = () => {
        UI.showAlert(false, "no one win this Game", "No winner: &#x1F610;");
    };
}

let p1 = new Player();
let p2 = new Player();
let game = new Game();
let round = new Round();

/*-------------------------*/
// Handel start btn Clicking
/*-------------------------*/
startBtn.addEventListener("click", () => {
    // check validation
    if (!UI.ValidateForm()) {
        // alert("inter values first in inputs");
        UI.showAlert(false, "inter values first in inputs");
        return;
    }

    // fill player 1, player 2 , game, round
    p1.name = input_P1_Name.value;
    p1.char = player_1_Char.value;

    p2.name = input_P2_Name.value;
    p2.char = player_1_Char.value == "X" ? "O" : "X";

    game = new Game(p1, p2);
    game.countOfRound = Number.parseInt(roundCount.value);
    console.log(game.countOfRound);
    game.currentRound = 1;
    round = new Round(p1, p2);

    UI.CloseForm();
    UI.UpdateUI();
    UI.SetActivePlayer();
});

/*-------------------------*/
// Hndel Box Clicking
/*-------------------------*/
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // check if not fill before
        if (box.classList.contains("fill_box")) return;

        // toggle ActivePlayer
        UI.UpdateActivePlayer();

        ClickSound.play();

        box.innerHTML = round.currentPlayer.char;
        box.classList.add("fill_box");

        // check if the player win in (round or game) or no winner
        const roundWinnerObj = round.RoundWinner();
        const gameWinnerObj = game.GameWinner();
        // check if the player win in (round or game)
        if (roundWinnerObj.isDraw == false) {
            // there are winner
            // Alert Round winner
            console.log("0");
            if (roundWinnerObj.Roundwinner != null && !game.IsGameEnd()) {
                console.log("1");
                //! IsGameEnd() => it wase not the list round
                UI.AlertWinInRound();
                // add point to the round winner
                round.winner = round.currentPlayer;
                game.player_1 == round.winner
                    ? game.player_1_Points++
                    : game.player_2_Points++;

                UI.UpdateUI();
                UI.freezRound();
            }
            // Alert Game winner // if draw in last round but this score is > ather so he must win
            if (roundWinnerObj.Roundwinner != null && game.IsGameEnd()) {
                console.log("2"); //  draw
                    console.log("2-2");
                    round.winner = round.currentPlayer;
                    game.player_1 == round.winner
                        ? game.player_1_Points++
                        : game.player_2_Points++;
                        UI.AlertWinInGame();
                        UI.UpdateUI();
                        UI.freezRound();
                        return;
            }
        } else if (
            roundWinnerObj.isDraw == true &&
            roundWinnerObj.Roundwinner == null
        ) {
            // there are no round winner
            console.log("-1");
            if (gameWinnerObj.Roundwinner == null && gameWinnerObj.isDraw == true) {
                console.log("-2");
                UI.AlertDrawInGame();
                UI.freezRound();
                return;
            } else if (gameWinnerObj.Roundwinner != null  && game.IsGameEnd()) {
                console.log("-3");
                UI.AlertWinInGame();
                UI.freezRound();
                return;
            } else {
                console.log("-4");
                UI.AlertDrawInRound();
            }
        }
        // toggle current player
        round.currentPlayer = round.currentPlayer.char == p1.char ? p2 : p1;
        console.log(round.currentPlayer);
    });
});

/*-----------------------*/
// Hndel btns Clicking
/*-----------------------*/

resetBtn.addEventListener("click", () => {
    // un freez round
    UI.unfreezRound();
    // clear current game
    UI.ResetGame();

    UI.OpenForm();
});

closeFormBtn.addEventListener("click", () => {
    UI.CloseForm();
    UI.freezRound();
});

continueBtn.addEventListener("click", () => {
    if (game.IsGameEnd()) {
        return;
    }
    // un freez round
    UI.unfreezRound();

    UI.ClearRound();

    game.currentRound++;

    // update screen
    UI.UpdateUI();
});
