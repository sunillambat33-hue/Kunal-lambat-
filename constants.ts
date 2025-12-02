import { SamplePaper } from "./types";

export const subjectChapters: { [key: string]: string[] } = {
    'Mathematics': ['Real Numbers', 'Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'],
    'Science': ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-Metals', 'Carbon & its Compounds', 'Life Processes', 'Control & Coordination', 'How Do Organisms Reproduce?', 'Heredity', 'Light Reflection & Refraction', 'Human Eye & Colourful World', 'Electricity', 'Magnetic Effects of Electric Current', 'Sources of Energy', 'Our Environment', 'Sustainable Management of Natural Resources'],
    'Social Science': ['The Rise of Nationalism in Europe', 'Nationalism in India', 'The Making of a Global World', 'Age of Industrialisation', 'Print Culture & the Modern World', 'Resources & Development', 'Water Resources', 'Agriculture', 'Power Sharing', 'Federalism', 'Democracy & Diversity', 'Gender, Religion & Caste', 'Political Parties', 'Outcomes of Democracy', 'Development', 'Sectors of Indian Economy', 'Money & Credit', 'Globalisation & the Indian Economy', 'Consumer Rights'],
    'English': ['A Letter to God', 'Nelson Mandela', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'The Hundred Dresses I & II', 'Glimpses of India', 'Mijbil the Otter', 'The Trees', 'Dust of Snow', 'Fire and Ice', 'A Tiger in the Zoo', 'How to Tell Wild Animals', 'The Ball Poem'],
    'Hindi': ['सूरदास के पद', 'राम-लक्ष्मण-परशुराम संवाद', 'सवैये और कवित्त', 'आत्मकथ्य', 'उत्साह और अट नहीं रही है', 'फसल और यह दंतुरित मुसकान', 'संगतकार', 'नेताजी का चश्मा', 'बालगोबिन भगत', 'लखनवी अंदाज़', 'मानवीय करुणा की दिव्य चमक'],
    'Computer': ['Internet Basics', 'HTML Fundamentals', 'CSS Styling', 'Introduction to Python', 'Data Handling', 'Cyber Ethics']
};

export const mcqData: { [subject: string]: { [chapter: string]: { mcq: any[], pyq: any[], extra?: any[] } } } = {
    'Mathematics': {
        'Real Numbers': {
            'mcq': [
                { question: "The largest number which divides 70 and 125, leaving remainders 5 and 8 respectively, is:", options: ["13", "65", "875", "1750"], answerIndex: 0 },
                { question: "If two positive integers a and b are written as a = x³y² and b = xy³; x, y are prime numbers, then HCF(a, b) is:", options: ["xy", "xy²", "x³y³", "x²y²"], answerIndex: 1 },
                { question: "The decimal expansion of the rational number 14587/1250 will terminate after how many decimal places?", options: ["1", "2", "3", "4"], answerIndex: 3 },
                { question: "If p and q are two co-prime numbers, then p² and q² are:", options: ["Co-prime", "Even", "Odd", "Not enough information"], answerIndex: 0 },
                { question: "If LCM(96, 404) = 9696, then HCF(96, 404) is:", options: ["1", "2", "3", "4"], answerIndex: 3 }
            ],
            'pyq': [
                { question: "If n is a natural number, then 9²ⁿ - 4²ⁿ is always divisible by:", options: ["5", "13", "Both 5 and 13", "None of these"], answerIndex: 2 },
                { question: "The product of a non-zero rational number and an irrational number is:", options: ["always rational", "always irrational", "1", "rational or irrational"], answerIndex: 1 },
                { question: "The largest number which divides 615 and 963 leaving remainder 6 in each case is:", options: ["87", "92", "99", "95"], answerIndex: 0 },
                { question: "If HCF(26, 169) = 13, then LCM(26, 169) is:", options: ["26", "52", "338", "13"], answerIndex: 2 },
                { question: "The decimal expansion of the rational number 33/(2² * 5) will terminate after:", options: ["one decimal place", "two decimal places", "three decimal places", "more than three"], answerIndex: 1 },
                { question: "Which of the following is not irrational?", options: ["√2 + √3", "(√2 - 1)²", "2√3 + 5", "(√2-1)(√2+1)"], answerIndex: 3 },
                { question: "If p is a prime number, then √p is:", options: ["rational", "irrational", "integer", "None of these"], answerIndex: 1 },
                { question: "The sum of the exponents of the prime factors in the prime factorization of 196 is:", options: ["1", "2", "3", "4"], answerIndex: 2 },
                { question: "If a and b are two positive integers such that the least prime factor of a is 3 and the least prime factor of b is 5, then the least prime factor of (a+b) is:", options: ["2", "3", "5", "8"], answerIndex: 0 },
                { question: "For any two positive integers a and b, HCF(a, b) * LCM(a, b) is equal to:", options: ["a+b", "a * b", "a/b", "None of these"], answerIndex: 1 }
            ],
            'extra': [
                { question: "The HCF of 8, 9, 25 is:", options: ["8", "9", "25", "1"], answerIndex: 3 },
                { question: "Which of the following is an irrational number?", options: ["√16", "√(12/3)", "√12", "√100"], answerIndex: 2 }
            ]
        },
        'Polynomials': {
            'mcq': [
                { question: "If one zero of the polynomial p(x) = kx² + 3x + k is 2, then the value of k is:", options: ["6/7", "-6/7", "-7/6", "7/6"], answerIndex: 1 },
                { question: "The number of polynomials having zeroes -2 and 5 is:", options: ["1", "2", "3", "more than 3"], answerIndex: 3 },
                { question: "If the zeroes of the quadratic polynomial x² + (a+1)x + b are 2 and -3, then:", options: ["a=-7, b=-1", "a=0, b=-6", "a=2, b=-6", "a=-2, b=-6"], answerIndex: 1 },
                { question: "The product of the zeroes of the cubic polynomial ax³ + bx² + cx + d is:", options: ["c/a", "-b/a", "-c/a", "-d/a"], answerIndex: 3 },
                { question: "A quadratic polynomial whose sum and product of zeroes are 2 and -1/3 respectively, is:", options: ["3x² - 5x - 3", "3x² - 6x - 1", "x² - 2x + 3", "3x² + 6x - 1"], answerIndex: 1 }
            ],
            'pyq': [
                { question: "If α and β are the zeroes of the polynomial f(x) = x² - 5x + k such that α - β = 1, then the value of k is:", options: ["6", "8", "10", "12"], answerIndex: 0 },
                { question: "The zeroes of the quadratic polynomial x² + 99x + 127 are:", options: ["both positive", "both negative", "one positive and one negative", "both equal"], answerIndex: 1 },
                { question: "If one of the zeroes of a quadratic polynomial of the form x² + ax + b is the negative of the other, then it:", options: ["has no linear term and the constant term is negative.", "has no linear term and the constant term is positive.", "can have a linear term but the constant term is negative.", "can have a linear term but the constant term is positive."], answerIndex: 0 }
            ],
            'extra': [
                { question: "The value of the polynomial 5x - 4x² + 3 at x = -1 is:", options: ["-6", "6", "2", "-2"], answerIndex: 0 },
                { question: "If p(x) = x + 3, then p(x) + p(-x) is equal to:", options: ["3", "2x", "0", "6"], answerIndex: 3 }
            ]
        },
        'Pair of Linear Equations': { 
            'mcq': [
                { question: "The pair of equations y=0 and y=-7 has:", options: ["One solution", "Two solutions", "Infinitely many solutions", "No solution"], answerIndex: 3 },
                { question: "If the lines given by 3x + 2ky = 2 and 2x + 5y = 1 are parallel, then the value of k is:", options: ["5/4", "2/5", "15/4", "3/2"], answerIndex: 2 }
            ],
            'pyq': [
                { question: "For what value of k, do the equations 3x - y + 8 = 0 and 6x - ky = -16 represent coincident lines?", options: ["1/2", "-1/2", "2", "-2"], answerIndex: 2 },
                { question: "The pair of equations x + 2y + 5 = 0 and -3x - 6y + 1 = 0 has:", options: ["a unique solution", "exactly two solutions", "infinitely many solutions", "no solution"], answerIndex: 3 },
                { question: "If a pair of linear equations is consistent, then the lines will be:", options: ["parallel", "always coincident", "intersecting or coincident", "always intersecting"], answerIndex: 2 }
            ],
            'extra': [
                { question: "The pair of linear equations 2x + 3y = 5 and 4x + 6y = 10 is:", options: ["consistent", "inconsistent", "dependent consistent", "none of these"], answerIndex: 2 }
            ]
        },
        'Quadratic Equations': {
            'mcq': [
                { question: "The roots of the equation x² - 3x - 10 = 0 are:", options: ["2, -5", "5, -2", "-5, -2", "5, 2"], answerIndex: 1 },
                { question: "The nature of the roots of the quadratic equation 2x² - 4x + 3 = 0 is:", options: ["Real and distinct", "Real and equal", "No real roots", "Cannot be determined"], answerIndex: 2 }
            ],
            'pyq': [
                { question: "Which of the following is not a quadratic equation?", options: ["2(x-1)² = 4x² - 2x + 1", "2x - x² = x² + 5", "(√2x + √3)² = 3x² - 5x", "(x² + 2x)² = x⁴ + 3 + 4x³"], answerIndex: 3 },
                { question: "The values of k for which the quadratic equation 2x² - kx + k = 0 has equal roots is:", options: ["0 only", "8 only", "0, 8", "0, 4"], answerIndex: 2 },
                { question: "The value of √6 + √6 + √6 + ... is:", options: ["4", "3", "-2", "3.5"], answerIndex: 1 }
            ],
            'extra': [
                { question: "The quadratic equation ax² + bx + c = 0 has two distinct real roots if:", options: ["b² - 4ac > 0", "b² - 4ac < 0", "b² - 4ac = 0", "b² - 4ac >= 0"], answerIndex: 0 }
            ]
        },
        'Arithmetic Progressions': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Triangles': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Coordinate Geometry': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Introduction to Trigonometry': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Some Applications of Trigonometry': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Circles': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Areas Related to Circles': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Surface Areas and Volumes': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Statistics': { 'mcq': [], 'pyq': [], 'extra': [] },
        'Probability': { 'mcq': [], 'pyq': [], 'extra': [] }
    },
    'Science': {
        'Chemical Reactions & Equations': {'mcq': [], 'pyq': [], 'extra': []},
        'Acids, Bases & Salts': {'mcq': [], 'pyq': [], 'extra': []},
        'Life Processes': {'mcq': [], 'pyq': [], 'extra': []}
    }, 'Social Science': {}, 'English': {}, 'Hindi': {}, 'Computer': {}
};

export const samplePaperData: { [subject: string]: { [chapter: string]: SamplePaper[] } } = {
    'Mathematics': {
        'Real Numbers': [
            {
                id: 'math-real-numbers-01',
                title: 'Sample Question Paper (Basic)',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of 20 questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'If two positive integers p and q can be expressed as p = ab² and q = a³b; a, b being prime numbers, then LCM(p, q) is:', marks: 1, options: ['ab', 'a²b²', 'a³b²', 'a³b³'], answer: 'c) a³b²' },
                            { qNo: 2, type: 'MCQ', text: 'The largest number which divides 70 and 125, leaving remainders 5 and 8, respectively, is:', marks: 1, options: ['13', '65', '875', '1750'], answer: 'a) 13. (Since 70-5=65 and 125-8=117, HCF(65, 117) = 13)' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of 5 questions of 2 marks each.',
                        questions: [
                            { qNo: 21, type: 'VSA', text: 'Explain why 7 × 11 × 13 + 13 is a composite number.', marks: 2, answer: '7 × 11 × 13 + 13 = 13 × (7 × 11 + 1) = 13 × (77 + 1) = 13 × 78. Since the number has factors other than 1 and itself (e.g., 13 and 78), it is a composite number.' }
                        ]
                    }
                ]
            }
        ],
        'Polynomials': [
            {
                id: 'math-polynomials-01',
                title: 'Sample Question Paper (Basic)',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'If one of the zeroes of the quadratic polynomial (k-1)x² + kx + 1 is -3, then the value of k is:', marks: 1, options: ['4/3', '-4/3', '2/3', '-2/3'], answer: 'a) 4/3' },
                            { qNo: 2, type: 'VSA', text: 'Find a quadratic polynomial whose zeroes are -3 and 4.', marks: 1, answer: 'The required polynomial is x² - x - 12.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 2 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Find the zeroes of the polynomial x² - 3 and verify the relationship between the zeroes and the coefficients.', marks: 2, answer: 'The zeroes are √3 and -√3. Sum of zeroes = √3 + (-√3) = 0. -b/a = 0/1 = 0. Product of zeroes = (√3)(-√3) = -3. c/a = -3/1 = -3. Hence, verified.' }
                        ]
                    }
                ]
            }
        ]
    },
    'Science': {
        'Chemical Reactions & Equations': [
            {
                id: 'science-chem-reactions-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Which of the following is a decomposition reaction?', marks: 1, options: ['NaOH + HCl → NaCl + H₂O', '2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂', 'Zn + H₂SO₄ → ZnSO₄ + H₂', '2Mg + O₂ → 2MgO'], answer: 'b) 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂' },
                            { qNo: 2, type: 'VSA', text: 'What is observed when a solution of potassium iodide is added to a solution of lead nitrate?', marks: 1, answer: 'A yellow precipitate of lead iodide (PbI₂) is formed.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 2 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Balance the following chemical equation: Fe + H₂O → Fe₃O₄ + H₂.', marks: 2, answer: 'The balanced equation is: 3Fe + 4H₂O → Fe₃O₄ + 4H₂' }
                        ]
                    }
                ]
            }
        ]
    },
    'Social Science': {
        'The Rise of Nationalism in Europe': [
            {
                id: 'ss-hist-rise-nationalism-europe-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Who among the following was proclaimed the German Emperor in a ceremony held at Versailles in January 1871?', marks: 1, options: ['Otto von Bismarck', 'Kaiser William I', 'Napoleon Bonaparte', 'Louis Philippe'], answer: 'b) Kaiser William I' },
                            { qNo: 2, type: 'VSA', text: 'What was the main aim of the French revolutionaries?', marks: 1, answer: 'The main aim was to create a sense of collective identity amongst the French people and to transfer sovereignty from the monarchy to a body of French citizens.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Briefly trace the process of German unification.', marks: 3, answer: 'The process was led by Prussia and its chief minister, Otto von Bismarck. It involved three wars over seven years with Austria, Denmark, and France, ending in Prussian victory. In January 1871, the Prussian king, William I, was proclaimed German Emperor in a ceremony held at Versailles.' }
                        ]
                    }
                ]
            }
        ],
        'Nationalism in India': [
            {
                id: 'ss-hist-nationalism-india-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Why did Gandhiji decide to withdraw the Non-Cooperation Movement in February 1922?', marks: 1, options: ['The movement was not gaining support', 'The leaders were tired', 'The Chauri Chaura incident', 'The British agreed to the demands'], answer: 'c) The Chauri Chaura incident' },
                            { qNo: 2, type: 'VSA', text: 'What is meant by the term \'satyagraha\'?', marks: 1, answer: 'Satyagraha was a novel method of mass agitation, which stressed the power of truth and the need to search for truth. It suggested that if the cause was true, physical force was not necessary to fight the oppressor.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Explain the idea of Satyagraha according to Gandhiji.', marks: 3, answer: 'The idea of Satyagraha emphasised the power of truth. It suggested that for a true cause, the struggle against injustice does not require physical force. A satyagrahi could win the battle through non-violence by appealing to the conscience of the oppressor.' }
                        ]
                    }
                ]
            }
        ],
        'Resources & Development': [
             {
                id: 'ss-geo-resources-dev-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Which one of the following types of resource is iron ore?', marks: 1, options: ['Renewable', 'Biotic', 'Flow', 'Non-renewable'], answer: 'd) Non-renewable' },
                            { qNo: 2, type: 'VSA', text: 'What is resource planning?', marks: 1, answer: 'Resource planning is the widely accepted strategy for judicious use of resources. It involves identification and inventory of resources, evolving a planning structure, and matching the resource development plans with overall national development plans.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Why is resource conservation essential?', marks: 3, answer: 'Resource conservation is essential for sustainable development. Irrational consumption and over-utilisation of resources may lead to socio-economic and environmental problems. It helps in saving resources for future generations.' }
                        ]
                    }
                ]
            }
        ],
        'Agriculture': [
            {
                id: 'ss-geo-agriculture-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Which of the following is a rabi crop?', marks: 1, options: ['Rice', 'Millet', 'Gram', 'Cotton'], answer: 'c) Gram' },
                            { qNo: 2, type: 'VSA', text: 'What is shifting cultivation also known as?', marks: 1, answer: 'It is known as \'slash and burn\' agriculture or \'Jhumming\' in North-Eastern states.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Distinguish between Rabi and Kharif crops, giving one example for each.', marks: 3, answer: 'Kharif crops are grown with the onset of monsoon and harvested in September-October (e.g., Paddy/Rice). Rabi crops are sown in winter from October to December and harvested in summer from April to June (e.g., Wheat).' }
                        ]
                    }
                ]
            }
        ],
        'Power Sharing': [
            {
                id: 'ss-civics-power-sharing-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Which system of government is followed in Belgium?', marks: 1, options: ['Unitary', 'Federal', 'Dictatorship', 'Monarchy'], answer: 'b) Federal' },
                            { qNo: 2, type: 'VSA', text: 'What is the system of \'checks and balances\'?', marks: 1, answer: 'It is a system where each organ of the government (legislature, executive, judiciary) checks the others. This results in a balance of power among various institutions.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Why is power sharing desirable? Give two prudential reasons.', marks: 3, answer: 'Power sharing is desirable because it helps to reduce the possibility of conflict between social groups. It is a good way to ensure the stability of political order.' }
                        ]
                    }
                ]
            }
        ],
        'Federalism': [
            {
                id: 'ss-civics-federalism-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Which of the following subjects is not included in the Union List?', marks: 1, options: ['Defence', 'Foreign Affairs', 'Police', 'Banking'], answer: 'c) Police' },
                            { qNo: 2, type: 'VSA', text: 'What makes India a federal country?', marks: 1, answer: 'India is a federal country because its constitution provides for a three-fold distribution of legislative powers between the Union Government and the State Governments.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'What is the main difference between a federal form of government and a unitary one? Explain with an example.', marks: 3, answer: 'In a federal system, power is divided between central and state governments (e.g., India). In a unitary system, all power is held by a single central government (e.g., United Kingdom).' }
                        ]
                    }
                ]
            }
        ],
        'Development': [
            {
                id: 'ss-eco-development-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Which of the following is used by the UNDP to measure development?', marks: 1, options: ['Per Capita Income', 'Human Development Index (HDI)', 'Gross Domestic Product (GDP)', 'Literacy Rate'], answer: 'b) Human Development Index (HDI)' },
                            { qNo: 2, type: 'VSA', text: 'What is Per Capita Income?', marks: 1, answer: 'Per Capita Income is the average income of the people of a country in a definite period. It is calculated by dividing the national income of a country by its total population.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'What is the main criterion used by the World Bank in classifying different countries? What are the limitations of this criterion?', marks: 3, answer: 'The World Bank uses per capita income as the main criterion. Its limitation is that it hides disparities; it does not show how income is distributed among people. It also ignores other important aspects like health and education.' }
                        ]
                    }
                ]
            }
        ],
        'Sectors of Indian Economy': [
            {
                id: 'ss-eco-sectors-01',
                title: 'Sample Question Paper',
                sections: [
                    {
                        title: 'Section A',
                        description: 'Section A consists of questions of 1 mark each.',
                        questions: [
                            { qNo: 1, type: 'MCQ', text: 'Activities in which natural products are changed into other forms come under which sector?', marks: 1, options: ['Primary', 'Secondary', 'Tertiary', 'Quaternary'], answer: 'b) Secondary' },
                            { qNo: 2, type: 'VSA', text: 'What is disguised unemployment?', marks: 1, answer: 'It is a situation where more people are employed in a job than required. Even if some are removed, the total production does not fall.' }
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'Section B consists of questions of 3 marks each.',
                        questions: [
                            { qNo: 21, type: 'SA', text: 'Differentiate between the primary and secondary sectors using examples.', marks: 3, answer: 'The Primary sector involves activities that directly use natural resources, like agriculture and fishing. The Secondary sector covers activities in which natural products are changed into other forms through ways of manufacturing, like a factory producing cotton cloth from cotton.' }
                        ]
                    }
                ]
            }
        ]
    }
};


export const subjectIcons: {[key: string]: {icon: string, color: string}} = {
    'Mathematics': { icon: 'fas fa-calculator', color: '#3498db' },
    'Science': { icon: 'fas fa-atom', color: '#2ecc71' },
    'Social Science': { icon: 'fas fa-globe-asia', color: '#e67e22' },
    'English': { icon: 'fas fa-book-open', color: '#9b59b6' },
    'Hindi': { icon: 'fas fa-language', color: '#f39c12' },
    'Computer': { icon: 'fas fa-laptop-code', color: '#c0392b' },
};

export const subjects = Object.keys(subjectChapters);