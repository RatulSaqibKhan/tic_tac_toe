const TicTacToe = {
    elements: {
        main: null,
        innerElements: null
    },

    properties: {
        gamingMode: null,
        playerOne: null,
        playerTwo: null,
        activePlayer: null,
        winStatus: null,
        winPlayer: null,
        decisionMessage: null,
        computerPlayerStatus: 0,
        computerPlayer: null,
        playerOneMoves: [],
        playerTwoMoves: [],
    },

    constants: {
        gamingModes: {
            'single_player': {
                "dom_id": "single-player-btn",
                "mode_name": "Single Player",
                "icon": 'person'
            },
            'two_player': {
                "dom_id": "two-player-btn",
                "mode_name": "Two Players",
                "icon": 'people'
            }
        },
        players: {
            'x': {
                'dom_id': 'select-player-x-btn',
                'name': 'X',
                'icon': 'close'
            },
            'circle': {
                'dom_id': 'select-player-circle-btn',
                'name': 'O',
                'icon': 'trip_origin'
            }
        },
        winningCombinations: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        messages: {
            'x': "Player X Wins!",
            'circle': "Player O Wins!",
            'draw': "Game Drawn!"
        }
    },

    _initilizeProperties() {
        this.properties.gamingMode = null
        this.properties.playerOne = null
        this.properties.playerTwo = null
        this.properties.activePlayer = null
        this.properties.winStatus = null
        this.properties.winPlayer = null
        this.properties.decisionMessage = null
        this.properties.computerPlayerStatus = 0
        this.properties.computerPlayer = null
        this.properties.playerOneMoves = []
        this.properties.playerTwoMoves = []
    },

    init() {
        this._initilizeProperties()
        let gameInitialSectionDom = this._createGameInitialSection()
        document.querySelector('.dynamic-content').appendChild(gameInitialSectionDom)
        this.allButtonPressAnimation()
        this._setBackgroundAudio()
    },

    _createGameInitialSection() {
        this.elements.main = document.createElement('div')

        this.elements.main.classList.add("game-initials")

        this.elements.innerElements = this._createGameInitialSectionInnerElements()

        this.elements.main.appendChild(this.elements.innerElements)

        return this.elements.main
    },

    _createGameInitialSectionInnerElements() {
        const fragment = document.createDocumentFragment();

        Object.keys(this.constants.gamingModes).forEach(gamingMode => {
            let gameMode = this.constants.gamingModes[gamingMode].mode_name
            let domId = this.constants.gamingModes[gamingMode].dom_id
            let icon = this.constants.gamingModes[gamingMode].icon
            let buttonContainer = document.createElement('div')
            let buttonElement = document.createElement('div')
            let iconElement = document.createElement('i')

            // Set up Element_removeGameInitialSectionFromDom
            buttonContainer.classList.add("button-container")
            buttonElement.classList.add("button")
            buttonElement.setAttribute("id", domId)
            iconElement.classList.add('material-icons')
            iconElement.append(icon)
            buttonElement.appendChild(iconElement)
            buttonElement.append(gameMode)
            buttonContainer.appendChild(buttonElement)

            buttonElement.addEventListener("click", (event) => {
                let selectedGamingMode = buttonElement.getAttribute("id")
                switch (selectedGamingMode) {
                    case 'single-player-btn':
                        this.properties.gamingMode = "single_player"
                        this.properties.computerPlayerStatus = 1
                        this._removeGameInitialSectionFromDom()
                        this._createDomForGameInitialSecondPart()
                        break;
                    case 'two-player-btn':
                        this.properties.gamingMode = "two_player"
                        this.properties.computerPlayerStatus = 0
                        this._removeGameInitialSectionFromDom()
                        this._createDomForGameInitialSecondPart()
                        break;
                    default:
                        break;
                }
            })

            fragment.appendChild(buttonContainer)
        })

        return fragment
    },

    _removeGameInitialSectionFromDom() {
        document.querySelector('.game-initials').remove()
    },

    _createDomForGameInitialSecondPart() {
        let gameInitialSecondPartDom = this._createGameInitialSecondPartDom()
        document.querySelector('.dynamic-content').appendChild(gameInitialSecondPartDom)
        this.allButtonPressAnimation()
    },

    _createGameInitialSecondPartDom() {
        this.elements.main = document.createElement('div')

        this.elements.main.classList.add("game-initials-second-part")

        this.elements.innerElements = this._createGameInitialSecondPartInnerElements()

        this.elements.main.appendChild(this.elements.innerElements)

        return this.elements.main
    },

    _createGameInitialSecondPartInnerElements() {
        const fragment = document.createDocumentFragment();

        Object.keys(this.constants.players).forEach(playerKey => {
            let playerName = this.constants.players[playerKey].name
            let domId = this.constants.players[playerKey].dom_id
            let icon = this.constants.players[playerKey].icon
            let buttonContainer = document.createElement('div')
            let buttonElement = document.createElement('div')
            let iconElement = document.createElement('i')

            // Set up Element_removeGameInitialSectionFromDom
            buttonContainer.classList.add("button-container")
            buttonElement.classList.add("button")
            buttonElement.setAttribute("id", domId)
            iconElement.classList.add('material-icons')
            iconElement.append(icon)

            buttonElement.append("Select Player")
            buttonElement.appendChild(iconElement)
            buttonContainer.appendChild(buttonElement)

            buttonElement.addEventListener("click", (event) => {
                let selectedPlayerId = buttonElement.getAttribute("id")

                switch (selectedPlayerId) {
                    case 'select-player-x-btn':
                        this.properties.playerOne = "x"
                        this.properties.playerTwo = "circle"
                        this.properties.computerPlayer = this.properties.gamingMode === 'single_player' ? "circle" : null
                        this.properties.activePlayer = this.properties.playerOne
                        // Set Notification Dom element
                        this._createNotificationDom(`Player One: X & Player Two: O`)
                        setTimeout(() => {
                            // Remove Notification DOM
                            this._removeNotificationDom()
                        }, 2000)
                        this._removeGameInitialSecondPartFromDom()
                        this._createDomForGameBoard()
                        break;
                    case 'select-player-circle-btn':
                        this.properties.playerOne = "circle"
                        this.properties.playerTwo = "x"
                        this.properties.computerPlayer = this.properties.gamingMode === 'single_player' ? "x" : null
                        this.properties.activePlayer = this.properties.playerOne
                        // Set Notification Dom element
                        this._createNotificationDom(`Player One: O & Player Two: X`)
                        setTimeout(() => {
                            // Remove Notification DOM
                            this._removeNotificationDom()
                        }, 2000)
                        this._removeGameInitialSecondPartFromDom()
                        this._createDomForGameBoard()
                        break;
                    default:
                        break;
                }
            })

            fragment.appendChild(buttonContainer)
        })

        return fragment
    },

    _removeGameInitialSecondPartFromDom() {
        document.querySelector('.game-initials-second-part').remove()
    },

    _createDomForGameBoard() {
        let gameBoardDom = this._createGameBoardDom()
        document.querySelector('.dynamic-content').appendChild(gameBoardDom)
    },

    _createGameBoardDom() {
        this.elements.main = document.createElement('div')

        this.elements.main.classList.add("game-board", this.properties.activePlayer)

        this.elements.innerElements = this._createGameBoardInnerElements()

        this.elements.main.appendChild(this.elements.innerElements)

        return this.elements.main
    },

    _createGameBoardInnerElements() {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 9; i++) {
            let cellDom = document.createElement("div")

            cellDom.classList.add("cell")

            cellDom.setAttribute("data-cell", i)

            cellDom.addEventListener("click", (event) => {
                // Place Mark
                cellDom.classList.add(this.properties.activePlayer)
                if (this.properties.playerOne === this.properties.activePlayer) {
                    this.properties.playerOneMoves.push(cellDom.getAttribute("data-cell"))
                } else {
                    this.properties.playerTwoMoves.push(cellDom.getAttribute("data-cell"))
                }
                if (this._checkForWin()) {
                    // Check For Win
                    this.properties.winStatus = 1
                    this.properties.winPlayer = this.properties.activePlayer
                    this.properties.decisionMessage = this.constants.messages[this.properties.winPlayer]
                    this._endGame()
                } else if (this._isDraw()) {
                    // Check For Draw
                    this.properties.winStatus = 0
                    this.properties.winPlayer = 'draw'
                    this.properties.decisionMessage = this.constants.messages[this.properties.winPlayer]
                    this._endGame()
                } else {
                    // Switch Turn
                    this._changeTurn()
                }
            }, {
                once: true
            })
            fragment.appendChild(cellDom)
        }

        return fragment
    },

    _isDraw() {
        let cellElements = document.querySelectorAll('[data-cell]')

        return [...cellElements].every(cell => {
            return cell.classList.contains("x") || cell.classList.contains("circle")
        })
    },

    _checkForWin() {
        let cellElements = document.querySelectorAll('[data-cell]')

        return this.constants.winningCombinations.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(this.properties.activePlayer)
            })
        })
    },

    _changeTurn() {
        let gameBoardDom = document.querySelector(".game-board")
        gameBoardDom.classList.remove(this.properties.activePlayer)
        this.properties.activePlayer = this.properties.activePlayer === this.properties.playerOne ? this.properties.playerTwo : this.properties.playerOne
        gameBoardDom.classList.add(this.properties.activePlayer)
        if (this.properties.gamingMode === 'single_player' && this.properties.computerPlayer === this.properties.activePlayer) {
            // Place mark
            this._placeMarkForComputer()

            if (this._checkForWin()) {
                // Check For Win
                this.properties.winStatus = 1
                this.properties.winPlayer = this.properties.activePlayer
                this.properties.decisionMessage = this.constants.messages[this.properties.winPlayer]
                this._endGame()
            } else if (this._isDraw()) {
                // Check For Draw
                this.properties.winStatus = 0
                this.properties.winPlayer = 'draw'
                this.properties.decisionMessage = this.constants.messages[this.properties.winPlayer]
                this._endGame()
            } else {
                // Switch Turn
                this._changeTurn()
            }
        }
    },

    _placeMarkForComputer() {
        let cellElements = document.querySelectorAll('[data-cell]')
        let emptyCells = []
        cellElements.forEach((element, index) => {
            if (!element.classList.contains(this.properties.playerOne) && !element.classList.contains(this.properties.activePlayer)) {
                emptyCells.push(index)
            }
        })
        let aproximateMarkPosition = this._getBestPositionForPlacingMark(emptyCells)
        cellElements.forEach((element, index) => {
            if (index == aproximateMarkPosition) {
                element.classList.add(this.properties.activePlayer)
                this.properties.playerTwoMoves.push(index)
            }
        })
    },

    _getBestPositionForPlacingMark(emptyCells) {
        let bestMove = this._simpleAi(emptyCells)
        return bestMove;
    },

    _simpleAi(cells) {
        return cells[Math.floor(Math.random() * cells.length)]
    },

    _createNotificationDom(message) {
        let notificationDom = document.createElement("div")
        let innerElement = document.createElement("h1")

        innerElement.innerText = message
        notificationDom.classList.add("notification")
        notificationDom.appendChild(innerElement)

        document.body.appendChild(notificationDom)

    },

    _removeNotificationDom() {
        document.querySelector('.notification').remove()
    },

    _endGame() {
        // Remove Board from Dom
        this._removeGameBoardFromDom()
        // Set up Dom with Message
        this._setGameDecisionDom()
    },

    _removeGameBoardFromDom() {
        document.querySelector(".game-board").remove()
    },

    _setGameDecisionDom() {
        let gameDecisionDom = this._createGameDecisionDom()
        document.querySelector('.dynamic-content').appendChild(gameDecisionDom)
        this.allButtonPressAnimation()
    },

    _createGameDecisionDom() {
        this.elements.main = document.createElement('div')

        this.elements.main.classList.add("game-decision-container")

        this.elements.innerElements = this._createGameDecisionInnerElements()

        this.elements.main.appendChild(this.elements.innerElements)

        return this.elements.main
    },

    _createGameDecisionInnerElements() {
        const fragment = document.createDocumentFragment();

        let messageContainer = document.createElement('div')
        let messageElement = document.createElement("h1")

        messageElement.innerText = this.properties.decisionMessage
        messageContainer.classList.add("message-container")
        messageContainer.appendChild(messageElement)

        fragment.appendChild(messageContainer)

        let buttonContainer = document.createElement('div')
        let buttonElement = document.createElement('div')
        let iconElement = document.createElement('i')

        buttonContainer.classList.add("button-container")
        buttonElement.classList.add("button")
        buttonElement.setAttribute("id", "restart-btn")
        iconElement.classList.add('material-icons')
        iconElement.append("replay")

        buttonElement.append("Restart")
        buttonElement.appendChild(iconElement)
        buttonContainer.appendChild(buttonElement)

        fragment.appendChild(buttonContainer)

        buttonElement.addEventListener("click", () => {
            this._removeGameDesicionDom()
            this.init()
        })

        return fragment
    },

    _removeGameDesicionDom() {
        document.querySelector('.game-decision-container').remove()
    },

    allButtonPressAnimation() {
        var buttons = document.querySelectorAll('.button')

        buttons.forEach(buttonElement => {
            var audio = new Audio()
            buttonElement.setAttribute('disabled', true)
            audio.addEventListener("loadeddata", this.enableAudioButton.bind(buttonElement), true);

            audio.src = 'assets/extra/audios/click.mp3'

            buttonElement.addEventListener("mousedown", () => {
                buttonElement.classList.add('active')

                audio.currentTime = 0
                audio.play()
            })
            buttonElement.addEventListener("mouseup", () => {
                buttonElement.classList.remove('active')
            })
        })

    },

    _setBackgroundAudio() {
        var backgroundAudio = new Audio()
        var volumeElement = document.getElementById("volumeButton")
        var volumeIcon = document.querySelector("#volumeButton > i")

        backgroundAudio.addEventListener("loadeddata", this.enableAudioButton.bind(volumeElement), true);
        backgroundAudio.src = 'assets/extra/audios/happy_background.mp3'
        backgroundAudio.loop = true

        volumeElement.addEventListener("click", () => {
            volumeElement.classList.remove("fade");
            if (backgroundAudio.paused) {
                backgroundAudio.currentTime = 0
                backgroundAudio.play()
                volumeIcon.innerText = "volume_off"
                volumeElement.classList.add("fade");
            } else {
                backgroundAudio.pause();
                volumeIcon.innerText = "volume_up"
                volumeElement.classList.remove("fade");
            }

        })

        backgroundAudio.addEventListener("ended", () => {
            backgroundAudio.currentTime = 0
            backgroundAudio.play()
        }, false)

    },

    enableAudioButton() {
        this.removeAttribute("disabled"); //reenable the button
    }
}

window.addEventListener("DOMContentLoaded", () => {
    TicTacToe.init()
})