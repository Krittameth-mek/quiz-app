import QuestionsData from '../data/QuestionsData';
import { useState, useContext } from 'react';
import { DataContext } from '../App';

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const { setScore, setAppState } = useContext(DataContext);

    const selectAnswer = (choice) => {
        setSelectedAnswers((answers) => {
            const updatedAnswers = [...answers];
            updatedAnswers[current] = choice;
            return updatedAnswers;
        });
    };

    const nextQuestion = () => {
        if(current === QuestionsData.length - 1){
            const finalScore = selectedAnswers.reduce((total, answer, index) => (
                total + (answer === QuestionsData[index].answer ? 1 : 0)
            ), 0);
            setScore(finalScore);
            setAppState("score");
        }else{
            setCurrent(current + 1);
        }
    };

    const previousQuestion = () => {
        setCurrent(current - 1);
    };

    const currentAnswer = selectedAnswers[current];

    return(
        <div className = "quiz">
            <h1>{QuestionsData[current].question}</h1>
            <div className = "choices">
                {['A', 'B', 'C', 'D'].map((choice) => (
                    <button
                        className={currentAnswer === choice ? 'selected' : ''}
                        key={choice}
                        onClick={() => selectAnswer(choice)}
                    >
                        {QuestionsData[current][choice]}
                    </button>
                ))}
            </div>
            <p>{`${current + 1}/${QuestionsData.length}`}</p>
            <div className="navigation">
                <button onClick={previousQuestion} disabled={current === 0}>
                    ย้อนกลับ
                </button>
                <button onClick={nextQuestion} disabled={!currentAnswer}>
                    {current === QuestionsData.length - 1 ? 'ส่งคำตอบ' : 'ถัดไป'}
                </button>
            </div>
        </div>
    )
}

export default Quiz;