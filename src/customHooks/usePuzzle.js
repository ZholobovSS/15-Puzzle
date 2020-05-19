import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../redux/actions/'


// BOUNDS

const defaultBounds = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
}

const newDirection = gameTable => {
    const indexOfUndifined = gameTable.indexOf(gameTable.find( el => (el.id === undefined)));

    return gameTable.map( ( el, id ) => {
        el.bounds = {...defaultBounds}
        if ( indexOfUndifined > id ) {
            if ( (indexOfUndifined - id) === 1 && ![3,7,11].filter( el => el === id ).length ) {
                el.bounds.right = (el.size + el.margin * 2); 
            } else if ( (indexOfUndifined - id) === 4 ) {
                el.bounds.bottom = (el.size + el.margin * 2);  
            } 
        } else {
            if ( (id - indexOfUndifined ) === 1 && ![4,8,12].filter( el => el === id ).length ) {
                el.bounds.left = - (el.size + el.margin * 2); 
            } else if ( (id - indexOfUndifined) === 4 ) {
                el.bounds.top = - (el.size + el.margin * 2);  
            } 
        }
        return el
    })
    
}    

const setBounds = ( gameTable ) => {
    
    let newGameTable = [...gameTable];
    newGameTable = newDirection(newGameTable)
    
    return newGameTable
}


// NEW SORT

const createNewSort = (arrLength) => {
    const newGameSort =  [...Array(arrLength-1).keys(), undefined];


    for (let i = newGameSort.length; i > 1; i--) {
        let randomNumber = Math.floor(Math.random() * i);
        let tmp = newGameSort[i-1];
        newGameSort[i-1] = newGameSort[randomNumber];
        newGameSort[randomNumber] = tmp;
    }

    return newGameSort
}

const checkSolveble = (currentArray) => {

    const strOfUndefined = Math.sqrt( currentArray.length ) - ( Math.trunc( currentArray.indexOf(undefined) / Math.sqrt( currentArray.length ) ) )
    let countOfInversions = 0
    let isSolveble = false;

    for (let i = 0; i < currentArray.length; i++) {
        for (let j = i + 1; j < currentArray.length; j++) {
            if (currentArray[i] !== undefined && currentArray[j] !== undefined && currentArray[i] > currentArray[j] ) {
                countOfInversions++;
            }
        }
    }

    if ( Math.sqrt(currentArray.length) & 1 ) {
        isSolveble = !(countOfInversions & 1);
    } else {
        isSolveble = !!(strOfUndefined & 1) ? !(countOfInversions & 1) : !!(countOfInversions & 1)  
    }

    return isSolveble
}


const setNewSort = (arrLength) => {

    let newGameSort = []

    do {
        newGameSort = createNewSort(arrLength)
    } while (!checkSolveble(newGameSort));
    
    return newGameSort;
}


// Check Win Combination

const checkIsWin = (puzzles = []) => {
    let isWin = false
    let rightPuzzles = puzzles.filter( (el, id) => el.id === id ).length
    isWin = ( rightPuzzles === 15) ? true : false; 

    return isWin
}


const usePuzzle = () => {
    const dispatch = useDispatch();
    const currentGame = useSelector(store => store.user.stat.currentGame);
    const [ puzzles, setPuzzles ] = useState([...Array(16).keys()].map((el,id) => {
        return {
            id: (id === 15) ? undefined : id ,
            key: uuidv4(),
            margin: 5,
            size: 0,
            x: 0,
            y: 0,
            bounds: defaultBounds
        }
    }
    ));

    const setPuzzlesSize = ( size ) => {
        setPuzzles( oldPuzzles => {
            return oldPuzzles.map( el => ({...el, size}) )
        })
    }

    

    const setSort = useCallback(() => {
        setPuzzles( oldPuzzles => {
            const newSortPuzzles = setNewSort(oldPuzzles.length)

            let newPuzzles = [...oldPuzzles].sort( ( a, b ) => {
                return newSortPuzzles.indexOf(a.id) - newSortPuzzles.indexOf(b.id)
            } )

            newPuzzles = setBounds(newPuzzles)

            return newPuzzles
        })
    }, [puzzles.length]) 

    const setStep = ( id ) => {
        setPuzzles( old => {

                let newPuzzles = [...old];

                const indexOfUndifined = puzzles.indexOf(puzzles.find((el) => (el.id === undefined)))
                const undefinedElement = newPuzzles[indexOfUndifined]
                newPuzzles[indexOfUndifined] = newPuzzles[id]
                newPuzzles[id] = undefinedElement
                newPuzzles = setBounds(newPuzzles)

                
                

                return newPuzzles
            } ) 
    }

    useEffect( () => {  
        checkIsWin(puzzles) && currentGame.startTime && dispatch( ACTIONS.setIsWin(true))
    } , [puzzles, dispatch, currentGame.startTime])


    return [ puzzles, setPuzzlesSize, setSort, setStep ]
}

export default usePuzzle