export interface Profile {
  name: string;
  school: string;
  rollNo: string;
  address: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface SamplePaperQuestion {
  qNo: number;
  text: string;
  marks: number;
  type: 'MCQ' | 'VSA' | 'SA' | 'LA';
  options?: string[];
  answer: string;
}

export interface SamplePaperSection {
  title: string;
  description: string;
  questions: SamplePaperQuestion[];
}

export interface SamplePaper {
  id: string;
  title: string;
  sections: SamplePaperSection[];
}


export type ScreenId = 
  | 'splash' 
  | 'welcome' 
  | 'dashboard' 
  | 'practice' 
  | 'notesSubject' 
  | 'studySubject' 
  | 'ask' 
  | 'profile' 
  | 'notesChapter' 
  | 'studyChapter' 
  | 'practiceSubject' 
  | 'practiceChapter' 
  | 'quiz' 
  | 'notesDetail'
  | 'samplePaperSubject'
  | 'samplePaperChapter'
  | 'samplePaperView';

export type PracticeType = 'pyq' | 'mcq' | 'extra' | '';

export type Theme = 'light' | 'dark';