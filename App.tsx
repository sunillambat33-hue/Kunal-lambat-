import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Profile, ScreenId, PracticeType, Theme, SamplePaper } from './types';
import { subjectChapters, mcqData, subjects, subjectIcons, samplePaperData } from './constants';
import { fetchChapterNotes, generateHtmlCode } from './services/geminiService';

// --- HELPER & UI COMPONENTS ---

const TopBar: React.FC<{ title: string; backTarget?: ScreenId; onBack: () => void; children?: React.ReactNode; }> = ({ title, backTarget, onBack, children }) => (
    <header className="w-full flex justify-between items-center p-4 bg-main-bg-light dark:bg-main-bg-dark border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center">
            {backTarget && <i className="fas fa-angle-left text-xl mr-4 cursor-pointer text-text-light dark:text-text-dark" onClick={onBack}></i>}
            <span className="text-2xl font-bold text-title-light dark:text-title-dark">{title}</span>
        </div>
        <div className="flex items-center space-x-4">{children}</div>
    </header>
);

const BottomNav: React.FC<{ activeScreen: ScreenId; onNavigate: (screen: ScreenId) => void; }> = ({ activeScreen, onNavigate }) => {
    const navItems = [
        { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
        { id: 'practice', icon: 'fa-pen-nib', label: 'Practice' },
        { id: 'notesSubject', icon: 'fa-clipboard', label: 'Notes' },
        { id: 'studySubject', icon: 'fa-book-reader', label: 'Study' },
        { id: 'ask', icon: 'fa-robot', label: 'Ask AI' },
        { id: 'profile', icon: 'fa-user', label: 'Profile' },
    ];

    const getActiveState = (id: string) => {
        if (id === 'dashboard' && activeScreen === 'dashboard') return true;
        if (id === 'practice' && (activeScreen.startsWith('practice') || activeScreen.startsWith('samplePaper') || activeScreen === 'quiz')) return true;
        if (id === 'notesSubject' && (activeScreen.startsWith('notes'))) return true;
        if (id === 'studySubject' && (activeScreen.startsWith('study'))) return true;
        if (id === 'ask' && activeScreen === 'ask') return true;
        if (id === 'profile' && activeScreen === 'profile') return true;
        return false;
    }

    return (
        <nav className="w-full flex justify-around items-center bg-card-bg-light dark:bg-card-bg-dark p-2 shadow-[0_-2px_10px_rgba(0,0,0,0.5)] border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            {navItems.map(item => (
                <button key={item.id} onClick={() => onNavigate(item.id as ScreenId)} className={`flex flex-col items-center flex-1 py-1 text-xs transition-colors ${getActiveState(item.id) ? 'text-accent-purple-light dark:text-accent-purple-dark font-bold' : 'text-nav-inactive-light dark:text-nav-inactive-dark'}`}>
                    <i className={`fas ${item.icon} text-lg mb-1`}></i>
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};


const Screen: React.FC<{ active: boolean; children: React.ReactNode; className?: string }> = ({ active, children, className = '' }) => (
    <div className={`w-full h-full flex-grow flex flex-col items-center overflow-hidden ${active ? 'flex' : 'hidden'} ${className}`}>
        {children}
    </div>
);

const Card: React.FC<{ title: string; icon: string; color: string; onClick: () => void; }> = ({ title, icon, color, onClick }) => (
    <div onClick={onClick} className="bg-card-bg-light dark:bg-card-bg-dark rounded-xl p-5 flex flex-col items-center justify-center text-center min-h-[140px] shadow-lg cursor-pointer transition-transform active:scale-95">
        <i className={`${icon} text-5xl mb-2`} style={{ color }}></i>
        <span className="font-medium text-text-light dark:text-text-dark">{title}</span>
    </div>
);

const ChapterListItem: React.FC<{ index: number; title: string; iconClass?: string; onClick: () => void; disabled?: boolean }> = ({ index, title, iconClass = 'fa-angle-right', onClick, disabled }) => (
    <div onClick={!disabled ? onClick : undefined} className={`flex justify-between items-center bg-card-bg-light dark:bg-card-bg-dark rounded-lg p-4 mb-2.5 transition-colors ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer hover:bg-list-hover-light dark:hover:bg-list-hover-dark'}`}>
        <div className="flex items-center">
            <span className="text-lg font-bold text-accent-purple-light dark:text-accent-purple-dark mr-4 w-8 text-center">{index + 1}</span>
            <span className="font-medium text-text-light dark:text-text-dark">{title}</span>
        </div>
        <i className={`fas ${iconClass} text-nav-inactive-light dark:text-nav-inactive-dark text-lg`}></i>
    </div>
);

const Loader: React.FC<{text?: string}> = ({ text = "Loading..."}) => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-purple-light dark:border-accent-purple-dark"></div>
        <p className="mt-4 text-lg text-text-light dark:text-text-dark">{text}</p>
    </div>
);

// --- SCREEN COMPONENTS ---

const SplashScreen: React.FC = () => (
    <div className="flex flex-col justify-center items-center text-center h-full">
        <i className="fas fa-book text-7xl text-blue-500 mb-5"></i>
        <div className="text-4xl font-bold text-text-light dark:text-text-dark">self study 10</div>
        <div className="text-md text-nav-inactive-light dark:text-nav-inactive-dark mt-2">Your Shortcut to Success</div>
    </div>
);

const WelcomeScreen: React.FC<{ onContinue: (name: string) => void }> = ({ onContinue }) => {
    const [name, setName] = useState('');
    return (
        <div className="flex flex-col justify-center items-center text-center h-full p-5">
            <h1 className="text-4xl font-bold mb-2 text-text-light dark:text-text-dark">Welcome! &#128075;</h1>
            <p className="text-lg text-nav-inactive-light dark:text-nav-inactive-dark mb-10">What should we call you?</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-card-bg-light dark:bg-card-bg-dark border-2 border-accent-purple-light dark:border-accent-purple-dark rounded-lg p-4 w-4/5 text-center text-lg mb-8 text-text-light dark:text-text-dark placeholder:text-nav-inactive-light dark:placeholder:text-nav-inactive-dark" placeholder="Enter your Name" />
            <button onClick={() => onContinue(name)} className="bg-accent-purple-light dark:bg-accent-purple-dark text-white font-semibold py-4 px-8 rounded-lg w-4/5 text-lg flex justify-center items-center">Continue <i className="fas fa-arrow-right ml-2"></i></button>
        </div>
    );
};

const SubjectGridScreen: React.FC<{ onSubjectSelect: (subject: string) => void }> = ({ onSubjectSelect }) => (
    <div className="grid grid-cols-2 gap-4 p-4">
        {subjects.map(subject => (
            <Card key={subject} title={subject} icon={subjectIcons[subject].icon} color={subjectIcons[subject].color} onClick={() => onSubjectSelect(subject)} />
        ))}
    </div>
);

const NotesDetailScreen: React.FC<{ subject: string; chapter: string; }> = ({ subject, chapter }) => {
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setNotes('');
        setError('');
        setLoading(true);
        
        let stillMounted = true;
        let isFirstChunk = true;

        const loadNotes = async () => {
            await fetchChapterNotes(
                subject,
                chapter,
                (chunk) => {
                    if (stillMounted) {
                        if (isFirstChunk) {
                            setLoading(false);
                            isFirstChunk = false;
                        }
                        setNotes(prev => prev + chunk);
                    }
                },
                (errorMessage) => {
                    if (stillMounted) {
                        setLoading(false);
                        setError(errorMessage);
                    }
                }
            );
        };

        loadNotes();

        return () => {
            stillMounted = false;
        };
    }, [subject, chapter]);

    return (
        <div className="p-4 w-full h-full">
            {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-purple-light dark:border-accent-purple-dark"></div>
                </div>
            ) : error ? (
                 <div className="bg-card-bg-light dark:bg-card-bg-dark rounded-lg p-4 text-wrong">
                    <h2 className="text-2xl font-bold mb-4 text-title-light dark:text-title-dark">Error</h2>
                    <p className="text-text-light dark:text-text-dark">{error}</p>
                </div>
            ) : (
                <div className="bg-card-bg-light dark:bg-card-bg-dark rounded-lg p-4 text-text-light dark:text-text-dark">
                    <h2 className="text-2xl font-bold mb-4 text-title-light dark:text-title-dark">{chapter}</h2>
                    <p className="whitespace-pre-wrap text-base leading-relaxed">{notes}</p>
                </div>
            )}
        </div>
    );
};

const ChapterListScreen: React.FC<{ 
    subject: string; 
    onChapterSelect: (chapter: string) => void; 
    availabilityCheck?: { type: 'quiz', practiceType: PracticeType } | { type: 'sample' }; 
}> = ({ subject, onChapterSelect, availabilityCheck }) => {
    const chapters = subjectChapters[subject] || [];
    return (
        <div className="p-4 w-full">
            {chapters.map((chapter, index) => {
                let hasContent = true;
                if (availabilityCheck) {
                    if (availabilityCheck.type === 'quiz' && availabilityCheck.practiceType) {
                        hasContent = !!mcqData[subject]?.[chapter]?.[availabilityCheck.practiceType]?.length;
                    } else if (availabilityCheck.type === 'sample') {
                        hasContent = !!samplePaperData[subject]?.[chapter]?.length;
                    } else {
                        hasContent = false;
                    }
                }
                const onSelectAction = () => onChapterSelect(chapter);
                const iconClass = availabilityCheck ? (hasContent ? 'fa-play text-correct' : 'fa-ban text-wrong') : 'fa-angle-right';

                return (
                    <ChapterListItem key={chapter} index={index} title={chapter} onClick={onSelectAction} disabled={!hasContent && !!availabilityCheck} iconClass={iconClass}/>
                );
            })}
        </div>
    );
};

const ProfileScreen: React.FC<{ profile: Profile; onSave: (newProfile: Profile) => void; isEditing: boolean; }> = ({ profile, onSave, isEditing }) => {
    const [editData, setEditData] = useState<Profile>(profile);

    useEffect(() => {
        setEditData(profile);
    }, [profile]);
    
    const DetailRow: React.FC<{icon: string, label: string, value: string, name: keyof Profile}> = ({icon, label, value, name}) => (
        <div className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <i className={`fas ${icon} text-accent-purple-light dark:text-accent-purple-dark text-lg w-8 text-center mr-2`}></i>
            <span className="text-sm text-nav-inactive-light dark:text-nav-inactive-dark w-1/3">{label}</span>
            {isEditing ? (
                 <input type="text" value={editData[name]} onChange={(e) => setEditData({...editData, [name]: e.target.value})} className="w-full bg-transparent border-none text-text-light dark:text-text-dark p-0 m-0 text-base border-b border-accent-purple-darker-light dark:border-accent-purple-darker focus:ring-0" />
            ) : (
                <span className="text-base font-medium flex-grow text-text-light dark:text-text-dark">{value || '-'}</span>
            )}
        </div>
    );

    return (
        <div className="p-4 w-full max-w-md mx-auto text-center">
            <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-emerald-400 text-main-bg-dark inline-flex justify-center items-center text-5xl mb-2 border-4 border-accent-purple-light dark:border-accent-purple-dark shadow-lg">
                    <i className="fas fa-user"></i>
                </div>
                <div className="text-2xl font-bold text-title-light dark:text-title-dark">{profile.name || 'Student'}</div>
            </div>
            <div className="w-full bg-card-bg-light dark:bg-card-bg-dark rounded-xl p-4 shadow-lg text-left">
                <DetailRow icon="fa-id-card-alt" label="Name" value={profile.name} name="name" />
                <DetailRow icon="fa-school" label="School Name" value={profile.school} name="school" />
                <DetailRow icon="fa-hashtag" label="Roll No." value={profile.rollNo} name="rollNo" />
                <div className="flex items-center py-3">
                    <i className="fas fa-map-marker-alt text-accent-purple-light dark:text-accent-purple-dark text-lg w-8 text-center mr-2"></i>
                    <span className="text-sm text-nav-inactive-light dark:text-nav-inactive-dark w-1/3">Address</span>
                    {isEditing ? (
                         <input type="text" value={editData.address} onChange={(e) => setEditData({...editData, address: e.target.value})} className="w-full bg-transparent border-none text-text-light dark:text-text-dark p-0 m-0 text-base border-b border-accent-purple-darker-light dark:border-accent-purple-darker focus:ring-0" />
                    ) : (
                         <span className="text-base font-medium flex-grow text-text-light dark:text-text-dark">{profile.address || '-'}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const QuizScreen: React.FC<{ subject: string; chapter: string; practiceType: PracticeType; onComplete: () => void; }> = ({ subject, chapter, practiceType, onComplete }) => {
    const quizData = useMemo(() => {
        if(practiceType !== 'mcq' && practiceType !== 'pyq' && practiceType !== 'extra') return [];
        return mcqData[subject]?.[chapter]?.[practiceType] || [];
    }, [subject, chapter, practiceType]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const isTimed = practiceType === 'pyq';
    
    const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

    useEffect(() => {
        if (!isTimed) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isTimed]);
    
    const currentQuestion = quizData[currentIndex];
    const isQuizFinished = currentIndex >= quizData.length || (isTimed && timeLeft === 0);

    const handleAnswerSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedAnswer(index);
    };

    const handleNext = () => {
        if (!isAnswered) {
            if (selectedAnswer === currentQuestion.answerIndex) {
                setScore(s => s + 1);
            }
            setIsAnswered(true);
        } else {
            setCurrentIndex(i => i + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        }
    };
    
    if (isQuizFinished) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h3 className="text-3xl font-bold text-correct mb-2">Quiz Complete!</h3>
                <p className="text-xl text-title-light dark:text-title-dark">Your Score: <span className="font-bold">{score}</span> / {quizData.length}</p>
                {isTimed && <p className="text-nav-inactive-light dark:text-nav-inactive-dark">Time Taken: {formatTime(600 - timeLeft)}</p>}
                <button onClick={onComplete} className="mt-8 bg-accent-purple-light dark:bg-accent-purple-dark text-white font-semibold py-3 px-6 rounded-lg">Back to Chapters</button>
            </div>
        );
    }
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="p-4 w-full">
             {isTimed && <div className="text-right text-timer font-bold text-lg mb-2">{formatTime(timeLeft)}</div>}
            <div className="text-right text-correct font-semibold mb-2">Question {currentIndex + 1} of {quizData.length}</div>
            <div className="bg-card-bg-light dark:bg-card-bg-dark p-5 rounded-xl text-lg font-medium mb-5 text-text-light dark:text-text-dark">{currentQuestion.question}</div>
            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                    let optionClass = 'bg-card-bg-light dark:bg-card-bg-dark border-gray-300 dark:border-gray-600';
                    if (isAnswered) {
                        if (index === currentQuestion.answerIndex) optionClass = 'bg-green-100 dark:bg-green-900 border-correct';
                        else if (index === selectedAnswer) optionClass = 'bg-red-100 dark:bg-red-900 border-wrong';
                    } else if (index === selectedAnswer) {
                        optionClass = 'bg-list-hover-light dark:bg-list-hover-dark border-accent-purple-light dark:border-accent-purple-dark';
                    }
                    return (
                        <div key={index} onClick={() => handleAnswerSelect(index)} className={`p-4 rounded-lg border-2 transition-colors cursor-pointer text-text-light dark:text-text-dark ${optionClass}`}>
                            {option}
                        </div>
                    );
                })}
            </div>
            {isAnswered && (
                <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${selectedAnswer === currentQuestion.answerIndex ? 'bg-green-100 dark:bg-green-900 text-correct' : 'bg-red-100 dark:bg-red-900 text-wrong'}`}>
                    {selectedAnswer === currentQuestion.answerIndex ? 'Correct!' : 'Incorrect!'}
                </div>
            )}
            <button onClick={handleNext} disabled={selectedAnswer === null} className="mt-5 w-full bg-accent-purple-light dark:bg-accent-purple-dark text-white font-semibold py-4 rounded-lg disabled:opacity-50">
                {isAnswered ? 'Next Question' : 'Check Answer'}
            </button>
        </div>
    );
};

const AskAIScreen: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError('');
        setGeneratedHtml('');
        setCopySuccess('');

        try {
            const result = await generateHtmlCode(prompt);
            if (result.trim().startsWith('<')) {
                setGeneratedHtml(result);
            } else {
                 setError('The AI did not return valid HTML. Please try rephrasing your request.');
            }
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (!generatedHtml) return;
        navigator.clipboard.writeText(generatedHtml).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, (err) => {
            setCopySuccess('Failed to copy!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <div className="p-4 w-full h-full flex flex-col">
            <div className="flex-shrink-0">
                <h2 className="text-lg font-bold text-accent-purple-light dark:text-accent-purple-dark mb-2">HTML Generator AI</h2>
                <p className="text-sm text-nav-inactive-light dark:text-nav-inactive-dark mb-4">Describe the webpage you want to create, and the AI will generate the HTML code for you.</p>
                <div className="flex gap-2">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-24 p-3 rounded-lg bg-card-bg-light dark:bg-card-bg-dark border border-gray-300 dark:border-gray-600 mb-4 text-text-light dark:text-text-dark focus:ring-accent-purple-light focus:border-accent-purple-light dark:focus:ring-accent-purple-dark dark:focus:border-accent-purple-dark"
                        placeholder="e.g., A simple portfolio page with a header, a section for projects, and a footer."
                        disabled={isLoading}
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full bg-accent-purple-light dark:bg-accent-purple-dark hover:bg-accent-purple-darker-light dark:hover:bg-accent-purple-darker text-white font-semibold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center"
                >
                    {isLoading ? <><div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div> Generating...</> : 'Generate HTML'}
                </button>
            </div>

            <div className="flex-grow mt-4 overflow-y-auto">
                {error && <div className="text-center p-4 bg-red-100 dark:bg-red-900 text-wrong rounded-lg">{error}</div>}

                {generatedHtml && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-title-light dark:text-title-dark">Preview</h3>
                            <iframe
                                srcDoc={generatedHtml}
                                title="Generated HTML Preview"
                                className="w-full h-64 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white"
                                sandbox=""
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-title-light dark:text-title-dark">Code</h3>
                                <button onClick={handleCopy} className="bg-gray-200 dark:bg-gray-700 text-sm py-1 px-3 rounded-md text-text-light dark:text-text-dark">
                                    {copySuccess || 'Copy Code'}
                                </button>
                            </div>
                            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{generatedHtml}</code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SamplePaperScreen: React.FC<{ subject: string; chapter: string; }> = ({ subject, chapter }) => {
    const paper = useMemo(() => samplePaperData[subject]?.[chapter]?.[0], [subject, chapter]);
    const [visibleAnswers, setVisibleAnswers] = useState<{[key: number]: boolean}>({});

    const toggleAnswer = (qNo: number) => {
        setVisibleAnswers(prev => ({ ...prev, [qNo]: !prev[qNo] }));
    };

    if (!paper) {
        return <div className="p-4 text-center text-text-light dark:text-text-dark">No sample paper available for this chapter.</div>;
    }

    return (
        <div className="p-4 text-text-light dark:text-text-dark">
            <h2 className="text-2xl font-bold text-center mb-2 text-title-light dark:text-title-dark">{paper.title}</h2>
            <h3 className="text-xl font-semibold text-center mb-6 text-title-light dark:text-title-dark">{`${subject} - ${chapter}`}</h3>

            {paper.sections.map((section, sIndex) => (
                <div key={sIndex} className="mb-8">
                    <h4 className="text-lg font-bold bg-list-hover-light dark:bg-list-hover-dark p-2 rounded-t-lg">{section.title}</h4>
                    <p className="text-sm italic p-2 border-b-2 border-gray-200 dark:border-gray-700 mb-4">{section.description}</p>
                    
                    {section.questions.map((q) => (
                        <div key={q.qNo} className="mb-6 p-3 bg-card-bg-light dark:bg-card-bg-dark rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <p className="flex-grow font-medium pr-4">
                                    <span className="font-bold">{q.qNo}.</span> {q.text}
                                </p>
                                <span className="ml-4 text-xs font-bold bg-accent-purple-light dark:bg-accent-purple-dark text-white py-1 px-2 rounded-full whitespace-nowrap">{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}</span>
                            </div>

                            {q.options && (
                                <div className="mt-3 ml-5 space-y-2 text-sm">
                                    {q.options.map((opt, oIndex) => <p key={oIndex}>{`${String.fromCharCode(97 + oIndex)})`} {opt}</p>)}
                                </div>
                            )}

                            <button onClick={() => toggleAnswer(q.qNo)} className="text-sm text-accent-purple-light dark:text-accent-purple-dark font-semibold mt-4 hover:underline">
                                {visibleAnswers[q.qNo] ? 'Hide Answer' : 'Show Answer'}
                            </button>

                            {visibleAnswers[q.qNo] && (
                                <div className="mt-2 p-3 bg-list-hover-light dark:bg-list-hover-dark rounded">
                                    <p className="text-sm"><span className="font-bold">Answer:</span> {q.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState<ScreenId>('splash');
    const [profile, setProfile] = useState<Profile>({ name: '', school: '', rollNo: '', address: '' });
    const [theme, setTheme] = useState<Theme>('dark');
    const [currentSubject, setCurrentSubject] = useState('');
    const [currentChapter, setCurrentChapter] = useState('');
    const [currentPracticeType, setCurrentPracticeType] = useState<PracticeType>('');
    const [history, setHistory] = useState<ScreenId[]>([]);
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    
    // --- Effects for Initialization ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('selfStudy10Theme') as Theme | null;
        const savedProfile = localStorage.getItem('selfStudy10Profile');
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
             setTheme('dark');
        }

        const profileData = savedProfile ? JSON.parse(savedProfile) : { name: '', school: '', rollNo: '', address: '' };
        setProfile(profileData);
        
        setTimeout(() => {
            if (profileData.name) {
                switchScreen('dashboard');
            } else {
                switchScreen('welcome');
            }
        }, 1500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('selfStudy10Theme', theme);
    }, [theme]);

    // --- Navigation and State Handlers ---
    const switchScreen = useCallback((screen: ScreenId, stateUpdate?: { subject?: string; chapter?: string; practiceType?: PracticeType; }) => {
        setActiveScreen(prevScreen => {
            // Reset profile editing state when navigating away from profile
            if (prevScreen === 'profile') setIsProfileEditing(false);
            setHistory(h => [...h, prevScreen]);
            return screen;
        });
        if (stateUpdate?.subject) setCurrentSubject(stateUpdate.subject);
        if (stateUpdate?.chapter) setCurrentChapter(stateUpdate.chapter);
        if (stateUpdate?.practiceType !== undefined) setCurrentPracticeType(stateUpdate.practiceType);
    }, []);

    const handleBack = () => {
        const lastScreen = history[history.length - 1];
        if (lastScreen) {
            // Reset profile editing state when navigating away from profile
            if (activeScreen === 'profile') setIsProfileEditing(false);
            setHistory(h => h.slice(0, -1));
            setActiveScreen(lastScreen);
        }
    };
    
    const handleSaveProfile = (newProfile: Profile) => {
        setProfile(newProfile);
        localStorage.setItem('selfStudy10Profile', JSON.stringify(newProfile));
        setIsProfileEditing(false);
    };

    const handleThemeToggle = () => {
        setTheme(t => (t === 'light' ? 'dark' : 'light'));
    };

    const handleProfileEditToggle = () => {
        if (isProfileEditing) {
            // This is handled by a direct call to a save function now, but let's keep it safe.
        }
        setIsProfileEditing(!isProfileEditing);
    };


    const showBottomNav = !['splash', 'welcome'].includes(activeScreen);

    const renderContent = () => {
        const screenProps = { active: true, className: 'bg-main-bg-light dark:bg-main-bg-dark text-text-light dark:text-text-dark' };
        
        switch (activeScreen) {
            case 'splash': return <Screen {...screenProps}><SplashScreen /></Screen>;
            case 'welcome': return <Screen {...screenProps}><WelcomeScreen onContinue={name => { handleSaveProfile({ ...profile, name }); switchScreen('dashboard'); }} /></Screen>;
            case 'dashboard': return <SubjectGridScreen onSubjectSelect={subject => switchScreen('studySubject', {subject})}/> // Placeholder action
            case 'notesSubject': return <SubjectGridScreen onSubjectSelect={subject => switchScreen('notesChapter', {subject})} />;
            case 'notesChapter': return <ChapterListScreen subject={currentSubject} onChapterSelect={chapter => switchScreen('notesDetail', {subject: currentSubject, chapter})} />;
            case 'notesDetail': return <NotesDetailScreen subject={currentSubject} chapter={currentChapter} />;
            case 'studySubject': return <SubjectGridScreen onSubjectSelect={subject => switchScreen('studyChapter', {subject})} />;
            case 'studyChapter': return <ChapterListScreen subject={currentSubject} onChapterSelect={chapter => console.log('Study', chapter)} />;
            case 'practice': return (
                <div className="p-4 w-full">
                    <div className="space-y-4">
                        {[
                            {type: 'pyq', title: 'PYQ Questions (Timed MCQ)', desc: 'Previous Year Questions for exam readiness', icon: 'fa-history', color: '#FFD700', action: () => switchScreen('practiceSubject', {practiceType: 'pyq'})},
                            {type: 'mcq', title: 'MCQ Test (Untimed)', desc: 'Chapter-wise multiple-choice quizzes', icon: 'fa-question-circle', color: '#6A5ACD', action: () => switchScreen('practiceSubject', {practiceType: 'mcq'})},
                            {type: 'sample', title: 'Sample Papers', desc: 'Practice with model test papers', icon: 'fa-file-alt', color: '#3498db', action: () => switchScreen('samplePaperSubject')},
                            {type: 'extra', title: 'Extra Questions', desc: 'More practice questions to master concepts', icon: 'fa-plus-square', color: '#1abc9c', action: () => switchScreen('practiceSubject', {practiceType: 'extra'})},
                        ].map(item => (
                            <div key={item.type} onClick={item.action} className="bg-card-bg-light dark:bg-card-bg-dark rounded-xl p-4 flex items-center shadow-lg cursor-pointer">
                                <i className={`fas ${item.icon} text-4xl w-12 text-center mr-4`} style={{color: item.color}}></i>
                                <div className="flex-grow">
                                    <div className="font-bold text-title-light dark:text-title-dark">{item.title}</div>
                                    <div className="text-sm text-nav-inactive-light dark:text-nav-inactive-dark">{item.desc}</div>
                                </div>
                                <i className="fas fa-angle-right text-accent-purple-light dark:text-accent-purple-dark text-xl"></i>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'practiceSubject': return <SubjectGridScreen onSubjectSelect={subject => switchScreen('practiceChapter', {subject})} />;
            case 'practiceChapter': return <ChapterListScreen subject={currentSubject} onChapterSelect={(chapter) => {
                switchScreen('quiz', { subject: currentSubject, chapter });
            }} availabilityCheck={{ type: 'quiz', practiceType: currentPracticeType}} />;
            case 'quiz': return <QuizScreen subject={currentSubject} chapter={currentChapter} practiceType={currentPracticeType} onComplete={handleBack} />;
            case 'profile': return <ProfileScreen profile={profile} onSave={handleSaveProfile} isEditing={isProfileEditing} />;
            case 'ask': return <AskAIScreen />;
            case 'samplePaperSubject': return <SubjectGridScreen onSubjectSelect={subject => switchScreen('samplePaperChapter', {subject})} />;
            case 'samplePaperChapter': return <ChapterListScreen subject={currentSubject} onChapterSelect={chapter => switchScreen('samplePaperView', {chapter, subject: currentSubject})} availabilityCheck={{type: 'sample'}} />;
            case 'samplePaperView': return <SamplePaperScreen subject={currentSubject} chapter={currentChapter} />;
            default: return <div>Screen not found</div>;
        }
    };
    
    const titles: {[key in ScreenId]?: string} = {
        dashboard: 'Class 10 Subjects',
        practice: 'Practice Zone',
        notesSubject: 'Notes & Summaries',
        notesChapter: `${currentSubject} Notes`,
        notesDetail: 'Notes',
        studySubject: 'Video Lessons',
        studyChapter: `${currentSubject} Videos`,
        ask: 'Ask the AI',
        profile: 'My Profile',
        practiceSubject: 'Select Subject',
        practiceChapter: `${currentSubject} Chapters`,
        quiz: 'Quiz',
        samplePaperSubject: 'Select Subject',
        samplePaperChapter: `${currentSubject} Sample Papers`,
        samplePaperView: 'Sample Paper'
    };
    
    const backTargets: {[key in ScreenId]?: ScreenId} = {
        notesChapter: 'notesSubject',
        notesDetail: 'notesChapter',
        studyChapter: 'studySubject',
        practiceSubject: 'practice',
        practiceChapter: 'practiceSubject',
        quiz: 'practiceChapter',
        samplePaperSubject: 'practice',
        samplePaperChapter: 'samplePaperSubject',
        samplePaperView: 'samplePaperChapter'
    };

    const currentTitle = titles[activeScreen] || 'Self Study 10';
    const backTarget = backTargets[activeScreen];
    
    return (
        <div className="w-full max-w-md h-[800px] flex flex-col bg-main-bg-light dark:bg-main-bg-dark shadow-2xl rounded-2xl overflow-hidden border-4 border-black mx-auto">
            {['splash', 'welcome'].includes(activeScreen) ? (
                 <div className={`w-full h-full flex-grow flex flex-col items-center overflow-hidden bg-main-bg-light dark:bg-main-bg-dark text-text-light dark:text-text-dark`}>
                     {renderContent()}
                 </div>
            ) : (
                <>
                    <TopBar title={currentTitle} backTarget={backTarget} onBack={handleBack}>
                        {activeScreen === 'profile' && (
                            <>
                                <button onClick={handleThemeToggle} className="text-sm bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark font-semibold py-2 px-3 rounded-md">
                                    {theme === 'light' ? 'Dark' : 'Light'} Mode
                                </button>
                                <button onClick={handleProfileEditToggle} className="text-sm bg-correct text-white font-semibold py-2 px-4 rounded-md">
                                    {isProfileEditing ? 'Save' : 'Edit'}
                                </button>
                            </>
                        )}
                    </TopBar>
                    <main className="flex-grow overflow-y-auto">
                        {renderContent()}
                    </main>
                    {showBottomNav && <BottomNav activeScreen={activeScreen} onNavigate={switchScreen} />}
                </>
            )}
        </div>
    );
};

export default App;