import React, { useEffect, useRef, useState } from 'react';
import '../Styles/SnakeGame.scss';
import Food from './Food';
import Snake from './Snake';


function SnakeGame({setScore}) {
    const [snakeDots, setSnakeDots] = useState([[0, 0], [2, 0], [4, 0]]);
    const [food, setFood] = useState([0, 0]);
    const [direction, setDirection] = useState('RIGHT');
    const [speed, setSpeed] = useState(200);
    const directionRef = useRef('RIGHT');


    useEffect(() => {
        setFood(getRandomCoordinates());
        setInterval(moveSnake, speed);
    }, [])

    useEffect(() => {
        directionRef.current = direction
    },[direction])

    useEffect(() => {
        checkIfOutOfBorders();
        checkIfCollapsed();
        checkIfEat();
    }, [direction, snakeDots])

    const getRandomCoordinates = () => {
        let min = 1;
        let max = 98;
        let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        return [x, y]
    }

    onkeydown = (e) => {
        e = e || window.event;
        switch (e.key) {
            case 'ArrowLeft':
                direction !== 'RIGHT' ? setDirection('LEFT') : setDirection('RIGHT');
                break;
            case 'ArrowUp':
                direction !== 'DOWN' ? setDirection('UP') : setDirection('DOWN');
                break;
            case 'ArrowRight':
                direction !== 'LEFT' ? setDirection('RIGHT') : setDirection('LEFT');
                break;
            case 'ArrowDown':
                direction !== 'UP' ? setDirection('DOWN') : setDirection('UP');
                break;
        }
    }

    const moveSnake = () => {
        setSnakeDots((prevSnakeDots) => {
            let dots = [...prevSnakeDots]
            let head = dots[dots.length - 1]
            switch (directionRef.current) {
                case 'RIGHT':
                    head = [head[0] + 2, head[1]];
                    break;
                case 'LEFT':
                    head = [head[0] - 2, head[1]];
                    break;
                case 'UP':
                    head = [head[0], head[1] - 2];
                    break;
                case 'DOWN':
                    head = [head[0], head[1] + 2];
                    break;
            }
            dots = [...dots, head];
            return dots.slice(1);
        })
    }
    const resetGame = () => {
        setDirection('RIGHT');
        setFood(getRandomCoordinates());
        setSpeed(200);
        setSnakeDots([[0, 0], [2, 0], [4, 0]]);
    }

    const gameOver = () => {
        alert('Game Over');
        resetGame();
    }

    const checkIfOutOfBorders = () => {
        let head = snakeDots[snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            gameOver();
        }
    }

    const checkIfCollapsed = () => {
        let head = snakeDots[snakeDots.length - 1];
        let snake = [...snakeDots];
        snake.pop();
        snake.forEach(dot => {
            if(dot[0] == head[0] && dot[1] == head[1]){
                gameOver();
            }
        })
    }

    const checkIfEat = () => {
        let head = snakeDots[snakeDots.length - 1];
        if (food[0] == head[0] && food[1] == head[1]){
            setFood(getRandomCoordinates());
            enlargeSnake();
            increaseSpeed();
            setScore((prevScore) => {return prevScore + 10})
        }
    }

    const enlargeSnake = () => {
        setSnakeDots([[],...snakeDots])
    }

    const increaseSpeed = () => {
        if(speed > 10){
            setSpeed(speed - 10);
        }
    }

    return (
        <div className='game-area'>
            <Snake snakeDots={snakeDots}></Snake>
            <Food dot={food}></Food>
        </div>
    )
}

export default SnakeGame