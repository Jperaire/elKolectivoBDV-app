import { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { quizData } from "./quizData";
import { Button, Card } from "@/shared/components";
import styles from "./Quiz.module.css";

export const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const percent = useMemo(
        () => Math.round((score / quizData.length) * 100),
        [score]
    );

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

    useEffect(() => {
        if (!finished) return;
        if (percent >= 70) {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
    }, [finished, percent]);

    if (finished) {
        return (
            <section className="page">
                <h1 className="h1">Test</h1>
                <Card className={styles.quizWrapper}>
                    <h2 className={styles.result}>Resultat</h2>
                    <p>
                        Has encertat {score} de {quizData.length} ({percent}%).
                    </p>
                    <div style={{ marginTop: "1rem" }}>
                        <Button
                            variant="button--main"
                            onClick={() => {
                                setIndex(0);
                                setScore(0);
                                setFinished(false);
                            }}
                        >
                            Tornar a jugar
                        </Button>
                    </div>
                </Card>
            </section>
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
