import { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { quizData } from "./quizData";
import { Button, Card } from "@/shared/components";
import styles from "./Quiz.module.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const percent = useMemo(
        () => Math.round((score / quizData.length) * 100),
        [score]
    );

    const handleAnswer = (answer: string) => {
        if (answer === quizData[index].correct) setScore((s) => s + 1);
        if (index + 1 < quizData.length) setIndex(index + 1);
        else setFinished(true);
    };

    useEffect(() => {
        if (!finished) return;
        if (percent >= 70) {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
    }, [finished, percent]);

    if (finished) {
        const wrong = quizData.length - score;

        const data = {
            labels: ["Encerts", "Errors"],
            datasets: [
                {
                    data: [score, wrong],
                    backgroundColor: [
                        "rgba(94,209,214,0.85)",
                        "rgba(233,148,91,0.85)",
                    ],
                    borderColor: ["rgba(94,209,214,1)", "rgba(233,148,91,1)"],
                    borderWidth: 2,
                    hoverOffset: 6,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: "bottom" as const },
                title: { display: true, text: "Resultados" },
                tooltip: {
                    callbacks: {
                        label: (ctx: any) => {
                            const v = ctx.parsed as number;
                            const total = score + wrong;
                            const p = Math.round((v / total) * 100);
                            return `${ctx.label}: ${v} (${p}%)`;
                        },
                    },
                },
            },
            animation: { animateRotate: true, animateScale: true },
        };

        return (
            <section className="page">
                <h1 className="h1">Test</h1>
                <Card className={styles.quizWrapper}>
                    <h2 className={styles.result}>Resultat</h2>
                    <p>
                        Has encertat {score} de {quizData.length} ({percent}%).
                    </p>

                    <div className={styles.chartWrap}>
                        <Doughnut data={data} options={options} />
                    </div>

                    <div className={styles.actions}>
                        <Button
                            variant="button--purple"
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
