const initialState = {
    user: {
        data: {
            name: '',
            token: '',
            uid: '',
        },
        stat: {
            generalInfo: {
                countOfGames: 0,
                countOfSteps: 0,
                spentTime: 0,
            },
            bestGame: {
                date: 0,
                spentTime: 0,
                countOfSteps: 0,
            },
            currentGame: {
                startTime: 0,
                endTime: 0,
                isWin: false,
                countOfSteps: 0,
            }
        },
        validation: {
            email: {
                error: false,
                text: ''
            },
            name: {
                error: false,
                text: ''
            },
            password: {
                error: false,
                text: ''
            },
        }
    },
    loading: {
        backdrop: false,
        skeleton: true,
    },
    leaderboard: [],
    notifications: [],
}

export default initialState