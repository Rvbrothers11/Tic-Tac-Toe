let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") {
            return;
        }

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.style.pointerEvents = "none";

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "none";
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.innerText = "";
        box.style.pointerEvents = "auto";
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const showWinner = (winner) => {
    if (winner) {
        msg.innerText = `Congratulations! Winner is ${winner}`;
    } else {
        msg.innerText = "It's a draw!";
    }

    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
                return;
            }
        }
    }

    let allFilled = true;

    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled && !winnerFound) {
        showWinner(null);
    }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);