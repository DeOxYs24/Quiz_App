import React, { useEffect, useState } from 'react';

export default function App() {
	// const questions = [
	// 	{
	// 		questionText: 'What is the capital of France?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Paris', isCorrect: true },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Who is CEO of Tesla?',
	// 		answerOptions: [
	// 			{ answerText: 'Jeff Bezos', isCorrect: false },
	// 			{ answerText: 'Elon Musk', isCorrect: true },
	// 			{ answerText: 'Bill Gates', isCorrect: false },
	// 			{ answerText: 'Tony Stark', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'The iPhone was created by which company?',
	// 		answerOptions: [
	// 			{ answerText: 'Apple', isCorrect: true },
	// 			{ answerText: 'Intel', isCorrect: false },
	// 			{ answerText: 'Amazon', isCorrect: false },
	// 			{ answerText: 'Microsoft', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'How many Harry Potter books are there?',
	// 		answerOptions: [
	// 			{ answerText: '1', isCorrect: false },
	// 			{ answerText: '4', isCorrect: false },
	// 			{ answerText: '6', isCorrect: false },
	// 			{ answerText: '7', isCorrect: true },
	// 		],
	// 	},
	// ];

	const [currentQuestion, setCurrentQuestion] = useState(0);

	const [showScore, setShowScore] = useState(false);

	const [score, setScore] = useState(0);

	const handleCorrectAnswerClick = ({correct_answer}) => {
		if(quesList[currentQuestion].correct_answer===true){
			setScore(score + 5);
		}

		const nextQuestion = currentQuestion + 1;
		
		if(nextQuestion < quesList.length){
			setCurrentQuestion(nextQuestion);
		}else{
			setShowScore(true);
		}
		
	};

	const handleIncorrectAnswerClick = () =>{
		if(quesList[currentQuestion].correct_answer===false){
			setScore(score - 1);
		}

		const nextQuestion = currentQuestion + 1;
		
		if(nextQuestion < quesList.length){
			setCurrentQuestion(nextQuestion);
		}else{
			setShowScore(true);
		}
	};

	const URL = 'https://opentdb.com/api.php?amount=10';
	
	const [quesList,setQuesList] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(URL)
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res.results);
                        setQuesList(res.results);
						setLoading(false);
                    })
            }
            catch (error) {
                console.log("error : ", error)
            }
        };

        fetchData();
    }, []);

		return (
		<div className='app'>
		
			{showScore ? (
				<div className='score-section'>You scored {score} out of 50</div>
			) : 
			( loading ? <div>Loading</div> :
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{quesList.length}
						</div>
						<div className='question-text'>{quesList[currentQuestion].question}</div>
					</div>
					<div className='answer-section'>
						{quesList[currentQuestion].incorrect_answers.map((incorrect_options, index)=>(						
						<button key={index} onClick={() => handleIncorrectAnswerClick}>{incorrect_options}</button>								
						))}

						<button onClick={() => handleCorrectAnswerClick(quesList[currentQuestion].correct_answer)}>{quesList[currentQuestion].correct_answer}</button>
					</div>
				</>
			)}
		</div>
	);
}
