import { useState } from "react";
import { quizData } from "./quizData";
import { Button, Card } from "@/shared/components";
import styles from "./Quiz.module.css";

export const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (answer: string) => {
        if (answer === quizData[index].correct) {
            setScore((s) => s + 1);
        }
        if (index + 1 < quizData.length) {
            setIndex(index + 1);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <div className={styles.quizWrapper}>
                <Card>
                    <h2 className={styles.result}>Resultat</h2>
                    <p>
                        Has encertat {score} de {quizData.length}.
                    </p>
                </Card>
            </div>
        );
    }

    const q = quizData[index];

    return (
        <section className="page">
            <h1 className="h1">Test</h1>
            <Card className={styles.quizWrapper}>
                <div className={styles.progress}>
                    Pregunta {index + 1} de {quizData.length}
                </div>
                <h2 className={styles.question}>{q.question}</h2>
                <ul className={styles.optionsList}>
                    {q.options.map((opt) => (
                        <li key={opt}>
                            <Button
                                variant="button--main"
                                onClick={() => handleAnswer(opt)}
                            >
                                {opt}
                            </Button>
                        </li>
                    ))}
                </ul>
            </Card>
        </section>
    );
};
